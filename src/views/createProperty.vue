<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          Créer un compte
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          Créer un annonce
        </v-stepper-step>

        <v-divider></v-divider>

      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content  step="1">
          <sign-up> </sign-up>
        </v-stepper-content>

        <v-stepper-content step="2">
          <house-form> </house-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import signUp from "../components/auth/signup";
import houseForm from "../components/houseForm";

export default {
  components: {
    "sign-up": signUp,
    "house-form": houseForm
    }, 
  computed: {
    isAuthenticated(){
      try {
        return this.$store.getters.getToken.includes("token") && this.$store.getters.getUser.id;
      } catch (e) {
        return false;
      }    
    }
  },
  data: () => ({
    step: 1
  }),
  watch: {
    isAuthenticated(val) {
      if(val){
        this.step = 2
      }
    }
  }
}

</script>
<style scoped>
.signUp{
  max-width: 500px;
  margin: auto;
}
</style>