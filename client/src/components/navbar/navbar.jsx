import React, { useEffect, useState } from "react";
import { IoCall, IoHome } from "react-icons/io5";
import { IoIosMenu, IoIosClose, IoIosMoon } from "react-icons/io";
import { BsFillCarFrontFill, BsFillGridFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import {
  MdRealEstateAgent,
  MdAdminPanelSettings,
  MdWork,
} from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./navbar.css";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
function Navbar({ user, theme, changeTheme }) {
  const navigation = useNavigate();
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [isOpen, setIsOpen] = useState(false);
  const handleNavbarStateChange = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  if (windowSize.innerWidth > 768)
    return (
      <nav className="navbar-pc">
        <Link to="/ana-sayfa" className="navbar-logo">
          <div className="frame">
            <img src="/logo.png" alt="logo" />
          </div>
        </Link>
        <div className="navbar-links">
          <NavLink to="/ana-sayfa">
            <BsFillGridFill className="icon-transform" /> Ana Sayfa
          </NavLink>
          <NavLink to="/">
            <IoHome className="icon-transform" />
            Ev İlanları
          </NavLink>
          <NavLink to="/otomobil">
            <BsFillCarFrontFill className="icon-transform" />
            Araç İlanları
          </NavLink>
          <NavLink to="/tadilat">
            <MdWork className="icon-transform" />
            Tadilat
          </NavLink>
          {user && (
            <NavLink to="/admin/konutlar/">
              <MdAdminPanelSettings className="icon-transform" />
              Yönetim paneli
            </NavLink>
          )}
        </div>
        <div className="contact">
          <div
            className="theme-change-switcher"
            onClick={() => {
              changeTheme(`${theme === "light" ? "dark" : "light"}`);
            }}
          >
            <div
              className="theme-change-switcher-inner"
              style={
                theme === "light"
                  ? { left: "0%" }
                  : { left: "100%", transform: "translateX(-100%)" }
              }
            />
            <IoIosMoon className="moon theme-icon" />
            <HiSun className="sun theme-icon" />
          </div>
          {!user && (
            <Link to="/admin/konutlar/" className="navbar-contact">
              Giriş yap
            </Link>
          )}
          <Link className="navbar-contact" to="/contact">
            <IoCall className="icon-transform" /> İletişime geç
          </Link>
          <Link to="/ilan-ver" className="ilan-ver">
            İlan ver
          </Link>
        </div>
      </nav>
    );
  else
    return (
      <nav className={`navbar-mobile ${isOpen ? "open" : ""}`}>
        <div className="navbar-logo">
          <div className="frame">
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="mobile-input">
            <label htmlFor="mobile-input">
              {isOpen ? <IoIosClose /> : <IoIosMenu />}
            </label>
            <input
              type="checkbox"
              id="mobile-input"
              value={isOpen}
              onChange={handleNavbarStateChange}
            />
          </div>
        </div>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <NavLink
            to="/ana-sayfa"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <BsFillGridFill className="icon-transform" /> Ana Sayfa
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <IoHome className="icon-transform" />
            Konut İlanları
          </NavLink>
          <NavLink
            to="/otomobil"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <BsFillCarFrontFill className="icon-transform" />
            Otomobil İlanları
          </NavLink>
          <NavLink
            to="/tadilat"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <MdWork className="icon-transform" />
            Tadilat
          </NavLink>
          {user ? (
            <NavLink
              to="/admin/konutlar/"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <MdAdminPanelSettings className="icon-transform" /> Yönetim Paneli
            </NavLink>
          ) : (
            <button
              className="navbar-contact"
              onClick={() => {
                navigation("/admin/konutlar/");
                setIsOpen(false);
              }}
            >
              <FaUserCircle className="icon-transform" /> Giriş Yap
            </button>
          )}
          <Link
            className="navbar-contact"
            to="/contact"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <IoCall className="icon-transform" /> İletişime geç
          </Link>
          <a
            className="theme-change-switcher-mobile"
            onClick={() => {
              changeTheme(`${theme === "light" ? "dark" : "light"}`);
            }}
          >
            {theme === "light" ? (
              <HiSun className="sun theme-icon icon-transform" />
            ) : (
              <IoIosMoon className="moon theme-icon icon-transform" />
            )}{" "}
            Tema Değiştir
          </a>
          <Link
            to="/ilan-ver"
            className="ilan-ver"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <MdRealEstateAgent className="icon-transform" />
            İlan ver
          </Link>
        </div>
      </nav>
    );
}

export default Navbar;
