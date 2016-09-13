var canvas, stage;

var mouseTarget;	// the display object currently under the mouse, or being dragged
var dragStarted;	// indicates whether we are currently in a drag operation
var offset;
var update = true;
var elements = [];

function init() {
	// examples.showDistractor();
	// create stage and point it to the canvas:
	canvas = document.getElementById("bodyCanvas");
	stage = new createjs.Stage(canvas);

	createjs.Touch.enable(stage);
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

  var image = new Image();
	image.src = "./img/fire.png";
	image.onload = handleImageLoad;

  const line = new createjs.Shape();

  line.graphics.setStrokeStyle(1);
  line.graphics.beginStroke("Black");
  line.graphics.moveTo(0, 500);
  line.graphics.lineTo(1000, 500);
  line.graphics.endStroke();

  stage.addChild(line);
}

function stop() {
	createjs.Ticker.removeEventListener("tick", tick);
}

function handleImageLoad(event) {
	var image = event.target;
	var bitmap;
	var container = new createjs.Container();
	stage.addChild(container);

	// create and populate the screen with random daisies:
	bitmap = new createjs.Bitmap(image);
	container.addChild(bitmap);
	bitmap.x = 40;
	bitmap.y = 545;
	bitmap.regX = bitmap.image.width / 2 | 0;
	bitmap.regY = bitmap.image.height / 2 | 0;
	bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.1;
	bitmap.cursor = "pointer";

	// using "on" binds the listener to the scope of the currentTarget by default
	// in this case that means it executes in the scope of the button.
	bitmap.on("mousedown", function (evt) {

    if(evt.currentTarget.y > 465 ) {
      var imageDup = new Image();
      imageDup.src = this.image.src;
      imageDup.onload = handleImageLoad;
      this.parent.addChild(this);
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    }
	});

  bitmap.on("pressup", function (evt) {
    if(this.y < 465 ) {
      elements.push(bitmap);
      let toRemove = [];
      for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (this !== element && !(element.x - 10 > this.x + 10 ||
                                  element.x + 10 < this.x - 10 ||
                                  element.y - 10 > this.y + 10 ||
                                  element.y + 10 < this.y - 10)) {
             stage.removeChild(this.parent);
             stage.removeChild(element.parent);
             toRemove.push(element);
             toRemove.push(this);
          }
      }
      elements = elements.filter((el) => {
        return !(toRemove.includes(el));
      });
    } else {
      stage.removeChild(this.parent);
    }
    update = true;
  });

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
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
		// indicate that the stage should be updated on the next tick:
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
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	if (update) {
		update = false; // only update once
		stage.update(event);
	}
}
