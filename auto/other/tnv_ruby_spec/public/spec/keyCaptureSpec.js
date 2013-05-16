var startKeyCaptureEvent = function (arrFile){

	describe("Key Capture Module Test Starts Here", function() {

		beforeEach(function() {
			$.get('/app/Auto/reset');
			displayflag = false;
			flag1 = false;
			eventFired = false;
			eventOutput = ''
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Enumerated Output on Top", function() {

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
	    			flag1 = false;
		      		setTimeout(function() {
		        		flag1 = true;
		     		}, 4000);
	    		});

	    		waitsFor(function() {

	    			if (eventFired){
		      			var node=document.createElement("LI");
						var textnode =document.createTextNode(arrFile[0][0] + " - " + arrFile[0][1]);
						node.appendChild(textnode);
						document.getElementById("myList").appendChild(node);
		      			node=document.createElement("LI");
		      			var output = "Output:"+ '<br/>' + eventOutput;
		      			textnode=document.createTextNode(output);
		      			node.appendChild(textnode);
						document.getElementById("myList").appendChild(node);

	    				return true;
	    			}
	    			else{
	      				return false;
	      			}

	    		}, "Event Should Get Fired After Waiting 15 Secs", 15000);

	    		runs(function(){
	    			var actual = arrFile[0][2];
					expect(eventOutput).toEqual(actual);
	    		});
	 
			});

		});

	});
}


 function jsKeyEvent(data)
 {
 	eventOutput = "";
	eventOutput = data ;
	eventFired  = true ;
}