import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, uploadFile, mediaUrl } from "../api";

const empty = {
  name: "", slug: "", client: "", category: "", year: "", result: "",
  tags: [] as string[], accent: "magenta", status: "draft",
  challenge: "", approach: [""] as string[], outcomes: [{ v: "", l: "" }] as { v: string; l: string }[],
  hero: null as any, gallery: [] as any[],
};

const mediaFromUpload = (m: any) => ({ type: (m.mime || "").startsWith("video") ? "video" : "image", src: m.url, alt: "" });

function Preview({ item }: { item: any }) {
  if (!item?.src) return null;
  return item.type === "video" ? (
    <video src={mediaUrl(item.src)} className="thumb" muted />
  ) : (
    <img src={mediaUrl(item.src)} className="thumb" alt="" />
  );
}

export default function ProjectEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = id && id !== "new";
  const [f, setF] = useState<any>(empty);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (editing) {
      api(`/projects/${id}`).then((d) =>
        setF({
          ...d,
          approach: d.approach?.length ? d.approach : [""],
          outcomes: d.outcomes?.length ? d.outcomes : [{ v: "", l: "" }],
          gallery: d.gallery || [],
        })
      );
    }
  }, [id]);

  const set = (k: string, v: any) => setF((s: any) => ({ ...s, [k]: v }));
  const setAp = (i: number, v: string) => setF((s: any) => ({ ...s, approach: s.approach.map((x: string, j: number) => (j === i ? v : x)) }));
  const addAp = () => setF((s: any) => ({ ...s, approach: [...s.approach, ""] }));
  const delAp = (i: number) => setF((s: any) => ({ ...s, approach: s.approach.filter((_: any, j: number) => j !== i) }));
  const setOc = (i: number, k: string, v: string) => setF((s: any) => ({ ...s, outcomes: s.outcomes.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) }));
  const addOc = () => setF((s: any) => ({ ...s, outcomes: [...s.outcomes, { v: "", l: "" }] }));
  const delOc = (i: number) => setF((s: any) => ({ ...s, outcomes: s.outcomes.filter((_: any, j: number) => j !== i) }));

  async function heroUp(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    set("hero", mediaFromUpload(await uploadFile(file)));
  }
  async function galleryUp(e: any) {
    const files = e.target.files;
    if (!files) return;
    const items: any[] = [];
    for (const file of Array.from(files)) items.push(mediaFromUpload(await uploadFile(file as File)));
    setF((s: any) => ({ ...s, gallery: [...s.gallery, ...items] }));
  }
  const delGallery = (i: number) => setF((s: any) => ({ ...s, gallery: s.gallery.filter((_: any, j: number) => j !== i) }));

  function slugify() {
    if (!f.slug) set("slug", f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  async function save(e: any) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        ...f,
        approach: f.approach.filter((a: string) => a.trim()),
        outcomes: f.outcomes.filter((o: any) => o.v || o.l),
      };
      if (editing) await api(`/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api("/projects", { method: "POST", body: JSON.stringify(payload) });
      nav("/projects");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="form">
      <header className="page-head">
        <h1>{editing ? "Edit case study" : "New case study"}</h1>
        <button className="btn" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
      </header>

      <div className="grid2">
        <label>Name<input value={f.name} onChange={(e) => set("name", e.target.value)} onBlur={slugify} required /></label>
        <label>Slug<input value={f.slug} onChange={(e) => set("slug", e.target.value)} required /></label>
        <label>Client<input value={f.client} onChange={(e) => set("client", e.target.value)} /></label>
        <label>Category<input value={f.category} onChange={(e) => set("category", e.target.value)} placeholder="AI / Voice / Mobile / Web3 …" /></label>
        <label>Year<input value={f.year} onChange={(e) => set("year", e.target.value)} /></label>
        <label>Accent
          <select value={f.accent} onChange={(e) => set("accent", e.target.value)}>
            <option value="magenta">magenta</option>
            <option value="cyan">cyan</option>
          </select>
        </label>
      </div>

      <label>Result (one-line outcome)<input value={f.result} onChange={(e) => set("result", e.target.value)} /></label>
      <label>Tags (comma-separated)
        <input value={f.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} />
      </label>
      <label>Status
        <select value={f.status} onChange={(e) => set("status", e.target.value)} className="narrow">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>

      <label>Challenge<textarea value={f.challenge} onChange={(e) => set("challenge", e.target.value)} rows={3} /></label>

      <div className="sections">
        <div className="sec-head"><h3>Approach</h3><button type="button" className="btn-sm" onClick={addAp}>+ Step</button></div>
        {f.approach.map((a: string, i: number) => (
          <div key={i} className="row">
            <input value={a} onChange={(e) => setAp(i, e.target.value)} placeholder={`Step ${i + 1}`} />
            <button type="button" className="link danger" onClick={() => delAp(i)}>×</button>
          </div>
        ))}
      </div>

      <div className="sections">
        <div className="sec-head"><h3>Outcomes</h3><button type="button" className="btn-sm" onClick={addOc}>+ Metric</button></div>
        {f.outcomes.map((o: any, i: number) => (
          <div key={i} className="row">
            <input value={o.v} onChange={(e) => setOc(i, "v", e.target.value)} placeholder="80%" className="sm" />
            <input value={o.l} onChange={(e) => setOc(i, "l", e.target.value)} placeholder="faster processing" />
            <button type="button" className="link danger" onClick={() => delOc(i)}>×</button>
          </div>
        ))}
      </div>

      <div className="sections">
        <h3>Hero media (image or video)</h3>
        <div className="media-pick">
          <Preview item={f.hero} />
          <input type="file" accept="image/*,video/*" onChange={heroUp} />
          {f.hero && <button type="button" className="link danger" onClick={() => set("hero", null)}>Remove</button>}
        </div>
      </div>

      <div className="sections">
        <div className="sec-head"><h3>Gallery (images &amp; videos)</h3>
          <label className="btn-sm">+ Upload<input type="file" hidden multiple accept="image/*,video/*" onChange={galleryUp} /></label>
        </div>
        <div className="gallery-grid">
          {f.gallery.map((g: any, i: number) => (
            <div key={i} className="gitem">
              <Preview item={g} />
              <button type="button" className="link danger" onClick={() => delGallery(i)}>Remove</button>
            </div>
          ))}
          {!f.gallery.length && <p className="empty">No gallery media yet.</p>}
        </div>
      </div>
    </form>
  );
}
