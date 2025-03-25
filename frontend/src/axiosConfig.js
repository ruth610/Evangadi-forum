import axios from 'axios';

const Instance = axios.create({
  baseURL: "https://evangadi-forum-backend-i25l.onrender.com/api",
});

export default Instance;

