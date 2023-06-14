<template>
  <v-container fluid class="background">
    <v-spacer style="height: 215px;"></v-spacer>
    <v-row>
      <v-col class="mx-auto" :cols="$vuetify.breakpoint.xs ? 11 : 7">
        <search-bar></search-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import searchBar from "../components/searchBar.vue";
//#F8DCBF
export default {
  components: {
    "search-bar": searchBar,
  },
  data: () => ({
    immoArab: require("@/assets/cart-houses.png"),
  })
}
</script>

<style lang="scss">
.background{
  background-image: url('../assets/background.png');
  @include desktop{
    background-image: url('../assets/background-desktop.png');
  }
  background-size: cover;
  height: 100%;
}
</style>