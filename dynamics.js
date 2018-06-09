var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var reset = document.getElementById('reset');
var points = [];
var gap = 100;
var height, width, i;
var length = 3;
var speed = 3;
var shootspeed = 2;
var upspeednumber = 0.5;
var cbegin = 10, cend = 75;
var shootflag = false;
var complexityspeed = 2;
var playbackrate = 1.0;
var upspeedstate;
var obj = {
  x: 0,
  y: 0
};
var x = 0,
  y = 0,
  xf = 1,
  yf = 1;
var slope;
var shootx, shooty;
var vel = 5,
  velx, vely;
var angle;
var score;
var scoreflag;
var gameflag = false;
var check;

var bulletspeed = 2;
height = canvas.height;
width = canvas.width;
var hitx, hity, hitposition;
var upspeed = [];
var sprite = new Image();
sprite.src = "/spritesheet.png";
var audio = document.getElementById('audio');
var gameover = document.getElementById('gameover');

function init() {
  x = 25, y = 25, xf = 26, yf = 26;
  vel = 5;
  upspeedstate = false;
  upspeednumber = 0.5;
  for(i=0;i<length;i++)
  upspeed.push(upspeednumber);
  playbackrate = 1.0;
  speed = 3;
  length = 3;
  gap = 150;
  complexityspeed = 2;
  score = 0;
  scoreflag = false;
  gameflag = false;

  check = false;

  shootspeed = 5;
  shootflag = false;
  cbegin = 10;
  cend = 75;
  points.splice(0, length)
  for (i = 0; i < length; i++) {
    obj = {
      x: 0,
      y: 0,
      hitmanx: 0,
      hitmany: 0,
      bulletx: 0,
      bullety: 0
    };
    obj.x = width + (width / length) * (i);

    obj.y = 0.1 * height + (Math.random() * 0.7 * height);
    obj.hitmanx = obj.x - 80;
    obj.hitmany = Math.random() * height - 100;
    while ((obj.hitmany + 100 < obj.y && obj.hitmany + 100 > obj.y - gap) || (obj.hitmany < obj.y && obj.hitmany > obj.y - gap))
      obj.hitmany = Math.random() * height - 100;
    obj.bulletx = obj.hitmanx;
    obj.bullety = obj.hitmany + 20;
    obj.enemystate = true;
    points.push(obj);

  }
  audio.currentTime = 1;
  audio.play();
  gameover.pause();
  gameover.currentTime = 0;

}


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  height = canvas.height;
  width = canvas.width;
}

function drawBullet() {
  for (i = 0; i < length; i++) {



    c.arc(points[i].bulletx, points[i].bullety, 5, 0, 2 * Math.PI, false);
    c.fillStyle = "black";
    c.fill();
    c.closePath();
  }

}

function drawBackground() {
  // upspeednumber = 1.5 + (cbegin-10)
 audio.playbackRate = playbackrate + (cbegin-10)/32.5;


  c.clearRect(0, 0, canvas.width, canvas.height);
  if (shootflag) shootx += shootspeed;
  if (shootx > width) shootflag = false;

  for (i = 0; i < length; i++) {

    if (!gameflag) {
      if (points[i].x > 0) {
        points[i].x -= speed;
        points[i].hitmanx -= speed;
        points[i].bulletx = points[i].bulletx - bulletspeed - speed;
        if(cbegin>=30)
        {
           upspeedstate = true;
          points[i].y+=upspeed[i];
          if(points[i].y>height || points[i].y -gap <0)
          upspeed[i] = -upspeed[i];
        }





      } else {
        points[i].x = canvas.width;

        points[i].y = 0.1 * height + (Math.random() * 0.7 * height);
        points[i].hitmanx = points[i].x - 80;
        points[i].hitmany = Math.random() * height - 100;
        while ((points[i].hitmany + 60 < points[i].y && points[i].hitmany + 60 > points[i].y - gap) || (points[i].hitmany < points[i].y && points[i].hitmany > points[i].y - gap) || points[i].hitmany < 0 || points[i].hitmany + 60 > height)
          points[i].hitmany = Math.random() * height - 100;
        points[i].bulletx = points[i].hitmanx;
        points[i].bullety = points[i].hitmany + 20;
        points[i].enemystate = true;
      }
      c.lineWidth = "80";
      // c.strokeStyle = "brown";
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


function pathCheck() {

  var enemy = new Path2D();
  var wall = new Path2D();
  var ball = new Path2D();

  for (i = 0; i < length; i++) {


    wall.moveTo(points[i].x - 40, points[i].y);
    wall.lineTo(points[i].x + 40, points[i].y);
    wall.lineTo(points[i].x + 40, canvas.height);
    wall.lineTo(points[i].x - 40, canvas.height);
    wall.lineTo(points[i].x - 40, points[i].y);
    wall.closePath();
    ball.arc(points[i].bulletx, points[i].bullety, 10, 0, 2 * Math.PI, false);
    ball.closePath();

    wall.moveTo(points[i].x - 40, points[i].y - gap);
    wall.lineTo(points[i].x + 40, points[i].y - gap);
    wall.lineTo(points[i].x + 40, 0);
    wall.lineTo(points[i].x - 40, 0);
    wall.lineTo(points[i].x - 40, points[i].y - gap);
    wall.closePath();
    if(points[i].enemystate){
    enemy.moveTo(points[i].hitmanx + 50, points[i].hitmany);
    enemy.lineTo(points[i].hitmanx, points[i].hitmany);
    enemy.lineTo(points[i].hitmanx, points[i].hitmany + 60);
    enemy.lineTo(points[i].hitmanx + 50, points[i].hitmany + 60);
    enemy.closePath();
  }


  }


  if (c.isPointInPath(wall, x + 15, y + 15))// || c.isPointInPath(wall, x - 15, y + 15))
    x = x - velx - speed;
 if(c.isPointInPath(wall, x - 10, y + 15)) x = x - velx - speed;

   if (c.isPointInPath(wall, x, y - 15)){


   y = y + vely;
   x = x + 2*velx;
  if(upspeedstate) y = y + upspeednumber;}



  if (c.isPointInPath(wall, x, y + 15)){

   y = y + vely;
   x = x + 2*velx;
    if(upspeedstate) y = y + upspeednumber;
  }



  for (i = 0; i < length; i++)
    if (c.isPointInPath(wall, points[i].bulletx, points[i].bullety)) {
      {
        if (points[i].enemystate) {
          points[i].bulletx = points[i].hitmanx;
          points[i].bullety = points[i].hitmany + 20;
        }
        else {points[i].bulletx = -100;
          points[i].bullety = -100;
        }

      }
    }
  if (c.isPointInPath(ball, x, y)) gameflag = true;
  if (c.isPointInPath(enemy, x, y)) gameflag = true;
  if (c.isPointInPath(enemy, shootx, shooty) && !scoreflag) {
    scoreflag = true;
    shootflag = false;
    score +=1000;
  }
  if(c.isPointInPath(wall, shootx, shooty)){
    shootflag = false;
  }




  if (x < 0) gameflag = true;
  delete wall;
  delete ball;
  delete enemy;

  for (i = 0; i < length; i++) {
    if (shootx >= points[i].hitmanx && shootx <= points[i].x && shooty >= points[i].hitmany && shooty <= points[i].hitmany + 60) {
      points[i].enemystate = false;
      shootx = -100000;
      shooty = -100000;
      shootflag = false;
    }
  }

}

function gameOver() {
  if (gameflag) {
    audio.pause();
    audio.currentTime = 0;
    gameover.play();
    reset.style.display = "block";
    canvas.style.cursor = "auto";


    c.fillStyle = "rgba(100,100,100,0.3)";
    c.fillRect(0, 0, width, height);

    c.font = "20px serif"
    c.fillStyle = "red";
    c.fillText("GAME OVER!!", width / 2 - 50, height / 4);
    c.fillStyle = "blue";
    c.fillText("Score: " + score, width / 2 - 50, height / 3);
  } else {
    reset.style.display = "none";
  }

}

function drawHitman() {
  console.log(upspeednumber);

  for (i = 0; i < length; i++)
    if (points[i].enemystate)
      c.drawImage(sprite, 5, 33, 25, 30, points[i].hitmanx, points[i].hitmany, 50, 60);


}


function drawDeep() {
  if (!gameflag) {

    c.beginPath();
    c.save();
    c.fillStyle = "red";

    c.arc(x, y, 15, 0, 2 * Math.PI, false);
    c.fill();
    c.restore();
  }

}

function mousemoveHandler(e) {

  if (e.pageX <= width && e.pageY <= height) {
    xf = e.pageX;
    yf = e.pageY;
  }


}

function clickHandler(e) {

  if (e.button == 0) {

    if (!shootflag) {
      shootflag = true;
      shootx = x + 20;
      shooty = y;
      scoreflag = false;



    }



  }
}



function drawShot() {
  if (shootflag) {
    c.arc(shootx, shooty, 10, 0, 2 * Math.PI, false);
    c.fillStyle = "brown";
    c.fill();
  }
}

function setComplexity(){
  if(cbegin<=75)
  cbegin +=complexityspeed;
  speed = 3 + (cbegin - 10)/5;
  upspeed.splice(0, length);
  if(cbegin>=30)
  {upspeednumber = 0.5 + (cbegin-30)/43.34;
  for(i=0;i<length;i++)
  upspeed.push(upspeednumber);
}
}
window.setInterval(setComplexity, 5000);

function drawComplexity(){
  c.fillStyle = "yellow";
  c.fillRect(cbegin, 60, 70, 40);     //10 begin    75 end;
  c.fillStyle = "black";
  c.fillText("Easy", 25, 85);
  c.fillText("Hard", 85, 85);
}


function getPosition() {

  slope = (yf - y) / (xf - x);
  angle = Math.atan(slope) * 180 / Math.PI;
  vel = 5 + (cbegin - 10)/13;
  velx = vel * Math.cos(Math.atan(slope));
  vely = vel * Math.sin(-Math.atan(slope));
  if (xf < x) {
    velx = -velx;
    vely = -vely;
  }

  x = x + velx;
    y = y - vely;


  drawDeep();

}



function drawScore() {
  c.fillStyle = "blue";
  c.font = "20px Arial";
  c.fillText("Score: " + score, 30, 30);

}



function calculateScore() {
  if (!gameflag)
    score += 10;

}




window.setInterval(calculateScore, 100);



function resetHandler() {

  init();
  draw();


}




reset.addEventListener('click', resetHandler);
canvas.addEventListener('mousemove', mousemoveHandler);
canvas.addEventListener('click', clickHandler);
audio.addEventListener('ended', function() {
  this.pause();
  this.currentTime = 0;
  this.play();
});



function draw() {
  resize();
  gameOver();

  if (!gameflag) {
    drawBackground();

    drawScore();
    drawHitman();
    drawBullet();
    drawShot();
    getPosition();
    drawComplexity();
    window.requestAnimationFrame(pathCheck);
    window.requestAnimationFrame(draw);

  }
}


sprite.onload = function() {
  init();
  draw();
}
