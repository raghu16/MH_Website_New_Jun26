import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Posts() {
  const [rows, setRows] = useState<any[]>([]);
  const load = () => api("/posts").then(setRows).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  async function del(id: number) {
    if (!confirm("Delete this post?")) return;
    await api(`/posts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <header className="page-head">
        <h1>Blog</h1>
        <Link to="/posts/new" className="btn">+ New post</Link>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td>
                <Link to={`/posts/${p.id}`}>{p.title}</Link>
              </td>
              <td>{p.category}</td>
              <td>
                <span className={`tag ${p.status}`}>{p.status}</span>
              </td>
              <td className="right">
                <button className="link danger" onClick={() => del(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={4} className="empty">No posts yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
