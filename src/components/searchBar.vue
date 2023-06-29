<template>
  <validation-observer v-slot="{ invalid }">
<<<<<<< HEAD
    <v-container fluid class="searchBar">
=======
  <v-container fluid class="searchBar">
>>>>>>> IMB-17_adjust_filters
      <v-row>
        <v-container fluid class="px-7">
          <v-row>
            <v-col :cols="isPhone ? 12 : 6">
              <validation-provider rules="required">
                <v-select
                  prepend-inner-icon="mdi-map-marker"
                  full-width
                  height="50"
                  label="Wilaya"
                  hide-details
                  disable-lookup
                  filled
                  dense
                  rounded
                  solo
                  :items="wilNames"
                  v-model="wilaya"
                >
                </v-select>
              </validation-provider> 
            </v-col>
            <v-col :cols="isPhone ? 12 : 6">
              <v-select
                prepend-inner-icon="mdi-map-marker-plus"
                full-width
                height="50"
                label="Daira"
                small-chips
                hide-details
                disable-lookup
                dense
                filled
                rounded
                solo
                :disabled="!dairasItems.length"
                multiple
                :items="dairasItems"
                v-model="dairas"
              ></v-select>
            </v-col>
            <v-col class="mx-auto" :cols="isPhone ? 12 : 6">
              <validation-provider rules="required">
                <v-select
                  prepend-inner-icon="mdi-home-modern"
                  full-width
                  height="50"
                  label="Type"
                  hide-details
                  disable-lookup
                  filled
                  dense
                  rounded
                  solo
                  small-chips
                  multiple
                  :items="types"
                  v-model="selectedTypes"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip x-small v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption">
                      (+{{ selectedTypes.length - 1 }})
                    </span>
                  </template>
                </v-select>
               </validation-provider>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col class="d-flex justify-center mt-3">
          <v-radio-group row hide-details v-model="transactionIndex">
            <v-radio
              v-for="(type, i) in ['Location', 'Achat']"
              class="mr-3"
              :key="i"
              :label="type"
              :value="i+1"
              color="primary"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col class="d-flex justify-center">
          <v-radio-group class="ma-0" row hide-details v-model="transactionIndex">
            <v-radio
              class="mt-2"
              label="Vacance"
              :value="3"
              color="orange"
            ></v-radio>
        </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col align="center">
          <v-btn
            class="white--text"
            x-large
            height="40"
            width="180"
            rounded
            color="primary"
            @click="searchState"
            :loading="loading"
            :disabled="loading || invalid"
          >
            Recherchez
            <v-icon class="ml-2 pr-0">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
<<<<<<< HEAD
     </v-container>
=======
  </v-container>
>>>>>>> IMB-17_adjust_filters
  </validation-observer>
</template>

<script>
import algeriaCities from "../assets/algeria-cities.json";
export default {
  data: () => ({
    types: ["Appartement", "Villa", "Studio"],
    selectedTypes: [],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    wilaya: "",
    dairasItems: [],
    dairas: [],
    transactionIndex: 0,
    loading: false
  }),
  created() {
    this.selectedTypes = this.types
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }
    this.wilaya = this.wilNames[16-1]
  },
  methods: {
    async searchState() {
      this.loading = true;    
      this.$store.commit("loadStart");
      var searchStr = [];

      //Setting up search array and address
      this.$store.commit("SET_ADDRESS", this.wilaya.slice(4));
      if(this.wilaya)
        searchStr += "city=" + this.wilaya.slice(4).trim()
      if(this.selectedTypes){
        for (const selectedType of this.selectedTypes) {
          searchStr += "&type=" + selectedType;
        }
      }
      for (const daira of this.dairas) {
        searchStr += "&daira=" + daira
      }
      if(this.transactionIndex)  {
        const transactionEn = 
          this.transactionIndex === 1 ? 'rent' : 
          this.transactionIndex === 2 ? 'buy' : 
          this.transactionIndex === 3 ? 'vacation' : ''
        searchStr += "&transaction=" + transactionEn
      }
      

      //Dispatch search action
      this.$store.commit("SET_SEARCH", searchStr);
      let url = this.$route.path;
      await this.$store.dispatch("getHouses", this.searchQueryComp);

      //Going to list page
      if (url != "/list") this.$router.push("/list");
    }
  },

  computed: {
    loading() {
      return this.$store.getters.getLoad;
    },
    fontSize() {
      if (this.$vuetify.breakpoint.xs) {
        return "12px";
      } else {
        return "14px";
      }
    },
    isPhone() {
      return this.$vuetify.breakpoint.xs;
    },
    searchQueryComp(){
      return this.$store.getters.SEARCH_QUERY_WITH_PAGE
    }
  },
  watch: {
    wilaya(val) {
      //  dirha ki ykhayar mdina
      if (val == null) {
        this.dairasItems = [];
        this.daira = [];
      } else {
        // eslint-disable-next-line no-unused-vars
        const indexFun = element => element == this.wilaya;
        var indexWil = this.wilNames.findIndex(indexFun);
        console.log(indexWil);
        var dairasItems = this.wilObj[indexWil].dairas;
        this.dairasItems = [];
        for (let index = 0; index < dairasItems.length; index++) {
          this.dairasItems.push(dairasItems[index].name);
        }
      }
    },
    loading(val) {
      this.loader = val;
    }
  }
};
</script>

<style>
<<<<<<< HEAD
.searchBar{
  background: rgb(255, 255, 255);
  border-radius: 25px;
}
</style>
=======
  .searchBar{
    background: rgba(255, 255, 255, 0.80);
    border-radius: 25px;
  }
  </style>
>>>>>>> IMB-17_adjust_filters
