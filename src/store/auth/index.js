import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state: {
    token: "",
    userId: null,
    user: {
      id: null,
      email: "",
      phone: ""
    },
    error: {
      situation: false,
      message: ""
    },
    formErrors: [],
    userHouses: []
  },
  mutations,
  getters,
  actions
};
