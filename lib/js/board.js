const combine = require('./combine.js');

var canvas, stage;

var mouseTarget;
var dragStarted;
var offset;
var update = true;
var initial = ["fire", "water", "earth", "air"];
var all = ["fire", "water", "earth", "air", "pressure", "energy", "dust", "lava",
"rain", "mud", "steam", "sea", "wind","stone","atmosphere","earthquake","gunpowder",
"salt","volcano","granite","obsidian","brick","plant","flood","ocean","geyser","sky","sand","wall",
"fog","mountain","storm","metal","explosion","swamp","tsunami","algae","isle","wave","cotton",
"grass","tobacco","seaweed","garden","moss","coal","ash","cloud","eruption","hurricane",
"rust","sound","atomic bomb","grenade","fireworks","glass","sun","dew","bullet",
"archipelago","steel","electricity","blade","mountain range","river","beach","horizon",
"flower","ivy","diamond","sandstorm","clay","cactus","desert","quicksand","dune","moon",
"boiler","sandstone","life","house","pond","bird","scissors","blender","scythe","sword",
"golem","pyramid","oasis","ring","human","light bulb","wire","pottery","water lily",
"sunflower","glasses","mirror","telescope"];

var elements = [];
var discovered = [];
var elOffset = 0;
var yCoord = 520;
var mute = false;

createjs.Sound.registerSound("./assets/sounds/great_job.wav", "greatJob");
createjs.Sound.registerSound('./assets/sounds/laugh.wav', "laugh");
createjs.Sound.registerSound('./assets/sounds/nuclear_war.mp3', "explode");
createjs.Sound.registerSound('./assets/sounds/win.mp3', "win");


var winModal = new createjs.Shape();
winModal.graphics.beginFill('ivory');
winModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
winModal.alpha = 1;
winModal.graphics.drawRect(240, 100, 500, 300);
winModal.graphics.endFill();
winModal.visible = false;

var winModalLabel = new createjs.Text("You Win!", "80px Arial", "#000");
winModalLabel.x = 490;
winModalLabel.y = 190;
winModalLabel.textAlign = 'center';
winModalLabel.lineWidth = 800;
winModalLabel.lineHeight = 50;
winModalLabel.visible = false;


document.addEventListener("DOMContentLoaded", function() {
	canvas = document.getElementById("bodyCanvas");

	stage = new createjs.Stage(canvas);

	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true;

  const line = new createjs.Shape();

  line.graphics.setStrokeStyle(10);
  line.graphics.beginStroke("black");
  line.graphics.moveTo(0, 500);
  line.graphics.lineTo(1000, 500);
  line.graphics.endStroke();

	stage.addChild(line);

	var disContainer = new createjs.Container();
 	stage.addChild(disContainer);

	var mask = new createjs.Shape();
	mask.graphics.f("#f00").dr(0,505,1000,500);
	disContainer.mask = mask;

	var wrapper;
	var canvasHeight;
	var vScrollHeight;
	var canvasWrapperHeight=300;

	$(".bar").draggable({
		containment: "parent"
	});

	$(".bar").on("drag", function (event, ui) {
		stage.children[1].y = 0 - ui.position.top * 5.8;
		stage.update();
	});


	$(".mute").on("click", (e) => {
		if (e.currentTarget.alt === "false") {
			e.currentTarget.src = "./assets/img/mute.png";
			e.currentTarget.alt = "true";
			mute = true;
		} else {
			e.currentTarget.src = "./assets/img/unmute.png";
			e.currentTarget.alt = "false";
			mute = false;
		}
		update = true;
	});

	var mainContainer = new createjs.Container();
	stage.addChild(mainContainer);
	mainContainer.setBounds(0,0,1000,500);

	stage.addChild(winModal);
	stage.addChild(winModalLabel);

	var aboutModal = new createjs.Shape();
	aboutModal.graphics.beginFill('ivory');
	aboutModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
	aboutModal.alpha = 1;
	aboutModal.graphics.drawRect(240, 100, 500, 300);
	aboutModal.graphics.endFill();
	stage.addChild(aboutModal);
	aboutModal.visible = false;

	var modalLabel = new createjs.Text("Really Little Alchemy", "40px Fantasy", "#000");
	modalLabel.x = 490;
	modalLabel.y = 120;
	modalLabel.textAlign = 'center';
	modalLabel.lineWidth = 800;
	modalLabel.lineHeight = 50;
	stage.addChild(modalLabel);
	modalLabel.visible = false;

	var modalDescription = new createjs.Text("", "20px Fantasy", "#000");
	modalDescription.text = "You're given 4 elements to begin.\
	Try combining these with themselves and each other to discover new elements!\
	Pull the elements into the upper compartment to combine.\
	There are 100 in total. Good luck!"
	modalDescription.textBaseline='alphabetic';
	modalDescription.x = 480;
	modalDescription.y = 200;
	modalDescription.textAlign = 'center';
	modalDescription.lineWidth = 300;
	modalDescription.lineHeight = 20;
	stage.addChild(modalDescription);
	modalDescription.visible = false;


	var buttonok = new createjs.Shape();
	buttonok.graphics.beginFill('black');
	buttonok.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
	buttonok.graphics.drawRoundRect(630, 350, 100, 40, 5);
	buttonok.cursor = "pointer";
	stage.addChild(buttonok);
	buttonok.visible = false;

	buttonok.on("click", () => {
		aboutModal.visible = false;
		modalLabel.visible = false;
		modalDescription.visible = false;
		buttonokLabel.visible = false;
		buttonok.visible = false;
		update = true;
	});

	var buttonokLabel = new createjs.Text("Continue", "20px Fantasy", "white");
	buttonokLabel.x = 640;
	buttonokLabel.y = 360;
	modalDescription.lineWidth = 300;
	modalDescription.lineHeight = 20;
	stage.addChild(buttonokLabel);
	buttonokLabel.visible = false;

	$(".about").on("click", () => {
		aboutModal.visible === true ? aboutModal.visible = false : aboutModal.visible = true;
		modalLabel.visible === true ? modalLabel.visible = false : modalLabel.visible = true;
		modalDescription.visible === true ? modalDescription.visible = false : modalDescription.visible = true;
		buttonok.visible === true ? buttonok.visible = false : buttonok.visible = true;
		buttonokLabel.visible === true ? buttonokLabel.visible = false : buttonokLabel.visible = true;
    stage.setChildIndex(aboutModal, stage.getNumChildren()-1);
		stage.setChildIndex(modalLabel, stage.getNumChildren()-1);
		stage.setChildIndex(modalDescription, stage.getNumChildren()-1);
		stage.setChildIndex(buttonok, stage.getNumChildren()-1);
		stage.setChildIndex(buttonokLabel, stage.getNumChildren()-1);
		update = true;
	});

	buttonok.on("click", () => {
		aboutModal.visible = false;
		modalLabel.visible = false;
		modalDescription.visible = false;
		buttonokLabel.visible = false;
		buttonok.visible = false;
		update = true;
	});

	$(".cheat").on("click", (e) => {
		elOffset = 0;
		yCoord = 520;
		stage.children[1].removeAllChildren();
		stage.children[2].removeAllChildren();
		winModal.visible = false;
		winModalLabel.visible = false;

		if (stage.children[11] && stage.children[11].children) {
			stage.children[11].removeAllChildren();
		}
		discovered = [];
		update = true;
		if(e.currentTarget.textContent === "Unlock All") {
			e.currentTarget.textContent = "Start Over";
			all.forEach(el => {
				let image = new Image();
				image.src = `./assets/img/${el}.png`;
				let elObj = {name: el};
				image.onload = handleImageLoad.bind(elObj);
			});
		} else {
			e.currentTarget.textContent = "Unlock All";
			initial.forEach(el => {
				let image = new Image();
				image.src = `./assets/img/${el}.png`;
				let elObj = {name: el};
				image.onload = handleImageLoad.bind(elObj);
			});
		}
	});


	update = true;

  initial.forEach(el => {
    let image = new Image();
		image.src = `./assets/img/${el}.png`;
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

	if (this.discovered) {
		bitmap.x = this.altX;
		bitmap.y = this.altY;
		stage.children[2].addChild(bitmap);
		elements.push(bitmap);
	} else {
		bitmap.x = this.x || 40 + elOffset;
		bitmap.y = this.y || yCoord;
		stage.children[1].addChild(container);
		container.addChild(bitmap);
	}
	bitmap.regX = bitmap.width / 2 | 0;
	bitmap.regY = bitmap.height / 2 | 0;
	bitmap.name = this.name;
	bitmap.scaleX = bitmap.scaleY = bitmap.scale = .5;
	bitmap.cursor = "pointer";

	var text = new createjs.Text(this.name, "18px Fantasy", "#ff7700");
	text.y = this.y + 55 || yCoord + 55;
	text.x = bitmap.x + 5;
	container.addChild(text);

	if (!this.x && !this.discovered) {
		if (elOffset > 700) {
			elOffset = 0;
			yCoord += 100;
		} else {
			elOffset += 140;
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

	var foundCount = new createjs.Text(`${discovered.length}/100`, "72px Fantasy", "#ff7700");
	foundCount.x = 25;
	foundCount.y = 25;
	foundCount.name = "foundCount";
	stage.addChild(foundCount);

	update = true;

	bitmap.on("mousedown", function (evt) {
    if(evt.currentTarget.y > 465 ) {
			stage.children[2].addChild(bitmap);
			let bitmapDup = bitmap.clone(true);
      var imageDup = new Image();
      imageDup.src = this.image.src;
      imageDup.onload = handleImageLoad.bind(bitmapDup);

			this.y = evt.stageY - 20;
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    } else {
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		}
	});

  bitmap.on("pressup", function (evt) {
		if(!elements.includes(bitmap)) elements.push(bitmap);
    if(this.y < 465 ) {
      let toRemove = [];
      for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (this !== element && !(element.x - 15 > this.x + 15 ||
                                  element.x + 15 < this.x - 15 ||
                                  element.y - 15 > this.y + 15 ||
                                  element.y + 15 < this.y - 15)) {

				 if([this.name, element.name].sort().join()===["atomic bomb", "earth"].join()) {
					 let kimContainer = new createjs.Container;
					 for (var i = 0; i < 250; i++) {
					 	let kim = new Image();
						kim.src="./assets/img/kim-yong-trump.jpg";
						let kimbitmap = new createjs.Bitmap(kim)
						kimContainer.addChild(kimbitmap);
						kimbitmap.x = Math.random() * 1000;
						kimbitmap.y = Math.random() * 1000;
					 }
					 if(!mute) createjs.Sound.play("explode")
					 stage.addChild(kimContainer);
					 $('.cheat').text("Start Over");
					 update = true;
				 }
				 let combined = combine(this.name, elements[i].name);
				 if (combined !== undefined) {
					 combined = combined[0];
					 var discoveredEl = new Image();
					 discoveredEl.src = `./assets/img/${combined}.png`;
					 if(discovered.every(el => el.image.src !== discoveredEl.src)) {
						 let elObj = {name: combined};
						 discoveredEl.onload = handleImageLoad.bind(elObj);
					 }
					 let elObj = {name: combined, altX: this.x, altY: this.y, discovered: true};
		       let imageDup = new Image();
		       imageDup.src = discoveredEl.src
		       imageDup.onload = handleImageLoad.bind(elObj);
					 if(!mute) createjs.Sound.play("greatJob");
				 } else {
					 if(!mute) createjs.Sound.play("laugh");
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
			stage.children[2].removeChild(this);
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

	if (stage.children[1].children.length >= 100) {
		if(!mute) createjs.Sound.play("win");
		winModal.visible = true;
		winModalLabel.visible = true;
		update = true;
	} else {
		winModal.visible = false;
		winModalLabel.visible = false;
	}

	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {

	if (update) {
		update = false;
		stage.update(event);
	}

}
