nadiyon_paar="";
bijli="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
song_name = "";

function preload(){
    nadiyon_paar = loadSound("music1.mp3");
    bijli        = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(500,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function draw(){
    image(video,0,0,500,380);
    
    fill("#00CBFF");
    stroke("#FFFFFF");

    song_name = nadiyon_paar.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        bijli.stop();
        if(song_name == false){
            nadiyon_paar.play();
        }
        else{
            console.log("Song Name: Nadiyon Paar");
            document.getElementById("song_id").innerHTML = "Song Name: Nadiyon Paar";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
  
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}