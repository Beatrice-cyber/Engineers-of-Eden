var videoPoses;
var webcamPoses;

var videoPosesArr = new Array();
var webcamPosesArr = new Array();
var normalisedVideoPosesArr = new Array();
var normalisedWebcamPosesArr = new Array();

var similarityScore;

var similarityThreshold = 0.13;

var even, odd;

function analyse() {
    // if (videoPoses[0] == undefined || webcamPoses[0] == undefined) {
    //     console.debug("RETURNEDDDD");
    //     return;
    // }

    if (videoPoses[0].length == 0 || webcamPoses[0].length == 0) {
        console.debug("RETURNEDDDD");
        return;
    }

    // console.debug(videoPoses[0][0].pose.keypoints[16].position.x);
    // console.debug(webcamPoses[0][0].pose.keypoints[16].position.y);
    // console.debug(videoPoses);
    // console.debug(webcamPoses);


    for (let i = 0; i < 17; i++) {
        even = 2 * i, odd = 2 * i + 1;

        // console.debug(videoPoses[0][0].pose.keypoints[16].position.x);
        // console.debug(webcamPoses[0][0].pose.keypoints[16].position.y);
        videoPosesArr[even] = videoPoses[0][0].pose.keypoints[i].position.x;
        videoPosesArr[odd] = videoPoses[0][0].pose.keypoints[i].position.y;

        webcamPosesArr[even] = webcamPoses[0][0].pose.keypoints[i].position.x;
        webcamPosesArr[odd] = webcamPoses[0][0].pose.keypoints[i].position.y;
    }
    normalisedVideoPosesArr = l2normalisation(rescale(videoPosesArr));
    normalisedWebcamPosesArr = l2normalisation(rescale(webcamPosesArr));
    console.debug(normalisedVideoPosesArr);
    console.debug(normalisedWebcamPosesArr);

    similarityScore = cosineDistanceMatching(normalisedVideoPosesArr, normalisedWebcamPosesArr);

    console.debug(similarityScore);

    if (similarityScore < similarityThreshold)
    {
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
        console.log("MATCH");
    }

    console.debug(Date.now());
}

function cosinesim(A,B){
    var dotproduct=0;
    var mA=0;
    var mB=0;
    for(i = 0; i < A.length; i++){ 
        dotproduct += (A[i] * B[i]);
        mA += (A[i]*A[i]);
        mB += (B[i]*B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = (dotproduct)/((mA)*(mB));
    return similarity;
}

function cosineDistanceMatching(poseVector1, poseVector2) {
    let cosineSimilarity = cosinesim(poseVector1, poseVector2);
    let distance = 2 * (1 - cosineSimilarity);
    return Math.sqrt(distance);
}


function l2normalisation(poseVector)
{
    var norm = 0;
    for(let j = 0; j < poseVector.length; j++) {
        norm += poseVector[j] * poseVector[j];
    }

    norm = Math.sqrt(norm);

    for(let j = 0; j < poseVector.length; j++) {
        poseVector[j] = poseVector[j] / norm;
    }

    return poseVector;
}

function rescale(poseVector) {
    var xcoords = new Array(), ycoords = new Array();

    for (let k = 0; k < 17; k++) {
        xcoords[k] = poseVector[2 * k];
        ycoords[k] = poseVector[2 * k + 1];
    }

    var minX = Math.min(...xcoords), maxX = Math.max(...xcoords), minY = Math.min(...ycoords), maxY = Math.max(...ycoords);

    // var midX = (maxX - minX) / 2;
    // var midY = (maxY - minY) / 2;

    var rangeX = maxX - minX, rangeY = maxY - minY;

    for (let m = 0; m < 17; m++) {
        even = 2 * m, odd = 2 * m + 1;

        poseVector[even] = (poseVector[even] - minX) / rangeX;
        poseVector[odd] = (poseVector[odd] - minY) / rangeY;
    }

    return(poseVector);
}