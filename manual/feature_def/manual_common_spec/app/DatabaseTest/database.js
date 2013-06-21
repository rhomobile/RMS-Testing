function  noCommitDrop()
{
 var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
  db.startTransaction();
  db.executeBatchSql('DROP TABLE IF EXISTS Employee; CREATE TABLE Employee(x INTEGER, y TEXT)')  ;
 db.commitTransaction();
 db.startTransaction();
 db.destroyTable('Employee');
 var data=db.isTableExist('Employee');
$("#Rho_Database_Drop1 span.result").text($.toJSON(data));
}

function  checkNoCommitDrop()
{
  var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
  var value=db.isTableExist('Employee');
 var data=db.isTableExist('Employee');
$("#Rho_Database_Drop2 span.result").text($.toJSON(data));
}

function  noCommitCreate(){
 var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
 db.startTransaction();
 db.executeBatchSql('DROP TABLE IF EXISTS Employees; CREATE TABLE Employees(x INTEGER, y TEXT)')  ;
 db.destroyTable('Employee');
 var data=db.isTableExist('Employees');
$("#Rho_Database_Drop3 span.result").text($.toJSON(data));

}

function  checkNoCommitCreate(){
var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
  var data =db.isTableExist('Employees');
$("#Rho_Database_Drop4 span.result").text($.toJSON(data));
 }	
 
function batchArgs()
{

var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
 db.executeBatchSql('DROP TABLE IF EXISTS t27;CREATE TABLE t27(x INTEGER, y TEXT);INSERT INTO t27(x,y) VALUES(?,?)', [10,'fifteen']);
 var data  =db.executeSql('SELECT y FROM t27 WHERE x=10');
 $("#Rho_Database_Drop5 span.result").text($.toJSON(data));
 
 }