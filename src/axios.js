import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://deliorder-api.onrender.com',
 // baseURL:   "http://localhost:9000",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;