import React from "react";
import "./admin-panel.css";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { BsLayoutSidebarInset } from "react-icons/bs";
function AdminPanel() {
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
}

export default AdminPanel;
