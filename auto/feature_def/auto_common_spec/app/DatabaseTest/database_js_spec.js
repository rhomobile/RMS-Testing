describe('Database JS API', function() {
	
	describe('ST set', function() {
	    var db;
	
	    var makeTableNames = function(nTables) {
	        var tableNames = [];
	        for (var i = 0; i < nTables; ++i) {
	            tableNames.push(getRandomName());
	        }
	        return tableNames;
	    };
	
	    var createTables = function(tableNames) {
	        var statements = [];
	        for (var i = 0; i < tableNames.length; ++i) {
	            statements.push('CREATE TABLE "' + tableNames[i] + '" (x INTEGER, y TEXT)');
	        }
	        db.executeBatchSql(statements.join(';'));
	    };
	
	    var allExist = function(tableNames) {
	        for (var i = 0; i < tableNames.length; ++i) {
	            if (!db.isTableExist(tableNames[i])) {
	                return false;
	            }
	        }
	        return true;
	    };
	
	    var anyExists = function(tableNames) {
	        for (var i = 0; i < tableNames.length; ++i) {
	            if (db.isTableExist(tableNames[i])) {
	                return true;
	            }
	        }
	        return false;
	    };
	
	
	    beforeEach(function() {
	        db = undefined;
	    });
	
	    afterEach(function() {
	        if (typeof db !== 'undefined') {
	            db.close();
	            db = undefined;
	        }
	    });
	
	    it("VT287-1 |To Open a DatabaseRho.Database| ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	    });
	
	    it("VT287-02 | ExecuteSql without passing Args | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	
	    it("VT287-003 |executeBatchSql without passing any Args|", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        expect(allExist(tableNames)).toBe(true);
	    });
	
	    it("VT287-4 | Destroy all the tables   |", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        db.destroyTables({'include': tableNames, 'exclude': []});
	        expect(anyExists(tableNames)).toBe(false);
	    });
	
	
	    it("VT287-05 | Destroy all the tables except few   |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        db.destroyTables({'include': [], 'exclude': tableNames.slice(2)});
	        expect(allExist(tableNames.slice(2))).toBe(true);
	        expect(anyExists(tableNames.slice(0, 2))).toBe(false);
	    });
	
	
	    it("VT287-06 | Include and Exclude with Values  |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        db.destroyTables({'include': tableNames.slice(0, 2), 'exclude': tableNames.slice(2)});
	        expect(allExist(tableNames.slice(2))).toBe(true);
	        expect(anyExists(tableNames.slice(0, 2))).toBe(false);
	    });
	
	
	    it("VT287-007|Destroy single table| ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        db.destroyTable(tableName);
	        expect(db.isTableExist(tableName)).toBe(false);
	    });
	
	    xit("VT287-008|Close the Database and Read from it| ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        db.executeSql('INSERT INTO "' + tableName + '" (x,y) VALUES(?,?)', [10, 'ten']);
	        db.close();
	
	        var description;
	        try {
	            db.executeSql('SELECT x FROM "' + tableName + '" WHERE y = "ten"');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('undefined method execute for nil:NilClass');
	    });
	
	
	    xit("VT287-009 |Close the Database and write to it| ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        db.close();
	
	        var description;
	        try {
	            db.executeSql('CREATE TABLE willnevercreated(x INTEGER, y TEXT)');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('undefined method execute for nil:NilClass');
	    });
	
	
	    it("VT287-10|Close the Database and Open it |", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        db.executeSql('INSERT INTO "' + tableName + '" (x, y) VALUES(?, ?)', [10, 'ten']);
	        db.close();
	
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        expect(db.executeSql('SELECT x FROM "' + tableName + '" WHERE y = "ten"')).toEqual([{x: '10'}]);
	    });
	
	    it("VT287-11 | To do a database transaction |", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var tableName = getRandomName();
	
	        db.startTransaction();
	        db.executeBatchSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);') ;
	        db.executeSql('INSERT INTO "' + tableName + '" (x, y) VALUES (?, ?)', [10, 'ten']);
	        db.commitTransaction();
	
	        expect(db.executeSql('SELECT x FROM "' + tableName + '" WHERE y = "ten"')).toEqual([{x: '10'}]);
	    });
	
	    it("VT287-12 | To demonstrate rollbacktranscation () |", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	
	        db.executeBatchSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);') ;
	
	        db.startTransaction();
	        db.executeSql('INSERT INTO "' + tableName + '" (x, y) VALUES (?, ?)', [10, 'fifteen']);
	        expect(db.executeSql('SELECT * FROM "' + tableName + '"')).toEqual([{x: '10', y: 'fifteen'}]);
	        db.rollbackTransaction();
	
	        expect(db.executeSql('SELECT * FROM "' + tableName + '"')).toEqual([]);
	    });
	
	    it("VT287-13 | To demonstrate rollbacktranscation after commitTransaction() |", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	
	        db.executeBatchSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);');
	
	        db.startTransaction();
	        db.executeSql('INSERT INTO "' + tableName + '" (x, y) VALUES (?, ?)', [10, 'fifteen']);
	        db.commitTransaction();
	        db.rollbackTransaction();
	
	        expect(db.executeSql('SELECT * FROM "' + tableName + '"')).toEqual([{x: '10', y: 'fifteen'}]);
	    });
	
	    xit("VT287-14 | To demonstrate executeSql by passing null value | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var description;
	        try{
	            db.executeSql('');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('could not execute statement: 21; Message: not an error');
	                                    
	    });
	
	    xit("VT287-15 | To demonstrate executeSql by passing null value | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var description;
	        try{
	            db.executeSql('');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('could not execute statement: 21; Message: not an error');
	    });
	
	    it("VT287-16 | To demonstrate executeBatchSql by passing null value | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        db.executeBatchSql('');
	    });
	
	    xit("VT287-17 | calling commitTransaction without startTransaction |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);') ;
	        db.commitTransaction();
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	
	    xit("VT287-18 | Try openeing database without passing dbPartition parameter | ", function() {
	        var description;
	        try {
	            db = new Rho.Database(Rho.Application.databaseFilePath('local'));
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('wrong number of arguments');
	    });
	
	    xit("VT287-19 | Try openeing database with invalid dbpath and invalid Dbparameter | ", function() {
	        var description;
	        try {
	            db = new Rho.Database('/fooo/fooo/fooo', '@$$%%@#');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('Error code: 14; Message: unable to open database file');
	    });
	
	    xit("VT287-20| Try openeing database with invalid DbParameter with special characters | ", function() {
	        var description;
	        try {
	            var getmodelpath = Rho.Application.get_model_path('app', 'Settings');
	            db = new Rho.Database(File.join(getmodelpath, 'test'), '@#%^&*#');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('Error code: 14; Message: unable to open database file');
	    });
	
	    it("VT287-21 |Opening Database at predefined partition app|", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('app'), 'app');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	
	    it("VT287-22 |Opening Database at predefined partition user|", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('user'), 'user');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	
	    xit("VT287-23|isTableExist with invalid value|", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        expect(db.isTableExist('!@^&%$$%')).toBe(false);
	    });
	
	    it("VT287-24 | rollback called after drop table  |", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	
	        db.executeBatchSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);') ;
	
	        db.startTransaction()
	        db.executeSql('DROP TABLE "' + tableName + '"');
	        expect(db.isTableExist(tableName)).toBe(false);
	        db.rollbackTransaction();
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	
	    xit("VT287-25 | Try openeing database without passing any parameter | ", function() {
	        var description;
	        try {
	            db = new Rho.Database();
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('wrong number of arguments');
	    });
	
	    xit("VT287-26 | Try opening database with 256 character long Partition name | ", function() {
	        var dbName = File.join(Rho.Application.get_model_path('app', 'Settings'), 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv');
	
	        var description;
	        try {
	            db = new Rho.Database(dbName, 'deva');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('Error code: 14; Message: unable to open database file');
	    });
	
	    xit("VT287-27 | Try openeing database without dbPath and only dbPartiton | ", function() {
	        var description;
	        try {
	            db = new Rho.Database('', 'Reddy');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('Error code: 14; Message: unable to open database file');
	    });
	
	    it("VT287-28 | rollback called after drop table  |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeBatchSql('CREATE TABLE "' + tableName + '" (Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)');
	        db.executeBatchSql('INSERT INTO "' + tableName + '" (Id, EMPLOYEE, Designation) VALUES (1, "deva", "SystemEngineer"); INSERT INTO "' + tableName + '" (Id, EMPLOYEE, Designation) VALUES (2, "deva", "SystemEngineer"); INSERT INTO "' + tableName + '" (Id, EMPLOYEE, Designation) VALUES (3, "bhaktha", "SystemEngineer");');
	        db.executeSql('DELETE FROM "' + tableName + '" WHERE ID = ?', [1]);
	
	        expect(db.executeSql('SELECT * FROM "' + tableName + '" WHERE Id = 1')).toEqual([]);
	    });
	
	
	    it("VT287-29 |Add a new Column using Execute SQL| ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeBatchSql('CREATE TABLE "' + tableName + '" (Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)');
	        db.executeBatchSql('INSERT INTO "' + tableName + '" (Id, EMPLOYEE, Designation) VALUES (1, "deva", "SystemEngineer"); INSERT INTO "' + tableName + '" (Id, EMPLOYEE, Designation) VALUES (2, "deva", "SystemEngineer"); INSERT INTO "' + tableName + '" (Id, EMPLOYEE, Designation) VALUES (3, "bhaktha", "SystemEngineer");');
	        db.executeSql('ALTER TABLE "' + tableName + '" ADD COLUMN Manager');
	        db.executeSql('UPDATE "' + tableName + '" SET Manager = "Kumar Sunil"');
	
	        expect(db.executeSql('SELECT Manager FROM "' + tableName + '" WHERE Id=1')).toEqual([{Manager: 'Kumar Sunil'}]);
	    });
	
	    it("VT287-30|Destroy same table Twice | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        db.destroyTable(tableName);
	        db.destroyTable(tableName);
	        expect(db.isTableExist(tableName)).toBe(false);
	    });
	
	    it("VT287-31|Operating two db objects with diff path and diff Partition | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var db2 = new Rho.Database(Rho.Application.databaseFilePath('testDB2'), 'testDB2');
	
	        try {
	            var tableName = getRandomName();
	
	            db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	            db2.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	
	            db.executeSql('INSERT INTO "' + tableName + '" VALUES (?, ?)', [10, 'fifteen']);
	            db2.executeSql('INSERT INTO "' + tableName + '" VALUES (?, ?)', [10, 'fifty']);
	
	            expect(db .executeSql('SELECT y FROM "' + tableName + '" WHERE x = 10')).toEqual([{y: 'fifteen'}]);
	            expect(db2.executeSql('SELECT y FROM "' + tableName + '" WHERE x = 10')).toEqual([{y: 'fifty'  }]);
	        } finally {
	            db2.close();
	        }
	    });
	
	    xit("VT287-32|two db objects for the same db file and closing one instance of it  | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var db2 = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        try {
	            var tableName = getRandomName();
	
	            db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	            db.executeSql('INSERT INTO "' + tableName + '" VALUES (?, ?)', [10, 'fifteen']);
	            db.close();
	
	            try {
	                db2.executeSql('SELECT y FROM "' + tableName + '" WHERE x = 10');
	                expect(0).toBe(1);
	            } catch (e) {
	            }
	        } finally {
	            db2.close();
	        }
	    });
	
	    it("VT287-33|Operating two db objects with diff path and diff Partition and closing one db object  | ", function() {
	        var tableName = getRandomName();
	
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        var db2 = new Rho.Database(Rho.Application.databaseFilePath('testDB2'), 'testDB2');
	
	        try {
	            db .executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	            db2.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	
	            db .executeSql('INSERT INTO "' + tableName + '" VALUES (?, ?)', [10, 'fifteen']);
	            db2.executeSql('INSERT INTO "' + tableName + '" VALUES (?, ?)', [10, 'fifty'  ]);
	        } finally {
	            db2.close();
	        }
	
	        expect(db.executeSql('SELECT y FROM "' + tableName + '" WHERE x = 10')).toEqual([{y: 'fifteen'}]);
	    });
	
	
	    it("VT287-34 | Destroy all the tables without giveing any value  |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        db.destroyTables({include: [], exclude: []});
	        expect(anyExists(tableNames)).toBe(false);
	    });
	
	    it("VT287-35 |destroy tables by passing invalid array parameters |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        db.destroyTables({include: ['t1', 't2', 't3', 't5'], exclude: ['t', 't', 't', 't']});
	        expect(allExist(tableNames)).toBe(true);
	    });
	
	    it("VT287-36 | DestroyTables with combination of valid  and invalid table names | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableNames = makeTableNames(4);
	        createTables(tableNames);
	        db.destroyTables({include: ['akk', tableNames[0]], exclude: ['bcc', tableNames[1]]});
	        expect(db.isTableExist(tableNames[0])).toBe(false);
	        expect(allExist(tableNames.slice(1))).toBe(true);
	    });
	
	
	    it("VT287-37 | Destroy all the tables without giveing any value  |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	        db.destroyTable('');
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	    
	    it("VT287-38 | CAll rollback Transaction without start Transaction  |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	       db.rollbackTransaction();
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	    
	    it("VT287-38 | Call rollback Transaction without start Transaction  |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT)');
	       db.rollbackTransaction();
	        expect(db.isTableExist(tableName)).toBe(true);
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
	
	    beforeEach(function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	    });
	
	    afterEach(function() {
	        db.close();
	        db = null;
	    });
	
	
	    // Database.prototype.startTransaction = function()
	    // Database.progtotype.commitTransaction = function()
	    it('starts and commits transaction', function() {
	        db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	
	        db.startTransaction();
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN']);
	        expect(db.executeSql('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	        db.commitTransaction();
	        expect(db.executeSql('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    // Database.prototype.startTransaction = function()
	    // Database.prototype.rollbackTransaction = function()
	    it('starts and rollbacks transaction', function() {
	        db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	
	        db.startTransaction();
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN']);
	        expect(db.executeSql('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	        db.rollbackTransaction();
	        expect(db.executeSql('SELECT * FROM t;')).toEqual([]);
	    });
	
	    // Database.prototype.lockDb = function()
	    // Database.prototype.unlockDb = function()
	    it('locks and unlocks database', function() {
	        db.lockDb();
	        db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN']);
	        db.unlockDb();
	        expect(db.executeSql('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    // Database.prototype.isUiWaitForDb = function()
	    it('calls isUiWaitForDb', function() {
	        expect(db.isUiWaitForDb()).toBe(false);
	    });
	
	    // Database.prototype.executeSql = function(/* const rho::String& */ sqlStmt, /* const rho::Vector<rho::String>& */ args)
	    it('executes SQL statements', function() {
	        db.executeSql('DROP TABLE IF EXISTS t;');
	        db.executeSql('CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN']);
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [11, 'eleven', 'ELEVEN']);
	        expect(db.executeSql('SELECT * FROM t ORDER BY x DESC;')).toEqual([{x: '11', y: 'eleven', z: 'ELEVEN'}, {x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    // Database.prototype.executeBatchSql = function(/* const rho::String& */ sqlStmt, /* const rho::Vector<rho::String>& */ args)
	    it('executes SQL statements as batch', function() {
	        db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN']);
	        db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [11, 'eleven', 'ELEVEN']);
	        expect(db.executeSql('SELECT * FROM t ORDER BY x DESC;')).toEqual([{x: '11', y: 'eleven', z: 'ELEVEN'}, {x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    // Database.prototype.destroyTable = function(/* const rho::String& */ tableName)
	    it('destroys table', function() {
	        db.executeBatchSql('CREATE TABLE IF NOT EXISTS t1(x INTEGER); CREATE TABLE IF NOT EXISTS t2(x INTEGER);');
	
	        db.destroyTable('t1');
	        db.destroyTable('t3');
	
	        expect(db.isTableExist('t1')).toBe(false);
	        expect(db.isTableExist('t2')).toBe(true);
	        expect(db.isTableExist('t3')).toBe(false);
	    });
	
	    // Database.prototype.destroyTables = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap)
	    describe('destroys multiple tables', function() {
	        var makeTest = function(name, include, exclude, remaining) {
	            var contains = function(array, item) {
	                for (var i = 0; i < array.length; ++i) {
	                    if (array[i] === item) {
	                        return true;
	                    }
	                }
	                return false;
	            };
	
	            it(name, function() {
	                for (var i = 1; i < 5; ++i) {
	                    db.executeSql('CREATE TABLE IF NOT EXISTS t' + i + '(x INTEGER);');
	                }
	
	                db.destroyTables({'include': include, 'exclude': exclude});
	
	                var actual = [];
	                for (var i = 1; i < 5; ++i) {
	                    if (db.isTableExist('t' + i)) {
	                        actual.push('t' + i);
	                    }
	                }
	                expect(actual).toEqual(remaining);
	            });
	        };
	
	        // names of tables to delete            included      excluded      remaining
	        makeTest('all'                       , [          ], [          ], [                ]);
	        makeTest('all but excluded'          , [          ], ['t2', 't1'], ['t1', 't2'      ]);
	        makeTest('included only'             , ['t2', 't1'], [          ], ['t3', 't4'      ]);
	        makeTest('included only but excluded', ['t2', 't1'], ['t2', 't3'], ['t2', 't3', 't4']);
	    });
	
	    // Database.prototype.isTableExist = function(/* const rho::String& */ tableName)
	    it('checks for table existence', function() {
	        db.executeSql('DROP TABLE IF EXISTS t;');
	        expect(db.isTableExist('t')).toBe(false);
	
	        db.executeSql('CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	        expect(db.isTableExist('t')).toBe(true);
	
	        db.executeSql('DROP TABLE IF EXISTS t;');
	        expect(db.isTableExist('t')).toBe(false);
	    });
	
	    // Database.prototype.setDoNotBackupAttribute = function(/* bool */ setFlag)
	    it('sets "don\'t backup attribute"', function() {
	        db.setDoNotBackupAttribute(true);
	    });
	
	    describe('edge cases', function() {
	        xit('open database twice and close once', function() {
	            var db2 = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	            db2.close();
	
	            try {
	                db.executeSql('CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	                expect(0).toBe(1);
	            } catch (e) {
	            }
	        });
	    });
	});
	
	describe('SQLite3', function () {
	    var db = null;
	
	    beforeEach(function() {
	        db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('local'), 'local');
	    });
	
	    afterEach(function() {
	        db.close();
	        db = null;
	    });
	
	    // function SQLite3()
	    // SQLite3.prototype.close = function(/* optional function */ oResult)
	    it('creates SQLite3 object and closes it', function() {
	        // look at beforeEach (creates database object) and afterEach (closes it)
	    });
	
	    // SQLite3.prototype.startTransaction = function(/* optional function */ oResult)
	    // SQLite3.prototype.commitTransaction = function(/* optional function */ oResult)
	    it('starts and commits transaction', function() {
	        db.execute('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));', true);
	
	        db.startTransaction();
	        db.execute('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', false, [10, 'ten', 'TEN']);
	        expect(db.execute('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	        db.commitTransaction();
	        expect(db.execute('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    // SQLite3.prototype.startTransaction = function(/* optional function */ oResult)
	    // SQLite3.prototype.rollbackTransaction = function(/* optional function */ oResult)
	    it('starts and rollbacks transaction', function() {
	        db.execute('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));', true);
	
	        db.startTransaction();
	        db.execute('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', false, [10, 'ten', 'TEN']);
	        expect(db.execute('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	        db.rollbackTransaction();
	        expect(db.execute('SELECT * FROM t;')).toEqual([]);
	    });
	
	    // SQLite3.prototype.lockDb = function(/* optional function */ oResult)
	    // SQLite3.prototype.unlockDb = function(/* optional function */ oResult)
	    it('locks and unlocks database', function() {
	        db.lockDb();
	        db.execute('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));', true);
	        db.execute('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', false, [10, 'ten', 'TEN']);
	        db.unlockDb();
	        expect(db.execute('SELECT * FROM t;')).toEqual([{x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    // SQLite3.prototype.destroyTables = function(/* const rho::Vector<rho::String>& */ include, /* const rho::Vector<rho::String>& */ exclude, /* optional function */ oResult)
	    describe('destroys tables', function() {
	        var makeTest = function(name, include, exclude, remaining) {
	            var contains = function(array, item) {
	                for (var i = 0; i < array.length; ++i) {
	                    if (array[i] === item) {
	                        return true;
	                    }
	                }
	                return false;
	            };
	
	            it(name, function() {
	                for (var i = 1; i < 5; ++i) {
	                    db.execute('CREATE TABLE IF NOT EXISTS t' + i + '(x INTEGER);');
	                }
	
	                db.destroyTables(include, exclude);
	
	                var actual = [];
	                for (var i = 1; i < 5; ++i) {
	                    if (db.isTableExist('t' + i)) {
	                        actual.push('t' + i);
	                    }
	                }
	                expect(actual).toEqual(remaining);
	            });
	        };
	
	        // names of tables to delete            included      excluded      remaining
	        makeTest('all'                       , [          ], [          ], [                ]);
	        makeTest('all but excluded'          , [          ], ['t2', 't1'], ['t1', 't2'      ]);
	        makeTest('included only'             , ['t2', 't1'], [          ], ['t3', 't4'      ]);
	        makeTest('included only but excluded', ['t2', 't1'], ['t2', 't3'], ['t2', 't3', 't4']);
	    });
	
	    // SQLite3.prototype.isTableExist = function(/* const rho::String& */ tableName, /* optional function */ oResult)
	    it('checks for table existence', function() {
	        db.execute('DROP TABLE IF EXISTS t;');
	        expect(db.isTableExist('t')).toBe(false);
	
	        db.execute('CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
	        expect(db.isTableExist('t')).toBe(true);
	
	        db.execute('DROP TABLE IF EXISTS t;');
	        expect(db.isTableExist('t')).toBe(false);
	    });
	
	    // SQLite3.prototype.isUiWaitForDb = function(/* optional function */ oResult)
	    it('checks something strange', function() {
	        expect(db.isUiWaitForDb()).toBe(false);
	    });
	
	    // SQLite3.prototype.execute = function(/* const rho::String& */ sqlStmt, /* bool */ isBatch, /* const rho::Vector<rho::String>& */ args, /* optional function */ oResult)
	    it('executes SQL statements', function() {
	        db.execute('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));', true);
	        db.execute('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', false, [10, 'ten', 'TEN']);
	        db.execute('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', false, [11, 'eleven', 'ELEVEN']);
	        expect(db.execute('SELECT * FROM t ORDER BY x DESC;')).toEqual([{x: '11', y: 'eleven', z: 'ELEVEN'}, {x: '10', y: 'ten', z: 'TEN'}]);
	    });
	
	    describe('SQLite3', function () {
	        it('restores dropped table on rollback and drops it on commit', function() {
	            db.execute('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER);', true);
	            expect(db.isTableExist('t')).toBe(true);
	
	            db.execute('BEGIN; DROP TABLE t; ROLLBACK;', true);
	            expect(db.isTableExist('t')).toBe(true);
	
	            db.execute('BEGIN; DROP TABLE t; COMMIT;', true);
	            expect(db.isTableExist('t')).toBe(false);
	        });
	    });
	});
});