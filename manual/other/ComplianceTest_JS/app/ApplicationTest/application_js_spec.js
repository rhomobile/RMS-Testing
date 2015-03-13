    var platformSupported = ["ANDROID", "WINDOWS", "APPLE"];

    describe("Application Module Test Starts Here", function() {
        if(platformSupported.indexOf(Rho.System.platform)!= -1){

        beforeEach(function() {
            data ='';
            document.getElementById('verificationResult').innerHTML = "";
        });

        if(!isAndroidPlatform() && isAnyButApplePlatform()){
            it("VT200-0357 | get BadLink Uri without setting it", function() {
                dispTestCaseRunning("VT200-0357 | get BadLink Uri without setting it");
                dispExpectedResult("Application should return the default badlink uri " );
                _result.waitToRunTest();

                runs(function()
                {
                    var data = Rho.Application.badLinkURI;
                    dispVerificationStatus(data);
                });
                _result.waitForResponse();

            });
        }

        it("VT200-0358 | Security Token Not passed", function() {

            dispTestCaseRunning("VT200-0358 | Security Token Not passed");
            //setInstruction("check for output");
            dispExpectedResult("it should return  false as the security token check  was passed " );
            _result.waitToRunTest();
            runs(function(){
                var data = Rho.Application.securityTokenNotPassed;
                dispVerificationStatus(data);
            });
            _result.waitForResponse();

        });

        it("VT200-0359 | set StartUri to a web page", function() {

            dispTestCaseRunning("VT200-0359 | set StartUri to a web page");
            //setInstruction("Click on Home button");
            dispExpectedResult("application should navigate to the start uri provided after opening " );
            _result.waitToRunTest();
            runs(function(){
                var data = Rho.Application.startURI;
                dispVerificationStatus(data);
            });
            _result.waitForResponse();

        });

        it("VT200-0360 | Database File path with Local as Partition", function() {

            dispTestCaseRunning("VT200-0360 | Database File path with Local as Partition");
            //setInstruction("check for output");
            dispExpectedResult("should return the location of the database file with partition name local" );
            _result.waitToRunTest();
            runs(function(){
                var beja = Rho.Application.databaseFilePath('local');
                var jija=Rho.Application.relativeDatabaseBlobFilePath(beja)
                var data=Rho.Application.expandDatabaseBlobFilePath(jija);
                dispVerificationStatus(data);
            });

            _result.waitForResponse();

        });
        }else{
            it("Your Platform/Device does not support this feature", function(){

        });
    }

    });
