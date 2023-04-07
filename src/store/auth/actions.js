import authRequests from "../../apiRequests/authRequests";
import socialAuthReqs from "../../apiRequests/socialAuthReqs";
import searchRequests from "../../apiRequests/searchRequests";

export default {
  async setUserLocal({ commit }, token) {
    try {
      const res = await authRequests.getUser(token);
      console.log(res.data);
      commit("setUser", res.data);
      commit("setUserId", res.data.id);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.id);
    } catch (error) {
      console.log(error);
    }
  },
  async signIn({ commit, dispatch }, authData) {
    var res = await authRequests.signIn(authData);
    try {
      // Good request
      if (res.status == 200) {
        commit("authUser", "token " + res.data.auth_token);
        await dispatch("setUserLocal", "token " + res.data.auth_token);
      }
      // Bad request
      else if (res.response.status == 400) {
        console.log(res.status);
        const err = {
          situation: true,
          message: res.response.data.non_field_errors[0]
        };
        commit("setError", err);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getUserHouses({ state, commit }) {
    const res = await searchRequests.getUserHouses(state.userId);
    commit("setUserHouses", res.data);
  },
  async signUp({ dispatch }, formData) {
    try {
      await authRequests.signUp(formData)
    } catch (error) {
      console.log("error", error);
      dispatch('showErrors', error)
    }
    dispatch("signIn", {
      email: formData.email,
      password: formData.password
    });
  },
  async updateUser({ dispatch, state }, formData) {
    try {
      await authRequests.updateUserInfo(state.token, formData)
    } catch (error) {
      dispatch('showErrors', error)
    }
  },
  showErrors({ commit }, error){
    if (error.response.status == 400) {
      var formErrors = {
        email: [""],
        password: [""],
        phone: [""]
      };
      var keys = Object.keys(error.response.data);
      for (let key of keys) {
        formErrors[key] = 
        error.response.data[key][0].includes('user with this email') ? ['Un utilisateur avec cet email existe déjà'] 
        : error.response.data[key][0].includes('password is too short') ? ['Ce mot de passe est trop court. Il doit contenir au moins 8 caractères.']
        : error.response.data[key][0].includes('password is too similar') ? ['le mot de passe est similaire au email'] 
        : error.response.data[key]
      }
      commit("setFormErrors", formErrors);
    }
  },
  async socialLogin({ commit, dispatch, state }, access_token) {
    var res = await socialAuthReqs.socialSignIn(access_token);
    commit("authUser", "Bearer " + res.data.access_token);
    dispatch("getUidAxios", state.token);
    localStorage.setItem("reToken", res.data.refresh_token);
  },
  async refreshLogin({ commit }) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      const { data  } = await authRequests.getUser(token)
      commit('setUser', data)
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
