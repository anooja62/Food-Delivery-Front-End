import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://deliorder-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;