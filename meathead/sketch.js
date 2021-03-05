let bg;

let cartoonEyeLeft;
let cartoonEyeRight;
let bulgyEyeLeft;
let bulgyEyeRight;
let bushBrowLeft;
let bushBrowRight;
let fancyBrowLeft;
let fancyBrowRight;
let lilBrowLeft;
let lilBrowRight;
let openMouth;
let screamingMouth;
let smilingMouth;
let tongueMouth;

let displayList;
let draggedSprite;

let offsetX = 0;
let offsetY = 0;

function preload() {
  bg = loadImage('images/bg.png');
  var ce = loadAnimation('images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeCenter.png',
  						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeRight.png',
						 'images/cartoonEyeCenter.png',
						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeQuarter.png',
  						 'images/cartoonEyeHalf.png',
  						 'images/cartoonEyeFull.png',
  						 'images/cartoonEyeHalf.png',
  						 'images/cartoonEyeQuarter.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png',
  						 'images/cartoonEyeLeft.png');
  var bb = loadAnimation('images/bushBrow0001.png','images/bushBrow0004.png');
  var be = loadImage('images/bulgyEye.png');
  var fb = loadImage('images/fancyBrow.png');
  var lb = loadImage('images/lilBrow.png');
  var om = loadImage('images/openMouth.png');
  var sm = loadImage('images/screamingMouth.png');
  var gm = loadImage('images/smilingMouth.png');
  var tm = loadImage('images/tongueMouth.png');

  displayList = new Group();

  cartoonEyeLeft = createSprite(120,200);
  cartoonEyeLeft.addAnimation('winking',ce);
  cartoonEyeLeft.name = "cartoonEyeLeft";
  cartoonEyeLeft.setCollider("rectangle",0,0,46,100);

  cartoonEyeRight = createSprite(65,200);
  cartoonEyeRight.addAnimation('winking',ce);
  cartoonEyeRight.name = "cartoonEyeRight";
  cartoonEyeRight.setCollider("rectangle",0,0,46,100);

  bushBrowLeft = createSprite(230,30);
  bushBrowLeft.addAnimation('raising',bb);
  bushBrowLeft.name = "bushBrowLeft";

  bushBrowRight = createSprite(80,30);
  bushBrowRight.mirrorX(-1);
  bushBrowRight.addAnimation('raising',bb);
  bushBrowRight.name = "bushBrowRight";

  bulgyEyeLeft = createSprite(220,300);
  bulgyEyeLeft.name = "bulgyEyeLeft";
  bulgyEyeLeft.addImage(be);
  bulgyEyeLeft.setCollider("circle",0,0,45);

  bulgyEyeRight = createSprite(220,200);
  bulgyEyeRight.addImage(be);
  bulgyEyeRight.name = "bulgyEyeRight";
  bulgyEyeRight.setCollider("circle",0,0,45);

  fancyBrowLeft = createSprite(220,70);
  fancyBrowLeft.addImage(fb);

  fancyBrowLeft.name = "fancyBrowLeft";
  fancyBrowRight = createSprite(90,70);
  fancyBrowRight.mirrorX(-1);
  fancyBrowRight.addImage(fb);
  fancyBrowRight.name = "fancyBrowRight";

  lilBrowLeft = createSprite(220,120);
  lilBrowLeft.addImage(lb);
  lilBrowRight = createSprite(90,120);
  lilBrowLeft.name = "lilBrowLeft";

  lilBrowRight.mirrorX(-1);
  lilBrowRight.addImage(lb);
  lilBrowRight.name = "lilBrowRight";

  openMouth = createSprite(75,440);
  openMouth.addImage(om);
  openMouth.name = "openMouth";
  openMouth.setCollider("rectangle",0,-10,102,89);

  screamingMouth = createSprite(220,420);
  screamingMouth.addImage(sm);
  screamingMouth.name = "screamingMouth";

  smilingMouth = createSprite(75,540);
  smilingMouth.addImage(gm);
  smilingMouth.name = "smilingMouth";
  smilingMouth.setCollider("rectangle",0,-10,94,64);

  tongueMouth = createSprite(75,320);
  tongueMouth.addImage(tm);
  tongueMouth.name = "tongueMouth";
  tongueMouth.setCollider("rectangle",0,0,85,96);

}

function setup() {
  createCanvas(600,600);
  bg.loadPixels();
  allSprites.forEach(function(sprite){
    sprite.addToGroup(displayList);
    addMouseBehavior(sprite);
  });
}

function resetMouseBehavior(sprite) {
	delete sprite.onMouseOver;
	delete sprite.onMouseOut;
	delete sprite.onMousePressed;
	delete sprite.onMouseReleased;
}

function addMouseBehavior(sprite) {
    sprite.onMouseOver = function() {
    	addMouseBehavior(sprite);
    	displayList.remove(sprite);
    	displayList.forEach(function(sp){
    		resetMouseBehavior(sp);
    		sp.mouseActive = false;
    	});	
    };

    sprite.onMouseOut = function() {   
    	displayList.add(sprite);
    	displayList.forEach(function(sp){
    		addMouseBehavior(sp);
    		sp.mouseActive = true;
    	});
    };

    sprite.onMousePressed = function() {
    	offsetX = mouseX - sprite.position.x;
    	offsetY = mouseY - sprite.position.y;
    	
	    if (draggedSprite == null) {
	      draggedSprite = this;
	      var d = this.depth;
	      if (d == allSprites.maxDepth()) return;
		  for (var j = 0; j < allSprites.length; j++) {
			if (allSprites[j].depth > d) {
				allSprites[j].depth--;
			}
		  }
		  this.depth = allSprites.length;
		}
	};

  	sprite.onMouseReleased = function() {
      	draggedSprite = null;
  	};
}

function draw() { 
  background('#99CCCC');
  image(bg, 0, 0, 600, 600);

  if (draggedSprite != null) {
    draggedSprite.position.x = mouseX - offsetX;
    draggedSprite.position.y = mouseY - offsetY;
  }	

    // tongueMouth.debug = mouseIsPressed;
    // cartoonEyeLeft.debug = mouseIsPressed;
	// cartoonEyeRight.debug = mouseIsPressed;
	// bushBrowLeft.debug = mouseIsPressed;
	// bushBrowRight.debug = mouseIsPressed;
	// bulgyEyeLeft.debug = mouseIsPressed;
	// bulgyEyeRight.debug = mouseIsPressed;
	// fancyBrowLeft.debug = mouseIsPressed;
	// fancyBrowRight.debug = mouseIsPressed;
	// lilBrowLeft.debug = mouseIsPressed;
	// lilBrowRight.debug = mouseIsPressed;
	// openMouth.debug = mouseIsPressed;
	// screamingMouth.debug = mouseIsPressed;
	// smilingMouth.debug = mouseIsPressed;

  drawSprites();
}