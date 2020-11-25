<template>
  <v-container class="home">
    <v-app-bar app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>
      <a href="/" class="nav-gv">
        <img height="40" width="40" src="assets/icon.png" style="margin-right: 1em">
        Galactic Vision
      </a>
      </v-toolbar-title>
      <router-link class="app-link ml-3" to="/explorer">Activity</router-link>
			<router-link class="app-link" to="/nodes">Nodes</router-link>
			<router-link class="app-link" to="/quorum">Quorum</router-link>
    </v-app-bar>
    <canvas id="canvas" class="star-canvas"></canvas>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center title mb-5">
        <h1 class="gv-title">Galactic Vision</h1>
        <div class="subtitle-1 font-weight-medium pt-2">Explore the Stellar network in 3D</div>
      </v-col>
      <v-col v-for="app in apps" :key="app.name" class="shrink">
        <v-card class="mx-auto" max-width="344">
          <video height="200">
            <source :src="app.preview" type="video/mp4">
          </video>

          <v-card-title>{{ app.name }}</v-card-title>

          <v-card-subtitle>{{ app.description }}</v-card-subtitle>

          <v-card-actions>
           
            <router-link :to="app.url" class="galactic-link">
              <v-btn block color="cyan" text>Explore</v-btn>
            </router-link>
            

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

"use strict";

export default {
  name: "Home",
  data: () => ({
    apps: [
      {
        name: "Activity",
        preview: "https://i.imgur.com/fLeJfa6.mp4",
        description: "Observe the network's activity live. View incoming payments, trades, and more",
        url: '/explorer'
      },
      {
        name: "Nodes",
        preview: "https://i.imgur.com/6kYNUS2.gif",
        description: "View the nodes currently powering the Stellar network and the connections between them",
        url: '/nodes'
      },
      {
        name: "Quorum",
        preview: "https://i.imgur.com/SErVCgZ.jpg",
        description: "Monitor the current structure of the Stellar network. See the Stellar Consensus Protocol in action!",
        url: '/quorum'
      }
    ]
  }),
  mounted: () => {
    var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,
    
  hue = 190,
  stars = [],
  count = 0,
  maxStars = 1400;

// Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 81%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ',64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  
  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x,y) {
  var max = Math.max(x,y),
      diameter = Math.round(Math.sqrt(max*max + max*max));
  return diameter/2;
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w,h));
  this.radius = random(60, this.orbitRadius) / 12;
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 50000;
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 0%, 6%, 1)';
    ctx.fillRect(0, 0, w, h)
  
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };  
  
  window.requestAnimationFrame(animation);
}

animation();
  }
};
</script>

<style>
  body {
    background: #060e1b;
    overflow: hidden;
  }

  .star-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .title {
    z-index: 5;
  }

  .gv-title {
    font-family: 'Orbitron', sans-serif !important;
    color: cyan;
    letter-spacing: 2px;
  }

  a {
    text-decoration:  none;
    color: cyan;
  }

  .galactic-link {
    width: 100%;
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