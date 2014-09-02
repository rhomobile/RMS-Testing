<?php
$q=$_GET["q"];

$con = mysql_connect('ZIN5201MCDTNV', 'administrator', 'ImagerAutomation');
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("test", $con);

$sql="SELECT * FROM emp WHERE id = '".$q."'";

$result = mysql_query($sql);

echo "<table border='1'>
<tr>
<th>Firstname</th>
<th>Lastname</th>
</tr>";

while($row = mysql_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['FName'] . "</td>";
  echo "<td>" . $row['LName'] . "</td>";
  echo "</tr>";
  }
echo "</table>";

mysql_close($con);
?> 