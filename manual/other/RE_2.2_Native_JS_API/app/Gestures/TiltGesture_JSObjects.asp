<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Gesture Rendering</title>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
       
       
       
         <input type="hidden" name="GType" id="GType" value="<%=Request.QueryString("txtType")%>">
         <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.QueryString("txtTiltID")%>">
         <input type="hidden" name="Preset" id="Preset" value="<%=Request.QueryString("cmdPreset")%>">
         <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.QueryString("cmdDiagonstics")%>">
         <input type="hidden" name="TargetX" id="TargetX" value="<%=Request.QueryString("txtTargetX")%>">
         <input type="hidden" name="TargetY" id="TargetY" value="<%=Request.QueryString("txtTargetY")%>">
         <input type="hidden" name="TargetZ" id="TargetZ" value="<%=Request.QueryString("txtTargetZ")%>">
         <input type="hidden" name="TiltTolerance" id="TiltTolerance" value="<%=Request.QueryString("txtTiltTolerance")%>">
         <input type="hidden" name="Hysteresis" id="Hysteresis" value="<%=Request.QueryString("txtHysteresis")%>">
         <input type="hidden" name="group1" id="group1" value="<%=Request.QueryString("mydropdown1")%>">
         <input type="hidden" name="Number" id="Hidden11" value="<%=Request.QueryString("txtNumber")%>">




	     <input type="button" onclick="DeleteGesture();" value="Delete"/>
		 <br>
         <input type="button" onclick="application.quit();" value="Quit"/>
		 <br/>
        
        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href="Gesture_Index.html">Gesture Index</a><br />
    <a href="TiltGesture_JSObjects.html">Back</a>
</body>
</html>


<script language="javascript" type="text/javascript">

//var generic = new ActiveXObject("PocketBrowser.Generic");





var EventCounter=1;
function interval()
{
    setTimeout("performGesture()",2000);
}

function performGesture()
{

var Gesturetype = document.frmGes.GType.value;
var GestureID = document.frmGes.GestureID.value;
var Preset = document.frmGes.Preset.value;
var Diagonstics = document.frmGes.Diagonstics.value;
var VTargetX = document.frmGes.TargetX.value;
var VTargetY = document.frmGes.TargetY.value;
var VTargetZ = document.frmGes.TargetZ.value;
var VTiltTolerance = document.frmGes.TiltTolerance.value;
var VHysteresis = document.frmGes.Hysteresis.value;
var SelectedItem = document.frmGes.group1.value;

var NumberOfGestures;
NumberOfGestures= document.frmGes.Number.value;



    if(Gesturetype!="NULL")
    {
    if(SelectedItem=="HTML")
    {
    gesture.setEMML("detected:url('http://10.233.85.82/NEON/Navigate.html?ID=%s&COUNT=%s')");
    }
    else if(SelectedItem=="JSON")
	{
    gesture.detected='onGestureJSON(%json);';
	}
	else if(SelectedItem=="DETACHEVENT")
	{
	gesture.detected='';
	}
    else
    {
       gesture.detected="onGesture('%s','%s');";
    }
    
       //generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
       gesture.type=Gesturetype;
       
        if(GestureID!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","id:"+GestureID);
            gesture.id=GestureID;
        }
        if(Preset!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","preset:"+Preset);
            gesture.preset=Preset;
        }
        if(Diagonstics!="NULL")
        {
          // generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
                gesture.diagnostics=Diagonstics;
        }
        if(VTargetX!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","center-X:"+Centerx);
           gesture.TargetX=VTargetX;
		   //alert(VTargetX);
        }
        if(VTargetY!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","center-Y:"+Centery);
           gesture.TargetY=VTargetY;
        }
        if(VTargetZ!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","radius:"+Radius);
            gesture.TargetZ=VTargetZ;
        }
        if(VTiltTolerance!="NULL")
        {
           //generic.InvokeMETAFunction("gesture","delay:"+Delay);
           gesture.TiltTolerance=VTiltTolerance;
        }
        
        if(VHysteresis!="NULL")
        {
          // generic.InvokeMETAFunction("gesture","interval:"+Interval);
            gesture.Hysteresis=VHysteresis;
        }


        //generic.InvokeMETAFunction("gesture", "create");
  	 for(var i = 0; i<NumberOfGestures; i++)
  	  {
    		gesture.create();
    		myDiv1.innerHTML = i;
   	 }


	 //generic.InvokeMETAFunction("gesture", "");



        
    }

    
}


function DeleteGesture()
{ 
//generic.InvokeMETAFunction("gesture","delete");
gesture.delete();
} 

 function onGesture(id,count)
 {
      alert("Inside Gesture Event");
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
      //alert("Inside GestureJSON Event");
      myDiv.innerHTML = "Gesture with json event detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
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
 
</script>
