require 'rho/rhocontroller'
require 'helpers/browser_helper'

class AnyChangedObjectsController < Rho::RhoController
  include BrowserHelper

def testcase1
	res = AnyChangedObjects.anyChangedObjects()
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + res.to_s + '))')
end

def testcase2a
	res = AnyChangedObjects.anyChangedObjects()
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + res.to_s + '))')
end

def testcase2b
	data = {}
	data["name"] = "Nike"
	data["quantity"] = "20"
	AnyChangedObjects.setModelProperty("name", "string", "")
	AnyChangedObjects.setModelProperty("quantity", "string", "")
	AnyChangedObjects.enable("sync")
	objData = AnyChangedObjects.createObject(data)
	result = {}
	result["count"] = AnyChangedObjects.getCount()
	result["status"] = AnyChangedObjects.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase3
	data = {}
	data["name"] = "Nike"
	data["quantity"] = "20"
	AnyChangedObjects.setModelProperty("name", "string", "")
	AnyChangedObjects.setModelProperty("quantity", "string", "")
	AnyChangedObjects.enable("sync")
	objData = AnyChangedObjects.createObject(data)
	db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'AnyChangedObjects')
    db.executeSql("DELETE FROM CHANGED_VALUES")
    AnyChangedObjects.deleteObject(objData["object"]);
	result = {}
	result["count"] = AnyChangedObjects.getCount()
	result["status"] = AnyChangedObjects.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase4
	data1 = {}
	data1["name"] = "Nike"
	data1["quantity"] = "20"
	data2 = {}
	data2["name"] = "Puma"
	data2["quantity"] = "30"
	AnyChangedObjects.setModelProperty("name", "string", "")
	AnyChangedObjects.setModelProperty("quantity", "string", "")
	AnyChangedObjects.enable("sync")
	objData1 = AnyChangedObjects.createObject(data1)
	objData2 = AnyChangedObjects.createObject(data2)
	db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'AnyChangedObjects')
    db.executeSql("DELETE FROM CHANGED_VALUES")
    AnyChangedObjects.deleteObject(objData1["object"]);
	result = {}
	result["count"] = AnyChangedObjects.getCount()
	result["status"] = AnyChangedObjects.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase5
	data = {}
	data["name"] = "Nike"
	data["quantity"] = "20"
	AnyChangedObjects.setModelProperty("name", "string", "")
	AnyChangedObjects.setModelProperty("quantity", "string", "")
	AnyChangedObjects.enable("sync")
	objData = AnyChangedObjects.createObject(data)
    AnyChangedObjects.deleteObject(objData["object"]);
	result = {}
	result["count"] = AnyChangedObjects.getCount()
	result["status"] = AnyChangedObjects.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase6
end


end
