<template>
  <v-container :class="isPhone ? 'px-0' : ''">
    <!-- Photos section row -->
    <v-row no-gutters>
      <div class="display-1 text--secondary mb-1">
        <v-icon large>mdi-home-modern</v-icon>{{ house.type }} à
        {{ house.city }}
      </div>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col v-for="(card, i) in cards" :key="i" :cols="card.flex">
            <v-img
              :src="house.images[i]"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="280px"
              @click="imagesDialog = true"
            >
            </v-img>
            <v-dialog v-model="imagesDialog">
              <v-carousel class="mx-auto" style="max-width: 500px">
                <v-carousel-item
                  v-for="(image, i) in house.images"
                  :key="i"
                  :src="image"
                >
                </v-carousel-item>
              </v-carousel>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- house info row -->
    <v-row class="mx-0">
      <v-col :cols="isPhone ? 12 : 5">
        <div class="d-flex align-center justify-space-between"> 
           <v-chip outlined>
            <div class="d-flex">
              <div class="title">{{ price }}</div>
              <div class="title ml-1"> دج/</div>
              <div class="mt-2">mois</div>
              <v-icon right>mdi-tag</v-icon>
            </div>
          </v-chip>
          <v-btn :href="phone" rounded color="green" class="white--text" style="text-transform: none">
            <v-icon small class="mr-3">mdi-phone</v-icon>
            Appeler
          </v-btn>
        </div>
        <div class="ml-2 text--secondary">
          <div class="font-weight-normal mt-5">
            <v-icon>mdi-map-marker</v-icon> {{  house.daira }}, {{ house.address }}
          </div>
          <div class="ml-5 mt-2">• {{ house.rooms }} Chambres{{ house.kitchen ? ', Cuisine ' : ''}}{{ house.bathroom ? ', Salle de bain ' : '' }}</div>
        </div>
        <div v-if="!isPhone" class="ml-4 mt-3">
          <a :href="phone">{{ user.phone }}</a>
        </div>
      </v-col>
      <v-divider :vertical="!isPhone"></v-divider>
      <!-- Description section -->
      <v-col>
        <v-card elevation="0">
          <v-card-title>Description</v-card-title>
          <v-card-text>{{ house.description  }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Axios from "axios";
import formatPrice from "../assets/formatPrice";
import apiRequests from "../apiRequests/searchRequests";
export default {
  data: () => ({
    house: {},
    cards: [
      {
        flex: 8
      },
      {
        flex: 4
      },
      {
        flex: 4
      },
      {
        flex: 4
      },
      {
        flex: 4
      }
    ],
    user: {
      email: null,
      first_name: null,
      id: null,
      last_name: null,
      phone: null,
      username: null
    },
    imagesDialog: false,
    loading: false
  }),
  computed: {
    isPhone() {
      return this.$vuetify.breakpoint.xs;
    },
    price() {
      return formatPrice(this.house.price);
    },
    phone() {
      return "tel:" + this.user.phone;
    }
  },
  methods: {
    addHouse() {
      this.$store.commit("saveHouse", this.id);
    }
  },
  metaInfo() {
    return {
      title: `F${this.house.rooms ||'ImmoBit'} | ${this.house.address}`,
      link: [
        {
          rel: "canonical",
          href: location.protocol + "//" + location.host + location.pathname
        }
      ],
      meta: [
        { hid: "og:type", property: "og:type", content: "page" },
        {
          hid: "og:url",
          property: "og:url",
          content: location.protocol + "//" + location.host + location.pathname
        },
        { hid: "og:image", property: "og:image", content: this.house.images[0] }
      ]
    };
  },
  async mounted() {
    this.loading = true
    const id = this.$route.params.id;
    this.house = await apiRequests.getHouse(id);
    Axios.get("/users/users/" + this.house.user).then(res => {
      this.user = res.data;
    });
    this.loading = false
  }
};
</script>
