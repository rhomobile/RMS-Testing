<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/
xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>And they're off...</title>
<script type="text/javascript">
    var gPageStartTime = (new Date( )).getTime( );

</script>
<body>
<?php include ("dropshadow.html"); ?>
</body>
<script type="text/javascript">
	window.onload = function ( )
{
    var pageEndTime = (new Date( )).getTime( );
    var pageLoadTime = (pageEndTime - gPageStartTime)/1000;
    alert("Page Load Time: " + pageLoadTime);
}
</script>
</html>