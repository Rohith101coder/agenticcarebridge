import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DonorLanding = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-white shadow rounded-4 p-5 text-center">
              <h1 className="fw-bold mb-3">Donor Portal</h1>
              <p className="text-muted mb-4">
                Manage your donations, view urgent needs, and track visits from
                one place.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/login" className="btn btn-success btn-lg">
                  Login as Donor
                </Link>
                <Link to="/register" className="btn btn-outline-success btn-lg">
                  Register as Donor
                </Link>
              </div>

              <div className="mt-5 text-start">
                <h4 className="fw-bold">Next step</h4>
                <p className="text-muted mb-0">
                  After login, you can create your donor profile, check
                  dashboard stats, and support verified orphanages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonorLanding;
