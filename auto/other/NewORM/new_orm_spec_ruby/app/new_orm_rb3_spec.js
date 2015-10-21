describe("getAllProperties test set : ", function(){
    var userDB = Rho.ORMHelper.dbConnection('user');
    var localDB = Rho.ORMHelper.dbConnection('local');
    var appDB = Rho.ORMHelper.dbConnection('app');
    it("VTID-073 : It should get all properties and values of the user model with Fixed schema.", function(){
        runs(function(){
            Ruby.call('General', 'testcase19');
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
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductUserFs");
            expect(result.partition).toEqual("user");
            expect(result.pass_through).toEqual("");
            expect(result.schema_version).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("none");
        });
    });
    it("VTID-074 : It should get all properties and values of the sync enabled user model with Fixed schema.", function(){
        runs(function(){
            Ruby.call('General', 'testcase20');
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
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductUserFs");
            expect(result.partition).toEqual("user");
            expect(result.pass_through).toEqual("");
            expect(result.schema_version).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("incremental");
        });
    });
    it("VTID-075 : It should get all properties and values of the sync enabled(bulk_only) user model with Fixed schema.", function(){
        runs(function(){
            Ruby.call('General', 'testcase21');
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
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductUserFs");
            expect(result.partition).toEqual("user");
            expect(result.pass_through).toEqual("");
            expect(result.schema_version).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("bulk_only");
        });
    });
    it("VTID-076 : It should get all properties and values of the local model with Fixed schema.", function(){
        runs(function(){
            Ruby.call('General', 'testcase22');
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
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductLocalFs");
            expect(result.partition).toEqual("local");
            expect(result.pass_through).toEqual("");
            expect(result.schema_version).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("none");
        });
    });
    it("VTID-077 : It should get all properties and values of the app model with Fixed schema.", function(){
        runs(function(){
            Ruby.call('General', 'testcase23');
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
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductAppFs");
            expect(result.partition).toEqual("app");
            expect(result.pass_through).toEqual("");
            expect(result.schema_version).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("none");
        });
    });
    it("VTID-078 : It should get all properties and values of the user model with Property bag.", function(){
        runs(function(){
            Ruby.call('General', 'testcase24');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.blob_attribs).toEqual("");
            expect(result.fixed_schema).toEqual("false");
            expect(result.freezed).toEqual("false");
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductUserPb");
            expect(result.partition).toEqual("user");
            expect(result.pass_through).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("none");
        });
    });
    it("VTID-079 : It should get all properties and values of the sync enabled user model with Property bag.", function(){
        runs(function(){
            Ruby.call('General', 'testcase25');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.blob_attribs).toEqual("");
            expect(result.fixed_schema).toEqual("false");
            expect(result.freezed).toEqual("false");
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductUserPb");
            expect(result.partition).toEqual("user");
            expect(result.pass_through).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("incremental");
        });
    });
    it("VTID-080 : It should get all properties and values of the sync enabled(bulk_only) user model with Property bag.", function(){
        runs(function(){
            Ruby.call('General', 'testcase26');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.blob_attribs).toEqual("");
            expect(result.fixed_schema).toEqual("false");
            expect(result.freezed).toEqual("false");
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductUserPb");
            expect(result.partition).toEqual("user");
            expect(result.pass_through).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("bulk_only");
        });
    });
    it("VTID-081 : It should get all properties and values of the local model with Property bag.", function(){
        runs(function(){
            Ruby.call('General', 'testcase27');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.blob_attribs).toEqual("");
            expect(result.fixed_schema).toEqual("false");
            expect(result.freezed).toEqual("false");
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductLocalPb");
            expect(result.partition).toEqual("local");
            expect(result.pass_through).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("none");
        });
    });
    it("VTID-082 : It should get all properties and values of the app model with Property bag.", function(){
        runs(function(){
            Ruby.call('General', 'testcase28');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.blob_attribs).toEqual("");
            expect(result.fixed_schema).toEqual("false");
            expect(result.freezed).toEqual("false");
            expect(result.full_update).toEqual("");
            expect(result.loaded).toEqual("true");
            expect(result.model_name).toEqual("ProductAppPb");
            expect(result.partition).toEqual("app");
            expect(result.pass_through).toEqual("");
            expect(result.sync_priority).toEqual("1000");
            expect(result.sync_type).toEqual("none");
        });
    });
});
describe("get and set properties test :", function(){
    it("Should get all the property of the newORMModel object with userFS", function(){
        runs(function(){
            Ruby.call('General', 'testcase154');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.fixed_schema).toEqual(true);
            expect(result.freezed).toEqual(true);
            expect(result.loaded).toEqual(true);
            expect(result.model_name).toEqual("ProductUserFs");
            expect(result.partition).toEqual("user");
            expect(typeof(result.source_id)).toEqual("number");
            expect(result.sync_priority).toEqual(1000);
            expect(result.sync_type).toEqual("none");
        });
    });
    it("Should set all the property of the newORMModel object with userFS", function(){
        runs(function(){
            Ruby.call('General', 'testcase155');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.fixed_schema).toEqual(true);
            expect(result.freezed).toEqual(true);
            expect(result.loaded).toEqual(true);
            expect(result.model_name).toEqual("ProductUserFs");
            expect(result.partition).toEqual("user");
            expect(typeof(result.source_id)).toEqual("number");
            expect(result.sync_priority).toEqual(2000);
            expect(result.sync_type).toEqual("incremental");
        });
    });
    it("Should get all the property of the newORMModel object with localFS", function(){
        runs(function(){
            Ruby.call('General', 'testcase156');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.fixed_schema).toEqual(true);
            expect(result.freezed).toEqual(true);
            expect(result.loaded).toEqual(true);
            expect(result.model_name).toEqual("ProductLocalFs");
            expect(result.partition).toEqual("local");
            expect(typeof(result.source_id)).toEqual("number");
            expect(result.sync_priority).toEqual(1000);
            expect(result.sync_type).toEqual("none");
        });
    });
    it("Should set all the property of the newORMModel object with localFS", function(){
        runs(function(){
            Ruby.call('General', 'testcase157');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.fixed_schema).toEqual(true);
            expect(result.freezed).toEqual(true);
            expect(result.loaded).toEqual(true);
            expect(result.model_name).toEqual("ProductLocalFs");
            expect(result.partition).toEqual("local");
            expect(typeof(result.source_id)).toEqual("number");
            expect(result.sync_priority).toEqual(2000);
            expect(result.sync_type).toEqual("none");
        });
    });
    it("Should get all the property of the newORMModel object with appFS", function(){
        runs(function(){
            Ruby.call('General', 'testcase158');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.fixed_schema).toEqual(true);
            expect(result.freezed).toEqual(true);
            expect(result.loaded).toEqual(true);
            expect(result.model_name).toEqual("ProductAppFs");
            expect(result.partition).toEqual("app");
            expect(typeof(result.source_id)).toEqual("number");
            expect(result.sync_priority).toEqual(1000);
            expect(result.sync_type).toEqual("none");
        });
    });
    it("Should set all the property of the newORMModel object with appFS", function(){
        runs(function(){
            Ruby.call('General', 'testcase159');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            console.log(result);
            expect(result.associations).toEqual("");
            expect(result.fixed_schema).toEqual(true);
            expect(result.freezed).toEqual(true);
            expect(result.loaded).toEqual(true);
            expect(result.model_name).toEqual("ProductAppFs");
            expect(result.partition).toEqual("app");
            expect(typeof(result.source_id)).toEqual("number");
            expect(result.sync_priority).toEqual(2000);
            expect(result.sync_type).toEqual("none");
        });
    });
});
describe("Ruby : paginate", function(){
    describe("userFs test set: ", function(){
        it("paginate with page and per_page :", function(){
            runs(function(){
                Ruby.call('General', 'testcase179');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(5);
                expect(result.page[0].name).toEqual("Nike");
                expect(result.page[0].quantity).toEqual("10");
            });
        });
        it("paginate with select : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase180');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(3);
                expect(result.page[0].name).toEqual("Nike");
                expect(result.page[0].quantity).toEqual(undefined);
            });
        });
        it("paginate with order and order dir : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase181');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(5);
                expect(result.page[0].name).toEqual("Woodlands");
                expect(result.page[0].quantity).toEqual("10");
                expect(result.page[3].name).toEqual("Puma");
                expect(result.page[4].name).toEqual("Nike");
            });
        });
        it("paginate with condition hash : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase182');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(3);
                expect(result.page[0].name).toEqual("Nike");
                expect(result.page[1].name).toEqual("Nike");
                expect(result.page[2].name).toEqual("Nike");
                expect(result.page[0].quantity).toEqual("30");
                expect(result.page[1].quantity).toEqual("20");
                expect(result.page[2].quantity).toEqual("10");
            });
        });
        it("paginate with condition Array : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase183');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(2);
                expect(result.page[0].name).toEqual("Woodlands");
                expect(result.page[1].name).toEqual("Woodlands");
                expect(result.page[0].quantity).toEqual("10");
                expect(result.page[1].quantity).toEqual("20");
            });
        });
        it("paginate with condition Array with quests : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase184');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(2);
                expect(result.page[0].name).toEqual("Woodlands");
                expect(result.page[1].name).toEqual("Woodlands");
                expect(result.page[0].quantity).toEqual("20");
                expect(result.page[1].quantity).toEqual("10");
            });
        });
    });
    describe("userPb test set: ", function(){
        it("paginate with page and per_page :", function(){
            runs(function(){
                Ruby.call('General', 'testcase185');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page[0].name).toEqual("Nike");
                expect(result.page[0].quantity).toEqual("10");
            });
        });
        it("paginate with select : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase186');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page[0].name).toEqual("Nike");
                expect(result.page[0].quantity).toEqual(undefined);
            });
        });
        it("paginate with order and order dir : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase187');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                expect(result.page[0].name).toEqual("Woodlands");
                expect(result.page[0].quantity).toEqual("20");
                expect(result.page[3].name).toEqual("Puma");
                expect(result.page[4].name).toEqual("Nike");
            });
        });
        it("paginate with condition hash : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase188');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(3);
                expect(result.page[0].name).toEqual("Nike");
                expect(result.page[1].name).toEqual("Nike");
                expect(result.page[2].name).toEqual("Nike");
                expect(result.page[0].quantity).toEqual("30");
                expect(result.page[1].quantity).toEqual("20");
                expect(result.page[2].quantity).toEqual("10");
            });
        });
        it("paginate with condition Array : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase189');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(2);
                expect(result.page[0].name).toEqual("Woodlands");
                expect(result.page[1].name).toEqual("Woodlands");
                expect(result.page[0].quantity).toEqual("10");
                expect(result.page[1].quantity).toEqual("20");
            });
        });
        it("paginate with condition Array with quests : ", function(){
            runs(function(){
                Ruby.call('General', 'testcase190');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.page.length).toEqual(2);
                expect(result.page[0].name).toEqual("Woodlands");
                expect(result.page[1].name).toEqual("Woodlands");
                expect(result.page[0].quantity).toEqual("20");
                expect(result.page[1].quantity).toEqual("10");
            });
        });
    });
});
describe("Ruby : update_attributes", function(){
	describe("userFS test set : ", function(){
		it("Should update all property of an existing attributes", function(){
			runs(function(){
	            Ruby.call('General', 'testcase171');
	            waits(3000);
	        });
	        runs(function(){
	        	var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.initialValue[0].name).toEqual("Nike");
	            expect(result.initialValue[0].quantity).toEqual("20");
	            expect(result.finalValue[0].name).toEqual("Woodlands");
	            expect(result.finalValue[0].quantity).toEqual("30");
	        });
		});
		it("Should update specific property of an existing attributes", function(){
			runs(function(){
	            Ruby.call('General', 'testcase172');
	            waits(3000);
	        });
	        runs(function(){
	        	var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.initialValue[0].name).toEqual("Nike");
	            expect(result.initialValue[0].quantity).toEqual("20");
	            expect(result.finalValue[0].name).toEqual("Woodlands");
	            expect(result.finalValue[0].quantity).toEqual("20");
	        });
		});
	});
	describe("userPB test set : ", function(){
		it("Should update all property of an existing attributes", function(){
			runs(function(){
	            Ruby.call('General', 'testcase173');
	            waits(3000);
	        });
	        runs(function(){
	        	var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.initialValue[0].name).toEqual("Nike");
	            expect(result.initialValue[0].quantity).toEqual("20");
	            expect(result.finalValue[0].name).toEqual("Woodlands");
	            expect(result.finalValue[0].quantity).toEqual("30");
	        });
		});
		it("Should update specific property of an existing attributes", function(){
			runs(function(){
	            Ruby.call('General', 'testcase174');
	            waits(3000);
	        });
	        runs(function(){
	        	var result = Ruby.getReturnedValue();
	            result = JSON.parse(result);
	            console.log(result);
	            expect(result.initialValue[0].name).toEqual("Nike");
	            expect(result.initialValue[0].quantity).toEqual("20");
	            expect(result.finalValue[0].name).toEqual("Woodlands");
	            expect(result.finalValue[0].quantity).toEqual("20");
	        });
		});
	});
});
describe("Ruby : haveLocalChanges test set : ", function(){
    var userDB = Rho.ORMHelper.dbConnection('user');
    var localDB = Rho.ORMHelper.dbConnection('local');
    beforeEach(function(){
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
    });
    it("VTID-031 : It Ruby: testcase1 : Call haveLocalChanges without having any model", function(){
        runs(function(){
            Ruby.call('HaveLocalChanges','testcase1');
            waits(3000);
        });
        runs(function(){
            expect(Ruby.getReturnedValue()).toBe(false);
        });
    });
    it("VTID-032 : It Ruby: testcase2 : should return true if a model objects have local changes for sync haveLocalChanges", function(){
        runs(function () {
            userDB.executeSql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");
            Ruby.call('HaveLocalChanges', 'testcase1');
            waits(3000);
        });
        runs(function(){
            expect(Ruby.getReturnedValue()).toEqual(true);
        });
    });
    it("VTID-033 : It should return false even after adding object to the local model - Property bag", function(){
        runs(function(){
            Ruby.call('ProductLocalPb', 'testcase2');
            waits(3000);
        });
        runs(function(){
            expect(Ruby.getReturnedValue()).toEqual('false');
        });
    });
    it("VTID-034 : It should return true after adding object to the sync model - Property bag", function(){
        localDB.executeSql('DELETE FROM CHANGED_VALUES');
        localDB.executeSql('DELETE FROM OBJECT_VALUES');
        runs(function () {
            Ruby.call('HaveLocalChanges', 'testcase4a');
            waits(3000);
        });
        runs(function(){
            console.log("JS : " + Ruby.getReturnedValue());
            data = Ruby.getReturnedValue();
            data = JSON.parse(data);
            expect(data.initialCount).toEqual(0);
            expect(data.initialStatus).toEqual(false);
        });
        runs(function(){
            Ruby.call('HaveLocalChanges', 'testcase4b');
            waits(3000);
        });
        runs(function(){
            data = Ruby.getReturnedValue();
            data = JSON.parse(data);
            expect(data.finalCount).toEqual(1);
            expect(data.finalStatus).toEqual(true);
        });
    });
    it("VTID-035 : It Should return true after deleting object from the model - Property bag", function(){
        runs(function () {
            Ruby.call('HaveLocalChanges', 'testcase5a');
            waits(3000);
        });
        runs(function(){
            userDB.executeSql("DELETE FROM CHANGED_VALUES");
        });
        runs(function(){
            Ruby.call('HaveLocalChanges', 'testcase5b');
            waits(3000);
        });
        runs(function(){
            result = Ruby.getReturnedValue();
            console.log("data : " + result);
            result = JSON.parse(result);
            expect(result["afterDeleteCount"]).toEqual(0);
            expect(result["afterDeleteStatus"]).toEqual(false);
        });
    });
    it("VTID-037 : It Should return true after adding and deleting objects from the model - Property bag", function(){
        runs(function () {
            Ruby.call('HaveLocalChanges', 'testcase6');
            waits(3000);
        });
        runs(function(){
            result = Ruby.getReturnedValue();
            console.log("data : " + result);
            result = JSON.parse(result);
            expect(result["afterDeleteCount"]).toEqual(1);
            expect(result["afterDeleteStatus"]).toEqual(true);
        });
    });
    it("VTID-039 : It should return true after adding object to the model - Fixed Schema", function(){
        runs(function(){
            userDB.executeSql("DELETE FROM HaveLocalChangesFs");
            userDB.executeSql('DELETE FROM CHANGED_VALUES');
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase8');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            console.log("data : " + result);
            result = JSON.parse(result);
            expect(result["initialStatus"]).toEqual(false);
            expect(result["initialCount"]).toEqual(0);
            expect(result["finalStatus"]).toEqual(true);
            expect(result["finalCount"]).toEqual(1);
        });
    });
    it("VTID-040 : It Should return true after adding and deleting object from the model - Fixed Schema", function(){
        var objId;
        runs(function(){
            userDB.executeSql("DELETE FROM HaveLocalChangesFs");
            userDB.executeSql('DELETE FROM CHANGED_VALUES');
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase9');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual("true");
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase9b');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual("1");
        });
    });
    it("VTID-041 : It Should return true after deleting object from the model - Fixed Schema", function(){
        var objId;
        runs(function(){
            userDB.executeSql("DELETE FROM HaveLocalChangesFs");
            userDB.executeSql('DELETE FROM CHANGED_VALUES');
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase10');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual("true");
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase10b');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual("0");
        });
    });
    it("VTID-043 : It Should return false after deleting object from the model - Fixed Schema", function(){
        var objId;
        runs(function(){
            userDB.executeSql("DELETE FROM HaveLocalChangesFs");
            userDB.executeSql('DELETE FROM CHANGED_VALUES');
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase11');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual("false");
        });
        runs(function(){
            Ruby.call('HaveLocalChangesFs', 'testcase11b');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual("0");
        });
    });
});


