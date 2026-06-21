import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrphanageProfile } from "../apis/orphanageApis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrphanageCreateProfile = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    orphanageName: "",
    admin: "",
    village: "",
    mandal: "",
    district: "",
    state: "",
    country: "",
    numberOfChildren: "",
    orphanageEmail: "",
    orphanagePhone: "",
    websiteLink: "",
    socialMediaLinks: "",
    darpanId: "",
    panNumber: "",
    panPhoto: null,
    jjActCertificatePhoto: null,
    orphanageProfilePic: null,
    adminProfilePic: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.panPhoto || !formData.jjActCertificatePhoto) {
      toast.error("Please upload PAN photo and JJ Act certificate.");
      return;
    }

    const payload = {
      ...formData,
      numberOfChildren: parseInt(formData.numberOfChildren, 10),
    };

    try {
    const response = await createOrphanageProfile(payload);

    setOtpSent(true);

    toast.success(response.message || "OTP sent successfully.");
    navigate("/orphanage/verify-otp",{
      state : formData.orphanageEmail
    });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create orphanage profile",
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light py-5">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="bg-white shadow rounded-4 p-5 mb-5">
              <h2 className="fw-bold mb-3">Register Orphanage Profile</h2>
              <p className="text-muted mb-4">
                Create your orphanage profile and verify via OTP to start
                managing needs and donations.
              </p>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Orphanage Name*</label>
                    <input
                      name="orphanageName"
                      value={formData.orphanageName}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. Little Angels Orphanage"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Admin Name*</label>
                    <input
                      name="admin"
                      value={formData.admin}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">District*</label>
                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. Hyderabad"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State*</label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. Telangana"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Country*</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. India"
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Mandal</label>
                    <input
                      name="mandal"
                      value={formData.mandal}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. Shaikpet"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Village</label>
                    <input
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. Banjara Hills"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Children Count*</label>
                    <input
                      name="numberOfChildren"
                      type="number"
                      min="1"
                      value={formData.numberOfChildren}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. 45"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Orphanage Email*</label>
                    <input
                      name="orphanageEmail"
                      type="email"
                      value={formData.orphanageEmail}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. contact@orphanage.org"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Phone*{" "}
                      <span className="text-muted small">
                        (Format: +91XXXXXXXXXX)
                      </span>
                    </label>
                    <input
                      name="orphanagePhone"
                      value={formData.orphanagePhone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. +919876543210"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Darpan ID*{" "}
                      <span className="text-muted small">
                        (e.g. MH/2018/0123456)
                      </span>
                    </label>
                    <input
                      name="darpanId"
                      value={formData.darpanId}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      PAN Number*{" "}
                      <span className="text-muted small">
                        (e.g. ABCDE1234F)
                      </span>
                    </label>
                    <input
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Website Link{" "}
                      <span className="text-muted small">
                        (e.g. https://www.example.org)
                      </span>
                    </label>
                    <input
                      name="websiteLink"
                      value={formData.websiteLink}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Social Media Links{" "}
                      <span className="text-muted small">
                        (e.g. https://instagram.com/handle)
                      </span>
                    </label>
                    <input
                      name="socialMediaLinks"
                      value={formData.socialMediaLinks}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">PAN Photo*</label>
                    <input
                      name="panPhoto"
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                      accept="image/*"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">JJ Act Certificate*</label>
                    <input
                      name="jjActCertificatePhoto"
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                      accept="image/*"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Orphanage Profile Picture
                    </label>
                    <input
                      name="orphanageProfilePic"
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                      accept="image/*"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Admin Profile Picture</label>
                    <input
                      name="adminProfilePic"
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                      accept="image/*"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg mt-4 w-100"
                  disabled={otpSent}
                >
                  {otpSent ? "OTP Sent" : "Submit Orphanage Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrphanageCreateProfile;
