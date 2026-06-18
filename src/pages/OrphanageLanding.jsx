import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrphanageLanding = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-white shadow rounded-4 p-5 text-center">
              <h1 className="fw-bold mb-3">Orphanage Portal</h1>
              <p className="text-muted mb-4">
                Register your orphanage, create your profile, and manage your
                requests from one place.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/login" className="btn btn-success btn-lg">
                  Login as Orphanage
                </Link>
                <Link to="/register" className="btn btn-outline-success btn-lg">
                  Register as Orphanage
                </Link>
              </div>

              <div className="mt-5 text-start">
                <h4 className="fw-bold">Next step</h4>
                <p className="text-muted mb-0">
                  After login, create your orphanage profile and verify via OTP
                  before managing needs and donations.
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

export default OrphanageLanding;
