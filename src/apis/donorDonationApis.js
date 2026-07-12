import api from "./axiosConfig";


const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
console.log("Current Token:", authHeader());
export const getPendingDonations = async () => {
  const response = await api.get("/donor/pending-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getCompletedDonations = async () => {
  const response = await api.get("/donor/completed-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getDeliveredDonations = async () => {
  const response = await api.get("/donor/delivered-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getCancelledDonations = async () => {
  const response = await api.get("/donor/cancelled-donations", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const deletePendingDonation = async (id) => {
  const response = await api.delete(`/donor/delete-pending-donation/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const updateDonation = async (donationId, data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await api.patch(`/donor/update/${donationId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    transformRequest: [
      (data, headers) => {
        delete headers["Content-Type"];
        return data;
      },
    ],
  });

  return response.data;
};
