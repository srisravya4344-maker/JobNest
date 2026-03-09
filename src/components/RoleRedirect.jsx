import React, { useEffect } from "react";

// Automatically redirect the user to correct dashboard based on role they selected
export default function RoleRedirect({ user, setPage }) {
  useEffect(() => {
    if (!user) {
      setPage("login");
      return;
    }
    if (user.role === "admin") setPage("admin-dash");
    else if (user.role === "recruiter") setPage("recruiter-dash");
    else setPage("user-dash");
  }, [user, setPage]);

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <p style={{ color: "#64748b" }}>Redirecting...</p>
    </div>
  );
}
