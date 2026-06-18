import api from "./axiosConfig";

export const createNeedItem = async (data) => {
  const response = await api.post("/orphanage/needItem/create-item", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getActiveNeeds = async () => {
  const response = await api.get("/orphanage/needItem/activeNeeds", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const updateNeedItem = async (id, data) => {
  const response = await api.put(`/orphanage/needItem/updateItem/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const deleteNeedItem = async (id) => {
  const response = await api.delete(`/orphanage/needItem/deleteItem/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const deliveredItems = async () => {
  const response = await api.get("/orphanage/needItem/deliveredItems", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

