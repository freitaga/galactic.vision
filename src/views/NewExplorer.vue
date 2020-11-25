<template>
  <div id="app"></div>
</template>

<script>
 /* eslint-disable */ 
import * as THREE from 'three-full';
import _ from 'underscore';
// import * as TWEEN from '../webgl/tween.min.js';
import TWEEN from '@tweenjs/tween.js';


export default {
  name: 'Explorer',
  data: () => ({
    message: 'Hello Vue!',
    showVue: false,
    showAccountWin: false,
    showRequestHistory: false,
    showLegend: false,
    showTx: false,
    showSearch: false,
    messageList: [],
    accountList: [] ,
    accountViewID: "",
    accountViewObj: {},
    accountView: false,
    switchToGlobalView: false,
    requestCount: 0,
    payments_sent: 0,
    payments_received: 0,
    trades_completed: 0,
    most_traded: "",
    found: false,
    assetID: "",
    num_assets: 0,
    num_expected: 0,
    datasets: [],
    innerData: [],
    backgroundColor: [],
    labels: [],
    wireframe: "",
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
    trades: [],
    tradeCount: 0,
    numTrades: 0, //number of trades inserted last
    currTrades: [],
    tutorial_page: 0
  }),
  mounted: function() {
  	var rR;
	  var rG;
	  var rB;

    var alpha;
    var beta;
	  var saturation;
		var lightness;

	  var specularShininess;
	  var specularColor;
	  var diffuseColor;
	  var material;

    var loader = new THREE.TextureLoader();
    
    var reflectionCube = new THREE.CubeTextureLoader()
      .setPath("assets/quorum_skybox/")
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

    reflectionCube.format = THREE.RGBFormat;

  	var imgArray = this.imgArray;

    for(var image in this.imgArray) {
	    	// load a resource
			loader.load(
				// resource URL
				imgArray[image],

				// onLoad callback
				( texture ) => {
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	      			texture.anisotropy = 16;
					// in this example we create the material when the texture is loaded
					this.textures.push(texture);

					//create instances of this texture

					for(var i = 0; i < 25; i++) {

						rR = Math.random();
					  rG = Math.random();
            rB = Math.random();
            var alpha = 0.5;
            var beta = 0.5;
            var alphaIndex = 1;
					  saturation = Math.random() / 2 + 0.5;
						lightness = Math.random() / 2 + 0.5;

					  specularShininess = Math.pow( 2, alpha * 10 );
					  //var specularColor = new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 );
					  specularColor = new THREE.Color(rR, rG, rB );
					  //var diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
					  diffuseColor = new THREE.Color(rR, rG, rB).setHSL( rR, saturation, lightness );
					  material = new THREE.MeshToonMaterial( {
              map: texture,
              color: diffuseColor,
					    // map: texture,
					    // color: diffuseColor,
					    // specular: specularColor,
					    // reflectivity: beta,
					    // shininess: 0.75, 
					    // envMap: alphaIndex % 2 === 0 ? null : reflectionCube
					  } );

					  this.generated_textures.push(material);
					}
				},

				// onProgress callback currently not supported
				undefined,

				// onError callback
				function ( err ) {
					console.error( 'An error happened.' );
				}
			);
    }

  },
  methods: {
  	showText: function() {
  		this.showVue = !this.showVue;
  	},
  	showAccountWindow: function() {
  		//fix the case where you toggle the window off then click on another planet
  		//this.hideAll();
		//this.showAccountWin = true;

		if(this.showAccountWin == true){
			this.showAccountWin = false;
		}else{
			this.hideAll();
			this.showAccountWin = true;
		}
  		
  	},
  	closeAccountWindow: function() {
  		this.showAccountWin = false;
  	},
  	showRequestHistoryWindow: function() {
  		
  		if(this.showRequestHistory) {
  			this.showRequestHistory = false;
  		} else {
	  		this.hideAll();
  			this.showRequestHistory = true;
	  	}
  	},
  	showLegendWindow: function() {
  		if(this.showLegend) {
  			this.showLegend = false;
  		} else {
	  		this.hideAll();
	  		this.showLegend = true;
	  	}
  	},
  	showSearchWindow: function() {
  		if(this.showSearch) {
  			this.showSearch = false;
  		} else {
	  		this.hideAll();
	  		this.showSearch = true;
	  	}
  	},
  	hideAll: function() {
  		this.showRequestHistory = false;
  		this.showAccountWin = false;
  		this.showLegend = false;
  		this.showSearch = false;
  	},
  	globalView: function() {
  		this.showAccountWin = false;
  		this.accountView = false;
  		this.switchToGlobalView = true;
  		scene.remove(this.accountViewObj);
  	},
  	operationMessage: function(message) {
  		var type = message.type;
  		var display;
  		//print out basic message detailing operation
  		if(type == "payment") {
  			display = "[" + message.from.substring(0,4) + "]" + " sent " + message.amount + " " + this.assetString(message) + " to " + "[" + message.to.substring(0,4) + "]"; 
  		} else if(type == "manage_offer") {
  			display = "[" + message.source_account.substring(0,4) + "] " + " wants to trade " + message.amount.substring(0,6) + " " + this.sellingAssetString(message)   + " FOR " + this.buyingAssetAmount(message) + " " + this.buyingAssetString(message);
  		} else if(type == "trade") {
  			display = "[" + message.base_account.substring(0,4) + "] " + " traded " + message.base_amount.substring(0,6) + " " + this.baseAssetString(message)   + " FOR " + this.counterAssetAmount(message) + " " + this.counterAssetString(message) + " [" + message.counter_account.substring(0,4) + "]";
  		} else {
  			display = "idk lol";
  		}

  		return display;
  	},
  	assetString: function(message) {
  		var asset;

  		if(message.asset_code) {
  			asset = message.asset_code;
  		} else if(message.asset_type == "native") {
  			asset = "XLM";
  		} else {
  			asset = message.asset_type;
  		}

  		return asset;
  	},
  	sellingAssetString: function(message) {
  		var asset;

  		if(message.selling_asset_code) {
  			asset = message.selling_asset_code;
  		} else if(message.selling_asset_type == "native") {
  			asset = "XLM";
  		} else {
  			asset = message.selling_asset_type;
  		}

  		return asset;
  	},
  	buyingAssetString: function(message) {
  		var asset;

  		if(message.buying_asset_code) {
  			asset = message.buying_asset_code;
  		} else if(message.buying_asset_type == "native") {
  			asset = "XLM";
  		} else {
  			asset = message.buying_asset_type;
  		}

  		return asset;
  	},
  	buyingAssetAmount: function(message) {
  		var buying_amount = message.amount * message.price;

  		if(buying_amount > 0.01) {
    		buying_amount = Math.round(buying_amount * 100) / 100;
  		} else {
  			buying_amount = Math.round(buying_amount * 100000) / 100000;
  		}

    	return buying_amount;
  	},
  	baseAssetString: function(message) {
  		var asset;

  		if(message.base_asset_code) {
  			asset = message.base_asset_code;
  		} else if(message.base_asset_type == "native") {
  			asset = "XLM";
  		} else {
  			asset = message.base_asset_type;
  		}

  		return asset;
  	},
  	counterAssetString: function(message) {
  		var asset;

  		if(message.counter_asset_code) {
  			asset = message.counter_asset_code;
  		} else if(message.counter_asset_type == "native") {
  			asset = "XLM";
  		} else {
  			asset = message.counter_asset_type;
  		}

  		return asset;
  	},
  	counterAssetAmount: function(message) {
  		var buying_amount = message.counter_amount;

  		if(buying_amount > 0.01) {
    		buying_amount = Math.round(buying_amount * 100) / 100;
  		} else {
  			buying_amount = Math.round(buying_amount * 100000) / 100000;
  		}

    	return buying_amount;
  	},
  	buildPieChart: function(assets) {

  		this.datasets = [];
  		this.backgroundColor = [];
  		this.innerData = [];
  		this.labels = [];

  		this.num_assets = 0;
  		this.num_expected = assets.length;

  		for(var a in assets) {

			var asset = assets[a];

			var code;
			var usd_value = 0;
			var asset_id = "";
			var ajax;

			//console.log(asset);

			
			if(asset.asset_code) {
	            code = asset.asset_code;
	        } else {
	        	if(asset.asset_type == "native") {
	        		code = "XLM";
	        	} else {
	        		code = asset.asset_type;
	        	}      
	        }

	        //asset_id = this.convertToUsd(code, asset.balance);

	        this.assetToUsd(code, asset.balance);

	        /*
	        if(asset_id) {
	        	usd_value = this.getUsdValue(asset_id);
	        	console.log(usd_value);
	        }*/
	    } 


  	},
  	assetToUsd: function(asset, amount) {
  		var usd_value = 0;

  		$.ajax({
	        url: "https://min-api.cryptocompare.com/data/price?fsym=" + asset + "&tsyms=USD",
	        success: function(result) {
	        	//console.log(result);
	        	this.num_assets++;
	        		
        		//console.log("Searched cryptocompare for " + asset + " and found: " + result.USD);

        		usd_value = result.USD * amount;

        		usd_value = Math.round(usd_value * 100) / 100;
    

        		//console.log(amount + " " + asset + " is worth $" + usd_value + " USD" );

        		if(usd_value > 1) {
        			this.addChartData(asset, amount, usd_value);
        		}
	        },
	        error: function(result) {
	        	this.num_assets++;
	        }
    	});
  	},
  	addChartData: function(asset, amount, usd_value) {
  		var colour;

  		this.innerData.push(usd_value);
    	this.labels.push(asset);

    	if(asset_colours.hasOwnProperty(asset)) {
			  colour = asset_colours[asset];
		  } else {
        var x = Math.round(0xffffff * Math.random()).toString(16);
        var y = (6-x.length);
        var z = "000000";
        var z1 = z.substring(0,y);
        colour= "#" + z1 + x;
		  }

		  this.backgroundColor.push(colour);
	  } 	
		
  }

}
</script>