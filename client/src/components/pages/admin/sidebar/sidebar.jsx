import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { TbHomeSearch, TbHomePlus, TbHomeDot } from "react-icons/tb";
import {
  BiCar,
  BiDownArrow,
  BiUpArrow,
  BiColorFill,
  BiMenu,
} from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
import { IoListCircleOutline } from "react-icons/io5";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function Sidebar({ realEstateReqCount, carReqCount }) {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    if (getWindowSize().innerWidth <= 768) {
      setIsOpen(false);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div className="admin-page-sidebar">
      <h1
        className="header"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Sayfalar <GiClick className="icon" />
      </h1>
      <div className={`links ${isOpen && "open"}`}>
        <h2 className="header">Konut</h2>
        <NavLink
          to="/admin/konutlar/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <TbHomeSearch className="icon" /> Konut İlan Listesi
        </NavLink>
        <NavLink
          to="/admin/konut/ekle/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <TbHomePlus className="icon" /> Konut İlanı Ekle
        </NavLink>
        <NavLink
          to="/admin/konut/ilan-istekleri/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <TbHomeDot className="icon" /> Konut İlanı İstekleri
          {realEstateReqCount > 0 && <span className="notification"></span>}
        </NavLink>
        <h2 className="header">Otomobil</h2>
        <NavLink
          to="/admin/otomobiller/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <BiCar className="icon" /> Otomobil İlan Listesi
        </NavLink>
        <NavLink
          to="/admin/otomobil/ekle/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <AiOutlinePlus className="icon" /> Otomobil İlanı Ekle
        </NavLink>
        <NavLink
          to="/admin/otomobil/ilan-istekleri/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <IoListCircleOutline className="icon" /> Otomobil İlanı İstekleri
          {carReqCount > 0 && <span className="notification"></span>}
        </NavLink>
        <h2 className="header">İletişim</h2>
        <NavLink
          to="/admin/iletisim/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <BsPhoneVibrate className="icon" /> İletişim İstekleri
        </NavLink>
        <h2 className="header">Kullanıcı</h2>
        <NavLink
          to="/admin/kullanıcılar/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <FiUsers className="icon" /> Kullanıcı Listesi
        </NavLink>
        <NavLink
          to="/admin/kullanıcı/ekle/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <FiUserPlus className="icon" /> Kullanıcı Ekle
        </NavLink>

        <h2 className="header">Tadilat</h2>
        <NavLink
          to="/admin/tadilat/ekle/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <VscTools className="icon" /> Tadilat Ekle
        </NavLink>
        <h2 className="header">Ayarlar</h2>
        <NavLink
          to="/admin/ayarlar/renk/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <BiColorFill className="icon" /> Tema Ayarı
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
