require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SystemController < Rho::RhoController


  # Methods belonging to Jasmine test spec for system api
  # callback method
  def sys_callback
    @data = @params.to_json
    Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= JSON.stringify(#{@data})")
    Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  end
  
  
  def getall_props
    @data1 =  Rho::System.getAllProperties()
    @data = @data1.to_json
    Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= JSON.stringify(#{@data})")
    Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  end
  
  def get_property
    if @params['prop']
      @data = Rho::System.getProperty(@params['prop'])
    else
      @data = 'No Property param'
    end
    Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= '#{@data}'")
    Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  end
  
  def get_properties
    @data1 = Rho::System.getProperties(['country','deviceName','devicePushId','freeServerPort'])
    @data = @data1.to_json
    Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= JSON.stringify(#{@data})")
    Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  end
  
  def get_props
    if @params['prop']
      param = []
      param << @params['prop']      
      @data1 = Rho::System.getProperties(param)
      @data = @data1.to_json
      Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= JSON.stringify(#{@data})")
    else
      Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= 'properties not found'")
    end
    Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  end
  
  def get_properties_cb
    Rho::System.getProperties(['country','deviceName','devicePushId','freeServerPort'],url_for(:action => :sys_callback))
  end
  
  
  # Methods belonging to system.html manual test page

  def http_proxy
    Rho::System.httpProxyURI='http://wwwgate0.mot.com:1080'
  end

  def get_http_proxyURI
    @data1 = Rho::System.getProperty('httpProxyURI')
    @data = @data1.to_json
    Rho::WebView.executeJavascript("$('#Rho_System_httpProxyURI span.result').text(JSON.stringify(#{@data}))")
  end

  def default_proxyset
    @data1 = Rho::System.httpProxyURI
    @data = @data1.to_json
    Rho::WebView.executeJavascript("$('#httpProxyURI span.defaultset').text(JSON.stringify(#{@data}))")
  end
  
  def keyboard_state
    if @params['state']
      Rho::System.keyboardState = @params['state']
    end
  end

  def get_keyboard_state
    @data1 = Rho::System.getProperty('keyboardState')
    @data = @data1.to_json
    Rho::WebView.executeJavascript("$('#Rho_System_keyboardState span.result').text(JSON.stringify(#{@data}))")
  end

  def default_keyboard_state
    @data1 = Rho::System.keyboardState
    @data = @data1.to_json
    Rho::WebView.executeJavascript("$('#Rho_System_keyboardState span.defaultset').text(JSON.stringify(#{@data}))")
  end

  def app_install
    if @params['file']
      Rho::System.applicationInstall(@params['file'])
    end
  end

  def is_installed
    if @params['file']
      if @params['file'] == 'wm'
        @isInstalled = Rho::System.isApplicationInstalled('rhomobile TestApp/TestApp.exe')
      elsif @params['file'] == 'android'
        @isInstalled = Rho::System.isApplicationInstalled('com.rhomobile.testapp')
      else
        @isInstalled = Rho::System.isApplicationInstalled('testapp')
      end
      if (@isInstalled)
          Alert.show_popup("testApp application is installed in the device")
      else
          Alert.show_popup("testApp application is not installed in the device")
      end
    end
  end

  def run_app
    if @params['file']
      if @params['file'] == 'wm'
        Rho::System.runApplication('rhomobile TestApp/TestApp.exe','ParamsAreSet')
      elsif @params['file'] == 'android'
        Rho::System.runApplication('com.rhomobile.testapp','ParamsAreSet')
      else
        Rho::System.runApplication('testapp','ParamsAreSet')
      end
    end
  end

  def app_uninstall
    if @params['file']
      Rho::System.applicationUninstall(@params['file'])
    end
  end

  def autorotate_property
    if @params['rotate']
      Rho::System.setProperty('screenAutoRotate', @params['rotate'])
    end
  end

  def get_property_screen
    @data1 = Rho::System.getProperty('screenAutoRotate')
    @data = @data1.to_json
    Rho::WebView.executeJavascript("$('#Rho_System_setproperty span.defaultset').text(JSON.stringify(#{@data}))")
  end


end