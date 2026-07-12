import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaHeart,
  FaCheckCircle,
  FaCoins,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllNeeds } from "../apis/donorNeedApis";
import { toast } from "react-toastify";
import DonorSidebar from "../components/DonorSidebar";
import { getCategoryIcon } from "../utils/categoryIcons";

const ExploreNeeds = () => {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadNeeds();
  }, []);

  const loadNeeds = async () => {
    try {
      setLoading(true);
      const response = await getAllNeeds();
      setNeeds(response.data || []);
    } catch (error) {
      console.error("Error fetching needs:", error);
      toast.error("Failed to load needs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(needs.map((need) => need.category))];

  const filteredNeeds = needs.filter((need) => {
    const matchesSearch = need.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || need.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-danger";
      case "MEDIUM":
        return "bg-warning text-dark";
      case "LOW":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const handleViewDetails = (need) => {
    navigate(`/needs/${need.needItemId}`, { state: { need } });
  };

  return (
    <div className="d-flex min-h-screen bg-light position-relative">
      {/* Sidebar overlay / toggle layout with hidden-by-default behavior */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 z-3 bg-white"
          style={{ height: "100vh" }}
        >
          <DonorSidebar />
        </div>
      )}

      {/* Backdrop for overlay click when sidebar is open */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 z-2"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div
        className="pb-5 w-100"
        style={{ marginLeft: isMobile ? "0px" : "250px", minHeight: "100vh" }}
      >
        {/* Top Header with Hamburger / Three Lines Symbol */}
        <div className="bg-white shadow-xs py-2 mb-3 sticky-top z-1">
          <div className="container px-4 d-flex align-items-center justify-content-between">
            <button
              className="btn btn-light border-0 shadow-xs d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: "38px", height: "38px" }}
              onClick={() => setShowSidebar(!showSidebar)}
              title="Toggle Menu"
            >
              {showSidebar ? (
                <FaTimes className="text-success" />
              ) : (
                <FaBars className="text-success" />
              )}
            </button>
            <h5 className="fw-bold mb-0 text-success">Explore Needs</h5>
            <div style={{ width: "38px" }}></div>
          </div>
        </div>

        <div className="bg-success text-white py-4 mb-4 shadow-sm">
          <div className="container text-center">
            <h1 className="fw-bold fs-3 mb-1">Explore Children's Needs</h1>
            <p className="small text-white-75 mb-0">
              Discover immediate requirements from orphanages and bring smiles
              to children's lives.
            </p>
          </div>
        </div>

        <div className="container px-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
            <div className="row g-2 align-items-center justify-content-between">
              <div className="col-md-8">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Search need item name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white">
                    <FaFilter className="text-muted" />
                  </span>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredNeeds.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <h5 className="fw-semibold">No needs found</h5>
              <p className="small">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 g-2">
              {filteredNeeds.map((need) => (
                <div className="col" key={need.needItemId || need.id}>
                  <div className="card h-100 border-0 shadow-xs rounded-3 overflow-hidden position-relative bg-white p-2 d-flex flex-column hover-shadow transition-all">
                    {/* Compact Badges Corner */}
                    <div className="position-absolute top-0 start-0 m-1 d-flex flex-column gap-1 z-2">
                      <span
                        className={`badge x-x-small py-0.5 px-1 ${getPriorityBadge(need.priority)}`}
                        style={{ fontSize: "0.6rem" }}
                      >
                        {need.priority}
                      </span>
                    </div>

                    <span
                      className="badge bg-success position-absolute top-0 end-0 m-1 x-x-small py-0.5 px-1 z-2"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {need.category}
                    </span>

                    {/* Thumbnail Image */}
                    <div className="text-center bg-light rounded-2 py-2 mb-2 mt-3">
                      <img
                        src={getCategoryIcon(need.category)}
                        alt={need.name}
                        className="object-fit-contain"
                        style={{ height: "90px", width: "100%" }}
                      />
                    </div>

                    {/* Card Content (E-commerce Style) */}
                    <div className="card-body p-1 d-flex flex-column flex-grow-1">
                      <h6
                        className="fw-bold text-dark mb-1 text-truncate"
                        style={{ fontSize: "0.82rem" }}
                        title={need.name}
                      >
                        {need.name}
                      </h6>

                      <p
                        className="text-muted mb-1 text-truncate"
                        style={{ fontSize: "0.68rem" }}
                      >
                        <FaMapMarkerAlt className="text-success me-0.5" /> ID:{" "}
                        {need.orphanageCareBridgeId}
                      </p>

                      <div
                        className="text-dark fw-bold mb-1"
                        style={{ fontSize: "0.85rem" }}
                      >
                        ₹{need.pricePerQuantity}{" "}
                        <span
                          className="text-muted fw-normal x-small"
                          style={{ fontSize: "0.65rem" }}
                        >
                          / unit
                        </span>
                      </div>

                      {/* Mini Qty Bar */}
                      <div
                        className="bg-light px-1 py-1 rounded-1 x-small mb-2 d-flex justify-content-between text-muted"
                        style={{ fontSize: "0.65rem" }}
                      >
                        <span>Req: {need.quantity}</span>
                        <span className="text-success">
                          <FaCheckCircle className="me-0.5" />
                          {need.fulfilledQuantity}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleViewDetails(need)}
                        className="btn btn-outline-success x-small w-100 fw-semibold d-flex align-items-center justify-content-center gap-1 mt-auto py-1"
                        style={{ fontSize: "0.72rem" }}
                      >
                        <FaHeart className="text-danger x-small" /> Fulfill
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreNeeds;
