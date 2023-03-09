export default {
  SET_SEARCH(state, data) {
    state.searchQuery = data;
  },
  SET_FILTER_SEARCH(state, data) {
    state.filterQuery = data;
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
