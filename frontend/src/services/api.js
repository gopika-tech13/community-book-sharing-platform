import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// AUTH
// ========================================

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// ========================================
// BOOKS
// ========================================

export const getBooks = () => {
  return api.get("/books");
};

export const addBook = (data) => {
  return api.post("/books/add", data);
};

// ========================================
// REQUESTS
// ========================================

export const getRequests = () => {
  return api.get("/requests");
};

export const sendRequest = (data) => {
  return api.post("/requests/send", data);
};

// ========================================
// ACCEPT REQUEST
// ========================================

export const acceptRequest = (requestId) => {
  return api.put(`/exchange/accept/${requestId}`);
};

// ========================================
// REJECT REQUEST
// ========================================

export const rejectRequest = (requestId) => {
  return api.put(`/exchange/reject/${requestId}`);
};

// ========================================
// GET NOTIFICATIONS
// ========================================

export const getNotifications = async (userId) => {
  try {
    const response = await api.get(
      `/notifications/${userId}`
    );

    console.log(
      "🔥 NOTIFICATION API RESPONSE:",
      response.data
    );

    return response.data.notifications || [];
  } catch (error) {
    console.error(
      "❌ Failed to fetch notifications:",
      error
    );

    throw error;
  }
};

// ========================================
// CLEAR ALL NOTIFICATIONS
// ========================================

export const clearNotifications = (userId) => {
  return api.delete(`/notifications/user/${userId}`);
};

// ========================================
// DEFAULT API
// ========================================

export default api;