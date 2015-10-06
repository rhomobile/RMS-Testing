require 'rho/rhocontroller'
require 'helpers/browser_helper'

class GeneralController < Rho::RhoController
  include BrowserHelper

	##### NewORM Test set
	##### DatabaseClientReset() ruby testcases
	##### Arun Kumar P
	def testcase1
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data = {}
		data["name"] = "Puma"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync")
		objData = ProductUserPb.createObject(data)
		result = {}
		result["initialCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		begin
		Rho::NewORM.databaseClientReset()
		rescue Exception => msg
		result["error"] = msg
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
		end
	end

	def testcase2
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync")
		objData = ProductUserPb.createObject(data1)
		data2 = {}
		data2["name"] = "woodlands"
		data2["quantity"] = "30"
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalPb.createObject(data2)
		result = {}
		result["initialUserCount"] = ProductUserPb.getCount()
		result["initialLocalCount"] = ProductLocalPb.getCount()
		Rho::NewORM.databaseClientReset(false)
		result["finalUserCount"] = ProductUserPb.getCount()
		result["finalLocalCount"] = ProductLocalPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase3
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync")
		objData = ProductUserPb.createObject(data1)
		data2 = {}
		data2["name"] = "woodlands"
		data2["quantity"] = "30"
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalPb.createObject(data2)
		result = {}
		result["initialUserCount"] = ProductUserPb.getCount()
		result["initialLocalCount"] = ProductLocalPb.getCount()
		Rho::NewORM.databaseClientReset(true)
		result["finalUserCount"] = ProductUserPb.getCount()
		result["finalLocalCount"] = ProductLocalPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase4
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data = {}
		data["name"] = "Puma"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync")
		objData = ProductUserFs.createObject(data)
		result = {}
		result["initialCount"] = ProductUserFs.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		begin
		Rho::NewORM.databaseClientReset()
		rescue Exception => msg
		result["error"] = msg
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
		end
	end

	def testcase5
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync")
		objData = ProductUserFs.createObject(data1)
		data2 = {}
		data2["name"] = "woodlands"
		data2["quantity"] = "30"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		result = {}
		result["initialUserCount"] = ProductUserFs.getCount()
		result["initialLocalCount"] = ProductLocalFs.getCount()
		Rho::NewORM.databaseClientReset(false)
		result["finalUserCount"] = ProductUserFs.getCount()
		result["finalLocalCount"] = ProductLocalFs.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase6
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync")
		objData = ProductUserFs.createObject(data1)
		data2 = {}
		data2["name"] = "woodlands"
		data2["quantity"] = "30"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		result = {}
		result["initialUserCount"] = ProductUserFs.getCount()
		result["initialLocalCount"] = ProductLocalFs.getCount()
		Rho::NewORM.databaseClientReset(true)
		result["finalUserCount"] = ProductUserFs.getCount()
		result["finalLocalCount"] = ProductLocalFs.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	##### NewORM Test set
	##### databaseFullReset() ruby testcases
	##### Arun Kumar P

	def testcase7
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync");
		objData1 = ProductUserPb.createObject(data1)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalPb.createObject(data2)
		result = {}
		result["initialLocalCount"] = ProductLocalPb.getCount()
		result["initialUserCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(true, false)
		result["finalLocalCount"] = ProductLocalPb.getCount()
		result["finalUserCount"] = ProductUserPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase8
		Rho::WebView.executeJavascript('console.log("Test case 8")')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync");
		objData1 = ProductUserFs.createObject(data1)
		objData = objData1.to_s
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		result = {}
		result["initialLocalCount"] = ProductLocalFs.getCount()
		result["initialUserCount"] = ProductUserFs.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(true, false)
		result["finalLocalCount"] = ProductLocalFs.getCount()
		result["finalUserCount"] = ProductUserFs.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase9
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync");
		objData1 = ProductUserPb.createObject(data1)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalPb.createObject(data2)
		result = {}
		result["initialLocalCount"] = ProductLocalPb.getCount()
		result["initialUserCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(false, false)
		result["finalLocalCount"] = ProductLocalPb.getCount()
		result["finalUserCount"] = ProductUserPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log("testcase7 : " + JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase10
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync");
		objData1 = ProductUserFs.createObject(data1)
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		result = {}
		result["initialLocalCount"] = ProductLocalFs.getCount()
		result["initialUserCount"] = ProductUserFs.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(false, false)
		result["finalLocalCount"] = ProductLocalFs.getCount()
		result["finalUserCount"] = ProductUserFs.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase11
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync");
		objData1 = ProductUserFs.createObject(data1)
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync");
		objData1a = ProductUserPb.createObject(data1)
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2a = ProductLocalPb.createObject(data2)
		result = {}
		result["initialLocalFsCount"] = ProductLocalFs.getCount()
		result["initialUserFsCount"] = ProductUserFs.getCount()
		result["initialLocalPbCount"] = ProductLocalPb.getCount()
		result["initialUserPbCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(false, true)
		result["finalLocalFsCount"] = ProductLocalFs.getCount()
		result["finalUserFsCount"] = ProductUserFs.getCount()
		result["finalLocalPbCount"] = ProductLocalPb.getCount()
		result["finalUserPbCount"] = ProductUserPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase12
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync");
		objData1 = ProductUserFs.createObject(data1)
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync");
		objData1a = ProductUserPb.createObject(data1)
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2a = ProductLocalPb.createObject(data2)
		result = {}
		result["initialLocalFsCount"] = ProductLocalFs.getCount()
		result["initialUserFsCount"] = ProductUserFs.getCount()
		result["initialLocalPbCount"] = ProductLocalPb.getCount()
		result["initialUserPbCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(true, true)
		result["finalLocalFsCount"] = ProductLocalFs.getCount()
		result["finalUserFsCount"] = ProductUserFs.getCount()
		result["finalLocalPbCount"] = ProductLocalPb.getCount()
		result["finalUserPbCount"] = ProductUserPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase13
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync");
		objData1 = ProductUserPb.createObject(data1)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalPb.createObject(data2)
		result = {}
		result["initialLocalCount"] = ProductLocalPb.getCount()
		result["initialUserCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(false, true)
		result["finalLocalCount"] = ProductLocalPb.getCount()
		result["finalUserCount"] = ProductUserPb.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase14
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync");
		objData1 = ProductUserFs.createObject(data1)
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		result = {}
		result["initialLocalCount"] = ProductLocalFs.getCount()
		result["initialUserCount"] = ProductUserFs.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		Rho::NewORM.databaseFullReset(false, true)
		result["finalLocalCount"] = ProductLocalFs.getCount()
		result["finalUserCount"] = ProductUserFs.getCount()
		result["finalClientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase15
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data1 = {}
		data1["name"] = "Puma"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Nike"
		data2["quantity"] = "30"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable("sync");
		objData1 = ProductUserFs.createObject(data1)
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable("sync")
		objData2 = ProductUserPb.createObject(data2)
		result = {}
		result["initialUserFsCount"] = ProductUserFs.getCount()
		result["initialUserPbCount"] = ProductUserPb.getCount()
		result["initialClientId"] = Rho::NewORM.getClientId()
		begin
			Rho::NewORM.databaseFullReset("","")
		rescue Exception => e
			result["finalUserFsCount"] = ProductUserFs.getCount()
			result["finalUserPbCount"] = ProductUserPb.getCount()
			result["finalClientId"] = Rho::NewORM.getClientId()
			result["error"] = e
			result = result.to_json
			finalResult = result.to_s
			Rho::WebView.executeJavascript('console.log("testcase15 : " + JSON.stringify('+ finalResult +'))')
			Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
		end
	end

	def testcase16
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db3 = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("partition", "user")
		ProductUserPb.createObject(data)
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ProductUserFs.createObject(data)
		Rho::NewORM.databaseLocalReset();
		result = {}
		result["userFsCount"] = ProductUserFs.getCount()
		result["userPbCount"] = ProductUserPb.getCount()
		result["clientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log("testcase15 : " + JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase17
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db3 = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		ProductLocalFs.createObject(data)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set("partition", "local")
		ProductLocalPb.createObject(data)
		Rho::NewORM.databaseLocalReset();
		result = {}
		result["localFsCount"] = ProductLocalFs.getCount()
		result["localPbCount"] = ProductLocalPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log("testcase15 : " + JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def testcase18
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db3 = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM CLIENT_INFO")
		db.executeSql("DELETE FROM ProductUserFs")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (10)")
		db2.executeSql("DELETE FROM CLIENT_INFO")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		ProductLocalFs.createObject(data)
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set("partition", "local")
		ProductLocalPb.createObject(data)
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("partition", "user")
		ProductUserPb.createObject(data)
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ProductUserFs.createObject(data)
		Rho::NewORM.databaseLocalReset();
		result = {}
		result["localFsCount"] = ProductLocalFs.getCount()
		result["localPbCount"] = ProductLocalPb.getCount()
		result["userFsCount"] = ProductUserFs.getCount()
		result["userPbCount"] = ProductUserPb.getCount()
		result["clientId"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log("testcase15 : " + JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
	end

	def _getAllPropCb
		result = {}
		result["associations"] = @params["associations"]
		result["blob_attribs"] = @params["blob_attribs"]
		result["freezed"] = @params["freezed"]
		result["full_update"] = @params["full_update"]
		result["loaded"] = @params["loaded"]
		result["fixed_schema"] = @params["fixed_schema"]
		result["model_name"] = @params["model_name"]
		result["partition"] = @params["partition"]
		result["pass_through"] = @params["pass_through"]
		result["schema_version"] = @params["schema_version"]
		result["sync_priority"] = @params["sync_priority"]
		result["sync_type"] = @params["sync_type"]
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log("testcase15 : " + JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('console.log("Am callback");')
	end

	def testcase19
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ProductUserFs.set("sync_type", "none")
		ProductUserFs.createObject(data)
		ProductUserFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase20
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ProductUserFs.set("sync_type", "incremental")
		ProductUserFs.createObject(data)
		ProductUserFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase21
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ProductUserFs.set("sync_type", "bulk_only")
		ProductUserFs.createObject(data)
		ProductUserFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase22
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase23
		Rho::WebView.executeJavascript('console.log("Am test19");')
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductAppFs.set('partition', 'app')
		ProductAppFs.set('sync_type', 'none')
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase24
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("sync_type", "none")
		ProductUserPb.createObject(data)
		ProductUserPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase25
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("sync_type", "incremental")
		ProductUserPb.createObject(data)
		ProductUserPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase26
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("sync_type", "bulk_only")
		ProductUserPb.createObject(data)
		ProductUserPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase27
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set("sync_type", "none")
		ProductLocalPb.createObject(data)
		ProductLocalPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase28
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductAppPb.setModelProperty("name", "string", "")
		ProductAppPb.setModelProperty("quantity", "string", "")
		ProductAppPb.set("partition", "app")
		ProductAppPb.set("sync_type", "none")
		ProductAppPb.createObject(data)
		ProductAppPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase29
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("sync_type", "incremental")
		ProductUserFs.createObject(data)
		result = {}
		result["time"] = ProductUserFs.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase30
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("sync_type", "none")
		ProductUserFs.createObject(data)
		result = {}
		result["time"] = ProductUserFs.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase31
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		ProductLocalFs.createObject(data)
		result = {}
		result["time"] = ProductLocalFs.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase32
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.set("partition", "app")
		ProductAppFs.createObject(data)
		result = {}
		result["time"] = ProductAppFs.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase33
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set('partition', 'user')
		ProductUserPb.set('sync_type', 'incremental')
		ProductUserPb.createObject(data)
		result = {}
		result["time"] = ProductUserPb.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase34
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set('partition', 'user')
		ProductUserPb.set('sync_type', 'none')
		ProductUserPb.createObject(data)
		result = {}
		result["time"] = ProductUserPb.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase35
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set('partition', 'app')
		ProductLocalPb.set('sync_type', 'none')
		ProductLocalPb.createObject(data)
		result = {}
		result["time"] = ProductLocalPb.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase36
		Rho::WebView.executeJavascript('console.log("Am test19");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductAppPb.setModelProperty("name", "string", "")
		ProductAppPb.setModelProperty("quantity", "string", "")
		ProductAppPb.createObject(data)
		result = {}
		result["time"] = ProductAppPb.getBackendRefreshTime()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase37
		Rho::WebView.executeJavascript('console.log("Am test37");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		db.executeSql("DELETE FROM ItemFs")
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "user")
		ProductUserFs.setBelongsTo("name", "ItemFs")
		result = {}
		result["belongsTo"] = ProductUserFs.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase38
		Rho::WebView.executeJavascript('console.log("Am test38");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "user")
		result = {}
		result["belongsTo"] = ProductUserFs.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase39
		Rho::WebView.executeJavascript('console.log("Am test39");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("DELETE FROM ItemFs")
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "local")
		ProductLocalFs.setBelongsTo('name', 'ItemFs')
		result = {}
		result["belongsTo"] = ProductLocalFs.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase40
		Rho::WebView.executeJavascript('console.log("Am test40");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		db.executeSql("DELETE FROM ItemFs")
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "local")
		result = {}
		result["belongsTo"] = ProductLocalFs.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase41
		Rho::WebView.executeJavascript('console.log("Am test41");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.set("partition", "app")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "app")
		ProductAppFs.setBelongsTo('name', 'ItemFs')
		result = {}
		result["belongsTo"] = ProductAppFs.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase42
		Rho::WebView.executeJavascript('console.log("Am test42");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductAppFs")
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.set("partition", "app")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "app")
		result = {}
		result["belongsTo"] = ProductAppFs.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase43
		Rho::WebView.executeJavascript('console.log("Am test43");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM ItemFs")
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("partition", "user")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "user")
		ProductUserPb.setBelongsTo("name", "ItemFs")
		result = {}
		result["belongsTo"] = ProductUserPb.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase44
		Rho::WebView.executeJavascript('console.log("Am test44");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM ItemFs")
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("partition", "user")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "user")
		result = {}
		result["belongsTo"] = ProductUserPb.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase45
		Rho::WebView.executeJavascript('console.log("Am test45");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM ItemFs")
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set("partition", "local")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "local")
		ProductLocalPb.setBelongsTo('name', 'ItemFs')
		result = {}
		result["belongsTo"] = ProductLocalPb.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase46
		Rho::WebView.executeJavascript('console.log("Am test46");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM ItemFs")
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set("partition", "local")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "local")
		result = {}
		result["belongsTo"] = ProductLocalPb.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		db.executeSql("DELETE FROM ItemFs")
	end

	def testcase47
		Rho::WebView.executeJavascript('console.log("Am test47");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		ProductAppPb.setModelProperty("name", "string", "")
		ProductAppPb.setModelProperty("quantity", "string", "")
		ProductAppPb.set("partition", "app")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "app")
		ProductAppPb.setBelongsTo('name', 'ItemFs')
		result = {}
		result["belongsTo"] = ProductAppPb.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase48
		Rho::WebView.executeJavascript('console.log("Am test48");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		ProductAppPb.setModelProperty("name", "string", "")
		ProductAppPb.setModelProperty("quantity", "string", "")
		ProductAppPb.set("partition", "app")
		ItemFs.setModelProperty("itemName", "string", "")
		ItemFs.setModelProperty("availability", "string", "")
		ItemFs.setModelProperty("stockDetails", "string", "")
		ItemFs.set("partition", "app")
		result = {}
		result["belongsTo"] = ProductAppPb.getBelongsTo('name')
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase49
		Rho::WebView.executeJavascript('console.log("Am test49");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.enable('sync');
		ProductUserFs.set("sync_type", "incremental")
		ProductUserFs.enable('pass_through');
		ProductUserFs.enable('loaded');
		ProductUserFs.enable('freezed');
		ProductUserFs.enable('full_update');
		ProductUserFs.set('partition', 'user');
		ProductUserFs.createObject(data)
		ProductUserFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase50
		Rho::WebView.executeJavascript('console.log("Am test50");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.enable('sync');
		ProductLocalFs.set("sync_type", "none")
		ProductLocalFs.enable('pass_through');
		ProductLocalFs.enable('loaded');
		ProductLocalFs.enable('freezed');
		ProductLocalFs.enable('full_update');
		ProductLocalFs.set('partition', 'local');
		ProductLocalFs.createObject(data)
		ProductLocalFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase51
		Rho::WebView.executeJavascript('console.log("Am test51");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.enable('sync');
		ProductAppFs.set("sync_type", "bulk_only")
		ProductAppFs.enable('pass_through');
		ProductAppFs.enable('loaded');
		ProductAppFs.enable('freezed');
		ProductAppFs.enable('full_update');
		ProductAppFs.set('partition', 'app');
		ProductAppFs.createObject(data)
		ProductAppFs.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase52
		Rho::WebView.executeJavascript('console.log("Am test52");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.enable('sync');
		ProductUserPb.set("sync_type", "incremental")
		ProductUserPb.enable('pass_through');
		ProductUserPb.enable('loaded');
		ProductUserPb.enable('freezed');
		ProductUserPb.enable('full_update');
		ProductUserPb.set('partition', 'user');
		ProductUserPb.createObject(data)
		ProductUserPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase53
		Rho::WebView.executeJavascript('console.log("Am test53");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.enable('sync');
		ProductLocalPb.set("sync_type", "none")
		ProductLocalPb.enable('pass_through');
		ProductLocalPb.enable('loaded');
		ProductLocalPb.enable('freezed');
		ProductLocalPb.enable('full_update');
		ProductLocalPb.set('partition', 'local');
		ProductLocalPb.createObject(data)
		ProductLocalPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end
	def testcase54
		Rho::WebView.executeJavascript('console.log("Am test54");')
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		data = {}
		data["name"] = "Arun"
		data["quantity"] = "20"
		ProductAppPb.setModelProperty("name", "string", "")
		ProductAppPb.setModelProperty("quantity", "string", "")
		ProductAppPb.enable('sync');
		ProductAppPb.set("sync_type", "bulk_only")
		ProductAppPb.enable('pass_through');
		ProductAppPb.enable('loaded');
		ProductAppPb.enable('freezed');
		ProductAppPb.enable('full_update');
		ProductAppPb.set('partition', 'app');
		ProductAppPb.createObject(data)
		ProductAppPb.getAllProperties(url_for(:action => :_getAllPropCb))
	end

	def testcase55
		Rho::WebView.executeJavascript("console.log('Am test 55')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		result = {}
		result["initCount"] = ProductUserFs.getCount()
		ProductUserFs.deleteObjects({},[])
		result["finalCount"] = ProductUserFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase56
		Rho::WebView.executeJavascript("console.log('Am test 56')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		result = {}
		result["initCount"] = ProductUserFs.getCount()
		begin
		ProductUserFs.deleteObjects()
		rescue Exception => msg
		result["error"] = msg
		result["finalCount"] = ProductUserFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		end
	end
	def testcase57
		Rho::WebView.executeJavascript("console.log('Am test 57')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		result = {}
		result["initCount"] = ProductUserFs.getCount()
		ProductUserFs.deleteObjects({:conditions => "name = ?"}, ['Nike'])
		result["finalCount"] = ProductUserFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase58
		Rho::WebView.executeJavascript("console.log('Am test 58')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		result = {}
		result["initCount"] = ProductUserFs.getCount()
		ProductUserFs.deleteObjects({:conditions => "name = ? OR quantity = ?"}, ['Nike', '20'])
		result["finalCount"] = ProductUserFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase59
		Rho::WebView.executeJavascript("console.log('Am test 59')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		result = {}
		result["initCount"] = ProductUserFs.getCount()
		ProductUserFs.deleteObjects({:conditions => "name = ? AND quantity = ?"}, ['Nike', '20'])
		result["finalCount"] = ProductUserFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase60
		Rho::WebView.executeJavascript("console.log('Am test 60')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		result = {}
		result["initCount"] = ProductUserFs.getCount()
		begin
		ProductUserFs.deleteObjects({:conditions => "nonExisting = ?"}, ['Nike'])
		rescue Exception => msg
		result["error"] = msg
		result["finalCount"] = ProductUserFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		end
	end
	def testcase61
		Rho::WebView.executeJavascript("console.log('Am test 61')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		result = {}
		result["initCount"] = ProductLocalFs.getCount()
		ProductLocalFs.deleteObjects({},[])
		result["finalCount"] = ProductLocalFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase62
		Rho::WebView.executeJavascript("console.log('Am test 62')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		result = {}
		result["initCount"] = ProductLocalFs.getCount()
		begin
		ProductLocalFs.deleteObjects()
		rescue Exception => msg
		result["error"] = msg
		result["finalCount"] = ProductLocalFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		end
	end
	def testcase63
		Rho::WebView.executeJavascript("console.log('Am test 63')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		result = {}
		result["initCount"] = ProductLocalFs.getCount()
		ProductLocalFs.deleteObjects({:conditions => "name = ?"}, ['Nike'])
		result["finalCount"] = ProductLocalFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase64
		Rho::WebView.executeJavascript("console.log('Am test 64')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		result = {}
		result["initCount"] = ProductLocalFs.getCount()
		ProductLocalFs.deleteObjects({:conditions => "name = ? OR quantity = ?"}, ['Nike', '20'])
		result["finalCount"] = ProductLocalFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase65
		Rho::WebView.executeJavascript("console.log('Am test 65')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		result = {}
		result["initCount"] = ProductLocalFs.getCount()
		ProductLocalFs.deleteObjects({:conditions => "name = ? AND quantity = ?"}, ['Nike', '20'])
		result["finalCount"] = ProductLocalFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase66
		Rho::WebView.executeJavascript("console.log('Am test 66')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		result = {}
		result["initCount"] = ProductLocalFs.getCount()
		begin
		ProductLocalFs.deleteObjects({:conditions => "nonExisting = ?"}, ['Nike'])
		rescue Exception => msg
		result["error"] = msg
		result["finalCount"] = ProductLocalFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		end
	end
	def testcase67
		Rho::WebView.executeJavascript("console.log('Am test 67')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		result = {}
		result["initCount"] = ProductAppFs.getCount()
		ProductAppFs.deleteObjects({},[])
		result["finalCount"] = ProductAppFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase68
		Rho::WebView.executeJavascript("console.log('Am test 68')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		result = {}
		result["initCount"] = ProductAppFs.getCount()
		begin
		ProductAppFs.deleteObjects()
		rescue Exception => msg
		result["error"] = msg
		result["finalCount"] = ProductAppFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		end
	end
	def testcase69
		Rho::WebView.executeJavascript("console.log('Am test 69')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		result = {}
		result["initCount"] = ProductAppFs.getCount()
		ProductAppFs.deleteObjects({:conditions => "name = ?"}, ['Nike'])
		result["finalCount"] = ProductAppFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase70
		Rho::WebView.executeJavascript("console.log('Am test 70')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		result = {}
		result["initCount"] = ProductAppFs.getCount()
		ProductAppFs.deleteObjects({:conditions => "name = ? OR quantity = ?"}, ['Nike', '20'])
		result["finalCount"] = ProductAppFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase71
		Rho::WebView.executeJavascript("console.log('Am test 71')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "20"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		result = {}
		result["initCount"] = ProductAppFs.getCount()
		ProductAppFs.deleteObjects({:conditions => "name = ? AND quantity = ?"}, ['Nike', '20'])
		result["finalCount"] = ProductAppFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase72
		Rho::WebView.executeJavascript("console.log('Am test 72')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		result = {}
		result["initCount"] = ProductAppFs.getCount()
		begin
		ProductAppFs.deleteObjects({:conditions => "nonExisting = ?"}, ['Nike'])
		rescue Exception => msg
		result["error"] = msg
		result["finalCount"] = ProductAppFs.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
		end
	end

	def testcase73
		Rho::WebView.executeJavascript("console.log('Am test 73')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		res = ProductUserFs.findObjects("all",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		resCount = ProductUserFs.findObjects("count",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		resFirst = ProductUserFs.findObjects("first",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))') 
	end
	def testcase74
		Rho::WebView.executeJavascript("console.log('Am test 74')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		res = ProductUserFs.findObjects("all",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		resCount = ProductUserFs.findObjects("count",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		resFirst = ProductUserFs.findObjects("first",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase75
		Rho::WebView.executeJavascript("console.log('Am test 75')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		res = ProductUserFs.findObjects("all",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		resCount = ProductUserFs.findObjects("count",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		resFirst = ProductUserFs.findObjects("first",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase76
		Rho::WebView.executeJavascript("console.log('Am test 76')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		res = ProductUserFs.findObjects("all",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		resCount = ProductUserFs.findObjects("count",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		resFirst = ProductUserFs.findObjects("first",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase77
		Rho::WebView.executeJavascript("console.log('Am test 77')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		error = ""
		begin
			res = ProductUserFs.findObjects();
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase78
		Rho::WebView.executeJavascript("console.log('Am test 78')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		res = ProductUserFs.findObjects("all",{},[],[],[]);
		resCount = ProductUserFs.findObjects("count",{},[],[],[]);
		resFirst = ProductUserFs.findObjects("first",{},[],[],[]);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase79
		Rho::WebView.executeJavascript("console.log('Am test 79')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		error = ""
		begin
			res = ProductUserFs.findObjects("", {},[],[],[]);;
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase80
		Rho::WebView.executeJavascript("console.log('Am test 80')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserFs.createObject(data)
		ProductUserFs.createObject(data1)
		ProductUserFs.createObject(data2)
		ProductUserFs.createObject(data3)
		error = ""
		begin
			res = ProductUserFs.findObjects("all", {:conditions => "nonexisting = ?"},['Nike'],[],[])
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase81
		Rho::WebView.executeJavascript("console.log('Am test 81')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		res = ProductLocalFs.findObjects("all",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		resCount = ProductLocalFs.findObjects("count",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		resFirst = ProductLocalFs.findObjects("first",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))') 
	end
	def testcase82
		Rho::WebView.executeJavascript("console.log('Am test 82')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		res = ProductLocalFs.findObjects("all",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		resCount = ProductLocalFs.findObjects("count",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		resFirst = ProductLocalFs.findObjects("first",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase83
		Rho::WebView.executeJavascript("console.log('Am test 83')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		res = ProductLocalFs.findObjects("all",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		resCount = ProductLocalFs.findObjects("count",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		resFirst = ProductLocalFs.findObjects("first",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase84
		Rho::WebView.executeJavascript("console.log('Am test 84')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		res = ProductLocalFs.findObjects("all",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		resCount = ProductLocalFs.findObjects("count",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		resFirst = ProductLocalFs.findObjects("first",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase85
		Rho::WebView.executeJavascript("console.log('Am test 85')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		error = ""
		begin
			res = ProductLocalFs.findObjects();
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase86
		Rho::WebView.executeJavascript("console.log('Am test 86')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		res = ProductLocalFs.findObjects("all",{},[],[],[]);
		resCount = ProductLocalFs.findObjects("count",{},[],[],[]);
		resFirst = ProductLocalFs.findObjects("first",{},[],[],[]);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase87
		Rho::WebView.executeJavascript("console.log('Am test 87')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		error = ""
		begin
			res = ProductLocalFs.findObjects("", {},[],[],[]);;
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase88
		Rho::WebView.executeJavascript("console.log('Am test 88')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalFs.createObject(data)
		ProductLocalFs.createObject(data1)
		ProductLocalFs.createObject(data2)
		ProductLocalFs.createObject(data3)
		error = ""
		begin
			res = ProductLocalFs.findObjects("all", {:conditions => "nonexisting = ?"},['Nike'],[],[])
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase89
		Rho::WebView.executeJavascript("console.log('Am test 89')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		res = ProductAppFs.findObjects("all",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		resCount = ProductAppFs.findObjects("count",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		resFirst = ProductAppFs.findObjects("first",{:conditions => "name = ?"},['Nike'],['name','quantity'],['name', 'ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))') 
	end
	def testcase90
		Rho::WebView.executeJavascript("console.log('Am test 90')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		res = ProductAppFs.findObjects("all",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		resCount = ProductAppFs.findObjects("count",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		resFirst = ProductAppFs.findObjects("first",{:conditions => "name = ? OR quantity = ?"},['Nike', '30'],['name','quantity'],['name', 'ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase91
		Rho::WebView.executeJavascript("console.log('Am test 91')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		res = ProductAppFs.findObjects("all",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		resCount = ProductAppFs.findObjects("count",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		resFirst = ProductAppFs.findObjects("first",{:conditions =>"name = ? AND quantity = ?"},['Puma', '40'],['name','quantity'],[]);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase92
		Rho::WebView.executeJavascript("console.log('Am test 92')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		res = ProductAppFs.findObjects("all",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		resCount = ProductAppFs.findObjects("count",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		resFirst = ProductAppFs.findObjects("first",{:conditions => "name IN (?, ?, ?)"},['Nike', 'Reebok', 'Puma'],['name','quantity'],['name','ASC']);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase93
		Rho::WebView.executeJavascript("console.log('Am test 93')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		error = ""
		begin
			res = ProductAppFs.findObjects();
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase94
		Rho::WebView.executeJavascript("console.log('Am test 94')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		res = ProductAppFs.findObjects("all",{},[],[],[]);
		resCount = ProductAppFs.findObjects("count",{},[],[],[]);
		resFirst = ProductAppFs.findObjects("first",{},[],[],[]);
		result = {}
		result["find"] = res
		result["count"] = resCount
		result["first"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase95
		Rho::WebView.executeJavascript("console.log('Am test 95')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		error = ""
		begin
			res = ProductAppFs.findObjects("", {},[],[],[]);;
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase96
		Rho::WebView.executeJavascript("console.log('Am test 96')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppFs.createObject(data)
		ProductAppFs.createObject(data1)
		ProductAppFs.createObject(data2)
		ProductAppFs.createObject(data3)
		error = ""
		begin
			res = ProductAppFs.findObjects("all", {:conditions => "nonexisting = ?"},['Nike'],[],[])
		rescue Exception => e
			error = e
		end
		result = {}
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase97
		Rho::WebView.executeJavascript("console.log('Am test 97')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductUserPb.getCount();
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		result["finalCount"] = ProductUserPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase98
		Rho::WebView.executeJavascript("console.log('Am test 98')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductUserPb.getCount();
		error = ""
		begin
			ProductUserPb.deleteObjectsPropertyBagByCondHash()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result["finalCount"] = ProductUserPb.getCount();
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase99
		Rho::WebView.executeJavascript("console.log('Am test 99')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductUserPb.getCount();
		ProductUserPb.deleteObjectsPropertyBagByCondHash({:name=>"Nike"}, {})
		result["finalCount"] = ProductUserPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase100
		Rho::WebView.executeJavascript("console.log('Am test 100')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductUserPb.getCount();
		ProductUserPb.deleteObjectsPropertyBagByCondHash({:name=>"Puma", :quantity=>"40"}, {})
		result["finalCount"] = ProductUserPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase101
		Rho::WebView.executeJavascript("console.log('Am test 101')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductUserPb.getCount();
		begin
			ProductUserPb.deleteObjectsPropertyBagByCondHash({:nonExisting=>"Puma"}, {})
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result["finalCount"] = ProductUserPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase102
		Rho::WebView.executeJavascript("console.log('Am test 102')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductLocalPb.getCount();
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		result["finalCount"] = ProductLocalPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase103
		Rho::WebView.executeJavascript("console.log('Am test 103')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductLocalPb.getCount();
		error = ""
		begin
			ProductLocalPb.deleteObjectsPropertyBagByCondHash()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result["finalCount"] = ProductLocalPb.getCount();
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase104
		Rho::WebView.executeJavascript("console.log('Am test 104')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductLocalPb.getCount();
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({:name=>"Nike"}, {})
		result["finalCount"] = ProductLocalPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase105
		Rho::WebView.executeJavascript("console.log('Am test 105')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductLocalPb.getCount();
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({:name=>"Puma", :quantity=>"40"}, {})
		result["finalCount"] = ProductLocalPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase106
		Rho::WebView.executeJavascript("console.log('Am test 106')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductLocalPb.getCount();
		begin
			ProductLocalPb.deleteObjectsPropertyBagByCondHash({:nonExisting=>"Puma"}, {})
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result["finalCount"] = ProductLocalPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase107
		Rho::WebView.executeJavascript("console.log('Am test 107')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductAppPb.getCount();
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		result["finalCount"] = ProductAppPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase108
		Rho::WebView.executeJavascript("console.log('Am test 108')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductAppPb.getCount();
		error = ""
		begin
			ProductAppPb.deleteObjectsPropertyBagByCondHash()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result["finalCount"] = ProductAppPb.getCount();
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase109
		Rho::WebView.executeJavascript("console.log('Am test 109')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductAppPb.deleteObjectsPropertyBagByCondHash({},{})
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductAppPb.getCount();
		ProductAppPb.deleteObjectsPropertyBagByCondHash({:name=>"Nike"}, {})
		result["finalCount"] = ProductAppPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase110
		Rho::WebView.executeJavascript("console.log('Am test 110')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductAppPb.deleteObjectsPropertyBagByCondHash({},{})
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductAppPb.getCount();
		ProductAppPb.deleteObjectsPropertyBagByCondHash({:name=>"Puma", :quantity=>"40"}, {})
		result["finalCount"] = ProductAppPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase111
		Rho::WebView.executeJavascript("console.log('Am test 111')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductAppPb.deleteObjectsPropertyBagByCondHash({},{})
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		result["initialCount"] = ProductAppPb.getCount();
		begin
			ProductAppPb.deleteObjectsPropertyBagByCondHash({:nonExisting=>"Puma"}, {})
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result["finalCount"] = ProductAppPb.getCount()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase112
		Rho::WebView.executeJavascript("console.log('Am test 112')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductUserPb.deleteObjectsPropertyBagByCondHash({},{})
		count = ProductUserPb.getCount()
		count = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 2 : '+ count +'")')
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondHash("all", {},{},[])
		resCount = ProductUserPb.findObjectsPropertyBagByCondHash("count", {},{},[])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondHash("first", {},{},[])
		count1 = ProductUserPb.getCount()
		count1 = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 1 : '+ count1 +'")')
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase113
		Rho::WebView.executeJavascript("console.log('Am test 113')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondHash("all", {:name => "Puma"},{},['name','quantity'])
		resCount = ProductUserPb.findObjectsPropertyBagByCondHash("count", {:name => "Puma"},{},['name','quantity'])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondHash("first", {:name => "Puma"},{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase114
		Rho::WebView.executeJavascript("console.log('Am test 114')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondHash("all", {:name => "Puma"},{},['name'])
		resCount = ProductUserPb.findObjectsPropertyBagByCondHash("count", {:name => "Puma"},{},['name'])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondHash("first", {:name => "Puma"},{},['name'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase115
		Rho::WebView.executeJavascript("console.log('Am test 115')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductUserPb.findObjectsPropertyBagByCondHash()
			resCount = ProductUserPb.findObjectsPropertyBagByCondHash()
			resFirst = ProductUserPb.findObjectsPropertyBagByCondHash()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase116
		Rho::WebView.executeJavascript("console.log('Am test 116')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({},{})
		count = ProductLocalPb.getCount()
		count = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 2 : '+ count +'")')
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondHash("all", {},{},[])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondHash("count", {},{},[])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondHash("first", {},{},[])
		count1 = ProductLocalPb.getCount()
		count1 = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 1 : '+ count1 +'")')
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase117
		Rho::WebView.executeJavascript("console.log('Am test 117')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondHash("all", {:name => "Puma"},{},['name','quantity'])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondHash("count", {:name => "Puma"},{},['name','quantity'])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondHash("first", {:name => "Puma"},{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase118
		Rho::WebView.executeJavascript("console.log('Am test 118')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondHash("all", {:name => "Puma"},{},['name'])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondHash("count", {:name => "Puma"},{},['name'])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondHash("first", {:name => "Puma"},{},['name'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase119
		Rho::WebView.executeJavascript("console.log('Am test 119')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductLocalPb.findObjectsPropertyBagByCondHash()
			resCount = ProductLocalPb.findObjectsPropertyBagByCondHash()
			resFirst = ProductLocalPb.findObjectsPropertyBagByCondHash()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase120
		Rho::WebView.executeJavascript("console.log('Am test 120')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductAppPb.deleteObjectsPropertyBagByCondHash({},{})
		count = ProductAppPb.getCount()
		count = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 2 : '+ count +'")')
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondHash("all", {},{},[])
		resCount = ProductAppPb.findObjectsPropertyBagByCondHash("count", {},{},[])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondHash("first", {},{},[])
		count1 = ProductAppPb.getCount()
		count1 = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 1 : '+ count1 +'")')
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase121
		Rho::WebView.executeJavascript("console.log('Am test 121')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondHash("all", {:name => "Puma"},{},['name','quantity'])
		resCount = ProductAppPb.findObjectsPropertyBagByCondHash("count", {:name => "Puma"},{},['name','quantity'])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondHash("first", {:name => "Puma"},{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase122
		Rho::WebView.executeJavascript("console.log('Am test 122')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondHash("all", {:name => "Puma"},{},['name'])
		resCount = ProductAppPb.findObjectsPropertyBagByCondHash("count", {:name => "Puma"},{},['name'])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondHash("first", {:name => "Puma"},{},['name'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase123
		Rho::WebView.executeJavascript("console.log('Am test 123')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductAppPb.findObjectsPropertyBagByCondHash()
			resCount = ProductAppPb.findObjectsPropertyBagByCondHash()
			resFirst = ProductAppPb.findObjectsPropertyBagByCondHash()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase124
		Rho::WebView.executeJavascript("console.log('Am test 124')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductUserPb.deleteObjectsPropertyBagByCondHash({},{})
		count = ProductUserPb.getCount()
		count = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 2 : '+ count +'")')
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondArray("all", "", [], {},[])
		resCount = ProductUserPb.findObjectsPropertyBagByCondArray("count", "", [], {},[])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondArray("first", "", [], {},[])
		count1 = ProductUserPb.getCount()
		count1 = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 1 : '+ count1 +'")')
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase125
		Rho::WebView.executeJavascript("console.log('Am test 125')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondArray("all", "name = ?",['Puma'],{},['name'])
		resCount = ProductUserPb.findObjectsPropertyBagByCondArray("count", "name = ?", ['Puma'], {},['name','quantity'])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondArray("first", "name = ?", ['Puma'], {},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase126
		Rho::WebView.executeJavascript("console.log('Am test 126')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondArray("all", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		resCount = ProductUserPb.findObjectsPropertyBagByCondArray("count", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondArray("first", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase127
		Rho::WebView.executeJavascript("console.log('Am test 127')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		result = {}
		resAll = ProductUserPb.findObjectsPropertyBagByCondArray("all", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		resCount = ProductUserPb.findObjectsPropertyBagByCondArray("count", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		resFirst = ProductUserPb.findObjectsPropertyBagByCondArray("first", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase128
		Rho::WebView.executeJavascript("console.log('Am test 128')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductUserPb.findObjectsPropertyBagByCondArray()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase129
		Rho::WebView.executeJavascript("console.log('Am test 129')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductUserPb.findObjectsPropertyBagByCondArray("", "name = ? AND quantity = ?",['name','quantity'],{},['name','quantity'])
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase130
		Rho::WebView.executeJavascript("console.log('Am test 130')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		ProductUserPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductUserPb.createObject(data)
		ProductUserPb.createObject(data1)
		ProductUserPb.createObject(data2)
		ProductUserPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductUserPb.findObjectsPropertyBagByCondArray("all", "nonexisting = ?",['Nike'],{},['name'])
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase131
		Rho::WebView.executeJavascript("console.log('Am test 131')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({},{})
		count = ProductLocalPb.getCount()
		count = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 2 : '+ count +'")')
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondArray("all", "", [], {},[])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondArray("count", "", [], {},[])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondArray("first", "", [], {},[])
		count1 = ProductLocalPb.getCount()
		count1 = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 1 : '+ count1 +'")')
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase132
		Rho::WebView.executeJavascript("console.log('Am test 132')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondArray("all", "name = ?",['Puma'],{},['name'])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondArray("count", "name = ?", ['Puma'], {},['name','quantity'])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondArray("first", "name = ?", ['Puma'], {},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase133
		Rho::WebView.executeJavascript("console.log('Am test 133')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondArray("all", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondArray("count", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondArray("first", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase134
		Rho::WebView.executeJavascript("console.log('Am test 134')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		result = {}
		resAll = ProductLocalPb.findObjectsPropertyBagByCondArray("all", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		resCount = ProductLocalPb.findObjectsPropertyBagByCondArray("count", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		resFirst = ProductLocalPb.findObjectsPropertyBagByCondArray("first", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase135
		Rho::WebView.executeJavascript("console.log('Am test 135')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductLocalPb.findObjectsPropertyBagByCondArray()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase136
		Rho::WebView.executeJavascript("console.log('Am test 136')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductLocalPb.findObjectsPropertyBagByCondArray("", "name = ? AND quantity = ?",['name','quantity'],{},['name','quantity'])
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase137
		Rho::WebView.executeJavascript("console.log('Am test 137')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		ProductLocalPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductLocalPb.createObject(data)
		ProductLocalPb.createObject(data1)
		ProductLocalPb.createObject(data2)
		ProductLocalPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductLocalPb.findObjectsPropertyBagByCondArray("all", "nonexisting = ?",['Nike'],{},['name'])
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase138
		Rho::WebView.executeJavascript("console.log('Am test 138')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductAppPb.deleteObjectsPropertyBagByCondHash({},{})
		count = ProductAppPb.getCount()
		count = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 2 : '+ count +'")')
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondArray("all", "", [], {},[])
		resCount = ProductAppPb.findObjectsPropertyBagByCondArray("count", "", [], {},[])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondArray("first", "", [], {},[])
		count1 = ProductAppPb.getCount()
		count1 = count.to_s
		Rho::WebView.executeJavascript('console.log(" Count 1 : '+ count1 +'")')
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase139
		Rho::WebView.executeJavascript("console.log('Am test 139')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondArray("all", "name = ?",['Puma'],{},['name'])
		resCount = ProductAppPb.findObjectsPropertyBagByCondArray("count", "name = ?", ['Puma'], {},['name','quantity'])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondArray("first", "name = ?", ['Puma'], {},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase140
		Rho::WebView.executeJavascript("console.log('Am test 140')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondArray("all", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		resCount = ProductAppPb.findObjectsPropertyBagByCondArray("count", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondArray("first", "name = ? OR quantity = ?",['Nike','40'],{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase141
		Rho::WebView.executeJavascript("console.log('Am test 141')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		result = {}
		resAll = ProductAppPb.findObjectsPropertyBagByCondArray("all", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		resCount = ProductAppPb.findObjectsPropertyBagByCondArray("count", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		resFirst = ProductAppPb.findObjectsPropertyBagByCondArray("first", "name = ? AND quantity = ?",['Reebok','40'],{},['name','quantity'])
		result["resAll"] = resAll
		result["resCount"] = resCount
		result["resFirst"] = resFirst
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase142
		Rho::WebView.executeJavascript("console.log('Am test 142')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductAppPb.findObjectsPropertyBagByCondArray()
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase143
		Rho::WebView.executeJavascript("console.log('Am test 143')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductAppPb.findObjectsPropertyBagByCondArray("", "name = ? AND quantity = ?",['name','quantity'],{},['name','quantity'])
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase144
		Rho::WebView.executeJavascript("console.log('Am test 144')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		ProductAppPb.deleteObjectsPropertyBagByCondHash({}, {})
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		data = {}
		data["name"] = "Nike"
		data["quantity"] = "20"
		data1 = {}
		data1["name"] = "Woodlands"
		data1["quantity"] = "30"
		data2 = {}
		data2["name"] = "Reebok"
		data2["quantity"] = "40"
		data3 = {}
		data3["name"] = "Puma"
		data3["quantity"] = "40"
		ProductAppPb.createObject(data)
		ProductAppPb.createObject(data1)
		ProductAppPb.createObject(data2)
		ProductAppPb.createObject(data3)
		error = ""
		result = {}
		begin
			resAll = ProductAppPb.findObjectsPropertyBagByCondArray("all", "nonexisting = ?",['Nike'],{},['name'])
		rescue Exception => e
			error = e
		end
		result["error"] = error
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end

	def testcase145
		Rho::WebView.executeJavascript("console.log('Am test 145')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		result = {}
		result["name"] = ProductUserFs.getModelProperty("name")
		result["quantity"] = ProductUserFs.getModelProperty("quantity")
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase146
		Rho::WebView.executeJavascript("console.log('Am test 146')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		result = {}
		result["name"] = ProductLocalFs.getModelProperty("name")
		result["quantity"] = ProductLocalFs.getModelProperty("quantity")
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase147
		Rho::WebView.executeJavascript("console.log('Am test 147')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.set("partition", "app")
		result = {}
		result["name"] = ProductAppFs.getModelProperty("name")
		result["quantity"] = ProductAppFs.getModelProperty("quantity")
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase148
		Rho::WebView.executeJavascript("console.log('Am test 148')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductUserPb.setModelProperty("name", "string", "")
		ProductUserPb.setModelProperty("quantity", "string", "")
		ProductUserPb.set("partition", "user")
		result = {}
		result["name"] = ProductUserPb.getModelProperty("name")
		result["quantity"] = ProductUserPb.getModelProperty("quantity")
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase149
		Rho::WebView.executeJavascript("console.log('Am test 149')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductLocalPb.setModelProperty("name", "string", "")
		ProductLocalPb.setModelProperty("quantity", "string", "")
		ProductLocalPb.set("partition", "local")
		result = {}
		result["name"] = ProductLocalPb.getModelProperty("name")
		result["quantity"] = ProductLocalPb.getModelProperty("quantity")
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase150
		Rho::WebView.executeJavascript("console.log('Am test 150')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db.executeSql("DELETE FROM SOURCES")
		db.executeSql("DELETE FROM CLIENT_INFO")
		ProductAppPb.setModelProperty("name", "string", "")
		ProductAppPb.setModelProperty("quantity", "string", "")
		ProductAppPb.set("partition", "app")
		result = {}
		result["name"] = ProductAppPb.getModelProperty("name")
		result["quantity"] = ProductAppPb.getModelProperty("quantity")
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase151
		Rho::WebView.executeJavascript("console.log('Am test 151')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM ProductUserFs")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductUserFs.setModelProperty("name", "string", "")
		ProductUserFs.setModelProperty("quantity", "string", "")
		ProductUserFs.set("partition", "user")
		objData = ProductUserFs.createObject(data1)
		db.executeSql("DELETE FROM CHANGED_VALUES")
		objData1 = objData.to_json
		objId = objData["object"].to_s
		result = {}
		result["beforeChange"] = ProductUserFs.hasChanges(objData["object"])
		ProductUserFs.updateObject(objId, {:name => "Nike"}, {:name => "Woodlands"})
		result["find"] = ProductUserFs.findObjects("all", {}, [], [], [])
		result["objId"] = objData["object"]
		result["hasChange"] = ProductUserFs.hasChanges(objData["object"])
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase152
		Rho::WebView.executeJavascript("console.log('Am test 152')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductLocalFs")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		ProductLocalFs.set("partition", "local")
		objData = ProductLocalFs.createObject(data1)
		db.executeSql("DELETE FROM CHANGED_VALUES")
		objData1 = objData.to_json
		objId = objData["object"].to_s
		result = {}
		result["beforeChange"] = ProductLocalFs.hasChanges(objData["object"])
		ProductLocalFs.updateObject(objId, {:name => "Nike"}, {:name => "Woodlands"})
		result["find"] = ProductLocalFs.findObjects("all", {}, [], [], [])
		result["objId"] = objData["object"]
		result["hasChange"] = ProductLocalFs.hasChanges(objData["object"])
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcase153
		Rho::WebView.executeJavascript("console.log('Am test 153')")
		db = Rho::Database.new(Rho::Application.databaseFilePath('app'), 'app')
		db.executeSql("DELETE FROM ProductAppFs")
		data1 = {}
		data1["name"] = "Nike"
		data1["quantity"] = "20"
		ProductAppFs.setModelProperty("name", "string", "")
		ProductAppFs.setModelProperty("quantity", "string", "")
		ProductAppFs.set("partition", "app")
		objData = ProductAppFs.createObject(data1)
		db.executeSql("DELETE FROM CHANGED_VALUES")
		objData1 = objData.to_json
		objId = objData["object"].to_s
		result = {}
		result["beforeChange"] = ProductAppFs.hasChanges(objData["object"])
		ProductAppFs.updateObject(objId, {:name => "Nike"}, {:name => "Woodlands"})
		result["find"] = ProductAppFs.findObjects("all", {}, [], [], [])
		result["objId"] = objData["object"]
		result["hasChange"] = ProductAppFs.hasChanges(objData["object"])
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end



	def testcasea
		autoId = Rho::NewORM.generateId()
		autoId = autoId.to_s
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(' + autoId + ')')
	end
	def testcaseb
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db.executeSql("DELETE FROM CLIENT_INFO")
		result = {}
		result["before"] = Rho::NewORM.getClientId()
		myId = Rho::NewORM.generateId()
	    db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES (123456789012)")
		result["after"] = Rho::NewORM.getClientId()
		result = result.to_json
		finalResult = result.to_s
		Rho::WebView.executeJavascript('console.log(JSON.stringify('+ finalResult +'))')
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(JSON.stringify('+ result +'))')
	end
	def testcasec
		flag1 = Rho::NewORM.useNewOrm()
		flag1 = flag1.to_s
		Rho::WebView.executeJavascript('Ruby.sendValueToJS(' + flag1 + ')')
	end
	def reset
		data2 = {}
		data2["name"] = "woodlands"
		data2["quantity"] = "30"
		ProductLocalFs.setModelProperty("name", "string", "")
		ProductLocalFs.setModelProperty("quantity", "string", "")
		objData2 = ProductLocalFs.createObject(data2)
		db = Rho::Database.new(Rho::Application.databaseFilePath('user'), 'user')
		db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), 'local')
		db.executeSql("DELETE FROM ProductUserFs")
		db.executeSql("DELETE FROM OBJECT_VALUES")
		db2.executeSql("DELETE FROM ProductLocalFs")
		db2.executeSql("DELETE FROM OBJECT_VALUES")
	end
end
