import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import PostEdit from "./pages/PostEdit";
import Projects from "./pages/Projects";
import ProjectEdit from "./pages/ProjectEdit";
import Media from "./pages/Media";

function Protected({ children }: any) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="center">Loading…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/new" element={<PostEdit />} />
        <Route path="/posts/:id" element={<PostEdit />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectEdit />} />
        <Route path="/projects/:id" element={<ProjectEdit />} />
        <Route path="/media" element={<Media />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
