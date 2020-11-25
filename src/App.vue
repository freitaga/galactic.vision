<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app clipped>
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
    </v-navigation-drawer> -->

    <!-- <v-app-bar style="z-index: 7 !important;" app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><a href="index.html" class="nav-gv"> <img height="40" width="40" src="assets/icon.png" style="margin-right: 1em"> Galactic Vision</a></v-toolbar-title>
    </v-app-bar> -->

    <v-main>
      <v-container class="fill-height" style="padding: 0;" fluid>
      <router-view>
        <v-row align="center">
          <v-col cols="12" class="text-center">
            <Home />
          </v-col>
        </v-row>
      </router-view> 
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
  name: 'app',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');

  .nav-gv {
    font-family: 'Orbitron', sans-serif !important;
    color: #24d1c4 !important;
    font-weight: 700;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    text-decoration: none !important;
  }


</style>