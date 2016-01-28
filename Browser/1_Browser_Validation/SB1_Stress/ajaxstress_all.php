<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="jquery.mobile-1.3.2.min.css">
<script src="jquery-1.8.3.min.js"></script>
<script src="jquery.mobile-1.3.2.min.js"></script>

</head>
<body>

<div data-role="page" id="pageone">

	<style type="text/css">
		#dialog {
            position: absolute;
            top: 25%;
            left: 25%;
            width: 50%;
            height: 50%;
            margin: 0px auto;
            border-radius: 12px;
            font-size: 25px;
            color: #FFF;
            font-family: Verdana, Sans-Serif;
            z-index: 5;
            border: 1px solid #333;
            background: rgba(0,0,0,0.85);
            box-shadow: 0px 0px 100px #000;
        }
        
        #dialog header {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom: 1px solid #333;
            text-align: center;
            padding: 10px;
        }		

        #ajax {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom: 1px solid #333;
            text-align: center;
			font-size: 16px;
            padding: 5px;
        }
		
        #network {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            text-align: center;
			color: #ffff00;
			font-size: 15px;
            padding: 5px;
        }
		#failure {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            text-align: left;
			color: #ffff00;
			font-size: 10px;
            padding: 5px;
        }

       .text {
            text-align: center;
			font-size: 12px;
            padding: 5px;
			color: #ff0000;
        }				
		
		
	</style>
	<script>
		$('#pageone').on( "pageshow", function( event, ui ) {
			var xmlhttp = new XMLHttpRequest();
			var id;
			var Time = new Date();
			var hours_8 = 10;
			function onReadStateChange()
			{
				//Document read
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					id++;
					document.getElementById("ajax").innerHTML = id;
					document.getElementById("network").innerHTML = xmlhttp.response;
					if(id==hours_8)
					{
						clearTimeout();
					}
					setTimeout(ajaxtest, 1000);
					
				}
				else
				{
					document.getElementById("failure").innerHTML= "Failed after "+id;
				}
			}
			
			var errorcount = 1;
			
			function ajaxtest () 
			{
				id = parseInt(document.getElementById("ajax").innerHTML);
				if (isNaN(id)) id = 0;
				xmlhttp.onreadystatechange=onReadStateChange;
				xmlhttp.open("GET","./page1_get.php?id=" + id,true);
				xmlhttp.send();
				
			}
			var timeout  = setTimeout(ajaxtest, 1000);
			function clearTimeout()
			{
				window.clearTimeout(timeout);
				delete timeout;
			}
		setTimeout(function() {
			document.location.hash = "#pagetwo"
		}, 10*1000+5000);
	  });
</script>
<br/><br/><br/>
	<div id="dialog">
	<header> AJAX Test </header>
	<div class="text">Ajax Count</div>
	<div id="ajax"></div>
	<div id="network"></div>
	<div id="failure"></div>
	</div>
</div> 

<div data-role="page" id="pagetwo">
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
	<script>
		$('#pagetwo').on( "pageshow", function( event, ui ) {
		var responseDiv;
			var http = new XMLHttpRequest();
			var url = "post.php";
			var hours_8 = 10;
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
				delete timeout;
			}

		setTimeout(function() {
		document.location.hash = "#pageone";
		}, 10*1000);
	  });
	</script>
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
</div> 



</body>
</html>