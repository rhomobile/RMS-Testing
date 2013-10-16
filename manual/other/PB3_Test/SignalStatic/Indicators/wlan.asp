<!--<%@ Language="JavaScript" %>-->
<%@ Page Language="C#"%>
<html>
<head>
<title>wlan Navigate</title>
</head>
<body>
<%
//data.innerHTML = "Data = " + Request.QueryString("Data");
//source.innerHTML = "Source = " + Request.QueryString("Source");
//type.innerHTML = "Type = " + Request.QueryString("Type");
//time.innerHTML = "Time = " + Request.QueryString("Time");
//length.innerHTML = "Length = " + Request.QueryString("Length");
%>
<h2>wlan Navigate</h2>
<p><br>Request method: GET</p>
<p>wlan = <%=Request.QueryString("status")%></p>
</body>
</html>