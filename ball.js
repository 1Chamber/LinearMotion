var xPos = 225; //middle of 500x500 box
var yPos = 225; //middle of 500x500 box

var xInc = 0;
var yInc = 0;

var cursorXPos = 0;
var cursorYPos = 0;
var cursorDirectionAngle = 0;

var ball = document.getElementById("ball");
var arrow = document.getElementById("arrow");
var directionMessage = document.getElementById("directionMessage");

var inMotion = false;
var isDefault = true;
var directionChosen = false;

var id;
var speedInterval = 10; //default




function startMove() {
  if(!inMotion) {

  //make arrow hidden and make ball visible
  arrow.style.visibility = "hidden";
  ball.style.visibility = "visible";
  directionMessage.style.visibility = "hidden";
  isDefault = false;

  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';

  xInc = Math.cos(cursorDirectionAngle * (Math.PI / 180));
  yInc = Math.sin(cursorDirectionAngle * (Math.PI / 180));


  if (inMotion === false) {
    id = setInterval(frame, speedInterval);
    inMotion = true;
  }
 }
}



  function frame() {
    if (xPos >= 445 || xPos <= 5)  {
      switchXDirection();

    } else if (yPos >= 445 || yPos <= 0) {
      switchYDirection();

    } else {
      addPos();
      ball.style.left = xPos + 'px';
      ball.style.top = yPos + 'px';
    }

  }


  function addPos() {
    xPos += xInc;
    yPos += yInc;

  }

  function switchXDirection() {
    xInc *= -1;
    addPos();
  }

  function switchYDirection() {
    yInc *= -1;
    addPos();
  }

function speedUp() {
  clearInterval(id)
  speedInterval /= 2;
  id = setInterval(frame, speedInterval)

}

function stopMove () {
  inMotion = false;
  clearInterval(id);
}

function centerMove () {
   stopMove();
   xPos = 225; //middle of 500x500 box
   yPos = 225;

  //reseting all values
  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';
  isDefault = true;
  speedInterval = 10;

  document.addEventListener('mousemove', updateCursorXY, false);
  document.addEventListener('mouseenter', updateCursorXY, false);

  arrow.style.visibility = "visible";
  ball.style.visibility = "hidden";
  directionChosen = false;
}


function defaultPos() {
  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';
  document.addEventListener('mousemove', updateCursorXY, false);
  document.addEventListener('mouseenter', updateCursorXY, false);
}


function freezeArrow() {
  if(isDefault) {
    directionChosen = true;
    directionMessage.style.visibility = "visible";
    document.removeEventListener('mousemove', updateCursorXY, false);
    document.removeEventListener('mouseenter', updateCursorXY, false);
  }
}

function updateCursorXY(e) {
  if(directionChosen === false) {
  cursorXPos = e.pageX - 200; //from center pos of arrow
  cursorYPos = e.pageY - 260; //from center pos of arrow
  cursorDirectionAngle = calculateDirectionAngle();
  document.getElementById("arrow").style.transform = "rotate(" + cursorDirectionAngle + "deg)";
 }
}


function calculateDirectionAngle() {
  //atan2 takes in Y and X param - returns in radians
 return Math.atan2(cursorYPos, cursorXPos) * (180 / Math.PI);
 //rotate(7deg)
}
