<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Gesture Rendering</title>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
       
       
       
         <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
         <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.Form("txtHoldID")%>">
         <input type="hidden" name="Preset" id="Preset" value="<%=Request.Form("cmdPreset")%>">
         <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("cmdDiagonstics")%>">
         <input type="hidden" name="centerx" id="centerx" value="<%=Request.Form("txtcenterx")%>">
         <input type="hidden" name="centery" id="centery" value="<%=Request.Form("txtcentery")%>">
         <input type="hidden" name="radius" id="radius" value="<%=Request.Form("txtradius")%>">
         <input type="hidden" name="delay" id="delay" value="<%=Request.Form("txtdelay")%>">
         <input type="hidden" name="interval" id="interval" value="<%=Request.Form("txtinterval")%>">
         <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
         <input type="hidden" name="Number" id="Hidden11" value="<%=Request.Form("txtNumber")%>">






	     <input type="button" onclick="DeleteGesture();" value="Delete"/>

        
        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href="Gesture_Index.html">Gesture Index</a><br />
    <a href="HoldGesture_Generic.html">Back</a>
</body>
</html>


<script language="javascript" type="text/javascript">


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
var Centerx = document.frmGes.centerx.value;
var Centery = document.frmGes.centery.value;
var Radius = document.frmGes.radius.value;
var Delay = document.frmGes.delay.value;
var Interval = document.frmGes.interval.value;
var SelectedItem = document.frmGes.group1.value;

var NumberOfGestures;
NumberOfGestures= document.frmGes.Number.value;



    if(Gesturetype!="NULL")
    {
    if(SelectedItem=="HTML")
    {
     //alert("1");
    generic.InvokeMETAFunction("gesture-detected", "url('http://10.233.85.82/NEON/Navigate.html?ID=%s&COUNT=%s')");
    }
    else if(SelectedItem=="JSON")
	{
	generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGestureJSON(%json);')");

	}
    else
    {
      generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    }
    
       generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
        if(GestureID!="NULL")
        {
           generic.InvokeMETAFunction("gesture","id:"+GestureID);
        }
        if(Preset!="NULL")
        {
           generic.InvokeMETAFunction("gesture","preset:"+Preset);
        }
        if(Diagonstics!="NULL")
        {
           generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
        }
        if(Centerx!="NULL")
        {
           generic.InvokeMETAFunction("gesture","centerX:"+Centerx);
        }
        if(Centery!="NULL")
        {
           generic.InvokeMETAFunction("gesture","centerY:"+Centery);
        }
        if(Radius!="NULL")
        {
           generic.InvokeMETAFunction("gesture","radius:"+Radius);
        }
        if(Delay!="NULL")
        {
           generic.InvokeMETAFunction("gesture","delay:"+Delay);
        }
        
        if(Interval!="NULL")
        {
           generic.InvokeMETAFunction("gesture","interval:"+Interval);
        }


        //generic.InvokeMETAFunction("gesture", "create");
  	 for(var i = 0; i<NumberOfGestures; i++)
  	  {
    		//generic.InvokeMETAFunction("gesture","type:linear");
    		//generic.InvokeMETAFunction("gesture","Diagnostics:TRUE");
    		generic.InvokeMETAFunction("gesture","create");
    		myDiv1.innerHTML = i;
   	 }


	generic.InvokeMETAFunction("gesture", "");


    }

    
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
