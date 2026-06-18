import  { useRef } from "react";
import kidsImg from "../assets/children.png";
import { useLocation } from "react-router-dom";
import { verifyEmail, verifyForgotPasswordOtp } from "../apis/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resendOtp } from "../apis/auth";

import {
  FaEnvelopeOpenText,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
  FaEnvelope
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const VerifyEmail = () => {

  const inputs = useRef([]);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["","","","","","",""]);
  const [timer, setTimer] = useState(45);

  const location = useLocation();

  const email = location.state?.email;
  


  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      // alert("Please enter all 6 digits");
      toast.warning("Please enter all 6 digits");
      return;
    }

    try {
      const response = await verifyForgotPasswordOtp({
        email,
        otp: otpValue,
      });

      console.log(response);

      toast.success("OTP verified successfully");
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

 const handleResend = async () => {
   if (timer > 0) {
     return;
   }

   try {
     await resendOtp(email);

     toast.success("OTP resent successfully");

     setTimer(45);
   } catch (error) {
     toast.error(error.response?.data?.message || "Something went wrong");
   }
 };

  return (
    <>
      <Navbar />

      <div className="container-fluid bg-light py-3 px-2 px-md-4">
        <div className="row g-4 align-items-center min-vh-100">
          {/* Left Side */}
          <div className="col-lg-6">
            <div className="p-3 p-md-4">
              <h1 className="fw-bold mb-2 display-6">Join CareBridge</h1>

              <h2 className="fw-bold text-success mb-3">
                Be the reason someone smiles.
              </h2>

              <p className="text-muted fs-6 mb-4">
                Create your account and start making a meaningful difference in
                a child’s life.
              </p>

              {/* Features */}
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
                    Every donation creates real impact.
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex gap-3">
                <FaUsers className="text-success fs-3 mt-1" />

                <div>
                  <h5 className="fw-bold mb-1">Trusted by Many</h5>

                  <p className="text-muted small mb-0">
                    Join thousands of donors and orphanages.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="text-center mt4">
                <img
                  src={kidsImg}
                  alt="children"
                  className="img-fluid"
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6">
            <div
              className="bg-white shadow rounded-4 p-4 p-md-5 mx-auto"
              style={{ maxWidth: "520px" }}
            >
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <FaEnvelopeOpenText className="text-success fs-1" />
                </div>

                <h2 className="fw-bold fs-3">Verify Your Email</h2>

                <p className="text-muted small">
                  Enter the 6-digit code sent to
                </p>
              </div>

              {/* Email */}
              <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-center gap-3 mb-4">
                <FaEnvelope className="text-success fs-4" />

                <span className="fw-bold text-success">{email}</span>
              </div>

              <p className="text-center text-muted small mb-4">
                Please check your inbox and enter the code below.
              </p>

              {/* OTP */}
              <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <input
                    key={item}
                    type="text"
                    maxLength="1"
                    value={otp[item]}
                    className="form-control text-center fw-bold"
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "20px",
                    }}
                    ref={(el) => (inputs.current[item] = el)}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newOtp = [...otp];
                      newOtp[item] = value;

                      setOtp(newOtp);

                      if (value && item < 5) {
                        inputs.current[item + 1].focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !e.target.value &&
                        item > 0
                      ) {
                        inputs.current[item - 1].focus();
                      }
                    }}
                  />
                ))}
              </div>

              {/* Resend */}
              <div className="text-center mb-4">
                <p className="mb-1 text-muted small">
                  Didn't receive the code?
                  <span
                    role="button"
                    className={`fw-bold ms-2 ${
                      timer === 0 ? "text-success" : "text-secondary"
                    }`}
                    onClick={handleResend}
                  >
                    Resend OTP
                  </span>
                </p>

                <small className="text-muted">
                  {timer > 0
                    ? `Resend available in 00:${String(timer).padStart(2, "0")}`
                    : "You can resend OTP now"}
                </small>
              </div>

              {/* Button */}
              <button
                className="btn btn-success w-100 py-2 fw-semibold"
                onClick={handleVerify}
              >
                Verify & Continue →
              </button>

              {/* Footer */}
              <p className="text-center mt-3 mb-0 small">
                Wrong email?
                <Link
                  to="/register"
                  className="text-success fw-bold ms-2 text-decoration-none"
                >
                  Change Email
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;