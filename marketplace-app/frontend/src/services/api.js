import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  login: (credentials) => axios.post(`${API_URL}/users/login`, credentials),
  registerAdmin: (data) => axios.post(`${API_URL}/users/admin/register`, data),
  registerUser: (data) => axios.post(`${API_URL}/users/register`, data),

  // Sales endpoints
  createSale: (data) => axios.post(`${API_URL}/sales`, data),
  getUserSales: (userId) => axios.get(`${API_URL}/sales/user/${userId}`),
  getAllSales: () => axios.get(`${API_URL}/sales/all`),
};