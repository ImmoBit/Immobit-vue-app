import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state: {
    search: "",
    filter: "",
    houses: [],
    house: null,
    housesCount: 0,
    pageSize: 10,
    page: 1
  },
  mutations,
  getters,
  actions
};
