import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonorSidebar from "../components/DonorSidebar";
import { getDonorProfile } from "../apis/donorApis";
import profileImg from "../assets/profile.jpg";

import {
  FaUser,
  FaPhone,
  FaIdCard,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaBan,
} from "react-icons/fa";

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const navigate = useNavigate();

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

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getDonorProfile();
      setDonor(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleEditProfile = () => {
    navigate("/donor/update-profile", {
      state: {
        name: donor?.name,
        designation: donor?.designation,
        houseNum: donor?.houseNum,
        village: donor?.village,
        mandal: donor?.mandal,
        district: donor?.district,
        state: donor?.state,
        country: donor?.country,
        phone: donor?.phone,
        profilePic: donor?.profilePic,
        panPhoto: donor?.panPhoto,
      },
    });
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

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

      {/* Main Content: Responsive margin-left to prevent overlap on mobile */}
      <div
        className="flex-grow-1 pb-5 w-100"
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
              {showSidebar ? <FaTimes className="text-success" /> : <FaBars className="text-success" />}
            </button>
            <h5 className="fw-bold mb-0 text-success">Donor Profile</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "1000px" }}>
          {/* Header */}
          <div className="bg-white shadow-sm rounded-4 p-3 p-md-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center">
              <img
                src={donor?.profilePic || profileImg}
                alt="Donor"
                className="rounded-circle me-3 border shadow-sm"
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
                onClick={() => {
                  setSelectedImage(donor?.profilePic || profileImg);
                  setImageTitle("Profile Picture");
                  setShowImageModal(true);
                }}
              />
              <div>
                <h3 className="fw-bold mb-1 fs-4">{donor?.name}</h3>
                <p className="text-muted small mb-1">
                  CareBridge ID : {donor?.careBridgeID}
                </p>
                <p className="text-muted x-small mb-0">
                  Joined : {formatDate(donor?.createdAt)}
                </p>
              </div>
            </div>

            <div className="text-start text-md-end w-100 w-md-auto d-flex flex-md-column justify-content-between align-items-center align-items-md-end gap-2">
              <span
                className={`badge px-3 py-2 ${
                  donor?.donorStatus === "VERIFIED"
                    ? "bg-success"
                    : donor?.donorStatus === "NOT_VERIFIED"
                    ? "bg-warning text-dark"
                    : "bg-danger"
                }`}
              >
                {donor?.donorStatus}
              </span>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={handleEditProfile}
              >
                Edit Details
              </button>
            </div>
          </div>

          <div className="row g-4">
            {/* Left Column */}
            <div className="col-12 col-md-7">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-3 fs-6">
                  <FaUser className="me-2" />
                  Personal Information
                </h5>

                <p className="small mb-2">
                  <strong>Full Name:</strong>
                  <br />
                  {donor?.name}
                </p>
                <p className="small mb-2">
                  <strong>Designation:</strong>
                  <br />
                  {donor?.designation}
                </p>
                <p className="small mb-2">
                  <FaPhone className="me-2 text-success" />
                  {donor?.phone}
                </p>
                <p className="small mb-3">
                  <FaCalendarAlt className="me-2 text-success" />
                  {formatDate(donor?.dateOfBirth)}
                </p>

                <hr />

                <h6 className="fw-bold mb-3 fs-6">
                  <FaMapMarkerAlt className="me-2 text-success" />
                  Address
                </h6>
                <p className="x-small mb-1">
                  <strong>House No:</strong> {donor?.houseNum || "N/A"}
                </p>
                <p className="x-small mb-1">
                  <strong>Village:</strong> {donor?.village || "N/A"}
                </p>
                <p className="x-small mb-1">
                  <strong>Mandal:</strong> {donor?.mandal || "N/A"}
                </p>
                <p className="x-small mb-1">
                  <strong>District:</strong> {donor?.district || "N/A"}
                </p>
                <p className="x-small mb-1">
                  <strong>State:</strong> {donor?.state || "N/A"}
                </p>
                <p className="x-small mb-0">
                  <strong>Country:</strong> {donor?.country || "N/A"}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-12 col-md-5">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-3 fs-6">
                  <FaIdCard className="me-2" />
                  Verification & Documents
                </h5>

                <p className="small mb-2">
                  <strong>CareBridge ID</strong>
                  <br />
                  {donor?.careBridgeID}
                </p>
                <p className="small mb-2">
                  <strong>PAN Number</strong>
                  <br />
                  {donor?.panNumber}
                </p>
                <p className="small mb-2">
                  <strong>Verification Status</strong>
                  <br />
                  <span
                    className={`badge ${donor?.donorStatus === "VERIFIED" ? "bg-success" : donor?.donorStatus === "NOT_VERIFIED" ? "bg-warning text-dark" : "bg-danger"}`}
                  >
                    {donor?.donorStatus}
                  </span>
                </p>
                <p className="small mb-3">
                  <strong>Subscription Status</strong>
                  <br />
                  <span
                    className={`badge ${donor?.subscriptionStatus === "ACTIVE" ? "bg-success" : donor?.subscriptionStatus === "EXPIRED" ? "bg-danger" : "bg-secondary"}`}
                  >
                    {donor?.subscriptionStatus}
                  </span>
                </p>

                <hr />

                <p className="small text-muted mb-2">PAN Card</p>
                {donor?.panPhoto ? (
                  <img
                    src={donor?.panPhoto}
                    alt="PAN Card"
                    className="img-thumbnail w-100"
                    style={{
                      maxHeight: "150px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedImage(donor?.panPhoto);
                      setImageTitle("PAN Card");
                      setShowImageModal(true);
                    }}
                  />
                ) : (
                  <div className="alert alert-light border text-center small mb-0">
                    No PAN image available
                  </div>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="col-12">
              <div className="bg-white shadow-sm rounded-4 p-4">
                <h5 className="fw-bold text-success mb-3 fs-6">
                  <FaCheckCircle className="me-2" />
                  Account Information
                </h5>
                <div className="row text-muted small">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <strong>Joined Date</strong>
                    <br />
                    {formatDate(donor?.createdAt)}
                  </div>
                  <div className="col-md-6">
                    <strong>Last Updated</strong>
                    <br />
                    {formatDate(donor?.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile/PAN Image Lightbox Modal (WhatsApp/Instagram Style with ban symbol icon to exit) */}
      {showImageModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center z-5"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" }}
          onClick={() => setShowImageModal(false)}
        >
          {/* Top Info bar with ban symbol exit button */}
          <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center text-white px-md-5" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}>
            <span className="fw-semibold fs-6">{imageTitle}</span>
            <button
              className="btn btn-danger bg-opacity-75 border-0 rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{ width: "42px", height: "42px" }}
              onClick={() => setShowImageModal(false)}
              title="Close Preview"
            >
              <FaBan size={20} />
            </button>
          </div>

          {/* Centered Large Image */}
          <div 
            className="p-2 d-flex align-items-center justify-content-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Preview Zoom"
              className="img-fluid rounded-3 shadow-lg"
              style={{ maxHeight: "82vh", maxWidth: "90vw", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorProfile;