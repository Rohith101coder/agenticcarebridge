import React from "react";
import {
  FaGift,
  FaCalendarCheck,
  FaBoxOpen
} from "react-icons/fa";

const RecentActivity = ({ recentActivities: activitiesProp }) => {
  const activitiesList = activitiesProp || [
    {
      icon: <FaGift />,
      title: "Donation Received",
      description: "Received rice bags from Rahul Sharma",
      time: "2 hours ago",
      color: "success",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Visit Confirmed",
      description: "Birthday event booked by Priya Verma",
      time: "5 hours ago",
      color: "primary",
    },
    {
      icon: <FaBoxOpen />,
      title: "New Need Added",
      description: "Added school bags requirement",
      time: "1 day ago",
      color: "warning",
    },
  ];
  console.log("RecentActivity activitiesList:", activitiesList);

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
      {/* Heading */}
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold">Recent Activity</h5>

        <small className="text-success fw-semibold">View all</small>
      </div>

      {/* Activity List */}
      {activitiesList.map((item, index) => (
        <div key={index} className="d-flex gap-3 align-items-start mb-4">
          {/* Icon */}
          <div className={`fs-4 text-${item.color}`}>{item.activityType}</div>

          {/* Content */}
          <div>
            <h6 className="fw-bold mb-1">{item.title}</h6>

            <small className="text-muted d-block">{item.description}</small>

            <small className="text-secondary">{item.createdAt}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;