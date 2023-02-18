<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card height="250" shaped :elevation="hover ? 12 : 2">
        <v-container fluid class="pa-0">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="5">
              <v-carousel height="250" hide-delimiters>
                <v-carousel-item
                  v-for="(image, i) in house.images"
                  :key="i"
                  :src="image"
                  @click="goHousePage"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col class="pb-0">
              <v-container fill-height>
                <v-row @click="goHousePage">
                  <v-col>
                    <div class="d-flex green--text text--darken-4">
                      <div class="title grey--text">•</div>
                      <div class="title ml-2">{{ price }}</div>
                      <div class="title">DZD/</div>
                      <div class="caption mt-3">mois</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="font-weight-normal ml-3 mt-3">
                      <v-icon class="pb-1 mr-1 ml-1">mdi-map-marker</v-icon
                      >{{ address }}
                    </div>
                    <div class="text--secondary  ml-10">
                      • {{ house.rooms }} Chambres
                    </div>
                  </v-col>
                </v-row>
                <!-- heart icon, price -->
                <v-row align="end">
                  <v-col align="end">
                    <v-btn color="alert" icon @click="updateSavedHouse">
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
export default {
  props: {
    house: Object
  },
  data: () => ({
    show: false,
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
    title() {
      return (
        this.house.title.charAt(0).toUpperCase() +
        this.house.title.substr(1).toLowerCase()
      );
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
  methods: {
    async updateSavedHouse() {
      var house = this.house;
      house.saved = this.saved;
      await this.$store.dispatch("updateSavedHouses", this.house);
    },
    async goHousePage() {
      await this.$store.commit("SET_HOUSE", this.house);
      this.$router.push("/house/" + this.id).catch(() => {});
    }
  }
};
</script>
