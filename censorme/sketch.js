let faceapi;
let video;
let detections;
let button;
let paused = true;
let monoSynth;
let myvad;

// Synthesizer settings
let note = 'C6';
let velocity = 0.5; // from 0 to 1

// FaceAPI detection options
const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

function setup() {
    createCanvas(300, 225);

    // --- Button Setup ---
    button = new Clickable();
    button.width = 50;
    button.height = 20;
    button.color = "#cccccc";
    button.text = "START";
    button.textColor = "#000000";
    button.cornerRadius = 2;
    button.strokeWeight = 2;
    button.stroke = "#333333";
    button.locate(width / 2 - button.width / 2, height / 2 - button.height / 2);

    button.onPress = async function() {
        // --- Initialize p5.js elements ---
        video = createCapture(VIDEO);
        video.size(width, height);
        video.hide();
        faceapi = ml5.faceApi(video, detectionOptions, modelReady);

        button.width = 74;
        button.locate(width / 2 - button.width / 2, height / 2 - button.height / 2);
        button.text = "LOADING...";

        // Start p5.sound's audio context and create the synth
        await userStartAudio();
        monoSynth = new p5.MonoSynth();

        // --- Initialize VAD with Attack/Release logic ---
        try {
            myvad = await vad.MicVAD.new({
                onSpeechStart: () => {
                    // Start the note and hold it
                    monoSynth.triggerAttack(note, velocity);
                },
                onSpeechEnd: (audio) => {
                    // Stop the note
                    monoSynth.triggerRelease(0);
                },
                onVADMisfire: () => {
                	// Stop the note when sample isn't long enough to trigger onSpeechEnd
                	monoSynth.triggerRelease(0);
                },
            });
            myvad.start();
        } catch (e) {
            console.error("Failed to initialize VAD:", e);
            button.text = "VAD FAILED";
        }
    };

    button.onHover = function() {
        button.color = "#888888";
    };

    button.onOutside = function() {
        button.color = "#cccccc";
    };
}

function modelReady() {
    console.log("FaceAPI model ready!");
    faceapi.detect(gotResults);
    paused = false;
}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    detections = result;

    background(255);
    image(video, 0, 0, width, height);
    if (detections && detections.length > 0) {
        drawLandmarks(detections);
    }
    
    if (!paused) {
        faceapi.detect(gotResults);
    }
}

function draw() {
    if (paused) {
        background(255);
        fill(0);
        rect(0, 0, width, height);
        button.draw();
    }
}

// --- Helper drawing functions ---

function drawLandmarks(detections) {
    fill(0);
    noStroke();

    for (let i = 0; i < detections.length; i += 1) {
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        beginShape();
        vertex(leftEyeBrow[0]._x - 10, leftEyeBrow[0].y);
        vertex(leftEyeBrow[0]._x - 10, leftEyeBrow[0].y + 2 * (leftEye[0].y - leftEyeBrow[0].y));
        vertex(rightEyeBrow[rightEyeBrow.length - 1]._x + 10, rightEyeBrow[0].y + 2 * (rightEye[0].y - rightEyeBrow[0].y));
        vertex(rightEyeBrow[rightEyeBrow.length - 1]._x + 10, rightEyeBrow[rightEyeBrow.length - 1].y);
        endShape(CLOSE);
    }
}