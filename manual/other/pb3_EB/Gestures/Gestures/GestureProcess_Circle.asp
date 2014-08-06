<%@ Language="VBscript" %>
<html>
<head><script type="text/javascript" src="http://192.168.6.18/NEON/src/elements.js"></script>
<title>Gesture Rendering</title>
<script language="javascript" type="text/javascript">

var Generic = new ActiveXObject("PocketBrowser.Generic");
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
    Generic.InvokeMETAFunction("gesture-detected","url('http://157.235.207.158/pb3.x/NavigateTest.html')");
    }
    else
    {
    Generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    }
    
    
    Generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
        if(Preset!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","preset:"+Preset);
        }
        if(GestureID!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","id:"+GestureID);
        }
        if(Diagonstics!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
        }
        if(Centerx!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","center-x:"+Centerx);
        }
        if(Centery!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","center-y:"+Centery);
        }
        if(Radius!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","radius:"+Radius);
        }
        if(Start!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","start:"+Start);
        }
        
        if(End!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","end:"+End);
        }
        
        if(Tolerance!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","tolerance:"+Tolerance);
        }
        if(Sensitivity!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","sensitivity:"+Sensitivity);
        }


       Generic.InvokeMETAFunction("gesture", "create");

//         for (var i = 0; i < 10000; i++) 
//          {
//              Generic.InvokeMETAFunction("gesture", "type:Circle");
//              Generic.InvokeMETAFunction("gesture", "Diagnostics:true");
//    	     Generic.InvokeMETAFunction("gesture","create");
//        	 myDiv1.innerHTML = i;
//	      }

        
    }


}
function onGesture(id,count)
{
  myDiv.innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + id + ", Count: " + count;
  EventCounter++;
	if(id=="Scan")
      {
      Generic.InvokeMETAFunction("Scanner","enabled;start");
      }
      if(id=="Signal")
      {
      Generic.InvokeMETAFunction("Signal","visibility:visible");
      }
      if(id=="Battery")
      {
      Generic.InvokeMETAFunction("battery","visibility:visible");
      }


}
</script>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
        <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
        <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.Form("txtCircleID")%>">
        <input type="hidden" name="Preset" id="Preset" value="<%=Request.Form("cmdPreset") %>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("cmdDiagonstics") %>">
        <input type="hidden" name="centerx" id="centerx" value="<%=Request.Form("txtcenterx") %>">
        <input type="hidden" name="centery" id="centery" value="<%=Request.Form("txtcentery") %>">
        <input type="hidden" name="radius" id="radius" value="<%=Request.Form("txtradius") %>">
        <input type="hidden" name="start" id="start" value="<%=Request.Form("txtstart") %>">
        <input type="hidden" name="end" id="end" value="<%=Request.Form("txtend") %>">
        <input type="hidden" name="tolerance" id="tolerance" value="<%=Request.Form("txttolerance") %>">
        <input type="hidden" name="sensitivity" id="sensitivity" value="<%=Request.Form("txtsensitivity") %>">
        <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href=GestureIndex.html>Gesture Index</a><br />
    <a href=CircleGesture.html>Back</a>
</body>
</html>
