<%@ Language=VBScript %>
<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>PB 3.0 Scanner Test</title>
   <!--<META HTTP-Equiv="scanner" Content="enabled">-->
    <META HTTP-Equiv="Scanner" Content="EnumScannerEvent:url('Javascript:EnumScanners(%s);')">
    <META HTTP-Equiv="quitbutton" Content="visibility:visible">
    <META HTTP-Equiv="SIPButton" Content="Visibility:Visible">

<script language=javascript>
 try
{
var generic = new ActiveXObject("PocketBrowser.generic");
}
catch(err)
{
var GenericPlugin = document.createElement('embed'); 
GenericPlugin.setAttribute('id',"embed1"); 
GenericPlugin.setAttribute('type',"application/x-wtg-legacy-generic"); 
GenericPlugin.setAttribute('hidden',"true"); 

// Attach the plugin embed tags to the body 
var theBody = document.getElementsByTagName('body')[0]; 
theBody.appendChild(GenericPlugin); 


}
//var generic = new ActiveXObject("PocketBrowser.generic");
//Description
function setEnumScannerTimer()
{
    setTimeout("onScannerEnable()", 3000);
}
//Description
function onScannerEnable()
{
	generic.InvokeMETAFunction('Scanner', 'Enumerate');
}
//Description
function EnumScanners(scannerArray)
{
	//alert("length"+scannerArray.length);
    for (i = 0; i < scannerArray.length; i++) 
        {
           
            this.document.frmSelectScanner.myscanner.options[i].text = scannerArray[i][0] + scannerArray[i][1];
            this.document.frmSelectScanner.myscanner.options[i].value = scannerArray[i][0];
        }
        
	for (iCount=0; iCount < scannerArray.length; iCount++) {
        var optn = document.createElement("OPTION");
        optn.text = scannerArray[iCount][0] + scannerArray[iCount][1];
        optn.value = scannerArray[iCount][0];
        //selectbox.options.add(optn);
        //alert(optn);
        this.document.frmSelectScanner.myscanner.options.add(optn);
    }
    //document.ODAXForm.Run.visible=true;

}

function validate()
{
    //alert("In");
    var scn = this.document.frmSelectScanner.myscanner.selectedIndex;
    //alert("scn");
    var dName = this.document.frmSelectScanner.deviceName.selectedIndex;
    //alert("dName");
    if(scn == -1)
    {
        alert("Please select a valid Scanner to continue");
    }
    else if(dName == -1)
    {
        alert("Please enter a valid DeviceName to continue");
    }
    else
    {
        document.frmSelectScanner.submit();
    }
}
</script>
</head>

<body BGCOLOR="#FFFFEA" TEXT="#0000A0" LINK="#FF0000" VLINK="#808080" ALINK="#008040" onload="setEnumScannerTimer();">

User Message A: <DIV ID="message"> </DIV>
<form name="frmSelectScanner" id="frmSelectScanner" method=post action="http://10.233.85.82/NEON/ScannerTest/selScannerProcess.asp">
    <table width="75%" border=1>
        <tr>
            <td>Select Scanner:</td>
            </tr>
            <tr>
            <td colspan=2>
                <select name="myscanner" id="myscanner" onChange="">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </td>
        </tr>
        <tr>
            <td>
                Please Enter DeviceName:
            </td>
        </tr>
        <tr>
            <td>
                <!--<input type=text id="deviceName" name="deviceName" value="" />-->
                <select name="deviceName" id="deviceName">
                    <option>ES400_WM65_1</option>
                    <option>ES400_WM65_2</option>
                    <option>ES400_WM65_3</option>
                    <option>ES400_WM65_4</option>
                    <option>ES400_WM65_5</option>
                    <option>ES400_WM65_6</option>
                    <option>ES400_WM65_7</option>
                    <option>ES400_WM65_8</option>
                    <option>ES400_WM65_9</option>
                    <option>ES400_WM65_10</option>
                    <option>ES400_WM65_11</option>
                    <option>ES400_WM65_12</option>
                    <option>MC65_WM65_1_Imager</option>
                    <option>MC65_WM65_2_Imager</option>
                    <option>MC65_WM65_3_Imager</option>
                    <option>MC65_WM65_4_Imager</option>
                    <option>MC65_WM65_5_Imager</option>
                    <option>MC65_WM65_1_Camera</option>
                    <option>MC65_WM65_2_Camera</option>
                    <option>MC65_WM65_3_Camera</option>
                    <option>MC65_WM65_4_Camera</option>
                    <option>MC65_WM65_5_Camera</option>
                    <option>Gobi_1_Imager</option>
                    <option>Gobi_2_Imager</option>
                    <option>Gobi_3_Imager</option>
                    <option>Gobi_4_Imager</option>
                    <option>Gobi_5_Imager</option>
                    <option>Gobi_1_Camera</option>
                    <option>Gobi_2_Camera</option>
                    <option>Gobi_3_Camera</option>
                    <option>Gobi_4_Camera</option>
                    <option>Gobi_5_Camera</option>
                    <option>MC9090_WM61_1</option>
                    <option>MC9090_WM61_2</option>
                    <option>MC9090_WM61_3</option>
                    <option>MC9090_WM61_4</option>
                    <option>MC9090_WM61_5</option>
                    <option>MC3090_WM61_1</option>
                    <option>MC3090_WM61_2</option>
                    <option>MC3090_WM61_3</option>
                    <option>MC3090_WM61_4</option>
                    <option>MC3090_WM61_5</option>
                    <option>MK4000_CE5</option>
                    <option>MK4000_CE51</option>
                    <option>MK4000_CE52</option>
                    <option>MK4000_CE53</option>
                    <option>MK4000_CE54</option>
                    <option>MK500_CE51</option>
                    <option>MK500_CE52</option>
                    <option>MK500_CE53</option>
                    <option>MK500_CE54</option>
                    <option>MK500_CE55</option>
                    <option>MC70_WM5</option>
                    <option>MC3090_CE5</option>
                    <option>MC3090_WM61</option>
                    <option>MC9090_WM61</option>
                    <option>MC9090_CE5</option>
                    <option>MC17T_CE5</option>
                    <option>MC9090_WM5</option>
                    <option>WT4090T_CE5</option>
                    <option>MC55_WM61</option>
                    <option>VC6090_WM61</option>
                    <option>MK4000_CE5_1</option>
                    <option>MK500_CE5_1</option>
                    <option>MC70_WM5_1</option>
                    <option>MC3090_CE5_1</option>
                    <option>MC3090_WM61_1</option>
                    <option>MC9090_WM61_1</option>
                    <option>MC9090_CE5_1</option>
                    <option>MC17T_CE5_1</option>
                    <option>MC9090_WM5_1</option>
                    <option>WT4090T_CE5_1</option>
                    <option>MC55_WM61_1</option>
                    <option>VC6090_WM61_1</option>
                    <option>MK4000_CE5_2</option>
                    <option>MK500_CE5_2</option>
                    <option>MC70_WM5_2</option>
                    <option>MC3090_CE5_2</option>
                    <option>MC3090_WM61_2</option>
                    <option>MC9090_WM61_2</option>
                    <option>MC9090_CE5_2</option>
                    <option>MC17T_CE5_2</option>
                    <option>MC9090_WM5_2</option>
                    <option>WT4090T_CE5_2</option>
                    <option>MC55_WM61_2</option>
                    <option>VC6090_WM61_2</option>
                    <option>MC17T_CE5_1DScanner</option>
                    <option>MC75A0_CameraScanner</option>
                    <option>MC75A6_CameraScanner</option>
                    <option>MC75A8_CameraScanner</option>
                    <option>MC75A0_BBScanner</option>
                    <option>MC75A0_BBScanner1</option>
                    <option>MC75A0_BBScanner2</option>
                    <option>MC75A0_BBScanner3</option>
                    <option>MC75A0_BBScanner4</option>
                    <option>MC75A0_BBScanner5</option>
                    <option>MC75A6_BBScanner</option>
                    <option>MC75A6_BBScanner1</option>
                    <option>MC75A6_BBScanner2</option>
                    <option>MC75A6_BBScanner3</option>
                    <option>MC75A6_BBScanner4</option>
                    <option>MC75A6_BBScanner5</option>
                    <option>MC75A8_BBScanner</option>
                    <option>MC75A0_PicoScanner</option>
                    <option>MC75A6_PicoScanner</option>
                    <option>MC75A8_PicoScanner</option>
                    <option>MC75A0_1DScanner</option>
                    <option>MC75A6_1DScanner</option>
                    <option>MC75A8_1DScanner</option>
                    <option>MC95_CameraScanner</option>
                    <option>MC95_BBScanner</option>
                    <option>MC95_PicoScanner</option>
                    <option>MC95_1DScanner</option>
                    <option>MC31xx_1DScanner</option>
                    <option>MC31xx_2DScanner</option>
                    <option>MC55_CameraScanner</option>
                    <option>MC70xx_WM5_2DScanner</option>
                    <option>MC7596_WM6_2DScanner</option>
                    <option>MC7596_WM6_2DScanner1</option>
                    <option>MC7596_WM6_2DScanner2</option>
                    <option>MC7596_WM6_2DScanner3</option>
                    <option>MC7596_WM6_2DScanner4</option>
                    <option>MC7596_WM6_2DScanner5</option>
                    <option>MC7596_WM6_2DScanner6</option>
                    <option>MC7596_WM6_2DScanner7</option>
                    <option>MC7596_WM6_2DScanner8</option>
                    <option>MC7596_WM6_2DScanner9</option>
                    <option>MC7596_WM6_2DScanner10</option>
                    <option>MC7596_WM6_2DScanner11</option>
                    <option>MC7596_WM6_2DScanner12</option>
                    <option>MC7596_WM6_2DScanner13</option>
                    <option>MC7596_WM6_2DScanner14</option>
                    <option>MC7596_WM6_2DScanner15</option>
                    <option>WT4090_CE5_RSMScanner</option>
                </select>
            </td>
        </tr>
       <!-- <tr>
            <td align=center>Give your own name:<INPUT TYPE="text" name="deviceName" id="deviceName" VALUE=""></td>
            
        </tr>-->
        <tr>
            <td align=center><INPUT TYPE="button" name="btn1" id="btn1" VALUE="Continue" onclick="validate();"></td>
            
        </tr>
    </table>
</form>


</body>
</html>
