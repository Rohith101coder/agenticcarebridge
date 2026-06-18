import React from "react";
import {
  FaRupeeSign,
  FaGift,
  FaCalendarAlt,
  FaHome
} from "react-icons/fa";

const DonorStats = ({donorStats}) => {
 const stats = [
   {
     id: 1,
     icon: <FaRupeeSign />,
     title: "Donations Made",
     value: `₹${donorStats?.totalDonationAmmount || 0}`,
     sub: "Total Value",
     color: "#198754",
   },
   {
     id: 2,
     icon: <FaGift />,
     title: "Needs Supported",
     value: donorStats?.needsSupported || 0,
     sub: "Items",
     color: "#fd7e14",
   },
   {
     id: 3,
     icon: <FaCalendarAlt />,
     title: "Visits Booked",
     value: donorStats?.totalVisits || 0,
     sub: "Upcoming",
     color: "#0d6efd",
   },
   {
     id: 4,
     icon: <FaHome />,
     title: "Orphanages Supported",
     value: donorStats?.orphanageSupported || 0,
     sub: "Orphanages",
     color: "#20c997",
   },
 ];

  return (
    <div className="row g-4 mb-4">
      {stats.map((item) => (
        <div className="col-md-6 col-lg-3" key={item.id}>
          <div className="card border-0 shadow-sm p-3 rounded-4 h-100">

            <div className="d-flex align-items-center gap-3">

              <div
                className="fs-4"
                style={{
                  color: item.color
                }}
              >
                {item.icon}
              </div>

              <div>
                <small className="text-muted">
                  {item.title}
                </small>

                <h5 className="fw-bold mb-0">
                  {item.value}
                </h5>

                <small className="text-muted">
                  {item.sub}
                </small>
              </div>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default DonorStats;