<template>
  <v-sheet min-height="560">
    <v-list three-line>
      <v-subheader>Enregistré</v-subheader>
      <v-list-item-group active-class="pink--text" multiple>
        <v-list-item v-for="(savedHouse, index) in savedHouses" :key="index">
          <v-list-item-avatar>
            <v-img :src="images[0]"></v-img>
          </v-list-item-avatar>

          <v-list-item-content @click="goHouse(savedHouse)">
            <v-list-item-title>
              {{ savedHouse.price }}DZD/mois
            </v-list-item-title>
            <v-list-item-subtitle>
              <div class="d-flex">
                <div class="text--primary">
                  {{ savedHouse.type }}, {{ savedHouse.city }} &mdash;
                </div>
                <div>{{ savedHouse.rooms }} chambres</div>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="remHouse(savedHouse)" icon>
              <v-icon color="grey lighten-1">mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider inset></v-divider>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  props: {
    savedHouses: Array
  },
  data: () =>( {
    images: [
      require("@/assets/1.jpg"),
      require("@/assets/2.jpg"),    
      require("@/assets/3.jpg"),
      require("@/assets/4.jpg"),    
      require("@/assets/5.jpg"),
    ],
  }),
  methods: {
    goHouse(savedHouse) {
      this.$router.push({ name: "House", params: { id: savedHouse.id } });
      this.$emit("close");
    },
    async remHouse(savedHouse) {
      await this.$store.dispatch("updateSavedHouses", savedHouse, false);
    }
  }
};
</script>

<style></style>
