import React, { useEffect, useState } from "react";
import OrphanageSidebar from "../components/OrphanageSidebar";
import { getOrphanageProfile } from "../apis/orphanageApis";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaGlobe,
  FaIdCard,
  FaBuilding,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const OrphanageProfilePage = () => {
  const [orphanage, setOrphanage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getOrphanageProfile();

      setOrphanage(response);
    } catch (error) {
      console.error(error);
      
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
    navigate("/orphanage/update-profile", {
      state: {
        adminName: orphanage?.adminName,
        village: orphanage?.village,
        mandal: orphanage?.mandal,
        district: orphanage?.district,
        state: orphanage?.state,
        country: orphanage?.country,
        numberOfChildren: orphanage?.numberOfChildren,
        orphanagePhone: orphanage?.orphanagePhone,
        websiteLink: orphanage?.websiteLink,
        socialMediaLinks: orphanage?.socialMediaLinks,
        orphanageProfilePic: orphanage?.orphanageProfilePic,
        adminProfilePic: orphanage?.adminProfilePic,
      },
    });
  };
  // Mock data structure based on your entity
  // In a real app, fetch this data from your API

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success" />
      </div>
    );
  }
  return (
    <div className="d-flex">
      <OrphanageSidebar />
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "1000px" }}>
          {/* Header Card */}
          <div className="bg-white shadow-sm rounded-4 p-4 mb-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={orphanage?.orphanageProfilePic || "/default-avatar.png"}
                alt="Orphanage"
                className="rounded-circle me-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <h3 className="fw-bold mb-1">{orphanage?.orphanageName}</h3>
                <p className="text-muted mb-0">
                  CareBridge ID: {orphanage?.carebridgeId}
                </p>
                <p className="text-muted mb-0">
                  Joined: {formatDate(orphanage?.createdAt)}
                </p>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-pill ${orphanage?.verificationStatus === "VERIFIED" ? "bg-success text-white" : "bg-warning"}`}
            >
              {orphanage?.verificationStatus}
            </div>
            <button
              className="btn btn-outline-success"
              onClick={handleEditProfile}
            >
              Edit Details
            </button>
          </div>

          <div className="row g-4">
            {/* Left Column: Core Details */}
            <div className="col-md-7">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-3">
                  <FaBuilding className="me-2" /> Organization Details
                </h5>
                <p>
                  <strong>Admin:</strong> {orphanage?.adminName}
                </p>
                <p>
                  <strong>Location:</strong> {orphanage?.village},{" "}
                  {orphanage?.mandal}, {orphanage?.district}, {orphanage?.state}
                  , {orphanage?.country}
                </p>
                <p>
                  <strong>Children Count:</strong> {orphanage?.numberOfChildren}
                </p>
                <hr />
                <p>
                  <FaEnvelope className="me-2" /> {orphanage?.orphanageEmail}{" "}
                  {orphanage?.orphanageEmailVerified && (
                    <FaCheckCircle className="text-success" />
                  )}
                </p>
                <p>
                  <FaPhone className="me-2" /> {orphanage?.orphanagePhone}
                </p>
                <p>
                  <FaGlobe className="me-2" />{" "}
                  <a
                    href={orphanage?.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Website
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column: Verification & Documents */}
            <div className="col-md-5">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold text-success mb-3">
                  <FaIdCard className="me-2" /> Verification & Docs
                </h5>
                <p>
                  <strong>Darpan ID:</strong> {orphanage?.darpanId}
                </p>
                <p>
                  <strong>PAN Number:</strong> {orphanage?.panNumber}
                </p>
                <p>
                  <strong>Email Verification:</strong>{" "}
                  {orphanage?.orphanageEmailVerified ? (
                    <span className="text-success">Verified</span>
                  ) : (
                    <span className="text-danger">Not Verified</span>
                  )}
                </p>

                <p>
                  <strong>Verification Status:</strong>{" "}
                  {orphanage?.verificationStatus}
                </p>

                <div className="mt-3">
                  <p className="small text-muted mb-1">PAN Photo</p>
                  <img
                    src={orphanage?.panPhoto}
                    alt="PAN"
                    className="img-thumbnail w-100 mb-2"
                    style={{ maxHeight: "100px" }}
                  />

                  <p className="small text-muted mb-1">JJ Act Certificate</p>
                  <img
                    src={orphanage?.jjActCertificatePhoto}
                    alt="JJ Act"
                    className="img-thumbnail w-100"
                    style={{ maxHeight: "100px" }}
                  />
                </div>
              </div>
            </div>
            <hr />

            <div className="mt-3">
              <p>
                <strong>Joined Date:</strong>
                <br />
                {formatDate(orphanage?.createdAt)}
              </p>

              <p>
                <strong>Last Updated:</strong>
                <br />
                {formatDate(orphanage?.updateAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageProfilePage;
