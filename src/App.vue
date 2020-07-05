<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Live Feed</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Active Nodes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Planetary Quorum Explorer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Galactic Vision</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
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
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import TweenMax from "gsap/TweenMax";
// import three from 'three';

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
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
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>