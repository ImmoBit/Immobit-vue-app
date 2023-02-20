import apiRequests from "../../apiRequests/searchRequests";

export default {
  search({ commit }, searchArr) {
    var searchStr = "";
    searchStr = searchArr.join("&");

    commit("SET_SEARCH", searchStr);
  },
  filterSearch({ commit }, filterArr) {
    var filterStr = "&";
    filterStr += filterArr.join("&");
    commit("SET_Fil_SEARCH", filterStr);
  },
  async getHouses({ commit }, searchStr) {
    var data = await apiRequests.getHousesReq(searchStr);
    commit("SET_HOUSES", data);
  },
  async getHouse({ commit }, id) {
    var data = await apiRequests.getHouse(id);
    console.log(data);
    commit("SET_HOUSE", data);
  }
};
