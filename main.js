objects=[];
alarm="";
status="";

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas=createCanvas(600,350);
    canvas.center();

    video=createCapture(VIDEO);
    video.size(600.350)
    video.hide();
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,600,350);

    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            fill(r,g,b);
            percent =  floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+10, objects[i].y+20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML="Baby Detected!";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML="Baby not detected!";
                alarm.play();
            }
        }
    }
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting objects..";
}