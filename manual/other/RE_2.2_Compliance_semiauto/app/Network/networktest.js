var a=0;
var count = 0;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function onNetworkPoll(conn) {

       count++;
       //alert(conn);
      var message1  = "Count =" + count;
        message1 += "Connection status: " + conn;
        main.displayResult(message1);
      // return;
    }

function onNetworkPollJSON(json)
    {
       var message2 = "Connection status: "+json.connectionInformation;
       main.displayResult(message2);
    }

 function WANStatus(phoneSignalStrength, networkOperator, connectionTypeAvailable, connectionTypeConnected, connectionManagerMessage)
    {
      var result1 = "WAN status event fired";
      result1 += "phoneSignalStrength = "+phoneSignalStrength+"<br>"+"networkOperator = "+networkOperator+"<br>"+"connectionTypeAvailable = "+connectionTypeAvailable+"<br>"+"connectionTypeConnected = "+connectionTypeConnected+"<br>"+"connectionManagerMessage = "+connectionManagerMessage;
      main.displayResult(result1);
    }
  function WANStatusJSON(json)
    {
      var result2 = "WAN status JSON event fired";
      result2 += "phoneSignalStrength = "+json.phoneSignalStrength+"<br>"+"networkOperator = "+json.networkOperator+"<br>"+"connectionTypeAvailable = "+json.connectionTypeAvailable+"<br>"+"connectionTypeConnected = "+json.connectionTypeConnected+"<br>"+"connectionManagerMessage = "+json.connectionManagerMessage;
      main.displayResult(result2);
    }


(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0248",
				"RegLevel":"R1",
				"Description":"Network Event with valid server IP",
				"PreCondition":[],
				"Steps":["1. Attach javascript type network event.","2. Set the port  to valid value on which server is listening.","3. Set the host value to IP address of the server.","4. Call Start method to check the connection state."],
				"ExpectedOutcome":["Network Event should fire and Connection Information value should be return as 'Connected' if device is in network or 'Disconnected if not in network.'"],
				"testToPerform":function(){
					 network.networkEvent = "onNetworkPoll('%s')";
					 network.port = '80';
					 network.host = '10.233.85.82'; 
					 network.start(); 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0249",
				"RegLevel":"R1",
				"Description":"Check NetworkPollInterval",
				"PreCondition":[],
				"Steps":["1. Attach the network event.","2. Set NetworkPollInterval value to 6000 milliseconds.","3. Call Start() method","4. Disable wlan and check the network event","5. Enable wlan and check the network event "],
				"ExpectedOutcome":["Connection Information should get updated after every 1 min in case of change in connection."],
				"testToPerform":function(){
					 network.networkEvent = "onNetworkPollJSON(%json)";
					 network.networkPollInterval = 60000;
					 network.port = '80';
					 network.host = '10.233.85.82'; 
					 network.start();
					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0250",
				"RegLevel":"R1",
				"Description":"Check Network event of HTTP url type",
				"PreCondition":[],
				"Steps":["1. Attach the network event of HTTP Url type.","2. Set the port value to valid server port.","3. Set the host value to valid url or IP address.","4. Call Start() method."],
				"ExpectedOutcome":["Network Event should fire and cause to navigate the specified url page."],
				"testToPerform":function(){
					 network.networkEvent = "url('http://10.233.85.82:9099/app/Network/NavigateTest.html')";
					 network.port = '80';
					 network.host = '10.233.85.82'; 
					 network.start();
					
				},
				"FinalResult":""
			}

		];
		pbTestObj.afterEach = function(){
			audioCapture.duration = 20000;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();