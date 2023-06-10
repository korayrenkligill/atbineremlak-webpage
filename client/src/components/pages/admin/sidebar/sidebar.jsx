import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { TbHomeSearch, TbHomePlus, TbHomeDot } from "react-icons/tb";
import { BiCar, BiDownArrow, BiUpArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoListCircleOutline } from "react-icons/io5";
import { FiUsers, FiUserPlus } from "react-icons/fi";

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
        Sayfalar{" "}
        {isOpen ? (
          <BiUpArrow className="icon" />
        ) : (
          <BiDownArrow className="icon" />
        )}
      </h1>
      <div className={`links ${isOpen && "open"}`}>
        <h2 className="header">İstatistikler</h2>
        <NavLink
          to="/admin/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <MdSpaceDashboard className="icon" /> Analizler
        </NavLink>
        <NavLink
          to="/admin/graphs/"
          onClick={() => {
            if (windowSize.innerWidth <= 768) {
              setIsOpen(false);
            }
          }}
        >
          <SlGraph className="icon" /> Grafikler
        </NavLink>
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
      </div>
    </div>
  );
}

export default Sidebar;
