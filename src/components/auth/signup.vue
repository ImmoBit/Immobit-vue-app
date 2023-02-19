<template>
  <div class="signUp">
    <v-card>
      <v-card-text>
        <div class="d-flex justify-end">
          <v-btn @click="close" icon><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-facebook-login
          class="mx-auto"
          app-id="453110369395561"
          @login="getFbData"
        ></v-facebook-login>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <div class="d-flex">
              <validation-provider
                class="mr-5"
                v-slot="{ errors }"
                name="First name"
                rules="required|alpha"
              >
                <v-text-field
                  v-model="fname"
                  class="inputs"
                  label="First name"
                  type="text"
                  @input="fname = fname.replace(/\s+/g, '')"
                  @blur="fname = fname.replace(/\s+/g, '')"
                />
                <span> {{ errors[0] }}</span>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Last name"
                rules="required|alpha"
              >
                <v-text-field
                  v-model="lname"
                  class="inputs"
                  label="Last name"
                  type="text"
                  @input="lname = lname.replace(/\s+/g, '')"
                  @blur="lname = lname.replace(/\s+/g, '')"
                />
                <span> {{ errors[0] }}</span>
              </validation-provider>
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="Username"
              rules="required|alphaNum"
            >
              <v-text-field
                v-model="username"
                class="inputs"
                id="username"
                label="Username"
                type="text"
                @input="username = username.replace(/\s+/g, '')"
                @blur="username = username.replace(/\s+/g, '')"
              />
              <span> {{ errors[0] }}</span>
              <span>{{ error.username[0] }}</span>
            </validation-provider>
            <validation-provider rules="email" name="Email" v-slot="{ errors }">
              <v-text-field
                v-model="email"
                class="inputs"
                label="Email"
                type="text"
                @input="email = email.replace(/\s+/g, '')"
                @blur="email = email.replace(/\s+/g, '')"
              />
              <span> {{ errors[0] }}</span>
              <span>{{ error.email[0] }}</span>
            </validation-provider>
            <validation-observer>
              <div class="d-flex">
                <validation-provider
                  class="mr-5"
                  rules="alphaNum|confirmed:confirm"
                  name="Password"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="password"
                    class="inputs"
                    label="Password"
                    type="password"
                    @input="password = password.replace(/\s+/g, '')"
                    @blur="password = password.replace(/\s+/g, '')"
                  />
                  <span> {{ errors[0] }}</span>
                  <span>{{ error.password[0] }}</span>
                </validation-provider>
                <validation-provider vid="confirm" v-slot="{ errors }">
                  <v-text-field
                    v-model="passwordconf"
                    class="inputs"
                    label="Confirm"
                    type="password"
                    @input="passwordconf = passwordconf.replace(/\s+/g, '')"
                    @blur="passwordconf = passwordconf.replace(/\s+/g, '')"
                  />

                  <span> {{ errors[0] }}</span>
                </validation-provider>
              </div>
            </validation-observer>

            <validation-provider
              rules="numeric"
              name="Phone number"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="phoneNum"
                class="inputs"
                label="Phone N°"
                type="text"
                @input="phoneNum = phoneNum.replace(/\s+/g, '')"
                @blur="phoneNum = phoneNum.replace(/\s+/g, '')"
              />
              <span> {{ errors[0] }}</span>
              <span>{{ error.phone[0] }}</span>
            </validation-provider>

            <v-btn
              class="btn"
              :disabled="invalid"
              :loading="loading"
              raised
              color="#CFD8DC"
              @click="Submit"
              >Submit</v-btn
            >
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    passwordconf: "",
    phoneNum: "",
    show1: false,
    show2: false,
    error: {
      email: [""],
      username: [""],
      password: [""],
      phone: [""]
    },
    loading: false
  }),
  methods: {
    async Submit() {
      this.loading = true
      const formData = {
        username: this.username,
        first_name: this.fname,
        last_name: this.lname,
        email: this.email,
        password: this.password,
        re_password: this.passwordconf,
        phone: this.phoneNum
      };
      await this.$store.dispatch("signUp", formData);
      this.error = this.$store.getters.getFormErrors;
      console.log(formData);
      this.loading = false
    },
    close() {
      this.$emit("dialog-false");
    },
    getFbData(res) {
      console.log(res.authResponse);
      this.$store.dispatch("socialLogin", res.authResponse.accessToken);
    }
  }
};
</script>

<style></style>
