import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import { signupUser, saveSession } from "../services/auth";

export default function Signup() {
  const navigate              = useNavigate();
  const [role, setRole]       = useState("seeker");
  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "", company: "" });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field, val) => { setForm((p) => ({ ...p, [field]: val })); setError(""); };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim())                           { setError("Full name is required."); return; }
    if (!form.email.includes("@"))                   { setError("Enter a valid email address."); return; }
    if (form.password.length < 6)                    { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm)              { setError("Passwords do not match."); return; }
    if (role === "employer" && !form.company.trim()) { setError("Company name is required for employers."); return; }

    setLoading(true);
    try {
      const data = await signupUser(form.email.trim(), form.password, form.name.trim(), role);
      if (data.token && data.user) {
        saveSession(data.token, data.user);
        navigate(role === "seeker" ? "/user/dashboard" : "/recruiter/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Only Job Seeker and Employer — Admin cannot self-register
  const ROLE_CONFIG = {
    seeker:   { label: "Job Seeker", icon: "👤", desc: "Browse and apply to jobs" },
    employer: { label: "Employer",   icon: "🏢", desc: "Post jobs and hire talent" },
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">JobNest</div>
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Choose your role to get started</p>

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

        <div className="auth-hint">
          {ROLE_CONFIG[role].icon} Signing up as <strong>{ROLE_CONFIG[role].label}</strong> — {ROLE_CONFIG[role].desc}
        </div>

        <form onSubmit={handleSignup} autoComplete="off">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Arjun Sharma" value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="off" required />
            </div>
          </div>

          {role === "employer" && (
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input className="form-input" placeholder="e.g. Nexaflow Inc." value={form.company} onChange={(e) => set("company", e.target.value)} required />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input className="form-input" type={showPw ? "text" : "password"}
                placeholder="Min 6 characters" value={form.password}
                onChange={(e) => set("password", e.target.value)}
                autoComplete="new-password" required style={{ paddingRight: "44px" }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#94a3b8" }}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" placeholder="Repeat your password"
              value={form.confirm} onChange={(e) => set("confirm", e.target.value)}
              autoComplete="new-password" required />
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : `Create ${ROLE_CONFIG[role].label} Account →`}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}