<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Gesture Rendering</title>



</head>

        <body onload="interval();">
        <form name="frmGes" id="frmGes" action="">
        
        <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
        <input type="hidden" name="LinearID" id="LinearID" value="<%=Request.Form("txtLinearID")%>">
        <input type="hidden" name="LinearPreset" id="LinearPreset" value="<%=Request.Form("dropdownLinearPreset")%>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("dropdownDiagonstics")%>">
        <input type="hidden" name="startx" id="startx" value="<%=Request.Form("txtstartx")%>">
        <input type="hidden" name="starty" id="starty" value="<%=Request.Form("txtstarty")%>">
        
        <input type="hidden" name="endx" id="endx" value="<%=Request.Form("txtendx")%>">
        <input type="hidden" name="endy" id="endy" value="<%=Request.Form("txtendy")%>">
        <input type="hidden" name="tolerance" id="tolerance" value="<%=Request.Form("txttolerance")%>">
        <input type="hidden" name="sensitivity" id="sensitivity" value="<%=Request.Form("txtsensitivity")%>">
        <input type="hidden" name="skew" id="skew" value="<%=Request.Form("txtskew")%>">
        <input type="hidden" name="deviation" id="deviation" value="<%=Request.Form("txtdeviation")%>">
        <input type="hidden" name="regionwidth" id="regionwidth" value="<%=Request.Form("txtregionwidth")%>">
        <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
        <input type="hidden" name="Number" id="Number" value="<%=Request.Form("txtNumber")%>">
        
        
        
        
        
        
        
        
        <input type="button" onclick="QuitPB();" value="Quit"/>
	<input type="button" onclick="DeleteGesture();" value="Delete"/>
	<input type="button" onclick="DeAttachEvent();" value="DeAttachEvent"/>
        
        
    </form>
  
     <a href=Gesture_Index.html>Gesture Index</a><br>
    <a href=LinearGesture_ActiveX.html>Back</a>
    
    <div id="myDiv">Gesture Detection:-</div>
	<div id="myDiv1">Count:-</div>
     



</body>
</html>

<script language="javascript" type="text/javascript">

var objgeneric = new ActiveXObject("PocketBrowser.Generic");






var EventCounter=1;


function interval()
{
    setTimeout("performGesture()",2000);
}


function LoopPerformGesture()
{
for(var counter=0;counter<2000;counter++)
{
performGesture();
}
}


function performGesture()
{
var Gesturetype;
var GestureID;
var LinearPreset;
var LinearDiagonstics;
var LinearStartx;
var LinearStarty;
var LinearEndx;
var LinearEndy;
var LinearTolerance;
var LinearSensitivity;
var LinearSkew;
var LinearDeviation;
var LinearRegionWidth;
var SelectedItem="";
var NumberOfGestures;



Gesturetype = document.frmGes.GType.value;
GestureID = document.frmGes.LinearID.value;
LinearPreset = document.frmGes.LinearPreset.value;
LinearDiagonstics = document.frmGes.Diagonstics.value;
LinearStartx = document.frmGes.startx.value;
LinearStarty = document.frmGes.starty.value;
LinearEndx = document.frmGes.endx.value;
LinearEndy = document.frmGes.endy.value;
LinearTolerance = document.frmGes.tolerance.value;
LinearSensitivity = document.frmGes.sensitivity.value;
LinearSkew = document.frmGes.skew.value;
LinearDeviation = document.frmGes.deviation.value;
LinearRegionWidth = document.frmGes.regionwidth.value;
SelectedItem = document.frmGes.group1.value;

NumberOfGestures= document.frmGes.Number.value;







if(Gesturetype!="NULL")
{

if(SelectedItem=="HTML")
{
    objgeneric.InvokeMETAFunction("gesture-detected", "url('http://10.233.85.82/NEON/Navigate.html?ID=%s&COUNT=%s')");
}
else if(SelectedItem=="JSON")
{
objgeneric.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");

}
else if(SelectedItem=="DETACHEVENT")
{
objgeneric.InvokeMETAFunction("gesture-detected","url('')");

}
else if(SelectedItem=="EMPTYEVENT")
{
objgeneric.InvokeMETAFunction("gesture-detected","");

}
else


{  
    objgeneric.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");

}



    objgeneric.InvokeMETAFunction("gesture","type:" + Gesturetype);

    if(LinearPreset!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","preset:"+LinearPreset);
    }
    if(GestureID!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","id:"+GestureID);
    }
    if(LinearDiagonstics!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","diagnostics:"+LinearDiagonstics);
    }
    if(LinearStartx!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","startX:"+LinearStartx);
    }
    if(LinearStarty!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","startY:"+LinearStarty);
    }
    if(LinearEndx!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","endX:"+LinearEndx);
    }
    if(LinearEndy!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","endY:"+LinearEndy);
    }
    if(LinearTolerance!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","tolerance:"+LinearTolerance);
    }
    if(LinearSensitivity!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","sensitivity:"+LinearSensitivity);
    }
    if(LinearSkew!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","skew:"+LinearSkew);
    }
    if(LinearDeviation!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","deviation:"+LinearDeviation);
    }
    if(LinearRegionWidth!="NULL")
    {
       objgeneric.InvokeMETAFunction("gesture","regionWidth:"+LinearRegionWidth);
   }
    for(var i = 0; i<NumberOfGestures; i++)
    {
    		objgeneric.InvokeMETAFunction("gesture","create");
    		myDiv1.innerHTML = i;
    }
  
}

   

}

function DeAttachEvent()
{
objgeneric.InvokeMETAFunction("gesture-detected", "url('')");
}

function DeleteGesture()
{ 
objgeneric.InvokeMETAFunction("gesture","delete");
} 

 function onGesture(id,count)
 {
      
      myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + id + ", Count: " + count;
      EventCounter++;
      
      if(id=="Scan")
      {
      objgeneric.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      objgeneric.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      objgeneric.InvokeMETAFunction("battery","visibility:visible");
      }
     
 }
 
 function onGestureJSON(jsonobject)
 {
      
      myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
      EventCounter++;
      
      if(id=="Scan")
      {
      objgeneric.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      objgeneric.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      objgeneric.InvokeMETAFunction("battery","visibility:visible");
      }
 }
 
 function QuitPB()
 {
  objgeneric.InvokeMETAFunction("Application","Quit");
 }

</script>
