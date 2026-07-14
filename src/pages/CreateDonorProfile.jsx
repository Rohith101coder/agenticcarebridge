import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DonorSidebar from "../components/DonorSidebar";
import {
  FaUserCircle,
  FaUpload,
  FaBars,
  FaTimes,
  FaSearchPlus,
  FaBan,
} from "react-icons/fa";
import { createDonorProfile } from "../apis/donorApis";

const CreateDonorProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "", // Will be auto-filled for backend
    designation: "",
    houseNum: "", // Will be auto-filled for backend
    mandal: "", // Will be auto-filled for backend
    village: "", // Will be auto-filled for backend
    district: "",
    state: "",
    country: "", // Will be auto-filled for backend
    phone: "",
    panNumber: "", // Will be auto-filled for backend
    profilePic: null, // Will use default public asset if empty
    panPhoto: null, // Will use default public asset if empty
  });

  // Track validation errors for important fields only
  const [errors, setErrors] = useState({
    name: false,
    designation: false,
    phone: false,
    district: false,
    state: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const openPhotoPreview = (fileOrUrl, title) => {
    if (!fileOrUrl) return;
    const url =
      typeof fileOrUrl === "string"
        ? fileOrUrl
        : URL.createObjectURL(fileOrUrl);
    setPreviewImage(url);
    setPreviewTitle(title);
  };

  // Helper utility to convert a public asset path into a File object for the backend form submission
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate only important fields
    const newErrors = {
      name: !formData.name.trim(),
      designation: !formData.designation.trim(),
      phone: !formData.phone.trim(),
      district: !formData.district.trim(),
      state: !formData.state.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((isError) => isError)) {
      toast.error("Please fill in all the required important fields.");
      return;
    }

    try {
      setSubmitting(true);

      // Clone current state to populate hidden/non-important backend fields with default/dummy values
      const completePayload = { ...formData };

      if (!completePayload.dob) completePayload.dob = "2000-01-01";
      if (!completePayload.houseNum) completePayload.houseNum = "N/A";
      if (!completePayload.mandal) completePayload.mandal = "N/A";
      if (!completePayload.village) completePayload.village = "N/A";
      if (!completePayload.country) completePayload.country = "India";
      if (!completePayload.panNumber) completePayload.panNumber = "ABCDE1234F";

      // Fallback file injections from public folder if user didn't attach custom ones
      if (!completePayload.profilePic) {
        completePayload.profilePic = await getFileFromPublic(
          "/default-avatar.png",
          "default-avatar.png",
        );
      }
      if (!completePayload.panPhoto) {
        completePayload.panPhoto = await getFileFromPublic(
          "/default-pan.png",
          "default-pan.png",
        );
      }

      const response = await createDonorProfile(completePayload);
      toast.success(response.message || "Profile created successfully");
      navigate("/donor/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create profile");
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
            <h5 className="fw-bold mb-0 text-success">Profile Setup</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "900px" }}>
          <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">
            <h2 className="fw-bold mb-1 fs-3">Set Up Your Profile</h2>
            <p className="text-muted mb-4 small">
              Help us build trust—provide your key details to get verified.
            </p>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row g-4">
                {/* Profile Image Section */}
                <div className="col-12 text-center mb-3">
                  <div className="position-relative d-inline-block">
                    {formData.profilePic ? (
                      <div
                        className="rounded-circle overflow-hidden border shadow-xs cursor-pointer position-relative group"
                        style={{ width: "100px", height: "100px" }}
                        onClick={() =>
                          openPhotoPreview(
                            formData.profilePic,
                            "Profile Picture",
                          )
                        }
                        title="Click to view full picture"
                      >
                        <img
                          src={URL.createObjectURL(formData.profilePic)}
                          alt="Profile Preview"
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all">
                          <FaSearchPlus size={16} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center cursor-pointer"
                        style={{ width: "100px", height: "100px" }}
                        onClick={() =>
                          openPhotoPreview(
                            "/default-avatar.png",
                            "Default Profile Picture",
                          )
                        }
                      >
                        <FaUserCircle size={100} className="text-secondary" />
                      </div>
                    )}

                    <label
                      className="btn btn-sm btn-success position-absolute bottom-0 end-0 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Upload Profile Picture"
                    >
                      <FaUpload size={12} />
                      <input
                        type="file"
                        hidden
                        name="profilePic"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="small mt-2 fw-semibold text-secondary">
                    Upload Profile Picture (Optional)
                  </p>
                </div>

                {/* Important Personal Details */}
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small d-flex justify-content-between">
                    <span>Full Name *</span>
                    {errors.name && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="name"
                    className={`form-control form-control-sm ${errors.name ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small">
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control form-control-sm"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small d-flex justify-content-between">
                    <span>Designation *</span>
                    {errors.designation && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="designation"
                    className={`form-control form-control-sm ${errors.designation ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small d-flex justify-content-between">
                    <span>Phone *</span>
                    {errors.phone && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="phone"
                    className={`form-control form-control-sm ${errors.phone ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Address */}
                <div className="col-12 mt-4 mb-0">
                  <h5 className="mb-0 text-success fs-6 fw-bold">
                    Address Details
                  </h5>
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small">
                    House/Street No. (Optional)
                  </label>
                  <input
                    name="houseNum"
                    className="form-control form-control-sm"
                    value={formData.houseNum}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small">
                    Village (Optional)
                  </label>
                  <input
                    name="village"
                    className="form-control form-control-sm"
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold mb-1 small">
                    Mandal (Optional)
                  </label>
                  <input
                    name="mandal"
                    className="form-control form-control-sm"
                    value={formData.mandal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold mb-1 small d-flex justify-content-between">
                    <span>District *</span>
                    {errors.district && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="district"
                    className={`form-control form-control-sm ${errors.district ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold mb-1 small d-flex justify-content-between">
                    <span>State *</span>
                    {errors.state && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    name="state"
                    className={`form-control form-control-sm ${errors.state ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="fw-semibold mb-1 small">
                    Country (Optional)
                  </label>
                  <input
                    name="country"
                    className="form-control form-control-sm"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Verification */}
                <div className="col-12 mt-4 mb-0">
                  <h5 className="mb-0 text-success fs-6 fw-bold">
                    Verification Documents
                  </h5>
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small">
                    PAN Number (Optional)
                  </label>
                  <input
                    name="panNumber"
                    className="form-control form-control-sm"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1 small d-flex justify-content-between align-items-center">
                    <span>Upload PAN Card (Optional)</span>
                    {formData.panPhoto && (
                      <span
                        className="text-success cursor-pointer d-flex align-items-center gap-1 x-small fw-semibold"
                        onClick={() =>
                          openPhotoPreview(
                            formData.panPhoto,
                            "PAN Card Document",
                          )
                        }
                      >
                        <FaSearchPlus size={10} /> View Upload
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    name="panPhoto"
                    accept="image/*"
                    className="form-control form-control-sm"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mt-5 py-2.5 fw-bold"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Complete Setup & Join CareBridge"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal with wrong/ban symbol icon to exit */}
      {previewImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center z-5"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setPreviewImage(null)}
        >
          {/* Top Info bar with ban symbol exit button */}
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

export default CreateDonorProfile;
