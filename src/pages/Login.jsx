import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
  FaLock as FaLockIcon,
} from "react-icons/fa";
import kidsImg from "../assets/children.png";
import Navbar from "../components/Navbar";
import { login } from "../apis/auth"; // Assuming you have this API function

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }

   try {
     const response = await login({
       email,
       password,
     });

     localStorage.setItem("token", response.token);

     const decoded = jwtDecode(response.token);

     const role = decoded.role;

     switch (role) {
       case "DONOR":
         navigate("/donor/dashboard");
         break;

       case "ORPHANAGE":
         navigate("/orphanage/dashboard");
         break;

       case "ADMIN":
         navigate("/admin/dashboard");
         break;

       default:
         toast.error("Unknown user role");
     }

     toast.success("Login successful!");
   } catch (error) {
     toast.error(error.response?.data?.message || "Login failed");
   }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light py-3 px-2 px-md-4">
        <div className="row g-4 align-items-center min-vh-100">
          {/* Left Side: Matching the provided design */}
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

              {/* Features - Matching Reference Image */}
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

          {/* Right Side: Login Form */}
          <div className="col-lg-6">
            <div
              className="bg-white shadow rounded-4 p-4 p-md-5 mx-auto"
              style={{ maxWidth: "500px" }}
            >
              <div className="text-center mb-4">
                <FaLockIcon className="fs-2 text-success mb-2" />
                <h2 className="fw-bold fs-3">Login to CareBridge</h2>
                <p className="text-muted small">
                  Welcome back! Please login to your account.
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="fw-semibold">Email Address</label>
                  <div className="input-group mt-2">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-semibold">Password</label>
                  <div className="input-group mt-2">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="input-group-text"
                      role="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                <div className="text-end mb-3">
                  <Link
                    to="/forgot-password"
                    className="text-success small text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                >
                  Login →
                </button>
              </form>

              <p className="text-center mt-3 mb-0 small">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-success fw-bold ms-2 text-decoration-none"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
