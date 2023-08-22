var blackRectCanvas=document.getElementById("redRectCanvas");
var blueRectCanvas = document.getElementById("blueRectCanvas");
var crashingRectsCanvas = document.getElementById("crashingRectsCanvas");
var ctxBlueRect = blueRectCanvas.getContext("2d");
var ctxBlackRect = blackRectCanvas.getContext("2d");
var ctxCrashingRects = crashingRectsCanvas.getContext("2d");
blackRectCanvas.width = window.innerWidth;
blueRectCanvas.width = window.innerWidth;
crashingRectsCanvas.width = window.innerWidth;

var statistic = document.getElementById("statistic");
var widthBlueRect = 50;
var blueRectX = 20;
var BlackRecty0 = 201;
var BlackRectx0 = 10;
var angl = 30;
var counter = 0;

const blackRectSize = 20;
const blueRectHeight = 20;
const crashingRectSize = 40;
const amountOfLineWithRectForCrashing = 5;
var arrayOfSquare = drawSquaresForCrashing();
redrawSquaresForCrashing();

function moveRect(e){
  ctxBlueRect.clearRect(0,0,window.innerWidth,blueRectHeight);
  ctxBlueRect.beginPath();

  switch(e.key){
       
      case "ArrowLeft":  
          if(blueRectX > 5)
              blueRectX = blueRectX - 10;
          break;
      case "ArrowRight":  
          if(blueRectX < window.innerWidth-10)            
                blueRectX = blueRectX + 10;              
          break;
  }

  ctxBlueRect.rect(blueRectX, 0, widthBlueRect, blueRectHeight);
  ctxBlueRect.fill();
}

function resizeRect(e)
{ 
  ctxBlueRect.clearRect(0,0,window.innerWidth, blueRectHeight);
  ctxBlueRect.beginPath();
  widthBlueRect = window.innerWidth/9;
  ctxBlueRect.fillStyle = "blue";
  ctxBlueRect.rect(blueRectX, 0, widthBlueRect, blueRectHeight);
  ctxBlueRect.fill();
}

var isLastSideLeft = true;

function ballMovement()
{
    if(BlackRecty0 >= blackRectCanvas.height - 45)
    {
      var xForIf = BlackRectx0 - blueRectX;

      if(xForIf >= - blackRectSize && xForIf <= widthBlueRect/2 - blackRectSize/2)
      {
          angl = 180-angl + (isLastSideLeft? 1 : -1) * (widthBlueRect/2)/10;
      }
      else if(xForIf > widthBlueRect/2 + blackRectSize/2 && xForIf < widthBlueRect + 2)
      {
          angl = 180-angl + (isLastSideLeft? -1 : 1) * (widthBlueRect/2)/10;
      }
      else if(xForIf >= - blackRectSize && xForIf <= widthBlueRect + 2)
      {
          angl = 180-angl;
      }
      else 
      {
        clearInterval(ballMovementTimer);
        removeEventListener("keydown", moveRect);
        var drawingBox = document.querySelector("div.drawingBox");
        var elem = document.createElement("h2");
        var elemText = document.createTextNode("Game over");
        elem.appendChild(elemText);
        drawingBox.appendChild(elem);
      }
    }
    


    if(BlackRecty0 <= crashingRectsCanvas.height)
    {
      if(BlackRecty0 <= 5 || checkSquaresForCrashing(BlackRectx0, BlackRecty0))
      {
        angl = 180 - angl;

        if(angl >= 180)
        isLastSideLeft = false;
        else isLastSideLeft = true;

        redrawSquaresForCrashing();
      }
    }

    statistic.textContent = "Счетчик: " + counter;

    if(BlackRectx0 < 2)
    {
      angl = 360 - angl;
      isLastSideLeft = true;
    }
    if(BlackRectx0 > window.innerWidth - 30)
    {
      angl = 360 - angl;
      isLastSideLeft = false;;
    }

    var dx = 4 * Math.sin(angl * (Math.PI/180));
    var dy = 4 * Math.cos(angl * (Math.PI/180));

    var y = BlackRecty0 + dy;
    var x = BlackRectx0 + dx;
    ctxBlackRect.clearRect(0,0,window.innerWidth, redRectCanvas.height);
    ctxBlackRect.beginPath();
    ctxBlackRect.rect(x, y, blackRectSize, blackRectSize);
    ctxBlackRect.fill();
    BlackRecty0 = y;
    BlackRectx0 = x;
}




function drawSquaresForCrashing()
{
  var arrayOfSquare = [];

  ctxCrashingRects.clearRect(0,0,window.innerWidth, 100);

  var amountSquaresInString = Math.round((window.innerWidth-30)/crashingRectSize);

  for(var j = 0; j < amountOfLineWithRectForCrashing; j++)
  {
    arrayOfSquare[j] = [];
    for(var i = 0; i < amountSquaresInString; i++)
    {
      var x1 = i * crashingRectSize;
      var y1 = j * crashingRectSize;

      arrayOfSquare[j][i]={x: x1, y: y1, isExist: true};
       ctxCrashingRects.beginPath();
        ctxCrashingRects.strokeStyle = "gray";
        ctxCrashingRects.fillStyle = "red";
        ctxCrashingRects.rect(x1, y1, crashingRectSize, crashingRectSize);
        ctxCrashingRects.strokeRect(x1, y1, crashingRectSize, crashingRectSize);
        ctxCrashingRects.fill();
    }
  }

  return arrayOfSquare;
}

function redrawSquaresForCrashing()
{
  for(var j = 0; j < amountOfLineWithRectForCrashing; j++)
  {
    for(var i = 0; i < arrayOfSquare[j].length; i++)
    {
      if(!arrayOfSquare[j][i].isExist)
      {
        var x1 = i * crashingRectSize;
        var y1 = j * crashingRectSize;
  
        ctxCrashingRects.clearRect(x1,y1,crashingRectSize,crashingRectSize);       
      }
    }
  }
}

function checkSquaresForCrashing(xBlackSquare,yBlackSquare)
{
  var isTouchToElem = false;
  for(var j = 0; j < amountOfLineWithRectForCrashing; j++)
  {
    for(var i = 0; i < arrayOfSquare[j].length; i++)
    {
      if(arrayOfSquare[j][i].isExist)
      {
        if(arrayOfSquare[j][i].y + crashingRectSize >= yBlackSquare)
          if((arrayOfSquare[j][i].x <= xBlackSquare && arrayOfSquare[j][i].x + crashingRectSize >= xBlackSquare) || (arrayOfSquare[j][i].x <= xBlackSquare + blackRectSize && arrayOfSquare[j][i].x + crashingRectSize >= xBlackSquare + blackRectSize))
          {
            arrayOfSquare[j][i].isExist = false;
            isTouchToElem = true;
            counter++;
          }
      }
    }
  }
  return isTouchToElem;
}



addEventListener("keydown", moveRect);
addEventListener('resize', resizeRect, true);

resizeRect();

ballMovementTimer = setInterval(ballMovement, 20);
