import React, { useState, useEffect } from "react";
import JobCard from "../../components/Jobcard";
import "../../styles/dashboard.css";
import "../../styles/jobs.css";

export default function RecruiterDashboard({ showToast }) {
  const raw      = localStorage.getItem("jobnest_user");
  const user     = raw ? JSON.parse(raw) : null;
  const userName = user?.user_metadata?.full_name || user?.email || "Employer";

  const [activeTab, setActiveTab] = useState("browse");
  const [applied, setApplied]     = useState([]);
  const [jobs, setJobs]           = useState([]);
  const [search, setSearch]       = useState("");
  const [loading, setLoading]     = useState(true);

  // Fetch real jobs from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((r) => r.json())
      .then((data) => { setJobs(data.jobs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

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
        <span className="dash-title">🏢 Employer Dashboard</span>
        <div className="dash-user">
          <div className="avatar recruiter">{userName[0].toUpperCase()}</div>
          <span>{userName}</span>
          <button onClick={handleLogout}
            style={{ marginLeft: "12px", padding: "6px 14px", background: "none", border: "1px solid #fecaca", color: "#ef4444", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
            Logout
          </button>
        </div>
      </div>

      <div className="dash-content">
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-num">{jobs.length}</div>
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
            <div style={{ marginBottom: "20px" }}>
              <input
                className="form-input"
                placeholder="🔍 Search jobs, skills or companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: "400px" }}
              />
            </div>
            {loading ? (
              <p>Loading jobs...</p>
            ) : filtered.length === 0 ? (
              <p>No jobs found.</p>
            ) : (
              <div className="job-grid">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
              </div>
            )}
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
                <input className="form-input" defaultValue={user?.email} />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input className="form-input" placeholder="Your company name" />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" placeholder="e.g. Hyderabad" />
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