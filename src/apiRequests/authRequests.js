import axios from "axios";
axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/auth`;

export default {
  signIn(authData) {
    return axios
      .post("/users/token/login/", {
        email: authData.email,
        password: authData.password
      })
      .then(res => {
        //console.log("TokenGet", res);
        return res;
      })
      .catch(error => {
        //console.log(error.response);
        return error;
      });
  },
  async getUserId(token) {
    return await axios.get("/users/users/me/", {
        headers: {
          Authorization: token
        }
      })
  },
  updateUserInfo(token, formData) {
    return axios
      .put("/users/users/me/", formData, {
        headers: {
          Authorization: token
        }
      } )
  },
  
  
  async signUp(formData) {
    await axios.post("/users/users/", formData)
  }
};
