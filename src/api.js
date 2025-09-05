import axios from 'axios';

const API = axios.create({
  baseURL: 'https://aspnetcorewebapi-container-app.agreeablepond-e5c66174.canadaeast.azurecontainerapps.io/api', // your .NET backend URL
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