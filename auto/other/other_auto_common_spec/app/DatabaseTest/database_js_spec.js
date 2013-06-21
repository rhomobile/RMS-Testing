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
	
	  
	    it("VT287-14 | To demonstrate executeSql by passing null value | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var description;
	        try{
	            db.executeSql('');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('could not execute statement: 21; Message: not an error');
	    });
	
	    it("VT287-15 | To demonstrate executeSql by passing null value | ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var description;
	        try{
	            db.executeSql('');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('could not execute statement: 21; Message: not an error');
	    });
	
	    it("VT287-17 | calling commitTransaction without startTransaction |'true' ", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	
	        var tableName = getRandomName();
	        db.executeSql('DROP TABLE IF EXISTS "' + tableName + '"; CREATE TABLE "' + tableName + '" (x INTEGER, y TEXT);') ;
	        db.commitTransaction();
	        expect(db.isTableExist(tableName)).toBe(true);
	    });
	
	    it("VT287-18 | Try openeing database without passing dbPartition parameter | ", function() {
	        var description;
	        try {
	            db = new Rho.Database(Rho.Application.databaseFilePath('local'));
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('wrong number of arguments');
	    });
	
	    it("VT287-19 | Try openeing database with invalid dbpath and invalid Dbparameter | ", function() {
	        var description;
	        try {
	            db = new Rho.Database('/fooo/fooo/fooo', '@$$%%@#');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('Error code: 14; Message: unable to open database file');
	    });
	
	    it("VT287-20| Try openeing database with invalid DbParameter with special characters | ", function() {
	        var description;
	        try {
	            var getmodelpath = Rho.Application.get_model_path('app', 'Settings');
	            db = new Rho.Database(File.join(getmodelpath, 'test'), '@#%^&*#');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toEqual('Error code: 14; Message: unable to open database file');
	    });
	
	    it("VT287-23|isTableExist with invalid value|", function() {
	        db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	        expect(db.isTableExist('!@^&%$$%')).toBe(false);
	    });
	
	    it("VT287-25 | Try openeing database without passing any parameter | ", function() {
	        var description;
	        try {
	            db = new Rho.Database();
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('wrong number of arguments');
	    });
	
	    it("VT287-26 | Try opening database with 256 character long Partition name | ", function() {
	        var dbName = File.join(Rho.Application.get_model_path('app', 'Settings'), 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv');
	
	        var description;
	        try {
	            db = new Rho.Database(dbName, 'deva');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('Error code: 14; Message: unable to open database file');
	    });
	
	    it("VT287-27 | Try openeing database without dbPath and only dbPartiton | ", function() {
	        var description;
	        try {
	            db = new Rho.Database('', 'Reddy');
	        } catch (e) {
	            description = e.description;
	        }
	        expect(description).toBe('Error code: 14; Message: unable to open database file');
	    });
	
	    it("VT287-32|two db objects for the same db file and closing one instance of it  | ", function() {
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
	

	    
	});
	
	
});