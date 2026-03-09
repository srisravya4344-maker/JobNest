import React, { useState } from "react";
import "../../styles/dashboard.css";
import "../../styles/admin.css";

const sampleActivities = [
  { user: "Rahul M.", role: "User", action: "Applied to Frontend Developer at TechCorp", time: "10 min ago" },
  { user: "Priya S.", role: "Recruiter", action: "Posted new job: Data Analyst at DataVision", time: "30 min ago" },
  { user: "Ankit K.", role: "User", action: "Signed up as new user", time: "1 hr ago" },
  { user: "Neha R.", role: "Recruiter", action: "Updated job: UI/UX Designer", time: "2 hrs ago" },
  { user: "Vikram T.", role: "User", action: "Applied to Backend Engineer at CloudBase", time: "3 hrs ago" },
  { user: "Sneha P.", role: "Recruiter", action: "Posted job: DevOps Engineer at InfraNet", time: "4 hrs ago" },
  { user: "Arun L.", role: "User", action: "Updated profile and uploaded resume", time: "5 hrs ago" },
];

const sampleUsers = [
  { name: "Rahul M.", email: "madhu@mail.com", role: "User", status: "Active" },
  { name: "Priya S.", email: "saiRamana@corp.com", role: "Recruiter", status: "Active" },
  { name: "Ankit K.", email: "Trishika@mail.com", role: "User", status: "Active" },
  { name: "Neha R.", email: "bhavana@hire.com", role: "Recruiter", status: "Active" },
  { name: "Vikram T.", email: "sravya@mail.com", role: "User", status: "Active" },
];

export default function AdminDashboard({ user, setPage }) {
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState(sampleUsers);

  const filteredActivities =
    filter === "all"
      ? sampleActivities
      : sampleActivities.filter((a) => a.role.toLowerCase() === filter);

  const handleSuspend = (email) => {
    setUsers(
      users.map((u) =>
        u.email === email
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
  };

  return (
    <div className="dash-page">
      <div className="dash-header">
        <span className="dash-title">🛡️ Admin Dashboard</span>
        <div className="dash-user">
          <div className="avatar admin">A</div>
          <span>Admin</span>
        </div>
      </div>

      <div className="dash-content">
  
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-num">248</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card green">
            <div className="stat-num">34</div>
            <div className="stat-label">Active Recruiters</div>
          </div>
          <div className="stat-card yellow">
            <div className="stat-num">120</div>
            <div className="stat-label">Jobs Posted</div>
          </div>
          <div className="stat-card red">
            <div className="stat-num">89</div>
            <div className="stat-label">Applications Today</div>
          </div>
        </div>

        <div className="panel">
          <div className="admin-panel-header">
            <h2 className="panel-title">📡 Live Activity Feed</h2>
            <div className="filter-row">
              {["all", "user", "recruiter"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : f === "user" ? "Users" : "Recruiters"}
                </button>
              ))}
            </div>
          </div>

          {filteredActivities.map((activity, i) => (
            <div key={i} className="activity-item">
              <div
                className={`activity-dot ${
                  activity.role === "Recruiter" ? "recruiter" : ""
                }`}
              />
              <div className="activity-text">
                <span
                  className="role-pill"
                  style={{
                    background:
                      activity.role === "Recruiter"
                        ? "rgba(16,185,129,0.15)"
                        : "rgba(79,142,247,0.15)",
                    color:
                      activity.role === "Recruiter" ? "#10b981" : "#4f8ef7",
                  }}
                >
                  {activity.role}
                </span>
                <strong>{activity.user}</strong> — {activity.action}
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <p style={{ color: "#64748b", textAlign: "center", padding: "24px" }}>
              No activity found for this filter.
            </p>
          )}
        </div>

        <div className="panel">
          <h2 className="panel-title">👥 Registered Users</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={
                        u.role === "Recruiter"
                          ? "role-badge-recruiter"
                          : "role-badge-user"
                      }
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: u.status === "Active" ? "#10b981" : "#ef4444",
                        fontWeight: 700,
                      }}
                    >
                      ● {u.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      style={{
                        background:
                          u.status === "Active" ? "#ef4444" : "#64748b",
                      }}
                      onClick={() => handleSuspend(u.email)}
                    >
                      {u.status === "Active" ? "Suspend" : "Restore"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
