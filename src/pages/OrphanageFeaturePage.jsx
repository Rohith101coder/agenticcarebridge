import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrphanageSidebar from "../components/OrphanageSidebar";

const featureLabels = {
  needs: "Needs Management",
  donations: "Donation Requests",
  visits: "Visit Bookings",
  children: "Children",
  messages: "Messages",
};

const OrphanageFeaturePage = () => {
  const { feature } = useParams();
  const title = featureLabels[feature] || "Orphanage Feature";

  return (
    <>
     <OrphanageSidebar />
      {/* <Navbar /> */}
     
      <div className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold">{title}</h1>
          <p className="text-muted">
            This section is part of the orphanage dashboard. Use the sidebar to
            switch between features.
          </p>
        </div>

        <div className="card rounded-4 shadow-sm p-4">
          <p className="mb-0">
            The {title.toLowerCase()} view is not yet implemented, but the route
            is now available. You can wire the specific content here.
          </p>
        </div>

        <div className="mt-4">
          <Link to="/orphanage/dashboard" className="btn btn-outline-secondary">
            Back to dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrphanageFeaturePage;
