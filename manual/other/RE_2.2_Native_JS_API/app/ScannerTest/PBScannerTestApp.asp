<%@ Language=VBScript %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

    <title>PB 3.0 Scanner Test</title>
    <META HTTP-Equiv="scanner" Content="DecodeEvent:url('javascript:doScan('%s', '%s', %s, '%s', '%s','%s');')">
    <META HTTP-Equiv="Scanner" Content="EnumScannerEvent:url('Javascript:EnumScanners(%s);')">
    <META HTTP-Equiv="quitbutton" Content="visibility:visible">
    <META HTTP-Equiv="quitbutton" Content="left:10">
    <META HTTP-Equiv="quitbutton" Content="top:10">
    
<script language=javascript type="text/javascript">
var ax = new ActiveXObject("CeODAX.ODAX");
var Generic = new ActiveXObject("PocketBrowser.Generic");
var ActualRes="";
var Result="";
var Params="";
var x = 1;                        // For Reading next record from XML sheet
var selected_text="";             // For Reading Selected Record test ID by list.
var selected_scanner="";         //For Reading Selected Scanner by list.
var scanningAssociationBarcode = false;

//Description
function setEnumScannerTimer()
{
    setTimeout("onScannerEnable()", 3000);
}
//Description
function onScannerEnable()
{
	Generic.InvokeMETAFunction('Scanner', 'Enumerate');
}
//Description
function EnumScanners(scannerArray)
{
//	alert("length"+scannerArray.length);

	for (iCount=0; iCount < scannerArray.length; iCount++) {
        var optn = document.createElement("OPTION");
        optn.text = scannerArray[iCount][0] + scannerArray[iCount][1];
        optn.value = scannerArray[iCount][1];
        //selectbox.options.add(optn);
        //alert(optn);
        this.document.ODAXForm.myscanner.options.add(optn);
    }
    //document.ODAXForm.Run.visible=true;
}

function mydropdown_creation() 
{
    var iCount = 0;
    var n = ax.Select('SELECT * FROM \'\\application\\SCANNER.xml\';', ',', false);

    for (iCount; iCount < n; iCount++) {
        var testid = ax.Get("TestID");
        var optn = document.createElement("OPTION");
        optn.text = testid;
        optn.value = testid;
        //selectbox.options.add(optn);
        ODAXForm.mydropdown.options.add(optn);
        ax.MoveNext();
    }
    ax.MoveFirst();
    GetColumnData();
}
//Description
function GetColumnData()
{
   
    hide();
    var n = ax.Select('SELECT * FROM \'\\application\\SCANNER.xml\';', ',', false);
    var count=0;
    var z=1;
   

      if(selected_text=="")
      {
        while(z!=x)
        {
            ax.movenext();
            z++;
        }
      }
      else
      {
          for(;count<n;count++)
          {
            var colval1 = ax.Get("TestID");

            if(colval1 == selected_text)
                {
                    break;

                }
                else
                {
                    ax.movenext();

                }
             }
      }
                      
    ODAXForm.testID.value= ax.Get("TestID");
	ODAXForm.ExpectedResult.value= ax.Get("ExpectedRes");
	Params=ax.Get("Params");
    ODAXForm.Barcode.value = Params;
    
}

//Description
function doTest(sw)
{
    var i=0;
	if(sw == 1)
	  {
                
                setDefaultparams();
                var parameters_array = Params.split("@");
                var len = parameters_array[1].length;
                var indx = parameters_array[1].lastIndexOf(";");
                var str1= parameters_array[1].substring(0,indx);
                var str2 = parameters_array[1].substring(indx, len);
                var finalstr = str1 + ":"+selected_scanner + str2;
                var bRetVal = Generic.InvokeMETAFunction(parameters_array[0],finalstr);

      }
	else
    if(sw==2)
	  {
		Generic.InvokeMETAFunction('scanner', 'disabled');
		Generic.InvokeMETAFunction('scanner', 'stop');
	  }
    else
	 {
        	ODAXForm.ActualResult.value="";
            x=x+1;
            GetColumnData();
            doTest(2);
	 }
}
//Description
function setDefaultparams()
{
    var x = 'upc_ean-bookland:false;upc_ean-coupon:false;upc_eanlineardecode:true;upc_eanrandomweightcheckdigit:false;upc_eanretrycount:5;upc_eansecuritylevel:none;upc_eansupplemental2:true;upc_eansupplemental5:true;upc_eansupplementalmode:none'
    Generic.InvokeMETAFunction('scanner', x);
    x='upce0ConvertToupca:false;upce0preamble:none;upce0ReportCheckDigit:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='upce1ConvertToupca:false;upce1preamble:none;upce1ReportCheckDigit:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='upcapreamble:SYSTEM_CHAR;upcaReportCheckDigit:true'
    Generic.InvokeMETAFunction('scanner',x);
    x='msicheckdigits:true;msiCheckDigitScheme:mod_11_10;msimaxlength:55;msiMinLength:4;msiRedundancy:true;msiReportCheckDigit:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='ean8ConvertToEAN13:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='CodabarCLSiEditing:false;Codabarnotisediting:false;Codabarredundancy:true;CodabarMinLength:6;Codabarmaxlength:55'
    Generic.InvokeMETAFunction('scanner',x);
    x='Code39code32prefix:false;Code39ConvertToCode32:false;Code39fullascii:false;Code39MinLength:0;Code39maxlength:55;Code39Redundancy:false;Code39ReportCheckDigit:false;Code39VerifyCheckDigit:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='d2of5maxlength:14;d2of5MinLength:0;d2of5Redundancy:true'
    Generic.InvokeMETAFunction('scanner',x);
    x='i2of5ConvertToEAN13:false;i2of5MinLength:14;i2of5maxlength:10;i2of5Redundancy:true;i2of5ReportCheckDigit:false;i2of5VerifyCheckDigit:none'
    Generic.InvokeMETAFunction('scanner',x);
    x='Code11CheckDigitCount:one;Code11Redundancy:true;Code11ReportCheckDigit:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='Code93maxlength:55;Code93MinLength:0;Code93Redundancy:false'
    Generic.InvokeMETAFunction('scanner',x);
    x='code128ean128:true;Code128maxlength:55;Code128MinLength:0;code128other128:true;Code128Redundancy:false;code128isbt128:true'
    Generic.InvokeMETAFunction('scanner',x);
}
//
function doScan(data, source, type, time, length,theEvent)
   {
      
var fieldValue = data;
var conditionField = ODAXForm.testID.value;
var fieldValue1="Pass";
var fieldValue2 = "Fail";

//if (ODAXForm.testID.value == "VT056-0249") 
//{
//    ODAXForm.ActualResult.value = data;
//}
//if (expectingUnpairingBarcode) {
//    //  After we scan the Unpairing barcode ScanFunc will be called, 
//    //  restart the scanner component so it is ready
//    //  to accept a different Bluetooth Scanner
//    expectingUnpairingBarcode = false;
//    Generic.InvokeMETAFunction('Scanner', 'Disabled');
//    Generic.InvokeMETAFunction('Scanner', 'Enabled:SCN2');
//    return;
//}

if (theEvent == 'BTScanAssociationBarcode') {
    scanningAssociationBarcode = true;
    //  Minimise PocketBrowser and Show the Association barcode for the user to scan
    Generic.InvokeMETAFunction('Application', 'minimize');
    Generic.LaunchProcessNonBlocking('\\Windows\\Display_BD_Address.exe', '');
}
else if (theEvent == 'BluetoothConnected') {
    //  Check to see if we are scanning the association barcode, if we are then return user control to PocketBrowser
    if (scanningAssociationBarcode) {
        //  The Association barcode is currently shown
        scanningAssociationBarcode = false;
        Generic.InvokeMETAFunction('Application', 'restore');
    }
    message.innerHTML = "Bluetooth Scanner Connected";
}
else if (theEvent == 'BluetoothDisconnected') {
    message.innerHTML = "Bluetooth Disconnected, Please Reconnect";
}
else if (theEvent == 'Decode') 
{
        ODAXForm.Source.value = "";
        ODAXForm.Source.value = source;  
        ODAXForm.ActualResult.value = data;
        if (ODAXForm.ExpectedResult.value == data) {
        //for actual result update in xml
        var QueryString = 'UPDATE \'\\application\\SCANNER.xml\' SET ActualRes=';
        QueryString += '\'' + fieldValue + '\'';
        QueryString += ' WHERE TestID=\'';
        QueryString += conditionField + "\';"
        //alert(QueryString);
        var count = ax.Execute(QueryString, 0, ',', false);
        //alert("Record is Updated: " + count); 


        //for result update in xml

        var QueryString = 'UPDATE \'\\application\\SCANNER.xml\' SET Result=';
        QueryString += '\'' + fieldValue1 + '\'';
        QueryString += ' WHERE TestID=\'';
        QueryString += conditionField + "\';"
        //alert(QueryString);
        var count = ax.Execute(QueryString, 0, ',', false);
        //alert("Record is Updated: " + count);


        //For going to next record
            //ODAXForm.ActualResult.value = "";

        //var Temp = "TestID" + ODAXForm.testID.value + "Expected Result" + ODAXForm.ExpectedResult.value + "Actual Result" + data + "Result:Pass";

//            var bRetVal = Generic.Log("Amit Kumar Khandelwal abndbnmbdnfnkfnnfsmf successfully", 1);
//            alert(bRetVal);

        x = x + 1;
        GetColumnData();
        doTest(2);
    }
    else 
    {
       show();
    }
  }
  
      
}
//
function hide()
{
    document.getElementById('Retry').style.visibility = "hidden";
    document.getElementById('Fail').style.visibility = "hidden";
    //document.getElementById('NA').style.visibility = "hidden";
    document.getElementById('Run').style.visibility = "hidden";
}


//
function show()
{
    document.getElementById('Retry').style.visibility = "visible";
    document.getElementById('Fail').style.visibility = "visible";
    //document.getElementById('NA').style.visibility = "visible";
}
</script>
</head>
<body BGCOLOR="#FFFFEA" TEXT="#0000A0" LINK="#FF0000" VLINK="#808080" ALINK="#008040" onload="setEnumScannerTimer();">
User Message A: <DIV ID="message"> </DIV>
<form name="ODAXForm" id="ODAXForm" action="">
<table width="75%">
<tr>
<td colspan=2>
<select name="myscanner" id="myscanner" onChange="selectScanner();">
<OPTION value="" >Select Scanner</OPTION> 
</select></td>
</tr>
<tr>
<td><INPUT TYPE="button" VALUE="Run" name="Run" id="Run" ONCLICK="mydropdown_creation();"></td>
<td><INPUT TYPE="button" VALUE="SCAN" ONCLICK="doTest(1);"></td>
</tr>
<tr>
<td colspan=2>
    <select name="mydropdown" id="mydropdown" onChange="disp_text();">
    </select>
</td>
</tr>
<tr>
<td><font size=1>TestID:</font></td><td><INPUT TYPE=TEXT id="testID" NAME="testID" length=8></td>
</tr>
<tr>
<td><font size=1>Params Details:</font></td><td><TEXTAREA NAME="Barcode" id="Barcode" COLS=15 ROWS=2></TEXTAREA></td>
</tr>
<tr>
<td><font size=1>ExpectedResult:</font></td><td><INPUT TYPE=TEXT  NAME="ExpectedResult" id="ExpectedResult" length=10></td>
</tr>
<tr>
<td><font size=1>ActualResult:</font></td><td><INPUT TYPE=TEXT NAME="ActualResult" id="ActualResult" length=10></td>
</tr>
<tr>
<td><font size=1>Source:</font></td><td><INPUT TYPE=TEXT NAME="Source" id="Source" length=10></td>
</tr>
<tr>
<td colspan=2>
<Table border="1">
<tr>
    <td align="center" colspan="4">
        <INPUT TYPE="button" VALUE="Skip" ONCLICK="doTest(3);">
	</td>
    <td align="center" colspan="4">
        <INPUT TYPE="BUTTON" id="Retry" VALUE="Retry" OnClick="DoNotUpdate();">
	</td>
	<td align="center" colspan="4">
		<INPUT TYPE="BUTTON" id="Fail" VALUE="Fail" OnClick="DoUpdate('Fail');">
	</td>
    <td align="center" colspan="4">
		<INPUT TYPE="BUTTON" id="NA" VALUE="NA" OnClick="DoUpdate('NA');">
	</td>
</tr>
</Table>
</td>
</tr>
<tr>
<td colspan=2>
<Table border="1">
<tr>
    <td align="center" colspan="4">
        <INPUT TYPE="button" VALUE="Manual Pass" ID="Manual Pass" ONCLICK="manualDoUpdate();">
	</td>
<td> <INPUT TYPE="button" VALUE="Disable" ID="Button1" ONCLICK="doTest(2);"></td></tr>
</Table>
</td>
</tr>
</table>
</form>
</body>
</html>
