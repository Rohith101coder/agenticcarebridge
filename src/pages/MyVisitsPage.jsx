import React, { useState, useEffect } from "react";
import DonorSidebar from "../components/DonorSidebar";
import {
  FaHeart,
  FaArrowLeft,
  FaHandsHelping,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyVisitsPage = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex min-h-screen bg-light position-relative">
      {/* Sidebar overlay / toggle layout with hidden-by-default behavior */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 z-3 bg-white"
          style={{ height: "100vh" }}
        >
          <DonorSidebar />
        </div>
      )}

      {/* Backdrop for overlay click when sidebar is open */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 z-2"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className="pb-5 w-100"
        style={{ marginLeft: isMobile ? "0px" : "250px", minHeight: "100vh" }}
      >
        {/* Top Header with Hamburger / Three Lines Symbol */}
        <div className="bg-white shadow-xs py-2 mb-3 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <button
              className="btn btn-light border-0 shadow-xs d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: "38px", height: "38px" }}
              onClick={() => setShowSidebar(!showSidebar)}
              title="Toggle Menu"
            >
              {showSidebar ? (
                <FaTimes className="text-success" />
              ) : (
                <FaBars className="text-success" />
              )}
            </button>
            <h5 className="fw-bold mb-0 text-success">My Visits</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        {/* Feature Coming Soon Container */}
        <div
          className="container px-4 d-flex align-items-center justify-content-center"
          style={{ minHeight: "75vh" }}
        >
          <div
            className="card border-0 shadow-sm rounded-4 text-center p-5 bg-white"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-flex mx-auto mb-4 text-success">
              <FaHandsHelping className="fs-1" />
            </div>

            <h3 className="fw-bold text-dark mb-2">
              Visits Feature Coming Soon!
            </h3>

            <p
              className="text-secondary small mb-4"
              style={{ lineHeight: "1.6" }}
            >
              We are lovingly crafting a special space for you to schedule,
              manage, and cherish your personal visits to the children and
              orphanages. Your heart for connection means the world to the
              CareBridge family, and we cannot wait to welcome you closer very
              soon.
            </p>

            <div className="bg-light p-3 rounded-3 text-muted small d-flex align-items-center justify-content-center gap-2">
              <FaHeart className="text-danger" /> Thank you for walking this
              journey of love and hope with us.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVisitsPage;
