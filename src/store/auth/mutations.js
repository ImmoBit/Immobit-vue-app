export default {
  authUser(state, token) {
    state.token = token;
  },
  setUserId(state, id) {
    state.userId = id;
  },
  setUser(state, user) {
    state.user = user;
  },
  setError(state, error) {
    state.error = error;
  },
  setFormErrors(state, formErrors) {
    state.formErrors = formErrors;
  },
  setUserHouses(state, data) {
    state.userHouses = data;
  }
};
