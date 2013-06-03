describe("<log module specs>", function () {
    var originalLogSettings = {};
    
    // this function will execute before each of test case execution i.e it function
  
    beforeEach(function () {
        originalLogSettings = {};
        originalLogSettings.logLevel = Rho.Log.level;
        originalLogSettings.destination = Rho.Log.destination;
        originalLogSettings.includeCategories = Rho.Log.includeCategories;
        originalLogSettings.excludeCategories = Rho.Log.excludeCategories;
        originalLogSettings.fileSize = Rho.Log.fileSize;
        originalLogSettings.filePath = Rho.Log.filePath;
        originalLogSettings.memoryPeriod = Rho.Log.memoryPeriod;
        originalLogSettings.netTrace = Rho.Log.netTrace;
        originalLogSettings.skipPost = Rho.Log.skipPost;
        originalLogSettings.excludeFilter = Rho.Log.excludeFilter;
        originalLogSettings.destinationURI = Rho.Log.destinationURI;
        displayflag = false;
    }); 

 // this function will execute after each of test case execution i.e it function
 
    
    afterEach(function () {
        Rho.Log.logLevel = originalLogSettings.level;
        Rho.Log.destination = originalLogSettings.destination;
        Rho.Log.includeCategories = originalLogSettings.includeCategories;
        Rho.Log.excludeCategories = originalLogSettings.excludeCategories;
        Rho.Log.fileSize = originalLogSettings.fileSize;
        Rho.Log.filePath = originalLogSettings.filePath;
        Rho.Log.memoryPeriod = originalLogSettings.memoryPeriod;
        Rho.Log.netTrace = originalLogSettings.netTrace;
        Rho.Log.skipPost = originalLogSettings.skipPost;
        Rho.Log.excludeFilter = originalLogSettings.excludeFilter;
        Rho.Log.destinationURI = originalLogSettings.destinationURI;
    });
    
    
    
    // Set log destination to file only
    it("VT290-300 : Log destination to file only", function() {
      	 runs(function(){
      		Rho.Log.destination = ["file"];
      		Rho.Log.includeCategories = "*"
      		var info = "Log message with application public folder displayed below : ";
      		Rho.Log.info(info, "VT290-300");	      		
      		var myvar = Rho.Application.publicFolder;
      		Rho.Log.info("Application public folder : " +myvar, "VT290-300")
      		expect(Rho.Log.destination).toEqual(["file"]);
      	 });
    });
    
    // Set log destination to stdio only
    it("VT290-301 : Log destination to stdio only", function() {
         runs(function(){
          	Rho.Log.destination = ["stdio"];
          	expect(Rho.Log.destination).toEqual(["stdio"]);
         });
    });
    
    // Set log destination to uri only
    it("VT290-302 : Log destination to uri only", function() {
        runs(function(){
         	Rho.Log.destination = ["uri"];
         	expect(Rho.Log.destination).toEqual(["uri"]);
        });
    });
    
    // Set log destination to file,stdio and uri
    it("VT290-303 : Log destination to file,stdio and uri", function() {
        runs(function(){
        	Rho.Log.destination = ["file","stdio","uri"];
        	//var destinationValue = ["file","stdio","uri"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);
        });
    });
    
    // Set log destination to stdio, file and uri
    it("VT290-304 : Log destination to stdio, file and uri", function() {
        runs(function(){
        	Rho.Log.destination = ["stdio","file","uri"];
        	//var destinationValue = ["stdio","file","uri"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);
        });
    });
    
    // Set log destination to stdio, uri and file
    it("VT290-305 : Log destination to stdio, uri and file", function() {
        runs(function(){
        	Rho.Log.destination = ["stdio","uri","file"];
        	//var destinationValue = ["stdio","uri","file"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);
        });
    });
    
    // Set log destination to uri, file and stdio
    it("VT290-306 : Log destination to uri, file and stdio", function() {
        runs(function(){
        	Rho.Log.destination = ["uri","file","stdio"];
        //var destinationValue = ["uri","file","stdio"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);
        });
    });
    
    // Set log destination to uri, stdio and file
    it("VT290-307 : Log destination to uri, stdio and file", function() {
        runs(function(){
        	Rho.Log.destination = ["uri","stdio","file"];
        	//var destinationValue = ["uri","stdio","file"];
         //	Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);
        });
    });
    
    // Set log destination to file and stdio
    it("VT290-308 : Log destination to file and stdio", function() {
        runs(function(){
        	Rho.Log.destination = ["file","stdio"];
        	//var destinationValue = ["file","stdio"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","stdio"]);
        });
    });
    
    // Set log destination to file and uri
    it("VT290-309 : Log destination to file and uri", function() {
        runs(function(){
        	Rho.Log.destination = ["file","uri"];
        	//var destinationValue = ["file","stdio"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["file","uri"]);
        });
    });
    
    // Set log destination to stdio and uri
    it("VT290-310 : Log destination to stdio and uri", function() {
        runs(function(){
        	Rho.Log.destination = ["stdio","uri"];
        	//var destinationValue = ["file","stdio"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual(["stdio","uri"]);
        });
    });
    
    // Set log destination to empty
    it("VT290-311 : Log destination to empty", function() {
        runs(function(){
        	Rho.Log.destination = [];
        	//var destinationValue = ["file","stdio"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual([]);
        });
    });
    
    // Set log destination to invalid
    it("VT290-312 : Log destination to invalid", function() {
        runs(function(){
        	Rho.Log.destination = ["folder"];
        	//var destinationValue = ["file","stdio"];
         	//Rho.Log.destination = [destinationValue];
         	expect(Rho.Log.destination).toEqual([]);
        });
    });
    
    // Set log destinationURI to valid destination
    it("VT290-313 : Set Log destinationURI to valid destination", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://localhost";
        	expect(Rho.Log.destinationURI).toEqual("http://localhost");
        });
    });
    
    // Set Log destinationURI to valid destination with host address having IP address.
    it("VT290-314 : Set Log destinationURI to valid destination with host address having IP address.", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://127.0.0.1";
        	expect(Rho.Log.destinationURI).toEqual("http://127.0.0.1");
        });
    });
    
    // Set Log destinationURI to valid destination with host address having IP address.
    it("VT290-315 : Set Log destinationURI to valid destination with host address having DNS Name as address.", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://rhologs.heroku.com";
        	expect(Rho.Log.destinationURI).toEqual("http://rhologs.heroku.com");
        });
    });
    
    // Set Log destinationURI to valid destination with port number
    it("VT290-316 : Set Log destinationURI to valid destination with port number", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://rhologs.heroku.com:80";
        	expect(Rho.Log.destinationURI).toEqual("http://rhologs.heroku.com:80");
        });
    });
    
    // Set Log destinationURI to valid secure destination
    it("VT290-317 : Set Log destinationURI to valid secure destination", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://rhologs.heroku.com:443";
        	expect(Rho.Log.destinationURI).toEqual("http://rhologs.heroku.com:443");
        });
    });
    
    // Set Log destinationURI to empty destination
    it("VT290-318 : Set Log destinationURI to empty destination", function() {
        runs(function(){
        	Rho.Log.destinationURI = "";
        	expect(Rho.Log.destinationURI).toEqual(originalLogSettings.destinationURI);
        });
    });
    
    // Set Log destinationURI to invalid destination
    it("VT290-319 : Set Log destinationURI to invalid destination", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://invaliduri";
        	expect(Rho.Log.destinationURI).toEqual("http://invaliduri");
        });
    });
    
    // Set Log excludeCategories one module
    it("VT290-321 : Set Log excludeCategories : Application", function() {
        runs(function(){
        	Rho.Log.excludeCategories = "Application";
            expect(Rho.Log.excludeCategories).toEqual("Application");
            var info = "Log Messages related to application should not be displayed : VT290-321";
      		Rho.Log.info(info, "VT290-321");	      		
      		var myvar = Rho.Application.publicFolder;
      		Rho.Log.info("Log messages regarding application should not be displayed in above","VT290-321");
        });
    });
    
    // Set Log excludeCategories multiple modules
    it("VT290-322 : Set Log excludeCategories to multiple modules: database, WebView", function() {
        runs(function(){
        	Rho.Log.excludeCategories = "system, database, WebView";
            expect(Rho.Log.excludeCategories).toEqual("system, database, WebView");
            var info = "Log Messages related to <system, database, WebView> should not be displayed : VT290-322";
      		Rho.Log.info(info, "VT290-322");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <system, database, WebView> should not be displayed in above","VT290-322");
        });
    });
     
    // Set Log excludeCategories to empty
    it("VT290-323 : Set Log excludeCategories to empty", function() {
        runs(function(){
        	Rho.Log.excludeCategories = " ";
            expect(Rho.Log.excludeCategories).toEqual(' ');
            var info = "Log Messages related to <system, database, WebView> should be displayed : VT290-323";
      		Rho.Log.info(info, "VT290-323");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <system, database, WebView> should be displayed in above","VT290-323");
        });
    });
    
    // Set Log excludeCategories invalid module
    it("VT290-324 : Set Log excludeCategories : invalid", function() {
        runs(function(){
        	Rho.Log.excludeCategories = "invalid";
            expect(Rho.Log.excludeCategories).toEqual("invalid");
            var info = "Log Messages related to <system, database, WebView> should be displayed : VT290-324";
      		Rho.Log.info(info, "VT290-324");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <system, database, WebView> should be displayed in above","VT290-324");
        });
    });
    
    // Set Log excludefilter 
    it("VT290-325 : Set Log excludefilter : username, password", function() {
        runs(function(){
        	Rho.Log.excludeFilter = "username,password";
            expect(Rho.Log.excludeFilter).toEqual("username,password");
        });
    });
    
    // Set Log excludefilter  to empty
    it("VT290-326 : Set Log excludefilter to empty", function() {
        runs(function(){
        	Rho.Log.excludeFilter = " ";
            expect(Rho.Log.excludeFilter).toEqual(" ");
        });
    });
    
    // Set Log excludefilter  to invalid
    it("VT290-327 : Set Log excludefilter to invalid", function() {
        runs(function(){
        	Rho.Log.excludeFilter = "aaa, bbb";
            expect(Rho.Log.excludeFilter).toEqual("aaa,bbb");
        });
    });
    
    
    
    // Set log filesize to 100000 KB
    it("VT290-334 : Set Log filsize | 102400000", function() {
        runs(function(){
        	Rho.Log.fileSize = 102400000
            expect(Rho.Log.fileSize).toEqual(102400000);
        });
    });
    
    // Set log filesize to 0 KB
    it("VT290-335 : Set Log filsize | 0", function() {
        runs(function(){
        	Rho.Log.fileSize = 0
            expect(Rho.Log.fileSize).toEqual(0);
        });
    });
    
    // Set log filesize to negative
    it("VT290-336 : Set Log filsize | 0", function() {
        runs(function(){
        	Rho.Log.fileSize = -102400
            expect(Rho.Log.fileSize).toEqual(5242880);
        });
    });
    
    // Set log filesize to empty
    it("VT290-337 : Set Log filsize | 0", function() {
        runs(function(){
        	Rho.Log.fileSize = 
            expect(Rho.Log.fileSize).toEqual(0);
        });
    });
    
    // Set log filesize to invalid value
    it("VT290-338 : Set Log filsize | 0", function() {
        runs(function(){
        	Rho.Log.fileSize = "invalid"
            expect(Rho.Log.fileSize).toContain("integer");
        });
    });
    
    // Set Log includeCategories one module
    it("VT290-339 : Set Log includeCategories | database", function() {
        runs(function(){
        	Rho.Log.includeCategories = "database";
        	var info = "Log Messages related to <database> should be displayed : VT290-339";
      		Rho.Log.info(info, "VT290-339");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <database> should be displayed in above","VT290-339");
            expect(Rho.Log.includeCategories).toEqual("database");
            
        });
    });
    
    // Set Log includeCategories *
    it("VT290-340 : Set Log includeCategories to * | *", function() {
        runs(function(){
        	Rho.Log.includeCategories = "*";
        	var info = "Log Messages related to <system, webview, database> should be displayed : VT290-340";
      		Rho.Log.info(info, "VT290-340");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <system, webview, database> should be displayed in above","VT290-340");
            expect(Rho.Log.includeCategories).toEqual("*");
        });
    });
    
    // Set Log includeCategories multiple modules
    it("VT290-341 : Set Log includeCategories to multiple modules | database, WebView", function() {
        runs(function(){
        	Rho.Log.includeCategories = "database, WebView, System";
        	var info = "Log Messages related to <system, webview, database> should be displayed : VT290-341";
      		Rho.Log.info(info, "VT290-341");
          setTimeout(function() {
			          displayflag = true;
			   }, 15000);
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <system, webview, database> should be displayed in above","VT290-341");
            expect(Rho.Log.includeCategories).toEqual("database, WebView, System");
        });
        
        waitsFor(function() {
			   return displayflag;
			}, "wait", 16000);

    });
    
    // Set Log includeCategories valid and Invalid
    it("VT290-342 : Set Log includeCategories to valid and invalid modules | database, WebView", function() {
        runs(function(){
        	Rho.Log.includeCategories = "aaa, database, WebView";
        	var info = "Log Messages related to <webview, database> should be displayed : VT290-342";
      		Rho.Log.info(info, "VT290-342");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <webview, database> should be displayed in above","VT290-342");
            expect(Rho.Log.includeCategories).toEqual("aaa, database, WebView");
        });
    });
     
    // Set Log includeCategories to empty
    it("VT290-343 : Set Log includeCategories to empty | ' '", function() {
        runs(function(){
        	Rho.Log.includeCategories = " ";
        	var info = "Log Messages related to <database> should be displayed : VT290-343";
      		Rho.Log.info(info, "VT290-343");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.info("Log Messages related to <database> should be displayed in above","VT290-343");
            expect(Rho.Log.includeCategories).toEqual(' ');
        });
    });
    
    // Set Log includeCategories invalid module
    it("VT290-344 : Set Log includeCategories | invalid", function() {
        runs(function(){
        	Rho.Log.includeCategories = "invalid";
        	var info = "Log Messages related to <database> should be displayed : VT290-344";
      		Rho.Log.info(info, "VT290-344");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.info("Log Messages related to <database> should be displayed in above","VT290-344");
            expect(Rho.Log.includeCategories).toEqual("invalid");
        });
    });
    
    // Set Log include and exclude Categories
    it("VT290-345 : Set Log include and excludeCategories | application and WebView logs displayed", function() {
        runs(function(){
        	Rho.Log.excludeCategories = "database, network";
        	Rho.Log.includeCategories = "application, WebView";
        	var info = "Log Messages related to <webview, Application> should be displayed and database not displayed: VT290-345";
      		Rho.Log.info(info, "VT290-345");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		var version_info = Rho.System.osVersion;
      		//alert(version_info);
      		Rho.WebView.fullScreen = true;            
            Rho.WebView.fullScreen = false;
      		Rho.Log.info("Log Messages related to <webview, Application> should be displayed and database not displayed in above","VT290-342");
            expect(Rho.Log.excludeCategories).toEqual("database, network");
            expect(Rho.Log.includeCategories).toEqual("application, WebView");
        });
    });
    
    // Set Log Level to 4
    it("VT290-346 : Set Log Level to 4 | 4", function() {
        runs(function(){
        	Rho.Log.level = 4;
        	logLevel = Rho.Log.level;
        	var info = "No logs displayed : VT290-346";
      		Rho.Log.info(info, "VT290-346");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.info("No logs displayed in above","VT290-346");
            expect(logLevel).toEqual(4);
        });
    });
    
  
    // Set Log Level to 3
    it("VT290-347 : Set Log Level to 3 | 3", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	var info = "only error log related to database displayed : VT290-347";
        	Rho.Log.info(info, "VT290-347");
        	Rho.Log.level = 3;
        	logLevel = Rho.Log.level;
        	var info = "Info: only error log related to database displayed : VT290-347";
      		Rho.Log.info(info, "VT290-347");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.error("Error : Application Error Message", "Database")
      		Rho.Log.info("only error log related to database in above","VT290-347");
            expect(logLevel).toEqual(3);
        });
    });
    
    // Set Log Level to 2
    it("VT290-348 : Set Log Level to 2 | 2", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	logLevel = Rho.Log.level;
        	var info = "fatal, error and warning log related to database displayed : VT290-348";
        	Rho.Log.info(info, "VT290-348");
        	Rho.Log.level = 2;
        	logLevel = Rho.Log.level;
        	var info = "Info : only error log related to database displayed : VT290-348";
      		Rho.Log.info(info, "VT290-348");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.error("Error : Application Error Message", "VT290-348");
      		Rho.Log.warning("Warning : Application warning Message", "VT290-348");      		
      		Rho.Log.info("fatal, error and warning log related to database displayed in above","VT290-348");
            expect(logLevel).toEqual(2);
        });
    });
    
    // Set Log Level to 1
    it("VT290-349 : Set Log Level to 1 | 1", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	logLevel = Rho.Log.level;
        	var info = "fatal, error and warning, info log related to database displayed : VT290-349";
        	Rho.Log.info(info, "VT290-349");
        	Rho.Log.level = 1;
        	logLevel = Rho.Log.level;
        	var info = "Info : only error log related to database displayed : VT290-349";
      		Rho.Log.info(info, "VT290-349");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.trace("trace : Application Error Message", "VT290-349");
      		Rho.Log.error("Error : Application Error Message", "VT290-349");
      		Rho.Log.warning("Warning : Application warning Message", "VT290-349");      		
      		Rho.Log.info("fatal, error and warning log related to database displayed in above","VT290-349");
            expect(logLevel).toEqual(1);
        });
    });
    
    // Set Log Level to 0
    it("VT290-350 : Set Log Level to 0 | 0", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	logLevel = Rho.Log.level;
        	var info = "all log messages to displayed : VT290-350";
        	Rho.Log.info(info, "VT290-350");
        	Rho.Log.level = 0;
        	logLevel = Rho.Log.level;
        	var info = "Info : only error log related to database displayed : VT290-350";
      		Rho.Log.info(info, "VT290-350");	      		
      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
      		//db.close();
      		Rho.Log.trace("trace : Application Error Message", "VT290-350");
      		Rho.Log.error("Error : Application Error Message", "VT290-350");
      		Rho.Log.warning("Warning : Application warning Message", "VT290-350");      		
      		Rho.Log.info("fatal, error and warning log related to database displayed in above","VT290-350");
            expect(logLevel).toEqual(0);
        });
    });
    
    // Set Log Level to 100
    it("VT290-351 : Set Log Level to 100 | 0", function() {
        runs(function(){
        	originalLevel = Rho.Log.level;
        	//puts "#{originalLevel}"
        	Rho.Log.level = 100;
        	logLevel = Rho.Log.level; 
            expect(logLevel).toEqual(originalLevel);
        });
    });
    
    // Set Log Level to negative value
    it("VT290-352 : Set Log Level to -2 | 0", function() {
        runs(function(){
        	originalLevel = Rho.Log.level;
        	Rho.Log.level = -2;
        	logLevel = Rho.Log.level; 
            expect(logLevel).toEqual(originalLevel);
        });
    });
    
    // Set Log Level to empty
    it("VT290-353 : Set Log Level to empty | 0", function() {
        runs(function(){
        	originalLevel = Rho.Log.level;
        	Rho.Log.level =
        	logLevel = Rho.Log.level; 
            expect(logLevel).toEqual(originalLevel);
        });
    });
    
    // Set Log Level to invalid i.e string
    it("VT290-354 : Set Log Level to string | 0", function() {
        runs(function(){
        	originalLevel = Rho.Log.level;
        	Rho.Log.level = "invalid";
        	logLevel = Rho.Log.level; 
            expect(logLevel).toEqual(originalLevel);
        });
    });
    
    // Set Log Memory period to 5 seconds
    it("VT290-355 : Set Log Memory period to 5 secs | 5000", function() {
        runs(function(){
        	expectedValue = 5000;
        	Rho.Log.memoryPeriod = 5000;
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
    // Set Log Memory period to 5 seconds
    it("VT290-355 : Set Log Memory period to 5 secs | 5000", function() {
        runs(function(){
        	expectedValue = 5000;
        	Rho.Log.memoryPeriod = 5000;
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
    // Set Log Memory period to 10 seconds
    it("VT290-356 : Set Log Memory period to 10 secs | 10000", function() {
        runs(function(){
        	expectedValue = 10000;
        	Rho.Log.memoryPeriod = 10000;
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
    // Set Log Memory period to 0 seconds
    it("VT290-357 : Set Log Memory period to 0 secs | 0", function() {
        runs(function(){
        	expectedValue = 0;
        	Rho.Log.memoryPeriod = 0;
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
    // Set Log Memory period to negative seconds
    it("VT290-358 : Set Log Memory period to negative secs | 0", function() {
        runs(function(){
        	expectedValue = 0;
        	Rho.Log.memoryPeriod = -5000;
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
 // Set Log Memory period to empty
    it("VT290-359 : Set Log Memory period to empty | 0", function() {
        runs(function(){
        	expectedValue = 0;
        	Rho.Log.memoryPeriod = 
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
    
    // Set Log Memory period to invalid
    it("VT290-360 : Set Log Memory period to invalid | 0", function() {
        runs(function(){
        	expectedValue = 0;
        	Rho.Log.memoryPeriod = "invalid";
        	memPeriod = Rho.Log.memoryPeriod; 
            expect(memPeriod).toEqual(expectedValue);
        });
    });
    
    
    /* Set Log includeCategories one module
    it("VT290-361 : Set Log includeCategories | database", function() {
        runs(function(){
        	Rho.Log.includeCategories = "System";
        	myvar = Rho.System.getProperty('country');
        	displayResult(myvar);
            expect(Rho.Log.includeCategories).toEqual("System");
        });
    });
    */
    
    // Set Netrace to true
    it("VT290-361 : Set netrace to true | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.netTrace=true;
        	netTraceValue = Rho.Log.netTrace; 
            expect(netTraceValue).toEqual(expectedValue);
        });
    });
    
    // Set Netrace to false
    it("VT290-362 : Set netrace to false | false", function() {
        runs(function(){
        	expectedValue = false;
        	Rho.Log.netTrace=false;
        	netTraceValue = Rho.Log.netTrace; 
            expect(netTraceValue).toEqual(expectedValue);
        });
    });
    
    // Set Netrace to 1
    it("VT290-363 : Set netrace to 1 | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.netTrace=1;
        	netTraceValue = Rho.Log.netTrace; 
            expect(netTraceValue).toEqual(expectedValue);
        });
    });
    
    // Set Netrace to 0
    it("VT290-364 : Set netrace to 0 | false", function() {
        runs(function(){
        	expectedValue = false;
        	Rho.Log.netTrace=0;
        	netTraceValue = Rho.Log.netTrace; 
            expect(netTraceValue).toEqual(expectedValue);
        });
    });
    
    // Set Netrace to empty
    it("VT290-365 : Set netrace to empty | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.netTrace=
        	netTraceValue = Rho.Log.netTrace; 
            expect(netTraceValue).toEqual(expectedValue);
        });
    });
    
    // Set Netrace to invalid
    it("VT290-366 : Set netrace to invalid | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.netTrace="invalid";
        	netTraceValue = Rho.Log.netTrace; 
            expect(netTraceValue).toEqual(expectedValue);
        });
    });
    
 // Set skipPost to true
    it("VT290-367 : Set skipPost to true | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.skipPost=true;
        	skipPostValue = Rho.Log.skipPost; 
            expect(skipPostValue).toEqual(expectedValue);
        });
    });
    
    // Set skipPost to false
    it("VT290-368 : Set skipPost to false | false", function() {
        runs(function(){
        	expectedValue = false;
        	Rho.Log.skipPost=false;
        	skipPostValue = Rho.Log.skipPost; 
            expect(skipPostValue).toEqual(expectedValue);
        });
    });
    
    // Set skipPost to 1
    it("VT290-369 : Set skipPost to 1 | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.skipPost=1;
        	skipPostValue = Rho.Log.skipPost; 
            expect(skipPostValue).toEqual(expectedValue);
        });
    });
    
    // Set skipPost to 0
    it("VT290-370 : Set skipPost to 0 | false", function() {
        runs(function(){
        	expectedValue = false;
        	Rho.Log.skipPost=0;
        	skipPostValue = Rho.Log.skipPost; 
            expect(skipPostValue).toEqual(expectedValue);
        });
    });
    
    // Set skipPost to empty
    it("VT290-371 : Set skipPost to empty | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.netTrace=
        	skipPostValue = Rho.Log.skipPost; 
            expect(skipPostValue).toEqual(expectedValue);
        });
    });
    
    // Set skipPost to invalid
    it("VT290-372 : Set skipPost to invalid | true", function() {
        runs(function(){
        	expectedValue = true;
        	Rho.Log.skipPost="invalid";
        	skipPostValue = Rho.Log.skipPost; 
            expect(skipPostValue).toEqual(expectedValue);
        });
    });
    
    // call clean log file
    it("VT290-373 : Call cleanlogfile | ", function() {
        runs(function(){
        	
        	// perform some operations
        	var myvar = Rho.Application.publicFolder;
        	var path = myvar+ "/VT290_374.txt";
        	Rho.Log.filePath =  path;
        	Rho.Log.CleanLogFile
			// check for no log present in above text
			var str = null;
        	/*
			fh = fopen('/public/VT290_373.txt', 0);    
        	if(fh!=-1) // Check if the file has been successfully opened.
        	{
        	    length = flength(fh); // Get the length of the file.
        	    str = fread(fh, length); // Read in the entire file.
        	    fclose(fh); // Close the file.

        	    // Display the contents of the file.
        	    write(str);
        	}
        	*/
        	
        	expect(str).toEqual(null);
        });
    });
    
 // call clean log file with parameter
    it("VT290-374 : Call cleanlogfile | ", function() {
        runs(function(){
        	
        	// perform some operations
        	var myvar = Rho.Application.publicFolder;
        	var path = myvar+ "/VT290_374.txt";
        	Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.CleanLogFile
			// check for no log present in above text
			var str = null;
        	/*
			fh = fopen('/public/VT290_373.txt', 0);    
        	if(fh!=-1) // Check if the file has been successfully opened.
        	{
        	    length = flength(fh); // Get the length of the file.
        	    str = fread(fh, length); // Read in the entire file.
        	    fclose(fh); // Close the file.

        	    // Display the contents of the file.
        	    write(str);
        	}
        	*/
        	
        	expect(path).toEqual("Text");
        });
    });
    
    
    // Call error() method with "message" and "categories"
    it("VT290-375 : Call error() method with message and categories | ", function() {
        runs(function(){
        	
        	 Rho.Log.error("VT290-375 : Application Error Message", "Application");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call error() method with "message" 
    it("VT290-376 : Call error() method with message only | ", function() {
        runs(function(){
        	 Rho.Log.error("VT290-376 :Application Error Message");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call error() method without parameter
    it("VT290-378 : Call error() method with message only | ", function() {
        runs(function(){
        	 Rho.Log.error();
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
   
    // Call error() method with wrong category
    it("VT290-379 : Call error() method with message and wrong category | ", function() {
        runs(function(){
        	Rho.Log.CleanLogFile();
        	 Rho.Log.error("VT290-379 :Application Error Message", "invalid");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call info() method with "message" and "categories"
    it("VT290-385 : Call info() method with message and categories | ", function() {
        runs(function(){
        	
        	 Rho.Log.info("VT290-385 : Application Info Message", "Application");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call info() method with "message" and "categories"
    it("VT290-386 : Call info() method with message and categories | ", function() {
        runs(function(){
        	 Rho.Log.level = 0;
        	 Rho.Log.info("VT290-386 :Application Info Message", "Application");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call info() method with "message" 
    it("VT290-387 : Call info() method with message only | ", function() {
        runs(function(){
        	 Rho.Log.info("VT290-387 :Application info Message");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call error() method without parameter
    it("VT290-389 : Call info() method with message only | ", function() {
        runs(function(){
        	 Rho.Log.info();
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
   
    // Call info() method with wrong category
    it("VT290-390 : Call info() method with message and wrong category | ", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	 Rho.Log.info("VT290-390 : Testing info", "TEST");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
 // Call readlog() with valid parameter
    it("VT290-391 : Call readLogFile() method with valid parameter. | ", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.info(read, "TEST"); 
        	//Rho.Application.setLocale('en');
        	var read = Rho.Log.readLogFile(10000);
        	alert(read);
        	Rho.Log.info(read, "VT290-391");
        	
        });
    });
    
    // Call readlog() with valid parameter 10000.5
    it("VT290-392 : Call readLogFile() method with valid parameter 10000.5 | ", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.info(read, "TEST"); 
        	//Rho.Application.setLocale('en');
        	var read = Rho.Log.readLogFile(10000.5);
        	Rho.Log.info(read, "VT290-392");
        	
        });
    });
    
    // Call readlog() with valid parameter 0
    it("VT290-393 : Call readLogFile() method with valid parameter 0 | ", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.info(read, "TEST"); 
        	//Rho.Application.setLocale('en');
        	var read = Rho.Log.readLogFile(0);
        	Rho.Log.info(read, "VT290-393");
        	
        });
    });
    
    
    // Call readlog() with negative
    it("VT290-394 : Call readLogFile() method with negative | ", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.info(read, "TEST"); 
        	//Rho.Application.setLocale('en');
        	var read = Rho.Log.readLogFile(-10000);
        	Rho.Log.info(read, "VT290-394");
        	
        });
    });
    
    // Call readlog() with empty parameter
    it("VT290-395 : Call readLogFile() method without valid parameter 0 | ", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.info("VT290-395: Next log message will be empty", "VT290-395"); 
        	//Rho.Application.setLocale('en');
        	var read = Rho.Log.readLogFile();
        	Rho.Log.info(read, "VT290-395");
        	
        });
    });	

    // Call readlog() with invalid
    it("VT290-396 : Call readLogFile() method without valid parameter 0 | ", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
        	var actualPath = Rho.Log.filePath;
        	Rho.Log.info(read, "TEST"); 
        	//Rho.Application.setLocale('en');
        	var read = Rho.Log.readLogFile("invalid");
        	Rho.Log.info(read, "VT290-396");
        	
        });
    });	
    
    // Call sendLog() 
    it("VT290-397 : send log file with valid path| log exists", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://rhologs.heroku.com";
        	Rho.Log.sendLogFile();
        	Rho.Log.info("PLease goto http://rhologs.heroku.com and check for log file availability. Log file should be present", "VT290-397");
        	
        });
    });	
    
 // Call sendLog() with callback
    it("VT290-398 : send log file with valid path| log exists", function() {
        runs(function(){
        	Rho.Log.destinationURI = "http://rhologs.heroku.com";
        	Rho.Log.sendLogFile(sendcallback);
        	Rho.Log.info("PLease goto http://rhologs.heroku.com and check for log file availability. Log file should be present", "VT290-398");
        	
        });
    });	
    
    // Call sendLog() with empty path
    it("VT290-401 : send log file with empty path | log file not exists", function() {
        runs(function(){
        	Rho.Log.destinationURI = " ";
        	Rho.Log.sendLogFile();
        	Rho.Log.info("PLease goto http://rhologs.heroku.com and check for log file availability. Log file should not present", "VT290-401");
        	
        });
    });	
    
    // Call sendLog() with invalid
    it("VT290-402 : send log file with empty path | log file not exists and no crash occured", function() {
        runs(function(){
        	Rho.Log.destinationURI = " ";
        	Rho.Log.sendLogFile();
        	Rho.Log.info("VT290-402 :PLease goto http://rhologs.heroku.com and check for log file availability. Log file should not present", "VT290-402");
        	
        });
    });	
   
    // Call showLog()
    it("VT290-403 : showLog | 1", function() {
        runs(function(){
        	//var myvar = Rho.Application.publicFolder;
        	//var path = myvar+ "/VT290_390.txt";
        	//Rho.Log.filePath =  path;
           	Rho.Log.showLog();
        	Rho.Log.info("log view displayed", "VT290-403");
        	
        });
    });	
    
    // Call trace() method with "message" and "categories"
    it("VT290-404 : Call trace() method with message and categories | 1", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	 Rho.Log.trace("VT290-404 :Trace messages regarding File Transfer module","Application");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call trace() method with "message" only
    it("VT290-405 : Call trace() method with message only | Error", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	 Rho.Log.trace("VT290-405 :Trace messages regarding File Transfer module");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call trace() method without parameter
    it("VT290-407 : Call trace() method without parameter | Error", function() {
        runs(function(){
        	var error = null;
        	var actual = "Wrong number of arguments: 0 instead of 2"
        	Rho.Log.level = 0;              	 
        	Rho.Log.trace();
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        	 expect(error).toEqual(actual);
        	 
        });
    });
    
    // Call trace() method with message and invalid category
    it("VT290-408 : Call trace() method with message and invalid category | Error", function() {
        runs(function(){
        	var error = null;
        	var actual = "Wrong number of arguments: 0 instead of 2"
        	Rho.Log.level = 0;              	 
        	Rho.Log.trace("VT290-408 :Trace messages regarding File Transfer module","Invalid");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        	 //expect(error).toEqual(actual);        	 
        });
    });
    
 // Call warning() method with "message" and "categories"
    it("VT290-409 : Call warning() method with message and categories | 1", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	 Rho.Log.warning("VT290-409 :warning messages regarding File Transfer module","Application");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call warning() method with "message" only
    it("VT290-410 : Call warning() method with message only | Error", function() {
        runs(function(){
        	Rho.Log.level = 0;
        	 Rho.Log.trace("VT290-410 :warning messages regarding File Transfer module");
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        });
    });
    
    // Call warning() method without parameter
    it("VT290-412 : Call warning() method without parameter | Error", function() {
        runs(function(){
        	var error = null;
        	var actual = "Wrong number of arguments: 0 instead of 2"
        	Rho.Log.level = 0;              	 
        	Rho.Log.trace();
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        	 expect(error).toEqual(actual);
        	 
        });
    });
    
    // Call warning() method with message and invalid category
    it("VT290-413 : Call warning() method with message and invalid category | Error", function() {
        runs(function(){
        	var error = null;
        	var actual = "Wrong number of arguments: 0 instead of 2"
        	Rho.Log.level = 0;              	 
        	Rho.Log.trace("VT290-413 :warning messages regarding File Transfer module","Invalid");
        	
        	 // some code on Application to display error
        	 //Rho.Application.setLocale(20);
        	 //expect(error).toEqual(actual);        	 
        });
    });
    
 // Set log filepath
    it("VT290-328 : Set Log filepath |", function() {
        runs(function(){
        	var defaultPath = Rho.Application.publicFolder;
        	var path = defaultPath+ "bibashlog.txt";
        	Rho.Log.filePath = path;        	
            expect(Rho.Log.filePath).toEqual(path);
            
        });
    });
    
    // Set log filepath to absolute
    it("VT290-329 : Set Log filepath |", function() {
        runs(function(){
        	var defaultPath = Rho.Application.publicFolder;
        	var path = defaultPath+ "bibashlog.txt";
        	Rho.Log.filePath = path
            expect(Rho.Log.filePath).toEqual(path);
           // var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
            
            //openDB();
            //closeDB();
        });
    });
    
    // Set log filesize 30KB
    it("VT290-333 : Set Log filsize | 30720", function() {
        runs(function(){
        	Rho.Log.fileSize = 30720
            expect(Rho.Log.fileSize).toEqual(30720);
        });
    });
    
    
});
