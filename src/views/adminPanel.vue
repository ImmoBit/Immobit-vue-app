<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col>
          <p class="display-1 text--secondary">Annonces publiée</p>
          <v-sheet style="overflow-x: auto;">
            <v-row>
              <v-col v-for="(house, i) in houses" :key="i">
                <card-admin class="mr-1" :house="house"> </card-admin>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
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
  async created() {
    await this.$store.dispatch("getUserHouses");
  }
};
</script>
