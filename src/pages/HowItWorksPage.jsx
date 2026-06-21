import React from "react";
import {
  FaUserPlus,
  FaClipboardList,
  FaGift,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <FaUserPlus size={35} />,
      title: "Create an Account",
      description:
        "Register as a Donor or Orphanage and complete your profile information.",
    },
    {
      icon: <FaClipboardList size={35} />,
      title: "Publish & Explore Needs",
      description:
        "Verified orphanages can post their requirements. Donors can browse needs and find opportunities to help.",
    },
    {
      icon: <FaGift size={35} />,
      title: "Donate Items",
      description:
        "Choose a need item, specify the quantity you wish to contribute, and track your donation status in real time.",
    },
    {
      icon: <FaCalendarCheck size={35} />,
      title: "Book a Visit",
      description:
        "Donors can schedule visits through available orphanage slots and receive confirmation updates.",
    },
    {
      icon: <FaCheckCircle size={35} />,
      title: "Track Impact",
      description:
        "Monitor donation fulfillment, visit status, and ensure contributions reach the intended beneficiaries.",
    },
  ];

  return (
    <>
    <Navbar/>
      <div className="bg-light min-vh-100">
        {/* Hero */}
        <div className="bg-success text-white py-5">
          <div className="container text-center">
            <h1 className="fw-bold display-5">How CareBridge Works</h1>
            <p className="lead mt-3 mb-0">
              A simple, transparent, and secure way to connect donors with
              orphanages and make a meaningful impact.
            </p>
          </div>
        </div>

        <div className="container py-5">
          {/* Overview */}
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-5">
            <h2 className="fw-bold text-success mb-3">
              Connecting Kindness Through Technology
            </h2>

            <p className="text-muted mb-0">
              CareBridge helps verified orphanages communicate their needs while
              enabling donors to contribute confidently. Every donation and
              visit is tracked through a transparent workflow, ensuring
              accountability and trust.
            </p>
          </div>

          {/* Steps */}
          <div className="mb-5">
            <h2 className="text-center fw-bold text-success mb-5">
              Simple 5-Step Process
            </h2>

            <div className="row g-4">
              {steps.map((step, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="bg-white rounded-4 shadow-sm p-4 h-100 text-center">
                    <div className="text-success mb-3">{step.icon}</div>

                    <div
                      className="badge bg-success mb-3"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Step {index + 1}
                    </div>

                    <h5 className="fw-bold">{step.title}</h5>

                    <p className="text-muted mb-0">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donor Journey */}
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-5">
            <h2 className="fw-bold text-success mb-4">Donor Journey</h2>

            <div className="row g-4">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-success mb-2">1</div>
                  <h6>Browse Needs</h6>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-success mb-2">2</div>
                  <h6>Select Items</h6>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-success mb-2">3</div>
                  <h6>Donate or Order</h6>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-success mb-2">4</div>
                  <h6>Track Status</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Orphanage Journey */}
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-5">
            <h2 className="fw-bold text-success mb-4">Orphanage Journey</h2>

            <div className="row g-4">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-primary mb-2">1</div>
                  <h6>Create Profile</h6>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-primary mb-2">2</div>
                  <h6>Post Requirements</h6>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-primary mb-2">3</div>
                  <h6>Manage Donations</h6>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-center">
                  <div className="badge bg-primary mb-2">4</div>
                  <h6>Schedule Visits</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-5">
            <h2 className="fw-bold text-success text-center mb-4">
              Why Use CareBridge?
            </h2>

            <div className="row g-3">
              {[
                "Verified orphanage profiles",
                "Transparent donation tracking",
                "Secure authentication & authorization",
                "Easy visit scheduling",
                "Real-time status updates",
                "Responsive and user-friendly experience",
              ].map((item, index) => (
                <div key={index} className="col-md-6">
                  <div className="border rounded-3 p-3 bg-light">✅ {item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div className="bg-success text-white rounded-4 p-5 text-center">
            <h2 className="fw-bold mb-3">Start Making a Difference Today</h2>

            <p className="lead mb-0">
              Whether you're a donor looking to help or an orphanage seeking
              support, CareBridge makes the process simple, transparent, and
              impactful.
            </p>
          </div>
        </div>
      </div>
    </>
  );
 
};

export default HowItWorksPage;
