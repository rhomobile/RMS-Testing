describe("Generic Test",function(){
	var processId = '';
	var app_name = '';

	if(isAndroidPlatform){
	app_name = 'com.rhomobile.testapp';
	}
	else if(isWindowsMobilePlatform){
	app_name = "\Application\MemoryCheck.exe"
	}
	
	beforeEach(function(){
		processId = "";
	});

	afterEach(function(){

	});
	
	describe("Generic auto test",function(){
	
		it("should check generic.LaunchProcessNonBlocking exist",function(){
			expect(generic.LaunchprocessNonBlocking).toEqual(jasmine.any(Function));
		});
		
		it("should check generic.CloseProcess exist", function(){
			expect(generic.CloseProcess).toEqual(jasmine.any(Function));
		});
		
		it("should check generic.GetProcessExitCode exist", function(){
			expect(generic.GetProcessExitCode).toEqual(jasmine.any(Function));
		});
		
		it("should raised exception when empty string passed to generic.LaunchProcessNonBlocking",function(){
			expect(function(){generic.LaunchProcessNonBlocking('','')}).toThrow(new Error("Add error message here"));
		});
		
		it("should raise exception when no process id passed to generic.CloseProcess", function(){
			expect(function(){generic.CloseProcess()}).toThrow(new Error("Add error message here"));
		});
		
		it("should raise exception when no process id passed to generic.GetProcessExitCode", function(){
			expect(function(){generic.GetProcessExitCode()}).toThrow(new Error("Add error message here"));
		});
	
	});
	describe("Generic manual test", function(){
		it("should launch application and brings to foreground",function(){

			dispTestCaseRunning("Call generic.LaunchProcessNonBlocking(app_name,'')");
			dispExpectedResult("application should get launched, comes to foreground and you can open other app too by sending launched app to background \n This should return the process id");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				processId = generic.LaunchProcessNonBlocking(app_name,'');
				displayResult("Output:",processId+"<br/>");
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("should close the handle application by calling generic.CloseProcess",function(){

			dispTestCaseRunning("This will call generic.CloseProcess passed with handler to close the launched application");
			dispExpectedResult("This will launch the application and will close the handle after 5 sec automatically");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				processId = generic.LaunchProcessNonBlocking(app_name,'');
				setTimeout(function() {
					generic.CloseProcess(processId);
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("should return the exit code of a previously run LaunchProcessNonBlocking call",function(){

			dispTestCaseRunning("This will call generic.GetProcessExitCode passing with launched handler. /n 1: Click on run test. \n 2: Then closed the launched application within 10 secs.");
			dispExpectedResult("It should return the exit code for the non blocking launched process");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				processId = generic.LaunchProcessNonBlocking(app_name,'');
				displayResult("Output:","Process ID "+processId+"<br/>");
				setTimeout(function() {
					var exitProcessId = generic.GetProcessExitCode(processId);
					displayResult("Output:","Exit Code ID "+exitProcessId+"<br/>");
				}, 10000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
		
		it("should return the exit code of a previously run LaunchProcessNonBlocking call (application closed by calling generic.CloseProcess)",function(){

			dispTestCaseRunning("This will call generic.GetProcessExitCode passing with launched handler. /n 1: Click on run test. \n 2: Then application will get closed automatically after 3 secs.");
			dispExpectedResult("It should return the exit code for the non blocking launched process");

			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();

			runs(function(){
				processId = generic.LaunchProcessNonBlocking(app_name,'');
				displayResult("Output:","Process ID "+processId+"<br/>");
				setTimeout(function() {
					generic.CloseProcess(processId);
					var exitProcessId = generic.GetProcessExitCode(processId);
					displayResult("Output:","Exit Code ID "+exitProcessId+"<br/>");
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
	});
	
	
});