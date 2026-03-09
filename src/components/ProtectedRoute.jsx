import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const raw  = localStorage.getItem("jobnest_user");
  const user = raw ? JSON.parse(raw) : null;

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ FIX: role is stored in user.user_metadata.role (not user.role)
  const userRole = user.user_metadata?.role;

  // ✅ FIX: redirectMap now uses correct Supabase role names
  const redirectMap = {
    seeker:   "/user/dashboard",
    employer: "/recruiter/dashboard",
    admin:    "/admin/dashboard",
  };

  if (role && userRole !== role) {
    return <Navigate to={redirectMap[userRole] || "/login"} replace />;
  }

  return children;
}