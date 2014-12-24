// Server Hosts - for use in the test app

SERVER_HOST = '10.233.85.82';
SERVER_PORT = '9099';


// Common functions used in the test app

var quitPB = function(){
	generic.InvokeMETAFunction("Application", "Quit");
}