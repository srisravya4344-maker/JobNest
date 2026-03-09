import React, { useState } from "react";
import "../../styles/dashboard.css";

// This component is used as a model/inline form when applying to a job
export default function ApplyJob({ job, onClose, onSubmit }) {
  const [form, setForm] = useState({ coverLetter: "", resumeLink: "" });

  const handleSubmit = () => {
    if (!form.resumeLink) {
      alert("Please provide your resume link.");
      return;
    }
    onSubmit(job, form);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "36px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontWeight: 800, marginBottom: "6px", color: "#0f172a" }}>
          Apply to {job.title}
        </h2>
        <p style={{ color: "#4f8ef7", fontWeight: 600, marginBottom: "24px" }}>
          {job.company} — {job.location}
        </p>

        <div className="form-group">
          <label className="form-label">Resume / Portfolio Link *</label>
          <input
            className="form-input"
            placeholder="https://yourresume.com or Google Drive link"
            value={form.resumeLink}
            onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cover Letter (optional)</label>
          <textarea
            className="form-textarea"
            placeholder="Why are you a good fit for this role?"
            value={form.coverLetter}
            onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-primary" onClick={handleSubmit}>
            🚀 Submit Application
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}