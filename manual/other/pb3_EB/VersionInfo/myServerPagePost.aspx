<%@ Page Language="C#"%>

<html>
<head><script type="text/javascript" src="http://192.168.6.18/NEON/src/elements.js"></script>
<title>Query Strings in ASP.NET: Page 2</title>
<script language="C#" runat="server">
</script>
</head>
<body>
<%
// retrieves query string values
    string name = Request.Form["name"];
    string role = Request.Form["role"];

Page.Response.Write("<h1>Name: "+name+", Role: "+role+"</h1>");
%>
</body>
</html>

