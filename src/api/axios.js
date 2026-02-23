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

// Blog Endpoints
export const fetchPosts = () => API.get("/posts");
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const fetchMyPosts = () => API.get("/posts/my");
export const createPost = (data) => API.post("/posts", data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Auth Endpoints
export const signup = (userData) => API.post("/auth/signup", userData);
export const login = (credentials) => API.post("/auth/login", credentials);
export const getCurrentUser = () => API.get("/auth/me");

export default API;

// // src/api/axios.js
// import axios from "axios";

// // ================= Axios Instance =================
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// // ================= Token Interceptor =================
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); 
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // ================= Blog Endpoints =================

// // Get all blog posts
// export const fetchPosts = () => API.get("/api/posts");

// // Get single post by ID
// export const fetchPostById = (id) => API.get(`/api/posts/${id}`);

// // Get posts created by the currently logged-in user
// export const fetchMyPosts = () => API.get("/api/posts/my");

// // Create a new blog post (with optional image)
// export const createPost = (data) => API.post("/api/posts", data);

// // Update a post by ID (with optional image)
// export const updatePost = (id, data) => API.put(`/api/posts/${id}`, data);

// // Delete a post by ID
// export const deletePost = (id) => API.delete(`/api/posts/${id}`);

// // ================= Auth Endpoints =================

// // Sign up a new user
// export const signup = (userData) => API.post("/api/auth/signup", userData);

// // Login user
// export const login = (credentials) => API.post("/api/auth/login", credentials);

// // Get currently logged-in user info
// export const getCurrentUser = () => API.get("/api/auth/me");

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   // withCredentials: true,
// });

// // Add token automatically to every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Blog endpoints
// export const fetchPosts = () => API.get("/api/posts");
// export const createPost = (data) => API.post("/api/posts", data);

// export default API;

// import api from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// export const fetchPosts = () => axios.get('/api/posts');
// export const createPost = (data) => axios.post('/api/posts', data);

// // Add token automatically to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default axios;
