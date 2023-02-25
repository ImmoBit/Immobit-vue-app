export default {
  SET_SEARCH(state, data) {
    state.search = data;
  },
  SET_Fil_SEARCH(state, data) {
    state.filter = data;
  },
  SET_HOUSES(state, data) {
    state.houses = data;
  },
  SET_HOUSE(state, data) {
    state.house = data;
  },
  SET_HOUSESCOUNT(state, data) {
    state.housesCount = data;
  },
  SET_PAGE(state, data) {
    state.page = data;
  }
};
