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
  

	it("VT286-0094 | getDefault method |", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-0094 - Call getDefault method");
            dispExpectedResult("has the default object been displayed in the result field?");
			EB.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});
		runs(function()
		{
			displayResult('DATA:- ',JSON.stringify(EB.CardReader.getDefault()));
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
	
	it("VT286-0096 | enumerate method with callback|", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-0096 - enumerate method with callback");
            dispExpectedResult("has an Array of Card reader objects been shown in the display field");
			EB.CardReader.enumerate(enumcallback);
		});

		waitsFor(function()
		{
			return captured;
		}, '25sec Wait to enumerate the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
//			EB.CardReader.close();
//			setTimeout(function() {
//				closeFlag = true;
//			}, 5000);
		});

//		waitsFor(function()
//		{
//		   return closeFlag;
//		},'5sec Wait to close the CardReader', 6000);

	});

/*	it("VT286-0095 | setDefault method |", function() {
		runs(function()
		{
		    var mynum = new Array();
			mynum = EB.CardReader.enumerate();
			displayResult('DATA:- ',JSON.stringify(mynum["cardreaderArray"]));
			//EB.CardReader.setDefault(mynum);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0095 | setDefault method");
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});
	
	it("VT286-0207 | enumerate method without callback|", function() {
		runs(function()
		{
		    var mynum = new Array();
			mynum= EB.CardReader.enumerate();
			displayResult('DATA:- ',JSON.stringify(mynum[0]));
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0207 | enumerate method without callback");
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
				closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	}); */

//	it("VT286-0125 | Swipe a Card after clearAllproperties |", function() {
//		runs(function()
//		{
//			dispTestCaseRunning("VT286-00125 - Swipe a Card after clearAllproperties - before swiping card put the cursor inside the text box");
//            dispExpectedResult("Enter should not be appended on card Data returned with keystroke ");
//			EB.CardReader.open();
//			setTimeout(function() {
//				openFlag = true;
//			}, 11000);
//		});
//
//		waitsFor(function()
//		{
//			return openFlag;
//		}, '12sec wait to open the CardReader', 12000);
//
//		runs(function()
//		{
//			EB.CardReader.autoEnter=true;
//			EB.CardReader.clearAllProperties();
//		});
//		waitsFor(function()
//		{
//			return captured;
//		}, 'user did not respond', 240000);
//
//		runs(function()
//		{
//			expect(testResult).toEqual(true);
//			EB.CardReader.close();
//			setTimeout(function() {
//				closeFlag = true;
//			}, 5000);
//		});
//
//		waitsFor(function()
//		{
//		   return closeFlag;
//		},'5sec Wait to close the CardReader', 6000);
//
//	});
	
	it("VT286-0127 | MSR Card data All Tracks |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0127 - MSR Card data All Tracks");
            dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			//EB.CardReader.open({},callbackCardReader);
			EB.CardReader.open(callbackCardReader);
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
			EB.CardReader.close();
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

	it("VT286-0128 | MSR Card data All Tracks with sync callback |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0128 - MSR Card data All Tracks with sync callback - before swiping card put the cursor inside the text box");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
			EB.CardReader.close();
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

	it("VT286-0129 | MSR Card data All Tracks with anonymous callback |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0129 - MSR Card data All Tracks with ananymous callback");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			//EB.CardReader.open({},function(data){displayResult('DATA :- ',JSON.stringify(data));});
			EB.CardReader.open(function(data){displayResult('DATA :- ',JSON.stringify(data));});
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
			EB.CardReader.close();
			setTimeout(function() {
				closeFlag = true;
			}, 5000);
	    });

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);
	});

	it("VT286-0130 | MSR Card data Card with only Track1 |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0130 - MSR Card data Card with only Track1");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			//EB.CardReader.open({},callbackCardReader);
			EB.CardReader.open(callbackCardReader);
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
			dispExpectedResult("Please swipe a Track1 only card. Readevent should be fired and Mode should be returned as CR and Data should contain only track1 data");
		});
		
		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
	    });

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

/*	it("VT286-0131 |Proper Modulename |", function() {

		runs(function()
		{
			//EB.CardReader.open({},callbackCardReader);
			EB.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0131 |Proper Modulename ");
			return openFlag;
		}, '12sec wait to open the CardReader', 12000);

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
	    });

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	it("VT286-0134 | Without setting the Modulename |", function() {

		runs(function()
		{
			//EB.CardReader.open({},callbackCardReader);
			EB.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0134 | Without setting the Modulename");
			return openFlag;
		}, '12sec wait to open the CardReader', 12000);

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});*/

	it("VT286-0136 | MSR Close |", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-0136 - MSR Close");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			//EB.CardReader.open({},callbackCardReader);
			EB.CardReader.open(callbackCardReader);
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
			EB.CardReader.close();
			dispExpectedResult("Please swipe a card. Readevent should not fire because msr is closed");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

    it("VT286-0137 | Checking MSR Open |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0137 - MSR Open");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
            dispExpectedResult("Please select the text box and swipe a card. Data should be returned as keystrokes inside the textbox");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});	
	
	it("VT286-0138 | AutoEnter true |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0138 - AutoEnter true");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
			EB.CardReader.autoEnter=true;
            dispExpectedResult("Please select the text area and swipe a card. Enter should  be appended to any data returned as keystrokes by the Card Reader");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	it("VT286-0139 | AutoEnter false |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0139 - AutoEnter false");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
			EB.CardReader.autoEnter=false;
            dispExpectedResult("Please select the text area and swipe a card. Enter should not be appended to any data returned as keystrokes by the Card Reader");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	it("VT286-0142 | AutoTab true |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0142 - Autotab true");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
			EB.CardReader.autoTab=true;
			dispExpectedResult("Please select the text area and swipe a card. Tab should be appended to any data returned as keystrokes by the Card Reader It should take the control to next UI control");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	it("VT286-0143 | AutoTab false |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0143 - Autotab false");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
			EB.CardReader.autoTab=false;
			dispExpectedResult("Please select the text area and swipe a card. tab should not be appended to any data returned as keystrokes by the Card Reader It should take the control to next UI control");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	it("VT286-0146 | AutoEnter and Autotab both true |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0146 - AutoEnter and Autotab both true");
			dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
			EB.CardReader.open();
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
			EB.CardReader.autoEnter=true;
			EB.CardReader.autoTab=true;
			dispExpectedResult("Please select the text area and swipe a card. When both are true Autoenter functionalty should work so It should take the control to next line");
		});

		waitsFor(function()
		{
			return captured;
		}, 'user did not respond', 240000);

		runs(function()
		{
			expect(testResult).toEqual(true);
			EB.CardReader.close();
			setTimeout(function() {
			closeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
		   return closeFlag;
		},'5sec Wait to close the CardReader', 6000);

	});

	if(EB.System.platform == 'WINDOWS')
	{
		it("VT286-0147 | pinEntry true DCR only|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0147 - pinEntry true DCR only and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
                dispExpectedResult("Please swipe a financial card. after card swipe It should ask for enter the pin and User should get the encrypted data and pin");
			});
	
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});
	
		it("VT286-0148 | pinEntry false DCR only|", function() {
	
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0148 - pinEntry false DCR only and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=false;
                dispExpectedResult("Please swipe a financial card. Mode should return as CR for the first time PIN entry is false so PIN Entry screen in the DCR unit should not be active");
			});
	
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});
	
		it("VT286-0151 | Pintimeout Default |", function() {
		
			runs(function()
			{
				dispTestCaseRunning("VT286-0151 - Pintimeout Default DCR only and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
                dispExpectedResult("Please swipe a financial card. Do not enter the pin. Wait 30seconds. Does pinTimeout occur?");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '250sec wait for user input', 250000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});
	
		it("VT286-0152 | pinEntry true and pintimeout 20 sec |", function() {
		
			runs(function()
			{
				dispTestCaseRunning("VT286-0152 - Pintimeout to 20 seconds DCR only and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=20000;
				dispExpectedResult("Please swipe a financial card. Do not enter the pin. Does pinTimeout occur after exactly 20 seconds?");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '250sec wait to open the CardReader', 250000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});
	
	    it("VT286-0153 | Do the pinEntry before pintimeout after 30 seconds |", function() {
	
			runs(function()
			{
                dispTestCaseRunning("VT286-0153 - Do the pinEntry after 30 sedonds of pintimeout applicable only DCR and swipe financial card only");
                dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
                dispExpectedResult("Please swipe a financial card and enter the pin before 30seconds. Encrypted data should be returned");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '12sec wait to open the CardReader', 250000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0154 | Pintimeout set to 15000 enter the pin within 15 seconds|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0154 - Do the pinEntry before 15 seconds of pintimeout applicable only DCR and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=5000;
				dispExpectedResult("Please swipe a financial card and enter the pin before 15seconds. Encrypted data should be returned");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '12sec wait to open the CardReader', 250000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0155 | Pintimeout set to 15000 Do not enter the pin within 15 seconds|", function() {

			runs(function()
			{
				dispTestCaseRunning("VT286-0155 - Do not enter the pin within 15 seconds and pintimeout applicable only DCR and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=5000;
				dispExpectedResult("Please swipe a financial card. Do not enter the pin. Does pinTimeout occur after exactly 15 seconds?");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '12sec wait to open the CardReader', 250000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
					closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0156 | Pintimeout set to 65535 <br/> enter the pin within 65 seconds|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0156 - enter the pin within 65 seconds and pintimeout applicable only DCR and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=65535;
                dispExpectedResult("Please swipe a financial card and enter the pin before 65seconds. Is encrypted data shown in the result field?");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '12sec wait to open the CardReader', 250000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
					closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0157 | Pintimeout set to 65535 Do not enter the pin within 65 seconds|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0157 - Do not enter the pin within 65 seconds and pintimeout applicable only DCR and swipe financial card only");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=65535;
                dispExpectedResult("Please swipe a financial card. Do not enter the pin. Does pin timeout occur in 65 seconds?");
			});
	
			waitsFor(function()
			{
				return captured;
			}, '12sec wait to open the CardReader', 500000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
					closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0158 | Pintimeout set to 0 |", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0158 - Pintimeout set to 0");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=0;
				dispExpectedResult("Please swipe a financial card. Pinentry screen should be timed out as soon as card data is received");
			});
	
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0162 | PANData set to 1111222233334444 |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0162 - PANData set to 1111222233334444");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				EB.CardReader.pinEntry=true;
				EB.CardReader.pinTimeout=12000;
				EB.CardReader.panData==1111222233334444; 
				dispExpectedResult("PANData should be returned as 1111222233334444 with encrypted data");
			});
	
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);
	
		});	
	
		it("VT286-0166 |Test cardreader with swiping different tracks of cards |", function() {

			runs(function()
			{
				dispTestCaseRunning("VT286-0166 - Test cardreader with swiping different tracks of cards");
				dispExpectedResult("Please wait 11 seconds for the Card Reader to open");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				dispExpectedResult("MSR Card data should be returned when card is swiped and Mode should be returned as CR for all the swipes");
			});

			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
				setTimeout(function() {
				closeFlag = true;
				}, 5000);
			});

			waitsFor(function()
			{
			   return closeFlag;
			},'5sec Wait to close the CardReader', 6000);

	    });	

		it("VT286-0168 |Suspend and Resume device 5 times then swipe the card |", function() {

			runs(function()
			{
				dispTestCaseRunning("VT286-0168 - Suspend and Resume device 5 times then swipe the card");
				//EB.CardReader.open({},callbackCardReader);
				EB.CardReader.open(callbackCardReader);
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
				dispExpectedResult("Please suspend and resume the device 5 times. Swipe a card. MSR should able to read the track data.");
			});

			waitsFor(function()
			{
				return captured;
			}, '12sec wait to open the CardReader', 250000);

			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
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

	if(EB.System.platform == 'ANDROID')
	{
		it("VT286-0169 |encryption encrypted with financial card|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0169 |encryption encrypted with financial card");
				//EB.CardReader.open({},encrypted_callback);
				EB.CardReader.open(encrypted_callback);
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
	
	    it("VT286-0171 | encrypted data in non financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0171 | encryption encrypted with non financial card");
	            dispExpectedResult("Please swipe a non-financial card. Event should get fire and encryption value should get returned as encrypted Note - encryption filed will always return as ecrypted for encrypted card reader head");
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
	
		it("VT286-0173 | rawdata with financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0173 | rawdata with financial card");
	            dispExpectedResult("event should get fire and rawdata from all the tracks should get returned in HEX format");
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

		it("VT286-0174 | Card with only Track1 financial card |", function() {
			runs(function()
			{
			    dispTestCaseRunning("VT286-0174 | swipe the card having only track1 data only finacial card");
	            dispExpectedResult("Please swipe a Track 1 only financial card. Event should get fire and return value for track1 track1Encrypted track1Status andtrack1Encrtped status should be shown true  and other status should be false");
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

		it("VT286-0175 | Card with only Track2 financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0175 | swipe the card having only track2 data only finacial card");
	            dispExpectedResult("Please swipe a Track 2 only financial card. Event should get fire and return value for track2 track2Encrypted value track2Status andtrack2Encrtped status should be shown true  and other status should be false");
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

		it("VT286-0176 | Card with only Track3 financial card  |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0176 | swipe the card having only track3 data only finacial card");
	            dispExpectedResult("Please swipe a Track 3 only financial card. Event should get fire and return value for track3 track3Encrypted value track3Status and track3Encrtped status should be shown true  and other status should be false");
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

	/*	it("VT286-0177 | track1EncryptedStatus true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0177 | track1EncryptedStatus true swipe the only financial card having trak1 data");
	            dispExpectedResult("event should get fire and only track1EncryptedStatus should be shown true  and other status should be false");
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

		it("VT286-0178 | track2EncryptedStatus true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0178 | track2EncryptedStatus true swipe the only financial card having trak2 data");
	            dispExpectedResult("event should get fire and only track2EncryptedStatus should be shown true  and other status should be false");
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

		it("VT286-0179 | track3EncryptedStatus true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0179 | track3EncryptedStatus true swipe the only financial card having trak3 data");
	            dispExpectedResult("event should get fire and only track3EncryptedStatus should be shown true and other status should be false");
			});
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});*/

		it("VT286-0180 | Card with only Track1 and Track2 financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0180 | swipe the card having only track1 and track2 data only finacial card");
	            dispExpectedResult("Please swipe a Track 1 and 2 only financial card. event should get fire and return value for track1 track2 track1Encrypted track2Encrypted and track1Status track2Status track1Encrtped and track2Encrtped status should be shown true  and other status should be false");
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

		it("VT286-0181 | Card with only Track1 and Track3 financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0180 | swipe the card having only track1 and track3 data only finacial card");
	            dispExpectedResult("Please swipe a Track 1 and 3 only financial card. event should get fire and return value for track1 track3 track1Encrypted track3Encrypted and track1Status track3Status track1Encrtped and track3Encrtped status should be shown true  and other status should be false");
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

		it("VT286-0182 | Card with only Track2 and Track3 financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0180 | swipe the card having only track1 and track3 data only finacial card");
	            dispExpectedResult("Please swipe a Track 2 and 3 only financial card. event should get fire and return value for track2 track3 track2Encrypted track3Encrypted and track2Status track3Status track2Encrtped and track3Encrtped status should be shown true  and other status should be false");
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

		it("VT286-0183 | Card with all three traks financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0180 | swipe the card having all three track of data only finacial card");
	            dispExpectedResult("Please swipe a Track 1, 2 and 3 financial card. event should get fire and return value for data mode encryption rawData track1 track2 track3 track1Encrypted track2Encrypted track3Encrypted and track1Status track2Status track3Status track1Encrtped track2Encrtped and track3Encrtped status should be shown true value for ksn should be shown");
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

	/*	it("VT286-0184 | track1EncryptedStatus and track2EncryptedStatus  true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0184 | track1EncryptedStatus and track2EncryptedStatus true swipe the card having track1 and track2 data");
	            dispExpectedResult("event should get fire and only track1EncryptedStatus and  track2EncryptedStatus should be shown true and other false");
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

		it("VT286-0185 | track1EncryptedStatus and track3EncryptedStatus  true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0185 | track1EncryptedStatus and track3EncryptedStatus true swipe the card having track1 and track3 data");
	            dispExpectedResult("event should get fire and only track1EncryptedStatus and  track3EncryptedStatus should be shown true and other false");
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

		it("VT286-0186 | track2EncryptedStatus and track3EncryptedStatus  true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0186 | track2EncryptedStatus and track3EncryptedStatus true swipe the card having track2 and track3 data");
	            dispExpectedResult("event should get fire and only track2EncryptedStatus and  track3EncryptedStatus should be shown true and other false");
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

		it("VT286-0187 | track1EncryptedStatus track2EncryptedStatus and track3EncryptedStatus  true |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0187 | track1EncryptedStatus track2EncryptedStatus and track3EncryptedStatus true swipe the card having track1 and track3 data");
	            dispExpectedResult("event should get fire and only track1EncryptedStatus track2EncryptedStatus and  track3EncryptedStatus should be shown true ");
			});
			waitsFor(function()
			{				
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});*/

		it("VT286-0188 | Card with only Track1 non finacial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0188 | Card with only Track1 with non financial card only");
	            dispExpectedResult("Please swipe a Track 1 only non-financial card. event should get fire and only track1status should shown true ");
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

		it("VT286-0189 | Card with only Track2 non finacial card  |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0189 | Card with only Track2 with non financial card only");
	            dispExpectedResult("Please swipe a Track 2 only non-financial card. event should get fire and only track2status should shown true ");
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

		it("VT286-0190 | Card with only Track3 non finacial card  |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0190 | Card with only Track3 with non financial card only");
	            dispExpectedResult("Please swipe a Track 3 only non-financial card. Event should get fire and only track3status should shown true ");
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

		it("VT286-0191 | Card with only track1 and Track2 data non finacial card  |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0191 | Card with only Track1 and track2 with non financial card only");
	            dispExpectedResult("Please swipe a Track 1 and 2 only non-financial card. event should get fire and only track1status and track2status should shown true ");
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

		it("VT286-0192 | Card with only track1 and Track3 data non finacial card  |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0192 | Card with only Track1 and track3 with non financial card only");
	            dispExpectedResult("Please swipe a Track 1 and 3 only non-financial card. Event should get fire and only track1status and track3status should shown true ");
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

		it("VT286-0193 | Card with only track2 and Track3 data non finacial card  |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0193 | Card with only Track2 and track3 with non financial card only");
	            dispExpectedResult("Please swipe a Track 2 and 3 only non-financial card. Event should get fire and only track2status and track3status should shown true ");
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

		it("VT286-0194 | Card with all three track data  non finacial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0194 | Card with all three tacks with non financial card only");
	            dispExpectedResult("Please swipe a Track 1, 2 and 3 non-financial card. event should get fire and track1status track2status and track3status should shown true ");
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

	/*	it("VT286-0195 | Card with only Track1 |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0195 | Card with card only");
	            dispExpectedResult("event should get fire and track1status track2status and track3status should shown true ");
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

		it("VT286-0196 | Card with only Track2 |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0196 | Card with only Track2");
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0197 | Card with only Track3 |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0197 | Card with only Track3");
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0198 | Card with only track1 and Track2 data |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0198 | Card with only track1 and Track2 data");
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0199 | Card with only track1 and Track3 data |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0199 | Card with only track1 and Track3 data");
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0200 | Card with only track2 and Track3 data |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0200 | Card with only track2 and Track3 data");
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0201 | Card with all three track data |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0201 | Card with all three track data");
				return captured;
			}, 'user did not respond', 240000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});*/

		it("VT286-0202 | ksn number with non financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0202 | swipe non financial card having any track data");
	            dispExpectedResult("Please swipe a non-financial card. Event should get fire and ksn number field should be empty");
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

		it("VT286-0203 | ksn number with financial card |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0203 | swipe financial card having any track data");
	            dispExpectedResult("Please swipe a financial card. Event should get fire and ksn number should be shown in HEX format which should be a part of Raw Data ");
			});
			
			waitsFor(function()
			{
				return captured;
			}, 'user did not respond', 240000);
			//TODO wont work
			runs(function()
			{
				expect(testResult).toEqual(true);
				EB.CardReader.close();
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
});