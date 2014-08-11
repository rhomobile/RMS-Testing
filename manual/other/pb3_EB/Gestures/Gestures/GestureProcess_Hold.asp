<%@ Language="VBscript" %>
<html>
<head><script type="text/javascript" src="/src/elements.js"></script>
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



    if(Gesturetype!="NULL")
    {
    if(SelectedItem=="HTML")
    {
     alert("1");
     Generic.InvokeMETAFunction("gesture-detected", "url('http://157.235.207.158/pb3.x/NavigateTest.html')");
    }
    else
    {
    alert("2");
    Generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    //Generic.InvokeMETAFunction("gesture-detected","url('http://157.235.207.79/pb3.x/NavigateTest.html')");
    }
    
    Generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
        if(GestureID!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","id:"+GestureID);
        }
        if(Preset!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","preset:"+Preset);
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
        if(Delay!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","delay:"+Delay);
        }
        
        if(Interval!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","interval:"+Interval);
        }


        Generic.InvokeMETAFunction("gesture", "create");

//        for (var i = 0; i < 1000; i++) 
//        {
//            Generic.InvokeMETAFunction("gesture", "type:HOLD");
//            Generic.InvokeMETAFunction("gesture", "Diagnostics:TRUE");
//            Generic.InvokeMETAFunction("gesture", "create");
//            myDiv1.innerHTML = i;
//        }
        
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
        <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.Form("txtHoldID")%>">
        <input type="hidden" name="Preset" id="Preset" value="<%=Request.Form("cmdPreset") %>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("cmdDiagonstics") %>">
        <input type="hidden" name="centerx" id="centerx" value="<%=Request.Form("txtcenterx") %>">
        <input type="hidden" name="centery" id="centery" value="<%=Request.Form("txtcentery") %>">
        <input type="hidden" name="radius" id="radius" value="<%=Request.Form("txtradius") %>">
        <input type="hidden" name="delay" id="delay" value="<%=Request.Form("txtdelay") %>">
        <input type="hidden" name="interval" id="interval" value="<%=Request.Form("txtinterval") %>">
        <input type="hidden" name="group1" id="group1" value="<%=Request.Form("mydropdown1")%>">
        
        
    </form>
    <div id="myDiv">Gesture Detection:-</div>
    <div id="myDiv1">Count:-</div>
     <a href=GestureIndex.html>Gesture Index</a><br />
    <a href=HoldGesture.html>Back</a>
</body>
</html>
