import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DonorSidebar from "../components/DonorSidebar";
import { updateDonorProfile } from "../apis/donorApis";

const UpdateDonorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state || {};

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
      const response = await updateDonorProfile(formData);

      toast.success(response.message);

      navigate("/donor/profile");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to update profile.",
      );
    }
  };

  return (
    <div className="d-flex">
      <DonorSidebar />

      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="bg-white shadow-sm rounded-4 p-5">
            <h2 className="fw-bold text-success mb-4">Update Donor Profile</h2>

            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fw-semibold">Designation</label>

                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Phone</label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">House No</label>

                  <input
                    type="text"
                    className="form-control"
                    name="houseNum"
                    value={formData.houseNum}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Village</label>

                  <input
                    type="text"
                    className="form-control"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">Mandal</label>

                  <input
                    type="text"
                    className="form-control"
                    name="mandal"
                    value={formData.mandal}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">District</label>

                  <input
                    type="text"
                    className="form-control"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">State</label>

                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Country</label>

                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Profile Picture</label>

                  <input
                    type="file"
                    className="form-control"
                    name="profilePic"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="fw-semibold">PAN Photo</label>

                  <input
                    type="file"
                    className="form-control"
                    name="panPhoto"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <button
                className="btn btn-success w-100 mt-4 fw-bold py-2"
                type="submit"
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonorProfile;
