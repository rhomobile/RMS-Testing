describe("Ruby test spec 2 : ", function(){
	describe("Ruby : findBySql", function(){
		var userDB = Rho.ORMHelper.dbConnection('user');
	    var localDB = Rho.ORMHelper.dbConnection('local');
	    var appDB = Rho.ORMHelper.dbConnection('app');
	    it("VTID-061 : It should find_by_sql for the user fixed schema model", function(){
	        runs(function(){
	            if(userDB.isTableExist("FindBySql")){
	                console.log("findBySql table found");
	                userDB.executeSql("DELETE FROM findBySql");
	            }
	            Ruby.call('FindBySql','testcase1');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(3);
	        });
	    });
	    it("VTID-062 : It should find_by_sql for the local fixed schema model", function(){
	        runs(function(){
	            if(localDB.isTableExist("FindBySqlLocal")){
	                console.log("findBySql table found");
	                localDB.executeSql("DELETE FROM FindBySqlLocal");
	            }
	            Ruby.call('FindBySql','testcase2');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(3);
	        });
	    });
	    it("VTID-063 : It should find_by_sql for the app fixed schema model", function(){
	        runs(function(){
	            if(appDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                appDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase3');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(3);
	        });
	    });
	    it("VTID-064 : It should find_by_sql with 'WHERE' clause for the user fixed schema model", function(){

	        runs(function(){
	            if(userDB.isTableExist("findBySql")){
	                console.log("findBySql table found");
	                userDB.executeSql("DELETE FROM findBySql");
	            }
	            Ruby.call('FindBySql','testcase4');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(2);
	        });
	    
	    });
	    it("VTID-065 : It should find_by_sql with 'WHERE' clause for the user local schema model", function(){

	        runs(function(){
	            if(localDB.isTableExist("FindBySqlLocal")){
	                console.log("findBySql table found");
	                localDB.executeSql("DELETE FROM FindBySqlLocal");
	            }
	            Ruby.call('FindBySql','testcase5');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(2);
	        });
	    
	    });
	    it("VTID-066 : It should find_by_sql with 'WHERE' clause for the user app schema model", function(){

	        runs(function(){
	            if(appDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                appDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase6');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(2);
	        });
	    
	    });
	    it("VTID-067 : It should return null when find_by_sql with 'WHERE' clause for the user fixed schema model does not return anything", function(){
	        runs(function(){
	            if(userDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                userDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase7');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(0);
	        });
	    });
	    it("VTID-068 : It should return null when find_by_sql with 'WHERE' clause for the local fixed schema model does not return anything", function(){
	        runs(function(){
	            if(localDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                localDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase8');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(0);
	        });
	    });
	    it("VTID-069 : It should return null when find_by_sql with 'WHERE' clause for the app fixed schema model does not return anything", function(){
	        runs(function(){
	            if(appDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                appDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase9');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            expect(result.length).toEqual(0);
	        });
	    });
	    it("VTID-070 : It should return single property data when find_by_sql with SELECT statement for the user fixed", function(){
	        runs(function(){
	            if(userDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                userDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase10');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            console.log(result);
	            expect(result.length).toEqual(2);
	        });
	    });
	    it("VTID-071 : It should return single property data when find_by_sql with SELECT statement for the local fixed", function(){
	        runs(function(){
	            if(localDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                localDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase11');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            console.log(result);
	            expect(result.length).toEqual(2);
	        });
	    });
	    it("VTID-072 : It should return single property data when find_by_sql with SELECT statement for the app fixed", function(){
	        runs(function(){
	            if(appDB.isTableExist("FindBySqlApp")){
	                console.log("findBySql table found");
	                appDB.executeSql("DELETE FROM FindBySqlApp");
	            }
	            Ruby.call('FindBySql','testcase12');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result)
	            console.log(result);
	            expect(result.length).toEqual(1);
	        });
	    });
	});
	describe("Ruby : Enumerate and clear test set : ", function(){
	    it("Enumerate all the models available with the appliation", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase160');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.enumerate.length).toEqual(1);
	        });
	    });
	});

	describe("Ruby : enable", function(){
		it("VTID-103 : It should enable all the boolean properties with user model fixed schema", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase49');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.associations).toEqual("");
	            expect(result.blob_attribs).toEqual("");
	            expect(result.fixed_schema).toEqual("true");
	            expect(result.freezed).toEqual("true");
	            expect(result.full_update).toEqual("true");
	            expect(result.loaded).toEqual("true");
	            expect(result.model_name).toEqual("ProductUserFs");
	            expect(result.partition).toEqual("user");
	            expect(result.pass_through).toEqual("true");
	            expect(result.sync_priority).toEqual("1000");
	            expect(result.sync_type).toEqual("incremental");
	        });
	    });
	    it("VTID-104 : It should enable all the boolean properties with local model fixed schema", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase50');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.associations).toEqual("");
	            expect(result.blob_attribs).toEqual("");
	            expect(result.fixed_schema).toEqual("true");
	            expect(result.freezed).toEqual("true");
	            expect(result.full_update).toEqual("true");
	            expect(result.loaded).toEqual("true");
	            expect(result.model_name).toEqual("ProductLocalFs");
	            expect(result.partition).toEqual("local");
	            expect(result.pass_through).toEqual("true");
	            expect(result.sync_priority).toEqual("1000");
	            expect(result.sync_type).toEqual("none");
	        });
	    });
	    it("VTID-105 : It should enable all the boolean properties with app model fixed schema", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase51');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.associations).toEqual("");
	            expect(result.blob_attribs).toEqual("");
	            expect(result.fixed_schema).toEqual("true");
	            expect(result.freezed).toEqual("true");
	            expect(result.full_update).toEqual("true");
	            expect(result.loaded).toEqual("true");
	            expect(result.model_name).toEqual("ProductAppFs");
	            expect(result.partition).toEqual("app");
	            expect(result.pass_through).toEqual("true");
	            expect(result.sync_priority).toEqual("1000");
	            expect(result.sync_type).toEqual("bulk_only");
	        });
	    });
	    it("VTID-106 : It should enable all the boolean properties with user model property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase52');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.associations).toEqual("");
	            expect(result.blob_attribs).toEqual("");
	            expect(result.fixed_schema).toEqual("false");
	            expect(result.freezed).toEqual("true");
	            expect(result.full_update).toEqual("true");
	            expect(result.loaded).toEqual("true");
	            expect(result.model_name).toEqual("ProductUserPb");
	            expect(result.partition).toEqual("user");
	            expect(result.pass_through).toEqual("true");
	            expect(result.sync_priority).toEqual("1000");
	            expect(result.sync_type).toEqual("incremental");
	        });
	    });
	    it("VTID-107 : It should enable all the boolean properties with local model property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase53');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.associations).toEqual("");
	            expect(result.blob_attribs).toEqual("");
	            expect(result.fixed_schema).toEqual("false");
	            expect(result.freezed).toEqual("true");
	            expect(result.full_update).toEqual("true");
	            expect(result.loaded).toEqual("true");
	            expect(result.model_name).toEqual("ProductLocalPb");
	            expect(result.partition).toEqual("local");
	            expect(result.pass_through).toEqual("true");
	            expect(result.sync_priority).toEqual("1000");
	            expect(result.sync_type).toEqual("none");
	        });
	    });
	    it("VTID-108 : It should enable all the boolean properties with app model property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase54');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.associations).toEqual("");
	            expect(result.blob_attribs).toEqual("");
	            expect(result.fixed_schema).toEqual("false");
	            expect(result.freezed).toEqual("true");
	            expect(result.full_update).toEqual("true");
	            expect(result.loaded).toEqual("true");
	            expect(result.model_name).toEqual("ProductAppPb");
	            expect(result.partition).toEqual("app");
	            expect(result.pass_through).toEqual("true");
	            expect(result.sync_priority).toEqual("1000");
	            expect(result.sync_type).toEqual("bulk_only");
	        });
	    });
	});
	describe("Ruby : enumerate", function(){
		it("Enumerate all the models available with the appliation", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase160');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.enumerate.length).toEqual(1);
	        });
	    });
	});
	describe("Ruby : getBackendRefreshTime", function(){
		it("VTID-083 : It should get the default value of time stamp for a non synced sync model with fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase29');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log("Time : " + result.time);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-084 : It should get the default value of time stamp for a non sync model with fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase30');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-085 : It should get the default value of time stamp for a local model with fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase31');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-086 : It should get the default value of time stamp for a app model with fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase32');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-087 : It should get the default value of time stamp for a non synced sync model with property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase33');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-088 : It should get the default value of time stamp for a non sync model with property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase34');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-089 : It should get the default value of time stamp for a local model with property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase35');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	    it("VTID-090 : It should get the default value of time stamp for a app model with property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase36');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            var results = result.time.match(/1970/g);
	            expect(results[0]).toEqual("1970");
	        });
	    });
	});
	describe("Ruby : getBelongsTo", function(){
	    it("VTID-091 : It should return null when no model is belongs to the instance user model fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase38');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(null);
	        });
	    });
	    it("VTID-092 : It should get the associated or belongs to user model fixed schema", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase37');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo[0]).toEqual('ItemFs');
	        });
	    });
	    
	    it("VTID-093 : It should return null when no model is belongs to the instance local model fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase40');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(null);
	        });
	    });
	    it("VTID-094 : It should get the associated or belongs to local model fixed schema", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase39');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(['ItemFs']);
	        });
	    });
	    
	    it("VTID-095 : It should return null when no model is belongs to the instance app model fixed schema.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase42');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(null);
	        });
	    });
	    it("VTID-096 : It should get the associated or belongs to app model fixed schema", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase41');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(['ItemFs']);
	        });
	    });
	    
	    it("VTID-097 : It should return null when no model is belongs to the instance user model Property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase44');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(null);
	        });
	    });
	    it("VTID-098 : It should get the associated or belongs to user model Property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase43');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(['ItemFs']);
	        });
	    });
	    
	    it("VTID-099 : It should return null when no model is belongs to the instance local model Property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase46');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(null);
	        });
	    });
	    it("VTID-100 : It should get the associated or belongs to local model Property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase45');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(['ItemFs']);
	        });
	    });
	    
	    it("VTID-101 : It should return null when no model is belongs to the instance app model Property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase48');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(null);
	        });
	    });
	    it("VTID-102 : It should get the associated or belongs to app model Property bag.", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase47');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            expect(result.belongsTo).toEqual(['ItemFs']);
	        });
	    });
	});
	describe("Ruby : getModelProperty", function(){
		it("Should get value of string property using getModelProperty userFS", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase145');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.name.name).toEqual("name");
	            expect(result.name.option).toEqual("");
	            expect(result.name.type).toEqual("string");
	            expect(result.quantity.name).toEqual("quantity");
	            expect(result.quantity.option).toEqual("");
	            expect(result.quantity.type).toEqual("string");
	        });
	    });
	    it("Should get value of string property using getModelProperty localFS", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase146');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.name.name).toEqual("name");
	            expect(result.name.option).toEqual("");
	            expect(result.name.type).toEqual("string");
	            expect(result.quantity.name).toEqual("quantity");
	            expect(result.quantity.option).toEqual("");
	            expect(result.quantity.type).toEqual("string");
	        });
	    });
	    it("Should get value of string property using getModelProperty appFS", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase147');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.name.name).toEqual("name");
	            expect(result.name.option).toEqual("");
	            expect(result.name.type).toEqual("string");
	            expect(result.quantity.name).toEqual("quantity");
	            expect(result.quantity.option).toEqual("");
	            expect(result.quantity.type).toEqual("string");
	        });
	    });
	    it("Should get value of string property using getModelProperty userPB", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase148');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.name.name).toEqual("name");
	            expect(result.name.option).toEqual("");
	            expect(result.name.type).toEqual("string");
	            expect(result.quantity.name).toEqual("quantity");
	            expect(result.quantity.option).toEqual("");
	            expect(result.quantity.type).toEqual("string");
	        });
	    });
	    it("Should get value of string property using getModelProperty localPB", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase149');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.name.name).toEqual("name");
	            expect(result.name.option).toEqual("");
	            expect(result.name.type).toEqual("string");
	            expect(result.quantity.name).toEqual("quantity");
	            expect(result.quantity.option).toEqual("");
	            expect(result.quantity.type).toEqual("string");
	        });
	    });
	    it("Should get value of string property using getModelProperty appPB", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase150');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.name.name).toEqual("name");
	            expect(result.name.option).toEqual("");
	            expect(result.name.type).toEqual("string");
	            expect(result.quantity.name).toEqual("quantity");
	            expect(result.quantity.option).toEqual("");
	            expect(result.quantity.type).toEqual("string");
	        });
	    });
	});
	describe("Ruby : setSchemaIndex", function(){

	});
	describe("Ruby : hasChanges", function(){
		it("should return true after modifying the object with the method hasChanges userFS", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase151');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.find[0].name).toEqual("Woodlands");
	            expect(result.find[0].quantity).toEqual("20");
	        });
	    });
	    it("should return true after modifying the object with the method hasChanges localFS", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase152');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.find[0].name).toEqual("Woodlands");
	            expect(result.find[0].quantity).toEqual("20");
	        });
	    });
	    it("should return true after modifying the object with the method hasChanges appFS", function(){
	        runs(function(){
	            Ruby.call('General', 'testcase153');
	            waits(3000);
	        });
	        runs(function(){
	            var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.find[0].name).toEqual("Woodlands");
	            expect(result.find[0].quantity).toEqual("20");
	        });
	    });
	});
});