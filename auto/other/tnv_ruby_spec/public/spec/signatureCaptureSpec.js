var objectname = "";
var paramormethodname = "";
var paramvalue = "";

var checkMethod = "destination";
var checkDestination = "";
var checkSource = "";
var destinationPath = "";
var fileExist = false;
var eventFired = false;
var fileExistMsg = "";
var arrFile = new Array;
var m = 1;
var enumerated = false;
var onImageCaptureEvent = false;

var startSignatureSet = function (arrFile){


	describe("Signature Module Test Starts Here", function() {

		beforeEach(function() {
				m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

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

				runs(function(){
					expect(flag).toBeTruthy();
					window.scrollTo(0,document.body.scrollHeight);
				});

			});

		});

	});
}

var startSignatureTransfer = function (arrFile){

	describe("Signature Module Test Starts Here", function() {

		beforeEach(function() {
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Callback Should Return File Received-Sent", function() {
			
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
	     				}, 4000);
	     				m++;
		    		});

		    		waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);

				}

				runs(function(){

				});

				waitsFor(function() {
	    			if (eventFired){
	    				return true;
	    			}
	    			else{
						dispCurrentProcess("Waiting Event to be Fired");
	      				return false;
						}
	    		}, "Event Should Get Fired After Waiting 5 Secs", 5000);

	    		runs(function(){
	    			expect(eventOutput).toMatch(/OK/);
					flag = false;
	      			setTimeout(function() {
	        		flag = true;
	     			}, 10000);
	    		});

		    	waitsFor(function() {
					dispCurrentProcess("Waiting 10 Secs Before Checking File");
		    		return flag;
		    	}, "Waiting Some Time To Allow the FileTransfer Happens Before Check", 11000);

				runs(function(){
					//Check File Exist Or Not
					checkFileExist();
				});

		    	waitsFor(function() {
					dispCurrentProcess("Checking File Exist Or Not");
		    		return fileExist;
		    	}, "File Not Exist!! Kindly Check Manually At Location" + destinationPath, 10000);

		    	runs(function(){
	    			expect(fileExistMsg).toMatch(/OK: File Exist/);
	    		});

			});

		});

	});
}

var startSignatureVector = function (arrFile){

	describe("Signature Module Test Starts Here", function() {

		beforeEach(function() {
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Vector Event Output will be displayed on Top", function() {
			
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

						eventFired = false;
		    			eventOutput = "";
	    				return true;
	    			}
	    			else{
						dispCurrentProcess("Draw Something In Signature Pad To Make Vector Event Fire");
	      				return false;
	      			}

	    		}, "Event Should Get Fired After Waiting 5 Secs", 5000);

			});

		});

	});
}

var startSignatureTransferNegetive = function (arrFile){

	describe("Signature Module Test Starts Here", function() {

		beforeEach(function() {
			$.get('/app/Auto/reset');
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

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

				runs(function(){

				});

				waitsFor(function() {
	    			if (eventFired){
	    				return true;
	    			}
	    			else{
						dispCurrentProcess("Waiting Event To Be Fired");
	      				return false;
						}
	    		}, "Event Should Get Fired After Waiting 5 Secs", 50000);

	    		runs(function(){
	    			expect(eventOutput).toMatch(/error/i);
	    		});

			});

		});

	});
}

var startSignatureDataUri = function (arrFile){

	describe("Signature Module Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			beforeEach(function() {
				imager.onImageCapture = "";
				m = 1;
			});

			it("Display TestCase/Set Params/Data URI Signature Should Come", function() {

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

				});

	    		waitsFor(function() {
	    			if (onImageCaptureEvent){
		      			var node=document.createElement("LI");
	    				var img = new Image();
	    				img.height = "300";
	    				img.width = "300";
						img.src = capturedImage;
						node.appendChild(img);
						document.getElementById("myList2").appendChild(node);
	    				return true;
	    			}
	    			else
	      				return false;
	    		}, "On Image Capture Data URI Event Fired", 50000);

	    		runs(function(){
	    			expect(capturedImage).toMatch(/data:image/i);
	    		});

			});

		});

	});
}

var startSignatureDataUriTransfer = function (arrFile){

	describe("Signature Module Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			beforeEach(function() {
				imager.onImageCapture = "";
				m = 1;
			});

			it("Display TestCase/Set Params/Data URI Signature Should Come", function() {

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

				});

	    		waitsFor(function() {
	    			if (onImageCaptureEvent){
		      			var node=document.createElement("LI");
	    				var img = new Image();
	    				img.height = "300";
	    				img.width = "300";
						img.src = capturedImage;
						node.appendChild(img);
						document.getElementById("myList2").appendChild(node);
	    				return true;
	    			}
	    			else
	      				return false;
	    		}, "On Image Capture Data URI Event Fired", 50000);

	    		runs(function(){
	    			expect(capturedImage).toMatch(/data:image/i);
					flag = false;
	      			setTimeout(function() {
	        		flag = true;
	     			}, 10000);
	    		});
				
		    	waitsFor(function() {
					dispCurrentProcess("Waiting 10 Secs Before Checking File");
		    		return flag;
		    	}, "Waiting Some Time To Allow the FileTransfer Happens Before Check", 11000);

		    	runs(function(){
					//Check File Exist Or Not
					checkFileExist();

		    	});

		    	waitsFor(function() {
					dispCurrentProcess("Checking File Exist Or Not");
		    		return fileExist;
		    	}, "File Not Exist!! Kindly Check Manually At Location" + destinationPath, 10000);

		    	runs(function(){
	    			expect(fileExistMsg).toMatch(/OK: File Exist/);
	    		});

			});

		});

	});
}


// Callback Methods

function JSSigtranseferEvent(transferResult)
{
	eventOutput = "";
	eventOutput = transferResult ;
	eventFired  = true ;
}

function Jsvectoryarray(vectorArray)
{
	eventFired = false;
	eventOutput = "";
	eventOutput = vectorArray;
	eventFired  = true ;
}

function onSignatureCapture(imageData)
{
	capturedImage = "";
	capturedImage = imageData;
	onImageCaptureEvent = true; 
}