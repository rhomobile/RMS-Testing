var startSignalSet = function (arrFile){

	describe("Signal Module Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){
		
			beforeEach(function() {
				m = 1;
			});

			it("Signal TestCase/Set Params", function() {
			
				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
	        			displayflag = true;
	     			}, 9000);
				});

				waitsFor(function() {
	    			return displayflag;
	    		}, "Interval after Div Updates", 10000);

				for (var k = 1; k < arrFile.length; k++){

					runs(function() {
						//Common Method to Set the Parameters
						setParams(arrFile[m]);
	    				flag = false;
	      				setTimeout(function() {
	        			flag = true;
	     				}, 2000);
	     				m++;
		    		});

		    		waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);

				}

	 		    runs(function(){
					expect(flag).toBeTruthy();
					window.scrollTo(0,document.body.scrollHeight);
				});

			});

		});

	});
}

var startSignalEvent = function (arrFile){


	describe("Battery Sample Interval Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			beforeEach(function() {
				signal.signalEvent = "";
				eventFired = false;
				m = 1;
			});

			it("Display TestCase/Set Params", function() {
			
				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
	        			displayflag = true;
	     			}, 9000);
				});

				waitsFor(function() {
	    			return displayflag;
	    		}, "Interval after Div Updates", 10000);

				for (var k = 1; k < arrFile.length; k++){

					runs(function() {
						//Common Method to Set the Parameters
						setParams(arrFile[m]);
	    				flag = false;
	      				setTimeout(function() {
	        			flag = true;
	     				}, 2000);
	     				m++;
		    		});

		    		waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);

				}
				
				runs(function() {
	    		});

	    		waitsFor(function() {

					if(eventFired){
		      			var node=document.createElement("LI");
						var textnode =document.createTextNode(arrFile[0][0] + " - " + arrFile[0][1]);
						node.appendChild(textnode);
						document.getElementById("myList").appendChild(node);
		      			node=document.createElement("LI");
		      			var output = "Output:"+ '<br/>' + eventOutput;
		      			textnode=document.createTextNode(output);
		      			node.appendChild(textnode);
						document.getElementById("myList").appendChild(node);
						eventFired = false;
						return true;
					}

	    			else{
						dispCurrentProcess("Waiting Event To Be Fired");
	      				return false;
	      			}

    			}, "Waiting 5 sec Event to be fired",5000 );

	    		runs(function(){
					//expect(flag).toBeTruthy();
					//window.scrollTo(0,document.body.scrollHeight);
				});

			});
		});
	});
}

var jsSignalEventCallBack = function (signalStrength, essid, macAddress, adapterName, dhcpServer, dhcpStatic, gateway, ipAddress, rssi, subnetMask, wins){

	var theOutput = "";

	if(signalStrength)
		theOutput = theOutput + "signalStrength: "+signalStrength + "<BR>";
		
	if(essid)
		theOutput = theOutput + "essid: " + essid  + "<BR>";

	if(macAddress)
		theOutput = theOutput + "macAddress: " + macAddress  + "<BR>";

	if(adapterName)
		theOutput = theOutput + "adapterName: " + adapterName  + "<BR>";

	if(dhcpServer)
		theOutput = theOutput + "dhcpServer: " + dhcpServer  + "<BR>";	

	if(dhcpStatic)
		theOutput = theOutput + "dhcpStatic: " + dhcpStatic  + "<BR>";

	if(gateway)
		theOutput = theOutput + "gateway: " + gateway  + "<BR>";

	if(ipAddress)
		theOutput = theOutput + "ipAddress: " + ipAddress  + "<BR>";

	if(rssi)
		theOutput = theOutput + "rssi: " + rssi  + "<BR>";

	if(subnetMask)
		theOutput = theOutput + "subnetMask: " + subnetMask  + "<BR>";

	if(wins)
		theOutput = theOutput + "wins: " + wins  + "<BR>";

	eventOutput = theOutput;
	eventFired = true;

}

var jsonSignalEventCallBack = function (objJson){

	var theOutput = "";

	if(objJson.signalStrength)
		theOutput = theOutput + "signalStrength: "+objJson.signalStrength + "<BR>";
		
	if(objJson.essid)
		theOutput = theOutput + "essid: " + objJson.essid  + "<BR>";

	if(objJson.macAddress)
		theOutput = theOutput + "macAddress: " + objJson.macAddress  + "<BR>";

	if(objJson.adapterName)
		theOutput = theOutput + "adapterName: " + objJson.adapterName  + "<BR>";

	if(objJson.dhcpServer)
		theOutput = theOutput + "dhcpServer: " + objJson.dhcpServer  + "<BR>";	

	if(objJson.dhcpStatic)
		theOutput = theOutput + "dhcpStatic: " + objJson.dhcpStatic  + "<BR>";

	if(objJson.gateway)
		theOutput = theOutput + "gateway: " + objJson.gateway  + "<BR>";

	if(objJson.ipAddress)
		theOutput = theOutput + "ipAddress: " + objJson.ipAddress  + "<BR>";

	if(objJson.rssi)
		theOutput = theOutput + "rssi: " + objJson.rssi  + "<BR>";

	if(objJson.subnetMask)
		theOutput = theOutput + "subnetMask: " + objJson.subnetMask  + "<BR>";

	if(objJson.wins)
		theOutput = theOutput + "wins: " + objJson.wins  + "<BR>";

	eventOutput = theOutput;
	eventFired = true;

}