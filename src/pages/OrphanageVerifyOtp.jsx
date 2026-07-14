import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOrphanageOtp, resendOrphanageOtp } from "../apis/orphanageApis";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const OrphanageVerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const email = location.state;

  const handleInputChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, "");

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    try {
      const response = await verifyOrphanageOtp({
        orpEmail: email,
        otp: otpValue,
      });
      toast.success(response.message || "OTP verified successfully");
      navigate("/orphanage/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const response = await resendOrphanageOtp({ orpEmail: email });
      toast.success(response.message || "OTP resent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light py-5 min-vh-100 d-flex flex-column justify-content-between">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="bg-white shadow rounded-4 p-4 p-md-5 my-4">
              <h2 className="fw-bold mb-3 fs-3">Verify Orphanage OTP</h2>
              <p className="text-muted mb-2 small">
                Enter the verification code sent to
              </p>

              <p
                className="fw-bold text-success mb-4 text-break"
                style={{ fontSize: "1rem" }}
              >
                {email}
              </p>

              {/* OTP input fields container */}
              <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    className="form-control text-center shadow-xs"
                    value={digit}
                    onPaste={handlePaste}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onChange={(e) =>
                      handleInputChange(
                        idx,
                        e.target.value.replace(/[^0-9]/g, ""),
                      )
                    }
                    style={{
                      width: "55px",
                      height: "55px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </div>

              <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                <button
                  className="btn btn-success flex-fill py-2.5 fw-bold btn-sm"
                  onClick={handleVerify}
                >
                  Verify OTP
                </button>
                <button
                  className="btn btn-outline-success flex-fill py-2.5 fw-semibold btn-sm"
                  onClick={handleResend}
                >
                  Resend OTP
                </button>
              </div>

              <p className="text-muted small mb-0">
                After verifying the OTP, your orphanage profile will remain
                pending approval until an admin reviews it.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OrphanageVerifyOtp;
