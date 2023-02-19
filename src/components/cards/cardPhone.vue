<template>
  <v-card elevation="1">
    <v-carousel height="350" hide-delimiters>
      <v-carousel-item
        v-for="(image, i) in house.images"
        :key="i"
        :src="image"
        class="text-right"
      >
      </v-carousel-item>
      <div style="position: absolute; height: 100%;" class="d-flex flex-column justify-space-between">
        <v-btn class="align-self-end" @click="updateSavedHouse" large icon dark>
          <v-icon class="pr-4">
            {{ saved ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </v-btn>
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="{ name: 'House', params: { id: id } }"
        >
          <v-container fill-height align-end pa-0>
            <v-card-title class="pa-0">
              <v-sheet id="price" class="pb-4">
                <v-row no-gutters class="white--text">
                  <div class="title font-weight-bold ml-2">• {{ price }} دج/</div>
                  <div class="caption">mois</div>
                </v-row>
              </v-sheet>
            </v-card-title>
          </v-container>
        </router-link>
      </div>
    </v-carousel>

    <v-card-text class="text--primary pb-0">
      <div class="body-1 font-weight-medium">
        <v-icon>mdi-map-marker</v-icon>{{ address }}
      </div>
      <div class="body-2 text--secondary  ml-6">
        • {{ house.rooms }} Chambres{{house.kitchen ? ', Cuisine ' : ''}}{{house.bathroom ? ', Salle de bain ' : ''}}
      </div>
    </v-card-text>

    <v-card-actions class="py-0">
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ this.house.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import formatPrice from "../../assets/formatPrice";
export default {
  props: {
    house: Object
  },
  data: () => ({
    show: false
  }),
  computed: {
    saved() {
      if (
        this.$store.getters.GET_SAVED_HOUSES.filter(
          item => item.id == this.house.id
        ).length > 0
      )
        return true;
      else return false;
    },
    id() {
      return this.house.id;
    },
    type() {
      return this.house.type.toLowerCase();
    },
    city() {
      return this.house.city.toLowerCase();
    },
    address() {
      return (
        this.house.address.charAt(0).toUpperCase() +
        this.house.address.substr(1).toLowerCase()
      );
    },
    price() {
      return formatPrice(this.house.price);
    },
    homeMdi() {
      if (this.house.type == "Appartement") return "mdi-home-modern";
      else if (this.house.type == "Villa") return "mdi-home";
      else return "";
    }
  },
  methods: {
    async updateSavedHouse() {
      var house = this.house;
      house.saved = this.saved;
      console.log(house);
      await this.$store.dispatch("updateSavedHouses", house);
    }
  },
};
</script>

<style>
#price {
  min-width: 400px;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
}
</style>
