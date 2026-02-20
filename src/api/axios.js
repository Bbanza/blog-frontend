import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchPosts = () => API.get('/api/posts');
export const createPost = (data) => API.post('/api/posts', data);

// Add token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
