import React, { useState } from "react";
import Sidebar from "../components/OrphanageSidebar";
import {
  FaCalendarPlus,
  FaClipboardList,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {createSlot} from "../apis/orpslotapis"

const OrphanageSlotsPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [creatingSlot, setCreatingSlot] = useState(false);
  const [slotData, setSlotData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    maxVisitors: "",
    title: "",
    description: "",
  });

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

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <h2 className="fw-bold mb-4">Visit Slots & Bookings</h2>

          {/* Navigation */}
          <div className="nav nav-tabs mb-4">
            {["create", "slots", "bookings"].map((tab) => (
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
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold">End Time</label>
                    <input
                      name="endTime"
                      type="time"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold">Max Visitors</label>
                    <input
                      name="maxVisitors"
                      type="number"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="fw-semibold">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
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

            {/* Bookings View */}
            {activeTab === "bookings" && (
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Visitor Name</th>
                    <th>Date/Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>2026-06-20 | 10:00 AM</td>
                    <td>
                      <span className="badge bg-warning">PENDING</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success me-2">
                        <FaCheck />
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageSlotsPage;
