import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:8000', // api url local
  baseURL: 'https://darija-back.onrender.com', // api url online
});

export default API;
