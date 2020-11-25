<template>
  <div id="app">
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
    <!-- <Loader></Loader> -->
    <v-navigation-drawer v-model="drawer" v-if="!is_loading" app clipped class="nav-drawer" width="450">
      <!-- <v-row> -->
        <v-col cols="12" style="padding: 0;">
          <v-card class="pa-3">
            <!-- <v-select v-model="currMode" :items="modes" label="Mode"></v-select> -->
            <v-list-item>
              <v-list-item-content>
                <v-row class="align-center" style="text-overflow: ellipsis; max-width: 400px;">
                  <v-col cols="2">
                    <v-btn v-if="nodeView" v-on:click="toggleNodeView()" icon color="cyan">
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="10">
                    <v-list-item-title class="title">
                      {{ nodeView ? (this.currNode.name ? this.currNode.name : this.currNode.publicKey) : 'Nodes' }}
                    </v-list-item-title>
                  </v-col>
                </v-row>
                <!-- <v-list-item-subtitle>
                  subtext
                </v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <div>
              <v-list
                v-if="!nodeView"
                dense
                nav
              >
                <v-list-item
                  link
                  v-on:click="viewAll"
                >
                  <v-list-item-content>
                    <v-list-item-title>View All</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="node in nodes"
                  :key="node.publicKey"
                  link
                  v-on:click="setupTween(node)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ node.name ? node.name : node.publicKey }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>

            <v-row v-if="nodeView">
              <v-col cols="6">
                 <v-list>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Country</v-list-item-title>
                      <v-list-item-subtitle style="color: cyan">{{this.currNode.geoData.countryName}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Status</v-list-item-title>
                      <v-list-item-subtitle style="color: cyan">{{ this.currNode.active ? 'Active' : 'Offline' }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Time Active (24 Hours)</v-list-item-title>
                      <v-list-item-subtitle style="color: cyan">{{ this.currNode.statistics.active24HoursPercentage }}%</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Time Active (30 Days)</v-list-item-title>
                      <v-list-item-subtitle style="color: cyan">{{ this.currNode.statistics.active30DaysPercentage }}%</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Time Overloaded (24 Hours)</v-list-item-title>
                      <v-list-item-subtitle style="color: cyan">{{ this.currNode.statistics.overLoaded24HoursPercentage }}%</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Time Overloaded (30 Days)</v-list-item-title>
                      <v-list-item-subtitle style="color: cyan">{{ this.currNode.statistics.overLoaded30DaysPercentage }}%</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6">
                <div class="ma-2 pl-2 font-weight-medium">Nodes Trusted</div>
                <v-list class="trust-list" dense nav>
                  <v-list-item v-for="node in currNode.quorumArr" v-bind:key="node" v-on:click="setupTween(node)" two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ node.name ? node.name : node.publicKey }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <div class="ma-2 pt-2 pl-2 font-weight-medium">Trusted By</div>
                <v-list class="trust-list" dense nav>
                  <v-list-item v-for="node in currNode.trusted_by" v-bind:key="node.publicKey" v-on:click="setupTween(node)" two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ node.name ? node.name : node.publicKey }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                
              </v-col>
            </v-row>

          </v-card>
        </v-col>
        <!-- <v-col v-if="!nodeView" cols="6">
          Trusted
          <v-list
            dense
            nav
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Country</v-list-item-title>
                <v-list-item-subtitle>{{this.currNode.geoData.countryName}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
          <v-list>
            Trusted By
            <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Country</v-list-item-title>
              <v-list-item-subtitle>{{this.currNode.geoData.countryName}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          </v-list>
        </v-col> -->
      <!-- </v-row> -->
      </v-navigation-drawer>
      <div id="canvas">

      </div>
  </div>
</template>

<script type="text/javascript">

import * as THREE from 'three-full';
import _ from 'underscore';
// import * as TWEEN from '../webgl/tween.min.js';
import TWEEN from '@tweenjs/tween.js';


//import Loader from '@/components/Loader.vue';

/* eslint no-prototype-builtins: 0 */  // --> OFF

export default {
  name: 'Node',
  components: {
   //Loader
  },
  data: () => ({
    drawer: true,
    settings: {
      track_point_spacing: 0.04,
      default_track_point_size: 0.025,
      default_track_point_opacity: 0.5,
      default_track_line_opacity: 0.08,
      num_track_line_control_points: 32,
      default_track_point_speed_scale: 1.0
    },
    nodes: [],
    currNodes: [],
    currNode: {},
    curr_tracks: [],
    all_tracks: [],
    node_list: [],
    cur_node_pin: null,
    camera: null,
    scene: null,
    renderer: null,
    controls: null,
    stats: null,
    positions: [],
    colors: null,
    sizes: null,
    line_positions: null,
    manager: new THREE.LoadingManager(),
    loader: null,
    radius: 0.5,
    is_loading: true,
    track_point_size: null,
    track_point_opacity: null,
    track_line_opacity: null,
    track_point_speed_scale: null,
    track_lines_object: null,
    track_points_object: null,
    min_arc_distance_miles: +Infinity,
    max_arc_distance_miles: -Infinity,
    cur_arc_distance_miles: 0,
    changing_arc_distance_miles: 0,
    spline_point_cache: [],
    node_tracks: [],
    changing: false,
    globe: null,
    spriteMap: null,
    node: null,
    total_nodes: null,
    INTERSECTED: null,
    INTERSECTED_CLICK: null,
    mouse: null,
    raycaster: null, 
    theta: null,
    trusted_by: [],
    trusted: [],
    tracks_store: [],
    lastMove: Date.now(),
    nodeView: false,
    currMode: "Nodes",
    isMobile: false,
    modes: ["Nodes", /*"Quorum Sets"*/],
    vertexShader: `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
    }
    `,
    fragmentShader: `
    uniform vec3 color;
    uniform sampler2D texture;
    uniform float opacity;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4( color * vColor, opacity );
        gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
    }
    `
  }),
  mounted: function() {
    this.loadNodes();
  },
  computed: {
    currentNode: function() {
      return this.currNode;
    },
    hasQuorumSet: function() {
      return this.currentNode.quorumSet != null;
    },
    innerQuorumSets: function() {
      let sets = null;
      if(this.currentNode.quorumSet) {
        sets = this.currentNode.quorumSet.innerQuorumSets;
      }
      return sets;
    },
  },
  methods: {
    init: async function() {

      if(window.innerWidth < 768) {
        this.isMobile = true;
      }

      this.track_point_size = this.settings.default_track_point_size;
      this.track_point_opacity = this.settings.default_track_point_opacity;
      this.track_line_opacity = this.settings.default_track_line_opacity;
      this.track_point_speed_scale = this.settings.default_track_point_speed_scale;

      // if (!Detector.webgl) {
      //   Detector.addGetWebGLMessage();
      // }

      //this.show_loading(true);

      this.mouse = new THREE.Vector2();
      this.raycaster = new THREE.Raycaster();

      //this.spriteMap = new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/lensflare/lensflare0_alpha.png' );

      this.renderer = new THREE.WebGLRenderer({
          antialias: true
      });
      this.renderer.setClearColor(0x000000, 1.0);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      // if(this.isMobile) {
      //   this.renderer.setSize(window.innerWidth - 315, window.innerHeight);
      // } else {
      this.renderer.setSize((window.innerWidth), window.innerHeight);
      //}


      console.log(document.getElementById('app'));
      document.getElementById('canvas').appendChild(this.renderer.domElement);



      // document.body.appendChild(this.renderer.domElement);

      document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
      document.addEventListener('mouseup', this.onDocumentMouseup, false);

      this.loader = new THREE.TextureLoader(this.manager);

      this.loader.crossOrigin = '';

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(45, (window.innerWidth) / window.innerHeight, 0.01, 100);
      this.camera.position.x = -0.3;
      this.camera.position.y = 0.8;

      //zoom out more for mobile
      if(window.innerWidth <= 1080) {
        this.camera.position.z = 3;
      } else {
        this.camera.position.z = 1.4;
      }

      this.scene.add(new THREE.AmbientLight(0x777777));

      var light1 = new THREE.DirectionalLight(0xffffff, 0.2);
      light1.position.set(5, 3, 5);
      this.scene.add(light1);

      var light2 = new THREE.DirectionalLight(0xffffff, 0.2);
      light2.position.set(5, 3, -5);
      this.scene.add(light2);

      var segments = 64;

      this.globe = new THREE.Object3D();

      var reflectionCube = new THREE.CubeTextureLoader()
      .setPath("assets/quorum_skybox/")
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

      reflectionCube.format = THREE.RGBFormat;

      this.scene.background = reflectionCube;

      var img = new Image();
      img.crossOrigin = "anonymous";
      img.src = 'https://i.imgur.com/keA1lkO.jpg';

      await this.loader.load(
        img.src,
        async (earth_texture) => {
          await this.loader.load(
            'https://i.imgur.com/iOZDaeG.png',
            async (water_texture) => {
    
              earth_texture.image.crossOrigin = "anonymous";
              water_texture.image.crossOrigin = "anonymous";

              this.globe.add(new THREE.Mesh(
                new THREE.SphereGeometry(this.radius, segments, segments),
                new THREE.MeshPhongMaterial({
                    map: earth_texture,
                    specularMap: water_texture,
                    specular: new THREE.Color(0x999999)
                })
              ));

              this.scene.add(this.globe);

              this.generateControlPoints(this.radius);

              this.track_lines_object = this.generate_track_lines();
              this.scene.add(this.track_lines_object);

              this.track_points_object = await this.generate_track_point_cloud();
              this.scene.add(this.track_points_object);

              this.track_lines_object.material.opacity = 0.25;

              /*
              var gui = new dat.GUI();

              gui.add(this, 'changing_arc_distance_miles', min_arc_distance_miles, max_arc_distance_miles).name("Max Distance Miles").onFinishChange(function(value) {
                  cur_arc_distance_miles = value;
                  update_track_lines();
              });

              gui.add(this, 'track_line_opacity', 0, 0.25).name("Line Opacity").onChange(function(value) {
                  track_lines_object.material.opacity = value;
              });

              gui.add(this, 'track_point_opacity', 0, 1.0).name("Points Opacity").onChange(function(value) {
                  track_points_object.material.uniforms.opacity.value = value;
              });

              gui.add(this, 'track_point_size', 0, 0.1).name("Point Size").onChange(function(value) {
                  var index = 0;
                  for (var i = 0; i < all_tracks.length; ++i) {

                      for (var j = 0; j < all_tracks[i].point_positions.length; ++j) {
                          sizes[index] = value;
                          ++index;
                      }
                  }
                  track_points_object.geometry.attributes.size.needsUpdate = true;
              });
              gui.add(this, "handle_about").name("About & Credits");*/

              //this.show_loading(false);
            });
      });


      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.rotateSpeed = 0.4;
      this.controls.noZoom = false;
      this.controls.noPan = true;
      this.controls.staticMoving = false;
      this.controls.minDistance = 0.75;
      this.controls.maxDistance = 4.0;

      // this.stats = new Stats();
      // this.stats.domElement.style.position = 'absolute';
      // this.stats.domElement.style.top = '0px';
      // document.body.appendChild(this.stats.domElement);

      window.addEventListener('resize', this.onWindowResize, false);

      this.scene.add(this.globe);
    },
    generateControlPoints: function(radius) {
      var v_index;

      for (var i = 0; i < this.nodes.length; ++i) {
        this.nodes[i].listPos = i;
        this.nodes[i].trusted_by = [];
        this.nodes[i].trusted_connections = [];
      }

      for (var f = 0; f < this.nodes.length; ++f) {
        var start_lat = this.nodes[f].geoData.latitude;
        var start_lng = this.nodes[f].geoData.longitude;

        this.nodes[f].connections = [];

        console.log("generating control points");

        if(this.nodes[f].quorumSet) {
          var quorumSet = this.nodes[f].quorumSet.validators;

          //add in inner quorum set nodes to make connections for
          var innerQuorumNodes = this.getInnerQuorumSet(this.nodes[f].quorumSet);
          
          quorumSet = quorumSet.concat(innerQuorumNodes);

          this.nodes[f].quorumArr = [];
          
          var coords = this.xyz_from_lat_lng( start_lat, start_lng, 0.5);

          var node_coord = new THREE.Vector3( coords.x, coords.y, coords.z );

          var label_coord = node_coord.clone();

          label_coord.multiplyScalar(1.1);

          //if(this.nodes[f].name) {
              // var spritey = this.makeTextSprite( " " + this.nodes[f].name + " ", { fontsize: 32, backgroundColor: {r:255, g:100, b:100, a:1} } );

              // spritey.position.x = node_coord.x;
              // spritey.position.y = node_coord.y;
              // spritey.position.z = node_coord.z;

              // this.nodes[f].tag = spritey;
              // this.scene.add( spritey );

              
              var labelCanvas;
              var labelTexture;
              var labelMaterial;
              var labelSprite;
              //var altitude = 0.05;
              var text = this.getNodeName(this.nodes[f]);
              var opts = {
                  lineColor: "#FFCC00",
                  lineWidth: 1,
                  markerColor: "#FFCC00",
                  labelColor: "#FFF",
                  font: "Segoe",
                  fontSize: 20,
                  drawTime: 2000,
                  lineSegments: 150
              }
              
              labelCanvas = this.createLabel(text.toUpperCase(), opts.fontSize, opts.labelColor, opts.font);
              labelTexture = new THREE.Texture(labelCanvas);
              labelTexture.minFilter = THREE.LinearFilter;
              labelTexture.needsUpdate = true;

              labelMaterial = new THREE.SpriteMaterial({
                  map : labelTexture,
                  opacity: 1,
                  depthTest: true,
                  fog: true
              });

              labelSprite = new THREE.Sprite(labelMaterial);
              labelSprite.position.x = label_coord.x * 1.1;
              labelSprite.position.y = label_coord.y * 1.1;
              labelSprite.position.z = label_coord.z * 1.1;
              labelSprite.scale.set(labelCanvas.width / 1500, labelCanvas.height / 1500);
              labelSprite.visible = false;
              this.scene.add(labelSprite);

              this.nodes[f].tag = labelSprite;
              

              var pinOpts = {
                  lineColor: "#8FD8D8",
                  lineWidth: 1,
                  topColor: "#8FD8D8",
                  smokeColor: "#FFF",
                  labelColor: "#FFF",
                  font: "Inconsolata",
                  showLabel: (text.length > 0),
                  showTop: (text.length > 0),
                  showSmoke: (text.length > 0)
              }

              var topTexture;
              var topMaterial;
              var topSprite;

              topTexture = new THREE.Texture(this.createTopCanvas(pinOpts.topColor));
              topTexture.minFilter = THREE.LinearFilter;
              topTexture.needsUpdate = true;
              topMaterial = new THREE.SpriteMaterial({map: topTexture, depthTest: true, fog: true, opacity: 1});
              topSprite = new THREE.Sprite(topMaterial);
              topSprite.scale.set(0.02, 0.02);
              topSprite.position.set(node_coord.x * 1.1, node_coord.y * 1.1, node_coord.z * 1.1);

              this.scene.add(topSprite);


              var lineGeometry;
              var lineMaterial;
              var line;

              lineGeometry = new THREE.Geometry();
              lineMaterial = new THREE.LineBasicMaterial({
                  color: pinOpts.lineColor,
                  linewidth: pinOpts.lineWidth
              });

              lineGeometry.vertices.push(new THREE.Vector3(node_coord.x, node_coord.y, node_coord.z));
              lineGeometry.vertices.push(new THREE.Vector3(node_coord.x * 1.1, node_coord.y * 1.1, node_coord.z * 1.1));
              line = new THREE.Line(lineGeometry, lineMaterial);

              this.scene.add(line);

              var pinObj = new Object();

              pinObj.line = line;
              pinObj.top = topSprite;

              this.nodes[f].pin = pinObj;

              //add node to nodeList to assign pin to node label
              var nodePin = new Object();

              nodePin.id = topSprite.id;
              nodePin.node = this.nodes[f];

              this.node_list.push(nodePin);
            }

            //enter quorum set array loop and execute the next code per found quorum
            for(var j = 0; j < quorumSet.length; j++) {

              var validator = quorumSet[j];

              //find validator key in nodes array
              let validatorMatch = _.where(this.nodes, {publicKey: validator});

              if(validatorMatch.length > 0) {

                  //add current node to validator nodes trusted nodes array
                  v_index = validatorMatch[0].listPos;

                  this.nodes[v_index].trusted_by.push(this.nodes[f]);
                  
                  //add validator node object to array
                  this.nodes[f].quorumArr.push(validatorMatch[0]);

                  var end_lat = validatorMatch[0].geoData.latitude;
                  var end_lng = validatorMatch[0].geoData.longitude;

                  if (start_lat === end_lat && start_lng === end_lng) {
                      continue;
                  }

                  var max_height = Math.random() * 0.1 + 0.05;

                  var points = [];
                  var spline_control_points = 8;
                  for (var p = 0; p < spline_control_points + 1; p++) {
                      var arc_angle = p * 180.0 / spline_control_points;
                      var arc_radius = radius + (Math.sin(arc_angle * Math.PI / 180.0)) * max_height;
                      var latlng = this.lat_lng_inter_point(start_lat, start_lng, end_lat, end_lng, p / spline_control_points);

                      var pos = this.xyz_from_lat_lng(latlng.lat, latlng.lng, arc_radius);

                      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
                  }

                  var spline = new THREE.CatmullRomCurve3(points);
                  var arc_distance = this.lat_lng_distance(start_lat, start_lng, end_lat, end_lng);

                  var point_positions = [];

                  for (var t = 0; t < arc_distance; t += this.settings.track_point_spacing) {

                      var offset = t / arc_distance;

                      point_positions.push(spline.getPoint(offset));
                  }

                  var arc_distance_miles = (arc_distance / (2 * Math.PI)) * 24901;

                  if (arc_distance_miles < this.min_arc_distance_miles) {
                    this.min_arc_distance_miles = arc_distance_miles;
                  }

                  if (arc_distance_miles > this.max_arc_distance_miles) {
                    this.max_arc_distance_miles = parseInt(Math.ceil(arc_distance_miles / 1000.0) * 1000);
                    this.cur_arc_distance_miles = this.max_arc_distance_miles;
                    this.changing_arc_distance_miles = this.max_arc_distance_miles;
                  }

                  var speed = Math.random() * 600 + 400;

                  var track = {
                      spline: spline,
                      arc_distance: arc_distance,
                      arc_distance_miles: arc_distance_miles,
                      num_points: parseInt(arc_distance / this.settings.track_point_spacing) + 1,
                      point_positions: point_positions,
                      default_speed: speed,
                      speed: speed * this.track_point_speed_scale
                  };
                  this.addToTrusted(track, v_index);
                  this.nodes[f].connections.push(track);
                  this.all_tracks.push(track);
                }
            //}
        }
      }
      this.tracks_store = this.all_tracks;
      this.populateNodeList();
    },
    update_track_point_cloud: function() {

      var index = 0;

      for (var i = 0; i < this.all_tracks.length; ++i) {

        var time_scale = (Date.now() % this.all_tracks[i].speed) / (this.all_tracks[i].speed * this.all_tracks[i].num_points);
        var normalized_arc_dist = this.settings.track_point_spacing / this.all_tracks[i].arc_distance;

        for (var j = 0; j < this.all_tracks[i].num_points; j++) {

          if (this.all_tracks[i].arc_distance_miles <= this.cur_arc_distance_miles) {
              var offset_time = j * normalized_arc_dist + time_scale;

              var pos = this.fast_get_spline_point(i, offset_time);

              this.positions[3 * index + 0] = pos.x;
              this.positions[3 * index + 1] = pos.y;
              this.positions[3 * index + 2] = pos.z;

          } else {
              this.positions[3 * index + 0] = Infinity;
              this.positions[3 * index + 1] = Infinity;
              this.positions[3 * index + 2] = Infinity;
          }

          index++;
        }
      }

      if(this.track_points_object) {
        this.track_points_object.geometry.attributes.position.needsUpdate = true;
      }
    },
    fast_get_spline_point: function (index, t) {

      var t_compare = parseInt(t * 1000);

      if (this.spline_point_cache[index] === undefined) {
        this.spline_point_cache[index] = [];
      }

      if (this.spline_point_cache[index][t_compare] !== undefined) {
        return this.spline_point_cache[index][t_compare];
      }

      var pos = this.all_tracks[index].spline.getPoint(t);

      this.spline_point_cache[index][t_compare] = pos;

      return pos;
    },
    generate_track_lines: function () {

      var geometry = new THREE.BufferGeometry();
      var material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          vertexColors: THREE.VertexColors,
          transparent: true,
          opacity: this.track_line_opacity,
          depthTest: true,
          depthWrite: false,
          linewidth: 0.2
      });
      this.line_positions = new Float32Array(this.all_tracks.length * 3 * 2 * this.settings.num_track_line_control_points);
      let colors = new Float32Array(this.all_tracks.length * 3 * 2 * this.settings.num_track_line_control_points);

      for (var i = 0; i < this.all_tracks.length; ++i) {
        if(this.all_tracks[i].spline){
          var color
          //var color = new THREE.Color(0xffffff).setHSL(i / all_tracks.length, 0.9, 0.8);
          if(this.all_tracks[i].connection_type) {
            if(this.all_tracks[i].connection_type == "outgoing") {
              color = new THREE.Color(0x00ff00);
            } else {
              color = new THREE.Color(0x00ffff);
            }
          } else {
            color = new THREE.Color(0xffffff).setHSL(i / this.all_tracks.length, 0.9, 0.8);
          }

          for (var j = 0; j < this.settings.num_track_line_control_points - 1; ++j) {

            var start_pos = this.all_tracks[i].spline.getPoint(j / (this.settings.num_track_line_control_points - 1));
            var end_pos = this.all_tracks[i].spline.getPoint((j + 1) / (this.settings.num_track_line_control_points - 1));

            this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 0] = start_pos.x;
            this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 1] = start_pos.y;
            this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 2] = start_pos.z;
            this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 3] = end_pos.x;
            this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 4] = end_pos.y;
            this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 5] = end_pos.z;

            colors[(i * this.settings.num_track_line_control_points + j) * 6 + 0] = color.r;
            colors[(i * this.settings.num_track_line_control_points + j) * 6 + 1] = color.g;
            colors[(i * this.settings.num_track_line_control_points + j) * 6 + 2] = color.b;
            colors[(i * this.settings.num_track_line_control_points + j) * 6 + 3] = color.r;
            colors[(i * this.settings.num_track_line_control_points + j) * 6 + 4] = color.g;
            colors[(i * this.settings.num_track_line_control_points + j) * 6 + 5] = color.b;
          }
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(this.line_positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      geometry.computeBoundingSphere();

      return new THREE.Line(geometry, material, THREE.LineSegments);
    },
    update_track_lines: function () {

      for (var i = 0; i < this.all_tracks.length; ++i) {

          for (var j = 0; j < this.settings.num_track_line_control_points - 1; ++j) {

              if (this.all_tracks[i].arc_distance_miles <= this.cur_arc_distance_miles) {

                  var start_pos = this.all_tracks[i].spline.getPoint(j / (this.settings.num_track_line_control_points - 1));
                  var end_pos = this.all_tracks[i].spline.getPoint((j + 1) / (this.settings.num_track_line_control_points - 1));

                  this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 0] = start_pos.x;
                  this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 1] = start_pos.y;
                  this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 2] = start_pos.z;
                  this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 3] = end_pos.x;
                  this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 4] = end_pos.y;
                  this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 5] = end_pos.z;
              } else {
                this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 0] = 0.0;
                this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 1] = 0.0;
                this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 2] = 0.0;
                this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 3] = 0.0;
                this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 4] = 0.0;
                this.line_positions[(i * this.settings.num_track_line_control_points + j) * 6 + 5] = 0.0;
              }
          }
      }

      this.track_lines_object.geometry.attributes.position.needsUpdate = true;
    },
    generate_track_point_cloud: async function () {
      var color;
      var num_points = 0;
      for (var i = 0; i < this.all_tracks.length; ++i) {
        num_points += this.all_tracks[i].num_points;
      }

      var track_point_cloud_geom = new THREE.BufferGeometry();

      this.positions = new Float32Array(num_points * 3);
      let colors = new Float32Array(num_points * 3);
      let sizes = new Float32Array(num_points);

      var index = 0;

      for (i = 0; i < this.all_tracks.length; ++i) {
        if(this.all_tracks[i].point_positions) {
          //var color = new THREE.Color(0xffffff).setHSL(i / all_tracks.length, 0.6, 0.6);
          if(this.all_tracks[i].connection_type) {
            if(this.all_tracks[i].connection_type == "outgoing") {
                color = new THREE.Color(0x00ff00);
            } else {
                color = new THREE.Color(0x00ffff);
            }
          } else {
              color = new THREE.Color(0xffffff).setHSL(i / this.all_tracks.length, 0.9, 0.8);
          }

          for (var j = 0; j < this.all_tracks[i].point_positions.length; ++j) {

            this.positions[3 * index + 0] = 0;
            this.positions[3 * index + 1] = 0;
            this.positions[3 * index + 2] = 0;

            colors[3 * index + 0] = color.r;
            colors[3 * index + 1] = color.g;
            colors[3 * index + 2] = color.b;

            sizes[index] = this.track_point_size;

            ++index;
          }
        }
      }

      track_point_cloud_geom.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
      track_point_cloud_geom.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
      track_point_cloud_geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      track_point_cloud_geom.computeBoundingBox();

      var uniforms = {
        color: {
          type: "c",
          value: new THREE.Color(0xffffff)
        },
        texture: {
          type: "t",
          value: await this.loader.load('https://i.imgur.com/it80wQh.png',
            function(point_texture) {
              return point_texture;
            })
        },
        opacity: {
          type: "f",
          value: this.track_point_opacity
        }
      };

      var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
      });

      return new THREE.Points(track_point_cloud_geom, shaderMaterial);
    },
    xyz_from_lat_lng: function(lat, lng, radius) {

      var phi = (90 - lat) * Math.PI / 180;
      var theta = (360 - lng) * Math.PI / 180;

      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
      };
    },
    lat_lng_distance: function (lat1, lng1, lat2, lng2) {

      var a = Math.sin(((lat2 - lat1) * Math.PI / 180) / 2) *
          Math.sin(((lat2 - lat1) * Math.PI / 180) / 2) +
          Math.cos(lat1 * Math.PI / 180) *
          Math.cos(lat2 * Math.PI / 180) *
          Math.sin(((lng2 - lng1) * Math.PI / 180) / 2) *
          Math.sin(((lng2 - lng1) * Math.PI / 180) / 2);

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return this.radius * c;
    },
    lat_lng_inter_point: function (lat1, lng1, lat2, lng2, offset) {

      lat1 = lat1 * Math.PI / 180.0;
      lng1 = lng1 * Math.PI / 180.0;
      lat2 = lat2 * Math.PI / 180.0;
      lng2 = lng2 * Math.PI / 180.0;

      var d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng1 - lng2) / 2), 2)));
      var A = Math.sin((1 - offset) * d) / Math.sin(d);
      var B = Math.sin(offset * d) / Math.sin(d);
      var x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
      var y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
      var z = A * Math.sin(lat1) + B * Math.sin(lat2);
      var lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 180 / Math.PI;
      var lng = Math.atan2(y, x) * 180 / Math.PI;

      return {
        lat: lat,
        lng: lng
      };
    },
    addToTrusted: function(track, nodePos) {
      this.nodes[nodePos].trusted_connections.push(track);
    },
    populateNodeList: function() {

      //sort list by # trusted_by

      //TO DO: fix node links when sorting by trusted by. Sorting by trusted nodes messes up the linked node

      //nodes = _.sortBy(nodes, "trusted_by");

      // nodes = nodes.reverse();

      for(var f = 0; f < this.nodes.length; f++) {
        if(this.nodes[f].connections) {
          if(this.nodes[f].name) { // optional condition: nodes[f].connections.length > 0 && -> only nodes that have a node that trust it
            //menu_node = '<a @click="setupTween(nodes[' + f + '])" href="#" class="list-group-item list-group-item-dark">' + this.nodes[f].name + '</a>';
            //$('#node_list').append(menu_node); 
            //this.nodes.push(this.nodes[f]);
          }
        }
      }
    },
    // show_loading: function(visible) {
    //   if (visible) {
    //     this.is_loading = true;
    //     document.getElementById("loading_overlay").className = "show";
    //     document.getElementById("loading_overlay").style.pointerEvents = "all";
    //   } else {
    //     this.is_loading = false;
    //     document.getElementById("loading_overlay").className = "hide";
    //     document.getElementById("loading_overlay").style.pointerEvents = "none";
    //   }
    // },
    setupTween: function(node) {
      this.clearTag();
      this.currNode = node;
      this.addValidators();
      //changeTags();
      this.changePins();
      this.highlightLines(node);
      //toggle left window if mobile
      this.toggleIfMobile(true);
      this.zoomToLocation(this.xyz_from_lat_lng(node.geoData.latitude, node.geoData.longitude, 1.3));
      this.nodeView = true;
      
      if(this.isMobile) {
        this.drawer = false;
      }
    },
    zoomToLocation: function(pos) {
      var position = { x : this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z };
      
      let target = {};

      if(window.innerWidth <= 1080) {
        target = { x : pos.x * 2.0, y: pos.y * 2.0, z: pos.z * 2.0};
      } else {
        target = { x : pos.x, y: pos.y, z: pos.z };
      }

      var tween = new TWEEN.Tween(position).to(target, 1500).onUpdate(() => {
        //this.camera.lookAt( pos );
        this.controls.update();
        this.camera.position.x = position.x;
        this.camera.position.y = position.y;
        this.camera.position.z = position.z;
      });

      tween.easing(TWEEN.Easing.Quadratic.InOut);

      tween.start();
    },
    highlightLines: async function(node) {
        var outgoing_connections;
        var incoming_connections;

        this.scene.remove(this.track_lines_object);
        this.scene.remove(this.track_points_object);
        this.spline_point_cache = [];

        outgoing_connections = this.addOutgoingTag(node.connections);
        incoming_connections = this.addIncomingTag(node.trusted_connections)

        this.all_tracks = outgoing_connections.concat(incoming_connections);
        this.currNodes = this.all_tracks;
        this.curr_tracks = this.all_tracks;

        this.track_lines_object = this.generate_track_lines();
        this.track_lines_object.material.opacity = 0.5;
        this.scene.add(this.track_lines_object);

        this.track_points_object = await this.generate_track_point_cloud();
        this.scene.add(this.track_points_object);
    },
    clearConnectionType: function(tracks) {
      for(var i = 0; i < tracks.length; i++) {
          tracks[i].connection_type = "";
      }

      return tracks;
    },
    changeTags: function () {
      var tags = this.currNode.quorumArr.concat(this.currNode.trusted_by);

      this.nodes.forEach(function(node) {
          if(node.tag) {
              this.scene.remove(node.tag);
          }
      });

      //add tags for each node in the scene
      this.scene.add(this.currNode.tag);

      tags.forEach(function(node) {
        if(node.tag) {
          this.scene.add(node.tag);
        }
      });
    },
    clearTag: function () {
      if(this.currNode.tag) {
          this.currNode.tag.visible = false;
      }
    },
    addAllPins: function() {
      this.nodes.forEach(function(node) {
        if(node.pin) {
          node.pin.line.visible = true;
          node.pin.top.visible = true;
        }
      });
    },
    changePins: function() {
      var tags = this.currNode.quorumArr.concat(this.currNode.trusted_by);

      this.nodes.forEach(function(node) {
        if(node.pin) {
          node.pin.line.visible = false;
          node.pin.top.visible = false;
        }
      });

      //add tags for each node in the scene
      this.currNode.pin.line.visible = true;
      this.currNode.pin.top.visible = true;
      this.currNode.tag.visible = true;


      tags.forEach(function(node) {
        if(node.pin) {
            node.pin.line.visible = true;
            node.pin.top.visible = true;
        }
      });
    },
    getInnerQuorumSet: function(quorumSet) {
      let innerQuorumSets = quorumSet.innerQuorumSets;
      let quorumValidators = [];
      let validator = null;

      for(let i = 0; i < innerQuorumSets.length; i++) {
        quorumSet = innerQuorumSets[i].validators;
        for(let j = 0; j < quorumSet.length; j++) {
          validator = quorumSet[j];
          quorumValidators.push(validator);
        }
      }

      return quorumValidators;
    },
    addOutgoingTag: function(tracks) {
      for(var i = 0; i < tracks.length; i++) {
        tracks[i].connection_type = "outgoing";
      }

      return tracks;
    },
    addIncomingTag: function(tracks) {
      for(var i = 0; i < tracks.length; i++) {
          tracks[i].connection_type = "incoming";
      }

      return tracks;
    },
    shouldShowLink: function (link, baseNode) {
      //change colours depending on connection type
      if(link.source === baseNode) {
        link.color = "#00ff00";
      } else if(link.target === baseNode) {
        link.color = "#00ffff";
      }

      return link.source === baseNode || link.target === baseNode;
    },
    enterNodeView: function(i) {
      //find node by index
      let node = this.gData.nodes[i];
      this.currNode = node;
      this.addValidators();
    },
    viewAll: async function() {
      this.clearTag();
      this.currNode = {};
      this.addAllPins();
      this.scene.remove(this.track_lines_object);
      this.scene.remove(this.track_points_object);
      this.spline_point_cache = [];

      this.all_tracks = this.tracks_store;
      this.all_tracks = this.clearConnectionType(this.all_tracks);
      this.currNodes = this.all_tracks;
      this.curr_tracks = this.all_tracks;

      this.track_lines_object = this.generate_track_lines();
      console.log("track lines object", this.track_lines_object)
      this.track_lines_object.material.opacity = 0.25;
      this.scene.add(this.track_lines_object);

      this.track_points_object = await this.generate_track_point_cloud();
      this.scene.add(this.track_points_object);
      this.toggleIfMobile(false);
      this.nodeView = false;

      if(this.isMobile) {
        this.drawer = false;
      }
    },
    addValidators: function() {
      // var validator_node;
      // var validator;
      //let quorumArr = this.currNode.quorumArr;
      // var trusted_by = this.currNode.trusted_by;
      // var currNode = this.currNode;
      // var trust_index = Math.round((currNode.trusted_by.length / this.total_nodes) * 100);

      // this.trusted = [];
      // this.trusted_by = [];

      // $('#node_header').empty();
      // $('#node_location').empty();
      // $('#rating').empty();
      // $('#trust_index').empty();
      // $('#validator_type').empty();
      // $('#core_version').empty();
      // //$('#validator_list').empty();
      // //$('#trusted_by_list').empty();
      // $('#is_validating').empty();
      // $('#overloaded').empty();

      // $('#node_header').append(this.getNodeName(currNode)); 
      // $('#node_location').append(this.getNodeLocation(currNode)); 
      // $('#rating').append(currNode.statistics.active24HoursPercentage + "%");
      // $('#trust_index').append(currNode.index * 100 + "%");
      // $('#validator_type').append(currNode.isFullValidator ? "Full Validator" : "Validator");
      // $('#core_version').append(currNode.versionStr.substring(0,currNode.versionStr.indexOf("(")));
      // $('#is_validating').append(currNode.isValidating ? "Validating" : "Not Validating");
      // $('#overloaded').append(currNode.statistics.overLoaded24HoursPercentage.toString() + "%");

      //for(var node in quorumArr) {
        //nodes it trusted
        //validator = quorumArr[node];
        //validator_node = '<a onclick="setupTween(nodes[' + validator.listPos + '])" href="#" class="list-group-item list-group-item-dark">' + this.getNodeName(validator) + '</a>';
        //$('#validator_list').append(validator_node); 

        //this.trusted.push(this.nodes[validator.listPos]);
      //1}

      //for(var node in trusted_by) {
        //validator = trusted_by[node];
        //validator_node = '<a onclick="setupTween(nodes[' + validator.listPos + '])" href="#" class="list-group-item list-group-item-dark">' + this.getNodeName(validator) + '</a>';
        //$('#trusted_by_list').append(validator_node); 
        //this.trusted_by.push(this.nodes[validator.listPos]);
      //}
    },
    getNodeName: function (node) {
      var name;

      name = node.name ? node.name : node.publicKey.substring(0,16);

      return name
    },
    getNodeLocation: function(node) {
      var location;
      var geoData = node.geoData;

      if(geoData) {
        location = geoData.city ? geoData.city + ", " + geoData.countryName : geoData.countryName;     
      }


      return location
    },
    toggleIfMobile: function() {
    // toggleIfMobile: function(listView) {
      // if($(window).width() <= 1080) {
      //   if(listView) {
      //     $('.quorum-nav').hide();
      //     $('.validators').show();
      //     $('.validator-back').show();
      //   } else {
      //     $('.quorum-nav').show();
      //     $('.validators').hide();
      //     $('.validator-back').hide();
      //   }
      // }
    },
    makeTextSprite: function( message, parameters ) {
      if ( parameters === undefined ) parameters = {};
      
      var fontface = parameters.hasOwnProperty("fontface") ? 
          parameters["fontface"] : "Arial";
      
      var fontsize = parameters.hasOwnProperty("fontsize") ? 
          parameters["fontsize"] : 18;
      
      var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
          parameters["borderThickness"] : 4;
      
      var borderColor = parameters.hasOwnProperty("borderColor") ?
          parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
      
      var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
          parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
      //var spriteAlignment = parameters.hasOwnProperty("alignment") ?
      //  parameters["alignment"] : THREE.SpriteAlignment.topLeft;
      //var spriteAlignment = THREE.SpriteAlignment.topLeft;

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.font = "Bold " + fontsize + "px " + fontface;
      
      // get size data (height depends only on font size)
      var metrics = context.measureText( message );
      var textWidth = metrics.width;
      
      // background color
      context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                    + backgroundColor.b + "," + backgroundColor.a + ")";
      // border color
      context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                    + borderColor.b + "," + borderColor.a + ")";
      context.lineWidth = borderThickness;
      this.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
      // 1.4 is extra height factor for text below baseline: g,j,p,q.
      
      // text color
      context.fillStyle = "rgba(0, 0, 0, 1.0)";
      context.fillText( message, borderThickness, fontsize + borderThickness);
      
      // canvas contents will be used for a texture
      var texture = new THREE.Texture(canvas) 
      texture.needsUpdate = true;
      var spriteMaterial = new THREE.SpriteMaterial( 
          { map: texture } );
      var sprite = new THREE.Sprite( spriteMaterial );

      return sprite;  
  },
  createLabel: function(text, size, color, font, underlineColor) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = size + "pt " + "Arial";

    var textWidth = context.measureText(text).width;

    canvas.width = textWidth;
    canvas.height = size + 10;

    // better if canvases have even heights
    if(canvas.width % 2){
        canvas.width++;
    }
    if(canvas.height % 2){
        canvas.height++;
    }

    if(underlineColor){
        canvas.height += 30;
    }
    context.font = size + "pt " + "Arial";;

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.strokeStyle = 'black';

    context.miterLimit = 2;
    context.lineJoin = 'circle';
    context.lineWidth = 6;

    context.strokeText(text, canvas.width / 2, canvas.height / 2);

    context.lineWidth = 2;

    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    if(underlineColor){
      context.strokeStyle=underlineColor;
      context.lineWidth=4;
      context.beginPath();
      context.moveTo(0, canvas.height-10);
      context.lineTo(canvas.width-1, canvas.height-10);
      context.stroke();
    }

    return canvas;
  },
  createTopCanvas: function(color) {
    var markerWidth = 20,
    markerHeight = 20;

    return this.renderToCanvas(markerWidth, markerHeight, function(ctx){
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(markerWidth/2, markerHeight/2, markerWidth/4, 0, 2* Math.PI);
        ctx.fill();
    });
  },
  renderToCanvas: function(width, height, renderFunction) {
    var buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    renderFunction(buffer.getContext('2d'));

    return buffer;
  },
  roundRect: function(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();   
  },
  onDocumentMouseup: function (){
    if (Date.now() - this.lastMove < 31 || !this.nodeView) { // 32 frames a second
        return;
    } else {
      this.lastMove = Date.now();
    }

    var pin;
    
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.scene.children );

    if ( intersects.length > 0 )
    {
      // if the closest object intersected is not the currently stored intersection object
      if ( intersects[ 0 ].object != this.INTERSECTED_CLICK )
      {   
        // restore previous intersection object (if it exists) to its original color
        if ( this.INTERSECTED_CLICK ) {
          pin = this.findNode(this.INTERSECTED_CLICK.id);
          if(pin){
            // set a new color for closest object
            pin.node.tag.visible = false;
          } 
        }


        // store reference to closest object as current intersection object
        this.INTERSECTED_CLICK = intersects[ 0 ].object;
        // store color of closest object (for later restoration)

        pin = this.findNode(this.INTERSECTED_CLICK.id);

        console.log(pin);
        if(pin){
          // set a new color for closest object
          this.setupTween(pin.node);
          this.cur_node_pin = pin.id;
          pin.node.tag.visible = true;
        } 
      }
    }
    else
    {
      // restore previous intersection object (if it exists) to its original color
      if ( this.INTERSECTED_CLICK )
      this.INTERSECTED_CLICK = null;
    }
  },
  onDocumentMouseMove: function( event ) {
    if (Date.now() - this.lastMove < 31 || !this.nodeView) { // 32 frames a second
        return;
    } else {
      this.lastMove = Date.now();
      // console.log("got here")
    }

    event.preventDefault();
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    var pin;
    // might need to find a better place for this
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.scene.children );

    console.log(intersects);

    if ( intersects.length > 0 )
    {
      // if the closest object intersected is not the currently stored intersection object
      if ( intersects[ 0 ].object != this.INTERSECTED )
      {   
        // restore previous intersection object (if it exists) to its original color
        if ( this.INTERSECTED ) {
            // console.log("intersection")
            pin = this.findNode(this.INTERSECTED.id);
            // console.log("pin found?", pin);
            if(pin){
                // set a new color for closest object
                if(this.cur_node_pin != pin.id){
                    pin.node.tag.visible = false;
                }
                
            } 
        }


        // store reference to closest object as current intersection object
        this.INTERSECTED = intersects[ 0 ].object;

        console.log("printing intersected obj", this.INTERSECTED);

        // store color of closest object (for later restoration)

        pin = this.findNode(this.INTERSECTED.id);
        if(pin){
          // set a new color for closest object
          pin.node.tag.visible = true;
            
        } 
      }
    }
    else
    {
      // restore previous intersection object (if it exists) to its original color
      if ( this.INTERSECTED )
        //INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        this.INTERSECTED = null;
    }
  },
  findNode: function(objID) {
    console.log("searching for", objID);
    for (var i = 0, len = this.node_list.length; i < len; i++) {
      if (this.node_list[i].id === objID)
        return this.node_list[i]; // Return as soon as the object is found
    }

    return null; // The object was not found
  },
  findNodeByKey: function(key) {
    for (var i = 0, len = this.nodes.length; i < len; i++) {
      if (this.nodes[i].publicKey === key)
        return this.nodes[i]; // Return as soon as the object is found
    }

    return null; // The object was not found
  },
  hasNodesInQuorum: function(node) {
    if(node.quorumSet) {
      if(node.quorumSet.validators.length > 0 || node.quorumSet.innerQuorumSets.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  loadNodes () {
    this.$http.get("https://api.stellarbeat.io/v1/nodes").then(async (response) => {
      console.log(response.data)
      this.nodes = response.data;
      this.total_nodes = this.nodes.length;
      await this.init();
      this.is_loading = false;
      this.animate();
    });
  },
  toggleNodeView() {
    this.nodeView = !this.nodeView;
  },
  animate: function() {
    requestAnimationFrame(this.animate);

    if (!this.is_loading) {
      this.controls.update();
      this.update_track_point_cloud();
      // this.stats.update();
      TWEEN.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
  }
};

</script>

<style>
  .trust-list {
    overflow-y: scroll;
    height: 300px;
  }

  v-list-item-subtitle {
    color: cyan !important;
  }

  .nav-drawer {
    width: 100%;

    @media only screen and (min-width: 768px) {
      width: 300px;
    }

    @media only screen and (min-width: 1200px) {
      width: 400px;
    }
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