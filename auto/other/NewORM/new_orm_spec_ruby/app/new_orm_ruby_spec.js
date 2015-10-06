describe("New ORM Test Set : Ruby : ", function(){
    //addModel () not applicable for ruby.
    describe("Ruby : DatabaseClientReset() test set : ", function(){
        var userDB = Rho.ORMHelper.dbConnection('user');
        var localDB = Rho.ORMHelper.dbConnection('local');
        it("VTID-001 : It should throw an exception when Property bag client model reset done using databaseClientReset() without any parameter", function(){
            runs(function(){
                Ruby.call('General', 'testcase1');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual("10");
                expect(resultData["error"]).toEqual('Wrong number of arguments: 0 instead of 1')
            });
        });
        it("VTID-002 : It should reset property bag client model using databaseClientReset(false) with false as parameter", function(){
            runs(function(){
                Ruby.call('General', 'testcase2');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual('')
            });
        });
        it("VTID-003 : It should reset property bag client model and local model using databaseClientReset(true) with true as parameter", function(){
            runs(function(){
                Ruby.call('General', 'testcase3');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(0)                
                expect(resultData["finalClientId"]).toEqual('')
            });
        });
        it("VTID-004 : It should reset fixed_schema client model using databaseClientReset() without any parameter", function(){
            runs(function(){
                Ruby.call('General', 'testcase4');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual("10");
                expect(resultData["error"]).toEqual('Wrong number of arguments: 0 instead of 1')
            });
        });
        it("VTID-005 : It should reset Fixed_schema client model using databaseClientReset(false) with flase as parameter", function(){
            runs(function(){
                Ruby.call('General', 'testcase5');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual('')
            });
        });
        it("VTID-006 : It should reset Fixed_schema client model and local model using databaseClientReset(true) with true as parameter", function(){
            runs(function(){
                Ruby.call('General', 'testcase6');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(0);
                expect(resultData["finalClientId"]).toEqual('')
            });
        });
    });
    describe("Ruby : DatabaseFullReset() test set : ", function(){
        var userDB = Rho.ORMHelper.dbConnection('user');
        var localDB = Rho.ORMHelper.dbConnection('local');
        it("VTID-007 : Property bag : databaseFullReset(true, false) should reset client info databaseFullReset tables", function(){
            runs(function(){
                Ruby.call('General', 'testcase7');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual(null)
            });
        });
        it("VTID-008 : Fixed schema : databaseFullReset(true, false) should reset client info databaseFullReset tables", function(){
            runs(function(){
                Ruby.call('General', 'testcase8');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual(null)
            });
        });
        it("VTID-009 : Property bag : DatabaseFullReset(false, false) should not reset client info and local tables", function(){
            runs(function(){
                Ruby.call('General', 'testcase9');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual('10');
            });
        });
        it("VTID-010 : Fixed schema : DatabaseFullReset(false, false) should not reset client info and local tables", function(){
            runs(function(){
                Ruby.call('General', 'testcase10');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual('10');
            });
        });
        it("VTID-011 : It should reset client info databaseFullReset tables of all partitions", function(){
            runs(function(){
                Ruby.call('General', 'testcase11');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserFsCount"]).toEqual(1);
                expect(resultData["initialLocalFsCount"]).toEqual(1);
                expect(resultData["initialUserPbCount"]).toEqual(1);
                expect(resultData["initialLocalPbCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserFsCount"]).toEqual(0);
                expect(resultData["finalLocalFsCount"]).toEqual(0);
                expect(resultData["finalUserPbCount"]).toEqual(0);
                expect(resultData["finalLocalPbCount"]).toEqual(0);
                expect(resultData["finalClientId"]).toEqual('10');
            });
        });
        it("VTID-012 : It Property bag : DatabaseFullReset(true,true) should reset client info and local models ", function(){
            runs(function(){
                Ruby.call('General', 'testcase12');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserFsCount"]).toEqual(1);
                expect(resultData["initialLocalFsCount"]).toEqual(1);
                expect(resultData["initialUserPbCount"]).toEqual(1);
                expect(resultData["initialLocalPbCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserFsCount"]).toEqual(0);
                expect(resultData["finalLocalFsCount"]).toEqual(0);
                expect(resultData["finalUserPbCount"]).toEqual(0);
                expect(resultData["finalLocalPbCount"]).toEqual(0);
                expect(resultData["finalClientId"]).toEqual(null);
            });
        });
        it("VTID-013 : It Fixed schema : DatabaseFullReset(true,true) should reset client info and local models ", function(){
            runs(function(){
                Ruby.call('General', 'testcase12');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserFsCount"]).toEqual(1);
                expect(resultData["initialLocalFsCount"]).toEqual(1);
                expect(resultData["initialUserPbCount"]).toEqual(1);
                expect(resultData["initialLocalPbCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserFsCount"]).toEqual(0);
                expect(resultData["finalLocalFsCount"]).toEqual(0);
                expect(resultData["finalUserPbCount"]).toEqual(0);
                expect(resultData["finalLocalPbCount"]).toEqual(0);
                expect(resultData["finalClientId"]).toEqual(null);
            });
        });
        it("VTID-014 : It Property bag : Should reset local tables and does not reset client-info databaseFullReset tables", function(){
            runs(function(){
                Ruby.call('General', 'testcase13');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(0);
                expect(resultData["finalClientId"]).toEqual('10')
            });
        });
        it("VTID-015 : It Fixed schema : Should reset local tables and does not reset client-info databaseFullReset tables", function(){
            runs(function(){
                Ruby.call('General', 'testcase14');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserCount"]).toEqual(1);
                expect(resultData["initialLocalCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserCount"]).toEqual(0);
                expect(resultData["finalLocalCount"]).toEqual(0);
                expect(resultData["finalClientId"]).toEqual('10')
            });
        });
        it("VTID-016 : It should reset client info databaseFullReset tables with undefined params", function(){
            runs(function(){
                Ruby.call('General', 'testcase15');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialUserFsCount"]).toEqual(1);
                expect(resultData["initialUserPbCount"]).toEqual(1);
                expect(resultData["initialClientId"]).toEqual('10');
                expect(resultData["finalUserFsCount"]).toEqual(1);
                expect(resultData["finalUserPbCount"]).toEqual(1);
                expect(resultData["finalClientId"]).toEqual('10');
                expect(resultData["error"]).toEqual('Type error: argument 0 should be boolean')
            });
        });

    });
    describe("Ruby : DatabaseLocalReset() test set : ", function(){
        var userDB = Rho.ORMHelper.dbConnection('user');
        var localDB = Rho.ORMHelper.dbConnection('local');
        it("VTID-017 : DatabaseLocalReset without having any local model | Should not removed data from synced database", function(){
            runs(function(){
                Ruby.call('General', 'testcase16');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["userFsCount"]).toEqual(1);
                expect(resultData["userPbCount"]).toEqual(1);
                expect(resultData["clientId"]).toEqual("10");
            });
        });
        it("VTID-018 : DatabaseLocalReset with changes in local model | Should removed local model data", function(){
            runs(function(){
                Ruby.call('General', 'testcase17');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["localFsCount"]).toEqual(0);
                expect(resultData["localPbCount"]).toEqual(0);
            });
        });
        it("VTID-019 : DatabaseLocalReset with changes in both local and user model | Should removed local model data", function(){
            runs(function(){
                Ruby.call('General', 'testcase18');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["localFsCount"]).toEqual(0);
                expect(resultData["localPbCount"]).toEqual(0);
                expect(resultData["userFsCount"]).toEqual(1);
                expect(resultData["userPbCount"]).toEqual(1);
                expect(resultData["clientId"]).toEqual("10");
            });
        });
    });
    describe("Ruby : DatabaseFullResetEx() test set : ", function(){
        var userDB = Rho.ORMHelper.dbConnection('user');
        var localDB = Rho.ORMHelper.dbConnection('local');
        it("VTID-020 : It should delete array of propertybag user models using databaseFullResetEx", function(){

        });
        it("VTID-021 : It should delete array of propertybag local and user models using databaseFullResetEx", function(){

        });
        it("VTID-022 : It should delete array of propertybag local, user models and client_info using databaseFullResetEx", function(){

        });
        it("VTID-023 : It should delete array of Fixed schema user models using databaseFullResetEx", function(){

        });
        it("VTID-024 : It should delete array of Fixed schema local models using databaseFullResetEx", function(){

        });
        it("VTID-025 : It should delete array of Fixed schema local models, client models and client_info using databaseFullResetEx", function(){

        });
    });
    describe("Ruby : DatabaseFullResetAndLogout() test set : ", function(){
        var userDB = Rho.ORMHelper.dbConnection('user');
        var localDB = Rho.ORMHelper.dbConnection('local');
        it("VTID-026 : It should delete array of Fixed schema local models, client models and client_info using DatabaseFullResetAndLogout", function(){

        });
    });

    describe("Ruby : DatabaseFullclientResetAndLogout() test set : ", function(){
        var userDB = Rho.ORMHelper.dbConnection('user');
        var localDB = Rho.ORMHelper.dbConnection('local');
        it("VTID-027 : It should delete array of Fixed schema local models, client models and client_info using DatabaseFullclientResetAndLogout", function(){

        });
    });
    describe("generate ID test set : ", function(){
        it("VTID-028 : It Should generate Unique id using the generateId() method", function(){
            runs(function(){
                Ruby.call('General', 'testcasea');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                console.log("Generated ID : " + result);
                expect(typeof(result)).toEqual('number');
            });
        });
    });
    describe("Get clientID() test set : ", function(){
        it("VTID-029 : It Should return client id", function(){
            runs(function(){
                Ruby.call('General', 'testcaseb');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                result = JSON.parse(result);
                console.log("Generated Id 2 : " + result['after']);
                expect(result["before"]).toEqual(null);
                expect(result["after"]).toEqual("123456789012");
            });
        });
    });
    describe("Ruby : useNewOrm() test set : ", function(){
        it("VTID-030 : It Should return true when use_new_orm flag in rhoconfig.txt is set to 1", function(){
            runs(function(){
                Ruby.call('General', 'testcasec');
                waits(2000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                expect(result).toEqual(true);
            });
        });
        it("reset", function(){
            runs(function(){
                Ruby.call('General', 'reset');
                waits(2000);
            });
        })    
    });
});
