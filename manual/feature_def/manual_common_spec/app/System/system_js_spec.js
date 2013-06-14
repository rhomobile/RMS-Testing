describe("System Module JS Test Starts Here", function() {

	describe("System Module-Setting Directly Test Starts Here", function() {
		
		it("VT300-029 | call getProperty with locale | ", function() {
	    
			var data = Rho.System.getProperty('locale');
	      	displayResult("VT300-029 | call getProperty with locale | ",data);
	        var testPassed = confirm("Do you see Correct Output?");
			expect(testPassed).toEqual(true);
		});
		
		it("VT300-070 | call getAllProperties() | ", function() {
	
	    	var data =  Rho.System.getAllProperties();
			displayResult("VT300-070 | call getAllProperties() | ",JSON.stringify(data));
			var testPassed = confirm("Do you see Correct Output?");
			expect(testPassed).toEqual(true);
		});
		
		if(isAnyWindowsFamilyPlatform()){
		
		it("VT300-077 | call isApplicationInstalled() with application name which is there in device | ", function() {
			var data = Rho.System.isApplicationInstalled('rhomobile nativejasmine');
			displayResult("VT300-077 | call isApplicationInstalled() with application name which is there in device | ",data);
			var testPassed = confirm("Do you see Correct Output?");
			expect(testPassed).toEqual(true);
		});
		
		}
		else if(isAndroidPlatform()){
	
		it("VT300-077 | call isApplicationInstalled() with application name which is there in device | ", function() {
			var data = Rho.System.isApplicationInstalled('com.rhomobile.nativejasmine');
			displayResult("VT300-077 | call isApplicationInstalled() with application name which is there in device | ",data);
			var testPassed = confirm("Do you see Correct Output?");
			expect(testPassed).toEqual(true);
		});

		}

		it("VT300-078 | call isApplicationInstalled() with application name which is not there in device | ", function() {
			var data = Rho.System.isApplicationInstalled('RhoElements3');
			displayResult("VT300-078 | call isApplicationInstalled() with application name which is not there in device | ",data);
			var testPassed = confirm("Do you see Correct Output?");
			expect(testPassed).toEqual(true);
		});
	
	});
	

		
		

	describe("System Module- getProperty Test Starts Here", function() {
		for (var i=0;i<sys_get_property.length;i++){
			(function(idx){
				if(testApplicable(sys_get_property[idx]['osType'])){
				it(sys_get_property[idx]['testName'], function() {

					var data = Rho.System.getProperty(sys_get_property[idx]['propertyName']);
					displayResult(sys_get_property[idx]['testName'],data);

					var testPassed = confirm("Do you see Correct Output?");
					expect(testPassed).toEqual(true);
					
				});
				}
			})(i);
		}
	});

	describe("System Module- getProperties Test Starts Here", function() {
	
		it("VT300-125 | call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback | ", function() {
			var data = Rho.System.getProperties(['country','deviceName','devicePushId','freeServerPort']);
			displayResult("VT300-125 | call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback | ",JSON.stringify(data));
			
			var testPassed = confirm("Do you see Correct Output?");
			expect(testPassed).toEqual(true);
		});

		for (var i=0;i<sys_get_properties.length;i++){
			(function(idx){
				if(testApplicable(sys_get_properties[idx]['osType'])){
				it(sys_get_properties[idx]['testName'], function() {
				
					var propertyName = sys_get_properties[idx]['propertyName'];
					var strGetProperty = '["'+sys_get_properties[idx]['propertyName']+'"]';
					var objGetProperty = JSON.parse(strGetProperty);
					var data = Rho.System.getProperties(objGetProperty);
					
					data = data[sys_get_properties[idx]['propertyName']];
					displayResult(sys_get_properties[idx]['testName'],JSON.stringify(data));
					
					var testPassed = confirm("Do you see Correct Output?");
					expect(testPassed).toEqual(true);
				});
				}
			})(i);
		}

		it("VT300-126 | call getproperties with callback as anonymous function | ", function() {
			var data = '';
			var flag = false;

			runs(function(){
			
				Rho.System.getProperties(['country','deviceName','devicePushId','freeServerPort'],function(objData){
					data = JSON.stringify(objData);
					}
				);

				// 1 Sec Wait
				setTimeout(function() {
        			flag = true;
     			}, 1000);
			});

			waitsFor(function() {
    			return flag;
    		}, "1 sec wait", 2000);

    		runs(function(){
				displayResult("VT300-126 | call getproperties with callback as anonymous function | ",data);
				var testPassed = confirm("Do you see Correct Output?");
				expect(testPassed).toEqual(true);
			});
		});

		it("VT300-127 | call getproperties with callback as async defined function | ", function() {
			var data = '';
			var flag = false;
			var sysAsyncCallback = function (objData){data = JSON.stringify(objData);}

			runs(function(){
			
				Rho.System.getProperties(['country','deviceName','devicePushId','freeServerPort'],sysAsyncCallback);

				// 1 Sec Wait
				setTimeout(function() {
        			flag = true;
     			}, 1000);
			});

			waitsFor(function() {
    			return flag;
    		}, "1 sec wait", 2000);

    		runs(function(){
				displayResult("VT300-127 | call getproperties with callback as anonymous function | ",data);
				var testPassed = confirm("Do you see Correct Output?");
				expect(testPassed).toEqual(true);
			});
		});

	});

});