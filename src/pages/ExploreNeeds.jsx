import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaHeart,
  FaExclamationCircle,
  FaCheckCircle,
  FaCoins,
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
  const navigate = useNavigate();

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

  // Extract unique categories for filters dynamically
  const categories = ["All", ...new Set(needs.map((need) => need.category))];

  // Filter logic based on entity properties
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

  // Function to handle navigating to the single need page
  const handleViewDetails = (need) => {
    navigate(`/needs/${need.needItemId}`, { state: { need } });
  };

  return (
    <div className="d-flex min-h-screen bg-light">
      {/* Sidebar fixed to the left */}
      <DonorSidebar />

      {/* Main Content adjusted with left margin to accommodate the 250px sidebar */}
      <div
        className="pb-5 w-100"
        style={{ marginLeft: "250px", minHeight: "100vh" }}
      >
        {/* Hero Banner */}
        <div className="bg-success text-white py-5 mb-4 shadow-sm">
          <div className="container text-center">
            <h1 className="fw-bold display-5 mb-2">Explore Children's Needs</h1>
            <p className="fs-5 text-white-75 mb-0">
              Discover immediate requirements from orphanages and bring smiles
              to children's lives.
            </p>
          </div>
        </div>

        <div className="container px-4">
          {/* Search and Filter Section */}
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
            <div className="row g-2 align-items-center justify-content-between">
              {/* Search Bar */}
              <div className="col-md-8">
                <div className="input-group">
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

              {/* Category Filter */}
              <div className="col-md-4">
                <div className="input-group">
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

          {/* Needs Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredNeeds.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <h3 className="fw-semibold">No needs found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {filteredNeeds.map((need) => (
                <div className="col" key={need.needItemId || need.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                    {/* Category & Priority Badges */}
                    <div className="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end gap-1 z-2">
                      <span className="badge bg-success">{need.category}</span>
                      <span
                        className={`badge ${getPriorityBadge(need.priority)}`}
                      >
                        {need.priority} Priority
                      </span>
                    </div>

                    {/* Need Image / Icon */}
                    <img
                      src={getCategoryIcon(need.category)}
                      alt={need.name}
                      className="card-img-top object-fit-cover bg-light"
                      style={{ height: "140px" }}
                    />

                    <div className="card-body d-flex flex-column p-3">
                      <h6 className="fw-bold text-dark mb-1 text-truncate pe-5">
                        {need.name}
                      </h6>

                      {/* Orphanage CareBridge ID */}
                      <p className="text-muted x-small mb-2 d-flex align-items-center gap-1 text-truncate">
                        <FaMapMarkerAlt className="text-success flex-shrink-0" />
                        <span className="text-truncate">
                          CareBridge ID: {need.orphanageCareBridgeId}
                        </span>
                      </p>

                      <p
                        className="text-secondary small flex-grow-1 mb-2"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {need.description?.length > 70
                          ? `${need.description.substring(0, 70)}...`
                          : need.description}
                      </p>

                      {/* Quantity details */}
                      <div className="bg-light p-2 rounded-3 x-small mb-2 d-flex justify-content-between">
                        <div>
                          <span className="text-muted d-block">Total Qty:</span>
                          <span className="fw-semibold text-dark">
                            {need.quantity}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted d-block text-success d-flex align-items-center gap-1">
                            <FaCheckCircle /> Fulfilled:
                          </span>
                          <span className="fw-semibold text-dark">
                            {need.fulfilledQuantity}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted d-block text-warning d-flex align-items-center gap-1">
                            <FaExclamationCircle /> Reserved:
                          </span>
                          <span className="fw-semibold text-dark">
                            {need.reservedQuantity}
                          </span>
                        </div>
                      </div>

                      {/* Financial info */}
                      <div className="d-flex align-items-center justify-content-between bg-white border border-success-subtle p-2 rounded-3 mb-2 x-small text-success">
                        <span className="d-flex align-items-center gap-1">
                          <FaCoins /> Price/Unit:
                        </span>
                        <span className="fw-bold text-dark">
                          ₹{need.pricePerQuantity}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleViewDetails(need)}
                        className="btn btn-outline-success btn-sm w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 py-2 border-0"
                      >
                        <FaHeart className="text-danger" /> Fulfill Need
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
