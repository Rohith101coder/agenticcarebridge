import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrphanageSidebar from "../components/OrphanageSidebar";
import {updateProfileApi} from "../apis/orphanageApis"; // Import your API function

const UpdateOrphanageProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

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

    // const data = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (value !== null) data.append(key, value);
    // });

    try {
     const response =  await updateProfileApi(formData);
      toast.success("Profile updated successfully!"+ response.message);
      navigate("/orphanage/dashboard");
    } catch (error) {
        console.log(error);
        
      toast.error("Failed to update profile." + error);
    }
  };

  return (
    <div className="d-flex">
      <OrphanageSidebar />
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="bg-white shadow-sm rounded-4 p-5">
            <h2 className="fw-bold mb-4 text-success">Edit Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fw-semibold">Admin Name</label>
                  <input
                    name="adminName"
                    className="form-control"
                    value={formData.adminName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Phone</label>
                  <input
                    name="orphanagePhone"
                    className="form-control"
                    value={formData.orphanagePhone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="fw-semibold">Village</label>
                  <input
                    name="village"
                    className="form-control"
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold">Mandal</label>
                  <input
                    name="mandal"
                    className="form-control"
                    value={formData.mandal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="fw-semibold">District</label>
                  <input
                    name="district"
                    className="form-control"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">State</label>
                  <input
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Country</label>
                  <input
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="fw-semibold">Number of Children</label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    className="form-control"
                    value={formData.numberOfChildren}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Website</label>
                  <input
                    name="websiteLink"
                    className="form-control"
                    value={formData.websiteLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Social Media</label>
                  <input
                    name="socialMediaLinks"
                    className="form-control"
                    value={formData.socialMediaLinks}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fw-semibold">Orphanage Profile Pic</label>
                  <input
                    type="file"
                    name="orphanageProfilePic"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold">Admin Profile Pic</label>
                  <input
                    type="file"
                    name="adminProfilePic"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mt-4 py-2 fw-bold"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrphanageProfile;
