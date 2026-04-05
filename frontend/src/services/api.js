import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getAll: () => api.get('/users/users'),
  getById: (id) => api.get(`/users/users/${id}`),
  create: (user) => api.post('/users/users', user),
  update: (id, user) => api.put(`/users/users/${id}`, user),
  delete: (id) => api.delete(`/users/users/${id}`),
};

export const productService = {
  getAll: () => api.get('/products/products'),
  getById: (id) => api.get(`/products/products/${id}`),
  create: (product) => api.post('/products/products', product),
  update: (id, product) => api.put(`/products/products/${id}`, product),
  delete: (id) => api.delete(`/products/products/${id}`),
};

export const orderService = {
  getAll: () => api.get('/orders/orders'),
  getById: (id) => api.get(`/orders/orders/${id}`),
  getByUserId: (userId) => api.get(`/orders/orders/user/${userId}`),
  create: (order) => api.post('/orders/orders', order),
  update: (id, order) => api.put(`/orders/orders/${id}`, order),
  delete: (id) => api.delete(`/orders/orders/${id}`),
};

export default api;

