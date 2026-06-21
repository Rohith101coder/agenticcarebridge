import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add API integration later

    toast.success("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
    <Navbar/>
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div className="bg-success text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold display-5">Contact Us</h1>

          <p className="lead mt-3 mb-0">
            We'd love to hear from you. Reach out with questions, feedback, or
            partnership opportunities.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100">
              <h3 className="fw-bold text-success mb-4">Get In Touch</h3>

              <div className="d-flex mb-4">
                <FaEnvelope className="text-success me-3 mt-1" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-muted mb-0">support@carebridge.org</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <FaPhone className="text-success me-3 mt-1" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Phone</h6>
                  <p className="text-muted mb-0">+91 98765 43210</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <FaMapMarkerAlt className="text-success me-3 mt-1" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Location</h6>
                  <p className="text-muted mb-0">Hyderabad, Telangana, India</p>
                </div>
              </div>

              <div className="d-flex">
                <FaClock className="text-success me-3 mt-1" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">Working Hours</h6>
                  <p className="text-muted mb-0">
                    Mon - Sat
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
              <h3 className="fw-bold text-success mb-4">Send Us a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>

                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>

                    <textarea
                      className="form-control"
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-success px-4">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mt-5">
          <h3 className="fw-bold text-success mb-4 text-center">
            Frequently Asked Questions
          </h3>

          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  How can I donate items?
                </button>
              </h2>

              <div id="faq1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Browse orphanage needs, select an item, choose a quantity, and
                  submit your donation request.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  How do orphanages get verified?
                </button>
              </h2>

              <div id="faq2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Orphanages undergo an admin review process before becoming
                  publicly visible on the platform.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Can I schedule a visit?
                </button>
              </h2>

              <div id="faq3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Yes. Donors can view available visit slots and request
                  bookings directly through CareBridge.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-success text-white rounded-4 p-5 mt-5 text-center">
          <h2 className="fw-bold mb-3">Together We Create Impact</h2>

          <p className="lead mb-0">
            Your support helps connect generous donors with orphanages that need
            assistance.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
