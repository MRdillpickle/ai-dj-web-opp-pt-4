sound1 = "";
sound2 = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
Scorelw = 0;
function preload() {
    sound1 = loadSound("music.mp3");
    sound2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(200,200);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotposes);
}
function draw() {
    image(video,0,0,200,200);
    fill('#FF0000');
    sound1.isPlaying();
    if (lwx > 0.2) {
        circle(lwx,lwy,50);
        if (sound1.isPlaying() == false) {
          sound2.stop();
          sound1.play();
    }
    }else{
        circle(rwx,rwy,50);
        if (sound2.isPlaying() == false) {
          sound1.stop();
          sound2.play();
    }
    }
}
function modelLoaded() {console.error("Moddel Loaded");}
function gotposes(results) {
    if (results.length > 0) {
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log(results);
        console.log("LEFT X:",lwx,"Y:",lwy);
        console.log("RIGHT X:",rwx,"Y:",rwy);
    }
}