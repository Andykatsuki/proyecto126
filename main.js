song="";
leftwristX=0;
leftwristY=0;

rightwristX=0;
rightwristY=0;
 
scoreleftwrist=0;
scorerightwrist=0;

function preload()
{
    song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function gotPoses(results)
{
    if(results.lenght>0)
    {

       console.log(results);
       scorerightwrist=results[0].pose.keypoints[10].score;
       scoreleftwrist=results[0].pose.keypoints[9].score;
       console.log(scoreleftwrist);
       console.log(scorerightwrist);

       leftwristX=results[0].pose.leftWrist.x;
       leftwristY=results[0].pose.leftWrist.y;
       console.log("muñeca izquierda en x=" + leftwristX + "muñeca izquierda en y=" + leftwristY);

       rightwristX=results[0].pose.rightWrist.x;
       rightwristY=results[0].pose.rightWrist.y;
       console.log("muñeca derecha en x=" + rightwristX + "muñeca derecha en y=" + rightwristY);
       
    }
}
 function modelLoaded()
 {
console.log("poseNet esta inicializado")
 }
function draw()
{
    image(video, 0, 0, 600,500);
    fill("#BD3533");
    stroke("#BD3533");
    
    if(scorerightwrist>0.2)
 {

    
    circle(rightwristX, rightwristY,20);
    if(rightwristY>0 && rightwristY<=100) 
    {
document.getElementById("speed").innerHTML="Velocidad=0.5";
song.rate(0.5);
    }
    else if(rightwristY>100 && rightwristY<=200)
    {
      document.getElementById("speed").innerHTMl="Velocidad=1";
      song.rate(1);
    }
    else if(rightwristY>200 && rightwristY<=300)
    {
      document.getElementById("speed").innerHTMl="Velocidad=1.5";
      song.rate(1.5);
    }
    else if(rightwristY>300 && rightwristY<=400)
    {
      document.getElementById("speed").innerHTMl="Velocidad=2";
      song.rate(2);
    }
    else if(rightwristY>400 && rightwristY<=500)
    {
      document.getElementById("speed").innerHTMl="Velocidad=2.5";
      song.rate(2.5);
    }
 }
    if(scoreleftwrist>0.2)
    {
    circle(leftwristX,leftwristY,20);
    numero=Number(leftwristY);
    remover_decimales=fLoor(numero);
    volumen=remover_decimales/500;
    document.getElementById("Volumen").innerHTML="Volumen= " + volumen;
    song.setVolume(volumen);
    }

}
