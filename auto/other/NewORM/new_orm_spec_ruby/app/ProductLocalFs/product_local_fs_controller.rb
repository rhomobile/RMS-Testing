require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ProductLocalFsController < Rho::RhoController
  include BrowserHelper

  def testcase1
    data = {}
    data["name"] = "Puma"
    data["quantity"] = "30"
    ProductLocalFs.setModelProperty("name", "string", "")
    ProductLocalFs.setModelProperty("quantity", "string", "")
    objData = ProductLocalFs.createObject(data)
    result = ProductLocalFs.canModify(objData["object"])
    Rho::WebView.executeJavascript('Ruby.sendValueToJS(' + result.to_s + ')')
  end

  def testcase2
    
  end
end
