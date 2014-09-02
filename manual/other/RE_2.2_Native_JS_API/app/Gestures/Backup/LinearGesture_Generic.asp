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
    <a href=LinearGesture_Generic.html>Back</a>
    
    <div id="myDiv">Gesture Detection:-</div>
	<div id="myDiv1">Count:-</div>
     



</body>
</html>

<script language="javascript" type="text/javascript">


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
    generic.InvokeMETAFunction("gesture-detected", "url('http://10.233.85.82/NEON/Navigate.html?ID=%s&COUNT=%s')");
}
else if(SelectedItem=="JSON")
{
generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");

}
else if(SelectedItem=="DETACHEVENT")
{
generic.InvokeMETAFunction("gesture-detected","url('')");

}
else if(SelectedItem=="EMPTYEVENT")
{
generic.InvokeMETAFunction("gesture-detected","");

}
else


{  
    generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");

}



    generic.InvokeMETAFunction("gesture","type:" + Gesturetype);

    if(LinearPreset!="NULL")
    {
       generic.InvokeMETAFunction("gesture","preset:"+LinearPreset);
    }
    if(GestureID!="NULL")
    {
       generic.InvokeMETAFunction("gesture","id:"+GestureID);
    }
    if(LinearDiagonstics!="NULL")
    {
       generic.InvokeMETAFunction("gesture","diagnostics:"+LinearDiagonstics);
    }
    if(LinearStartx!="NULL")
    {
       generic.InvokeMETAFunction("gesture","startX:"+LinearStartx);
    }
    if(LinearStarty!="NULL")
    {
       generic.InvokeMETAFunction("gesture","startY:"+LinearStarty);
    }
    if(LinearEndx!="NULL")
    {
       generic.InvokeMETAFunction("gesture","endX:"+LinearEndx);
    }
    if(LinearEndy!="NULL")
    {
       generic.InvokeMETAFunction("gesture","endY:"+LinearEndy);
    }
    if(LinearTolerance!="NULL")
    {
       generic.InvokeMETAFunction("gesture","tolerance:"+LinearTolerance);
    }
    if(LinearSensitivity!="NULL")
    {
       generic.InvokeMETAFunction("gesture","sensitivity:"+LinearSensitivity);
    }
    if(LinearSkew!="NULL")
    {
       generic.InvokeMETAFunction("gesture","skew:"+LinearSkew);
    }
    if(LinearDeviation!="NULL")
    {
       generic.InvokeMETAFunction("gesture","deviation:"+LinearDeviation);
    }
    if(LinearRegionWidth!="NULL")
    {
       generic.InvokeMETAFunction("gesture","regionWidth:"+LinearRegionWidth);
   }
    for(var i = 0; i<NumberOfGestures; i++)
    {
    		generic.InvokeMETAFunction("gesture","create");
    		myDiv1.innerHTML = i;
    }
  
}

   

}

function DeAttachEvent()
{
generic.InvokeMETAFunction("gesture-detected", "url('')");
}

function DeleteGesture()
{ 
generic.InvokeMETAFunction("gesture","delete");
} 

 function onGesture(id,count)
 {
      
      myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + id + ", Count: " + count;
      EventCounter++;
      
      if(id=="Scan")
      {
      generic.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      generic.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      generic.InvokeMETAFunction("battery","visibility:visible");
      }
     
 }
 
 function onGestureJSON(jsonobject)
 {
      
      myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
      EventCounter++;
      
      if(id=="Scan")
      {
      generic.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      generic.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      generic.InvokeMETAFunction("battery","visibility:visible");
      }
 }
 
 function QuitPB()
 {
  generic.InvokeMETAFunction("Application","Quit");
 }

</script>
