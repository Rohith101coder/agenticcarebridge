import React, { useState, useEffect } from "react";
import Sidebar from "../components/OrphanageSidebar";
import {
  FaCheck,
  FaTruck,
  FaBan,
  FaImage,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  getPendingDonations,
  markDonationDelivered,
  getDeliveredDonations,
  getCancelledDonations,
} from "../apis/orpdonationapis";
import { toast } from "react-toastify";

const OrphanageDonationPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedId, setSelectedId] = useState(null);
  const [pendingDonations, setPendingDonations] = useState([]);
  const [loadingPendingDonations, setLoadingPendingDonations] = useState(true);
  const [deliveredDonations, setDeliveredDonations] = useState([]);
  const [cancelledDonations, setCancelledDonations] = useState([]);
  const [loadingCancelledDonations, setLoadingCancelledDonations] =
    useState(false);
  const [loadingDeliveredDonations, setLoadingDeliveredDonations] =
    useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // States for delivery confirmation form
  const [note, setNote] = useState("");
  const [deliveredPhoto, setDeliveredPhoto] = useState(null);

  // Responsive mobile states
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

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

  const fetchPendingDonations = async () => {
    try {
      setLoadingPendingDonations(true);
      const response = await getPendingDonations();
      setPendingDonations(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load donations");
    } finally {
      setLoadingPendingDonations(false);
    }
  };

  const fetchCancelledDonations = async () => {
    try {
      setLoadingCancelledDonations(true);
      const response = await getCancelledDonations();
      setCancelledDonations(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cancelled donations");
    } finally {
      setLoadingCancelledDonations(false);
    }
  };

  useEffect(() => {
    if (activeTab === "pending") {
      fetchPendingDonations();
    }
    if (activeTab === "delivered") {
      fetchDeliveredDonations();
    }
    if (activeTab === "cancelled") {
      fetchCancelledDonations();
    }
  }, [activeTab]);

  const fetchDeliveredDonations = async () => {
    try {
      setLoadingDeliveredDonations(true);
      const response = await getDeliveredDonations();
      setDeliveredDonations(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load delivered donations");
    } finally {
      setLoadingDeliveredDonations(false);
    }
  };

  const openDeliveryModal = (donation) => {
    setSelectedDonation(donation);
    setNote("");
    setDeliveredPhoto(null);
    setShowModal(true);
  };

  const handleConfirmDelivery = async () => {
    if (!note.trim()) {
      toast.error("Please enter a note");
      return;
    }

    if (!deliveredPhoto) {
      toast.error("Please upload received item photo");
      return;
    }

    try {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append("note", note);
      formData.append("deliveredPhoto", deliveredPhoto);

      await markDonationDelivered(selectedDonation.donationRequestId, formData);
      toast.success("Donation marked as delivered");
      setShowModal(false);
      fetchPendingDonations();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to update donation",
      );
    } finally {
      setSubmitLoading(false);
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
        <div className="bg-white shadow-xs py-2 mb-3 sticky-top z-1">
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
            <h5 className="fw-bold mb-0 text-success">Donation Management</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "1200px" }}>
          {/* Tabs */}
          <div className="nav nav-tabs mb-4 overflow-auto flex-nowrap">
            {["pending", "delivered", "cancelled"].map((tab) => (
              <button
                key={tab}
                className={`nav-link text-capitalize text-nowrap ${activeTab === tab ? "active fw-bold text-success" : "text-secondary"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} Donations
              </button>
            ))}
          </div>

          {/* Pending Donations */}
          {activeTab === "pending" &&
            (loadingPendingDonations ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status" />
              </div>
            ) : pendingDonations.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted small">No Pending Donations</h5>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle small">
                  <thead className="table-light">
                    <tr>
                      <th>Donor</th>
                      <th>Need Item</th>
                      <th>Qty</th>
                      <th>Type</th>
                      <th>Delivery Details</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDonations.map((donation) => (
                      <tr key={donation.donationRequestId}>
                        <td>
                          <strong>{donation.donorName}</strong>
                          <br />
                          <small className="text-muted">
                            {donation.donorPhone}
                          </small>
                          <br />
                          <small className="text-muted">
                            {donation.donorEmail}
                          </small>
                        </td>

                        <td>
                          <strong>{donation.itemName}</strong>
                          <br />
                          <small
                            className="text-muted text-truncate d-inline-block"
                            style={{ maxWidth: "150px" }}
                          >
                            {donation.itemDescription}
                          </small>
                          <br />
                          <span className="badge bg-secondary x-small">
                            {donation.category}
                          </span>
                        </td>

                        <td>
                          <strong>{donation.donatedQuantity}</strong>
                        </td>

                        <td>
                          <span className="badge bg-info x-small">
                            {donation.donationType}
                          </span>
                        </td>

                        <td>
                          {donation.donationType === "ONLINE_ORDER" ? (
                            <div className="x-small">
                              <div>Platform: {donation.platformName}</div>
                              <div>Tracking: {donation.trackingId}</div>
                              <div>
                                Delivery: {donation.expectedDeliveryDate}
                              </div>
                            </div>
                          ) : (
                            <div className="x-small">
                              Visit:{" "}
                              {new Date(
                                donation.expectedVisitDateTime,
                              ).toLocaleString()}
                            </div>
                          )}
                        </td>

                        <td>
                          <span className="badge bg-warning text-dark x-small">
                            {donation.donationStatus}
                          </span>
                        </td>

                        <td>
                          <button
                            className="btn btn-success btn-sm p-1.5 px-2 d-flex align-items-center gap-1 x-small fw-semibold"
                            onClick={() => openDeliveryModal(donation)}
                          >
                            <FaCheck size={10} /> Mark Delivered
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

          {/* Delivered Donations */}
          {activeTab === "delivered" &&
            (loadingDeliveredDonations ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status" />
              </div>
            ) : deliveredDonations.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted small">No Delivered Donations</h5>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle small">
                  <thead className="table-success">
                    <tr>
                      <th>Donor</th>
                      <th>Need Item</th>
                      <th>Qty</th>
                      <th>Type</th>
                      <th>Delivery Details</th>
                      <th>Status</th>
                      <th>Completed On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveredDonations.map((donation) => (
                      <tr key={donation.donationRequestId}>
                        <td>
                          <strong>{donation.donorName}</strong>
                          <br />
                          <small className="text-muted">
                            {donation.donorPhone}
                          </small>
                          <br />
                          <small className="text-muted">
                            {donation.donorEmail}
                          </small>
                        </td>

                        <td>
                          <strong>{donation.itemName}</strong>
                          <br />
                          <small
                            className="text-muted text-truncate d-inline-block"
                            style={{ maxWidth: "150px" }}
                          >
                            {donation.itemDescription}
                          </small>
                          <br />
                          <span className="badge bg-secondary x-small">
                            {donation.category}
                          </span>
                        </td>

                        <td>
                          <strong>{donation.donatedQuantity}</strong>
                        </td>

                        <td>
                          <span className="badge bg-info x-small">
                            {donation.donationType}
                          </span>
                        </td>

                        <td>
                          {donation.donationType === "ONLINE_ORDER" ? (
                            <div className="x-small">
                              Platform: {donation.platformName} <br />
                              Tracking: {donation.trackingId} <br />
                              Delivery: {donation.expectedDeliveryDate}
                            </div>
                          ) : (
                            <div className="x-small">
                              Visit:{" "}
                              {new Date(
                                donation.expectedVisitDateTime,
                              ).toLocaleString()}
                            </div>
                          )}
                        </td>

                        <td>
                          <span className="badge bg-success x-small">
                            DELIVERED
                          </span>
                        </td>

                        <td>
                          {new Date(donation.updatedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

          {/* Cancelled Donations */}
          {activeTab === "cancelled" && (
            <>
              {loadingCancelledDonations ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-danger" role="status" />
                </div>
              ) : cancelledDonations.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted small">No Cancelled Donations</h5>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle small">
                    <thead className="table-danger">
                      <tr>
                        <th>Donor</th>
                        <th>Need Item</th>
                        <th>Qty</th>
                        <th>Type</th>
                        <th>Delivery Details</th>
                        <th>Status</th>
                        <th>Cancelled On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancelledDonations.map((donation) => (
                        <tr key={donation.donationRequestId}>
                          <td>
                            <strong>{donation.donorName}</strong>
                            <br />
                            <small className="text-muted">
                              {donation.donorPhone}
                            </small>
                            <br />
                            <small className="text-muted">
                              {donation.donorEmail}
                            </small>
                          </td>

                          <td>
                            <strong>{donation.itemName}</strong>
                            <br />
                            <small
                              className="text-muted text-truncate d-inline-block"
                              style={{ maxWidth: "150px" }}
                            >
                              {donation.itemDescription}
                            </small>
                            <br />
                            <span className="badge bg-secondary x-small">
                              {donation.category}
                            </span>
                          </td>

                          <td>
                            <strong>{donation.donatedQuantity}</strong>
                          </td>

                          <td>
                            <span className="badge bg-info x-small">
                              {donation.donationType}
                            </span>
                          </td>

                          <td>
                            {donation.donationType === "ONLINE_ORDER" ? (
                              <div className="x-small">
                                <strong>Platform:</strong>{" "}
                                {donation.platformName} <br />
                                <strong>Tracking:</strong> {donation.trackingId}{" "}
                                <br />
                                <strong>Delivery:</strong>{" "}
                                {donation.expectedDeliveryDate}
                              </div>
                            ) : (
                              <div className="x-small">
                                <strong>Visit:</strong>{" "}
                                {new Date(
                                  donation.expectedVisitDateTime,
                                ).toLocaleString()}
                              </div>
                            )}
                          </td>

                          <td>
                            <span className="badge bg-danger x-small">
                              CANCELLED
                            </span>
                          </td>

                          <td>
                            {new Date(donation.updatedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delivery Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-4 shadow-lg border-0">
              <h5 className="fw-bold text-success mb-3">
                Confirm Item Receipt
              </h5>
              <div className="modal-body p-0 small">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="3"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Received Item Photo
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
                    accept="image/*"
                    onChange={(e) => setDeliveredPhoto(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 p-0 pt-3">
                <button
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success btn-sm rounded-pill px-3 fw-bold"
                  disabled={submitLoading}
                  onClick={handleConfirmDelivery}
                >
                  {submitLoading ? "Submitting..." : "Confirm Delivery"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrphanageDonationPage;
