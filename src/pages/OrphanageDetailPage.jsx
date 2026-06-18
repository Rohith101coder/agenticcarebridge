import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrphanageById } from "../apis/browseApis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrphanageDetailPage = () => {
  const { id } = useParams();
  const [orphanage, setOrphanage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrphanage = async () => {
      try {
        const response = await getOrphanageById(id);
        setOrphanage(response);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load orphanage details",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrphanage();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">Loading orphanage details...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : orphanage ? (
          <>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-3">
              <div>
                <h1 className="fw-bold mb-2">{orphanage.orphanageName}</h1>
                <p className="text-muted mb-2">{orphanage.description}</p>
                <span className="badge bg-success-subtle text-success fs-6">
                  {orphanage.verificationStatus}
                </span>
              </div>
              <Link to="/orphanages" className="btn btn-outline-secondary">
                Back to Orphanages
              </Link>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card rounded-4 shadow-sm p-4 mb-4">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Location</h6>
                        <p className="text-muted mb-0">{orphanage.location}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Children</h6>
                        <p className="text-muted mb-0">
                          {orphanage.numberOfChildren}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Active Needs</h6>
                        <p className="text-muted mb-0">
                          {orphanage.activeNeeds}
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <h6 className="mb-1">Email</h6>
                        <p className="text-muted mb-0">
                          {orphanage.orphanageEmail}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Phone</h6>
                        <p className="text-muted mb-0">
                          {orphanage.orphanagePhone}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-1">Darpan ID</h6>
                        <p className="text-muted mb-0">{orphanage.darpanId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-3">About this orphanage</h5>
                  <p className="text-muted mb-0">{orphanage.description}</p>
                </div>

                <div className="card rounded-4 shadow-sm p-4">
                  <h5 className="fw-bold mb-3">Active needs</h5>
                  {orphanage.needs && orphanage.needs.length > 0 ? (
                    <div className="row g-3">
                      {orphanage.needs.map((need) => (
                        <div className="col-12" key={need.needItemId}>
                          <div className="border rounded-4 p-3">
                            <div className="d-flex justify-content-between align-items-start gap-2">
                              <div>
                                <h6 className="fw-bold mb-1">{need.name}</h6>
                                <p className="text-muted small mb-1">
                                  {need.description}
                                </p>
                                <div className="d-flex gap-2 small text-muted">
                                  <span>{need.category}</span>
                                  <span>•</span>
                                  <span>{need.priority} priority</span>
                                </div>
                              </div>
                              <div className="text-end">
                                <span className="fw-bold">
                                  {need.remainingQuantity}
                                </span>
                                <div className="text-muted small">
                                  Remaining
                                </div>
                              </div>
                            </div>
                            <div
                              className="progress mt-3"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{ width: `${need.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">
                      No active needs available.
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                {orphanage.orphanageProfilePic && (
                  <div className="card rounded-4 shadow-sm overflow-hidden mb-4">
                    <img
                      src={orphanage.orphanageProfilePic}
                      alt={orphanage.orphanageName}
                      className="img-fluid w-100"
                      style={{ height: "280px", objectFit: "cover" }}
                    />
                  </div>
                )}

                <div className="card rounded-4 shadow-sm p-4">
                  <h5 className="fw-bold mb-3">Contact</h5>
                  <p className="mb-1">
                    <strong>Email:</strong> {orphanage.orphanageEmail}
                  </p>
                  <p className="mb-0">
                    <strong>Phone:</strong> {orphanage.orphanagePhone}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-warning">Orphanage not found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrphanageDetailPage;
