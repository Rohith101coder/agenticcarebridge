import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaTachometerAlt,
  FaSearch,
  FaGift,
  FaCalendarAlt,
  FaHeart,
  FaBell,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const DonorSidebar = () => {
  const location = useLocation();

  // Helper function to map menu names to routes
  const getPath = (name) => {
    switch (name) {
      case "Dashboard":
        return "/donor/dashboard";
      case "Explore Needs":
        return "/donor/explore-needs";
      case "My Donations":
        return "/donor/donations";
      case "My Bookings":
        return "/donor/bookings";
      case "My Visits":
        return "/donor/visits";
      case "Notifications":
        return "/donor/notifications";
      case "Messages":
        return "/donor/messages";
      case "Profile":
        return "/donor/profile";
      case "Logout":
        return "/logout";
      default:
        return "#";
    }
  };

  const menuItems = [
    { icon: <FaTachometerAlt />, name: "Dashboard" },
    { icon: <FaSearch />, name: "Explore Needs" },
    { icon: <FaGift />, name: "My Donations" },
    { icon: <FaCalendarAlt />, name: "My Bookings" },
    { icon: <FaHeart />, name: "My Visits" },
    { icon: <FaBell />, name: "Notifications" },
    { icon: <FaEnvelope />, name: "Messages" },
    { icon: <FaUser />, name: "Profile" },
    { icon: <FaSignOutAlt />, name: "Logout" },
  ];

  return (
    <div
      className="bg-white shadow-sm p-3"
      style={{
        width: "250px",
        height: "100vh",
        overflowY: "auto",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center gap-2 mb-4 p-2">
        <img
          src={logo}
          alt="CareBridge Logo"
          width="45"
          height="45"
          className="img-fluid"
        />
        <h4 className="fw-bold mb-0 text-success">CareBridge</h4>
      </div>

      {/* Menu Items */}
      {menuItems.map((item, index) => {
        const path = getPath(item.name);
        const isActive = location.pathname === path;

        // Special handling for Logout if it triggers a function instead of route
        // if (item.name === "Logout") {
        //   return (
        //     <button
        //       key={index}
        //       onClick={() => {
        //         /* Add your logout logic here e.g., handleLogout() */
        //       }}
        //       className={`w-100 border-0 text-start d-flex align-items-center gap-3 p-3 rounded mb-2 text-decoration-none ${
        //         isActive ? "bg-success text-white" : "text-dark bg-white"
        //       }`}
        //       style={{
        //         cursor: "pointer",
        //         transition: "0.3s",
        //       }}
        //     >
        //       <span className="fs-5">{item.icon}</span>
        //       <span>{item.name}</span>
        //     </button>
        //   );
        // }

        return (
          <Link
            to={path}
            key={index}
            className={`d-flex align-items-center gap-3 p-3 rounded mb-2 text-decoration-none ${
              isActive ? "bg-success text-white" : "text-dark bg-white"
            }`}
            style={{
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <span className="fs-5">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default DonorSidebar;
