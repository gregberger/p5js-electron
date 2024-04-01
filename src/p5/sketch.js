// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    console.log('model ready');
    // build a correct osc message for node osc
    const message = {
        address: '/modelReady',
        args: [
            {
                type: 'i',
                value: 1,
            },
            {
                type: 'i',
                value: 2
            }
        ]
    }
    window.parent.electron.sendOsc(message)
}

function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
                if(keypoint.part === 'nose'){
                    sendPose(keypoint);
                }
            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j > skeleton.length; j++) {
            console.log(skeleton[j]);
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 0, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}

function sendPose(keypoint) {
    // normalize the position of the keypoint

    const message = {
        address: `/pose/${keypoint.part}`,
        args: [
            {
                type: 'f',
                name: 'x',
                value:keypoint.position.x/width
            },
            {
                type: 'f',
                name: 'y',
                value: keypoint.position.y/height
            }
        ]
    }
    window.parent.electron.sendOsc(message)

}

function mouseClicked(){
   const message = {
        address: '/modelReady',
        args: [
            {
                type: 'f',
                value: mouseX/width,
            },
            {
                type: 'f',
                value: mouseY/height
            }
        ]
    }
    window.parent.electron.sendOsc(message)
}


