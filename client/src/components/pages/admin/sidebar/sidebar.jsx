import React from "react";
import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { TbHomeSearch, TbHomePlus, TbHomeDot } from "react-icons/tb";
import { BiCar } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoListCircleOutline } from "react-icons/io5";
import { FiUsers, FiUserPlus } from "react-icons/fi";
function Sidebar() {
  return (
    <div className="admin-page-sidebar">
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
      <NavLink to="/admin/konut/istekleri/">
        <TbHomeDot className="icon" /> Konut İlanı İstekleri
      </NavLink>
      <h2 className="header">Otomobil</h2>
      <NavLink to="/admin/otomobiller/">
        <BiCar className="icon" /> Otomobil İlan Listesi
      </NavLink>
      <NavLink to="/admin/otomobil/ekle/">
        <AiOutlinePlus className="icon" /> Otomobil İlanı Ekle
      </NavLink>
      <NavLink to="/admin/otomobil/istekleri/">
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
  );
}

export default Sidebar;
