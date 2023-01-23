<template>
  <validation-observer v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <v-card elevation="1">
        <v-card-text class="pa-0 ma-0">
          <v-container class="px-0">
            <v-row no-gutters>
              <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <validation-provider>
                        <v-select :items="types" v-model="house.type" label="Type" prepend-icon="mdi-home-city">
                        </v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col>
                      <validation-provider>
                        <v-select :items="roomsItems" v-model="house.rooms" label="Chambres" prepend-icon="mdi-bed">
                        </v-select>
                      </validation-provider>
                    </v-col>
                    <v-col class="ml-2">
                      <validation-provider>
                        <v-select :items="pieceItems" v-model="piece" multiple small-chips label="Autres piéces">
                        </v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                      <validation-provider>
                        <v-select :items="wilNames" v-model="house.city" label="Wilaya" prepend-icon="mdi-map-marker">
                        </v-select>
                      </validation-provider>
                    </v-col>
                    <v-col>
                      <validation-provider name="daira">
                        <v-select :items="dairaItems" v-model="house.daira" :disabled="!dairaItems.length" label="Daira"
                          prepend-icon="mdi-map-marker-plus" />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <validation-provider v-slot="{ errors }" name="address">
                        <v-text-field v-model="house.address" class="inputs" label="address" type="text"
                          hint="Par exemple: Cité 400 logments, Sidi Djillali" prepend-icon="mdi-map-marker-multiple" />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="$vuetify.breakpoint.xs ? 4 : 3">
                      <validation-provider v-slot="{ errors }" name="price" :rules="{
                        required: true,
                        regex: /[0-9]+/
                      }">
                        <v-text-field v-model="house.price" class="inputs" label="prix" prepend-icon="mdi-currency-usd"
                          @input="formatPr" />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col :cols="$vuetify.breakpoint.xs ? 4 : 3">
                      <v-select :items="paytypeItems" v-model="paytype"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col class="pa-2 ml-5">
                <validation-provider class="ml-5" v-slot="{ errors }" name="Description" :rules="{
                  required: true,
                  regex: /^(?![\s.]+$)[a-zA-Z0-9àÀéèâ',/°\s.]*$/
                }">
                  <v-textarea outlined v-model="house.description" class="inputs" label="Description" type="text"
                    height="50" />
                  <span> {{ errors[0] }}</span>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="files" >
                  <v-file-input v-model="files" @input="setImgsSrc" @change="(files) => setImgsSrc(files)"
                    accept="image/png, image/jpeg, image/bmp" color="deep-purple accent-4" counter label="Images"
                    multiple placeholder="Select your images" prepend-icon="mdi-camera" outlined :show-size="1000">
                    <template v-slot:selection="{ index, text }">
                      <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                        {{ text }}
                      </v-chip>

                      <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                        +{{ files.length - 2 }} File(s)
                      </span>
                    </template>
                  </v-file-input>
                  <span> {{ errors[0] }}</span>
                </validation-provider>
                <v-card :class="$vuetify.breakpoint.xs ? 'ml-12' : ''" v-if="!!imgsSrc.length" max-width="280">
                  <v-carousel height="300">
                    <v-carousel-item v-for="(imageSrc,i) in imgsSrc" :key="i" :src="imageSrc"
                      reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row justify="end">
            <v-btn class="ma-5" @click="submit" :disabled="invalid" raised color="primary">Submit</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </form>
  </validation-observer>
</template>

<script>
import axios from "axios";
import formatPrice from "../assets/formatPrice";
import algeriaCities from "../assets/algeria-cities.json";
export default {
  props: {
    houseToEdit: {
      default: null,
      type: Object,
      required: false
    },
    filesToEdit: {
      default: null,
      type: Array,
      required: false
    }
  },
  data: () => ({
    multiple: true,
    types: ["Appartement", "Villa"],
    roomsItems: ["1", "2", "3", "4", "5", "6", "7", "8"],
    pieceItems: ["Cuisine", "Salle de bain"],
    piece: [],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    dairaItems: [],
    paytype: "DZD/mois",
    paytypeItems: ["DZD/jour", "DZD/mois"],
    files: [],
    imgsSrc: [],
    house: {
      type: "",
      user: null,
      rooms: null,
      kitchen: null,
      bathroom: null,
      city: "",
      daira: "",
      address: "",
      price: "",
      description: "",
      image1: File,
      image2: File,
      image3: File,
      image4: File,
      image5: File
    },
    editHouse: false
  }),
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }

    if (this.houseToEdit) {
      this.house = this.houseToEdit
      this.house.rooms = this.houseToEdit.rooms.toString()
      this.reverseCityName()
      this.house.kitchen = false
      this.piece[0] = this.house.kitchen ? 'Cuisine' : null
      this.piece[1] = this.house.bathroom ? 'Salle de bain' : null
      this.files = this.filesToEdit
      this.setImgsSrc()

    }
    this.editHouse = !!this.houseToEdit
  },
  computed: {
    userId() {
      return this.$store.getters.getUid;
    },
    cityName() {
      return this.house.city.slice(4);
    }
  },
  methods: {
    setImgsSrc(files) {
      this.imgsSrc = []
      console.log(files);
      if (files) this.files = files
      for (const file of this.files) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgsSrc.push(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    reverseCityName() {
      let l = 0
      for (const city of this.wilNames) {
        if (city.includes(this.house.city)) {
          l = this.wilNames.indexOf(city)
        }
      }
      this.house.city = l + 1 + " - " + this.house.city
    },
    formatPr() {
      this.house.price = formatPrice(this.house.price);
    },
    async submit() {
      var houseForm = new FormData();
      houseForm.append("city", this.cityName);
      houseForm.append("kitchen", this.piece.includes("Cuisine"));
      houseForm.append("bathroom", this.piece.includes("Salle de bain"));
      houseForm.append("user", this.userId);
      houseForm.append("price", this.house.price.toString().replace(/\s+/g, ""));
      houseForm.append("image1", this.files[0]);
      /*houseForm.append("image2", null);
      houseForm.append("image3", null);
      houseForm.append("image4", null);
      houseForm.append("image5", null);*/

      for (const key in this.house) {
        if (
          Object.hasOwnProperty.call(this.house, key) &&
          houseForm.get(key) == undefined && !key.includes('image')
        ) {
          houseForm.append(key, this.house[key]);
        }
        console.log("house form " + houseForm.get(key));
      }

      for (var pair of houseForm.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      if (!this.houseToEdit) {
        await axios
          .post("/house-create/", houseForm)
          .then(res => console.log(res))
          .catch(error => console.log(error));
      } else {
        await axios.patch("/house-update/" + this.house.id+"/", houseForm)
          .then(res => console.log(res))
          .catch(error => console.log(error));
      }

    },

  },
  watch: {
    cityName(val) {
      //  dirha ki ykhayar mdina
      if (val == null) {
        this.dairaItems = [];
        this.daira = "";
      } else {
        // eslint-disable-next-line no-unused-vars
        const indexFun = element => element == this.house.city;
        var indexWil = this.wilNames.findIndex(indexFun);
        var dairaItems = this.wilObj[indexWil].dairas;
        this.dairaItems = [];
        for (let index = 0; index < dairaItems.length; index++) {
          this.dairaItems.push(dairaItems[index].name);
        }
      }
    }
  }
};
</script>
