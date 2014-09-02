<%@ Language="VBScript" %>
<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Signal Navigate</title>
 <script language="javascript" type="text/javascript">
function getFromSearch()
{
    document.frm22.hid2.value = "hid2";
    setEnumScannerTimer();
}

function setEnumScannerTimer()
{
    document.frm22.submit();
}

function goBack()
{
    //document.frm23.process1.value="movenext";
    //window.setTimeout('reLocate();',3000);"
    
}
function reLocate(){
//window.location.href="/symbolInventory/mcdinventory.asp"
document.frm23.process1.value="movenext";
document.frm23.submit();
}
</script>
</head>
<%
dim x
x = Request.Form("hid2")
if(x = "hid2") then

%>
<!--<body onload="goBack();">-->
 <body onload="ID=window.setTimeout('reLocate();',5000);">
    <form name="frm23" id="frm23" action="ScanTest.asp" method=post>
    <input type=hidden id="process1" name="process1" value="">
    <input type=hidden id="NextTCID" name="NextTCID" value="<%=Request.Form("NextTC")%>" />
        <input type=hidden id="myscanner" name="myscanner" value="<%=Request.Form("myscanner") %>" />
        <input type=hidden id="deviceName" name="deviceName" value="<%=Request.Form("deviceName") %>" />
    </form>
		<DIV ID="splashScreen" STYLE="position:absolute;z-index:5;top:10%;left:20%;">
			<TABLE BGCOLOR="#000000" BORDER=1 BORDERCOLOR=white CELLPADDING=0 CELLSPACING=0 HEIGHT=50 WIDTH=150 align=center>
				<TR>
					<TD WIDTH="100%" HEIGHT="100%" BGCOLOR=white ALIGN="CENTER" VALIGN="MIDDLE">
						<BR><BR> &nbsp; &nbsp; 
						<FONT FACE="Helvetica,Verdana,Arial" SIZE=1 COLOR="#000066"><B>Saving Result!Please wait...</B></FONT> 
						&nbsp; &nbsp; <BR> 
						<IMG SRC="\ntimesheet\images\progresscylon.gif" BORDER=0 WIDTH=100 HEIGHT=10><BR><BR> 
					</TD>
				</TR>
			</TABLE>
		</DIV>
<%Response.Flush%>
</body>
<%
else
    Set oConn = server.createobject("PBScan.clsDbAccess")
    Set ors = server.CreateObject("ADODB.Recordset")
    Set rrs = server.CreateObject("ADODB.Recordset")
    
    dim SQL
    dim ActualRes
	ActualRes = Request.QueryString("Actual")
	dim TestID
	TestID = Request.QueryString("TestID")
	dim Res
	Res = Request.QueryString("Result")
	dim deviceName
	deviceName = Request.QueryString("deviceName")
	dim ExpectedRes
		%>
<!--<script language=javascript type="text/javascript">
        alert("<%=deviceName%>");
    </script>-->
	
	<%
	set ors = oConn.fnSQL_RS("Select * FROM ScannerTestCases WHERE TestID='" + TestID + "'")
	set rrs = oConn.fnSQL_RS("Select * FROM " & deviceName & " WHERE TestID='" + TestID + "'")
	
	ExpectedRes = ors("ExpectedRes")
	
    if(rrs.EOF) then
        SQL = "INSERT INTO " & deviceName & " (TestID, ExpectedResult, ActualResult, Result) VALUES('" & TestID & "','" & ExpectedRes & "','" & ActualRes & "','" & Res & "')"
    else
	    'SQL = "UPDATE ScannerTestCases SET ActualRes='" & ActualRes & "', Result ='" + Res + "' WHERE TestID='" & TestID & "'"
	    'SQL = "INSERT INTO " & deviceName & " (TestID, ActualResult, Result) VALUES('" & TestID & "','" & ActualRes & "','" & Res & "')"
	    SQL = "UPDATE " & deviceName & " SET ActualResult='" & ActualRes & "', Result='" & Res & "' WHERE TestID='" + TestID + "'"
	end if
	%>
<!--<script language=javascript type="text/javascript">
        alert("<%=SQL%>");
    </script>-->
	
	<%
	oConn.fnExecute(SQL)
	rrs.Close
	ors.Close
	'set rrp = nothing
	set oConn = nothing
%>

    <body  onload="getFromSearch();">
        <h5>Scanner Process</h5>
        <p>TestID = <%=Request.QueryString("TestID")%></p>
        <p>Actual = <%=Request.QueryString("Actual")%></p>
        <p>NextTC = <%=Request.QueryString("NextTC")%></p>
        <form name="frm22" id="frm22" action="ScanProcess.asp" method=post>
        <input type=text id="TestID" name="TestID" value="<%=Request.QueryString("TestID")%>">
        <input type=text id="Actual" name="Actual" value="<%=Request.QueryString("Actual")%>">
        <input type=text id="NextTC" name="NextTC" value="<%=Request.QueryString("NextTC")%>">
        <input type=text id="myscanner" name="myscanner" value="<%=Request.QueryString("selScanner") %>" />
        <input type=text id="deviceName" name="deviceName" value="<%=Request.QueryString("deviceName") %>" />
        <input type=hidden id="hid2" name="hid2" value="">
        </form>
    </body>
<%
end if
%>
</html>
     