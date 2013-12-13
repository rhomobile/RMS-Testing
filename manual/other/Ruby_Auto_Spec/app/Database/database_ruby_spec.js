
describe('Database Ruby API', function() {
	
	describe('ST set', function() {
	    var db;
	
	    beforeEach(function() {
	        db = undefined;
	    });
	
	    afterEach(function() {
	        if (typeof db !== 'undefined') {
	            db = undefined;
	        }
	    });
	
	    it("VT287-1 |To Open a DatabaseRho.Database| ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/opendb',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    });
	
	    it("VT287-02 | ExecuteSql without passing Args | ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/createdb',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });
	
	    it("VT287-003 |executeBatchSql without passing any Args|", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/executedb',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });

	    it("VT287-4 | Destroy all the tables   |", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroyAll',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("false");
	    });
	
	
	    it("VT287-05(a) | Destroy tables excluding some & check whether it exists   |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/excludeTables_exist',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });
	    
	    it("VT287-05(b) | Destroy tables excluding some & check whether destroyed exists   |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/excludeTables_notexist',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("false");
	    });
	
	    it("VT287-06 | Include and Exclude with Values  |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/include_exclude_tables',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });
	
	
	    it("VT287-007|Destroy single table| ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroytable',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("false");
	    });
	
//	    xit("VT287-008|Close the Database and Read from it| ", function() {
//	    	jQuery.ajax({
//	        	url: '/app/Database/closedb_read',
//	            success: function(result) {
//	            	db = result;
//	            },
//	            async:   false	
//	        });
//	    	expect(db).toBe("undefined method `execute' for nil:NilClass");
//	    });
	
	
//	    xit("VT287-009 |Close the Database and write to it| ", function() {
//	    	jQuery.ajax({
//	        	url: '/app/Database/closedb_write',
//	            success: function(result) {
//	            	db = result;
//	            },
//	            async:   false	
//	        });
//	    	expect(db).toBe("undefined method `execute' for nil:NilClass");
//	    });
	
	    it("VT287-10|Close the Database and Open it |", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/closeOpen',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toEqual('10');
	    });
	 
	    it("VT287-11 | To do a database transaction |", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/commitTxn',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toEqual('ten');
	    });
	 
	    it("VT287-12 | To demonstrate rollbacktranscation () |", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/rollbackTxn',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toEqual('could not prepare statement: 1; Message: no such table: t21');
	    });
	
	    it("VT287-13 | To demonstrate rollbacktranscation after commitTransaction() |", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/comRollTxn',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toEqual('fifteen');
	    });

//	    xit("VT287-14 | To demonstrate executeSql by passing null value | ", function() {
//	    	jQuery.ajax({
//	        	url: '/app/Database/executeNull',
//	            success: function(result) {
//	            	db = result;
//	            },
//	            async:   false	
//	        });
//	    	expect(db).toEqual('could not execute statement: 21; Message: not an error');
//	    });
	    
	    xit("VT287-16 | To demonstrate executeBatchSql by passing null value | ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/executeBatchNull',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toEqual('could not execute statement: 21; Message: not an error');
	    }); // need to check

//	    xit("VT287-17 | calling commitTransaction without startTransaction |'true' ", function() {
//	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
//	
//	        var tableName = getRandomName();
//	        db.executeSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);') ;
//	        db.commitTransaction();
//	        expect(db.isTableExist(tableName)).toBe(true);
//	    });
//	
//	    xit("VT287-18 | Try openeing database without passing dbPartition parameter | ", function() {
//	        var description;
//	        try {
//	            db = new Rho.Database(Rho.Application.databaseFilePath('local'));
//	        } catch (e) {
//	            description = e.description;
//	        }
//	        expect(description).toEqual('wrong number of arguments');
//	    });
//	
//	    xit("VT287-19 | Try openeing database with invalid dbpath and invalid Dbparameter | ", function() {
//	        var description;
//	        try {
//	            db = new Rho.Database('/fooo/fooo/fooo', '@$$%%@#');
//	        } catch (e) {
//	            description = e.description;
//	        }
//	        expect(description).toEqual('Error code: 14; Message: unable to open database file');
//	    });
//	
//	    xit("VT287-20| Try openeing database with invalid DbParameter with special characters | ", function() {
//	        var description;
//	        try {
//	            var getmodelpath = Rho.Application.get_model_path('app', 'Settings');
//	            db = new Rho.Database(File.join(getmodelpath, 'test'), '@#%^&*#');
//	        } catch (e) {
//	            description = e.description;
//	        }
//	        expect(description).toEqual('Error code: 14; Message: unable to open database file');
//	    });
	
	    it("VT287-21 |Opening Database at predefined partition app|", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/opendb_app',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });
	
	    it("VT287-22 |Opening Database at predefined partition user|", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/opendb_user',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });
	
//	    xit("VT287-23|isTableExist with invalid value|", function() {
//	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
//	        expect(db.isTableExist('!@^&%$$%')).toBe(false);
//	    });
	
	    it("VT287-24 | rollback called after drop table  |", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/rollbackAftDrop',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("true");
	    });
	
//	    xit("VT287-25 | Try openeing database without passing any parameter | ", function() {
//	        var description;
//	        try {
//	            db = new Rho.Database();
//	        } catch (e) {
//	            description = e.description;
//	        }
//	        expect(description).toBe('wrong number of arguments');
//	    });
//	
//	    xit("VT287-26 | Try opening database with 256 character long Partition name | ", function() {
//	        var dbName = File.join(Rho.Application.get_model_path('app', 'Settings'), 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv');
//	
//	        var description;
//	        try {
//	            db = new Rho.Database(dbName, 'deva');
//	        } catch (e) {
//	            description = e.description;
//	        }
//	        expect(description).toBe('Error code: 14; Message: unable to open database file');
//	    });
//	
//	    xit("VT287-27 | Try openeing database without dbPath and only dbPartiton | ", function() {
//	        var description;
//	        try {
//	            db = new Rho.Database('', 'Reddy');
//	        } catch (e) {
//	            description = e.description;
//	        }
//	        expect(description).toBe('Error code: 14; Message: unable to open database file');
//	    });
	
	    it("VT287-28 | rollback called after drop table  |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/rollbackAftDrop1',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("[]");
	    });
	
	
	    it("VT287-29 |Add a new Column using Execute SQL| ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/addColumn',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe('[{"Manager"=>"Jagadeesh Subbu"}]');
	    });
	
	    it("VT287-30|Destroy same table Twice | ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroyTwice',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("false");
	    });

	    it("VT287-31|Operating two db objects with diff path and diff Partition | ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/multiDBdifferent',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false	
	        });
	    	expect(db).toBe("fifteen,fifty");
	    });
	
	    
//	    xit("VT287-32|two db objects for the same db file and closing one instance of it  | ", function() {
//	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
//	        var db2 = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
//	
//	        try {
//	            var tableName = getRandomName();
//	
//	            db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
//	            db.executeSql('INSERT INTO "' + tableName + '" VALUES (?, ?)', [10, 'fifteen']);
//	            db.close();
//	
//	            try {
//	                db2.executeSql('SELECT y FROM "' + tableName + '" WHERE x = 10');
//	                expect(0).toBe(1);
//	            } catch (e) {
//	            }
//	        } finally {
//	            db2.close();
//	        }
//	    });
	
	    it("VT287-33|Operating two db objects with diff path and diff Partition and closing one db object  | ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/multiDBdifferent_close',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("fifteen");
	    });
	
	    it("VT287-34 | Destroy all the tables without giving any value  |'false' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroyAllTable_withoutvalue',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("false");
	    });
	
	    it("VT287-35 |destroy tables by passing invalid array parameters |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroyAllTable_withinvalid',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("true");
	    });
	
	    it("VT287-36 | DestroyTables with combination of valid  and invalid table names | ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroyTables_val_inval',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("false,true");
	    });
	
	
	    it("VT287-37 | Destroy table without giving any value  |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroyTable_novalue',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("true");
	    });
	    
	    it("VT287-38 | CAll rollback Transaction without start Transaction  |'true' ", function() {
	    	jQuery.ajax({
	        	url: '/app/Database/callRollback_withoutStartTrans',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("true");
	    });
	    
	    /* TODO: move to other tests since this is negative cases
	    it("VT287-39 | executeSql with one invalid stamenet  |'could not prepare statement: 1;Message:near taasf:syntax error' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var description;
	        var tableName = getRandomName();
	       
	       description= db.executeSql('CREATE taasf  fab(x INTEGER, y TEXT)');
	       expect(description).toBe('could not prepare statement: 1; Message: near "taasf": syntax error');
	    });
	    
	    it("VT287-41 | executeBatchSql with one invalid stamenet  |'' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var description;
	        var tableName = getRandomName();
	       description= db.executeBatchSql('DROP TABLE IF EXISTS fab;CREATE taasf fab(x INTEGER, y TEXT)');       
	       displayResult("VT287-39 | executeSql with one invalid stamenet  |'' ", description);
	    });
	    */
	});

	describe('Dev set', function() {
	    var db = null;
	
	    afterEach(function() {
	        db = undefined;
	    });
	
	
	    // Database.prototype.startTransaction = function()
	    // Database.progtotype.commitTransaction = function()
	    it('starts and commits transaction', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/start_commit_tranx',
	            success: function(result) {
	            	db = result.split("|")
	            },
	            async:   false
	        });
	    	expect(db[0]).toEqual('[{"x"=>10, "y"=>"ten", "z"=>"TEN"}]');
	    	expect(db[1]).toEqual('[{"x"=>10, "y"=>"ten", "z"=>"TEN"}]');
	    });
	
	    // Database.prototype.startTransaction = function()
	    // Database.prototype.rollbackTransaction = function()
	    it('starts and rollbacks transaction', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/start_rollback_tranx',
	            success: function(result) {
	            	db = result.split("|")
	            },
	            async:   false
	        });
	    	expect(db[0]).toEqual('[{"x"=>10, "y"=>"ten", "z"=>"TEN"}]');
	    	expect(db[1]).toEqual('[]');
	    });
	
	    // Database.prototype.lockDb = function()
	    // Database.prototype.unlockDb = function()
	    it('locks and unlocks database', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/lock_unlock_table',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toEqual('[{"x"=>10, "y"=>"ten", "z"=>"TEN"}]');
	    });
	
	    // Database.prototype.isUiWaitForDb = function()
	    it('calls isUiWaitForDb', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/isUiWaitForDb',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe("false");
	    });
	
	    // Database.prototype.executeSql = function(/* const rho::String& */ sqlStmt, /* const rho::Vector<rho::String>& */ args)
	    it('executes SQL statements', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/sql_statements',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toBe('[{"x"=>10, "y"=>"ten", "z"=>"TEN"}, {"x"=>11, "y"=>"eleven", "z"=>"ELEVEN"}]');
	    });
	
	    // Database.prototype.executeBatchSql = function(/* const rho::String& */ sqlStmt, /* const rho::Vector<rho::String>& */ args)
	    it('executes SQL statements as batch', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/sql_statements1',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	        expect(db).toEqual('[{"x"=>11, "y"=>"eleven", "z"=>"ELEVEN"}, {"x"=>10, "y"=>"ten", "z"=>"TEN"}]');
	    });
	
	    // Database.prototype.destroyTable = function(/* const rho::String& */ tableName)
	    it('destroys table', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/destroy_table',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	        expect(db).toBe("true");
	    });
	    
	    it('destroys multiple tables', function() {
		    jQuery.ajax({
	        	url: '/app/Database/destroyMultipleTables',
	            success: function(result) {
	            	db = result.split("|");
	            },
	            async:   false
	        });
		    expect(db[0]).toEqual('[]');
		    expect(db[1]).toEqual('["t1", "t2"]');
		    expect(db[2]).toEqual('["t3", "t4"]');
	    	expect(db[3]).toEqual('["t2", "t3", "t4"]');
	    });
	    
	    // Database.prototype.isTableExist = function(/* const rho::String& */ tableName)
	    it('checks for table existence', function() {
	    	jQuery.ajax({
	        	url: '/app/Database/table_existance',
	            success: function(result) {
	            	db = result;
	            },
	            async:   false
	        });
	    	expect(db).toEqual("correct");
	    });
	    
//	    describe('edge cases', function() {
//	        xit('open database twice and close once', function() {
//	            var db2 = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
//	            db2.close();
//	
//	            try {
//	                db.executeSql('CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
//	                expect(0).toBe(1);
//	            } catch (e) {
//	            }
//	        });
//	    });
	});
});