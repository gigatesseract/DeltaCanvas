var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var points = [];

var height, width, i;
var length = 4;
var speed = 3;
var obj;
var x = 0, y = 0;

var check = false;
function resize(){
canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 height = canvas.height;
 width = canvas.width;
}
width = canvas.width;
height= canvas.height;
for(i=0;i<length;i++)
{
  obj = {x:0, y:0};
  obj.x = width + (width/length)*(i);

  obj.y = 0.1*height + (Math.random()*0.7*height);
  points.push(obj);

}


function drawBackground(){

c.clearRect(0,0,canvas.width, canvas.height);

for(i=0;i<length;i++){


  if(points[i].x>0){
    points[i].x-=speed;




  }
  else{
    points[i].x = canvas.width;

    points[i].y = 0.1*height + (Math.random()*0.7*height);

  }
  c.lineWidth = "20";
  // c.arc(points[i].x, points[i].y, 10, 0, 2*Math.PI, false);
  // c.fill();
c.beginPath();
c.moveTo(points[i].x, points[i].y);
c.lineTo(points[i].x, canvas.height);
c.closePath();
c.stroke();

c.moveTo(points[i].x, points[i].y - 75);
c.lineTo(points[i].x, 0);
c.closePath();
c.stroke();
}


}

function pathCheck(){
console.log(x);
var wall = new Path2D();
  for(i=0;i<length;i++)
  {


    wall.moveTo(points[i].x, points[i].y);
    wall.lineTo(points[i].x, canvas.height);
    wall.closePath();
    wall.moveTo(points[i].x, points[i].y-75);
    wall.lineTo(points[i].x, 0);
    wall.closePath();
    c.lineWidth = "2";
    c.stroke(wall);


  }

    //if(x in xpoints)//(y<=points[i].y-150 && y >=0) || (y >=points[i].y && y<=canvas.height))
    // check = xpoints.indexOf(e.pageX);
    // if(check!=-1)
    // {
    //   if(!(y<=points[check].y && y>=points[check].y-75))
    //   alert("boom");
    // }




//
// if(check!=-1) alert('boom');

if(c.isPointInPath(wall, x, y)) alert("boom");
delete wall;

}
function drawDeep(){

  c.beginPath();
  c.save();
  c.fillStyle = "red";
   c.arc(x, y, 10, 0, 2*Math.PI, false);

   c.fill();
   c.restore();
   pathCheck();
}

function mousemoveHandler(e){

     x = e.pageX;// x == the location of the click in the document - the location (relative to the left) of the canvas in the document
     y = e.pageY;
pathCheck(e);

}
canvas.addEventListener('mousemove', mousemoveHandler);


function draw(){
  resize();

drawBackground();

drawDeep();
window.setTimeout(draw, 20);
}

draw();
