import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaBars, FaTimes, FaUserEdit } from "react-icons/fa";
import DonorSidebar from "../components/DonorSidebar";
import { updateDonorProfile } from "../apis/donorApis";

const UpdateDonorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state || {};
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [submitting, setSubmitting] = useState(false);

  // Track validation errors for important/mandatory fields only
  const [errors, setErrors] = useState({
    name: false,
    designation: false,
    phone: false,
    district: false,
    state: false,
  });

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
    name: initialData.name || "",
    designation: initialData.designation || "",
    phone: initialData.phone || "",
    district: initialData.district || "",
    state: initialData.state || "",
    // Remaining fields initialized from state or empty
    houseNum: initialData.houseNum || "",
    village: initialData.village || "",
    mandal: initialData.mandal || "",
    country: initialData.country || "",
    profilePic: null,
    panPhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  // Helper utility to convert a public asset path into a File object for hidden backend fields if missing
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate only important/mandatory fields
    const newErrors = {
      name: !formData.name?.trim(),
      designation: !formData.designation?.trim(),
      phone: !formData.phone?.trim(),
      district: !formData.district?.trim(),
      state: !formData.state?.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((isError) => isError)) {
      toast.error("Please fill in all the required important fields.");
      return;
    }

    try {
      setSubmitting(true);
      const completePayload = { ...formData };

      // Fill remaining non-important/hidden backend fields with dummy values if empty
      if (!completePayload.houseNum) completePayload.houseNum = "N/A";
      if (!completePayload.village) completePayload.village = "N/A";
      if (!completePayload.mandal) completePayload.mandal = "N/A";
      if (!completePayload.country) completePayload.country = "India";

      // Fallback file injections from public folder if left unselected
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

      const response = await updateDonorProfile(completePayload);
      toast.success(response.message || "Profile updated successfully!");
      navigate("/donor/profile");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile.",
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
        <div className="bg-white shadow-xs py-2 mb-4 sticky-top z-1">
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
            <h5 className="fw-bold mb-0 text-success">Update Profile</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "800px" }}>
          <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">
            <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-3">
              <FaUserEdit className="text-success fs-3" />
              <h3 className="fw-bold text-success mb-0 fs-4">
                Update Donor Profile
              </h3>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                {/* Important Field: Full Name */}
                <div className="col-md-6">
                  <label className="fw-semibold small d-flex justify-content-between">
                    <span>Full Name *</span>
                    {errors.name && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.name ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Important Field: Designation */}
                <div className="col-md-6">
                  <label className="fw-semibold small d-flex justify-content-between">
                    <span>Designation *</span>
                    {errors.designation && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.designation ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Important Field: Phone */}
                <div className="col-md-6">
                  <label className="fw-semibold small d-flex justify-content-between">
                    <span>Phone *</span>
                    {errors.phone && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.phone ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Important Field: District */}
                <div className="col-md-6">
                  <label className="fw-semibold small d-flex justify-content-between">
                    <span>District *</span>
                    {errors.district && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.district ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Important Field: State */}
                <div className="col-md-12">
                  <label className="fw-semibold small d-flex justify-content-between">
                    <span>State *</span>
                    {errors.state && (
                      <span className="text-danger x-small fw-bold">
                        field needed
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.state ? "border-danger bg-danger bg-opacity-10" : ""}`}
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Other/Optional Fields */}
                <div className="col-md-4">
                  <label className="fw-semibold small text-muted">
                    House No (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="houseNum"
                    value={formData.houseNum}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold small text-muted">
                    Village (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold small text-muted">
                    Mandal (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="mandal"
                    value={formData.mandal}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="fw-semibold small text-muted">
                    Country (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">
                    Profile Picture (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">
                    PAN Photo (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    name="panPhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-50 py-2 fw-semibold btn-sm"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success w-50 py-2 fw-bold btn-sm"
                  disabled={submitting}
                >
                  {submitting ? "Updating..." : "Update Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonorProfile;
