import React, { useEffect, useState } from "react";
import { IoCall, IoHome } from "react-icons/io5";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { BsFillCarFrontFill, BsFillGridFill } from "react-icons/bs";
import { MdRealEstateAgent, MdAdminPanelSettings } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

import "./navbar.css";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
function Navbar({ user }) {
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
        <a href="#" className="navbar-logo">
          <div className="frame">
            <img src="/logo.png" alt="logo" />
          </div>
        </a>
        <div className="navbar-links">
          <NavLink to="/">
            <BsFillGridFill className="icon-transform" /> Ana Sayfa
          </NavLink>
          <NavLink to="/emlak">
            <IoHome className="icon-transform" />
            Ev İlanları
          </NavLink>
          <NavLink to="/otomobil">
            <BsFillCarFrontFill className="icon-transform" />
            Araç İlanları
          </NavLink>
          {user && (
            <NavLink to="/admin">
              <MdAdminPanelSettings className="icon-transform" />
              Yönetim paneli
            </NavLink>
          )}
        </div>
        <div className="contact">
          <Link className="navbar-contact">
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
        <a href="#" className="navbar-logo">
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
        </a>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <BsFillGridFill className="icon-transform" /> Ana Sayfa
          </NavLink>
          <NavLink
            to="/konut"
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
          <button
            className="navbar-contact"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <IoCall className="icon-transform" /> İletişime geç
          </button>
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
