<?
$name=htmlspecialchars($_GET['name']);
$name=stripslashes($name);
$age=(int)$_GET['age'];
echo "<span style='color:red'>Welcome <b>$name</b> to JavaScript Kit. So you're <b>$age</b> years old eh?</span>";
?>