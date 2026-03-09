import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import { loginUser, saveSession } from "../services/auth";

export default function Login() {
  const navigate                = useNavigate();
  const [role, setRole]         = useState("seeker");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const ROLE_CONFIG = {
    seeker:   { label: "Job Seeker", icon: "👤", path: "/user/dashboard" },
    employer: { label: "Employer",   icon: "🏢", path: "/recruiter/dashboard" },
    admin:    { label: "Admin",      icon: "🛡️", path: "/admin/dashboard" },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email.trim(), password, role);
      saveSession(data.token, data.user);
      navigate(ROLE_CONFIG[role].path);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">JobNest</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your account</p>

        <div className="role-selector">
          {Object.entries(ROLE_CONFIG).map(([key, cfg]) => (
            <button key={key} type="button"
              className={`role-btn ${role === key ? "active" : ""}`}
              onClick={() => { setRole(key); setError(""); }}
            >
              <span className="role-icon">{cfg.icon}</span>
              {cfg.label}
            </button>
          ))}
        </div>

        {/* ✅ FIX: autoComplete="off" prevents browser autofill */}
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="form-input"
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                style={{ paddingRight: "44px" }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#94a3b8" }}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : `Sign in as ${ROLE_CONFIG[role].label} →`}
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account? <Link to="/signup">Create one free</Link>
        </div>
      </div>
    </div>
  );
}