// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= Blog Endpoints =================

export const fetchPosts = () => API.get("/api/posts");
export const fetchPostById = (id) => API.get(`/api/posts/${id}`);
export const createPost = (data) => API.post("/api/posts", data);
export const updatePost = (id, data) => API.put(`/api/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);


// ================= Auth Endpoints =================

export const signup = (userData) => API.post("/api/auth/signup", userData);
export const login = (credentials) => API.post("/api/auth/login", credentials);
export const getCurrentUser = () => API.get("/api/auth/me");

export default API;