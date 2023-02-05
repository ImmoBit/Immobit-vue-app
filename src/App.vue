<template>
  <v-app id="inspire">
    <!--66636F-->
    <v-app-bar color="#ECEFF1" height="80" app fixed>
      <v-container>
        <v-row>
          <!-- Logo -->
          <v-col v-if="!$vuetify.breakpoint.xs" class="pr-0" cols="1">
            <v-img class="mt-5" width="70" height="50" :src="logo"></v-img>
          </v-col>

          <!-- Title -->
          <v-col @click="goHome" class="pl-0 mt-5" cols="2">
            <span class="display-1 brown--text text--lighten-2">Immo</span>
            <span class="display-1 blue--text text--lighten-2 mx-auto"
              >Bit</span
            >
          </v-col>
          <!-- save,sign in/up section -->
          <v-col align="end" cols="9">
            <v-menu
              eager
              id="menu"
              offset-x
              :close-on-content-click="openSavedHouses"
              :disabled="savedHouses.length == 0"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mt-6" large icon>
                  <v-icon>mdi-heart</v-icon>
                  <v-badge
                    eager
                    v-if="savedHouses.length"
                    dot
                    bottom
                    color="red"
                    :content="savedHouses.length"
                  >
                  </v-badge>
                </v-btn>
              </template>
              <saved-houses
                @close="openSavedHouses = false"
                :savedHouses="savedHouses"
              ></saved-houses>
            </v-menu>

            <v-menu eager v-if="!authenticated" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mt-6" icon large v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-dialog persistent max-width="350" v-model="dialog1">
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        Sign up
                      </v-list-item-title>
                    </template>
                    <sign-up
                      v-if="dialog1"
                      @dialog-false="dialog1 = false"
                    ></sign-up>
                  </v-dialog>
                </v-list-item>

                <v-list-item>
                  <v-dialog persistent max-width="350" v-model="dialog2">
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        Sign in
                      </v-list-item-title>
                    </template>
                    <sign-in
                      v-if="dialog2"
                      @dialog-false="dialog2 = false"
                    ></sign-in>
                  </v-dialog>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu eager v-if="authenticated" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mt-6" icon large v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <router-link
                    style="text-decoration: none; color: inherit;"
                    :to="{ name: 'admin-panel' }"
                  >
                    <v-list-item-title>
                      <v-btn small outlined color="primary">Admin</v-btn>
                    </v-list-item-title>
                  </router-link>
                </v-list-item>

                <v-divider class="mx-3"></v-divider>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn small text @click="logout">logout</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="mb-12">
      <v-container v-if="homePage">
        <v-row class="mt-12">
          <v-col class="mx-auto" :cols="$vuetify.breakpoint.xs ? 11 : 7">
            <transition name="slide-fade" mode="out-in">
              <search-bar v-intersect="onIntersect"></search-bar>
            </transition>
          </v-col>
        </v-row>
      </v-container>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <v-bottom-sheet eager v-model="saved">
      <saved-houses :savedHouses="savedHouses"></saved-houses>
    </v-bottom-sheet>

    <v-bottom-navigation v-if="$vuetify.breakpoint.xs" fixed color="indigo">
      <v-btn @click="goHome">
        <span>Recherche</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="saved = !saved">
        <span>Enregistré</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn @click="goList">
        <span>Navigation</span>

        <v-icon> mdi-format-list-bulleted </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import signIn from "./components/auth/signIn";
import signUp from "./components/auth/signup";
import searchBar from "./components/searchBar";
import savedHouses from "./components/savedHouses";
export default {
  components: {
    "sign-in": signIn,
    "sign-up": signUp,
    "search-bar": searchBar,
    "saved-houses": savedHouses
  },
  data: () => ({
    logo: require("@/assets/Immobit-logo.png"),
    dialog1: false,
    dialog2: false,
    dialog3: false,
    saved: false,
    value: 1,
    isIntersecting: false,
    openSavedHouses: true
  }),
  computed: {
    savedHouses() {
      return this.$store.getters.GET_SAVED_HOUSES;
    },
    authenticated() {
      try {
        return this.$store.getters.getToken.includes("token");
      } catch (e) {
        return false;
      }
    },
    homePage() {
      if (this.$route.path == "/list" || this.$route.path == "/") {
        return true;
      } else return false;
    },
    route() {
      return this.$route.path;
    }
  },
  methods: {
    goHome() {
      if (this.$route.path != "/") this.$router.push("/");
    },
    goList() {
      if (this.$route.path != "/list") this.$router.push("/list");
    },
    // eslint-disable-next-line no-unused-vars
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
    route() {
      this.saved = false;
    }
  },
  created() {
    this.$store.dispatch("refreshLogin");
    this.$store.dispatch("getHousesLocal");
  }
};
</script>
<style>
.slide-fade-enter {
  transform: translateX(15px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}

.v-btn {
  text-transform: none;
}
</style>
