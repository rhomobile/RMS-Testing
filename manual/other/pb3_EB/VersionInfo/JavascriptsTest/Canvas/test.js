
var canvas="";
var ctx="";
var shawdowStyleValue="";

function getContext()
{
canvas=document.querySelector("canvas");
ctx=canvas.getContext("2d");
}

function selectshawdowStyle()
{
var index=shawdowStyle.selectedIndex;
shawdowStyleValue=shawdowStyle.options[index].value;

var myID=document.getElementById('myShawdowStyle');
var hasCreated=0;
for (var i=0; i<myID.childNodes.length; i++)
  {

    var child = myID.childNodes[i];

    if(child.nodeName=='INPUT')
    {
     hasCreated=1;
     break;
    }
  }

    if(hasCreated==0)
    {
    //alert("Going to create");
    var myText=document.createElement('input');
    myText.setAttribute('type','text');
    myText.setAttribute('id','shawdowStyleText');
    myText.setAttribute('name','shawdowStyleText');
    myText.setAttribute('value','Enter shawdow value in integer');
    myID.appendChild(myText);
    }
}


function createRectArea()
{
clearCanvas();
var shawdowColorID=document.getElementById("shawdowColorText");
var shawdowColorValue=shawdowColorID.value;

var shawdowStyleID=document.getElementById("shawdowStyleText");
if(shawdowStyleID!=null)
var shawdowStyleTextValue=shawdowStyleID.value;

//For solid rectange

ctx.fillStyle='rgb(0,255,0)';
ctx.lineWidth=2;
ctx.shadowColor=shawdowColorValue;
if(shawdowStyleValue=="Blur")
{
ctx.shadowBlur=shawdowStyleTextValue;
}
else if(shawdowStyleValue=="OffsetX")
{
ctx.shadowOffsetX=shawdowStyleTextValue;
}
else if(shawdowStyleValue=="OffsetY")
{
ctx.shadowOffsetY=shawdowStyleTextValue;
}
else
{
ctx.shadowBlur=10;
}
ctx.fillRect(10,20,50,50);


//For stroke[empty] rectange

//ctx.strokeStyle='rgb(255,0,0)';  
ctx.strokeStyle="#FF0000";
ctx.strokeRect(100,20,80,80);
ctx.shadowColor=shawdowColorValue;
if(shawdowStyleValue=="Blur")
{
ctx.shadowBlur=shawdowStyleTextValue;
}
else if(shawdowStyleValue=="OffsetX")
{
ctx.shadowOffsetX=shawdowStyleTextValue;
}
else if(shawdowStyleValue=="OffsetY")
{
ctx.shadowOffsetY=shawdowStyleTextValue;
}
else
{
ctx.shadowBlur=10;
}
ctx.fill();



}

function createAnotherRectArea()
{

  clearCanvas();
  ctx.rect(10,100,50,50);
  ctx.fill();
  ctx.rect(100,150,80,80);
  ctx.stroke();
}

function createCircle()
{
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 70;
 
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#8ED6FF";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

}



function createLinearGrad()
{
ctx.fillStyle='rgb(0,0,0)';
var grd=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
grd.addColorStop(0.3,"red");
grd.addColorStop(0.7,"green");
ctx.fillStyle=grd;
ctx.fillRect(0,0,canvas.width,canvas.height);

}

function createRadialGrad()
{
ctx.fillStyle='rgb(0,0,0)';
var grd=ctx.createRadialGradient(100,50,1,100,100,80);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
ctx.fillStyle=grd;
ctx.fillRect(0,0,canvas.width,canvas.height);
}

function createPattern()
{
var img=document.getElementById("myImage")
var pat=ctx.createPattern(img,no-repeat);
ctx.fillStyle=pat;
ctx.fillRect(0,0,canvas.width,canvas.height);
}

function selectLineIndex()
{
var index=myLine.selectedIndex;
var LineCap=myLine.options[index].value;
createLine(LineCap);
}

function createLine(mylinecap)
{
clearCanvas();
ctx.lineWidth=10;	
ctx.lineCap=mylinecap;	
ctx.moveTo(20,20);
ctx.lineTo(200,200);
ctx.stroke();
}

function clearCanvas()
{
//ctx.clearRect(0,0,300,300);
//ctx.beginPath();
//ctx.closePath();
//ctx.save();
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
ctx.closePath();
var w = canvas.width;
canvas.width = 1;
canvas.width = w;
//ctx.setTransform(1, 0, 0, 1, 0, 0);
// Will always clear the right space


//ctx.restore();

}



function buildSpinner(data) {
  
//  var canvas = document.createElement('canvas');
//  canvas.height = 100;
//  canvas.width = 300;
//  document.getElementsByTagName('article')[0].appendChild(canvas);
//  var ctx = canvas.getContext("2d"),
    i = 0, degrees = data.degrees, loops = 0, degreesList = [];
    
  for (i = 0; i < degrees; i++) {
    degreesList.push(i);
  }
  
  // reset
  i = 0;
  
  // so I can kill it later
  window.canvasTimer = setInterval(draw, 1000/degrees);  

  function reset() {
    ctx.clearRect(0,0,100,100); // clear canvas
    
    var left = degreesList.slice(0, 1);
    var right = degreesList.slice(1, degreesList.length);
    degreesList = right.concat(left);
  }
  
  function draw() {
    var c, s, e;

    var d = 0;

    if (i == 0) {
      reset();
    }

    ctx.save();

    d = degreesList[i];
    c = Math.floor(255/degrees*i);
    ctx.strokeStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
    ctx.lineWidth = data.size;
    ctx.beginPath();
    s = Math.floor(360/degrees*(d));
    e = Math.floor(360/degrees*(d+1)) - 1;

    ctx.arc(data.x, data.y, data.size, (Math.PI/180)*s, (Math.PI/180)*e, false);
    ctx.stroke();

    ctx.restore();

    i++;
    if (i >= degrees) {
      i = 0;
    }
  }  
}

function selectLineJoinIndex()
{
var index=myLineJoin.selectedIndex;
var LineJoin=myLineJoin.options[index].value;
if(LineJoin=="miter")
{
var myID=document.getElementById('myMiterLimit');
var hasCreated=0;
for (var i=0; i<myID.childNodes.length; i++)
  {

    var child = myID.childNodes[i];

    if(child.nodeName=='INPUT')
    {
     hasCreated=1;
     break;
    }
  }

    if(hasCreated==0)
    {
    //alert("Going to create");
    var myText=document.createElement('input');
    myText.setAttribute('type','text');
    myText.setAttribute('id','miterLimitText');
    myText.setAttribute('name','miterLimitText');
    myText.setAttribute('value','Enter MeterLimit in Integer');
    myText.setAttribute('onchange','setMeterLimit()');
    myID.appendChild(myText);
    }

}
else
{
createLineJoin(LineJoin);
}

}


function createLineJoin(valueofLineJoin)
{
clearCanvas();
ctx.lineWidth=10;
ctx.lineJoin=valueofLineJoin;
if(valueofLineJoin=="miter")
{
var myMiterLimitID=document.getElementById('miterLimitText');
ctx.miterLimit=myMiterLimitID.value;
}
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();
}

function setMeterLimit()
{
createLineJoin('miter');
}


function clipWithText()
{
ctx.rect(10,15,200,100);
ctx.clip();
ctx.fillStyle="lightblue";
ctx.fillRect(0,0,300,150)
ctx.fillStyle="red";
ctx.font="30px Arial";
ctx.fillText("Hello world", 10,40);
}

function selectCurveType()
{
clearCanvas();
var index=curveType.selectedIndex;
var curveTypeValue=curveType.options[index].value;
ctx.beginPath();
ctx.moveTo(20,20);
if(curveTypeValue=="bezier")
{
ctx.bezierCurveTo(20,100,200,100,200,20);
ctx.stroke();
}
else if(curveTypeValue=="quadratic")
{
ctx.quadraticCurveTo(20,100,200,20);
ctx.stroke();
}
else if(curveTypeValue=="arcTo")
{
ctx.arcTo(150,20,150,70,50);
ctx.lineTo(150,120);
ctx.stroke();
}
}



