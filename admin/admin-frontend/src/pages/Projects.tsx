import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Projects() {
  const [rows, setRows] = useState<any[]>([]);
  const load = () => api("/projects").then(setRows).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  async function del(id: number) {
    if (!confirm("Delete this case study?")) return;
    await api(`/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <header className="page-head">
        <h1>Portfolio</h1>
        <Link to="/projects/new" className="btn">+ New case study</Link>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Client</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td><Link to={`/projects/${p.id}`}>{p.name}</Link></td>
              <td>{p.client}</td>
              <td>{p.category}</td>
              <td><span className={`tag ${p.status}`}>{p.status}</span></td>
              <td className="right"><button className="link danger" onClick={() => del(p.id)}>Delete</button></td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={5} className="empty">No case studies yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
