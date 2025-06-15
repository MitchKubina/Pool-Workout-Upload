import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // backend runs on 5000
});
