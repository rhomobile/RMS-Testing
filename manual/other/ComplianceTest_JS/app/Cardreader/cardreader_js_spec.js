var testResult = '';
var captured = false;

describe("Card Reader Test", function() {
	
	var openFlag = false;
	var closeFlag = false;

	beforeEach(function() {
		openFlag = false;
		testResult = '';
		captured = false;
		closeFlag = false;
		displayResult("Output: ","");
	});

	var callbackCardReader = function(args) {
		var result = '';
		result += '<br/>Data:- ' + JSON.stringify(args["data"]);
		result += '<br/>Mode:- ' + JSON.stringify(args["mode"]);
	    displayResult("Output: ",result);
    };

	var encrypted_callback =  function (args){
	
		var result = '';
		result += '<br/>Data:- ' + JSON.stringify(args["data"]);
		result += '<br/>Mode:- ' + JSON.stringify(args["mode"]);
		result += '<br/>Encryption:- ' + JSON.stringify(args["encryption"]);
		result += '<br/>RawData:- ' + JSON.stringify(args["rawData"]);
		result += '<br/>Track1:- ' + JSON.stringify(args["track1"]);
		result += '<br/>Track2:- ' + JSON.stringify(args["track2"]);
		result += '<br/>Track3:- ' + JSON.stringify(args["track3"]);
		result += '<br/>Track1Status:- ' + JSON.stringify(args["track1Status"]);
		result += '<br/>Track2Status:- ' + JSON.stringify(args["track2Status"]);
		result += '<br/>Track3Status:- ' + JSON.stringify(args["track3Status"]);
		result += '<br/>Track1Encrypted:- ' + JSON.stringify(args["track1Encrypted"]);
		result += '<br/>Track2Encrypted:- ' + JSON.stringify(args["track2Encrypted"]);
		result += '<br/>Track3Encrypted:- ' + JSON.stringify(args["track3Encrypted"]);
		result += '<br/>Track1EncryptedStatus:- ' + JSON.stringify(args["track1EncryptedStatus"]);
		result += '<br/>Track2EncryptedStatus:- ' + JSON.stringify(args["track2EncryptedStatus"]);
		result += '<br/>Track3EncryptedStatus:- ' + JSON.stringify(args["track3EncryptedStatus"]);
		result += '<br/>Ksn:- ' + JSON.stringify(args["ksn"]);

	   displayResult("Output: ",result);
	};

	var enumcallback = function (args){
		displayResult('DefautlInstance:- ',JSON.stringify(args));
	};
  
	
	it("VT200-0408 | MSR Card data All Tracks with sync callback |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT200-0408 - MSR Card data All Tracks with sync callback - before swiping card put the cursor inside the text box");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '12sec wait to open the CardReader', 12000);
		
		runs(function()
		{
			dispExpectedResult("Please swipe a card. Readevent should be fired and Mode should be returned as CR and Data should contain all 3 tracks data");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			Rho.CardReader.close();
			dispExpectedResult("Please wait 5 seconds for the Card Reader to close");
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
	    });

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	it("VT200-0409 | MSR Card data All Tracks |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT200-0409 - MSR Card data All Tracks");
            dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '12sec wait to open the CardReader', 12000);
		
		runs(function()
		{
			dispExpectedResult("Please swipe a card. Readevent should be fired and Mode should be returned as CR and Data should contain all 3 tracks data");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			Rho.CardReader.close();
			dispExpectedResult("Please wait 5 seconds for the Card Reader to close");
			setTimeout(function() {
				closeFlag = true;
			}, 5000);
	    });

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	if(Rho.System.platform == 'WINDOWS')
	{
		it("VT200-0410 | pinEntry true DCR only", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT200-0410 - pinEntry true DCR only and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '12sec wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.pinEntry=true;
                dispExpectedResult("Please swipe a financial card. after card swipe It should ask for enter the pin and User should get the encrypted data and pin");
			});
	
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				Rho.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	}

	if(Rho.System.platform == 'ANDROID')
	{
		it("VT200-0411 |encryption encrypted with financial card|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT200-0411 |encryption encrypted with financial card");
				//Rho.CardReader.open({},encrypted_callback);
				Rho.CardReader.open(encrypted_callback);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '12sec wait to open the CardReader', 12000);
	
			runs(function()
			{
	            dispExpectedResult("Please swipe financial card. Event should get fire and encryption value should get returned as encrypted Note - encryption filed will always return as ecrypted for encrypted card reader head");
			});
	
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
			});
	
		});
	}

	it("VT286-0521 | AutoEnter true", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0521 - AutoEnter true");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '12sec wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
            dispExpectedResult("Please select the text area and swipe a card. Enter should  be appended to any data returned as keystrokes by the Card Reader");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			Rho.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});
});