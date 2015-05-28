describe("Application Module Test Starts Here", function() {

    beforeEach(function() {
        data ='';
        document.getElementById('verificationResult').innerHTML = "";
    });

    if(isWindowsMobilePlatform()){
        it("VT200-0613 | get BadLink Uri without setting it", function() {
            dispTestCaseRunning("VT200-0613 | get BadLink Uri without setting it");
            dispExpectedResult("Application should return the default badlink uri " );
            
            _result.waitToRunTest();

            runs(function(){
                Ruby.call('Applicationtest','badlink_uri');
            });

            _result.waitForResponse();

        });
    }

    it("VT200-0614 | Security Token Not passed", function() {

        dispTestCaseRunning("VT200-0614 | Security Token Not passed");
        dispExpectedResult("it should return  false as the security token check  was passed " );

        _result.waitToRunTest();
        
        runs(function(){
            Ruby.call('Applicationtest','securitytoken');
        });
        
        _result.waitForResponse();

    });

    it("VT200-0615 | set StartUri to a web page", function() {

        dispTestCaseRunning("VT200-0615 | set StartUri to a web page");
        dispExpectedResult("application should navigate to the start uri provided after opening " );

        _result.waitToRunTest();
        
        runs(function(){
            Ruby.call('Applicationtest','start_uri');
        });
        
        _result.waitForResponse();

    });

    it("VT200-0616 | Database File path with Local as Partition", function() {


        dispTestCaseRunning("VT200-0616 | Database File path with Local as Partition");
        dispExpectedResult("should return the location of the database file with partition name local" );
        
        _result.waitToRunTest();
        
        runs(function(){
            Ruby.call('Applicationtest','database_file');
        });

        _result.waitForResponse();

    });

});
