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
describe("anyChangedObject test set : ", function(){
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
});
describe("canModify test set : ", function(){
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
describe("databaseFullClientResetAndLogout test set : ", function(){
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
describe("findBySql test set : ", function(){
	userDB = Rho.ORMHelper.dbConnection("user");
	localDB = Rho.ORMHelper.dbConnection("local");
	appDB = Rho.ORMHelper.dbConnection("app");

	beforeEach(function(){
		if(userDB.isTableExist('Student'))
			userDB.executeSql("DELETE FROM Student");
		if(localDB.isTableExist('Student'))
			localDB.executeSql("DELETE FROM Student");
		if(appDB.isTableExist('Student'))
			appDB.executeSql("DELETE FROM Student");
	});
	it("Should findBySql for the user fixed schema model", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student");
		expect(res.length).toEqual(3);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should findBySql for the local fixed schema model", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student");
		expect(res.length).toEqual(3);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should findBySql for the app fixed schema model", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student");
		expect(res.length).toEqual(3);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should findBySql with 'WHERE' clause for the user fixed schema model", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student WHERE department = 'Electronics'");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should findBySql with 'WHERE' clause for the local fixed schema model", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student WHERE department = 'Electronics'");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should findBySql with 'WHERE' clause for the app fixed schema model", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student WHERE department = 'Electronics'");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return null when findBySql with 'WHERE' clause for the user fixed schema model does not return anything", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student WHERE department = 'Mechanical'");
		expect(res).toEqual([]);
		expect(res.length).toEqual(0);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return null when findBySql with 'WHERE' clause for the local fixed schema model does not return anything", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student WHERE department = 'Mechanical'");
		expect(res).toEqual([]);
		expect(res.length).toEqual(0);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return null when findBySql with 'WHERE' clause for the app fixed schema model does not returns anyting.", function(){
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
		var res = stgObj.findBySql("SELECT * FROM Student WHERE department = 'Mechanical'");
		expect(res).toEqual([]);
		expect(res.length).toEqual(0);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return single property data when findBySql with SELECT statement for the user fixed", function(){
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
		var res = stgObj.findBySql("SELECT name FROM Student WHERE department = 'Electronics'");
		expect(res[0].name).toEqual("Arun");
		expect(res[1].name).toEqual("Nadaf");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return single property data when findBySql with 'SELECT' statement for the local fixed", function(){
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
			"age":28,
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
		var res = stgObj.findBySql("SELECT age FROM Student WHERE department = 'Electronics'");
		expect(res[0].age).toEqual("29");
		expect(res[1].age).toEqual("28");
		expect(res.length).toEqual(2);
		console.log("res : " + JSON.stringify(res));
	});
	it("Should return single property data when findBySql with 'SELECT' statement for the app fixed schema", function(){
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
		var res = stgObj.findBySql("SELECT percentage FROM Student WHERE name = 'Arun'");
		expect(res[0].percentage).toEqual("95");
		expect(res.length).toEqual(1);
		console.log("res : " + JSON.stringify(res));
	});
});
describe("new constructor test set :", function(){
	var reset = function(){
		Rho.NewORMModel.clear();
		var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("ProductInst")){
				console.log("Found ProductInst !");
				db2.executeSql("DROP TABLE ProductInst");
			}
		});
	};
	it("Should create new user fixed schema model using constructor", function(){
		reset();
		runs(function(){
			var myObjInstance = new Rho.NewORMModel('ProductInst');
			myObjInstance.setModelProperty("name", "string", "");
			myObjInstance.setModelProperty("quantity", "string", "");
			myObjInstance.setModelProperty("price", "string", "");
			myObjInstance.setProperties({
					"partition":"user",
					"freezed":true,
					"sync_priority":1000,
					"associations":"",
					"blob_attribs":"",
					"fixed_schema":true,
					"full_update":"",
				});
			myObjInstance.initModel();
			myObjInstance.saveObject("asdfasdf", {"name":"Nike", "quantity":"20", "price":"2000"});
			myObjInstance.createInstance({"name":"Nike", "quantity":"20", "price":"2000"});
			console.log("Count : " + myObjInstance.getCount());
			var res = Rho.NewORMModel.enumerate();
			console.log("result : " + JSON.stringify(res));
			expect(res.length).toEqual(1);
			expect(res[0].partition).toEqual("user");
		});
	});
});
describe("create test set : ", function(){
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
	it("Should create for the user object  with Fixed Schema", function(){
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
		var objData = prdObj.create({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = userDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should create for the user object  with Property bag", function(){
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
		var objData = prdObj.create({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = userDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should create for the local object  with Fixed Schema", function(){
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
		var objData = prdObj.create({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = localDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should create for the local object  with Property bag", function(){
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
		var objData = prdObj.create({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = localDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should create for the app object  with Fixed Schema", function(){
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
		var objData = prdObj.create({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = appDB.executeSql("SELECT * FROM Product");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
	it("Should create for the local object  with Property bag", function(){
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
		var objData = prdObj.create({"name":"arun", "age":20, "male":true});
		console.log("objData : " + JSON.stringify(objData));
		var res = appDB.executeSql("SELECT * FROM OBJECT_VALUES");
		console.log("res : " + JSON.stringify(res));
		expect(prdObj.getCount()).toEqual(1);
	});
});
describe("updateAttributes test set : ", function(){
	beforeEach(function(){
		Rho.NewORMModel.clear();
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		userDB.executeSql("DELETE FROM CHANGED_VALUES");

	});

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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Nadaf", "age":40, "male":true, "height":180.5});
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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Arun", "age":30, "male":true, "height":170.5});
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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Nadaf", "age":40, "male":true, "height":180.5});
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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Arun", "age":30, "male":true, "height":170.5});
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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Nadaf", "age":40, "male":true, "height":180.5});
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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Arun", "age":30, "male":true, "height":170.5});
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
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		var Person = function(model){
			model.setModelProperty("name", "String", "");
			model.setModelProperty("age", "Integer", "");
			model.setModelProperty("male", "boolean", "");
			model.setModelProperty("height", "Float", "");
			model.set('partition', 'user');
		};
		var perObj = Rho.ORM.addModel("Personpb", Person);
		perObj.create({"name":"Arun", "age": "30", "male":"true", "height":"170.5"});
		var resObj = perObj.find("all",{"conditions":{"name":"Arun"}});
		console.log(resObj[0]);
		resObj[0].updateAttributes({"name":"Nadaf", "age":"40", "male":"true", "height":"180.5"});
		var resObj1 = perObj.find("all",{"conditions":{"name":"Nadaf"}});
		console.log(resObj1[0]);
		expect(resObj[0].name).toEqual("Nadaf");
		expect(resObj[0].age).toEqual("40");
		expect(resObj[0].male).toEqual("true");
		expect(resObj[0].height).toEqual("180.5");// float converts to string with six digits after decimal point.
		expect(resObj[0].object).toEqual(resObj1[0].object);
	});

	it("should update an existing object with the same values in userPB", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CLIENT_INFO");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		var Person = function(model){
			model.setModelProperty("name", "String", "");
			model.setModelProperty("age", "Integer", "");
			model.setModelProperty("male", "boolean", "");
			model.setModelProperty("height", "Float", "");
			model.set('partition', 'user');
		};
		var perObj = Rho.ORM.addModel("Person", Person);
		perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
		var resObj = perObj.find("all");
		resObj[0].updateAttributes({"name":"Arun", "age":30, "male":true, "height":170.5});
		var resObj1 = perObj.find("all");
		console.log("resObj : " + JSON.stringify(resObj));
		expect(resObj1[0].name).toEqual("Arun");
		expect(resObj1[0].age).toEqual("30");
		expect(resObj1[0].male).toEqual("true");
		expect(resObj1[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
		expect(resObj1[0].object).toEqual(resObj[0].object);

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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Nadaf", "age":40, "male":true, "height":180.5});
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
			perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var resObj = perObj.find("all");
			resObj[0].updateAttributes({"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj1 = perObj.find("all");
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj1[0].name).toEqual("Arun");
			expect(resObj1[0].age).toEqual("30");
			expect(resObj1[0].male).toEqual("true");
			expect(resObj1[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj1[0].object).toEqual(resObj[0].object);
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
			var objData = perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			objData.updateAttributes({"name":"Nadaf", "age":40, "male":true, "height":180.5});
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
			perObj.create({"name":"Arun", "age": 30, "male":true, "height":170.5});
			var resObj = perObj.find("all");
			resObj[0].updateAttributes({"name":"Arun", "age":30, "male":true, "height":170.5});
			var resObj1 = perObj.find("all");
			console.log("resObj : " + JSON.stringify(resObj));
			expect(resObj1[0].name).toEqual("Arun");
			expect(resObj1[0].age).toEqual("30");
			expect(resObj1[0].male).toEqual("true");
			expect(resObj1[0].height).toEqual("170.500000");// float converts to string with six digits after decimal point.
			expect(resObj1[0].object).toEqual(resObj[0].object);
		});
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
describe("Enumerate  and clear test set : ", function(){
	var reset = function() {
		Rho.NewORMModel.clear();
	    var partitions = Rho.ORM.getDbPartitions();
	    $.each(partitions, function(index, db2){
			db2.executeSql("DELETE FROM SOURCES");
			db2.executeSql("DELETE FROM OBJECT_VALUES");
			db2.executeSql("DELETE FROM CHANGED_VALUES");
			if(db2.isTableExist("Product1")){
				console.log("Found Product1 !");
				db2.executeSql("DROP TABLE Product1");
			}
			if(db2.isTableExist("Product2")){
				console.log("Found Product2 !");
				db2.executeSql("DROP TABLE Product2");
			}
			if(db2.isTableExist("Product3")){
				console.log("Found Product3 !");
				db2.executeSql("DROP TABLE Product3");
			}
	  	});
	  };
	it("should enumerate all the models with the application with fixed schema", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "local");
			};
			var Product3 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "app");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var prdObj2 = Rho.ORM.addModel("Product2", Product2);
			var prdObj3 = Rho.ORM.addModel("Product3", Product3);

			var res = Rho.NewORMModel.enumerate();
			for(var i in res){
				console.log("Enumerate res : " + i + " : " + res[i].model_name);
			}
			expect(res.length).toEqual(3);
		});
	});
	
	it("should enumerate all the models with the application with property bag.", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
			};
			var Product2 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "local");
			};
			var Product3 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "app");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var prdObj2 = Rho.ORM.addModel("Product2", Product2);
			var prdObj3 = Rho.ORM.addModel("Product3", Product3);
			var res = Rho.NewORMModel.enumerate();
			expect(res.length).toEqual(3);
		});
	});

	it("should clear all the created fixed schema models with the application.", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
			};
			var Product2 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "local");
			};
			var Product3 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "app");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var prdObj2 = Rho.ORM.addModel("Product2", Product2);
			var prdObj3 = Rho.ORM.addModel("Product3", Product3);
			Rho.NewORMModel.clear();
			var res = Rho.NewORMModel.enumerate();
			expect(res.length).toEqual(0);
		});
	});
	
	it("should clear all the property bag models with the application.", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
			};
			var Product2 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "local");
			};
			var Product3 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "app");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var prdObj2 = Rho.ORM.addModel("Product2", Product2);
			var prdObj3 = Rho.ORM.addModel("Product3", Product3);
			var oldres = Rho.NewORMModel.enumerate();
			expect(oldres.length).toEqual(3);
			Rho.NewORMModel.clear();
			var res = Rho.NewORMModel.enumerate();
			expect(res.length).toEqual(0);
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
describe("getProperties test set : ", function(){
	var reset = function() {
	    Rho.NewORMModel.clear();
	  };
	it("should get all properties of the model : userFs", function(){
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
				model.set("sync_type", "incremental");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCBUserFs = function(data1){
				console.log("Properties CB: " + JSON.stringify(data1));
				expect(data1.partition).toEqual('user');
				expect(data1.sync_type).toEqual('incremental');
				expect(data1.associations).toEqual('');
				expect(data1.blob_attribs).toEqual('');
				expect(data1.fixed_schema).toEqual('true');
				expect(data1.freezed).toEqual('true');
				expect(data1.loaded).toEqual('true');
				expect(data1.sync_priority).toEqual('1000');
				expect(data1.full_update).toEqual('');
				expect(data1.model_name).toEqual("Product1");
				expect(data1.schema_version).toEqual("");
				expect(data1.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCBUserFs);
		});
	});
	it("should get all properties of the model : localFs", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "local");
				model.set("sync_type", "none");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCBlocalFs = function(data2){
				console.log("Properties CB: " + JSON.stringify(data2));
				expect(data2.partition).toEqual('local');
				expect(data2.sync_type).toEqual('none');
				expect(data2.associations).toEqual('');
				expect(data2.blob_attribs).toEqual('');
				expect(data2.fixed_schema).toEqual('true');
				expect(data2.freezed).toEqual('true');
				expect(data2.loaded).toEqual('true');
				expect(data2.sync_priority).toEqual('1000');
				expect(data2.full_update).toEqual('');
				expect(data2.model_name).toEqual("Product1");
				expect(data2.schema_version).toEqual("");
				expect(data2.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCBlocalFs);
		});
	});
	it("should get all properties of the model : appFs", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "app");
				model.set("sync_type", "none");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCBAppFs = function(data3){
				console.log("Properties CB: " + JSON.stringify(data3));
				expect(data3.partition).toEqual('app');
				expect(data3.sync_type).toEqual('none');
				expect(data3.associations).toEqual('');
				expect(data3.blob_attribs).toEqual('');
				expect(data3.fixed_schema).toEqual('true');
				expect(data3.freezed).toEqual('true');
				expect(data3.loaded).toEqual('true');
				expect(data3.sync_priority).toEqual('1000');
				expect(data3.full_update).toEqual('');
				expect(data3.model_name).toEqual("Product1");
				expect(data3.schema_version).toEqual("");
				expect(data3.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCBAppFs);
		});
	});
	it("should get all properties of the model : userPb", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
				model.set("sync_type", "incremental");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCB = function(data4){
				console.log("Properties CB: " + JSON.stringify(data4));
				expect(data4.partition).toEqual('user');
				expect(data4.sync_type).toEqual('incremental');
				expect(data4.associations).toEqual('');
				expect(data4.blob_attribs).toEqual('');
				expect(data4.fixed_schema).toEqual('false');
				expect(data4.freezed).toEqual('false');
				expect(data4.loaded).toEqual('true');
				expect(data4.sync_priority).toEqual('1000');
				expect(data4.full_update).toEqual('');
				expect(data4.model_name).toEqual("Product1");
				expect(data4.schema_version).toEqual("");
				expect(data4.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCB);
		});
	});
	it("should get all properties of the model : localPb", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "local");
				model.set("sync_type", "none");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCBLocalPb = function(data5){
				console.log("Properties CB: " + JSON.stringify(data5));
				expect(data5.partition).toEqual('local');
				expect(data5.sync_type).toEqual('none');
				expect(data5.associations).toEqual('');
				expect(data5.blob_attribs).toEqual('');
				expect(data5.fixed_schema).toEqual('false');
				expect(data5.freezed).toEqual('false');
				expect(data5.loaded).toEqual('true');
				expect(data5.sync_priority).toEqual('1000');
				expect(data5.full_update).toEqual('');
				expect(data5.model_name).toEqual("Product1");
				expect(data5.schema_version).toEqual("");
				expect(data5.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCBLocalPb);
		});
	});
	it("should get all properties of the model : appPb", function(){
		reset();
		var result;
		var cbTriggered = false;
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "app");
				model.set("sync_type", "none");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCBAppPb = function(data6){
				console.log("Properties CB: " + JSON.stringify(data6));
				result = data6;
				cbTriggered = true;
			};
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCBAppPb);
		});
		waitsFor(function(){
			return cbTriggered;
		}, 30000, "Wait for call back to trigger");
		runs(function(){
			console.log("result : " + JSON.stringify(result))
			expect(result.partition).toEqual('app');
			expect(result.sync_type).toEqual('none');
			expect(result.associations).toEqual('');
			expect(result.blob_attribs).toEqual('');
			expect(result.fixed_schema).toEqual('false');
			expect(result.freezed).toEqual('false');
			expect(result.loaded).toEqual('true');
			expect(result.sync_priority).toEqual('1000');
			expect(result.full_update).toEqual('');
			expect(result.model_name).toEqual("Product1");
			expect(result.schema_version).toEqual("");
			expect(result.pass_through).toEqual("");
		});
	});
	it("should return empty object when no parameters are passed with getProperties.", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
				model.set("sync_type", "none");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCB2 = function(data7){
				console.log("Properties CB: empty " + JSON.stringify(data7));
				expect(data7).toEqual({});
			};
			var res = prdObj1.getProperties([], propCB2);
		});
	});	
});
describe("setProperties test set : ", function(){
	var reset = function() {
	    Rho.NewORMModel.clear();
	  };
	it("should get all properties of the model : userFs", function(){
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.setProperties({
					"partition":"user",
					"freezed":true,
					"sync_priority":1000,
					"associations":"",
					"blob_attribs":"",
					"fixed_schema":true,
					"full_update":"",
				});
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCBUserFs = function(data1){
				console.log("Properties CB: " + JSON.stringify(data1));
				expect(data1.partition).toEqual('user');
				expect(data1.sync_type).toEqual('incremental');
				expect(data1.associations).toEqual('');
				expect(data1.blob_attribs).toEqual('');
				expect(data1.fixed_schema).toEqual('true');
				expect(data1.freezed).toEqual('true');
				expect(data1.loaded).toEqual('true');
				expect(data1.sync_priority).toEqual('1000');
				expect(data1.full_update).toEqual('');
				expect(data1.model_name).toEqual("Product1");
				expect(data1.schema_version).toEqual("");
				expect(data1.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCBUserFs);
		});
	});
	
	it("should get all properties of the model : userPb", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.setProperties({
					"partition":"user",
					"freezed":false,
					"sync_priority":3000,
					"associations":"",
					"blob_attribs":"",
					"fixed_schema":false,
					"full_update":"",
				});
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propCB = function(data4){
				console.log("Properties CB: " + JSON.stringify(data4));
				expect(data4.partition).toEqual('user');
				expect(data4.sync_type).toEqual('incremental');
				expect(data4.associations).toEqual('');
				expect(data4.blob_attribs).toEqual('');
				expect(data4.fixed_schema).toEqual('false');
				expect(data4.freezed).toEqual('false');
				expect(data4.loaded).toEqual('true');
				expect(data4.sync_priority).toEqual('1000');
				expect(data4.full_update).toEqual('');
				expect(data4.model_name).toEqual("Product1");
				expect(data4.schema_version).toEqual("");
				expect(data4.pass_through).toEqual("");
			}
			var res = prdObj1.getProperties(['partition','associations', 'blob_attribs', 'fixed_schema', 'freezed', 'full_update', 'loaded', 'model_name', 'pass_through', 'schema_version', 'sync_priority', 'sync_type'], propCB);
		});
	});
	it("should throw an exception when no parameters are passed with setProperties.", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			var error = ""
			try{
				prdObj1.setProperties();
			} catch(err){
				error = err;
			}
			expect(error).toEqual("Wrong number of arguments: 0 instead of 1");
		});
	});	
});

describe("getProperty and setProperty test set : ", function(){
	var reset = function() {
	    Rho.NewORMModel.clear();
	  };
	it("should set and get individual property of the model : userFs", function(){
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.setProperty("partition","user");
			prdObj1.setProperty("freezed","true");
			prdObj1.setProperty("sync_priority","1000");
			prdObj1.setProperty("associations","");
			prdObj1.setProperty("blob_attribs","");
			prdObj1.setProperty("fixed_schema","true");
			prdObj1.setProperty("full_update","");
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propPartition = function(data1){
				expect(data1.partition).toEqual('user');
			}
			var res = prdObj1.getProperty('partition', propPartition);
			expect(prdObj1.getProperty('freezed')).toEqual('true');
			expect(prdObj1.getProperty('sync_priority')).toEqual('1000');
			expect(prdObj1.getProperty('associations')).toEqual('');
			expect(prdObj1.getProperty('blob_attribs')).toEqual('');
			expect(prdObj1.getProperty('full_update')).toEqual('');
			expect(prdObj1.getProperty('fixed_schema')).toEqual('true');
		});
	});
	
	it("should get all properties of the model : userPb", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			prdObj1.setProperty("partition","user");
			prdObj1.setProperty("freezed","true");
			prdObj1.setProperty("sync_priority","1000");
			prdObj1.setProperty("associations","");
			prdObj1.setProperty("blob_attribs","");
			prdObj1.setProperty("fixed_schema","false");
			prdObj1.setProperty("full_update","");
			prdObj1.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var propPartition = function(data1){
				expect(data1.partition).toEqual('user');
			}
			var res = prdObj1.getProperty('partition', propPartition);
			var freez = prdObj1.getProperty('freezed');
			expect(freez).toEqual('true');
			expect(prdObj1.getProperty('sync_priority')).toEqual('1000');
			expect(prdObj1.getProperty('associations')).toEqual('');
			expect(prdObj1.getProperty('blob_attribs')).toEqual('');
			expect(prdObj1.getProperty('full_update')).toEqual('');
			expect(prdObj1.getProperty('fixed_schema')).toEqual('false');
		});
	});

	it("should throw an exception when no parameters are passed with setProperty.", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = false;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
			};
			var prdObj1 = Rho.ORM.addModel("Product1", Product1);
			var error = ""
			try{
				prdObj1.setProperty();
			} catch(err){
				error = err;
			}
			expect(error).toEqual("Wrong number of arguments: 0 instead of 2");
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
			runs(function(){
				var ProductUs = function(model){
				 	model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "integer", "");
					model.setModelProperty("price", "integer", "");
					model.setModelProperty("availability", "string", "");
					model.setModelProperty("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
				prdObj.deleteAll();
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
					prdObj.createObject(data[i]);
				}
				expect(prdObj.getCount()).toEqual(4);
				var res = prdObj.find("all");
				var count = prdObj.find("count");
				var first = prdObj.find("first");
				console.log("find Result : " + JSON.stringify(first));
				expect(res[0].name).toEqual('nike');
				expect(res[0].quantity).toEqual('20');
				expect(res[0].price).toEqual("2000");
				expect(count).toEqual(4);
				expect(first.name).toEqual("nike");
				expect(first.quantity).toEqual("20");
				expect(first.price).toEqual("2000");
				expect(first.availability).toEqual("yes");
			});
		});
		it("Should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(user)",function(){
			runs(function(){
				var ProductUs = function(model){
				 	model.fixed_schema = true;
					model.setModelProperty("name", "string", "");
					model.setModelProperty("quantity", "integer", "");
					model.setModelProperty("price", "integer", "");
					model.setModelProperty("availability", "string", "");
					model.setModelProperty("partition", "user");
				};
				var prdObj = Rho.ORM.addModel("ProductUs", ProductUs);
				prdObj.deleteAll();
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
		});
		it("Should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(user)",function(){
			runs(function(){
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
		});
		it("Should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(user).", function(){
			runs(function(){
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
		});
		it("Should throw exception when null parameters are passed with fixed schema(user).",function(){
			runs(function(){
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
		});
		it("Should find all the objects when empty parameters are passed with fixed schema(user).", function(){
			runs(function(){
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
			});
		});
		it("Should throw exception when first parameter is passed as empty with fixed schema(user)", function(){
			runs(function(){
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
		});
		it("Should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(user)", function(){
			runs(function(){
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
			runs(function(){
				var ProductApp = function(model){
			 	model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "integer", "");
				model.setModelProperty("price", "integer", "");
				model.setModelProperty("availability", "string", "");
				model.setModelProperty("partition", "app");
			};
			var prdObj = Rho.ORM.addModel("ProductApp", ProductApp);
			prdObj.deleteAll();
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
				prdObj.create(data[i]);
			}
			expect(prdObj.getCount()).toEqual(4);
			var resCount = prdObj.find("count");
			var resFirst = prdObj.find("first");
			console.log("Empty parameter : " + JSON.stringify(resFirst));
			expect(resCount).toEqual(4);
			});
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
describe("Push Changes tests: ", function(){
	var appDB = Rho.ORMHelper.dbConnection('app');
	var userDB = Rho.ORMHelper.dbConnection('user');
	var reset = function(){
		userDB.executeSql("DELETE FROM SOURCES");
		userDB.executeSql("DELETE FROM CHANGED_VALUES");
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		if(appDB.isTableExist('ProductApp'))
			appDB.executeSql("DELETE FROM ProductApp");
	};

	it("Push changes FS", function(){
		var myNewProduct = function(model){
			model.setModelProperty("name", "string", "");
			model.setModelProperty("quantity", "string", "");
			model.set("partition", "user");
			model.enable("sync");
		}
		var prdObj = Rho.ORM.addModel('myNewProduct', myNewProduct);
		prdObj.pushChanges();
		var changedValues = userDB.executeSql("SELECT * FROM CHANGED_VALUES");
		console.log("Changed Value : " + JSON.stringify(changedValues));
		expect(changedValues[0].update_type).toEqual('push_changes');
	});
});



	