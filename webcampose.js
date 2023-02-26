let webcamvideo;
let camPoseNet;
let campose;
let camskeleton;

function setup() {
  createCanvas(680, 480);
  webcamvideo = createCapture(VIDEO);
  // the createCapture() function creates an HTML video tag
  // as well as pulls up image to be used in p5 canvas
  // hide() function hides the HTML video element
  webcamvideo.size(width, height);
  webcamvideo.hide();
  camPoseNet = ml5.poseNet(webcamvideo, modelLoaded);
  camPoseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses);
  console.log("webcam poses")
  analyse(poses);
  if (poses.length > 0) {
    campose = poses[0].pose;
    camskeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('PoseNet Ready');
}

function drawDistFromCam(pose) {
  if (pose) {
    const eyeR = pose.rightEye;
    const eyeL = pose.leftEye;
    const d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
  }
}

function drawKeyPoints(pose) {
  for (let i = 0; i < pose.keypoints.length; i++) {
    const x = pose.keypoints[i].position.x;
    const y = pose.keypoints[i].position.y;
    fill(0, 255, 0);
    ellipse(x, y, 8, 8);
  }
}


function drawSkeleton(skeleton) {
  for (let i = 0; i < skeleton.length; i++) {
    const a = skeleton[i][0];
    const b = skeleton[i][1];
    strokeWeight(1);
    stroke(255, 0, 0);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
  }
}

function draw() {
  // move image by the width of image to the left
  translate(webcamvideo.width, 0);
  // then scale it by -1 in the x-axis to flip the image
  scale(-1, 1);
  // draw video capture feed as image inside p5 canvas
  image(webcamvideo, 0, 0);
  if (campose) {
    // drawBodyParts(campose);
    // drawDistFromCam(campose);
    drawSkeleton(camskeleton);
    drawKeyPoints(campose);
  }
}