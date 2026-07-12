// 3. Hero.jsx (Responsive padding, typography, and image alignment for small screens)
import React from "react";
import slider from "../assets/banner.png";

const Hero = () => {
  return (
    <section className="bg-light py-4 py-lg-0">
      <div className="container-fluid px-4 px-lg-5 text-center bg-white py-5">
        <div className="row align-items-center g-4">
          {/* Left Content */}
          <div className="col-lg-6 text-lg-start text-center">
            <h1 className="fw-bold display-6 display-lg-5 mb-3">
              Connect Donors with Orphanages
            </h1>

            <p className="text-muted my-3 fs-6 fs-lg-5">
              Help orphanages by donating food, clothes, books, and supporting
              events.
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <button className="btn btn-success px-4 py-2 fw-semibold">
                Donate Now
              </button>

              <button className="btn btn-outline-success px-4 py-2 fw-semibold">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 position-relative text-center mt-4 mt-lg-0">
            {/* Left shadow overlay - hidden on mobile for clean rendering */}
            <div
              className="d-none d-lg-block"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100px",
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
                zIndex: 1,
              }}
            ></div>

            <img
              src={slider}
              alt="hero"
              className="img-fluid rounded shadow w-100"
              style={{
                maxHeight: "350px",
                maxHeight_lg: "500px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
