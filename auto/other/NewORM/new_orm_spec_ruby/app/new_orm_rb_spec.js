describe("New ORM ruby test spec : ", function(){
	describe("Ruby : canModify", function(){
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
	describe("Ruby : anyChangedObjects", function(){
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
	describe("Ruby : getClientId", function(){
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
	describe("Ruby : databaseFullReset", function(){
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
	describe("Ruby : databaseLocalReset", function(){
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
	describe("Ruby : delete_all", function(){
		it("delete all userFs : ", function(){
			runs(function(){
                Ruby.call('General', 'testcase161');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(1);
                expect(resultData["finalCount"]).toEqual(0);
            });
        });
        it("delete records of matched hash conditions userFs : ", function(){
			runs(function(){
                Ruby.call('General', 'testcase162');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["finalCount"]).toEqual(1);
            });
        });
        it("delete records of matched array conditions userFs : ", function(){
			runs(function(){
                Ruby.call('General', 'testcase163');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["finalCount"]).toEqual(1);
            });
        });
	});
	describe("Ruby : destroy", function(){
		it("destroy model record of userFs : ", function(){
			runs(function(){
                Ruby.call('General', 'testcase164');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["finalCount"]).toEqual(2);
            });
        });
	});
	describe("Ruby : find", function(){
		it("find all records of the model", function(){
			runs(function(){
                Ruby.call('General', 'testcase165');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["findResult"].length).toEqual(3);
            });
		});
		it("find count records of the model", function(){
			runs(function(){
                Ruby.call('General', 'testcase166');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["findResult"]).toEqual(3);
            });
		});
		it("find by hash condition records of the model", function(){
			runs(function(){
                Ruby.call('General', 'testcase167');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["findResult"].length).toEqual(2);
            });
		});
		it("find by array condition records of the model", function(){
			runs(function(){
                Ruby.call('General', 'testcase168');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["findResult"].length).toEqual(2);
            });
		});
		it("find by array condition with quests records of the model", function(){
			runs(function(){
                Ruby.call('General', 'testcase169');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
                expect(resultData["findResult"].length).toEqual(2);
            });
		});
		it("find by array condition with order and orderdir records of the model", function(){
			runs(function(){
                Ruby.call('General', 'testcase170');
                waits(3000);
            });
            runs(function(){
                result = Ruby.getReturnedValue();
                resultData = JSON.parse(result);
                expect(resultData["initialCount"]).toEqual(3);
            });
		});
	});
});