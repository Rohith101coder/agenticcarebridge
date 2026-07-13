import React, { useState, useEffect } from "react";
import Sidebar from "../components/OrphanageSidebar";
import { FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const OrphanageMessagePage = () => {
  // Responsive mobile states
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <div
      className="d-flex min-h-screen bg-light position-relative"
      style={{ overflowX: "hidden", width: "100%", maxWidth: "100%" }}
    >
      {/* Permanent Sidebar on Desktop / Conditional Overlay on Mobile */}
      {(!isMobile || showSidebar) && (
        <div
          className="position-fixed top-0 start-0 z-3 bg-white shadow-sm"
          style={{ height: "100vh", width: "250px" }}
        >
          <Sidebar />
        </div>
      )}

      {/* Backdrop for mobile overlay when sidebar is toggled open */}
      {isMobile && showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 z-2"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className="flex-grow-1 bg-light pb-5 w-100"
        style={{
          marginLeft: isMobile ? "0px" : "250px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {/* Top Header with Hamburger / Three Lines Symbol */}
        <div className="bg-white shadow-xs py-2 mb-3 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <button
              className="btn btn-light border-0 shadow-xs d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: "38px", height: "38px" }}
              onClick={toggleSidebar}
              title="Toggle Menu"
            >
              {showSidebar ? (
                <FaTimes className="text-success" />
              ) : (
                <FaBars className="text-success" />
              )}
            </button>
            <h5 className="fw-bold mb-0 text-success">Messages</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "1000px" }}>
          {/* Messaging Dashboard Placeholder */}
          <div
            className="bg-white shadow-sm rounded-4 p-4 p-md-5 text-center d-flex flex-column align-items-center justify-content-center py-5"
            style={{ minHeight: "500px" }}
          >
            <div className="bg-success bg-opacity-10 p-4 rounded-circle mb-4 text-success">
              <FaEnvelope size={45} className="d-md-none" />
              <FaEnvelope size={50} className="d-none d-md-block" />
            </div>
            <h3 className="fw-bold text-success mb-2 fs-4 fs-md-3">
              Inbox & Messages
            </h3>
            <p className="text-muted mb-0 small" style={{ maxWidth: "450px" }}>
              Stay connected with donors and admins. Your real-time
              conversations and notifications will appear here once active
              messaging is initialized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageMessagePage;
