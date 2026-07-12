// 2. Navbar.jsx (Enhanced spacing and toggler visibility)
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2 py-lg-3 sticky-top">
      <div className="container-fluid px-3 px-md-4">
        {/* Logo + Name */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="CareBridge Logo"
            width="40"
            height="40"
            className="img-fluid"
          />
          <div>
            <span className="fw-bold fs-5 fs-md-4">CareBridge</span>
            <p
              className="text-secondary x-small m-0"
              style={{ fontSize: "0.7rem" }}
            >
              Bridging Hearts, Building Futures
            </p>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center Links */}
          <ul className="navbar-nav mx-auto gap-2 gap-lg-3 my-3 my-lg-0 text-center text-lg-start">
            <li className="nav-item">
              <Link className="nav-link fw-medium py-1" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium py-1" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium py-1" to="/howitworks">
                How It Works
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium py-1" to="/orphanages">
                Orphanages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium py-1" to="/needs">
                Needs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium py-1" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-3 pb-3 pb-lg-0 mx-lg-3">
            <FaSearch
              style={{
                cursor: "pointer",
                fontSize: "18px",
              }}
              className="d-none d-lg-block"
            />

            <Link to="/login" className="w-50 w-lg-auto text-center">
              <button className="btn btn-outline-success btn-sm w-100 px-3">
                Login
              </button>
            </Link>

            <Link to="/register" className="w-50 w-lg-auto text-center">
              <button className="btn btn-success btn-sm w-100 px-3">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
