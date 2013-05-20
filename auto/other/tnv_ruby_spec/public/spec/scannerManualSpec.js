var testno = 0;

var startScannerManualTest = function (arrFile){

	describe("Scanner Module Test Starts Here", function() {

		beforeEach(function() {
			$.get('/app/Auto/commonReset');
			displayflag = false;
			flag1 = false;
			eventFired = false;
			m = 1;
		});
		
		afterEach(function() {
		//eventOutput = "11,01234567,63 59 52 57";
			var actual = arrFile[0][2];
			if(eventOutput == actual){
				eventOutput = "";
				disableButtons();
				runNextTest();
			}
			else{
				enableButtons();
				dispCurrentProcess("Next Please");
			}
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Enumerated Output on Top", function() {

				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
	        			displayflag = true;
	     			}, 6000);
				});

				waitsFor(function() {
	    			return displayflag;
	    		}, "Interval after Div Updates", 7000);

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
		    		}, "Interval Between Each API Call", 3000);
				}

				runs(function(){
					fillExpected("Expected:" + arrFile[0][2]);
	    			flag1 = false;
		      		setTimeout(function() {
		        		flag1 = true;
		     		}, 4000);
	    		});

	    		waitsFor(function() {

	    			dispCurrentProcess("Waiting For 10 Secs Barcode To Be Scanned");

	    			if (eventFired){
	    				return true;
	    			}
	    			else{
	      				return false;
	      			}
	    		}, "Event Should Get Fired After Waiting 20 Secs", 15000);


			});

		});

	});
}

var startScannerParamsTest = function (arrFile){

	describe("Scanner Module Test Starts Here", function() {

		beforeEach(function() {
			$.get('/app/Auto/commonReset');
			displayflag = false;
			flag1 = false;
			eventFired = false;
			m = 1;
		});
		
		afterEach(function() {
			enableButtons();
			dispCurrentProcess("Next Please");
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Enumerated Output on Top", function() {

				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
	        			displayflag = true;
	     			}, 6000);
				});

				waitsFor(function() {
	    			return displayflag;
	    		}, "Interval after Div Updates", 7000);

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
		    		}, "Interval Between Each API Call", 3000);
				}

				runs(function(){
					fillExpected("Expected:" + arrFile[0][2]);
	    			flag1 = false;
		      		setTimeout(function() {
		        		flag1 = true;
		     		}, 4000);
	    		});

	    		waitsFor(function() {

	    			dispCurrentProcess("Waiting For 10 Secs Barcode To Be Scanned");

	    			if (eventFired){
	    				return true;
	    			}
	    			else{
	      				return false;
	      			}
	    		}, "Event Should Get Fired After Waiting 20 Secs", 15000);

			});

		});

	});
}

function enumCallbackCommon(data){
	eventOutput = "";
	eventOutput = data ;
	var node=document.createElement("LI");
	var output = "Output:"+ '<br/>' + eventOutput;
	textnode=document.createTextNode(output);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
	eventFired  = true ;
}

function scanDecodeCallback(data){
	eventOutput = "";
	eventOutput = data ;
	var node=document.createElement("LI");
	var output = "Output:"+ '<br/>' + eventOutput;
	textnode=document.createTextNode(output);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
	eventFired  = true ;
}

function returnGetProperty(data){
	var node=document.createElement("LI");
	var textnode =document.createTextNode("Returned Value Of "+objPropertyName.getValue()+": "+data);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
}