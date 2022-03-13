import authRequests from "../../apiRequests/authRequests";
import socialAuthReqs from "../../apiRequests/socialAuthReqs";
import searchRequests from "../../apiRequests/searchRequests";

export default {
  async getUserId({ commit }, token) {
    try {
      const res = await authRequests.getUserId(token);
      await commit("setUserId", res.data.id);
      await localStorage.setItem("token", token);
      await localStorage.setItem("userId", res.data.id);
    } catch (error) {
      console.log(error);
    }
  },
  async signIn({ commit, dispatch }, authData) {
    var res = await authRequests.signIn(authData);
    try {
      // Good request
      if (res.status == 200) {
        await commit("authUser", "token " + res.data.auth_token);
        await dispatch("getUserId", "token " + res.data.auth_token);
      }
      // Bad request
      else if (res.response.status == 400) {
        console.log(res.status);
        const err = {
          situation: true,
          message: res.response.data.non_field_errors[0]
        };
        await commit("setError", err);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getUserHouses({ state, commit }) {
    const res = await searchRequests.getUserHouses(state.userId);
    await commit("setUserHouses", res.data);
  },
  async signUp({ dispatch, commit }, formData) {
    var res = await authRequests.signUp(formData);
    if (res.response.status == 400) {
      var formErrors = {
        email: [""],
        username: [""],
        password: [""],
        phone: [""]
      };
      console.log(res.response);
      var keys = Object.keys(res.response.data);
      for (let key of keys) {
        formErrors[key] = res.response.data[key];
      }
      console.log(formErrors);
      commit("setFormErrors", formErrors);
    }

    dispatch("signIn", {
      email: formData.email,
      password: formData.password
    });
  },
  async socialLogin({ commit, dispatch, state }, access_token) {
    var res = await socialAuthReqs.socialSignIn(access_token);
    commit("authUser", "Bearer " + res.data.access_token);
    dispatch("getUidAxios", state.token);
    localStorage.setItem("reToken", res.data.refresh_token);
  },
  refreshLogin({ commit }) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      commit("authUser", token);
      commit("setUserId", userId);
    }
  },
  logout({ commit }) {
    commit("authUser", null);
    commit("setUserId", null);
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
  }
};
