<template>
  <v-card class="d-flex flex-column justify-space-between" max-width="320">
    <v-img
      :src="house.images[0]"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      max-height="280px"
    >
    </v-img>

    <v-card-actions>
      <router-link class="ml-4" :to="{ name: 'House', params: { id: house.id} }">
        Lien
      </router-link>
      <v-spacer></v-spacer>
      <v-dialog scrollable>
        <template v-slot:activator="{ on }">
          <v-btn tile text color="#4E342E" v-on="on">
            <v-icon small class="mr-1">mdi-pencil</v-icon>Modifier
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
      await this.$store.dispatch("getUserHouses");
      this.deleteLoading = false
      this.deleteDialog = false
    }
  }
};
</script>
