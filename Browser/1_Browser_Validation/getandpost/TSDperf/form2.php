<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<script type="text/javascript" src="src/asl.js"></script>
</head>
<body>


<form>
  First name: <input type="text" name="fname" value="<?php echo $_POST['fname']; ?>" /><br />
  Last name: <input type="text" name="lname" value="<?php echo $_POST['lname']; ?>" /><br />
  Core ID: <input type="text" name="cid" value="<?php echo $_POST['cid']; ?>" /><br />
  Business Unit: <input type="text" name="emc" value="<?php echo $_POST['emc']; ?>" /> <br />
  <?php echo "Its done!!";  ?>
</form>
<a href="form_server.html">back</a>
</body>
</html>
