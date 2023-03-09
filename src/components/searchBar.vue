<template>
  <validation-observer v-slot="{ invalid }">
  <v-container>
    <v-sheet style="border-radius: 25px;" elevation="2" color="white">
      <v-row>
        <v-container class="px-7">
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
                  small-chips
                  :items="types"
                  v-model="type"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip x-small v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption">
                      (+{{ type.length - 1 }})
                    </span>
                  </template>
                </v-select>
               </validation-provider>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col class="py-0" align="center">
          <v-radio-group class="mt-0" hide-details v-model="transaction">
            <v-radio
              v-for="(type, i) in ['Location', 'Achat']"
              :key="i"
              :class="i == 0 ? 'mx-auto' : 'pr-5 mx-auto'"
              :label="type"
              :value="type"
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
    </v-sheet>
  </v-container>
  </validation-observer>
</template>

<script>
import algeriaCities from "../assets/algeria-cities.json";
export default {
  data: () => ({
    types: ["Appartement", "Villa", "Studio"],
    type: '',
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    wilaya: "",
    dairasItems: [],
    dairas: [],
    transaction: "Location",
    loading: false
  }),
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }
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
      if(this.type)
        searchStr += "&type=" + this.type;
      for (const daira of this.dairas) {
        searchStr += "&daira=" + daira
      }
      if(this.transaction)  {
        const transactionEn = this.transaction === 'Location' ? 'rent' : this.transaction === 'Achat' ?  'buy' : ''
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

<style></style>
