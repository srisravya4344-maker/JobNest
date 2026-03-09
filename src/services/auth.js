const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ✅ FIX: Added `role` parameter so it gets sent to the backend
export async function loginUser(email, password, role) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }), // ✅ role added here
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data; // { token, user }
}

export async function signupUser(email, password, full_name, role) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/auth/logout`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Logout failed");
  return data;
}

export function saveSession(token, user) {
  localStorage.setItem("jobnest_token", token);
  localStorage.setItem("jobnest_user", JSON.stringify(user));
}

export function getSession() {
  const token = localStorage.getItem("jobnest_token");
  const user  = JSON.parse(localStorage.getItem("jobnest_user") || "null");
  return { token, user };
}

export function clearSession() {
  localStorage.removeItem("jobnest_token");
  localStorage.removeItem("jobnest_user");
}