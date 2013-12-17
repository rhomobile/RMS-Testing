require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'
require 'helpers/spec_helper'

class DatabaseController < Rho::RhoController
  
#  def self.call_before_all_methods
#    Alert.show_popup("working!!")
#  end
  
  def opendb
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    render :json => db.to_s
    return db.to_s
  end
  
  def createdb
      db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
      tableName = Library.getRandomName
      db.executeSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)") 
      data = db.isTableExist(tableName)
      db.close
      render :text => data.to_s
      return data.to_s
  end
  
  def executedb
      db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
      tableName1 = Library.getRandomName
      tableName2 = Library.getRandomName
      tableName3 = Library.getRandomName
      tableName4 = Library.getRandomName
      db.executeBatchSql("CREATE TABLE #{tableName1}(x INTEGER, y TEXT);CREATE TABLE #{tableName2}(x INTEGER, y TEXT);CREATE TABLE #{tableName3}(x INTEGER, y TEXT);CREATE TABLE #{tableName4}(x INTEGER, y TEXT)")
      if db.isTableExist(tableName1) && db.isTableExist(tableName2) && db.isTableExist(tableName3) && db.isTableExist(tableName4)
        data = 'true'
      else
        data = 'false'
      end
      db.close
      render :text => data.to_s
      return data.to_s
  end

  def destroyAll
     db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
     tableName5 = Library.getRandomName
     tableName6 = Library.getRandomName
     tableName7 = Library.getRandomName
     tableName8 = Library.getRandomName
     
     db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
     
     a=Array.new
     a<<tableName5<<tableName6<<tableName7<<tableName8
    
     db1.destroyTables({"include" =>a, "exclude" =>""})
      
     if db1.isTableExist(tableName5) || db1.isTableExist(tableName6) || db1.isTableExist(tableName7) || db1.isTableExist(tableName8)
       data = 'true'
     else
       data = 'false'
     end
    db1.close
    render :text => data.to_s
    return data.to_s
  end

  def excludeTables_exist
     db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
    
     tableName5 = Library.getRandomName
     tableName6 = Library.getRandomName
     tableName7 = Library.getRandomName
     tableName8 = Library.getRandomName
     
     db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
       
     db1.destroyTables({:include => [], :exclude => [tableName6, tableName7]})
       
     if db1.isTableExist(tableName6) && db1.isTableExist(tableName7)
       data = 'true'
     else
       data = 'false'
     end
     db1.close
     render :text => data.to_s
     return data.to_s
  end
   
  def excludeTables_notexist
     db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
    
     tableName5 = Library.getRandomName
     tableName6 = Library.getRandomName
     tableName7 = Library.getRandomName
     tableName8 = Library.getRandomName
     
     db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
       
     db1.destroyTables({:include => [], :exclude => [tableName6, tableName7]})
       
     if db1.isTableExist(tableName5) && db1.isTableExist(tableName8)
       data = 'true'
     else
       data = 'false'
     end
     db1.close
     render :text => data.to_s
     return data.to_s
  end
  
  def include_exclude_tables
     db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
    
     tableName5 = Library.getRandomName
     tableName6 = Library.getRandomName
     tableName7 = Library.getRandomName
     tableName8 = Library.getRandomName
     tableName9 = Library.getRandomName

     db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT);CREATE TABLE #{tableName9}(x INTEGER, y TEXT)")
     
     a=Array.new
     a<<tableName5<<tableName6
     
     b=Array.new
     b<<tableName7<<tableName8
    
     db1.destroyTables({:include => a, :exclude => b})
     
     if !(db1.isTableExist(tableName5) || db1.isTableExist(tableName6)) && (db1.isTableExist(tableName7) && db1.isTableExist(tableName8) && db1.isTableExist(tableName9))
      data = 'true'
     else
      data = 'false'
     end
     db1.close
     render :text => data.to_s
     return data.to_s
  end
  
  def destroytable
     db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local") 

     tableName5 = Library.getRandomName
     db.executeSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT)")
     db.destroyTable(tableName5)
     
     if db.isTableExist(tableName5)
      data = 'true'
     else
      data = 'false'
     end
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def closedb_read
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")

    tableName5 = Library.getRandomName
    db.executeSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT)")
    db.executeSql("INSERT INTO #{tableName5}(x,y) VALUES(?,?)", [10, 'ten'])
    
    db.close
    
    begin
     y= db.executeSql("SELECT x FROM #{tableName5} WHERE y = 'ten'")
    rescue => ex
     data = ex.message
    end
    
    render :text => data.to_s
    return data.to_s
  end
  
  def closedb_write
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
   
    tableName5 = Library.getRandomName
    db.executeSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT)")
    db.close
   
    begin
      db.executeSql("CREATE TABLE willnevercreated(x INTEGER, y TEXT)")
    rescue => ex
      data = ex.message
    end
      
    render :text => data.to_s
    return data.to_s
  end

  def closeOpen
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
     
    db.executeBatchSql("DROP TABLE IF EXISTS t15;CREATE TABLE t15(x INTEGER, y TEXT)")
    db.executeSql("INSERT INTO t15(x,y) VALUES(?,?)",[10,'ten'])
    
    db.close
    
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
    value = db.executeSql("SELECT x FROM t15 WHERE y='ten'")
    data = value[0]['x']

    render :text => data.to_s
    return data.to_s
  end

  def commitTxn
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
  
    db.startTransaction()
    db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t20(x INTEGER, y TEXT)") 
    db.executeSql("INSERT INTO t20(x,y) VALUES(?,?)",[10,'ten'])
    db.commitTransaction()
  
    value = db.executeSql("SELECT y FROM t20 WHERE x=10")
    data = value[0]['y']
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def rollbackTxn
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
  
   db.startTransaction()
   db.executeBatchSql("DROP TABLE IF EXISTS t21;CREATE TABLE t21(x INTEGER, y TEXT)") 
   db.executeSql("INSERT INTO t21(x,y) VALUES(?,?)",[10,'fifteen'])
   db.rollbackTransaction()
  
   begin
      value = db.executeSql("SELECT y FROM t21  WHERE x=10")
   rescue => ex
      data = ex.message
   end
   db.close
   render :text => data.to_s
   return data.to_s
  end
  
  def comRollTxn
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
   db.startTransaction()
   db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)") 
   db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
   db.commitTransaction()
   db.rollbackTransaction()
  
   value = db.executeSql("SELECT y FROM t22 WHERE x=10")
   
   data = value[0]['y']
   db.close
   render :text => data.to_s
   return data.to_s
  end

  def executeNull
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
    
    begin
     db.executeSql("")
    rescue => ex
     data = ex.message
    end
    db.close
    render :text => data.to_s
    return data.to_s
  end

  def executeBatchNull # need to check
     db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
      
     begin
      db.executeBatchSql('')
     rescue => ex
      data = ex.message
      #Alert.show_popup(ex.to_s)
     end
     db.close
     render :text => data.to_s
     return data.to_s
  end
  
  def opendb_app
       db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
       tableName = Library.getRandomName
       db.executeSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)") 
       data = db.isTableExist(tableName)
       db.close
       render :text => data.to_s
       return data.to_s
  end
  
  def opendb_user
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
    tableName = Library.getRandomName
    db.executeSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)") 
    data = db.isTableExist(tableName)
    db.close
    render :text => data.to_s
    return data.to_s     
  end

  def rollbackAftDrop
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName = Library.getRandomName
    db.executeBatchSql("DROP TABLE IF EXISTS #{tableName}; CREATE TABLE #{tableName} (x INTEGER, y TEXT);")
    
    db.startTransaction()
    db.executeSql("DROP TABLE #{tableName}")
    db.rollbackTransaction();
    
    data = db.isTableExist(tableName)
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def rollbackAftDrop1 #need to change the test case name
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName = Library.getRandomName
    db.executeBatchSql("CREATE TABLE #{tableName} (Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)")
    db.executeBatchSql("INSERT INTO #{tableName} (Id, EMPLOYEE, Designation) VALUES (1, 'deva', 'SystemEngineer'); INSERT INTO #{tableName} (Id, EMPLOYEE, Designation) VALUES (2, 'deva', 'SystemEngineer'); INSERT INTO #{tableName} (Id, EMPLOYEE, Designation) VALUES (3, 'bhaktha', 'SystemEngineer');")
    db.executeSql("DELETE FROM #{tableName} WHERE ID = ?", 1)
    
    data = db.executeSql("SELECT * FROM #{tableName} WHERE Id = 1")
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def addColumn
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName = Library.getRandomName
    
    db.executeBatchSql("CREATE TABLE #{tableName} (Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)")
    db.executeBatchSql("INSERT INTO #{tableName} (Id, EMPLOYEE, Designation) VALUES (1, 'deva', 'SystemEngineer'); INSERT INTO #{tableName} (Id, EMPLOYEE, Designation) VALUES (2, 'deva', 'SystemEngineer'); INSERT INTO #{tableName} (Id, EMPLOYEE, Designation) VALUES (3, 'bhaktha', 'SystemEngineer');")
    db.executeSql("ALTER TABLE #{tableName} ADD COLUMN Manager")
    db.executeSql("UPDATE #{tableName} SET Manager = 'Jagadeesh Subbu'")
    data = db.executeSql("SELECT Manager FROM #{tableName} WHERE Id=1")
    db.close
    render :json => data.to_s
    return data.to_s
  end
  
  def destroyTwice
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")
    tableName = Library.getRandomName
    db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
    db.destroyTable(tableName)
    db.destroyTable(tableName)
  
    if db.isTableExist(tableName)
      data = 'true'
    else
      data = 'false'
    end
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def multiDBdifferent
    tableName = Library.getRandomName
    
    db=Rho::Database.new(Rho::Application.databaseFilePath('testDB1'), "testDB1")
    db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
    db.executeSql("INSERT INTO #{tableName} VALUES(?,?)", 10,'fifteen')
    value = db.executeSql("SELECT y FROM #{tableName} WHERE x=10")
    
    db1=Rho::Database.new(Rho::Application.databaseFilePath('testDB2'), "testDB2")
    db1.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
    db1.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)", 10,'fifty')
    value1 = db1.executeSql("SELECT y FROM #{tableName} WHERE x=10")
    
    data = value[0]['y'].to_s + "," + value1[0]['y'].to_s
    db1.close
    render :text => data
    return data
  end

  def multiDBdifferent_close
    tableName = Library.getRandomName
            
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    db1 = Rho::Database.new(Rho::Application.databaseFilePath('testDB2'), 'testDB2')
            
    
    db.executeSql("CREATE TABLE #{tableName} (x INTEGER, y TEXT)")
    db1.executeSql("CREATE TABLE #{tableName} (x INTEGER, y TEXT)")
            
    db.executeSql("INSERT INTO #{tableName} VALUES (?, ?)", 10, 'fifteen')
    db1.executeSql("INSERT INTO #{tableName} VALUES (?, ?)", 10, 'fifty')
    db1.close()
            
    value = db.executeSql("SELECT y FROM #{tableName} WHERE x = 10")
    data = value[0]['y']
    db.close
    db1.close
    render :text => data.to_s
    return data.to_s
  end
  
  def destroyAllTable_withoutvalue
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName5 = Library.getRandomName
    tableName6 = Library.getRandomName
    tableName7 = Library.getRandomName
    tableName8 = Library.getRandomName
    db.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
    db.destroyTables({:include=> [], :exclude=> []})
    if db.isTableExist(tableName5) || db.isTableExist(tableName6) || db.isTableExist(tableName7) || db.isTableExist(tableName8)
       data = 'true'
    else
       data = 'false'
    end
    db.close
    render :text => data.to_s
    return data.to_s
  end

  def destroyAllTable_withinvalid
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName5 = Library.getRandomName
    tableName6 = Library.getRandomName
    tableName7 = Library.getRandomName
    tableName8 = Library.getRandomName
    db.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
    db.destroyTables({:include=> ['t1', 't2', 't3', 't4'], :exclude=> ['t', 't', 't', 't']})
    if db.isTableExist(tableName5) && db.isTableExist(tableName6) && db.isTableExist(tableName7) && db.isTableExist(tableName8)
       data = 'true'
    else
       data = 'false'
    end
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def destroyTables_val_inval
    db1 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName5 = Library.getRandomName
    tableName6 = Library.getRandomName
    tableName7 = Library.getRandomName
    tableName8 = Library.getRandomName
    db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
    db1.destroyTables({:include=> ['akk', tableName5], :exclude=> ['bcc', tableName6]})
    
    if db1.isTableExist(tableName5)
      data1 = "true"
    else
      data1 = "false"
    end
    if db1.isTableExist(tableName6) && db1.isTableExist(tableName7) && db1.isTableExist(tableName8)
      data2 = "true"
    else
      data2 = "false"
    end
    data = data1 + ',' + data2
    db1.close
    render :text => data
    return data
  end
  
  def destroyTable_novalue
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName = Library.getRandomName
    db.executeSql("CREATE TABLE #{tableName} (x INTEGER, y TEXT)")
    db.destroyTable('')
    if db.isTableExist(tableName)
      data = true
    else
      data = false
    end
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  def callRollback_withoutStartTrans
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    tableName = Library.getRandomName
    db.executeSql("CREATE TABLE #{tableName} (x INTEGER, y TEXT)")
    db.rollbackTransaction
    if db.isTableExist(tableName)
       data = true
    else
       data = false
    end
    db.close
    render :text => data.to_s
    return data.to_s
  end
  
  # Dev Set.. SQL queries test
  def start_commit_tranx
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');

    db.startTransaction
    db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN'])
    data1 = db.executeSql('SELECT * FROM t;')
    db.commitTransaction
    data2 = db.executeSql('SELECT * FROM t;')
    db.close
    render :json => { :d1 => data1.to_s, :d2 => data2.to_s}
    return data1.to_s + '|' + data2.to_s
  end
  
   def start_rollback_tranx
      db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
      db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
  
      db.startTransaction
      db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN'])
      data1 = db.executeSql('SELECT * FROM t;')
      db.rollbackTransaction
      data2 = db.executeSql('SELECT * FROM t;')
      db.close
      render :json => { :d1 => data1.to_s, :d2 => data2.to_s}
      return data1.to_s + '|' + data2.to_s
    end
    
    def lock_unlock_table
      db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
      db.lockDb
      db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
      db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN'])
      db.unlockDb
      data = db.executeSql('SELECT * FROM t;')
      db.close
      render :json => data.to_s
      return data.to_s
    end
  
   def isUiWaitForDb
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     data = db.isUiWaitForDb
     db.close
     render :json => data.to_s
     return data.to_s
   end
   
   def sql_statements
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
       
     db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN'])
     db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [11, 'eleven', 'ELEVEN'])
     data = db.executeSql('SELECT * FROM t;')
     db.close
     render :json => data.to_s
     return data.to_s
   end
   
   def sql_statements1
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     db.executeBatchSql('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));');
       
     db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [10, 'ten', 'TEN'])
     db.executeSql('INSERT INTO t (x, y, z) VALUES (?, ?, ?);', [11, 'eleven', 'ELEVEN'])
     data = db.executeSql('SELECT * FROM t ORDER BY x DESC;')
     db.close
     render :json => data.to_s
     return data.to_s
   end
   
   def destroy_table
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     db.executeBatchSql('CREATE TABLE IF NOT EXISTS t1(x INTEGER); CREATE TABLE IF NOT EXISTS t2(x INTEGER);');
       
     db.destroyTable('t1');
     db.destroyTable('t3');
     
     if !db.isTableExist('t1') && db.isTableExist('t2') && !db.isTableExist('t3')
       data = true
     else
       data = false
     end
     db.close
     render :text => data.to_s
     return data.to_s
   end
   
   def table_existance
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     db.executeSql('DROP TABLE IF EXISTS t;')
     data1 = db.isTableExist('t')
       
     db.executeSql('CREATE TABLE t(x INTEGER, y TEXT, z VARCHAR(10));')
     data2 = db.isTableExist('t')

     db.executeSql('DROP TABLE IF EXISTS t;')
     data3 = db.isTableExist('t')
     
     if !data1 && data2 && !data3
       data = "correct"
     else
       data = "wrong"
     end
     db.close
     render :text => data.to_s
     return data.to_s
   end
      
   def sqlite3_ops # db.execute not present so not used
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     db.execute('DROP TABLE IF EXISTS t; CREATE TABLE t(x INTEGER);')
     data1 = db.isTableExist('t')
     
     db.execute('BEGIN; DROP TABLE t; ROLLBACK;')
     data2 = db.isTableExist('t')

     db.execute('BEGIN; DROP TABLE t; COMMIT;')
     data3 = db.isTableExist('t')
     
     if data1 && data2 && !data3
       data = "correct"
     else
       data = "wrong"
     end
     db.close
     render :text => data.to_s
     return data.to_s
   end
   
   def destroyMultipleTables
     db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
     
     (1..4).each do |i|
         db.executeSql("CREATE TABLE IF NOT EXISTS t#{i} (x INTEGER);")
     end
     db.destroyTables({:include=> [], :exclude=> []})
     rem =[]
     (1..4).each do |i|
         j = "t" + i.to_s
         if db.isTableExist(j)
           rem << j
         end
     end
     data1 = rem
     
     (1..4).each do |i|
         db.executeSql("CREATE TABLE IF NOT EXISTS t#{i} (x INTEGER);")
     end
     db.destroyTables({:include=> [], :exclude=> ['t1','t2']})
     rem =[]
     (1..4).each do |i|
         j = "t" + i.to_s
         if db.isTableExist(j)
           rem << j
         end
     end
     data2 = rem
     
     (1..4).each do |i|
         db.executeSql("CREATE TABLE IF NOT EXISTS t#{i} (x INTEGER);")
      end
     db.destroyTables({:include=> ['t1','t2'], :exclude=> []})
     rem =[]     
     (1..4).each do |i|
              j = "t" + i.to_s
              if db.isTableExist(j)
                rem << j
              end
          end
     data3 = rem
     
     (1..4).each do |i|
         db.executeSql("CREATE TABLE IF NOT EXISTS t#{i} (x INTEGER);")
     end
     db.destroyTables({:include=> ['t1','t2'], :exclude=> ['t2','t3']})
     rem =[]    
     (1..4).each do |i|
              j = "t" + i.to_s
              if db.isTableExist(j)
                rem << j
              end
          end
     data4 = rem
     
     db.close
     render :json => { :d1 => data1.to_s, :d2 => data2.to_s, :d3 => data3.to_s, :d4 => data4.to_s}
     return data1.to_s + '|' + data2.to_s + '|' + data3.to_s + '|' + data4.to_s
   end
   
#  private_class_method :call_before_all_methods
#  call_before_all_methods
   
end