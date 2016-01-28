<?php

if ( !isset($_SERVER['PHP_AUTH_USER']) ) {
header('WWW-Authenticate: Basic realm="You Shall Not Pass"');
header('HTTP/1.0 401 Unauthorized');
echo "<br /><br /><br /><br />";
echo $_SERVER['PHP_AUTH_USER'];
echo $_SERVER['PHP_AUTH_PW'];
exit;
}
else {
if ( $_SERVER['PHP_AUTH_USER'] == 'me' && $_SERVER['PHP_AUTH_PW'] == 'password' ) {

echo "<br /><br /><p>Welcome, {$_SERVER['PHP_AUTH_USER']}.</p>";
echo $_SERVER['PHP_AUTH_USER'];
echo $_SERVER['PHP_AUTH_PW'];
} else {
echo "Wrong password, Balrog!";
}
$_SERVER = array();
}

?>