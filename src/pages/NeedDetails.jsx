import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNeedById } from "../apis/browseApis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NeedDetails = () => {
  const { id } = useParams();
  const [need, setNeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNeed = async () => {
      try {
        const response = await getNeedById(id);
        setNeed(response);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load need details");
      } finally {
        setLoading(false);
      }
    };

    loadNeed();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">Loading need details...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : need ? (
          <>
            <div className="d-flex justify-content-between align-items-start mb-4 gap-3">
              <div>
                <h1 className="fw-bold">{need.name}</h1>
                <p className="text-muted mb-2">{need.description}</p>
                <span className="badge bg-success-subtle text-success fs-6">
                  {need.priority} Priority
                </span>
              </div>
              <Link to="/needs" className="btn btn-outline-secondary">
                Back to Needs
              </Link>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card rounded-4 shadow-sm p-4 mb-4">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Orphanage</h6>
                        <p className="text-muted mb-0">{need.orphanageName}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Location</h6>
                        <p className="text-muted mb-0">{need.location}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Remaining Quantity</h6>
                        <p className="text-muted mb-0">
                          {need.remainingQuantity}
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Quantity Requested</h6>
                        <p className="text-muted mb-0">{need.quantity}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Price Per Unit</h6>
                        <p className="text-muted mb-0">
                          ₹ {need.pricePerQuantity}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Progress</h6>
                        <div className="progress" style={{ height: "10px" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${need.progress}%` }}
                          />
                        </div>
                        <small className="text-muted">
                          {need.progress}% fulfilled
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card rounded-4 shadow-sm p-4">
                  <h5 className="fw-bold mb-3">About this need</h5>
                  <p className="text-muted mb-0">{need.description}</p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card rounded-4 shadow-sm p-4 h-100">
                  <h5 className="fw-bold mb-3">Support this orphanage</h5>
                  <p className="text-muted mb-4">
                    Share this need, contact the orphanage, or donate directly.
                  </p>
                  <button className="btn btn-success w-100 mb-3">
                    Donate Now
                  </button>
                  <Link
                    to={`/orphanage/${need.orphanageCareBridgeId}`}
                    className="btn btn-outline-success w-100"
                  >
                    View Orphanage
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-warning">Need not found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NeedDetails;
