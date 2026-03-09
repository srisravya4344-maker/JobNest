import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage        from "./pages/LandingPage";
import Login              from "./pages/Login";
import Signup             from "./pages/Signup";
import UserDashboard      from "./pages/user/userDashboard";
import RecruiterDashboard from "./pages/recruiter/recruiterDashboard";
import PostJob            from "./pages/recruiter/PostJob";
import AdminDashboard     from "./pages/admin/adminDashboard";
import ProtectedRoute     from "./components/ProtectedRoute";
import RoleRedirect       from "./components/RoleRedirect";

function App() {
  return (
    <Routes>
      <Route path="/"          element={<LandingPage />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/signup"    element={<Signup />} />
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* ✅ FIX: role must match what Supabase stores in user_metadata.role */}
      <Route path="/user/dashboard"
        element={<ProtectedRoute role="seeker"><UserDashboard /></ProtectedRoute>}
      />

      <Route path="/recruiter/dashboard"
        element={<ProtectedRoute role="employer"><RecruiterDashboard /></ProtectedRoute>}
      />
      <Route path="/recruiter/post-job"
        element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>}
      />

      <Route path="/admin/dashboard"
        element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;