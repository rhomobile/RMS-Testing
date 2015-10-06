require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ProductLocalPbController < Rho::RhoController
  include BrowserHelper

  def testcase1
    ProductLocalPb.setModelProperty("name", "string", "")
    ProductLocalPb.setModelProperty("quantity", "string", "")
    ProductLocalPb.set("partition", "local")
    data = {}
    data["name"] = "Puma"
    data["quantity"] = "30"
    objData = ProductLocalPb.createObject(data)
    result = ProductLocalPb.canModify(objData["object"])
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(' + result.to_s + ')')
    
  end

  def testcase2
    ProductLocalPb.setModelProperty("name", "string", "")
    ProductLocalPb.setModelProperty("quantity", "string", "")
    ProductLocalPb.set("partition", "local")
    data = {}
    data["name"] = "Puma"
    data["quantity"] = "30"
    objData = ProductLocalPb.createObject(data)
    result = Rho::NewORM.haveLocalChanges()
    Rho::WebView.executeJavascript('console.log(" test : ' + result.to_s + '")')
    Rho::WebView.executeJavascript('Ruby.sendValueToJS("' + result.to_s + '")')
  end

end
