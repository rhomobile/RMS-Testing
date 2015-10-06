require 'rho/rhocontroller'
require 'helpers/browser_helper'

class AnyChangedObjectsFsController < Rho::RhoController
  include BrowserHelper

def testcase1
	data = {}
	data["name"] = "Puma"
	data["quantity"] = "30"
	AnyChangedObjectsFs.createObject(data)
	result = {}
	result["count"] = AnyChangedObjectsFs.getCount()
	result["status"] = AnyChangedObjectsFs.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase2
	data = {}
	data["name"] = "Puma"
	data["quantity"] = "30"
	objData = AnyChangedObjectsFs.createObject(data)
	db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'AnyChangedObjectsFs')
    db.executeSql("DELETE FROM CHANGED_VALUES")
    AnyChangedObjectsFs.deleteObject(objData["object"])
	result = {}
	result["count"] = AnyChangedObjectsFs.getCount()
	result["status"] = AnyChangedObjectsFs.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase3
	data1 = {}
	data1["name"] = "Puma"
	data1["quantity"] = "30"
	data2 = {}
	data2["name"] = "nike"
	data2["quantity"] = "20"
	objData1 = AnyChangedObjectsFs.createObject(data1)
	objData2 = AnyChangedObjectsFs.createObject(data2)
	db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'AnyChangedObjectsFs')
    db.executeSql("DELETE FROM CHANGED_VALUES")
    AnyChangedObjectsFs.deleteObject(objData2["object"])
	result = {}
	result["count"] = AnyChangedObjectsFs.getCount()
	result["status"] = AnyChangedObjectsFs.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase4
	db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'AnyChangedObjectsFs')
    db.executeSql("DELETE FROM CHANGED_VALUES")
	data = {}
	data["name"] = "Puma"
	data["quantity"] = "30"
	result = {}
	result["initialStatus"] = AnyChangedObjectsFs.anyChangedObjects()
	objData = AnyChangedObjectsFs.createObject(data)
    AnyChangedObjectsFs.deleteObject(objData["object"])
	result["count"] = AnyChangedObjectsFs.getCount()
	result["status"] = AnyChangedObjectsFs.anyChangedObjects()
	finalResult = result.to_json
	finalResult = finalResult.to_s
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify(' + finalResult + '))')
end

def testcase5
	data = {}
	data["name"] = "Puma"
	data["quantity"] = "30"
	objData = AnyChangedObjectsFs.createObject(data)
	result = AnyChangedObjectsFs.canModify(objData["object"])
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(' + result.to_s + ')')
end

def testcase6
	data = {}
	data["name"] = "Puma"
	data["quantity"] = "30"
	AnyChangedObjectsFs.set("partition", "user")
	objData = AnyChangedObjectsFs.createObject(data)
	result = AnyChangedObjectsFs.canModify(objData["object"])
	Rho::WebView.executeJavascript('Ruby.sendValueToJS(' + result.to_s + ')')
end

end
