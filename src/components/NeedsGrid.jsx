import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NeedCard from "./NeedCard";
import { getAllPublicNeeds } from "../apis/browseApis";

const NeedsGrid = () => {
  const [sortOption, setSortOption] = useState("urgent");
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNeeds = async () => {
      try {
        const response = await getAllPublicNeeds();
        setNeeds(response);
      } catch (error) {
        console.error("Unable to load needs", error);
      } finally {
        setLoading(false);
      }
    };

    loadNeeds();
  }, []);

  const sortedNeeds = [...needs].sort((a, b) => {
    if (sortOption === "low") {
      return Number(a.pricePerQuantity || 0) - Number(b.pricePerQuantity || 0);
    }

    if (sortOption === "high") {
      return Number(b.pricePerQuantity || 0) - Number(a.pricePerQuantity || 0);
    }

    // Most urgent => highest remaining quantity first
    return Number(b.remainingQuantity || 0) - Number(a.remainingQuantity || 0);
  });

  return (
    <div className="w-100 overflow-hidden">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1 fs-3">All Needs</h2>

          <p className="text-muted mb-0 small">
            Choose a need below to see details and contribute.
          </p>
        </div>

        <div className="w-100 w-md-auto">
          <select
            className="form-select"
            style={{
              minWidth: "220px",
              maxWidth: "100%",
            }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="urgent">Sort by: Most Urgent</option>

            <option value="low">Low to High</option>

            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-5">Loading needs...</div>
      ) : (
        <div className="row g-3 mx-0">
          {sortedNeeds.map((item) => {
            const target =
              Number(item.pricePerQuantity || 0) * Number(item.quantity || 0);

            const raised =
              Number(item.pricePerQuantity || 0) *
              (Number(item.quantity || 0) -
                Number(item.remainingQuantity || 0));

            const progress =
              target > 0 ? Math.round((raised / target) * 100) : 0;

            return (
              <div
                className="col-12 col-sm-6 col-lg-4 col-xl-3 px-2"
                key={item.needItemId}
              >
                <Link
                  to={`/need/${item.needItemId}`}
                  className="text-decoration-none text-dark"
                >
                  <NeedCard
                    image={
                      item.orphanageProfilePic ||
                      "https://via.placeholder.com/400x260?text=Need"
                    }
                    title={item.name}
                    place={item.orphanageName}
                    needed={`${item.remainingQuantity || 0} remaining`}
                    amount={raised}
                    target={target}
                    progress={progress}
                    priority={item.priority || "LOW"}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NeedsGrid;
