<template>
  <v-container ref="card" :class="`mt-16 ${$vuetify.breakpoint.xs ? 'px-0 my-0': ''}`">
    <v-card-title>
      {{ houses.length }} annonce(s) trouvées {{ address ? `à ${address}`: `` }}
    </v-card-title>
    <v-row style="min-height: 300px" no-gutters>
      <v-col v-if="!$vuetify.breakpoint.xs" cols="7" align="start">
        <card
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          class="mb-6"
          ref="card"
        ></card>
      </v-col>
      <v-col v-else>
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
import Card from "../components/cards/cardSmart";
import cardPhone from "../components/cards/cardPhone";

export default {
  components: {
    card: Card,
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

<style>
</style>
