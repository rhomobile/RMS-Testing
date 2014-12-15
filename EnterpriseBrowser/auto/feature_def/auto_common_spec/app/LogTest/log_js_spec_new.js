function try_load_img(ip, timeout, callback) {
    var ping_object = {};

    if (!ping_object.inUse) {
        ping_object.status = 'unchecked';
        ping_object.inUse = true;
        ping_object.callback = callback;
        ping_object.ip = ip;
        var _that = ping_object;
        ping_object.img = new Image();
        ping_object.img.onload = function () {
            _that.inUse = false;
            _that.callback(true, _that.ip);

        };
        ping_object.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback(false, _that.ip);
            }

        };
        ping_object.start = new Date().getTime();
        ping_object.img.src = 'http://'+ip+':'+SERVER_PORT.toString() + '/icon.png';
        ping_object.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback(false, _that.ip);
            }
        }, timeout);
    }
}

describe("Log JS API", function () {
	var originalLogLevel = EB.Log.level;
    var waitTimeout = 90000;
    var serverTestTimeout = 10000;
	
	beforeEach(function () {
		originalLogLevel = EB.Log.level;
		EB.Log.info("Original log level"+ originalLogLevel, "TST");
	});

	afterEach(function () {
		EB.Log.level = originalLogLevel;
		EB.Log.info("Log level after all tests: "+ EB.Log.level, "TST");
	});

	var srvHost = '';
	var srvPort = '';
	var srvURL = '';

	var srvHttpLogPostUrl = '';
	var srvHttpLogGetUrl = '';
	var srvHttpLogTestMsg = '';

    function updateServerUrls(SERVER_HOST, SERVER_PORT) {
        srvHost = SERVER_HOST;
        srvPort = SERVER_PORT;
        srvURL = 'http://'+SERVER_HOST+':'+SERVER_PORT.toString();
 
		srvHttpLogPostUrl = srvURL + "/client_log";
		srvHttpLogGetUrl = srvURL + "/get_last_log";
		srvHttpLogTestMsg = srvURL + "/download";
    }

    updateServerUrls(SERVER_HOST, SERVER_PORT);

	it('check available hosts', function() {
        var accepted_url = [];
        var total_servers = 0;

        runs( function() {
            if (HOSTS.length > 1) {
                EB.Log.info('More than 1 host','JSDB');

                for (var i = 0; i < HOSTS.length; i++) {
                    EB.Log.info('Checking ' + HOSTS[i],'JSDB');

                    total_servers += 1;

                    try_load_img(HOSTS[i], serverTestTimeout, function(ok,ip) {
                        EB.Log.info('Callback from ' + ip + ' status ' + ok,'JSDB');
                        if (ok) {
                            accepted_url.push(ip);  
                        }
                        total_servers -= 1;
                    });
                };
            }
        } );

        waitsFor( function() {
                return total_servers == 0;
            },
            'Callback never called',
            serverTestTimeout + 1000
        );

        runs( function() {
            if (HOSTS.length > 1) {
                if (accepted_url.length > 0) {
                    updateServerUrls(accepted_url[0],SERVER_PORT);
                }

                for (var i = 0; i < accepted_url.length; i++) {
                    EB.Log.info('Could connect to host:' + accepted_url[i], 'DBG' );
                };

                expect(accepted_url.length).toBeGreaterThan(0);
            }
        });
    });

	describe("ST set", function () {

		String.prototype.count=function(s1) { 
			return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
		};

		var fail_str = "_log_fail_";
		var pass_str = "_log_pass_";

		function checkLogString(string, numFails, numPases)
		{
			var fails = string.count(fail_str);
			var passes = string.count(pass_str);

			var result = fails == numFails && passes == numPases;

			if (!result)
			{
				EB.Log.error("In String <<"+string+">>" , "checkLog");
				if (fails != numFails)
					EB.Log.error("Fails: " +fails+", expected : "+numFails, "checkLog");
				if (passes != numPases)
					EB.Log.error("Pases: " +passes+", expected : "+numPases, "checkLog");
			}

			return result;
		}

		var originalLogSettings = {};

		// js handing code does some debug traces in log, we should filter them outs 
		EB.LogCapture.excludeCategories = "\"__rhoClass\", \"__rhoCallback\", EB.callbackHandler, rho_cast<jstring, rho_cast<string";

		var waitTimeout = 10000;
		var clientPlatform = EB.System.platform;		
		var customLogFile = EB.Application.userFolder + "/userlog.txt";

		// this function will execute before each of test case execution i.e it function
		beforeEach(function () {
			originalLogSettings = {};
			originalLogSettings.logLevel = EB.Log.level;
			EB.Log.level = 4;
			originalLogSettings.destination = EB.Log.destination;
			originalLogSettings.includeCategories = EB.Log.includeCategories;
			originalLogSettings.excludeCategories = EB.Log.excludeCategories;
			originalLogSettings.fileSize = EB.Log.fileSize;
			originalLogSettings.filePath = EB.Log.filePath;
			originalLogSettings.memoryPeriod = EB.Log.memoryPeriod;
			originalLogSettings.netTrace = EB.Log.netTrace;
			originalLogSettings.skipPost = EB.Log.skipPost;
			originalLogSettings.excludeFilter = EB.Log.excludeFilter;
			originalLogSettings.destinationURI = EB.Log.destinationURI;

			displayflag = false;
			EB.Log.level = 0;

			EB.LogCapture.start();
			EB.LogCapture.clear(); 
		});

		// this function will execute after each of test case execution i.e it function
		afterEach(function () {
			EB.Log.level = 4;
			EB.Log.destination = originalLogSettings.destination;
			EB.Log.includeCategories = originalLogSettings.includeCategories;
			EB.Log.excludeCategories = originalLogSettings.excludeCategories;
			EB.Log.fileSize = originalLogSettings.fileSize;
			EB.Log.filePath = originalLogSettings.filePath;
			EB.Log.memoryPeriod = originalLogSettings.memoryPeriod;
			EB.Log.netTrace = originalLogSettings.netTrace;
			EB.Log.skipPost = originalLogSettings.skipPost;
			EB.Log.excludeFilter = originalLogSettings.excludeFilter;
			EB.Log.destinationURI = originalLogSettings.destinationURI;
			EB.Log.level = originalLogSettings.logLevel;

			EB.LogCapture.stop();
		});

		// Set log filepath
		it("VT290-328 : Set Log filepath |", function() {
			runs(function(){
				var info = "Log file path changed to file://\\Program Files\\Log.txt ";
				EB.Log.info(info, "VT290-328");
				var defaultPath = "file://\\Program Files\\Log.txt";
                EB.Log.filePath = defaultPath;
				expect(EB.Log.filePath).toEqual(defaultPath);

			});
		});

		// Set log filepath to absolute
		it("VT290-329 : Set Log filepath |", function() {
			runs(function(){
				var info = "Log file path changed to file://\\Program Files\\Log.txt ";
				EB.Log.info(info, "VT290-328");
				var defaultPath = "file://\\Program Files\\Log.txt";
                EB.Log.filePath = defaultPath;
				expect(EB.Log.filePath).toEqual(defaultPath);
			});
		});

		// Set log filesize 30KB
		it("VT290-333 : Set Log filsize | 3000", function() {
			runs(function(){
				var info = "Log file size changed to 3000 bytes ";
				EB.Log.info(info, "VT290-328");

				var testSize = 3000;

				EB.Log.level = 2;

				EB.Log.filePath = customLogFile;
				EB.Log.fileSize = testSize;
				expect(EB.Log.fileSize).toEqual(testSize);
				EB.Log.cleanLogFile();	

				var some_random_text = "12345679a12345679b12345679c12345679d";
				
				// write at least 35*100+ bytes;
				for(var i = 0; i < (testSize / some_random_text.length + 5); i++)
				{
					EB.Log.warning(some_random_text, "tst");
				}

				EB.Log.fileSize = originalLogSettings.fileSize;
				EB.Log.filePath = originalLogSettings.filePath;
				EB.Log.level = 0;
				
				expect(EB.RhoFile.getFileSize(customLogFile)).toBeLessThan(testSize+1);
				expect(EB.RhoFile.getFileSize(customLogFile)).toBeGreaterThan(testSize-100);
			});
		});
		
		// Clean log file test
		it("VT290-373 : Clear log file | true", function() {
			runs(function(){
				
				EB.Log.level = 1;
				var logPath = customLogFile
				
				EB.Log.level = 2;
				EB.Log.filePath = customLogFile;

				var some_random_text = "12345679a12345679b12345679c12345679d12345679e12345679f12345679g12345679h12345679i12345679j";
				
				for(var i = 0; i < 10; i++)
				{
					EB.Log.warning(some_random_text, "tst");
				}
				expect(EB.RhoFile.exists(logPath)).toEqual(true)

				EB.Log.info("log path => " +logPath, "VT290-373");
				var beforeClean = EB.RhoFile.getFileSize(logPath);
				EB.Log.cleanLogFile();	
				waits(1000);	
				var afterClean = EB.RhoFile.getFileSize(logPath);	

				EB.Log.fileSize = originalLogSettings.fileSize;
				EB.Log.filePath = originalLogSettings.filePath;
				EB.Log.level = 0;
		
				expect(beforeClean).toBeGreaterThan(afterClean)
				
			});
		});

		// Call readlog() with valid parameter (Integer) 1000
		it("VT290-391 : Call readLogFile() method with valid parameter. | ", function() {
			runs(function(){
				EB.Log.level = 2;

				EB.Log.filePath = customLogFile;
				EB.Log.cleanLogFile();	

				var some_random_text = "12345679a12345679b12345679c12345679d12345679e12345679f12345679g12345679h12345679i12345679j";
				
				for(var i = 0; i < 5; i++)
				{
					EB.Log.warning(some_random_text, "tst");
				}

				var read = EB.Log.readLogFile(1000);

				EB.Log.filePath = originalLogSettings.filePath;
				
				EB.Log.level = 0;
				expect(read.length).toBeLessThan(1000);
				expect(read.count(some_random_text) > 0).toEqual(true);
			});
		});
		
		if ((clientPlatform != EB.System.PLATFORM_WP8) && (clientPlatform != EB.System.PLATFORM_WINDOWS_DESKTOP)) // && (clientPlatform != EB.System.PLATFORM_WM_CE))
		{
		// Call sendLog()
		it("VT290-397 : send log file with valid path, no callback| log exists", function() {
			var flag = false;
			var callbackCalled = false;
			var status = '';
			var data = '';
			
			runs(function(){
				EB.Log.level = 2;

				EB.Log.filePath = customLogFile;
				EB.Log.cleanLogFile();	

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.warning("TEST MESSAGE!", "VT290-397");
				EB.Log.sendLogFile();
			} );

			waits(100);
			
			runs(function(){
				EB.Log.filePath = originalLogSettings.filePath;
				EB.Log.level = 0;
			} );

			// wait while log file is sent
			waits(10000);

			runs(function(){    
				getProps = {
					url: srvHttpLogGetUrl
				};

				EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
			} );

			waitsFor( function() {
					return callbackCalled;
				},
				"Callback never called",
				waitTimeout
			);

			runs(function() {
				expect(status).toEqual('ok');

				expect(data.count("TEST MESSAGE!")).toBeGreaterThan(0);
			});
		});


		// Call sendLog() with callback
		it("VT290-398 : send log file with valid path, function callback| log exists", function() {
			var flag = false;
			var callbackCalled = false;
			var status = '';
			var data = '';

			function sendcallback() {
				callbackCalled = true;
			};

			runs(function(){
				EB.Log.level = 2;

				EB.Log.filePath = customLogFile;
				EB.Log.cleanLogFile();	

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.warning("TEST MESSAGE!", "VT290-398");
				EB.Log.sendLogFile(sendcallback);
			} );

			waits(100);
			
			runs(function(){
				EB.Log.filePath = originalLogSettings.filePath;
				EB.Log.level = 0;
			} );

			waitsFor( function() {
					return callbackCalled;
				},
				"Callback never called",
				waitTimeout
			);

			runs(function(){
				callbackCalled = false;

				getProps = {
					url: srvHttpLogGetUrl
				};

				EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
			} );

			waitsFor( function() {
					return callbackCalled;
				},
				"Callback never called",
				waitTimeout
			);

			runs(function() {
				expect(status).toEqual('ok');

				expect(data.count("TEST MESSAGE!")).toBeGreaterThan(0);
			});
		});

		//Call sendLog() with ananyomous callback
		it("VT290-400 : send log file with valid path, anonyomous function callback| log exists", function() {
			var flag = false;
			var callbackCalled = false;
			var status = '';
			var data = '';

			runs(function(){
				EB.Log.level = 2;

				EB.Log.filePath = customLogFile;
				EB.Log.cleanLogFile();	

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.warning("TEST MESSAGE!", "VT290-400");
				EB.Log.sendLogFile(function() {callbackCalled = true;});
			} );

			waits(100);
			
			runs(function(){
				EB.Log.filePath = originalLogSettings.filePath;
				EB.Log.level = 0;
			} );

			waitsFor( function() {
					return callbackCalled;
				},
				"Callback never called",
				waitTimeout
			);

			runs(function(){
				callbackCalled = false;

				getProps = {
					url: srvHttpLogGetUrl
				};

				EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
			} );

			waitsFor( function() {
					return callbackCalled;
				},
				"Callback never called",
				waitTimeout
			);

			runs(function() {
				expect(status).toEqual('ok');

				expect(data.count("TEST MESSAGE!")).toBeGreaterThan(0);
			});

		});
		}

		// Set log destination to file only
		it("VT290-300 : Log destination to file only", function() {
			 runs(function(){
				var info = "Log message with application public folder displayed below : ";
				EB.Log.info(info, "VT290-300");

				EB.Log.destination = ["file"];
				expect(EB.Log.destination).toEqual(["file"]);

				EB.Log.info("file_message", "VT290-300");
			 });
		});

		// Set log destination to stdio only
		it("VT290-301 : Log destination to stdio only", function() {
			 runs(function(){
				var info = "Log message with application public folder displayed below on standard output: ";
				EB.Log.info(info, "VT290-301");

				EB.Log.destination = ["stdio"];
				expect(EB.Log.destination).toEqual(["stdio"]);

				EB.Log.info("stdio_message", "VT290-301");
			 });
		});

		// Set log destination to uri only
		it("VT290-302 : Log destination to URI only", function() {
			 runs(function(){
				var info = "Log message with application public foldernot displayed in log text file: ";
				EB.Log.info(info, "VT290-302");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["uri"];
				expect(EB.Log.destination).toEqual(["uri"]);

				EB.Log.info("uri_message", "VT290-302");
			 });
		});

		// Set log destination to file, stdio, uri
		it("VT290-303 : Log destination to file, stdio, uri", function() {
			 runs(function(){
				var info = "Log message with application public folder in all file, stdio and uri: ";
				EB.Log.info(info, "VT290-303");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["file","stdio","uri"];
				expect(EB.Log.destination).toEqual(["file","stdio","uri"]);

				EB.Log.info("file_stdio_uri_message", "VT290-303");
			 });
		});

		// Set log destination to stdio,file,uri
		it("VT290-304 : Log destination to stdio,file, uri", function() {
			 runs(function(){
				var info = "Log message with application public folder in all file, stdio and uri: ";
				EB.Log.info(info, "VT290-304");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["stdio","file","uri"];
				expect(EB.Log.destination).toEqual(["file","stdio","uri"]);

				EB.Log.info("file_stdio_uri_message", "VT290-304");
			 });
		});

		// Set log destination to stdio,uri, file
		it("VT290-305 : Log destination to stdio, uri , file", function() {
			 runs(function(){
				var info = "Log message with application public folder in all file, stdio and uri: ";
				EB.Log.info(info, "VT290-305");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["stdio","uri","file"];
				expect(EB.Log.destination).toEqual(["file","stdio","uri"]);

				EB.Log.info("file_stdio_uri_message", "VT290-305");
			 });
		});

		// Set log destination to uri, file,stdio
		it("VT290-306 : Log destination to uri, file,stdio", function() {
			 runs(function(){
				var info = "Log message with application public folder in all file, stdio and uri: ";
				EB.Log.info(info, "VT290-306");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["uri","file","stdio"];
				expect(EB.Log.destination).toEqual(["file","stdio","uri"]);

				EB.Log.info("file_stdio_uri_message", "VT290-306");
			 });
		});

		// Set log destination to uri, stdio,file
		it("VT290-307 : Log destination to uri, stdio,file", function() {
			 runs(function(){
				var info = "Log message with application public folder in all file, stdio and uri: ";
				EB.Log.info(info, "VT290-307");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["uri","stdio","file"];
				expect(EB.Log.destination).toEqual(["file","stdio","uri"]);

				EB.Log.info("file_stdio_uri_message", "VT290-307");
			 });
		});

		// Set log destination to file, stdio
		it("VT290-308 : Log destination to file, stdio", function() {
			 runs(function(){
				var info = "Log message with application public folder in all fil and stdio: ";
				EB.Log.info(info, "VT290-308");

				EB.Log.destination = ["file","stdio"];
				expect(EB.Log.destination).toEqual(["file","stdio"]);

				EB.Log.info("file_stdio_message", "VT290-308");
			 });
		});

		// Set log destination to file, uri
		it("VT290-309 : Log destination to file, uri", function() {
			 runs(function(){
				var info = "Log message with application public folder in all file and uri: ";
				EB.Log.info(info, "VT290-309");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["file","uri"];
				expect(EB.Log.destination).toEqual(["file","uri"]);

				EB.Log.info("file_uri_message", "VT290-309");
			 });
		});


		// Set log destination to stdio, uri
		it("VT290-310 : Log destination to stdio, uri", function() {
			 runs(function(){
				var info = "Log message with application public folder in stdio and uri: ";
				EB.Log.info(info, "VT290-310");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				EB.Log.destination = ["stdio","uri"];
				expect(EB.Log.destination).toEqual(["stdio","uri"]);

				EB.Log.info("stdio_uri_message", "VT290-310");

				EB.Log.destination = ["file","stdio"];
			 });
		});

		// Set log destination to empty
		it("VT290-311 : Log destination to empty", function() {
			 runs(function(){
				var info = "Log destination to empty: ";
				EB.Log.info(info, "VT290-312");

				EB.Log.destination = [];
				expect(EB.Log.destination).toEqual([]);

				EB.Log.info("should_not_exists_message", "VT290-311");

				EB.Log.destination = ["file","stdio"];
			 });
		});

		// Set log destination to empty
		it("VT290-312 : Log destination to empty", function() {
			 runs(function(){
				var info = "Log destination to invalid: ";
				EB.Log.info(info, "VT290-312");

				EB.Log.destination = ["another universe"];
				expect(EB.Log.destination).toEqual([]);

				EB.Log.info("should_not_exists_message", "VT290-312");

				EB.Log.destination = ["file","stdio"];
			 });
		});


		// Set log destinationURI to valid destination
		it("VT290-313 : Set Log destinationURI to valid destination", function() {
			runs(function(){
				var info = "Log destination set. No need verification in log: ";
				EB.Log.info(info, "VT290-313");

				EB.Log.destinationURI = srvHttpLogPostUrl;
				expect(EB.Log.destinationURI).toEqual(srvHttpLogPostUrl);

				EB.Log.info("test_message", "VT290-313");
			});
		});
		// Set Log destinationURI to valid destination with host address having IP address.
		// TODO: implement server for log and add expectations
		it("VT290-314 : Set Log destinationURI to valid destination with host address having IP address.", function() {
			runs(function(){
				var info = "Log destination set. No need verification in log: ";
				EB.Log.info(info, "VT290-314");

				server = srvHttpLogPostUrl;
				EB.Log.destinationURI = server;
				expect(EB.Log.destinationURI).toEqual(server);

				EB.Log.destination = ["stdio","file","uri"];

				EB.Log.info("test_message", "VT290-314");
			});
		});

		if (clientPlatform != EB.System.PLATFORM_WM_CE) {
		// Set Log destinationURI to valid destination with host address having IP address.
		it("VT290-315 : Set Log destinationURI to valid destination with host address having DNS Name as address.", function() {
			runs(function(){
				var info = "Log destination set. No need verification in log: ";
				EB.Log.info(info, "VT290-315");

				EB.Log.destinationURI = "http://rhologs.heroku.com";
				expect(EB.Log.destinationURI).toEqual("http://rhologs.heroku.com");

				EB.Log.info("test_message", "VT290-315");
			});
		});

		// Set Log destinationURI to valid destination with port number
		it("VT290-316 : Set Log destinationURI to valid destination with port number", function() {
			runs(function(){
				var info = "Log destination set. No need verification in log: ";
				EB.Log.info(info, "VT290-316");

				EB.Log.destinationURI = "http://rhologs.heroku.com:80";
				expect(EB.Log.destinationURI).toEqual("http://rhologs.heroku.com:80");

				EB.Log.info("test_message", "VT290-316");
			});
		});

		// Set Log destinationURI to valid secure destination
		it("VT290-317 : Set Log destinationURI to valid secure destination", function() {
			runs(function(){
				var info = "Log destination set. No need verification in log: ";
				EB.Log.info(info, "VT290-317");

				EB.Log.destinationURI = "http://rhologs.heroku.com:443";
				expect(EB.Log.destinationURI).toEqual("http://rhologs.heroku.com:443");

				var info = "Log destination set. No need verification in log: ";
				EB.Log.info(info, "VT290-317");
			});
		});
		}

		// Set Log excludeCategories one module
		it("VT290-321 : Set Log excludeCategories : Application", function() {
			runs(function(){
				var info = "Log Messages related to application should not be displayed : VT290-321";
				EB.Log.info(info, "VT290-321");

				EB.Log.excludeCategories = "Application";
				expect(EB.Log.excludeCategories).toEqual("Application");

				EB.Log.info(fail_str, "Application");
				EB.Log.info(pass_str, "Database");

				expect( checkLogString(EB.LogCapture.read(),0,1) ).toEqual( true );
			});
		});

		// Set Log excludeCategories multiple modules
		it("VT290-322 : Set Log excludeCategories to multiple modules: database, WebView", function() {
			runs(function(){
				var info = "Log Messages related to <system, database, WebView> should not be displayed : VT290-322";
				EB.Log.info(info, "VT290-322");

				EB.Log.excludeCategories = "system, database, WebView";
				expect(EB.Log.excludeCategories).toEqual("system, database, WebView");

				EB.Log.info(fail_str, "system");
				EB.Log.info(fail_str, "database");
				EB.Log.info(fail_str, "WebView");
				EB.Log.info(pass_str, "network");

				expect( checkLogString(EB.LogCapture.read(),0,1) ).toEqual( true );
			});
		});


		// Set Log excludefilter
		it("VT290-325 : Set Log excludefilter : username, password", function() {
			runs(function(){
				var info = "Exclude filter set to username and password : VT290-325";
				EB.Log.info(info, "VT290-325");
				EB.Log.excludeFilter = "username,password";

				object = {
					username : fail_str,
					password : fail_str,
					data : pass_str,
					info : pass_str
				};

				EB.Log.info( JSON.stringify(object), "test")

				expect( checkLogString(EB.LogCapture.read(),0,2) ).toEqual( true );
			});
		});

		// Set Log excludefilter empty
		it("VT290-326 : Set Log excludeFilter to empty", function() {
			runs(function(){
				var info = "ESet Log excludeFilter to empty : VT290-326";
				EB.Log.info(info, "VT290-326");
				EB.Log.excludeFilter = "";

				object = {
                    username: pass_str,
                    password: pass_str,
                    data: pass_str,
                    info: pass_str
                };

				EB.Log.info( JSON.stringify(object), "test")

				expect( checkLogString(EB.LogCapture.read(),0,4) ).toEqual( true );
			});
		});

		// Set Log excludeFilter to invalid value
		it("VT290-327 : Set Log excludeFilter to invalid value", function() {
			runs(function(){
				var info = "Set Log excludeFilter to invalid value : VT290-327";
				EB.Log.info(info, "VT290-327");
				EB.Log.excludeFilter = "aaaa";

				object = {
                    username: pass_str,
                    password: pass_str,
                    data: pass_str,
                    info: pass_str
                };

				EB.Log.info( JSON.stringify(object), "test")

				expect( checkLogString(EB.LogCapture.read(),0,4) ).toEqual( true );
			});
		});


		// Set Log filesize to 100000 KB
		it("VT290-334 : Set Log filsize | 102400000", function() {
			runs(function(){
				var info = "File Size set to 1MB : VT290-334. no verification required in Log";
				EB.Log.info(info, "VT290-334");

				EB.Log.fileSize = 102400000;
				expect(EB.Log.fileSize).toEqual(102400000);
			});
		});

		// Set Log filesize to 0 KB
		it("VT290-335 : Set Log filsize | 0", function() {
			runs(function(){
				var info = "File Size set to 0 : VT290-334. no verification required in Log";
				EB.Log.info(info, "VT290-334");

				EB.Log.fileSize = 0;
				EB.Log.info(info, "Some info");
				expect(EB.Log.fileSize).toEqual(0);
			});
		});

			// Set Log includeCategories one module
		it("VT290-339 : Set Log includeCategories | database", function() {
			runs(function(){

				var info = "Log Messages related to <database> should be displayed : VT290-339";
				EB.Log.info(info, "VT290-339");

				EB.Log.includeCategories = "database";
				expect(EB.Log.includeCategories).toEqual("database");

				EB.Log.info(fail_str, "system");
				EB.Log.info(pass_str, "database");
				EB.Log.info(fail_str, "WebView");
				EB.Log.info(fail_str, "network");

				expect( checkLogString(EB.LogCapture.read(),0,1) ).toEqual( true );

			});
		});

		// Set Log includeCategories *
		it("VT290-340 : Set Log includeCategories to * | *", function() {
			runs(function(){

				EB.Log.includeCategories = "*";
				expect(EB.Log.includeCategories).toEqual("*");

				var info = "Log Messages related to <database> should be displayed : VT290-339";
				EB.Log.info(info, "VT290-340");

				
				EB.Log.info(pass_str, "system");
				EB.Log.info(pass_str, "database");
				EB.Log.info(pass_str, "WebView");
				EB.Log.info(pass_str, "network");

				expect( checkLogString(EB.LogCapture.read(),0,4) ).toEqual( true );

			});
		});

		// Set Log includeCategories multiple modules
		it("VT290-341 : Set Log includeCategories to multiple modules | system, webview, database", function() {
			runs(function(){

				var info = "Log Messages related to <system, webview, database> should be displayed : VT290-341";
				EB.Log.info(info, "VT290-341");
				EB.Log.includeCategories = "database, webview, system";
				
				EB.Log.info(pass_str, "system");
				EB.Log.info(pass_str, "database");
				EB.Log.info(pass_str, "webview");
				EB.Log.info(fail_str, "network");

				expect( checkLogString(EB.LogCapture.read(),0,3) ).toEqual( true );
			});
		});

		// Set Log includeCategories multiple modules
		it("VT290-342 : Set Log includeCategories with valid and invalid database, webview, System, aaaa", function() {
			runs(function(){

				var info = "Log Messages related to <system, webview, database> should be displayed : VT290-342";
				EB.Log.info(info, "VT290-342");
				EB.Log.includeCategories = "database, webview, system, aaa";
				
				EB.Log.info(pass_str, "system");
				EB.Log.info(pass_str, "database");
				EB.Log.info(pass_str, "webview");
				EB.Log.info(fail_str, "network");

				expect( checkLogString(EB.LogCapture.read(),0,3) ).toEqual( true );

			});
		});

		it("VT290-343 : Set Log includeCategories to empty", function() {
			runs(function(){

				var info = "No Log Messages should be displayed : VT290-343";
				EB.Log.info(info, "VT290-342");
				EB.Log.includeCategories = "";
				
				EB.Log.info(fail_str, "system");
				EB.Log.info(fail_str, "database");
				EB.Log.info(fail_str, "webview");
				EB.Log.info(fail_str, "network");

				expect( checkLogString(EB.LogCapture.read(),0,0) ).toEqual( true );

			});
		});

		// Set Log include and exclude Categories
		it("VT290-345 : Set Log include and excludeCategories | application and WebView Logs displayed", function() {
			runs(function(){

				var info = "Log Messages related to <webview, Application> should be displayed and database not displayed: VT290-345";
				EB.Log.info(info, "VT290-345");

				EB.Log.excludeCategories = "database, network";
				EB.Log.includeCategories = "application, WebView";
				expect(EB.Log.excludeCategories).toEqual("database, network");
				expect(EB.Log.includeCategories).toEqual("application, WebView");

				EB.Log.info(pass_str, "application");
				EB.Log.info(fail_str, "database");
				EB.Log.info(pass_str, "WebView");
				EB.Log.info(fail_str, "network");
				EB.Log.info(fail_str, "system");

				expect( checkLogString(EB.LogCapture.read(),0,2) ).toEqual( true );

			});
		});

		// Set Log Level to 4
		it("VT290-346 : Set Log Level to 4 | 4", function() {
			runs(function(){
				var info = "No Logs displayed : VT290-346";
				EB.Log.info(info, "VT290-346");

				EB.Log.level = 4;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(4);

				EB.Log.trace(fail_str, "APP");
				EB.Log.info(fail_str, "APP");
				EB.Log.warning(fail_str, "APP");
				EB.Log.error(fail_str, "APP");

				EB.Log.level = 0;

				expect( checkLogString(EB.LogCapture.read(),0,0) ).toEqual( true );

			});
		});


		// Set Log Level to 3
		it("VT290-347 : Set Log Level to 3 | 3", function() {
			runs(function(){
				var info = "Error message displayed : VT290-347";
				EB.Log.info(info, "VT290-347");
				
				EB.Log.level = 3;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(3);

				EB.Log.trace(fail_str, "APP");
				EB.Log.info(fail_str, "APP");
				EB.Log.warning(fail_str, "APP");
				EB.Log.error(pass_str, "APP");

				EB.Log.level = 0;

				expect( checkLogString(EB.LogCapture.read(),0,1) ).toEqual( true );
			});
		});

		// Set Log Level to 2
		it("VT290-348 : Set Log Level to 2 | 2", function() {
			runs(function(){
				var info = "Error, warning message displayed : VT290-348";
				EB.Log.info(info, "VT290-347");
				
				EB.Log.level = 2;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(2);

				EB.Log.trace(fail_str, "APP");
				EB.Log.info(fail_str, "APP");
				EB.Log.warning(pass_str, "APP");
				EB.Log.error(pass_str, "APP");

				EB.Log.level = 0;

				expect( checkLogString(EB.LogCapture.read(),0,2) ).toEqual( true );
			});
		});

		// Set Log Level to 1
		it("VT290-349 : Set Log Level to 1 | 1", function() {
			runs(function(){
				var info = "Error, warning, info message displayed : VT290-349";
				EB.Log.info(info, "VT290-349");
				
				EB.Log.level = 1;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(1);

				EB.Log.trace(fail_str, "APP");
				EB.Log.info(pass_str, "APP");
				EB.Log.warning(pass_str, "APP");
				EB.Log.error(pass_str, "APP");

				EB.Log.level = 0;

				expect( checkLogString(EB.LogCapture.read(),0,3) ).toEqual( true );
			});
		});

		// Set Log Level to 0
		it("VT290-350 : Set Log Level to 0 | 0", function() {
			runs(function(){
				var info = "Error, warning, info and trace message displayed : VT290-350";
				EB.Log.info(info, "VT290-350");
				
				var savedCat = EB.Log.includeCategories;
				EB.Log.includeCategories = "APP";
				EB.Log.level = 0;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(0);

				EB.Log.trace(pass_str, "APP");
				EB.Log.info(pass_str, "APP");
				EB.Log.warning(pass_str, "APP");
				EB.Log.error(pass_str, "APP");

				EB.Log.level = 0;

				expect( checkLogString(EB.LogCapture.read(),0,4) ).toEqual( true );
				
				EB.Log.includeCategories = savedCat;
			});
		});
/*
		// Set Log Level to 100
		it("VT290-351 : Set Log Level to 100 | 100", function() {
			runs(function(){
				var info = "Set Log Level to 100 : VT290-351";
				EB.Log.info(info, "VT290-351");
				
				EB.Log.level = 0;
				EB.Log.level = 100;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(0);

				EB.Log.trace(pass_str, "APP");
				EB.Log.info(pass_str, "APP");
				EB.Log.warning(pass_str, "APP");
				EB.Log.error(pass_str, "APP");

				expect( checkLogString(EB.LogCapture.read(),0,4) ).toEqual( true );
			});
		});

		// Set Log Level to -1
		it("VT290-352 : Set Logging level to negative value", function() {
			runs(function(){
				var info = "Set Logging level to negative value : VT290-352";
				EB.Log.info(info, "VT290-352");
				
				EB.Log.level = 0;
				EB.Log.level = -1;
				LogLevel = EB.Log.level;
				expect(LogLevel).toEqual(0);

				EB.Log.trace(pass_str, "APP");
				EB.Log.info(pass_str, "APP");
				EB.Log.warning(pass_str, "APP");
				EB.Log.error(pass_str, "APP");

				expect( checkLogString(EB.LogCapture.read(),0,4) ).toEqual( true );
			});
		});
		*/

		if ((EB.System.platform != EB.System.PLATFORM_WP8) && (EB.System.platform != EB.System.PLATFORM_WINDOWS_DESKTOP)) {

			// Set Log Memory period to 2 seconds
			it("VT290-355 : Set Log Memory period to 2 secs | 2000", function () {
				runs(function () {
					EB.Log.level = 1;
					var info = "Info : Memory log should display in 2 secs interval | 0";
					EB.Log.info(info, "VT290-355");

					EB.Log.memoryPeriod = 2000;
					expectedValue = 2000;
					memPeriod = EB.Log.memoryPeriod;
					expect(memPeriod).toEqual(expectedValue);	
				});

				waits(5000);

				runs(function () {
					expect(EB.LogCapture.read().count("MEMORY")).toBeGreaterThan(0);

					//EB.Log.memoryPeriod = 0;
				});
/*
				waits(500);

				runs(function () {
					EB.LogCapture.clear();

					EB.Log.memoryPeriod = 5000;
				});

				
				waits(4000);
	
				runs(function(){
					expect(EB.LogCapture.read().count("MEMORY")).toEqual(0);
				});
	
				waits(2000);
	
				runs(function(){
					expect(EB.LogCapture.read().count("MEMORY")).toEqual(1);
	
					EB.LogCapture.clear();
				});
*/				
			});

/* DUPLICATE of VT290-355
			// Set Log Memory period to 10 seconds
			it("VT290-356 : Set Log Memory period to 10 secs | 10000", function () {
				runs(function () {
					EB.Log.level = 0;
					var info = "Info : Memory log should display in 10 secs interval | 0";
					EB.Log.info(info, "VT290-356");
					expectedValue = 10000;
					EB.Log.memoryPeriod = 10000;
					memPeriod = EB.Log.memoryPeriod;
					expect(memPeriod).toEqual(expectedValue);

					waits(11000);

					runs(function () {
						EB.Log.memoryPeriod = 0;

						expect(EB.LogCapture.read().count("MEMORY")).toEqual(1);

						EB.LogCapture.clear();
					});
				});
			});
*/
		}

		if (clientPlatform == EB.System.PLATFORM_ANDROID || clientPlatform == EB.System.PLATFORM_IOS) // || clientPlatform == EB.System.PLATFORM_WP8
		{
			// Set Netrace to true
			it("VT290-361 : Set netrace to true | true", function() {
				var flag = false;
				var callbackCalled = false;
				var status = '';
				var data = '';

				runs(function(){
					var info = "Set netrace to true | true";
					EB.Log.info(info, "VT290-361");

					expectedValue = true;
					EB.Log.netTrace = expectedValue;

					netTraceValue = EB.Log.netTrace;
					expect(netTraceValue).toEqual(expectedValue);

					getProps = {
						url: srvHttpLogTestMsg
					};

					EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
				} );

				waitsFor( function() {
						return callbackCalled;
					},
					"Callback never called",
					waitTimeout
				);

				runs(function() {
					expect(status).toEqual('ok');

					expect(data.count("Downloaded content") ).toBeGreaterThan( 0 );

					var log = EB.LogCapture.read();

					expect( log.count("== Info") ).toBeGreaterThan( 2 );
					expect( log.count("About to connect") ).toBeGreaterThan( 0 );
					expect( log.count("Connected to") ).toBeGreaterThan( 0 );
					expect( log.count("=> Send headers") ).toBeGreaterThan( 0 );
					expect( log.count("<= Recv headers") ).toBeGreaterThan( 2 );
					expect( log.count("<= Recv data") ).toBeGreaterThan( 0 );
					expect( log.count("RESPONSE-----") ).toBeGreaterThan( 0 );
				});
			});

			// Set Netrace to true
			it("VT290-362 : Set netrace to false | false", function() {
				var flag = false;
				var callbackCalled = false;
				var status = '';
				var data = '';

				runs(function(){
					EB.Log.level = 1;

					expectedValue = false;
					EB.Log.netTrace = expectedValue;

					netTraceValue = EB.Log.netTrace;
					expect(netTraceValue).toEqual(expectedValue);

					getProps = {
						url: srvHttpLogTestMsg
					};

					EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
				} );

				waitsFor( function() {
						return callbackCalled;
					},
					"Callback never called",
					waitTimeout
				);

				runs(function() {
					EB.Log.level = 0;
					expect(status).toEqual('ok');

					expect(data.count("Downloaded content")).toBeGreaterThan(0);

					var log = EB.LogCapture.read();

					expect( log.count("== Info") ).toEqual(0);
					expect( log.count("About to connect") ).toEqual(0);
					expect( log.count("Connected to") ).toEqual(0);
					expect( log.count("=> Send headers") ).toEqual(0);
					expect( log.count("<= Recv headers") ).toEqual(0);
					expect( log.count("<= Recv data") ).toEqual(0);
				});
			});
		}

		// Set skipPost to true
		it("VT290-367 : Set skipPost to true | true", function() {
			var flag = false;
			var callbackCalled = false;
			var status = '';
			var data = '';
			var result = false;
			var content = 'Downloaded content';

			runs(function(){
				EB.Log.level = 0;

				expectedValue = true;
				EB.Log.skipPost = expectedValue;

				skipPostValue = EB.Log.skipPost;
				expect(skipPostValue).toEqual(expectedValue);

				EB.LogCapture.clear();

			} );

			if (clientPlatform == EB.System.PLATFORM_ANDROID || clientPlatform == EB.System.PLATFORM_IOS )
			{
				runs(function(){
					EB.Log.level = 0;

					expectedValue = true;
					EB.Log.skipPost = expectedValue;

					skipPostValue = EB.Log.skipPost;
					expect(skipPostValue).toEqual(expectedValue);

					getProps = {
						url: srvHttpLogTestMsg
					};

					EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
				} );

				waitsFor( function() {
						return callbackCalled;
					},
					"Callback never called",
					waitTimeout
				);

				runs(function() {
					expect(status).toEqual('ok');
					expect(data).toEqual(content);

					var log = EB.LogCapture.read();

					// skippost affects URL, BODY parameters traced, and traces received content
					expect( log.count("URL =") ).toEqual(0);
					expect( log.count("BODY =") ).toEqual(0);
					// data is traced when callback is called, exclude that case
					expect( log.count(data) ).toEqual(0);
				});
			}
		});

		// Set skipPost to false
		it("VT290-368 : Set skipPost to false | false", function() {
			var flag = false;
			var callbackCalled = false;
			var status = '';
			var data = '';
			var result = false;
			var content = 'Downloaded content';

			runs(function(){
				EB.Log.level = 0;

				expectedValue = false;
				EB.Log.skipPost = expectedValue;

				skipPostValue = EB.Log.skipPost;
				expect(skipPostValue).toEqual(expectedValue);

				EB.LogCapture.clear();

			} );

			
			if (clientPlatform == EB.System.PLATFORM_ANDROID || clientPlatform == EB.System.PLATFORM_IOS )
			{
				runs(function(){
					EB.Log.level = 0;

					expectedValue = false;
					EB.Log.skipPost = expectedValue;

					skipPostValue = EB.Log.skipPost;
					expect(skipPostValue).toEqual(expectedValue);

					getProps = {
						url: srvHttpLogTestMsg
					};

					EB.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];status = args['status'];});
				} );

				waitsFor( function() {
						return callbackCalled;
					},
					"Callback never called",
					waitTimeout
				);

				runs(function() {
					expect(status).toEqual('ok');
					expect(data).toEqual(content);

					var log = EB.LogCapture.read();

					// skippost affects URL, BODY parameters traced, and traces received content
					expect( log.count("URL =") ).toBeGreaterThan(0);
					expect( log.count("BODY =") ).toBeGreaterThan(0);
					// data is traced when callback is called, exclude that case
					expect( log.count(data) ).toBeGreaterThan(0);
				});
			}
		});

		// Call error() method with "message" and "categories"
		it("VT290-375 : Call error() method with message and categories | ", function() {
			runs(function(){
				EB.Log.level = 1;
				var info = "Info : Application Error message displayed in the log ";
				EB.Log.info(info, "VT290-375");
				 EB.Log.error("VT290-375 : Application Error Message", "Application");
				 // some code on Application to display error
				 //EB.Application.setLocale(20);
			});
		});

		// Call error() method with wrong category
		it("VT290-379 : Call error() method with message and wrong category | ", function() {
			runs(function(){
				EB.Log.level = 1;
				var info = "Info : Application Error message displayed in the log with invalid catagory name ";
				EB.Log.info(info, "VT290-379");
				EB.Log.error("VT290-379 :Application Error Message", "invalid");
				 // some code on Application to display error
				 //EB.Application.setLocale(20);
			});
		});

		// Call info() method with "message" and "categories"
		it("VT290-385 : Call info() method with message and categories | ", function() {
			runs(function(){
				EB.Log.level = 1;
				var info = "Info : Info message displayed in the log with message and catagory name ";
				EB.Log.info(info, "VT290-385");
				EB.Log.info("VT290-385 : Application Info Message", "Application");
				 // some code on Application to display error
				 //EB.Application.setLocale(20);
			});
		});


		// Call trace() method with "message" and "categories"
		it("VT290-404 : Call trace() method with message and categories | 1", function() {
			runs(function(){
				EB.Log.level = 0;
				var info = "Trace : Trace message displayed in the log with message and categories";
				EB.Log.info(info, "VT290-404");
				EB.Log.trace("VT290-404 :Application trace Message","Application");
			});
		});


	 // Call warning() method with "message" and "categories"
		it("VT290-409 : Call warning() method with message and categories | 1", function() {
			runs(function(){
				EB.Log.level = 1;
				var info = "Warning : Warning message displayed in the log with message and category";
				EB.Log.info(info, "VT290-409");
				EB.Log.warning("VT290-409 :Application warning Message","Application");
			});
		});


		// Call warning() method with message and invalid category aaaa
		it("VT290-413 : Call warning() method with message and invalid category | Error", function() {
			runs(function(){
				EB.Log.level = 0;
				var info = "Warning : Warning message displayed in the log with message and invalid category";
				EB.Log.info(info, "VT290-413");
				EB.Log.trace("VT290-413 :Application warning message","aaaa");
			});
		});
	});
});
