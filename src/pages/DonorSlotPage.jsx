import React, { useState, useEffect } from "react";
import DonorSidebar from "../components/DonorSidebar";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaExclamationTriangle,
  FaSpinner,
  FaCalendarCheck,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPendingBookings,
  getConfirmedBookings,
  getCancelledBookings,
  getRejectedBookings,
  getNotVisitedBookings,
  getCompletedBookings,
} from "../apis/donorSlotApis"; // Adjust path as needed

const DonorSlotPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [slots, setSlots] = useState({
    pending: [],
    confirmed: [],
    completed: [],
    rejected: [],
    cancelled: [],
    notvisited: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Cancellation Confirmation Dialog State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [slotToCancel, setSlotToCancel] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const [
        pendingData,
        confirmedData,
        completedData,
        rejectedData,
        cancelledData,
        notVisitedData,
      ] = await Promise.all([
        getPendingBookings(),
        getConfirmedBookings(),
        getCompletedBookings(),
        getRejectedBookings(),
        getCancelledBookings(),
        getNotVisitedBookings(),
      ]);

      setSlots({
        pending: pendingData || [],
        confirmed: confirmedData || [],
        completed: completedData || [],
        rejected: rejectedData || [],
        cancelled: cancelledData || [],
        notvisited: notVisitedData || [],
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch slots:", err);
      setError("Failed to load donation slots. Please try again later.");
      toast.error("Failed to load booking slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCancelDialog = (bookingId) => {
    setSlotToCancel(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!slotToCancel) return;

    try {
      setActionLoading(slotToCancel);
      // If you implement a cancel booking API call, place it here:
      // await cancelBooking(slotToCancel);

      // Local state transition for demonstration or re-fetch
      fetchSlots();
      toast.success("Slot successfully cancelled!");
    } catch (err) {
      console.error("Failed to cancel slot:", err);
      toast.error("Failed to cancel the slot.");
    } finally {
      setActionLoading(null);
      setShowCancelModal(false);
      setSlotToCancel(null);
    }
  };

  const currentList = slots[activeTab] || [];

  return (
    <div className="d-flex min-h-screen bg-light">
      <DonorSidebar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div
        className="pb-5 w-100"
        style={{ marginLeft: "250px", minHeight: "100vh" }}
      >
        {/* Top Header */}
        <div className="bg-white shadow-xs py-2 mb-3 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0 text-success">My Donation Slots</h5>
            <div style={{ width: "60px" }}></div>
          </div>
        </div>

        <div className="container px-4" style={{ maxWidth: "900px" }}>
          {/* Navigation Tabs */}
          <div className="d-flex gap-2 border-bottom pb-3 mb-4 overflow-auto">
            {[
              "pending",
              "confirmed",
              "completed",
              "rejected",
              "cancelled",
              "notvisited",
            ].map((tab) => (
              <button
                key={tab}
                className={`btn btn-sm d-flex align-items-center gap-2 px-3 py-2 fw-semibold rounded-pill ${
                  activeTab === tab ? "btn-success" : "btn-light text-dark"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "pending" && <FaClock />}
                {tab === "confirmed" && <FaCalendarCheck />}
                {tab === "completed" && <FaCheckCircle />}
                {tab === "rejected" && <FaTimesCircle />}
                {tab === "cancelled" && <FaBan />}
                {tab === "notvisited" && <FaExclamationTriangle />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          {loading ? (
            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-xs p-4">
              <FaSpinner className="fa-spin mb-2" size={24} />
              <p className="small mb-0">Loading slots...</p>
            </div>
          ) : currentList.length === 0 ? (
            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-xs p-4">
              <h6 className="fw-semibold">No {activeTab} slots found</h6>
              <p className="small text-secondary mb-0">
                Slots matching this status will appear here.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {currentList.map((item) => {
                const formattedDate = item.createdAt
                  ? item.createdAt.replace("T", " • ")
                  : "N/A";

                return (
                  <div
                    key={item.bookingId}
                    className="card border-0 shadow-xs rounded-3 p-3 bg-white"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-success x-small mb-1">
                          {item.bookingStatus}
                        </span>
                        <h6 className="fw-bold text-dark mb-1">
                          Booking ID: {item.bookingId}
                        </h6>
                        <small className="text-muted d-block">
                          Slot ID: {item.slotId} • Visitors:{" "}
                          {item.numberOfVisitors}
                        </small>
                        <small className="text-secondary d-block mt-1">
                          CareBridge ID: {item.orphanageCareBridgeId}
                        </small>
                        {item.message && (
                          <small className="text-secondary d-block mt-1 italic">
                            Message: {item.message}
                          </small>
                        )}
                      </div>

                      <div className="text-end d-flex flex-column align-items-end gap-2">
                        <small className="text-secondary d-block">
                          Created: {formattedDate}
                        </small>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-light text-dark x-small text-uppercase">
                            {activeTab}
                          </span>

                          {(activeTab === "pending" ||
                            activeTab === "confirmed") && (
                            <button
                              className="btn btn-outline-danger btn-sm p-1 d-flex align-items-center justify-content-center"
                              style={{ width: "28px", height: "28px" }}
                              onClick={() =>
                                handleOpenCancelDialog(item.bookingId)
                              }
                              disabled={actionLoading === item.bookingId}
                              title="Cancel Slot"
                            >
                              <FaBan size={12} />
                            </button>
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

      {/* Cancel Confirmation Dialog Box */}
      {showCancelModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-danger">
                  Confirm Slot Cancellation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCancelModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary small mb-0">
                  Are you sure you want to cancel this visit slot? This action
                  cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm rounded-pill px-3"
                  onClick={() => setShowCancelModal(false)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm rounded-pill px-3"
                  onClick={confirmCancel}
                  disabled={actionLoading !== null}
                >
                  {actionLoading !== null ? "Cancelling..." : "Confirm Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorSlotPage;
