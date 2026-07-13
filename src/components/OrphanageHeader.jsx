import React from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import profileImg from "../assets/profile.jpg";
import { Link } from "react-router-dom";

const OrphanageHeader = ({
  isMobile,
  toggleSidebar,
  showSidebar,
  accountStatus,
  overview,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-4 shadow-xs">
      {/* Mobile Toggler */}
      <div className="d-flex align-items-center gap-3">
        {isMobile && (
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
        )}
        <h5 className="fw-bold mb-0 text-success d-none d-sm-block fs-6">
          Dashboard Overview
        </h5>
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center">
        {/* Notification */}
        <div className="position-relative me-3 me-md-4">
          <Link to="/orphanage/notifications" className="text-dark">
            <FaBell size={20} style={{ cursor: "pointer" }} />
          </Link>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "9px" }}
          >
            2
          </span>
        </div>

        {/* Profile */}
        <div className="d-flex align-items-center gap-2 position-relative">
          <img
            src={profileImg}
            alt="profile"
            className="rounded-circle border"
            style={{
              width: "35px",
              height: "35px",
              objectFit: "cover",
            }}
          />

          <Link
            to="/orphanage/profile"
            className="text-decoration-none text-dark d-none d-md-block"
          >
            <div>
              <h6 className="mb-0 fw-bold small">
                {overview?.adminName || "Admin"}
              </h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                Orphanage Admin
              </small>
            </div>
          </Link>

          {accountStatus === "Orphanage profile not found" && (
            <Link
              to="/orphanage/create-profile"
              className="text-decoration-none"
            >
              <div
                className="position-absolute bg-warning text-dark p-2 rounded shadow-sm small fw-semibold"
                style={{
                  top: "45px",
                  right: "0",
                  width: "210px",
                  maxWidth: "80vw",
                  zIndex: 1000,
                  cursor: "pointer",
                }}
              >
                Please create your profile first.
              </div>
            </Link>
          )}

          {accountStatus === "Your orphanage profile is not verified yet." && (
            <div
              className="position-absolute bg-info text-white p-2 rounded shadow-sm small fw-semibold"
              style={{
                top: "45px",
                right: "0",
                width: "210px",
                maxWidth: "80vw",
                zIndex: 1000,
              }}
            >
              Account not verified yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrphanageHeader;
