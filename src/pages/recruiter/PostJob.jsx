import React, { useState } from "react";
import "../../styles/dashboard.css";

export default function PostJob({ onPost, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    skills: "",
    description: "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handlePost = () => {
    if (!form.title || !form.company || !form.description) {
      alert("Please fill in Job Title, Company, and Description.");
      return;
    }

    const newJob = {
      id: Date.now(),
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      logo: form.company.slice(0, 2).toUpperCase(),
      posted: "Just now",
      applications: 0,
    };

    onPost(newJob);

    setForm({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      skills: "",
      description: "",
    });
  };

  return (
    <div className="panel">
      <h2 className="panel-title">➕ Post a New Job</h2>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input
            className="form-input"
            placeholder="e.g. Frontend Developer"
            value={form.title}
            onChange={update("title")}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Company Name *</label>
          <input
            className="form-input"
            placeholder="Your company name"
            value={form.company}
            onChange={update("company")}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            className="form-input"
            placeholder="e.g. Hyderabad / Remote"
            value={form.location}
            onChange={update("location")}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Job Type</label>
          <select className="form-input" value={form.type} onChange={update("type")}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Freelance</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Salary Range</label>
          <input
            className="form-input"
            placeholder="e.g. ₹8-12 LPA"
            value={form.salary}
            onChange={update("salary")}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Required Skills (comma separated)</label>
          <input
            className="form-input"
            placeholder="React, Node.js, SQL..."
            value={form.skills}
            onChange={update("skills")}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Job Description (JD) *</label>
          <textarea
            className="form-textarea"
            placeholder="Describe the role, responsibilities, and requirements in detail..."
            value={form.description}
            onChange={update("description")}
            style={{ minHeight: "140px" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button className="btn-primary" onClick={handlePost}>
          🚀 Post Job
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}