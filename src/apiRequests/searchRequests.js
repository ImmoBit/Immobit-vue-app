import axios from "axios";
axios.defaults.baseURL = "http://3.249.239.202:8080/api";
export default {
  getHousesReq(searchStr) {
    return axios.get("/houses-list/?" + searchStr).then(res => {
      console.log(res);
      return res.data;
    });
  },
  getHouse(id) {
    return axios.get("/house-details/" + id).then(res => {
      console.log(res);
      return res.data;
    });
  },
  getUserHouses(userId) {
    return axios.get("/houses-list/" + userId).then(res => {
      console.log(res.data);
      return res;
    });
  }
};
