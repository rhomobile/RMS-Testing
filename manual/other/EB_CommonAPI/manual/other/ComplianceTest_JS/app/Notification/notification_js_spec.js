describe("Notification Manual FD Tests", function () {
	
    var buttonCallback = function (args) {
		var resultDiv = document.getElementById('actResult');
		resultDiv.innerHTML = JSON.stringify(args);
		resultDiv.style.display = 'block';
    }

    beforeEach(function () {
        /* ... Set up your object ... */
    });

    afterEach(function () {
        /* ... Tear it down ... */
		var resultDiv = document.getElementById('actResult');
		resultDiv.innerHTML = "";
		resultDiv.style.display = 'none';
    });

	if ((isWindowsMobilePlatform() || isAndroidPlatform()) && !EB.System.isRhoSimulator) 
	{
		it("VT200-0652 |Beep for 5 secs and with volume 3 with 1000 hz|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Beeper will be started if its applicable for the Device <br/> Beeper should sound for 5 secs and with volume 3 and frequency 1000");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function () {
				EB.Notification.beep({frequency: 1000, volume: 3, duration: 5000});
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
			
		});

		it("VT200-0653|Play File - Mp3 file with media type|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("MP3 file should be played");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function () {
				EB.Notification.playFile(EB.RhoFile.join(EB.Application.modelFolderPath('Notification'), 'media1.mp3'), '.mp3');
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
			
		});

		xit("VT307-015|Vibrate with duration 2 sec|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Device should vibrate for 2 seconds");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function () {
				EB.Notification.vibrate(2000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});

		it("VT200-0655|Vibrate with duration 15 sec for Android; 25 secs for other platform|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("If Android Platform value passed 15000 (15 secs)<br/> Other Platform value passed 25000(25 secs)<br/>Device should vibrate for seconds that passed to vibrate method");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
			runs(function () {
				var time = isAndroidPlatform() ? 15000:25000
				EB.Notification.vibrate(time);
			});
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
			
		});

		xit("VT281-0861|Vibrate with duration 30 sec|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Device will vibrate if applicable. <br/> Device should vibrate for ONLY 15 seconds even though it is 30 sec as 15 is the max value it can take");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
			runs(function () {
				EB.Notification.vibrate(30000);
			});
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});

	}


    if (EB.System.platform == "WINDOWS_DESKTOP" || EB.System.platform == "WINDOWS" || EB.System.isRhoSimulator) {
        it("VT200-0654|showStatus up and then hide Status|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Click on runtest then wait for the pop up and then after 10 sec hide pop up is called. <br/> see if the pop up is showing the message, then it hides automatically after 10sec");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

            runs(function () {
                EB.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
                setTimeout(function () {
                    EB.Notification.hidePopup();
                }, 10000);
            });
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

        });
    } 
    else 
    {
        it("VT200-0654 |showPopup up and then hide Pop up|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Click on runtest then wait for the pop up and then after 10 sec hide pop up is called. <br/> see if the pop up is showing the message, then it hides automatically after 10sec");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

            runs(function () {
                var propertyMap = {message: 'This is a pop up for hide ', buttons: [
                    {id: 'yes', title: 'yes'},
                    'No',
                    'Cancel'
                ], title: 'MyTitle', icon: '/app/Notification/icon.png'};
                EB.Notification.showPopup(propertyMap);

                setTimeout(function () {
                    EB.Notification.hidePopup();
                }, 10000);
            });

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

        });
    }

    

    it("VT200-0656 |showStatus|", function () {
	
		dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("see if the status message is shown with title , message and hide button label click on hide button to see if the popup is closed");

		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
		_result.waitToRunTest();

        runs(function () {
            EB.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
        });

		//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		_result.waitForResponse();

    });

    it("VT200-0657 |showPopup with Message and title , icon and buttons, with callback for buttton |", function () {
	
		dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("see if the pop up is showing the message, check the result in screen and see three parameters button id,,title and index is displayed or not and then pass");

		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
		_result.waitToRunTest();

        runs(function () {
            var propertyMap = {message: 'This is a pop up for callback', buttons: [
                {id: 'yes', title: 'yes'},
                'No',
                'Cancel'
            ], title: 'MyTitle', icon: '/app/Notification/icon.png'};
            EB.Notification.showPopup(propertyMap, buttonCallback);
        });

		//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		_result.waitForResponse();
    });
	
	if(isAndroidPlatform() && !EB.System.isRhoSimulator){
	
		it("should display a toast message on android when application is in background",function(){

			dispTestCaseRunning(" Call EB.Notification.showStatus with title - Test status_text - This is a status message hide_button_label - Confirm");
			dispExpectedResult("A toast should come when application is in background, once application comes to foreground status message will get displayed.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				EB.Application.minimize();
				setTimeout(function() {
					EB.Notification.showStatus("Test", "This is a status message", "Confirm");
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("Should check the default functionality of showPopup when application is in background.",function(){

			dispTestCaseRunning(" Call EB.Notification.showPopup(\n {title:'Displaying a pop up',\n message: 'Message will get display in notification bar and dialog will get displayed when comes to foreground', \n icon: 'info'} , \n function(params) {});");
			dispExpectedResult("A notification should come in notification bar containing messages and Popup will get displayed when app will come to foreground.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				EB.Application.minimize();
				setTimeout(function() {
					EB.Notification.showPopup({
							title:"Displaying a pop up",
							message:"Message will get display in notification bar and dialog will get displayed when comes to foreground",
							icon: "info",
							buttons: [{id: 'ok', title: 'ok'}]},
						function(params) {}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("should display a notification in notification bar when app is in background when types is only EB.Notification.TYPE_NOTIFICATION.",function(){

			dispTestCaseRunning('Call EB.Notification.showPopup({title:"Displaying a pop up",\n message:"Test Message",\n icon: "info",\n <b>types: [EB.Notification.TYPE_NOTIFICATION]</b>}, function(params) {});');
			dispExpectedResult("Notification should come in notification bar when app is in background. On clicking on notiication the application should come to foreground.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				EB.Application.minimize();
				setTimeout(function() {
					EB.Notification.showPopup({
							message:"Test Message",
							types: [EB.Notification.TYPE_NOTIFICATION]}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("should display user defined icon in notification bar with message ",function(){

			dispTestCaseRunning('Call EB.Notification.showPopup({message:"Test Message",\n <b>types: ["notification"]});');
			dispExpectedResult(jasmine.getEnv().currentSpec.description +"icon: <img src='/app/Notification/icon.png' alt='alert' width='50' height= '50'>");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				EB.Application.minimize();
				setTimeout(function() {
					EB.Notification.showPopup({
							message:"Test Message",
							types: [EB.Notification.TYPE_NOTIFICATION],
							icon: EB.RhoFile.join(EB.Application.modelFolderPath('Notification'), 'icon.png')}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("Should allow to interact with application from notification area without activating the application when types is only notificationDialog.",function(){

			dispTestCaseRunning('Call EB.Notification.showPopup({title:"Displaying a pop up",\n message:"Test Message",\n icon: "info",\n <b>types: ["notificationDialog"]</b>}, function(params) {});');
			dispExpectedResult("showPopup callback should get fired and in test app it's implemented in such a manner, it will display on screen which button got clicked.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				EB.Application.minimize();
				setTimeout(function() {
					EB.Notification.showPopup({
							title:"Displaying a pop up",
							message:"Test Message",
							icon: "info",
							buttons: [{id: 'accept', title: 'yes'},{id: 'cancel', title: 'no'}],
							types: [EB.Notification.TYPE_NOTIFICATION_DIALOG]},
						function(params) {
							buttonCallback(params);
						}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("should display a toast when types is only EB.Notification.TYPE_TOAST",function(){

			dispTestCaseRunning('Call EB.Notification.showPopup({message:"Test Message",<b>types: [EB.Notification.TYPE_TOAST]</b>}); when application is in foreground');
			dispExpectedResult("It should display a toast message whether application is in background or foreground.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				EB.Notification.showPopup({
						message:"Test Message",
						types: [EB.Notification.TYPE_TOAST]}
				);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
	}


});