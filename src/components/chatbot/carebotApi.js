import axios from "axios";

const API = "https://carebridgechatbot1.onrender.com/api/chat";

export const askCareBot = async (message,history) => {
  const response = await axios.post(API, {
    message,
    history
  });

  return response.data.answer;
};
