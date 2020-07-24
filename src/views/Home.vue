<template>
  <v-container class="home">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <h1>Galactic Vision</h1>
        <div class="subtitle-1">Explore Stellar in 3D</div>
      </v-col>
      <v-col v-for="app in apps" :key="app.name" class="shrink">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="app.preview" height="200px"></v-img>

          <v-card-title>{{ app.name }}</v-card-title>

          <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>

          <v-card-actions>
            <v-btn block color="cyan" text>Explore</v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data: () => ({
    apps: [
      {
        name: "Activity",
        preview: "https://i.imgur.com/rfHXmin.gif"
      },
      {
        name: "Nodes",
        preview: "https://i.imgur.com/6kYNUS2.gif"
      },
      {
        name: "Quorum"
      }
    ]
  })
};
</script>
