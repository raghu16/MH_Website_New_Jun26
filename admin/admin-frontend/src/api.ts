const API = (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";

export const token = () => localStorage.getItem("token");

export async function api(path: string, opts: any = {}) {
  const res = await fetch(`${API}/api${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...(opts.headers || {}),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    if (location.pathname !== "/login") location.href = "/login";
  }
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

export async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/api/media`, {
    method: "POST",
    headers: token() ? { Authorization: `Bearer ${token()}` } : {},
    body: fd,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export const mediaUrl = (u: string) => (!u ? "" : u.startsWith("http") ? u : API + u);
