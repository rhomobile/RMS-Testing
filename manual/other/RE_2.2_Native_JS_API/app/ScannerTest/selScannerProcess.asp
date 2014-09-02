<%@ Language="VBScript" %>
<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Signal Navigate</title>
<script language=javascript>
function reLocate(){
//window.location.href="/symbolInventory/mcdinventory.asp"
//document.frmSelectScanner.process1.value="movenext";
document.frmSelectScanner.submit();
}
</script>
</head>
<body onload="ID=window.setTimeout('reLocate();',2000);">
<%
dim myscanner
dim tableName

myscanner = Request.Form("myscanner")
tableName = Request.Form("deviceName")
Set oConn = server.createobject("PBScan.clsDbAccess")
'SQL = "UPDATE ScannerTestCases SET ActualRes='" & ActualRes & "', Result ='" + Res + "' WHERE TestID='" & TestID & "'"
SQL = "CREATE TABLE " & tableName & " (ID autoincrement, TestID TEXT (50), ExpectedResult Memo, ActualResult Memo, Result TEXT (50), CONSTRAINT id_pk PRIMARY KEY(ID));"
'SQL = "CREATE TABLE roel (id autoincrement, email TEXT(155), gevalideerd TEXT(10), inlogCount INT, lastLogin DATETIME,CONSTRAINT id_pk PRIMARY KEY(id));"
%>
<!--<script language=javascript>
    alert("<%=SQL%>");
</script>-->

<%
oConn.fnExecute(SQL)
set oConn = nothing
%>
<form name="frmSelectScanner" id="frmSelectScanner" method=post action="ScanTest.asp">
    <input type=hidden id="myscanner" name="myscanner" value="<%=myscanner%>" />
    <input type=hidden id="deviceName" name="deviceName" value="<%=tableName%>" />
</form>
</body>
<%Response.Flush%>

</html>
     