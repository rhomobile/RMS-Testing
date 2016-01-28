<?php

include('lock.php');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Welcome </title>
</head>

<body>
<h1>Welcome <?php echo $login_session; ?></h1> 
<h2><a href="http://9lessons.blogspot.com">9lessons.blogspot.com</a></h2>

<h2><a href="logout.php">Sign Out</a></h2>
</body>
</html>
