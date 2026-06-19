
import api from "./axiosConfig"

export const createSlot = async(data)=>{
    const response = await api.post("/orphanage/slot/create", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}

export const getOrpSlots = async()=>{
  const response = await api.get("/orphanage/slot/allSlots", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
}

export const deleteSlot = async(id)=>{
  console.log(id);
  
  const response = await api.delete(`/orphanage/slot/deleteSlot/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}


export const getSlotBookings = async()=>{
    const response = await api.get("/orphanage/slot/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}

export const confirmBooking = async (bookId) => {
  const response = await api.patch(
    `/orphanage/slot/confirm/${bookId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
};

export const rejectBooking=async(bookId, data)=>{
    const response = await api.patch(`/orphanage/slot/reject/${bookId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}

export const getAllApprovedVisits = async()=>{
  const response = await api.get("/orphanage/slot/approvals", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
}

export const markAsCompleted = async(id)=>{
  const response = await api.patch(
    `/orphanage/slot/completed/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
}

export const markAsNotVisited=async(id)=>{
  const response = await api.patch(
    `/orphanage/slot/notVisited/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
}