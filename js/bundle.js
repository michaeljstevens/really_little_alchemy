/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Element = __webpack_require__(1);
	const la = __webpack_require__(4);


	var canvas, stage;

	var mouseTarget;
	var dragStarted;
	var offset;
	var update = true;
	var initial = ["fire", "water", "earth", "air"]
	//  "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	//  "fire", "water", "earth", "air",
	//   "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain",
	// "brick", "cloud", "dust", "steam", "swamp", "tobacco", "gunpowder", "rain"];
	var discovered = [];
	var elements = [];
	var elOffset = 0;
	var yCoord = 520;


	document.addEventListener("DOMContentLoaded", function() {
		canvas = document.getElementById("bodyCanvas");
		stage = new createjs.Stage(canvas);



		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true;


	  const line = new createjs.Shape();

	  line.graphics.setStrokeStyle(1);
	  line.graphics.beginStroke("Black");
	  line.graphics.moveTo(0, 500);
	  line.graphics.lineTo(1000, 500);
	  line.graphics.endStroke();

		stage.addChild(line);

		var disContainer = new createjs.Container();
	 	stage.addChild(disContainer);

		var mask = new createjs.Shape();
		mask.graphics.f("#f00").dr(0,500,1000,500);
		disContainer.mask = mask;

		var wrapper;
		var canvasHeight;
		var vScrollHeight;
		var canvasWrapperHeight=300;

		$(".bar").draggable({
			containment: "parent"
		});

		$(".bar").on("drag", function (event, ui) {
			stage.children[1].y = 0 - ui.position.top * 4.4;
			stage.update();
		});

		var mainContainer = new createjs.Container();
		stage.addChild(mainContainer);
		mainContainer.setBounds(0,0,1000,500);

		stage.update();

	  initial.forEach(el => {
	    let image = new Image();
			image.src = `./img/${el}.png`;
			let elObj = {name: el};
	    image.onload = handleImageLoad.bind(elObj);
	  });

	});

	function stop() {
		createjs.Ticker.removeEventListener("tick", tick);
	}

	function handleImageLoad(event) {
	  var image = event.target;
		var bitmap;
		var container = new createjs.Container();
		bitmap = new createjs.Bitmap(image);

		stage.children[1].addChild(container);
		container.addChild(bitmap);
		bitmap.x = this.x || 40 + elOffset;
		bitmap.y = this.y || yCoord;
	  console.log(elOffset);
		console.log(yCoord);
		bitmap.regX = bitmap.width / 2 | 0;
		bitmap.regY = bitmap.height / 2 | 0;
		bitmap.name = this.name;
		bitmap.scaleX = bitmap.scaleY = bitmap.scale = .5;
		bitmap.cursor = "pointer";

		var text = new createjs.Text(this.name, "18px Arial", "#ff7700");
		text.y = this.y + 55 || yCoord + 55;
		text.x = bitmap.x + 5;
		container.addChild(text);

		console.log(bitmap.name);
		if (!this.x) {
			if (elOffset > 700) {
				elOffset = 0;
				yCoord += 100;
			} else {
				elOffset += 100;
			}
		}

		if(discovered.every(el => el.name !== bitmap.name)) {
			discovered.push(bitmap);
		}

		stage.children.forEach(child => {
			if (child.name === "foundCount") {
				stage.removeChild(child);
			}
		});

		var foundCount = new createjs.Text(`${discovered.length}/100`, "72px Sans-Serif", "#ff7700");
		foundCount.name = "foundCount";
		stage.addChild(foundCount);

		update = true;

		bitmap.on("mousedown", function (evt) {

	    if(evt.currentTarget.y > 465 ) {
				stage.children[2].addChild(bitmap);
	      var imageDup = new Image();
	      imageDup.src = this.image.src;
	      imageDup.onload = handleImageLoad.bind(this);
	      // this.parent.addChild(this);
	      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
	    }
		});

	  bitmap.on("pressup", function (evt) {
	    elements.push(bitmap);
	    if(this.y < 465 ) {
	      let toRemove = [];
	      for (var i = 0; i < elements.length; i++) {
	        let element = elements[i];
	        if (this !== element && !(element.x - 10 > this.x + 10 ||
	                                  element.x + 10 < this.x - 10 ||
	                                  element.y - 10 > this.y + 10 ||
	                                  element.y + 10 < this.y - 10)) {
					 let combined = la.combine(this.name, elements[i].name);
					 if (combined !== undefined) {
						 combined = combined[0];
						 var discoveredEl = new Image();
						 discoveredEl.src = `./img/${combined}.png`;
						 if(discovered.every(el => el.image.src !== discoveredEl.src)) {
							 let elObj = {name: combined};
							 discoveredEl.onload = handleImageLoad.bind(elObj);
						 }
					 }
					 stage.children[1].removeChild(this.parent);
					 stage.children[1].removeChild(element.parent);
					 stage.children[2].removeChild(this);
					 stage.children[2].removeChild(element);
					 toRemove.push(element);
					 toRemove.push(this);
	        }
	      }
	      elements = elements.filter((el) => {
	        return !(toRemove.includes(el));
	      });
	    } else {
	      stage.children[1].removeChild(this.parent);
				stage.childern[2].removeChild(this);
	    }
	    update = true;
	  });

		bitmap.on("pressmove", function (evt) {

	    if(this.y < 465) {
	      if(evt.stageY < 465) {
	        this.y = evt.stageY + this.offset.y;
	      }
	      this.x = evt.stageX + this.offset.x;
	    } else {
	      this.x = evt.stageX + this.offset.x;
	      this.y = evt.stageY + this.offset.y;
	    }
			update = true;
		});


		bitmap.on("rollover", function (evt) {
			this.scaleX = this.scaleY = this.scale * 1.2;
			update = true;
		});

		bitmap.on("rollout", function (evt) {
			this.scaleX = this.scaleY = this.scale;
			update = true;
		});
		createjs.Ticker.addEventListener("tick", tick);
	}

	function tick(event) {
		if (update) {
			update = false;
			stage.update(event);
		}
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Element {
		constructor(name) {
			this.name = name;
			this.image = new Image();
			this.image.src = `./img/${name}.png`;
		}
	}

	module.exports = Element;


/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.combine = combine;
	exports.getBaseElements = getBaseElements;

	var _recipesJs = __webpack_require__(5);

	function combine(element1, element2) {
	    var recipe = [element1, element2].sort().join(',');
	    return _recipesJs.byRecipe[recipe];
	}

	function getBaseElements() {
	    return _recipesJs.baseElements;
	}
	//# sourceMappingURL=little-alchemy.js.map


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var data = [[["water", "fire", "earth", "air", "acid rain", "airplane", "alarm clock", "alcohol", "algae", "alien", "allergy", "alligator", "alpaca", "ambulance", "angel", "angler", "ant", "antarctica", "aquarium", "archipelago", "armadillo", "armor", "ash", "astronaut", "atmosphere", "atomic bomb", "aurora", "avalanche", "axe", "bacon", "bacteria", "baker", "bakery", "banana", "banana bread", "bandage", "bank", "barn", "bat", "batman", "batter", "bayonet", "bbq", "beach", "beaver", "bee", "beehive", "beer", "bicycle", "bird", "birdhouse", "black hole", "blade", "blender", "blizzard", "blood", "boat", "boiler", "bone", "bonsai tree", "book", "bread", "brick", "bridge", "broom", "bullet", "bulletproof vest", "bus", "butcher", "butter", "butterfly", "cactus", "cake", "camel", "campfire", "candle", "candy cane", "cannon", "car", "caramel", "carbon dioxide", "carrot", "cart", "castle", "cat", "catnip", "caviar", "centaur", "cereal", "chainsaw", "chameleon", "charcoal", "cheese", "cheeseburger", "chicken", "chicken soup", "chicken wing", "chimney", "christmas stocking", "christmas tree", "cigarette", "city", "clay", "clock", "cloud", "coal", "coconut", "coconut milk", "coffin", "cold", "computer", "computer mouse", "confetti", "constellation", "cookie", "corpse", "cotton", "cow", "crow", "crystal ball", "cuckoo", "cyborg", "cyclist", "dam", "darth vader", "day", "desert", "dew", "diamond", "dinosaur", "doctor", "dog", "doghouse", "donut", "double rainbow!", "dough", "dragon", "drone", "drum", "drunk", "dry ice", "duck", "duckling", "dune", "dust", "dynamite", "eagle", "earthquake", "eclipse", "egg", "egg timer", "electric car", "electric eel", "electrician", "electricity", "email", "energy", "engineer", "eruption", "excalibur", "explosion", "fabric", "fairy tale", "family", "family tree", "farm", "farmer", "faun", "fence", "field", "fire extinguisher", "fireman", "fireplace", "firetruck", "fireworks", "fish", "fishing rod", "flamethrower", "flashlight", "flood", "flour", "flower", "flute", "flying fish", "flying squirrel", "fog", "forest", "fortune cookie", "fossil", "fountain", "fox", "frankenstein", "french fries", "fridge", "frog", "fruit", "fruit tree", "galaxy", "garden", "gardener", "geyser", "ghost", "gift", "gingerbread house", "gingerbread man", "glacier", "glass", "glasses", "gnome", "goat", "godzilla", "gold", "golem", "granite", "grass", "grave", "gravestone", "graveyard", "greenhouse", "grenade", "grilled cheese", "grim reaper", "gun", "gunpowder", "hail", "ham", "hamburger", "hammer", "hamster", "hard roe", "harp", "hay", "hay bale", "hedge", "helicopter", "hero", "hippo", "honey", "horizon", "horse", "horseshoe", "hospital", "hourglass", "house", "human", "hummingbird", "hurricane", "ice", "ice cream", "ice cream truck", "iceberg", "iced tea", "idea", "igloo", "internet", "isle", "ivy", "jack-o'-lantern", "jam", "jedi", "jerky", "juice", "kite", "knight", "lake", "lamp", "lava", "lava lamp", "lawn mower", "leaf", "leather", "lemonade", "letter", "life", "light", "light bulb", "lighthouse", "lightsaber", "lion", "livestock", "lizard", "log cabin", "love", "lumberjack", "mac and cheese", "mailman", "manatee", "map", "mars", "marshmallows", "mayonnaise", "meat", "medusa", "mermaid", "metal", "meteor", "meteoroid", "microscope", "milk", "milk shake", "minotaur", "mirror", "mold", "monarch", "money", "monkey", "moon", "moss", "motorcycle", "mountain", "mountain goat", "mountain range", "mouse", "mousetrap", "mud", "mummy", "music", "narwhal", "needle", "nerd", "nest", "newspaper", "night", "ninja", "oasis", "obsidian", "ocean", "oil", "omelette", "optical fiber", "orchard", "origami", "ostrich", "owl", "oxygen", "ozone", "paint", "palm", "paper", "paper airplane", "parrot", "pasta", "peacock", "pegasus", "pencil", "penguin", "penicillin", "petroleum", "phoenix", "picnic", "pie", "pig", "pigeon", "piggy bank", "pilot", "pinocchio", "pipe", "piranha", "pirate", "pirate ship", "pitchfork", "pizza", "planet", "plankton", "plant", "platypus", "pond", "popsicle", "pottery", "pressure", "printer", "prism", "pterodactyl", "puddle", "pumpkin", "pyramid", "rain", "rainbow", "rat", "recipe", "reindeer", "ring", "river", "robot", "rocket", "roomba", "rope", "rose", "ruins", "ruler", "rust", "rv", "saddle", "safety glasses", "sailboat", "sailor", "salt", "sand", "sand castle", "sandpaper", "sandstone", "sandstorm", "sandwich", "santa", "scalpel", "scarecrow", "scissors", "scorpion", "scythe", "sea", "seagull", "seahorse", "seal", "seaplane", "seasickness", "seaweed", "shark", "sheep", "sheet music", "shuriken", "sickness", "skateboard", "skeleton", "ski goggles", "sky", "skyscraper", "sledge", "sloth", "smog", "smoke", "smoothie", "snake", "snow", "snow globe", "snowball", "snowboard", "snowman", "snowmobile", "soap", "soda", "solar cell", "solar system", "sound", "space", "space station", "spaceship", "sphinx", "spider", "squirrel", "star", "starfish", "statue", "steak", "steam", "steam engine", "steamboat", "steel", "stethoscope", "stone", "storm", "story", "sugar", "sun", "sundial", "sunflower", "sunglasses", "super nova", "surfer", "sushi", "swamp", "sweater", "swim goggles", "swimmer", "sword", "swordfish", "tank", "taser", "tea", "telescope", "thread", "tide", "time", "titanic", "toast", "tobacco", "tool", "toucan", "tractor", "train", "treasure", "treasure map", "tree", "treehouse", "trojan horse", "tsunami", "turtle", "twilight", "tyrannosaurus rex", "ufo", "umbrella", "unicorn", "vacuum cleaner", "vampire", "vase", "vegetable", "village", "volcano", "vulture", "wagon", "wall", "wand", "warrior", "watch", "water gun", "water lily", "water pipe", "waterfall", "wave", "wax", "web", "werewolf", "wheat", "wheel", "wild animal", "wild boar", "wind", "wind turbine", "windmill", "wine", "wire", "witch", "wizard", "wolf", "wood", "woodpecker", "wool", "wrapping paper", "yoda", "yogurt", "zombie"], [[0, []], [1, []], [2, []], [3, []], [4, [[376, 429], [376, 428]]], [5, [[49, 294], [49, 456]]], [6, [[103, 442]]], [7, [[195, 481], [261, 481]]], [8, [[0, 364], [326, 364], [409, 364]]], [9, [[273, 443]]], [10, [[244, 144]]], [11, [[280, 469], [280, 382]]], [12, [[309, 417]]], [13, [[241, 78], [130, 78]]], [14, [[244, 49]]], [15, [[244, 176]]], [16, [[214, 523], [523, 461]]], [17, [[432, 126], [247, 126]]], [18, [[0, 206], [206, 175]]], [19, [[255, 255]]], [20, [[523, 21]]], [21, [[485, 294], [485, 456]]], [22, [[506, 156]]], [23, [[244, 306], [384, 244], [244, 444], [244, 443]]], [24, [[3, 369], [424, 369]]], [25, [[156, 160]]], [26, [[462, 17], [424, 17], [17, 24]]], [27, [[156, 432]]], [28, [[52, 533]]], [29, [[351, 1]]], [30, [[469, 273]]], [31, [[244, 61], [244, 180], [244, 135]]], [32, [[243, 61], [243, 31]]], [33, [[195, 305]]], [34, [[61, 33]]], [35, [[55, 161]]], [36, [[243, 304], [243, 211]]], [37, [[279, 243], [117, 243], [243, 231]]], [38, [[312, 49], [312, 424]]], [39, [[38, 244]]], [40, [[180, 298]]], [41, [[222, 52], [222, 473]]], [42, [[74, 291], [74, 198]]], [43, [[409, 397], [326, 397], [0, 397]]], [44, [[523, 533], [523, 123]]], [45, [[181, 523]]], [46, [[45, 243], [45, 491]]], [47, [[7, 521]]], [48, [[522, 522]]], [49, [[273, 424], [149, 3], [149, 424], [3, 273]]], [50, [[49, 243]]], [51, [[449, 369]]], [52, [[294, 458]]], [53, [[206, 52], [52, 154]]], [54, [[432, 525], [432, 459], [432, 432]]], [55, [[244, 52]]], [56, [[0, 533]]], [57, [[453, 294]]], [58, [[115, 481]]], [59, [[491, 368], [491, 406]]], [60, [[338, 533], [338, 460]]], [61, [[135, 1]]], [62, [[102, 1], [314, 1], [314, 462], [102, 462]]], [63, [[382, 533], [382, 294], [382, 456]]], [64, [[533, 231]]], [65, [[223, 294]]], [66, [[65, 21]]], [67, [[78, 78]]], [68, [[244, 291]]], [69, [[298, 369], [156, 298]]], [70, [[181, 523]]], [71, [[397, 364], [126, 364]]], [72, [[135, 75]]], [73, [[126, 239], [126, 523], [279, 126]]], [74, [[1, 533]]], [75, [[518, 479], [518, 1]]], [76, [[461, 99]]], [77, [[223, 359], [223, 83]]], [78, [[522, 294]]], [79, [[461, 1]]], [80, [[244, 334], [364, 322], [491, 322]]], [81, [[436, 504], [462, 436]]], [82, [[522, 533]]], [83, [[243, 263]]], [84, [[523, 298]]], [85, [[84, 364]]], [86, [[229, 244]]], [87, [[239, 244]]], [88, [[521, 298]]], [89, [[28, 154]]], [90, [[280, 377]]], [91, [[491, 1], [533, 1]]], [92, [[481, 298]]], [93, [[92, 226]]], [94, [[279, 49], [149, 279], [49, 166]]], [95, [[0, 94]]], [96, [[94, 58]]], [97, [[243, 172], [429, 62], [172, 62]]], [98, [[535, 172]]], [99, [[275, 491], [491, 449]]], [100, [[484, 338]]], [101, [[505, 505], [425, 425]]], [102, [[397, 314]]], [103, [[481, 154], [481, 522], [481, 485]]], [104, [[3, 453]]], [105, [[369, 364], [462, 436]]], [106, [[337, 195]]], [107, [[106, 485], [298, 106]]], [108, [[533, 115]]], [109, [[244, 376]]], [110, [[485, 319], [154, 319], [529, 319]]], [111, [[312, 110]]], [112, [[338, 52], [338, 406]]], [113, [[449, 449]]], [114, [[135, 461]]], [115, [[244, 222], [244, 221]]], [116, [[364, 104]]], [117, [[214, 279]]], [118, [[49, 405], [49, 169]]], [119, [[530, 206], [531, 206]]], [120, [[103, 49]]], [121, [[244, 383]]], [122, [[48, 244]]], [123, [[44, 382], [44, 491], [44, 533], [509, 382]]], [124, [[259, 1], [259, 266]]], [125, [[462, 481], [322, 462], [481, 322], [424, 462]]], [126, [[397, 397], [397, 71]]], [127, [[185, 214], [0, 214]]], [128, [[369, 105], [105, 481]]], [129, [[280, 481]]], [130, [[244, 241]]], [131, [[523, 244], [532, 58]]], [132, [[131, 243]]], [133, [[135, 327]]], [134, [[377, 377]]], [135, [[0, 180]]], [136, [[280, 1]]], [137, [[5, 383]]], [138, [[533, 270]]], [139, [[244, 7], [47, 244], [244, 528]]], [140, [[80, 109], [247, 80]]], [141, [[0, 49], [49, 366], [49, 264], [481, 142]]], [142, [[149, 141]]], [143, [[397, 525], [126, 525], [43, 525]]], [144, [[2, 3], [462, 502], [125, 502]]], [145, [[223, 529]]], [146, [[309, 49]]], [147, [[2, 156], [2, 517]]], [148, [[462, 306]]], [149, [[273, 458], [49, 49], [495, 495], [280, 280]]], [150, [[149, 103], [149, 512]]], [151, [[78, 154]]], [152, [[175, 154]]], [153, [[244, 154], [244, 529]]], [154, [[294, 156], [440, 462], [526, 525], [274, 440]]], [155, [[272, 110], [272, 254]]], [156, [[3, 1], [364, 462]]], [157, [[244, 485]]], [158, [[506, 156]]], [159, [[473, 458]]], [160, [[223, 1]]], [161, [[479, 485]]], [162, [[460, 303], [460, 83], [263, 460], [136, 460]]], [163, [[244, 243]]], [164, [[491, 163]]], [165, [[166, 243], [166, 37]]], [166, [[169, 244], [244, 364], [244, 360]]], [167, [[209, 244]]], [168, [[509, 533]]], [169, [[2, 485], [2, 166]]], [170, [[1, 80], [369, 80], [294, 80]]], [171, [[244, 1], [244, 173]]], [172, [[243, 74], [74, 62], [74, 509]]], [173, [[171, 78]]], [174, [[160, 424]]], [175, [[229, 481]]], [176, [[485, 175], [533, 175]]], [177, [[1, 222]]], [178, [[485, 274]]], [179, [[376, 376], [376, 481]]], [180, [[521, 458], [527, 521]]], [181, [[364, 198]]], [182, [[533, 525]]], [183, [[175, 49], [424, 175]]], [184, [[448, 49], [448, 525], [448, 5], [424, 448]]], [185, [[2, 104]]], [186, [[491, 491]]], [187, [[338, 114]]], [188, [[129, 481], [129, 2], [458, 129]]], [189, [[451, 0]]], [190, [[94, 523]]], [191, [[539, 154], [154, 115]]], [192, [[327, 504]]], [193, [[294, 109], [154, 109], [294, 247]]], [194, [[523, 366]]], [195, [[491, 166], [462, 491]]], [196, [[195, 491]]], [197, [[449, 449]]], [198, [[364, 364], [364, 214], [243, 214], [181, 181]]], [199, [[244, 198]]], [200, [[453, 2]]], [201, [[217, 322], [83, 322]]], [202, [[403, 99], [403, 98], [403, 114], [403, 97], [403, 172]]], [203, [[243, 135], [243, 204]]], [204, [[273, 135]]], [205, [[247, 309]]], [206, [[1, 397], [397, 154]]], [207, [[206, 294], [206, 206]]], [208, [[198, 451]]], [209, [[279, 309]]], [210, [[129, 101]]], [211, [[294, 462], [294, 377]]], [212, [[102, 273]]], [213, [[266, 369]]], [214, [[364, 2]]], [215, [[108, 2], [115, 2]]], [216, [[215, 458]]], [217, [[215, 215], [216, 216]]], [218, [[364, 206]]], [219, [[160, 294]]], [220, [[92, 483]]], [221, [[244, 408], [115, 408]]], [222, [[294, 65]]], [223, [[1, 144]]], [224, [[376, 247], [247, 459], [247, 104]]], [225, [[291, 429]]], [226, [[291, 61]]], [227, [[294, 533]]], [228, [[522, 312]]], [229, [[149, 0], [175, 175], [149, 409], [149, 326], [149, 366]]], [230, [[14, 316]]], [231, [[214, 408], [166, 214], [214, 462]]], [232, [[231, 231]]], [233, [[364, 168], [269, 168]]], [234, [[52, 5], [527, 5]]], [235, [[263, 136]]], [236, [[239, 382], [239, 0]]], [237, [[45, 181], [45, 46]]], [238, [[424, 2], [409, 424], [326, 424]]], [239, [[231, 279]]], [240, [[294, 239]]], [241, [[243, 420], [243, 13], [243, 130]]], [242, [[397, 206]]], [243, [[533, 244], [244, 62], [485, 62], [509, 509]]], [244, [[2, 273]]], [245, [[49, 181]]], [246, [[525, 156]]], [247, [[0, 109]]], [248, [[298, 109], [298, 247]]], [249, [[78, 248]]], [250, [[409, 247], [326, 247], [409, 17], [326, 17]]], [251, [[247, 477], [109, 477]]], [252, [[244, 275], [275, 319]]], [253, [[243, 247], [243, 432]]], [254, [[110, 110], [110, 529], [110, 519]]], [255, [[326, 506], [506, 409]]], [256, [[364, 509]]], [257, [[374, 1], [52, 374], [374, 75]]], [258, [[261, 461]]], [259, [[277, 244], [263, 277]]], [260, [[291, 462], [291, 396]]], [261, [[0, 195], [369, 195]]], [262, [[525, 338], [424, 338]]], [263, [[244, 21]]], [264, [[0, 366], [382, 123]]], [265, [[294, 275]]], [266, [[2, 1]]], [267, [[266, 265]]], [268, [[214, 485], [154, 408]]], [269, [[491, 525]]], [270, [[117, 52], [351, 52]]], [271, [[195, 0]]], [272, [[338, 344]]], [273, [[469, 156], [282, 481]]], [274, [[275, 154], [154, 178]]], [275, [[154, 206]]], [276, [[274, 243], [274, 43], [274, 326], [274, 409]]], [277, [[274, 473], [156, 473], [154, 473]]], [278, [[523, 84]]], [279, [[166, 273], [523, 244], [166, 523]]], [280, [[149, 469]]], [281, [[533, 243]]], [282, [[244, 244]]], [283, [[28, 244], [244, 89]]], [284, [[92, 341]]], [285, [[244, 272]]], [286, [[117, 409]]], [287, [[338, 2]]], [288, [[390, 362]]], [289, [[461, 74]]], [290, [[149, 327]]], [291, [[117, 485], [351, 485], [52, 279], [117, 68], [351, 68], [279, 68]]], [292, [[244, 431]]], [293, [[244, 175]]], [294, [[1, 458]]], [295, [[296, 24], [424, 296]]], [296, [[458, 443]]], [297, [[206, 30], [30, 207]]], [298, [[166, 117], [117, 244]]], [299, [[298, 248]]], [300, [[244, 117]]], [301, [[206, 294]]], [302, [[481, 61]]], [303, [[244, 83], [159, 244]]], [304, [[338, 211]]], [305, [[491, 523]]], [306, [[424, 92], [424, 458]]], [307, [[364, 458], [8, 458]]], [308, [[48, 156], [48, 456]]], [309, [[147, 2]]], [310, [[309, 209], [209, 311]]], [311, [[309, 309]]], [312, [[92, 523]]], [313, [[533, 92], [294, 92]]], [314, [[0, 2]]], [315, [[115, 375]]], [316, [[244, 182], [244, 442]]], [317, [[500, 326], [500, 0], [409, 500]]], [318, [[294, 479], [294, 231]]], [319, [[244, 207]]], [320, [[49, 491], [49, 231], [149, 231]]], [321, [[338, 338]]], [322, [[306, 481], [481, 125], [424, 306]]], [323, [[419, 244]]], [324, [[126, 0], [491, 126], [126, 337]]], [325, [[266, 0]]], [326, [[0, 409], [409, 409]]], [327, [[464, 369]]], [328, [[149, 1]]], [329, [[529, 274]]], [330, [[196, 196], [169, 196]]], [331, [[49, 338]]], [332, [[49, 2], [49, 397]]], [333, [[322, 49], [49, 531]]], [334, [[364, 462], [364, 80]]], [335, [[334, 334], [154, 334]]], [336, [[0, 377], [0, 344]]], [337, [[255, 491], [491, 43]]], [338, [[533, 369]]], [339, [[5, 338]]], [340, [[49, 358]]], [341, [[180, 149]]], [342, [[49, 377]]], [343, [[49, 239], [424, 239], [49, 500]]], [344, [[533, 105], [533, 91]]], [345, [[247, 523], [247, 49], [49, 432]]], [346, [[130, 302]]], [347, [[188, 481], [188, 369]]], [348, [[1, 49]]], [349, [[214, 402], [43, 402]]], [350, [[135, 195]]], [351, [[279, 314]]], [352, [[49, 101], [49, 272], [49, 451]]], [353, [[351, 304], [368, 351]]], [354, [[5, 244], [413, 244]]], [355, [[533, 273]]], [356, [[484, 533]]], [357, [[175, 55]]], [358, [[473, 395], [395, 359]]], [359, [[394, 358], [56, 358]]], [360, [[485, 231]]], [361, [[92, 135]]], [362, [[2, 443]]], [363, [[0, 273], [326, 273], [409, 273]]], [364, [[376, 2]]], [365, [[44, 141]]], [366, [[0, 198]]], [367, [[261, 247], [261, 109]]], [368, [[1, 102], [102, 522], [102, 485]]], [369, [[2, 2], [3, 3]]], [370, [[338, 110]]], [371, [[206, 377]]], [372, [[3, 129], [49, 129]]], [373, [[462, 247], [462, 436], [436, 177]]], [374, [[504, 1], [504, 274]]], [375, [[126, 215], [126, 458]]], [376, [[0, 3], [104, 0]]], [377, [[376, 462], [376, 274]]], [378, [[523, 359], [394, 523]]], [379, [[180, 338], [338, 31]]], [380, [[403, 523], [279, 403]]], [381, [[128, 294], [128, 211]]], [382, [[309, 0], [376, 309]]], [383, [[294, 273], [456, 273], [273, 21]]], [384, [[5, 443]]], [385, [[383, 501]]], [386, [[479, 479]]], [387, [[364, 282], [181, 282]]], [388, [[481, 83], [481, 243]]], [389, [[533, 344]]], [390, [[3, 294], [294, 334], [456, 334], [3, 456]]], [391, [[243, 78]]], [392, [[239, 270]]], [393, [[485, 207], [160, 207], [157, 207]]], [394, [[56, 525], [56, 161]]], [395, [[244, 56], [244, 394]]], [396, [[409, 462], [326, 462], [1, 409], [1, 326]]], [397, [[3, 458], [525, 458]]], [398, [[397, 83]]], [399, [[397, 338]]], [400, [[458, 397]]], [401, [[397, 459], [397, 246], [397, 156]]], [402, [[61, 225], [92, 61], [61, 29]]], [403, [[244, 99]]], [404, [[52, 130], [52, 241]]], [405, [[244, 231]]], [406, [[52, 52]]], [407, [[523, 143], [523, 397]]], [408, [[52, 214], [52, 521]]], [409, [[0, 0]]], [410, [[49, 409], [49, 326], [49, 43]]], [411, [[239, 409], [326, 239], [175, 239]]], [412, [[131, 409]]], [413, [[5, 0], [5, 326], [5, 409]]], [414, [[420, 409], [420, 326], [56, 420], [455, 420], [394, 420]]], [415, [[364, 409], [364, 326]]], [416, [[55, 326], [409, 55], [326, 523], [409, 523]]], [417, [[104, 279]]], [418, [[338, 316]]], [419, [[449, 52]]], [420, [[244, 376], [244, 420], [244, 420], [244, 30]]], [421, [[435, 522]]], [422, [[115, 481], [58, 58]]], [423, [[207, 432]]], [424, [[3, 104]]], [425, [[243, 424]]], [426, [[432, 82], [432, 508]]], [427, [[523, 481]]], [428, [[429, 185], [185, 101]]], [429, [[1, 533]]], [430, [[195, 53]]], [431, [[523, 529]]], [432, [[376, 109], [453, 109]]], [433, [[432, 119]]], [434, [[432, 244]]], [435, [[533, 432], [432, 467]]], [436, [[432, 244], [434, 434], [432, 81], [434, 81]]], [437, [[432, 308], [432, 78]]], [438, [[327, 22]]], [439, [[0, 80], [261, 80]]], [440, [[462, 485]]], [441, [[462, 362]]], [442, [[3, 517]]], [443, [[424, 449], [462, 449], [306, 449]]], [444, [[443, 243]]], [445, [[5, 23]]], [446, [[244, 278]]], [447, [[523, 479]]], [448, [[312, 491]]], [449, [[424, 322], [322, 478]]], [450, [[175, 449], [409, 449], [326, 449]]], [451, [[458, 485], [244, 292]]], [452, [[291, 42], [1, 117]]], [453, [[0, 1], [0, 156]]], [454, [[57, 485], [57, 522]]], [455, [[454, 0], [454, 56]]], [456, [[294, 105]]], [457, [[485, 130]]], [458, [[3, 266]]], [459, [[156, 104], [104, 154]]], [460, [[244, 74]]], [461, [[195, 156], [261, 1], [261, 156]]], [462, [[1, 424]]], [463, [[103, 462]]], [464, [[364, 462], [181, 462]]], [465, [[462, 207], [43, 207]]], [466, [[160, 449]]], [467, [[244, 517]]], [468, [[175, 415], [86, 415]]], [469, [[314, 364], [314, 214]]], [470, [[535, 485], [244, 535]]], [471, [[207, 0]]], [472, [[244, 471]]], [473, [[52, 294], [52, 456]]], [474, [[175, 473]]], [475, [[78, 21], [78, 222]]], [476, [[222, 154]]], [477, [[0, 269]]], [478, [[206, 424], [206, 449], [206, 443]]], [479, [[116, 485], [522, 535]]], [480, [[409, 306], [326, 306]]], [481, [[397, 206]]], [482, [[455, 250]]], [483, [[402, 1], [61, 1]]], [484, [[364, 1]]], [485, [[294, 244]]], [486, [[49, 377]]], [487, [[166, 78], [169, 78]]], [488, [[454, 456], [454, 294], [454, 522], [454, 508]]], [489, [[358, 490]]], [490, [[358, 287]]], [491, [[364, 481]]], [492, [[491, 243]]], [493, [[239, 533]]], [494, [[326, 147], [409, 147]]], [495, [[149, 397]]], [496, [[125, 322]]], [497, [[291, 129]]], [498, [[384, 9], [5, 9]]], [499, [[485, 376], [376, 161]]], [500, [[377, 239], [377, 273], [134, 239], [134, 273]]], [501, [[154, 64]]], [502, [[244, 55], [244, 502], [244, 502]]], [503, [[364, 368], [368, 181]]], [504, [[169, 195]]], [505, [[243, 243]]], [506, [[266, 2], [266, 309], [1, 309]]], [507, [[49, 115]]], [508, [[82, 239]]], [509, [[62, 62]]], [510, [[531, 533]]], [511, [[473, 244]]], [512, [[244, 103]]], [513, [[0, 222]]], [514, [[181, 366]]], [515, [[0, 356]]], [516, [[309, 382]]], [517, [[409, 525], [326, 525]]], [518, [[45, 46]]], [519, [[447, 479]]], [520, [[532, 244], [520, 244], [520, 244]]], [521, [[169, 166], [364, 166]]], [522, [[485, 533]]], [523, [[186, 273]]], [524, [[351, 523], [351, 186]]], [525, [[369, 3], [3, 156]]], [526, [[527, 154]]], [527, [[243, 525], [522, 525]]], [528, [[195, 7]]], [529, [[154, 294]]], [530, [[531, 64], [244, 64]]], [531, [[244, 156]]], [532, [[523, 131], [523, 306], [131, 186]]], [533, [[485, 491]]], [534, [[49, 533]]], [535, [[417, 485], [406, 417]]], [536, [[202, 338]]], [537, [[259, 469]]], [538, [[298, 30]]], [539, [[115, 273], [244, 539], [244, 539]]]]]].map(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2);

	    var names = _ref2[0];
	    var records = _ref2[1];
	    return records.map(function (record) {
	        return [names[record[0]], record[1].map(function (recipe) {
	            return recipe.map(function (element) {
	                return names[element];
	            });
	        })];
	    });
	})[0];
	exports.data = data;
	var byElement = data.reduce(function (pv, _ref3, i, a) {
	    var _ref32 = _slicedToArray(_ref3, 2);

	    var name = _ref32[0];
	    var recipes = _ref32[1];

	    pv[name] = recipes.map(function (x) {
	        return x.sort().join(",");
	    });
	    return pv;
	}, {});
	exports.byElement = byElement;
	var byRecipe = data.reduce(function (pv, _ref4, i, a) {
	    var _ref42 = _slicedToArray(_ref4, 2);

	    var name = _ref42[0];
	    var recipes = _ref42[1];

	    recipes.map(function (x) {
	        return x.sort().join(",");
	    }).forEach(function (recipe) {
	        if (!pv.hasOwnProperty(recipe)) pv[recipe] = [];
	        pv[recipe].push(name);
	    });
	    return pv;
	}, {});
	exports.byRecipe = byRecipe;
	var baseElements = data.filter(function (x) {
	    return x[1].length == 0;
	}).map(function (x) {
	    return x[0];
	});
	exports.baseElements = baseElements;
	//# sourceMappingURL=recipes.js.map


/***/ }
/******/ ]);