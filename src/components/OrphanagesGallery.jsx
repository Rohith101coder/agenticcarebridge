import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { getAllPublicOrphanages } from "../apis/browseApis";

const OrphanagesGallery = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrphanages = async () => {
      try {
        const response = await getAllPublicOrphanages();
        setOrphanages(response);
      } catch (error) {
        console.error("Unable to load orphanages", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrphanages();
  }, []);

  return (
    <div className="container-fluid px-0 overflow-hidden">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">All Orphanages</h2>

          <p className="text-muted small mb-0">
            Choose an orphanage to learn more and support their needs.
          </p>
        </div>

        <select
          className="form-select"
          style={{
            width: "220px",
            maxWidth: "100%",
          }}
        >
          <option>Sort by: Recently Added</option>
          <option>Most Supported</option>
          <option>Most Urgent</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-5">
          Loading orphanages...
        </div>
      ) : (
        <div className="row g-3 mx-0">
          {orphanages.map((item) => (
            <div
              className="col-12 col-sm-6 col-lg-4 px-2"
              key={item.carebridgeId}
            >
              <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                {/* Image */}
                <div className="position-relative">
                  <img
                    src={
                      item.orphanageProfilePic ||
                      "https://via.placeholder.com/400x260?text=Orphanage"
                    }
                    alt={item.orphanageName}
                    className="img-fluid w-100"
                    style={{
                      height: "170px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="position-absolute top-0 end-0 bg-white shadow-sm rounded-pill px-3 py-2 m-2 small fw-semibold text-success">
                    <FaCheckCircle className="me-1" />
                    Verified
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h5 className="fw-bold mb-1">
                    {item.orphanageName}
                  </h5>

                  <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                    <FaMapMarkerAlt className="text-success" />

                    <span>{item.location}</span>
                  </div>

                  <p
                    className="text-muted small mb-3"
                    style={{
                      minHeight: "48px",
                    }}
                  >
                    {item.description}
                  </p>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaUsers className="text-primary" />

                      <div>
                        <small className="text-muted d-block">
                          Children
                        </small>

                        <span className="fw-bold">
                          {item.numberOfChildren}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <FaHandHoldingHeart className="text-warning" />

                      <div>
                        <small className="text-muted d-block">
                          Needs
                        </small>

                        <span className="fw-bold">
                          {item.activeNeeds}
                        </span>
                      </div>
                    </div>

                    <button className="btn btn-light btn-sm text-success fw-semibold rounded-pill">
                      Donate Now ❤
                    </button>
                  </div>

                  <Link
                    to={`/orphanage/${item.carebridgeId}`}
                    className="btn btn-success w-100 rounded-3"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrphanagesGallery;