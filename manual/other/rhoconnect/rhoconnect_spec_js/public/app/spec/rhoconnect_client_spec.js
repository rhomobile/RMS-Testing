var useNewOrm = false;
var useNewOrm = Rho.NewORM.useNewOrm();

var loginCallback_paramsValue = [{ "error_code" : "" , "error_message" : "" }],
		searchCallback_paramsValue = [{ "status" : "" , "search_params" : "" }],
		syncServerUrl = "http://"+SYNC_SERVER_HOST+":"+SYNC_SERVER_PORT,
		defaultPollInterval = Rho.RhoConnectClient.pollInterval,
		defaultSyncServer = Rho.RhoConnectClient.syncServer,
		defaultPageSize = Rho.RhoConnectClient.pageSize,
		callbackCalled = false,
		Product = null,
		Customer = null;

describe("Rhoconnect Client", function() {
  beforeEach(function() {
	var has_reset = false;
	var resetCallback = function() {
		has_reset =true;
	};
    runs(function() {
		var resetProps = {
			url: syncServerUrl + '/rc/v1/system/reset',
			headers: {'X-RhoConnect-API-TOKEN':'my-rhoconnect-token',
					  'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		Rho.Network.post(resetProps, resetCallback);
	});

	waitsFor(function() {
		return has_reset;
	}, "Timeout", 20000);

    callbackCalled = false;
    Rho.RhoConnectClient.syncServer = syncServerUrl;
    Rho.RhoConnectClient.pollInterval = defaultPollInterval;
    Rho.RhoConnectClient.pageSize = defaultPageSize;
    loginCallback_paramsValue.error_code = "";
    loginCallback_paramsValue.error_message = "";
    Rho.ORM.clear();
	var db = Rho.ORMHelper.dbConnection("user");
	if(useNewOrm){
	
		db.executeSql("DELETE FROM SOURCES");
		db.executeSql("DELETE FROM CLIENT_INFO");
		db.executeSql("DELETE FROM OBJECT_VALUES");
	
		Product = Rho.ORM.addModel('Product',function(model){
			model.enable("sync");
		});
		
		Customer = Rho.ORM.addModel('Customer',function(model){
			model.setModelProperty("address", "string", "");
			model.setModelProperty("created_at", "string", "");
			model.setModelProperty("city", "string", "");
			model.setModelProperty("email", "string", "");
			model.setModelProperty("last", "string", "");
			model.setModelProperty("updated_at", "string", "");
			model.setModelProperty("lat", "string", "");
			model.setModelProperty("long", "string", "");
			model.setModelProperty("phone", "string", "");
			model.setModelProperty("state", "string", "");
			model.setModelProperty("zip", "string", "");
			model.enable("sync");
		});

	}else{
	
		db.$execute_sql("DELETE FROM SOURCES");
		db.$execute_sql("DELETE FROM CLIENT_INFO");
		db.$execute_sql("DELETE FROM OBJECT_VALUES");
		
		Product = Rho.ORM.addModel( function(model){
			model.modelName("Product");
			model.enable("sync");
		});
		
		Customer = Rho.ORM.addModel( function(model){
			model.modelName("Customer");
			model.property("address", "string");
			model.property("created_at", "string");
			model.property("city", "string");
			model.property("email", "string");
			model.property("last", "string");
			model.property("updated_at", "string");
			model.property("lat", "string");
			model.property("long", "string");
			model.property("phone", "string");
			model.property("state", "string");
			model.property("zip", "string");
			model.enable("sync");
		});
	
	}


  });

	it("VT295-053 | pollInterval property default value test | 60", function() {
		Rho.RhoConnectClient.pollInterval = defaultPollInterval;
		runs(function() {
			expect(Rho.RhoConnectClient.pollInterval).toEqual(60);
		});
	});

	it("VT295-005 | login to incorrect syncserver url | errorcode non zero", function() {
		Rho.RhoConnectClient.syncServer = syncServerUrl + '/foo';
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',callbackFunction);
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(Rho.RhoConnectClient.isLoggedIn()).toEqual(false);
			expect(callbackCalled).toEqual(true);
			expect(loginCallback_paramsValue.error_code).not.toEqual('0');
			expect(loginCallback_paramsValue.error_message).not.toEqual("");
		});
	});

	it("VT295-002 | login to syncserver url with anonymous callback function | errorcode 0", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(result){
				callbackFunction(result);
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "Timeout", 20000);

		runs(function() {
			expect(Rho.RhoConnectClient.isLoggedIn()).toEqual(true);
			expect(callbackCalled).toEqual(true);
			expect(loginCallback_paramsValue.error_code).toEqual('0');
			expect(loginCallback_paramsValue.error_message).toEqual("");
		});
	});

	it("VT295-003 | login to syncserver url with function callback | errorcode 0", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',callbackFunction);
		});

		waitsFor(function() {
			return callbackCalled;
		}, "Timeout", 20000);

		runs(function() {
			expect(Rho.RhoConnectClient.isLoggedIn()).toEqual(true);
			expect(callbackCalled).toEqual(true);
			expect(loginCallback_paramsValue.error_code).toEqual('0');
			expect(loginCallback_paramsValue.error_message).toEqual("");
		});
	});

	it("VT295-004 | syncServerUrl value | syncServerUrl", function() {
		Rho.RhoConnectClient.syncServer = syncServerUrl;
		runs(function() {
			expect(Rho.RhoConnectClient.syncServer).toEqual(syncServerUrl);
		});
	});

	it("VT295-007 | isLoggedIn when client is logged in to server | true", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',callbackFunction);
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(Rho.RhoConnectClient.isLoggedIn()).toEqual(true);
		});
	});

	it("VT295-008 | Get username when user is logged in | string", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',callbackFunction);
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(Rho.RhoConnectClient.userName).toEqual('testclient');
		});
	});

	it("VT295-011 | sets notification for specific source model | callback should fire", function() {

		var sourceCallbackCalled = false;
		var processCallback = function(args) {
			sourceCallbackCalled = true;
		};

		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('Product', function(args){
					processCallback(args);
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return sourceCallbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(sourceCallbackCalled).toEqual(true);
			expect(Product.count()).toBeGreaterThan(0);
		});
	});

	it("VT295-012 | don't persist notification for for specific source model | callback should not fire", function() {
		var clearedNotify = false;
		var callbackCount = 0;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('Product', function(){ callbackCount++; });
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCount === 1;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCount).toEqual(1);
		});

		runs(function() {
			Rho.RhoConnectClient.doSync();
			setTimeout(function() {
				clearedNotify = true;
			}, 20000);
		});

		waitsFor(function() {
			return clearedNotify;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCount).toEqual(1);
		});
	});

	it("VT295-013 | clears notification for specific model | callback should not fire", function() {
		var clearedNotify = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('Product', callbackFunction);
				Rho.RhoConnectClient.clearNotification('Product');
				Rho.RhoConnectClient.doSync();
			});
			setTimeout(function() {
				clearedNotify = true;
			}, 20000);
		});

		waitsFor(function() {
			return clearedNotify && !callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toEqual(false);
		});
	});

	it("VT295-014 | sets notification for all sources | callback should be called", function() {
  	runs(function() {
  		Rho.RhoConnectClient.login('testclient','testclient',function(){
  			Rho.RhoConnectClient.setNotification('*', callbackFunction);
  			Rho.RhoConnectClient.doSync();
  		});
  	});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toEqual(true);
			expect(Product.count()).toBeGreaterThan(0);
		});
	});

	it("VT295-015 | clear notification for all sources | callback should not be called", function() {
		var clearedNotify = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.clearNotification('*');
				Rho.RhoConnectClient.doSync();
			});
			setTimeout(function() {
				clearedNotify = true;
			}, 20000);
		});

		waitsFor(function() {
			return clearedNotify;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toEqual(false);
		});
	});

	xit("VT295-016 | set notification callback is set for all sources | callback should be called each time", function() {
		var callCount = 0;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', function(args) { callCount++; });
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callCount === 1;
		}, "wait", 20000);

		runs(function() {
			expect(callCount).toEqual(1);
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callCount === 2;
		}, "wait", 20000);

		runs(function() {
			expect(callCount).toEqual(2);
		});
	});

	it("VT295-017 | set notification with with anonymous callback function | callback should be called", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', function(args){
					callbackCalled = true;
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toEqual(true);
			expect(Product.count()).toBeGreaterThan(0);
		});
	});

	it("VT295-019 | doSync method when record is inserted | new record displays in backend server ", function() {
		var expectedCount = 0,
				callback1 = false,
				callback2 = false,
				callback3 = false,
				testName = new Date().getTime().toString();

		// Sync first time
		Rho.RhoConnectClient.login('testuser','testuser',function(){
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback1 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback1;
		}, "wait 1", 20000);

		runs(function() {
			expectedCount = Product.count();
			Product.create({name: testName});
			Rho.RhoConnectClient.clearNotification('*');
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback2 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback2;
		}, "wait 2", 20000);

		runs(function() {
			Rho.RhoConnectClient.logout();
			Rho.RhoConnectClient.login('testuser2','testuser2',function(){
				Rho.RhoConnectClient.clearNotification('*');
				Rho.RhoConnectClient.setNotification('*', function(args){
					if(args.status == 'complete') {
						callback3 = true;
					}
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callback3;
		}, "wait 3", 20000);

		runs(function() {
			expect(Product.count()).toEqual(expectedCount + 1);
			expect(
				Product.find('all',{conditions: {name: testName}}).length
			).toEqual(1);
		});
	});

	it("VT295-020 | doSync method when record is updated | updated record displays in backend server", function() {
		var callback1 = false,
				callback2 = false,
				callback3 = false,
				testName = new Date().getTime().toString();
		// Sync first time
		Rho.RhoConnectClient.login('testuser','testuser',function(){
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback1 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback1;
		}, "wait 1", 20000);

		runs(function() {
			var p = Product.find('first');
			p.set('name', testName);
			p.save();
			Rho.RhoConnectClient.clearNotification('*');
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback2 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback2;
		}, "wait 2", 20000);

		runs(function() {
			Rho.RhoConnectClient.logout();
			Rho.RhoConnectClient.login('testuser2','testuser2',function(){
				Rho.RhoConnectClient.clearNotification('*');
				Rho.RhoConnectClient.setNotification('*', function(args){
					if(args.status == 'complete') {
						callback3 = true;
					}
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callback3;
		}, "wait 3", 20000);

		runs(function() {
			var products = Product.find('all',{conditions: {name: testName}});
			expect(products.length).toEqual(1);
			expect(products[0].get('name')).toEqual(testName);
		});
	});

	xit("VT295-021 | doSync method when record is deleted | deleted record is removed from backend server", function() {
		var expectedCount = 0,
				callback1 = false,
				callback2 = false,
				callback3 = false,
				deletedName = null;

		// Sync first time
		Rho.RhoConnectClient.login('testuser','testuser',function(){
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback1 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback1;
		}, "wait 1", 20000);

		runs(function() {
			expectedCount = Product.count();
			var deleted = Product.find('first');
			deletedName = deleted.get('name');
			deleted.destroy();
			Rho.RhoConnectClient.clearNotification('*');
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback2 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback2;
		}, "wait 2", 20000);

		runs(function() {
			Rho.RhoConnectClient.logout();
			Rho.RhoConnectClient.login('testuser2','testuser2',function(){
				Rho.RhoConnectClient.clearNotification('*');
				Rho.RhoConnectClient.setNotification('*', function(args){
					if(args.status == 'complete') {
						callback3 = true;
					}
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callback3;
		}, "wait 3", 20000);

		runs(function() {
			expect(Product.count()).toEqual(expectedCount - 1);
			var products = Product.find('all',{conditions: {name: deletedName}});
			expect(products.length).toEqual(0);
		});
	});

	it("VT295-023 | doSync with syncOnlyChangedSources set true | only changed source should sync", function() {
		var callCount = 0,
				timeoutCalled = false;

		var singleCallback = function(args) {
			callCount++;
		};

		// Sync first time
		runs(function() {
			Rho.RhoConnectClient.login('testuser','testuser',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);


		runs(function() {
			Product.create({brand: 'Apple', name: 'test-iphone', price: '$1'});
			Rho.RhoConnectClient.login('testuser','testuser',function(){
				Rho.RhoConnectClient.setNotification('*', singleCallback);
				Rho.RhoConnectClient.doSync(false,'',true);
			});
			setTimeout(function(){
				timeoutCalled = true;
			}, 20000);
		});

		waitsFor(function() {
			return timeoutCalled;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toEqual(true);
			expect(callCount).toEqual(4); // 2 Product, 1 customer, 1 complete
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toBeGreaterThan(0);
		});
	});


	it("VT295-024 | doSync with syncOnlyChangedSources set to false | all sources should sync", function() {
		var callCount = 0,
				timeoutCalled = false;

		var singleCallback = function(args) {
			callCount++;
		};

		// Sync first time
		runs(function() {
			Rho.RhoConnectClient.login('testuser','testuser',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			createProducts(1, 'VT295-024');
			Rho.RhoConnectClient.login('testuser','testuser',function(){
				Rho.RhoConnectClient.setNotification('*', singleCallback);
				Rho.RhoConnectClient.doSync(false,'',false);
			});
			setTimeout(function(){
				timeoutCalled = true;
			}, 20000);
		});

		waitsFor(function() {
			return timeoutCalled;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toEqual(true);
			expect(callCount).toEqual(4); // 2 Product, 1 customer, 1 complete
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toBeGreaterThan(0);
		});
	});

	it("VT295-027 | doSyncSource method with query params | results match the query", function() {
		var hashParams = {};
		hashParams['first'] = 'Bill';
		var queryParams = 'query=' + encodeURIComponent(JSON.stringify(hashParams));
		runs(function() {
			expect(Product.count()).toEqual(0);
      expect(Customer.count()).toEqual(0);
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', okCallbackFunction);
				Rho.RhoConnectClient.doSyncSource('Customer',false,queryParams);
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 6000);

		runs(function() {
			expect(Product.count()).toEqual(0);
			expect(Customer.count()).toEqual(1);
		});
	});

	it("VT295-029 | getLastSyncObjectCount after sync | count of records", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			var expectedProduct = Product.count();
			var expectedCustomer = Customer.count();
			expect(Rho.RhoConnectClient.getLastSyncObjectCount('Product')).toEqual(expectedProduct);
			expect(Rho.RhoConnectClient.getLastSyncObjectCount('Customer')).toEqual(expectedCustomer);
		});
	});

	it("VT295-034 | isSyncing method when sync is in progress | true ", function() {
		var myCallback = function(args) {
			expect(Rho.RhoConnectClient.isSyncing()).toEqual(true);
			callbackCalled = true;
		};

		runs(function() {
			Rho.RhoConnectClient.login('testuser','testuser',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);
	});

	it("VT295-035 | isSyncing method when sync is not in progress | false ", function() {
		runs(function() {
			expect(Rho.RhoConnectClient.isSyncing()).toEqual(false);
		});
	});

	it("VT295-036 | stopSync method | zero records", function() {
		var timeoutCalled = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', function(args){
					Rho.RhoConnectClient.stopSync();
					callbackCalled = true;
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 7000);

		runs(function() {
			expect(callbackCalled).toBe(true);
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toEqual(0);
		});
	});


	it("VT295-037 | stopSync followed by doSync | records should be synchronized", function() {
		var timeoutCalled = false,
				callback1 = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', function(args){
					if(args.status == 'complete') {
						callbackCalled = true;
					}
				});
				Rho.RhoConnectClient.doSync();
				Rho.RhoConnectClient.stopSync();
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toBeGreaterThan(0);
		});
	});

	it("VT295-038 | doSyncSource method for product model | only product model should sync", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', okCallbackFunction);
				Rho.RhoConnectClient.doSyncSource('Product');
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function(){
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toEqual(0);
		});
	});

	it("VT295-040 | doSyncSource method with empty parameters | callback should not be called", function() {
		var timeoutCalled = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', okCallbackFunction);
				Rho.RhoConnectClient.doSyncSource();
				setTimeout(function(){
					timeoutCalled = true;
				}, 20000);
			});
		});

		waitsFor(function() {
			return !callbackCalled && timeoutCalled;
		}, "wait", 20000);

		runs(function(){
			expect(Product.count()).toEqual(0);
			expect(Customer.count()).toEqual(0);
		});
	});

	it("VT295-054 | pollInterval when set to 5 seconds | callback should fire after 5 seconds ", function() {
		var callback1 = false,
				callback2 = false,
				timeoutCalled = false;

		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', function(){ callback1 = true; });
				Rho.RhoConnectClient.pollInterval = 5;
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callback1;
		}, "wait 1", 20000);

		runs(function() {
			Rho.RhoConnectClient.setNotification('*', callbackFunction);
			setTimeout(function(){
				timeoutCalled = true;
			}, 20000);
		});

		waitsFor(function() {
			return timeoutCalled;
		}, "wait 2", 20000);

		runs(function() {
			expect(callbackCalled).toBe(true);
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toBeGreaterThan(0);
		});
	});


	it("VT295-055 | pollInterval set to 0 seconds | callback should not fire", function() {
		var timeoutCalled = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.pollInterval = 0;
			});
			setTimeout(function(){
				timeoutCalled = true;
			}, 20000);
		});

		waitsFor(function() {
			return timeoutCalled;
		}, "wait", 20000);

		runs(function() {
			expect(callbackCalled).toBe(false);
		});
	});

	it("VT295-056 | doSync when pollInterval set to 0 seconds | callback should still fire", function() {
		var timeoutCalled = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.pollInterval = 0;
				Rho.RhoConnectClient.doSync();
			});
			setTimeout(function(){
				timeoutCalled = true;
			}, 30000);
		});

		waitsFor(function() {
			return timeoutCalled;
		}, "wait", 30000);

		runs(function() {
			expect(callbackCalled).toBe(true);
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toBeGreaterThan(0);
		});

	});


	it("VT295-057 | pageSize property default value test | 2000", function() {
		runs(function() {
			expect(Rho.RhoConnectClient.pageSize).toEqual(2000);
		});
	});


	xit("VT295-058 | pageSize property when set to 1 | cumulative_count should increment by 1", function() {
		var cumulative = 0,
				actual = 0;
		Rho.RhoConnectClient.pageSize = 1;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', function(args){
					cumulative++;
					if(args.cumulative_count === args.total_count) {
						callbackCalled = true;
					}
				});
				Rho.RhoConnectClient.doSync('Product');
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function(){
			expect(actual).toEqual(cumulative);
		});
	});

	it("VT295-059 | pageSize property when set to 0 | zero records", function() {
		Rho.RhoConnectClient.pageSize = 0;
		var timeoutCalled = false;
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.doSync('Product');
			});
			setTimeout(function(){
				timeoutCalled = true;
			}, 20000);
		});

		waitsFor(function() {
			return timeoutCalled;
		}, "wait", 20000);

		runs(function(){
			expect(Product.count()).toEqual(0);
		})
	});

		// it("VT295-064 | setObjectNotify() with no changes in source objects | object notification callback should not invoked.", function() {


		// });

		// it("VT295-065 | setObjectNotify() with Anonymous callback function. | object notification callback should be invoked.", function() {


		// });

		// it("VT295-066 | setObjectNotify() with function callback. | object notification callback should be invoked.", function() {


		// });

		// it("VT295-067 | setObjectNotify() without calling addObjectNotify() method. | object notification callback should not get invoked.", function() {


		// });

	 //    it("VT295-068 | cleanObjectNotify()method. | object notification callback should not invoke since it has been cleared.", function() {


		// });

		// it("VT295-069 | addObjectNotify() method without any parameter. | argument error exception should be thrown.", function() {


		// });


	xit("VT295-070 | set userName [read only] property  | raises an exception", function() {
		var message = '';
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				try {
					Rho.RhoConnectClient.userName = 'hello';
				} catch(ex) {
					message = ex.message;
					callbackCalled = true;
				}
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function(){
			expect(Rho.RhoConnectClient.userName).toEqual('testclient');
			expect(message).toMatch('setting a property that has only a getter');
		});
	});

	it("VT295-071 | create record stress test | records should be created", function() {
		var expectedCount = 0,
				callback1 = false,
				callback2 = false,
				callback3 = false,
				testName = new Date().getTime().toString();

		// Sync first time
		Rho.RhoConnectClient.login('testuser','testuser',function(){
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback1 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback1;
		}, "wait 1", 20000);

		runs(function() {
			expectedCount = Product.count();
			for(var i = 0; i < 25; i++) {
				Product.create({name: testName + '-' + i.toString()});
			}
			Rho.RhoConnectClient.clearNotification('*');
			Rho.RhoConnectClient.setNotification('*', function(args){
				if(args.status == 'complete') {
					callback2 = true;
				}
			});
			Rho.RhoConnectClient.doSync();
		});

		waitsFor(function() {
			return callback2;
		}, "wait 2", 30000);

		runs(function() {
			Rho.RhoConnectClient.logout();
			Rho.RhoConnectClient.login('testuser2','testuser2',function(){
				Rho.RhoConnectClient.clearNotification('*');
				Rho.RhoConnectClient.setNotification('*', function(args){
					if(args.status == 'complete') {
						callback3 = true;
					}
				});
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callback3;
		}, "wait 3", 20000);

		runs(function() {
			expect(Product.count()).toEqual(expectedCount + 25);
		});
 	});

	xit(" | call Model.sync | specific model should sync", function() {
		Rho.RhoConnectClient.login('testclient','testclient',function(){
			Product.sync(okCallbackFunction, false, '');
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 6000);

		runs(function() {
			expect(Product.count()).toBeGreaterThan(0);
			expect(Customer.count()).toEqual(0);
		});
	});

	// it("VT295-074 | should handle update updated object while sync error | updated object should sync after error", function() {

	// });


		// it("VT295-078 | login with different user | should reset database ", function() {



		// });

		// it("VT295-079 | should process create-error : delete | created records during error should get deleted from db ", function() {



		// });

		// it("VT295-080 | should process create-error : recreate | created records during error should get recreated in db finally ", function() {



		// });

		// it("VT295-081 | should process retry update-error | ? ", function() {



		// });

		// it("VT295-082 | should process retry update-error full_update model | ? ", function() {



		// });

		// it("VT295-083 | should rollback update-error | ? ", function() {



		// });

	it("VT295-084 | should process delete-error | error should be correct", function() {
    var errors = '',
        status = '',
        code = 0,
        callback2 = false,
        expected = null;

    runs(function() {
      Rho.RhoConnectClient.login('testclient','testclient',function(){
        Rho.RhoConnectClient.setNotification('*', callbackFunction);
        Rho.RhoConnectClient.doSync();
      });
    });

    waitsFor(function() {
      return callbackCalled;
    }, "wait", 20000);

    runs(function() {
      expected = "[{\"version\":3},{\"token\":\"\"},{\"count\":0},{\"progress_count\":0},{\"total_count\":0},{\"delete-error\":{\"broken_object_id\":{\"name\":\"wrongname\",\"an_attribute\":\"error delete\"},\"broken_object_id-error\":{\"message\":\"Error delete record\"}}}]"
      Rho.RhoConnectClient.setNotification('Product', function(args) {
        console.log(" ************* SOME ARGS ******** " + JSON.stringify(args));
        if(args.status == "error") {
          status = args.status;
          errors = args.server_errors;
          code = args.error_code;
          callback2 = true;
        }
      });
      Rho.RhoConnectClient.setSourceProperty('Product', 'rho_server_response', expected);
      Rho.RhoConnectClient.doSyncSource('Product');
    });

    waitsFor(function() {
      return callback2;
    }, "wait2", 6000);

    runs(function() {
      expect(status).toEqual('error');
      expect(
        errors['delete-error']['broken_object_id']['message']
      ).toEqual("Error delete record");
      expect(code).toEqual('8');
    });
  });


  it("VT295-085| should process query-error | error should be correct", function() {
      var errors = '',
          status = '',
          code = 0,
          callback2 = false,
          expected = null;

      runs(function() {
        Rho.RhoConnectClient.login('testclient','testclient',function(){
          Rho.RhoConnectClient.setNotification('*', callbackFunction);
          Rho.RhoConnectClient.doSync();
        });
      });

      waitsFor(function() {
        return callbackCalled;
      }, "wait", 6000);

      runs(function() {
        expected = "[{\"version\":3},{\"token\":\"\"},{\"count\":0},{\"progress_count\":0},{\"total_count\":0},{\"update-rollback\": {\"#{obj_id}\": {\"name\": \"OLD_NAME\"}},\"update-error\":{\"testid\":{\"name\":\"wrongname\",\"an_attribute\":\"error update\"},\"testid-error\":{\"message\":\"error update\"}}}]"
        Rho.RhoConnectClient.setNotification('Product', function(args) {
          console.log(" ************* SOME ARGS ******** " + JSON.stringify(args));
          if(args.status == "error") {
            status = args.status;
            errors = args.server_errors;
            code = args.error_code;
            callback2 = true;
          }
        });
        Rho.RhoConnectClient.setSourceProperty('Product', 'rho_server_response', expected);
        Rho.RhoConnectClient.doSyncSource('Product');
      });

      waitsFor(function() {
        return callback2;
      }, "wait 2", 6000);

      runs(function() {
        expect(status).toEqual('error');
        expect(
          errors['update-error']['testid']['message']
        ).toEqual("error update");
        expect(code).toEqual('8');
      });
    });

    it("VT295-086| should process create-error | error should be correct", function() {
      var errors = '',
          status = '',
          code = 0,
          callback2 = false,
          expected = null;

      runs(function() {
        Rho.RhoConnectClient.login('testclient','testclient',function(){
          Rho.RhoConnectClient.setNotification('*', callbackFunction);
          Rho.RhoConnectClient.doSync();
        });
      });

      waitsFor(function() {
        return callbackCalled;
      }, "wait", 6000);

      runs(function() {
        expected = "[{\"version\":3},{\"token\":\"\"},{\"count\":0},{\"progress_count\":0},{\"total_count\":0},{\"create-error\":{\"testid\":{\"name\":\"wrongname\",\"an_attribute\":\"error create\"},\"testid-error\":{\"message\":\"error create\"}}}]";
         Rho.RhoConnectClient.setNotification('Product', function(args) {
          console.log(" ************* SOME ARGS ******** " + JSON.stringify(args));
          if(args.status == "error") {
            status = args.status;
            errors = args.server_errors;
            code = args.error_code;
            callback2 = true;
          }
        });
        Rho.RhoConnectClient.setSourceProperty('Product', 'rho_server_response', expected);
        Rho.RhoConnectClient.doSyncSource('Product');
      });

      waitsFor(function() {
        return callback2;
      }, "wait", 6000);

      runs(function() {
        expect(status).toEqual('error');
        expect(
          errors['create-error']['testid']['message']
        ).toEqual("error create");
        expect(code).toEqual('8');
      });
    });

 		it("VT295-087| should process update-error | error should be correct", function() {
      var errors = '',
          status = '',
          code = 0,
          callback2 = false,
          expected = null;

      runs(function() {
        Rho.RhoConnectClient.login('testclient','testclient',function(){
          Rho.RhoConnectClient.setNotification('*', callbackFunction);
          Rho.RhoConnectClient.doSync();
        });
      });

      waitsFor(function() {
        return callbackCalled;
      }, "wait", 6000);

      runs(function() {
        expected = "[{\"version\":3},{\"token\":\"\"},{\"count\":0},{\"progress_count\":0},{\"total_count\":0},{\"update-error\":{\"broken_object_id\":{\"name\":\"wrongname\",\"an_attribute\":\"error update\"},\"broken_object_id-error\":{\"message\":\"error update\"}}}]";
        Rho.RhoConnectClient.setNotification('Product', function(args) {
          console.log(" ************* SOME ARGS ******** " + JSON.stringify(args));
          if(args.status == "error") {
            status = args.status;
            errors = args.server_errors;
            code = args.error_code;
            callback2 = true;
          }
        });
        Rho.RhoConnectClient.setSourceProperty('Product', 'rho_server_response', expected);
        Rho.RhoConnectClient.doSyncSource('Product');
      });

      waitsFor(function() {
        return callback2;
      }, "wait", 6000);

      runs(function() {
        expect(status).toEqual('error');
        expect(
          errors['update-error']['broken_object_id']['message']
        ).toEqual("error update");
        expect(code).toEqual('8');
      });
  	});

		// it("VT295-087 | should NOT push pending created objects | ? ", function() {



		// });

		// it("VT295-088 | should push when pending created objects | ? ", function() {



		// });

		// it("VT295-089 | should NOT push when children pending created objects | ? ", function() {



		// });

		// it("VT295-090 | should handle update created object while sync error | ? ", function() {



		// });

		// it("VT295-091 | should handle update created object while sync error | ? ", function() {



		// });


	it("VT295-006 | Call isLoggedIn() when client is not logged in to server | false", function() {
		Rho.RhoConnectClient.logout();
		runs(function() {
			expect(Rho.RhoConnectClient.isLoggedIn()).toEqual(false);
		});
	});

	it("VT295-009 | Get username when user is logged out | string", function() {
		runs(function() {
			Rho.RhoConnectClient.login('testclient','testclient',function(){
				Rho.RhoConnectClient.setNotification('*', callbackFunction);
				Rho.RhoConnectClient.doSync();
			});
		});

		waitsFor(function() {
			return callbackCalled;
		}, "wait", 20000);

		runs(function() {
			Rho.RhoConnectClient.logout();
			expect(Rho.RhoConnectClient.userName).toEqual('testclient');
		});
	});

	xdescribe("JS ORM Sync Related Test", function() {

		var userloggedIn = false;
		var countBeforeSync ='';
		var	countAfterSync = '';
		var callback = false;
		var modelSyncCallbackFired = false;
		var callbackdata = '';

		var modelSyncCallback = function (args){
			alert(JSON.stringify(args));
			modelSyncCallbackFired = true;
			callbackdata = args['data'];

		}

		beforeEach(function() {
			userloggedIn = false;
			countBeforeSync ='';
			countAfterSync = '';
			callback = false;
			modelSyncCallbackFired = false;
			callbackdata = '';
		});

		afterEach(function(){

		});

		it('VT302-0230 | Call haveLocalChanges after adding some data to synced model',function(){

        var itemTypes = ['Electronics','Softwares'];

        for (var i=0;i<=100;i++){
            var nameValue = "Item "+i;
            var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
            Product.create({id: i, name: nameValue, type: itemType});
        }
        Rho.RhoConnectClient.login('testuser','testuser',function(){
            Rho.RhoConnectClient.setNotification('*', function(args){
                if(args.status == 'complete') {
                    callback = true;
                }
            });
            Rho.RhoConnectClient.doSync();
        });

        waitsFor(function() {
            return callback;
        }, "waiting for sync", 6000);

        runs(function(){

            for (var i=0;i<=20;i++){
            var nameValue = "Item "+i;
            var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
            Product.create({id: i, name: nameValue, type: itemType});
            }

            var value = Rho.ORMModel.haveLocalChanges('Product');
            var value1 = Product.haveLocalChanges();

            expect(value).toEqual(true);
            expect(value1).toEqual(true);
        });
    });


    it('VT302-0231 | Call haveLocalChanges just after sync got finished',function(){

        var itemTypes = ['Electronics','Softwares'];

        for (var i=0;i<=100;i++){
            var nameValue = "Item "+i;
            var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
            Product.create({id: i, name: nameValue, type: itemType});
        }

        Rho.RhoConnectClient.login('testuser','testuser',function(){
            Rho.RhoConnectClient.setNotification('*', function(args){
                if(args.status == 'complete') {
                    callback = true;
                }
            });
            Rho.RhoConnectClient.doSync();
        });

        waitsFor(function() {
            return callback;
        }, "waiting for sync", 6000);

        runs(function(){

            var value = Rho.ORMModel.haveLocalChanges('Product');
            var value1 = Product.haveLocalChanges();

            expect(value).toEqual(false);
            expect(value1).toEqual(false);
        });
    });

		  it("VT302-236 | Call sync ORMModel without passing any arguments",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-236'});

					Rho.RhoConnectClient.setNotification('Product', function(args){
						if(args.status == 'complete') {
							callback = true;
						}
					});

					Product.sync();

				});

				waitsFor(function() {
					return callback;
				}, "wait 1", 6000);

				runs(function(){
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-236'}}).length
					).toEqual(1);

				});

		  })

		  it("VT302-237 | Call sync OrmModel passing callback as an argument and check callback is getting fired or not",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-236'});
					Product.sync(modelSyncCallback);

				});

				waitsFor(function() {
					return modelSyncCallbackFired;
				}, "Waiting for callback to be fired Model Specific", 6000);

				runs(function(){
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-236'}}).length
					).toEqual(1);

				});

		  });

		  it("VT302-238 | Call sync ORMModel passing callback and callbackdata as arguments",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-236'});
					Product.sync(modelSyncCallback,"This Will Get Captured In Callback");
				});

				waitsFor(function() {
					return modelSyncCallbackFired;
				}, "Waiting for callback to be fired Model Specific", 6000);

				runs(function(){
					expect(callbackdata).toBe('This Will Get Captured In Callback');
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-236'}}).length
					).toEqual(1);

				});

		  });

		  it("VT302-239 | Call sync ORMModel without passing callback but with callbackdata",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-239'});

					Rho.RhoConnectClient.setNotification('Product', function(args){
						if(args.status == 'complete') {
							callback = true;
						}
					});

					Product.sync('',"This data won't get captued in callback");

				});

				waitsFor(function() {
					return callback;
				}, "wait 1", 6000);

				runs(function(){
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-239'}}).length
					).toEqual(1);

				});

		  });

		  it("VT302-245 | Call sync ORMModel with callback, callbackdata, showStatusPopup as false and urlencoded query params",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-236'});
					Product.sync(modelSyncCallback,"This Will Get Captured In Callback",false,'data1=hello&data2=world');
				});

				waitsFor(function() {
					return modelSyncCallbackFired;
				}, "Waiting for callback to be fired Model Specific", 6000);

				runs(function(){
					expect(callbackdata).toBe('This Will Get Captured In Callback');
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-236'}}).length
					).toEqual(1);

				});
		  });

		  it("VT302-246 | Call sync ORMModel with callback, callbackdata, showStatusPopup as false and query params as null",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-236'});
					Product.sync(modelSyncCallback,"This Will Get Captured In Callback",false,undefined);
				});

				waitsFor(function() {
					return modelSyncCallbackFired;
				}, "Waiting for callback to be fired Model Specific", 6000);

				runs(function(){
					expect(callbackdata).toBe('This Will Get Captured In Callback');
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-236'}}).length
					).toEqual(1);

				});
		  });

		  it("VT302-247 | Call sync with ORMModel with url encoded query params, callback and calldata as null",function(){
		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-247'});

					Rho.RhoConnectClient.setNotification('Product', function(args){
						if(args.status == 'complete') {
							callback = true;
						}
					});

					Product.sync('','',false,'data1=hello&data2=world');

				});

				waitsFor(function() {
					return callback;
				}, "wait 1", 6000);

				runs(function(){
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-247'}}).length
					).toEqual(1);

				});
		  });

		  it("VT302-248 | Call sync with ORMModel with empty string For e.g ORMModel.sync('','',false,'')",function(){

		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-247'});

					Rho.RhoConnectClient.setNotification('Product', function(args){
						if(args.status == 'complete') {
							callback = true;
						}
					});

					Product.sync('','',false,'');

				});

				waitsFor(function() {
					return callback;
				}, "wait 1", 6000);

				runs(function(){
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-247'}}).length
					).toEqual(1);

				});

		  });

		  it("VT302-249 | call sync with ORMModel by passing undefined as arguments for e.g ORMModel.sync(undefined,undefined,undefined,undefined)",function(){
		  		runs(function(){
			  		Rho.RhoConnectClient.login('testuser','testuser',function(args){
			  			userloggedIn = true;
					});
				});

				waitsFor(function(){
					return userloggedIn;
				},"Waiting for user to login",2000);

				runs(function(){

					countBeforeSync = Product.count();
					Product.create({name: 'VT302-247'});

					Rho.RhoConnectClient.setNotification('Product', function(args){
						if(args.status == 'complete') {
							callback = true;
						}
					});

					Product.sync('','',false,'');

				});

				waitsFor(function() {
					return callback;
				}, "wait 1", 6000);

				runs(function(){
					countAfterSync = Product.count();
					expect(countAfterSync).toEqual(countBeforeSync);
					expect(
						Product.find('all',{conditions: {name: 'VT302-247'}}).length
					).toEqual(1);

				});
		  });

	});

});
