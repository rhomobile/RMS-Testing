require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class ApplicationtestController < Rho::RhoController


def minimize
  Rho::Application.minimize
end
  
def restore
  Rho::Application.restore
end
  
def quit
  Rho::Application.quit
end

def start_original
  Rho::Application.startURI= '/app/index.html'
end

def start_local
  Rho::Application.startURI= '/app/loading.html'
end
  
def start_web
  Rho::Application.startURI= 'http://www.google.com'
end
   
def start_null
  Rho::Application.startURI= ''
end
   
def start_invalid
  Rho::Application.startURI= '/app/idontExist.html'
end

def set_title
  if @params['empty']
    Rho::Application.title =''
  else
    Rho::Application.title ='MyTitle'
  end
end

# callback method
def menu_callback
  Rho::Log.info("menu_callback", "LOG_TEST")
end

def menu_test
  Rho::Application.nativeMenu = [
    {:label=>'Home', :action=>'Home'},
    {:label=>'separator', :action=>'separator'},
    {:label=>'Options', :action=>'options'},
    {:label=>'Log', :action=>'log'},
    {:label=>'Exit', :action=>'exit'},
    {:label=>'Refresh', :action=>'refresh'}, 
    {:label=>'Callback', :action=> url_for(:action => :menu_callback)}
  ]
end

def menu_default
  Rho::Application.nativeMenu = Rho::Application.defaultNativeMenu
end

def menu_reservedItem
  Rho::Application.nativeMenu = [
    {:label=>'Options', :action=> 'Options'},
    {:label=>'Exit', :action=> 'exit'},
    {:label=>'Log', :action=> 'Log'},
    {:label=>'Refresh', :action=> 'Refresh'},
    {:label=>'Home', :action=> 'Home'},
    {:label=>'Load a page', :action=> '/app/loading.html'}
  ]
end

def menu_jscall
  Rho::Application.nativeMenu = [
    {:label=>'Log', :action=> 'Log'},
    {:label=>'fullscreen', :action=> 'fullscreen'},
    {:label=>'Exit', :action=>'javascript=>onQuit()'},
    {:label=>'separator', :action=> 'separator '},
    {:label=>'Refresh', :action=> 'Refresh'},
    { :label=>'Home', :action=> 'Home'},
    {:label=>'Load a page', :action=> '/app/loading.html'}
  ]
end

def badlink_uri
  @data1 = Rho::Application.badLinkURI
  if @data1
    @data = @data1.gsub(/(?=\W)/, '\\').to_s
  else
    @data = ''
  end
  Rho::WebView.executeJavascript('document.getElementById("verificationResult").innerHTML= "'+@data+'";')
end

def securitytoken
  @data1 = Rho::Application.securityTokenNotPassed
  @data = @data1.to_s
  Rho::WebView.executeJavascript('document.getElementById("verificationResult").innerHTML= "'+@data+'";')
end

def start_uri
  @data = Rho::Application.startURI
  Rho::WebView.executeJavascript('document.getElementById("verificationResult").innerHTML= "'+@data+'";')
end

def database_file
  local = Rho::Application.databaseFilePath('local')
  filepath = Rho::Application.relativeDatabaseBlobFilePath(local)
  data = Rho::Application.expandDatabaseBlobFilePath(filepath)
  Rho::WebView.executeJavascript('document.getElementById("verificationResult").innerHTML= "'+data+'";')
end

end