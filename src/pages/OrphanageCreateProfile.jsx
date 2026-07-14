import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrphanageProfile } from "../apis/orphanageApis";
import { FaBan, FaBars, FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";
import OrphanageSidebar from "../components/OrphanageSidebar";

const OrphanageCreateProfile = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Responsive mobile states for sidebar
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

  const [formData, setFormData] = useState({
    orphanageName: "",
    admin: "",
    district: "",
    state: "",
    numberOfChildren: "",
    orphanageEmail: "",
    orphanagePhone: "",
    darpanId: "",
    panNumber: "",
    panPhoto: null,
    jjActCertificatePhoto: null,
    // Non-mandatory/extra fields initialized empty
    village: "",
    mandal: "",
    country: "",
    websiteLink: "",
    socialMediaLinks: "",
    orphanageProfilePic: null,
    adminProfilePic: null,
  });

  // Track validation errors for mandatory fields only
  const [errors, setErrors] = useState({
    orphanageName: false,
    admin: false,
    district: false,
    state: false,
    numberOfChildren: false,
    orphanageEmail: false,
    orphanagePhone: false,
    darpanId: false,
    panNumber: false,
    panPhoto: false,
    jjActCertificatePhoto: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Helper utility to load default public assets as files if files are missing
  const getFileFromPublic = async (path, filename) => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (err) {
      console.error("Error loading default file from public folder:", err);
      return null;
    }
  };

  const handlePreSubmitCheck = (e) => {
    e.preventDefault();

    // Validate mandatory fields
    const newErrors = {
      orphanageName: !formData.orphanageName.trim(),
      admin: !formData.admin.trim(),
      district: !formData.district.trim(),
      state: !formData.state.trim(),
      numberOfChildren: !formData.numberOfChildren,
      orphanageEmail: !formData.orphanageEmail.trim(),
      orphanagePhone: !formData.orphanagePhone.trim(),
      darpanId: !formData.darpanId.trim(),
      panNumber: !formData.panNumber.trim(),
      panPhoto: !formData.panPhoto,
      jjActCertificatePhoto: !formData.jjActCertificatePhoto,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((isError) => isError)) {
      toast.error("Please fill in all mandatory fields highlighted in red.");
      return;
    }

    // Trigger confirmation modal regarding the working email address
    setShowConfirmModal(true);
  };

  const executeSubmit = async () => {
    setShowConfirmModal(false);
    try {
      setSubmitting(true);
      setOtpSent(true);

      const completePayload = { ...formData };

      // Fill remaining non-mandatory fields with meaningful dummy values
      if (!completePayload.village) completePayload.village = "Main Area";
      if (!completePayload.mandal) completePayload.mandal = "Central";
      if (!completePayload.country) completePayload.country = "India";
      if (!completePayload.websiteLink)
        completePayload.websiteLink = "https://www.carebridge.org";
      if (!completePayload.socialMediaLinks)
        completePayload.socialMediaLinks = "https://instagram.com/orphanage";

      // Inject default images from public folder if user didn't explicitly provide profile pics
      if (!completePayload.orphanageProfilePic) {
        completePayload.orphanageProfilePic = await getFileFromPublic(
          "/default-orpPic.png",
          "default-orpPic.png",
        );
      }
      if (!completePayload.adminProfilePic) {
        completePayload.adminProfilePic = await getFileFromPublic(
          "/default-avatar.png",
          "default-avatar.png",
        );
      }

      completePayload.numberOfChildren = parseInt(
        formData.numberOfChildren,
        10,
      );

      const response = await createOrphanageProfile(completePayload);

      toast.success(response.message || "OTP sent successfully.");
      navigate("/orphanage/verify-otp", {
        state: formData.orphanageEmail,
      });
    } catch (error) {
      setOtpSent(false);
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create orphanage profile",
      );
    } finally {
      setSubmitting(false);
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
            <h5 className="fw-bold mb-0 text-success">
              Register Orphanage Profile
            </h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "900px" }}>
          <div className="bg-white shadow rounded-4 p-4 p-md-5 mb-5">
            <h2 className="fw-bold mb-2 fs-3">Register Orphanage Profile</h2>
            <p className="text-muted mb-4 small">
              Create your orphanage profile and verify via OTP to start managing
              needs and donations.
            </p>

            <form onSubmit={handlePreSubmitCheck} encType="multipart/form-data">
              <div className="row g-3">
                {/* Orphanage Name */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>Orphanage Name *</span>
                    {errors.orphanageName && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="orphanageName"
                    value={formData.orphanageName}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.orphanageName ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. Little Angels Orphanage"
                  />
                </div>

                {/* Admin Name */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>Admin Name *</span>
                    {errors.admin && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="admin"
                    value={formData.admin}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.admin ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. John Doe"
                  />
                </div>

                {/* District */}
                <div className="col-md-4">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>District *</span>
                    {errors.district && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.district ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. Hyderabad"
                  />
                </div>

                {/* State */}
                <div className="col-md-4">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>State *</span>
                    {errors.state && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.state ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. Telangana"
                  />
                </div>

                {/* Children Count */}
                <div className="col-md-4">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>Children Count *</span>
                    {errors.numberOfChildren && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="numberOfChildren"
                    type="number"
                    min="1"
                    value={formData.numberOfChildren}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.numberOfChildren ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. 45"
                  />
                </div>

                {/* Orphanage Email with strong advisory label */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>
                      Orphanage Email *{" "}
                      <strong className="text-success x-small">
                        (Enter a working mail!)
                      </strong>
                    </span>
                    {errors.orphanageEmail && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="orphanageEmail"
                    type="email"
                    value={formData.orphanageEmail}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.orphanageEmail ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. contact@orphanage.org"
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>
                      Phone *{" "}
                      <span className="text-muted x-small">
                        (Format: +91XXXXXXXXXX)
                      </span>
                    </span>
                    {errors.orphanagePhone && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="orphanagePhone"
                    value={formData.orphanagePhone}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.orphanagePhone ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    placeholder="e.g. +919876543210"
                  />
                </div>

                {/* Darpan ID */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>
                      Darpan ID *{" "}
                      <span className="text-muted x-small">
                        (e.g. MH/2018/0123456)
                      </span>
                    </span>
                    {errors.darpanId && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="darpanId"
                    value={formData.darpanId}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.darpanId ? "border-danger bg-danger bg-opacity-10" : ""}`}
                  />
                </div>

                {/* PAN Number */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>
                      PAN Number *{" "}
                      <span className="text-muted x-small">
                        (e.g. ABCDE1234F)
                      </span>
                    </span>
                    {errors.panNumber && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className={`form-control form-control-sm ${errors.panNumber ? "border-danger bg-danger bg-opacity-10" : ""}`}
                  />
                </div>

                {/* PAN Photo */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>PAN Photo *</span>
                    {errors.panPhoto && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="panPhoto"
                    type="file"
                    onChange={handleFileChange}
                    className={`form-control form-control-sm ${errors.panPhoto ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    accept="image/*"
                  />
                </div>

                {/* JJ Act Certificate */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold d-flex justify-content-between">
                    <span>JJ Act Certificate *</span>
                    {errors.jjActCertificatePhoto && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="jjActCertificatePhoto"
                    type="file"
                    onChange={handleFileChange}
                    className={`form-control form-control-sm ${errors.jjActCertificatePhoto ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    accept="image/*"
                  />
                </div>

                {/* Optional / non-mandatory extras */}
                <div className="col-md-4">
                  <label className="form-label small text-muted">
                    Village (Optional)
                  </label>
                  <input
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted">
                    Mandal (Optional)
                  </label>
                  <input
                    name="mandal"
                    value={formData.mandal}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted">
                    Country (Optional)
                  </label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">
                    Website Link (Optional)
                  </label>
                  <input
                    name="websiteLink"
                    value={formData.websiteLink}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">
                    Social Media Links (Optional)
                  </label>
                  <input
                    name="socialMediaLinks"
                    value={formData.socialMediaLinks}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-sm mt-4 w-100 fw-bold py-2.5"
                disabled={otpSent || submitting}
              >
                {otpSent || submitting
                  ? "Processing..."
                  : "Submit Orphanage Profile"}
              </button>
            </form>
          </div>
          <Footer />
        </div>
      </div>

      {/* Confirmation Popup Modal for Email Verification Warning */}
      {showConfirmModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-5"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            className="bg-white rounded-4 p-4 shadow-lg border-0"
            style={{ maxWidth: "420px", width: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-success mb-0">
                Confirm Email Address
              </h5>
              <button
                className="btn btn-light rounded-circle p-1 d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
                onClick={() => setShowConfirmModal(false)}
              >
                <FaBan size={16} className="text-danger" />
              </button>
            </div>
            <p className="small text-secondary mb-2">
              Are you sure your orphanage email address{" "}
              <strong>({formData.orphanageEmail})</strong> is correct?
            </p>
            <p className="x-small text-muted mb-4">
              There is an OTP verification sent to this address. If the email is
              wrong, you will not receive an OTP, meaning no verification and no
              account creation.
            </p>
            <div className="d-flex gap-2 justify-content-end">
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                onClick={() => setShowConfirmModal(false)}
              >
                Review Email
              </button>
              <button
                className="btn btn-success btn-sm rounded-pill px-3 fw-bold"
                onClick={executeSubmit}
              >
                Yes, Send OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrphanageCreateProfile;
