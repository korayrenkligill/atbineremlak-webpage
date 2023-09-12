import { Link } from "react-router-dom";
import "./page404.css";
import React from "react";

function Page404() {
  return (
    <div className="Page404">
      <h1>404</h1>
      <p>Aradığınız sayfa bulunamadı</p>
      <Link to="/ana-sayfa">Ana sayfaya dön</Link>
    </div>
  );
}

export default Page404;
