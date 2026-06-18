
import api from "./axiosConfig"

export const createSlot = async(data)=>{
    const response = await api.post("/orphanage/slot/create", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}


export const getPendingSlotBookings = async()=>{
    const response = await api.get("/orphanage/slot/pending", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}

export const confirmBooking=async(bookId)=>{
    const response = await api.patch(`/orphanage/slot/confirm/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}

export const rejectBooking=async(bookId, data)=>{
    const response = await api.patch(`/orphanage/slot/reject/${bookId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
}