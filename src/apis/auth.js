import api from "./axiosConfig";

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await api.post("/auth/verify", data);
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await api.post(
    `/auth/resend?email=${encodeURIComponent(email)}`,
  );
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post(
    `/auth/forgot-password?email=${encodeURIComponent(email)}`,
  );
  return response.data;
};

export const verifyForgotPasswordOtp = async (data) => {
  const response = await api.post("/auth/verify-forgot-otp", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);

  return response.data;
};