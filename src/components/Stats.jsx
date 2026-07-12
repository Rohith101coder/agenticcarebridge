// 4. Stats.jsx (Responsive margins, stack layout for small mobile screens)
import React, { useEffect, useState } from "react";
import { FaHome, FaUsers, FaGift, FaHeart } from "react-icons/fa";
import { getLandingPageStats } from "../apis/landingPage";

const Stats = () => {
  const [stats, setStats] = useState({
    verifiedOrphanages: 0,
    activeDonors: 0,
    needsFulfilled: 0,
    citiesReached: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getLandingPageStats();
        setStats(data);
      } catch (error) {
        console.error("error: " + error);
      }
    };
    fetchStats();
  }, []);

  const statsData = [
    {
      id: 1,
      icon: <FaHome />,
      color: "#198754",
      number: stats.verifiedOrphanages + "+",
      title: "Verified Orphanages",
    },
    {
      id: 2,
      icon: <FaUsers />,
      color: "#ff6a00",
      number: stats.activeDonors + "+",
      title: "Active Donors",
    },
    {
      id: 3,
      icon: <FaGift />,
      color: "#6f42c1",
      number: stats.needsFulfilled + "+",
      title: "Needs Fulfilled",
    },
    {
      id: 4,
      icon: <FaHeart />,
      color: "#0d6efd",
      number: stats.activeDonors + "+",
      title: "Cities Reached",
    },
  ];

  return (
    <section
      className="position-relative px-3 px-lg-0"
      style={{
        marginTop: "-30px",
        marginTop_lg: "-50px",
        zIndex: 10,
      }}
    >
      <div className="container">
        <div className="bg-white shadow rounded-4 p-3 p-md-4">
          <div className="row g-3 align-items-center text-center">
            {statsData.map((item, index) => (
              <div className="col-6 col-md-3" key={item.id}>
                <div
                  className={`d-flex align-items-center justify-content-center gap-2 gap-md-3 py-2 ${
                    index % 2 === 0 && index !== statsData.length - 1
                      ? "border-end-md"
                      : ""
                  } ${index !== statsData.length - 1 ? "border-end-sm" : ""}`}
                >
                  {/* Icon */}
                  <div className="fs-5 fs-md-4" style={{ color: item.color }}>
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="text-start">
                    <h6
                      className="fw-bold mb-0 fs-6 fs-md-5"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </h6>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {item.title}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
