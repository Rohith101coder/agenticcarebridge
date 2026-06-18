import api from "./axiosConfig";

export const getdonorDashBoardDetails = async () => {
  const response = await api.get("/donor/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const createDonorProfile = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await api.post("/donor/create-profile", formData, {
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
