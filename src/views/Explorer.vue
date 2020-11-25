<template>
  <div id="app-explorer">
    <v-app-bar app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>
      <a href="/" class="nav-gv">
        <img height="40" width="40" src="assets/icon.png" style="margin-right: 1em">
        Galactic Vision
      </a>
      </v-toolbar-title>
      <router-link class="app-link ml-3" to="/explorer">Activity</router-link>
			<router-link class="app-link" to="/nodes">Quorum</router-link>
			<router-link class="app-link" to="/quorum">Planetary Quorum</router-link>
    </v-app-bar>
    <iframe class="explorer" src="http://galactic.vision/explorer/temp-explorer.html"></iframe>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  #app-explorer {
    height: 100%;
    width: 100%;
  }

  .explorer {
    height: 100%;
    width: 100%;
    border: none;
  }

  .app-link {
    float: left;
    color: #f2f2f2 !important;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

.app-link:hover {
  background-color: #333;
  color: white;
  text-decoration: none !important;
}

/* Add a color to the active/current link */
.app-link a.active {
  background-color: #4CAF50;
  color: white;
}

@media only screen and (max-width: 768px) {
  .app-link {
    display: none;
  }
}

</style>