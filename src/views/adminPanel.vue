<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col>
          <p ref="title" class="display-1 text--secondary">Annonces publiée</p>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="cyan"
          ></v-progress-linear>          
          <v-sheet class="d-flex user-houses pb-6">
            <card-admin v-for="(house, i) in houses" :key="i" class="mr-5" :house="house"> </card-admin>
          </v-sheet>
        </v-col>
        <v-col>
          <v-dialog persistent max-width="350" v-model="signDialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="blue" text v-bind="attrs" v-on="on">
                Modifier votre compte
              </v-btn>
            </template>
            <sign-up
              v-if="signDialog"
              @dialog-false="signDialog = false"
              :userInfoToEdit="userInfo"
            ></sign-up>
          </v-dialog>       
          </v-col>
      </v-row>
      <v-row>
        <v-col :cols="$vuetify.breakpoint.xs ? 12 : 10">
          <house-form></house-form>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import cardAdmin from "../components/cards/cardAdmin";
import houseForm from "../components/houseForm";
import signUp from "../components/auth/signup";
import authRequests from '../apiRequests/authRequests'

export default {
  components: {
    "card-admin": cardAdmin,
    "house-form": houseForm,
    "sign-up": signUp
  },
  computed: {
    houses() {
      return this.$store.getters.getUserHouses;
    },
    target() {
      return this.$refs.title;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      };
    }
  },
  data: () => ({
    loading: false,
    userInfo: null,
    signDialog: false
  }),
  async mounted() {
    this.$vuetify.goTo(this.target, this.options);
    this.loading = true
    await this.$store.dispatch("getUserHouses"); 
    const { data  } = await authRequests.getUserId(this.$store.state.auth.token)
    this.userInfo = data
    this.loading = false
    
  }
};
</script>
<style>
.user-houses {
  overflow-x: auto;
}
</style>
