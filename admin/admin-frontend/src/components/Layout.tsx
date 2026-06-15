import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth";

const nav: [string, string][] = [
  ["/", "Dashboard"],
  ["/posts", "Blog"],
  ["/projects", "Portfolio"],
  ["/media", "Media"],
];

export default function Layout() {
  const { logout, user } = useAuth();
  const loc = useLocation();
  const active = (to: string) => (to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to));

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="dot" /> monkhub <em>admin</em>
        </div>
        <nav>
          {nav.map(([to, label]) => (
            <Link key={to} to={to} className={active(to) ? "active" : ""}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="side-foot">
          <div className="who">{user?.email}</div>
          <button className="logout" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
