<template>
  <v-card max-width="350">
    <v-img
      :src="house.images[0]"
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
        <house-form :houseToEdit="house" :filesToEdit="files"></house-form>
      </v-dialog>
      <v-dialog class="text-center" v-model="deleteDialog" width="500" height="400">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" tile text color="red">Supprimer</v-btn>
        </template>
        <v-card class="text-center">
          <v-card-title>  
            <v-icon class="mx-auto" color="red" style="font-size: 30px;">mdi-delete-alert-outline</v-icon>
          </v-card-title>
        <v-card-text> 
          <h3>Étes vous sur de vouloir supprimer cette annonce?</h3> 
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                text
                @click="deleteDialog = false">
                Annuler
              </v-btn>          
              <v-btn
                color="red"
                text
                :loading="deleteLoading"
                @click="deleteHouse">
                Supprimer
              </v-btn>
          </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
import houseForm from "../../components/houseForm";
import Axios from "axios";
import { urlsToFiles } from "../../helpers/helpers"

export default {
  data: () => ({
    namesDates: [],
    pickedDates: [],
    dates: [],
    deleteLoading: false,
    deleteDialog: false,
    files: []
  }),
  props: {
    house: Object
  },
  components: { "house-form": houseForm },
  async created() {
    this.files = await urlsToFiles(this.house.images)
  },
  methods: {
    async deleteHouse() {
      this.deleteLoading = true
      const id = this.house.id;
      await Axios.delete("/house-delete/" + id).then(res => {
        console.log(res);
      });      
      this.deleteLoading = false
    }
  }
};
</script>
