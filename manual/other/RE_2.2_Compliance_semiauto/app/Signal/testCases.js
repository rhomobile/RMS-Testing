var a=0;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function OnSignal(signal, ESSID, MAC, AdapterName, DHCPServer, DHCPStatic, Gateway, IPAddress, RSSI, SubnetMask, Wins) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Signal: " + signal
									+ "<BR>ESSID:" + ESSID
									+ "<BR>MAC: " + MAC
									+ "<BR>AdapterName: " + AdapterName
									+ "<BR>DHCPServer: " + DHCPServer
									+ "<BR>DHCPStatic: " + DHCPStatic
									+ "<BR>Gateway: " + Gateway
									+ "<BR>IPAddress: " + IPAddress
									+ "<BR>RSSI: " + RSSI
									+ "<BR>SubnetMask: " + SubnetMask
									+ "<BR>Wins: " + Wins ;
									
	        return;
	    }
 function OnSignaljson(json) {
        a = a + 1;
        var sig = document.getElementById("actualResult");
        sig.innerHTML = "Signal: " + json.signalStrength
								+ "<BR>ESSID:" + json.essid
								+ "<BR>MAC: " + json.macAddress
								+ "<BR>AdapterName: " + json.adapterName
								+ "<BR>DHCPServer: " + json.dhcpServer
								+ "<BR>DHCPStatic: " + json.dhcpStatic
								+ "<BR>Gateway: " + json.gateway
								+ "<BR>IPAddress: " + json.ipAddress
								+ "<BR>RSSI: " + json.rssi
								+ "<BR>SubnetMask: " + json.subnetMask
								+ "<BR>Wins: " + json.wins
								+ "<BR>Count: " + a
        return;
    }

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0251",
				"RegLevel":"R1",
				"Description":"Signal visible",
				"PreCondition":[],
				"Steps":["1. Make visible the signal indicator icon.","2. Navigate to other pages to check whether signal indicator is persistent across pages."],
				"ExpectedOutcome":["Wireless signal indicator icon should be visible on top right of device screen with default color of black.","signal indicator icon should be persistant on each page."],
				"testToPerform":function(){
					signal.visibility = 'visible';
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0252",
				"RegLevel":"R1",
				"Description":"Signalevent",
				"PreCondition":[],
				"Steps":["1. Make visible the signal indicator icon.","2. Attach signalEvent on page.","3. Roam the device to check signal icon of varing signal strength"],
				"ExpectedOutcome":["signalEvent should fire and should return all event parameters value as following [signalStrength,essid,macAddress,adapterName,dhcpServer,dhcpStatic,ipAddress,rssi,subnetMask,wins]","signal icon should change in context of signal strength and event also should return changed value of signal strength."],
				"testToPerform":function(){
					signal.visibility = 'visible';
					signal.signalEvent = "OnSignal('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');"
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0253",
				"RegLevel":"R1",
				"Description":"Signalevent with URL",
				"PreCondition":[],
				"Steps":["1. Make visible the signal indicator icon.","2. Attach signalEvent of URL type on page."],
				"ExpectedOutcome":["signalEvent should fire and should cause to navigate the specified HTTP url."],
				"testToPerform":function(){
					signal.visibility = 'visible';
					signal.signalEvent = "url('http://10.233.85.82:9099/app/Signal/NavigateTest.html');"
				},
				"FinalResult":""
			}

		];
		pbTestObj.afterEach = function(){
			signal.visibility = 'hidden';
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();