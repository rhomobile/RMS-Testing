require 'rho/rhocontroller'
require 'helpers/browser_helper'

class FindBySqlController < Rho::RhoController
  include BrowserHelper

  def testcase1
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySql")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySql.setModelProperty("id", "string", "")
    FindBySql.setModelProperty("department", "string", "")
    FindBySql.setModelProperty("name", "string", "")
    FindBySql.setModelProperty("age", "integer", "")
    FindBySql.setModelProperty("percentage", "integer", "")
    objData1 = FindBySql.createObject(data1)
    objData2 = FindBySql.createObject(data2)
    objData3 = FindBySql.createObject(data3)
    result = FindBySql.find_by_sql("SELECT * FROM FindBySql")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end

  def testcase2
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlLocal")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "92"
    FindBySqlLocal.setModelProperty("id", "string", "")
    FindBySqlLocal.setModelProperty("department", "string", "")
    FindBySqlLocal.setModelProperty("name", "string", "")
    FindBySqlLocal.setModelProperty("age", "integer", "")
    FindBySqlLocal.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlLocal.createObject(data1)
    objData2 = FindBySqlLocal.createObject(data2)
    objData3 = FindBySqlLocal.createObject(data3)
    result = FindBySqlLocal.find_by_sql("SELECT * FROM FindBySqlLocal")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end

  def testcase3
    db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlApp")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlApp.setModelProperty("id", "string", "")
    FindBySqlApp.setModelProperty("department", "string", "")
    FindBySqlApp.setModelProperty("name", "string", "")
    FindBySqlApp.setModelProperty("age", "integer", "")
    FindBySqlApp.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlApp.createObject(data1)
    objData2 = FindBySqlApp.createObject(data2)
    objData3 = FindBySqlApp.createObject(data3)
    result = FindBySqlApp.find_by_sql("SELECT * FROM FindBySqlApp")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end

  def testcase4
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySql")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySql.setModelProperty("id", "string", "")
    FindBySql.setModelProperty("department", "string", "")
    FindBySql.setModelProperty("name", "string", "")
    FindBySql.setModelProperty("age", "integer", "")
    FindBySql.setModelProperty("percentage", "integer", "")
    objData1 = FindBySql.createObject(data1)
    objData2 = FindBySql.createObject(data2)
    objData3 = FindBySql.createObject(data3)
    result = FindBySql.find_by_sql("SELECT * FROM FindBySql WHERE department = 'Electronics'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end

  def testcase5
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlLocal")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlLocal.setModelProperty("id", "string", "")
    FindBySqlLocal.setModelProperty("department", "string", "")
    FindBySqlLocal.setModelProperty("name", "string", "")
    FindBySqlLocal.setModelProperty("age", "integer", "")
    FindBySqlLocal.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlLocal.createObject(data1)
    objData2 = FindBySqlLocal.createObject(data2)
    objData3 = FindBySqlLocal.createObject(data3)
    result = FindBySqlLocal.find_by_sql("SELECT * FROM FindBySqlLocal WHERE department = 'Electronics'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end

  def testcase6
    db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlApp")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlApp.setModelProperty("id", "string", "")
    FindBySqlApp.setModelProperty("department", "string", "")
    FindBySqlApp.setModelProperty("name", "string", "")
    FindBySqlApp.setModelProperty("age", "integer", "")
    FindBySqlApp.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlApp.createObject(data1)
    objData2 = FindBySqlApp.createObject(data2)
    objData3 = FindBySqlApp.createObject(data3)
    result = FindBySqlApp.find_by_sql("SELECT * FROM FindBySqlApp WHERE department = 'Electronics'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end
def testcase7
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySql")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySql.setModelProperty("id", "string", "")
    FindBySql.setModelProperty("department", "string", "")
    FindBySql.setModelProperty("name", "string", "")
    FindBySql.setModelProperty("age", "integer", "")
    FindBySql.setModelProperty("percentage", "integer", "")
    objData1 = FindBySql.createObject(data1)
    objData2 = FindBySql.createObject(data2)
    objData3 = FindBySql.createObject(data3)
    result = FindBySql.find_by_sql("SELECT * FROM FindBySql WHERE department = 'Mechanical'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end
def testcase8
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlLocal")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlLocal.setModelProperty("id", "string", "")
    FindBySqlLocal.setModelProperty("department", "string", "")
    FindBySqlLocal.setModelProperty("name", "string", "")
    FindBySqlLocal.setModelProperty("age", "integer", "")
    FindBySqlLocal.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlLocal.createObject(data1)
    objData2 = FindBySqlLocal.createObject(data2)
    objData3 = FindBySqlLocal.createObject(data3)
    result = FindBySqlLocal.find_by_sql("SELECT * FROM FindBySqlLocal WHERE department = 'Mechanical'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end
def testcase9
    db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlApp")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlApp.setModelProperty("id", "string", "")
    FindBySqlApp.setModelProperty("department", "string", "")
    FindBySqlApp.setModelProperty("name", "string", "")
    FindBySqlApp.setModelProperty("age", "integer", "")
    FindBySqlApp.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlApp.createObject(data1)
    objData2 = FindBySqlApp.createObject(data2)
    objData3 = FindBySqlApp.createObject(data3)
    result = FindBySqlApp.find_by_sql("SELECT * FROM FindBySqlApp WHERE department = 'Mechanical'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end
def testcase10
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySql")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySql.setModelProperty("id", "string", "")
    FindBySql.setModelProperty("department", "string", "")
    FindBySql.setModelProperty("name", "string", "")
    FindBySql.setModelProperty("age", "integer", "")
    FindBySql.setModelProperty("percentage", "integer", "")
    objData1 = FindBySql.createObject(data1)
    objData2 = FindBySql.createObject(data2)
    objData3 = FindBySql.createObject(data3)
    result = FindBySql.find_by_sql("SELECT name FROM FindBySql WHERE department = 'Electronics'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end
def testcase11
    db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlLocal")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlLocal.setModelProperty("id", "string", "")
    FindBySqlLocal.setModelProperty("department", "string", "")
    FindBySqlLocal.setModelProperty("name", "string", "")
    FindBySqlLocal.setModelProperty("age", "integer", "")
    FindBySqlLocal.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlLocal.createObject(data1)
    objData2 = FindBySqlLocal.createObject(data2)
    objData3 = FindBySqlLocal.createObject(data3)
    result = FindBySqlLocal.find_by_sql("SELECT age FROM FindBySqlLocal WHERE department = 'Electronics'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end
def testcase12
    db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
    db.executeSql("DELETE FROM CLIENT_INFO")
    db.executeSql("DELETE FROM FindBySqlApp")
    data1 = {}
    data1["id"] = "01"
    data1["department"] = "Electronics"
    data1["name"] = "Arun"
    data1["age"] = "29"
    data1["percentage"] = "92"
    data2 = {}
    data2["id"] = "01"
    data2["department"] = "Electronics"
    data2["name"] = "Nadaf"
    data2["age"] = "30"
    data2["percentage"] = "92"
    data3 = {}
    data3["id"] = "01"
    data3["department"] = "Computer"
    data3["name"] = "Vinod"
    data3["age"] = "28"
    data3["percentage"] = "95"
    FindBySqlApp.setModelProperty("id", "string", "")
    FindBySqlApp.setModelProperty("department", "string", "")
    FindBySqlApp.setModelProperty("name", "string", "")
    FindBySqlApp.setModelProperty("age", "integer", "")
    FindBySqlApp.setModelProperty("percentage", "integer", "")
    objData1 = FindBySqlApp.createObject(data1)
    objData2 = FindBySqlApp.createObject(data2)
    objData3 = FindBySqlApp.createObject(data3)
    result = FindBySqlApp.find_by_sql("SELECT percentage FROM FindBySqlApp WHERE name = 'Arun'")
    result = result.to_json
    finalResult = result.to_s
    Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
  end

end
