<template>
  <div class="quorum">
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
    <!-- <div id="quorum">
      <div class="quorum-nav">
        <div id="node_list" class="list-group">
          <a onclick="app.viewAll()" href="#" class="list-group-item list-group-item-dark">View All</a>
        </div>
      </div>
      <div class="validators">
        <h3 id="node_header"></h3>
        <div class="node_info">
          <i class="fas fa-map-marked-alt"></i> Location:
          <div id="node_location"></div>
        </div>
        <div class="node_info">
          <i class="fas fa-star"></i> Availability Rating:
          <div id="rating"></div>
        </div>
        <div class="node_info">
          <i class="far fa-handshake"></i> Trust Index:
          <div id="trust_index"></div>
        </div>Trusted
        <div id="validator_list" class="list-group"></div>Trusted By
        <div id="trusted_by_list" class="list-group"></div>
      </div>
    </div> -->
    <!-- <img src="@/assets/2k_uranus.jpg"> -->
    <!-- <v-card
      class="mx-auto quorum-nav"
    > -->
      <v-navigation-drawer v-model="drawer" app clipped class="nav-drawer">
        <v-card class="pa-3">
          <v-select v-model="currMode" :items="modes" label="Mode"></v-select>
          <v-list-item>
            <v-list-item-content>
              <v-row class="align-center" style="text-overflow: ellipsis; max-width:250px;">
                <v-col cols="2">
                  <v-btn v-if="nodeView" v-on:click="viewAll" icon color="cyan">
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

          <div v-if="currMode == 'Nodes'">
            <v-list-item
              link
              v-on:click="viewAll"
              v-if="!nodeView"
            >
              <v-list-item-content>
                <v-list-item-title>View All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list
              v-if="!nodeView"
              dense
              nav
            >
              <v-list-item
                v-for="node in nodes"
                :key="node.publicKey"
                link
                v-on:click="enterNodeView(node)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ node.name ? node.name : node.publicKey }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-list v-if="nodeView">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Country</v-list-item-title>
                  <v-list-item-subtitle>{{this.currNode.geoData.countryName}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>{{ this.currNode.active ? 'Active' : 'Offline' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Time Active (24 Hours)</v-list-item-title>
                  <v-list-item-subtitle>{{ this.currNode.statistics.active24HoursPercentage }}%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Time Active (30 Days)</v-list-item-title>
                  <v-list-item-subtitle>{{ this.currNode.statistics.active30DaysPercentage }}%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Time Overloaded (24 Hours)</v-list-item-title>
                  <v-list-item-subtitle>{{ this.currNode.statistics.overLoaded24HoursPercentage }}%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Time Overloaded (30 Days)</v-list-item-title>
                  <v-list-item-subtitle>{{ this.currNode.statistics.overLoaded30DaysPercentage }}%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>

          <div v-if="currMode == 'Quorum Sets'">
            <v-list
              v-if="!quorumView"
              dense
              nav
            >
              <v-list-item
                v-for="set in quorumSets"
                :key="set.publicKey"
                link
                v-on:click="enterQuorumView(set)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ quorumSetItem(set) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-navigation-drawer>
    <!-- </v-card> -->
    <div id="3d-graph"></div>
  </div>
</template>

<script>
/* eslint no-unused-vars: 0 */  // --> OFF
/* eslint no-undef: 0 */  // --> OFF
/* eslint no-redeclare: 0 */  // --> OFF
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import * as d3 from "d3";
import _ from 'underscore';

export default {
  name: "Quorum",
  components: {},
  data: () => ({
    drawer: false,
    imgArray: [
      // "./assets/planet_textures/Wetlands-Clouds-EQUIRECTANGULAR-1-1024x512.png",
      "./assets/2k_uranus.jpg",
      "./assets/planet_textures/Planet_Al_Dhanab_9192.png",
      "./assets/planet_textures/planet_Alba_1227.png",
      "./assets/planet_textures/planet_Arnessk_1166.png",
      "./assets/planet_textures/Planet_Avalon_4205.png",
      "./assets/planet_textures/Planet_Beta_Hydri.jpg",
      "./assets/planet_textures/planet_blink_3782.png",
      "./assets/planet_textures/planet_Bog_2275.png",
      "./assets/planet_textures/Planet_Cerca_Trova_3519.jpg",
      "./assets/planet_textures/Planet_Circus_9143.jpg",
      "./assets/planet_textures/planet_Commerce_One_2131.png",
      "./assets/planet_textures/planet_Dagobah_1174.png",
      "./assets/planet_textures/planet_Dam-ba-da_1547.png",
      "./assets/planet_textures/planet_Dank_1182.png",
      "./assets/planet_textures/planet_Down_360Full_3621.png",
      "./assets/planet_textures/Planet_Dust_4284.png",
      "./assets/planet_textures/Planet_Ecaz_5346.jpg",
      "./assets/planet_textures/Planet_Farma_8165.png",
      "./assets/planet_textures/Planet_Harmonthep_8239b.png",
      "./assets/planet_textures/Planet_Hearth.jpg",
      "./assets/planet_textures/planet_hoth_1235.png",
      "./assets/planet_textures/Planet_Ipyr_7435.png",
      "./assets/planet_textures/planet_Ixchel_1978.png",
      "./assets/planet_textures/planet_Jinx_1259.png",
      "./assets/planet_textures/planet_Klendathu_3058.png",
      "./assets/planet_textures/Planet_Kzin.jpg",
      "./assets/planet_textures/planet_Meh_1246.png",
      "./assets/planet_textures/planet_Miners_Moon_4138.png",
      "./assets/planet_textures/planet_Muunilinst_1406.png",
      "./assets/planet_textures/Planet_New_Aruba_5128.png",
      "./assets/planet_textures/Planet_Patina_8110.jpg",
      "./assets/planet_textures/planet_Quom_2449.png",
      "./assets/planet_textures/Planet_Reststop_Full360_3591.png",
      "./assets/planet_textures/planet_Rim.png",
      "./assets/planet_textures/planet_Robbers_Roost_3111.png",
      "./assets/planet_textures/Planet_Salusa_Secundus_9265.png",
      "./assets/planet_textures/planet_Scarl_1191.png",
      "./assets/planet_textures/planet_serendip_3943.png",
      "./assets/planet_textures/Planet_Sno_7271.jpg",
      "./assets/planet_textures/planet_Spot_Full360_3430.png",
      "./assets/planet_textures/planet_Tank_3817.png",
      "./assets/planet_textures/planet_Tao_Seti_Prime_4072.png",
      "./assets/planet_textures/planet_Telos_1157.png",
      "./assets/planet_textures/planet_Terminus_1204.png",
      "./assets/planet_textures/planet_Trantor_1211.png",
      "./assets/planet_textures/planet_Trask_1134.png",
      "./assets/planet_textures/planet_Tsu-Ni_2391.png",
      "./assets/planet_textures/Planet_Wight_Full360_3671.png"
    ],
    textures: [],
    generated_textures: [],
    nodes_data: [],
    total_nodes: 0,
    node_textures: [],
    gData: "",
    Graph: {},
    links: [],
    currNode: [],
    organizations: [],
    nodes: [],
    nodeView: false,
    quorumSets: [],
    currMode: "Nodes",
    modes: ["Nodes", /*"Quorum Sets"*/],
    quorumView: false,
    orgLinks: [],
    defaultCameraPos: null,
    isMobile: false
  }),
  mounted: function() {
    if(window.innerWidth < 768) {
      this.isMobile = true;
    }

    var rR;
    var rG;
    var rB;

    var saturation;
    var lightness;

    var specularShininess;
    var specularColor;
    var diffuseColor;
    var material;
    var alpha = 0.5;
    var beta = 0.5;
    var gamma = 0.5;
    var alphaIndex = 1;

    //this.initGraph();

    window.addEventListener("resize", this.resizeCanvas);

    var loader = new THREE.TextureLoader();

    for (var image in this.imgArray) {
      // load a resource
      loader.load(
        // resource URL
       
        this.imgArray[image],
        //this.imgArray[image],

        // onLoad callback
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = 16;
          // in this example we create the material when the texture is loaded
          this.textures.push(texture);

          //create instances of this texture

          for (var i = 0; i < 25; i++) {
            rR = Math.random();
            rG = Math.random();
            rB = Math.random();
            saturation = Math.random() / 2 + 0.5;
            lightness = Math.random() / 2 + 0.5;

            specularShininess = Math.pow(2, alpha * 10);
            //var specularColor = new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 );
            specularColor = new THREE.Color(rR, rG, rB);
            //var diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
            diffuseColor = new THREE.Color(rR, rG, rB).setHSL(
              rR,
              saturation,
              lightness
            );
            material = new THREE.MeshToonMaterial({
              map: texture,
              color: diffuseColor,
              // specular: specularColor,
              // reflectivity: beta,
              // shininess: 0.75
            });

            this.generated_textures.push(material);
          }
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function(err) {
          console.error("An error happened.");
          console.log(err);
        }
      );
    }

    this.loadNodes();
  },
  methods: {
    // convertToGraph: function() {
    //   var nodes_data = [];
    //   var nodes = [];
    //   var links = [];

    //   var node;
    //   var link;
    //   var quorumSet;
    //   var v_index;
    //   var validatorMatch;
    //   var curvature;

    //   for (var i = 0; i < this.nodes_data.length; ++i) {
    //     this.nodes_data[i].listPos = i;
    //     this.nodes_data[i].trusted_by = [];
    //     this.nodes_data[i].trusted_connections = [];
    //   }

    //   for (var f = 0; f < this.nodes_data.length; ++f) {
    //     //create links data
    //     node = this.nodes_data[f];

    //     this.nodes_data[f].connections = [];

    //     if (this.nodes_data[f].quorumSet) {
    //       quorumSet = this.nodes_data[f].quorumSet.validators;

    //       //add in inner quorum set nodes to make connections for
    //       var innerQuorumNodes = this.getInnerQuorumSet(this.nodes_data[f].quorumSet);
    //       // console.log(innerQuorumNodes);
    //       quorumSet = quorumSet.concat(innerQuorumNodes);

    //       this.nodes_data[f].quorumArr = quorumSet;

    //       if (this.nodes_data[f].name) {
    //         this.nodes_data[f].listPos = nodes.length;
    //         //add to nodes list
    //         nodes.push(this.nodes_data[f]);
    //       }
    //     }
    //   }

    //   /* All connections graph */

    //   //enter quorum set array loop and execute the next code per found quorum

    //   for (var i = 0; i < nodes.length; i++) {
    //     quorumSet = nodes[i].quorumArr;

    //     var menu_node =
    //       '<a onclick="app.enterNodeView(' +
    //       i +
    //       ')" href="#" class="list-group-item list-group-item-dark">' +
    //       nodes[i].name +
    //       "</a>";
    //     //$("#node_list").append(menu_node);

    //     for (var j = 0; j < quorumSet.length; j++) {
    //       var validator = quorumSet[j];

    //       //find validator key in nodes array
    //       validatorMatch = _.where(nodes, { publicKey: validator });

    //       if (validatorMatch.length > 0) {
    //         //add current node to validator nodes trusted nodes array
    //         v_index = validatorMatch[0].listPos;

    //         nodes[v_index].trusted_by.push(nodes[i]);

    //         //add validator node object to array
    //         nodes[i].quorumArr.push(validatorMatch[0]);

    //         if (nodes[v_index].name && nodes[v_index].quorumSet) {
    //           curvature = Math.random();

    //           //add link
    //           link = {
    //             source: i,
    //             target: v_index,
    //             curvature: 0.25,
    //             rotation: 0
    //           };
    //           links.push(link);
    //         }
    //       }
    //     }
    //   }

    //   var GROUPS = 12;

    //   this.gData = {
    //     nodes: [...Array(nodes.length).keys()].map(i => ({
    //       id: i,
    //       vx: Math.random(),
    //       vy: Math.random(),
    //       vz: Math.random(),
    //       group: Math.ceil(Math.random() * GROUPS),
    //       name: nodes[i].name,
    //       trusted: nodes[i].quorumArr,
    //       trusted_by: nodes[i].trusted_by
    //     })),
    //     links: links
    //   };

    //   let json_nodes = {}
    //   let temp = [];

    //   for(node in nodes) {
    //     temp.push(nodes[node])
    //   }
    //   console.log(this.gData.nodes);

    //   this.links = links;

    //  // var geometry2 = new THREE.SphereBufferGeometry(1, 32, 16);
    //   var material;
    //   var n;

    //   for (var i = 0; i < nodes.length; i++) {
    //     n = Math.floor(Math.random() * this.generated_textures.length);
    //     material = this.generated_textures[n];
    //     this.node_textures.push(material);
    //   }

    //   var reflectionCube = new THREE.CubeTextureLoader()
    //     .setPath("images/quorum_skybox/")
    //     .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

    //   reflectionCube.format = THREE.RGBFormat;

    //   this.Graph = ForceGraph3D()(document.getElementById("3d-graph"))
    //     .linkCurvature("curvature")
    //     .linkCurveRotation('rotation')
        
    //     // .linkDirectionalParticles(2)
    //     .nodeLabel("name")
    //     .nodeAutoColorBy("group")
    //     .linkAutoColorBy(d => this.gData.nodes[d.source].group)
    //     .linkWidth(3)
    //     .linkDirectionalParticleWidth(8)
    //     .linkOpacity(0.5)
    //     .nodeRelSize(5)
    //     .nodeThreeObject(
    //       ({ id }) =>
    //         new THREE.Mesh(
    //           // new THREE.SphereBufferGeometry(30, 32, 16),
    //           new THREE.SphereBufferGeometry(30, 16, 16), //less quality
    //           this.node_textures[id % nodes.length]
    //         )
    //     )
    //     .onNodeClick(node => {
    //       //changeDataSet(node.id);
    //       console.log("enter node view now");
    //       this.enterNodeView(node);
    //     })
    //     .graphData(this.gData)

    //   this.Graph.scene().background = reflectionCube;
    //   this.Graph.cameraPosition({ z: 2000 });


    //   this.Graph.cooldownTicks(1000)
    //   this.Graph.onNodeDrag(() => this.Graph.cooldownTicks(0))

    //   this.Graph
    //   .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size)))
    //   .d3VelocityDecay(0)
    //     .d3AlphaDecay(0)
    //   //  Deactivate existing forces
    //     .d3Force('center', null)
    //     .d3Force('charge', null)
    //     //Add collision and bounding box forces
    //     .d3Force("collide", d3.forceCollide(nodes.length * 10))
    //     .d3Force("box", () => {
    //       const CUBE_HALF_SIDE = this.Graph.nodeRelSize() * nodes.length * 0.5;
    //       // nodes.forEach(node => {
    //       //   const x = node.x || 0,
    //       //     y = node.y || 0,
    //       //     z = node.z || 0;
    //       //   // bounce on box walls
    //       //   if (Math.abs(x) > CUBE_HALF_SIDE) {
    //       //     node.vx *= -1;
    //       //   }

    //       //   if (Math.abs(y) > CUBE_HALF_SIDE) {
    //       //     node.vy *= -1;
    //       //   }
    //       //   if (Math.abs(z) > CUBE_HALF_SIDE) {
    //       //     node.vz *= -1;
    //       //   }
    //       // });
    //     });

    //   console.log(this.gData);
    // },
    showGraph: function() {

      //generate organization nodes
      let orgNodes = this.generateOrgNodes();

      //fill in node side bar
      this.nodes = orgNodes;

      this.orgLinks = this.generateOrgLinks(orgNodes);

      this.generateQuorumSets();


      this.gData = {
        nodes: orgNodes,
        links: this.orgLinks
      };

      var material;
      var n;

      for (var i = 0; i < orgNodes.length; i++) {
        n = Math.floor(Math.random() * this.generated_textures.length);
        material = this.generated_textures[n];
        this.node_textures.push(material);
      }

      var reflectionCube = new THREE.CubeTextureLoader()
      .setPath("assets/quorum_skybox/")
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

      reflectionCube.format = THREE.RGBFormat;

      const elem = document.getElementById('3d-graph');

      this.Graph = ForceGraph3D()(elem)
      .graphData(this.gData)
      .nodeAutoColorBy("group")
      .linkAutoColorBy("group")
      .nodeLabel(node => `${node.name ? node.name : node.publicKey}`)
      .linkCurvature("curvature")
      // .linkCurveRotation('rotation')
      .linkDirectionalParticles(2)
      .linkDirectionalParticleWidth(16)
      // .linkOpacity(0.5)
      .nodeRelSize(5)
      .nodeThreeObject(
          ({ id }) =>
            new THREE.Mesh(
              // new THREE.SphereBufferGeometry(30, 32, 16),
              new THREE.SphereBufferGeometry(100, 16, 16), //less quality
              this.node_textures[Math.floor(Math.random() * orgNodes.length)]
            )
        )
      .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
      .onNodeClick(node => {
          this.enterNodeView(node);
        })

      this.Graph.d3Force('link').distance(5000)
      // Graph.cooldownTicks(0)
      this.Graph.onNodeDrag(() => this.Graph.cooldownTicks(0))
      this.Graph.onNodeDragEnd(() => this.Graph.cooldownTicks(0))

      this.Graph.scene().background = reflectionCube;

      this.Graph.cameraPosition(
        { x: 5000, y: 5000, z: 5000 }, // new position
        { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );

      this.defaultCameraPos = this.Graph.camera().position;

      console.log(this.defaultCameraPos);

      //set forces
      //Graph
      // .d3Force('collision', d3.forceCollide(node => Math.cbrt(25)))
      //   .d3VelocityDecay(0)
      //   .d3AlphaDecay(0)
      // //  Deactivate existing forces
      //   .d3Force('center', null)
      //   .d3Force('charge', null)
      //   //Add collision and bounding box forces
      //   .d3Force("collide", d3.forceCollide(50))
        // .d3Force("box", () => {
        //   const CUBE_HALF_SIDE = Graph.nodeRelSize() * 50 * 0.5;
        //   // orgNodes.forEach(node => {
        //   //   const x = node.x || 0,
        //   //     y = node.y || 0,
        //   //     z = node.z || 0;
        //   //   // bounce on box walls
        //   //   if (Math.abs(x) > CUBE_HALF_SIDE) {
        //   //     node.vx *= -1;
        //   //   }

        //   //   if (Math.abs(y) > CUBE_HALF_SIDE) {
        //   //     node.vy *= -1;
        //   //   }
        //   //   if (Math.abs(z) > CUBE_HALF_SIDE) {
        //   //     node.vz *= -1;
        //   //   }
        //   // });
        // });

    },
    generateOrgNodes: function() {
      let nodes = [];
      let orgs = [];

      for(let i = 0; i < this.nodes_data.length; i++) {
        //if(!orgs.includes(this.nodes_data[i].organizationId)) {
          //check if org has already been added
          // if(this.nodes_data[i].organizationId) {
          //   //set unique ID
          //   this.nodes_data[i].id = this.nodes_data[i].publicKey;
          //   nodes.push(this.nodes_data[i]);
          //   orgs.push(this.nodes_data[i].organizationId);
          // } else {
            //unique node, add it
            // this.nodes_data[i].id = this.nodes_data[i].publicKey;
            // nodes.push(this.nodes_data[i]);
            //orgs.push(i);
         // }

         //add all with a public key
        //  if(this.nodes_data[i].homeDomain) {
            this.nodes_data[i].id = this.nodes_data[i].publicKey;
            if(this.nodes_data[i].organizationId) {
              this.nodes_data[i].group = this.nodes_data[i].organizationId;
            } else {
              this.nodes_data[i].group = '5';
            }
            this.nodes_data[i].index = i;
            nodes.push(this.nodes_data[i]);
         //}
         
        //}
      }
      console.log("printing org nodes: ", nodes);
      return nodes;
    },
    generateOrgLinks: function(orgs) {
      let links = [];

      for(let i = 0; i < orgs.length; i++) {
        let nodes = orgs[i].quorumSet.innerQuorumSets;
        for(let j = 0; j < nodes.length; j++) {
          let set = nodes[j].validators;
          for(let k = 0; k < set.length; k++) {
            let link = {};
            //link.source = orgs[i].publicKey;
            link.source = orgs[i];
            link.target = set[k];
            if(orgs[i].organizationId) {
              link.group = orgs[i].organizationId;
            } else {
              link.group = '2';
            }
            
            link.curvature = 0.25;
            link.rotation = 0;
            links.push(link);
          }
        }
      }

      console.log("printing links", links);

      return links;
    },
    generateQuorumSets: function() {
      let nodes = this.nodes_data;
      let sets = [];
      let nodeSets = [];

      for(let i = 0; i < nodes.length; i++) {
        //grab quorum set
        let quorumSets = nodes[i].quorumSet.innerQuorumSets;
        let parsedSets = [];

        for(let j = 0; j < quorumSets.length; j++) {
          if (quorumSets[j].validators.length > 0) {
            let quorumSet = {
              quorumId: this.findNodeName(quorumSets[j].validators[0]),
              quorumSet: quorumSets[j].validators
            }

            let duplicate = parsedSets.includes(quorumSet);

            //label quorum set groups of nodes

            // console.log(quorumSet);
      
            // console.log("printing duplicate test result", duplicate);

            if(!duplicate) {

              //find corresponding nodes in quorumSet
              quorumSet.quorumSet = this.linkQuorumNodes(quorumSet.quorumSet);

              parsedSets.push(quorumSet);

            }
          }
          //push labelled quorum set to global array
          nodeSets.push(parsedSets);
        }
        console.log("printing all quorum sets", nodeSets);
        this.quorumSets = nodeSets;
      }

    },
    linkQuorumNodes: function(set) {
      for(let i = 0; i < set.length; i++) {
        let validator = set[i];
        
        //find node in list by pub key
        // let node = _.find(this.nodes_data, function(n) {
        //   return n.publicKey == validator.publicKey
        // })
        let node = _.findWhere(this.nodes_data, { publicKey: validator});

        if(node) {
          set[i] = node;
        }

      }

      return set;
    },
    findNodeName: function(id) {
      let node = _.findWhere(this.nodes_data, { publicKey: id});

      return node.name ? node.name : node.publicKey
    },
    shouldShowLink: function(link, baseNode) {
      //change colours depending on connection type
      if (link.source === baseNode) {
        link.color = "#00ff00";
      } else if (link.target === baseNode) {
        link.color = "#00ffff";
      }

      return link.source === baseNode || link.target === baseNode;
    },
    shouldShowQuorumLink: function(link, baseNode, targetNode) {
      //change colours depending on connection type
      if (link.source === baseNode && link.target === targetNode) {
        link.color = "#00ff00";
      } else if (link.target === baseNode && link.source === targetNode) {
        link.color = "#00ffff";
      }

      return ((link.source === baseNode && link.target === targetNode) || (link.target === baseNode && link.source === targetNode));
    },
    enterNodeView: function(node) {
      console.log("switching node");
      this.nodeView = true;

      //find node by index
      // node = app.gData.nodes[i];
      this.currNode = node;
      
      console.log(this.currNode);
      
      // this.addValidators();

      this.Graph.linkVisibility(link => this.shouldShowLink(link, node));
      // Aim at node from outside it
      const distance = 5000;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      this.Graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );

      if(this.isMobile) {
        this.drawer = false;
      }
    },
    enterQuorumView: function(set) {
      console.log(set);

      for(let i = 0; i < set.length; i++) {
        let node = set[i].quorumSet[0];
        for(let j=0; j < set.length - i; j++) {
          if(i != j) { //don't connect node to itself!
            let target = set[j].quorumSet[0];
            console.log("connecting " + node.name + " to " + target.name);
            this.Graph.linkVisibility(link => this.shouldShowQuorumLink(link, node, target));
          }
        }
      }
    },
    // initGraph: function() {
    //   this.Graph = ForceGraph3D()(document.getElementById("3d-graph"))
    //     .jsonUrl('https://raw.githubusercontent.com/vasturiano/3d-force-graph/master/example/datasets/blocks.json')
    // },
    viewAll: function() {
      this.gData.links = this.orgLinks;
      this.Graph.linkVisibility(true);
      this.Graph.cameraPosition(
        { x: 5000, y: 5000, z: 5000 }, // new position
        this.nodes[0], // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
      this.nodeView = !this.nodeView;
    },
    addValidators: function() {
      var validator_node;
      var validator;
      var quorumArr = app.curr_node.trusted;
      var trusted_by = app.curr_node.trusted_by;
      var curr_node = app.curr_node;
      var trust_index = Math.round(
        (curr_node.trusted_by.length / app.nodes_data.length) * 100
      );

      // $("#node_header").empty();
      // $("#node_location").empty();
      // $("#rating").empty();
      // $("#trust_index").empty();
      // $("#validator_list").empty();
      // $("#trusted_by_list").empty();

      // $("#node_header").append(this.getNodeName(curr_node));
      // $("#node_location").append("Deep space");
      // $("#rating").append(curr_node.activeRating);
      // $("#trust_index").append(trust_index + "%");

      // for (var node in quorumArr) {
      //   //nodes it trusted
      //   validator = quorumArr[node];
      //   validator_node =
      //     '<a onclick="app.enterNodeView(' +
      //     validator.listPos +
      //     ')" href="#" class="list-group-item list-group-item-dark">' +
      //     this.getNodeName(validator) +
      //     "</a>";
      //   //$("#validator_list").append(validator_node);
      // }

      // for (var node in trusted_by) {
      //   validator = trusted_by[node];
      //   validator_node =
      //     '<a onclick="app.enterNodeView(' +
      //     validator.listPos +
      //     ')" href="#" class="list-group-item list-group-item-dark">' +
      //     this.getNodeName(validator) +
      //     "</a>";
      //   //$("#trusted_by_list").append(validator_node);
      // }
    },
    getNodeName: function(node) {
      var name;

      name = node.name ? node.name : node.publicKey.substring(0, 16);

      return name;
    },
    loadNodes () {
      this.$http.get("https://api.stellarbeat.io/v1/nodes").then((response) => {
        console.log(response.data)
        this.nodes_data = response.data;
        this.showGraph();
        // this.convertToGraph();
      });
    },
    getInnerQuorumSet: function(quorumSet) {
      let innerQuorumSets = quorumSet.innerQuorumSets;
      let validators = [];
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
    toggleNodeView() {
      this.nodeView = !this.nodeView;
    },
    quorumSetItem: function(set) {
      let text = "{ ";

      for(let i = 0; i < set.length; i++) {
        text += set[i].quorumId.substring(0,8) + " ";
      }

      text += "}"
      return text;
    },
    resizeCanvas: function() {
      this.Graph.camera().aspect = (window.innerWidth - 250) / window.innerHeight;
      this.Graph.camera().updateProjectionMatrix();

      this.Graph.renderer().setSize( window.innerWidth, window.innerHeight );
    }
  },
  computed: {
    
  }
};

</script>

<style>
  .quorum-nav {
    position: absolute;
    height: 100%;
    width: 250px;
    z-index: 2;
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
</style>
