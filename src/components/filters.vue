<template>
  <v-sheet color="white" elevation="1">
    <v-container>
      <!-- Rooms -->
      <v-row no-gutters>  
        <div class="d-flex flex-column justify-center">
          <v-menu
            nudge-width="50"
            :close-on-content-click="false"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#455A64"
                small
                rounded
                outlined
                v-on="on"
                v-bind="attrs"
                >Chambres
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list class="ma-0 pa-0">
              <v-list-item
                class="my-0 py-0"
                v-for="(roomsItem, i) in roomsItems"
                :key="i"
              >
                <v-list-item-content class="ma-0 pa-0">
                  <v-list-item-action class="ma-0 pa-0">
                    <v-checkbox
                      v-model="selectedRooms"
                      :label="roomsItem"
                      :value="roomsItem"
                    ></v-checkbox>
                  </v-list-item-action>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- Price -->
        <div class="d-flex flex-column justify-center">
          <v-menu nudge-width="150" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-2"
                color="#455A64"
                small
                rounded
                outlined
                v-bind="attrs"
                v-on="on"
                >Prix
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-card class="pa-2">
              <v-radio-group hide-details v-model="selectedIndexRange">
                <div class="radioInput d-flex align-center pa-1 justify-between" v-for="(n, i) in priceRanges" :key="i">
                  <v-radio
                    class="radioInput mb-2"
                    :label="' '+priceRanges[i].min + ' - ' + priceRanges[i].max + ` ${paymentFormat}`"
                    :value="i"
                  >
                  </v-radio>
                  <v-btn color="#E57373" class="ml-2 align-self-start pa-0 ma-0" x-small v-if="i==selectedIndexRange" @click="selectedIndexRange = null" icon><v-icon>mdi-close</v-icon></v-btn>
                </div>
              </v-radio-group>
            </v-card>
          </v-menu>
        </div>
      </v-row>
      <v-row no-gutters>
        <div class="rooms-chips mr-6">
          <v-chip class="px-2 mx-1" outlined v-for="(chipRooms,i) in chipsRooms.slice(0,2)" x-small :key="i">
            <span>{{ chipRooms }}</span>
          </v-chip>  
          <span v-if="chipsRooms.length >= 3" class="grey--text caption">
            (+{{ chipsRooms.length - 2 }})
          </span>
        </div>  
        <div class="price-chip">
          <v-chip outlined v-if="chipPrice" x-small>
            <span>{{ chipPrice.min }} - {{ chipPrice.max }} {{paymentFormat}}</span>
          </v-chip>
        </div>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import formatPrice from '../assets/formatPrice';
export default {
  data: () => ({
    tags: [],
    roomsItems: ['1/Studio', '2', '3', '4', '5', '6', '7', '8'],
    selectedRooms: [],
    chipsRooms: [],
    selectedIndexRange: null,
    chipPrice: null,
    priceRanges: [
      { min: "0", max: "30 000" },
      { min: "30 000", max: "50 000" },
      { min: "50 000", max: "100 000" },
      { min: "100 000", max: "200 000" }
    ],
    paymentFormat: 'دج',
    loading: false,
    timeout: null,
  }),
  computed: {
    searchStr() {
      return this.$store.state.search.searchQuery;
    },
    route(){
      return this.$route.fullPath
    },
    selectedRange(){
      return this.priceRanges[this.selectedIndexRange]
    },
    selectedFilters() {
      let filtersStr = ""
      try {
        const roomsFilters = this.selectedRooms.map(item => `rooms=${item}`).join('&');
        if(roomsFilters.length){
          filtersStr += `${roomsFilters}`
        }
        let priceFilters = ''
        if(this.selectedRange) {
          priceFilters = `price_gte=${this.selectedRange.min.replace(/\s+/g, '')}&price_lte=${this.selectedRange.max.replace(/\s+/g, '')}`
          filtersStr += `&${priceFilters}`
        }
          return filtersStr
      } catch  {
        return ''
      }   
    }
  },
  created() {
    if(this.searchStr.includes('buy')){
      this.priceRanges = [
        { min: "0", max: "200" },
        { min: "200", max: "400" },
        { min: "400", max: "600" },
        { min: "600", max: "999" },
      ]
      this.paymentFormat = 'مليون دج'
    }
    //TO BE REFACTORED
    const {rooms, price_gte,  price_lte} = this.$route.query
    if(rooms){
      this.selectedRooms = [...rooms]
      this.chipsRooms = [...this.selectedRooms]
    }
    if(price_gte && price_lte){
      // GET index of the right price range
      this.selectedIndexRange = this.priceRanges.indexOf(this.priceRanges.find(item => item.min[0] === price_gte[0]))
      this.chipPrice = {...this.selectedRange}
    }
  },
  methods: {
    async filterHouses() { 
      this.loading = true
      this.$store.commit("SET_PAGE", 1);
      this.$store.commit("SET_FILTER_SEARCH", this.selectedFilters)
      this.chipsRooms = [...this.selectedRooms]
      this.chipPrice = this.selectedRange
      this.loading = false
    }
  },
  watch:{
    selectedFilters(){
    this.filterHouses();
    /*if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.filterHouses();
    }, 1000); */
    },
    route() {
      //TO BE REFACTORED
      const {rooms, price_gte, price_lte} = this.$route.query
      if(rooms) {
        this.chipsRooms = rooms
      }
      if(price_gte && price_lte) {
        this.chipPrice = {
          min: formatPrice(price_gte) || '0',
          max: formatPrice(price_lte) 
        }
      }    
    }
  }
};
</script>
<style scoped>
.v-btn {
  text-transform: none;
  margin-right: 12px;
}
.radioInput{
  width: 15rem;
}
</style>
