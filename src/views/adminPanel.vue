<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col>
          <p class="display-1 text--secondary">Annonces publiée</p>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="cyan"
          ></v-progress-linear>          
          <v-sheet class="d-flex user-houses pb-6">
            <card-admin v-for="(house, i) in houses" :key="i" class="mr-5" :house="house"> </card-admin>
          </v-sheet>
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
export default {
  components: {
    "card-admin": cardAdmin,
    "house-form": houseForm
  },
  computed: {
    houses() {
      return this.$store.getters.getUserHouses;
    }
  },
  data: () => ({
    loading: false
  }),
  async created() {
    this.loading = true
    await this.$store.dispatch("getUserHouses");    
    this.loading = false

  }
};
</script>
<style>
.user-houses {
  overflow-x: auto;
}
</style>
