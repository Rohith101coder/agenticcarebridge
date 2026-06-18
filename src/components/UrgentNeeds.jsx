import React from "react";
import riceImg from "../assets/ricebag.jpg";
import booksImg from "../assets/books.jpg";
import blanketImg from "../assets/blankets.jpg";

const UrgentNeeds = ({urgentNeeds}) => {
 const needs = urgentNeeds.map((need) => ({
   id: need.needId,
   title: need.title,
   place: need.orpName,
   needed: `${need.quantityNeeded} needed`,
   image: booksImg, // temporary fallback
   priority: need.priorityLevel,
 }));

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      {/* Heading */}
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold">Urgent Needs Near You</h5>

        <small
          className="text-success fw-semibold"
          style={{ cursor: "pointer" }}
        >
          View all
        </small>
      </div>

      {/* Cards */}
      <div className="row g-3">
        {needs.map((item) => (
          <div className="col-6 col-md-4 col-lg-2" key={item.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100 p-2 d-flex flex-column">
              {/* Priority Badge */}
              <div className="mb-2">
                <span
                  className={`badge small ${
                    item.priority === "High Priority"
                      ? ""
                      : "bg-warning text-dark"
                  }`}
                  style={
                    item.priority === "High Priority"
                      ? { backgroundColor: "#e64d4d", color: "white" }
                      : {}
                  }
                >
                  {item.priority}
                </span>
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top rounded-4"
                style={{
                  height: "90px",
                  objectFit: "cover",
                }}
              />

              {/* Body */}
              <div className="card-body p-2 d-flex flex-column">
                <h6
                  className="fw-bold small mb-1"
                  style={{ minHeight: "45px" }}
                >
                  {item.title}
                </h6>

                <small
                  className="text-muted d-block small"
                  style={{ minHeight: "45px" }}
                >
                  {item.place}
                </small>

                <small
                  className="text-muted d-block mb-2 small"
                  style={{ minHeight: "40px" }}
                >
                  {item.needed}
                </small>

                <button className="btn btn-success btn-sm w-100 mt-auto">
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentNeeds;