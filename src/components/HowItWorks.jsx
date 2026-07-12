// 5. HowItWorks.jsx (Stacked layout and optimized input spacing on mobile)
import React from "react";
import {
  FaUserPlus,
  FaSearch,
  FaGift,
  FaCalendarAlt,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      color: "#198754",
      title: "Sign Up",
      desc: "Create your donor or orphanage account.",
    },
    {
      id: 2,
      icon: <FaSearch />,
      color: "#0d6efd",
      title: "Explore Needs",
      desc: "Browse urgent needs from verified orphanages.",
    },
    {
      id: 3,
      icon: <FaGift />,
      color: "#6f42c1",
      title: "Donate / Help",
      desc: "Contribute items or support real needs.",
    },
    {
      id: 4,
      icon: <FaCalendarAlt />,
      color: "#dc3545",
      title: "Book a Visit",
      desc: "Plan a visit and create joyful memories.",
    },
  ];

  return (
    <section className="py-4 py-lg-5">
      <div className="container px-3 px-md-4">
        <div className="text-center mb-4">
          <h4 className="fw-bold">How It Works</h4>
        </div>

        <div className="row g-3 align-items-stretch">
          {/* Steps & Responsive Arrows */}
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="col-12 col-md">
                <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
                  <div className="fs-3 mb-2" style={{ color: step.color }}>
                    {step.icon}
                  </div>
                  <h6 className="fw-bold small">{step.title}</h6>
                  <p className="text-muted small mb-0">{step.desc}</p>
                </div>
              </div>

              {/* Arrow horizontal for desktop, vertical/hidden for mobile */}
              {index !== steps.length - 1 && (
                <div className="col-auto d-none d-md-flex align-items-center justify-content-center">
                  <FaArrowRight className="text-muted" />
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Subscribe Card */}
          <div className="col-12 col-lg-3 mt-3 mt-lg-0">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <h6 className="fw-bold mb-2">Get Updates</h6>
              <p className="text-muted small mb-3">
                Subscribe to receive email updates about needs and impact.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Enter your email"
                />
                <button className="btn btn-success btn-sm px-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
