import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true, // Important for cookies/sessions
});

console.log(process.env.REACT_APP_API_URL);

export default instance;