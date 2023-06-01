import React from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import MainPage from "./components/pages/main-page/main-page";
import Emlak from "./components/pages/emlak/emlak";
import Otomobil from "./components/pages/otomobil/otomobil";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/pages/admin/admin-panel";
import Dashboard from "./components/pages/admin/dashboard/dashboard";
import RealEstateList from "./components/pages/admin/real-estate/real-estate-list/real-estate-list";
import RealEstateAdd from "./components/pages/admin/real-estate/real-estate-add/real-estate-add";

//CSS
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/emlak" element={<Emlak />} />
        <Route path="/otomobil" element={<Otomobil />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/admin/konutlar/" element={<RealEstateList />} />
          <Route path="/admin/konut/ekle/" element={<RealEstateAdd />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
