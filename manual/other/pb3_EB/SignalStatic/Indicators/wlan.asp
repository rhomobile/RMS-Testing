<!--<%@ Language="JavaScript" %>-->
<%@ Page Language="C#"%>
<html>
<head><script type="text/javascript" src="http://192.168.6.18/NEON/src/elements.js"></script>
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