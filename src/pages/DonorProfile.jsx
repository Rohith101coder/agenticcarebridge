import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DonorProfile = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-white shadow rounded-4 p-5 text-center">
              <h1 className="fw-bold mb-3">Donor Profile</h1>
              <p className="text-muted mb-4">
                Your donor profile is pending verification. Once verified, your
                donor dashboard will display donation activity, bookings, and
                impact metrics.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link
                  to="/donor/create-profile"
                  className="btn btn-success btn-lg"
                >
                  Update or Create Profile
                </Link>
                <Link
                  to="/donor/dashboard"
                  className="btn btn-outline-success btn-lg"
                >
                  Back to Dashboard
                </Link>
              </div>

              <div className="mt-5 text-start">
                <h4 className="fw-bold">Need help?</h4>
                <p className="text-muted mb-0">
                  If your profile is already submitted, please wait for
                  verification. You can update your profile if the details need
                  correction.
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

export default DonorProfile;
