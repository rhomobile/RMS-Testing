require 'rho/rhocontroller'
require 'helpers/browser_helper'

class DatabaseController < Rho::RhoController
  include BrowserHelper

  @layout = 'System/layout'
  # GET /System
  def index
    render :back => '/app'
  end
 #Test case 1-To open a database
  def openDB
  db =Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{db.to_s}"
    redirect :action => :index
  end
 
# Test case2 - executeSql with no Args
  def executeNoArgs
   db =Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   db.executeSql("CREATE TABLE tall(x INTEGER, y TEXT)") 
   val=db.isTableExist("tall")
   puts "#{val}"
    redirect :action => :index
  end 

#Test case 3- excuteBatchSql with No Args
    
 def excuteBatchNoArgs
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   db.executeBatchSql("CREATE TABLE t1(x INTEGER, y TEXT);CREATE TABLE t2(x INTEGER, y TEXT);CREATE TABLE t3(x INTEGER, y TEXT);CREATE TABLE t4(x INTEGER, y TEXT)")
   puts "#{db.isTableExist("t1")}"
   puts "#{db.isTableExist("t2")}"
   puts "#{db.isTableExist("t3")}"
   puts "#{db.isTableExist("t4")}"
   redirect :action => :index
 end   
  
#Test case4- Destroy All Tables 
 def destroyAll
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  db1.executeBatchSql("CREATE TABLE t5(x INTEGER, y TEXT);CREATE TABLE t6(x INTEGER, y TEXT);CREATE TABLE t7(x INTEGER, y TEXT);CREATE TABLE t8(x INTEGER, y TEXT)")
   puts "#{db1.isTableExist("t5")}"
   puts "#{db1.isTableExist("t6")}"
   puts "#{db1.isTableExist("t7")}"
   puts "#{db1.isTableExist("t8")}"
  a=Array.new
  a<<"t5"<<"t6"<<"t7"<<"t8"
  db1.destroyTables({"include" =>a, "exclude" =>""})
   puts "#{db1.isTableExist("t5")}"
   puts "#{db1.isTableExist("t6")}"
   puts "#{db1.isTableExist("t7")}"
   puts "#{db1.isTableExist("t8")}"
   redirect :action => :index
 end
 
#Test case 5- To exclude tables from deletion
 def excludeTables
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   db1.executeBatchSql("CREATE TABLE t5(x INTEGER, y TEXT);CREATE TABLE t6(x INTEGER, y TEXT);CREATE TABLE t7(x INTEGER, y TEXT);CREATE TABLE t8(x INTEGER, y TEXT)")
     puts "#{db1.isTableExist("t5")}"
     puts "#{db1.isTableExist("t6")}"
     puts "#{db1.isTableExist("t7")}"
     puts "#{db1.isTableExist("t8")}"
     a=Array.new
     a<<"t6"<<"t7"
    db1.destroyTables({"include" =>"" , "exclude" =>a})
     puts "#{db1.isTableExist("t5")}"
     puts "#{db1.isTableExist("t6")}"
     puts "#{db1.isTableExist("t7")}"
     puts "#{db1.isTableExist("t8")}"
   redirect :action => :index
   end
   
#Test case6- To exclude and include few tables 
    
  def excludeFewTables
    db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
     db1.executeBatchSql("CREATE TABLE t9(x INTEGER, y TEXT);CREATE TABLE t10(x INTEGER, y TEXT);CREATE TABLE t11(x INTEGER, y TEXT);CREATE TABLE t12(x INTEGER, y TEXT)")
       puts "#{db1.isTableExist("t9")}"
       puts "#{db1.isTableExist("t10")}"
       puts "#{db1.isTableExist("t11")}"
       puts "#{db1.isTableExist("t12")}"
     a=Array.new
     a<<"t9"<<"t10"
     b=Array.new
    b<<"t11"<<"t12"
      db1.destroyTables({:include => a, :exclude => b})
       puts "#{db1.isTableExist("t9")}"
       puts "#{db1.isTableExist("t10")}"
       puts "#{db1.isTableExist("t11")}"
       puts "#{db1.isTableExist("t12")}"
    redirect :action => :index
     end
 
  # Test case7 - Destroying a single table 
        
   def destroytable
     db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
     db.executeSql("CREATE TABLE tab(x INTEGER, y TEXT)")
     puts "#{db.isTableExist("tab")}"
     db.destroyTable("tab")
     puts "#{db.isTableExist("tab")}"
     redirect :action => :index
     end
 
 # Test case8 - Close Database and Perform Database Transaction -see how to handle exception
     
 def closeDb
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   puts "#{db.to_s}"
   db.executeSql("CREATE TABLE close(x INTEGER, y TEXT)")
   puts "#{db.isTableExist("close")}"
   db.close()
   db.executeSql("CREATE TABLE b(x INTEGER, y TEXT)")
   puts "#{db.isTableExist("tab")}"
   redirect :action => :index
 end
 
 
 #Test case9- Close Database and try reading from DB-try handling exeception
 def closeRead
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   puts "#{db.to_s}"
   db.executeBatchSql("DROP TABLE IF EXISTS t15;CREATE TABLE t15(x INTEGER, y TEXT)")
   db.executeSql("INSERT INTO t15(x,y) VALUES(?,?)",[10,'ten'])
   puts "#{ db.executeSql("SELECT y FROM t15 WHERE x=10")}"
   db.close()
   puts "#{ db.executeSql("SELECT x FROM t15 WHERE y='ten'")}"
  redirect :action => :index
end
 
# Test case10- Open the closed Database and read from it 
def closeOpen
 db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{db.to_s}"
  db.executeBatchSql("DROP TABLE IF EXISTS t15;CREATE TABLE t15(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO t15(x,y) VALUES(?,?)",[10,'ten'])
  puts "#{ db.executeSql("SELECT y FROM t15 WHERE x=10")}"
  db.close()
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{ db.executeSql("SELECT x FROM t15 WHERE y='ten'")}"
redirect :action => :index
end

#Test case11-To Demonstrate Commit Transaction 

def commitTxn
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{db.to_s}"
  db.startTransaction()
  db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t20(x INTEGER, y TEXT)") 
  db.executeSql("INSERT INTO t20(x,y) VALUES(?,?)",[10,'ten'])
  db.commitTransaction()
  puts "#{ db.executeSql("SELECT y FROM t20 WHERE x=10")}"
Rho::WebView.execute_js("setFieldValue('Value returned from table','#{ db.executeSql("SELECT y FROM t20 WHERE x=10")}')") 
#Rho::WebView.executeJavascript("updateDiv('acceptLanguage','#{data}')")
redirect :action => :index
end

#Test case12- To Demonstrate rollbackTransaction
def rollbackTxn
 db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
 puts "#{db.to_s}"
 db.startTransaction()
 db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t20(x INTEGER, y TEXT)") 
 db.executeSql("INSERT INTO t20(x,y) VALUES(?,?)",[10,'fifteen'])
 puts "#{ db.executeSql("SELECT y FROM t20 WHERE x=10")}"
 db.rollbackTransaction()
 puts "#{ db.executeSql("SELECT y FROM t20  WHERE x=10")}"
redirect :action => :index
end
 
def test
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   puts "#{db.to_s}"
  puts "#{db.isTableExist("t16")}"
  db.executeSql("DROP TABLE IF EXISTS t16")
  puts "#{db.isTableExist("t16")}"
  redirect :action => :index
  end  
  
#Test case 13- To Demonstrate RollbackTransaction after calling CommitTranscation
  
def comRollTxn
 db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
 puts "#{db.to_s}"
 db.startTransaction()
 db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t20(x INTEGER, y TEXT)") 
 db.executeSql("INSERT INTO t20(x,y) VALUES(?,?)",[10,'fifteen'])
 db.commitTransaction()
puts "#{ db.executeSql("SELECT y FROM t20 WHERE x=10")}"
#db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t21(x INTEGER, y TEXT)")
#puts "#{ db.isTableExist("t21")}"
db.rollbackTransaction()
puts "#{ db.executeSql("SELECT y FROM t20 WHERE x=10")}"   
redirect :action => :index
end


#To demonstrate two DB objects pointing to two different  paths with different db partition 
def multiDBdifferent 
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "local");
  puts "#{db.to_s}"  
  db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
  puts "#{ db.isTableExist("t22")}"
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "zinga");
  puts "#{db1.to_s}"  
  db1.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
  puts "#{ db1.isTableExist("t22")}"
  db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
  db1.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifty'])
  puts "#{ db.executeSql("SELECT y FROM t22 WHERE x=10")}"   
  puts "#{ db1.executeSql("SELECT y FROM t22 WHERE x=10")}"   
  redirect :action => :index
end

#To demonstrate two DB objects pointing to two different paths with same db partition 
def multiDBsame
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "local");
  puts "#{db.to_s}"  
  db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
  puts "#{ db.isTableExist("t22")}"
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{db1.to_s}"  
  db1.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
  puts "#{ db1.isTableExist("t22")}"
  db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
  db1.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifty'])
  puts "#{ db.executeSql("SELECT y FROM t22 WHERE x=10")}"   
  puts "#{ db1.executeSql("SELECT y FROM t22 WHERE x=10")}"   
  redirect :action => :index
end

# To demonstrate two DB objects pointing to same path diffrent db partition 
def multiDBobjects
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   puts "#{db.to_s}"  
   db2=Rho::Database.new(Rho::Application.databaseFilePath('local'), "zinga");
   puts "#{db2.to_s}"  
   db.executeBatchSql("DROP TABLE IF EXISTS t23;CREATE TABLE t23(x INTEGER, y TEXT)")
   puts "#{ db.isTableExist("t23")}"
   db2.executeSql("INSERT INTO t23(x,y) VALUES(?,?)",[10,'fifty'])
   puts "#{ db.executeSql("SELECT y FROM t23 WHERE x=10")}" 
 redirect :action => :index 
end   
  
#To demonstarte two db objects  pointing to same path and same db partition-closing one db object 
def multiDBobjects2
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
    db=Rho::Database.new(File.join(getmodelpath, "test"), "local");
    puts "#{db.to_s}"  
    db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
    puts "#{ db.isTableExist("t22")}"
    db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
    puts "#{db1.to_s}"  
    db1.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
    puts "#{ db1.isTableExist("t22")}"
    db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
    db.close()
    db1.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifty'])
   # puts "#{ db.executeSql("SELECT y FROM t22 WHERE x=10")}"   
    puts "#{ db1.executeSql("SELECT y FROM t22 WHERE x=10")}"   
  redirect :action => :index
end  
  
#To demonstrate executeBatchSQL with args   
def batchArgs
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
    puts "#{db.to_s}"  
    db.executeBatchSql("DROP TABLE IF EXISTS t27;CREATE TABLE t27(x INTEGER, y TEXT);INSERT INTO t27(x,y) VALUES(?,?)", [10,'fifteen'])
    puts "#{ db.isTableExist("t27")}"
 # puts "#{ db.executeSql("INSERT INTO t26(x,y) VALUES(?,?)",[10,'fifty'])}"
   puts "#{ db.executeSql("SELECT y FROM t27 WHERE x=10")}"
   redirect :action => :index
end

# Destroy table with null Value
def dropNull
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
     puts "#{db.to_s}"  
   db.destroyTable("") 
  redirect :action => :index  
end

def destroyTwice 
     db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
     db.executeBatchSql("DROP TABLE IF EXISTS tab;CREATE TABLE tab(x INTEGER, y TEXT)")
     puts "#{db.isTableExist("tab")}"
     db.destroyTable("tab")
     puts "#{db.isTableExist("tab")}"
     db.destroyTable("tab")
     redirect :action => :index
    end
    
    
 # isTable exist with null value
def nullTable
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  puts "#{db.to_s}"  
  puts "#{db.isTableExist("")}"
  redirect :action => :index
end 
  
# Call rollbackTransaction without StartTransaction 
def rollTxn
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  db.executeBatchSql("DROP TABLE IF EXISTS fab;CREATE TABLE fab(x INTEGER, y TEXT)")
   puts "#{db.isTableExist("fab")}"
   db.rollbackTransaction()
  puts "#{db.isTableExist("fab")}"
  redirect :action => :index
end   

# invalid execute statement passed with executeSQL 
def invalidSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  puts "#{db.to_s}"
  db.executeBatchSql("DROP TABLE IF EXISTS fab;CREATE taasf  fab(x INTEGER, y TEXT)")
   puts "#{db.isTableExist("fab")}"   
  redirect :action => :index
end  

# initiate DB at invalid file path 
def fooDB
 db=Rho::Database.new("/fooo/fooo/fooo", "local");
 puts "#{db.to_s}"
  redirect :action => :index
end

# executeBatchSql method with one invalid statement-Drop , both the tables should get created 

def invalidBSql
db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  puts "#{db.to_s}"
db.executeBatchSql("CREATE TABLE t29(x INTEGER, y TEXT);DROP EXISTS t25;CREATE TABLE t30(x INTEGER, y TEXT)")
  puts "#{db.isTableExist("t29")}"
  puts "#{db.isTableExist("t30")}"
db.executeSql("DROP TABLE IF EXISTS t29")
 db.executeSql("DROP TABLE IF EXISTS t30")
  redirect :action => :index
end

# ExecuteSql with null statement 
def nullSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
   puts "#{db.to_s}"
   db.executeSql("") 
  redirect :action => :index
end 

# ExecuteBatchSql with null statement 
def nullBSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  puts "#{db.to_s}"
  db.executeBatchSql("") 
  redirect :action => :index
end 

# Call commmitTransaction without startTransaction

def nullCommit
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  puts "#{db.to_s}"
  db.executeBatchSql("DROP TABLE IF EXISTS bob;CREATE TABLE bob(x INTEGER, y TEXT)") 
  db.commitTransaction()
  puts "#{db.isTableExist("bob")}"
  redirect :action => :index
end 

# Db object with invalid Partition 
def invalidPartition
  db=Rho::Database.new(Rho::Application.databaseFilePath('local')); 
   puts "#{db.to_s}"
  redirect :action => :index
end  

#To demonstrate two DB objects pointing to two different  paths with different db partition -Close one db object .

def closeIrrDb
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "Deva"), "local");
  puts "#{db.to_s}"  
  db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT )")
  puts "#{ db.isTableExist("t22")}"
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "zinga");
  puts "#{db1.to_s}"  
  db1.executeBatchSql("DROP TABLE IF EXISTS t23;CREATE TABLE t23(x INTEGER, y TEXT)")
  puts "#{ db1.isTableExist("t23")}"
  db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
  db1.executeSql("INSERT INTO t23(x,y) VALUES(?,?)",[10,'fifty'])
  db.close()
Rho::WebView.execute_js("setFieldValue('#{ db1.executeSql("SELECT y FROM t23 WHERE x=10")}')") 
  puts "#{ db1.executeSql("SELECT y FROM t23 WHERE x=10")}"   
  puts "#{ db.executeSql("SELECT y FROM t22 WHERE x=10")}"   
  redirect :action => :index    
end  

def lockDB
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "local");
  puts "#{db.to_s}"  
  db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)")
   puts "#{ db.isTableExist("t22")}"
   db.lockDb()
end
  
def write
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "local");
  puts "#{db.to_s}"  
  db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
puts "#{ db.executeSql("SELECT y FROM t22 WHERE x=10")}" 
end

#Invalid db path and invalid db partition 
def invalid
 db=Rho::Database.new("/fooo/fooo/fooo", "@$$%%@#");
 puts "#{db}"
 Rho::WebView.execute_js("setFieldValue('#{db}')") 
 redirect :action => :index
end

#valid db path and invalid db partition 
def invalid1
 getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
 db=Rho::Database.new(File.join(getmodelpath, "test"), "@#%^&*#");
 puts "#{db}"
 Rho::WebView.execute_js("setFieldValue('#{db}')") 
 redirect :action => :index
end

#user defined database "app"

def dbApp
 db =Rho::Database.new(Rho::Application.databaseFilePath('app'), "app");
 Rho::WebView.execute_js("setFieldValue('#{db.to_s}')")
 db.executeBatchSql("DROP TABLE IF EXISTS app;CREATE TABLE app(x INTEGER, y TEXT)") 
 val=db.isTableExist("app")
 Rho::WebView.execute_js("setFieldValue('Table created?')")  
 Rho::WebView.execute_js("setFieldValue('#{ val }')")  
 redirect :action => :index
 end

#user defined database "user "
def dbUser
 db =Rho::Database.new(Rho::Application.databaseFilePath('user'), "user");
 Rho::WebView.execute_js("setFieldValue('#{db.to_s}')")
 db.executeBatchSql("DROP TABLE IF EXISTS user;CREATE TABLE user(x INTEGER, y TEXT)") 
 val=db.isTableExist("user")
 Rho::WebView.execute_js("setFieldValue('Table created')")  
 Rho::WebView.execute_js("setFieldValue('#{ val }')")  
 redirect :action => :index
 end
 
#
def destroyTablesNull
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  db1.executeBatchSql("CREATE TABLE t5(x INTEGER, y TEXT);CREATE TABLE t6(x INTEGER, y TEXT);CREATE TABLE t7(x INTEGER, y TEXT);CREATE TABLE t8(x INTEGER, y TEXT)")
  #val1= db1.isTableExist("t5")
  #val2= db1.isTableExist("t6")
  #val3= db1.isTableExist("t7")
  #val4= db1.isTableExist("t8")
  
  db1.destroyTables({"include" =>"", "exclude" =>""})
  val1= db1.isTableExist("t5")
  val2= db1.isTableExist("t6")
  val3= db1.isTableExist("t7")
  val4= db1.isTableExist("t8")
  puts "#{val1}"
 if  (val1==false && val2 ==false && val3==false && val4==false)
   Rho::WebView.execute_js("setFieldValue('Tables deleted')")  
 else
   Rho::WebView.execute_js("setFieldValue('Tables not deleted')")
 end
   redirect :action => :index
 end

def destroyTablesInvalid
 db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
 a=Array.new
 a<<"a"<<"b"
 b=Array.new
 b<<"c"<<"d"
 db1.destroyTables({:include => a, :exclude => b})
 redirect :action => :index
 end 

def destroyTablesInvalid1
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   db1.executeBatchSql("CREATE TABLE t9(x INTEGER, y TEXT);CREATE TABLE t10(x INTEGER, y TEXT);CREATE TABLE t11(x INTEGER, y TEXT);CREATE TABLE t12(x INTEGER, y TEXT)")
   a=Array.new
   a<<"a"<<"t10"
   b=Array.new
   b<<"b"<<"t12"
  db1.destroyTables({:include => a, :exclude => b})
  val1= db1.isTableExist("t9")
  val2= db1.isTableExist("t10")
  val3= db1.isTableExist("t11")
  val4= db1.isTableExist("t12")
  if  (val1==true && val2 ==false && val3==true && val4==true)
   Rho::WebView.execute_js("setFieldValue('valid tables are deleted ')")  
  else
   Rho::WebView.execute_js("setFieldValue('Valid Tables not deleted')")
  end
 redirect :action => :index
  end   
  
  
def tableExistInvalid
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  Rho::WebView.execute_js("setFieldValue('#{db1.isTableExist("!@^&%$$%")}')")
  
end

def noCommit
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "deva");
  db.startTransaction()
  db.executeBatchSql("DROP TABLE IF EXISTS comp; CREATE TABLE comp(x INTEGER, y TEXT)")  
  Rho::WebView.execute_js("setFieldValue('#{db.isTableExist("comp")}')")
end

def checkNoCommit 
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "deva");
  Rho::WebView.execute_js("setFieldValue('#{db.isTableExist("comp")}')")
end

def rollDestroyTable
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "deva");
  db.startTransaction()
  db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t20(x INTEGER, y TEXT)") 
  db.executeSql("INSERT INTO t20(x,y) VALUES(?,?)",[10,'fifteen'])
  db.commitTransaction()
  db.startTransaction()
  db.executeSql("DROP TABLE t20")
  db.rollbackTransaction()
 Rho::WebView.execute_js("setFieldValue('#{ db.executeSql("SELECT y FROM t20  WHERE x=10")}')")
redirect :action => :index
end

def columnAdd
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{db}"
   db.executeBatchSql("DROP TABLE IF EXISTS Company;CREATE TABLE Company(Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)") 
   db.executeBatchSql("INSERT INTO Company(Id,EMPLOYEE,Designation) VALUES (1,'deva','SystemEngineer');INSERT INTO Company(Id,EMPLOYEE,Designation) VALUES (2,'deva','SystemEngineer');INSERT INTO Company(Id,EMPLOYEE,Designation) VALUES (3,'bhaktha','SystemEngineer')")
   db.executeSql("ALTER TABLE Company ADD COLUMN Manager")
  Rho::WebView.execute_js("setFieldValue('#{ db.executeSql("SELECT Manager FROM company")}')" )
   #db.executeBatchSql("INSERT ")
end


def databaseNull
  db=Rho::Database.new()
  puts "#{db}"
end

def databaseNullPath
  db=Rho::Database.new("","Reddy")
 Rho::WebView.execute_js("setFieldValue('#{db}')" )
end

def databaseLong 
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv"), "deva");
  Rho::WebView.execute_js("setFieldValue('#{db}')" )
end

def NoCommitDrop
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "deva");
  db.startTransaction()
  db.executeBatchSql("DROP TABLE IF EXISTS Employee; CREATE TABLE Employee(x INTEGER, y TEXT)")  
 db.commitTrnsaction()
db.destroyTable("Employee")
 Rho::WebView.execute_js("setFieldValue('#{db.isTableExist("Employee")}')")
 end


def checkNoCommitDrop 
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "deva");
  Rho::WebView.execute_js("setFieldValue('#{db.isTableExist("Employee")}')")
end

def RowDelete
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  puts "#{db}"
  db.executeBatchSql("DROP TABLE IF EXISTS Company;CREATE TABLE Company(Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)") 
  db.executeBatchSql("INSERT INTO Company(Id,EMPLOYEE,Designation) VALUES (1,'deva','SystemEngineer');INSERT INTO Company(Id,EMPLOYEE,Designation) VALUES (2,'deva','SystemEngineer');INSERT INTO Company(Id,EMPLOYEE,Designation) VALUES (3,'bhaktha','SystemEngineer')")
  db.executeSql("DELETE FROM Company WHERE ID=?",[1])
  Rho::WebView.execute_js("setFieldValue('#{ db.executeSql("SELECT * FROM company Where Id=2")}')" )
  #db.executeBatchSql("INSERT ")/ll
end



end
