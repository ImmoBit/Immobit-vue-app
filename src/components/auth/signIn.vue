<template>
  <v-card class="pa-2">
    <v-card-text>
      <div class="d-flex justify-end">
        <v-btn @click="close" icon><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <p class="red--text" v-if="isError">Veuillez corrigez l'email ou le mot de pass.</p>
      <validation-observer>
        <form ref="myForm">
          <validation-provider rules="required|email" name="Email" v-slot="{ errors }">
            <v-text-field
              v-model="email"
              class="inputs"
              @focus="errorMessage = null"
              label="Email"
              type="text"
            />
            <span class="red--text"> {{ errors[0] }}</span>
          </validation-provider>
          <validation-provider
            rules="required|alphaNum"
            name="Password"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="password"
              @focus="errorMessage = null"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              class="inputs"
              label="Password"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            />
            <span class="red--text"> {{ errors[0] }}</span>
          </validation-provider>

          <v-btn
            class="btn"
            :disabled="loading"
            :loading="loading"
            raised
            color="primary"
            @click="Submit(validate)"
            >Soumettre</v-btn
          >
        </form>
      </validation-observer>
    </v-card-text>
    <!--<v-facebook-login class="mx-auto" app-id="453110369395561" @login="onLogin">
      ></v-facebook-login>-->
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    show1: false,
    isError: false,
    loading: false
  }),
  methods: {
    async Submit() {
      this.loading = true
      const formData = {
        email: this.email,
        password: this.password
      };
      await this.$store.dispatch("signIn", formData);
      this.isError = this.$store.state.auth.error.situation;
      this.loading = false
    },
    close() {
      this.$emit("dialog-false");
    },
    onLogin(res) {
      console.log(res.authResponse);
      this.$store.dispatch("socialLogin", res.authResponse.accessToken);
    }
  }
};
</script>

<style></style>
