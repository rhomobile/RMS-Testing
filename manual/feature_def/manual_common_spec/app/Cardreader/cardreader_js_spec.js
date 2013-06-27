var testResult = '';
var captured = false;

describe("Card Reader Test", function() {
	
	var openFlag = false;
	var swipeFlag = false;
	var closeFlag = false;

	beforeEach(function() {
		openFlag = false;
		swipeFlag = false;
		testResult = '';
		captured = false;
		closeFlag = false;
		displayResult("Output: ","");
	});

	var callbackCardReader = function (args){
		var result = '';
		result += '<br/>Data:- ' + JSON.stringify(args["data"]);
		result += '<br/>Mode:- ' + JSON.stringify(args["mode"]);
	    displayResult("Output: ",result);
        }

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
	}

		var enumcallback = function (args){
		displayResult('DefautlInstance:- ',JSON.stringify(args));
        }

	it("VT286-0094 | getDefault method |", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-0094 - Call getDefault method");
            dispExpectedResult("getDefault should return Default object of Module ");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});
		runs(function()
		{
			displayResult('DATA:- ',JSON.stringify(Rho.CardReader.getDefault()));
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});
	
	it("VT286-0096 | enumerate method with callback|", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-0096 - enumerate method with callback");
            dispExpectedResult("It should return Array of Card reader objects ");
			Rho.CardReader.enumerate(enumcallback);
			
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

/*	it("VT286-0095 | setDefault method |", function() {
		runs(function()
		{
		    var mynum = new Array();
			mynum = Rho.CardReader.enumerate();
			displayResult('DATA:- ',JSON.stringify(mynum["cardreaderArray"]));
			//Rho.CardReader.setDefault(mynum);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0095 | setDefault method");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});
	
	it("VT286-0207 | enumerate method without callback|", function() {
		runs(function()
		{
		    var mynum = new Array();
			mynum= Rho.CardReader.enumerate();
			displayResult('DATA:- ',JSON.stringify(mynum[0]));
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0207 | enumerate method without callback");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	}); */

	it("VT286-0125 | Swipe a Card after clearAllproperties |", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-00125 - Swipe a Card after clearAllproperties - before swiping card put the cursor inside the text box");
            dispExpectedResult("Enter should not be appended on card Data returned with keystroke ");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			Rho.CardReader.clearAllProperties();
		});
		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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
	
	it("VT286-0127 | MSR Card data All Tracks |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0127 - MSR Card data All Tracks");
            dispExpectedResult("Readevent should be fired and Mode should be returned as CR and Data should contain all 3 tracks data");
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0128 | MSR Card data All Tracks with sync callback |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0128 - MSR Card data All Tracks with sync callback - before swiping card put the cursor inside the text box");
            dispExpectedResult("Readevent should be fired and Mode should be returned as CR and Data should contain all 3 tracks data");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0129 | MSR Card data All Tracks with ananymous callback |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0129 - MSR Card data All Tracks with ananymous callback");
            dispExpectedResult("Readevent should be fired and Mode should be returned as CR and Data should contain all 3 tracks data");
			//Rho.CardReader.open({},function(data){displayResult('DATA :- ',JSON.stringify(data));});
			Rho.CardReader.open(function(data){displayResult('DATA :- ',JSON.stringify(data));});
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);


		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0130 | MSR Card data Card with only Track1 |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0130 - MSR Card data Card with only Track1");
            dispExpectedResult("Readevent should be fired and Mode should be returned as CR and Data should contain only track1 data");
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

/*	it("VT286-0131 |Proper Modulename |", function() {

		runs(function()
		{
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0131 |Proper Modulename ");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.moduleName="msr7000";
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0134 | Without setting the Modulename |", function() {

		runs(function()
		{
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0134 | Without setting the Modulename");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	});*/

	it("VT286-0136 | MSR Close |", function() {
		runs(function()
		{
			dispTestCaseRunning("VT286-0136 - MSR Close)");
            dispExpectedResult("Readevent should not fire because msr is closed");
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.close();
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

    it("VT286-0137 | Checking MSR Open |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0137 - Checking MSR Open- before swiping card put the cursor inside the text box");
            dispExpectedResult("Data should be returned as keystrokes inside the textbox");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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
	
	it("VT286-0138 | AutoEnter ture |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0138 - AutoEnter ture- before swiping card put the cursor inside the text box");
            dispExpectedResult("Enter should  be appended to any data returned as keystrokes by the Card Reader");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0139 | AutoEnter false |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0139 - AutoEnter false- before swiping card put the cursor inside the text box");
            dispExpectedResult("Enter should not be appended to any data returned as keystrokes by the Card Reader");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=false;
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0142 | AutoTab true |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0142 - Autotab true- before swiping card put the cursor inside the text box");
            dispExpectedResult("tab should be appended to any data returned as keystrokes by the Card Reader It should take the control to next UI control");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoTab=true;
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0143 | AutoTab false |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0143 - Autotab false- before swiping card put the cursor inside the text box");
            dispExpectedResult("tab should not be appended to any data returned as keystrokes by the Card Reader It should take the control to next UI control");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoTab=false;
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	it("VT286-0146 | AutoEnter and Autotab both true |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0146 - AutoEnter and Autotab both true - before swiping card put the cursor inside the text box");
            dispExpectedResult("When both are true Autoenter functionalty should work so It should take the control to next line");
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			Rho.CardReader.autoTab=true;
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

	if(Rho.System.platform == 'WINDOWS')
	{
		it("VT286-0147 | PinEntry true DCR only|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0147 - PinEntry true DCR only and swipe financial card only");
                dispExpectedResult("after card swipe It should ask for enter the pin and User should get the encrypted data and pin");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0148 | PinEntry false DCR only|", function() {
	
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0148 - PinEntry false DCR only and swipe financial card only");
                dispExpectedResult("mode should return as CR for the first time PIN entry is false so PIN Entry screen in the DCR unit should not be active");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=false;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0151 | Pintimeout Default |", function() {
		
			runs(function()
			{
				dispTestCaseRunning("VT286-0151 - Pintimeout Default DCR only and swipe financial card only");
                dispExpectedResult("swipe the card Do not enter the pin before 30seconds so pintimeout should occure");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0152 | PinEntry true and pintimeout 20 sec |", function() {
		
			runs(function()
			{
				dispTestCaseRunning("VT286-0152 - Pintimeout to 20 seconds DCR only and swipe financial card only");
                dispExpectedResult("swipe the card Do not enter the pin before 20seconds so pintimeout should occure");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=20000;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
	    it("VT286-0153 | Do the PinEntry before pintimeout after 30 seconds |", function() {
	
			runs(function()
			{
                dispTestCaseRunning("VT286-0153 - Do the PinEntry after 30 sedonds of pintimeout applicable only DCR and swipe financial card only");
                dispExpectedResult("swipe the card enter the pin before 30seconds and it should return ecrypted data");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0154 | Pintimeout set to 15000 enter the pin within 15 seconds|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0154 - Do the PinEntry before 15 seconds of pintimeout applicable only DCR and swipe financial card only");
                dispExpectedResult("swipe the card enter the pin before 15seconds so pintimeout should return ecrypted data");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=5000;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0155 | Pintimeout set to 15000 Do not enter the pin within 15 seconds|", function() {
	
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0155 - Do not enter the pin within 15 seconds and pintimeout applicable only DCR and swipe financial card only");
                dispExpectedResult("Do not enter the pin within 15 seconds so pintimout should occure");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=5000;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0156 | Pintimeout set to 65535 <br/> enter the pin within 65 seconds|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0156 - enter the pin within 65 seconds and pintimeout applicable only DCR and swipe financial card only");
                dispExpectedResult("swipe the card enter the pin before 65seconds so pintimeout should return ecrypted data");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=65535;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0157 | Pintimeout set to 65535 Do not enter the pin within 65 seconds|", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0157 - Do not enter the pin within 65 seconds and pintimeout applicable only DCR and swipe financial card only");
                dispExpectedResult("Do not enter the pin within 65 seconds so pintimout should occure");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=65535;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0158 | Pintimeout set to 0 |", function() {
	
			runs(function()
			{
				dispTestCaseRunning("VT286-0158 - Pintimeout set to 0");
                dispExpectedResult("Pinentry screen should be timed out as soon as card data is received");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=0;
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0162 | PANData set to 1111222233334444 |", function() {
			runs(function()
			{
				dispTestCaseRunning("VT286-0162 - PANData set to 1111222233334444");
                dispExpectedResult("PANData should be returned as 1111222233334444 with encrypted data");
				//Rho.CardReader.open({},callbackCardReader);
				Rho.CardReader.open(callbackCardReader);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				Rho.CardReader.PinEntry=true;
				Rho.CardReader.pinTimeout=12000;
				Rho.CardReader.panData==1111222233334444; 
				setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
		it("VT286-0166 |Test cardreader with swiping different tracks of cards |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0166 - Test cardreader with swiping different tracks of cards");
            dispExpectedResult("MSR Card data should be returned when card is swiped and Mode should be returned as CR for all the swipes");
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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

		it("VT286-0168 |Suspend and Resume device 5 times then swipe the card |", function() {

		runs(function()
		{
			dispTestCaseRunning("VT286-0168 - Suspend and Resume device 5 times then swipe the card");
            dispExpectedResult("MSR should able to read the track data.");
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			    setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

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
		it("VT286-0169 |encryption encrypted |", function() {
	
			runs(function()
			{
				//Rho.CardReader.open({},encrypted_callback);
				Rho.CardReader.open(encrypted_callback);
				setTimeout(function() {
					openFlag = true;
				}, 11000);
			});
	
			waitsFor(function()
			{
				dispCurrentProcess("VT286-0169 |encryption encrypted");
				return openFlag;
			}, '5sec Wait to open the CardReader', 12000);
	
			runs(function()
			{
				    setTimeout(function() {
					swipeFlag = true;
				}, 5000);
			});
	
			waitsFor(function()
			{
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
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
	
	    it("VT286-0171 | encrypted data in financial card |", function() {
			waitsFor(function()
			{
				dispCurrentProcess("VT286-0171 | encrypted data in financial card");
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});
	
		it("VT286-0173 | rawdata with financial card |", function() {
			waitsFor(function()
			{
				dispCurrentProcess("VT286-0173 | rawdata with financial card");
				return captured;
			}, '5sec Wait to open the CardReader', 25000);
	
			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0174 | track1Status true |", function() {
			waitsFor(function()
			{
			dispCurrentProcess(" VT286-0174 | track1Status true");
			return captured;
			}, '5sec Wait to open the CardReader', 25000);

			runs(function()
			{
			expect(testResult).toEqual(true);
			});
	    });

		it("VT286-0175 | track2Status true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0175 | track2Status true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0176 | track3Status true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0176 | track3Status true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0177 | track1EncryptedStatus true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0177 | track1EncryptedStatus true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0178 | track2EncryptedStatus true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0178 | track2EncryptedStatus true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0179 | track3EncryptedStatus true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0179 | track3EncryptedStatus true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0180 | track1Status and track2Status  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0180 | track1Status and track2Status  true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0181 | track1Status and track3Status  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0181 | track1Status and track3Status  true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0182 | track2Status and track3Status  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0182 | track2Status and track3Status  true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0183 | track2Status track2Status and track3Status  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0183 | track2Status track2Status and track3Status  true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0184 | track1EncryptedStatus and track2EncryptedStatus  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0184 | track1EncryptedStatus and track2EncryptedStatus  true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0185 | track1EncryptedStatus and track3EncryptedStatus  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess("VT286-0185 | track1EncryptedStatus and track3EncryptedStatus true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0186 | track2EncryptedStatus and track3EncryptedStatus  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0186 | track2EncryptedStatus and track3EncryptedStatus true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0187 | track1EncryptedStatus track2EncryptedStatus and track3EncryptedStatus  true |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0187 | track1EncryptedStatus track2EncryptedStatus and track3EncryptedStatus  true");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0188 | Card with only Track1 |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0188 | Card with only Track1");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0189 | Card with only Track2 |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0189 | Card with only Track2");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0190 | Card with only Track3 |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0190 | Card with only Track3");
				return captured;
			}, '5sec Wait to open the CardReader', 25000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0191 | Card with only track1 and Track2 data |", function() {
			waitsFor(function()
			{
			dispCurrentProcess(" VT286-0191 | Card with only track1 and Track2 data");
			return captured;
			}, '5sec Wait to open the CardReader', 25000);

			runs(function()
			{
			expect(testResult).toEqual(true);
			});
		});

		it("VT286-0192 | Card with only track1 and Track3 data |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0192 | Card with only track1 and Track3 data");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0193 | Card with only track2 and Track3 data |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0193 | Card with only track2 and Track3 data");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0194 | Card with all three track data |", function() {
		waitsFor(function()
		{
			dispCurrentProcess(" VT286-0194 | Card with all three track data");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
		});

		it("VT286-0195 | Card with only Track1 |", function() {
			waitsFor(function()
			{
				dispCurrentProcess("VT286-0195 | Card with only Track1");
				return captured;
			}, '5sec Wait to open the CardReader', 25000);

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
			}, '5sec Wait to open the CardReader', 25000);

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
			}, '5sec Wait to open the CardReader', 25000);

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
			}, '5sec Wait to open the CardReader', 25000);

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
			}, '5sec Wait to open the CardReader', 25000);

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
			}, '5sec Wait to open the CardReader', 25000);

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
			}, '5sec Wait to open the CardReader', 25000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0202 | ksn number with non financial card |", function() {
			waitsFor(function()
			{
				dispCurrentProcess(" VT286-0202 | ksn number with non financial card");
				return captured;
			}, '5sec Wait to open the CardReader', 25000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT286-0203 | ksn number with financial card |", function() {
			waitsFor(function()
			{
				dispCurrentProcess("VT286-0203 | ksn number with financial card");
				return captured;
			}, '5sec Wait to open the CardReader', 25000);

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
	
});