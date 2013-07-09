/**
 * @author: Steve Sutton, Ben Kennedy
 */
describe("HardwareKeysTestSuite", function() {
	describe("Testing HardwareKeys Module.  ", function() {

	var getpropertiesdata ='';
	
		beforeEach(function() {
			hardwareKeysTest.callbackFired = false;
			hardwareKeysTest.callbackFiredResult = null;
			getpropertiesdata = '';
		});
	
		afterEach(function() 
		{
			hardwareKeysTest.resetCaptureKeyCallback('all');
			hardwareKeysTest.resetCaptureKeyCallback('0x04');
			hardwareKeysTest.resetCaptureKeyCallback('0x08');
			hardwareKeysTest.resetCaptureKeyCallback('0x0D');
			hardwareKeysTest.resetCaptureKeyCallback('0x18');
			hardwareKeysTest.resetCaptureKeyCallback('0x19');
			hardwareKeysTest.resetCaptureKeyCallback('0x52');
			hardwareKeysTest.resetCaptureKeyCallback('0x54');
			hardwareKeysTest.resetCaptureKeyCallback('' + hardwareKeysTest.LETTER_A_CODE);
			hardwareKeysTest.clearRemap('0x08');
			hardwareKeysTest.resetTrigger();
		});	
	
		///////////////////////////////////////////////////////////////////////
		// 1. Home key
		///////////////////////////////////////////////////////////////////////
		if(!hardwareKeysTest.isAndroid())//Android doesnt do home key it seems
		{
			it("1.1.should check default value of the Home Key", function() {
				expect(Rho.KeyCapture.homeKeyValue).toBe('disabled');		
			});
	
			it("1.2.should set the Home Key to ENTER", function() {
				Rho.KeyCapture.homeKeyValue = '0x0D'; 
				expect(Rho.KeyCapture.homeKeyValue).toBe('13');		// ENTER	
			});
	
			it("1.3.should set the Home Key to disabled", function() {
				Rho.KeyCapture.homeKeyValue = 'disabled';
				expect(Rho.KeyCapture.homeKeyValue).toBe('disabled');		
			});
	
			it("1.4.should set the Home Key to disable", function() {
				Rho.KeyCapture.homeKeyValue = 'disable';
				expect(Rho.KeyCapture.homeKeyValue).toBe('disabled');		
			});
			
			it("1.5.should set the Home Key to enabled", function() {
				Rho.KeyCapture.homeKeyValue = 'enabled';			
				expect(Rho.KeyCapture.homeKeyValue).toBe('116');	// F5	
			});
		
			it("1.6.should set the Home Key to enable", function() {
				Rho.KeyCapture.homeKeyValue = 'enable';
				expect(Rho.KeyCapture.homeKeyValue).toBe('116');  	// F5	
			});
			//Added By ST//

			it("1.7.(VT289-049)set the Home Key to ENTER with setProperties", function() {
				Rho.KeyCapture.setProperties({'homeKeyValue':'0x0D'})
				Rho.KeyCapture.getProperties(['homeKeyValue'],function(data){getpropertiesdata = JSON.stringify(data);});
				expect(getpropertiesdata).toContain('13');
			});

			it("1.8.(VT289-050)set the Home Key to disabled with setProperty", function() {
				Rho.KeyCapture.setProperty('homeKeyValue','Disabled');
				Rho.KeyCapture.getProperty("homeKeyValue",function(data){getpropertiesdata = data;});
				expect(getpropertiesdata).toBe('Disabled');		
			});

			it("1.9.(VT289-051)set the Home Key to enabled with setProperty and without callback", function() {
				Rho.KeyCapture.homeKeyValue = 'enabled'
				var data = Rho.KeyCapture.homeKeyValue;
				getpropertiesdata = data;
				expect(getpropertiesdata).toBe('116');	// F5	
			});

			it("1.10.(VT289-052)check for getallproperties", function() {
				Rho.KeyCapture.homeKeyValue = 'disabled';
				Rho.KeyCapture.getAllProperties(function(data){getpropertiesdata = JSON.stringify(data);});
				expect(getpropertiesdata).toContain('disabled');
			});

			it("1.11.(VT289-053)check for getSupportedProperties", function() {
				Rho.KeyCapture.homeKeyValue = '0x0D';
				Rho.KeyCapture.getSupportedProperties(function(data){getpropertiesdata = JSON.stringify(data);});
				expect(getpropertiesdata).toContain('13');
			});
		}
		
		///////////////////////////////////////////////////////////////////////
		// 2. Key capture
		///////////////////////////////////////////////////////////////////////
				
		it("2.1.should capture ENTER key when specified with HEX", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'0x0D');			// ENTER
				hardwareKeysTest.simulateKeyPress(13);				// ENTER
			}, "set capture key to ENTER & simulate ENTER key press...");		
			waitsFor(function() {
            	return hardwareKeysTest.callbackFiredResult == 13;
        	}, "ERROR: Failed to capture ENTER key", 3000);
		});
		
		it("2.2.should ignore any other key than ENTER", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'0x0D');			// ENTER
				hardwareKeysTest.simulateKeyPress(8);
				setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
			}, "set capture key to ENTER & simulate TAB key press...");		
			waitsFor(function()
			{
            	return hardwareKeysTest.callbackFiredResult == 'timedout';
        	}, "ERROR: Test setup failed, timeout not occurring", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(false);
			}, 'expect the callback not to fire');
		});
		
		it("2.3.should capture any key using a lowercase 'all'", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'all');				// Any Key
				hardwareKeysTest.simulateKeyPress(8);				// TAB
			}, "set capture key to any key & simulate TAB key press...");		
			waitsFor(function() {
            	return hardwareKeysTest.callbackFiredResult == 8;
        	}, "ERROR: Failed to capture any key", 3000);
		});
		
		it("2.4.should capture any key using an uppercase ALL", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'ALL');				// Any Key
				hardwareKeysTest.simulateKeyPress(8);				// TAB
			}, "set capture key to any key & simulate TAB key press...");		
			waitsFor(function() {
            	return hardwareKeysTest.callbackFiredResult == 8;
        	}, "ERROR: Failed to capture any key", 3000);
		});
		
		it("2.5.should not capture any key after resetting 'all' keyValue keyCapture", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'ALL');				// Any Key
				hardwareKeysTest.resetCaptureKeyCallback('ALL');
				hardwareKeysTest.simulateKeyPress(8);				// TAB
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
		
		it("2.6.should not capture any key after resetting 'all' keyValue keyCapture with mixed letter case", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'ALL');				// Any Key
				hardwareKeysTest.resetCaptureKeyCallback('aLL');
				hardwareKeysTest.simulateKeyPress(8);				// TAB
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
		
		it("2.7.should capture multiple keys", function()
		{
			runs(function()
			{
				setTimeout(function()
				{
					hardwareKeysTest.captureKey(false,'0x0D');	
					hardwareKeysTest.captureKey(false,'0x08');
					hardwareKeysTest.simulateKeyPress(13);
					hardwareKeysTest.simulateKeyPress(8);
				},500);
			},'set capture key for ENTER and TAB and simulate key events');
			waitsFor(function() {
				if(hardwareKeysTest.callbackFiredResult == null) {return false;}
				if((typeof hardwareKeysTest.callbackFiredResult) != 'object') {return false;}
				if(hardwareKeysTest.callbackFiredResult.length != 2) {return false;}
				else{return true;}
        	}, "ERROR: MultipleKeys NOT received", 3000);
			runs(function()
			{
				console.log(hardwareKeysTest.callbackFiredResult[0] + ' = 13')
				console.log(hardwareKeysTest.callbackFiredResult[1] + ' = 8')
				expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(0x0D);
				expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(0x08);
			}, 'expect both callbacks to fire with each keyValues');
		});
		
		it("2.8.should not capture a key after it has been reset", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'0x08');				// Any Key
				hardwareKeysTest.resetCaptureKeyCallback('0x08');
				setTimeout(function(){hardwareKeysTest.simulateKeyPress(8);},100);				// TAB
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
		
		it("2.9.should only fire 'all' callback if both 'all' and a key has been registered", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'ALL');
				hardwareKeysTest.captureKey(true,'0x08');	
				hardwareKeysTest.simulateKeyPress(8);
				setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
			},"set all captureKey and then 0x08 capture key and fire a 0x08 key press");
			waitsFor(function()
			{
            	return hardwareKeysTest.callbackFiredTimeout == 'timedout';
        	}, "ERROR: Test setup failed, timeout not occurring", 3000);				
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(true);
				expect(typeof hardwareKeysTest.callbackFiredResult).toEqual('number');
				hardwareKeysTest.callbackFiredTimeout = null;
			}, 'expect the callback to fire only once');	
		});
			
		it("2.10.should fire 'all' callback if a key specific callback is registered after the all callback is registered (all persistence)", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'ALL');
				hardwareKeysTest.captureKey(true,'0x0D');	
				hardwareKeysTest.simulateKeyPress(8);
				setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
			},"set all captureKey and then 0x0D capture key and fire a 0x08 key press");
			waitsFor(function()
			{
            	return hardwareKeysTest.callbackFiredTimeout == 'timedout';
        	}, "ERROR: Test setup failed, timeout not occurring", 3000);				
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(true);
				expect(hardwareKeysTest.callbackFiredResult).toEqual(8);
				hardwareKeysTest.callbackFiredTimeout = null;
			}, 'expect the callback to fire only once');	
		});
			
		it("2.11.should not obstruct the key event from reaching the page when dispatch is set to true", function()
		{
			runs(function()
			{
				hardwareKeysTest.captureKey(true,'' + hardwareKeysTest.LETTER_A_CODE);
				hardwareKeysTest.textBox = document.createElement('input');
				hardwareKeysTest.textBox.type = 'text';
				hardwareKeysTest.textBox.id = 'keyCaptureTestTextBox';
				document.body.appendChild(hardwareKeysTest.textBox);
				hardwareKeysTest.textBox.focus();
				hardwareKeysTest.simulateKeyPress(hardwareKeysTest.LETTER_A_CODE);
				setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
			}, 'Create a text box, add it to the page and focus it. Setup the 0x41 key capture with dispatch and fire 0x41 key');
			waitsFor(function()
			{
				return hardwareKeysTest.callbackFiredTimeout == 'timedout';
			}, "Callback didnt fire", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(true);
				expect(hardwareKeysTest.callbackFiredResult).toBe(hardwareKeysTest.LETTER_A_CODE);
				expect(hardwareKeysTest.textBox.value).toEqual('a');
				document.body.removeChild(hardwareKeysTest.textBox);
				hardwareKeysTest.callbackFiredTimeout = null;
			},'expect the key to be input into the input box and the callback to fire');
		});
		
		it("2.12.should obstruct the key event from reaching the page when dispatch is set to false", function()
		{
			runs(function()
			{
				hardwareKeysTest.captureKey(false,'0x41');
				hardwareKeysTest.textBox = document.createElement('input');
				hardwareKeysTest.textBox.type = 'text';
				hardwareKeysTest.textBox.id = 'keyCaptureTestTextBox';
				document.body.appendChild(hardwareKeysTest.textBox);
				hardwareKeysTest.textBox.focus();
				hardwareKeysTest.simulateKeyPress(0x41);
				setTimeout(function(){hardwareKeysTest.callbackFiredTimeout = 'timedout'},1000);// TAB
			}, 'Create a text box, add it to the page and focus it. Setup the 0x41 key capture with dispatch and fire 0x41 key');
			waitsFor(function()
			{
				return hardwareKeysTest.callbackFiredTimeout == 'timedout';
			}, "Callback didnt fire", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(true);
				expect(hardwareKeysTest.callbackFiredResult).toBe(0x41);
				expect(hardwareKeysTest.textBox.value).toEqual('');
				document.body.removeChild(hardwareKeysTest.textBox);
				hardwareKeysTest.callbackFiredTimeout = null;
			},'expect the key not to be input into the input box and the callback to fire');
		});
		
		it("2.13.should capture ENTER key when specified with DECIMAL", function() {
			runs(function() {
				hardwareKeysTest.captureKey(true,'13');			// ENTER
				hardwareKeysTest.simulateKeyPress(13);				// ENTER
			}, "set capture key to ENTER & simulate ENTER key press...");		
			waitsFor(function() {
            	return hardwareKeysTest.callbackFiredResult == 13;
        	}, "ERROR: Failed to capture ENTER key", 3000);
		});
		
		
		if(hardwareKeysTest.isAndroid())
		{
			it("2.14.should capture P1 (volume down) key", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false, '0x19');
					hardwareKeysTest.simulateKeyPress(0x19);
				}, 'set capture P1 key and fire P1 key event');
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 0x19;
				}, 'ERROR: couldnt catch P1 event',3000);
			});
			
			it("2.15.should capture P2 (volume up) key", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false, '0x18');
					hardwareKeysTest.simulateKeyPress(0x18);
				}, 'set capture P2 key and fire P2 key event');
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 0x18;
				}, 'ERROR: couldnt catch P2 event',3000);
			});

			it("2.16.should capture P3 (search) key", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false, '0x54');
					hardwareKeysTest.simulateKeyPress(0x54);
				}, 'set capture P3 key and fire P3 key event');
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 0x54;
				}, 'ERROR: couldnt catch P3 event',3000);
			});
			
			it("2.17.should capture back key", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false, '0x04');
					hardwareKeysTest.simulateKeyPress(0x04);
				}, 'set capture back key and fire back key event');
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 0x04;
				}, 'ERROR: couldnt catch back event',3000);
			});
			
			it("2.18.should capture menu key", function()
			{
				runs(function()
				{
					hardwareKeysTest.captureKey(false, '0x52');
					hardwareKeysTest.simulateKeyPress(0x52);
				}, 'set capture menu key and fire menu key event');
				
				waitsFor(function()
				{
					return hardwareKeysTest.callbackFiredResult == 0x52;
				}, 'ERROR: couldnt catch menu event',3000);
			});
		}
		
		///////////////////////////////////////////////////////////////////////
		// 3. Key remap
		///////////////////////////////////////////////////////////////////////

		it("3.1.should remap TAB key to the ENTER key", function() {
			runs(function() {
				hardwareKeysTest.remapKey('0x08', '0x0D'); 			// TAB->ENTER
				hardwareKeysTest.captureKey(true,'all');			// Any Key
				hardwareKeysTest.simulateKeyPress(8);				// TAB
			}, "remap TAB to ENTER, & simulate TAB key press...");		
			waitsFor(function() {
				return hardwareKeysTest.callbackFiredResult == 13;
        	}, "ERROR: ENTER key has not been remapped", 3000);
		});
		
		it("3.2.should clear a remap using null value", function() {
			runs(function() {
				hardwareKeysTest.remapKey('0x08', '0x0D'); 			// TAB->ENTER
				Rho.KeyCapture.remapKey('0x08', null);
				hardwareKeysTest.captureKey(false, '0x0D');
				hardwareKeysTest.simulateKeyPress(8);				// TAB
				setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
			}, "remap TAB to ENTER, then reset and simulate TAB key press...");		
			waitsFor(function()
			{
            	return hardwareKeysTest.callbackFiredResult == 'timedout';
        	}, "ERROR: Test setup failed, timeout not occurring", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(false);
			}, 'expect the callback not to fire');	
		});
		
		it("3.3.should clear a remap using empty string", function() {
			runs(function() {
				hardwareKeysTest.remapKey('0x08', '0x0D'); 			// TAB->ENTER
				Rho.KeyCapture.remapKey('0x08', '');
				hardwareKeysTest.captureKey(false, '0x0D');
				hardwareKeysTest.simulateKeyPress(8);				// TAB
				setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);// TAB
			}, "remap TAB to ENTER, then reset and simulate TAB key press...");		
			waitsFor(function()
			{
            	return hardwareKeysTest.callbackFiredResult == 'timedout';
        	}, "ERROR: Test setup failed, timeout not occurring", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(false);
			}, 'expect the callback not to fire');	
		});

		///////////////////////////////////////////////////////////////////////
		// 4. Trigger
		///////////////////////////////////////////////////////////////////////
	
		it("4.1.should capture the trigger press", function() {
			runs(function() {
				hardwareKeysTest.setTrigger();
				hardwareKeysTest.simulateKeyPress(hardwareKeysTest.TRIGGER);				// TRIGGER
			}, "enable Trigger and simulate trigger press...");		
			waitsFor(function() {
				if(hardwareKeysTest.callbackFiredResult == null){return false;}
				if((typeof hardwareKeysTest.callbackFiredResult) != 'object'){return false;}
				if(hardwareKeysTest.callbackFiredResult.length != 2){return false;}
				else{return true;}
        	}, "ERROR: Trigger NOT received", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFiredResult[0]).toEqual(hardwareKeysTest.TRIGGER);
				expect(hardwareKeysTest.callbackFiredResult[1]).toEqual(0);
			},'expect both trigger down and trigger up events are fired');
		});
		
		it("4.2.should NOT capture the trigger when other key pressed", function() {
			runs(function() {
				hardwareKeysTest.setTrigger();
				hardwareKeysTest.simulateKeyPress(8);				// TAB
	    		setTimeout(function(){hardwareKeysTest.callbackFiredResult = 'timedout'},1000);
			}, "enable Trigger and simulate tab key...");		
			waitsFor(function()
			{
	        	return hardwareKeysTest.callbackFiredResult == 'timedout';
	    	}, "ERROR: Test setup failed, timeout not occurring", 3000);
			runs(function()
			{
				expect(hardwareKeysTest.callbackFired).toBe(false);
			}, 'expect the callback not to fire');
		});
		
		it("4.3.should NOT capture the trigger after the trigger callback is cleared", function()
		{
			runs(function() {
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
});
