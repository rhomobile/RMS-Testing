<%@ Language=VBScript %>
<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>PB 3.0 Scanner Test</title>
   <!--<META HTTP-Equiv="scanner" Content="enabled">-->
<!--   <META HTTP-Equiv="scanner" Content="DecodeEvent:url('javascript:doScan('%s', '%s', '%s', '%s', '%s','%s');')">-->
   <META HTTP-Equiv="scanner" Content="DecodeEvent:url('javascript:doScan('%s', '%s', '%s', '%s', '%s', '%s');')">
   
    <!--<META HTTP-Equiv="Scanner" Content="EnumScannerEvent:url('Javascript:EnumScanners(%s);')">-->
    <META HTTP-Equiv="quitbutton" Content="visibility:visible">
    

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

function ascii_value (c)
{
	// restrict input to a single character
	c = c.charAt (0);

	// loop through all possible ASCII values
	var i;
	for (i = 0; i < 256; ++ i)
	{
		// convert i into a 2-digit hex string
		var h = i.toString (16);
		if (h.length == 1)
			h = "0" + h;

		// insert a % character into the string
		h = "%" + h;

		// determine the character represented by the escape code
		h = unescape (h);

		// if the characters match, we've found the ASCII value
		if (h == c)
			break;
	}
	return i;
}

function getChars(str)
{
    var i = 0;
    var newStr = "";
    //alert("Data Lenght: " + str.length);
    for(i = 0;i < str.length; i++)
    {
    //alert("Inside: " + c);
        var c = str.charAt(i);
        //alert(c);
        var p = ascii_value(c);
        //alert(p);
        if(p == 29)
        {
            //alert("inside if");
            newStr = newStr + encodeURI(c);
        }
        else if(p == 13)
        {
            //alert("inside if2");
            newStr = newStr + encodeURI(c);
        }
        else if(p == 10)
        {
            //alert("inside if2");
            newStr = newStr + encodeURI(c);
        }
        else
        {
            //alert("inside else");
            newStr = newStr + c;
        }
        //alert("newStr is : " + newStr);
    }
    return newStr;
    //alert("Value of i is: " + i);
}

function changeHidValue()
{
    //alert("1");
    ODAXForm.hid1.value="run";
    var x = ODAXForm.hid1.value;
    //alert(x);
    ODAXForm.submit();
}



//function doScan(data, source, type, time, length,theEvent)
//   {
//      
//message.innerHTML="Data"+data;
//}




function doScan(data, source, type, time, length,theEvent)
   {
      
var fieldValue = data;
var conditionField = ODAXForm.testID.value;
var fieldValue1="Pass";
var fieldValue2 = "Fail";
var TestCaseID = ODAXForm.testID.value;

if (theEvent == 'BTScanAssociationBarcode') {
    scanningAssociationBarcode = true;
    //  Minimise PocketBrowser and Show the Association barcode for the user to scan
//    generic.InvokeMETAFunction('Application', 'minimize');
//    generic.LaunchProcessNonBlocking('\\Windows\\Display_BD_Address.exe', '');
}
else if (theEvent == 'BluetoothConnected') {
    //  Check to see if we are scanning the association barcode, if we are then return user control to PocketBrowser
    if (scanningAssociationBarcode) {
        //  The Association barcode is currently shown
//        scanningAssociationBarcode = false;
//        generic.InvokeMETAFunction('Application', 'restore');
    }
    message.innerHTML = "Bluetooth Scanner Connected";
}
else if (theEvent == 'BluetoothDisconnected') {
    message.innerHTML = "Bluetooth Disconnected, Please Reconnect";
}
else if (theEvent == 'Decode') 
{
        //message.innerHTML="Data1"+data;
        ODAXForm.Source.value = "";
        ODAXForm.Source.value = source;  
        
        //alert("Expected Data is:\n" + ODAXForm.ExpectedResult.value);       
        //message.innerHTML="Data1"+data;
        var newExData = getChars(ODAXForm.ExpectedResult.value);
        //message.innerHTML="Data2"+data;
        ODAXForm.ExpectedResult.value = newExData;
        
        
        //alert("newExData is:\n" + newData);
        
        //alert("Data2 is:\n" + data);
        
        var newData = getChars(data);
        
        //alert("newData is:\n" + newData);
        
        //var encodetxt=encodeURI(data)
        
        ODAXForm.ActualResult.value = newData;
        
        //getChars(data);
        
        //alert("Decode Data:\n" + data);
        //alert("Encoded Data:\n" + encodetxt);
        
       if (ODAXForm.ExpectedResult.value == newData) {
//            "<%
//            sET oConn = server.createobject("PBScan.clsDbAccess")
//		    set rrp = server.CreateObject("ADODB.Recordset")
//		    set rrp = oConn.fnSQL_RS("UPDATE ScannerTestCases SET ActualResult='231231231' WHERE TestID='VT056-0017'")
//            %>"
            location.href = "http://10.233.85.82/pb3.x/scanner/ScannerTest/ScanProcess.asp?TestID=" + ODAXForm.testID.value + "&Actual=" +  newData + "&NextTC=" + ODAXForm.nextTC.value + "&Result=Pass&selScanner=" + ODAXForm.selScanner.value + "&deviceName=" + ODAXForm.deviceName.value + "&";
        }
        else 
        {
            //alert("Decoded Data does not match with the Expected Data!\nPlease try Scanning again or mark the test case as Fail!");
            document.getElementById('Retry').style.visibility = "visible";
            document.getElementById('Fail').style.visibility = "visible";
        }
  }
}

function markFail()
{
    //ODAXForm.Fail.style.visibility = hidden;
    document.getElementById('Fail').style.visibility = "hidden";
    //alert("hello");
    var ActVal;
    if(ODAXForm.ActualResult.value == "")
    {
        ActVal = "No Barcode Data. TC Failed by User.";
    }
    else
    {
        ActVal = ODAXForm.ActualResult.value;
    }
    var encodetxt=encodeURI(ActVal)
    //alert(ActVal);
    ActVal = escape(ActVal);
    //alert(ActVal);
    var str = "http://10.233.85.82/pb3.x/scanner/ScannerTest/ScanProcess.asp?TestID=" + ODAXForm.testID.value + "&Actual=" +  encodetxt + "&NextTC=" + ODAXForm.nextTC.value + "&Result=Fail&selScanner=" + ODAXForm.selScanner.value + "&deviceName=" + ODAXForm.deviceName.value + "&";
    //alert(str);
    location.href = "http://10.233.85.82/pb3.x/scanner/ScannerTest/ScanProcess.asp?TestID=" + ODAXForm.testID.value + "&Actual=" +  encodetxt + "&NextTC=" + ODAXForm.nextTC.value + "&Result=Fail&selScanner=" + ODAXForm.selScanner.value + "&deviceName=" + ODAXForm.deviceName.value + "&";
    //alert("TestID: "  + ODAXForm.testID.value + "\nActual=" +  ODAXForm.ActualResult.value + "\nNextTC=" + ODAXForm.nextTC.value + "\nResult=Fail");
}

function skipTC()
{
    //ODAXForm.Skip.style.visibility = hidden;
    document.getElementById('Skip').style.visibility = "hidden";
    location.href = "http://10.233.85.82/pb3.x/scanner/ScannerTest/ScanProcess.asp?TestID=" + ODAXForm.testID.value + "&Actual=Test Case Skipped by User" + "&NextTC=" + ODAXForm.nextTC.value + "&Result=NT&selScanner=" + ODAXForm.selScanner.value + "&deviceName=" + ODAXForm.deviceName.value + "&";
}

function markNA()
{
    //ODAXForm.NA.style.visibility = hidden;
    document.getElementById('NA').style.visibility = "hidden";
    location.href = "http://10.233.85.82/pb3.x/scanner/ScannerTest/ScanProcess.asp?TestID=" + ODAXForm.testID.value + "&Actual=Test Case Marked as Indeterminate by User" + "&NextTC=" + ODAXForm.nextTC.value + "&Result=Indeterminate&selScanner=" + ODAXForm.selScanner.value + "&deviceName=" + ODAXForm.deviceName.value + "&";
}


function move()
{
    //style="visibility:hidden"
    //ODAXForm.Pass.style.visibility = hidden;
    document.getElementById('Pass').style.visibility = "hidden";
    location.href = "http://10.233.85.82/pb3.x/scanner/ScannerTest/ScanProcess.asp?TestID=" + ODAXForm.testID.value + "&Actual=Barcode Not Scanned.Manually marked as Pass by User." + "&NextTC=" + ODAXForm.nextTC.value + "&Result=Pass&selScanner=" + ODAXForm.selScanner.value + "&deviceName=" + ODAXForm.deviceName.value + "&";
}


function doTest(sw)
{
    var i=0;
	if(sw == 1)
	  {
                //scanner@all_decoders:disabled;disabled;start
                setDefaultparams();
                var parameters_array = Params.split("@");
                var len = parameters_array[1].length;
                var indx = parameters_array[1].lastIndexOf(";");
                var str1= parameters_array[1].substring(0,indx);
                var str2 = parameters_array[1].substring(indx, len);
                var finalstr = str1 + ":"+selected_scanner + str2;
                message.innerHTML=parameters_array[0]+"amit"+finalstr;
                var bRetVal = generic.InvokeMETAFunction(parameters_array[0],finalstr);

      }
	else
        if(sw==2)
	      {
		    generic.InvokeMETAFunction('scanner', 'disabled');
		    generic.InvokeMETAFunction('scanner', 'stop');
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
    generic.InvokeMETAFunction('scanner', x);
    x='upce0ConvertToupca:false;upce0preamble:none;upce0ReportCheckDigit:false'
    generic.InvokeMETAFunction('scanner',x);
    x='upce1ConvertToupca:false;upce1preamble:none;upce1ReportCheckDigit:false'
    generic.InvokeMETAFunction('scanner',x);
    x='upcapreamble:SYSTEM_CHAR;upcaReportCheckDigit:true'
    generic.InvokeMETAFunction('scanner',x);
    x='msicheckdigits:true;msiCheckDigitScheme:mod_11_10;msimaxlength:55;msiMinLength:4;msiRedundancy:true;msiReportCheckDigit:false'
    generic.InvokeMETAFunction('scanner',x);
    x='ean8ConvertToEAN13:false'
    generic.InvokeMETAFunction('scanner',x);
    x='CodabarCLSiEditing:false;Codabarnotisediting:false;Codabarredundancy:true;CodabarMinLength:6;Codabarmaxlength:55'
    generic.InvokeMETAFunction('scanner',x);
    x='Code39code32prefix:false;Code39ConvertToCode32:false;Code39fullascii:false;Code39MinLength:0;Code39maxlength:55;Code39Redundancy:false;Code39ReportCheckDigit:false;Code39VerifyCheckDigit:false'
    generic.InvokeMETAFunction('scanner',x);
    x='d2of5maxlength:14;d2of5MinLength:0;d2of5Redundancy:true'
    generic.InvokeMETAFunction('scanner',x);
    x='i2of5ConvertToEAN13:false;i2of5MinLength:14;i2of5maxlength:10;i2of5Redundancy:true;i2of5ReportCheckDigit:false;i2of5VerifyCheckDigit:none'
    generic.InvokeMETAFunction('scanner',x);
    x='Code11CheckDigitCount:one;Code11Redundancy:true;Code11ReportCheckDigit:false'
    generic.InvokeMETAFunction('scanner',x);
    x='Code93maxlength:55;Code93MinLength:0;Code93Redundancy:false'
    generic.InvokeMETAFunction('scanner',x);
    x='code128ean128:true;Code128maxlength:55;Code128MinLength:0;code128other128:true;Code128Redundancy:false;code128isbt128:true'
    generic.InvokeMETAFunction('scanner',x);
    
}

function runTC()
{
    this.document.frmNew.process1.value="movenext";
    this.document.frmNew.submit();
}
</script>
</head>

<body BGCOLOR="#FFFFEA" TEXT="#0000A0" LINK="#FF0000" VLINK="#808080" ALINK="#008040">

<%

        sET oConn = server.createobject("PBScan.clsDbAccess")
		set rrp = server.CreateObject("ADODB.Recordset")
		set ors = server.CreateObject("ADODB.Recordset")
		
		if(Request.Form("process1") = "movenext") then
		    dim tcID
		    tcID = Request.Form("NextTCID")%>
<!--		    <script language=javascript>
                alert("<%=tcID %>");
            </script>-->
            <%
            set ors = oConn.fnSQL_RS("Select * FROM ScannerTestCases WHERE TestID='" + tcID + "'")
            set rrp = oConn.fnSQL_RS("Select * FROM ScannerTestCases ORDER BY TestID ASC")
            'set rrp = oConn.fnSQL_RS("Select * FROM ScannerTestCases WHERE TestID='" + tcID + "'")
        'END IF
        else
		    set rrp = oConn.fnSQL_RS("Select * FROM ScannerTestCases ORDER BY TestID ASC")
		end if
		'set ors = oConn.fnSQL_RS("Select * FROM ScannerTestCases WHERE TestID='" + tcID + "'")
		%>

User Message A: <DIV ID="message"> </DIV>
<form name="ODAXForm" id="ODAXForm" action="ScanTest.asp" method=post>
<table width="75%">
<!--<tr>
<td colspan=2>
<select name="myscanner" id="myscanner" onChange="">
<OPTION value="" >Select Scanner</OPTION> 
</select></td>
</tr>-->
<!--<tr>
<td><INPUT TYPE="button" VALUE="Run" name="Run" id="Run" ONCLICK="changeHidValue();"><input type=hidden name="hid1" id="hid1"></td>
<td><INPUT TYPE="button" VALUE="SCAN" ONCLICK=""></td>
</tr>-->
<!--<tr>
<td colspan=2>
    <select name="mydropdown" id="mydropdown" onChange="">
    <%
        
			do until rrp.EOF
			    %>
			    <option value="<%=rrp("TestID")%>"><%=rrp("TestID")%></option>
			    <%
			    rrp.MoveNext
			loop
			
        rrp.MoveFirst
%>
    </select>
</td>
</tr>-->
<tr>
<td><font size=1>TestID:</font></td><td><INPUT TYPE=TEXT id="testID" NAME="testID" length=8></td>
</tr>
<tr>
<td><font size=1>Params Details:</font></td><td><TEXTAREA NAME="Barcode" id="Barcode" COLS=15 ROWS=2></TEXTAREA></td>
</tr>
<!--<tr>
<td><font size=1>ExpectedResult:</font></td><td><INPUT TYPE=TEXT  NAME="ExpectedResult" id="ExpectedResult" length=10></td>
</tr>-->
<tr>
<td><font size=1>ExpectedResult:</font></td><td><TEXTAREA NAME="ExpectedResult" id="ExpectedResult" COLS=15 ROWS=2></TEXTAREA></td>
</tr>
<!--<tr>
<td><font size=1>ActualResult:</font></td><td><INPUT TYPE=TEXT NAME="ActualResult" id="ActualResult" length=10></td>
</tr>-->
<tr>
<td><font size=1>ActualResult:</font></td><td><TEXTAREA NAME="ActualResult" id="ActualResult" COLS=15 ROWS=2></TEXTAREA></td>
</tr>
<tr>
<td><font size=1>Source:</font></td><td><INPUT TYPE=TEXT NAME="Source" id="Source" length=10></td>
<input type=hidden name="nextTC" id="nextTC" value="" />
<input type=hidden name="selScanner" id="selScanner" value="<%=Request.Form("myscanner")%>" />
<input type=hidden name="deviceName" id="deviceName" value="<%=Request.Form("deviceName")%>" />
</tr>
<tr>
<td colspan=2>
<Table border="1">
<tr>
    <td align="center" colspan="4">
        <INPUT TYPE="button" VALUE="Pass" ID="Pass" name="Pass" ONCLICK="move();">
	</td>
    <td align="center" colspan="4">
        <INPUT TYPE="button" VALUE="Skip" name="Skip" id="Skip" ONCLICK="skipTC();">
	</td>
    <td align="center" colspan="4">
        <INPUT TYPE="BUTTON" id="Retry" name="Retry" VALUE="Retry" OnClick="" style="visibility:hidden">
	</td>
	<td align="center" colspan="4">
		<INPUT TYPE="BUTTON" id="Fail" name="Fail" VALUE="Fail" OnClick="markFail();">
	</td>
    <td align="center" colspan="4">
		<INPUT TYPE="BUTTON" id="NA" name="NA" VALUE="NA" OnClick="markNA();">
	</td>
</tr>
</Table>
</td>
</tr>
<tr>

<tr>
    
<td> <INPUT TYPE="button" VALUE="Disable" ID="Disable" ONCLICK=""></td></tr>

</table>
<%
if(Request.Form("process1") = "movenext") then
if(ors.EOF) then%>
<!--<script language=javascript>
                alert("ORS EOF");
</script>-->

<%else


%>
<!--<script language=javascript>
                alert("<%=strValue %>");
</script>-->
<%end if
%>
<!--<script language=javascript>
    alert("MoveNext");
</script>-->
<script language=javascript type="text/javascript">
//alert("<%=rrp("TestID")%>");
// alert("<%=strValue%>");

            this.document.ODAXForm.testID.value = "<%=ors("TestID")%>";
            this.document.ODAXForm.Barcode.value = "<%=ors("Params")%>";
            this.document.ODAXForm.ExpectedResult.value = "<%=ors("ExpectedRes")%>";
            var selected_scanner = this.document.ODAXForm.selScanner.value;
            
                   

                var bRetVal = generic.InvokeMETAFunction('Scanner','disabled');
                
                setDefaultparams();
//                var str2 = "SCN1:";
                var str2;
                var Params = "<%=ors("Params")%>";
                //alert("1:" + Params);
                var parameters_array = Params.split("@");
                //alert("2:" + parameters_array);
                var len = parameters_array[1].length;
                //alert("3:" + len);
                var indx = parameters_array[1].lastIndexOf(";");
                //alert("4:" + indx);
                var str1= parameters_array[1].substring(0,indx);
                //alert("5:" + str1);
                var str2 = parameters_array[1].substring(indx, len);
                //alert("6:" + str2);
                var finalstr = str1 + ":"+ selected_scanner + str2;
                //alert("7:" + parameters_array[0]);
                //alert("8:" + finalstr);
                var bRetVal = generic.InvokeMETAFunction(parameters_array[0],finalstr);
                
</script>
  <%  'rrp.MoveNext
else
%>
<!--<script language=javascript>
    alert("MoveFirst");
</script>-->
  <% 
    rrp.MoveFirst%>
    <script language=javascript type="text/javascript">
//alert("<%=rrp("TestID")%>");
this.document.ODAXForm.testID.value = "<%=rrp("TestID")%>";
this.document.ODAXForm.Barcode.value = "<%=rrp("Params")%>";
this.document.ODAXForm.ExpectedResult.value = "<%=rrp("ExpectedRes")%>";
var selected_scanner = this.document.ODAXForm.selScanner.value;

                var bRetVal = generic.InvokeMETAFunction('Scanner','disabled');
                
                setDefaultparams();
//                var str2 = "SCN1:";
                var str2;
                var Params = "<%=rrp("Params")%>";
                //alert("1:" + Params);
                var parameters_array = Params.split("@");
                //alert("2:" + parameters_array);
                var len = parameters_array[1].length;
                //alert("3:" + len);
                var indx = parameters_array[1].lastIndexOf(";");
                //alert("4:" + indx);
                var str1= parameters_array[1].substring(0,indx);
                //alert("5:" + str1);
                var str2 = parameters_array[1].substring(indx, len);
                //alert("6:" + str2);
                var finalstr =  str1 + ":"+ selected_scanner + str2;
                //alert("7:" + parameters_array[0]);
                //alert("8:" + finalstr);
                var bRetVal = generic.InvokeMETAFunction(parameters_array[0],finalstr);
                
</script>
<%end if
%>

<%
'rrp.MoveNext
'this.document.ODAXForm.testID.value

        do until rrp.EOF
			    if(Request.Form("process1") = "movenext") then
			        
			        if(rrp("TestID") = ors("TestID")) then
			            rrp.MoveNext
    			        
			        %>
			        <script language=javascript type="text/javascript">
                    this.document.ODAXForm.nextTC.value = "<%=rrp("TestID")%>";
                    </script>
			        <%
			        EXIT DO
			        end if
			    else
			  
			            rrp.MoveNext
    			        
			        %>
			        <script language=javascript type="text/javascript">
                    this.document.ODAXForm.nextTC.value = "<%=rrp("TestID")%>";
                    </script>
			        <%
			        EXIT DO
			        'end if
			    
			    end if
			    rrp.MoveNext
			loop

%>
<!--<script language=javascript type="text/javascript">
this.document.ODAXForm.nextTC.value = "<%=rrp("TestID")%>";
</script>-->
<%
rrp.Close
Set rrp = nothing %>
</form>

<form name="frmNew" id="frmNew" action="ScanTest.asp" method=post>
   <table border=1>
   <tr>
    <td>Enter TC Number:
    <input type=text name="NextTCID" id="NextTCID" value="VT056-0" />
    <input type=HIDDEN name="process1" id="process1" value="" />
    <input type=hidden name="myscanner" id="myscanner" value="<%=Request.Form("myscanner")%>" />
    <input type=hidden name="deviceName" id="Hidden1" value="<%=Request.Form("deviceName")%>" />
    </td>
    </tr>
    <tr>
    <td>
    <input type=button id="subTC" name="subTC" value="Run This TC" onclick="runTC();" />
    
    </td>
    </tr>
    </table>
</form>
</body>
</html>
