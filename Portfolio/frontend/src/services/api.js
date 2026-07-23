import axios from 'axios';

// Create an axios instance for the frontend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this when deployed
});

export default api;
