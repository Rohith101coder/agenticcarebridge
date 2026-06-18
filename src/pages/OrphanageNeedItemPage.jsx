import React, { useState, useEffect } from "react";
import Sidebar from "../components/OrphanageSidebar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createNeedItem,
  getActiveNeeds,
  updateNeedItem,
  deleteNeedItem,
  deliveredItems,
} from "../apis/needItem";

const OrphanageNeedItemPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [activeNeeds, setActiveNeeds] = useState([]);
  const [loadingNeeds, setLoadingNeeds] = useState(false);
 const [showEditModal, setShowEditModal] = useState(false);
 const [deletingId, setDeletingId] = useState(null);

 const [deliveredNeeds, setDeliveredNeeds] = useState([]);
 const [loadingDeliveredNeeds, setLoadingDeliveredNeeds] = useState(false);
 const [editLoading, setEditLoading] = useState(false);

 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [selectedNeedItem, setSelectedNeedItem] = useState(null);
 const [deleteLoading, setDeleteLoading] = useState(false);

 const [editFormData, setEditFormData] = useState({
   id: "",
   name: "",
   description: "",
   category: "",
   quantity: "",
   pricePerQuantity: "",
   priority: "",
   productLinks: [""],
 });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    pricePerQuantity: "",
    priority: "",
    productLinks: [""],
  });

  // Enums for dropdowns
  const categories = [
    "FOOD",
    "EDUCATION",
    "MEDICAL",
    "CLOTHES",
    "HYGIENE",
    "FURNITURE",
    "ELECTRONICS",
    "SPORTS",
    "TOYS",
    "STATIONERY",
    "DAILY_NEEDS",
    "KITCHEN",
    "BEDDING",
    "FOOTWEAR",
    "BABY_CARE",
    "HEALTH_CARE",
    "CLEANING_SUPPLIES",
    "BOOKS",
    "NUTRITION",
    "OTHER",
  ];
  const priorities = ["HIGH", "MEDIUM", "LOW"];

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreateNeedItem = async (e) => {
    e.preventDefault();

    const {
      name,
      description,
      category,
      quantity,
      pricePerQuantity,
      priority,
      productLinks,
    } = formData;

    if (
      !name ||
      !description ||
      !category ||
      !quantity ||
      !pricePerQuantity ||
      !priority ||
      !productLinks[0]
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        quantity: Number(quantity),
        pricePerQuantity: Number(pricePerQuantity),
        productLinks: [productLinks[0]],
      };

      const response = await createNeedItem(payload);

      console.log(response);
      toast.success("Need Item Created Successfully");

      setFormData({
        name: "",
        description: "",
        category: "",
        quantity: "",
        pricePerQuantity: "",
        priority: "",
        productLinks: [""],
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to create need item",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveNeeds = async () => {
    try {
      setLoadingNeeds(true);

      const response = await getActiveNeeds();

      setActiveNeeds(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNeeds(false);
    }
  };

 useEffect(() => {
   if (activeTab === "active") {
     fetchActiveNeeds();
   }

   if (activeTab === "delivered") {
     fetchDeliveredNeeds();
   }
 }, [activeTab]);

  const handleEditClick = (item) => {
    setEditFormData({
      id: item.needItemId,
      name: item.name || "",
      description: item.description || "",
      category: item.category || "",
      quantity: item.quantity || "",
      pricePerQuantity: item.pricePerQuantity || "",
      priority: item.priority || "",
      productLinks: item.productLinks?.length > 0 ? item.productLinks : [""],
    });

    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    const {
      id,
      name,
      category,
      quantity,
      pricePerQuantity,
      priority,
      productLinks,
    } = editFormData;

    if (
      !name ||
      !category ||
      !quantity ||
      !pricePerQuantity ||
      !priority ||
      !productLinks[0]
    ) {
      toast.error("All required fields must be filled");
      return;
    }

    try {
      setEditLoading(true);

      const payload = {
        name,
        description: editFormData.description,
        category,
        quantity: Number(quantity),
        pricePerQuantity: Number(pricePerQuantity),
        priority,
        productLinks,
      };

      await updateNeedItem(id, payload);

      setShowEditModal(false);

      await fetchActiveNeeds();

      alert("Need Item Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update item");
    } finally {
      setEditLoading(false);
    }
  };

const handleDeleteClick = (item) => {
  setSelectedNeedItem(item);
  setShowDeleteModal(true);
};

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteNeedItem(selectedNeedItem.needItemId);

      toast.success("Need Item Deleted Successfully");

      setShowDeleteModal(false);
      setSelectedNeedItem(null);

      await fetchActiveNeeds();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete item");
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchDeliveredNeeds = async () => {
    try {
      setLoadingDeliveredNeeds(true);

      const response = await deliveredItems();

      setDeliveredNeeds(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load delivered items");
    } finally {
      setLoadingDeliveredNeeds(false);
    }
  };
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 bg-light p-4">
          <div className="container" style={{ maxWidth: "1100px" }}>
            <h2 className="fw-bold mb-4">Manage Needs</h2>

            <div className="nav nav-tabs mb-4">
              {["create", "active", "delivered"].map((tab) => (
                <button
                  key={tab}
                  className={`nav-link text-capitalize ${activeTab === tab ? "active fw-bold text-success" : "text-secondary"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} Needs
                </button>
              ))}
            </div>

            <div className="bg-white shadow-sm rounded-4 p-4">
              {activeTab === "create" && (
                <form onSubmit={handleCreateNeedItem}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="fw-semibold">Item Name</label>
                      <input
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="fw-semibold">Quantity</label>
                      <input
                        name="quantity"
                        type="number"
                        className="form-control"
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="fw-semibold">Price per Qty</label>
                      <input
                        name="pricePerQuantity"
                        type="number"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="fw-semibold">Category</label>
                      <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="fw-semibold">Priority</label>
                      <select
                        name="priority"
                        className="form-select"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Priority</option>
                        {priorities.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="fw-semibold">Description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="fw-semibold">Product Link</label>
                      <input
                        className="form-control"
                        placeholder="https://..."
                        value={formData.productLinks[0]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productLinks: [e.target.value],
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-3"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post Requirement →"}
                  </button>
                </form>
              )}

              {activeTab === "active" && (
                <>
                  {loadingNeeds ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : activeNeeds.length === 0 ? (
                    <div className="text-center py-5">
                      <h5 className="text-muted">No Active Needs Found</h5>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Need ID</th>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Fulfilled</th>
                            <th>Reserved</th>
                            <th>Price / Qty</th>
                            <th>Priority</th>
                            <th>Created</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {activeNeeds.map((item) => (
                            <tr key={item.id}>
                              <td>{item.needItemId}</td>

                              <td>
                                <div>
                                  <strong>{item.name}</strong>
                                  <br />
                                  <small className="text-muted">
                                    {item.description}
                                  </small>
                                </div>
                              </td>

                              <td>
                                <span className="badge bg-secondary">
                                  {item.category}
                                </span>
                              </td>

                              <td>{item.quantity}</td>

                              <td>
                                <span className="badge bg-success">
                                  {item.fulfilledQuantity}
                                </span>
                              </td>

                              <td>
                                <span className="badge bg-warning text-dark">
                                  {item.reservedQuantity}
                                </span>
                              </td>

                              <td>₹{item.pricePerQuantity}</td>

                              <td>
                                <span
                                  className={`badge ${
                                    item.priority === "HIGH"
                                      ? "bg-danger"
                                      : item.priority === "MEDIUM"
                                        ? "bg-warning text-dark"
                                        : "bg-info"
                                  }`}
                                >
                                  {item.priority}
                                </span>
                              </td>

                              <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                              </td>

                              <td>
                                <button
                                  className="btn btn-sm btn-outline-primary me-2"
                                  onClick={() => handleEditClick(item)}
                                >
                                  <FaEdit />
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteClick(item)}
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {activeTab === "delivered" && (
                <>
                  {loadingDeliveredNeeds ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : deliveredNeeds.length === 0 ? (
                    <div className="text-center py-5">
                      <h5 className="text-muted">No Delivered Needs Found</h5>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle table-hover">
                        <thead className="table-success">
                          <tr>
                            <th>Need ID</th>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Fulfilled</th>
                            <th>Reserved</th>
                            <th>Price / Qty</th>
                            <th>Priority</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {deliveredNeeds.map((item) => (
                            <tr key={item.id}>
                              <td>{item.needItemId}</td>

                              <td>
                                <div>
                                  <strong>{item.name}</strong>

                                  <br />

                                  <small className="text-muted">
                                    {item.description}
                                  </small>
                                </div>
                              </td>

                              <td>
                                <span className="badge bg-secondary">
                                  {item.category}
                                </span>
                              </td>

                              <td>{item.quantity}</td>

                              <td>
                                <span className="badge bg-success">
                                  {item.fulfilledQuantity}
                                </span>
                              </td>

                              <td>
                                <span className="badge bg-warning text-dark">
                                  {item.reservedQuantity}
                                </span>
                              </td>

                              <td>₹{item.pricePerQuantity}</td>

                              <td>
                                <span
                                  className={`badge ${
                                    item.priority === "HIGH"
                                      ? "bg-danger"
                                      : item.priority === "MEDIUM"
                                        ? "bg-warning text-dark"
                                        : "bg-info"
                                  }`}
                                >
                                  {item.priority}
                                </span>
                              </td>

                              <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                              </td>

                              <td>
                                {new Date(item.updatedAt).toLocaleDateString()}
                              </td>

                              <td>
                                <span className="badge bg-success">
                                  Delivered
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Need Item</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Item Name *</label>
                    <input
                      className="form-control"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Quantity *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Price *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="pricePerQuantity"
                      value={editFormData.pricePerQuantity}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Priority *</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={editFormData.priority}
                      onChange={handleEditChange}
                    >
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Product Link *</label>

                    <input
                      className="form-control"
                      value={editFormData.productLinks[0]}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          productLinks: [e.target.value],
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  disabled={editLoading}
                  onClick={handleSaveEdit}
                >
                  {editLoading ? "Saving..." : "Save Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger">Delete Need Item</h5>
              </div>

              <div className="modal-body">
                <p className="mb-2">Are you sure you want to delete:</p>

                <div className="p-3 bg-light rounded">
                  <strong>{selectedNeedItem?.name}</strong>
                </div>

                <small className="text-muted">
                  This action cannot be undone.
                </small>
              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  disabled={deleteLoading}
                  onClick={handleConfirmDelete}
                >
                  {deleteLoading ? "Deleting..." : "Delete Item"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default OrphanageNeedItemPage;
