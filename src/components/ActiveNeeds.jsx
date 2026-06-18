import React from "react";

const ActiveNeeds = ({needs}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
      {/* Heading */}
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold">Active Needs</h5>

        <small className="text-success fw-semibold">View all</small>
      </div>

      {/* Needs */}
      {needs.map((item, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-3"
        >
          <div>
            <h6 className="fw-bold mb-1">{item.itemName}</h6>

            <small className="text-muted">
              Needed: {item.requiredQuantity}
            </small>
          </div>

          <span
            className={`badge ${
              item.priority === "High Priority"
                ? "bg-danger"
                : item.priority === "Medium"
                  ? "bg-warning text-dark"
                  : "bg-success"
            }`}
          >
            {item.priority}
          </span>
        </div>
      ))}

      {/* Add Button */}
      <button className="btn btn-success w-100 mt-2">+ Add New Need</button>
    </div>
  );
};

// export default ActiveNeeds;
//     },
//     {
//       name: "School Bags",
//       quantity: "15 needed",
//       priority: "Medium"
//     },
//     {
//       name: "Footballs",
//       quantity: "5 needed",
//       priority: "Low"
//     }
//   ];

//   return (
//     <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

//       {/* Heading */}
//       <div className="d-flex justify-content-between mb-4">
//         <h5 className="fw-bold">
//           Active Needs
//         </h5>

//         <small className="text-success fw-semibold">
//           View all
//         </small>
//       </div>

//       {/* Needs */}
//       {needs.map((item, index) => (
//         <div
//           key={index}
//           className="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-3"
//         >
//           <div>
//             <h6 className="fw-bold mb-1">
//               {item.name}
//             </h6>

//             <small className="text-muted">
//               Needed: {item.quantity}
//             </small>
//           </div>

//           <span
//             className={`badge ${
//               item.priority === "High Priority"
//                 ? "bg-danger"
//                 : item.priority === "Medium"
//                 ? "bg-warning text-dark"
//                 : "bg-success"
//             }`}
//           >
//             {item.priority}
//           </span>
//         </div>
//       ))}

//       {/* Add Button */}
//       <button className="btn btn-success w-100 mt-2">
//         + Add New Need
//       </button>

//     </div>
//   );
// };

export default ActiveNeeds;