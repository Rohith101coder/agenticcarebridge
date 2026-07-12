import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCoins,
  FaCheckCircle,
  FaExclamationCircle,
  FaBoxes,
  FaTag,
  FaBuilding,
  FaHeart,
} from "react-icons/fa";
import DonorSidebar from "../components/DonorSidebar";
import { getCategoryIcon } from "../utils/categoryIcons";
import DonationModal from "../components/DonationModal";

const SingleNeedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const need = location.state?.need;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-danger";
      case "MEDIUM":
        return "bg-warning text-dark";
      case "LOW":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  if (!need) {
    return (
      <div className="d-flex min-h-screen bg-light align-items-center justify-content-center w-100 flex-column">
        <h5 className="fw-bold text-muted mb-3">No Need Data Provided</h5>
        <button onClick={() => navigate(-1)} className="btn btn-success btn-sm">
          <FaArrowLeft className="me-1" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex min-h-screen bg-light">
      <DonorSidebar />

      <div
        className="pb-5 w-100"
        style={{ marginLeft: "250px", minHeight: "100vh" }}
      >
        {/* Top Header */}
        <div className="bg-white shadow-xs py-2 mb-3 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
            >
              <FaArrowLeft /> Back
            </button>
            <h5 className="fw-bold mb-0 text-success">Need Details</h5>
            <div style={{ width: "60px" }}></div>
          </div>
        </div>

        <div className="container px-4" style={{ maxWidth: "1000px" }}>
          <div className="row g-3">
            {/* Left Column: Image & Badges */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-xs rounded-4 overflow-hidden h-100 bg-white p-3 text-center">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-success x-small">
                    {need.category}
                  </span>
                  <span
                    className={`badge x-small ${getPriorityBadge(need.priority)}`}
                  >
                    {need.priority} Priority
                  </span>
                </div>

                <div className="bg-light rounded-3 py-3 my-2">
                  <img
                    src={getCategoryIcon(need.category)}
                    alt={need.name}
                    className="object-fit-contain"
                    style={{ height: "180px", width: "100%" }}
                  />
                </div>

                <div className="text-start mt-2">
                  <h5 className="fw-bold text-dark mb-1">{need.name}</h5>
                  <p className="text-muted small mb-0 d-flex align-items-center gap-1">
                    <FaTag className="text-success x-small" /> ID:{" "}
                    {need.needItemId}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Details & CTA */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-xs rounded-4 p-3 h-100 d-flex flex-column bg-white">
                <h6 className="fw-bold text-dark border-bottom pb-1 mb-2 small">
                  Description
                </h6>
                <p
                  className="text-secondary small mb-3"
                  style={{ fontSize: "0.85rem", lineHeight: "1.5" }}
                >
                  {need.description || "No description provided."}
                </p>

                {/* Quantitative Status Grid */}
                <h6 className="fw-bold text-dark border-bottom pb-1 mb-2 small">
                  Quantity Status
                </h6>
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <div className="bg-light p-2 rounded-2 text-center">
                      <span className="text-muted d-block x-small">
                        Required
                      </span>
                      <span className="fw-bold text-dark small">
                        {Number(need.quantity) - Number(need.fulfilledQuantity) - Number(need.reservedQuantity)}
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-success-subtle p-2 rounded-2 text-center">
                      <span className="text-success d-block x-small">
                        <FaCheckCircle /> Fulfilled
                      </span>
                      <span className="fw-bold text-dark small">
                        {need.fulfilledQuantity}
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-warning-subtle p-2 rounded-2 text-center">
                      <span className="text-warning d-block x-small">
                        <FaExclamationCircle /> Reserved
                      </span>
                      <span className="fw-bold text-dark small">
                        {need.reservedQuantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="d-flex align-items-center justify-content-between p-2 bg-success bg-opacity-10 rounded-2 mb-3 border border-success border-opacity-25 small text-success">
                  <span className="fw-semibold d-flex align-items-center gap-1">
                    <FaCoins /> Unit Price
                  </span>
                  <span className="fw-bold text-dark">
                    ₹{need.pricePerQuantity}
                  </span>
                </div>

                {/* Orphanage Info */}
                <div className="p-2 bg-light rounded-2 mb-3">
                  <p className="fw-bold text-dark mb-0 small d-flex align-items-center gap-1">
                    <FaBuilding className="text-success x-small" /> CareBridge
                    ID: {need.orphanageCareBridgeId}
                  </p>
                </div>

                {/* Donate CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-success fw-bold py-2 rounded-2 shadow-xs border-0 w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
                >
                  <FaHeart className="text-danger" /> Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        needItemId={need?.needItemId}
      />
    </div>
  );
};

export default SingleNeedPage;
