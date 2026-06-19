import React from "react";
import Sidebar from "../components/OrphanageSidebar";
import { FaEnvelope } from "react-icons/fa";

const OrphanageMessagePage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <h2 className="fw-bold mb-4">Messages</h2>

          {/* Messaging Dashboard Placeholder */}
          <div
            className="bg-white shadow-sm rounded-4 p-5 text-center d-flex flex-column align-items-center justify-content-center py-5"
            style={{ minHeight: "500px" }}
          >
            <div className="bg-success bg-opacity-10 p-4 rounded-circle mb-4 text-success">
              <FaEnvelope size={50} />
            </div>
            <h3 className="fw-bold text-success mb-2">Inbox & Messages</h3>
            <p className="text-muted mb-0" style={{ maxWidth: "450px" }}>
              Stay connected with donors and admins. Your real-time
              conversations and notifications will appear here once active
              messaging is initialized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageMessagePage;
