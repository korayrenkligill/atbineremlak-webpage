import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin-404.css";
function Admin404() {
  const navigate = useNavigate();
  return (
    <div className="admin-404">
      <p>Ahh üzgünüm aradığın sayfayı bulamadım :(</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Ana sayfaya dön
      </button>
    </div>
  );
}

export default Admin404;
