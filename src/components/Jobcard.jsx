import React, { useState } from "react";
import "../styles/jobs.css";

export default function JobCard({ job, onApply, showApply = true }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="job-card"
      style={
        hovered
          ? {
              boxShadow: "0 8px 32px rgba(79,142,247,0.18)",
              borderColor: "#4f8ef7",
              transform: "translateY(-2px)",
            }
          : {}
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top: Logo + Title */}
      <div className="job-top">
        <div className="job-logo">{job.logo}</div>
        <div>
          <p className="job-title">{job.title}</p>
          <p className="job-company">{job.company}</p>
        </div>
      </div>
      
      <div className="job-meta">
        <span className="job-meta-item">📍 {job.location}</span>
        <span className="job-meta-item">💼 {job.type}</span>
        <span className="job-meta-item">🕒 {job.posted}</span>
      </div>

      <div className="job-skills">
        {job.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="job-footer">
        <span className="job-salary">{job.salary}</span>
        {showApply && (
          <button className="apply-btn" onClick={() => onApply(job)}>
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
