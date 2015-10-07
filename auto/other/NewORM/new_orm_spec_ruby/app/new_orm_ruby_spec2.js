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
    it("VTID-036 : It Should return false even after deleting object from the local model - Property bag", function(){
        
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
    it("VTID-038 : It should return false even after adding object to the local model - Fixed Schema", function(){
        
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
    it("VTID-042 : It should return false even after deleting object to the local model - Fixed Schema", function(){
        
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
describe("Ruby : anyChangedObjects test set : ", function(){
    var userDB = Rho.ORMHelper.dbConnection('user');
    var localDB = Rho.ORMHelper.dbConnection('local');
    it("VTID-044 : It Call anyChangedObjects without modifying newly added model",function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('AnyChangedObjects','testcase1');
            waits(3000);
        });
        runs(function(){
            expect(Ruby.getReturnedValue()).toBe("false");
        });
    });

    it("VTID-045 : It should return true after adding object to the model - Property bag", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('AnyChangedObjects','testcase2a');
            waits(3000);
        });
        runs(function(){
            expect(Ruby.getReturnedValue()).toBe("false");
            userDB.executeSql('DELETE FROM CHANGED_VALUES');
        });
        runs(function(){
            Ruby.call('AnyChangedObjects','testcase2b');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(1);
            expect(result["status"]).toEqual(true);
        });
    });
    it("VTID-046 : It should return false after adding object to the local model - Property bag", function(){

    });
    it("VTID-047 : It Should return true after deleting object from the model - Property bag", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('AnyChangedObjects','testcase3');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(0);
            expect(result["status"]).toEqual(true);
        });
    });
    it("VTID-048 : It Should return false even after deleting object from the local model - Property bag", function(){

    });
    it("VTID-049 : It Should return true after adding and deleting objects from the model - Property bag", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('AnyChangedObjects','testcase4');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(1);
            expect(result["status"]).toEqual(true);
        });
    
    });

    it("VTID-050 : It Should return false after adding and deleting same object from the model - Property bag", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('AnyChangedObjects','testcase5');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(0);
            expect(result["status"]).toEqual(false);
        });
    });

    it("VTID-051 : It should return true after adding object to the model - Fixed Schema", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM AnyChangedObjectsFs");
        runs(function(){
            Ruby.call('AnyChangedObjectsFs','testcase1');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(1);
            expect(result["status"]).toEqual(true);
        });
    });
    it("VTID-052 : It should return false even after adding object to the local model - Fixed Schema", function(){

    });
    it("VTID-053 : It Should return true after deleting object from the model - Fixed Schema", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM AnyChangedObjectsFs");
        runs(function(){
            Ruby.call('AnyChangedObjectsFs','testcase2');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(0);
            expect(result["status"]).toEqual(true);
        });
    });
    it("VTID-054 : It Should return false even after deleting object from the local model - Fixed Schema", function(){

    });
    it("VTID-055 : It Should return true after adding and deleting objects from the model - Fixed schema", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM AnyChangedObjectsFs");
        runs(function(){
            Ruby.call('AnyChangedObjectsFs','testcase3');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(1);
            expect(result["status"]).toEqual(true);
        });
    });
    it("VTID-056 : It Should return flase after adding and deleting same object from the model - Fixed schema", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM AnyChangedObjectsFs");
        runs(function(){
            Ruby.call('AnyChangedObjectsFs','testcase4');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result)
            expect(result["count"]).toEqual(0);
            expect(result["status"]).toEqual(false);
        });
    });
});
describe("canModify test set : ", function(){
    var userDB = Rho.ORMHelper.dbConnection('user');
    var localDB = Rho.ORMHelper.dbConnection('local');
        
    it("VTID-057 : It canModify method should return true for user fixed schema model when RC is not in sync", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM AnyChangedObjectsFs");
        runs(function(){
            Ruby.call('AnyChangedObjectsFs','testcase5');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual(true);
        });
    });
    it("VTID-058 : It canModify method should return true for local fixed schema models ", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('ProductLocalFs','testcase1');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual(true);
        });

    });
    it("VTID-059 : It canModify method should return true for user property bag model when RC is not in sync", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM AnyChangedObjectsFs");
        runs(function(){
            Ruby.call('AnyChangedObjectsFs','testcase6');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual(true);
        });
    });
    it("VTID-060 : It canModify method should return true for local property bag models ", function(){
        userDB.executeSql("DELETE FROM OBJECT_VALUES");
        userDB.executeSql("DELETE FROM CHANGED_VALUES");
        runs(function(){
            Ruby.call('ProductLocalPb','testcase1');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            expect(result).toEqual(true);
        });
    });
});
describe("Ruby : find_by_sql test set : ", function(){
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
describe("Ruby : getAllProperties test set : ", function(){
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
describe("Ruby : getBackendRefreshTime test set : ", function(){
    it("VTID-083 : It should get the default value of time stamp for a non synced sync model with fixed schema.", function(){
        runs(function(){
            Ruby.call('General', 'testcase29');
            waits(3000);
        });
        runs(function(){
            var result = Ruby.getReturnedValue();
            result = JSON.parse(result);
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
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
            var date = ["1970-01-01 05:30:00 +0530", "1970-01-01 05:30:00 GMT"];
            expect(date).toContain(result.time);
        });
    });;
});
describe("Ruby : getBelongsTo test set : ", function(){
    
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
            expect(result.belongsTo).toEqual(['ItemFs']);
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
describe("Ruby : enable test set : ", function(){
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
describe("Ruby : deleteObjects test set : ", function(){
    describe("UserFs test : ", function(){
        it("VTID-109 : It should delete all objects of the model when empty parameters are sent with method userFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase55');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(0);
            });
        });
        it("VTID-110 : It should throw exception when null parameters are passed with the method userFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase56');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 2");
            });
        });
        it("VTID-111 : It should only the simple matched condition passed as parameter with the method userFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase57');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(2);
            });
        });
        it("VTID-112 : It should only the matched condition uses OR passed as parameter with the method userFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase58');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(1);
            });
        });
        it("VTID-113 : It should only the matched condition uses AND passed as parameter with the method userFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase59');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                 expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(2);
            });
        })
        it("VTID-114 : It should throw an exception when wrong condition(non existing column) is sent as parameter with the method userFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase60');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["error"]).toEqual("no such column: nonExisting");
            });
        });
    });
    describe("Ruby : localFs tests : ", function(){
        it("VTID-115 : It should delete all objects of the model when empty parameters are sent with method localFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase61');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(0);
            });
        });
        it("VTID-116 : It should throw exception when null parameters are passed with the method localFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase62');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 2");
            });
        });
        it("VTID-117 : It should only the simple matched condition passed as parameter with the method localFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase63');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(2);
            });
        });
        it("VTID-118 : It should only the matched condition uses OR passed as parameter with the method localFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase64');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(1);
            });
        })
        it("VTID-119 : It should only the matched condition uses AND passed as parameter with the method localFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase65');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(2);
            });
        })
        it("VTID-120 : It should throw an exception when wrong condition(non existing column) is sent as parameter with the method localFS.", function(){
            runs(function(){
                Ruby.call('General', 'testcase66');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["error"]).toEqual("no such column: nonExisting");
            });
        });
    });
    describe("Ruby : appFs tests : ", function(){
        it("VTID-121 : It should delete all objects of the model when empty parameters are sent with method appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase67');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(0);
            });
        });
        it("VTID-122 : It should throw exception when null parameters are passed with the method appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase68');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 2");
            });
        });
        it("VTID-123 : It should only the simple matched condition passed as parameter with the method appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase69');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(2);
            });
        });
        it("VTID-124 : It should only the matched condition uses OR passed as parameter with the method appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase70');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(1);
            });
        });
        it("VTID-125 : It should only the matched condition uses AND passed as parameter with the method appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase71');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["finalCount"]).toEqual(2);
            });
        });
        it("VTID-126 : It should throw an exception when wrong condition(non existing column) is sent as parameter with the method appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase72');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initCount"]).toEqual(3);
                expect(result["error"]).toEqual("no such column: nonExisting");
            });
        });
    });
});
describe("Ruby : findObjects test set : ", function(){
    describe("userFs tests : ", function(){
        it("VTID-127 : It should find the objects which matches the simple condition in the WHERE clause with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase73');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(1);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[0].quantity).toEqual("20");
                expect(result.count).toEqual(1);
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-128 : It should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase74');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(2);
                expect(result.count).toEqual(2);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Woodlands");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-129 : It should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase75');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(1);
                expect(result.count).toEqual(1);
                expect(result.find[0].name).toEqual("Puma");
                expect(result.first[0].name).toEqual("Puma");
            });
        });
        it("VTID-130 : It should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase76');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(3);
                expect(result.count).toEqual(3);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Puma");
                expect(result.find[2].name).toEqual("Reebok");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-131 : It should throw exception when null parameters are passed with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase77');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 5");
            });
        });
        it("VTID-132 : It should find all the objects when empty parameters are passed with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase78');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(4);
                expect(result.count).toEqual(4);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Woodlands");
                expect(result.find[2].name).toEqual("Reebok");
                expect(result.find[3].name).toEqual("Puma");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-133 : It should throw exception when first parameter is passed as empty with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase79');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("findObjects: Invalid Empty First Argument passed.")
            });
        });
        it("VTID-134 : It should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase80');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("no such column: nonexisting");
            });
        });
    });
    describe("localFs tests : ", function(){
        it("VTID-135 : It should find the objects which matches the simple condition in the WHERE clause with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase81');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(1);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[0].quantity).toEqual("20");
                expect(result.count).toEqual(1);
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-136 : It should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase82');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(2);
                expect(result.count).toEqual(2);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Woodlands");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-137 : It should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase83');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(1);
                expect(result.count).toEqual(1);
                expect(result.find[0].name).toEqual("Puma");
                expect(result.first[0].name).toEqual("Puma");
            });
        });
        it("VTID-138 : It should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase84');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(3);
                expect(result.count).toEqual(3);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Puma");
                expect(result.find[2].name).toEqual("Reebok");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-139 : It should throw exception when null parameters are passed with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase85');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 5");
            });
        });
        it("VTID-140 : It should find all the objects when empty parameters are passed with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase86');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(4);
                expect(result.count).toEqual(4);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Woodlands");
                expect(result.find[2].name).toEqual("Reebok");
                expect(result.find[3].name).toEqual("Puma");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-141 : It should throw exception when first parameter is passed as empty with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase87');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("findObjects: Invalid Empty First Argument passed.")
            });
        });
        it("VTID-142 : It should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase88');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("no such column: nonexisting");
            });
        });
    });
    describe("appFs tests : ", function(){
        it("VTID-143 : It should find the objects which matches the simple condition in the WHERE clause with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase89');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(1);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[0].quantity).toEqual("20");
                expect(result.count).toEqual(1);
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-144 : It should find the objects which matches the conditions containing OR operator and ORDER BY ASC & DESC with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase90');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(2);
                expect(result.count).toEqual(2);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Woodlands");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-145 : It should find the objects which matches the conditions containing AND operator and ORDER BY ASC & DESC with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase91');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(1);
                expect(result.count).toEqual(1);
                expect(result.find[0].name).toEqual("Puma");
                expect(result.first[0].name).toEqual("Puma");
            });
        });
        it("VTID-146 : It should be able to find all the objects which matches the selectAttrs parameter with matching conditions containing IN operator in the WHERE clause and ORDER BY ascending order with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase92');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(3);
                expect(result.count).toEqual(3);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Puma");
                expect(result.find[2].name).toEqual("Reebok");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-147 : It should throw exception when null parameters are passed with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase93');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 5");
            });
        });
        it("VTID-148 : It should find all the objects when empty parameters are passed with fixed schema(user).", function(){
            runs(function(){
                Ruby.call('General', 'testcase94');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.find.length).toEqual(4);
                expect(result.count).toEqual(4);
                expect(result.find[0].name).toEqual("Nike");
                expect(result.find[1].name).toEqual("Woodlands");
                expect(result.find[2].name).toEqual("Reebok");
                expect(result.find[3].name).toEqual("Puma");
                expect(result.first[0].name).toEqual("Nike");
            });
        });
        it("VTID-149 : It should throw exception when first parameter is passed as empty with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase95');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("findObjects: Invalid Empty First Argument passed.")
            });
        });
        it("VTID-150 : It should throw exception when wrong condition(non existing column) is sent as parameter with fixed schema(user)", function(){
            runs(function(){
                Ruby.call('General', 'testcase96');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("no such column: nonexisting");
            });
        });
    });
});
describe("deleteObjectsPropertyBagByCondHash test set : ", function(){
    describe("userPb tests : ", function(){
        it("Should delete all objects of the model when empty parameters are sent with userPB", function(){
            runs(function(){
                Ruby.call('General', 'testcase97');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(0);
            });
        });
        it("Should throw exception when null parameters are passed in the method with with userPB", function(){
            runs(function(){
                Ruby.call('General', 'testcase98');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(4);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 2");
            });
        });
        it("Should delete only the simple matched condition passed as parameter in the method with with userPB.", function(){
            runs(function(){
                Ruby.call('General', 'testcase99');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(3);
            });
        });
        it("Should delete only the simple matched multiple condition passed as parameter in method with userPB.", function(){
            runs(function(){
                Ruby.call('General', 'testcase100');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(3);
            });
        });
        it("Should throw an exception when wrong condition(non existing column) is sent as parameter in method with userPB.", function(){
            runs(function(){
                Ruby.call('General', 'testcase101');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(4);
                expect(result["error"]).toEqual(null);
            });
        });
    });
    describe("localPb tests : ", function(){
        it("Should delete all objects of the model when empty parameters are sent with localPb", function(){
            runs(function(){
                Ruby.call('General', 'testcase102');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(0);
            });
        });
        it("Should throw exception when null parameters are passed in the method with with localPb", function(){
            runs(function(){
                Ruby.call('General', 'testcase103');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(4);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 2");
            });
        });
        it("Should delete only the simple matched condition passed as parameter in the method with with localPb.", function(){
            runs(function(){
                Ruby.call('General', 'testcase104');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(3);
            });
        });
        it("Should delete only the simple matched multiple condition passed as parameter in method with localPb.", function(){
            runs(function(){
                Ruby.call('General', 'testcase105');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(3);
            });
        });
        it("Should throw an exception when wrong condition(non existing column) is sent as parameter in method with localPb.", function(){
            runs(function(){
                Ruby.call('General', 'testcase106');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(4);
                expect(result["error"]).toEqual(null);
            });
        });
    });
    describe("appPb tests : ", function(){
        it("Should delete all objects of the model when empty parameters are sent with appPb", function(){
            runs(function(){
                Ruby.call('General', 'testcase107');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(0);
            });
        });
        it("Should throw exception when null parameters are passed in the method with with appPb", function(){
            runs(function(){
                Ruby.call('General', 'testcase108');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(4);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 2");
            });
        });
        it("Should delete only the simple matched condition passed as parameter in the method with with appPb.", function(){
            runs(function(){
                Ruby.call('General', 'testcase109');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(3);
            });
        });
        it("Should delete only the simple matched multiple condition passed as parameter in method with appPb.", function(){
            runs(function(){
                Ruby.call('General', 'testcase110');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(3);
            });
        });
        it("Should throw an exception when wrong condition(non existing column) is sent as parameter in method with appPb.", function(){
            runs(function(){
                Ruby.call('General', 'testcase111');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["initialCount"]).toEqual(4);
                expect(result["finalCount"]).toEqual(4);
                expect(result["error"]).toEqual(null);
            });
        });
    });
});
describe("findObjectsPropertyBagByCondHash test set : ", function(){
    describe("userFs tests : ", function(){
        it("Should find all the objects of the model when no parameter is passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase112');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(4);
                expect(result.resCount).toEqual(4);
                expect(result.resFirst[0].name).toEqual("Nike");
            });
        });
        it("Should find the objects matching to the condition passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase113');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(1);
                expect(result.resCount).toEqual(1);
                expect(result.resFirst[0].name).toEqual("Puma");
                expect(result.resFirst[0].quantity).toEqual("40");
            });
        });
        it("Should find the selective object parameters depeding on the setAttr parameter passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase114');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(1);
                expect(result.resAll[0].name).toEqual("Puma");
                expect(result.resCount).toEqual(1);
                expect(result.resFirst[0].name).toEqual("Puma");
            });
        });
        it("Should throw exception when no parameter passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase115');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.error).toEqual("Wrong number of arguments: 0 instead of 4");
            });
        });
    });
    describe("localFs tests : ", function(){
        it("Should find all the objects of the model when no parameter is passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase116');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(4);
                expect(result.resCount).toEqual(4);
                expect(result.resFirst[0].name).toEqual("Nike");
            });
        });
        it("Should find the objects matching to the condition passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase117');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(1);
                expect(result.resCount).toEqual(1);
                expect(result.resFirst[0].name).toEqual("Puma");
                expect(result.resFirst[0].quantity).toEqual("40");
            });
        });
        it("Should find the selective object parameters depeding on the setAttr parameter passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase118');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(1);
                expect(result.resAll[0].name).toEqual("Puma");
                expect(result.resCount).toEqual(1);
                expect(result.resFirst[0].name).toEqual("Puma");
            });
        });
        it("Should throw exception when no parameter passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase119');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.error).toEqual("Wrong number of arguments: 0 instead of 4");
            });
        });
    });
    describe("appFs tests : ", function(){
        it("Should find all the objects of the model when no parameter is passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase120');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(4);
                expect(result.resCount).toEqual(4);
                expect(result.resFirst[0].name).toEqual("Nike");
            });
        });
        it("Should find the objects matching to the condition passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase121');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(1);
                expect(result.resCount).toEqual(1);
                expect(result.resFirst[0].name).toEqual("Puma");
                expect(result.resFirst[0].quantity).toEqual("40");
            });
        });
        it("Should find the selective object parameters depeding on the setAttr parameter passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase122');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.resAll.length).toEqual(1);
                expect(result.resAll[0].name).toEqual("Puma");
                expect(result.resCount).toEqual(1);
                expect(result.resFirst[0].name).toEqual("Puma");
            });
        });
        it("Should throw exception when no parameter passed with the method.", function(){
            runs(function(){
                Ruby.call('General', 'testcase123');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result.error).toEqual("Wrong number of arguments: 0 instead of 4");
            });
        });
    });
});
describe("Ruby : findObjectsPropertyBagByCondArray test sets : ", function(){
    describe("userFs test set : ", function(){
        it("should find all objects when empty paramter is passed with the userFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase124');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(4);
                expect(result["resCount"]).toEqual(4);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching simple condition passed with the userFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase125');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(1);
                expect(result["resCount"]).toEqual(1);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching condition with OR passed with the userFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase126');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(3);
                expect(result["resCount"]).toEqual(3);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching condition with AND passed with the userFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase127');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(1);
                expect(result["resCount"]).toEqual(1);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should throw exception when no parameter is passed with the userFs", function(){
            runs(function(){
                Ruby.call('General', 'testcase128');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 5");
            });
        });
        it("Should throw exception when no first parameter with the userFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase129');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("findObjectsPropertyBagByCondArray: Invalid Empty First Argument passed.");
            });
        });
        it("Should throw exception when condition is passed as nonexisting column with the userFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase130');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("no such column: nonexisting");
            });
        });
    });
    describe("localFs test set : ", function(){
        it("should find all objects when empty paramter is passed with the localFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase131');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(4);
                expect(result["resCount"]).toEqual(4);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching simple condition passed with the localFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase132');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(1);
                expect(result["resCount"]).toEqual(1);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching condition with OR passed with the localFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase133');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(3);
                expect(result["resCount"]).toEqual(3);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching condition with AND passed with the localFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase134');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(1);
                expect(result["resCount"]).toEqual(1);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should throw exception when no parameter is passed with the localFs", function(){
            runs(function(){
                Ruby.call('General', 'testcase135');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 5");
            });
        });
        it("Should throw exception when no first parameter with the localFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase136');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("findObjectsPropertyBagByCondArray: Invalid Empty First Argument passed.");
            });
        });
        it("Should throw exception when condition is passed as nonexisting column with the localFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase137');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("no such column: nonexisting");
            });
        });
    });
    describe("appFs test set : ", function(){
        it("should find all objects when empty paramter is passed with the appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase138');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(4);
                expect(result["resCount"]).toEqual(4);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching simple condition passed with the appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase139');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(1);
                expect(result["resCount"]).toEqual(1);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching condition with OR passed with the appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase140');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(3);
                expect(result["resCount"]).toEqual(3);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should find all the matching condition with AND passed with the appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase141');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["resAll"].length).toEqual(1);
                expect(result["resCount"]).toEqual(1);
                expect(result["resFirst"].length).toEqual(1);
            });
        });
        it("Should throw exception when no parameter is passed with the appFs", function(){
            runs(function(){
                Ruby.call('General', 'testcase142');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("Wrong number of arguments: 0 instead of 5");
            });
        });
        it("Should throw exception when no first parameter with the appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase143');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("findObjectsPropertyBagByCondArray: Invalid Empty First Argument passed.");
            });
        });
        it("Should throw exception when condition is passed as nonexisting column with the appFs.", function(){
            runs(function(){
                Ruby.call('General', 'testcase144');
                waits(3000);
            });
            runs(function(){
                var result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log(result);
                expect(result["error"]).toEqual("no such column: nonexisting");
            });
        });
    });
});
describe("Ruby : getModelProperty test set : ", function(){
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
describe("Ruby : hasChanges test set : ", function(){
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
            expect(result.find[0].object).toEqual(result.objId);
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
            expect(result.find[0].object).toEqual(result.objId);
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
            expect(result.find[0].object).toEqual(result.objId);
        });
    });
});





