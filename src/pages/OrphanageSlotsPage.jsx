import React, { useState, useEffect } from "react";
import Sidebar from "../components/OrphanageSidebar";
import {
  FaCalendarPlus,
  FaClipboardList,
  FaCheck,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createSlot,
  getOrpSlots,
  deleteSlot,
  getSlotBookings,
  confirmBooking,
  rejectBooking,
  getAllApprovedVisits,
  markAsCompleted,
  markAsNotVisited,
} from "../apis/orpslotapis";

const OrphanageSlotsPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [approvedVisits, setApprovedVisits] = useState([]);
  const [loadingApprovedVisits, setLoadingApprovedVisits] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);
  const [processingBooking, setProcessingBooking] = useState(null);
  const [creatingSlot, setCreatingSlot] = useState(false);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [deletingSlotId, setDeletingSlotId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotBookings, setSlotBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

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

  const [slotData, setSlotData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    maxVisitors: "",
    title: "",
    description: "",
  });

  const handleConfirmBooking = async (booking) => {
    try {
      setProcessingBooking(booking.bookingId);
      await confirmBooking(booking.bookingId);
      toast.success("Booking approved successfully");
      fetchSlotBookings();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to approve booking",
      );
    } finally {
      setProcessingBooking(null);
    }
  };

  const handleInputChange = (e) =>
    setSlotData({ ...slotData, [e.target.name]: e.target.value });

  const handleCreateSlot = async () => {
    const { title, date, startTime, endTime, maxVisitors, description } =
      slotData;

    if (
      !title ||
      !date ||
      !startTime ||
      !endTime ||
      !maxVisitors ||
      !description
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const now = new Date();
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (startDateTime <= now) {
      toast.error("Slot must be in the future");
      return;
    }

    const diffInMs = startDateTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      toast.error("Visit slot must be scheduled at least 1 hour from now");
      return;
    }

    if (endDateTime <= startDateTime) {
      const durationMinutes = (endDateTime - startDateTime) / 60000;
      if (durationMinutes < 30) {
        toast.error("Slot duration must be at least 30 minutes");
        return;
      }
      toast.error("End time must be greater than start time");
      return;
    }

    try {
      setCreatingSlot(true);
      const payload = {
        title,
        date,
        startTime,
        endTime,
        maxVisitors: Number(maxVisitors),
        description,
      };

      await createSlot(payload);
      toast.success("Slot created successfully!");
      setSlotData({
        date: "",
        startTime: "",
        endTime: "",
        maxVisitors: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create slot");
    } finally {
      setCreatingSlot(false);
    }
  };

  const fetchApprovedVisits = async () => {
    try {
      setLoadingApprovedVisits(true);
      const response = await getAllApprovedVisits();
      setApprovedVisits(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load approved visits");
    } finally {
      setLoadingApprovedVisits(false);
    }
  };

  const fetchSlots = async () => {
    try {
      setLoadingSlots(true);
      const response = await getOrpSlots();
      setSlots(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (activeTab === "slots") {
      fetchSlots();
    }
    if (activeTab === "bookings") {
      fetchSlotBookings();
    }
    if (activeTab === "approvals") {
      fetchApprovedVisits();
    }
  }, [activeTab]);

  const handleDeleteClick = (slot) => {
    setSelectedSlot(slot);
    setShowDeleteModal(true);
  };

  const handleDeleteSlot = async () => {
    try {
      setDeletingSlotId(selectedSlot.slotId);
      await deleteSlot(selectedSlot.slotId);
      toast.success("Slot deleted successfully");
      setShowDeleteModal(false);
      setSelectedSlot(null);
      await fetchSlots();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete slot");
    } finally {
      setDeletingSlotId(null);
    }
  };

  const handleRejectBooking = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please enter rejection reason");
      return;
    }

    try {
      setRejectLoading(true);
      await rejectBooking(selectedBooking.bookingId, {
        reason: rejectReason,
      });
      toast.success("Booking rejected successfully");
      setShowRejectModal(false);
      setSelectedBooking(null);
      setRejectReason("");
      fetchSlotBookings();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to reject booking");
    } finally {
      setRejectLoading(false);
    }
  };

  const fetchSlotBookings = async () => {
    try {
      setLoadingBookings(true);
      const response = await getSlotBookings();
      setSlotBookings(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  };

  const hasSlotEnded = (visit) => {
    const slotEndDateTime = new Date(`${visit.slotDate}T${visit.endTime}`);
    return new Date() > slotEndDateTime;
  };

  const [processingVisit, setProcessingVisit] = useState(null);

  const handleMarkCompleted = async (visit) => {
    try {
      setProcessingVisit(visit.bookingId);
      await markAsCompleted(visit.bookingId);
      toast.success("Visit marked as completed");
      fetchApprovedVisits();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to mark visit as completed",
      );
    } finally {
      setProcessingVisit(null);
    }
  };

  const handleMarkNotVisited = async (visit) => {
    try {
      setProcessingVisit(visit.bookingId);
      await markAsNotVisited(visit.bookingId);
      toast.success("Visit marked as not visited");
      fetchApprovedVisits();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to mark visit as not visited",
      );
    } finally {
      setProcessingVisit(null);
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
            <h5 className="fw-bold mb-0 text-success">
              Visit Slots & Bookings
            </h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="container px-3 px-md-4" style={{ maxWidth: "1000px" }}>
          {/* Navigation */}
          <div className="nav nav-tabs mb-4 overflow-auto flex-nowrap">
            {["create", "slots", "bookings", "approvals"].map((tab) => (
              <button
                key={tab}
                className={`nav-link text-capitalize text-nowrap ${activeTab === tab ? "active fw-bold text-success" : "text-secondary"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white shadow-sm rounded-4 p-3 p-md-4">
            {/* Create Slot Form */}
            {activeTab === "create" && (
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-semibold small">Title</label>
                    <input
                      name="title"
                      className="form-control form-control-sm"
                      value={slotData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold small">Date</label>
                    <input
                      name="date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="form-control form-control-sm"
                      value={slotData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold small">Start Time</label>
                    <input
                      name="startTime"
                      type="time"
                      className="form-control form-control-sm"
                      value={slotData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold small">End Time</label>
                    <input
                      name="endTime"
                      type="time"
                      className="form-control form-control-sm"
                      value={slotData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold small">Max Visitors</label>
                    <input
                      name="maxVisitors"
                      type="number"
                      className="form-control form-control-sm"
                      value={slotData.maxVisitors}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="fw-semibold small">Description</label>
                    <textarea
                      name="description"
                      className="form-control form-control-sm"
                      rows="3"
                      value={slotData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-success mt-4 w-100 fw-bold py-2"
                  onClick={handleCreateSlot}
                  disabled={creatingSlot}
                >
                  {creatingSlot ? "Creating..." : "Create Visit Slot →"}
                </button>
              </form>
            )}

            {/* Slots section */}
            {activeTab === "slots" && (
              <>
                {loadingSlots ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    />
                  </div>
                ) : slots.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="text-muted small">No Slots Created Yet</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle small">
                      <thead className="table-light">
                        <tr>
                          <th>Slot ID</th>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Visitors</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slots.map((slot) => (
                          <tr key={slot.slotId}>
                            <td>{slot.slotId}</td>
                            <td>
                              <strong>{slot.title}</strong>
                              <br />
                              <small
                                className="text-muted text-truncate d-inline-block"
                                style={{ maxWidth: "150px" }}
                              >
                                {slot.description}
                              </small>
                            </td>
                            <td>{new Date(slot.date).toLocaleDateString()}</td>
                            <td>
                              {slot.startTime} - {slot.endTime}
                            </td>
                            <td>
                              <span className="badge bg-primary x-small">
                                {slot.bookedCount}/{slot.maxVisitors}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge x-small ${
                                  slot.slotStatus === "AVAILABLE"
                                    ? "bg-success"
                                    : slot.slotStatus === "FULL"
                                      ? "bg-danger"
                                      : "bg-secondary"
                                }`}
                              >
                                {slot.slotStatus}
                              </span>
                            </td>
                            <td>
                              {new Date(slot.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger p-1 px-2 x-small"
                                onClick={() => handleDeleteClick(slot)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Approved slots */}
            {activeTab === "approvals" && (
              <>
                {loadingApprovedVisits ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    />
                  </div>
                ) : approvedVisits.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="text-muted small">
                      No Approved Visits Found
                    </h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle small">
                      <thead className="table-success">
                        <tr>
                          <th>Booking ID</th>
                          <th>Slot ID</th>
                          <th>Donor</th>
                          <th>Visitors</th>
                          <th>Schedule</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedVisits.map((visit) => {
                          const slotEndTime = new Date(
                            `${visit.slotDate}T${visit.endTime}`,
                          );
                          const visitCompleted = new Date() > slotEndTime;

                          return (
                            <tr key={visit.bookingId}>
                              <td>{visit.bookingId}</td>
                              <td>{visit.slotId}</td>
                              <td>{visit.donorCareBridgeId}</td>
                              <td>
                                <span className="badge bg-primary x-small">
                                  {visit.numberOfVisitors}
                                </span>
                              </td>
                              <td>
                                <strong>
                                  {new Date(
                                    visit.slotDate,
                                  ).toLocaleDateString()}
                                </strong>
                                <br />
                                <small className="text-muted">
                                  {visit.startTime} - {visit.endTime}
                                </small>
                              </td>
                              <td>
                                <span
                                  className={`badge x-small ${
                                    visit.bookingStatus === "CONFIRMED"
                                      ? "bg-success"
                                      : visit.bookingStatus === "COMPLETED"
                                        ? "bg-primary"
                                        : "bg-danger"
                                  }`}
                                >
                                  {visit.bookingStatus}
                                </span>
                              </td>
                              <td>
                                {visit.bookingStatus === "CONFIRMED" ? (
                                  <div className="d-flex flex-wrap gap-1">
                                    <button
                                      className="btn btn-sm btn-success p-1 x-small"
                                      disabled={
                                        !visitCompleted ||
                                        processingVisit === visit.bookingId
                                      }
                                      onClick={() => handleMarkCompleted(visit)}
                                    >
                                      Complete
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-danger p-1 x-small"
                                      disabled={
                                        !visitCompleted ||
                                        processingVisit === visit.bookingId
                                      }
                                      onClick={() =>
                                        handleMarkNotVisited(visit)
                                      }
                                    >
                                      Not Visited
                                    </button>
                                  </div>
                                ) : visit.bookingStatus === "COMPLETED" ? (
                                  <span className="badge bg-primary x-small">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="badge bg-danger x-small">
                                    Not Visited
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Bookings View */}
            {activeTab === "bookings" && (
              <>
                {loadingBookings ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    />
                  </div>
                ) : slotBookings.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="text-muted small">No Bookings Found</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle small">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Slot</th>
                          <th>Donor</th>
                          <th>Visitors</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slotBookings.map((booking) => (
                          <tr key={booking.bookingId}>
                            <td>{booking.bookingId}</td>
                            <td>{booking.slotId}</td>
                            <td>{booking.donorCareBridgeId}</td>
                            <td>
                              <span className="badge bg-primary x-small">
                                {booking.numberOfVisitors}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge x-small ${
                                  booking.bookingStatus === "PENDING"
                                    ? "bg-warning text-dark"
                                    : booking.bookingStatus === "APPROVED"
                                      ? "bg-success"
                                      : "bg-danger"
                                }`}
                              >
                                {booking.bookingStatus}
                              </span>
                            </td>
                            <td>
                              {booking.bookingStatus === "PENDING" && (
                                <div className="d-flex gap-1">
                                  <button
                                    className="btn btn-sm btn-outline-success p-1"
                                    disabled={
                                      processingBooking === booking.bookingId
                                    }
                                    onClick={() =>
                                      handleConfirmBooking(booking)
                                    }
                                    title="Approve"
                                  >
                                    <FaCheck size={10} />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger p-1"
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setRejectReason("");
                                      setShowRejectModal(true);
                                    }}
                                    title="Reject"
                                  >
                                    <FaTimes size={10} />
                                  </button>
                                </div>
                              )}
                              {booking.bookingStatus === "APPROVED" && (
                                <span className="badge bg-success x-small">
                                  Approved
                                </span>
                              )}
                              {booking.bookingStatus === "REJECTED" && (
                                <span className="badge bg-danger x-small">
                                  Rejected
                                </span>
                              )}
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
      </div>

      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-4 border-0 shadow-lg">
              <h5 className="fw-bold text-danger mb-2">Delete Slot</h5>
              <div className="modal-body p-0 small">
                <p className="text-secondary">
                  Are you sure you want to delete this slot?
                </p>
                <div className="bg-light p-3 rounded-3 mb-2">
                  <strong>{selectedSlot?.title}</strong>
                  <br />
                  <small className="text-muted">
                    {selectedSlot?.date} | {selectedSlot?.startTime}
                  </small>
                </div>
                <small className="text-danger">
                  This action cannot be undone.
                </small>
              </div>
              <div className="modal-footer border-0 p-0 pt-3">
                <button
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm rounded-pill px-3 fw-bold"
                  disabled={deletingSlotId === selectedSlot?.slotId}
                  onClick={handleDeleteSlot}
                >
                  {deletingSlotId === selectedSlot?.slotId
                    ? "Deleting..."
                    : "Delete Slot"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-4 border-0 shadow-lg">
              <h5 className="fw-bold text-danger mb-3">Reject Booking</h5>
              <div className="modal-body p-0 small">
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Reason for Rejection
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="3"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason..."
                  />
                </div>
              </div>
              <div className="modal-footer border-0 p-0 pt-3">
                <button
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm rounded-pill px-3 fw-bold"
                  disabled={rejectLoading}
                  onClick={handleRejectBooking}
                >
                  {rejectLoading ? "Rejecting..." : "Reject Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrphanageSlotsPage;
