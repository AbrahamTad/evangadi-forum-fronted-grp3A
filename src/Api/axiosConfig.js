import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api",
  baseURL: "https://evandagi-forum-grp3a-be.onrender.com/",
});

export default axiosBase;
//*** */
