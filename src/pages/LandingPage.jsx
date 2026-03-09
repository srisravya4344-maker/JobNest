import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/Jobcard";
import "../styles/jobs.css";

const sampleJobs = [
  { id: 1,
    title: "Frontend Developer",
    company: "TechCorp", 
    location: "Bangalore",
    type: "Full-time",
    salary: "₹8-12 LPA", 
    skills: ["React", "CSS", "JS"],
    posted: "2 days ago",
    logo: "TC" 
  },
  { id: 2,
    title: "Data Analyst",
    company: "DataVision",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹6-10 LPA", 
    skills: ["Python", "SQL", "Excel"],
    posted: "1 day ago",
    logo: "DV" 
  },
  { id: 3,
    title: "UI/UX Designer",
    company: "CreativeHub",
    location: "Remote",
    type: "Contract",  
    salary: "₹5-8 LPA",
    skills: ["Figma", "Sketch", "XD"],
    posted: "3 days ago",
    logo: "CH"
  },
  { id: 4,
    title: "Backend Engineer",
    company: "CloudBase",
    location: "Mumbai",
    type: "Full-time",
    salary: "₹10-18 LPA",
    skills: ["Node.js", "AWS", "MongoDB"],
    posted: "Today",
    logo: "CB" 
  },
  { id: 5,
    title: "Product Manager",
    company: "StartupX",
    location: "Pune",
    type: "Full-time", 
    salary: "₹12-20 LPA",
    skills: ["Agile", "Roadmapping", "Analytics"],
    posted: "5 hours ago",
    logo: "SX" 
  },
  { id: 6,
    title: "DevOps Engineer",
    company: "InfraNet",
    location: "Chennai",
    type: "Full-time",
    salary: "₹9-15 LPA", 
    skills: ["Docker", "Kubernetes", "CI/CD"],
    posted: "1 week ago",
    logo: "IN" 
  },
  { id: 7, 
    title: "Full Stack Engineer",
    company: "Infotech",
    location: "Pune",
    type: "Part-time",
    salary: "₹10-15 LPA", 
    skills: ["Docker", "Kubernetes", "CI/CD"],
    posted: "2 weeks ago",
    logo: "IT" 
  },
  { id: 8,
    title: "Java Developer",
    company: "Qualminds",
    location: "Noida",
    type: "Full-time",
    salary: "₹9-20 LPA",
    skills: ["Exception Handling", "Multi Threading", "Java"],
    posted: "2 days ago",
    logo: "QM" 
  },
  { id: 9,
    title: ".NET Engineer",
    company: "Quick Start",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹15 LPA",
    skills: ["ASP.NET", "C#", "OOP"],
    posted: "1 week ago",
    logo: "QS" 
  },
  { id: 10,
    title: "C# Engineer",
    company: "Qualminds",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹25 LPA",
    skills: ["ASP.NET", "C#", "OOP"],
    posted: "2 days ago",
    logo: "QM" 
  },
  { id: 11,
    title: "Python Developer",
    company: "TechCorp",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹8-12 LPA",
    skills: ["Python", "Django", "Flask"],
    posted: "3 days ago", 
    logo: "TC" 
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const raw  = localStorage.getItem("jobnest_user");
  const user = raw ? JSON.parse(raw) : null;

  const filtered = sampleJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleApply = () => {
    if (user) {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jobnest_user");
    navigate("/");
  };

  return (
    <div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 32px", background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#6366f1", letterSpacing: "-0.02em" }}>
          JobNest 
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {user ? (
            <>
              <span style={{ fontSize: "13px", color: "#64748b" }}>
                👋 {user.name}
              </span>
              <button
                onClick={() => navigate("/dashboard")}
                style={{ padding: "8px 18px",
                background: "#6366f1", 
                color: "#fff", 
                border: "none", 
                borderRadius: "8px", 
                fontWeight: 600, 
                fontSize: "13px", 
                cursor: "pointer" }}
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                style={{ padding: "8px 16px", 
                background: "none",
                color: "#ef4444",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px", 
                cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{ padding: "8px 20px",
                background: "none",
                color: "#6366f1",
                border: "1.5px solid #6366f1",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px", 
                cursor: "pointer" }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                style={{ padding: "8px 20px",
                background: "#6366f1", 
                color: "#fff", 
                border: "none", 
                borderRadius: "8px", 
                fontWeight: 700, 
                fontSize: "13px", 
                cursor: "pointer" }}
              >
                Sign Up Free →
              </button>
            </>
          )}
        </div>
      </div>

      <div className="hero">
        <h1 className="hero-title">
          Find Your Dream Job on <span>JobNest</span>
        </h1>
        <p className="hero-subtitle">
          Connect with top companies. Apply smarter. Get hired faster.
        </p>

        <div className="hero-search">
          <input
            className="search-input"
            placeholder="Search jobs, skills or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">🔍 Search</button>
        </div>

        <div className="hero-badges">
          {["6,000+ Jobs", "500+ Companies", "AI JD Matching", "Instant Apply"].map((b) => (
            <span key={b} className="hero-badge">{b}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">🔥 Latest Job Openings</h2>
        <p className="section-sub">
          Explore opportunities from top companies — updated daily
        </p>

        {filtered.length > 0 ? (
          <div className="job-grid">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        ) : (
          <p className="no-results">
            No jobs found for "<strong>{search}</strong>". Try a different search!
          </p>
        )}
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Are you a Recruiter?</h2>
        <p className="cta-sub">
          Post jobs, find top talent, and manage your pipeline — all in one place.
        </p>
        <button className="cta-btn" onClick={() => navigate("/signup")}>
          Post a Job for Free →
        </button>
      </div>

      <div className="footer">
        © 2026 JobNest Bot — Built with ❤️ | All rights reserved
      </div>

    </div>
  );
}
