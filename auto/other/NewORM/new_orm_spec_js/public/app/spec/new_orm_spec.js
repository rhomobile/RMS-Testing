describe("Add Model Test cases : ", function(){
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
			if(db2.isTableExist("localTable")){
				console.log("Found localTable !");
				db2.executeSql("DROP TABLE localTable");
			}
	  	});
	  };
	beforeEach(function(){
		reset();
	});
	//:Adding modle with fixed_schema = true
	//:Model with property 'name' and 'quantity'
	it("Should add model with fixed_schema", function(){
		if(useNewOrm){
			//Model definition
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition","local");
			};
			//Adding model 'Product' with defintion defined above Product
			var prdObj = Rho.ORM.addModel('Product', Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("fixedSchema");
				model.set("partition", "local");
				model.property("name", "string");
				model.property("quantity", "string");
			};
			var prdObj = Rho.ORM.addModel(Product)
		}
		//Inserting record to the added model by its instance.
		prdObj.createObject({"name":"test","quantity":"20"});

		// validation of model properties
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("local");

		//getting the data created in actuall table by ORM Model
		var resObj = localDB.executeSql("SELECT * FROM Product");

		//Validation of record inserted.
		expect(resObj[0].name).toEqual("test");
		expect(resObj[0].quantity).toEqual("20");

		//This test ensures the addition of model is successfull and able to create a table in the sqlite database.
	});

	//:Adding model with propertybag
	//:Model with property 'name' and 'quantity'
	it("Should add model with propertybag", function(){
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel('Product', Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		expect(prdObj.fixed_schema).toEqual(false);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("local");
	});
	//:Adding model with sync enabled
	//:Model with property 'name' and 'quantity' 
	//:Model enabled with sync with type incremental
	it("Should add model with sync enabled of type incremental", function(){
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel('Product', Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.model_name).toEqual("Product");
		expect(prdObj.sync_type).toEqual("incremental");
		expect(prdObj.partition).toEqual("user");
	});
	//:Adding model with sync enabled
	//:Model with property 'name' and 'quantity' 
	//:Model enabled with sync with type bulk_only
	it("Should add model with sync enabled of type bulk_only", function(){
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
				model.set("sync_type", "bulk_only")
			};
			var prdObj = Rho.ORM.addModel('Product', Product);
		} else {
			var Product = function(model){
				model.modelName("Product")
				model.enable("fixed_schema");
				model.property("name","string");
				model.setProperty("quantity", "string");
				model.enable("sync");
				model.set("sync_type", "bulk_only")
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.model_name).toEqual("Product");
		expect(prdObj.sync_type).toEqual("bulk_only");
		expect(prdObj.partition).toEqual("user");
	});
	//:Adding model with sync enabled
	//:Model with property 'name' and 'quantity' 
	//:Model enabled with sync with type none
	it("Should add model with sync enabled of type none", function(){
		if(useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
				model.set("sync_type", "none")
			};
			var prdObj = Rho.ORM.addModel('Product', Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("fixedSchema");
				model.enable("sync");
				model.set("partition", "user");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("sync_type", "none");
			}
		}
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.model_name).toEqual("Product");
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("user");
	});
	it("Should add index",function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price","float", "");
				model.setSchemaIndex("p1", ["name"], false);
				model.set("partition","local");
			};
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.enable("fixedSchema");
				model.addIndex("p1",["name"]);
				model.set("partition","local");
			};
		}
		var model = specHelpers.addModel('Product', Product);
		model.create({"name":"test"});
		expect(model).toBeDefined();
		res = localDB.executeSql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
		expect(res[0].name).toEqual('test');
	});
	it("Should addIndex to multiple columns while creating a model",function() {
		if(useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.fixed_schema = true;
				model.setSchemaIndex("p1", ["name","price"], false);
				model.set("partition","local");
			};
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.enable("fixedSchema");
				model.addIndex("p1",["name","price"]);
				model.set("partition","local");
			};
		}
		var model = specHelpers.addModel('Product', Product);
		model.create({"name":"test","price":87.89});
		expect(model).toBeDefined();
		res = localDB.executeSql("SELECT * FROM Product INDEXED BY \"p1\" Where name = 'test' ");
		expect(res[0].name).toEqual('test');
	});

	it("Should add multiple Index to multiple columns while creating a model",function(){
		if(useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.setModelProperty("type","string","");
				model.fixed_schema = true;
				model.setSchemaIndex("p1", ["name","price"], false);
				model.setSchemaIndex("p2", ["type"], false);
				model.set("partition","local");
			};
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.property("type","string");
				model.enable("fixedSchema");
				model.addIndex("p1",["name","price"]);
				model.addIndex("p2",["type"]);
				model.set("partition","local");
			};
		}
		var model = specHelpers.addModel('Product', Product);
		model.create({"name":"test","price":87.89,"type":"testing"});
		model.create({"name":"debug","price":0.78,"type":"testing2"});
		expect(model).toBeDefined();
		res = localDB.executeSql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
		res2 = localDB.executeSql("SELECT * FROM Product INDEXED BY p2 Where type = 'testing2' ");
		expect(res[0].name).toEqual('test');
		expect(res2[0].name).toEqual('debug');
	});

	it("Should add unique index",function(){
		if(useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.fixed_schema = true;
				model.setSchemaIndex("u1", ["name"], true);
				model.set("partition","local");
			};
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.enable("fixedSchema");
				model.addUniqueIndex("u1",["name"]);
				model.set("partition","local");
			};
		}
		var model = specHelpers.addModel('Product', Product);
		model.create({"name":"test"});
		expect(model).toBeDefined();
		res = localDB.executeSql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
		expect(res[0].name).toEqual('test');
	});

	it("Should add Unique Index to multiple columns while creating a model",function(){
		if(useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.fixed_schema = true;
				model.setSchemaIndex("u2", ["name","price"], true);
				model.set("partition","local");
			};
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.enable("fixedSchema");
				model.addUniqueIndex("u2",["name","price"]);
				model.set("partition","local");
			};
		}
		var model = specHelpers.addModel('Product', Product);
		model.create({"name":"test","price":87.89});
		model.create({"name":"test","price":87.90});
		model.create({"name":"test2","price":87.90});
		expect(model).toBeDefined();
		res = localDB.executeSql("SELECT * FROM Product INDEXED BY u2 Where name = 'test' ");
		expect(res[0].name).toEqual('test');
	});

	it("Should add multiple Unique Index to multiple columns while creating a model",function(){
		if(useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.setModelProperty("type","string","");
				model.fixed_schema = true;
				model.setSchemaIndex("u1", ["name","price"], true);
				model.setSchemaIndex("u2", ["type"], true);
				model.set("partition","local");
			};
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.property("type","string");
				model.enable("fixedSchema");
				model.addUniqueIndex("u1",["name","price"]);
				model.addUniqueIndex("u2",["type"]);
				model.set("partition","local");
			};
		}
		var model = specHelpers.addModel('Product', Product);
		model.create({"name":"test","price":87.89,"type":"testing"});
		model.create({"name":"test","price":87.00,"type":"testing3"});
		model.create({"name":"test1","price":87.00,"type":"testing4"});
		model.create({"name":"debug","price":0.78,"type":"testing2"});
		expect(model).toBeDefined();
		res = localDB.executeSql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
		res2 = localDB.executeSql("SELECT * FROM Product INDEXED BY u2 Where type = 'testing2' ");
		expect(res[0].name).toEqual('test');
		expect(res2[0].name).toEqual('debug');
	});

	//:Added two Models Product and Item.
	//:Model Item's column 'itemName' is set 'BelongsTo' product model.
	it("Should add model with belongs_to with another model.", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
			model.setBelongsTo("itemName", "Product"); // new ORM does not support belongs_to method.
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("local");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual([ 'Product' ]);
	});
});
describe("DatabaseClientReset test set : ", function(){
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
			if(db2.isTableExist("localTable")){
				console.log("Found localTable !");
				db2.executeSql("DROP TABLE localTable");
			}
	  	});
	 };
	beforeEach(function(){
		reset();
	});
	if(useNewOrm){
		//:DatabaseClientReset method to reset only client model&info and optionally local model.
		it("Should reset Property bag client model using databaseClientReset() without any parameter", function(){
			var res = "";
			// Definition of user table with sync enabled.
			var Product = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			// local table without sync
			var localTable = function(model){
				model.fixed_schema = true;
				model.setModelProperty("itemName", "string", "");
				model.setModelProperty("quantity", "", "");
			};
			//Assigning record to the user table
			var prdObj = Rho.ORM.addModel("Product", Product);
			prdObj.createObject({"name":"Nadaf", "quantity":"10"});

			//Assigning record to the local table
			var loctab = Rho.ORM.addModel("localTable", localTable);
			loctab.createObject({"itemName":"biriyani", "quantity":"10"});

			var user_record = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			var local_record = localDB.executeSql("SELECT * FROM localTable");
			try{
				Rho.ORM.databaseClientReset();
			} catch(err){
				res = err;
			}
			expect(user_record[0].value).toEqual("Nadaf");
			expect(user_record[1].value).toEqual("10");
			expect(local_record[0].itemName).toEqual("biriyani");
			expect(local_record[0].quantity).toEqual("10");
			expect(res).toEqual("Wrong number of arguments: 0 instead of 1");
		});
		it("Should reset property bag client model using databaseClientReset(false) with flase as parameter", function(){
			var res = "";
			// Definition of user table with sync enabled.
			var Product = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			// local table without sync
			var localTable = function(model){
				model.fixed_schema = true;
				model.setModelProperty("itemName", "string", "");
				model.setModelProperty("quantity", "", "");
			};
			//Assigning record to the user table
			var prdObj = Rho.ORM.addModel("Product", Product);
			prdObj.createObject({"name":"Nadaf", "quantity":"10"});

			//Assigning record to the local table
			var loctab = Rho.ORM.addModel("localTable", localTable);
			loctab.createObject({"itemName":"biriyani", "quantity":"10"});
			try{
				Rho.ORM.databaseClientReset(false);
			} catch(err){
				res = err;
			}
			var user_record = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			var local_record = localDB.executeSql("SELECT * FROM localTable");
			console.log("User Record : " + JSON.stringify(user_record));
			console.log("Local Record : " + JSON.stringify(local_record));
			expect(user_record).toEqual([]);
			expect(local_record[0].itemName).toEqual("biriyani");
			expect(local_record[0].quantity).toEqual("10");
		});
		it("Should reset property bag client model and local model using databaseClientReset(true) with true as parameter", function(){
			
			// Definition of user table with sync enabled.
			var Product = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			// local table without sync
			var localTable = function(model){
				model.fixed_schema = true;
				model.setModelProperty("itemName", "string", "");
				model.setModelProperty("quantity", "", "");
			};
			//Assigning record to the user table
			var prdObj = Rho.ORM.addModel("Product", Product);
			prdObj.createObject({"name":"Nadaf", "quantity":"10"});

			//Assigning record to the local table
			var loctab = Rho.ORM.addModel("localTable", localTable);
			loctab.createObject({"itemName":"biriyani", "quantity":"10"});
			Rho.ORM.databaseClientReset(true);

			var user_record = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			var local_record = localDB.executeSql("SELECT * FROM localTable");
			console.log("user record : " + JSON.stringify(user_record));
			console.log("local record : " + JSON.stringify(local_record));
			expect(user_record).toEqual([]);
			expect(local_record).toEqual([]);
		});
		it("Should reset fixed_schema client model using databaseClientReset() without any parameter", function(){
			var res = "";
			// Definition of user table with sync enabled.
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			// local table without sync
			var localTable = function(model){
				model.fixed_schema = true;
				model.setModelProperty("itemName", "string", "");
				model.setModelProperty("quantity", "", "");
			};
			//Assigning record to the user table
			var prdObj = Rho.ORM.addModel("Product", Product);
			prdObj.createObject({"name":"Nadaf", "quantity":"10"});

			//Assigning record to the local table
			var loctab = Rho.ORM.addModel("localTable", localTable);
			loctab.createObject({"itemName":"biriyani", "quantity":"10"});
			try{
				Rho.ORM.databaseClientReset();
			} catch (err){
				res = err;
			}
			var user_record = userDB.executeSql("SELECT * FROM Product");
			var local_record = localDB.executeSql("SELECT * FROM localTable");
			console.log("User Record : " + JSON.stringify(user_record));
			console.log("Local Record : " + JSON.stringify(local_record));
			expect(user_record[0].name).toEqual("Nadaf");
			expect(user_record[0].quantity).toEqual("10");
			expect(local_record[0].itemName).toEqual("biriyani");
			expect(local_record[0].quantity).toEqual("10");
			expect(res).toEqual("Wrong number of arguments: 0 instead of 1")
		});
		it("Should reset Fixed_schema client model using databaseClientReset(false) with flase as parameter", function(){
			// Definition of user table with sync enabled.
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			// local table without sync
			var localTable = function(model){
				model.fixed_schema = true;
				model.setModelProperty("itemName", "string", "");
				model.setModelProperty("quantity", "", "");
			};
			//Assigning record to the user table
			var prdObj = Rho.ORM.addModel("Product", Product);
			prdObj.createObject({"name":"Nadaf", "quantity":"10"});

			//Assigning record to the local table
			var loctab = Rho.ORM.addModel("localTable", localTable);
			loctab.createObject({"itemName":"biriyani", "quantity":"10"});
			
			Rho.ORM.databaseClientReset(false);
			var user_record = userDB.executeSql("SELECT * FROM Product");
			var local_record = localDB.executeSql("SELECT * FROM localTable");
			console.log("User Record : " + JSON.stringify(user_record));
			console.log("Local Record : " + JSON.stringify(local_record));
			expect(user_record).toEqual([]);
			expect(local_record[0].itemName).toEqual("biriyani");
			expect(local_record[0].quantity).toEqual("10");
		});
		it("Should reset Fixed_schema client model and local model using databaseClientReset(true) with true as parameter", function(){
			// Definition of user table with sync enabled.
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			// local table without sync
			var localTable = function(model){
				model.fixed_schema = true;
				model.setModelProperty("itemName", "string", "");
				model.setModelProperty("quantity", "", "");
			};
			//Assigning record to the user table
			var prdObj = Rho.ORM.addModel("Product", Product);
			prdObj.createObject({"name":"Nadaf", "quantity":"10"});

			//Assigning record to the local table
			var loctab = Rho.ORM.addModel("localTable", localTable);
			loctab.createObject({"itemName":"biriyani", "quantity":"10"});

			Rho.ORM.databaseClientReset(true);
			var user_record = userDB.executeSql("SELECT * FROM Product");
			var local_record = localDB.executeSql("SELECT * FROM localTable");
			console.log("User Record : " + JSON.stringify(user_record));
			console.log("Local Record : " + JSON.stringify(local_record));
			expect(user_record).toEqual([]);
			expect(local_record).toEqual([]);
		});
	}
});
describe("databaseFullReset test set : ", function(){
	var fs_type = true;
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
	    	db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			console.log("isTable : Product : " + db2.isTableExist("Product"));
			console.log("isTable : Product2 : " + db2.isTableExist("Product2"));
			if(fs_type){
				if(db2.isTableExist("Product")){
					console.log("Found Product !");
					db2.executeSql("DROP TABLE Product");
				}
				if(db2.isTableExist("Product2")){
					console.log("Found Product2 !");
					db2.executeSql("DROP TABLE Product2");
				}
				if(db2.isTableExist("Product_local")){
					console.log("Found Product2 !");
					db2.executeSql("DROP TABLE Product_local");
				}
			}
	  	});
	 };
	var find_value_of_attrib = function(array_of_maps, att_name) {
		for (var i in array_of_maps) {
			if(array_of_maps[i].attrib == att_name) return array_of_maps[i].value;
		}
		return null;
	};
	var find_attrib_with_value = function(array_of_maps, name, value) {
		for (var i in array_of_maps) {
			if(array_of_maps[i].attrib == name && array_of_maps[i].value == value)
			return array_of_maps[i].value;
		}
	return null;
	};
	it("Property bag : databaseFullReset(true, false) should reset client info databaseFullReset tables",function(){
		fs_type = false;
		reset();
	    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
	    var client_id = userDB.executeSql("Select * from client_info");
	    expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model  = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
			};
			var model  = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		var objects = localDB.executeSql("select * from OBJECT_VALUES");
		var objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(find_value_of_attrib(objects, 'name')).toEqual('test');
		expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');
		Rho.ORM.databaseFullReset(true, false);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(client_id).toEqual([]);
		expect(objects_u).toEqual([]);
		expect(find_value_of_attrib(objects, 'name')).toEqual('test');
	});
	it("Fixed schema : databaseFullReset(true, false) should reset client info databaseFullReset tables",function(){
		fs_type = true;
		reset();
	    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
	    var client_id = userDB.executeSql("Select * from client_info");
	    expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model  = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
				model.enable("fixedSchema");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
				model.enable("fixedSchema");
			};
			var model  = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		var objects = localDB.executeSql("select * from Product");
		var objects_u = userDB.executeSql("select * from Product2");
		console.log("Product 1 : "+ JSON.stringify(objects));
		console.log("Product 2 : " + JSON.stringify(objects_u));
		expect(objects[0].name).toEqual('test');
		expect(objects_u[0].name).toEqual('test2');
		Rho.ORM.databaseFullReset(true, false);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from Product");
		objects_u = userDB.executeSql("select * from Product2");
		expect(client_id).toEqual([]);
		expect(objects_u).toEqual([]);
		expect(objects[0].name).toEqual('test');
	});

	//DatabaseFullReset(false, false)
	//Will reset client model but not reset client info table and local model tables.
	it("Property bag : DatabaseFullReset(false, false) should not reset client info and local tables",function(){
		fs_type = false;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model  = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
			};
			var model  = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		var objects = localDB.executeSql("select * from OBJECT_VALUES");
		var objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(find_value_of_attrib(objects, 'name')).toEqual('test');
		expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');
		Rho.ORM.databaseFullReset(false, false);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(client_id[0].client_id).toEqual("7");
		expect(objects_u).toEqual([]);
		expect(find_value_of_attrib(objects, 'name')).toEqual('test');
		expect(find_value_of_attrib(objects, 'brand')).toEqual('PUMA');
	});

	it("Fixed schema : DatabaseFullReset(false, false) should not reset client info and local tables",function(){
		fs_type = true;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model  = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
				model.enable("fixedSchema");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
				model.enable("fixedSchema");
			};
			var model  = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}

		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		var objects = localDB.executeSql("select * from Product");
		var objects_u = userDB.executeSql("select * from Product2");
		expect(objects[0].name).toEqual('test');
		expect(objects_u[0].name).toEqual('test2');
		Rho.ORM.databaseFullReset(false, false);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from Product");
		objects_u = userDB.executeSql("select * from Product2");
		expect(client_id[0].client_id).toEqual("7");
		expect(objects_u).toEqual([]);
		expect(objects[0].name).toEqual('test');
		expect(objects[0].brand).toEqual('PUMA');
	});

	it("should reset client info databaseFullReset tables of all partitions",function(){
		fs_type = true;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product_user_fixed = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
				model.enable("sync");
				model.fixed_schema = true;
			};
			var Item_user_pb = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
				model.enable("sync");
			};
			var Product_local_fixed = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
				model.fixed_schema = true;
			};
			var Item_local_pb = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var P_user_fixed = Rho.ORM.addModel("Product", Product_user_fixed);
			var I_user_pb = Rho.ORM.addModel("Item", Item_user_pb);
			var P_local_fixed = Rho.ORM.addModel("Product2", Product_local_fixed);
			var I_local_pb = Rho.ORM.addModel("Item_local", Item_local_pb);
		} else {
			var Product_user_fixed = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
				model.enable("sync");
				model.enable("fixedSchema");
			};
			var Item_user_pb = function(model){
				model.modelName("Item");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
				model.enable("sync");
			};
			var Product_local_fixed = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
				model.enable("fixedSchema");
			};
			var Item_local_pb = function(model){
				model.modelName("Item_local");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var P_user_fixed = Rho.ORM.addModel(Product_user_fixed);
			var I_user_pb = Rho.ORM.addModel(Item_user_pb);
			var P_local_fixed = Rho.ORM.addModel(Product_local_fixed);
			var I_local_pb = Rho.ORM.addModel(Item_local_pb);
		}
		P_user_fixed.create({'name':'user_fixed','price':2.0});
		I_user_pb.create({'name':'user_pb','price':2.0});
		P_local_fixed.create({'name':'local_fixed','price':2.0});
		I_local_pb.create({'name':'local_pb','price':2.0});
		var user_f = userDB.executeSql("Select * from Product");
		var user_p = userDB.executeSql("Select * from OBJECT_VALUES");
		expect(user_f[0].name).toEqual("user_fixed");
		expect(find_value_of_attrib(user_p, 'name')).toEqual("user_pb");
		var tables = localDB.executeSql("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
		var local_f = localDB.executeSql("select * from Product2");
		var local_p = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(local_f[0].name).toEqual("local_fixed");
		expect(find_value_of_attrib(local_p, 'name')).toEqual("local_pb");
		Rho.ORM.databaseFullReset(false,true);
		user_f = userDB.executeSql("Select * from Product");
		user_p = userDB.executeSql("Select * from OBJECT_VALUES");
		expect(user_f).toEqual([]);
		expect(user_p).toEqual([]);
		expect(userDB.isTableExist("Product")).toBe(true);
		local_f = localDB.executeSql("Select * from Product2");
		local_p = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(local_f).toEqual([]);
		expect(local_p).toEqual([]);
		expect(localDB.isTableExist("Product2")).toBe(true);
		expect(client_id[0].client_id).toEqual("7");
	});

	it("Property bag : DatabaseFullReset(true,true) should reset client info and local models ",function(){
		fs_type = false;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("brand", "string", "");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		var objects = localDB.executeSql("select * from OBJECT_VALUES");
		var objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(find_value_of_attrib(objects, 'name')).toEqual('test');
		expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');
		var client_id_1 = userDB.executeSql("Select * from client_info");
		console.log("Reset : clien_info : " + JSON.stringify(client_id_1));
		console.log("Reset : client_model : " + JSON.stringify(objects_u));
		Rho.ORM.databaseFullReset(true,true);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(client_id).toEqual([]);
		expect(objects_u).toEqual([]);
		expect(objects).toEqual([]);
	});	
	it("Fixed schema : DatabaseFullReset(true,true) should reset client info and local models ",function(){
		fs_type = true;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("brand", "string", "");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.enable("fixedSchema");
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		var objects = localDB.executeSql("select * from Product");
		var objects_u = userDB.executeSql("select * from Product2");
		expect(objects[0].name).toEqual('test');
		expect(objects_u[0].name).toEqual('test2');
		Rho.ORM.databaseFullReset(true,true);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from Product");
		objects_u = userDB.executeSql("select * from Product2");
		expect(client_id).toEqual([]);
		expect(objects_u).toEqual([]);
		expect(objects).toEqual([]);
	});
	it("Property bag : Should reset client info databaseFullReset tables",function(){
		fs_type = false;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("brand", "string", "");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		Rho.ORM.databaseFullReset(false,true);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(objects).toEqual([]);
		expect(objects_u).toEqual([]);
		expect(Rho.ORM.getClientId()).toEqual("7");
	});
	it("Fixed schema : Should reset client info databaseFullReset tables",function(){
		fs_type = true;
		reset();
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		var client_id = userDB.executeSql("Select * from client_info");
		expect(client_id[0].client_id).toEqual("7");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("brand", "string", "");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true
				model.setModelProperty("name","string","");
				model.setModelProperty("brand","string","");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.enable("fixedSchema");
				model.modelName("Product2");
				model.property("name","string");
				model.property("brand","string");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		model.create({"name":"test","brand":"PUMA"});
		model2.create({"name":"test2","brand":"PUMA2"});
		Rho.ORM.databaseFullReset(false,true);
		client_id = userDB.executeSql("Select * from client_info");
		objects = localDB.executeSql("select * from Product");
		objects_u = userDB.executeSql("select * from Product2");
		expect(objects).toEqual([]);
		expect(objects_u).toEqual([]);
		expect(Rho.ORM.getClientId()).toEqual("7");
	});

	it("should reset client info databaseFullReset tables with undefined params",function(){
		fs_type = false;
		reset();
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
		}
		var p = model1.create({'name':'test','price':2.0});
		var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product[0].value).toEqual("test");
		Rho.ORM.databaseFullReset(undefined,undefined);
		db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product).toEqual([]);
	});

	it("should reset client info databaseFullReset tables with no params",function(){
		fs_type = true;
		reset();
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema =true;
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
				model.enable("sync");
			};
			var Product2 = function(model){
				model.fixed_schema =true;
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
				model.enable("sync");
				model.enable("fixedSchema");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
				model.enable("fixedSchema");
			};
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.0});
		var db_product = userDB.executeSql("Select * from Product");
		expect(db_product[0].name).toEqual("test");
		Rho.ORM.databaseFullReset();
		db_product = userDB.executeSql("Select * from Product");
		expect(db_product).toEqual([]);
	});
});
describe("databaseLocalReset test set : ", function(){
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
	    	db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
	  	});
	 };
	 beforeEach(function(){
	 	reset();
	 });
	it("call databaseLocalReset without having any local model | Should not removed data from synced database",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		if (useNewOrm) {
			var Product = function(model){
				model.enable("sync");
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.fixed_schema = true;
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("sync");
				model.property("name","string");
				model.property("price","float");
				model.enable("fixedSchema");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel(Product);
		}
		model.create({"name":"test"});
		Rho.ORM.databaseLocalReset();
		var res = userDB.executeSql("SELECT * FROM Product Where name = 'test' ");
		var clientId = Rho.ORM.getClientId();
		expect(model).toBeDefined();
		expect(clientId).toEqual("7");
		expect(res[0].name).toEqual('test');
	});

	it("call databaseLocalReset with changes in local model | Should removed local model data",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var model = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var model = Rho.ORM.addModel(Product);
		}
		model.create({"name":"test"});
		var objects = localDB.executeSql("select * from OBJECT_VALUES");
		expect(objects[0].value).toEqual("test");
		Rho.ORM.databaseLocalReset();
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		var clientId = Rho.ORM.getClientId();
		expect(model).toBeDefined();
		expect(objects).toEqual([]);
		expect(clientId).toEqual("7");
	});

	it("call databaseLocalReset with changes in both local and user model | Should removed local model data",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product_u = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel("Product", Product);
			var model_u = Rho.ORM.addModel("Product_u", Product_u);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product_u = function(model){
				model.modelName("Product_u");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
			};
			var model = Rho.ORM.addModel(Product);
			var model_u = Rho.ORM.addModel(Product_u);
		}
		model.create({"name":"test"});
		model_u.create({"name":"test_u"});
		var objects = localDB.executeSql("select * from OBJECT_VALUES");
		var objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		expect(objects[0].value).toEqual("test");
		expect(objects_u[0].value).toEqual("test_u");
		Rho.ORM.databaseLocalReset()
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		objects_u = userDB.executeSql("select * from OBJECT_VALUES");
		var clientId = Rho.ORM.getClientId();
		expect(model).toBeDefined();
		expect(clientId).toEqual("7");
		expect(objects).toEqual([]);
		expect(objects_u[0].value).toEqual("test_u");
	});
});
describe("DatabaseFullResetEx test set : ", function(){
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
  	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
	    	db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
			if(db2.isTableExist("Product2")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product2");
			}
	  	});
	 };
	 beforeEach(function(){
	 	reset();
	 });

	it("should delete array of propertybag user models using databaseFullResetEx",function(){
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price", "float", "");
				model.set("partition", "user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name", "string");
				model.property("price", "float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.0});
		var p2 = model2.create({'name':'test2','price':3.0});
		var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		var db_product_local = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product[0].value).toEqual("test2");
		expect(db_product_local[0].value).toEqual("test");
		if (useNewOrm)
			var ary = ['Product','Product2'];
		else
			var ary = {"models":['Product','Product2']};
		Rho.ORM.databaseFullResetEx(ary, false, false);
		db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		db_product_local = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product).toEqual([]);
		expect(db_product_local[0].value).toEqual("test");
	});

	it("should delete array of propertybag local and user models using databaseFullResetEx",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(10)");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price", "float", "");
				model.set("partition", "user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name", "string");
				model.property("price", "float");
				model.set("partition","user");
				model.enable("sync");
			}
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.0});
		var p2 = model2.create({'name':'test2','price':3.0});
		var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		var db_product_local = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product[0].value).toEqual("test2");
		expect(db_product_local[0].value).toEqual("test");
		if (useNewOrm)
			var ary = ['Product','Product2'];
		else
			var ary = {"models":['Product','Product2']};
		Rho.ORM.databaseFullResetEx(ary, false, true);
		var clientId = Rho.ORM.getClientId();
		db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		db_product_local = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product).toEqual([]);
		expect(db_product_local).toEqual([]);
		expect(clientId).toEqual("10");
	});

	xit("should delete array of propertybag local, user models and client_info using databaseFullResetEx",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(10)");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price", "float", "");
				model.set("partition", "user");
				model.enable("sync");
			}
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.property("name", "string");
				model.property("price", "float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.0});
		var p2 = model2.create({'name':'test2','price':3.0});
		var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		var db_product_local = localDB.executeSql("Select * from OBJECT_VALUES");
		console.log("Client info : " + JSON.stringify(userDB.executeSql("select * from CLIENT_INFO")));
		expect(db_product[0].value).toEqual("test2");
		expect(db_product_local[0].value).toEqual("test");
		if (useNewOrm)
			var ary = ['Product','Product2'];
		else
			var ary = {"models":['Product','Product2']};
		Rho.ORM.databaseFullResetEx(ary, true, true);
		var client = userDB.executeSql("select * from CLIENT_INFO");
		db_product = userDB.executeSql("Select * from OBJECT_VALUES");
		db_product_local = localDB.executeSql("Select * from OBJECT_VALUES");
		expect(db_product).toEqual([]);
		expect(db_product_local).toEqual([]);
		expect(client).toEqual([]);
	});
	it("should delete array of Fixed schema user models using databaseFullResetEx",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(10)");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price", "float", "");
				model.set("partition", "user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.enable("fixedSchema");
				model.property("name", "string");
				model.property("price", "float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.2});
		var p2 = model2.create({'name':'test2','price':3.0});
		var db_product = userDB.executeSql("Select * from Product2");
		var db_product_local = localDB.executeSql("Select * from Product");
		expect(db_product[0].name).toEqual("test2");
		expect(db_product_local[0].name).toEqual("test");
		if (useNewOrm)
			var ary = ['Product','Product2'];
		else
			var ary = {"models":['Product','Product2']};
		Rho.ORM.databaseFullResetEx(ary, false, false);
		var clientId = Rho.ORM.getClientId();
		db_product = userDB.executeSql("Select * from Product2");
		db_product_local = localDB.executeSql("Select * from Product");
		expect(db_product).toEqual([]);
		expect(db_product_local[0].name).toEqual("test");
		expect(db_product_local[0].price).toEqual('2.200000'); // float value gets returned as string.
		expect(clientId).toEqual("10");
	});
	it("should delete array of Fixed schema local models using databaseFullResetEx",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(10)");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price", "float", "");
				model.set("partition", "user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.enable("fixedSchema");
				model.property("name", "string");
				model.property("price", "float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.2});
		var p2 = model2.create({'name':'test2','price':3.0});
		var db_product = userDB.executeSql("Select * from Product2");
		var db_product_local = localDB.executeSql("Select * from Product");
		expect(db_product[0].name).toEqual("test2");
		expect(db_product_local[0].name).toEqual("test");
		if (useNewOrm)
			var ary = ['Product','Product2'];
		else
			var ary = {"models":['Product','Product2']};
		Rho.ORM.databaseFullResetEx(ary, false, true);
		var clientId = Rho.ORM.getClientId();
		db_product = userDB.executeSql("Select * from Product2");
		db_product_local = localDB.executeSql("Select * from Product");
		expect(db_product).toEqual([]);
		expect(db_product_local).toEqual([]);
		expect(db_product_local).toEqual([]);
		expect(clientId).toEqual("10");
	});
	xit("should delete array of Fixed schema local models, client models and client_info using databaseFullResetEx",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(10)");
		if (useNewOrm) {
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("price", "float", "");
				model.set("partition", "user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
			var model2 = Rho.ORM.addModel("Product2", Product2);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var Product2 = function(model){
				model.modelName("Product2");
				model.enable("fixedSchema");
				model.property("name", "string");
				model.property("price", "float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
			var model2 = Rho.ORM.addModel(Product2);
		}
		var p = model1.create({'name':'test','price':2.2});
		var p2 = model2.create({'name':'test2','price':3.0});
		var db_product = userDB.executeSql("Select * from Product2");
		var db_product_local = localDB.executeSql("Select * from Product");
		expect(db_product[0].name).toEqual("test2");
		expect(db_product_local[0].name).toEqual("test");
		if (useNewOrm)
			var ary = ['Product','Product2'];
		else
			var ary = {"models":['Product','Product2']};
		Rho.ORM.databaseFullResetEx(ary, true, true);
		var clientId = userDB.executeSql("Select * from CLIENT_INFO");
		db_product = userDB.executeSql("Select * from Product2");
		db_product_local = localDB.executeSql("Select * from Product");
		expect(db_product).toEqual([]);
		expect(db_product_local).toEqual([]);
		expect(db_product_local).toEqual([]);
		expect(clientId).toEqual([]);
	});
});
describe("databaseFullResetAndLogout test set : ", function(){
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
  	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
	    	db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
	  	});
	 };

	it("should reset object_values and not sources table if set databaseFullResetAndLogout",function(){
		reset();
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","user");
				model.enable("sync");
			};
			var model1 = Rho.ORM.addModel(Product);
		}
		var p = model1.create({'name':'test','price':2.0});
		var sources_db = userDB.executeSql("select * from sources");
		var objects    = userDB.executeSql("select * from object_values");
		console.log("sources : " + JSON.stringify(sources_db));
		expect(sources_db[0].name).toEqual("Product");
		expect(objects[0].value).toEqual("test");
		Rho.ORM.databaseFullResetAndLogout();
		sources_db = userDB.executeSql("Select * from sources");
		objects    = userDB.executeSql("select * from object_values");
		expect(sources_db[0].name).toEqual("Product");
		expect(objects).toEqual([]);
	});
});
describe("databaseFullclientResetAndLogout test set : ", function(){
	var localDB = Rho.ORMHelper.dbConnection('local');
  	var userDB  = Rho.ORMHelper.dbConnection('user');
  	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
	    	db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
	  	});
	 };
	 var find_attrib_with_value = function(array_of_maps, name, value) {
		for (var i in array_of_maps) {
			if(array_of_maps[i].attrib == name && array_of_maps[i].value == value)
			return array_of_maps[i].value;
		}
	return null;
	};

	it("should reset client and local db if databaseFullclientResetAndLogout",function(){
		userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
		if (useNewOrm) {
			var Product = function(model){
				model.setModelProperty("name","string","");
				model.setModelProperty("price","float","");
				model.set("partition","local");
			};
			var model1 = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model){
				model.modelName("Product");
				model.property("name","string");
				model.property("price","float");
				model.set("partition","local");
			};
			var model1 = Rho.ORM.addModel(Product);
		}
		var p = model1.create({'name':'test','price':2.0});
		var objects = localDB.executeSql("select * from OBJECT_VALUES");
		var client_info = userDB.executeSql("select * from client_info");
		expect(find_attrib_with_value(objects,'name','test')).toEqual("test");
		expect(client_info[0].client_id).toEqual("7");
		Rho.ORM.databaseFullclientResetAndLogout();
		objects = localDB.executeSql("select * from OBJECT_VALUES");
		client_info = userDB.executeSql("select * from client_info");
		expect(objects).toEqual([]);
		expect(client_info).toEqual([]);
	});
});
describe("generate ID test set : ", function(){
	if(useNewOrm){
		it("Should generate Unique id using the generateId() method", function(){
			console.log("GenerateId : " + Rho.ORM.generateId());
			expect(typeof(Rho.ORM.generateId())).toEqual('number');
		});
	}
});
describe("Get clientID() test set : ", function(){
	it("Should return client id",function(){
		runs(function(){
			var db = Rho.ORMHelper.dbConnection("user");
			db.executeSql("DELETE FROM CLIENT_INFO");
			var client_id = Rho.ORM.getClientId();
			if(useNewOrm)
				expect(client_id).toEqual(null); // TBD: New ORM returns null
			else
				expect(client_id).toEqual([]);
			db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
			client_id = Rho.ORM.getClientId();
			expect(client_id).toEqual("7");
		});
	});
});
describe("haveLocalChanges test set : ", function(){
	var userDB = Rho.ORMHelper.dbConnection('user');
	var localDB = Rho.ORMHelper.dbConnection('local');
	var reset = function() {
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
	    	db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				console.log("Found Product !");
				db2.executeSql("DROP TABLE Product");
			}
	  	});
	 };
	 beforeEach(function(){
	 	reset();
	 });
	it("Call haveLocalChanges without having any model",function(){
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});

	it("should return true if a model objects have local changes for sync haveLocalChanges",function(){
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		userDB.executeSql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	it("should return true after adding object to the model - Property bag", function(){
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("have Changes before : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		console.log("have Changes after : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
	});
	it("should return false even after adding object to the local model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		localDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("PBLocal1 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("PBLocal1 : CHANGED_VALUES " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("PBLocal1 : haveLocalChanges : after create : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	it("Should return true after deleting object from the model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
			var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("Result with no records : " + JSON.stringify(res0));
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
			var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("Result created one record : " + JSON.stringify(res1));
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
			var res2 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("Result after CHANGED_VALUES delete : " + JSON.stringify(res2));
			console.log("have Changes before1 : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
			var resObj = userDB.executeSql('SELECT * FROM OBJECT_VALUES');
			var objId = resObj[0].object;
		prdObj.deleteObject(objId);
			var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("delete");
			console.log("have Changes after : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
	});
	it("Should return false even after deleting object from the local model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
			var res0 = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PBLocal2 : CHANGED_VALUES : " + JSON.stringify(res0));
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
			var res1 = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PBLocal2 : CHANGED_VALUES : after + one record : " + JSON.stringify(res1));
		localDB.executeSql("DELETE FROM CHANGED_VALUES");
			var res2 = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PBLocal2 : DELETE - CHANGED_VALUES : " + JSON.stringify(res2));
			console.log("PBLocal2 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
			var resObj = localDB.executeSql('SELECT * FROM OBJECT_VALUES');
			var objId = resObj[0].object;
		prdObj.deleteObject(objId);
			var res = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PBLocal2 : CHANGED_VALUES : " + JSON.stringify(res));
		expect(res).toEqual([]);
			console.log("PBLocal2 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	it("Should return true after adding and deleting objects from the model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
			var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PB3 : Result with no records : " + JSON.stringify(res0));
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		prdObj.createObject({"name":"Woodlands2", "quantity":"30"});
			var resultObj = userDB.executeSql('SELECT * FROM OBJECT_VALUES');
			console.log("PB3 : OBJECT_VALUES : " + JSON.stringify(resultObj));
			var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PB3 : CHANGED_VALUES : " + JSON.stringify(res1));
			console.log("PB3 : haveLocalChanges(BOOL) : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
		var objId = resultObj[0].object;
		var objId2 = resultObj[2].object;
		prdObj.deleteObject(objId);
			var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
			console.log("PB3 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		expect(res[0].object).toEqual(objId2);
			console.log("PB3 : haveLocalChanges : after object delete : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
	});
	it("Should return true after adding and deleting same object from the model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("PB4 : Result with no records : " + JSON.stringify(res0));
			prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var resultObj = userDB.executeSql('SELECT * FROM OBJECT_VALUES');
		console.log("PB4 : OBJECT_VALUES : " + JSON.stringify(resultObj));
		var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("PB4 : CHANGED_VALUES : " + JSON.stringify(res1));
		console.log("PB4 : haveLocalChanges(BOOL) : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
		var objId = resultObj[0].object;
			prdObj.deleteObject(objId);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("PB4 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("PB4 : haveLocalChanges : after object delete : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	it("should return true after adding object to the model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("have Changes before : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		console.log("have Changes after : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
	});
	it("should return false even after adding object to the local model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		localDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("FSLocal1 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal1 : CHANGED_VALUES " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FSLocal1 : haveLocalChanges : after create : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	it("should return false even after adding object to the app model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		appDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("FSLocal1 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal1 : CHANGED_VALUES " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FSLocal1 : haveLocalChanges : after create : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	
	it("Should return true after deleting object from the model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result with no records : " + JSON.stringify(res0));
			prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result created one record : " + JSON.stringify(res1));
			userDB.executeSql("DELETE FROM CHANGED_VALUES");
		var res2 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result after CHANGED_VALUES delete : " + JSON.stringify(res2));

		console.log("have Changes before1 : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);

		var resObj = userDB.executeSql('SELECT * FROM Product');
		var objId = resObj[0].object;
			prdObj.deleteObject(objId);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("delete");
		console.log("have Changes after : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
	});
	it("Should return false even after deleting object from the local model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
				model.fixed_schema = true;
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal2 : CHANGED_VALUES : " + JSON.stringify(res0));
			prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var res1 = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal2 : CHANGED_VALUES : after + one record : " + JSON.stringify(res1));
			localDB.executeSql("DELETE FROM CHANGED_VALUES");
		var res2 = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal2 : DELETE - CHANGED_VALUES : " + JSON.stringify(res2));
		console.log("FSLocal2 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		var resObj = localDB.executeSql('SELECT * FROM Product');
		var objId = resObj[0].object;
			prdObj.deleteObject(objId);
		var res = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal2 : CHANGED_VALUES : " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FSLocal2 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	it("Should return false even after deleting object from the app model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
				model.fixed_schema = true;
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSapp2 : CHANGED_VALUES : " + JSON.stringify(res0));
			prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var res1 = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSapp2 : CHANGED_VALUES : after + one record : " + JSON.stringify(res1));
			appDB.executeSql("DELETE FROM CHANGED_VALUES");
		var res2 = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSapp2 : DELETE - CHANGED_VALUES : " + JSON.stringify(res2));
		console.log("FSapp2 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
		var resObj = appDB.executeSql('SELECT * FROM Product');
		var objId = resObj[0].object;
			prdObj.deleteObject(objId);
		var res = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSapp2 : CHANGED_VALUES : " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FSapp2 : haveLocalChanges : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
	
	it("Should return true after adding and deleting objects from the model - Fixed schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS3 : Result with no records : " + JSON.stringify(res0));
			prdObj.createObject({"name":"Woodlands", "quantity":"20"});
			prdObj.createObject({"name":"Woodlands2", "quantity":"30"});
		var resultObj = userDB.executeSql('SELECT * FROM Product');
		console.log("FS3 : OBJECT_VALUES : " + JSON.stringify(resultObj));
		var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS3 : CHANGED_VALUES : " + JSON.stringify(res1));
		console.log("FS3 : haveLocalChanges(BOOL) : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
		var objId = resultObj[0].object;
		var objId2 = resultObj[1].object;
			prdObj.deleteObject(objId);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS3 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		expect(res[0].object).toEqual(objId2);
		console.log("FS3 : haveLocalChanges : after object delete : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
	});
	it("Should return false after adding and deleting same object from the model - Fixed schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS4 : Result with no records : " + JSON.stringify(res0));
			prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var resultObj = userDB.executeSql('SELECT * FROM Product');
		console.log("FS4 : OBJECT_VALUES : " + JSON.stringify(resultObj));
		var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS4 : CHANGED_VALUES : " + JSON.stringify(res1));
		console.log("FS4 : haveLocalChanges(BOOL) : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(true);
		var objId = resultObj[0].object;
			prdObj.deleteObject(objId);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS4 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FS4 : haveLocalChanges : after object delete : " + Rho.ORM.haveLocalChanges());
		expect(Rho.ORM.haveLocalChanges()).toEqual(false);
	});
});
describe("anyChangedObjects test set : ", function(){
	var userDB = Rho.ORMHelper.dbConnection('user');
	var localDB = Rho.ORMHelper.dbConnection('local');
	var appDB = Rho.ORMHelper.dbConnection('app');
	var reset = function(){
		var partitions = Rho.ORM.getDbPartitions();
		$.each(partitions, function(index, db2){
			db2.executeSql("DELETE FROM CLIENT_INFO");
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product")){
				db2.executeSql("DROP TABLE Product");
				console.log("Product table found ! ");
			}
		})
	}
	beforeEach(function(){
		reset();
	});
	it("Call anyChangedObjects without modifying newly added model",function(){
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});

	it("should return true after adding object to the model - Property bag", function(){
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("have Changes before : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
	});
	it("should return false after adding object to the local model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("PBLocal1 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);

	});
	it("should return false after adding object to the app model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("PBLocal1 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});

	it("Should return true after deleting object from the model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("OBJDATA : " + JSON.stringify(objData));
		var res1 = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result created one record : " + JSON.stringify(res1));
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		var res2 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result after CHANGED_VALUES delete : " + JSON.stringify(res2));
		console.log("anyChanges before1 : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		var objId = objData.object;
		prdObj.deleteObject(objId);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("delete");
		console.log("any Changes after : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
	});
	it("Should return false even after deleting object from the local model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		localDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("PBLocal2 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		var objId = objData.object;
		prdObj.deleteObject(objId);
		console.log("PBLocal2 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	it("Should return false even after deleting object from the app model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		appDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("PBLocal2 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		var objId = objData.object;
		prdObj.deleteObject(objId);
		console.log("PBLocal2 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	
	it("Should return true after adding and deleting objects from the model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("PB3 : Result with no records : " + JSON.stringify(res0));
		var objData1 = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var objData = prdObj.createObject({"name":"Woodlands2", "quantity":"30"});
		console.log("PB3 : anyChangedObjects() : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
		prdObj.deleteObject(objData.object);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("PB3 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		expect(res[0].object).toEqual(objData1.object);
		console.log("PB3 : anyChangedObjects : after object delete : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
	});
	it("Should return false after adding and deleting same object from the model - Property bag", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("PB4 : anyChangedObjects() : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
		prdObj.deleteObject(objData.object);
		console.log("PB4 : anyChangedObjects : after object delete : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	it("should return true after adding object to the model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("have Changes before : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		console.log("have Changes after : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
	});
	it("should return false even after adding object to the local model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		localDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("FSLocal1 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = localDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal1 : CHANGED_VALUES " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FSLocal1 : anyChangedObjects : after create : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	it("should return false even after adding object to the app model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		appDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("FSLocal1 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		prdObj.createObject({"name":"Woodlands", "quantity":"30"});
		var res = appDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FSLocal1 : CHANGED_VALUES " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FSLocal1 : anyChangedObjects : after create : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	
	it("Should return true after deleting object from the model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var res0 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result with no records : " + JSON.stringify(res0));
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		console.log("have Changes before1 : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
		prdObj.deleteObject(objData.object);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Result : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("delete");
		console.log("have Changes after : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
	});
	it("Should return false even after deleting object from the local model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
				model.fixed_schema = true;
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		localDB.executeSql("DELETE FROM CHANGED_VALUES");
		expect(prdObj.anyChangedObjects()).toEqual(false);
		prdObj.deleteObject(objData.object);
		console.log("FSLocal2 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	it("Should return false even after deleting object from the app model - Fixed Schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
				model.fixed_schema = true;
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
				model.enable("fixedSchema");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		appDB.executeSql("DELETE FROM CHANGED_VALUES");
		expect(prdObj.anyChangedObjects()).toEqual(false);
		prdObj.deleteObject(objData.object);
		console.log("FSLocal2 : anyChangedObjects : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	
	it("Should return true after adding and deleting objects from the model - Fixed schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var objData = prdObj.createObject({"name":"Woodlands2", "quantity":"30"});
		console.log("FS3 : anyChangedObjects(BOOL) : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
		prdObj.deleteObject(objData.object);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS3 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res[0].update_type).toEqual("create");
		expect(res[0].object).toEqual(objData1.object);
		console.log("FS3 : anyChangedObjects : after object delete : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
	});
	it("Should return flase after adding and deleting same object from the model - Fixed schema", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		var res1 = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS4 : CHANGED_VALUES : " + JSON.stringify(res1));
		console.log("FS4 : anyChangedObjects(BOOL) : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(true);
		prdObj.deleteObject(objData.object);
		var res = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("FS4 : CHANGED_VALUES : after object delete : " + JSON.stringify(res));
		expect(res).toEqual([]);
		console.log("FS4 : anyChangedObjects : after object delete : " + prdObj.anyChangedObjects());
		expect(prdObj.anyChangedObjects()).toEqual(false);
	});
	it("canModify method should return true for user fixed schema model when RC is not in sync", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}

		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("CanModify : " + prdObj.canModify(objData.object));
		expect(prdObj.canModify(objData.object)).toEqual(true);
	});
	it("canModify method should return true for local fixed schema models ", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
				
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("CanModify : " + prdObj.canModify(objData.object));
		expect(prdObj.canModify(objData.object)).toEqual(true);
	});it("canModify method should return true for app fixed schema models ", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
				
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("CanModify : " + prdObj.canModify(objData.object));
		expect(prdObj.canModify(objData.object)).toEqual(true);
	});
	it("canModify method should return true for user property bag model when RC is not in sync", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("CanModify : " + prdObj.canModify(objData.object));
		expect(prdObj.canModify(objData.object)).toEqual(true);
	});
	it("canModify method should return true for local property bag models ", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "local");
				
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "local");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("CanModify : " + prdObj.canModify(objData.object));
		expect(prdObj.canModify(objData.object)).toEqual(true);
	});
	it("canModify method should return true for app property bag models ", function(){
		reset();
		if(useNewOrm){
			var Product = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.set("partition", "app");
				
			};
			var prdObj = Rho.ORM.addModel("Product", Product);

		} else{
			var Product = function(model){
				model.modelName("Product");
				model.property("name", "string");
				model.property("quantity", "string");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"Woodlands", "quantity":"20"});
		console.log("CanModify : " + prdObj.canModify(objData.object));
		expect(prdObj.canModify(objData.object)).toEqual(true);
	});
});
describe("CreateInstance test set : ", function(){
	var userDB = Rho.ORMHelper.dbConnection('user');
	var localDB = Rho.ORMHelper.dbConnection('local');
	var appDB = Rho.ORMHelper.dbConnection('app');
	afterEach(function(){
		if(localDB.isTableExist('Product'))
			userDB.executeSql("DELETE FROM Product");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		if(localDB.isTableExist('Product'))
			localDB.executeSql("DELETE FROM Product");
		localDB.executeSql("DELETE FROM OBJECT_VALUES");
		if(appDB.isTableExist('Product'))
			appDB.executeSql("DELETE FROM Product");
		appDB.executeSql("DELETE FROM OBJECT_VALUES");
	});
	it("Should createInstance for the user object  with Fixed Schema", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.enable("sync");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"arun", "age":20, "male":true});
		var objData = prdObj.createInstance({"name":"Smith", "age":"25", "male":true});
		//prdObj.saveObject(objData.object, objData); by using saveObject method will save into db.
		console.log("objData : " + JSON.stringify(objData));
		console.log("objData : " + JSON.stringify(objData1));
		var res = userDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createInstance for the user object  with Property bag", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.enable("sync");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"arun", "age":20, "male":true});
		var objData = prdObj.createInstance({"name":"Smith", "age":"25", "male":true});
		//prdObj.saveObject(objData.object, objData); by using saveObject method will save into db.
		console.log("objData : " + JSON.stringify(objData));
		console.log("objData : " + JSON.stringify(objData1));
		var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createInstance for the local object  with Fixed Schema", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition","local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition","local");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"arun", "age":20, "male":true});
		var objData = prdObj.createInstance({"name":"Smith", "age":"25", "male":true});
		//prdObj.saveObject(objData.object, objData); by using saveObject method will save into db.
		console.log("objData : " + JSON.stringify(objData));
		console.log("objData : " + JSON.stringify(objData1));
		var res = localDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createInstance for the local object  with Property bag", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "local")
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition", "local")
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"arun", "age":20, "male":true});
		var objData = prdObj.createInstance({"name":"Smith", "age":"25", "male":true});
		//prdObj.saveObject(objData.object, objData); by using saveObject method will save into db.
		console.log("objData : " + JSON.stringify(objData));
		console.log("objData : " + JSON.stringify(objData1));
		var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createInstance for the app object  with Fixed Schema", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition","app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition","app");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"arun", "age":20, "male":true});
		var objData = prdObj.createInstance({"name":"Smith", "age":"25", "male":true});
		//prdObj.saveObject(objData.object, objData); by using saveObject method will save into db.
		console.log("objData : " + JSON.stringify(objData));
		console.log("objData : " + JSON.stringify(objData1));
		var res = appDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createInstance for the app object  with Property bag", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition", "app")
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData1 = prdObj.createObject({"name":"arun", "age":20, "male":true});
		var objData = prdObj.createInstance({"name":"Smith", "age":"25", "male":true});
		//prdObj.saveObject(objData.object, objData); by using saveObject method will save into db.
		console.log("objData : " + JSON.stringify(objData));
		console.log("objData : " + JSON.stringify(objData1));
		var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
});
describe("createObject test set : ", function(){
	var userDB = Rho.ORMHelper.dbConnection('user');
	var localDB = Rho.ORMHelper.dbConnection('local');
	var appDB = Rho.ORMHelper.dbConnection('app');
	afterEach(function(){
		if(localDB.isTableExist('Product'))
			userDB.executeSql("DELETE FROM Product");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		if(localDB.isTableExist('Product'))
			localDB.executeSql("DELETE FROM Product");
		localDB.executeSql("DELETE FROM OBJECT_VALUES");
		if(appDB.isTableExist('Product'))
			appDB.executeSql("DELETE FROM Product");
		appDB.executeSql("DELETE FROM OBJECT_VALUES");
	});
	it("Should createObject for the user object  with Fixed Schema", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.enable("sync");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = userDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createObject for the user object  with Property bag", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.enable("sync");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.enable("sync");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createObject for the local object  with Fixed Schema", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition","local");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition","local");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = localDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createObject for the local object  with Property bag", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "local")
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition", "local")
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createObject for the app object  with Fixed Schema", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition","app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition","app");	
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = appDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should createObject for the local object  with Property bag", function(){
		if(useNewOrm) {
			var Product = function(model) {
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.property("name","string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition", "app")
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
});

describe("deleteObject test set : ", function(){
	userDB = Rho.ORMHelper.dbConnection("user");
	localDB = Rho.ORMHelper.dbConnection("local");
	appDB = Rho.ORMHelper.dbConnection("app");
	afterEach(function(){
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		if(userDB.isTableExist("Product")){
			console.log("Product found!!!");
			userDB.executeSql("DELETE FROM Product");
		}
		if(localDB.isTableExist("Product")){
			localDB.executeSql("DELETE FROM Product");
		}
		if(appDB.isTableExist("Product")){
			appDB.executeSql("DELETE FROM Product");
		}
	})
	it("Should delete existing object successfully with fixed schema.", function(){
		if(useNewOrm){
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.modelName("Product");
				model.enable("fixedSchema");
				model.setProperty("name", "string");
				model.setProperty("age","integer");
				model.setProperty("male","boolean");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		prdObj.deleteObject(objData['object']);
		expect(prdObj.getCount()).toEqual(0);
	});
	it("Should throw exception when null or invalid parameter is passed to the method with fixed schema.", function(){
		var errors = "";
		if(useNewOrm){
			var Product = function(model) {
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		} else {
			var Product = function(model) {
				model.enable("fixedSchema");
				model.modelName("Product");
				model.property("name", "string", "");
				model.property("age","integer", "");
				model.property("male","boolean", "");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		try{
			prdObj.deleteObject();
		} catch(err) {
			errors = err;
		}
		expect(prdObj.getCount()).toEqual(1);
		expect(errors).toEqual("Wrong number of arguments: 0 instead of 1");
		try{
			prdObj.deleteObject("some_value");
		} catch(err) {
			errors = err;
		}
		expect(prdObj.getCount()).toEqual(1);
		expect(errors).toEqual("Wrong number of arguments: 0 instead of 1");
	});
	it("Should delete existing object successfully with property bag.", function(){
		if(useNewOrm){
			var Product = function(model) {
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		}else{
			var Product = function(model) {
				model.enable("fixedSchema");
				model.property("name", "string");
				model.property("age","integer");
				model.property("male","boolean");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel(Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		prdObj.deleteObject(objData['object']);
		expect(prdObj.getCount()).toEqual(0);
	});
	it("Should throw exception when null or invalid parameter is passed to the method with property bag.", function(){
		var errors = "";
		if(useNewOrm){
			var Product = function(model) {
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age","integer", "");
				model.setModelProperty("male","boolean", "");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		}else{
			var Product = function(model) {
				model.enable("fixedSchema");
				model.modelName("Product")
				model.property("name", "string", "");
				model.property("age","integer", "");
				model.property("male","boolean", "");
				model.set("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("Product", Product);
		}
		var objData = prdObj.createObject({"name":"arun", "age":20, "male":true});
		try{
			prdObj.deleteObject();
		} catch(err) {
			errors = err;
		}
		expect(prdObj.getCount()).toEqual(1);
		expect(errors).toEqual("Wrong number of arguments: 0 instead of 1");
		try{
			prdObj.deleteObject("some_value");
		} catch(err) {
			errors = err;
		}
		expect(prdObj.getCount()).toEqual(1);
		expect(errors).toEqual("Wrong number of arguments: 0 instead of 1");
	});
});

describe("find_by_sql test set : ", function(){
	userDB = Rho.ORMHelper.dbConnection("user");
	localDB = Rho.ORMHelper.dbConnection("local");
	appDB = Rho.ORMHelper.dbConnection("app");

	afterEach(function(){
		if(userDB.isTableExist('Student'))
			userDB.executeSql("DELETE FROM Student");
		if(localDB.isTableExist('Student'))
			localDB.executeSql("DELETE FROM Student");
		if(appDB.isTableExist('Student'))
			appDB.executeSql("DELETE FROM Student");
	});
	it("Should find_by_sql for the user fixed schema model", function(){
		userDB.executeSql("DELETE FROM Student");
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student");
		expect(res.length).toEqual(3);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should find_by_sql for the local fixed schema model", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student");
		expect(res.length).toEqual(3);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should find_by_sql for the app fixed schema model", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student");
		expect(res.length).toEqual(3);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should find_by_sql with 'WHERE' clause for the user fixed schema model", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student WHERE department = 'Electronics'");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should find_by_sql with 'WHERE' clause for the local fixed schema model", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student WHERE department = 'Electronics'");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should find_by_sql with 'WHERE' clause for the app fixed schema model", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student WHERE department = 'Electronics'");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return null when find_by_sql with 'WHERE' clause for the user fixed schema model does not return anything", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student WHERE department = 'Mechanical'");
		expect(res).toEqual([]);
		expect(res.length).toEqual(0);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return null when find_by_sql with 'WHERE' clause for the local fixed schema model does not return anything", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student WHERE department = 'Mechanical'");
		expect(res).toEqual([]);
		expect(res.length).toEqual(0);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return null when find_by_sql with 'WHERE' clause for the app fixed schema model does not returns anyting.", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT * FROM Student WHERE department = 'Mechanical'");
		expect(res).toEqual([]);
		expect(res.length).toEqual(0);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return single property data when find_by_sql with SELECT statement for the user fixed", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "user");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT name FROM Student WHERE department = 'Electronics'");
		expect(res).toEqual([{"name":"Arun"},{"name":"Nadaf"}]);
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return single property data when find_by_sql with 'SELECT' statement for the local fixed", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "local");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT age FROM Student WHERE department = 'Electronics'");
		expect(res).toEqual([{"age":"29"},{"age":"29"}]);
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return single property data when find_by_sql with 'SELECT' statement for the app fixed schema", function(){
		if(useNewOrm){
			var Student = function(model){
				model.fixed_schema = true;
				model.setModelProperty("id", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "integer", "");
				model.setModelProperty("percentage", "integer", "")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel("Student", Student);
		} else {
			var Student = function(model){
				model.enable("fixedSchema");
				model.modelName("Student");
				model.property("id", "string");
				model.property("department", "string");
				model.property("name", "string");
				model.property("age", "integer");
				model.property("percentage", "integer")
				model.set("partition", "app");
			}
			var stObj = Rho.ORM.addModel(Student);
		}
		var objData1 = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var objData2 = stObj.createObject({
			"id":"002",
			"department":"Electronics",
			"name":"Nadaf",
			"age":29,
			"percentage":95
		});
		var objData3 = stObj.createObject({
			"id":"003",
			"department":"Computer",
			"name":"Vinod",
			"age":29,
			"percentage":35
		});
		var stgObj = Rho.ORM.getModel('Student');
		var res = stgObj.find_by_sql("SELECT percentage FROM Student WHERE name = 'Arun'");
		expect(res[0].percentage).toEqual("95");
		expect(res.length).toEqual(1);
		console.log("res : " + JSON.stringify(res));
	});
});
describe("getAllProperties test set : ", function(){
	it("Should get all properties and values of the user model with Fixed Schema.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("");
			expect(result.schema_version).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("none");
		});
	});
	it("Should get all properties and values of the sync enabled user model with Fixed schema.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
			model.enable("sync");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("");
			expect(result.schema_version).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("Should get all properties and values of the sync enabled(bulk_only) user model with Fixed schema.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
			model.enable("sync");
			model.set("sync_type", "bulk_only");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("");
			expect(result.schema_version).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("bulk_only");
		});
	});
	it("Should get all properties and values of the local model with Fixed Schema.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "local");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("local");
			expect(result.pass_through).toEqual("");
			expect(result.schema_version).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("none");
		});
	});
	it("Should get all properties and values of the app model with Fixed Schema.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "app");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("app");
			expect(result.pass_through).toEqual("");
			expect(result.schema_version).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("none");
		});
	});

	it("Should get all properties and values of the user model with Property Bag.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("false");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("");
			
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("none");
		});
	});
	it("Should get all properties and values of the sync enabled user model with Property bag.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
			model.enable("sync");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("false");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("Should get all properties and values of the sync enabled(bulk_only) user model with Property bag.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
			model.enable("sync");
			model.set("sync_type", "bulk_only");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("false");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("bulk_only");
		});
	});
	it("Should get all properties and values of the local model with Property Bag.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "local");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("false");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("local");
			expect(result.pass_through).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("none");
		});
	});
	it("Should get all properties and values of the app model with Property bag.", function(){ 
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "app");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		stObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("false");
			expect(result.full_update).toEqual("");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Student");
			expect(result.partition).toEqual("app");
			expect(result.pass_through).toEqual("");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("none");
		});
	});
});
describe("getBackendRefreshTime test set : ", function(){
	it("Should get the default value of time stamp for a non synced sync model with fixed schema.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
			model.enable("sync");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
	it("Should get the default value of time stamp for a non sync model with fixed schema.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
	it("Should get the default value of time stamp for a local model with fixed schema.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "local");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
	it("Should get the default value of time stamp for a app model with fixed schema.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = true;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "app");
		}
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});


	it("Should get the default value of time stamp for a non synced sync model with property bag.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
			model.enable("sync");
		};
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
	it("Should get the default value of time stamp for a non sync model with property bag.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "user");
		};
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
	it("Should get the default value of time stamp for a local model with property bag.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "local");
		};
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
	it("Should get the default value of time stamp for a app model with property bag.", function(){
		var result = {};
		var cbTriggered = false;
		var Student = function(model){
			model.fixed_schema = false;
			model.setModelProperty("id", "string", "");
			model.setModelProperty("department", "string", "");
			model.setModelProperty("name", "string", "");
			model.setModelProperty("age", "integer", "");
			model.setModelProperty("percentage", "integer", "")
			model.set("partition", "app");
		};
		var stObj = Rho.ORM.addModel("Student", Student);
		var objData = stObj.createObject({"id":"001", "department":"Electronics", "name":"Arun", "age":29, "percentage":95});
		console.log("Refresh time : " + stObj.getBackendRefreshTime());
		var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
		expect(date).toContain(stObj.getBackendRefreshTime());
	});
});
describe("getBelongsTo test set : ", function(){
	it("Should get the associated or belongs to user model fixed schema", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
			model.set("partition", "user");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
			model.setBelongsTo("itemName", "Product"); // new ORM does not support belongs_to method.
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("user");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual([ 'Product' ]);
	});
	it("Should return null when no model is belongs to the instance user model fixed schema.", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
			model.set("partition", "user");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("user");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual(null);
	});
	it("Should get the associated or belongs to local model fixed schema", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
			model.set("partition", "local");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
			model.setBelongsTo("itemName", "Product"); // new ORM does not support belongs_to method.
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("local");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual([ 'Product' ]);
	});
	it("Should return null when no model is belongs to the instance user model fixed schema.", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
			model.set("partition", "local");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("local");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual(null);
	});
	it("Should get the associated or belongs to app model fixed schema", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
			model.set("partition", "app");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
			model.setBelongsTo("itemName", "Product"); // new ORM does not support belongs_to method.
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("app");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual(['Product']);
	});
	it("Should return null when no model is belongs to the instance app model fixed schema.", function(){
		var Product = function(model){
			model.fixed_schema = true;
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.setModelProperty("price", "string", "");
			model.setModelProperty("availability", "string", "");
			model.set("partition", "app");
		};
		var Item = function(model){
			model.fixed_schema = true;
			model.setModelProperty("itemName", "string", "");
			model.setModelProperty("availability", "string", "");
			model.setModelProperty("stockDetails", "string", "");
		}
		var prdObj = Rho.ORM.addModel('Product', Product);
		expect(prdObj.fixed_schema).toEqual(true);
		expect(prdObj.sync_type).toEqual("none");
		expect(prdObj.partition).toEqual("app");
		var itemObj = Rho.ORM.addModel('Item', Item);
		expect(itemObj.getBelongsTo("itemName")).toEqual(null);
	});
});
describe("enable test set : ", function(){
	it("should enable all the boolean properties with user model fixed schema", function(){
		var result = {};
		var cbTriggered = false;
		var Product = function(model){
			model.fixed_schema = true;
			model.enable('pass_through');
			model.enable('sync');
			model.enable('loaded');
			model.enable('freezed');
			model.enable('full_update');
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set('partition', 'user');
		};
		var prdObj = Rho.ORM.addModel('Product', Product);
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		prdObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("true");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Product");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("true");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("should enable all the boolean properties with local model fixed schema", function(){
		var result = {};
		var cbTriggered = false;
		var Product = function(model){
			model.fixed_schema = true;
			model.enable('pass_through');
			model.enable('sync');
			model.enable('loaded');
			model.enable('freezed');
			model.enable('full_update');
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set('partition', 'local');
		};
		var prdObj = Rho.ORM.addModel('Product', Product);
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		prdObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("true");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Product");
			expect(result.partition).toEqual("local");
			expect(result.pass_through).toEqual("true");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("should enable all the boolean properties with app model fixed schema", function(){
		var result = {};
		var cbTriggered = false;
		var Product = function(model){
			model.fixed_schema = true;
			model.enable('pass_through');
			model.enable('sync');
			model.enable('loaded');
			model.enable('freezed');
			model.enable('full_update');
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set('partition', 'app');
		};
		var prdObj = Rho.ORM.addModel('Product', Product);
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		prdObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("true");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("true");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Product");
			expect(result.partition).toEqual("app");
			expect(result.pass_through).toEqual("true");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("should enable all the boolean properties with user model property bag", function(){
		var result = {};
		var cbTriggered = false;
		var Product = function(model){
			model.enable('pass_through');
			model.enable('sync');
			model.enable('loaded');
			model.enable('freezed');
			model.enable('full_update');
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set('partition', 'user');
		};
		var prdObj = Rho.ORM.addModel('Product', Product);
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		prdObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("true");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Product");
			expect(result.partition).toEqual("user");
			expect(result.pass_through).toEqual("true");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("should enable all the boolean properties with local model property bag", function(){
		var result = {};
		var cbTriggered = false;
		var Product = function(model){
			model.enable('pass_through');
			model.enable('sync');
			model.enable('loaded');
			model.enable('freezed');
			model.enable('full_update');
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set('partition', 'local');
		};
		var prdObj = Rho.ORM.addModel('Product', Product);
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		prdObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("true");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Product");
			expect(result.partition).toEqual("local");
			expect(result.pass_through).toEqual("true");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
	it("should enable all the boolean properties with app model property bag", function(){
		var result = {};
		var cbTriggered = false;
		var Product = function(model){
			model.enable('pass_through');
			model.enable('sync');
			model.enable('loaded');
			model.enable('freezed');
			model.enable('full_update');
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set('partition', 'app');
		};
		var prdObj = Rho.ORM.addModel('Product', Product);
		var cb = function(data){
			console.log("getAllProperties : " + JSON.stringify(data));
			result = data;
			cbTriggered = true;
		};
		prdObj.getAllProperties(cb);
		waitsFor(function(){
			return cbTriggered;
		}, "wait for getAllProperties callback trigger", 3000);
		runs(function(){
			expect(result.associations).toEqual("");
			expect(result.blob_attribs).toEqual("");
			expect(result.fixed_schema).toEqual("false");
			expect(result.freezed).toEqual("true");
			expect(result.full_update).toEqual("true");
			expect(result.loaded).toEqual("true");
			expect(result.model_name).toEqual("Product");
			expect(result.partition).toEqual("app");
			expect(result.pass_through).toEqual("true");
			expect(result.sync_priority).toEqual("1000");
			expect(result.sync_type).toEqual("incremental");
		});
	});
});
describe("deleteObjects test set : ", function(){
	var userDB = Rho.ORMHelper.dbConnection('user');
	var localDB = Rho.ORMHelper.dbConnection('local');
	var appDB = Rho.ORMHelper.dbConnection('app');
	describe("UserFs test : ", function(){
		afterEach(function(){
			userDB.executeSql("DELETE FROM Product");
			userDB.executeSql("DELETE FROM SOURCES");
			var partitions = Rho.ORM.getDbPartitions();
		    $.each(partitions, function(index, db2){
				db2.executeSql("DELETE FROM SOURCES");
				db2.executeSql("DELETE FROM OBJECT_VALUES");
				db2.executeSql("DELETE FROM CHANGED_VALUES");
				if(db2.isTableExist('ProdDelUsFs'))
					db2.executeSql("DELETE FROM ProdDelUsFs");
				if(db2.isTableExist('ProdDelLoFs'))
					db2.executeSql("DELETE FROM ProdDelLoFs");

			});
		});
		it("Should delete all objects of the model when empty parameters are sent with method userFS.", function(){
			runs(function(){
				var ProdDelUsFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdDelUsFs", ProdDelUsFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({},[]);
				expect(prdObj.getCount()).toEqual(0);
			});
		})
		it("Should throw exception when null parameters are passed with the method userFS.", function(){
			runs(function(){
				var ProdDelUsFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdDelUsFs", ProdDelUsFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects();
				} catch(err){
					expect(err).toEqual("Wrong number of arguments: 0 instead of 2");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		})
		it("Should only the simple matched condition passed as parameter with the method userFS.", function(){
			runs(function(){
				var ProdDelUsFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdDelUsFs", ProdDelUsFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ?"},['nike']);
				expect(prdObj.getCount()).toEqual(2);
			});
		})
		it("Should only the matched condition uses OR passed as parameter with the method userFS.", function(){
			runs(function(){
				var ProdDelUsFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdDelUsFs", ProdDelUsFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ? OR availability = ?"},['nike', 'yes']);
				expect(prdObj.getCount()).toEqual(1);
			});
		})
		it("Should only the matched condition uses AND passed as parameter with the method userFS.", function(){
			runs(function(){
				var ProdDelUsFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdDelUsFs", ProdDelUsFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ? AND availability = ?"},['nike', 'yes']);
				expect(prdObj.getCount()).toEqual(2);
			});
		})
		it("Should throw an exception when wrong condition(non existing column) is sent as parameter with the method userFS.", function(){
			runs(function(){
				var ProdDelUsFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdDelUsFs", ProdDelUsFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects({"conditions" :"nonexisting = ?"},['nike']);
				} catch (err){
					expect(err).toEqual("no such column: nonexisting");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		});
	});
	describe("localFs tests : ", function(){
		afterEach(function(){
			localDB.executeSql("DELETE FROM ProdDelLoFs");
		});
		it("Should delete all objects of the model when empty parameters are sent with method localFS.", function(){
			if(localDB.isTableExist('ProdDelLoFs')){
				localDB.executeSql("DELETE FROM ProdDelLoFs");
			}
			runs(function(){
				var ProdDelLoFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "local");
				};
				var prdObj = Rho.ORM.addModel("ProdDelLoFs", ProdDelLoFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({},[]);
				expect(prdObj.getCount()).toEqual(0);
			});
		})
		it("Should throw exception when null parameters are passed with the method localFS.", function(){
			runs(function(){
				var ProdDelLoFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "local");
				};
				var prdObj = Rho.ORM.addModel("ProdDelLoFs", ProdDelLoFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects();
				} catch(err){
					expect(err).toEqual("Wrong number of arguments: 0 instead of 2");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		})
		it("Should only the simple matched condition passed as parameter with the method localFS.", function(){
			runs(function(){
				var ProdDelLoFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "local");
				};
				var prdObj = Rho.ORM.addModel("ProdDelLoFs", ProdDelLoFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ?"},['nike']);
				expect(prdObj.getCount()).toEqual(2);
			});
		})
		it("Should only the matched condition uses OR passed as parameter with the method localFS.", function(){
			runs(function(){
				var ProdDelLoFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "local");
				};
				var prdObj = Rho.ORM.addModel("ProdDelLoFs", ProdDelLoFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ? OR availability = ?"},['nike', 'yes']);
				expect(prdObj.getCount()).toEqual(1);
			});
		})
		it("Should only the matched condition uses AND passed as parameter with the method localFS.", function(){
			runs(function(){
				var ProdDelLoFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "local");
				};
				var prdObj = Rho.ORM.addModel("ProdDelLoFs", ProdDelLoFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ? AND availability = ?"},['nike', 'yes']);
				expect(prdObj.getCount()).toEqual(2);
			});
		})
		it("Should throw an exception when wrong condition(non existing column) is sent as parameter with the method localFS.", function(){
			runs(function(){
				var ProdDelLoFs = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "local");
				};
				var prdObj = Rho.ORM.addModel("ProdDelLoFs", ProdDelLoFs);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects({"conditions" :"nonexisting = ?"},['nike']);
				} catch (err){
					expect(err).toEqual("no such column: nonexisting");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		});
	});
	describe("appFs tests : ", function(){
		afterEach(function(){
			appDB.executeSql("DELETE FROM ProductApp");
		});
		it("Should delete all objects of the model when empty parameters are sent with method appFs.", function(){

			runs(function(){
				var ProductApp = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "app");
				};
				var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({},[]);
				expect(prdObj.getCount()).toEqual(0);
			});
		})
		it("Should throw exception when null parameters are passed with the method appFs.", function(){
			runs(function(){
				var ProductApp = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "app");
				};
				var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects();
				} catch(err){
					expect(err).toEqual("Wrong number of arguments: 0 instead of 2");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		})
		it("Should only the simple matched condition passed as parameter with the method appFs.", function(){
			runs(function(){
				var ProductApp = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "app");
				};
				var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ?"},['nike']);
				expect(prdObj.getCount()).toEqual(2);
			});
		})
		it("Should only the matched condition uses OR passed as parameter with the method appFs.", function(){
			runs(function(){
				var ProductApp = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "app");
				};
				var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ? OR availability = ?"},['nike', 'yes']);
				expect(prdObj.getCount()).toEqual(1);
			});
		})
		it("Should only the matched condition uses AND passed as parameter with the method appFs.", function(){
			runs(function(){
				var ProductApp = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "app");
				};
				var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				prdObj.deleteObjects({"conditions" :"name = ? AND availability = ?"},['nike', 'yes']);
				expect(prdObj.getCount()).toEqual(2);
			});
		})
		it("Should throw an exception when wrong condition(non existing column) is sent as parameter with the method appFs.", function(){
			runs(function(){
				var ProductApp = function(model){
					model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "app");
				};
				var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects({"conditions" :"nonexisting = ?"},['nike']);
				} catch (err){
					expect(err).toEqual("no such column: nonexisting");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		});
	});
	describe("getObjects with Property bag: ", function(){
		it("Should throw exception", function(){
			userDB = Rho.ORMHelper.dbConnection('user');
			userDB.executeSql("DELETE FROM OBJECT_VALUES");
			runs(function(){
				var CustoPb = function(model){
					model.fixed_schema = false;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "string", "");
					model.setModelProperty("price", "string", "");
					model.setModelProperty("availability", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("CustoPb", CustoPb);
				var data = [{
					"name":"nike",
					"quantity":"20",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"Woodlands",
					"quantity":"30",
					"price":"2000",
					"availability":"yes"
				},{
					"name":"reebok",
					"quantity":"40",
					"price":"2000",
					"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				try{
					prdObj.deleteObjects({"conditions" :"nonexisting = ?"},['nike']);
				} catch (err){
					expect(err).toEqual("no such table: CustoPb");
				}
				expect(prdObj.getCount()).toEqual(3);
			});
		});
	});
});
describe("findObjects test set : ", function(){
	describe("userFS tests: ", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		var reset = function(){
			if(userDB.isTableExist('ProductUs'))
				userDB.executeSql("DELETE FROM ProductUs");
			};
		it("Should be able to find all the objects which matches the simple condition in the WHERE clause with fixed schema(user)", function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ?"},['nike'],['name','quantity'],[]);
			var count = prdObj.findObjects("count",{"conditions" :"name = ?"},['nike'],['name','quantity'],[]);
			console.log("result : " + JSON.stringify(res));
			expect(res[0].object).toEqual(objData[0].object);
			expect(res[0].name).toEqual('nike');
			expect(res[0].quantity).toEqual('20');
			expect(res[0].price).toEqual(null);
			expect(count).toEqual(1);
		});
		it("Should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(user)",function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
			var count = prdObj.findObjects("count",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(3);
			expect(res[0].name).toEqual("Nike");
			expect(res[1].name).toEqual("Puma");
			expect(res[2].name).toEqual("Woodlands");
			expect(count).toEqual(3);
			var res2 = prdObj.findObjects("all",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'DESC']);
			var count2 = prdObj.findObjects("count",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'DESC']);
			console.log("result : " + JSON.stringify(res));
			expect(res2.length).toEqual(3);
			expect(res2[0].name).toEqual("Woodlands");
			expect(res2[1].name).toEqual("Puma");
			expect(res2[2].name).toEqual("Nike");
			expect(count2).toEqual(3);
		});
		it("Should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(user)",function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ? AND availability = ?"},['Nike', 'yes'],['name','availability'],[]);
			var count = prdObj.findObjects("count",{"conditions" :"name = ? AND availability = ?"},['Nike', 'yes'],['name','availability'],[]);
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(1);
			expect(res[0].name).toEqual("Nike");
			expect(count).toEqual(1);
		});
		it("Should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(user).", function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','ASC']);
			var count = prdObj.findObjects("count",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','ASC']);
			console.log("result1 : " + JSON.stringify(res));
			expect(res.length).toEqual(3);
			expect(res[0].name).toEqual("Nike");
			expect(res[1].name).toEqual("Puma");
			expect(res[2].name).toEqual("Reebok");
			expect(count).toEqual(3);
			var res2 = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','DESC']);
			var count2 = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','DESC']);
			console.log("result2 : " + JSON.stringify(res2));
			expect(res2.length).toEqual(3);
			expect(res2[0].name).toEqual("Reebok");
			expect(res2[1].name).toEqual("Puma");
			expect(res2[2].name).toEqual("Nike");
			expect(count).toEqual(3);
		});
		it("Should throw exception when null parameters are passed with fixed schema(user).",function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects();
			} catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 5");
			}
		});
		it("Should find all the objects when empty parameters are passed with fixed schema(user).", function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all", {},[],[],[]);
			var count = prdObj.findObjects("count", {},[],[],[]);
			console.log("Empty parameters : " + JSON.stringify(res));
			expect(res.length).toEqual(4);
			expect(count).toEqual(4);
			//findObjects: Invalid Empty First Argument passed.
		});
		it("Should throw exception when first parameter is passed as empty with fixed schema(user)", function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects("", {},[],[],[]);
			} catch(err) {
				expect(err).toEqual("findObjects: Invalid Empty First Argument passed.");
			}
		});
		it("Should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(user)", function(){
			var ProductUs = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "user");
			};
			var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
			var prdObj2 = Rho.ORM.getModel('ProductUs');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects("all", {"conditions":"nonexisting = ?"},['Nike'],[],[]);
			} catch(err) {
				expect(err).toEqual("no such column: nonexisting");
			}
		});
	});
	describe("localFS tests: ", function(){
		var localDB = Rho.ORMHelper.dbConnection('local');
		var reset = function(){
			if(localDB.isTableExist('ProductLo'))
				localDB.executeSql("DELETE FROM ProductLo");
			};
		it("Should be able to find all the objects which matches the simple condition in the WHERE clause with fixed schema(local)", function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ?"},['nike'],['name','quantity'],[]);
			console.log("result : " + JSON.stringify(res));
			expect(res[0].object).toEqual(objData[0].object);
			expect(res[0].name).toEqual('nike');
			expect(res[0].quantity).toEqual('20');
			expect(res[0].price).toEqual(null);
		});
		it("Should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(local)",function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(3);
			expect(res[0].name).toEqual("Nike");
			expect(res[1].name).toEqual("Puma");
			expect(res[2].name).toEqual("Woodlands");
			var res2 = prdObj.findObjects("all",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'DESC']);
			console.log("result : " + JSON.stringify(res));
			expect(res2.length).toEqual(3);
			expect(res2[0].name).toEqual("Woodlands");
			expect(res2[1].name).toEqual("Puma");
			expect(res2[2].name).toEqual("Nike");
		});
		it("Should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(local)",function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ? AND availability = ?"},['Nike', 'yes'],['name','availability'],[]);
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(1);
			expect(res[0].name).toEqual("Nike");
		});
		it("Should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(local).", function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','ASC']);
			console.log("result1 : " + JSON.stringify(res));
			expect(res.length).toEqual(3);
			expect(res[0].name).toEqual("Nike");
			expect(res[1].name).toEqual("Puma");
			expect(res[2].name).toEqual("Reebok");
			var res2 = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','DESC']);
			console.log("result2 : " + JSON.stringify(res2));
			expect(res2.length).toEqual(3);
			expect(res2[0].name).toEqual("Reebok");
			expect(res2[1].name).toEqual("Puma");
			expect(res2[2].name).toEqual("Nike");
		});
		it("Should throw exception when null parameters are passed with fixed schema(local).",function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects();
			} catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 5");
			}
		});
		it("Should find all the objects when empty parameters are passed with fixed schema(local).", function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all", {},[],[],[]);
			console.log("Empty parameters : " + JSON.stringify(res));
			expect(res.length).toEqual(4);
			//findObjects: Invalid Empty First Argument passed.
		});
		it("Should throw exception when first parameter is passed as empty with fixed schema(local)", function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects("", {},[],[],[]);
			} catch(err) {
				expect(err).toEqual("findObjects: Invalid Empty First Argument passed.");
			}
		});
		it("Should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(local)", function(){
			var ProductLo = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "local");
			};
			var prdObj = Rho.ORM.addModel("ProductLo", ProductLo);
			var prdObj2 = Rho.ORM.getModel('ProductLo');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects("all", {"conditions":"nonexisting = ?"},['Nike'],[],[]);
			} catch(err) {
				expect(err).toEqual("no such column: nonexisting");
			}
		});
	});
	describe("appFS tests: ", function(){
		var appDB = Rho.ORMHelper.dbConnection('app');
		var userDB = Rho.ORMHelper.dbConnection('user');
		var reset = function(){
			userDB.executeSql("DELETE FROM SOURCES");
			userDB.executeSql("DELETE FROM CHANGED_VALUES");
			userDB.executeSql("DELETE FROM OBJECT_VALUES");
			if(appDB.isTableExist('ProductApp'))
				appDB.executeSql("DELETE FROM ProductApp");
		};
		it("Should be able to find all the objects which matches the simple condition in the WHERE clause with fixed schema(app)", function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ?"},['nike'],['name','quantity'],[]);
			console.log("result : " + JSON.stringify(res));
			expect(res[0].object).toEqual(objData[0].object);
			expect(res[0].name).toEqual('nike');
			expect(res[0].quantity).toEqual('20');
			expect(res[0].price).toEqual(null);
		});
		it("Should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(app)",function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(3);
			expect(res[0].name).toEqual("Nike");
			expect(res[1].name).toEqual("Puma");
			expect(res[2].name).toEqual("Woodlands");
			var res2 = prdObj.findObjects("all",{"conditions" :"name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'DESC']);
			console.log("result : " + JSON.stringify(res));
			expect(res2.length).toEqual(3);
			expect(res2[0].name).toEqual("Woodlands");
			expect(res2[1].name).toEqual("Puma");
			expect(res2[2].name).toEqual("Nike");
		});
		it("Should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(app)",function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var objData = [];
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				objData[i] = prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name = ? AND availability = ?"},['Nike', 'yes'],['name','availability'],[]);
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(1);
			expect(res[0].name).toEqual("Nike");
		});
		it("Should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(app).", function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','ASC']);
			console.log("result1 : " + JSON.stringify(res));
			expect(res.length).toEqual(3);
			expect(res[0].name).toEqual("Nike");
			expect(res[1].name).toEqual("Puma");
			expect(res[2].name).toEqual("Reebok");
			var res2 = prdObj.findObjects("all",{"conditions" :"name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','price'],['name','DESC']);
			console.log("result2 : " + JSON.stringify(res2));
			expect(res2.length).toEqual(3);
			expect(res2[0].name).toEqual("Reebok");
			expect(res2[1].name).toEqual("Puma");
			expect(res2[2].name).toEqual("Nike");
		});
		it("Should throw exception when null parameters are passed with fixed schema(app).",function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects();
			} catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 5");
			}
		});
		it("Should find all the objects when empty parameters are passed with fixed schema(app).", function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var res = prdObj.findObjects("all", {},[],[],[]);
			console.log("Empty parameters : " + JSON.stringify(res));
			expect(res.length).toEqual(4);
			//findObjects: Invalid Empty First Argument passed.
		});
		it("Should throw exception when first parameter is passed as empty with fixed schema(app)", function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects("", {},[],[],[]);
			} catch(err) {
				expect(err).toEqual("findObjects: Invalid Empty First Argument passed.");
			}
		});
		it("Should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(app)", function(){
			var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			var prdObj2 = Rho.ORM.getModel('ProductApp');
			prdObj2.deleteObjects({}, []);
			var data = [{
			"name":"Nike",
			"quantity":"20",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Woodlands",
			"quantity":"30",
			"price":"2000",
			"availability":"yes"
			},{
			"name":"Reebok",
			"quantity":"40",
			"price":"1500",
			"availability":"no"
			},{
			"name":"Puma",
			"quantity":"30",
			"price":"1500",
			"availability":"no"
			}];
			for(var i in data){
				prdObj.createObject(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			try{
				var res = prdObj.findObjects("all", {"conditions":"nonexisting = ?"},['Nike'],[],[]);
			} catch(err) {
				expect(err).toEqual("no such column: nonexisting");
			}
		});
		it("Should throw exception when findObjects done with property bag:", function(){
			reset();
			runs(function(){
				var ProductUsPB = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "integer", "");
					model.setModelProperty("price", "integer", "");
					model.setModelProperty("availability", "string", "");
					model.setModelProperty("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProductUsPB", ProductUsPB);
				var data = [{
				"name":"Nike",
				"quantity":"20",
				"price":"2000",
				"availability":"yes"
				},{
				"name":"Woodlands",
				"quantity":"30",
				"price":"2000",
				"availability":"yes"
				},{
				"name":"Reebok",
				"quantity":"40",
				"price":"1500",
				"availability":"no"
				},{
				"name":"Puma",
				"quantity":"30",
				"price":"1500",
				"availability":"no"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				try{
					var res = prdObj.findObjects("all", {},[],[],[]);
				} catch(err) {
					expect(err).toEqual("no such table: ProductUsPB");
				}
			});
		});
	});
});
describe("deleteObjectsPropertyBagByCondHash test set : ", function(){
	describe("userproperty bag test : ", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		var reset = function(){
			userDB.executeSql("DELETE FROM SOURCES");
			userDB.executeSql("DELETE FROM CHANGED_VALUES");
			userDB.executeSql("DELETE FROM OBJECT_VALUES");
		}
		it("Should delete all objects of the model when empty parameters are sent with userPB", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "user");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({}, {});
			var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			console.log("Result : " + JSON.stringify(res));
			expect(stObj.getCount()).toEqual(0);
		});
		it("Should throw exception when null parameters are passed in the method with with userPB", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "user");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			try{
				stObj.deleteObjectsPropertyBagByCondHash();
			}catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 2")
			}
			var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(3);
		});
		it("Should delete only the simple matched condition passed as parameter in the method with with userPB.", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "user");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({"name":"Arun"}, {});
			var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(2);
		});
		it("Should delete only the simple matched multiple condition passed as parameter in method with userPB.", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "user");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({"name":"Arun","age":"30"}, {});
			var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(2);
		});
		it("Should throw an exception when wrong condition(non existing column) is sent as parameter in method with userPB.", function(){
			reset();
			var error = "";
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "user");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			try{
				stObj.deleteObjectsPropertyBagByCondHash({"suresh":"Arun","dump":"30"}, {});
			}catch(err){
				error = err;
			}
			expect(stObj.getCount()).toEqual(3);
			expect(error).toEqual("");
		});
	});
	describe("local Property bag test : ", function(){
		var localDB = Rho.ORMHelper.dbConnection('local');
		var reset = function(){
			localDB.executeSql("DELETE FROM SOURCES");
			localDB.executeSql("DELETE FROM CHANGED_VALUES");
			localDB.executeSql("DELETE FROM OBJECT_VALUES");
		}
		it("Should delete all objects of the model when empty parameters are sent with localPB", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "local");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({}, {});
			var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
			console.log("Result : " + JSON.stringify(res));
			expect(stObj.getCount()).toEqual(0);
		});
		it("Should throw exception when null parameters are passed in the method with with localPB", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "local");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			try{
				stObj.deleteObjectsPropertyBagByCondHash();
			}catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 2")
			}
			var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(3);
		});
		it("Should delete only the simple matched condition passed as parameter in the method with with localPB.", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "local");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({"name":"Arun"}, {});
			var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(2);
		});
		it("Should delete only the simple matched multiple condition passed as parameter in method with localPB.", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "local");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({"name":"Arun","age":"30"}, {});
			var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(2);
		});
		it("Should throw an exception when wrong condition(non existing column) is sent as parameter in method with localPB.", function(){
			reset();
			var error = "";
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "local");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			try{
				stObj.deleteObjectsPropertyBagByCondHash({"suresh":"Arun","dump":"30"}, {});
			}catch(err){
				error = err;
			}
			expect(stObj.getCount()).toEqual(3);
			expect(error).toEqual("");
		});
	});
	describe("app property bag test : ", function(){
		var appDB = Rho.ORMHelper.dbConnection('app');
		var reset = function(){
			appDB.executeSql("DELETE FROM SOURCES");
			appDB.executeSql("DELETE FROM CHANGED_VALUES");
			appDB.executeSql("DELETE FROM OBJECT_VALUES");
		}
		it("Should delete all objects of the model when empty parameters are sent with appPB", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "app");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({}, {});
			var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
			console.log("Result : " + JSON.stringify(res));
			expect(stObj.getCount()).toEqual(0);
		});
		it("Should throw exception when null parameters are passed in the method with with appPB", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "app");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			try{
				stObj.deleteObjectsPropertyBagByCondHash();
			}catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 2")
			}
			var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(3);
		});
		it("Should delete only the simple matched condition passed as parameter in the method with with appPB.", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "app");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({"name":"Arun"}, {});
			var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(2);
		});
		it("Should delete only the simple matched multiple condition passed as parameter in method with appPB.", function(){
			reset();
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "app");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			stObj.deleteObjectsPropertyBagByCondHash({"name":"Arun","age":"30"}, {});
			var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
			expect(stObj.getCount()).toEqual(2);
		});
		it("Should throw an exception when wrong condition(non existing column) is sent as parameter in method with appPB.", function(){
			reset();
			var error = "";
			var Students = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("age", "string", "");
				model.setModelProperty("department", "string", "");
				model.setModelProperty("rank", "string", "");
				model.set("partition", "app");
			};
			var stObj = Rho.ORM.addModel('Students', Students);
			var data = [{
				"name":"Arun",
				"age":"30",
				"department":"Electronics",
				"rank":"1"
			},{
				"name":"Vinod",
				"age":"30",
				"department":"Computer",
				"rank":"3"
			},{
				"name":"Nadaf",
				"age":"30",
				"department":"Electronics",
				"rank":"2"
			}];
			var myObj = [];
			for(var i in data){
				myObj[i] = stObj.createObject(data[i]);
			}
			expect(stObj.getCount()).toEqual(3);
			try{
				stObj.deleteObjectsPropertyBagByCondHash({"suresh":"Arun","dump":"30"}, {});
			}catch(err){
				error = err;
			}
			expect(stObj.getCount()).toEqual(3);
			expect(error).toEqual("");
		});
	});
});
describe("findObjectsPropertyBagByCondHash test set : ", function(){
	describe("userPB tests: ", function(){
		beforeEach(function(){
			userDB.executeSql("DELETE FROM SOURCES");
			var partitions = Rho.ORM.getDbPartitions();
		    $.each(partitions, function(index, db2){
				db2.executeSql("DELETE FROM SOURCES");
				db2.executeSql("DELETE FROM OBJECT_VALUES");
				db2.executeSql("DELETE FROM CHANGED_VALUES");
				if(db2.isTableExist('ProdFinUsPb'))
					db2.executeSql("DELETE FROM ProdFinUsPb");
				if(db2.isTableExist('ProdFinLoPb'))
					db2.executeSql("DELETE FROM ProdFinLoPb");
			});
		});
		it("Should find all the objects of the model when no parameter is passed with the method.", function(){
			runs(function(){
				userDB.executeSql("DELETE FROM OBJECT_VALUES");
				var ProdFinUsPb = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdFinUsPb", ProdFinUsPb);
				prdObj.deleteObjectsPropertyBagByCondHash({},{});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				var myObj = [];
				for(var i in data){
					myObj[i] = prdObj.createObject(data[i]);
				}
				console.log("myOBj : " + JSON.stringify(myObj));
				console.log("table : " + JSON.stringify(userDB.executeSql("SELECT * FROM OBJECT_VALUES")));
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondHash("all", {},{},[]);
				var count = prdObj.findObjectsPropertyBagByCondHash("count", {},{},[]);
				expect(res.length).toEqual(12)
				expect(count).toEqual(12);
			});
		});
		it("Should find the objects matching to the condition passed with the method.", function(){
			runs(function(){
				var ProdFinUsPb = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdFinUsPb", ProdFinUsPb);
				prdObj.deleteObjectsPropertyBagByCondHash({},{});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondHash("all", {"name":"Arun"},{},['name','age']);
				var count = prdObj.findObjectsPropertyBagByCondHash("count", {"name":"Arun"},{},['name','age']);
				expect(res.length).toEqual(1)
				expect(res[0].name).toEqual("Arun");
				expect(res[0].age).toEqual("30");
				expect(count).toEqual(1);
			});
		});
		it("Should find the selective object parameters depeding on the setAttr parameter passed with the method.", function(){
			runs(function(){
				var ProdFinUsPb = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdFinUsPb", ProdFinUsPb);
				prdObj.deleteObjectsPropertyBagByCondHash({},{});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondHash("all", {"name":"Arun"},{},['name','age']);
				var count = prdObj.findObjectsPropertyBagByCondHash("count", {"name":"Arun"},{},['name','age']);
				expect(res.length).toEqual(1)
				expect(res[0].name).toEqual("Arun");
				expect(res[0].age).toEqual("30");
				expect(res[0].department).toEqual(null);
				expect(count).toEqual(1);
			});
		});
		it("Should throw exception when no parameter passed with the method.", function(){
			runs(function(){
				var ProdFinUsPb = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProdFinUsPb", ProdFinUsPb);
				prdObj.deleteObjectsPropertyBagByCondHash({},{});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondHash();
					var count = prdObj.findObjectsPropertyBagByCondHash();
				}catch(err){
					error = err;
				}
				expect(error).toEqual("Wrong number of arguments: 0 instead of 4");
			});
		});
	});
});
xdescribe("findObjectsPropertyBagByCondArray test sets : ", function(){
	userDB = Rho.ORMHelper.dbConnection('user');
	localDB = Rho.ORMHelper.dbConnection('local');
	appDB = Rho.ORMHelper.dbConnection('app');
	describe("userFs", function(){
		it("should find all objects when empty paramter is passed with the userFS.", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "", [], {}, []);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "", [], {}, []);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "", [], {}, []);
				expect(res.length).toEqual(3);
				expect(resCount).toEqual(3);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching simple condition passed with the userFs.", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ?", ['Nadaf'], {}, ['name']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ?", ['Nadaf'], {}, ['name']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ?", ['Nadaf'], {}, ['name']);
				expect(res.length).toEqual(1);
				expect(resCount).toEqual(1);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching condition with OR passed with the userFs.", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				expect(res.length).toEqual(2);
				expect(resCount).toEqual(2);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching condition with AND passed with the userFs.", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				expect(res.length).toEqual(1);
				expect(resCount).toEqual(1);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should throw exception when no parameter is passed with the userFs", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray();
				} catch(err){
					error = err;
				}
				expect(error).toEqual("Wrong number of arguments: 0 instead of 5");
			});
		});
		it("Should throw exception when no first parameter with the userFs.", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray("", "", [], {}, []);
				} catch(err){
					error = err;
				}
				expect(error).toEqual("findObjectsPropertyBagByCondArray: Invalid Empty First Argument passed.");
			});
		});
		it("Should throw exception when condition is passed as nonexisting column with the userFs.", function(){
			runs(function(){
				var ProductFinArrUsFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrUsFs", ProductFinArrUsFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray("all", "nonexisting = ?", ['Arun'], {}, ["nonexisting"]);
				} catch(err){
					error = err;
				}
				expect(error).toEqual("");
			});
		});
	});
	describe("localFs", function(){
		it("should find all objects when empty paramter is passed with the localFs.", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "", [], {}, []);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "", [], {}, []);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "", [], {}, []);
				expect(res.length).toEqual(3);
				expect(resCount).toEqual(3);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching simple condition passed with the localFs.", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ?", ['Nadaf'], {}, ['name']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ?", ['Nadaf'], {}, ['name']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ?", ['Nadaf'], {}, ['name']);
				expect(res.length).toEqual(1);
				expect(resCount).toEqual(1);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching condition with OR passed with the localFs.", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				expect(res.length).toEqual(2);
				expect(resCount).toEqual(2);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching condition with AND passed with the localFs.", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				expect(res.length).toEqual(1);
				expect(resCount).toEqual(1);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should throw exception when no parameter is passed with the localFs", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray();
				} catch(err){
					error = err;
				}
				expect(error).toEqual("Wrong number of arguments: 0 instead of 5");
			});
		});
		it("Should throw exception when no first parameter with the localFs.", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray("", "", [], {}, []);
				} catch(err){
					error = err;
				}
				expect(error).toEqual("findObjectsPropertyBagByCondArray: Invalid Empty First Argument passed.");
			});
		});
		it("Should throw exception when condition is passed as nonexisting column with the localFs.", function(){
			runs(function(){
				var ProductFinArrLoFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "local");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrLoFs", ProductFinArrLoFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray("all", "nonexisting = ?", ['Arun'], {}, ["nonexisting"]);
				} catch(err){
					error = err;
				}
				expect(error).toEqual("");
			});
		});
	});
	describe("appFs", function(){
		it("should find all objects when empty paramter is passed with the appFs.", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "", [], {}, []);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "", [], {}, []);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "", [], {}, []);
				expect(res.length).toEqual(3);
				expect(resCount).toEqual(3);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching simple condition passed with the appFs.", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ?", ['Nadaf'], {}, ['name']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ?", ['Nadaf'], {}, ['name']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ?", ['Nadaf'], {}, ['name']);
				expect(res.length).toEqual(1);
				expect(resCount).toEqual(1);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching condition with OR passed with the appFs.", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ? OR department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				expect(res.length).toEqual(2);
				expect(resCount).toEqual(2);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should find all the matching condition with AND passed with the appFs.", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var res = prdObj.findObjectsPropertyBagByCondArray("all", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resCount = prdObj.findObjectsPropertyBagByCondArray("count", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				var resFirst = prdObj.findObjectsPropertyBagByCondArray("first", "name = ? AND department = ?", ['Nadaf', 'Electronics'], {}, ['name', 'department']);
				expect(res.length).toEqual(1);
				expect(resCount).toEqual(1);
				expect(resFirst.length).toEqual(1);
			});
		});
		it("Should throw exception when no parameter is passed with the appFs", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray();
				} catch(err){
					error = err;
				}
				expect(error).toEqual("Wrong number of arguments: 0 instead of 5");
			});
		});
		it("Should throw exception when no first parameter with the appFs.", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray("", "", [], {}, []);
				} catch(err){
					error = err;
				}
				expect(error).toEqual("findObjectsPropertyBagByCondArray: Invalid Empty First Argument passed.");
			});
		});
		it("Should throw exception when condition is passed as nonexisting column with the appFs.", function(){
			runs(function(){
				var ProductFinArrAppFs = function(model){
					model.setModelProperty("name", "string", "");
					model.setModelProperty("age", "string", "");
					model.setModelProperty("department", "string", "");
					model.setModelProperty("rank", "string", "");
					model.set("partition", "app");
				}
				var prdObj = Rho.ORM.addModel("ProductFinArrAppFs", ProductFinArrAppFs);
				prdObj.deleteObjectsPropertyBagByCondHash({}, {});
				var data = [{
					"name":"Arun",
					"age":"30",
					"department":"Electronics",
					"rank":"1"
				},{
					"name":"Vinod",
					"age":"30",
					"department":"Computer",
					"rank":"3"
				},{
					"name":"Nadaf",
					"age":"30",
					"department":"Electronics",
					"rank":"2"
				}];
				for(var i in data){
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(3);
				var error = "";
				try{
					var res = prdObj.findObjectsPropertyBagByCondArray("all", "nonexisting = ?", ['Arun'], {}, ["nonexisting"]);
				} catch(err){
					error = err;
				}
				expect(error).toEqual("");
			});
		});
	});
});
describe("getModelProperty test set : ", function(){
	// afterEach(function(){
	// 	var partitions = Rho.ORM.getDbPartitions();
	//     $.each(partitions, function(index, db2){
	// 		db2.executeSql("DELETE FROM SOURCES");
	// 		db2.executeSql("DELETE FROM OBJECT_VALUES");
	// 		db2.executeSql("DELETE FROM CHANGED_VALUES");
	// 		if(db2.isTableExist("Person")){
	// 			console.log("Found Person !");
	// 			db2.executeSql("DROP TABLE Person");
	// 		}
	//   	});
	// });
	it("Should get value of string property using getModelProperty userFS", function(){
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			}
			var perObj = Rho.ORM.addModel("Person", Person);
			var createRes = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var res = perObj.getModelProperty('name');
			var res1 = perObj.getModelProperty('age');
			var res2 = perObj.getModelProperty('male');
			var res3 = perObj.getModelProperty('height');
			expect(res.name).toEqual("name");
			expect(res.type).toEqual("String");
			expect(res.option).toEqual("");
			expect(res1.name).toEqual("age");
			expect(res1.type).toEqual("Integer");
			expect(res1.option).toEqual("");
			expect(res2.name).toEqual("male");
			expect(res2.type).toEqual("boolean");
			expect(res2.option).toEqual("");
			expect(res3.name).toEqual("height");
			expect(res3.type).toEqual("Float");
			expect(res3.option).toEqual("");
		});
	});
	it("Should get value of string property using getModelProperty localFS", function(){
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			}
			var perObj = Rho.ORM.addModel("Person", Person);
			var createRes = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var res = perObj.getModelProperty('name');
			var res1 = perObj.getModelProperty('age');
			var res2 = perObj.getModelProperty('male');
			var res3 = perObj.getModelProperty('height');
			expect(res.name).toEqual("name");
			expect(res.type).toEqual("String");
			expect(res.option).toEqual("");
			expect(res1.name).toEqual("age");
			expect(res1.type).toEqual("Integer");
			expect(res1.option).toEqual("");
			expect(res2.name).toEqual("male");
			expect(res2.type).toEqual("boolean");
			expect(res2.option).toEqual("");
			expect(res3.name).toEqual("height");
			expect(res3.type).toEqual("Float");
			expect(res3.option).toEqual("");
		});
	});
	it("Should get value of string property using getModelProperty appFS", function(){
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var createRes = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var res = perObj.getModelProperty('name');
			var res1 = perObj.getModelProperty('age');
			var res2 = perObj.getModelProperty('male');
			var res3 = perObj.getModelProperty('height');
			expect(res.name).toEqual("name");
			expect(res.type).toEqual("String");
			expect(res.option).toEqual("");
			expect(res1.name).toEqual("age");
			expect(res1.type).toEqual("Integer");
			expect(res1.option).toEqual("");
			expect(res2.name).toEqual("male");
			expect(res2.type).toEqual("boolean");
			expect(res2.option).toEqual("");
			expect(res3.name).toEqual("height");
			expect(res3.type).toEqual("Float");
			expect(res3.option).toEqual("");
		});
	});
	it("Should get value of string property using getModelProperty userPB", function(){
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			}
			var perObj = Rho.ORM.addModel("Person", Person);
			var createRes = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var res = perObj.getModelProperty('name');
			var res1 = perObj.getModelProperty('age');
			var res2 = perObj.getModelProperty('male');
			var res3 = perObj.getModelProperty('height');
			expect(res.name).toEqual("name");
			expect(res.type).toEqual("String");
			expect(res.option).toEqual("");
			expect(res1.name).toEqual("age");
			expect(res1.type).toEqual("Integer");
			expect(res1.option).toEqual("");
			expect(res2.name).toEqual("male");
			expect(res2.type).toEqual("boolean");
			expect(res2.option).toEqual("");
			expect(res3.name).toEqual("height");
			expect(res3.type).toEqual("Float");
			expect(res3.option).toEqual("");
		});
	});
	it("Should get value of string property using getModelProperty localPB", function(){
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			}
			var perObj = Rho.ORM.addModel("Person", Person);
			var createRes = perObj.createObject({"name": "Arun", "age": 30, "male": true, "height": 170.5});
			var res = perObj.getModelProperty('name');
			var res1 = perObj.getModelProperty('age');
			var res2 = perObj.getModelProperty('male');
			var res3 = perObj.getModelProperty('height');
			expect(res.name).toEqual("name");
			expect(res.type).toEqual("String");
			expect(res.option).toEqual("");
			expect(res1.name).toEqual("age");
			expect(res1.type).toEqual("Integer");
			expect(res1.option).toEqual("");
			expect(res2.name).toEqual("male");
			expect(res2.type).toEqual("boolean");
			expect(res2.option).toEqual("");
			expect(res3.name).toEqual("height");
			expect(res3.type).toEqual("Float");
			expect(res3.option).toEqual("");
			var resFs = perObj.findObjects("all",{},[],[],[]);
		});
	});
	it("Should get value of string property using getModelProperty appPB", function(){
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			}
			var perObj = Rho.ORM.addModel("Person", Person);
			var createRes = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var res = perObj.getModelProperty('name');
			var res1 = perObj.getModelProperty('age');
			var res2 = perObj.getModelProperty('male');
			var res3 = perObj.getModelProperty('height');
			expect(res.name).toEqual("name");
			expect(res.type).toEqual("String");
			expect(res.option).toEqual("");
			expect(res1.name).toEqual("age");
			expect(res1.type).toEqual("Integer");
			expect(res1.option).toEqual("");
			expect(res2.name).toEqual("male");
			expect(res2.type).toEqual("boolean");
			expect(res2.option).toEqual("");
			expect(res3.name).toEqual("height");
			expect(res3.type).toEqual("Float");
			expect(res3.option).toEqual("");
		});
	});
});
describe("hasChanges test set : ", function(){
	it("should return true after modifying the object with the method hasChanges userFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.enable("sync");
				model.set('partition', 'user');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf"});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			var res = perObj.hasChanges(objData.object);
			expect(res).toEqual(true);
		});
	});
	it("should return true after modifying the object with the method hasChanges localFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('local');
		userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.enable("sync");
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,objData, {"name":"Nadaf"});
			var res = perObj.hasChanges(objData.object);
			expect(res).toEqual(true);

		});
	});
	it("should return true after modifying the object with the method hasChanges appFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('app');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.enable("sync");
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,objData, {"name":"Nadaf"});
			console.log(objData.object);
			var result = perObj.findObjects("all", {}, [], [], []);
			console.log(JSON.stringify(result));
			var res = perObj.hasChanges(objData.object);
			expect(res).toEqual(true);
		});
	});
	it("should return true after modifying the object with the method hasChanges userPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.enable("sync");
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun"}, {"name":"Nadaf"});
			var res = perObj.hasChanges(objData.object);
			expect(res).toEqual(true);
		});
	});
	it("should return true after modifying the object with the method hasChanges localPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('local');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.enable("sync");
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun"}, {"name":"Nadaf"});
			var res = perObj.hasChanges(objData.object);
			expect(res).toEqual(true);
		});
	});
	it("should return true after modifying the object with the method hasChanges appPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('app');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.enable("sync");
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun"}, {"name":"Nadaf"});
			var res = perObj.hasChanges(objData.object);
			expect(res).toEqual(true);
		});
	});
});
xdescribe("updateObject test set : ", function(){
	it("should update an existing record with the new values in userFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf", "age":40, "male":true, "height":180.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Nadaf");
			expect(resObj[0].age).toEqual("40");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("180.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing object with the same values in userFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Arun");
			expect(resObj[0].age).toEqual("30");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing record with the new values in localFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('local');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf", "age":40, "male":true, "height":180.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Nadaf");
			expect(resObj[0].age).toEqual("40");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("180.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing object with the same values in localFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('local');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Arun");
			expect(resObj[0].age).toEqual("30");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});

	it("should update an existing record with the new values in appFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('app');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf", "age":40, "male":true, "height":180.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Nadaf");
			expect(resObj[0].age).toEqual("40");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("180.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing object with the same values in appFS", function(){
		var userDB = Rho.ORMHelper.dbConnection('app');
		if(userDB.isTableExist('Person'))
			userDB.executeSql("DELETE FROM Person");
		runs(function(){
			var Person = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Arun");
			expect(resObj[0].age).toEqual("30");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});

	it("should update an existing record with the new values in userPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf", "age":40, "male":true, "height":180.5});
			var resObj = perObj.findObjectsPropertyBagByCondArray("all","", [], {}, []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Nadaf");
			expect(resObj[0].age).toEqual("40");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("180.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing object with the same values in userPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'user');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Arun");
			expect(resObj[0].age).toEqual("30");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});

	it("should update an existing record with the new values in localPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('local');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf", "age":40, "male":true, "height":180.5});
			var resObj = perObj.findObjectsPropertyBagByCondArray("all","", [], {}, []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Nadaf");
			expect(resObj[0].age).toEqual("40");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("180.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing object with the same values in localPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('local');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'local');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Arun");
			expect(resObj[0].age).toEqual("30");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing record with the new values in appPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('app');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Nadaf", "age":40, "male":true, "height":180.5});
			var resObj = perObj.findObjectsPropertyBagByCondArray("all","", [], {}, []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Nadaf");
			expect(resObj[0].age).toEqual("40");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("180.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
	it("should update an existing object with the same values in appPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('app');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		runs(function(){
			var Person = function(model){
				model.setModelProperty("name", "String", "");
				model.setModelProperty("age", "Integer", "");
				model.setModelProperty("male", "boolean", "");
				model.setModelProperty("height", "Float", "");
				model.set('partition', 'app');
			};
			var perObj = Rho.ORM.addModel("Person", Person);
			var objData = perObj.createObject({"name":"Arun", "age": 30, "male":true, "height":170.5});
			perObj.updateObject(objData.object,{"name":"Arun", "age": 30, "male":true, "height":170.5}, {"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj = perObj.findObjects("all", {}, [], [], []);
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj[0].name).toEqual("Arun");
			expect(resObj[0].age).toEqual("30");
			expect(resObj[0].male).toEqual("true");
			expect(resObj[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj[0].object).toEqual(objData.object);
		});
	});
});





