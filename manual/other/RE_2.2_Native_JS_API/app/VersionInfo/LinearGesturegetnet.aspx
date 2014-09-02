<%@ Page Language="C#" %>
<html>
<head>
<script type="text/javascript" src="/public/re1/elements.js"></script>

<title>Query Strings in ASP.NET: Page 1</title>
<script language="C#" runat="server">
void GetQrStr(object sender, EventArgs e)
{
// change the Response.Redirect parameter with your own location.
Page.Response.Redirect("GestureProcessgetnet.aspx?name=alma&role=user");
}
</script>
</head>
<body>
<form runat="server">
<asp:Button id="btn" onclick="GetQrStr" text="Test Query Strings" runat="server" />
</form>
</body>
</html>
