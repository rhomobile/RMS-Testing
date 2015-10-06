require 'rho/rhocontroller'
require 'helpers/browser_helper'

class HaveLocalChangesFsController < Rho::RhoController
  include BrowserHelper

  
  def testcase7
    Rho::WebView.executeJavascript('console.log("Initial Count : '+HaveLocalChangesFs.count.to_s+'");')
    data = {}
    data["name"] = "Nike"
    data["quantity"] = "20"
    result = {}
    result["initialStatus"] = Rho::NewORM.haveLocalChanges()
    result["initialCount"] = HaveLocalChangesFs.count
    HaveLocalChangesFs.setModelProperty("name", "string", "")
    HaveLocalChangesFs.setModelProperty("quantity", "string", "")
    HaveLocalChangesFs.createObject(data)
    result["finalStatus"] = Rho::NewORM.haveLocalChanges()
    result["finalCount"] = HaveLocalChangesFs.count
    finalresult = result.to_json
    finalResult = finalresult.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult.to_s + '));')
    Rho::WebView.executeJavascript('console.log("after count : '+HaveLocalChangesFs.count.to_s+'");')
  end
  def testcase8
    Rho::WebView.executeJavascript('console.log("Initial Count : '+HaveLocalChangesFs.count.to_s+'");')
    data = {}
    data["name"] = "Nike"
    data["quantity"] = "20"
    @result = {}
    @result["initialStatus"] = Rho::NewORM.haveLocalChanges()
    @result["initialCount"] = HaveLocalChangesFs.count
    HaveLocalChangesFs.setModelProperty("name", "string", "")
    HaveLocalChangesFs.setModelProperty("quantity", "string", "")
    HaveLocalChangesFs.set("partition", "user")
    HaveLocalChangesFs.enable("sync")
    HaveLocalChangesFs.createObject(data)
    @result["finalStatus"] = Rho::NewORM.haveLocalChanges()
    @result["finalCount"] = HaveLocalChangesFs.count
    finalresult = @result.to_json
    finalResult = finalresult.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult.to_s + '));')
    Rho::WebView.executeJavascript('console.log("after count : '+HaveLocalChangesFs.count.to_s+'");')
  end
  def testcase9
    Rho::WebView.executeJavascript('console.log("Initial Count : '+HaveLocalChangesFs.count.to_s+'");')
    data = {}
    data["name"] = "Nike"
    data["quantity"] = "20"
    data2 = {}
    data2["name"] = "Nike"
    data2["quantity"] = "30"
    HaveLocalChangesFs.setModelProperty("name", "string", "")
    HaveLocalChangesFs.setModelProperty("quantity", "string", "")
    HaveLocalChangesFs.set("partition", "user")
    HaveLocalChangesFs.enable("sync")
    objData1 = HaveLocalChangesFs.createObject(data)
    objData = HaveLocalChangesFs.createObject(data2)
    objDataJs = objData.to_json
    objDataStr = objDataJs.to_s
    #Rho::WebView.executeJavascript('console.log(' + objDataStr.to_s + ');')
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'HaveLocalChangesFs')
    db.executeSql("DELETE FROM CHANGED_VALUES")
    HaveLocalChangesFs.deleteObject(objData["object"])
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + Rho::NewORM.haveLocalChanges().to_s + '));')
end
def testcase9b
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + HaveLocalChangesFs.count.to_s + '));')
    Rho::WebView.executeJavascript('console.log("after count : '+HaveLocalChangesFs.count.to_s+'");')
  end
  def testcase10
    Rho::WebView.executeJavascript('console.log("Initial Count : '+HaveLocalChangesFs.count.to_s+'");')
    data = {}
    data["name"] = "Nike"
    data["quantity"] = "20"
    HaveLocalChangesFs.setModelProperty("name", "string", "")
    HaveLocalChangesFs.setModelProperty("quantity", "string", "")
    HaveLocalChangesFs.set("partition", "user")
    HaveLocalChangesFs.enable("sync")
    objData = HaveLocalChangesFs.createObject(data)
    db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'HaveLocalChangesFs')
    db.executeSql("DELETE FROM CHANGED_VALUES")
    #Rho::WebView.executeJavascript('console.log(' + objDataStr.to_s + ');')
    HaveLocalChangesFs.deleteObject(objData["object"])
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + Rho::NewORM.haveLocalChanges().to_s + '));')
end
def testcase10b
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + HaveLocalChangesFs.count.to_s + '));')
    Rho::WebView.executeJavascript('console.log("after count : '+HaveLocalChangesFs.count.to_s+'");')
  end
  def testcase11
    Rho::WebView.executeJavascript('console.log("Initial Count : '+HaveLocalChangesFs.count.to_s+'");')
    data = {}
    data["name"] = "Nike"
    data["quantity"] = "20"
    HaveLocalChangesFs.setModelProperty("name", "string", "")
    HaveLocalChangesFs.setModelProperty("quantity", "string", "")
    HaveLocalChangesFs.set("partition", "user")
    HaveLocalChangesFs.enable("sync")
    objData = HaveLocalChangesFs.createObject(data)
    HaveLocalChangesFs.deleteObject(objData["object"])
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + Rho::NewORM.haveLocalChanges().to_s + '));')
end
def testcase11b
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + HaveLocalChangesFs.count.to_s + '));')
    Rho::WebView.executeJavascript('console.log("after count : '+HaveLocalChangesFs.count.to_s+'");')
  end
end
