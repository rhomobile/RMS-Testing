<?php
if($_GET['set'] == 'yes'){
$value = 'This is the value for cookie nothing';
$value1 = 'This is the value for cookie with time 5 min';
$value2 = 'This is the value for cookie with time 1 hour';
setcookie("TestCookie1", $value);
setcookie("bhakta1", $value1, time()+300);  /* expire in 5min */
setcookie("bhakta2", $value1, time()+600);  /* expire in 10min */
setcookie("TestCookie3", $value2, time()+3600);  /* expire in 1 hour */
}
echo "<br/><br/><br/><pre>";
print_r($_COOKIE);
?>

<html>
<head>

<script type="text/javascript">
<!--

function saveIt(name) {
	var x = document.forms['cookieform'].cookievalue.value;
	displayResult (x);
	if (!x)
		displayResult ('Please fill in a value in the input box.');
	else {
		createCookie(name,x,7);
		displayResult ('Cookie created');
	}
}

function readIt(name) {
	displayResult ('The value of the cookie is ' + readCookie(name));
}

function eraseIt(name) {
	eraseCookie(name);
	displayResult ('Cookie erased');
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function get_cookies_array() {

    var cookies = { };

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;
   
}

// -->
</script>
<title>How to find out if a browser has cookie enabled with JavaScript</title>
<script language="JavaScript">
function getCookieStatus()
{
	var cookieStatus = document.getElementById("cookieStatus");

    if(navigator.cookieEnabled)
    {
		cookieStatus.innerHTML = "Cookies are enabled.";
    }
    else
    {
    cookieStatus.innerHTML = "Cookies have been disabled.";
    }

}
</script>

</head>
<body onload="javascript:getCookieStatus();">
<p><div id="result"></div><p>
<br/><br/><br/>
<span id="cookieStatus"></span>
<br/>
<form name="cookieform" action="#">
<p>
The value of the cookie should be <input name="cookievalue" />
</p>
</form>

<p><a href="javascript:saveIt('ppkcookie1')" >Create cookie 1</a><br />
<a href="javascript:readIt('ppkcookie1')" >Read cookie 1</a><br />
<a href="javascript:eraseIt('ppkcookie1')" >Erase cookie 1</a>.</p>

<p><a href="javascript:saveIt('ppkcookie2')" >Create cookie 2</a><br />
<a href="javascript:readIt('ppkcookie2')" >Read cookie 2</a><br />
<a href="javascript:eraseIt('ppkcookie2')" >Erase cookie 2</a>.</p>
<span id="cinfo"></span>
</body>
<script>
var cookies = get_cookies_array();
var cspan = document.getElementById("cinfo");
cspan.innerHTML = "";
for(var name in cookies) {
	preText = cspan.innerHTML;
	cspan.innerHTML=preText+"<br/>"+name + " : " + cookies[name] + "<br />";
}
var displayResult = function (x){
document.getElementById('result').innerHTML = x;
}
</script>
</html>