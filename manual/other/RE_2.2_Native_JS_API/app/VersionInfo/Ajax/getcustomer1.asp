<%
response.expires=-1
sql="Select * FROM ScannerTestCases WHERE TestID='" + request.querystring("q") + "'"
//sql="Select * FROM ScannerTestCases WHERE ID=" + request.querystring("q")
set conn=Server.CreateObject("ADODB.Connection")
conn.Provider="Microsoft.Jet.OLEDB.4.0"
conn.Open "c:/PB3.X/Ajax/ADB.mdb"
set rs=Server.CreateObject("ADODB.recordset")
rs.Open sql,conn
response.write("<table>")
do until rs.EOF
  for each x in rs.Fields
    response.write("<tr><td><b>" & x.name & "</b></td>")
    response.write("<td>" & x.value & "</td></tr>")
  next
  rs.MoveNext
loop
response.write("</table>")
%>