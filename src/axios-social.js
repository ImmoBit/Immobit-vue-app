import axios from "axios";

const instance = axios.create({
  baseURL: "http://34.248.32.173:8080/auth/"
});

export default instance;
