<template>
  <v-app id="inspire">
    <!--66636F-->
    <v-app-bar class="pa-0" color="#ECEFF1" height="80" app fixed>
      <v-container :fluid="$vuetify.breakpoint.xs" class="pa-0">
        <v-row align="center" class="ma-0">
          <!-- Logo -->
          <v-col class="pl-0" :cols="$vuetify.breakpoint.xs? 3 : 1" @click="goHome">
            <v-img :src="logo"></v-img>
          </v-col>

          <!-- Title -->
          <v-col cols="2" v-if="!$vuetify.breakpoint.xs" @click="goHome" class="pa-0" >
            <span style="color: #80c8F1" class="display-1">Immo</span>
            <span style="color: #F69C65" class="display-1">Bit</span>
          </v-col>        
           <!--Create a house button-->
          <v-col v-if="!authenticated && homePage" align="center" align-self="center" cols="2">
            <transition appear name="bounce">
              <v-btn small dark color="orange" prepend="mdi-home-plus" :to="{ name: 'CreateProperty' }"> 
                <v-icon> mdi-home-plus </v-icon>
                Créer une annonce
              </v-btn>            
            </transition>
          </v-col>          
          <v-spacer></v-spacer>
          
          <!-- save,sign in/up section -->
          <v-col class="pa-0" align="end" cols="6">
            <v-menu
              v-if="!$vuetify.breakpoint.xs && savedHouses.length !== 0 "
              eager
              id="menu"
              offset-x
              :close-on-content-click="false"
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
                class="saved-houses"
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
                        Créer un compte
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
                        Se connecter                       
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
                      <v-btn text color="primary">Vos annonces</v-btn>
                    </v-list-item-title>
                  </router-link>
                </v-list-item>

                <v-divider class="mx-3"></v-divider>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn text @click="logout">Se déconnecter</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <filters-card v-if="isListPage" class="filters-card"></filters-card>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <v-bottom-sheet eager v-model="saved">
        <saved-houses class="saved-houses" :savedHouses="savedHouses"></saved-houses>
      </v-bottom-sheet>

      <v-bottom-navigation    
        hide-on-scroll
        v-if="$vuetify.breakpoint.xs && !homePage" fixed color="indigo">
        <v-btn @click="goHome">
          <span>Recherche</span>
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
        <v-btn @click="saved = !saved">
          <span>Enregistré</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'CreateProperty' }">
          <span class="text-center">Créer <br> une annonce</span>
          <v-icon> mdi-home-plus </v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
        <v-footer class="footer d-flex flex-column align-center" :style="$vuetify.breakpoint.xs && !homePage ? 'margin-bottom: 60px': ''">
          <div class="terms-privacy pa-4">
            <router-link class="pa-4" :to="{ name: 'terms' }">
              terms
            </router-link>
            <router-link class="pa-4" :to="{ name: 'privacy-policy' }">
              privacy policy
            </router-link> 
          </div>
          <div class="year-company">
            <div>
              {{ new Date().getFullYear() }} — ImmoBit
            </div>
          </div>
    </v-footer>

  </v-app>
</template>

<script>
import signIn from "./components/auth/signIn";
import signUp from "./components/auth/signup";
import savedHouses from "./components/savedHouses";
import filtersCard from "./components/filters";

export default {
  components: {
    "sign-in": signIn,
    "sign-up": signUp,
    "saved-houses": savedHouses,
    "filters-card": filtersCard,
  },
  data: () => ({
    logo: require("@/assets/Immobit-logo.png"),
    immoArab: require("@/assets/cart-houses.png"),
    dialog1: false,
    dialog2: false,
    dialog3: false,
    openSavedHouses: true,
    saved: false
  }),
  computed: {
    savedHouses() {
      return this.$store.getters.GET_SAVED_HOUSES;
    },
    authenticated() {
      try {
        return this.$store.getters.getToken.includes("token") && !!this.$store.state.auth.userId;
      } catch (e) {
        return false;
      }
    },
    homePage() {
      if (this.$route.path == "/" || this.$route.path == "/terms" || this.$route.path == "/privacy-policy") {
        return true;
      } else return false;
    },
     isListPage() {
      if (this.$route.path === "/list") {
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
    logout() {
      this.$store.dispatch("logout");
    }
  },
  async created() {
    await this.$store.dispatch("refreshLogin");
    await this.$store.dispatch("getHousesLocal");
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

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.filters-card {
  position: fixed; 
  z-index: 5;
  width: 100%;
}
.saved-houses {
  z-index: 10;
}
</style>
