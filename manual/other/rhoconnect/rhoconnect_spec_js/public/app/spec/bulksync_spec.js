// TODO: ORM JS doesn't support bulk yet

// describe("Bulk sync Test Starts Here", function() {
//      //Rho.RhoConnectClient.syncServer = setSyncSever to valid one
// 	  var Product,Customer = null;
// 	  var callbackCalled = false;
// 	  var timeoutflag= false;
// 	  var callback_params_value="";
// 	  var partition_value="";
	  
// 	  var callbackFunction = function (args) {
// 		if(args.sync_type=="bulk") {
// 		if (args.status && args.status=="in_progress"){
// 		  callback_params_value+= args.bulk_status;
// 		  }
// 		  partition_value = args.partition;
// 		}
// 		};
	  
	  
// 	 beforeEach(function() {
// 		   Product,Customer = null;
// 		   callbackCalled = false;
// 		   timeoutflag= false;
// 		   callback_params_value="";
// 		   Rho.RhoConnectClient.pollInterval = 0;
//         Product = Rho.ORM.addModel( function(model){
// 			model.modelName("Product");
// 			model.property('sku','string'); 
//             model.property('name','string'); 	
// 			model.property('brand','string'); 				//declare properties of blob type and other type
// 			model.property('price','string'); 	
// 			model.property('quantity','string'); 	
// 			model.enable("sync");
// 			});
			
// 		 Customer = Rho.ORM.addModel( function(model){
// 			model.modelName("Customer");
// 			model.property('first','string'); 
// 			model.property('last','string'); 
//             model.property('address','string'); 	
// 			model.property('city','string'); 				//declare properties of blob type and other type
// 			model.property('email','string'); 	
// 			model.property('phone','string'); 	
// 			model.property('state','string'); 	
// 			model.property('zip','string'); 	
// 			model.enable("sync");
// 			});
			
// 			Rho.ORM.clear();
// 			var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
// 			db.execute("DELETE FROM SOURCES");
// 			db.execute("DELETE FROM CLIENT_INFO");
// 			db.execute("DELETE FROM OBJECT_VALUES");	
			
// 			Rho.RhoConnectClient.logout();
// 		});
		
// 	afterEach(function() {
			
//     });
	
// 	function do_bluk_sync()
// 	{
// 	Rho.RhoConfig.bulksync_state='0'; //need to replace this code with correct new syntax of javascript
//     Rho.RhoConnectClient.doSync();
// 	}
// 		//bulk sync test
		
// 	    it("VT295-095 | bulk sync functionality test  | Both of the orm model should get populated with server data.", function() { 
// 				runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 			            callbackCalled = true;
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
			
// 			 	 runs(function() {
// 				    expect(callbackCalled).toEqual(true);
// 					expect(Product.find('all').length).toBeGreaterThan(0);
// 					expect(Customer.find('all').length).toBeGreaterThan(0);
// 					});
// 		});
		
// 		it("VT295-096 | Check bulk_status parameter in sync notification call back during bulk sync  | All state(start,download,change_db,ok,and complete)should be reported inside notification callback", function() {  
// 			 Rho.RhoConnectClient.setNotification('*', callbackFunction);
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
			
// 			 	 runs(function() {
// 				    expect(callback_params_value).toContain('start');
// 					expect(callback_params_value).toContain('download');
// 					expect(callback_params_value).toContain('change_db');
// 					expect(callback_params_value).toContain('ok');
// 					expect(callback_params_value).toContain('complete');
// 					expect(Product.find('all').length).toBeGreaterThan(0);
// 					expect(Customer.find('all').length).toBeGreaterThan(0);
// 					});
	
// 		});
		
// 		it("VT295-097 | Check current bulk sync partition  | current bulk sync partition should be reported by @params['partition'] in callback", function() {  
			 
// 			 Rho.RhoConnectClient.setNotification('*', callbackFunction);
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
			
// 			 	 runs(function() {
// 				    expect(partition_value).toEqual('user');
// 					expect(Product.find('all').length).toBeGreaterThan(0);
// 					expect(Customer.find('all').length).toBeGreaterThan(0);
// 					});
	
// 		});
		
// 		it("VT295-098 | bulk sync with record created in db  | Created record will be replaced with the latest set from the backend server.", function() {  
// 	            var item = Product.new();  
// 				item.sku = "VT295-098";
// 				item.save;			
// 				 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
			
// 			 	 runs(function() {
// 					expect(Product.find('all',{conditions: {'sku': 'VT295-098'}}).length).toEqual(0);
// 					expect(Customer.find('all').length).toBeGreaterThan(0);
// 					});
				
			 
			 
	
// 		});
		
// 		it("VT295-099 | Check bulksync_state after bulk sync  | it should set to 1 after successful bulk sync", function() {  
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
			
// 			 	 runs(function() {
// 				    expect(Rho.RhoConfig.bulksync_state).toEqual(1);  //need to replace this code with correct new syntax of javascript
// 					});
			 
	
// 		});
		
// 		it("VT295-100 | Select none of the model for bulk sync | None of the orm model should get populated with server data.", function() {   
//                 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						callbackCalled = true;
// 						//Rho.get_user_db().update_into_table('sources',{'sync_type':'none'}, {'name' : 'Product'});  previous ruby syntax
// 						db.executeSql('UPDATE sources SET sync_type = "none" WHERE name = "Product"');
// 						db.executeSql('UPDATE sources SET sync_type = "none" WHERE name = "Customer"');
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
					
// 					runs(function() {
// 					expect(callbackCalled).toEqual(true);
// 					expect(Product.find('all').length).toEqual(0);
// 					expect(Customer.find('all').length).toEqual(0);
// 					});
// 		});
		
// 		it("VT295-101 | Select only one model(product model) for bulk sync | Only Product model should get populated with server data", function() {  
			 
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						callbackCalled = true;
// 						db.executeSql('UPDATE sources SET sync_type = "incremental" WHERE name = "Product"');
// 						db.executeSql('UPDATE sources SET sync_type = "none" WHERE name = "Customer"');
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
					
// 					runs(function() {
// 					expect(callbackCalled).toEqual(true);
// 					expect(Product.find('all').length).toBeGreaterThan(0);
// 					expect(Customer.find('all').length).toEqual(0);
// 					});
	
// 		});
		
// 		it("VT295-102 | Select both model for bulk sync | Both of the orm model should get populated with server data", function() {  
			 
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						callbackCalled = true;
// 						db.executeSql('UPDATE sources SET sync_type = "incremental" WHERE name = "Product"');
// 						db.executeSql('UPDATE sources SET sync_type = "incremental" WHERE name = "Customer"');
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 15000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 16 seconds", 16000);
					
// 					runs(function() {
// 					expect(callbackCalled).toEqual(true);
// 					expect(Product.find('all').length).toBeGreaterThan(0);
// 					expect(Customer.find('all').length).toBeGreaterThan(0);
// 					});
	
// 		});
		
		
// 		it("VT295-103 | update_into_table( ) method with empty sources | It should throw an API syntax error", function() {  
		
// 			 // test case needs to be deleted in spread sheet since it uses db.executeSql() method and negative test is already covered in db test.
	
// 		});
		
// });		
// 		