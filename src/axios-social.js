import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/auth`
});

export default instance;
