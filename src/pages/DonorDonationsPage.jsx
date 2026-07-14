import React, { useState, useEffect } from "react";
import DonorSidebar from "../components/DonorSidebar";
import {
  FaClock,
  FaCheckCircle,
  FaBoxOpen,
  FaBan,
  FaTrash,
  FaEdit,
  FaSpinner,
  FaBars,
  FaTimes,
  FaSearchPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPendingDonations,
  getCompletedDonations,
  getDeliveredDonations,
  getCancelledDonations,
  deletePendingDonation,
  updateDonation,
} from "../apis/donorDonationApis";

const DonorDonationsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [donations, setDonations] = useState({
    pending: [],
    completed: [],
    delivered: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Responsive mobile states for persistent desktop and toggleable mobile sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Delete Confirmation Dialog State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);

  // Edit Modal Dialog State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    donationId: "",
    quantity: "",
    donationType: "IN_PERSON",
    expectedVisitDateTime: "",
    expectedDeliveryDate: "",
    platformName: "",
    trackingId: "",
    message: "",
    orderProofImage: null,
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const [pendingData, completedData, deliveredData, cancelledData] =
        await Promise.all([
          getPendingDonations(),
          getCompletedDonations(),
          getDeliveredDonations(),
          getCancelledDonations(),
        ]);

      setDonations({
        pending: pendingData || [],
        completed: completedData || [],
        delivered: deliveredData || [],
        cancelled: cancelledData || [],
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
      setError("Failed to load donations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (donationId) => {
    setDonationToDelete(donationId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!donationToDelete) return;

    try {
      setActionLoading(donationToDelete);
      await deletePendingDonation(donationToDelete);
      setDonations((prev) => ({
        ...prev,
        pending: prev.pending.filter(
          (item) => item.donationId !== donationToDelete,
        ),
      }));
      toast.success("Pending donation successfully deleted!");
    } catch (err) {
      console.error("Failed to delete donation:", err);
      toast.error("Failed to delete the donation.");
    } finally {
      setActionLoading(null);
      setShowDeleteModal(false);
      setDonationToDelete(null);
    }
  };

  const handleOpenEditModal = (item) => {
    setEditData({
      donationId: item.donationId,
      quantity: item.quantity || "",
      donationType: item.donationType || "IN_PERSON",
      expectedVisitDateTime: item.expectedVisitDateTime
        ? item.expectedVisitDateTime.slice(0, 16)
        : "",
      expectedDeliveryDate: item.expectedDeliveryDate || "",
      platformName: item.platformName || "",
      trackingId: item.trackingId || "",
      message: item.message || "",
      orderProofImage: null,
    });
    setModalError(null);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "orderProofImage") {
      setEditData((prev) => ({ ...prev, orderProofImage: files[0] }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setModalSubmitting(true);
      setModalError(null);

      const payload = {
        quantity: editData.quantity ? Number(editData.quantity) : null,
        donationType: editData.donationType,
        expectedVisitDateTime:
          editData.donationType === "IN_PERSON"
            ? editData.expectedVisitDateTime
            : null,
        expectedDeliveryDate:
          editData.donationType === "ONLINE_ORDER"
            ? editData.expectedDeliveryDate
            : null,
        platformName:
          editData.donationType === "ONLINE_ORDER"
            ? editData.platformName
            : null,
        trackingId:
          editData.donationType === "ONLINE_ORDER" ? editData.trackingId : null,
        message: editData.message,
        orderProofImage: editData.orderProofImage,
      };

      await updateDonation(editData.donationId, payload);
      setShowEditModal(false);
      toast.success("Donation successfully updated!");
      fetchDonations();
    } catch (err) {
      console.error("Failed to update donation:", err);
      setModalError("Failed to update the donation. Please check your data.");
      toast.error("Failed to update the donation.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const currentList = donations[activeTab] || [];

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
          <DonorSidebar />
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

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
            <h5 className="fw-bold mb-0 text-success">My Donations</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "900px" }}>
          {/* Navigation Tabs */}
          <div className="d-flex gap-2 border-bottom pb-3 mb-4 overflow-auto">
            {["pending", "completed", "delivered", "cancelled"].map((tab) => (
              <button
                key={tab}
                className={`btn btn-sm d-flex align-items-center gap-2 px-3 py-2 fw-semibold rounded-pill text-nowrap ${
                  activeTab === tab ? "btn-success" : "btn-light text-dark"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "pending" && <FaClock />}
                {tab === "completed" && <FaCheckCircle />}
                {tab === "delivered" && <FaBoxOpen />}
                {tab === "cancelled" && <FaBan />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          {loading ? (
            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-xs p-4">
              <FaSpinner className="fa-spin mb-2" size={24} />
              <p className="small mb-0">Loading donations...</p>
            </div>
          ) : currentList.length === 0 ? (
            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-xs p-4">
              <h6 className="fw-semibold">No {activeTab} donations found</h6>
              <p className="small text-secondary mb-0">
                Donations matching this status will appear here.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {currentList.map((item) => {
                const displayDate =
                  item.expectedDeliveryDate ||
                  (item.expectedVisitDateTime
                    ? item.expectedVisitDateTime.split("T")[0]
                    : "N/A");

                return (
                  <div
                    key={item.donationId}
                    className="card border-0 shadow-xs rounded-3 p-3 bg-white"
                  >
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <div>
                        <span className="badge bg-success x-small mb-1">
                          {item.donationType}
                        </span>
                        <h6 className="fw-bold text-dark mb-1">
                          Item ID: {item.needItemId}
                        </h6>
                        <small className="text-muted d-block">
                          Donation ID: {item.donationId} • Qty: {item.quantity}
                        </small>
                        {item.message && (
                          <small className="text-secondary d-block mt-1 italic">
                            Note: {item.message}
                          </small>
                        )}
                      </div>

                      <div className="text-end d-flex flex-column align-items-end gap-2">
                        <small className="text-secondary d-block">
                          Date: {displayDate}
                        </small>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-light text-dark x-small text-uppercase">
                            {activeTab}
                          </span>

                          {activeTab === "pending" && (
                            <>
                              <button
                                className="btn btn-outline-primary btn-sm p-1 d-flex align-items-center justify-content-center"
                                style={{ width: "28px", height: "28px" }}
                                onClick={() => handleOpenEditModal(item)}
                                title="Edit Donation"
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm p-1 d-flex align-items-center justify-content-center"
                                style={{ width: "28px", height: "28px" }}
                                onClick={() =>
                                  handleOpenDeleteDialog(item.donationId)
                                }
                                disabled={actionLoading === item.donationId}
                                title="Delete Donation"
                              >
                                <FaTrash size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog Box */}
      {showDeleteModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-danger">
                  Confirm Deletion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary small mb-0">
                  Are you sure you want to delete this pending donation? This
                  action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm rounded-pill px-3"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm rounded-pill px-3"
                  onClick={confirmDelete}
                  disabled={actionLoading !== null}
                >
                  {actionLoading !== null ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal Dialog Box */}
      {showEditModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-success">
                  Edit Pending Donation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-body small">
                  {modalError && (
                    <div className="alert alert-danger py-2 mb-3">
                      {modalError}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Donation Type
                    </label>
                    <select
                      className="form-select form-select-sm"
                      name="donationType"
                      value={editData.donationType}
                      onChange={handleEditChange}
                    >
                      <option value="IN_PERSON">IN_PERSON</option>
                      <option value="ONLINE_ORDER">ONLINE_ORDER</option>
                    </select>
                  </div>

                  {editData.donationType === "IN_PERSON" ? (
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">
                        Expected Visit Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control form-control-sm"
                        name="expectedVisitDateTime"
                        value={editData.expectedVisitDateTime}
                        onChange={handleEditChange}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Expected Delivery Date
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name="expectedDeliveryDate"
                          value={editData.expectedDeliveryDate}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Platform Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="platformName"
                          value={editData.platformName}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Tracking ID
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="trackingId"
                          value={editData.trackingId}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">
                          Order Proof Image
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-sm"
                          name="orderProofImage"
                          onChange={handleEditChange}
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Message (Optional)
                    </label>
                    <textarea
                      className="form-control form-control-sm"
                      name="message"
                      rows="2"
                      value={editData.message}
                      onChange={handleEditChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm rounded-pill px-3"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btn-sm rounded-pill px-3"
                    disabled={modalSubmitting}
                  >
                    {modalSubmitting ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDonationsPage;
