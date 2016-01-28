//
// This is for WebSQL using SQLITE. This could well change to IndexDB at some point as WebSQL doesn't
// seem to have full industry support and may disappear.
//
// NB. API is asynchronous only
//

function isDatabaseSupported() {
	return window.openDatabase;
}

//
// Create the database if not already there
//
function createDatabase() {  
    try {  
        if (!isDatabaseSupported()) {  
            alert('Databases are not supported in this browser.');  
        } else {  
        	//console.log("Creating db");
            var shortName = 'oneserve';  
            var version = '1.0';  
            var displayName = 'Oneserve';  
            var maxSize = 1024000; //  bytes  
            db = openDatabase(shortName, version, displayName, maxSize);
        }  
    } catch(e) {      	
        if (e == 2) // Version number mismatch.  
        {              
            console.log("Invalid database version.");  
        } else {  
            console.log("Unknown error "+e+".");  
        }  
    }  
} 	

//
// Initialise the database tables
//
function initDatabase() {
	console.log("initialising db");
	try
	{
		//console.log("init db: "+db);
		db.transaction(function(tx) {
			//console.log("executeSql");
			tx.executeSql('CREATE TABLE IF NOT EXISTS SOR (id INTEGER PRIMARY KEY, '
					+ 'cost_type_id FLOAT, cost_group_id FLOAT, code VARCHAR(25), name VARCHAR(200),'
					+ 'description VARCHAR(500), cost MONEY)', [],
					function (result){
						console.log("SOR table created");
					},
					function (tx, error){
						console.log(error);
						return true;
					}
				);
			//console.log("after execute");
			}			
		);
		//console.log("init finished");
	}
	catch (e)
	{
		console.log("Initialising db error: "+e);
	}
}	

//
// insert all downloaded SOR data
//
function bulkInsertSOR(data) {
	  for (x=0;x<data.sors.length;x++)
	  {
		  insertSOR(data.sors[x].cost_type_id, data.sors[x].cost_group_id, data.sors[x].code,
				  data.sors[x].name, data.sors[x].description, data.sors[x].cost);
	  }
}

function insertSOR(a,b,c,d,e,f) {
    db.transaction(function(tx) {
       tx.executeSql('INSERT INTO SOR (cost_type_id, cost_group_id, code, name, description, cost)' 
				+ 'VALUES (?, ?, ?, ?, ?, ?)', [a,b,c,d,e,f],
			function(tx) {
				localStorage.sorCount++;  // something we can test rather that a db count
			}
		)
    });
}

//
// check for SOR data already present
//
function downloadSORs() {
	var sql = "select count(*) as count from SOR";
	db.transaction(function(tx) {
		tx.executeSql(sql, [], 
			function (transaction, results) {
				var row = results.rows.item(0);
				//console.log("SOR count: "+row.count);
				if (row.count == 0)
				{
					// do the download
					localStorage.sorCount = 0;
					var res = jQuery.parseJSON(localStorage.resource);
					sorWorker.postMessage(res.user+","+res.pass+","+localStorage.ctx);					
				}
			}
		)
	});	
}


