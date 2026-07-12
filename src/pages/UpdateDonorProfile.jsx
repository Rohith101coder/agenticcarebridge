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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [formData, setFormData] = useState({
    designation: initialData.designation || "",
    houseNum: initialData.houseNum || "",
    village: initialData.village || "",
    mandal: initialData.mandal || "",
    district: initialData.district || "",
    state: initialData.state || "",
    country: initialData.country || "",
    phone: initialData.phone || "",
    profilePic: null,
    panPhoto: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await updateDonorProfile(formData);
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
    <div className="d-flex min-h-screen bg-light position-relative">
      {/* Sidebar overlay / toggle layout with hidden-by-default behavior */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 z-3 bg-white"
          style={{ height: "100vh" }}
        >
          <DonorSidebar />
        </div>
      )}

      {/* Backdrop for overlay click when sidebar is open */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 z-2"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className="flex-grow-1 bg-light pb-5 w-100"
        style={{ marginLeft: isMobile ? "0px" : "250px", minHeight: "100vh" }}
      >
        {/* Top Header with Hamburger / Three Lines Symbol */}
        <div className="bg-white shadow-xs py-2 mb-4 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <button
              className="btn btn-light border-0 shadow-xs d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: "38px", height: "38px" }}
              onClick={() => setShowSidebar(!showSidebar)}
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

        <div className="container px-4" style={{ maxWidth: "800px" }}>
          <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">
            <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-3">
              <FaUserEdit className="text-success fs-3" />
              <h3 className="fw-bold text-success mb-0 fs-4">
                Update Donor Profile
              </h3>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fw-semibold small">Designation</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">Phone</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">House No</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="houseNum"
                    value={formData.houseNum}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">Village</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold small">Mandal</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="mandal"
                    value={formData.mandal}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold small">District</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold small">State</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="fw-semibold small">Country</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">PAN Photo</label>
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
                  className="btn btn-outline-secondary w-50 py-2 fw-semibold"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success w-50 py-2 fw-bold"
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
