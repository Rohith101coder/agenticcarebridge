import api from "./axiosConfig";
import axios from "axios";

export const getPendingDonations = async () => {
  const response = await api.get("/orphanage/pending-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getDeliveredDonations = async () => {
  const response = await api.get("/orphanage/delivered-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getCancelledDonations = async () => {
  const response = await api.get("/orphanage/cancelled-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const markDonationDelivered = async (id, formData) => {
  const response = await api.post(`/orphanage/delivered/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};