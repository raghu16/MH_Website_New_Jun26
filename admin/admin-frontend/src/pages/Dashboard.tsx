import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Dashboard() {
  const [s, setS] = useState({ posts: 0, projects: 0, media: 0 });

  useEffect(() => {
    Promise.all([api("/posts"), api("/projects"), api("/media")])
      .then(([p, pr, m]) => setS({ posts: p.length, projects: pr.length, media: m.length }))
      .catch(() => {});
  }, []);

  return (
    <div>
      <header className="page-head">
        <h1>Dashboard</h1>
      </header>
      <div className="cards">
        <Link to="/posts" className="stat">
          <div className="n">{s.posts}</div>
          <div className="l">Blog posts</div>
        </Link>
        <Link to="/projects" className="stat">
          <div className="n">{s.projects}</div>
          <div className="l">Portfolio projects</div>
        </Link>
        <Link to="/media" className="stat">
          <div className="n">{s.media}</div>
          <div className="l">Media files</div>
        </Link>
      </div>
      <div className="quick">
        <Link to="/posts/new" className="btn">+ New blog post</Link>
        <Link to="/projects/new" className="btn ghost">+ New case study</Link>
      </div>
    </div>
  );
}
