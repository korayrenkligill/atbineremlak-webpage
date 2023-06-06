import React, { useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import LoginPanel from "./login-panel/login-panel";
import "./admin-panel.css";
function AdminPanel({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  if (loading)
    return (
      <div className="loading-screen">
        <PuffLoader color="#008cff" />
      </div>
    );
  else if (!loading && user)
    return (
      <div className="admin-page">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  else return <LoginPanel user={user} setUser={setUser} />;
}

export default AdminPanel;
