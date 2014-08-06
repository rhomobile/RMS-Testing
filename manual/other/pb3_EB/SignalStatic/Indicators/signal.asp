<%@ Language="JavaScript" %>
<html>
<head><script type="text/javascript" src="http://192.168.6.18/NEON/src/elements.js"></script>
<title>Signal Navigate</title>
</head>
<body>
<%
//data.innerHTML = "Data = " + Request.QueryString("Data");
//source.innerHTML = "Source = " + Request.QueryString("Source");
//type.innerHTML = "Type = " + Request.QueryString("Type");
//time.innerHTML = "Time = " + Request.QueryString("Time");
//length.innerHTML = "Length = " + Request.QueryString("Length");
%>
<h2>Signal Navigate</h2>
<p><br>Request method: GET</p>
<p>Signal percentage = <%=Request.QueryString("Signalpercentage")%></p>
<p>ESSID = <%=Request.QueryString("ESSID")%></p>
<p>MacAdd = <%=Request.QueryString("MacAdd")%></p>
<p>Adapter = <%=Request.QueryString("Adapter")%></p>
<p>DHCPServ = <%=Request.QueryString("DHCPServ")%></p>
<p>DHCPStatic = <%=Request.QueryString("Mode")%></p>
<p>Gateway = <%=Request.QueryString("Gateway")%></p>
<p>IPAddress = <%=Request.QueryString("IPAddress")%></p>
<p>RSSI = <%=Request.QueryString("RSSI")%></p>
<p>Subnet = <%=Request.QueryString("Subnet")%></p>
<p>Wins = <%=Request.QueryString("Wins")%></p>
<P><BR><INPUT TYPE="button" VALUE="Back" ONCLICK="location.href='./Indicators.html'"></P>
</body>
</html>