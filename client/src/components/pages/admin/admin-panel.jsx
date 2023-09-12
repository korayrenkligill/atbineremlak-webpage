import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import LoginPanel from "./login-panel/login-panel";
import "./admin-panel.css";
import { BACKEND_URL } from "../../elements/config";
import axios from "axios";
function AdminPanel({ user, setUser }) {
  const [loading, setLoading] = useState(true);
  const [realEstateReqCount, setRealEstateReqCount] = useState(0);
  const [carReqCount, setCarReqCount] = useState(0);

  const getRealEstateReqCount = () => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/real-estates/requests/count`)
      .then((response) => {
        let realEstatesListCount = response.data;
        setRealEstateReqCount(realEstatesListCount);
      })
      .then(() => {
        setLoading(false);
      });
  };
  const getCarReqCount = () => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/cars/requests/count`)
      .then((response) => {
        let carsListCount = response.data;
        setCarReqCount(carsListCount);
      })
      .then(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    document.title = "Atbiner Emlak : Yönetim Paneli";
    getRealEstateReqCount();
    getCarReqCount();
  }, []);
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
          <Sidebar
            realEstateReqCount={realEstateReqCount}
            carReqCount={carReqCount}
          />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  else return <LoginPanel user={user} setUser={setUser} />;
}

export default AdminPanel;
