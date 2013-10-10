<%@ Language="VBscript" %>
<html>
<head>
<title>Gesture Rendering</title>
<script language="javascript" type="text/javascript">

var Generic = new ActiveXObject("PocketBrowser.Generic");

function interval()
{
    //alert("Hello");
    setTimeout("performGesture()",2000);
}

function performGesture()
{

var Gesturetype = document.frmGes.GType.value;
alert("Gesturetype:" + Gesturetype);

var GestureID = document.frmGes.GestureID.value;
alert("GestureID: "+GestureID);

var Preset = document.frmGes.Preset.value;
alert("Preset:"+Preset);

var Diagonstics = document.frmGes.Diagonstics.value;
alert("Diagonstics: " + Diagonstics);

var Targetx = document.frmGes.targetx.value;
alert("Centerx: " + Targetx);

var Targety = document.frmGes.targety.value;
alert("Centery: " + Targety);

var Targetz = document.frmGes.targetz.value;
alert("Radius: " + Targetz);

var Tolerance = document.frmGes.tolerance.value;
alert("Delay: " + Tolerance);

var Hysteresis = document.frmGes.hysteresis.value;
alert("Interval: " + Hysteresis);

    if(Gesturetype!="NULL")
    {
    //alert("Gesturetype:" + Gesturetype);
    Generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
    //}
    //else
    //{
    //    alert("GestureID:"+GestureID)
        if(GestureID!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","id:"+GestureID);
        }
    //    alert("LinearPreset:"+LinearPreset);
        if(Preset!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","preset:"+Preset);
        }
    //    alert("LinearDiagonstics: " + LinearDiagonstics);
        if(Diagonstics!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
        }
    //    alert("LinearStartx: " + LinearStartx);
        if(Targetx!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","target-x:"+Targetx);
        }
    //    alert("LinearStarty: " + LinearStarty);
        if(Targety!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","target-y:"+Targety);
        }
    //    alert("LinearEndx: " + LinearEndx);
        if(Targetz!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","target-z:"+Targetz);
        }
    //    alert("LinearEndy: " + LinearEndy);
        if(Tolerance!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","tolerance:"+Tolerance);
        }
        
        if(Hysteresis!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","hysteresis:"+Hysteresis);
        }
        
 
        
        Generic.InvokeMETAFunction("gesture","create");

        Generic.InvokeMETAFunction("gesture-detected","url('Javascript:onGesture('%s','%s');')");
    }

    function onGesture(id, count)
    {
        myDiv.InnerHTML = "Gesture ID: " + id + ", Count: " + count;
    }
}
</script>
</head>

<body onload="interval();">
    <form name="frmGes" id="frmGes" action="">
        <input type="hidden" name="GType" id="GType" value="<%=Request.Form("txtType")%>">
        <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.Form("txtTiltID")%>">
        <input type="hidden" name="Preset" id="Preset" value="<%=Request.Form("cmdPreset") %>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("cmdDiagonstics") %>">
        <input type="hidden" name="targetx" id="targetx" value="<%=Request.Form("txttargetx") %>">
        <input type="hidden" name="targety" id="targety" value="<%=Request.Form("txttargety") %>">
        <input type="hidden" name="targetz" id="targetz" value="<%=Request.Form("txttargetz") %>">
        <input type="hidden" name="tolerance" id="tolerance" value="<%=Request.Form("txttolerance") %>">
        <input type="hidden" name="hysteresis" id="hysteresis" value="<%=Request.Form("txthysteresis") %>">
        
        
    </form>
    <div id="myDiv"></div>
     <a href=GestureIndex.html>Gesture Index</a><br />
    <a href=TiltGesture.html>Back</a>
</body>
</html>
