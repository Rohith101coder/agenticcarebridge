import api from "./axiosConfig";

export const loadOrphanageDashboard = async () => {
  const response = await api.get("/orphanage/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const createOrphanageProfile = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const token = localStorage.getItem("token");
  const response = await api.post("/orphanage/create-profile", formData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
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

export const verifyOrphanageOtp = async (data) => {
  const response = await api.post("/orphanage/verifyOrpOTP", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const resendOrphanageOtp = async (data) => {
  console.log(data.orpEmail);

  const response = await api.post("/orphanage/resendOrpOTP", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // console.log("data");

  return response.data;
};

export const getOrphanageProfile = async () => {
  const response = await api.get("/orphanage/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const updateProfileApi = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await api.put("/orphanage/update-profile", formData, {
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