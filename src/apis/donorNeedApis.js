import api from "./axiosConfig";

export const getAllNeeds = () => {
    const response = api.get("/donor/allNeeds",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
    return response;
}