import React from "react";
import {
  FaBell,
  FaBars,
  FaTimes
} from "react-icons/fa";
import profileImg from "../assets/profile.jpg";
import { Link } from "react-router-dom";

const OrphanageHeader = ({
  isMobile,
  toggleSidebar,
  showSidebar,
  accountStatus,
  overview
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      {/* Mobile Toggler */}
      <div>
        {isMobile && (
          <button
            className="btn btn-light shadow-sm rounded-circle"
            onClick={toggleSidebar}
          >
            {showSidebar ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center">
        {/* Notification */}
        <div className="position-relative me-4">
          <FaBell
            size={22}
            style={{
              cursor: "pointer",
            }}
          />

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{
              fontSize: "10px",
            }}
          >
            2
          </span>
        </div>

        {/* Profile */}
        <div className="d-flex align-items-center gap-2 position-relative">
          <img
            src={profileImg}
            alt="profile"
            className="rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}
          />

          <Link
            to="/orphanage/profile"
            className="text-decoration-none text-dark"
          >
            <div>
              <h6 className="mb-0 fw-bold">{overview?.adminName || "Admin"}</h6>

              <small className="text-muted">Orphanage Admin</small>
            </div>
          </Link>

          {accountStatus === "Orphanage profile not found" && (
            <Link
              to="/orphanage/create-profile"
              className="text-decoration-none"
            >
              <div
                className="position-absolute bg-warning text-dark p-2 rounded shadow"
                style={{
                  top: "55px",
                  right: "0",
                  minWidth: "220px",
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
              className="position-absolute bg-info text-white p-2 rounded shadow"
              style={{
                top: "55px",
                right: "0",
                minWidth: "220px",
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