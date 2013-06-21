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

	var callbackCardReader = function (data){
		
		displayResult('DATA:- ',JSON.stringify(data));
	}

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
			dispCurrentProcess("Opening CardReader");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			Rho.CardReader.clearAllProperties();
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0126 | Swipe a Card after clearAllproperties with readEvent |", function() {

		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '12 sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.autoTab=true;
			Rho.CardReader.clearAllProperties();

		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},function(data){displayResult('DATA :- ',JSON.stringify(data));});
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async anonymous callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);


		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			dispCurrentProcess("Opening CardReader");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0150 | PinEntry empty string |", function() {

		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0154 | Pintimeout set to 5000 <br/> enter the pin within 15 seconds|", function() {

		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0155 | Pintimeout set to 5000 <br/> Do not enter the pin within 15 seconds|", function() {


		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0157 | Pintimeout set to 65535 <br/> Do not enter the pin within 65 seconds|", function() {

		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0162 | PANData set to 1111222233334444<br/> Do not enter the pin within 65 seconds|", function() {
		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=30000;
			Rho.CardReader.panData==1111222233334444; 
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=30000;
			Rho.CardReader.panData=11111111aaaaaaaa; 
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=30000;
			Rho.CardReader.panData=1; 
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 12000);

		runs(function()
		{
			Rho.CardReader.PinEntry=true;
			Rho.CardReader.pinTimeout=30000;
			Rho.CardReader.panData=''; 
			setTimeout(function() {
				swipeFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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

	it("VT286-0169 |Suspend and Resume device 5 times then swipe the card |", function() {

		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 11000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
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
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return captured;
		}, '5sec Wait to open the CardReader', 30000);

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