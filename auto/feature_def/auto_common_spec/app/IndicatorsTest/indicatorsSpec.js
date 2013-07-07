describe("Indicators", function() {
	describe("Testing the Signal API in Ruby via AJAX", function() {
	
		beforeEach(function() {
//			document.getElementById('retProp').innerHTML = "blank";
	        this.addMatchers({
	            toBeGreaterThanZero: function() {
	                return (this.actual > 0);
	            }
	        });
        });
		
	
		afterEach(function() {
			getIndicatorStatus('/app/IndicatorsTest/deregister_battery_callback', 'ignored', 'ignored', 'ignored');
		});

		var deviceType = getDeviceType();
		var unsupportedDevices = ["mk40", "mk50", "mk30"];
		var isSupported = true;
		for(var i = 0; i < unsupportedDevices.length; i++)
		{
			if (deviceType.toLowerCase().indexOf(unsupportedDevices[i].toLowerCase()) != -1)
			{
				isSupported = false;
				break;
			}
		}

    if (isAnyButApplePlatform()) {
		it ("Able to Show and Hide the Signal Icon - TODO: Screenshot Automation", function()
		{
			if (!isSupported)
				return;
			//  Test Red Left
			showIcon('/app/IndicatorsTest/show_signal_icon', 10, 50, 'left', '#FF0000');
			//  todo - Take a Screenshot
			//  Test Blue Right
			showIcon('/app/IndicatorsTest/show_signal_icon', 20, 60, 'right', '#0000FF');
			//  todo - Take a Screenshot
			//  Test Green Up
			showIcon('/app/IndicatorsTest/show_signal_icon', 30, 70, 'up', '#00FF00');
			//  todo - Take a Screenshot
			//  Test Black Down
			showIcon('/app/IndicatorsTest/show_signal_icon', 40, 80, 'down', '#000000');
			//  todo - Take a Screenshot
			//  Test icon can be hidden
			hideIcon('/app/IndicatorsTest/hide_signal_icon');
			//  todo - Take a Screenshot
		});

   }
		it ("Able to access Signal status synchronously", function()
		{
			if (!isSupported)
				return;
			var signalStatus = getIndicatorStatus('/app/IndicatorsTest/signal_status_sync', 'ignored', 'ignored', 'signalStrength');
			expect(signalStatus).toBeGreaterThanZero();
			var ipAddress = getIndicatorStatus('/app/IndicatorsTest/signal_status_sync', 'ignored', 'ignored', 'ipAddress');
			expect(ipAddress).toContain('192.168.');
			var macAddress = getIndicatorStatus('/app/IndicatorsTest/signal_status_sync', 'ignored', 'ignored', 'macAddress');
			expect(macAddress).not.toBe('');
		});


		it ("Able to access Signal status Asynchronously (Periodically)", function()
		{
			if (!isSupported)
				return;
			//  Start with default interval (5000ms)
			document.getElementById('indicatorOutput').innerHTML = "blank";
			getIndicatorStatus('/app/IndicatorsTest/signal_status_async', 'periodic', '5000', 'ignored');
			waitsFor(function()
				{
					return document.getElementById('indicatorOutput').innerHTML != "blank";
				}, "Allowing 1 second for the initial signal status to be received", 1000);
			runs(function() 
			{
				//  We got the first value, check the next value only arrives after 5 seconds
				document.getElementById('indicatorOutput').innerHTML = "blank";
				waitsFor(function()
					{
						return document.getElementById('indicatorOutput').innerHTML != "blank";
					}, "Allowing 5 seconds for the second signal status to be received", 5100);		
				runs(function()
				{
					//  Now change the periodicity of the Timer notification to 2 seconds
					document.getElementById('indicatorOutput').innerHTML = "blank";
					changeRefresh('/app/IndicatorsTest/change_signal_refresh', 2000);
					//  We should get an update after 2 seconds
					waitsFor(function()
					{
						return document.getElementById('indicatorOutput').innerHTML != "blank";
					}, "Allowing 2 seconds for the second signal status to be received", 2100);
					runs(function()
					{
						//  Now change the periodicity of the Timed notification to 7 seconds
						document.getElementById('indicatorOutput').innerHTML = "blank";
						changeRefresh('/app/IndicatorsTest/change_signal_refresh', 7000);
						//  We should get an update after 7 seconds
						waitsFor(function()
						{
							return document.getElementById('indicatorOutput').innerHTML != "blank";
						}, "Allowing 7 seconds for the second signal status to be received", 7100);
						runs(function()
						{
							//  Now stop the updates and we would not expect there to be any further activity.
							document.getElementById('indicatorOutput').innerHTML = "blank";
							document.getElementById('indicatorOutput2').innerHTML = "blank";
							getIndicatorStatus('/app/IndicatorsTest/deregister_signal_callback', 'ignored', 'ignored', 'ignored');
							setTimeout(function(){document.getElementById('indicatorOutput2').innerHTML = "fin";}, 8000);
							waitsFor(function()
							{
								return document.getElementById('indicatorOutput2').innerHTML != "blank";
							}, "Allowing 8 seconds to ensure we receive no further signal events", 8100);
							runs(function()
							{
								expect(document.getElementById('indicatorOutput').innerHTML).toBe('blank');
							});
						});
					});
				});		
			});
		});

	});


//////////////////////////////////////////////////////////////////////////////////////////////


	describe("Testing the Battery API in Ruby via AJAX.  ", function() {
	
		beforeEach(function() {
	        this.addMatchers({
	            toBeGreaterThanZero: function() {
	                return (this.actual > 0);
	            }
	        });
		});

		afterEach(function() {
		});
		
		var deviceType = getDeviceType();
		var unsupportedDevices = ["mk40", "mk50", "mk30", "mk31"];
		var isSupported = true;
		for(var i = 0; i < unsupportedDevices.length; i++)
		{
			if (deviceType.toLowerCase().indexOf(unsupportedDevices[i].toLowerCase()) != -1)
			{
				isSupported = false;
				break;
			}
		}

    if (isAnyButApplePlatform()) {
		it ("Able to Show and Hide the Battery Icon - TODO: Screenshot Automation", function()
		{
			if (!isSupported)
				return;
			//  Test Red Left
			showIcon('/app/IndicatorsTest/show_battery_icon', 10, 50, 'left', '#FF0000');
			//  todo - Take a Screenshot
			//  Test Blue Right
			showIcon('/app/IndicatorsTest/show_battery_icon', 20, 60, 'right', '#0000FF');
			//  todo - Take a Screenshot
			//  Test Green Up
			showIcon('/app/IndicatorsTest/show_battery_icon', 30, 70, 'up', '#00FF00');
			//  todo - Take a Screenshot
			//  Test Black Down
			showIcon('/app/IndicatorsTest/show_battery_icon', 40, 80, 'down', '#000000');
			//  todo - Take a Screenshot
			//  Test icon can be hidden
			hideIcon('/app/IndicatorsTest/hide_battery_icon');
			//  todo - Take a Screenshot
		});

    }
		it ("Able to access Battery status synchronously", function()
		{
			if (!isSupported)
				return;
			var batteryStatus = getIndicatorStatus('/app/IndicatorsTest/battery_status_sync', 'ignored', 'ignored', 'batteryLifePercent');
			expect(batteryStatus).toBeGreaterThanZero();
			var acLineStatus = getIndicatorStatus('/app/IndicatorsTest/battery_status_sync', 'ignored', 'ignored', 'acLineStatus');
			expect(acLineStatus).toBe('true');
                                                                  if (isAnyButApplePlatform()) {
			     var batteryLifeKnown = getIndicatorStatus('/app/IndicatorsTest/battery_status_sync', 'ignored', 'ignored', 'batteryLifeKnown');
			     expect(batteryLifeKnown).toBe('true');
                                                                  }
		});


		it ("Able to access Battery status Asynchronously (Periodically)", function()
		{
			if (!isSupported)
				return;
			//  Start with default interval (5000ms)
			document.getElementById('indicatorOutput').innerHTML = "blank";
			getIndicatorStatus('/app/IndicatorsTest/battery_status_async', 'periodic', '5000', 'ignored');
			waitsFor(function()
				{
					return document.getElementById('indicatorOutput').innerHTML != "blank";
				}, "Allowing 1 second for the initial battery status to be received", 1000);
			runs(function() 
			{
				//  We got the first value, check the next value only arrives after 5 seconds
				document.getElementById('indicatorOutput').innerHTML = "blank";
				waitsFor(function()
					{
						return document.getElementById('indicatorOutput').innerHTML != "blank";
					}, "Allowing 5 seconds for the second battery status to be received", 5000);		
				runs(function()
				{
					//  Now change the periodicity of the Timer notification to 2 seconds
					document.getElementById('indicatorOutput').innerHTML = "blank";
					changeRefresh('/app/IndicatorsTest/change_battery_refresh', 2000);
					//  We should get an update after 2 seconds
					waitsFor(function()
					{
						return document.getElementById('indicatorOutput').innerHTML != "blank";
					}, "Allowing 2 seconds for the second battery status to be received", 2100);
					runs(function()
					{
						//  Now change the periodicity of the Timed notification to 7 seconds
						document.getElementById('indicatorOutput').innerHTML = "blank";
						changeRefresh('/app/IndicatorsTest/change_battery_refresh', 7000);
						//  We should get an update after 7 seconds
						waitsFor(function()
						{
							return document.getElementById('indicatorOutput').innerHTML != "blank";
						}, "Allowing 7 seconds for the second battery status to be received", 7100);
						runs(function()
						{
							//  Now stop the updates and we would not expect there to be any further activity.
							document.getElementById('indicatorOutput').innerHTML = "blank";
							document.getElementById('indicatorOutput2').innerHTML = "blank";
							getIndicatorStatus('/app/IndicatorsTest/deregister_battery_callback', 'ignored', 'ignored', 'ignored');
							setTimeout(function(){document.getElementById('indicatorOutput2').innerHTML = "fin";}, 8000);
							waitsFor(function()
							{
								return document.getElementById('indicatorOutput2').innerHTML != "blank";
							}, "Allowing 8 seconds to ensure we receive no further battery events", 8100);
							runs(function()
							{
								expect(document.getElementById('indicatorOutput').innerHTML).toBe('blank');
							});
						});
					});
				});		
			});
		});


		it ("Able to access Battery status Asynchronously (System Events)", function()
		{
			if (!isSupported)
				return;
			document.getElementById('indicatorOutput').innerHTML = "blank";
			getIndicatorStatus('/app/IndicatorsTest/battery_status_async', 'system', '5000', 'ignored');
			waitsFor(function()
				{
					return document.getElementById('indicatorOutput').innerHTML != "blank";
				}, "Allowing 1 second for the initial battery status to be received", 1000);

		});

    if (isAnyButApplePlatform()) {

		it ("Able to access Smart Battery Information", function()
		{
			if (!isSupported)
				return;
			var batteryReturn = smartBattery('/app/IndicatorsTest/get_smartbattery', 'serialNumber');
			expect(batteryReturn).not.toBe('');
			var batteryReturn = smartBattery('/app/IndicatorsTest/get_smartbattery', 'partNumber');
			expect(batteryReturn).not.toBe('');
			var batteryReturn = smartBattery('/app/IndicatorsTest/get_smartbattery', 'ratedCapacity');
			expect(batteryReturn).not.toBe('');
			var batteryReturn = smartBattery('/app/IndicatorsTest/get_smartbattery', 'manufactureDate');
			expect(batteryReturn).not.toBe('');
			var batteryReturn = smartBattery('/app/IndicatorsTest/get_smartbattery', 'stateOfHealth');
			expect(batteryReturn).not.toBe('');
		});
     }
	});
	
	describe("TODO - Testing the KeyState API in Ruby via AJAX.  ", function() {
	
		beforeEach(function() {
	        this.addMatchers({
	            toBeGreaterThanZero: function() {
	                return (this.actual > 0);
	            }
	        });
		});

		afterEach(function() {
		});
		
		var deviceType = getDeviceType();
		var unsupportedDevices = ["mk40", "mk50", "mk30", "mk31", "ES40", "MC65", "MC45", "VC70"];
		var isSupported = true;
		for(var i = 0; i < unsupportedDevices.length; i++)
		{
			if (deviceType.toLowerCase().indexOf(unsupportedDevices[i].toLowerCase()) != -1)
			{
				isSupported = false;
				break;
			}
		}

    if (isAnyButApplePlatform()) {
		it ("TODO - Able to Show and Hide the KeyState Icons", function()
		{
			if (!isSupported)
				return;
			//  Show the KeyState Indicators in their default position
			keyStateFunc('/app/IndicatorsTest/show_keystate_defaults', 'ignored', 'ignored', 'ignored', 'ignored');
			//  TODO - Send keyboard shift state to the keyboard through the Instrumentation API
			//  TODO - Capture a screenshot and upload it for analysis against a known image
			//  TODO - Test the above with a multitude of Orange, Shift Lock, Blue, Gray combinations, not all
			//         will be supported on all devices (e.g. Gray keys are only supported on WT4xxx devices)

			//  Hide the KeyState indicators
			keyStateFunc('/app/IndicatorsTest/hide_keystate', 'ignored', 'ignored', 'ignored', 'ignored');
			//  TODO - Capture a screenshot and upload it for analysis against a known image
			
			//  Show the KeyState indicators in a different position
			keyStateFunc('/app/IndicatorsTest/show_keystate_values', 350, 150, 50, 50);
			//  TODO - Send keyboard shift state to the keyboard through the Instrumentation API
			//  TODO - Capture a screenshot and upload it for analysis against a known image
		});
     }
	});
});
