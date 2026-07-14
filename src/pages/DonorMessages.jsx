import React, { useState, useEffect } from "react";
import DonorSidebar from "../components/DonorSidebar";
import { FaEnvelope, FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DonorMessages = () => {
  const navigate = useNavigate();
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

  // Dummy messages data matching the style of previous pages
  const messages = [
    {
      id: 1,
      sender: "Little Angels Shelter",
      snippet:
        "Thank you so much for your generous support. The children are thrilled...",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "CareBridge Support Team",
      snippet:
        "Your inquiry regarding the upcoming donation drive has been received.",
      time: "2 days ago",
      unread: false,
    },
  ];

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
          <DonorSidebar />
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

        {/* Messages Container */}
        <div className="container px-3 px-md-4" style={{ maxWidth: "800px" }}>
          {messages.length === 0 ? (
            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-xs p-4">
              <h6 className="fw-semibold">No messages in your inbox</h6>
              <p className="small text-secondary mb-0">
                Conversations with orphanages and support will appear here.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`card border-0 shadow-xs rounded-3 p-3 bg-white ${
                    item.unread ? "border-start border-success border-4" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-success bg-opacity-10 p-2 rounded-circle text-success mt-1">
                      <FaEnvelope />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1 flex-wrap gap-1">
                        <h6 className="fw-bold text-dark mb-0">
                          {item.sender}
                        </h6>
                        <small className="text-secondary x-small">
                          {item.time}
                        </small>
                      </div>
                      <p
                        className="text-secondary small mb-0"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {item.snippet}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorMessages;
