<%@ Language="VBscript" %>
<html>
<head><script type="text/javascript" src="http://192.168.6.18/NEON/src/elements.js"></script>
<title>Gesture Rendering</title>
<!--<META HTTP-Equiv="gesture-detected" Content="url('Javascript:onGesture('%s','%s');')">-->
<!--<META HTTP-Equiv="gesture-detected" Content="url('http://157.235.207.79/pb3.x/NavigateTest.html')">-->

<script language="javascript" type="text/javascript">

var Generic = new ActiveXObject("PocketBrowser.Generic");
var EventCounter=1;


function interval()
{
    setTimeout("performGesture()",2000);
    //setTimeout("LoopPerformGesture()",2000);
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




if(Gesturetype!="NULL")
{

if(SelectedItem=="HTML")
{
    Generic.InvokeMETAFunction("gesture-detected", "url('http://157.235.207.158/pb3.x/NavigateTest.html')");
}
else
{  
   Generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    //Generic.InvokeMETAFunction("gesture-detected","");
    //alert("Hi");
    //Generic.InvokeMETAFunction("gesture","detected:");
}



    Generic.InvokeMETAFunction("gesture","type:" + Gesturetype);

    if(LinearPreset!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","preset:"+LinearPreset);
    }
    if(GestureID!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","id:"+GestureID);
    }
    if(LinearDiagonstics!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","diagnostics:"+LinearDiagonstics);
    }
    if(LinearStartx!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","start-x:"+LinearStartx);
    }
    if(LinearStarty!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","start-y:"+LinearStarty);
    }
    if(LinearEndx!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","end-x:"+LinearEndx);
    }
    if(LinearEndy!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","end-y:"+LinearEndy);
    }
    if(LinearTolerance!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","tolerance:"+LinearTolerance);
    }
    if(LinearSensitivity!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","sensitivity:"+LinearSensitivity);
    }
    if(LinearSkew!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","skew:"+LinearSkew);
    }
    if(LinearDeviation!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","deviation:"+LinearDeviation);
    }
    if(LinearRegionWidth!="NULL")
    {
       Generic.InvokeMETAFunction("gesture","region-width:"+LinearRegionWidth);
   }
   Generic.InvokeMETAFunction("gesture", "create");
    /*for(var i = 0; i<1000 ; i++)
    {
    		Generic.InvokeMETAFunction("gesture","type:linear");
    		Generic.InvokeMETAFunction("gesture","Diagnostics:TRUE");
    		Generic.InvokeMETAFunction("gesture","create");
    		myDiv1.innerHTML = i;
    }*/
  
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
 
 
 function QuitPB()
 {
  Generic.InvokeMETAFunction("Application","Quit");
 }

</script>

</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
        <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
        <input type="hidden" name="LinearID" id="LinearID" value="<%=Request.Form("txtLinearID")%>">
        <input type="hidden" name="LinearPreset" id="LinearPreset" value="<%=Request.Form("dropdownLinearPreset") %>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("dropdownDiagonstics") %>">
        <input type="hidden" name="startx" id="startx" value="<%=Request.Form("txtstartx") %>">
        <input type="hidden" name="starty" id="starty" value="<%=Request.Form("txtstarty") %>">
        <input type="hidden" name="endx" id="endx" value="<%=Request.Form("txtendx") %>">
        <input type="hidden" name="endy" id="endy" value="<%=Request.Form("txtendy") %>">
        <input type="hidden" name="tolerance" id="tolerance" value="<%=Request.Form("txttolerance") %>">
        <input type="hidden" name="sensitivity" id="sensitivity" value="<%=Request.Form("txtsensitivity") %>">
        <input type="hidden" name="skew" id="skew" value="<%=Request.Form("txtskew") %>">
        <input type="hidden" name="deviation" id="deviation" value="<%=Request.Form("txtdeviation")%>">
        <input type="hidden" name="regionwidth" id="regionwidth" value="<%=Request.Form("txtregionwidth")%>">
        <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
        <input type="button" onclick="QuitPB();" value="Quit"/>
        
    </form>
    
     <a href=GestureIndex.html>Gesture Index</a><br>
    <a href=LinearGesture.html>Back</a>
    
    <div id="myDiv">Gesture Detection:-</div>
	<div id="myDiv1">Count:-</div>
</body>
</html>
