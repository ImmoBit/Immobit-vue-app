export default {
  PAGE_COUNT(state) {
    return Math.ceil(state.housesCount / state.pageSize)
  },
  SEARCH_QUERY_WITH_PAGE(state) {
    return `p=${state.page}${'&'+state.searchQuery}${'&'+state.filterQuery}`
  },
  GET_HOUSES(state) {
    return state.houses;
  },
};
