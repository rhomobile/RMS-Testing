var startDeviceAppSet = function (arrFile){

	describe(arrFile[1][0] + " Module Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){
		
			beforeEach(function() {
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

	 		    runs(function(){
					expect(flag).toBeTruthy();
					window.scrollTo(0,document.body.scrollHeight);
				});

			});

		});

	});
}


var startDeviceAppEvent = function (arrFile){


	describe("Battery Sample Interval Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			beforeEach(function() {
				$.get('/app/Auto/reset');
				eventFired = false;
				eventOutput = "";
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

    			}, "Waiting 5 sec Event to be fired",10000 );

	    		runs(function(){
					//expect(flag).toBeTruthy();
					//window.scrollTo(0,document.body.scrollHeight);
				});

			});
		});
	});
}

var startAlarmCall = function (arrFile){

	var valueRepeat = "";
	var valueInterval = "";
	timer = 0;

	describe("Alarm Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			beforeEach(function() {
				$.get('/app/Auto/reset');
				eventFired = false;
				eventOutput = "";
				intervalcount = 0;
				timer = 0;
				eventOutput = "";
				m = 1;

				if(timerReturn)
					clearInterval(timerReturn);
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

						if(arrFile[m][1] == "repeat")
							valueRepeat = arrFile[m][2];

						if(arrFile[m][1] == "interval")
							valueInterval = arrFile[m][2];

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
					timerReturn = setInterval(function() {
	        			timer++;
	     			}, 1000);
	    		});

	    		waitsFor(function() {

					dispCurrentProcess("Current count is:"+intervalcount+"Time Waiting: "+timer);

					if(eventFired){

						var a = valueInterval.split('-'); // split it at the colons
						// minutes are worth 60 seconds. Hours are worth 60 minutes.
						var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
						if(seconds < 30)
							seconds = 30;

						//Condition If both interval and repeat set or only repeat set

						if((valueRepeat == 'true' && valueInterval) || valueRepeat == 'true'){

							if(intervalcount == 5){ //If callback fired 5 times return true
								return true;
							}
							else
								return false; //because when we set only interval call back should fire only once not more than that
						}

						//Condition only Interval set

						else if(valueInterval){

							if((intervalcount == 1) && ((seconds*2) == timer)){ //If callback fired only once return true
								return true;
							}
							else
								return false; //because when we set only interval call back should fire only once not more than that
						}

						eventFired = false;
						return true;
						}

					return false;

    			}, "Waiting one Minutes", 120000);

	    		runs(function(){
	    			extraInfoOnTop(arrFile[0][0],arrFile[0][1]);
				});

			});
		});
	});
}


// Timer Call

var startTimerCall = function (arrFile){

	var valueRepeat = "";
	var valueInterval = "";
	timerCount = 0;
	timerReturn = "";
	describe("Alarm Test Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){

			beforeEach(function() {
				$.get('/app/Auto/reset');
				eventFired = false;
				eventOutput = "";
				timerCount = 0;
				eventOutput = "";
				m = 1;

				if(timerReturn)
					clearInterval(timerReturn);
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

						if(arrFile[m][1] == "interval")
							valueInterval = arrFile[m][2];

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
					timerReturn = setInterval(function() {
	        			timerCount++;
	     			}, 1000);
	    		});

	    		waitsFor(function() {

					dispCurrentProcess("Time Waiting: "+timerCount);

					if(eventFired){
						return true;
					}

					return false;

    			}, "Waiting one Minutes", 120000);

	    		runs(function(){
	    			extraInfoOnTop(arrFile[0][0],arrFile[0][1]);
				});

			});
		});
	});
}


//Callback Methods Start Here
function jsBacklightSettingsEvent(theOutput){

    eventOutput = theOutput;
	eventFired = true;
}

function jsEnumNotificationsEvent(theOutput){

    eventOutput = theOutput;
	eventFired = true;
}

function jsScreenOrientationEvent(orientation)
{
    eventOutput = orientation;
	eventFired = true;
}

function jsScreenOrientationEnableEvent(orientation)
{
    //eventOutput = orientation;

    if(orientation == "Normal"){
    	Normal = true;
		eventOutput += orientation;
	}

    if(orientation == "RightHanded"){
    	RightHanded = true;
		eventOutput += orientation;
	}

    if(orientation == "UpsideDown"){
		UpsideDown = true;
		eventOutput += orientation;
	}

    if(orientation == "LeftHanded"){
		LeftHanded = true;
		eventOutput += orientation;
	}

	if(Normal && RightHanded && UpsideDown && LeftHanded)
		eventFired = true;
}

function jsTimeout(time)
{
	eventOutput = "Timer Fired After "+timerCount+"Secs. Current time is using javascript is:"+time;
	eventFired = true;
}

function doAlarm()
{
	intervalcount++;
	eventOutput += "Event Fired " + intervalcount + " After " + timer + "Secs <br/>";
	eventFired = true;
}

function doStatejsFunction(applicationState)
{
    eventOutput = applicationState;
	eventFired = true;
}

function fnVer(theOutput)
{
	eventOutput = theOutput;
	eventFired = true;
}