// TODO: ORM JS doesn't support bulk yet

// describe("Blob Bulk sync Test Starts Here", function() {
//      //Rho.RhoConnectClient.syncServer = setSyncSever to valid one
// 	  var BlobBulkTest,BlobBulkTest_s = null;
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
// 		   BlobBulkTest,BlobBulkTest_s = null;
// 		   callbackCalled = false;
// 		   timeoutflag= false;
// 		   callback_params_value="";
// 		   Rho.RhoConnectClient.pollInterval = 0;
		   
//         BlobBulkTest = Rho.ORM.addModel( function(model){
// 			model.modelName("BlobBulkTest");
// 			model.property('image_uri','blob','overwrite'); 
//             model.property('name','string');
// 			model.enable("sync");
// 			});
			
// 		 BlobBulkTest_s = Rho.ORM.addModel( function(model){
// 			model.modelName("BlobBulkTest_s");
// 			model.property('image_uri','blob','overwrite'); 
//             model.property('name','string'); 			
//             model.enable("fixedSchema");		
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
			
// 		//Blob bulk sync test
		
// 		it("VT295-104 | Blob bulk sync functionality test  | All Blob files should get download from sync server successfully", function() {  
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 			            callbackCalled = true;
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 20000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 21 seconds", 21000);
			
// 			 	 runs(function() {
// 				    expect(callbackCalled).toEqual(true);
// 					expect(BlobBulkTest.find('all').length).toBeGreaterThan(0);
// 					expect(BlobBulkTest_s.find('all').length).toBeGreaterThan(0);
// 					});
			
			
// 		});
		
// 		it("VT295-105 | Blob bulk sync test when local db has some blob files  | All current blobs in DB-files folder should get replaced with current Blob images downloaded from sync server", function() {  
// 			   //creates a blob record and save it to BlobTest property bag orm model
//     			var file_name = Rho.Application.modelFolderPath('BlobBulkTest') + 'BlobBulkTest.png';
// 				File.copy(file_name , Rho.Application.databaseBlobFolder);
// 				file_name = Rho.Application.databaseBlobFolder +'BlobBulkTest.png';
// 				var file_content = File.read(file_name);
				
				
// 				var item = BlobTest.new();  
// 				item.name = "BlobBulkTest";
// 				item.image_uri = file_name;
// 				item.save;
				
// 				//creates a blob record and save it to BlobBulkTest_s fixed schema orm model
// 				var file_name_s = Rho.Application.modelFolderPath('BlobBulkTest_s') + 'BlobBulkTest_s.png';
// 				File.copy(file_name_s , Rho.Application.databaseBlobFolder);
// 				file_name_s = Rho.Application.databaseBlobFolder +'BlobBulkTest_s.png';
// 				var file_content_s = File.read(file_name_s);

// 				var item_s = BlobBulkTest_s.new();  
// 				item_s.name = "BlobBulkTest_s";
// 				item_s.image_uri = file_name_s;
// 				item_s.save;
				
// 				runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 			            callbackCalled = true;
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 20000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 21 seconds", 21000);
			
// 			 	 runs(function() {
// 				    expect(callbackCalled).toEqual(true);
// 					expect(BlobBulkTest.find('all',{conditions: {'name': "BlobBulkTest"}}).length).toEqual(0);
// 					expect(BlobBulkTest.find('all',{conditions: {'name': "BlobBulkTest_s"}}).length).toEqual(0);
// 					expect(BlobBulkTest.find('all').length).toBeGreaterThan(0);
// 					expect(BlobBulkTest_s.find('all').length).toBeGreaterThan(0);
// 					});
			
	
// 		});
		
// 		it("VT295-106 | Check bulk_status parameter in sync notification call back during blob bulk sync  | All state(start,download,change_db,blobs,ok,and complete)should be reported inside notification callback", function() {  
// 			Rho.RhoConnectClient.setNotification('*', callbackFunction);
// 			 runs(function () {
// 						Rho.RhoConnectClient.login('testclient','testclient',function(){
// 						do_bluk_sync();
// 						});

// 					setTimeout(function() {
// 					timeoutflag = true;
// 					}, 20000);
// 					});

// 					waitsFor(function() {
// 					return timeoutflag;
// 					}, "wait for 21 seconds", 21000);
			
// 			 	 runs(function() {
// 				    expect(callback_params_value).toContain('start');
// 					expect(callback_params_value).toContain('download');
// 					expect(callback_params_value).toContain('change_db');
// 					expect(callback_params_value).toContain('blobs');
// 					expect(callback_params_value).toContain('ok');
// 					expect(callback_params_value).toContain('complete');
// 					expect(Product.find('all').length).toBeGreaterThan(0);
// 					expect(Customer.find('all').length).toBeGreaterThan(0);
// 					}); 
			
	
// 		});
		
		
// });
// 		