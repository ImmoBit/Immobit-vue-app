<template>
  <v-container ref="card" :class="$vuetify.breakpoint.xs ? 'pa-0 ma-0' : ''">
    <v-row no-gutters>
      <v-col cols="12">
        <filters-card></filters-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-title>
      {{ houses.length }} annonce(s) trouvées in {{ address }}
    </v-card-title>
    <v-row no-gutters>
      <v-col v-if="!$vuetify.breakpoint.xs" cols="7" align="start">
        <card
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          class="mb-6"
          ref="card"
        ></card>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xs">
        <card-phone
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          style="margin-bottom: 70px"
        ></card-phone>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import filtersCard from "../components/filters";
import Card from "../components/cards/cardSmart";
import cardPhone from "../components/cards/cardPhone";
export default {
  components: {
    card: Card,
    "filters-card": filtersCard,
    "card-phone": cardPhone
  },
  data: () => ({}),
  computed: {
    searchStr() {
      return this.$store.getters.SEARCH_COMP;
    },
    houses() {
      return this.$store.getters.GET_HOUSES;
    },
    address() {
      return this.$store.state.address;
    },
    target() {
      return this.$refs.card;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      };
    }
  },
  watch: {
    async searchStr() {
      await this.$store.dispatch("getHouses", this.searchStr);
    },
    houses() {
      this.$store.commit("loadEnd");
    }
  },
  mounted() {
    this.$store.commit("loadEnd");
    console.log(this.$refs.card);
    this.$vuetify.goTo(this.target, this.options);
  }
};
</script>

<style></style>
