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