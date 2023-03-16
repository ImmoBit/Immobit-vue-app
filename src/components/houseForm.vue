<template>
  <validation-observer v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <v-card elevation="1">
        <v-card-text class="pa-0 ma-0">
          <v-container class="px-0">
            <v-row align="center"><v-col><v-card-title class="mb-3">Créer une annonce</v-card-title></v-col> 
            </v-row>
            <v-row no-gutters>
              <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-radio-group class="d-flex flex-row" v-model="transaction">
                        <v-radio
                          v-for="(type, i) in ['Location', 'Vente']"
                          :key="i"
                          :label="type"
                          :value="type"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>                  
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <validation-provider rules="required">
                        <v-select
                          :items="types"
                          v-model="house.type"
                          label="Type"
                          prepend-icon="mdi-home-city"
                        >
                        </v-select>
                      </validation-provider>
                    </v-col>
                    <v-col>
                      <validation-provider :rules="{required: house.type !== 'Studio'}">
                        <v-select
                          :items="roomsItems"
                          v-model="house.rooms"
                          label="Chambres"
                          prepend-icon="mdi-bed"
                          :disabled="house.type === 'Studio'"
                        >
                        </v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                      <validation-provider rules="required">
                        <v-select
                          :items="wilNames"
                          v-model="house.city"
                          label="Wilaya"
                          prepend-icon="mdi-map-marker"
                        >
                        </v-select>
                      </validation-provider>
                    </v-col>
                    <v-col>
                      <validation-provider name="daira" rules="required">
                        <v-select
                          :items="dairaItems"
                          v-model="house.daira"
                          :disabled="!dairaItems.length"
                          label="Daira"
                          prepend-icon="mdi-map-marker-plus"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <validation-provider v-slot="{ errors }" rules="required" name="address">
                        <v-text-field
                          v-model="house.address"
                          class="inputs"
                          label="Address"
                          type="text"
                          hint="Par exemple: Cité 400 logments, Sidi Djillali"
                          prepend-icon="mdi-map-marker-multiple"
                        />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col :cols="$vuetify.breakpoint.xs ? 4 : 3">
                      <validation-provider
                        name="price"
                        v-slot="{ errors }"
                        :rules="{ required: true, 
                                rentPriceDay: transaction === 'Location' && rentPaymentType === 'دج/jour',
                                rentPriceMonth: transaction === 'Location' && rentPaymentType === 'دج/mois',
                                sellPrice: transaction === 'Vente' && sellPaymentType !== 'مليار دج',
                                sellPriceB: transaction === 'Vente' && sellPaymentType === 'مليار دج' }"
                      >
                        <v-text-field
                          v-model="house.price"
                          class="inputs"
                          label="Prix"
                          prepend-icon="mdi-currency-usd"
                        />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col :cols="$vuetify.breakpoint.xs ? 4 : 3">
                      <v-select v-if="transaction === 'Vente'"
                        :items="sellPaymentItems"
                        v-model="sellPaymentType"
                      ></v-select>
                      <v-select v-else
                        :items="rentPaymentItems"
                        v-model="rentPaymentType"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <!--phone area-->
                  <v-row v-if="isSuperUser">
                    <v-col :cols="$vuetify.breakpoint.xs ? 12 : 6">
                      <validation-provider
                        rules="required|phone"
                        name="Phone number"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model.trim="house.phone"
                          class="inputs"
                          label="N° Téléphone"
                          type="text"
                          prepend-icon="mdi-phone"
                        />
                        <span> {{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col class="pa-2 ml-5" :style="!$vuetify.breakpoint.xs ? 'margin-top: 100px' :''">
                <validation-provider
                  class="ml-5"
                  name="Description"
                >
                  <v-textarea
                    outlined
                    v-model="house.description"
                    class="inputs"
                    label="Description"
                    type="text"
                  />
                </validation-provider>
                <validation-provider name="files" :rules="{ required, filesNumber }">
                  <v-file-input
                    ref="fileInput"
                    :value="files"
                    @change="(images) => setImgsSrc(images)"
                    :clearable="false"
                    accept="image/*"
                    color="deep-purple accent-4"
                    counter
                    label="Images"
                    multiple
                    placeholder="Selectionnez vos images"
                    prepend-icon="mdi-camera"
                    outlined
                    :show-size="1000"
                    :rules="imagesRules"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>

                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >
                        +{{ files.length - 2 }} 
                      </span>
                    </template>
                  </v-file-input>
                </validation-provider>
                <v-card
                  :class="!$vuetify.breakpoint.xs ? 'ml-12' : ''"
                  v-if="!!imgsSrc.length"
                  max-width="280"
                >
                  <v-carousel height="300">
                    <v-carousel-item
                      v-for="(imageSrc, i) in imgsSrc"
                      :key="i"
                      :src="imageSrc"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                    <div class="d-flex justify-end">
                      <v-btn @click="removeImage(i)" large icon dark>
                        <v-icon class="pa-4" >
                          mdi-close
                        </v-icon>
                      </v-btn>
                    </div>
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-alert v-if="success" dense text type="success"
            >
              Votre annonce a été <strong>publiée</strong>
            </v-alert>
            <v-alert v-else-if="error"
              type="error"
            >
            Votre annonce n'a pas été publiée. Veuillez réessayez.</v-alert>
            <v-btn class="ma-5" @click="submit" :disabled="invalid" :loading="loading" raised color="primary"
            >Publier</v-btn>
           <v-dialog
              v-model="loading"
              hide-overlay
              persistent
              width="300"
            >
              <v-card
                color="primary"
                dark
              >
                <v-card-text>
                  Veuillez patientez
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
        </v-card-actions>
      </v-card>
    </form>
  </validation-observer>
</template>

<script>
import axios from "axios";
import algeriaCities from "../assets/algeria-cities.json";
import { filesToBase64 } from "../helpers/helpers"

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
    types: ["Appartement", "Villa", "Studio"],
    roomsItems: ["1", "2", "3", "4", "5", "6", "7", "8"],
    wilObj: algeriaCities.wilayas,
    wilNames: [],
    dairaItems: [],
    rentPaymentItems: ["دج/jour", "دج/mois"],
    rentPaymentType: "دج/mois",
    sellPaymentItems: ["مليار دج", "مليون دج"],
    sellPaymentType: "مليون دج",
    files: [],
    imgsSrc: [],
    house: {
      type: "",
      user: null,
      rooms: null,
      city: "",
      daira: "",
      address: "",
      price: "",
      description: "",
      transaction: "rent",
      paymentFormat: '',
      phone: null
    },
    transaction: "Location",
    editHouse: false,
    loading: false,
    imagesRules: [
      value => !value || value.length >= 5 && value.length <= 20 || "Le nombre d'images doit être compris entre 5 et 20",
    ],
    success: false,
    error: false
  }),
  created() {
    for (let i = 0; i < this.wilObj.length; i++) {
      this.wilNames.push(i + 1 + " - " + this.wilObj[i].name);
    }
    if(this.isSuperUser){
      this.house.phone = this.user.phone
    }

    if(this.houseToEdit) {
      this.house = this.houseToEdit;
      this.house.rooms = this.houseToEdit.rooms.toString();
      this.house.transaction = this.houseToEdit.transaction;
      if(this.house.transaction === 'rent'){
        this.rentPaymentType = this.house.paymentFormat 
      } else {
        this.sellPaymentType = this.house.paymentFormat 
      }
      this.reverseCityName();
      this.files = this.filesToEdit;
      this.setImgsSrc(this.files);
      this.transaction = this.house.transaction === 'rent' ? 'Location' : 'Vente';
    }
    this.editHouse = !!this.houseToEdit;
  },
  computed: {
    isSuperUser(){
      return this.$store.state.auth.userId === '30'
    },
    userId() {
      return this.$store.state.auth.userId;
    },
    user(){
      return this.$store.getters.getUser
    },
    wilaya() {
      return this.house.city.slice(4).trimStart() || null
    }
  },
  methods: {
    async setImgsSrc(files) {
      this.$refs.fileInput.isFocused = false
      console.log(this.$refs.fileInput);
      this.files =[...this.files, ...files]
      if(this.files.length)
        this.imgsSrc = filesToBase64(this.files);
    },
    removeImage(key){
      this.files.splice(key, 1)
      this.imgsSrc.splice(key, 1)
    },
    reverseCityName() {
      let l = 0;
      for (const city of this.wilNames) {
        if (city.includes(this.house.city)) {
          l = this.wilNames.indexOf(city);
        }
      }
      this.house.city = l + 1 + " - " + this.house.city;
    },
    async reverseSubmit(images) {
      //Delete images
      for (const image of images) {
        //GET only the Id before .jpg
        const imageId = image
          .split("/")
          .pop()
          .split(".")[0];
        const uploadURL0 =
          "https://1973hw9du7.execute-api.eu-west-1.amazonaws.com/uploads";
        var { data: { uploadURL } } = await axios.get(uploadURL0, {
          params: { imageId, requestType: "delete" }
        });
        try {
          await axios.delete(uploadURL);
        } catch (e) {
          this.reverseSubmit(images);
        }
      }
    },
    async submit() {
      this.loading = true
      let images = [];
      const uploadURL0 =
        "https://jyuqlb99k5.execute-api.eu-west-1.amazonaws.com/uploads";
      for (const file of this.files) {
        const randomID = parseInt(Math.random() * 100000);
        var { data: { uploadURL } } = await axios.get(uploadURL0, {
          params: { imageId: randomID, requestType: "put" }
        });
        try {
          await axios.put(uploadURL, file, {
            headers: {
              "Content-Type": "image/jpeg"
            }
          });
        } catch (e) {
          this.reverseSubmit(images);
          return;
        } finally {
          images.push(
            `https://s3-upload-delete-s3uploadbucket-1fk7fpu10vu49.s3.eu-west-1.amazonaws.com/${randomID}.jpg`
          );
        }
      }
      //
      this.house.user = this.userId;
      this.house.price = this.house.price.toString().replace(/\s+/g, "");
      let house = {
        ...this.house
      }
      house.transaction = this.transaction === 'Location' ? 'rent' : 'buy';
      house.paymentFormat = this.transaction === 'Location' ? this.rentPaymentType : this.sellPaymentType;
      house.city = house.city.slice(4).trimStart();
      if(!house.rooms){
        house.rooms = 1
      }
      house.images = images;

      if (!this.houseToEdit) {
        await axios
          .post("/house-create/", house)
          .then(res => console.log(res))
          .catch(() => {
              this.error = true
              setTimeout(() => {this.error = false}, 10000); 
          });
      } else {
        await axios
          .patch("/house-update/" + this.house.id + "/", house)
          .then(res => console.log(res))
          .catch(() => {
              this.error = true
              setTimeout(() => {this.error = false}, 10000);
          });
      }
      await this.$store.dispatch("getUserHouses");
      this.loading = false
      this.success = true
      setTimeout(() => {
        this.success = false
        if(this.$route.path.includes('create-property')){
          this.$router.push('/admin')
        }
      }, 2000); 
    }
  },
  watch: {
    wilaya(val) {
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
