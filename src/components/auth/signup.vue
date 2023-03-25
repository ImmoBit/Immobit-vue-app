<template>
  <div class="signUp">
    <v-card>
      <v-card-text>
        <div class="d-flex justify-end">
          <v-btn v-if="isDialog" @click="close" icon><v-icon>mdi-close</v-icon></v-btn>
        </div>
       <!--<v-facebook-login
          class="mx-auto"
          app-id="453110369395561"
          @login="getFbData"
        ></v-facebook-login>--> 
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider rules="required|email" name="Email" v-slot="{ errors }">
              <v-text-field
                v-model.trim="user.email"
                @keyup="event => event.target.value = event.target.value.toLowerCase()"
                class="inputs"
                label="Email"
                type="text"
              />
              <span class="red--text"> {{ errors[0] }}</span>
              <span class="red--text">{{ error.email[0] }}</span>
            </validation-provider>
            <validation-observer v-if="!userInfoToEdit">
              <div class="d-flex">
                <validation-provider
                  class="mr-5"
                  rules="required|password|confirmed:confirm"
                  name="Password"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="user.password"
                    class="inputs"
                    label="Mot de pass"
                    type="password"
                  />
                  <span class="red--text"> {{ errors[0] }}</span>
                  <span class="red--text">{{ error.password[0] }}</span>
                </validation-provider>
                <validation-provider vid="confirm" v-slot="{ errors }">
                  <v-text-field
                    v-model="user.re_password"
                    class="inputs"
                    label="Confirmer"
                    type="password"
                  />

                  <span class="red--text"> {{ errors[0] }}</span>
                </validation-provider>
              </div>
            </validation-observer>

            <validation-provider
              rules="required|phone"
              name="Phone number"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model.trim="user.phone"
                class="inputs"
                label="N° Téléphone"
                type="text"
              />
              <span class="red--text"> {{ errors[0] }}</span>
              <span class="red--text">{{ error.phone[0] }}</span>
            </validation-provider>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn v-if="userInfoToEdit"
                class="btn ma-4"
                :disabled="invalid"
                :loading="loading"
                raised
                color="primary"
                @click="updateUser"
                >Modifer</v-btn>
              <v-btn v-else
                class="btn ma-4"
                :disabled="invalid"
                :loading="loading"
                raised
                color="primary"
                @click="submit"
              >Créer un compte</v-btn>
            </v-row>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  props:{
   userInfoToEdit: Object
  },
  computed:{
    isDialog(){
      if(this.$route.path.includes('create-property')){
        return false
      } else {
        return true
      }
    }
  },
  data: () => ({
    user: {
      email: "",
      password: "",
      re_password: "",
      phone: ""
    },
    show1: false,
    show2: false,
    error: {
      email: [""],
      password: [""],
      phone: [""]
    },
    loading: false,
  }),
  created(){
    if(this.userInfoToEdit){
      this.user = this.userInfoToEdit
    }
  },
  methods: {
    async submit() {
      this.loading = true
      await this.$store.dispatch("signUp", this.user);
      this.error = this.$store.getters.getFormErrors;
      //console.log(formData);
      this.loading = false
    },
    async updateUser() {
      this.loading = true
      await this.$store.dispatch('updateUser', this.user)
      this.error = this.$store.getters.getFormErrors;
      //console.log(formData);
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
