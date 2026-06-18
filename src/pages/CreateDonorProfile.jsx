import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DonorSidebar from "../components/DonorSidebar"; // Assuming you have a reusable Sidebar
import { FaUserCircle, FaUpload } from "react-icons/fa";
import { createDonorProfile } from "../apis/donorApis";

const CreateDonorProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    designation: "",
    houseNum: "",
    mandal: "",
    village: "",
    district: "",
    state: "",
    country: "",
    phone: "",
    panNumber: "",
    profilePic: null,
    panPhoto: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profilePic || !formData.panPhoto) {
      toast.error("Please upload both profile picture and PAN photo.");
      return;
    }

    try {
      const response = await createDonorProfile(formData);
      toast.success(response.message || "Profile created successfully");
      navigate("/donor/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create profile");
    }
  };

  return (
    <div className="d-flex">
      <DonorSidebar /> {/* Keeps UI consistent with your other screenshots */}
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="bg-white shadow-sm rounded-4 p-5">
            <h2 className="fw-bold mb-1">Set Up Your Profile</h2>
            <p className="text-muted mb-4">
              Help us build trust—provide your details to get verified.
            </p>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row g-4">
                {/* Profile Image Section */}
                <div className="col-12 text-center mb-3">
                  <div className="position-relative d-inline-block">
                    <FaUserCircle size={100} className="text-secondary" />
                    <label className="btn btn-sm btn-success position-absolute bottom-0 end-0 rounded-circle">
                      <FaUpload />
                      <input
                        type="file"
                        hidden
                        name="profilePic"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="small mt-2">Upload Profile Picture</p>
                </div>

                {/* Personal Details */}
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">Full Name *</label>
                  <input
                    name="name"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold mb-1">Designation *</label>
                  <input
                    name="designation"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">Phone *</label>
                  <input
                    name="phone"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Address */}
                <h5 className="mt-4 mb-2 text-success">Address Details</h5>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">House/Street No.</label>
                  <input
                    name="houseNum"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">Village</label>
                  <input
                    name="village"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold mb-1">Mandal *</label>
                  <input
                    name="mandal"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold mb-1">District *</label>
                  <input
                    name="district"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold mb-1">State *</label>
                  <input
                    name="state"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Verification */}
                <h5 className="mt-4 mb-2 text-success">
                  Verification Documents
                </h5>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">PAN Number *</label>
                  <input
                    name="panNumber"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold mb-1">Upload PAN Card *</label>
                  <input
                    type="file"
                    name="panPhoto"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mt-5 py-3 fw-bold fs-5"
              >
                Complete Setup & Join CareBridge
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonorProfile;
