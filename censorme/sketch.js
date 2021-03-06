let faceapi;
let video;
let detections;
let button;
let paused = true;
let mic;
let monoSynth;

let note = 'C6';
// note velocity (volume, from 0 to 1)
let velocity = .5;
// time from now (in seconds)
let time = 0;
// note duration (in seconds)
let dur = 1/2;

const MIC_INIT = 0.01;
let micThreshold = MIC_INIT;

// by default all options are set to true
const detectionOptions = {
	withLandmarks: true,
	withDescriptors: false,
};

function setup() {
	createCanvas(350, 263);
	button = new Clickable();
	button.width = 50;
	button.height = 20;
	button.color = "#cccccc";
	button.text = "START";
	button.textColor = "#000000"
	button.cornerRadius = 2;
	button.strokeWeight = 2;
	button.stroke = "#333333";
	button.locate(width/2 - button.width/2,height/2-button.height/2);
	button.onPress = function(){
		// load up your video
  	video = createCapture(VIDEO);
  	video.size(width, height);
  	video.hide(); // Hide the video element, and just show the canvas
		faceapi = ml5.faceApi(video, detectionOptions, modelReady);
		button.width = 74;
		button.locate(width/2 - button.width/2,height/2-button.height/2);
		button.text = "LOADING...";
		userStartAudio();
		mic = new p5.AudioIn();
  	mic.start();
  	monoSynth = new p5.MonoSynth();
	}
	button.onHover = function(){
		button.color = "#888888";
	}
	button.onOutside = function(){
		button.color = "#cccccc";
	}
}

function modelReady() {
	faceapi.detect(gotResults);
	paused = false;
}

function gotResults(err, result) {
	if (err) {
		console.log(err);
		return;
	}
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0, 0, width, height);
  if (detections) {
  	if (detections.length > 0) {
	    //console.log(detections)
	    drawLandmarks(detections);
		}
  }
  
  faceapi.detect(gotResults);
}

function draw() {
	if (paused) {
		background(255);
		fill(0);
		rect(0,0,width,height);
		button.draw();
	}
	else {
		var micLevel = mic.getLevel();
		if (micLevel > micThreshold) {
			//play sound
			monoSynth.play(note, velocity, time, dur);
			micThreshold = 5;
			setTimeout(function(){micThreshold = MIC_INIT;},1000);
		}
	}
}

function drawLandmarks(detections) {
	fill(0);
  noStroke();

	for (let i = 0; i < detections.length; i += 1) {
		const leftEye = detections[i].parts.leftEye;
		const rightEye = detections[i].parts.rightEye;
		const rightEyeBrow = detections[i].parts.rightEyeBrow;
		const leftEyeBrow = detections[i].parts.leftEyeBrow;

		beginShape();
		vertex(leftEyeBrow[0]._x - 10,leftEyeBrow[0].y);
		vertex(leftEyeBrow[0]._x - 10,leftEyeBrow[0].y + 2 * (leftEye[0].y-leftEyeBrow[0].y));
		vertex(rightEyeBrow[rightEyeBrow.length-1]._x + 10,rightEyeBrow[0].y + 2 * (rightEye[0].y-rightEyeBrow[0].y));
		vertex(rightEyeBrow[rightEyeBrow.length-1]._x + 10,rightEyeBrow[rightEyeBrow.length-1].y);
		endShape(CLOSE);
	}
}

function drawPart(feature, pointToUse) {
	beginShape();
	if (feature) {
		if (pointToUse) {
			const x = feature[0]._x;
			const y = feature[0]._y;
			vertex(x, y); 
		}
		else {
			const x = feature[feature.length-1]._x;
			const y = feature[feature.length-1]._y;
			vertex(x, y); 
		}
	}
	else {
		endShape(CLOSE);
	}
}