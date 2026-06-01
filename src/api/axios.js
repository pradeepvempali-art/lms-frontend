import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lms-backend-t9z3.onrender.com',
});

export default api;