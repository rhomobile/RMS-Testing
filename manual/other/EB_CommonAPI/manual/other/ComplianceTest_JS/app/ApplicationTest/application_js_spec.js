describe("Application Module Test Starts Here", function() {

    beforeEach(function() {
        data ='';
        document.getElementById('verificationResult').innerHTML = "";
    });


    it("VT200-0613 | get BadLink Uri without setting it", function() {
        dispTestCaseRunning("VT200-0613 | get BadLink Uri without setting it");
        dispExpectedResult("Application should return the default badlink uri " );
        _result.waitToRunTest();

        runs(function()
        {
            var data = EB.Application.badLinkURI;
            dispVerificationStatus(data);
        });
        _result.waitForResponse();

    });

    it("VT200-0614 | Security Token Not passed", function() {

        dispTestCaseRunning("VT200-0614 | Security Token Not passed");
        //setInstruction("check for output");
        dispExpectedResult("it should return  false as the security token check  was passed " );
        _result.waitToRunTest();
        runs(function(){
            var data = EB.Application.securityTokenNotPassed;
            dispVerificationStatus(data);
        });
        _result.waitForResponse();

    });

    it("VT200-0615 | set StartUri to a web page", function() {


        dispTestCaseRunning("VT200-0615 | set StartUri to a web page");
        //setInstruction("Click on Home button");
        dispExpectedResult("application should navigate to the start uri provided after opening " );
        _result.waitToRunTest();
        runs(function(){
            var data = EB.Application.startURI;
            dispVerificationStatus(data);
        });
        _result.waitForResponse();

    });

    it("VT200-0616 | Database File path with Local as Partition", function() {


        dispTestCaseRunning("VT200-0616 | Database File path with Local as Partition");
        //setInstruction("check for output");
        dispExpectedResult("should return the location of the database file with partition name local" );
        _result.waitToRunTest();
        runs(function(){
            var beja = EB.Application.databaseFilePath('local');
            var jija=EB.Application.relativeDatabaseBlobFilePath(beja)
            var data=EB.Application.expandDatabaseBlobFilePath(jija);
            dispVerificationStatus(data);
        });

        _result.waitForResponse();

    });

});
