import api from "./axiosConfig";

export const getAllPublicNeeds = async () => {
  const response = await api.get("/api/needs");
  return response.data;
};

export const getNeedById = async (id) => {
  const response = await api.get(`/api/needs/${id}`);
  return response.data;
};

export const getAllPublicOrphanages = async () => {
  const response = await api.get("/api/orphanages");
  return response.data;
};

export const getOrphanageById = async (id) => {
  const response = await api.get(`/api/orphanages/${id}`);
  return response.data;
};
