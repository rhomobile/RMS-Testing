var captured = false;
var testResult = '';
describe("System Module JS Test Starts Here", function() {
	beforeEach(function(){
		captured = false;
		testResult = '';
	});

	describe("System Module-Setting Directly Test Starts Here", function() {

		it("VT200-0682 | call getAllProperties() | ", function() {
			
			setInstruction(jasmine.getEnv().currentSpec.description);
			
			_result.waitToRunTest();
			
			runs(function(){
				Ruby.call('System','getall_props');
			});

			_result.waitForResponse();
		});
	});
	

	describe("System Module- getProperty Test Starts Here", function() {
		for (var i=0;i<sys_get_property.length;i++){
			(function(idx){
				if(isTestApplicable(sys_get_property[idx]['osType'])){
					it(sys_get_property[idx]['testName'], function() {
					
						setInstruction(jasmine.getEnv().currentSpec.description);
						
						_result.waitToRunTest();
						
						runs(function(){
							Ruby.call('System','get_property?prop='+sys_get_property[idx]['propertyName']);
						});

						_result.waitForResponse();
		
					});
				}
			})(i);
		}
	});

	describe("System Module- getProperties Test Starts Here", function() {
	
		it("VT200-0689 | call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback | ", function() {
			
			setInstruction(jasmine.getEnv().currentSpec.description);
			
			_result.waitToRunTest();
			
			runs(function(){
				Ruby.call('System','get_properties');
			});

			_result.waitForResponse();
		});

		for (var i=0;i<sys_get_properties.length;i++){
			(function(idx){
				if(isTestApplicable(sys_get_properties[idx]['osType'])){
					
					it(sys_get_properties[idx]['testName'], function() {
						
						setInstruction(jasmine.getEnv().currentSpec.description);
						
						_result.waitToRunTest();
						
						runs(function(){
							var propertyName = sys_get_properties[idx]['propertyName'];
							//var strGetProperty = '["'+sys_get_properties[idx]['propertyName']+'"]';
							//var objGetProperty = JSON.parse(strGetProperty);

							Ruby.call('System','get_props?prop='+propertyName);
						});

						_result.waitForResponse();
					});
				}
			})(i);
		}

		it("VT200-0688 | call getproperties with callback as async defined function | ", function() {
			
			setInstruction(jasmine.getEnv().currentSpec.description);
			
			_result.waitToRunTest();
			
			runs(function(){
				Ruby.call('System','get_properties_cb');
			});

			_result.waitForResponse();
		});
		
	});
});