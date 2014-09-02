<%@ Language=VBScript %>
<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

    <title>Untitled Page</title>

 <script language="javascript" type="text/javascript">
function getFromSearch() {
    var x = 0
    
    mySearch = location.search.substr(1).split("&")

    var val1 = mySearch[0];
    var val2 = mySearch[1];
    var val3 = mySearch[2];
    
//    alert(val1);
//    alert(val2);
    
    val4 = val1.split("=");
    val5 = val2.split("=");
    val6 = val3.split("=");
    
//    alert(val3[1]);
//    alert(val4[1]);
    
    document.frm22.data.value = val4[1];
    document.frm22.data2.value = val5[1];
    document.frm22.data3.value = val6[1];
    
    document.frm22.hid2.value = "hid2";
//    alert("data: " + document.frm22.data.value);
//    alert("data2: " + document.frm22.data2.value);
    //}
    alert("data3: " + document.frm22.data3.value);
    setEnumScannerTimer();
}

function setEnumScannerTimer()
{
    //setTimeout(goBack(), 5000);
    document.frm22.submit();
}

function goBack()
{
//alert("Hello");
//location.href = "http://157.235.188.212/pb3.x/scanner/ScanTest.asp";
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
<!--<script language=javascript type="text/javascript">
alert("in");
</script>-->
<body onload="goBack();">
<%
        sET oConn = server.createobject("PBScan.clsDbAccess")
		set rrp = server.CreateObject("ADODB.Recordset")
		'oConn.fnSQL_RS("Select * FROM ScannerTestCases")
		dim ActualRes
		ActualRes = Request.Form("data2")
		dim TestID
		TestID = Request.Form("data")
		
		%>
<!--<script language=javascript type="text/javascript">
alert("<%=Request.Form("hid2")%>");
alert("<%=Request.Form("data2")%>");
alert("<%=Request.Form("data")%>");
</script>-->
		<%
		'dim SQL = "UPDATE ScannerTestCases SET ActualRes='" & ActualRes & "', Result ='Pass' WHERE TestID='" & TestID & "'"
		dim SQL
		SQL = "UPDATE ScannerTestCases SET ActualRes='" & ActualRes & "', Result ='Pass' WHERE TestID='" & TestID & "'"
		%>
<!--<script language=javascript type="text/javascript">
alert("<%=SQL%>");
</script>-->
		<%
		oConn.fnExecute(SQL)
%>
<a href=ScanTest.asp>Go Back</a>
<!--<script language=javascript type="text/javascript">
location.href = "http://157.235.188.212/pb3.x/scanner/ScanTest.asp?field=move&";
</script>-->
<form name="frm23" id="frm23" action="ScanTest.asp" method=post>
<input type=hidden id="process1" name="process1" value="">
<input type=hidden id="hid3" name="hid3" value="<%=Request.Form("data3")%>" />
</form>

</body>

<%else%>

<!--<script language=javascript>
alert("out");
</script>-->
<body onload="getFromSearch();">
<div id="myDiv"></div>
<form name="frm22" id="frm22" action="process.asp" method=post>
<input type=text id="data" name="data" value="">
<input type=text id="data2" name="data2" value="">
<input type=text id="data3" name="data3" value="">

<input type=hidden id="hid2" name="hid2" value="">

</form>
</body>
<%end if%>

</html>
