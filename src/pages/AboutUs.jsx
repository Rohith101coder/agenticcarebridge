import React from "react";
import { FaHandsHelping, FaHeart, FaUsers, FaBullseye } from "react-icons/fa";
import Navbar from "../components/Navbar";

const AboutUsPage = () => {
  return (
    <>
    
    <Navbar/>
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div className="bg-success text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold display-5">About CareBridge</h1>
          <p className="lead mt-3 mb-0">
            Connecting compassionate donors with orphanages in need through a
            transparent and trusted platform.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Our Story */}
        <div className="bg-white shadow-sm rounded-4 p-4 p-md-5 mb-4">
          <h2 className="fw-bold text-success mb-3">Our Story</h2>

          <p className="text-muted fs-5">
            CareBridge was created with a simple mission — to make helping
            orphanages easier, more transparent, and more impactful.
          </p>

          <p className="text-muted">
            Many donors are willing to contribute but often struggle to find
            verified orphanages and understand their real-time needs. At the
            same time, orphanages face challenges in managing donations,
            communicating requirements, and coordinating visits.
          </p>

          <p className="text-muted mb-0">
            CareBridge bridges this gap by providing a secure platform where
            orphanages can publish their needs and donors can contribute with
            confidence.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="bg-white shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <FaBullseye className="text-success me-3" size={32} />
                <h3 className="fw-bold mb-0">Our Mission</h3>
              </div>

              <p className="text-muted mb-0">
                To create a trusted ecosystem where donors and orphanages can
                connect directly, ensuring that every contribution reaches those
                who need it most.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-white shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <FaHeart className="text-danger me-3" size={32} />
                <h3 className="fw-bold mb-0">Our Vision</h3>
              </div>

              <p className="text-muted mb-0">
                To become a nationwide platform that empowers orphanages,
                inspires generosity, and creates meaningful social impact
                through technology.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white shadow-sm rounded-4 p-4 p-md-5 mb-4">
          <h2 className="fw-bold text-success mb-4 text-center">
            Our Core Values
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <FaHandsHelping className="text-success mb-3" size={40} />
                <h5 className="fw-bold">Compassion</h5>
                <p className="text-muted">
                  Every feature is designed to encourage meaningful support for
                  children and orphanages.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center">
                <FaUsers className="text-primary mb-3" size={40} />
                <h5 className="fw-bold">Community</h5>
                <p className="text-muted">
                  We believe collective action can create lasting positive
                  change.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center">
                <FaBullseye className="text-warning mb-3" size={40} />
                <h5 className="fw-bold">Transparency</h5>
                <p className="text-muted">
                  Verified orphanages, tracked donations, and clear
                  communication build trust.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white shadow-sm rounded-4 p-4 p-md-5 mb-4">
          <h2 className="fw-bold text-success mb-4 text-center">
            What CareBridge Offers
          </h2>

          <div className="row g-3">
            {[
              "Verified Orphanage Profiles",
              "Need Item Management",
              "Donation Tracking",
              "Visit Booking System",
              "Secure Authentication",
              "Transparent Communication",
              "Real-Time Status Updates",
              "Responsive User Experience",
            ].map((feature, index) => (
              <div key={index} className="col-md-6">
                <div className="border rounded-3 p-3 bg-light">
                  ✅ {feature}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Section */}
        <div className="bg-success text-white rounded-4 p-5 text-center">
          <h2 className="fw-bold mb-3">Together, We Can Make a Difference</h2>

          <p className="lead mb-0">
            Every donation, every visit, and every act of kindness helps create
            a brighter future for children in need.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUsPage;
