/**
 * @author: Steve Sutton, Ben Kennedy
 */
describe("KeyCapture JS API", function()
{
	beforeEach(function()
	{
		hardwareKeysTest.callbackFired = false;
		hardwareKeysTest.callbackFiredResult = null;
		hardwareKeysTest.callbackFiredTimeout = null;
		//getpropertiesdata = '';
	});
	
	describe("Setup", function()
	{
		it("0.1.focuses the RhoElements Window", function()
		{
			Rho.Instrumentation.simulate_touch_event(0, 5, 41);
			Rho.Instrumentation.simulate_touch_event(2, 5, 41);
		});
	});

	if (!isWindowsMobilePlatform) //putting check for WM because of issues in instumentation API for WM
	{
		if(!hardwareKeysTest.isAndroid())//Android doesnt do home key it seems
		{
			describe("HomeKey", function()
			{
				///////////////////////////////////////////////////////////////////////
				// 1. Home key
				///////////////////////////////////////////////////////////////////////

				it("1.1.should check default value of the Home Key", function()
				{
					expect(Rho.KeyCapture.homeKeyValue).toBe('disabled');		
				});

				it("1.2.should set the Home Key to ENTER", function()
				{
					Rho.KeyCapture.homeKeyValue = hardwareKeysTest.enterKey.string; 
					expect(Rho.KeyCapture.homeKeyValue).toBe('' + hardwareKeysTest.enterKey.value);		// ENTER	
				});

				it("1.3.should set the Home Key to disabled", function()
				{
					Rho.KeyCapture.homeKeyValue = 'disabled';
					expect(Rho.KeyCapture.homeKeyValue).toBe('disabled');		
				});

				it("1.4.should set the Home Key to disable", function()
				{
					Rho.KeyCapture.homeKeyValue = 'disable';
					expect(Rho.KeyCapture.homeKeyValue).toBe('disabled');		
				});
				
				it("1.5.should set the Home Key to enabled", function()
				{
					Rho.KeyCapture.homeKeyValue = 'enabled';			
					expect(Rho.KeyCapture.homeKeyValue).toBe('' + hardwareKeysTest.f5Key.value);	// F5	
				});
			
				it("1.6.should set the Home Key to enable", function()
				{
					Rho.KeyCapture.homeKeyValue = 'enable';
					expect(Rho.KeyCapture.homeKeyValue).toBe('' + hardwareKeysTest.f5Key.value);  	// F5	
				});
				
				//Added By ST//
				/* KeyCapture does not supported PROPERTY_BAG
				it("1.7.(VT289-049)set the Home Key to ENTER with setProperties", function()
				{
					Rho.KeyCapture.setProperties({'homeKeyValue':hardwareKeysTest.enterKey.string})
					Rho.KeyCapture.getProperties(['homeKeyValue'],function(data){getpropertiesdata = JSON.stringify(data);});
					expect(getpropertiesdata).toContain('13');
				});

				it("1.8.(VT289-050)set the Home Key to disabled with setProperty", function()
				{
					Rho.KeyCapture.setProperty('homeKeyValue','Disabled');
					Rho.KeyCapture.getProperty("homeKeyValue",function(data){getpropertiesdata = data;});
					expect(getpropertiesdata).toBe('Disabled');		
				});*/
		
				it("1.9.(VT289-051)set the Home Key to enabled with setProperty and without callback", function()
				{
					Rho.KeyCapture.homeKeyValue = 'enabled'
					expect(Rho.KeyCapture.homeKeyValue).toBe('' + hardwareKeysTest.f5Key.value);	// F5	
				});
				
				/* KeyCapture does not support PROPERTY_BAG
				it("1.10.(VT289-052)check for getallproperties", function() {
					Rho.KeyCapture.homeKeyValue = 'disabled';
					Rho.KeyCapture.getAllProperties(function(data){getpropertiesdata = JSON.stringify(data);});
					expect(getpropertiesdata).toContain('disabled');
				});

				it("1.11.(VT289-053)check for getSupportedProperties", function() {
					Rho.KeyCapture.homeKeyValue = hardwareKeysTest.enterKey.string;
					Rho.KeyCapture.getSupportedProperties(function(data){getpropertiesdata = JSON.stringify(data);});
					expect(getpropertiesdata).toContain('13');
				});*/
			});
		}
	}

	if (!isWindowsMobilePlatform) //putting check for WM because of issues in instumentation API for WM
	{		
		describe("captureKey", function()
		{
			///////////////////////////////////////////////////////////////////////
			// 2. Key capture
			///////////////////////////////////////////////////////////////////////
					
			it("2.1.should capture ENTER key when specified with HEX", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true, hardwareKeysTest.enterKey.string);			// ENTER
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.enterKey.value);				// ENTER
				}, "set capture key to ENTER & simulate ENTER key press...");	
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.enterKey.value;
				}, "ERROR: Failed to capture ENTER key", 3000);
				
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.enterKey.string);
				});
			});
			
			it("2.2.should ignore any other key than ENTER", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,hardwareKeysTest.enterKey.string);			// ENTER
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
				}, "set capture key to ENTER & simulate TAB key press...");		
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);
				
				runs(function()
				{
					expect(hardwareKeysTest.callbackFired).toBe(false);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.enterKey.string);
				}, 'expect the callback not to fire');
			});
			
			it("2.3.should capture any key using a lowercase 'all'", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'all');				// Any Key
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
				}, "set capture key to any key & simulate TAB key press...");		
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.tabKey.value;
				}, "ERROR: Failed to capture any key", 3000);
						
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback('all');
				});
			});
			
			it("2.4.should capture any key using an uppercase ALL", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'ALL');				// Any Key
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
				}, "set capture key to any key & simulate TAB key press...");		
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.tabKey.value;
				}, "ERROR: Failed to capture any key", 3000);
								
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
				});
			});
			
			it("2.5.should not capture any key after resetting 'all' keyValue keyCapture", function() {
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'ALL');				// Any Key
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
					setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
				}, "set capture key to ALL, then reset then press TAB");	
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);
				
				runs(function()
				{
					expect(hardwareKeysTest.callbackFired).toBe(false);					
				}, 'expect the callback not to fire');	
			});
			
			it("2.6.should not capture any key after resetting 'all' keyValue keyCapture with mixed letter case", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'ALL');				// Any Key
					hardwareKeysTest.resetCaptureKeyCallback('aLL');
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
					setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
				}, "set capture key to ALL, then reset then press TAB");		
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);
				
				runs(function()
				{
					expect(hardwareKeysTest.callbackFired).toBe(false);					
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
				}, 'expect the callback not to fire');	
			});
			
			it("2.7.should capture multiple keys", function()
			{
				runs(function()
				{
					setTimeout(function()
					{
						hardwareKeysTest.captureKey(false,hardwareKeysTest.enterKey.string);	
						hardwareKeysTest.captureKey(false,hardwareKeysTest.tabKey.string);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.enterKey.value);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);
					},500);
				},'set capture key for ENTER and TAB and simulate key events');
				
				waitsFor(function()
				{
					if(hardwareKeysTest.callbackFiredResult == null) {return false;}
					if((typeof hardwareKeysTest.callbackFiredResult) != 'object') {return false;}
					if(hardwareKeysTest.callbackFiredResult.length != 2) {return false;}
					else{return true;}
				}, "ERROR: MultipleKeys NOT received", 3000);
				
				runs(function()
				{
					//console.log(hardwareKeysTest.callbackFiredResult[0] + ' = 13');
					//console.log(hardwareKeysTest.callbackFiredResult[1] + ' = 8');
					expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(hardwareKeysTest.enterKey.value);
					expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(hardwareKeysTest.tabKey.value);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.enterKey.string);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.tabKey.string);
				}, 'expect both callbacks to fire with each keyValues');
			});
			
			it("2.8.should not capture a key after it has been reset", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,hardwareKeysTest.tabKey.string);				// Any Key
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.tabKey.string);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);},100);				// TAB
					setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1100);// TAB
				}, "set capture key to TAB, then reset then press TAB");		
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);
				
				runs(function()
				{
					expect(hardwareKeysTest.callbackFired).toBe(false);
				}, 'expect the callback not to fire');	
			});
			
			it("2.9.should only fire 'all' callback if both 'all' and a key has been registered", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'ALL');
					hardwareKeysTest.captureKey(true,hardwareKeysTest.tabKey.string);	
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				},"set all captureKey and then " + hardwareKeysTest.tabKey.string + " capture key and fire a " + hardwareKeysTest.tabKey.string + " key press");
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);				
				
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.tabKey.string);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(typeof hardwareKeysTest.callbackFiredResult).toEqual('number');
				}, 'expect the callback to fire only once');	
			});
				
			it("2.10.should fire 'all' callback if a key specific callback is registered after the all callback is registered (all persistence)", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'ALL');
					hardwareKeysTest.captureKey(true,hardwareKeysTest.enterKey.string);	
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				},"set all captureKey and then " + hardwareKeysTest.enterKey.string + " capture key and fire a " + hardwareKeysTest.tabKey.string + " key press");

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);				

				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.enterKey.string);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toEqual(hardwareKeysTest.tabKey.value);
				}, 'expect the callback to fire only once');	
			});
				
			it("2.11.should not obstruct the key event from reaching the page when dispatch is set to true", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,hardwareKeysTest.aKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.aKey.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				}, 'Create a text box, add it to the page and focus it. Setup the ' + hardwareKeysTest.LETTER_A_CODE + ' key capture with dispatch and fire ' + hardwareKeysTest.LETTER_A_CODE + ' key');
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.aKey.string);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.aKey.value);
					expect(textBoxValue).toEqual(hardwareKeysTest.aKey.description);
				},'expect the key to be input into the input box and the callback to fire');
			});
			
			it("2.12.should obstruct the key event from reaching the page when dispatch is set to false", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false,hardwareKeysTest.aKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.aKey.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				}, 'Create a text box, add it to the page and focus it. Setup the ' + hardwareKeysTest.LETTER_A_CODE + ' key capture with dispatch and fire ' + hardwareKeysTest.LETTER_A_CODE + ' key');
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.aKey.string);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.aKey.value);
					expect(textBoxValue).toEqual('');
				},'expect the key not to be input into the input box and the callback to fire');
			});
			
			it("2.13.should capture ENTER key when specified with DECIMAL", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,'' + hardwareKeysTest.enterKey.value);			// ENTER
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.enterKey.value);				// ENTER
				}, "set capture key to ENTER & simulate ENTER key press...");

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.enterKey.value;
				}, "ERROR: Failed to capture ENTER key", 3000);
				
				runs(function()
				{		
					hardwareKeysTest.resetCaptureKeyCallback('' + hardwareKeysTest.enterKey.value);
				});
			});
		
			if(hardwareKeysTest.isAndroid())
			{
				it("2.14.should capture P1 (volume down) key", function()
				{
					runs(function()
					{
						hardwareKeysTest.captureKey(false, hardwareKeysTest.volumeDown.string);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.volumeDown.value);
					}, 'set capture P1 key and fire P1 key event');
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.volumeDown.value;
					}, 'ERROR: couldnt catch P1 event',3000);

					runs(function()
					{
						hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.volumeDown.string);
					});
				});
				
				it("2.15.should capture P2 (volume up) key", function()
				{
					runs(function()
					{
						hardwareKeysTest.captureKey(false, hardwareKeysTest.volumeUp.string);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.volumeUp.value);
					}, 'set capture P2 key and fire P2 key event');
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.volumeUp.value;
					}, 'ERROR: couldnt catch P2 event',3000);
					
					runs(function()
					{
						hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.volumeUp.string);
					});
				});

				it("2.16.should capture P3 (search) key", function()
				{
					runs(function()
					{
						hardwareKeysTest.captureKey(false, hardwareKeysTest.searchKey.string);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.searchKey.value);
					}, 'set capture P3 key and fire P3 key event');
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.searchKey.value;
					}, 'ERROR: couldnt catch P3 event',3000);
					
					runs(function()
					{
						hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.searchKey.string);
					});
				});
				
				it("2.17.should capture back key", function()
				{
					runs(function()
					{
						hardwareKeysTest.captureKey(false, hardwareKeysTest.backKey.string);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.backKey.value);
					}, 'set capture back key and fire back key event');
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.backKey.value;
					}, 'ERROR: couldnt catch back event',3000);
					
					runs(function()
					{
						hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.backKey.string);
					});
				});
				
				it("2.18.should capture menu key", function()
				{
					runs(function()
					{
						hardwareKeysTest.captureKey(false, hardwareKeysTest.menuKey.string);
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.menuKey.value);
					}, 'set capture menu key and fire menu key event');
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.menuKey.value;
					}, 'ERROR: couldnt catch menu event',3000);
					
					runs(function()
					{
						hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.menuKey.string);
					});
				});
			}
			
			///////////////////////////////////////////////////////////////////////
			// converted manual Tests
			///////////////////////////////////////////////////////////////////////
			it("VT289-011 | call captureKey with dispatch true, keyValue for " +hardwareKeysTest.testKey11.description+" and function callback |", function()
			{
				runs(function()
				{
					//Click inside Textbox and Press numeric key " +hardwareKeysTest.testKey11.description
					hardwareKeysTest.captureKey(true,hardwareKeysTest.testKey11.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey11.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey11.string);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.testKey11.value);
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey11.description);
				});
			});
			
			it("VT289-012 | call captureKey with dispatch false, keyValue for " +hardwareKeysTest.testKey11.description+" and function callback |", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false,hardwareKeysTest.testKey11.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey11.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					//Callback should fire with value " +hardwareKeysTest.testKey11.string+" and number " +hardwareKeysTest.testKey11.description+" should not be dispatched inside the textbox
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey11.string);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.testKey11.value);
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual('');
				});
			});
			
			it("VT289-013 | call captureKey with dispatch true, keyValue for" +hardwareKeysTest.testKey13.description+" and no callback(Sync) |", function()
			{
				runs(function()
				{
					//Callback should fire with value " +hardwareKeysTest.testKey13.string+"  and " +hardwareKeysTest.testKey13.description+"  should be dispatched inside the textbox
					hardwareKeysTest.captureKey(true,hardwareKeysTest.testKey13.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey13.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey13.string);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.testKey13.value);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey13.description);
				});
			});
			
			it("VT289-014 | call captureKey with dispatch true, keyValue for " +hardwareKeysTest.testKey14.description+" and callback as anonymous function |", function()
			{
				runs(function()
				{
					//Click inside Textbox and Press " +hardwareKeysTest.testKey14.description
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey14.string,function(data){hardwareKeysTest.captureKeyCallback(data);});

					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey14.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					//Callback should fire with value " +hardwareKeysTest.testKey14.string+" check for Callback to fire with value and " +hardwareKeysTest.testKey14.description+" should be dispatched inside the textbox
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey14.string);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.testKey14.value);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey14.description);
				});
			});
			
			it("VT289-015 | call captureKey with dispatch false, keyValue for" +hardwareKeysTest.testKey15.description+" and press "+hardwareKeysTest.testKey14.description, function()
			{
				runs(function()
				{
					//Click inside Textbox and Press "+hardwareKeysTest.testKey14.description
					hardwareKeysTest.captureKey(true,hardwareKeysTest.testKey15.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey14.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					//Callback should not fire and " +hardwareKeysTest.testKey14.description+ "should be dispatched inside the textbox
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey15.string);
					expect(hardwareKeysTest.callbackFired).toBe(false);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey14.description);
				});
			});
			
			it("VT289-016 | call captureKey with dispatch True, keyValue ALL and callback |", function()
			{
				runs(function()
				{
					//Press all type of key (a-z 0-9 symbol, function)
					hardwareKeysTest.captureKey(true,'ALL');
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.aKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.hashKey.value)},200);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.oneKey.value)},400);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.f1Key.value)},600);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},4800);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 4800);
				
				runs(function()
				{
					//Callback should fire with retrun key values all pressed keys should be dispatched
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult.length).toBe(4);
					expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(hardwareKeysTest.aKey.value);
					expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(hardwareKeysTest.hashKey.value);
					expect(hardwareKeysTest.callbackFiredResult[2]).toEqual(hardwareKeysTest.oneKey.value);
					expect(hardwareKeysTest.callbackFiredResult[3]).toEqual(hardwareKeysTest.f1Key.value);
					expect(textBoxValue).toEqual(hardwareKeysTest.aKey.description + hardwareKeysTest.hashKey.description + hardwareKeysTest.oneKey.description);
				});
			});
			
			it("VT289-021 | call captureKey twice, one with callback and other without callback |", function()
			{
				runs(function()
				{
					//Press " +hardwareKeysTest.testKey15.description+", Press numeric key " +hardwareKeysTest.testKey21.description+"
					hardwareKeysTest.captureKey(true,hardwareKeysTest.testKey15.string);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey21.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey15.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey21.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1200);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3200);
				
				runs(function()
				{
					//callback1 should fire after pressing " +hardwareKeysTest.testKey15.description+" and no callback should fire after pressing " +hardwareKeysTest.testKey21.description+" and both key should be dispatched
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey15.string);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey21.string);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.testKey15.value);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey15.description + hardwareKeysTest.testKey21.description);
				});	
			});

	//		Removed because requirements have changed.
	//		it("VT289-022 | call captureKey twice, one with callback and other without callback for keyValue ALL |", function()
	//		{
	//			runs(function()
	//			{
	//				//Press " +hardwareKeysTest.testKey15.description+", Press numeric key " +hardwareKeysTest.testKey21.description+"
	//				hardwareKeysTest.captureKey(true,hardwareKeysTest.testKey15.string);
	//				Rho.KeyCapture.captureKey(false,'ALL');
	//				hardwareKeysTest.createTextBox();
	//				hardwareKeysTest.textBox.focus();
	//				hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey15.value);
	//				setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
	//			});
	//
	//			waitsFor(function()
	//			{
	//				return hardwareKeysTest.callbackFiredTimeout == 'timedout';
	//			}, "Callback didnt fire", 3000);
	//			
	//			runs(function()
	//			{
	//				//callback should fire only after pressing " +hardwareKeysTest.testKey15.description+" and allkeys should not be dispatched inside the textbox
	//				hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey15.string);
	//				hardwareKeysTest.resetCaptureKeyCallback('ALL');
	//				expect(hardwareKeysTest.callbackFired).toBe(false);
	//				textBoxValue = hardwareKeysTest.textBox.value;
	//				hardwareKeysTest.removeTextBox();
	//				if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey15.description);
	//			});	
	//		});
			
			it("VT289-030 | call captureKey with no callback |", function()
			{
				runs(function()
				{
					//Click inside Textbox and Press key 1 and a from Hardware key, Press key 2 and b from soft key
					Rho.KeyCapture.captureKey(false,'ALL');
					Rho.KeyCapture.captureKey(true,'ALL');
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.aKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.zKey.value)},200);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.hashKey.value)},400);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.oneKey.value)},600);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},3800);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 5800);
				
				runs(function()
				{
					//No callback should fire after pressing any hardware and soft  key, all keys should be dispatched inside textbox after pressing any key
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
					expect(hardwareKeysTest.callbackFired).toBe(false);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					var expectedOut = hardwareKeysTest.aKey.description + hardwareKeysTest.zKey.description + hardwareKeysTest.hashKey.description + hardwareKeysTest.oneKey.description;
					expect(textBoxValue).toEqual(expectedOut);
				});
			});
			
			it("VT289-031 | call captureKey with no callback after setting "+ hardwareKeysTest.testKey11.description, function()
			{
				runs(function()
				{
					
					//Click inside Textbox and"+ hardwareKeysTest.testKey11.description
					hardwareKeysTest.captureKey(false,hardwareKeysTest.testKey11.string);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.testKey11.value);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});

				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Callback didnt fire", 3000);
				
				runs(function()
				{
					//No callback should fire after pressing" +hardwareKeysTest.testKey11.description+" and" +hardwareKeysTest.testKey11.description+" should be dispatched inside text box
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.testKey11.string);
					expect(hardwareKeysTest.callbackFired).toBe(false);
					textBoxValue = hardwareKeysTest.textBox.value;
					hardwareKeysTest.removeTextBox();
					if(!hardwareKeysTest.isAndroid()) expect(textBoxValue).toEqual(hardwareKeysTest.testKey11.description);
				});
			});
		});
	}
	if (!isWindowsMobilePlatform) //putting check for WM because of issues in instumentation API for WM
	{			
		describe("Remap", function()
		{
			///////////////////////////////////////////////////////////////////////
			// 3. Key remap
			///////////////////////////////////////////////////////////////////////

			it("3.1.should remap TAB key to the ENTER key", function() {
				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.tabKey.string, hardwareKeysTest.enterKey.string); 			// TAB->ENTER
					hardwareKeysTest.captureKey(true,'ALL');			// Any Key
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);	// TAB
				}, "remap TAB to ENTER, & simulate TAB key press...");
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == hardwareKeysTest.enterKey.value;
				}, "ERROR: ENTER key has not been remapped", 3000);
				
				runs(function()
				{
					hardwareKeysTest.resetCaptureKeyCallback('ALL');
					hardwareKeysTest.clearRemap(hardwareKeysTest.tabKey.string);
				});
			});
			
			it("3.2.should clear a remap using null value", function() {
				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.tabKey.string, hardwareKeysTest.enterKey.string); 			// TAB->ENTER
					hardwareKeysTest.remapKey(hardwareKeysTest.tabKey.string, null);
					hardwareKeysTest.captureKey(false, hardwareKeysTest.enterKey.string);
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
					setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
				}, "remap TAB to ENTER, then reset and simulate TAB key press...");		
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);
				
				runs(function()
				{
					expect(hardwareKeysTest.callbackFired).toBe(false);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.enterKey.string);
					hardwareKeysTest.clearRemap(hardwareKeysTest.tabKey.string);
				}, 'expect the callback not to fire');	
			});
			
			it("3.3.should clear a remap using empty string", function()
			{
				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.tabKey.string, hardwareKeysTest.enterKey.string); 			// TAB->ENTER
					Rho.KeyCapture.remapKey(hardwareKeysTest.tabKey.string, '');
					hardwareKeysTest.captureKey(false, hardwareKeysTest.enterKey.string);
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
					setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
				}, "remap TAB to ENTER, then reset and simulate TAB key press...");	
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 'timedout';
				}, "ERROR: Test setup failed, timeout not occurring", 3000);
				
				runs(function()
				{
					expect(hardwareKeysTest.callbackFired).toBe(false);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.enterKey.string);
					hardwareKeysTest.clearRemap(hardwareKeysTest.tabKey.string);
				}, 'expect the callback not to fire');	
			});
			
			///////////////////////////////////////////////////////////////////////
			//  From Manual ReMap key Tests
			///////////////////////////////////////////////////////////////////////

			it("VT289-039 | call remapKey with enter and numeric key 1 |", function()
			{
				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.enterKey.string, hardwareKeysTest.oneKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					
					//Press enter key and press numeric key 1
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.enterKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.oneKey.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1200);// TAB
				});
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Error in delay", 3200);

				runs(function()
				{
					//Both key should be dispatched as 1
					expect(hardwareKeysTest.textBox.value).toEqual(hardwareKeysTest.oneKey.description + hardwareKeysTest.oneKey.description);
					
					//Tear down
					hardwareKeysTest.clearRemap(hardwareKeysTest.enterKey.string);
					hardwareKeysTest.removeTextBox();
				});
			});

			it("VT289-040 | call remapKey with functionkey F1 and numeric key 9 |", function()
			{
				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.f1Key.string, hardwareKeysTest.nineKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					
					//Press functionkey F1 and numeric key 9
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.f1Key.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.nineKey.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Error in delay", 3000);

				runs(function()
				{
					//Both key should be dispatched as 9
					expect(hardwareKeysTest.textBox.value).toEqual(hardwareKeysTest.nineKey.description + hardwareKeysTest.nineKey.description);
					
					//Tear down
					hardwareKeysTest.clearRemap(hardwareKeysTest.f1Key.string);
					hardwareKeysTest.removeTextBox();
				});
			});

			it("VT289-041 | call remapKey with numeric key 5 and null |", function() {

				runs(function()
				{
					//click inside the textbox, .Press numeric key 5 and 2
					hardwareKeysTest.remapKey(hardwareKeysTest.fiveKey.string,hardwareKeysTest.twoKey.string);
					hardwareKeysTest.remapKey(hardwareKeysTest.fiveKey.string, null);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.fiveKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.twoKey.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Error in delay", 3000);

				runs(function()
				{
					//5 should be dispatched after pressing 5 and 2 should be dispatched after pressing 2, No Remap
					expect(hardwareKeysTest.textBox.value).toEqual(hardwareKeysTest.fiveKey.description + hardwareKeysTest.twoKey.description);

					//Tear down
					hardwareKeysTest.removeTextBox();
				});
			});

			it("VT289-044 | call capturekey after remapKey |", function() {

				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.aKey.string, hardwareKeysTest.bKey.string);
					hardwareKeysTest.captureKey(true, hardwareKeysTest.aKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					
					//Press keys a and b
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.aKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.bKey.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Error in delay", 3000);

				runs(function()
				{		
					//Callback should not fire after pressing key a, Both key should be dispatched as b after pressing a and b
					hardwareKeysTest.clearRemap(hardwareKeysTest.aKey.string);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.aKey.string);
					expect(hardwareKeysTest.textBox.value).toEqual(hardwareKeysTest.bKey.description + hardwareKeysTest.bKey.description);
					expect(hardwareKeysTest.callbackFired).toBe(false);
					hardwareKeysTest.removeTextBox();
				});
			});

			it("VT289-045 | call capturekey after remapKey and callback to fire |", function()
			{
				runs(function()
				{
					hardwareKeysTest.remapKey(hardwareKeysTest.zKey.string,hardwareKeysTest.yKey.string);
					hardwareKeysTest.captureKey(true,hardwareKeysTest.yKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					
					//Press keys y and z
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.zKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.yKey.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Error in delay", 3000);

				runs(function()
				{		
					hardwareKeysTest.clearRemap(hardwareKeysTest.zKey.string);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.yKey.string);

					//Callback should fire after pressing key z and y, Both key should be dispatched as y after pressing z and y
					expect(hardwareKeysTest.textBox.value).toEqual(hardwareKeysTest.yKey.description + hardwareKeysTest.yKey.description);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult.length).toBe(2);
					expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(hardwareKeysTest.yKey.value);
					expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(hardwareKeysTest.yKey.value);
					hardwareKeysTest.removeTextBox();
				});
			});

			it("VT289-046 | call remapKey after capturekey and callback to fire |", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(true,hardwareKeysTest.hashKey.string);
					hardwareKeysTest.remapKey(hardwareKeysTest.starKey.string, hardwareKeysTest.hashKey.string);
					hardwareKeysTest.createTextBox();
					hardwareKeysTest.textBox.focus();
					
					//Press numeric key * and #
					hardwareKeysTest.simulateKeyPress(hardwareKeysTest.starKey.value);
					setTimeout(function(){hardwareKeysTest.simulateKeyPress(hardwareKeysTest.hashKey.value);},200);
					setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
				});
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredTimeout == 'timedout';
				}, "Error in delay", 3000);

				runs(function()
				{		
					hardwareKeysTest.clearRemap(hardwareKeysTest.starKey.string);
					hardwareKeysTest.resetCaptureKeyCallback(hardwareKeysTest.hashKey.string);

					//Callback should fire after pressing key * and #, Both key should be dispatched as # after pressing * and #
					expect(hardwareKeysTest.textBox.value).toEqual(hardwareKeysTest.hashKey.description + hardwareKeysTest.hashKey.description);
					expect(hardwareKeysTest.callbackFired).toBe(true);
					expect(hardwareKeysTest.callbackFiredResult.length).toBe(2);
					expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(hardwareKeysTest.hashKey.value);
					expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(hardwareKeysTest.hashKey.value);
					hardwareKeysTest.removeTextBox();
				});
			});
		});
	}

	if (!isWindowsMobilePlatform) //putting check for WM because of issues in instumentation API for WM
	{
		if (isWindowsMobileOrAndroidPlatform() && Rho.System.isMotorolaDevice == true) 
		{
			describe("Trigger", function()
			{
				///////////////////////////////////////////////////////////////////////
				// 4. Trigger
				///////////////////////////////////////////////////////////////////////

				it("4.1.should capture the trigger press", function()
				{
					runs(function()
					{
						hardwareKeysTest.setTrigger();
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.TRIGGER);				// TRIGGER
					}, "enable Trigger and simulate trigger press...");		
					
					waitsFor(function()
					{
						if(hardwareKeysTest.callbackFiredResult == null){return false;}
						if((typeof hardwareKeysTest.callbackFiredResult) != 'object'){return false;}
						if(hardwareKeysTest.callbackFiredResult.length != 2){return false;}
						else{return true;}
					}, "ERROR: Trigger NOT received", 3000);
					
					runs(function()
					{
						expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(hardwareKeysTest.TRIGGER);
						expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(0);
						hardwareKeysTest.resetTrigger();
					},'expect both trigger down and trigger up events are fired');
				});
				
				it("4.2.should NOT capture the trigger when other key pressed", function()
				{
					runs(function()
					{
						hardwareKeysTest.setTrigger();
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.tabKey.value);				// TAB
						setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);
					}, "enable Trigger and simulate tab key...");		
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == 'timedout';
					}, "ERROR: Test setup failed, timeout not occurring", 3000);
					
					runs(function()
					{
						expect(hardwareKeysTest.callbackFired).toBe(false);
						hardwareKeysTest.resetTrigger();
					}, 'expect the callback not to fire');
				});
				
				it("4.3.should NOT capture the trigger after the trigger callback is cleared", function()
				{
					runs(function()
					{
						hardwareKeysTest.setTrigger();
						hardwareKeysTest.resetTrigger();
						hardwareKeysTest.simulateKeyPress(hardwareKeysTest.TRIGGER);				// TRIGGER
						setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
					}, "reset trigger callback and fire trigger.");
					
					waitsFor(function()
					{
						return hardwareKeysTest.callbackFiredResult == 'timedout';
					}, "ERROR: Test setup failed, timeout not occurring", 3000);

					runs(function()
					{
						expect(hardwareKeysTest.callbackFired).toBe(false);
					}, 'expect the callback not to fire');
				});
			});
		}
	}
});