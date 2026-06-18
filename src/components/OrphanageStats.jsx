import React from "react";
import {
  FaChild,
  FaBox,
  FaRupeeSign,
  FaCalendarAlt
} from "react-icons/fa";

const OrphanageStats = ({overview}) => {
  const stats = [
    {
      icon: <FaChild />,
      title: "Children",
      value: overview?.childrenCount || "0",
      color: "success",
    },
    {
      icon: <FaBox />,
      title: "Active Needs",
      value: overview?.activeNeedsCount || "0",
      color: "warning",
    },
    {
      icon: <FaRupeeSign />,
      title: "Total Donations",
      value: "₹" + (overview?.totalDonationsAmount || "0"),
      color: "success",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Upcoming Visits",
      value: overview?.upcomingVisitsCount || "0",
      color: "primary",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="col-md-6 col-lg-3"
        >
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex align-items-center gap-3">

              <div
                className={`fs-3 text-${item.color}`}
              >
                {item.icon}
              </div>

              <div>
                <small className="text-muted">
                  {item.title}
                </small>

                <h4 className="fw-bold mb-0">
                  {item.value}
                </h4>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrphanageStats;