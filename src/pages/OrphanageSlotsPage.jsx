import React, { useState, useEffect } from "react";
import Sidebar from "../components/OrphanageSidebar";
import {
  FaCalendarPlus,
  FaClipboardList,
  FaCheck,
  FaTimes,
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
      console.log(selectedSlot.slotId);
      

      await deleteSlot(selectedSlot.slotId);

      toast.success("Slot deleted successfully");

      setShowDeleteModal(false);
      setSelectedSlot(null);

      await fetchSlots();
    } catch (error) {
      console.error(error);
      console.log(error?.response?.data?.message);

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
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <h2 className="fw-bold mb-4">Visit Slots & Bookings</h2>

          {/* Navigation */}
          <div className="nav nav-tabs mb-4">
            {["create", "slots", "bookings", "approvals"].map((tab) => (
              <button
                key={tab}
                className={`nav-link text-capitalize ${activeTab === tab ? "active fw-bold text-success" : "text-secondary"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white shadow-sm rounded-4 p-4">
            {/* Create Slot Form */}
            {activeTab === "create" && (
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-semibold">Title</label>
                    <input
                      name="title"
                      className="form-control"
                      value={slotData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold">Date</label>
                    <input
                      name="date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="form-control"
                      value={slotData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold">Start Time</label>
                    <input
                      name="startTime"
                      type="time"
                      className="form-control"
                      value={slotData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold">End Time</label>
                    <input
                      name="endTime"
                      type="time"
                      className="form-control"
                      value={slotData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold">Max Visitors</label>
                    <input
                      name="maxVisitors"
                      type="number"
                      className="form-control"
                      value={slotData.maxVisitors}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="fw-semibold">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={slotData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-success mt-3"
                  onClick={handleCreateSlot}
                  disabled={creatingSlot}
                >
                  {creatingSlot ? "Creating..." : "Create Visit Slot →"}
                </button>
              </form>
            )}

            {/*slots section*/}
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
                    <h5 className="text-muted">No Slots Created Yet</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
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

                              <small className="text-muted">
                                {slot.description}
                              </small>
                            </td>

                            <td>{new Date(slot.date).toLocaleDateString()}</td>

                            <td>
                              {slot.startTime} - {slot.endTime}
                            </td>

                            <td>
                              <span className="badge bg-primary">
                                {slot.bookedCount}/{slot.maxVisitors}
                              </span>
                            </td>

                            <td>
                              <span
                                className={`badge ${
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
                                className="btn btn-sm btn-outline-danger"
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

            {/*approved slots*/}
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
                    <h5 className="text-muted">No Approved Visits Found</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-success">
                        <tr>
                          <th>Booking ID</th>
                          <th>Slot ID</th>
                          <th>Donor ID</th>
                          <th>Visitors</th>
                          <th>Visit Schedule</th>
                          <th>Message</th>
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
                                <span className="badge bg-primary">
                                  {visit.numberOfVisitors}
                                </span>
                              </td>

                              <td>
                                <div>
                                  <strong>
                                    {new Date(
                                      visit.slotDate,
                                    ).toLocaleDateString()}
                                  </strong>
                                </div>

                                <small className="text-muted">
                                  {visit.startTime} - {visit.endTime}
                                </small>
                              </td>

                              <td>
                                {visit.message || (
                                  <span className="text-muted">No Message</span>
                                )}
                              </td>

                              <td>
                                <span
                                  className={`badge ${
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
                                  <>
                                    <button
                                      className="btn btn-sm btn-success me-2"
                                      disabled={
                                        !visitCompleted ||
                                        processingVisit === visit.bookingId
                                      }
                                      onClick={() => handleMarkCompleted(visit)}
                                    >
                                      {processingVisit === visit.bookingId
                                        ? "Processing..."
                                        : "Complete"}
                                    </button>

                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      disabled={
                                        !visitCompleted ||
                                        processingVisit === visit.bookingId
                                      }
                                      onClick={() =>
                                        handleMarkNotVisited(visit)
                                      }
                                    >
                                      {processingVisit === visit.bookingId
                                        ? "Processing..."
                                        : "Not Visited"}
                                    </button>

                                    {!visitCompleted && (
                                      <div>
                                        <small className="text-muted">
                                          Available after visit ends
                                        </small>
                                      </div>
                                    )}
                                  </>
                                ) : visit.bookingStatus === "COMPLETED" ? (
                                  <span className="badge bg-primary">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">
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
                    <h5 className="text-muted">No Bookings Found</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Booking ID</th>
                          <th>Slot ID</th>
                          <th>Donor ID</th>
                          <th>Visitors</th>
                          <th>Message</th>
                          <th>Status</th>
                          <th>Created</th>
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
                              <span className="badge bg-primary">
                                {booking.numberOfVisitors}
                              </span>
                            </td>

                            <td>
                              {booking.message || (
                                <span className="text-muted">No Message</span>
                              )}
                            </td>

                            <td>
                              <span
                                className={`badge ${
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
                              {new Date(booking.createdAt).toLocaleString()}
                            </td>

                            <td>
                              {booking.bookingStatus === "PENDING" && (
                                <>
                                  <button
                                    className="btn btn-sm btn-outline-success me-2"
                                    disabled={
                                      processingBooking === booking.bookingId
                                    }
                                    onClick={() =>
                                      handleConfirmBooking(booking)
                                    }
                                  >
                                    {processingBooking === booking.bookingId ? (
                                      "..."
                                    ) : (
                                      <FaCheck />
                                    )}
                                  </button>

                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setRejectReason("");
                                      setShowRejectModal(true);
                                    }}
                                  >
                                    <FaTimes />
                                  </button>
                                </>
                              )}

                              {booking.bookingStatus === "APPROVED" && (
                                <span className="badge bg-success">
                                  Approved
                                </span>
                              )}

                              {booking.bookingStatus === "REJECTED" && (
                                <span className="badge bg-danger">
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
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger">Delete Slot</h5>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this slot?</p>

                <div className="bg-light p-3 rounded">
                  <strong>{selectedSlot?.title}</strong>

                  <br />

                  <small>
                    {selectedSlot?.date} | {selectedSlot?.startTime}
                  </small>
                </div>

                <small className="text-danger">
                  This action cannot be undone.
                </small>
              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
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
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h5 className="mb-3 text-danger">Reject Booking</h5>

              <div className="mb-3">
                <label className="form-label">Reason for Rejection</label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason..."
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
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
