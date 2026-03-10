import React, { useState, useEffect } from "react";
import JobCard from "../../components/Jobcard";
import "../../styles/dashboard.css";
import "../../styles/jobs.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function UserDashboard({ showToast }) {
  const raw      = localStorage.getItem("jobnest_user");
  const user     = raw ? JSON.parse(raw) : null;
  const token    = localStorage.getItem("jobnest_token");
  const userName = user?.user_metadata?.full_name || user?.email || "User";
  const userEmail = user?.email || "";

  const [activeTab, setActiveTab] = useState("browse");
  const [jobs, setJobs]           = useState([]);
  const [applied, setApplied]     = useState([]);
  const [profile, setProfile]     = useState({ skills: "", experience: "", summary: "" });
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  // ✅ Fetch real jobs from backend
  useEffect(() => {
    fetch(`${API}/jobs`)
      .then(r => r.json())
      .then(data => { setJobs(data.jobs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Fetch real applications from backend
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/applications/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setApplied(data.applications || []))
      .catch(() => {});
  }, [token]);

  const filtered = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  // ✅ Save application to real database
  const handleApply = async (job) => {
    const alreadyApplied = applied.find(a => a.job_id === job.id);
    if (alreadyApplied) {
      showToast && showToast("You already applied to this job!");
      return;
    }

    try {
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ job_id: job.id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Refresh applications
      const appsRes = await fetch(`${API}/applications/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appsData = await appsRes.json();
      setApplied(appsData.applications || []);

      showToast && showToast(`Applied to ${job.title} at ${job.company}! ✅`);
      setActiveTab("applications");
    } catch (err) {
      showToast && showToast(`Failed: ${err.message}`);
    }
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
          <div className="avatar">{userName[0].toUpperCase()}</div>
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
            <div className="stat-num">{applied.filter(a => a.status === "Shortlisted").length}</div>
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
              <input className="form-input" placeholder="🔍 Search jobs, skills or companies..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: "400px" }} />
            </div>
            {loading ? <p>Loading jobs...</p> : filtered.length === 0 ? <p>No jobs found.</p> : (
              <div className="job-grid">
                {filtered.map(job => (
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
                  <tr><th>Job Title</th><th>Company</th><th>Applied On</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {applied.map(app => (
                    <tr key={app.id}>
                      <td><strong>{app.jobs?.title || "—"}</strong></td>
                      <td>{app.jobs?.company || "—"}</td>
                      <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                      <td><span className="badge-blue">{app.status}</span></td>
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
                <input className="form-input" placeholder="React, Python, SQL..."
                  value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Experience</label>
                <input className="form-input" placeholder="e.g. 2 years"
                  value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Resume Summary</label>
                <textarea className="form-textarea" placeholder="Write a brief summary..."
                  value={profile.summary} onChange={(e) => setProfile({ ...profile, summary: e.target.value })} />
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