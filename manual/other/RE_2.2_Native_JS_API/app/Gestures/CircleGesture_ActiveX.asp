<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Gesture Rendering</title>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
    
    
      
      
      
        <input type="hidden" name="GType" id="Hidden1" value="<%=Request.QueryString("txtType")%>">
        <input type="hidden" name="GestureID" id="Hidden2" value="<%=Request.QueryString("txtCircleID")%>">
        <input type="hidden" name="Preset" id="Hidden3" value="<%=Request.QueryString("cmdPreset")%>">
        <input type="hidden" name="Diagonstics" id="Hidden4" value="<%=Request.QueryString("cmdDiagonstics")%>">
        <input type="hidden" name="centerx" id="Hidden5" value="<%=Request.QueryString("txtcenterx")%>">
        <input type="hidden" name="centery" id="Hidden6" value="<%=Request.QueryString("txtcentery")%>">
        <input type="hidden" name="radius" id="Hidden7" value="<%=Request.QueryString("txtradius")%>">
        <input type="hidden" name="start" id="Hidden8" value="<%=Request.QueryString("txtstart")%>">
        <input type="hidden" name="end" id="Hidden9" value="<%=Request.QueryString("txtend")%>">
        <input type="hidden" name="tolerance" id="Hidden10" value="<%=Request.QueryString("txttolerance")%>">
        <input type="hidden" name="sensitivity" id="Hidden11" value="<%=Request.QueryString("txtsensitivity")%>">
        <input type="hidden" name="group1" id="Hidden12" value="<%=Request.QueryString("mydropdown1")%>">
        <input type="hidden" name="Number" id="Number" value="<%=Request.QueryString("txtNumber")%>">
        
	<input type="button" onclick="DeleteGesture();" value="Delete"/>

        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href="Gesture_Index.html">Gesture Index</a><br />
    <a href="CircleGesture_ActiveX.html">Back</a>
</body>
</html>



<script language="javascript" type="text/javascript">

var objgeneric = new ActiveXObject("PocketBrowser.Generic");





var EventCounter=1;
function interval()
{
    setTimeout("performGesture()",2000);
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
NumberOfGestures= document.frmGes.Number.value;

Gesturetype = document.frmGes.GType.value;
GestureID = document.frmGes.GestureID.value;
Preset = document.frmGes.Preset.value;
Diagonstics = document.frmGes.Diagonstics.value;
Centerx = document.frmGes.centerx.value;
Centery = document.frmGes.centery.value;
Radius = document.frmGes.radius.value;
Start = document.frmGes.start.value;
End = document.frmGes.end.value;
Tolerance = document.frmGes.tolerance.value;
Sensitivity = document.frmGes.sensitivity.value;
SelectedItem = document.frmGes.group1.value;


    if(Gesturetype!="NULL")
    {
    
    if(SelectedItem=="HTML")
    {
    objgeneric.InvokeMETAFunction("gesture-detected", "url('http://10.233.85.82/Navigate.html?ID=%s&COUNT=%s')");
   
    }
    else if(SelectedItem=="JSON")
	{
	objgeneric.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");

	}
    else
    {
    objgeneric.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    }
    
    
       objgeneric.InvokeMETAFunction("gesture","type:" + Gesturetype);
        if(Preset!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","preset:"+Preset);
        }
	if(GestureID!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","id:"+GestureID);
        }

        if(Diagonstics!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
        }
        if(Centerx!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","centerX:"+Centerx);
            //objgeneric.InvokeMETAFunction("gesture","Center-x:"+Centerx);
        }
        if(Centery!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","centerY:"+Centery);
             //objgeneric.InvokeMETAFunction("gesture","Center-Y:"+Centery);
        }
        if(Radius!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","radius:"+Radius);
        }
        if(Start!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","start:"+Start);
        }
        
        if(End!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","end:"+End);
        }
        
        if(Tolerance!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","tolerance:"+Tolerance);
        }
        if(Sensitivity!="NULL")
        {
           objgeneric.InvokeMETAFunction("gesture","sensitivity:"+Sensitivity);
        }




	for(var i = 0; i<NumberOfGestures; i++)
    	{

    		objgeneric.InvokeMETAFunction("gesture","create");
    		myDiv1.innerHTML = i;
    	}



        
    }


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
      
      myDiv.innerHTML = "Gesture with json event detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
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
</script>
