import axios from "axios";

const Instance = axios.create({
  baseURL: "https://evangadi-forum-1-4p4r.onrender.com/api",
  // baseURL: "http://localhost:5500/api",
});

export default Instance;
