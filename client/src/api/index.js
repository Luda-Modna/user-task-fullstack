import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000/api' });

// if js-object => Content-Type: Application/json
//    data => req.body

// if FormData => Content-Type: multipart/form-data
//    data (text) => (multer) => req.body
//    data (file) => (multer) => req.file
export const createUser = data => axiosInstance.post('/users', data);

export const getUsers = () => axiosInstance.get('/users');

export const deleteUser = id => axiosInstance.delete(`/users/${id}`);

export const getUserTasks = userId =>
  axiosInstance.get(`/users/${userId}/tasks`);

export const createUserTasks = (userId, data) =>
  axiosInstance.post(`/users/${userId}/tasks`, data);

export const deleteUserTask = (userId, taskId) =>
  axiosInstance.delete(`/users/${userId}/tasks/${taskId}`);
