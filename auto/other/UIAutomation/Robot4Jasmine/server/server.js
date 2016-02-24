var express = require ('express');
var app = express();
var server = require ('http').createServer (app);
var fs = require('fs');

//System IP and Port to run node server. Port by default is 4040.
var server_port = "4040";
var server_ip = "10.233.82.66";

server.listen (server_port, server_ip, function () {
	console.log ('Server running on port %d on address %s', server_port, server_ip);
});
app.get('/', function (req, res) {
	console.log("Hello World");
 	res.send('Hello World!');
});
app.get("/sendresult", function (req, resp){
	console.log("FileContent : " + req.query.text);
	//Path to generate the result post execution in xml format
	var writeSource = 'D:/Robot4Jasmine/server/result.xml';

	fs.writeFile(writeSource, req.query.text, {"encoding":'utf8'}, function(err){
	  if ( err ) { throw err; }
	  console.log("*** File written successfully");
	  resp.send('File written success!');
	});
});