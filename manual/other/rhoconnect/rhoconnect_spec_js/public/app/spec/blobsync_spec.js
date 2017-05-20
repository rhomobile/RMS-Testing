// TODO: Blob Sync not supported
// describe("RC- Blob Sync Test Starts Here", function() {
//   var BlobTest = null;
//   var callbackCalled = false;
//   BlobTest = Rho.ORM.addModel( function(model){
//   	model.modelName("BlobTest");
//   	model.property('image_uri','blob','overwrite'); 
//         model.property('name','string'); 			//declare properties of blob type and other type
//         model.enable("sync");
//       });

//   Rho.ORM.clear();
//   var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
//   db.execute("DELETE FROM SOURCES");
//   db.execute("DELETE FROM CLIENT_INFO");
//   db.execute("DELETE FROM OBJECT_VALUES");	


//   beforeEach(function() {
//   	callbackCalled = false;
  	
//   });	

//   afterEach(function() {
  	
//   });


// it("VT295-108 | Create blob and do sync  | image uri property of particular blob file should get changed after sync", function() {  
// 	var status="";
// 	var error_code ="";
// 	var myCallback = function(args){
// 		callbackCalled = true;
// 		status =args.status;
// 		error_code =args.error_code;
// 	}
// 	var file_name = Rho.Application.modelFolderPath('BlobTest') + 'test.png';
// 	File.copy(file_name , Rho.Application.databaseBlobFolder);
// 	file_name = Rho.Application.databaseBlobFolder +'test.png';
// 	var file_content = File.read(file_name);
	
// 	//creates a blob record 
// 	var item = BlobTest.new();  
// 	item.name = "BlobTestItem";
// 	item.image_uri = file_name;
// 	item.save;
// 	Rho.RhoConnectClient.setNotification('BlobTest', myCallback);
// 	runs(function () {
// 		Rho.RhoConnectClient.login('testclient','testclient',function(){
// 			BlobTest.sync();
// 		});

// 	/*setTimeout(function(){   //what is need of it
// 			callbackCalled = false;
// 			}, 10000);
// }); */

// 	waitsFor(function() {
// 		return callbackCalled;
// 	}, "Callback was not yet called.", 10000);
	
// 	var items = BlobTest.find("all",{conditions: {'name': "BlobTestItem"}});
// 	/*new_file_name = File.join(Rho::RhoApplication::get_blob_path(items[0].image_uri))
// 	content_new = File.read(new_file_name)*/
// 	var new_file_name = Rho.Application.expandDatabaseBlobFilePath(items[0].image_uri);
// 	var content_new = File.read(new_file_name);


// 	runs(function() {
// 		expect(callbackCalled).toEqual(true);
// 		expect(status).toEqual('ok');
// 		expect(parseInt(error_code)).toEqual(Rho.RhoError.ERR_NONE);
// 		expect(items.length).toEqual(1);
// 	expect(items[0].image_uri).not.toEqual(file_name); // it will get updated and changed after sync
// 	expect(content_new).toEqual(file_content);
// });	
// });


//   it("VT295-109 | Modify existing blob and sync  | image uri property of particular blob file should get changed after sync", function() {  
//     var status="";
//     var error_code ="";
//     var myCallback = function(args){
//       callbackCalled = true;
//       status =args.status;
//       error_code =args.error_code;
//     }

//     var item ,saved_obj = BlobTest.find("first");
//     var file_name = Rho.Application.modelFolderPath('BlobTest') + 'test2.png';
//     File.copy(file_name , Rho.Application.databaseBlobFolder);
//     file_name = Rho.Application.databaseBlobFolder +'test2.png';

// 	item.image_uri = file_name;  //overriding the image uri with new blob file
// 	item.save;
	
// 	Rho.RhoConnectClient.setNotification('BlobTest', myCallback);
// 	runs(function () {
// 		Rho.RhoConnectClient.login('testclient','testclient',function(){
// 			BlobTest.sync();
// 		});

// 		waitsFor(function() {
// 			return callbackCalled;
// 		}, "Callback was not yet called.", 10000);
		
// 		var item2 = BlobTest.find(saved_obj);
		
// 		runs(function() {
// 			expect(callbackCalled).toEqual(true);
// 			expect(status).toEqual('ok');
// 			expect(parseInt(error_code)).toEqual(Rho.RhoError.ERR_NONE);
// 			expect(item2.image_uri).not.toEqual(file_name); 
// 		});	
// 	});
	
// 	it("VT295-110 | Delete the blob and sync  | Deleted blob object should not exist in db device folder after sync", function() {  
// 		var status="";
// 		var error_code ="";
// 		var myCallback = function(args){
// 			callbackCalled = true;
// 			status =args.status;
// 			error_code =args.error_code;
// 		}
		
// 	// destroy the existing synced blob object
// 	var item_selected = BlobTest.find("all",{conditions: {'name': "BlobTestItem"}});
// 	item_selected.destroy();
	
// 	Rho.RhoConnectClient.setNotification('BlobTest', myCallback);
// 	runs(function () {
// 		Rho.RhoConnectClient.login('testclient','testclient',function(){
// 			BlobTest.sync();
// 		});

// 		waitsFor(function() {
// 			return callbackCalled;
// 		}, "Callback was not yet called.", 10000);
		
// 		var items = BlobTest.find("all",{conditions: {'name': "BlobTestItem"}});


// 		runs(function() {
// 			expect(callbackCalled).toEqual(true);
// 			expect(status).toEqual('ok');
// 			expect(parseInt(error_code)).toEqual(Rho.RhoError.ERR_NONE);
// 			expect(items.length).toEqual(0);
// 		});	
		
		
// 	});
	
// });