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
			enableButtons();
			dispCurrentProcess("Next Please");
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Enumerated Output on Top", function() {

				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
	        			displayflag = true;
	     			}, 1000);
				});

				waitsFor(function() {
	    			return displayflag;
	    		}, "Interval after Div Updates", 2000);

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
	    			flag1 = false;
		      		setTimeout(function() {
		        		flag1 = true;
		     		}, 4000);
	    		});

	    		waitsFor(function() {

	    			dispCurrentProcess("Waiting For 10 Secs Barcode To Be Scanned");

	    			if (eventFired){
		      			var node=document.createElement("LI");
						var textnode =document.createTextNode(arrFile[0][0] + " - " + arrFile[0][1]);
						node.appendChild(textnode);
						document.getElementById("myList").appendChild(node);
		    			eventOutput = "";
	    				return true;
	    			}
	    			else{
	      				return false;
	      			}
	    		}, "Event Should Get Fired After Waiting 20 Secs", 20000);

			});

		});

	});
}

var runNextTest = function(){
	disableButtons();
	testno = testno + 1;
	try{
    setTimeout(startJasmineTest(testno),3000);
	}
	catch(e){
	alert(e.message);
	}
}

var runSameTestAgain = function(){
	disableButtons();
	try{
    setTimeout(startJasmineTest(testno),3000);
	}
	catch(e){
	alert(e.message);
	}
}

var runPreviousTest = function(){
	disableButtons();
	testno = testno - 1;
	try{
    setTimeout(startJasmineTest(testno),3000);
	}
	catch(e){
	alert(e.message);
	}
}

var disableButtons = function (){
	document.getElementById('next').disabled = true;
	document.getElementById('previous').disabled = true;
	document.getElementById('current').disabled = true;
	document.getElementById('go').disabled = true;
}

var enableButtons = function (){
	document.getElementById('next').disabled = false;
	document.getElementById('previous').disabled = false;
	document.getElementById('current').disabled = false;
	document.getElementById('go').disabled = false;
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

function scanCallbackCommon(data){
	eventOutput = "";
	eventOutput = data ;
	eventFired  = true ;
}

function returnGetProperty(data){
	var node=document.createElement("LI");
	var textnode =document.createTextNode("Returned Value: "+data);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
}