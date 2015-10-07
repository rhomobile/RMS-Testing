describe("deleteObjectsPropertyBagByCondArray test set : ", function(){
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
			stObj.deleteObjectsPropertyBagByCondArray("",[],{},[]);
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
				stObj.deleteObjectsPropertyBagByCondArray();
			}catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 4")
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
			stObj.deleteObjectsPropertyBagByCondArray("name = ?", ["Arun"], {}, ["name"]);
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
			stObj.deleteObjectsPropertyBagByCondArray("name = ? AND age = ?", ["Arun","30"], {}, ["name", "age"]);
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
				stObj.deleteObjectsPropertyBagByCondArray("nonexisting = ?", ["Arun"], {}, ["nonexisting"]);
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
			stObj.deleteObjectsPropertyBagByCondArray("", [], {}, []);
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
				stObj.deleteObjectsPropertyBagByCondArray();
			}catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 4")
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
			stObj.deleteObjectsPropertyBagByCondArray("name = ?", ["Arun"], {}, ["name"]);
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
			stObj.deleteObjectsPropertyBagByCondArray("name = ? AND age = ?", ["Arun", "30"], {}, ["name", "age"]);
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
				stObj.deleteObjectsPropertyBagByCondArray("nonexisting = ?", ["Arun"], {}, ["nonexisting"]);
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
			stObj.deleteObjectsPropertyBagByCondArray("", [], {}, []);
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
				stObj.deleteObjectsPropertyBagByCondArray();
			}catch(err){
				expect(err).toEqual("Wrong number of arguments: 0 instead of 4")
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
			stObj.deleteObjectsPropertyBagByCondArray("name = ?", ["Arun"], {}, ["name"]);
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
			stObj.deleteObjectsPropertyBagByCondArray("name = ? AND age = ?", ["Arun","30"], {}, ["name", "age"]);
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
				stObj.deleteObjectsPropertyBagByCondArray("nonexisting = ?", ["Arun"], {}, ["nonexisting"]);
			}catch(err){
				error = err;
			}
			expect(stObj.getCount()).toEqual(3);
			expect(error).toEqual("");
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
describe("ValidateFreezed Attribute test set :", function(){
	var reset = function(){
		Rho.NewORMModel.clear();
		var userDB = Rho.ORMHelper.dbConnection('user');
		userDB.executeSql("DELETE FROM OBJECT_VALUES");
		userDB.executeSql("DELETE FROM Product1");
	}
	it("should throw an error when a new record is tried to added for a freezed model property bag", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
				model.set("freezed", "true");
			};
			var prdObj = Rho.ORM.addModel('Product1', Product1);
			prdObj.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			var error = "";
			try{
				prdObj.createObject({"name":"Woodlands", "quantity":"20", "price":"2000", "new":"newentry"});
			}catch(err){
				error = err
			}
			expect(error).toEqual("Non-exist property : new. For model: Product1");
		});
	});
	it("should throw an error when a new record is tried to added for a freezed model fixed schemma1", function(){
		reset();
		runs(function(){
			var Product1 = function(model){
				model.fixed_schema = true;
				model.setModelProperty("name", "string", "");
				model.setModelProperty("quantity", "string", "");
				model.setModelProperty("price", "string", "");
				model.set("partition", "user");
				model.set("freezed", "true");
			};
			var prdObj = Rho.ORM.addModel('Product1', Product1);
			prdObj.freezed = true;
			prdObj.createObject({"name":"Nike", "quantity":"20", "price":"2000"});
			prdObj.setProperty('freezed', 'true');
			var error = "";
			try{
				prdObj.createObject({"name":"Woodlands", "quantity":"20", "price":"2000", "new":"newentry"});
			}catch(err){
				error = err
				alert(err);
			}
			expect(error).toEqual("Non-exist property : new. For model: Product1");
		});
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


