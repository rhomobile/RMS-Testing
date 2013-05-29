var startAppSetGetProperty = function (arrFile){

	describe("Application Module Test Starts Here", function() {

		beforeEach(function() {
			$.get('/app/Auto/commonReset');
			displayflag = false;
			flag1 = false;
			eventFired = false;
			eventOutput = "";
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Get Result", function() {

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
	     				}, 10000);
	     				m++;
		    		});

		    		waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
		    			return flag;
		    		}, "Interval Between Each API Call", 11000);
				}

				runs(function(){
	    			flag1 = false;
		      		setTimeout(function() {
		        		flag1 = true;
		     		}, 4000);
	    		});

	    		waitsFor(function() {

	    			dispCurrentProcess("Waiting For 5 Secs");

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

	    		}, "Event Should Get Fired After Waiting 5 Secs", 5000);

	    		runs(function(){
	    			var actual = arrFile[0][2];
					expect(eventOutput).toMatch(actual);
					window.scrollTo(0,document.body.scrollHeight);
	    		});
	 
			});

		});

	});
}

var startAppGetProperty = function (arrFile){

	describe("Application Module Test Starts Here", function() {

		beforeEach(function() {
			$.get('/app/Auto/commonReset');
			displayflag = false;
			flag1 = false;
			eventFired = false;
			eventOutput = "";
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Get Value", function() {

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
	     				}, 10000);
	     				m++;
		    		});

		    		waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
		    			return flag;
		    		}, "Interval Between Each API Call", 11000);
				}

				runs(function(){
	    			flag1 = false;
		      		setTimeout(function() {
		        		flag1 = true;
		     		}, 4000);
	    		});

	    		waitsFor(function() {

	    			dispCurrentProcess("Waiting For 5 Secs");

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

	    		}, "Event Should Get Fired After Waiting 5 Secs", 5000);

			});

		});

	});
}