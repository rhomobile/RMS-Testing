<%@ Page Language="C#"%>

<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Query Strings in ASP.NET: Page 2</title>
<script language="C#" runat="server">
</script>
</head>
<body>
<%
// retrieves query string values
string name = Request.QueryString["name"];
string role = Request.QueryString["role"];

Page.Response.Write("<h1>Name: "+name+", Role: "+role+"</h1>");
%>
</body>
</html>

