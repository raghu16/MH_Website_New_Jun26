import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, uploadFile, mediaUrl } from "../api";

type Section = { h?: string; p: string };

const empty = {
  title: "", slug: "", category: "", excerpt: "", cover_image: "",
  read_time: "", accent: "magenta", status: "draft", body: [{ h: "", p: "" }] as Section[],
};

export default function PostEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = id && id !== "new";
  const [f, setF] = useState<any>(empty);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (editing) {
      api(`/posts/${id}`).then((d) => setF({ ...d, body: d.body?.length ? d.body : [{ h: "", p: "" }] }));
    }
  }, [id]);

  const set = (k: string, v: any) => setF((s: any) => ({ ...s, [k]: v }));
  const setSec = (i: number, k: string, v: string) =>
    setF((s: any) => ({ ...s, body: s.body.map((x: Section, j: number) => (j === i ? { ...x, [k]: v } : x)) }));
  const addSec = () => setF((s: any) => ({ ...s, body: [...s.body, { h: "", p: "" }] }));
  const delSec = (i: number) => setF((s: any) => ({ ...s, body: s.body.filter((_: any, j: number) => j !== i) }));

  async function cover(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    const m = await uploadFile(file);
    set("cover_image", m.url);
  }

  function slugify() {
    if (!f.slug) set("slug", f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  async function save(e: any) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = { ...f, body: f.body.filter((b: Section) => b.p || b.h) };
      if (editing) await api(`/posts/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api("/posts", { method: "POST", body: JSON.stringify(payload) });
      nav("/posts");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="form">
      <header className="page-head">
        <h1>{editing ? "Edit post" : "New post"}</h1>
        <button className="btn" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
      </header>

      <div className="grid2">
        <label>Title<input value={f.title} onChange={(e) => set("title", e.target.value)} onBlur={slugify} required /></label>
        <label>Slug<input value={f.slug} onChange={(e) => set("slug", e.target.value)} required /></label>
        <label>Category<input value={f.category} onChange={(e) => set("category", e.target.value)} /></label>
        <label>Read time<input value={f.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5 min read" /></label>
        <label>Accent
          <select value={f.accent} onChange={(e) => set("accent", e.target.value)}>
            <option value="magenta">magenta</option>
            <option value="cyan">cyan</option>
          </select>
        </label>
        <label>Status
          <select value={f.status} onChange={(e) => set("status", e.target.value)}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
      </div>

      <label>Excerpt<textarea value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} /></label>

      <label>Cover image
        <div className="media-pick">
          {f.cover_image && <img src={mediaUrl(f.cover_image)} alt="" />}
          <input type="file" accept="image/*" onChange={cover} />
        </div>
      </label>

      <div className="sections">
        <div className="sec-head">
          <h3>Body</h3>
          <button type="button" className="btn-sm" onClick={addSec}>+ Section</button>
        </div>
        {f.body.map((s: Section, i: number) => (
          <div key={i} className="section">
            <input placeholder="Heading (optional)" value={s.h || ""} onChange={(e) => setSec(i, "h", e.target.value)} />
            <textarea placeholder="Paragraph" value={s.p} onChange={(e) => setSec(i, "p", e.target.value)} rows={3} />
            <button type="button" className="link danger" onClick={() => delSec(i)}>Remove section</button>
          </div>
        ))}
      </div>
    </form>
  );
}
