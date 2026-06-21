import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCoins,
  FaCheckCircle,
  FaExclamationCircle,
  FaBoxes,
  FaTag,
  FaBuilding,
} from "react-icons/fa";
import DonorSidebar from "../components/DonorSidebar";
import { getCategoryIcon } from "../utils/categoryIcons";

const SingleNeedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const need = location.state?.need; // Accessing the data passed via navigate

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
        <h3 className="fw-bold text-muted mb-3">No Need Data Provided</h3>
        <button onClick={() => navigate(-1)} className="btn btn-success">
          <FaArrowLeft className="me-2" /> Go Back
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
        {/* Top Header / Back Button */}
        <div className="bg-white shadow-sm py-3 mb-4 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-success d-flex align-items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
            <h4 className="fw-bold mb-0 text-success">Need Details</h4>
            <div style={{ width: "80px" }}></div>
          </div>
        </div>

        <div className="container px-4">
          <div className="row g-4">
            {/* Left Column: Image & Basic Info */}
            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                <img
                  src={getCategoryIcon(need.category)}
                  alt={need.name}
                  className="card-img-top bg-light object-fit-cover"
                  style={{ height: "300px" }}
                />
                <div className="card-body p-4">
                  <div className="d-flex gap-2 mb-3">
                    <span className="badge bg-success fs-6">
                      {need.category}
                    </span>
                    <span
                      className={`badge ${getPriorityBadge(need.priority)} fs-6`}
                    >
                      {need.priority} Priority
                    </span>
                  </div>
                  <h3 className="fw-bold text-dark mb-2">{need.name}</h3>
                  <p className="text-muted d-flex align-items-center gap-2 mb-0">
                    <FaTag className="text-success" /> Need ID:{" "}
                    <span className="fw-semibold">{need.needItemId}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Details, Orphanage Info, and Donate Button */}
            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column">
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                  Description
                </h5>
                <p
                  className="text-secondary mb-4"
                  style={{ lineHeight: "1.6" }}
                >
                  {need.description ||
                    "No detailed description provided for this need item."}
                </p>

                {/* Quantitative Breakdown */}
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                  Quantity Status
                </h5>
                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <div className="bg-light p-3 rounded-3 text-center">
                      <FaBoxes className="fs-4 text-muted d-block mx-auto mb-2" />
                      <span className="text-muted small d-block">
                        Total Qty
                      </span>
                      <span className="fw-bold fs-5 text-dark">
                        {need.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-success-subtle p-3 rounded-3 text-center">
                      <FaCheckCircle className="fs-4 text-success d-block mx-auto mb-2" />
                      <span className="text-success small d-block">
                        Fulfilled Qty
                      </span>
                      <span className="fw-bold fs-5 text-dark">
                        {need.fulfilledQuantity}
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-warning-subtle p-3 rounded-3 text-center">
                      <FaExclamationCircle className="fs-4 text-warning d-block mx-auto mb-2" />
                      <span className="text-warning small d-block">
                        Reserved Qty
                      </span>
                      <span className="fw-bold fs-5 text-dark">
                        {need.reservedQuantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial/Unit Info */}
                <div className="d-flex align-items-center justify-content-between p-3 bg-success bg-opacity-10 rounded-3 mb-4 border border-success border-opacity-25">
                  <span className="fw-semibold text-success d-flex align-items-center gap-2">
                    <FaCoins className="fs-5" /> Price Per Unit
                  </span>
                  <span className="fw-bold fs-4 text-dark">
                    ₹{need.pricePerQuantity}
                  </span>
                </div>

                {/* Orphanage / CareBridge Reference */}
                <div className="p-3 bg-light rounded-3 mb-4 flex-grow-1">
                  <span className="text-muted small d-block mb-1 fw-semibold text-uppercase tracking-wide">
                    Orphanage Details
                  </span>
                  <p className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                    <FaBuilding className="text-success" /> CareBridge ID:{" "}
                    {need.orphanageCareBridgeId}
                  </p>
                  {need.orphanage && (
                    <small className="text-muted d-block">
                      {need.orphanage.orphanageName} • {need.orphanage.district}
                      , {need.orphanage.state}
                    </small>
                  )}
                  {/* Product links list if any */}
                  {need.productLinks && need.productLinks.length > 0 && (
                    <div className="mt-3 border-top pt-2">
                      <small className="fw-semibold text-muted d-block mb-1">
                        Reference Links:
                      </small>
                      <ul className="ps-3 mb-0 small">
                        {need.productLinks.map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-success text-decoration-underline"
                            >
                              Product Link {idx + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Donate Now CTA */}
                <Link
                  to={`/donor/donate/${need.needItemId}`}
                  className="btn btn-success btn-lg fw-bold py-3 rounded-3 shadow-sm text-decoration-none d-flex align-items-center justify-content-center"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNeedPage;
