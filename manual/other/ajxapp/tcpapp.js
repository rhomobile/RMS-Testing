var net = require('net');

net.createServer(function(socket) {
    
    socket.on('data', function(data) {
        console.log("---REQ\n" + data);
        if((data + ' ').indexOf('OPTIONS') != -1) {
            console.log("---OPTIONS");
            socket.write('HTTP/1.1 200 OK\r\nServer: Apache-Coyote/1.1\r\nAccess-Control-Allow-Origin: *\r\nAllow: OPTIONS,POST\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: Content-Type, Accept\r\nContent-Type: application/vnd.sun.wadl+xml\r\nContent-Length: 389\r\nDate: Wed, 25 Sep 2013 14:45:24 GMT\r\nConnection: close\r\nSet-Cookie: NSC_mc-qh-rb-w1-xbtufdmbttjgjdb=ffffffffaf1c56d745525d5f4f58455e445a4a4219ed;path=/\r\n\r\n<?xml version="1.0" encoding="UTF-8" standalone="yes"?><application xmlns="http://research.sun.com/wadl/2006/10"><doc xmlns:jersey="http://jersey.dev.java.net/" jersey:generatedBy="Jersey: 1.0.3 04/15/2009 06:10 PM"/><resources base="http://webapps-qa.homedepot.com/WasteClassification/rs/"><resource path="HazMatsHostServiceHelperRestService/getWasteLabelType"/></resources></application>');
        } else {
            console.log("---GET/POST");
            socket.write('HTTP/1.1 200 OK\r\nServer: Apache-Coyote/1.1\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nContent-Type: application/json\r\nTransfer-Encoding: chunked\r\nDate: Wed, 25 Sep 2013 16:23:05 GMT\r\nConnection: close\r\n\r\n');
//Chunk with E2<space><space> fails
//            socket.write('E2  \r\n{"labeltypeTO":[{"localCode":100,"localDescription":"ACCUMULATION"},{"localCode":400,"localDescription":"SPILL"},{"localCode":200,"localDescription":"UNIVERSAL WASTE"},{"localCode":300,"localDescription":"WASTE (NON-SPILL)"}]}\r\n');
//Chunk with e2 works
            socket.write('e2\r\n{"labeltypeTO":[{"localCode":100,"localDescription":"ACCUMULATION"},{"localCode":400,"localDescription":"SPILL"},{"localCode":200,"localDescription":"UNIVERSAL WASTE"},{"localCode":300,"localDescription":"WASTE (NON-SPILL)"}]}\r\n');
            socket.write('0\r\n\r\n');
        }
    });
    socket.on('error', function() { console.log("---Conection Close"); });

    
})
.listen(1337);