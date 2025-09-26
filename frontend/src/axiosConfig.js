import axios from "axios";

const Instance = axios.create({
  baseURL: "https://evangadi-forum-dlex.onrender.com/api",
  // baseURL: "http://localhost:5500/api",
});

export default Instance;
