import axios from "axios";

const mainURL = axios.create({
  // baseURL: "http://localhost:5500"
  baseURL: "https://yasmina-backend.vercel.app/",
});

export default mainURL;
