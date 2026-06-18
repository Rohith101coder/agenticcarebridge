import React, { useState, useEffect} from "react";
import Sidebar from "../components/OrphanageSidebar";
import { FaCheck, FaTruck, FaBan, FaImage } from "react-icons/fa";
import {
  getPendingDonations,
  markDonationDelivered,
  getDeliveredDonations,
  getCancelledDonations,
} from "../apis/orpdonationapis";
import {toast} from "react-toastify"

const OrphanageDonationPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  // const [showModal, setShowModal] = useState(false);
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

  // const [note, setNote] = useState("");
  // const [deliveredPhoto, setDeliveredPhoto] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  // States for the delivery confirmation form
  const [note, setNote] = useState("");
  const [deliveredPhoto, setDeliveredPhoto] = useState(null);

  // const handleConfirmDelivery = async () => {
  //   const formData = new FormData();
  //   formData.append("note", note);
  //   formData.append("deliveredPhoto", deliveredPhoto);

  //   // Call your POST /delivered/{id} API here
  //   console.log("Submitting delivery for:", selectedId);
  //   setShowModal(false);
  // };

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
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 bg-light p-4">
          <div className="container" style={{ maxWidth: "1200px" }}>
            <h2 className="fw-bold mb-4">Donation Management</h2>

            {/* Tabs */}
            <div className="nav nav-tabs mb-4">
              {["pending", "delivered", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  className={`nav-link text-capitalize ${activeTab === tab ? "active fw-bold text-success" : "text-secondary"}`}
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
                  <h5>No Pending Donations</h5>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Donor</th>
                        <th>Need Item</th>
                        <th>Quantity</th>
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
                            <small>{donation.donorPhone}</small>
                            <br />
                            <small>{donation.donorEmail}</small>
                          </td>

                          <td>
                            <strong>{donation.itemName}</strong>
                            <br />
                            <small>{donation.itemDescription}</small>
                            <br />
                            <span className="badge bg-secondary">
                              {donation.category}
                            </span>
                          </td>

                          <td>
                            <strong>{donation.donatedQuantity}</strong>
                          </td>

                          <td>
                            <span className="badge bg-info">
                              {donation.donationType}
                            </span>
                          </td>

                          <td>
                            {donation.donationType === "ONLINE_ORDER" ? (
                              <>
                                <div>Platform: {donation.platformName}</div>

                                <div>Tracking: {donation.trackingId}</div>

                                <div>
                                  Delivery: {donation.expectedDeliveryDate}
                                </div>
                              </>
                            ) : (
                              <div>
                                Visit:{" "}
                                {new Date(
                                  donation.expectedVisitDateTime,
                                ).toLocaleString()}
                              </div>
                            )}
                          </td>

                          <td>
                            <span className="badge bg-warning text-dark">
                              {donation.donationStatus}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => openDeliveryModal(donation)}
                            >
                              <FaCheck className="me-1" />
                              Mark Delivered
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
                  <h5>No Delivered Donations</h5>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-success">
                      <tr>
                        <th>Donor</th>
                        <th>Need Item</th>
                        <th>Quantity</th>
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
                            <small>{donation.donorPhone}</small>
                            <br />
                            <small>{donation.donorEmail}</small>
                          </td>

                          <td>
                            <strong>{donation.itemName}</strong>
                            <br />
                            <small>{donation.itemDescription}</small>
                            <br />
                            <span className="badge bg-secondary">
                              {donation.category}
                            </span>
                          </td>

                          <td>
                            <strong>{donation.donatedQuantity}</strong>
                          </td>

                          <td>
                            <span className="badge bg-info">
                              {donation.donationType}
                            </span>
                          </td>

                          <td>
                            {donation.donationType === "ONLINE_ORDER" ? (
                              <>
                                <div>Platform: {donation.platformName}</div>

                                <div>Tracking: {donation.trackingId}</div>

                                <div>
                                  Delivery: {donation.expectedDeliveryDate}
                                </div>
                              </>
                            ) : (
                              <div>
                                Visit:{" "}
                                {new Date(
                                  donation.expectedVisitDateTime,
                                ).toLocaleString()}
                              </div>
                            )}
                          </td>

                          <td>
                            <span className="badge bg-success">DELIVERED</span>
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
                    <h5>No Cancelled Donations</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-danger">
                        <tr>
                          <th>Donor</th>
                          <th>Need Item</th>
                          <th>Quantity</th>
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
                              <small>{donation.donorPhone}</small>
                              <br />
                              <small>{donation.donorEmail}</small>
                            </td>

                            <td>
                              <strong>{donation.itemName}</strong>
                              <br />
                              <small>{donation.itemDescription}</small>
                              <br />
                              <span className="badge bg-secondary">
                                {donation.category}
                              </span>
                            </td>

                            <td>
                              <strong>{donation.donatedQuantity}</strong>
                            </td>

                            <td>
                              <span className="badge bg-info">
                                {donation.donationType}
                              </span>
                            </td>

                            <td>
                              {donation.donationType === "ONLINE_ORDER" ? (
                                <>
                                  <div>
                                    <strong>Platform:</strong>{" "}
                                    {donation.platformName}
                                  </div>

                                  <div>
                                    <strong>Tracking:</strong>{" "}
                                    {donation.trackingId}
                                  </div>

                                  <div>
                                    <strong>Delivery:</strong>{" "}
                                    {donation.expectedDeliveryDate}
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <strong>Visit:</strong>{" "}
                                  {new Date(
                                    donation.expectedVisitDateTime,
                                  ).toLocaleString()}
                                </div>
                              )}
                            </td>

                            <td>
                              <span className="badge bg-danger">CANCELLED</span>
                            </td>

                            <td>
                              {new Date(
                                donation.updatedAt,
                              ).toLocaleDateString()}
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
          <div className="modal d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h5>Confirm Item Receipt</h5>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Message</label>

                    <textarea
                      className="form-control"
                      rows="3"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Received Item Photo</label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setDeliveredPhoto(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
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
    </>
  );
};

export default OrphanageDonationPage;
