var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var reset = document.getElementById('reset');
var points = [];
var gap = 100;

var height, width, i;
var length = 5;
var speed = 3;
var obj = {x:0, y:0};
var x = 0, y = 0;
var score;
var gameflag = false;
var check;
height = canvas.height;
width = canvas.width;
function init(){
  x = 25, y = 25;
  speec = 3;
  length = 5;
  gap = 150;
  score = 0;
  gameflag = false;
  check = false;
  points.splice(0, length)
    for(i=0;i<length;i++)
  {
    obj = {x:0, y:0};
    obj.x = width + (width/length)*(i);

    obj.y = 0.1*height + (Math.random()*0.7*height);
    points.push(obj);

  }
  canvas.style.cursor = "none";



}
// for(i=0;i<length;i++)
// {
//   var obj = {x:0, y:0};
//   obj.x = width + (width/length)*(i);
//
//   obj.y = 0.1*height + (Math.random()*0.7*height);
//   points.push(obj);
//
// }


function resize(){
canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 height = canvas.height;
 width = canvas.width;
}



function drawBackground(){

c.clearRect(0,0,canvas.width, canvas.height);

for(i=0;i<length;i++){

 if(!gameflag){
  if(points[i].x>0 ){
    points[i].x-=speed;




  }
  else{
    points[i].x = canvas.width;

    points[i].y = 0.1*height + (Math.random()*0.7*height);

  }
  c.lineWidth = "80";
  // c.arc(points[i].x, points[i].y, 10, 0, 2*Math.PI, false);
  // c.fill();
c.beginPath();
c.moveTo(points[i].x, points[i].y);
c.lineTo(points[i].x, canvas.height);
c.closePath();
c.stroke();

c.moveTo(points[i].x, points[i].y - gap);
c.lineTo(points[i].x, 0);
c.closePath();
c.stroke();
}
}


}

function pathCheck(){

var wall = new Path2D();

  for(i=0;i<length;i++)
  {

  c.lineWidth = "40";
    wall.moveTo(points[i].x, points[i].y);
    wall.lineTo(points[i].x + 40, points[i].y);
    wall.lineTo(points[i].x+40, canvas.height);
    wall.lineTo(points[i].x, canvas.height);
      wall.closePath();

    wall.moveTo(points[i].x, points[i].y-gap);
    wall.lineTo(points[i].x+40, points[i].y - gap);
    wall.lineTo(points[i].x + 40, 0);
    wall.lineTo(points[i].x,0);
    wall.closePath();


  }

if(c.isPointInPath(wall, x+40, y+15)){

  gameflag = true;

}
else if(c.isPointInPath(wall, x, y)) gameflag = true;
else if(c.isPointInPath(wall, x, y-10)) gameflag = true;

delete wall;

}

function gameOver(){
  if(gameflag)
  {
  reset.style.display = "block";
    canvas.style.cursor = "auto";
    drawBackground();
    drawDeep();
    c.fillStyle = "rgba(100,100,100,0.3)";
    c.fillRect(0,0,width, height);

    c.font = "20px serif"
    c.fillStyle = "red";
    c.fillText("GAME OVER!!",  width/2-50, height/4);
    c.fillStyle = "blue";
    c.fillText("Score: " + score, width/2 - 50, height/3);
  }
  else{
    reset.style.display = "none";
  }

}
function drawDeep(){
 if(!gameflag){
  c.beginPath();

  c.save();

  c.fillStyle = "red";

   c.arc(x, y, 15,0 , 2*Math.PI, false);

   c.fill();
   c.restore();
}
}

function mousemoveHandler(e){

     x = e.pageX;
     y = e.pageY;
// pathCheck(e);

}

function drawScore(){
  c.fillStyle = "blue";
  c.font = "20px Arial";
  c.fillText("Score: "+ score, 30, 30);

}

function calculateScore(){
  if(!gameflag)
  score +=(speed*10)/3;
  //window.setInterval(calculateScore, 10);
}
  window.setInterval(calculateScore, 100);

  function resetHandler(){

    init();
    draw();


  }


reset.addEventListener('click', resetHandler);
canvas.addEventListener('mousemove', mousemoveHandler);


// window.setTimeout(calculateScore, 10);
function draw(){
  resize();
gameOver();

if(!gameflag){
  drawBackground();
// calculateScore();
drawScore();
drawDeep();
window.requestAnimationFrame(pathCheck);
window.requestAnimationFrame(draw);

}
}
init();
draw();
