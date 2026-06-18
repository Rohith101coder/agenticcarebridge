import React from "react";
import riceImg from "../assets/ricebag.jpg";
import booksImg from "../assets/books.jpg";
import blanketImg from "../assets/blankets.jpg";

const RecentDonations = ({donations}) => {
  const donationList = (donations || []).map((donation) => ({
    id: donation.donationId,
    donorName: donation.donorName,
    itemName: donation.itemName,
    quantity: donation.quantity,
    amount: donation.amount,
    date: new Date(donation.donatedAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold">Recent Donations</h5>

        <small className="text-success fw-semibold">View all</small>
      </div>
      {donationList.length === 0 && (
        <div className="text-center text-muted py-4">
          No donations received yet
        </div>
      )}

      {/* Donation List */}
      {donationList.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <div className="d-flex gap-3 align-items-center">
            <img
              src={item.image}
              alt={item.itemName}
              className="rounded"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />

            <div>
              <h6 className="fw-bold small mb-1">{item.itemName}</h6>

              <small className="text-muted d-block">
                Donated by {item.donorName}
              </small>

              <small className="text-success d-block">
                Qty: {item.quantity} | ₹{item.amount}
              </small>
            </div>
          </div>

          <small className="text-muted">{item.donatedAt}</small>
        </div>
      ))}
    </div>
  );
};

export default RecentDonations;