describe("Log JS API", function () {
    
    describe("ST set", function () {
    
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
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder displayed below on standard output: ";
	      		Rho.Log.info(info, "VT290-301");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-301")
	      		expect(Rho.Log.destination).toEqual(["stdio"]);	      		
	      	 });
	   });
	    
	   // Set log destination to uri only
	    it("VT290-302 : Log destination to URI only", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["uri"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public foldernot displayed in log text file: ";
	      		Rho.Log.info(info, "VT290-302");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-302")
	      		expect(Rho.Log.destination).toEqual(["uri"]);	      		
	      	 });
	   });
	    
	   // Set log destination to file, stdio, uri 
	    it("VT290-303 : Log destination to file, stdio, uri", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["file","stdio","uri"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all file, stdio and uri: ";
	      		Rho.Log.info(info, "VT290-303");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-303")
	      		expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);	      		
	      	 });
	   });
	    
	   // Set log destination to stdio,file,uri 
	    it("VT290-304 : Log destination to stdio,file, uri", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["stdio","file","uri"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all file, stdio and uri: ";
	      		Rho.Log.info(info, "VT290-304");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-304")
	      		expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);	      		
	      	 });
	   });
	    
	   	// Set log destination to stdio,uri, file
	    it("VT290-305 : Log destination to stdio, uri , file", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["stdio","uri","file"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all file, stdio and uri: ";
	      		Rho.Log.info(info, "VT290-305");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-305")
	      		expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);	      		
	      	 });
	   });
	    
	   // Set log destination to uri, file,stdio
	    it("VT290-306 : Log destination to uri, file,stdio", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["uri","file","stdio"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all file, stdio and uri: ";
	      		Rho.Log.info(info, "VT290-306");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-306")
	      		expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);	      		
	      	 });
	   });
	    
	   // Set log destination to uri, stdio,file
	    it("VT290-307 : Log destination to uri, stdio,file", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["uri","stdio","file"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all file, stdio and uri: ";
	      		Rho.Log.info(info, "VT290-307");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-307")
	      		expect(Rho.Log.destination).toEqual(["file","stdio","uri"]);	      		
	      	 });
	    });
	    
	   	// Set log destination to file, stdio
	    it("VT290-308 : Log destination to file, stdio", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["file","stdio"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all fil and stdio: ";
	      		Rho.Log.info(info, "VT290-308");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-308")
	      		expect(Rho.Log.destination).toEqual(["file","stdio"]);	      		
	      	 });
	   });
	    
	   // Set log destination to file, uri
	    it("VT290-309 : Log destination to file, uri", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["file","uri"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in all file and uri: ";
	      		Rho.Log.info(info, "VT290-309");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-309")
	      		expect(Rho.Log.destination).toEqual(["file","uri"]);	      		
	      	 });
	   });
	    
	  
	    // Set log destination to stdio, uri
	    it("VT290-310 : Log destination to stdio, uri", function() {
	      	 runs(function(){
	      		Rho.Log.destination = ["stdio","uri"];
	      		Rho.Log.includeCategories = "*"
	      		var info = "Log message with application public folder in stdio and uri: ";
	      		Rho.Log.info(info, "VT290-310");	      		
	      		var myvar = Rho.Application.publicFolder;
	      		Rho.Log.info("Application public folder : " +myvar, "VT290-310")
	      		expect(Rho.Log.destination).toEqual(["stdio","uri"]);	      		
	      	 });
	   });
	    
	   	 
	    // Set log destinationURI to valid destination
	    it("VT290-313 : Set Log destinationURI to valid destination", function() {
	        runs(function(){
	        	Rho.Log.destinationURI = "http://localhost";
	        	var info = "Log destination set. No need verification in log: ";
	      		Rho.Log.info(info, "VT290-313");	
	        	expect(Rho.Log.destinationURI).toEqual("http://localhost");
	        });
	    });
	    // Set Log destinationURI to valid destination with host address having IP address.
	    it("VT290-314 : Set Log destinationURI to valid destination with host address having IP address.", function() {
	        runs(function(){
	        	Rho.Log.destinationURI = "http://127.0.0.1";
	        	var info = "Log destination set. No need verification in log: ";
	      		Rho.Log.info(info, "VT290-314");	
	        	expect(Rho.Log.destinationURI).toEqual("http://127.0.0.1");
	        });
	    });
	    
	    // Set Log destinationURI to valid destination with host address having IP address.
	    it("VT290-315 : Set Log destinationURI to valid destination with host address having DNS Name as address.", function() {
	        runs(function(){
	        	Rho.Log.destinationURI = "http://rhologs.heroku.com";
	        	var info = "Log destination set. No need verification in log: ";
	      		Rho.Log.info(info, "VT290-315");	
	        	expect(Rho.Log.destinationURI).toEqual("http://rhologs.heroku.com");
	        });
	    });
	    
	    // Set Log destinationURI to valid destination with port number
	    it("VT290-316 : Set Log destinationURI to valid destination with port number", function() {
	        runs(function(){
	        	Rho.Log.destinationURI = "http://rhologs.heroku.com:80";
	        	var info = "Log destination set. No need verification in log: ";
	      		Rho.Log.info(info, "VT290-316");	
	        	expect(Rho.Log.destinationURI).toEqual("http://rhologs.heroku.com:80");
	        });
	    });
	    
	    // Set Log destinationURI to valid secure destination
	    it("VT290-317 : Set Log destinationURI to valid secure destination", function() {
	        runs(function(){
	        	Rho.Log.destinationURI = "http://rhologs.heroku.com:443";
	        	var info = "Log destination set. No need verification in log: ";
	      		Rho.Log.info(info, "VT290-317");	
	        	expect(Rho.Log.destinationURI).toEqual("http://rhologs.heroku.com:443");
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
	     
	    
	    // Set Log excludefilter 
	    it("VT290-325 : Set Log excludefilter : username, password", function() {
	        runs(function(){
	        	var info = "Exclude filter set to username and password : VT290-325";
	      		Rho.Log.info(info, "VT290-325");	
	        	Rho.Log.excludeFilter = "username,password";
	            expect(Rho.Log.excludeFilter).toEqual("username,password");
	        });
	    });
	    
	      
	    // Set log filesize to 100000 KB
	    it("VT290-334 : Set Log filsize | 102400000", function() {
	        runs(function(){
	        	var info = "File Size set to 1MB : VT290-334. no verification required in log";
	      		Rho.Log.info(info, "VT290-334");
	        	Rho.Log.fileSize = 102400000
	            expect(Rho.Log.fileSize).toEqual(102400000);
	        });
	    });
	    
	    // Set log filesize to 0 KB
	    it("VT290-335 : Set Log filsize | 0", function() {
	        runs(function(){
	        	var info = "File Size set to 0 : VT290-334. no verification required in log";
	      		Rho.Log.info(info, "VT290-334");
	        	Rho.Log.fileSize = 0
	            expect(Rho.Log.fileSize).toEqual(0);
	        });
	    });
	    
	       // Set Log includeCategories one module
	    it("VT290-339 : Set Log includeCategories | database", function() {
	        runs(function(){
				var info = "Log Messages related to <database> should be displayed and Hello Network displayed : VT290-339";
	        	Rho.Log.info(info, "VT290-339");
				Rho.Log.info(Rho.Application.databaseFilePath('local'), "VT290-339");
				
				var db = new Rho.Database();
				Rho.Log.includeCategories = "database";
	        	Rho.Log.info("Hello Data Base", "database");
				Rho.Log.info("Hello Network", "Network");
	      		//db.close();
	      		var version_info = Rho.System.osVersion;
	      		//alert(version_info);
	      		Rho.WebView.fullScreen = true;            
	            Rho.WebView.fullScreen = false;
	      		Rho.Log.info("Log Messages related to <database> should be displayed in above","VT290-339");
	            //expect(Rho.Log.includeCategories).toEqual("database");
	            
	        });
	    });
	    
	    // Set Log includeCategories *
	    it("VT290-340 : Set Log includeCategories to * | *", function() {
	        runs(function(){
	        	Rho.Log.includeCategories = "*";
	        	var info = "Log Messages related to <system, webview, database> should be displayed : VT290-340";
	      		Rho.Log.info(info, "VT290-340");	      		
	      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	      		var version_info = Rho.System.osVersion;
	      		Rho.WebView.fullScreen = true;            
	            Rho.WebView.fullScreen = false;
	      		Rho.Log.info("Log Messages related to <system, webview, database> should be displayed in above","VT290-340");
	            expect(Rho.Log.includeCategories).toEqual("*");
	        });
	    });
	    
	    // Set Log includeCategories multiple modules
	    it("VT290-341 : Set Log includeCategories to multiple modules | database, WebView", function() {
	        runs(function(){
	        	var info = "Log Messages related to <system, webview, database> should be displayed : VT290-341";
	      		Rho.Log.info(info, "VT290-341");
	        	Rho.Log.includeCategories = "database, WebView, System";
	      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	      		var version_info = Rho.System.osVersion;
	      		Rho.WebView.fullScreen = true;            
	            Rho.WebView.fullScreen = false;
	      		Rho.Log.info("Log Messages related to <system, webview, database> should be displayed in above","VT290-341");
	            expect(Rho.Log.includeCategories).toEqual("database, WebView, System");
	        });
	
	    });
	    
	      
	    // Set Log include and exclude Categories
	    it("VT290-345 : Set Log include and excludeCategories | application and WebView logs displayed", function() {
	        runs(function(){
	        	var info = "Log Messages related to <webview, Application> should be displayed and database not displayed: VT290-345";
	      		Rho.Log.info(info, "VT290-345");
	        	Rho.Log.excludeCategories = "database, network";
	        	Rho.Log.includeCategories = "application, WebView";	      		
	      		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	      		var version_info = Rho.System.osVersion;
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
	        	Rho.Log.excludeCategories = "*";
	        	var info = "No logs displayed : VT290-346";
	      		Rho.Log.info(info, "VT290-346");
	        	Rho.Log.level = 4;
	        	logLevel = Rho.Log.level;	      		
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
	      		Rho.Log.trace("trace : Application Error Message", "VT290-350");
	      		Rho.Log.error("Error : Application Error Message", "VT290-350");
	      		Rho.Log.warning("Warning : Application warning Message", "VT290-350");      		
	      		Rho.Log.info("fatal, error and warning log related to database displayed in above","VT290-350");
	            expect(logLevel).toEqual(0);
	        });
	    });
	    
	        // Set Log Memory period to 5 seconds
	    it("VT290-355 : Set Log Memory period to 5 secs | 5000", function() {
	        runs(function(){
	        	Rho.Log.level=0;
	        	var info = "Info : Memory log should display in 5 secs interval | 0";
	      		Rho.Log.info(info, "VT290-355");
	        	expectedValue = 5000;
	        	Rho.Log.memoryPeriod = 5000;
	        	memPeriod = Rho.Log.memoryPeriod; 
	            expect(memPeriod).toEqual(expectedValue);
	        });
	    });
	    
	     
	    // Set Log Memory period to 10 seconds
	    it("VT290-356 : Set Log Memory period to 10 secs | 10000", function() {
	        runs(function(){
	        	Rho.Log.level=0;
	        	var info = "Info : Memory log should display in 10 secs interval | 0";
	      		Rho.Log.info(info, "VT290-356");
	        	expectedValue = 10000;
	        	Rho.Log.memoryPeriod = 10000;
	        	memPeriod = Rho.Log.memoryPeriod; 
	            expect(memPeriod).toEqual(expectedValue);
	            Rho.Log.memoryPeriod = 0;
	        });
	    });
	
	    
	 // Set Netrace to true
	    xit("VT290-361 : Set netrace to true | true", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : http trace displayed in the log ";
	      		Rho.Log.info(info, "VT290-361")
	        	Rho.Log.showLog();
	        	expectedValue = true;
	        	Rho.Log.netTrace=true;
	        	var cell_network = Rho.Network.hasCellNetwork();
	        	var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        	netTraceValue = Rho.Log.netTrace; 
	            expect(netTraceValue).toEqual(expectedValue);
	        });
	    });
	    
	 // Set Netrace to false
	    xit("VT290-362 : Set netrace to false | false", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : http trace not displayed in the log ";
	      		Rho.Log.info(info, "VT290-362")
	        	Rho.Log.showLog();
	        	expectedValue = false;
	        	Rho.Log.netTrace=false;
	        	var cell_network = Rho.Network.hasCellNetwork()
	        	var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        	netTraceValue = Rho.Log.netTrace; 
	            expect(netTraceValue).toEqual(expectedValue);
	        });
	    });
	    
	         
	 // Set skipPost to true
	    it("VT290-367 : Set skipPost to true | true", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : skip post set to true. http body information should not displayed in below log for network related functions";
	      		Rho.Log.info(info, "VT290-367");
	        	expectedValue = true;
	        	Rho.Log.skipPost=true;
	        	skipPostValue = Rho.Log.skipPost; 
	        	var cell_network = Rho.Network.hasCellNetwork();
	        	// write network code here
	            expect(skipPostValue).toEqual(expectedValue);
	        });
	    });
	    
	    // Set skipPost to false
	    it("VT290-368 : Set skipPost to false | false", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : skip post set to false. http body information should be displayed in below log for network related functions";
	      		Rho.Log.info(info, "VT290-368");
	        	expectedValue = false;
	        	Rho.Log.skipPost=false;
	        	skipPostValue = Rho.Log.skipPost; 
	        	var cell_network = Rho.Network.hasCellNetwork();
	        	// write network code here
	            expect(skipPostValue).toEqual(expectedValue);
	        });
	    });
	    
	    // Call error() method with "message" and "categories"
	    it("VT290-375 : Call error() method with message and categories | ", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : Application Error message displayed in the log ";
	      		Rho.Log.info(info, "VT290-375");
	        	 Rho.Log.error("VT290-375 : Application Error Message", "Application");
	        	 // some code on Application to display error
	        	 //Rho.Application.setLocale(20);
	        });
	    });
	    
	   
	   
	    // Call error() method with wrong category
	    it("VT290-379 : Call error() method with message and wrong category | ", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : Application Error message displayed in the log with invalid catagory name ";
	      		Rho.Log.info(info, "VT290-379");
	        	Rho.Log.error("VT290-379 :Application Error Message", "invalid");
	        	 // some code on Application to display error
	        	 //Rho.Application.setLocale(20);
	        });
	    });
	    
	    // Call info() method with "message" and "categories"
	    it("VT290-385 : Call info() method with message and categories | ", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Info : Info message displayed in the log with message and catagory name ";
	      		Rho.Log.info(info, "VT290-385");
	        	Rho.Log.info("VT290-385 : Application Info Message", "Application");
	        	 // some code on Application to display error
	        	 //Rho.Application.setLocale(20);
	        });
	    });
	    
	        
	 // Call readlog() with valid parameter (Integer) 100
	    it("VT290-391 : Call readLogFile() method with valid parameter. | ", function() {
	        runs(function(){
	        	//var myvar = Rho.Application.publicFolder;
	        	//var path = myvar+ "/VT290_390.txt";
	        	//Rho.Log.filePath =  path;
	        	Rho.Log.leval = 0;
	        	var info = "Read : Read Log from Log file => 100 symbols printed below";
	        	Rho.Log.info(info, "VT290-391");
		        //var actualPath = Rho.Log.filePath;
		        //Rho.Log.info(read, "TEST"); 
	        	//Rho.Application.setLocale('en');
	        	var read = Rho.Log.readLogFile(100);
	        	Rho.Log.info("Start of read " +read+ "End of read log", "VT290-391");
	        	
	        	
	        	
	        });
	    });
	    
	       
	    // Call sendLog() 
	    it("VT290-397 : send log file with valid path| log exists", function() {
	        runs(function(){
	        	Rho.Log.info("PLease goto http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx and check for log file availability. Log file should be present", "VT290-397");
	        	Rho.Log.destinationURI = "http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx";
	        	Rho.Log.sendLogFile();
	        	Rho.Log.info("PLease goto http://rhologs.heroku.com/ and check for log file availability. Log file should be present", "VT290-397");
	        	
	        });
	    });	
	    
	    // Call sendLog() with callback
	    it("VT290-398 : send log file with valid path| log exists", function() {
	        runs(function(){
	        	Rho.Log.destinationURI = "http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx";
	        	Rho.Log.sendLogFile(sendcallback());
	        	Rho.Log.info("PLease goto http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx and check for log file availability. Log file should be present", "VT290-398");   	
	        	       	
	        });
	        
	    });
	    
	   function sendcallback() {
		   
			Rho.Log.info("Info: Callback called", "VT290-398");
		};
	    
	   
	    
	    //Call sendLog() with ananyomous callback
	    it("VT290-400 : send log file with valid path| log exists", function() {
	        runs(function(){
	        	var displayflag = false;
	        	Rho.Log.destinationURI = "http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx";
	        	Rho.Log.sendLogFile(function() {
	        		Rho.Log.info("Info: ananymous Callback called", "VT290-400");
	        	});
	        	Rho.Log.info("PLease goto http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx and check for log file availability. Log file should be present", "VT290-400");        	
	        });
	       
	    });
	    
	    
	     
	    // Call trace() method with "message" and "categories"
	    it("VT290-404 : Call trace() method with message and categories | 1", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Trace : Trace message displayed in the log with message and categories";
	        	Rho.Log.info(info, "VT290-404");
	        	Rho.Log.trace("VT290-404 :Application trace Message","Application");
	        });
	    });
	    
	       
	 // Call warning() method with "message" and "categories"
	    it("VT290-409 : Call warning() method with message and categories | 1", function() {
	        runs(function(){
	        	Rho.Log.level = 0;
	        	var info = "Warning : Warning message displayed in the log with message and category";
	        	Rho.Log.info(info, "VT290-409");
	        	Rho.Log.warning("VT290-409 :Application warning Message","Application");
	        });
	    });
	    
	      
	    // Call warning() method with message and invalid category aaaa
	    it("VT290-413 : Call warning() method with message and invalid category | Error", function() {
	        runs(function(){
		        var error = null;
		        var actual = "Wrong number of arguments: 0 instead of 2"
	        	Rho.Log.level = 0;     
	        	var info = "Warning : Warning message displayed in the log with message and invalid category";
	        	Rho.Log.info(info, "VT290-413");
	        	Rho.Log.trace("VT290-413 :Application warning message","aaaa");       	 
	        });
	    });
	    
	    // Set log filepath
	    it("VT290-328 : Set Log filepath |", function() {
	        runs(function(){
	        	var info = "Log file path changed to file://\Program Files\Log.txt ";
	        	Rho.Log.info(info, "VT290-328");
	        	var defaultPath = "file://\Program Files\Log.txt";
	        	var path = defaultPath;
	        	Rho.Log.filePath = path;        	
	            expect(Rho.Log.filePath).toEqual(path);
	            
	        });
	    });
	    
	    // Set log filepath to absolute
	    it("VT290-329 : Set Log filepath |", function() {
	        runs(function(){
	        	var info = "Log file path changed to file://\Program Files\Log.txt ";
	        	Rho.Log.info(info, "VT290-328");
	        	var defaultPath = "file://\Program Files\Log.txt";
	        	var path = defaultPath;
	        	Rho.Log.filePath = path;
	            expect(Rho.Log.filePath).toEqual(path);
	           // var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	            
	            //openDB();
	            //closeDB();
	        });
	    });
	    
	    // Set log filesize 30KB
	    it("VT290-333 : Set Log filsize | 30720", function() {
	        runs(function(){
	        	var info = "Log file size changed to 30720 bytes ";
	        	Rho.Log.info(info, "VT290-328");
	        	Rho.Log.fileSize = 30720
	            expect(Rho.Log.fileSize).toEqual(30720);
	        });
	    });
	});
	
	describe("Dev set", function () {
		
    var originalLogSettings = {};

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
    });
	
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
	
	    it("Tests log level property", function () {
	        Rho.Log.level = 1;
	        expect(Rho.Log.level).toEqual(1);
	    });
	
	    it("Tests destination property", function () {
	        expect(Rho.Log.destination = ["file"]);
	        expect(Rho.Log.destination).toEqual(["file"]);
	    });
	
	    it("Test default value of including categories property", function () {
	        expect(Rho.Log.includeCategories).toEqual("*");
	    });
	
	    it("Test includingCategories property", function () {
	        Rho.Log.includeCategories = "abc, def";
	        expect(Rho.Log.includeCategories).toEqual("abc, def");
	    });
	
	    it("Test excludeCategories property", function () {
	        Rho.Log.excludeCategories = "abc, def";
	        expect(Rho.Log.excludeCategories).toEqual("abc, def");
	    });
	
	    it("Test default value of fileSize property", function () {
	        expect(Rho.Log.fileSize).toEqual(0);
	    });
	
	    it("Test fileSize property", function () {
	        Rho.Log.fileSize = 10000;
	        expect(Rho.Log.fileSize).toEqual(10000);
	    });
	
	    it("Test default value of filePath property", function () {
	        var pathPieces = Rho.Log.filePath.split("/");
	        expect(pathPieces[pathPieces.length - 1]).toEqual("rholog.txt");
	    });
	
	    it("Test filePath property", function () {
	        Rho.Log.filePath = "someFilename.log";
	        expect(Rho.Log.filePath).toEqual("someFilename.log");
	    });
	
	    it("Test default value of memoryPeriod property", function () {
	        expect(Rho.Log.memoryPeriod).toEqual(0);
	    });
	
	    it("Test memoryPeriod property", function () {
	        Rho.Log.memoryPeriod = 1000;
	        expect(Rho.Log.memoryPeriod).toEqual(1000);
	    });
	
	    it("Test default value of skipPost property", function () {
	        expect(Rho.Log.skipPost).toEqual(false);
	    });
	
	    it("Test skipPost property", function () {
	        Rho.Log.skipPost = true;
	        expect(Rho.Log.skipPost).toEqual(true);
	    });
	
	    it("Test default value of excludeFilter property", function () {
	        expect(Rho.Log.excludeFilter).toEqual("");
	    });
	
	    it("Test excludeFilter property", function () {
	        Rho.Log.excludeFilter = "abc";
	        expect(Rho.Log.excludeFilter).toEqual("abc");
	
	        Rho.Log.excludeFilter = "def";
	        expect(Rho.Log.excludeFilter).toEqual("abc,def");
	    });
	
	    it("Test default value of destinationURI property", function () {
	        expect(Rho.Log.destinationURI).toEqual("");
	    });
	
	    it("Test destinationURI property", function () {
	        Rho.Log.destinationURI = "http://localhost";
	        expect(Rho.Log.destinationURI).toEqual("http://localhost");
	    });
	
	    //TODO: test log file contains the string
	    it("Test trace method", function () {
	        Rho.Log.trace("test trace message", "test");
	    });
	
	    //TODO: test log file contains the string
	    it("Test info method", function () {
	        Rho.Log.info("test info message", "test");
	    });
	
	    //TODO: test log file contains the string
	    it("Test warning method", function () {
	        Rho.Log.warning("test warning message", "test");
	    });
	
	    //TODO: test log file contains the string
	    it("Test error method", function () {
	        Rho.Log.error("test error message", "test");
	    });
	
	    //TODO: test log file contains the string
	    //it("Test fatalError method", function () {
	    //    Rho.Log.fatalError("test fatal error message", "test");
	    //});
	
	    //TODO: add test on receiving file
	    //TODO: add test on callback
	    xit("Test sendLogFile method", function () {
	        Rho.Log.sendLogFile();
	    });
	
	    //TODO: how test it?
	    xit("Test showLog method", function () {
	        Rho.Log.showLog();
	    });
	
	    //TODO: test that log file is empty
	    xit("Test cleanLogFile method", function () {
	        Rho.Log.cleanLogFile();
	    });
	
	    it("Test readLogFile method", function () {
	        expect(Rho.Log.readLogFile(1000).length).toEqual(1000);
	    });
	
	
	    if (isAndroidOrApplePlatform() || isWindowsPhone8Platform()) {
	        it("Test default value of netTrace property", function () {
	            expect(Rho.Log.netTrace).toEqual(false);
	        });
	
	        it("Test netTrace property", function () {
	            Rho.Log.netTrace = true;
	            expect(Rho.Log.netTrace).toEqual(true);
	        });
	    }
	});
});