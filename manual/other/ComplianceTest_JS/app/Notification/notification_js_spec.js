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

	if ((isWindowsMobilePlatform() || isAndroidPlatform()) && !Rho.System.isRhoSimulator) 
	{
		it("VT200-0395 |Beep for 5 secs and with volume 3 with 1000 hz|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Beeper will be started if its applicable for the Device <br/> Beeper should sound for 5 secs and with volume 3 and frequency 1000");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function () {
				Rho.Notification.beep({frequency: 1000, volume: 3, duration: 5000});
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
			
		});

		it("VT200-0396 | Play File - Mp3 file with media type|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("MP3 file should be played");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function () {
				Rho.Notification.playFile(Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'media1.mp3'), '.mp3');
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
			
		});

		it("VT200-0398|Vibrate with duration 15 sec for Android; 25 secs for other platform|", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("If Android Platform value passed 15000 (15 secs)<br/> Other Platform value passed 25000(25 secs)<br/>Device should vibrate for seconds that passed to vibrate method");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
			runs(function () {
				var time = isAndroidPlatform() ? 15000:25000
				Rho.Notification.vibrate(time);
			});
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
			
		});
	}

	it("VT200-0399 | showStatus ", function () {
	
		dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("see if the status message is shown with title , message and hide button label click on hide button to see if the popup is closed");

		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
		_result.waitToRunTest();

        runs(function () {
            Rho.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
        });

		//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		_result.waitForResponse();

    });

    if (Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.platform == "WINDOWS" || Rho.System.isRhoSimulator) {
        it("VT200-0400 | show popup- with buttons and callback |", function () {
		
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult("Click on runtest then wait for the pop up and then after 10 sec hide pop up is called. <br/> see if the pop up is showing the message, then it hides automatically after 10sec");
	
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

            runs(function () {
                Rho.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
                setTimeout(function () {
                    Rho.Notification.hidePopup();
                }, 10000);
            });
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

        });
    } 
    else 
    {
        it("VT200-0400 |show popup- with buttons and callback |", function () {
		
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
                Rho.Notification.showPopup(propertyMap);

                setTimeout(function () {
                    Rho.Notification.hidePopup();
                }, 10000);
            });

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

        });
    }

    it("VT200-0540 | showPopup with Message and title , icon and buttons, with callback for buttton |", function () {
	
		dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("See if the pop up is showing the message, check the result in screen and see three parameters button id,,title and index is displayed or not and then pass");

		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
		_result.waitToRunTest();

        runs(function () {
            var propertyMap = {message: 'This is a pop up for callback', buttons: [
                {id: 'yes', title: 'yes'},
                'No',
                'Cancel'
            ], title: 'MyTitle', icon: '/app/Notification/icon.png'};
            Rho.Notification.showPopup(propertyMap, buttonCallback);
        });

		//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		_result.waitForResponse();
    });
	
	if(isAndroidPlatform() && !Rho.System.isRhoSimulator){
	
		it("VT200-0534 Should display a toast message on android when application is in background",function(){

			dispTestCaseRunning("VT200-0534 Call Rho.Notification.showStatus with title - Test status_text - This is a status message hide_button_label - Confirm");
			dispExpectedResult("A toast should come when application is in background, once application comes to foreground status message will get displayed.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				Rho.Application.minimize();
				setTimeout(function() {
					Rho.Notification.showStatus("Test", "This is a status message", "Confirm");
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("VT200-0535 Should check the default functionality of showPopup when application is in background.",function(){

			dispTestCaseRunning("VT200-0535 Call Rho.Notification.showPopup(\n {title:'Displaying a pop up',\n message: 'Message will get display in notification bar and dialog will get displayed when comes to foreground', \n icon: 'info'} , \n function(params) {});");
			dispExpectedResult("A notification should come in notification bar containing messages and Popup will get displayed when app will come to foreground.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				Rho.Application.minimize();
				setTimeout(function() {
					Rho.Notification.showPopup({
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
		
		it("VT200-0536 Should display a notification in notification bar when app is in background when types is only Rho.Notification.TYPE_NOTIFICATION.",function(){

			dispTestCaseRunning('VT200-0536 Call Rho.Notification.showPopup({title:"Displaying a pop up",\n message:"Test Message",\n icon: "info",\n <b>types: [Rho.Notification.TYPE_NOTIFICATION]</b>}, function(params) {});');
			dispExpectedResult("Notification should come in notification bar when app is in background. On clicking on notiication the application should come to foreground.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				Rho.Application.minimize();
				setTimeout(function() {
					Rho.Notification.showPopup({
							message:"Test Message",
							types: [Rho.Notification.TYPE_NOTIFICATION]}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("VT200-0537 Should display user defined icon in notification bar with message ",function(){

			dispTestCaseRunning('VT200-0537 Call Rho.Notification.showPopup({message:"Test Message",\n <b>types: ["notification"]});');
			dispExpectedResult(jasmine.getEnv().currentSpec.description +"icon: <img src='/app/Notification/icon.png' alt='alert' width='50' height= '50'>");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				Rho.Application.minimize();
				setTimeout(function() {
					Rho.Notification.showPopup({
							message:"Test Message",
							types: [Rho.Notification.TYPE_NOTIFICATION],
							icon: Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'icon.png')}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("VT200-0538 Should allow to interact with application from notification area without activating the application when types is only notificationDialog.",function(){

			dispTestCaseRunning('VT200-0538 Call Rho.Notification.showPopup({title:"Displaying a pop up",\n message:"Test Message",\n icon: "info",\n <b>types: ["notificationDialog"]</b>}, function(params) {});');
			dispExpectedResult("showPopup callback should get fired and in test app it's implemented in such a manner, it will display on screen which button got clicked.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				Rho.Application.minimize();
				setTimeout(function() {
					Rho.Notification.showPopup({
							title:"Displaying a pop up",
							message:"Test Message",
							icon: "info",
							buttons: [{id: 'accept', title: 'yes'},{id: 'cancel', title: 'no'}],
							types: [Rho.Notification.TYPE_NOTIFICATION_DIALOG]},
						function(params) {
							buttonCallback(params);
						}
					);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("VT200-0539 Should display a toast when types is only Rho.Notification.TYPE_TOAST",function(){

			dispTestCaseRunning('VT200-0539 Call Rho.Notification.showPopup({message:"Test Message",<b>types: [Rho.Notification.TYPE_TOAST]</b>}); when application is in foreground');
			dispExpectedResult("It should display a toast message whether application is in background or foreground.");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				Rho.Notification.showPopup({
						message:"Test Message",
						types: [Rho.Notification.TYPE_TOAST]}
				);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
	}
});
