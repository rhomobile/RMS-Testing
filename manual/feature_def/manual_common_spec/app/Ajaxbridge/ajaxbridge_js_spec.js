describe("Ajax bridge Test Starts Here", function() {
	
	it("Checks for window['__rho_nativeBridgeType'] value", function(){
		dispCurrentProcess(jasmine.getEnv().currentSpec.description);
		displayResult("If ajax_bridge_true in build.yml it should be 'ajax' <br/> otherwise undefined",window['__rho_nativeBridgeType']+"<br>");
		_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
	});
	
	if(window['__rho_nativeBridgeType'] === 'ajax'){
		describe("Should execute common API with ajax_bridge true", function(){
			
			it("Executed Application Common API: AppName",function(){
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);
				displayResult("Output: ",Rho.Application.appName+"<br>");
				_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			});
			
			it("should Execute System Common API: DeviceName",function(){
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);
				displayResult("Output: ",Rho.System.deviceName+"<br>");
				_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			});
			
			//If required we can add more common api.
			//Currently its not required as we are executing all auto common spec with ajax bridge true.
			
			it("should execute async call using network api both file loaded from localserver and file system",function(){
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);

				var srvHost = SERVER_HOST;
				var srvPort = SERVER_PORT;
				var srvHttpUrl = "http://" + srvHost + ":" + srvPort.toString();
				var srvHttpTestMethodsUrl = srvHttpUrl + "/test_methods";
				var callbackfired = false;
				
				function get_callback(params) {
					displayResult("Executed Network Async Call","status :"+params["status"]+"<br>"+"http_error :"+params["http_error"]+"body: "+params["body"]+"<br>");
					callbackfired = true;
				}
				propertyMap = {
					url: srvHttpTestMethodsUrl
				};
				
				Rho.Network.get(propertyMap, get_callback);
				_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			});

		});
		
	}
	
	xdescribe("This will get redirected local file system",function(){
		var timeout= false;
		it("Will load files from server", function(){
			dispCurrentProcess(jasmine.getEnv().currentSpec.description);
			runs(function()
				{
					displayResult("This will get redirected to server now","<br>");
					setTimeout(function() {
						timeout = true;
					}, 5000);
				});

				waitsFor(function()
				{
					if(timeout)
						return true;
				}, 'waiting ...', 5100);

				runs(function()
				{
					//AS loading from local file system is not working. This step skipped now.
					//window.location.href = "http://motobhakta.github.io/rhoapp/Ajaxbridge/specRunner.html" (.io pages not opening might be bug)
				});
		});
	});
	
});
