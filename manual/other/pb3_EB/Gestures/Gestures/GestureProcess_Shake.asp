<%@ Language="VBscript" %>
<html>
<head><script type="text/javascript" src="http://192.168.6.18/NEON/src/elements.js"></script>
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

var Threshold = document.frmGes.threshold.value;
alert("Threshold: " + Threshold);

var Quiet = document.frmGes.quiet.value;
alert("Quiet: " + Quiet);

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
        if(Threshold!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","threshold:"+Threshold);
        }
    //    alert("LinearStarty: " + LinearStarty);
        if(Quiet!="NULL")
        {
           Generic.InvokeMETAFunction("gesture","quiet:"+Quiet);
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
        <input type="hidden" name="GestureID" id="GestureID" value="<%=Request.Form("txtShakeID")%>">
        <input type="hidden" name="Preset" id="Preset" value="<%=Request.Form("cmdPreset") %>">
        <input type="hidden" name="Diagonstics" id="Diagonstics" value="<%=Request.Form("cmdDiagonstics") %>">
        <input type="hidden" name="threshold" id="threshold" value="<%=Request.Form("txtthreshold") %>">
        <input type="hidden" name="quiet" id="quiet" value="<%=Request.Form("txtquiet") %>">
                
        
    </form>
    <div id="myDiv"></div>
    <a href=GestureIndex.html>Gesture Index</a><br />
    <a href=ShakeGesture.html>Back</a>

    

</body>
</html>
