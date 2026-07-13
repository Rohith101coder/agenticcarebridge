import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/OrphanageSidebar";
import { updateProfileApi } from "../apis/orphanageApis";
import { FaBars, FaTimes, FaUserEdit } from "react-icons/fa";

const UpdateOrphanageProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  // Responsive mobile states
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [submitting, setSubmitting] = useState(false);

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
    adminName: initialData.adminName || "",
    village: initialData.village || "",
    mandal: initialData.mandal || "",
    district: initialData.district || "",
    state: initialData.state || "",
    country: initialData.country || "",
    numberOfChildren: initialData.numberOfChildren || "",
    orphanagePhone: initialData.orphanagePhone || "",
    websiteLink: initialData.websiteLink || "",
    socialMediaLinks: initialData.socialMediaLinks || "",
    orphanageProfilePic: null,
    adminProfilePic: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await updateProfileApi(formData);
      toast.success(
        "Profile updated successfully! " + (response?.message || ""),
      );
      navigate("/orphanage/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to update profile. " +
          (error?.response?.data?.message || error?.message || ""),
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
          <Sidebar />
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
            <h5 className="fw-bold mb-0 text-success">Edit Profile</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "800px" }}>
          <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">
            <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-3">
              <FaUserEdit className="text-success fs-3" />
              <h2 className="fw-bold mb-0 text-success fs-4">Edit Profile</h2>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fw-semibold small">Admin Name</label>
                  <input
                    name="adminName"
                    className="form-control form-control-sm"
                    value={formData.adminName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold small">Phone</label>
                  <input
                    name="orphanagePhone"
                    className="form-control form-control-sm"
                    value={formData.orphanagePhone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold small">Village</label>
                  <input
                    name="village"
                    className="form-control form-control-sm"
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold small">Mandal</label>
                  <input
                    name="mandal"
                    className="form-control form-control-sm"
                    value={formData.mandal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold small">District</label>
                  <input
                    name="district"
                    className="form-control form-control-sm"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">State</label>
                  <input
                    name="state"
                    className="form-control form-control-sm"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold small">Country</label>
                  <input
                    name="country"
                    className="form-control form-control-sm"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="fw-semibold small">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    className="form-control form-control-sm"
                    value={formData.numberOfChildren}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">Website</label>
                  <input
                    name="websiteLink"
                    className="form-control form-control-sm"
                    value={formData.websiteLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold small">Social Media</label>
                  <input
                    name="socialMediaLinks"
                    className="form-control form-control-sm"
                    value={formData.socialMediaLinks}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold small">
                    Orphanage Profile Pic
                  </label>
                  <input
                    type="file"
                    name="orphanageProfilePic"
                    className="form-control form-control-sm"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold small">Admin Profile Pic</label>
                  <input
                    type="file"
                    name="adminProfilePic"
                    className="form-control form-control-sm"
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
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrphanageProfile;
