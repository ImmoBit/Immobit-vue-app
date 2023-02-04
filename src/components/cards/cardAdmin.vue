<template>
  <v-card max-width="350">
    <v-img
      :src="images[0]"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="300px"
      width="350px"
    >
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>
      <!--<v-dialog scrollable max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon>mdi-pencil</v-icon>Edit dates
          </v-btn>
        </template>
        <v-card>
          <v-row>
            <v-col cols="12" sm="6">
              <v-date-picker :allowed-dates="allowedDates" readonly></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <v-container>
                <v-row v-for="(namesDate, index) in namesDates" :key="index">
                  <v-text-field :value="namesDate.dates" :label="namesDate.user" prepend-icon="mdi-calendar" readonly>
                  </v-text-field>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>-->
      <v-dialog scrollable>
        <template v-slot:activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon>mdi-pencil</v-icon>Edit
          </v-btn>
        </template>
        <house-form :houseToEdit="house" :filesToEdit="images"></house-form>
      </v-dialog>
      <v-btn tile text color="red" @click="deleteHouse">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import houseForm from "../../components/houseForm";
import Axios from "axios";
export default {
  data: () => ({
    namesDates: [],
    pickedDates: [],
    dates: [],
    images: [
      require("@/assets/1.jpg"),
      require("@/assets/2.jpg"),    
      require("@/assets/3.jpg"),
      require("@/assets/4.jpg"),    
      require("@/assets/5.jpg"),
    ],
  }),
  props: {
    house: Object
  },
  components: { "house-form": houseForm },
  created() {
    /*Axios.get("/dates-house/" + this.house.id).then(res => {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        let datesUser = {
          user: res.data[index].user,
          dates: res.data[index].dates
        };
        console.log(datesUser);
        this.pickedDates.push(datesUser);
        this.dates = this.dates.concat(res.data[index].dates);
      }
    });*/
    for (const image of this.house.images) {
      if (image) this.setImgSrc(image);
    }
  },
  methods: {
    async setImgSrc(url) {
      //const reader = new FileReader();

      const response = await fetch(url);
      console.log(response);
      const data = await response.blob();
      const metadata = {
        type: "image/jpeg"
      };
      /*reader.onload = (event) => {
        this.imgSrc = (event.target).result;
      };*/
      const file = new File([data], "test.jpg", metadata);
      //reader.readAsDataURL(file);
      this.images.push(file);
    },
    deleteHouse() {
      const id = this.house.id;
      Axios.delete("/house-delete/" + id).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
