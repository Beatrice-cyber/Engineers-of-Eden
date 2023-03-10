// import { addDataToDatabase } from "./data/addTensor";

function addDataToDatabase(data) {
  let request = indexedDB.open("TensorsDatabase", 2);

  request.onsuccess = function () {
    console.log(data);

    let db = event.target.result;
    let transaction = db.transaction("tensors", "readwrite");
    let objectStore = transaction.objectStore("tensors");
    let putRequest = objectStore.add(data);

    putRequest.onsuccess = function (event) {
      console.log("Data added to the database");
    };

    putRequest.onerror = function (event) {
      console.log("Error adding data to the database");
    };

    transaction.oncomplete = function (event) {
      console.log("Transaction completed");
    };
  };

  request.onerror = function (event) {
    console.log("Error opening database");
  };
}
let video;
let poseNet;
let pose;
let skeleton;

function playVideo() {
  video.play();
}

function pauseVideo() {
  video.pause();
}

function stopVideo() {
  video.stop();
  poseNet.removeListener('pose', gotPoses);
}

function setup() {
  createCanvas(800, 800);

  text("Click on the buttons below to" + " play/pause the video", 20, 20);
  video = createVideo("short_clip.mp4");
  video.hide();

  // the createCapture() function creates an HTML video tag
  // as well as pulls up image to be used in p5 canvas
  // hide() function hides the HTML video element
  // playBtn = createButton("Play Video");
  // playBtn.position(10, 10);
  // playBtn.mouseClicked(playVideo);

  // pauseBtn = createButton("Pause Video");
  // pauseBtn.position(30, 30);
  // pauseBtn.mouseClicked(pauseVideo);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    const positions1 = [];

    for (let i = 0; i < pose.keypoints.length; i++) {
      const values = pose.keypoints[i];
      const position = values.position;
      positions1.push(position);
    }

    addDataToDatabase(positions1);
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("PoseNet Ready");
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
  translate(video.width, 0);
  // then scale it by -1 in the x-axis to flip the image
  scale(-1, 1);
  // draw video capture feed as image inside p5 canvas
  image(video, 0, 0);
  if (pose) {
    // drawBodyParts(pose);
    // drawDistFromCam(pose);
    drawSkeleton(skeleton);
    drawKeyPoints(pose);
  }
}
