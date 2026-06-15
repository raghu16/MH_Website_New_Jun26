import { useEffect, useState } from "react";
import { api, uploadFile, mediaUrl } from "../api";

export default function Media() {
  const [rows, setRows] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const load = () => api("/media").then(setRows).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  async function up(e: any) {
    const files = e.target.files;
    if (!files) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) await uploadFile(file as File);
      load();
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  async function del(id: number) {
    if (!confirm("Delete this file?")) return;
    await api(`/media/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <header className="page-head">
        <h1>Media library</h1>
        <label className="btn">
          {busy ? "Uploading…" : "Upload"}
          <input type="file" multiple hidden onChange={up} accept="image/*,video/*,application/pdf" />
        </label>
      </header>
      <div className="media-grid">
        {rows.map((m) => (
          <div key={m.id} className="media-item">
            <div className="media-thumb">
              {(m.mime || "").startsWith("video") ? (
                <video src={mediaUrl(m.url)} muted />
              ) : (m.mime || "").startsWith("image") ? (
                <img src={mediaUrl(m.url)} alt={m.filename} />
              ) : (
                <div className="file-badge">{(m.mime || "file").split("/").pop()}</div>
              )}
            </div>
            <input className="url" readOnly value={mediaUrl(m.url)} onFocus={(e) => e.target.select()} />
            <div className="meta">
              <span>{Math.round((m.size || 0) / 1024)} KB</span>
              <button className="link danger" onClick={() => del(m.id)}>Delete</button>
            </div>
          </div>
        ))}
        {!rows.length && <p className="empty">No media yet — upload images or videos.</p>}
      </div>
    </div>
  );
}
