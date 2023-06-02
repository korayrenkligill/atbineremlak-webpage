import React, { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { TbHomeSearch, TbHomePlus, TbHomeDot } from "react-icons/tb";
import { BiCar, BiDownArrow, BiUpArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoListCircleOutline } from "react-icons/io5";
import { FiUsers, FiUserPlus } from "react-icons/fi";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="admin-page-sidebar">
      <h1
        className="header"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Sayfalar{" "}
        {isOpen ? (
          <BiUpArrow className="icon" />
        ) : (
          <BiDownArrow className="icon" />
        )}
      </h1>
      <div className={`links ${isOpen && "open"}`}>
        <h2 className="header">İstatistikler</h2>
        <NavLink to="/admin/">
          <MdSpaceDashboard className="icon" /> Analizler
        </NavLink>
        <NavLink to="/admin/graphs/">
          <SlGraph className="icon" /> Grafikler
        </NavLink>
        <h2 className="header">Konut</h2>
        <NavLink to="/admin/konutlar/">
          <TbHomeSearch className="icon" /> Konut İlan Listesi
        </NavLink>
        <NavLink to="/admin/konut/ekle/">
          <TbHomePlus className="icon" /> Konut İlanı Ekle
        </NavLink>
        <NavLink to="/admin/konut/ilan-istekleri/">
          <TbHomeDot className="icon" /> Konut İlanı İstekleri
        </NavLink>
        <h2 className="header">Otomobil</h2>
        <NavLink to="/admin/otomobiller/">
          <BiCar className="icon" /> Otomobil İlan Listesi
        </NavLink>
        <NavLink to="/admin/otomobil/ekle/">
          <AiOutlinePlus className="icon" /> Otomobil İlanı Ekle
        </NavLink>
        <NavLink to="/admin/otomobil/ilan-istekleri/">
          <IoListCircleOutline className="icon" /> Otomobil İlanı İstekleri
        </NavLink>
        <h2 className="header">Kullanıcı</h2>
        <NavLink to="/admin/kullanıcılar/">
          <FiUsers className="icon" /> Kullanıcı Listesi
        </NavLink>
        <NavLink to="/admin/kullanıcı/ekle/">
          <FiUserPlus className="icon" /> Kullanıcı Ekle
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
