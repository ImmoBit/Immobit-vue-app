<template>
  <v-sheet color="white" elevation="1">
    <v-container>
      <v-row no-gutters>
        <!-- Rooms -->
        <v-col class="d-flex align-center" :cols="$vuetify.breakpoint.xs ? 12 : 4">
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
          <!-- Price -->
          <v-menu nudge-width="50" :close-on-content-click="false" offset-y>
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
            <v-list class="ma-0 pa-0">
              <v-list-item
                class="my-0 py-0"
                v-for="(priceRange, i) in priceRanges"
                :key="i"
              >
                <v-list-item-content class="ma-0 pa-0">
                  <v-list-item-action class="ma-0 pa-0">
                    <v-radio-group v-model="selectedRange">
                      <v-radio
                        :label="priceRange.min + ' - ' + priceRange.max + ` ${paymentFormat}`"
                        :value="priceRange"
                      >
                      </v-radio>
                    </v-radio-group>
                  </v-list-item-action>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn text @click="filterHouses" :loading="loading">Filtrer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    tags: [],
    roomsItems: ['1', '2', '3', '4', '5', '6', '7', '8'],
    selectedRooms: [],
    selectedRange: null,
    priceRanges: [
      { min: "0", max: "30 000" },
      { min: "30 000", max: "50 000" },
      { min: "50 000", max: "100 000" },
      { min: "100 000", max: "200 000" }
    ],
    paymentFormat: 'دج',
    loading: false,
    timeout: null
  }),
  computed: {
    searchStr() {
      return this.$store.getters.SEARCH_COMP;
    },
    selectedFilters() {
      const filters = []
      try {
        const roomsFilters = this.selectedRooms.map(item => `rooms=${item}`);
        let priceFilters = []
        if(this.selectedRange) {
          priceFilters = [`price_gte=${this.selectedRange.min.replace(/\s+/g, '')}`,
                              `price_lte=${this.selectedRange.max.replace(/\s+/g, '')}`]}
        return filters.concat(priceFilters).concat(roomsFilters)
      } catch  {
        return null
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
   
  },
  methods: {
    async filterHouses() { 
      this.loading = true
      if(this.selectedFilters)  {
        await this.$store.dispatch("filterSearch", this.selectedFilters)
      }
      this.loading = false
    }
  }
};
</script>
<style scoped>
.v-btn {
  text-transform: none;
  margin-right: 12px;
}
</style>
