import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7080";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Products
  getProducts: async (searchQuery = "") => {
    const response = await apiClient.get(
      `/products?q=${encodeURIComponent(searchQuery)}`
    );
    return response.data;
  },

  // Diseases
  getDiseases: async (searchQuery = "") => {
    const response = await apiClient.get(
      `/diseases?q=${encodeURIComponent(searchQuery)}`
    );
    return response.data;
  },

  // Unified Search
  search: async (searchQuery) => {
    const response = await apiClient.get(
      `/search?q=${encodeURIComponent(searchQuery)}`
    );
    return response.data;
  },

  // AI Consultation
  consultAI: async (query, lang = "en") => {
    const response = await apiClient.post("/ai/consult", { query, lang });
    return response.data;
  },

  // Auth operations
  login: async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  },

  register: async (details) => {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      details
    );
    return response.data;
  },

  contact: async (contactInfo) => {
    const response = await axios.post(`${API_BASE_URL}/contact`, contactInfo);
    return response.data;
  },
};

export default api;
