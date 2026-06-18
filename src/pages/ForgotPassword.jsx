import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaLock,
  FaEnvelope,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
import kidsImg from "../assets/children.png";
import Navbar from "../components/Navbar";
import { forgotPassword } from "../apis/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

 const handleGetOtp = async (e) => {
   e.preventDefault();

   if (!email) {
     toast.error("Please enter your email address");
     return;
   }

   try {
     const response = await forgotPassword(email);

     toast.success(response.message);

     navigate("/verify-otp", {
       state: { email },
     });
   } catch (error) {
     console.log("STATUS:", error.response?.status);
     console.log("DATA:", error.response?.data);
     console.log(error);

     toast.error(
       error.response?.data?.message ||
         error.response?.data ||
         "Something went wrong",
     );
   }
 };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light py-3 px-2 px-md-4">
        <div className="row g-4 align-items-center min-vh-100">
          {/* Left Side: Consistent with other pages */}
          <div className="col-lg-6">
            <div className="p-3 p-md-4">
              <h1 className="fw-bold mb-2 display-6">Welcome Back!</h1>
              <h2 className="fw-bold text-success mb-3">
                Glad to have you with us.
              </h2>
              <p className="text-muted fs-6 mb-4">
                Login to your account and continue making a difference in a
                child's life.
              </p>

              <div className="mb-3 d-flex gap-3">
                <FaHandHoldingHeart className="text-success fs-3 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">Support Children</h5>
                  <p className="text-muted small mb-0">
                    Help provide food, education, and a better future.
                  </p>
                </div>
              </div>

              <div className="mb-3 d-flex gap-3">
                <FaShieldAlt className="text-success fs-3 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">100% Transparent</h5>
                  <p className="text-muted small mb-0">
                    Every donation and action you take makes real impact.
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex gap-3">
                <FaUsers className="text-success fs-3 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">Trusted by Many</h5>
                  <p className="text-muted small mb-0">
                    Join thousands of donors and orphanages across the country.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <img
                  src={kidsImg}
                  alt="children"
                  className="img-fluid"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Forgot Password Form */}
          <div className="col-lg-6">
            <div
              className="bg-white shadow rounded-4 p-4 p-md-5 mx-auto"
              style={{ maxWidth: "500px" }}
            >
              <div className="text-center mb-4">
                <FaLock className="fs-2 text-success mb-2" />
                <h2 className="fw-bold fs-3">Forgot Password?</h2>
                <p className="text-muted small">
                  Enter your registered email address.
                  <br />
                  We'll send you a 6-digit OTP to reset your password.
                </p>
              </div>

              <form onSubmit={handleGetOtp}>
                <div className="mb-4">
                  <label className="fw-semibold">Email Address</label>
                  <div className="input-group mt-2">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                >
                  Get OTP →
                </button>
              </form>

              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-success text-decoration-none fw-semibold"
                >
                  <FaArrowLeft className="me-2" /> Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
