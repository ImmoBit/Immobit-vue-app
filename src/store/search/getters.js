export default {
  PAGE_COUNT(state) {
    return Math.ceil(state.housesCount / state.pageSize)
  },
  SEARCH_COMP(state) {
    return `p=${state.page}` 
            + state.search 
            + state.filter;
  },
  GET_HOUSES(state) {
    return state.houses;
  },
};
