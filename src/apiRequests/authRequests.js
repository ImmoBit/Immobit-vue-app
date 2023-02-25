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
        console.log(error.response);
        return error;
      });
  },
  getUserId(token) {
    return axios
      .get("/users/users/me/", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        //console.log("getId", res);
        return res;
      });
  },
  signUp(formData) {
    return axios
      .post("/users/users/", formData)
      .then(res => {
        //console.log("CreatedUser", res);
        res
      })
      .catch(error => {
        return error;
      });
  }
};
