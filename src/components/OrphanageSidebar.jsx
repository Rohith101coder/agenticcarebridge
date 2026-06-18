import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaTachometerAlt,
  FaBox,
  FaGift,
  FaCalendarAlt,
  FaChild,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const OrphanageSidebar = () => {
  const menuItems = [
    {
      icon: <FaTachometerAlt />,
      name: "Dashboard",
      path: "/orphanage/dashboard",
    },
    {
      icon: <FaBox />,
      name: "Needs Management",
      path: "/orphanage/need-items",
    },
    {
      icon: <FaGift />,
      name: "Donation Requests",
      path: "/orphanage/donations",
    },
    {
      icon: <FaCalendarAlt />,
      name: "Visit Bookings",
      path: "/orphanage/slots",
    },
    {
      icon: <FaChild />,
      name: "Children",
      path: "/orphanage/feature/children",
    },
    {
      icon: <FaEnvelope />,
      name: "Messages",
      path: "/orphanage/feature/messages",
    },
    {
      icon: <FaUser />,
      name: "Profile",
      path: "/orphanage/profile",
    },
    {
      icon: <FaSignOutAlt />,
      name: "Logout",
      path: "/logout",
    },
  ];

  return (
    <div
      className="bg-white shadow-sm p-3"
      style={{
        width: "250px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-4">
        <img src={logo} alt="logo" width="45" />

        <h4 className="fw-bold mb-0">CareBridge</h4>
      </div>

      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `d-flex align-items-center gap-3 p-3 rounded mb-2 text-decoration-none ${
              isActive ? "bg-success text-white" : "text-dark"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default OrphanageSidebar;
