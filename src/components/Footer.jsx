// 7. Footer.jsx (Optimized spacing and clean responsive alignment)
import React from "react";
import logo from "../assets/logo1.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white pt-4 pb-2"
      style={{
        background: "linear-gradient(to right, #0b3d2e, #145a32)",
      }}
    >
      <div className="container px-4">
        <div className="row g-4">
          {/* Logo Section */}
          <div className="col-12 col-md-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={logo} alt="logo" width="35" />
              <div>
                <h5 className="fw-bold mb-0 fs-5">CareBridge</h5>
                <small style={{ fontSize: "0.75rem" }}>
                  Bridging Hearts, Building Futures
                </small>
              </div>
            </div>

            <p className="small text-light mb-0" style={{ maxWidth: "260px" }}>
              A platform that connects kind hearts with real needs to build a
              better future for children.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 fs-6">Quick Links</h6>
            <ul className="list-unstyled small text-light">
              <li className="mb-1">Home</li>
              <li className="mb-1">About Us</li>
              <li className="mb-1">How It Works</li>
              <li className="mb-1">Orphanages</li>
            </ul>
          </div>

          {/* Needs */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 fs-6">Needs</h6>
            <ul className="list-unstyled small text-light">
              <li className="mb-1">Needs</li>
              <li className="mb-1">Events</li>
              <li className="mb-1">Contact Us</li>
              <li className="mb-1">FAQ</li>
            </ul>
          </div>

          {/* For Orphanages */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 fs-6">For Orphanages</h6>
            <ul className="list-unstyled small text-light">
              <li className="mb-1">Register</li>
              <li className="mb-1">Post Needs</li>
              <li className="mb-1">Manage Donations</li>
              <li className="mb-1">Resources</li>
            </ul>
          </div>

          {/* For Donors */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 fs-6">For Donors</h6>
            <ul className="list-unstyled small text-light">
              <li className="mb-1">Browse Needs</li>
              <li className="mb-1">My Donations</li>
              <li className="mb-1">My Bookings</li>
              <li className="mb-1">Profile</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-1">
            <h6 className="fw-bold mb-3 fs-6">Contact</h6>
            <p className="small mb-1 text-light">support@carebridge.org</p>
            <p className="small mb-2 text-light">+91 98765 43210</p>
            <div className="d-flex gap-3 mt-2">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        <hr className="border-light my-3" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-center text-md-start pb-2">
          <span>© 2026 CareBridge. All rights reserved.</span>
          <div className="d-flex gap-3">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
