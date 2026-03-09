import React from "react";

const navStyle = {
  navbar: {
    background: "#0f172a",
    padding: "0 32px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: "#4f8ef7",
    fontWeight: 800,
    fontSize: "22px",
    letterSpacing: "-0.5px",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  btnOutline: {
    background: "transparent",
    border: "1px solid #4f8ef7",
    color: "#4f8ef7",
    padding: "7px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
  },
  btnFilled: {
    background: "#4f8ef7",
    border: "none",
    color: "#fff",
    padding: "7px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
  },
  userInfo: {
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default function Navbar({ setPage, user, onLogout }) {
  return (
    <nav style={navStyle.navbar}>
      <div style={navStyle.logo} onClick={() => setPage("landing")}>
        🪺 JobNest
      </div>

      <div style={navStyle.links}>
        {!user ? (
          <>
            <button style={navStyle.btnOutline} onClick={() => setPage("login")}>
              Login
            </button>
            <button style={navStyle.btnFilled} onClick={() => setPage("signup")}>
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span style={navStyle.userInfo}>
              Hello,{" "}
              <strong style={{ color: "#fff" }}>{user.name}</strong>{" "}
              <span style={{ color: "#4f8ef7" }}>({user.role})</span>
            </span>
            <button style={navStyle.btnOutline} onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}