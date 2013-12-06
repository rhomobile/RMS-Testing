describe("Ajax bridge Test Starts Here", function() {
	
	it("Checks for window['__rho_nativeBridgeType'] value", function(){
		displayResult("If ajax_bridge_true in build.yml it should be 'ajax' <br/> otherwise undefined",window['__rho_nativeBridgeType']+"<br>");
		_result.waitForResponse();
	});
	
	if(window['__rho_nativeBridgeType'] === 'ajax'){
		
		it("should execute common api both file loaded from localserver and file system",function(){
			displayResult("If ajax_bridge_true in build.yml it should be 'ajax' \n otherwise undefined",window['__rho_nativeBridgeType']+"<br>");
			_result.waitForResponse();
		});
		
		it("should execute async call using network api both file loaded from localserver and file system",function(){
			displayResult("If ajax_bridge_true in build.yml it should be 'ajax' \n otherwise undefined",window['__rho_nativeBridgeType']+"<br>");
			_result.waitForResponse();
		});
	}
	
	describe("This will get redirected local file system",function(){
		var timeout= false;
		it("Will load files from server", function(){
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
					window.location.href = "http://192.168.6.27:9091/app/Ajaxbridge/specRunner.html"
				});
		})
	});
	
});
