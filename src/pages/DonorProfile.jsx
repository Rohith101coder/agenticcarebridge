import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonorSidebar from "../components/DonorSidebar";
import { getDonorProfile } from "../apis/donorApis";
import profileImg from "../assets/profile.jpg";

import {
  FaUser,
  FaPhone,
  FaIdCard,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getDonorProfile();
      setDonor(response);
    } catch (err) {
      console.log(err);
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
   navigate("/donor/update-profile", {
     state: {
       designation: donor?.designation,
       houseNum: donor?.houseNum,
       village: donor?.village,
       mandal: donor?.mandal,
       district: donor?.district,
       state: donor?.state,
       country: donor?.country,
       phone: donor?.phone,
       profilePic: donor?.profilePic,
       panPhoto: donor?.panPhoto,
     },
   });
 };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <DonorSidebar />

      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "1000px" }}>
          {/* Header */}

          <div className="bg-white shadow-sm rounded-4 p-4 mb-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={donor?.profilePic || profileImg}
                alt="Donor"
                className="rounded-circle me-3 border shadow"
                style={{
                  width: "85px",
                  height: "85px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedImage(donor?.profilePic || profileImg);
                  setImageTitle("Profile Picture");
                  setShowImageModal(true);
                }}
              />
              <div>
                <h3 className="fw-bold mb-1">{donor?.name}</h3>

                <p className="text-muted mb-1">
                  CareBridge ID : {donor?.careBridgeID}
                </p>

                <p className="text-muted mb-0">
                  Joined : {formatDate(donor?.createdAt)}
                </p>
              </div>
            </div>

            <div className="text-end">
              <div
                className={`badge px-3 py-2 mb-3 ${
                  donor?.donorStatus === "VERIFIED"
                    ? "bg-success"
                    : donor?.donorStatus === "NOT_VERIFIED"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                }`}
              >
                {donor?.donorStatus}
              </div>

              <br />

              <button
                className="btn btn-outline-success"
                onClick={handleEditProfile}
              >
                Edit Details
              </button>
            </div>
          </div>

          <div className="row g-4">
            {/* Left Column */}

            <div className="col-md-7">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-4">
                  <FaUser className="me-2" />
                  Personal Information
                </h5>

                <p>
                  <strong>Full Name:</strong>
                  <br />
                  {donor?.name}
                </p>

                <p>
                  <strong>Designation:</strong>
                  <br />
                  {donor?.designation}
                </p>

                <p>
                  <FaPhone className="me-2 text-success" />
                  {donor?.phone}
                </p>

                <p>
                  <FaCalendarAlt className="me-2 text-success" />
                  {formatDate(donor?.dateOfBirth)}
                </p>

                <hr />

                <h6 className="fw-bold mb-3">
                  <FaMapMarkerAlt className="me-2 text-success" />
                  Address
                </h6>

                <p className="mb-1">
                  <strong>House No:</strong> {donor?.houseNum || "N/A"}
                </p>

                <p className="mb-1">
                  <strong>Village:</strong> {donor?.village || "N/A"}
                </p>

                <p className="mb-1">
                  <strong>Mandal:</strong> {donor?.mandal || "N/A"}
                </p>

                <p className="mb-1">
                  <strong>District:</strong> {donor?.district || "N/A"}
                </p>

                <p className="mb-1">
                  <strong>State:</strong> {donor?.state || "N/A"}
                </p>

                <p className="mb-0">
                  <strong>Country:</strong> {donor?.country || "N/A"}
                </p>
              </div>
            </div>

            {/* Right Column */}

            <div className="col-md-5">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-4">
                  <FaIdCard className="me-2" />
                  Verification & Documents
                </h5>

                <p>
                  <strong>CareBridge ID</strong>
                  <br />
                  {donor?.careBridgeID}
                </p>

                <p>
                  <strong>PAN Number</strong>
                  <br />
                  {donor?.panNumber}
                </p>

                <p>
                  <strong>Verification Status</strong>
                  <br />

                  <span
                    className={`badge ${
                      donor?.donorStatus === "VERIFIED"
                        ? "bg-success"
                        : donor?.donorStatus === "NOT_VERIFIED"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                    }`}
                  >
                    {donor?.donorStatus}
                  </span>
                </p>

                <p>
                  <strong>Subscription Status</strong>
                  <br />

                  <span
                    className={`badge ${
                      donor?.subscriptionStatus === "ACTIVE"
                        ? "bg-success"
                        : donor?.subscriptionStatus === "EXPIRED"
                          ? "bg-danger"
                          : "bg-secondary"
                    }`}
                  >
                    {donor?.subscriptionStatus}
                  </span>
                </p>

                <hr />

                <p className="small text-muted mb-2">PAN Card</p>

                {donor?.panPhoto ? (
                  <img
                    src={donor?.panPhoto}
                    alt="PAN Card"
                    className="img-thumbnail w-100"
                    style={{
                      maxHeight: "180px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedImage(donor?.panPhoto);
                      setImageTitle("PAN Card");
                      setShowImageModal(true);
                    }}
                  />
                ) : (
                  <div className="alert alert-light border text-center mb-0">
                    No PAN image available
                  </div>
                )}
              </div>
            </div>

            <hr className="mt-4" />

            {/* Account Information */}

            <div className="col-12">
              <div className="bg-white shadow-sm rounded-4 p-4">
                <h5 className="fw-bold text-success mb-4">
                  <FaCheckCircle className="me-2" />
                  Account Information
                </h5>

                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Joined Date</strong>
                      <br />
                      {formatDate(donor?.createdAt)}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Last Updated</strong>
                      <br />
                      {formatDate(donor?.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Image Modal */}

      {showImageModal && (
        <>
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.85)",
            }}
            onClick={() => setShowImageModal(false)}
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div
                className="modal-content border-0 bg-transparent shadow-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-body text-center position-relative">
                  <button
                    className="btn btn-light rounded-circle position-absolute"
                    style={{
                      top: "10px",
                      right: "10px",
                      zIndex: 1000,
                    }}
                    onClick={() => setShowImageModal(false)}
                  >
                    ✕
                  </button>

                  <h5 className="text-white mb-4">{imageTitle}</h5>

                  <img
                    src={selectedImage}
                    alt={imageTitle}
                    className="img-fluid rounded shadow"
                    style={{
                      maxHeight: "85vh",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default DonorProfile;