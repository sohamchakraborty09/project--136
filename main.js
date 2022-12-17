var status = "";
var object_name = "";
var objects = [];
var object = "";
var SpeechRecognition = window.webkitSpeechRecognition; 
var recognition = new SpeechRecognition();
function setup(){
    canvas = createCanvas(410, 310);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

   
}


function draw(){
    image(video, 0, 0, 410, 310);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=1; i <= objects.length; i++){
            document.getElementById("status").innerHTML = "status : Objects Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("name").innerHTML;
    
}

function gotResults(error, results){
    if(error){
        console.log('error');
    }
    console.log(results);
    objects = results;
    console.log(objects);
    object = objects[i].label;
    
        
    
}
function modelLoaded(){
    console.log('Model Loaded!');
    status = true;
    if(object_name == object){
        video.stop();
        
        document.getElementById("status_of_obj").innerHTML = "object found";
        var synth = window.speechSynthesis;
        speak_data = "object found";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    
    }else{
        objectDetector.detect(video, gotResults);
        document.getElementById("status_of_obj").innerHTML = "object not found";
        var synth = window.speechSynthesis;
        speak_data = "object not found";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis); 
    }
}
