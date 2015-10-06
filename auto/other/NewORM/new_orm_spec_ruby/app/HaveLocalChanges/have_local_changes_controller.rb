require 'rho/rhocontroller'
require 'helpers/browser_helper'

class HaveLocalChangesController < Rho::RhoController
  include BrowserHelper

  def testcase1
    @result = Rho::NewORM.haveLocalChanges()
    data = @result.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS('+ data +')')
    Rho::WebView.executeJavascript('console.log("Data : " + Ruby.data)')
  end

  def testcase3a
    data = {}
    data["initialCount"] = HaveLocalChanges.count
    data["initialStatus"] = Rho::NewORM.haveLocalChanges()
    finalData = data.to_json
    finalDataString = finalData.to_s
    Rho::WebView.executeJavascript('console.log(\'Inspect :  ' + finalDataString + '\')')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalDataString + '))')
    Rho::WebView.executeJavascript('console.log("Initial Count : " + "' + HaveLocalChanges.count.to_s + '")')
  end

  def testcase3b
    data = {}
    data["name"] = "woodlands"
    data["quantity"] = "20"
    result = {}
    newCount1 = HaveLocalChanges.count
    newCount1 = newCount1.to_s
    Rho::WebView.executeJavascript('console.log(\'count1 :  ' + newCount1 + '\')')
    HaveLocalChanges.setModelProperty("name", "string", "")
    HaveLocalChanges.setModelProperty("quantity", "string", "")
    HaveLocalChanges.createObject(data)
    result["finalCount"] = HaveLocalChanges.count
    result["finalStatus"] = Rho::NewORM.haveLocalChanges()
    finalResult = result.to_json
    finalResult = finalResult.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
    Rho::WebView.executeJavascript('console.log(\'result :  ' + finalResult + '\')')
  end

  def testcase4a
    data = {}
    data["initialCount"] = HaveLocalChanges.count
    data["initialStatus"] = Rho::NewORM.haveLocalChanges()
    finalData = data.to_json
    finalDataString = finalData.to_s
    Rho::WebView.executeJavascript('console.log(\'Inspect :  ' + finalDataString + '\')')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalDataString + '))')
    Rho::WebView.executeJavascript('console.log("Initial Count : " + "' + HaveLocalChanges.count.to_s + '")')
  end

  def testcase4b
    data = {}
    data["name"] = "woodlands"
    data["quantity"] = "20"
    result = {}
    newCount1 = HaveLocalChanges.count
    newCount1 = newCount1.to_s
    Rho::WebView.executeJavascript('console.log(\'count1 :  ' + newCount1 + '\')')
    HaveLocalChanges.setModelProperty("name", "string", "")
    HaveLocalChanges.setModelProperty("quantity", "string", "")
    HaveLocalChanges.enable("sync")
    HaveLocalChanges.createObject(data)
    result["finalCount"] = HaveLocalChanges.count
    result["finalStatus"] = Rho::NewORM.haveLocalChanges()
    finalResult = result.to_json
    finalResult = finalResult.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
    Rho::WebView.executeJavascript('console.log(\'result :  ' + finalResult + '\')')
  end

  def testcase5a
    result = {}
    result["initialCount"] = HaveLocalChanges.count
    result["initialStatus"] = Rho::NewORM.haveLocalChanges()
    HaveLocalChanges.setModelProperty("name", "string", "")
    HaveLocalChanges.setModelProperty("quantity", "string", "")
    HaveLocalChanges.enable("sync")
    
  end

  def testcase5b
    data = {}
    data["name"] = "woodlands"
    data["quantity"] = "20"
    objData = HaveLocalChanges.createObject(data)
    result = {}
    result["beforeDeleteCount"] = HaveLocalChanges.count
    result["beforeDeleteStatus"] = Rho::NewORM.haveLocalChanges()
    result["objecId"] = objData["object"]
    HaveLocalChanges.deleteObject(objData["object"])
    result["afterDeleteCount"] = HaveLocalChanges.count
    result["afterDeleteStatus"] = Rho::NewORM.haveLocalChanges()
    finalResult = result.to_json
    finalResult = finalResult.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
    Rho::WebView.executeJavascript('console.log(\'result :  ' + finalResult + '\')')
  end


  def testcase6
    HaveLocalChanges.setModelProperty("name", "string", "")
    HaveLocalChanges.setModelProperty("quantity", "string", "")
    HaveLocalChanges.enable("sync")
    data = {}
    data["name"] = "woodlands"
    data["quantity"] = "20"
    data2 = {}
    data2["name"] = "nike"
    data2["quantity"] = "30"
    objData = HaveLocalChanges.createObject(data)
    objData2 = HaveLocalChanges.createObject(data2)
    result = {}
    result["beforeDeleteCount"] = HaveLocalChanges.count
    result["beforeDeleteStatus"] = Rho::NewORM.haveLocalChanges()
    result["objecId"] = objData["object"]
    HaveLocalChanges.deleteObject(objData["object"])
    result["afterDeleteCount"] = HaveLocalChanges.count
    result["afterDeleteStatus"] = Rho::NewORM.haveLocalChanges()
    finalResult = result.to_json
    finalResult = finalResult.to_s
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
    Rho::WebView.executeJavascript('console.log(\'result :  ' + finalResult + '\')')
  end

end
