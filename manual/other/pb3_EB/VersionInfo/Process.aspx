<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<script runat="server">
  protected void Page_Load(object sender, EventArgs e)
  {
      using (SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["MyDbConn"].ToString()))
      {
          SqlCommand cmd = new SqlCommand("SELECT COUNT(*) FROM authors", cn);
          cn.Open();
          SqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
          rdr.Read();
          Response.Write(rdr[0].ToString()); //read a value
      }
  }
</script>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>SQL Authentication</title>
</head>
<body/>
</html>
