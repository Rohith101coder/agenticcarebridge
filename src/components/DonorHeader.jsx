import React, { useState, useEffect } from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.jpg";
import { Link } from "react-router-dom";

const DonorHeader = ({
  isMobile,
  toggleSidebar,
  showSidebar,
  profileStatus,
  donorData,
}) => {
  const navigate = useNavigate();

  const [showProfileHint, setShowProfileHint] = useState(false);

  useEffect(() => {
    if (profileStatus === "NO_PROFILE") {
      const alreadySeen = localStorage.getItem("profileHintSeen");

      if (!alreadySeen) {
        setShowProfileHint(true);
      }
    }
  }, [profileStatus]);

  const closeHint = () => {
    setShowProfileHint(false);
    localStorage.setItem("profileHintSeen", "true");
  };

  // const handleProfileClick = () => {
  //   if (profileStatus === "NO_PROFILE") {
  //     navigate("/donor/create-profile");
  //   } else if (profileStatus === "NOT_VERIFIED") {
  //     navigate("/donor/profile");
  //   }
  // };

  const handleProfileClick = () => {
    if (profileStatus === "NO_PROFILE") {
      navigate("/donor/create-profile");
    } else {
      navigate("/donor/profile");
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      {/* Mobile Toggle */}
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

      {/* Right Section */}
      <div className="d-flex align-items-center gap-3">
        {/* Notifications */}
        <div className="position-relative">
          <Link to="/donor/notifications" className="text-dark">
            <FaBell size={22} style={{ cursor: "pointer" }} />
          </Link>

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "10px" }}
          >
            3
          </span>
        </div>

        {/* Profile Section */}
        <div className="position-relative">
          {showProfileHint && (
            <div
              className="position-absolute bg-success text-white p-3 rounded shadow"
              style={{
                width: "270px",
                right: "0",
                top: "65px",
                zIndex: 9999,
              }}
            >
              <button
                type="button"
                className="btn-close btn-close-white position-absolute"
                style={{
                  top: "8px",
                  right: "8px",
                  fontSize: "10px",
                }}
                onClick={closeHint}
              />

              <div className="fw-bold mb-1">👋 Welcome to CareBridge</div>

              <small>
                Create your donor profile to start donating, booking visits, and
                making an impact.
              </small>

              {/* Arrow */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "25px",
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "10px solid #198754",
                }}
              />
            </div>
          )}

          <div
            role="button"
            onClick={handleProfileClick}
            className={`d-flex align-items-center gap-2 p-2 rounded shadow-sm ${
              profileStatus === "NO_PROFILE"
                ? "border border-warning border-2 bg-warning-subtle"
                : profileStatus === "NOT_VERIFIED"
                  ? "border border-danger border-2 bg-danger-subtle"
                  : "bg-white"
            }`}
          >
            <img
              src={donorData?.imagePath || profileImg}
              alt="profile"
              className="rounded-circle"
              style={{
                width: "45px",
                height: "45px",
                objectFit: "cover",
              }}
            />

            <div>
              <h6 className="mb-0 fw-bold">
                {profileStatus === "NO_PROFILE"
                  ? "Create Profile"
                  : donorData?.name || "Donor"}
              </h6>

              <small
                className={
                  profileStatus === "NO_PROFILE"
                    ? "text-warning fw-bold"
                    : profileStatus === "NOT_VERIFIED"
                      ? "text-danger fw-bold"
                      : "text-muted"
                }
              >
                {profileStatus === "NO_PROFILE"
                  ? "Profile Required"
                  : profileStatus === "NOT_VERIFIED"
                    ? "Verification Pending"
                    : donorData?.role || "Donor"}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorHeader;
