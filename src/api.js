import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5229/api', // your .NET backend URL
  withCredentials: true
});

/*API.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});*/

export default API;