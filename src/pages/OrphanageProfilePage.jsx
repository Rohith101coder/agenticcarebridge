import React, { useEffect, useState } from "react";
import OrphanageSidebar from "../components/OrphanageSidebar";
import { getOrphanageProfile } from "../apis/orphanageApis";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaGlobe,
  FaIdCard,
  FaBuilding,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSearchPlus,
  FaBan,
} from "react-icons/fa";

const OrphanageProfilePage = () => {
  const [orphanage, setOrphanage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Modal state for full-screen photo preview (WhatsApp/Insta style)
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

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

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getOrphanageProfile();
      setOrphanage(response);
    } catch (error) {
      console.error(error);
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
    navigate("/orphanage/update-profile", {
      state: {
        adminName: orphanage?.adminName,
        village: orphanage?.village,
        mandal: orphanage?.mandal,
        district: orphanage?.district,
        state: orphanage?.state,
        country: orphanage?.country,
        numberOfChildren: orphanage?.numberOfChildren,
        orphanagePhone: orphanage?.orphanagePhone,
        websiteLink: orphanage?.websiteLink,
        socialMediaLinks: orphanage?.socialMediaLinks,
        orphanageProfilePic: orphanage?.orphanageProfilePic,
        adminProfilePic: orphanage?.adminProfilePic,
      },
    });
  };

  const openPhotoPreview = (url, title) => {
    if (!url) return;
    setPreviewImage(url);
    setPreviewTitle(title);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success" />
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
          <OrphanageSidebar />
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
            <h5 className="fw-bold mb-0 text-success">Orphanage Profile</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "1000px" }}>
          {/* Header Card */}
          <div className="bg-white shadow-sm rounded-4 p-3 p-md-4 mb-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div className="d-flex align-items-center">
              {/* Clickable Profile Pic */}
              <div
                className="position-relative rounded-circle me-3 border shadow-xs overflow-hidden cursor-pointer"
                style={{ width: "70px", height: "70px", flexShrink: 0 }}
                onClick={() =>
                  openPhotoPreview(
                    orphanage?.orphanageProfilePic || "/default-avatar.png",
                    "Orphanage Profile Picture",
                  )
                }
                title="View Profile Picture"
              >
                <img
                  src={orphanage?.orphanageProfilePic || "/default-avatar.png"}
                  alt="Orphanage"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all">
                  <FaSearchPlus size={14} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="fw-bold mb-1 fs-4">
                  {orphanage?.orphanageName}
                </h3>
                <p className="text-muted small mb-1">
                  CareBridge ID: {orphanage?.carebridgeId}
                </p>
                <p className="text-muted x-small mb-0">
                  Joined: {formatDate(orphanage?.createdAt)}
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between w-100 w-md-auto gap-3">
              <span
                className={`px-3 py-1 rounded-pill small fw-semibold ${orphanage?.verificationStatus === "VERIFIED" ? "bg-success text-white" : "bg-warning text-dark"}`}
              >
                {orphanage?.verificationStatus}
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
            {/* Left Column: Core Details */}
            <div className="col-12 col-md-7">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-3 fs-6">
                  <FaBuilding className="me-2" /> Organization Details
                </h5>
                <p className="small mb-2">
                  <strong>Admin:</strong> {orphanage?.adminName}
                </p>
                <p className="small mb-2">
                  <strong>Location:</strong> {orphanage?.village},{" "}
                  {orphanage?.mandal}, {orphanage?.district}, {orphanage?.state}
                  , {orphanage?.country}
                </p>
                <p className="small mb-2">
                  <strong>Children Count:</strong> {orphanage?.numberOfChildren}
                </p>
                <hr />
                <p className="small mb-2 d-flex align-items-center gap-1">
                  <FaEnvelope /> {orphanage?.orphanageEmail}
                  {orphanage?.orphanageEmailVerified && (
                    <FaCheckCircle className="text-success x-small ms-1" />
                  )}
                </p>
                <p className="small mb-2">
                  <FaPhone className="me-2 text-success" />{" "}
                  {orphanage?.orphanagePhone}
                </p>
                <p className="small mb-0">
                  <FaGlobe className="me-2 text-success" />
                  <a
                    href={orphanage?.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-success text-decoration-none"
                  >
                    Visit Website
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column: Verification & Documents */}
            <div className="col-12 col-md-5">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-3 fs-6">
                  <FaIdCard className="me-2" /> Verification & Docs
                </h5>
                <p className="small mb-2">
                  <strong>Darpan ID:</strong> {orphanage?.darpanId}
                </p>
                <p className="small mb-2">
                  <strong>PAN Number:</strong> {orphanage?.panNumber}
                </p>
                <p className="small mb-2">
                  <strong>Email Verification:</strong>{" "}
                  {orphanage?.orphanageEmailVerified ? (
                    <span className="text-success fw-semibold">Verified</span>
                  ) : (
                    <span className="text-danger fw-semibold">
                      Not Verified
                    </span>
                  )}
                </p>
                <p className="small mb-3">
                  <strong>Verification Status:</strong>{" "}
                  <span className="fw-semibold">
                    {orphanage?.verificationStatus}
                  </span>
                </p>

                <div className="mt-3">
                  {/* Clickable PAN Photo */}
                  <p className="small text-muted mb-1 d-flex justify-content-between align-items-center">
                    <span>PAN Photo</span>
                    <FaSearchPlus size={11} className="text-success" />
                  </p>
                  <div
                    className="position-relative overflow-hidden rounded border mb-2 cursor-pointer group"
                    style={{ maxHeight: "100px", background: "#f8f9fa" }}
                    onClick={() =>
                      openPhotoPreview(orphanage?.panPhoto, "PAN Photo")
                    }
                  >
                    <img
                      src={orphanage?.panPhoto}
                      alt="PAN"
                      className="w-100 img-fluid transition-all"
                      style={{
                        height: "100px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Clickable JJ Act Certificate */}
                  <p className="small text-muted mb-1 d-flex justify-content-between align-items-center">
                    <span>JJ Act Certificate</span>
                    <FaSearchPlus size={11} className="text-success" />
                  </p>
                  <div
                    className="position-relative overflow-hidden rounded border cursor-pointer group"
                    style={{ maxHeight: "100px", background: "#f8f9fa" }}
                    onClick={() =>
                      openPhotoPreview(
                        orphanage?.jjActCertificatePhoto,
                        "JJ Act Certificate",
                      )
                    }
                  >
                    <img
                      src={orphanage?.jjActCertificatePhoto}
                      alt="JJ Act"
                      className="w-100 img-fluid transition-all"
                      style={{
                        height: "100px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="bg-white shadow-sm rounded-4 p-4">
                <div className="row text-muted small">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <strong>Joined Date</strong>
                    <br />
                    {formatDate(orphanage?.createdAt)}
                  </div>
                  <div className="col-md-6">
                    <strong>Last Updated</strong>
                    <br />
                    {formatDate(orphanage?.updateAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal (Using wrong/ban symbol icon to exit) */}
      {previewImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center z-5"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setPreviewImage(null)}
        >
          {/* Top Info bar with a wrong/ban symbol exit button */}
          <div
            className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center text-white px-md-5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
            }}
          >
            <span className="fw-semibold fs-6">{previewTitle}</span>
            <button
              className="btn btn-danger bg-opacity-75 border-0 rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{ width: "42px", height: "42px" }}
              onClick={() => setPreviewImage(null)}
              title="Close Preview"
            >
              <FaBan size={20} />
            </button>
          </div>

          {/* Centered Large Image */}
          <div
            className="p-2 max-w-90 max-h-80 d-flex align-items-center justify-content-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview Zoom"
              className="img-fluid rounded-3 shadow-lg"
              style={{
                maxHeight: "82vh",
                maxWidth: "90vw",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrphanageProfilePage;
