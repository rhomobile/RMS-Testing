var captured = false;
var testResult = '';
describe("System Module JS Test Starts Here", function() {
	beforeEach(function(){
		captured = false;
		testResult = '';
	});

	describe("System Module- getProperty Test Starts Here", function() {
		for (var i=0;i<sys_get_property.length;i++){
			(function(idx){
				if(isTestApplicable(sys_get_property[idx]['osType'])){
					it(sys_get_property[idx]['testName'], function() {
						runs(function(){
							var data = Rho.System.getProperty(sys_get_property[idx]['propertyName']);
							displayResult(sys_get_property[idx]['testName'],data);

						});
						waitsFor(function(){
							return captured;
						},"Waiting For Result",45000);
				    
						runs(function(){
							expect(testResult).toEqual(true);	
						});
						
					});
				}
			})(i);
		}
	});

	describe("System Module-Setting Directly Test Starts Here", function() {
/*		
		it("VT300-027 | call getProperty with locale | ", function() {
			runs(function(){
				var data = Rho.System.getProperty('locale');
	      		displayResult("VT300-027 | call getProperty with locale | ",data);
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",30000);
	    
			runs(function(){
				expect(testResult).toEqual(true);	
			});
			
		});
*/
		it("VT200-0425 | call getAllProperties() | ", function() {
			runs(function(){
				var data =  Rho.System.getAllProperties();
				displayResult("VT200-0425 | call getAllProperties() | ",JSON.stringify(data));
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",45000);
	    
			runs(function(){
				expect(testResult).toEqual(true);	
			});
		});
	});

	describe("System Module- getProperties Test Starts Here", function() {
	
		it("VT200-0511 | call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback | ", function() {
			runs(function(){
				var data = Rho.System.getProperties(['country','deviceName','devicePushId','freeServerPort']);
				displayResult("VT200-0511 | call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback | ",JSON.stringify(data));
			
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",45000);
	    
			runs(function(){
				expect(testResult).toEqual(true);	
			});
		});

		for (var i=0;i<sys_get_properties.length;i++){
			(function(idx){
				if(isTestApplicable(sys_get_properties[idx]['osType'])){
					it(sys_get_properties[idx]['testName'], function() {
						runs(function(){
							var propertyName = sys_get_properties[idx]['propertyName'];
							var strGetProperty = '["'+sys_get_properties[idx]['propertyName']+'"]';
							var objGetProperty = JSON.parse(strGetProperty);
							var data = Rho.System.getProperties(objGetProperty);
							
							data = data[sys_get_properties[idx]['propertyName']];
							displayResult(sys_get_properties[idx]['testName'],JSON.stringify(data));
						
						});

						waitsFor(function(){
							return captured;
						},"Waiting For Result",45000);
				    
						runs(function(){
							expect(testResult).toEqual(true);	
						});
					});
				}
			})(i);
		}
/*
		it("VT300-127  | call getproperties with callback as anonymous function | ", function() {
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
				displayResult("VT300-127 | call getproperties with callback as anonymous function | ",data);
						});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",30000);
	    
			runs(function(){
				expect(testResult).toEqual(true);	
			});
			
		});
*/
		it("VT200-0510 | call getproperties with callback as async defined function | ", function() {
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
				displayResult("VT200-0510 | call getproperties with callback as async defined function | ",data);
				waitsFor(function(){
				return captured;
				},"Waiting For Result",45000);
	    
				runs(function(){
					expect(testResult).toEqual(true);	
				});
			});
		});
		
	});
});