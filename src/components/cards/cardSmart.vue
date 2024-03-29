<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card @click="goHousePage" height="250" shaped :elevation="hover ? 12 : 2">
        <v-container fluid class="pa-0">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="5">
              <v-carousel height="250" hide-delimiters>
                <v-carousel-item
                  v-for="(image, i) in images"
                  :key="i"
                  :src="image"
                ></v-carousel-item>
                <div style="position: absolute; height: 100%;">
                  <v-container fill-height align-end pa-0>
                    <v-sheet id="price" class="pb-2">
                      <v-row no-gutters class="white--text">
                        <div class="title font-weight-bold ml-2">• {{ price }}</div>
                        <div class="caption align-self-end ml-1 mb-1">{{ house.paymentFormat }}</div>
                      </v-row>
                    </v-sheet>
                  </v-container>
                </div>
              </v-carousel>
            </v-col>
            <v-col class="pb-0">
              <v-container fill-height>
                <v-row>
                  <v-col>
                    <div class="text--secondary title">{{ type }} à {{  daira }}</div>
                    <v-divider></v-divider>
                    <div class="font-weight-normal ml-3 mt-3">
                      <v-icon class="pb-1 mr-1 ml-1">mdi-map-marker</v-icon
                      >{{ address }}
                    </div>
                    <div v-if="house.type != 'Studio'" class="text--secondary body-2 ml-10">
                      • {{ house.rooms }} Chambres
                    </div>
                  </v-col>
                </v-row>
                <!-- heart icon, price -->
                <v-row align="end">
                  <v-col align="end">
                    <v-btn color="alert" icon @click.stop="updateSavedHouse">
                      <v-icon>
                        {{ saved ? "mdi-heart" : "mdi-heart-outline" }}
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
  </div>
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
      return (
        this.house.type.charAt(0).toUpperCase() +
        this.house.type.substr(1).toLowerCase()
      );
    },
    city() {
      return (
        this.house.city.charAt(0).toUpperCase() +
        this.house.city.substr(1).toLowerCase()
      );
    },
    daira() {
      return (
        this.house.daira.charAt(0).toUpperCase() +
        this.house.daira.substr(1).toLowerCase()
      );
    },
    address() {
      return (
        this.house.address.charAt(0).toUpperCase() +
        this.house.address.substr(1).toLowerCase()
      );
    },
    price() {
      return formatPrice(this.house.price);
    }
  },
  async created() {
    let imagesFiles = []
    for (let i = 0; i < 5; i++) {
      imagesFiles = [...imagesFiles, this.house.images[i]];
    }
    const files = await urlsToFiles(imagesFiles)
    this.images = filesToBase64(files)
  },
  methods: {
    async updateSavedHouse() {
      var house = this.house;
      house.saved = this.saved;
      await this.$store.dispatch("updateSavedHouses", this.house);
    },
    async goHousePage() {
      this.$store.commit("SET_HOUSE", this.house);
      await this.$router.push("/house/" + this.id).catch(() => {});
    }
  },
  watch: {
    async id() {
      let imagesFiles = []
      for (let i = 0; i < 5; i++) {
        imagesFiles = [...imagesFiles, this.house.images[i]];
      }
      const files = await urlsToFiles(imagesFiles)
      this.images = filesToBase64(files)
    }
  }
};
</script>
<style scoped>
#price {
  min-width: 400px;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
}
</style>
