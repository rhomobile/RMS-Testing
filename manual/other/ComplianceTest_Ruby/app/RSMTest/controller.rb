require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class RSMTestController < Rho::RhoController
  
  $scanner = nil
  
  # set scanner for tests 
  def set_scanner
    @obj = Rho::Barcode.enumerate
    count = @obj.length
    $scanner = @obj[count-1]
  end

  # callback functions
  
  def rsm_callback
    @result = @params.to_json
    #@result = ""
    #@params.each do |key, value|
    #  @result += '<br/>' + key.to_s + ': ' + value.to_s
    #end
    Rho::WebView.executeJavascript("document.getElementById('clbkData').innerHTML= JSON.stringify(#{@result})")
    Rho::WebView.executeJavascript("document.getElementById('clbkData').style.display='block'")
  end

  def bluetooth_status
    @data = @params.to_json
    @bluetooth_data = Rho::WebView.executeJavascript("Ruby.sendValueToJS(JSON.stringify(#{@data}))")
  end
  
  def rsm_enable
    set_scanner
    $scanner.connectionIdleTimeout = 30
    $scanner.disconnectBtOnDisable = false
    $scanner.displayBtAddressBarcodeOnEnable = true
    #$scanner.disableScannerDuringNavigate = false
    $scanner.registerBluetoothStatus(url_for(:action => :rsm_callback))
    $scanner.enable()
  end

  def rsm_props
    set_scanner
    @result = $scanner.getProperty(@params['data'].to_s)
    @data = @params['test'].to_s + " : " + @result.to_s
    Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= '#{@data}'")
    Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  end

  def command_remote_scanner
    set_scanner
    $scanner.connectionIdleTimeout = 10000
    $scanner.commandRemoteScanner("#{@params['data']}")
  end

  def rsm_enable_method
    set_scanner
    $scanner.connectionIdleTimeout = 30
    $scanner.disconnectBtOnDisable = false
    $scanner.displayBtAddressBarcodeOnEnable = true
    #$scanner.disableScannerDuringNavigate = false
    $scanner.enable({}, url_for(:action => :rsm_callback))
  end

end
