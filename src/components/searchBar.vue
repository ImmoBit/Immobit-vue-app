<template>
  <v-container>
    <v-sheet style="border-radius: 25px;" elevation="2" color="white">
      <v-row>
        <v-container class="px-7">
          <v-row>
            <v-col :cols="isPhone ? 12 : 6">
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
                :disabled="!dairas.length"
                multiple
                :items="dairas"
                v-model="daira"
              ></v-select>
            </v-col>
            <v-col class="mx-auto" :cols="isPhone ? 12 : 6">
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
                multiple
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
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col class="py-0" align="center">
          <v-radio-group class="mt-0" hide-details v-model="radioGroup">
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
            :loading="loader"
            :disabled="loader"
          >
            Recherchez
            <v-icon class="ml-2 pr-0">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import algeriaCities from "../assets/algeria-cities.json";
export default {
  data: () => ({
    types: ["Appartement", "Villa", "Studio"],
    type: [],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    wilaya: "",
    dairas: [],
    daira: [],
    radioGroup: "Location",
    loader: false
  }),
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }
  },
  methods: {
    async searchState() {
      this.loader = true;
      this.$store.commit("loadStart");
      var searchArr = [];

      //Setting up search array and address
      this.$store.commit("SET_ADDRESS", this.wilaya.slice(4));
      searchArr.push("city=" + this.wilaya.slice(4));
      for (let i = 0; i < this.type.length; i++) {
        searchArr.push("type=" + this.type[i]);
      }

      //Dispatch search action
      await this.$store.dispatch("search", searchArr);
      let url = this.$route.path;
      var searchComp = this.$store.getters.SEARCH_COMP;
      await this.$store.dispatch("getHouses", searchComp);

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
    }
  },
  watch: {
    wilaya(val) {
      //  dirha ki ykhayar mdina
      if (val == null) {
        this.dairas = [];
        this.daira = "";
      } else {
        // eslint-disable-next-line no-unused-vars
        const indexFun = element => element == this.wilaya;
        var indexWil = this.wilNames.findIndex(indexFun);
        console.log(indexWil);
        var dairas = this.wilObj[indexWil].dairas;
        this.dairas = [];
        for (let index = 0; index < dairas.length; index++) {
          this.dairas.push(dairas[index].name);
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
