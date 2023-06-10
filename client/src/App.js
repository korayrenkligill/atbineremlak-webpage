import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import MainPage from "./components/pages/main-page/main-page";
import Emlak from "./components/pages/emlak/emlak";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/pages/admin/admin-panel";
import Dashboard from "./components/pages/admin/dashboard/dashboard";
import RealEstateList from "./components/pages/admin/real-estate/real-estate-list/real-estate-list";
import RealEstateAdd from "./components/pages/admin/real-estate/real-estate-add/real-estate-add";

//CSS
import "./App.css";
import RealEstateRequests from "./components/pages/admin/real-estate/real-estate-request/real-estate-requests";
import CarAdd from "./components/pages/admin/car/car-add/car-add";
import CarList from "./components/pages/admin/car/car-list/car-list";
import CarRequest from "./components/pages/admin/car/car-request/car-request";
import Admin404 from "./components/pages/admin/404/admin-404";
import UserAdd from "./components/pages/admin/user/user-add/user-add";
import UserList from "./components/pages/admin/user/user-list/user-list";
import { ToastContainer } from "react-toastify";
import UserEdit from "./components/pages/admin/user/user-edit/user-edit";
import RealEstateEdit from "./components/pages/admin/real-estate/real-estate-edit/real-estate-edit";
import CarEdit from "./components/pages/admin/car/car-edit/car-edit";
import IlanVer from "./components/pages/ilan-ver/ilan-ver-main";
import Araba from "./components/pages/araba/araba";
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <div className="notification">
        <ToastContainer />
      </div>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/emlak" element={<Emlak />} />
        <Route path="/otomobil" element={<Araba />} />
        <Route path="/ilan-ver" element={<IlanVer />} />
        <Route
          path="/admin"
          element={<AdminPanel user={user} setUser={setUser} />}
        >
          <Route path="/admin/" element={<Dashboard />} />0
          <Route path="/admin/konutlar/" element={<RealEstateList />} />
          <Route
            path="/admin/konut/ekle/"
            element={<RealEstateAdd user={user} />}
          />
          <Route
            path="/admin/konut/edit/:id"
            element={<RealEstateEdit user={user} />}
          />
          <Route
            path="/admin/konut/ilan-istekleri/"
            element={<RealEstateRequests />}
          />
          <Route path="/admin/otomobiller/" element={<CarList />} />
          <Route
            path="/admin/otomobil/ekle/"
            element={<CarAdd user={user} />}
          />
          <Route
            path="/admin/otomobil/edit/:id"
            element={<CarEdit user={user} />}
          />
          <Route
            path="/admin/otomobil/ilan-istekleri/"
            element={<CarRequest />}
          />
          <Route path="/admin/kullanıcılar" element={<UserList />} />
          <Route path="/admin/kullanıcı/ekle/" element={<UserAdd />} />
          <Route path="/admin/kullanıcı/:id" element={<UserEdit />} />
          <Route path="/admin/*" element={<Admin404 />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
