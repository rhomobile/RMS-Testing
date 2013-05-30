describe('<database module spes>', function(){
		
	var data;
	var tableName;
    var db;

    beforeEach(function() {
        db = ''
        tableName = ''
        data = ''
    });
    
    afterEach(function() {
	    
	    tableName=null;

	});
	
	it("VT287-1 |To Open a DatabaseRho.Database| ", function() {
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	});
	

	it("VT287-02 | ExecuteSql without passing Args | ", function() {
			
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		  
		tableName = getRandomName();
		db.executeSql('CREATE TABLE ' + tableName + '(x INTEGER, y TEXT)');
		data = db.isTableExist(tableName);
		expect(data.toString).toEqual('true');

	});


	  
	it("VT287-003 |executeBatchSql without passing any Args|", function() {
			
		var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		var  tableName1 = getRandomName();
		var  tableName2 = getRandomName();
		var  tableName3 = getRandomName();
		var  tableName4 = getRandomName();
	  
	  	db.executeBatchSql('CREATE TABLE'+tableName1+'(x INTEGER, y TEXT);CREATE TABLE' +tableName2+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName3+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName4+'(x INTEGER, y TEXT)');
	  	
	  	if (db.isTableExist(tableName1) && db.isTableExist(tableName2) && db.isTableExist(tableName3) && db.isTableExist(tableName4))
	  	{
	    	data = 'true';
	  	}
	  	else
	  	{
		
			data = 'false';
	  	}
	  	expect(data.toString).toEqual('true');

		});
	
	it("VT287-4 | Destroy all the tables   |'true' ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

		var  tableName5 = getRandomName();
		var  tableName6 = getRandomName();
		var  tableName7 = getRandomName();
		var  tableName8 = getRandomName();
	  
	   	db.executeBatchSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT);CREATE TABLE' +tableName6+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName7+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName8+'(x INTEGER, y TEXT)');
		
		var a= new Array[tableName5,tableName6,tableName7,tableName8];
		
		db.destroyTables({'include': a, 'exclude': []});
	 	
	 	if (db.isTableExist(tableName5) && db.isTableExist(tableName6) && db.isTableExist(tableName7) && db.isTableExist(tableName8))
	  	{
	    	data = 'true';
	  	}
	  	else
	  	{

	    	data = 'false';
	  	}

	  	expect(data.toString).toEqual('true');

	});

	 
	it("VT287-05 | Destroy all the tables except few   |'true' ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

		var  tableName5 = getRandomName();
		var  tableName6 = getRandomName();
		var  tableName7 = getRandomName();
		var  tableName8 = getRandomName();
	  
	    db.executeBatchSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT);CREATE TABLE' +tableName6+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName7+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName8+'(x INTEGER, y TEXT)');
		db.destroyTables({'include':[], 'exclude': [tableName7,tableName8]});
	 
	 	if (db.isTableExist(tableName7) && db.isTableExist(tableName8))
	  	{
	    	data = 'true';
	  	}
	  	else
	  	{
		
	    	data = 'false';
	  	}

	  	expect(data.toString).toEqual('true');

	});

	 
	it("VT287-06 | Include and Exclude with Values  |'true' ", function() {
	
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

		var  tableName5 = getRandomName();
		var  tableName6 = getRandomName();
		var  tableName7 = getRandomName();
		var  tableName8 = getRandomName();
	  
	   	db.executeBatchSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT);CREATE TABLE' +tableName6+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName7+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName8+'(x INTEGER, y TEXT)');
		db.destroyTables({'include':[tableName5,tableName6], 'exclude': [tableName7,tableName8]});
	 
	 	if (db.isTableExist(tableName7) && db.isTableExist(tableName8))
	  	{
	    	data = 'true';
	  	}
	  	else
	  	{
		  	data = 'false';
	  	}
	  
	  	expect(data.toString).toEqual('true');

	});

	
	it("VT287-007|Destroy single table| ", function() {

    	db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
     
    	var tableName5 =getRandomName()
     	
     	db.executeSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT)');
     	db.destroyTable(tableName5);
    	
    	if (db.isTableExist(tableName5))
      		data = 'true';
    	else
      		data = 'false';
      	
      	expect(data.toString).toEqual('true');
	});
	
	it("VT287-008|Close the Database and Read from it| ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		
		var tableName =getRandomName();
	   	
	   	db.executeSql('CREATE TABLE' +tableName+'(x INTEGER, y TEXT)');
	   	db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[10,'ten']);
	   	db.close();
	   	
	   	try{
		 	var value = db.executeSql('SELECT x FROM'+tableName+ 'WHERE y = "ten"');
	   	}
	    catch(err){
	    	data = err.message;
	    }
	   
	    displayResult("VT287-008|Close the Database and Read from it| ",data);

	    expect(data.toString).toEqual('undefined method execute for nil:NilClass');
		
	});
	
	
	it("VT287-009 |Close the Database and write to it| ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

		var tableName =getRandomName();	 
		
		try {
			db.executeSql('CREATE TABLE' +tableName5+'(x INTEGER, y TEXT)');
			db.close();
			db.executeSql('CREATE TABLE willnevercreated(x INTEGER, y TEXT)');
		}

		catch(err)
		{	
			data =err.message ;
		}
	
		displayResult("VT287-009 |Close the Database and write to it| ",data);

		expect(data.toString).toEqual('undefined method execute for nil:NilClass');

	});
		

	it("VT287-10|Close the Database and Open it |10", function() {
		
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		
		var tableName =getRandomName();
		
		db.executeSql('CREATE TABLE' +tableName+'(x INTEGER, y TEXT)');
		db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[10,'ten']);
		db.close();
		
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		data= db.executeSql('SELECT x FROM'+tableName+ 'WHERE y= "ten"');
		
		displayResult("VT287-10|Close the Database and Open it |10",$.toJSON(data));
		expect(data['x']).toEqual(10);

	});
			
	it("VT287-11 | To do a database transaction |10 ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		db.startTransaction();
		
		var tableName =getRandomName();
		
		db.executeBatchSql('DROP TABLE IF EXISTS' +tableName+ ';CREATE TABLE' +tableName+'(x INTEGER, y TEXT)') ;
		db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[10,'ten']);
		db.commitTransaction();
		
		data= db.executeSql('SELECT x FROM'+tableName+ 'WHERE y="ten"');

		displayResult("VT287-11 | To do a database transaction |10 ",$.toJSON(data));
		expect(data['x']).toEqual(10);

	});
		
		
	it("VT287-12 | To demonstrate rollbacktranscation () |'fifteen' ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		db.startTransaction();
		
		var tableName =getRandomName();
		
		db.executeBatchSql('DROP TABLE IF EXISTS' +tableName+ ';CREATE TABLE' +tableName+'(x INTEGER, y TEXT)') ;
		db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[10,'fifteen']);
		db.rollbackTransaction();
		
		try{
		    data = db.executeSql('SELECT y FROM' +tableName+'WHERE x=10');
		}
		catch(err)
		{
		    data = err.message
		}
		
    	displayResult("VT287-12 | To demonstrate rollbacktranscation () |'fifteen' ",$.toJSON(data))
		expect(data['y']).toEqual('fifteen');

	});
		
		
    it("VT287-13 | To demonstrate rollbacktranscation after commitTransaction() |'fifteen' ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		
		var tableName =getRandomName();
		
		db.executeBatchSql('DROP TABLE IF EXISTS' +tableName+ ';CREATE TABLE' +tableName+'(x INTEGER, y TEXT)') ;
		db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[10,'fifteen']);
		
		db.commitTransaction();
		db.rollbackTransaction();
	
		data = db.executeSql('SELECT y FROM' +tableName+'WHERE x=10');
		
		displayResult("VT287-13 | To demonstrate rollbacktranscation after commitTransaction() |'fifteen' ",$.toJSON(data));
		expect(data['y']).toEqual('fifteen');

	});
		
        
    it("VT287-14 | To demonstrate executeSql by passing null value | ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

		var tableName =getRandomName();
        
	    try{
        	db.executeSql('');
        }
        catch(err){
        	data= err.message;
        }
        expect(data).toEqual('could not execute statement: 21; Message: not an error');
        displayResult("VT287-14 | To demonstrate executeSql by passing null value | ",$.toJSON(data));
        
	});
		
        it("VT287-15 | To demonstrate executeSql by passing null value | ", function() {
	    db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	    var tableName =getRandomName();
        
        try{
        	 db.executeSql('');
        }
        catch(err){
        	 data= err.message;
        }
        expect(data).toEqual('could not execute statement: 21; Message: not an error');
        displayResult("VT287-14 | To demonstrate executeSql by passing null value | ",$.toJSON(data));

	});
        
    it("VT287-16 | To demonstrate executeBatchSql by passing null value | ", function() {
			
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		var tableName =getRandomName();
        
        try{
        	 db.executeBatchSql('');
        }
        catch(err){
        	 data= err.message;
        }
        
        expect(data).toEqual('could not execute statement');
        displayResult("VT287-16 | To demonstrate executeSql by passing null value | ",$.toJSON(data))
        

    });
        
        
    it("VT287-17 | calling commitTransaction without startTransaction |'true' ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		var tableName =getRandomName();
	    db.executeSql('DROP TABLE IF EXISTS' +tableName+ ';CREATE TABLE' +tableName+'(x INTEGER, y TEXT)') ;
        db.commitTransaction();
        
        if (db.isTableExist(tableName5))
		{
        data = 'true';
	}
      else
	  {
        data = 'false';
	}
        expect(data).toEqual('true');

  	});
        
     
    it("VT287-18 | Try openeing database without passing dbPartition parameter | ", function() {

	try {
					
		  db=new Rho.Database(Rho.Application.databaseFilePath('local'));
    }
			
    catch(err){
        	data= err.message;
    }
          expect(data).toEqual('wrong number of arguments');
          displayResult("VT287-18 | Try openeing database without passing dbPartition parameter | ",$.toJSON(data))
        

	});
        
        
        
    it("VT287-19 | Try openeing database with invalid dbpath and invalid Dbparameter | ", function() {

		  data = ''
		
	try {
					
		  db=new Rho.Database('/fooo/fooo/fooo', '@$$%%@#');
	}
			
    catch(err){
        	data= err.message;
    }
        expect(data).toEqual('Error code: 14; Message: unable to open database file');
        displayResult("VT287-19 | Try openeing database with invalid dbpath and invalid Dbparameter | ",$.toJSON(data))
        

	});        
        
    it("VT287-20| Try openeing database with invalid DbParameter with special characters | ", function() {
		
				  data = ''
		
		try {
			var	getmodelpath = Rho.RhoApplication.get_model_path('app', 'Settings');
		    db=new Rho.Database(File.join(getmodelpath, 'test'), '@#%^&*#');
					  
	}
			
        catch(err){
        	data= err.message;
    }
        expect(data).toEqual('Rho::Database');
        displayResult("VT287-20| Try openeing database with invalid DbParameter with special characters | ",$.toJSON(data))
        

	});        
         
        
	it("VT287-21 |Opening Database at predefined partition app|'true'", function() {
    		
   	
    	db = new Rho.Database(Rho.Application.databaseFilePath('app'), 'app');
    	  
    	tableName = getRandomName();
        db.executeSql('CREATE TABLE ' + tableName + '(x INTEGER, y TEXT)');
    	data = db.isTableExist(tableName);
         expect(data).toEqual('true');
    
    });
        
        
    it("VT287-22 |Opening Database at predefined partition user|'true'", function() {
    		
   	
    	 db = new Rho.Database(Rho.Application.databaseFilePath('user'), 'user');
    	  
    	 tableName = getRandomName();
    	 db.executeSql('CREATE TABLE ' + tableName + '(x INTEGER, y TEXT)');
    	 data = db.isTableExist(tableName);
    		expect(data).toEqual('true');
    	
    });
        
        
    it("VT287-23|isTableExist with invalid value|'false'", function() {
    		
   	
    	   db = new Rho.Database(Rho.Application.databaseFilePath('user'), 'user');

    	   data = db.isTableExist('!@^&%$$%');
    		expect(data).toEqual('false');

    });
        
        
        
    it("VT287-24 | rollback called after drop table  |'true' ", function() {

		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		tableName =getRandomName();
		db.startTransaction()
		db.executeBatchSql('DROP TABLE IF EXISTS' +tableName+ ';CREATE TABLE' +tableName+'(x INTEGER, y TEXT)') ;
	    db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[10,'fifteen']);
	    db.commitTransaction();
    
        db.startTransaction()
		db.executeSql('INSERT INTO' +tableName+'(x,y) VALUES(?,?)',[11,'six']);
		db.executeSql('DROP TABLE' +tableName);
		db.rollbackTransaction();
		data = db.isTableExist(tableName);
		expect(data).toEqual('true');

    });
        
        
    it("VT287-25 | Try openeing database without passing any parameter | ", function() {
			
		data = '';
		
		try {
				
		db=new Rho.Database();
		}
			
        catch(err){
        	data= err.message;
    	}
       
	    expect(data).toEqual('wrong number of arguments');
        displayResult("VT287-25 | Try openeing database without passing any parameter | ",$.toJSON(data));
        
			
	});     
        

    it("VT287-26 | Try opening database with 256 character long Partition name | ", function() {
	
		data = '';
		
		try {
			var	getmodelpath = Rho.RhoApplication.get_model_path('app', 'Settings');
		    db=new Rho.Database(File.join(getmodelpath, 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'), 'deva');
		}
        catch(err){
        	data= err.message;
    	}
        
		expect(data).toEqual('Error code: 14; Message: unable to open database file');
        displayResult("VT287-26 | Try openeing database with 256 character long Partition name | ",$.toJSON(data))
        
	
	});    
        
        
    it("VT287-27 | Try openeing database without dbPath and only dbPartiton | ", function() {
			
				  data = '';
		
		try {
					
					  db=new Rho.Database('','Reddy');
	}
			
        catch(err){
        	data= err.message;
    }
        expect(data).toEqual('Error code: 14; Message: unable to open database file');
        displayResult("VT287-27 | Try openeing database without dbPath and only dbPartiton | ",$.toJSON(data))
        
			
	}); 
        
        
    it("VT287-28 | rollback called after drop table  |'true' ", function() {
	
		db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
		tableName =getRandomName();
		db.executeBatchSql('CREATE TABLE' +tableName+'(Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)') ;
		db.executeBatchSql('INSERT INTO' +tableName+'(Id,EMPLOYEE,Designation) VALUES (1,"deva","SystemEngineer");INSERT INTO' +tableName+'(Id,EMPLOYEE,Designation) VALUES (2,"deva","SystemEngineer");INSERT INTO' +tableName+'(Id,EMPLOYEE,Designation) VALUES (3,"bhaktha","SystemEngineer")');
		db.executeSql('DELETE FROM' +tableName+ 'WHERE ID=?',[1]);

		data= db.executeSql('SELECT * FROM' +tableName+ 'Where Id=1');

        if (data!= null)
        {
        	data='failed';
        }
        
        else
        {
        	   data = 'RECORD DOESNT EXISTS'
        }
        expect(data).toEqual('RECORD DOESNT EXISTS');
        displayResult("VT287-28 | rollback called after drop table  |'true' ", $.toJSON(data))
		
			
	});
        
        
    it("VT287-29 |Add a new Column using Execute SQL| ", function() {
		
			db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			tableName =getRandomName();
			db.executeBatchSql('CREATE TABLE' +tableName+'(Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)') ;
			db.executeBatchSql('INSERT INTO' +tableName+'(Id,EMPLOYEE,Designation) VALUES (1,"deva","SystemEngineer");INSERT INTO' +tableName+'(Id,EMPLOYEE,Designation) VALUES (2,"deva","SystemEngineer");INSERT INTO' +tableName+'(Id,EMPLOYEE,Designation) VALUES (3,"bhaktha","SystemEngineer")');
			db.executeSql('ALTER TABLE' +tableName+ 'ADD COLUMN Manager');
			db.executeSql('UPDATE' +tableName+ 'SET Manager="Kumar Sunil"');
		    data = db.executeSql('SELECT Manager FROM' +tableName+ ' WHERE Id=1');
		    expect(data['Manager']).toEqual('Kumar Sunil');
		   displayResult("VT287-29 | rollback called after drop table  |'true' ",  $.toJSON(data))

	});
        
		
        
    
	it("VT287-30|Destroy same table Twice | ", function() {
				
			 db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			     
			 var tableName5 =getRandomName();
			 db.executeSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT)');
			 db.destroyTable(tableName5);
			 db.destroyTable(tableName5);
	    if (db.isTableExist(tableName5))
		{
			      data = 'true';
	    }
			    else{
			      data = 'false';
	    }
			    expect(data).toEqual('false');

	});
				 
			 
	it("VT287-31|Operating two db objects with diff path and diff Partition | ", function() {
				
			tableName =getRandomName();
			db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			db.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
			db.executeSql('INSERT INTO' +tableName+ 'VALUES(?,?)',[10,'fifteen']);
			var  value = db.executeSql('SELECT y FROM'+tableName+'WHERE x=10');

			var getmodelpath = Rho.RhoApplication.get_model_path('app', 'Settings');
			var db1=new Rho.Database(File.join(getmodelpath, 'testDB2'), 'testDB2');
			db1.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
			db1.executeSql('INSERT INTO' +tableName+ 'VALUES(?,?)',[10,'fifty']);
			data = db1.executeSql('SELECT y FROM'+tableName+'WHERE x=10');
             expect(data['y']).toEqual('fifty');
		    displayResult("VT287-31|Operating two db objects with diff path and diff Partition | ",$.toJSON(data))
				 
			 
					
	});
			 
			 
			 
	it("VT287-32|two db objects for the same db file and closing one instance of it  | ", function() {
				
			 tableName = getRandomName();
			 db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			 var db1 = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			 db.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
			 db.executeSql('INSERT INTO' +tableName+ 'VALUES(?,?)',[10,'fifteen']);
			 db.close();

			  try{
			  
			   data= db1.executeSql('SELECT y FROM'+tableName+'WHERE x=10');
			   
	}
               catch(err)
			  {
					data= err.message;
    }
              expect(data['y']).toEqual('fifteen');
			  displayResult("VT287-32|two db objects for the same db file and closing one instance of it  | ",$.toJSON(data))
			 
					
	});
			 
			 
			 
	it("VT287-33|Operating two db objects with diff path and diff Partition and closing one db object  | ", function() {

			 tableName =getRandomName();
			 db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			 db.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
			 db.executeSql('INSERT INTO' +tableName+ 'VALUES(?,?)',[10,'fifteen']);

			var getmodelpath = Rho.RhoApplication.get_model_path('app', 'Settings');
			var db1=new Rho.Database(File.join(getmodelpath, 'testDB2'), 'testDB2');
			db.close();
			try{
			 db1.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
			 db1.executeSql('INSERT INTO' +tableName+ 'VALUES(?,?)',[10,'fifty']);
			 data = db1.executeSql('SELECT y FROM'+tableName+'WHERE x=10');
			 }
			 catch(err){
				 data=err.message;
			 }
			 expect(data['y']).toEqual('fifty');
			 displayResult("VT287-33|Operating two db objects with diff path and diff Partition and closing one db object  | ",$.toJSON(data))
					
	});
			 			 
			 
    it("VT287-34 | Destroy all the tables without giveing any value  |'true' ", function() {
	
			db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

			 var  tableName5 = getRandomName();
			 var  tableName6 = getRandomName();
			 var  tableName7 = getRandomName();
			 var  tableName8 = getRandomName();
			  
			 db.executeBatchSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT);CREATE TABLE' +tableName6+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName7+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName8+'(x INTEGER, y TEXT)');
			var a= new Array[tableName5,tableName6,tableName7,tableName8];
			db.destroyTables({'include':'' , 'exclude':'' });
			if (db.isTableExist(tableName5) && db.isTableExist(tableName6) && db.isTableExist(tableName7) && db.isTableExist(tableName8))
			  {
			    data = 'true';
			  }
			  else
			  {
				
			    data = 'false';
			  }

			  expect(data).toEqual('true');
			 
					
	});
			 
	it("VT287-35 |destroy tables by passing invalid array parameters |'true' ", function() {
				
			db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
                 
			var  tableName5 = getRandomName();
			var  tableName6 = getRandomName();
			var  tableName7 = getRandomName();
			var  tableName8 = getRandomName();
			  
			   db.executeBatchSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT);CREATE TABLE' +tableName6+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName7+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName8+'(x INTEGER, y TEXT)');
			var a= new Array[table1,table2,table3,table5];
			var b= new Array[table,table,table,table]
			try{
			db.destroyTables({'include': a , 'exclude': b });
			db.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
			
			 if (db.isTableExist(tableName) )
			  {
			    data = 'true';
			  }
			  else
			  {
				
			    data = 'false';
			  }
			}
             catch (err){
			data=err.message ;
     }
			 expect(data).toEqual('true');
             displayResult("VT287-35 |destroy tables by passing invalid array parameters |'true' ",$.toJSON(data))
		
	});
			 
	it("VT287-36 | DestroyTables with combination of valid  and invalid table names | ", function() {
						
			db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

		    var  tableName5 = getRandomName();
			var  tableName6 = getRandomName();
		    var  tableName7 = getRandomName();
			var  tableName8 = getRandomName();
					  
		    db.executeBatchSql('CREATE TABLE'+tableName5+'(x INTEGER, y TEXT);CREATE TABLE' +tableName6+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName7+ '(x INTEGER, y TEXT);CREATE TABLE' +tableName8+'(x INTEGER, y TEXT)');
			var a= new Array["akk",tableName5];
			var b= new Array["bcc",tableName6]
			db.destroyTables({'include': a, 'exclude': b});
			if (db.isTableExist(tableName6))
					  {
					   data = 'true';
	}
					  else
					  {
						
					    data = 'false';
	}

					 expect(data).toEqual('true');
					 displayResult("VT287-36 | Destroy all the tables without giveing any value  |'true' ", $.toJSON(data))
							
	});
					 
			 
	it("VT287-37 | Destroy all the tables without giveing any value  |'true' ", function() {
							
					db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');

					tableName = getRandomName();
					db.executeSql('CREATE TABLE'+tableName+'(x INTEGER, y TEXT)');
					 try {
					db.destroyTable('');
	}
			 
			 catch(err)
					 {
						 data=err.message;
    }
					 if (db.isTableExist(tableName))
					  {
					    data = 'true';
	}
					  else
					  {
						
					    data = 'false';
    }
					 expect(data).toEqual('true');
					 displayResult("VT287-37 | Destroy all the tables without giveing any value  |'true' ",$.toJSON(data));
						
	});
				
					 
});