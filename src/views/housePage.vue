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
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- house info row -->
    <v-row class="mx-0">
      <v-col :cols="isPhone ? 12 : 5">
        <v-chip color="green darken-4" outlined>
          <div class="d-flex">
            <div class="title">{{ price }}</div>
            <div class="title">DZD/</div>
            <div class="mt-2">mois</div>
            <v-icon right>mdi-tag</v-icon>
          </div>
        </v-chip>
        <div class="ml-4 text--secondary">
          <p class="mt-3">• {{ house.rooms }} Rooms</p>

          <p class="font-weight-normal">
            <v-icon>mdi-map-marker</v-icon> {{ house.address }}
          </p>

          <p class="pb-0 mb-0"><v-icon>mdi-overscan</v-icon> 120 m²</p>
          <!-- Tags-->
          <div class="pl-4">
            <v-chip-group active-class="primary--text" column>
              <v-chip
                outlined
                v-for="tag in tags"
                :key="tag.name"
                :color="tag.color"
              >
                <v-icon left>{{ tag.icon }}</v-icon>
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-col>
      <v-divider :vertical="!isPhone"></v-divider>
      <!-- Description section -->
      <v-col>
        <v-card elevation="1">
          <v-card-title>Description</v-card-title>
          <v-card-text v-text="house.description"> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mx-0">
      <v-col>
        <v-sheet
          class="d-flex flex-column align-center mx-auto mt-5 mb-12"
          width="300"
          elevation="1"
        >
          <v-avatar class="mb-5" size="128">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div class="d-flex mb-2">
            <v-icon class="mr-2">mdi-phone</v-icon>

            <a :href="phone">{{ user.phone }}</a>
          </div>

          <div class="d-flex mb-2">
            <v-icon class="mr-2">mdi-facebook-messenger</v-icon>
            <a href="https://m.me/hichem.talos.7/">Use messenger</a>
          </div>
        </v-sheet>
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
    tags: [
      { name: "meublé", color: "brown lighten-1", icon: "mdi-domain-plus" },
      { name: "wifi", color: "blue lighten-1", icon: "mdi-wifi" },
      { name: "4ém etage", color: "blue-grey", icon: "mdi-home-floor-3" }
    ]
  }),
  computed: {
    /*dateRangeText() {
      return this.dates.join(" ~ ");
    },*/
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
    /*sendDates() {
      const dates = {
        user: this.client,
        house: this.$route.params.id,
        dates: this.dates
      };
      console.log(dates);
      Axios.post("/dates/", dates).then(res => {
        console.log(res);
      });
    }*/
  },
  metaInfo() {
    return {
      title: `F${this.house.rooms} | ${this.house.address}`,
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
        { hid: "og:image", property: "og:image", content: this.house.image1 }
      ]
    };
  },
  async created() {
    const id = this.$route.params.id;
    this.house = await apiRequests.getHouse(id);
    Axios.get("/users/users/" + this.house.user).then(res => {
      this.user = res.data;
    });
  }
};
</script>
