describe("Application Module Test Starts Here", function() {

    beforeEach(function() {
        data ='';
        document.getElementById("actResult").innerHTML = "init";
        displaydata(data);
    });


    it("VT200-0613 | get BadLink Uri without setting it", function() {

        runs(function()
        {
            setObjective("VT200-0613 | get BadLink Uri without setting it");
            setInstruction("check for displayed output");
            setExpected("Application should return the default badlink uri " );
            var data = Rho.Application.badLinkURI;
            displaydata(data);
        });

        runs(function()
        {       
            waitsFor(function() {
            return document.getElementById("actResult").innerHTML != "init";
            }, "Timed out waiting for tester to respond", 300000);
            runs(function() {
            expect("pass").toEqual(document.getElementById("actResult").innerHTML);
            }); 
        });

    });

    it("VT200-0614 | Security Token Not passed", function() {

        runs(function()
        {
            setObjective("VT200-0614 | Security Token Not passed");
            setInstruction("check for output");
            setExpected("it should return  false as the security token check  was passed " );
            var data = Rho.Application.securityTokenNotPassed;
            displaydata(data);
        });

        runs(function()
        {       
            waitsFor(function() {
            return document.getElementById("actResult").innerHTML != "init";
            }, "Timed out waiting for tester to respond", 300000);
            runs(function() {
            expect("pass").toEqual(document.getElementById("actResult").innerHTML);
            }); 
        });

    });

    it("VT200-0615 | set StartUri to a web page", function() {

        runs(function()
        {
            setObjective("VT200-0615 | set StartUri to a web page");
            setInstruction("Click on Home button");
            setExpected("application should navigate to the start uri provided after opening " );
            var data = Rho.Application.startURI;
            displaydata(data);
        });

        runs(function()
        {       
            waitsFor(function() {
            return document.getElementById("actResult").innerHTML != "init";
            }, "Timed out waiting for tester to respond", 300000);
            runs(function() {
            expect("pass").toEqual(document.getElementById("actResult").innerHTML);
            }); 
        });

    });

    it("VT200-0616 | Database File path with Local as Partition", function() {

        runs(function()
        {
            setObjective("VT200-0616 | Database File path with Local as Partition");
            setInstruction("check for output");
            setExpected("should return the location of the database file with partition name local" );
            var beja = Rho.Application.databaseFilePath('local');
            var jija=Rho.Application.relativeDatabaseBlobFilePath(beja)
            var data=Rho.Application.expandDatabaseBlobFilePath(jija);
            displaydata(data);
        });

        runs(function()
        {       
            waitsFor(function() {
            return document.getElementById("actResult").innerHTML != "init";
            }, "Timed out waiting for tester to respond", 300000);
            runs(function() {
            expect("pass").toEqual(document.getElementById("actResult").innerHTML);
            }); 
        });

    });

});
