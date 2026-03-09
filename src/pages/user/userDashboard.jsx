import React, { useState } from "react";
import JobCard from "../../components/Jobcard";
import "../../styles/dashboard.css";
import "../../styles/jobs.css";

const sampleJobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp",    location: "Bangalore", type: "Full-time", salary: "₹8-12 LPA",  skills: ["React", "CSS", "JS"],         posted: "2 days ago", logo: "TC" },
  { id: 2, title: "Data Analyst",        company: "DataVision",  location: "Hyderabad", type: "Full-time", salary: "₹6-10 LPA",  skills: ["Python", "SQL", "Excel"],     posted: "1 day ago",  logo: "DV" },
  { id: 3, title: "UI/UX Designer",      company: "CreativeHub", location: "Remote",    type: "Contract",  salary: "₹5-8 LPA",   skills: ["Figma", "Sketch", "XD"],     posted: "3 days ago", logo: "CH" },
  { id: 4, title: "Backend Engineer",    company: "CloudBase",   location: "Mumbai",    type: "Full-time", salary: "₹10-18 LPA", skills: ["Node.js", "AWS", "MongoDB"],  posted: "Today",      logo: "CB" },
];

export default function UserDashboard({ showToast }) {
  const raw  = localStorage.getItem("jobnest_user");
  const user = raw ? JSON.parse(raw) : null;

  // ✅ FIX: Supabase stores name in user_metadata.full_name, not user.name
  const userName  = user?.user_metadata?.full_name || user?.email || "User";
  const userEmail = user?.email || "";

  const [activeTab, setActiveTab] = useState("browse");
  const [applied, setApplied]     = useState([]);
  const [profile, setProfile]     = useState({ skills: "", experience: "", summary: "" });

  const handleApply = (job) => {
    if (applied.find((j) => j.id === job.id)) {
      showToast && showToast("You already applied to this job!");
      return;
    }
    setApplied([...applied, { ...job, status: "Under Review", appliedOn: "Today" }]);
    showToast && showToast(`Applied to ${job.title} at ${job.company}! ✅`);
    setActiveTab("applications");
  };

  const handleLogout = () => {
    localStorage.removeItem("jobnest_user");
    localStorage.removeItem("jobnest_token");
    window.location.href = "/login";
  };

  return (
    <div className="dash-page">

      <div className="dash-header">
        <span className="dash-title">👤 User Dashboard</span>
        <div className="dash-user">
          {/* ✅ FIX: use userName which is safely derived */}
          <div className="avatar">{userName[0].toUpperCase()}</div>
          <span>{userName}</span>
          <button
            onClick={handleLogout}
            style={{ marginLeft: "12px", padding: "6px 14px", background: "none", border: "1px solid #fecaca", color: "#ef4444", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="dash-content">

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-num">{sampleJobs.length}</div>
            <div className="stat-label">Jobs Available</div>
          </div>
          <div className="stat-card green">
            <div className="stat-num">{applied.length}</div>
            <div className="stat-label">Applied Jobs</div>
          </div>
          <div className="stat-card yellow">
            <div className="stat-num">{applied.filter((j) => j.status === "Shortlisted").length}</div>
            <div className="stat-label">Shortlisted</div>
          </div>
        </div>

        <div className="tab-bar">
          <button className={`tab-btn ${activeTab === "browse" ? "active" : ""}`} onClick={() => setActiveTab("browse")}>
            🔍 Browse Jobs
          </button>
          <button className={`tab-btn ${activeTab === "applications" ? "active" : ""}`} onClick={() => setActiveTab("applications")}>
            📋 My Applications ({applied.length})
          </button>
          <button className={`tab-btn ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            ⚙️ Profile
          </button>
        </div>

        {activeTab === "browse" && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px", color: "#0f172a" }}>
              🔥 Jobs Matching Your Profile
            </h2>
            <div className="job-grid">
              {sampleJobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApply} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="panel">
            <h2 className="panel-title">📋 My Applications</h2>
            {applied.length === 0 ? (
              <div className="empty-state">
                <p>No applications yet. Browse jobs and apply!</p>
                <button className="btn-primary" onClick={() => setActiveTab("browse")}>Browse Jobs</button>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Applied On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applied.map((job) => (
                    <tr key={job.id}>
                      <td><strong>{job.title}</strong></td>
                      <td>{job.company}</td>
                      <td>{job.appliedOn}</td>
                      <td><span className="badge-blue">{job.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="panel">
            <h2 className="panel-title">⚙️ My Profile</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" defaultValue={userName} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" defaultValue={userEmail} />
              </div>
              <div className="form-group">
                <label className="form-label">Skills (comma separated)</label>
                <input
                  className="form-input"
                  placeholder="React, Python, SQL..."
                  value={profile.skills}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Experience</label>
                <input
                  className="form-input"
                  placeholder="e.g. 2 years"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Resume Summary</label>
                <textarea
                  className="form-textarea"
                  placeholder="Write a brief summary about yourself..."
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                />
              </div>
            </div>
            <button className="btn-primary" onClick={() => showToast && showToast("Profile updated! ✅")}>
              Save Profile
            </button>
          </div>
        )}

      </div>
    </div>
  );
}