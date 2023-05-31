import React, { useState } from "react";
import "./navbar.css";

import { IoCall, IoHome } from "react-icons/io5";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { BsFillCarFrontFill, BsFillGridFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavbarStateChange = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <div className={`navbar-logo ${isOpen ? "navbar-open" : "navbar-close"}`}>
        <a href="#">
          <div className="frame">
            <img src="/logo.png" alt="logo" />
          </div>
        </a>
        <div className="mobile-input">
          <label htmlFor="navbar-controller">
            {isOpen ? <IoIosClose /> : <IoIosMenu />}
          </label>
          <input
            type="checkbox"
            id="navbar-controller"
            onChange={handleNavbarStateChange}
          />
        </div>
      </div>
      <div
        className={`navbar-links ${isOpen ? "navbar-open" : "navbar-close"}`}
      >
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
      </div>
      <div className="contact">
        <button
          className={`navbar-contact ${
            isOpen ? "navbar-open" : "navbar-close"
          }`}
        >
          <IoCall className="icon-transform" /> İletişime geç
        </button>
        <Link>İlan ver</Link>
      </div>
    </nav>
  );
}

export default Navbar;
