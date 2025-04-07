import axios from 'axios';

const Instance = axios.create({
  baseURL: "https://evangadi-backend-xlcr.onrender.com/api",
  timeout: 5000
});

export default Instance;

