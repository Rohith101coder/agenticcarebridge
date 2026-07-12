import api from "./axiosConfig";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getPendingBookings = async () => {
  const response = await api.get("/donor/slots/pending-bookings", {
    headers: authHeader(),
  });

  return response.data;
};
console.log(authHeader());
export const getConfirmedBookings = async () => {
  const response = await api.get("/donor/slots/confirmed-bookings", {
    headers: authHeader(),
  });

  return response.data;
};

export const getCancelledBookings = async () => {
  const response = await api.get("/donor/slots/cancelled-bookings", {
    headers: authHeader(),
  });

  return response.data;
};

export const getRejectedBookings = async () => {
  const response = await api.get("/donor/slots/rejected-bookings", {
    headers: authHeader(),
  });

  return response.data;
};

export const getNotVisitedBookings = async () => {
  const response = await api.get("/donor/slots/notvisited-bookings", {
    headers: authHeader(),
  });

  return response.data;
};

export const getCompletedBookings = async () => {
  const response = await api.get("/donor/slots/completed-bookings", {
    headers: authHeader(),
  });

  return response.data;
};
