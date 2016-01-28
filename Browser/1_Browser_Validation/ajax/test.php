<?php
$count = $_GET['cnt'];
$url = "CandA_Hidden1.php?cnt=$count";
?>
<html>
<script>
function timeMsg()
{
var t=setTimeout("alertMsg()",3000);
};
function alertMsg()
{
location.href= "<?php echo $url?>";
}

(function(){
timeMsg()
})();
function onQuit()
{
application.quit(); 
}
</script>
<body>
<input type=button value="Quit" onclick='onQuit()'> 
</body>
</html>