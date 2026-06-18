import React from "react";
import { FaHeart } from "react-icons/fa";

const ImpactSummary = ({impact}) => {
  const impactData = [
    {
      id: 1,
      number: impact?.itemsDonated || 0,
      title: "Items Donated",
    },
    {
      id: 2,
      number: impact?.visitsMade || 0,
      title: "Visits Made",
    },
    {
      id: 3,
      number: impact?.childrenImpacted || 0,
      title: "Children Impacted",
    },
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

      {/* Heading */}
      <h5 className="fw-bold mb-4">
        Impact Summary
      </h5>

      {/* Top Message */}
      <div className="text-center mb-4">
        <FaHeart
          className="text-success mb-2"
          size={40}
        />

        <p className="fw-semibold text-success mb-0">
          Thank you! Your kindness is changing lives.
        </p>
      </div>

      {/* Stats */}
      <div className="row text-center">
        {impactData.map((item) => (
          <div className="col-4" key={item.id}>
            <h4 className="fw-bold">
              {item.number}
            </h4>

            <small className="text-muted">
              {item.title}
            </small>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ImpactSummary;