var databaseModule = new Array;

databaseModule[databaseModule.length] = [["VT282-298","To Open a Database","Rho::Database"],
["self","openDB","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To demonstrate executeSql() method with no args","true"],
["self","executeNoArgs","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To demonstrate executeBatchSql() method with no args and multiple sql statements","true"],
["self","excuteBatchNoArgs","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Destroy all tables","false"],
["self","destroyAll","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Destroy all tables except few: Check excluded table still exist","true"],
["self","excludeTables_exist","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Destroy all tables except few: Check other tables should not be there","false"],
["self","excludeTables_notexist","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Destroy multiple tables: Include two tables, Exclude two tables, leave one untouch","true"],
["self","excludeFewTables","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Destroy single table","false"],
["self","destroytable","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Close the Database and Read from it","undefined method `execute' for nil:NilClass"],
["self","closeRead","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Close the Database and Write to it ","undefined method `execute' for nil:NilClass"],
["self","closeDb","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Close the Database and Read from it","10"],
["self","closeOpen","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To do a database transaction","ten"],
["self","commitTxn","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To demonstrate rollbacktranscation ()","could not prepare statement: 1; Message: no such table: t21"],
["self","rollbackTxn","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To call Rollback transaction after commiting the transaction ","fifteen"],
["self","comRollTxn","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Destroy table method with null value","true"],
["self","dropNull","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Delete table method with table already deleted","false"],
["self","destroyTwice","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","isTableExist() with null value","false"],
["self","nullTable","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","call rollbackTranscation() without startTrnasaction()","true"],
["self","rollTxn","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To call executeSql method without a valid SQL statement","could not execute statement: 1; Message: near \"taasf\": syntax error"],
["self","invalidSql","method"]
]

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","initialize DB at invalid file path","DB query failed. Error code: 14; Message: unable to open database file"],
["self","fooDB","method"]
]
*/

databaseModule[databaseModule.length] = [["VT282-298","executeBatchSQL with one invalid statement","could not execute statement: 1; Message: near \"EXISTS\": syntax error"],
["self","invalidBSql","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","executeSql with null value","could not execute statement: 21; Message: not an error"],
["self","nullSql","method"]
]

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","executeBatchSql with null value","could not execute statement"],
["self","nullBSql","method"]
]
*/

databaseModule[databaseModule.length] = [["VT282-298","call commitTranscation() without startTrnasaction()","true"],
["self","nullCommit","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","open DB with no DB partition","wrong number of arguments"],
["self","invalidPartition","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To demonstrate two DB objects pointing to two different  paths with different db partition","fifteen,fifty"],
["self","multiDBdifferent","method"]
]

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","To demonstrate two DB objects pointing to same path different db partition","fifty"],
["self","multiDBobjects","method"]
]
*/

databaseModule[databaseModule.length] = [["VT282-298","To demonstarte two DB objects  pointing to same path and same db partition-closing one db object","could not prepare statement: 21; Message: out of memory"],
["self","multiDBobjects2","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","To demonstrate two DB objects pointing to two different  paths with different db partition and Close one db object","fifteen,fifty"],
["self","closeIrrDb","method"]
]

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","Invalid db path and invalid partition","Error code: 14; Message: unable to open database file"],
["self","invalid","method"]
]
*/

databaseModule[databaseModule.length] = [["VT282-298","valid db path and invalid partition","Rho::Database"],
["self","invalid1","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","valid db path and pre defined partition \"user\"","true"],
["self","dbUser","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","valid db path and pre defined partition \"app\"","true"],
["self","dbApp","method"]
]

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","DestroyTables with null value","true"],
["self","destroyTablesNull","method"]
]
*/

databaseModule[databaseModule.length] = [["VT282-298","destroyTables with invalid table names","true"],
["self","destroyTablesInvalid","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","DestroyTables with combination of valid  and invalid table names","true"],
["self","destroyTablesInvalid1","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","isTableExists with special characters","false"],
["self","tableExistInvalid","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Rollback transaction after destroy tables","true"],
["self","rollDestroyTable","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","Add a new Column using Execute SQL","Kumar Sunil"],
["self","columnAdd","method"]
]

databaseModule[databaseModule.length] = [["VT282-298","call Database.new with null","wrong number of arguments"],
["self","databaseNull","method"]
]

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","Database with 256 characters long file path","Error code: 14; Message: unable to open database file"],
["self","databaseLong","method"]
]
*/

/* edge case test
databaseModule[databaseModule.length] = [["VT282-298","call Database.new with no Db path","Error code: 14; Message: unable to open database file"],
["self","databaseNullPath","method"]
]
*/

databaseModule[databaseModule.length] = [["VT282-298","Drop a entire Row using ExecuteBatch SQL","RECORD DOESNT EXISTS"],
["self","RowDelete","method"]
]


