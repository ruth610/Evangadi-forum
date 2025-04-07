import axios from 'axios';

const Instance = axios.create({
  baseURL: "http://localhost:5500/api",
  timeout: 5000
});

export default Instance;

