<?php
$imagedata = file_get_contents("testimg.png");
$imagedata1 = file_get_contents("testimg1.jpg");
             // alternatively specify an URL, if PHP settings allow
$base64 = base64_encode($imagedata);
$imgBase64 = base64_encode($imagedata1);

//$data = "data:image/png;base64,$base64";
$data = "data:image/png;base64,$imgBase64";

?>
<html>

<script type="text/javascript">
if(typeof(Storage)!=="undefined"){
document.writeln("<br/><br/> Available localStorage is "+localStorage.length);
}
//var image = '<?php echo $data;?>';
(function(){
localStorage.setItem('desktop','<?php echo $data;?>');
})();
</script>
</script>
<body>
<br/>
<input type="button" value="Change Image" onclick="javascript: FirstPic(); return false;" />
<br/>
<img src="<?php ?>" id="pic1">


<br/>
<input type="button" value="Clear All localStorage Object" onclick="javascript: localStorage.clear(); return false;" />
<br/>
</body>
<script type="text/javascript">
function FirstPic()
{
    var pic1 = document.getElementById("pic1"); 
    if (pic1 == typeof('undefined')) return;
    pic1.src = localStorage.getItem('desktop');
}
</script>
<br/>
<input type="button" value="Get Key of localStorage Object" onclick="javascript: getKeyLocalStorage(); return false;" />
<script type="text/javascript">
var getKeyLocalStorage = function (){
	for(i=0;i<localStorage.length;i++){
		document.writeln("<br/> Local Storage Key "+i+" is:"+ localStorage.key(i)+"<br/>");
	}
}
</script>
<br/>
</html>