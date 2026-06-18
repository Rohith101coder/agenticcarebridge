import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLock, FaEye, FaEyeSlash, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaArrowLeft } from "react-icons/fa";
import kidsImg from "../assets/children.png";
import Navbar from "../components/Navbar";
import { resetPassword } from "../apis/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const email = location.state?.email;

 const handleChangePassword = async (e) => {
   e.preventDefault();

   if (password.length < 8) {
     toast.error("Password must be at least 8 characters long.");
     return;
   }

   if (password !== confirmPassword) {
     toast.error("Passwords do not match.");
     return;
   }

   try {
     await resetPassword({
       email,
       newPassword: password,
     });

     toast.success("Password changed successfully!");

     navigate("/login");
   } catch (error) {
     toast.error(error.response?.data?.message || "Failed to reset password");
   }
 };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light py-3 px-2 px-md-4">
        <div className="row g-4 align-items-center min-vh-100">
          {/* Left Side: Consistent Sidebar */}
          <div className="col-lg-6">
            <div className="p-3 p-md-4">
              <h1 className="fw-bold mb-2 display-6">Welcome Back!</h1>
              <h2 className="fw-bold text-success mb-3">Glad to have you with us.</h2>
              <p className="text-muted fs-6 mb-4">
                Let's get you back to making a difference.
              </p>

              <div className="mb-3 d-flex gap-3">
                <FaHandHoldingHeart className="text-success fs-3 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">Support Children</h5>
                  <p className="text-muted small mb-0">Help provide food, education, and a better future.</p>
                </div>
              </div>

              <div className="mb-3 d-flex gap-3">
                <FaShieldAlt className="text-success fs-3 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">100% Transparent</h5>
                  <p className="text-muted small mb-0">Every donation and action you take makes real impact.</p>
                </div>
              </div>

              <div className="mb-4 d-flex gap-3">
                <FaUsers className="text-success fs-3 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">Trusted by Many</h5>
                  <p className="text-muted small mb-0">Join thousands of donors and orphanages across the country.</p>
                </div>
              </div>

              <div className="text-center">
                <img src={kidsImg} alt="children" className="img-fluid" style={{ maxHeight: "300px" }} />
              </div>
            </div>
          </div>

          {/* Right Side: Reset Password Form */}
          <div className="col-lg-6">
            <div className="bg-white shadow rounded-4 p-4 p-md-5 mx-auto" style={{ maxWidth: "500px" }}>
              <div className="text-center mb-4">
                <div className="mb-3 text-success">
                    <FaLock className="fs-2" />
                </div>
                <h2 className="fw-bold fs-3">Create New Password</h2>
                <p className="text-muted small">Set a new password for your account.</p>
              </div>

              <form onSubmit={handleChangePassword}>
                {/* New Password */}
                <div className="mb-3">
                  <label className="fw-semibold">New Password</label>
                  <div className="input-group mt-2">
                    <span className="input-group-text"><FaLock /></span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      placeholder="Enter new password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                    <span className="input-group-text" role="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <small className="text-muted">Must be at least 8 characters with letters and numbers</small>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="fw-semibold">Confirm Password</label>
                  <div className="input-group mt-2">
                    <span className="input-group-text"><FaLock /></span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      placeholder="Confirm new password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                  Change Password →
                </button>
              </form>

              <div className="text-center mt-4">
                <Link to="/login" className="text-success text-decoration-none fw-semibold">
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

export default ResetPassword;