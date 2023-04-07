<template>
  <v-container ref="card" :class="`mt-16 ${loading ? 'loading':''} ${$vuetify.breakpoint.xs ? 'px-0 my-0': ''}`">
    <div class="headline pa-4 text--secondary">
      {{ housesCount }} annonce(s) trouvées {{ address ? `à ${address}`: `` }}
    </div>
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
    <v-pagination
      v-model="page"
      :length="pagesCount"
    ></v-pagination>
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
  data: () => ({
    page: 1,
    loading: false
  }),
  computed: {
    housesCount(){
      return this.$store.state.search.housesCount;
    },
    pagesCount(){
      return this.$store.getters.PAGE_COUNT;
    },
    searchStr() {
      return this.$store.state.search.searchQuery;
    },
    searchStrComp() {
      return this.$store.getters.SEARCH_QUERY_WITH_PAGE;
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
    async searchStrComp(newVal) {
      this.loading = true
      this.$vuetify.goTo(this.target, this.options);
      await this.$store.dispatch("getHouses", newVal);
      const route = this.$route.path
      this.$router.replace({path: `${route}?${newVal}`})
      this.loading = false
    },
    houses() {
      this.$store.commit("loadEnd");
    },
    page(newVal) {
      this.$store.commit("SET_PAGE", newVal);
    }
  },
  created(){
    if(this.searchStr === ""){
      const {p, ...query} = this.$route.query
      this.$router.replace({query: query})
      const {city, type, transaction, rooms, price_gte, price_lte} = query
      let searchStr = ''
      if(city){
        this.$store.commit("SET_ADDRESS", city);
        searchStr += `city=${city}` 
      }
      if(transaction) {
        searchStr += `&transaction=${transaction}`
      }
      if(type){
        const typeQuery = type.map(item => `type=${item}`).join('&')
        searchStr += `&${typeQuery}`
      }
      this.$store.commit("SET_PAGE", p);
      let filterStr = ''
      if(rooms){
       const roomsQuery = rooms.map(item => `rooms=${item}`).join('&')
        if(roomsQuery.length){
          filterStr = `${roomsQuery}`
        }
      }
      if(price_gte && price_lte){
        filterStr = `&price_gte=${price_gte}&price_lte=${price_lte}`
      }
      this.$store.commit("SET_SEARCH", searchStr);
      this.$store.commit("SET_FILTER_SEARCH", filterStr);
    } else {
      const route = this.$route.path
      this.$router.replace({path: `${route}?${this.searchStrComp}`})
    }
  },
  mounted() {
    this.$store.commit("loadEnd");
    this.$vuetify.goTo(this.target, this.options);
  }
};
</script>

<style>
.loading{
  opacity: 0.5;
}
</style>
