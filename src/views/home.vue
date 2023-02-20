<template>
  <v-container>
    <v-row>
      <v-col align="center">          
        <img :src="immoArab" height="200">
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mx-auto" :cols="$vuetify.breakpoint.xs ? 11 : 7">
        <search-bar></search-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import searchBar from "../components/searchBar.vue";

export default {
  components: {
    "search-bar": searchBar,
  },
  data: () => ({
    immoArab: require("@/assets/cart-houses.png"),
  })
}
</script>

<style>

</style>