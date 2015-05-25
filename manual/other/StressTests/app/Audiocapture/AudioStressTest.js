describe("Audio Capture Stress Tests", function(){
	var a = 0;
	var resultDiv = "";
	var filewithTime = new Date().getTime();
	
	var audioCallBack = function (args) {		
		a = a + 1;		
		resultDiv.innerHTML = "";
		resultDiv = document.getElementById('actResult');
        //resultDiv.innerHTML = JSON.stringify(args);	
		resultDiv.innerHTML += "<br/>#############################";
		resultDiv.innerHTML += "<br/>Count: " + a;		
		resultDiv.innerHTML += '<br/>FilePath:- ' + JSON.stringify(args.fileName);
		resultDiv.innerHTML += '<br/>Capture Status:- ' + JSON.stringify(args.status);
		resultDiv.innerHTML += '<br/>Failuer Message:- ' + JSON.stringify(args.message);	
		
        resultDiv.style.display = 'block';
        var tempFileName=args.fileName.substring(7);
        //File Exist Check
        if(Rho.RhoFile.exists(tempFileName)){
            // Audio Play
			resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Exists";
        }
        else{
            resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Not Exists";
        }
		resultDiv.innerHTML += "<br/>##############################";
        	setTimeout(function(){
				//resultDiv.innerHTML = "";	
				resultDiv.innerHTML = "######Now capture your Audio######";				
				Rho.AudioCapture.start({}, audioCallBack);
            },22000);
		
    }
	var wmCallBack = function (args) {		
		a = a + 1;		
		resultDiv.innerHTML = "";
		resultDiv = document.getElementById('actResult');
        //resultDiv.innerHTML = JSON.stringify(args);	
		resultDiv.innerHTML += "<br/>#############################";
		resultDiv.innerHTML += "<br/>Count: " + a;		
		resultDiv.innerHTML += '<br/>FilePath:- ' + JSON.stringify(args.fileName);
		resultDiv.innerHTML += '<br/>Capture Status:- ' + JSON.stringify(args.status);
		resultDiv.innerHTML += '<br/>Failuer Message:- ' + JSON.stringify(args.message);	
		
        resultDiv.style.display = 'block';
        var tempFileName=args.fileName.substring(7);
        //File Exist Check
        if(Rho.RhoFile.exists(tempFileName)){
            // Audio Play
			resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Exists";
        }
        else{
            resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Not Exists";
        }
		resultDiv.innerHTML = resultDiv.innerHTML+ "<br/>############################";
        	setTimeout(function(){
				//resultDiv.innerHTML = "";	
				resultDiv.innerHTML = "######Now capture your Audio######";				
				Rho.AudioCapture.start({}, wmCallBack);
            },32000);
		
    }
	
	var androidCallBack = function (args) {		
		a = a + 1;		
		resultDiv.innerHTML = "";
		resultDiv = document.getElementById('actResult');
        //resultDiv.innerHTML = JSON.stringify(args);	
		resultDiv.innerHTML += "<br/>#############################";
		resultDiv.innerHTML += "<br/>Count: " + a;		
		resultDiv.innerHTML += '<br/>FilePath:- ' + JSON.stringify(args.fileName);
		resultDiv.innerHTML += '<br/>Capture Status:- ' + JSON.stringify(args.status);
		resultDiv.innerHTML += '<br/>Failuer Message:- ' + JSON.stringify(args.message);	
		
        resultDiv.style.display = 'block';
        var tempFileName=args.fileName.substring(7);
        //File Exist Check
        if(Rho.RhoFile.exists(tempFileName)){
            // Audio Play
			resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Exists";
        }
        else{
            resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Not Exists";
        }
		resultDiv.innerHTML = resultDiv.innerHTML+ "<br/>############################";
        	setTimeout(function(){
				//resultDiv.innerHTML = "";	
				resultDiv.innerHTML = "######Now capture your Audio######";				
				Rho.AudioCapture.start({}, androidCallBack);
            },32000);
		
    }
	
	var wmTimeCallBack = function (args) {		
		a = a + 1;		
		resultDiv.innerHTML = "";
		resultDiv = document.getElementById('actResult');
        //resultDiv.innerHTML = JSON.stringify(args);	
		resultDiv.innerHTML += "<br/>#############################";
		resultDiv.innerHTML += "<br/>Count: " + a;		
		resultDiv.innerHTML += '<br/>FilePath:- ' + JSON.stringify(args.fileName);
		resultDiv.innerHTML += '<br/>Capture Status:- ' + JSON.stringify(args.status);
		resultDiv.innerHTML += '<br/>Failuer Message:- ' + JSON.stringify(args.message);	
		
        resultDiv.style.display = 'block';
        var tempFileName=args.fileName.substring(7);
        //File Exist Check
        if(Rho.RhoFile.exists(tempFileName)){
            // Audio Play
			resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Exists";
        }
        else{
            resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Not Exists";
        }
		resultDiv.innerHTML = resultDiv.innerHTML+ "<br/>############################";
        	setTimeout(function(){
				//resultDiv.innerHTML = "";	
				resultDiv.innerHTML = "######Now capture your Audio######";		
				filewithTime = new Date().getTime();
				Rho.AudioCapture.start({'fileName': "\\Application\\"+filewithTime}, wmTimeCallBack);
            },122000);
		
    }
	
	var androidTimeCallBack = function (args) {		
		a = a + 1;		
		resultDiv.innerHTML = "";
		resultDiv = document.getElementById('actResult');
        //resultDiv.innerHTML = JSON.stringify(args);	
		resultDiv.innerHTML += "<br/>#############################";
		resultDiv.innerHTML += "<br/>Count: " + a;		
		resultDiv.innerHTML += '<br/>FilePath:- ' + JSON.stringify(args.fileName);
		resultDiv.innerHTML += '<br/>Capture Status:- ' + JSON.stringify(args.status);
		resultDiv.innerHTML += '<br/>Failuer Message:- ' + JSON.stringify(args.message);	
		
        resultDiv.style.display = 'block';
        var tempFileName=args.fileName.substring(7);
        //File Exist Check
        if(Rho.RhoFile.exists(tempFileName)){
            // Audio Play
			resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Exists";
        }
        else{
            resultDiv.innerHTML = resultDiv.innerHTML + "<br/>On Device: File Not Exists";
        }
		resultDiv.innerHTML = resultDiv.innerHTML+ "<br/>############################";
        	setTimeout(function(){
				//resultDiv.innerHTML = "";	
				resultDiv.innerHTML = "######Now capture your Audio######";	
				filewithTime = new Date().getTime();
				Rho.AudioCapture.start({'fileName': "/sdcard/Application/"+filewithTime}, androidTimeCallBack);
            },122000);
		
    }


    it('Continuos audio capture for default duration', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('captured audio file should get saved in root dirctory of wm devices and in sdcard for andorid devices and should not be any hang/memory leak/device lock ');
        
		_result.waitToRunTest();
        runs(function(){
			var resultDiv = document.getElementById('actResult');
            Rho.AudioCapture.start({'fileName': "AudioStress"}, audioCallBack);
			
        });

    });
	
	if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
		it('Continuos audio capture with setting all properties', function () {
	        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
	        dispExpectedResult('captured audio file should get saved in \\Application\\AudioStress and should not be any hang/memory leak/device lock');
	        
	        _result.waitToRunTest();
			var dirName = "\\Application";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir("\\Application");
			}
			runs(function(){
				var resultDiv = document.getElementById('actResult');
	            Rho.AudioCapture.start({'fileName': "\\Application\\AudioStress", 'maxDuration': 30000}, wmCallBack);

	        });
	    });
	}

    if(isAndroidPlatform()){
	    it('Continuos audio capture with setting all properties', function () {
	        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
	        dispExpectedResult('captured audio file should get saved in /sdcard/Application/AudioStress and should not be any hang/memory leak/device lock');
	        
	        _result.waitToRunTest();
			var dirName = "/sdcard/Application";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir("/sdcard/Application");
			}	
	        runs(function(){
				resultDiv = document.getElementById('actResult');
				Rho.AudioCapture.start({'fileName': "/sdcard/Application/AudioStress", 'maxDuration': 30000, 'encoder': Rho.AudioCapture.ENCODER_AMR_NB}, androidCallBack);
	        });
			
	    });
    }
	
	if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
		it('Continuos audio capture with setting fileName with different timestamp', function () {
	        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
	        dispExpectedResult('captured audio file should get saved under \\Application\\ and check for the behaviour after memory got full and should not be any crash/memory leak/device lockup');
	        
	        _result.waitToRunTest();
			var dirName = "\\Application";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir("\\Application");
			}
			runs(function(){
				var resultDiv = document.getElementById('actResult');
	            Rho.AudioCapture.start({'fileName': "\\Application\\"+filewithTime, 'maxDuration': 120000}, wmTimeCallBack);

	        });
	    });
	}

    if(isAndroidPlatform()){
	    it('Continuos audio capture with setting fileName with different timestamp', function () {
	        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
	        dispExpectedResult('captured audio file should get saved under /sdcard/Application and check for the behaviour after memory got full and should not be any crash/memory leak/device lockup');
	        
	        _result.waitToRunTest();
			var dirName = "/sdcard/Application";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir("/sdcard/Application");
			}	
	        runs(function(){
				resultDiv = document.getElementById('actResult');
				Rho.AudioCapture.start({'fileName': "/sdcard/Application/"+filewithTime, 'maxDuration': 120000}, androidTimeCallBack);
	        });
			
	    });
    }

});
