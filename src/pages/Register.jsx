import React, { useState } from "react";
import kidsImg from "../assets/children.png";
import { register } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaChevronDown,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);


const handleRegister = async () => {

    if(name === "" || email === "" || password === "" || role === ""){
        toast.error("Please fill in all fields");
        return;
    }
  
  try {
    const payload = {
      name,
      email,
      password,
      role,
    };

    const response = await register(payload);

    if (response.message === "Email already registered") {
        toast.error(response.message);
        return;
    }

  

    navigate("/verify-email", {
      state: { name, email, password, role },
    });
      toast.success(response.message);

   
  } catch (error) {
    console.error(error);
     console.log(error.response?.status);
     console.log(error.response?.data);
    
    toast.error(error.response?.data?.message || "Registration failed");
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

          {/* Right Side Form */}
          <div className="col-lg-6">
            <div
              className="bg-white shadow rounded-4 p-4 p-md-5 mx-auto"
              style={{ maxWidth: "500px" }}
            >
              {/* Header */}
              <div className="text-center mb-4">
                <FaUser className="fs-2 text-success mb-2" />

                <h2 className="fw-bold fs-3">Create Your Account</h2>

                <p className="text-muted small">
                  Sign up to get started with CareBridge
                </p>
              </div>

              {/* Full Name */}
              <div className="mb-3">
                <label className="fw-semibold">Full Name</label>

                <div className="input-group mt-2">
                  <span className="input-group-text">
                    <FaUser />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
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
              {/* Role */}
              <div className="mb-4">
                <label className="fw-semibold">Role</label>

                <div className="input-group mt-2">
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select your role</option>
                    <option value="DONOR">DONOR</option>
                    <option value="ORPHANAGE">ORPHANAGE</option>
                  </select>

                  <span className="input-group-text">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* Button */}

              <button
                className="btn btn-success w-100 py-2 fw-semibold"
                onClick={handleRegister}
              >
                Register →
              </button>

              {/* Footer */}
              <p className="text-center mt-3 mb-0 small">
                Already have an account?
                <Link
                  to="/login"
                  className="text-success fw-bold ms-2 text-decoration-none"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;