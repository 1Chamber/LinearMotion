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

var xDirection = 'positive'; //true means ++ (positive)
var yDirection = 'positive'; //true means ++ (positive)

var id;
var inMotion = false;

var directionChosen = false;



function startMove() {

  //make arrow hidden and make ball visible
  arrow.style.visibility = "hidden";
  ball.style.visibility = "visible";
  directionMessage.style.visibility = "hidden";

  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';

  xInc = Math.cos(cursorDirectionAngle * (Math.PI / 180));
  yInc = Math.sin(cursorDirectionAngle * (Math.PI / 180));


  if (inMotion === false) {
    id = setInterval(frame, 10);
    inMotion = true;
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

}

function stopMove () {
  inMotion = false;
  clearInterval(id);
}
function centerMove () {
   xPos = 225; //middle of 500x500 box
   yPos = 225;
  stopMove();
  //reseting all values
  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';
  yDirection = 'positive';
  xDirection = 'positive';

  arrow.style.visibility = "visible";
  ball.style.visibility = "hidden";
  directionChosen = false;
}


function defaultPos() {
  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';
}


function freezeArrow() {
  directionChosen = true;
  directionMessage.style.visibility = "visible";
}


document.addEventListener('mousemove', updateCursorXY, false);
document.addEventListener('mouseenter', updateCursorXY, false);

function updateCursorXY(e) {
  if(directionChosen === false) {
  cursorXPos = e.pageX - 200;
  cursorYPos = e.pageY - 260;
  cursorDirectionAngle = calculateDirectionAngle();
  document.getElementById("arrow").style.transform = "rotate(" + cursorDirectionAngle + "deg)";
 }
}


function calculateDirectionAngle() {
  //atan2 takes in Y and X param - returns in radians
 return Math.atan2(cursorYPos, cursorXPos) * (180 / Math.PI);
 //rotate(7deg)
}
