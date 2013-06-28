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
			dispCurrentProcess("VT286-0094 | getDefault method");
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
			Rho.CardReader.enumerate(enumcallback);
			
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0096 | enumerate method with callback");
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
/*
	it("VT286-0095 | setDefault method |", function() {
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

	});
*/
	it("VT286-0125 | Swipe a Card after clearAllproperties |", function() {
		runs(function()
		{
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0125 | Swipe a Card after clearAllproperties");
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
	
	xit("VT286-0126 | Swipe a Card after clearAllproperties with readEvent |", function() {

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
			dispCurrentProcess("VT286-0126 | Swipe a Card after clearAllproperties with readEvent");
			return openFlag;
		}, '12 sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoTab=true;
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0127 | MSR Card data All Tracks");
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0128 | MSR Card data All Tracks with synch callback");
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
			//Rho.CardReader.open({},function(data){displayResult('DATA :- ',JSON.stringify(data));});
			Rho.CardReader.open(function(data){displayResult('DATA :- ',JSON.stringify(data));});
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0129 | MSR Card data All Tracks with ananymous callback ");
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0130 | MSR Card data Card with only Track1");
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

	it("VT286-0131 |Proper Modulename |", function() {

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

	xit("VT286-0132 | Invalid Modulename E.g:-MSR7000 for MSR9500 unit |", function() {

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
			dispCurrentProcess("VT286-0132 | Invalid Modulename E.g:-MSR7000 for MSR9500 unit");
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

	xit("VT286-0133 | Empty Modulename |", function() {
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
			dispCurrentProcess("VT286-0133 | Empty Modulename");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.moduleName=" ";
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

	});

    xit("VT286-0135 | swiping the card Without opening the MSR |", function() {
		runs(function()
		{
			setTimeout(function() {
				swipeFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0135 | swiping the card Without opening the MSR");
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

	it("VT286-0136 | MSR Close |", function() {
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
			dispCurrentProcess("VT286-0136 | MSR Close");
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0137 | Checking MSR Open");
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0138 | AutoEnter ture");
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0139 | AutoEnter false");
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

	xit("VT286-0140 | AutoEnter Invalid String |", function() {

		runs(function()
		{
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0140 | AutoEnter Invalid String");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=aaa;
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

	xit("VT286-0141 | AutoEnter empty String |", function() {

		runs(function()
		{
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0141 | AutoEnter empty String");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter='';
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0142 | AutoTab true");
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0143 | AutoTab false");
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

	xit("VT286-0144 | AutoTab invalid string |", function() {

		runs(function()
		{
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0144 | AutoTab invalid string");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoTab='aaa';
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

	xit("VT286-0145 | AutoTab empty string |", function() {

		runs(function()
		{
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0145 | AutoTab empty string");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoTab='';
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
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0146 | AutoEnter and Autotab both true");
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

	it("VT286-0147 | PinEntry true DCR only|", function() {

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
			dispCurrentProcess("VT286-0147 | PinEntry true DCR only");
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0148 | PinEntry false DCR only");
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

	xit("VT286-0149 | PinEntry Invalid string DCR only|", function() {


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
			dispCurrentProcess("VT286-0149 | PinEntry Invalid string DCR only");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=aaa;
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

	xit("VT286-0150 | PinEntry empty string |", function() {

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
			dispCurrentProcess("VT286-0150 | PinEntry empty string");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=' ';
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0151 | Pintimeout Default");
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

	it("VT286-0152 | PinEntry false and pintimeout 20 sec |", function() {


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
			dispCurrentProcess("VT286-0152 | PinEntry false and pintimeout 20 sec");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=false;
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

    it("VT286-0153 | Do the PinEntry after pintimeout after 30 seconds |", function() {

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
			dispCurrentProcess("VT286-0153 | Do the PinEntry after pintimeout after 30 seconds");
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

	it("VT286-0154 | Pintimeout set to 5000 enter the pin within 15 seconds|", function() {

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
			dispCurrentProcess("VT286-0154 | Pintimeout set to 5000 <br/> enter the pin within 15 seconds");
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

	it("VT286-0155 | Pintimeout set to 5000 Do not enter the pin within 15 seconds|", function() {


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
			dispCurrentProcess("VT286-0155 | Pintimeout set to 5000 <br/> Do not enter the pin within 15 seconds");
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0156 | Pintimeout set to 65535 enter the pin within 65 seconds");
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0157 | Pintimeout set to 65535 <br/> Do not enter the pin within 65 seconds");
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0158 | Pintimeout set to 0");
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

	xit("VT286-0159 | Pintimeout set to -1 invalid value|", function() {

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
			dispCurrentProcess("VT286-0159 | Pintimeout set to -1 invalid value");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=-1;
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

	xit("VT286-0160 | Pintimeout set to invalid string|", function() {

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
			dispCurrentProcess("VT286-0160 | Pintimeout set to invalid string");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout='aaaa';
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

	xit("VT286-0161 | Pintimeout set to empty value|", function() {
        
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
			dispCurrentProcess("VT286-0161 | Pintimeout set to empty value");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout='';
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

	it("VT286-0162 | PANData set to 1111222233334444 Do not enter the pin within 65 seconds|", function() {
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
			dispCurrentProcess("VT286-0162 | PANData set to 1111222233334444<br/> Do not enter the pin within 65 seconds");
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

	xit("VT286-0163 | PANData set to 11111111aaaaaaaa |", function() {


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
			dispCurrentProcess("VT286-0163 | PANData set to 11111111aaaaaaaa");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=12000;
			Rho.CardReader.panData="11111111aaaaaaaa"; 
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

	it("VT286-0164 | PANData set to 1 |", function() {
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
			dispCurrentProcess("VT286-0164 | PANData set to 1");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=12000;
			Rho.CardReader.panData=1; 
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

	xit("VT286-0165 | PANData set to empty value |", function() {
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
			dispCurrentProcess("VT286-0165 | PANData set to empty value");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=12000;
			Rho.CardReader.panData=''; 
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0166 |Test cardreader with swiping <br/>different tracks of cards");
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

	xit("VT286-0167 |Card Reader with licensing screen |", function() {

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
			dispCurrentProcess("VT286-0167 |Card Reader with licensing screen");
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
			//Rho.CardReader.open({},callbackCardReader);
			Rho.CardReader.open(callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0168 |Suspend and Resume device<br> 5 times then swipe the card ");
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

//Walgreen Test only applicable on android device
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

	xit("VT286-0170 | encryption unencrypted |", function() {

		waitsFor(function()
		{
			dispCurrentProcess("VT286-0170 | encryption unencrypted");
			return captured;
		}, '5sec Wait to open the CardReader', 25000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

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

	xit("VT286-0172 | rawdata with non financial card |", function() {
		waitsFor(function()
		{
			dispCurrentProcess("VT286-0172 | rawdata with non financial card");
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
	
});