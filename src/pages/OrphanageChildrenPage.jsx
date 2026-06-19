import React from "react";
import Sidebar from "../components/OrphanageSidebar";
import { FaChild } from "react-icons/fa";

const OrphanageChildrenPage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light p-4">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <h2 className="fw-bold mb-4">Children Management</h2>

          {/* Coming Soon Placeholder */}
          <div className="bg-white shadow-sm rounded-4 p-5 text-center min-vh-50 d-flex flex-column align-items-center justify-content-center py-5">
            <div className="bg-success bg-opacity-10 p-4 rounded-circle mb-4 text-success">
              <FaChild size={60} />
            </div>
            <h3 className="fw-bold text-success mb-2">Feature Coming Soon</h3>
            <p className="text-muted mb-0" style={{ maxWidth: "400px" }}>
              We are actively building the Children records module. You will
              soon be able to add, view, and manage details of the children in
              your care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageChildrenPage;
