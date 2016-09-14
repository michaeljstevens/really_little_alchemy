const Element = require('./element.js');
const la = require('little-alchemy');


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
