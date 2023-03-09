import apiRequests from "../../apiRequests/searchRequests";

export default {
  async getHouses({ commit }, searchStr) {
    var data = await apiRequests.getHousesReq(searchStr);
    commit("SET_HOUSES", data.results);
    commit("SET_HOUSESCOUNT", data.count);
  },
  async getHouse({ commit }, id) {
    var data = await apiRequests.getHouse(id);
    console.log(data);
    commit("SET_HOUSE", data);
  }
};
