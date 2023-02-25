<template>
  <v-card elevation="1">  
    <v-carousel  height="350" hide-delimiters> 
      <v-carousel-item
        v-for=" i in 5"
        :key="i"
        :src="house.images[i]"
      >
      </v-carousel-item>
      <div @click="goHousePage" class="carousel-container d-flex flex-column justify-space-between">
        <v-btn class="align-self-end" @click.stop="updateSavedHouse" large icon dark>
          <v-icon class="pa-4">
            {{ saved ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </v-btn>
        <div class="price white--text d-flex pa-2">
          <div class="title font-weight-bold ml-2">• {{ price }}</div>
          <div class="caption align-self-end ml-1 mb-1">{{ house.paymentFormat }}</div>
        </div>
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
import { filesToBase64, urlsToFiles } from '../../helpers/helpers';
export default {
  props: {
    house: Object
  },
  data: () => ({
    show: false,
    images: []
  }),
  computed: {
    saved() {
      if (
        this.$store.getters.GET_SAVED_HOUSES.find(
          item => item.id === this.house.id
        )
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
  async created() {
    const files = await urlsToFiles(this.house.images)
    this.images = filesToBase64(files)
  },
  methods: {
    async updateSavedHouse() {
      var house = this.house;
      house.saved = this.saved;
      console.log(house);
      await this.$store.dispatch("updateSavedHouses", house);
    },
    async goHousePage() {
      this.$store.commit("SET_HOUSE", this.house);
      await this.$router.push("/house/" + this.id).catch(() => {});
    }
  },
};
</script>

<style>
.carousel-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
.price {
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
}
</style>
