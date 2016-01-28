<?php
function random_string($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}

$string_2kb = random_string(2048);
$string_4kb = random_string(4096);
$string_8kb = random_string(8192);
$string_16kb = random_string(16384);
$string_32kb = random_string(32768);
$string_64kb = random_string(65536);
?>
<html>
<head>
	<script type="text/javascript" src="http://127.0.0.1:83/Application/www/sapp/src/asl.js"></script>
    <script>
		var responseDiv;
		var http = new XMLHttpRequest();
		var url = "post.php";
		var hours_8 = 60;
		var time=0;
		var id= ["kb2","kb4","kb8","kb16","kb32","kb64"];
		var i =0;
		function onReadStateChange()
		{
			if(http.readyState == 4 && http.status == 200) {
				responseDiv.innerHTML = parseInt(http.responseText)/1024+" KB Of Data Recieved";
				time++;
				if(time==hours_8)
				{
					clearTimeout();
				}
				if(i<id.length-1)
				{
					i=i+1;
				}
				else
				{
					i=0;
				}
				setTimeout(ajax_byte, 1000);
				
			}
			else
			{
			
				responseDiv.innerHTML = http.readyState + " - " + http.status + "<br>";
			}
			
		}
		function ajax_byte()
		{
			
			responseDiv = document.getElementById("divkb2");
			var bytevalue = document.getElementById(id[i]);
			document.getElementById("divkb1").innerHTML=parseInt(bytevalue.value.length)/1024+" KB Data sent";
			http.open("POST", url, true);
			var bigData = "data="+bytevalue.value;
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			http.onreadystatechange = onReadStateChange;
			
			http.send(bigData);	
		}
		
		setTimeout(ajax_byte, 1000);
		var timeout  = setTimeout(ajax_byte, 1000);
		function clearTimeout()
		{
			window.clearTimeout(timeout);
		}


	</script>
</head>
<body>
<input type="hidden" value="<?= $string_2kb?>" id="kb2" />
<input type="hidden" value="<?= $string_4kb?>" id="kb4" />
<input type="hidden" value="<?= $string_8kb?>" id="kb8" />
<input type="hidden" value="<?= $string_16kb?>" id="kb16" />
<input type="hidden" value="<?= $string_32kb?>" id="kb32" />
<input type="hidden" value="<?= $string_64kb?>" id="kb64" />
<h4>USING XMLHTTP OBJECT</h4>
<table border="1">
<tr>
<th>AJAX Request</th>
<th>Response</th>
</tr>
<tr>
<td><div id="divkb1"></div></td>
<td><div id="divkb2"></div></td>
</tr>
</table>
</body>
</html>