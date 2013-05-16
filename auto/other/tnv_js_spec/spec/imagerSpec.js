var objectname = "";
var paramormethodname = "";
var paramvalue = "";

var checkMethod = "destination";
var checkDestination = "";

var destinationPath = "";
var fileExist = false;
var eventFired = false;
var fileExistMsg = "";
var arrFile = new Array;
var m = 1;
var enumerated = false;
var onImageCaptureEvent = false;
var flag1 = "";

var startImagerSet = function (arrFile){

	describe("Imager Module Test Starts Here", function() {

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
	     				}, 5000);
	     				m++;
		    		});

		    		waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
		    			return flag;
		    		}, "Interval Between Each API Call", 6000);
				}

				runs(function(){
					expect(flag).toBeTruthy();
					window.scrollTo(0,document.body.scrollHeight);
				});

			});

		});

	});
}

var startImageTransfer = function (arrFile){


	describe("Imager Module Test Starts Here", function() {

		beforeEach(function() {
			imager.imagerEvent="";
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display TestCase/Set Params/Callback Should Return File Received/Sent/Check File Is At Destination", function() {
			
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
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);
				}

				waitsFor(function() {
	    			if (eventFired){
	    				return true;
	    			}
	    			else
	      				return false;
	    		}, "Event Should Get Fired After Waiting 5 Secs", 5000);

	    		runs(function(){
	    			expect(eventOutput).toMatch(/OK/);
	    		});
				
	    		runs(function(){
	    			flag = false;
	      			setTimeout(function() {
	        		flag = true;
	     			}, 35000);
	    		});

		    	waitsFor(function() {
		    		return flag;
		    	}, "Waiting Some Time To Allow the FileTransfer Happens Before Check", 40000);

		    	runs(function(){
					checkFileExist();
		    	});

		    	waitsFor(function() {
		    		return fileExist;
		    	}, "File Not Exist!! Kindly Check Manually At Location" + destinationPath, 10000);

		    	runs(function(){
	    			expect(fileExistMsg).toMatch(/OK: File Exist/);
	    		});

			});

		});

	});
}


var startImageTransferNegetive = function (arrFile){

	describe("Imager Module Test Starts Here", function() {

		beforeEach(function() {
			imager.imagerEvent="";
			m = 1;
			displayflag = false;
			eventFired = false;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display Test Case/Set Params", function() {

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
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);

				}

				waitsFor(function() {
					if (eventFired){
						return true;
					}
					else
						return false;
				}, "Event Should Get Fired After Waiting 5 Secs", 50000);

				runs(function(){
					expect(eventOutput).toMatch(/error/i);
				});

			});

		});

	});
}


///////////////////////////////////////////////////////////////////////////

var startImagerEnum = function (arrFile){

	describe("Imager Module Test Starts Here", function() {

		beforeEach(function() {
			imager.imagerEnumEvent="";
			displayflag = false;
			flag1 = false;
			eventFired = false;
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

		    			eventOutput = "";
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
////////////////////////////////////////////////////////////////////////////////

var startImageDataUri = function (arrFile){


	describe("Imager Module Test Starts Here", function() {

		beforeEach(function() {
			imager.onImageCapture = "";
			displayflag = false;
			onImageCaptureEvent = false;
			capturedImage = "";
			m = 1;
		});

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			it("Display Div/SetParams/Data URI Event To be Fired", function() {

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
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);
				}
				
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

var startImageDataUriTransfer = function (arrFile){

	describe("Imager Module Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){
			beforeEach(function() {
				imager.onImageCapture = "";
				displayflag = false;
				onImageCaptureEvent = false;
				flag1 = false;
				capturedImage = "";
				m = 1;
			});

			it("Display Div/SetParams/Data URI Event To be Fired", function() {

				//Runs Method to Display Test Case On Screen
				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
	        			displayflag = true;
	     			}, 9000);
				});
				waitsFor(function() {
	    			return displayflag;
	    		}, "Interval after Div Updates", 10000);

				//Loops Through All Params and call Each 2 Sec Of Interval Of Time
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
		    			return flag;
		    		}, "Interval Between Each API Call", 5000);
				}
				
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
				
				waitsFor(function() {
	    			if (eventFired){
	    				return true;
	    			}
	    			else
	      				return false;
	    		}, "Transfer Event Should Get Fired After Waiting 5 Secs", 5000);

	    		runs(function(){
	    			expect(eventOutput).toMatch(/OK/);
					setTimeout(function() {
	        		flag1 = true;
	     			}, 5000);
	    		});

		    	waitsFor(function() {
		    		return flag1;
		    	}, "Waiting Some Time To Allow the FileTransfer Happens Before Check", 5000);

		    	runs(function(){
		    		if(checkDestination){
			    		var split = checkDestination.match(/'(.*?)'/);
						destinationPath = split[1];
						if(destinationPath.indexOf("http:") !== -1 || destinationPath.indexOf("ftp:") !== -1 || destinationPath.indexOf(".") !== -1 || destinationPath.indexOf("..") !== -1){
							checkFileAtServer();
						}
						else{

						}

					}

		    	});

		    	waitsFor(function() {
		    		return fileExist;
		    	}, "File Not Exist!! Kindly Check Manually At Location" + destinationPath, 5000);

		    	runs(function(){
	    			expect(fileExistMsg).toMatch(/OK: File Exist/);
	    		});

			});

		});

	});
}

// Call Back Events

function JSONimagerEnumEvent(json)
{
	eventOutput = "";
	var txtstring = "";

   	for (var i = 0; i < json.imagerArray.length; i++) 	
 	{ 	
		
		txtstring += '{ DeviceName = ' + json.imagerArray[i].deviceName + ', FriendlyName = ' + json.imagerArray[i].friendlyName + '}<br>';
 	}
    eventOutput = txtstring ;
	eventFired  = true ;
}

function JSimagerEnumEvent(imagerArray)
{      
	eventOutput = "";
	var txtstring="";
     	for (var i = 0; i < imagerArray.length; i++) 	
 	{ 	

		txtstring += 'DeviceNameJS:' +  imagerArray[i][0] + ': FriendlyName:' + imagerArray[i][1] + '<br>'; 
 	} 	

    eventOutput = txtstring ;
	eventFired  = true ;
}

function JSimagerEvent(transferResult)
{
	eventOutput = "";
	eventOutput = transferResult ;
	eventFired  = true ;
}

function JSONimagerEvent(myjsonobject)
{
	eventOutput = "";
	eventOutput = myjsonobject.transferResult ;
	eventFired  = true ;
}

function onImageCapture(jsonObject)
{

	capturedImage = "";
	capturedImage = jsonObject.imageData;
	onImageCaptureEvent = true; 
}