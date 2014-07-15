require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class ApplicationtestController < Rho::RhoController


def minimize
  Rho::Application.minimize()
end
  
def restore
  Rho::Application.restore()
end
  
def quit
  Rho::Application.quit()
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
  Rho::Application.title ='MyTitle'
end

# callback method
def menu_callback
  Rho::Log.info("menu_callback", "LOG_TEST")
end

def menu_test
  Rho::Application.nativeMenu = [
    {'label'=>'Home', 'action'=>'Home'},
    {'label'=>'separator', 'action'=>'separator'},
    {'label'=>'Options', 'action'=>'options'},
    {'label'=>'Log', 'action'=>'log'},
    {'label'=>'Exit', 'action'=>'exit'},
    {'label'=>'Refresh', 'action'=>'refresh'}, 
    {'label'=>'Callback', 'action'=> url_for(:action => :menu_callback)}
  ]
end

def menu_default
  Rho::Application.nativeMenu = Rho::Application.defaultNativeMenu
end

def menu_reservedItem
  Rho::Application.nativeMenu = [
    {'label'=>'Options', 'action'=> 'Options'},
    {'label'=>'Exit', 'action'=> 'exit'},
    {'label'=>'Log', 'action'=> 'Log'},
    {'label'=>'Refresh', 'action'=> 'Refresh'},
    { 'label'=>'Home', 'action'=> 'Home'},
    {'label'=>'Load a page', 'action'=> '/app/loading.html'}
  ]
end

def menu_jscall
  Rho::Application.nativeMenu = [
    {'label'=>'Log', 'action'=> 'Log'},
    {'label'=>'fullscreen', 'action'=> 'fullscreen'},
    {'label'=>'Exit', 'action'=>'javascript=>onQuit()'},
    {'label'=>'separator', 'action'=> 'separator '},
    {'label'=>'Refresh', 'action'=> 'Refresh'},
    { 'label'=>'Home', 'action'=> 'Home'},
    {'label'=>'Load a page', 'action'=> '/app/loading.html'}
  ]
end

# function getTitle() 
# { 
#   var data = Rho.Application.title;
#   $("#Rho_Application_title span.result").text(JSON.stringify(data));
# }

# function setTitleNull(){
#  Rho.Application.title ='';
# }

# function onQuit()
# {
# Rho.Application.quit();
# }


# function getInvalidSecurityTokenStartPath(){
# var data = Rho.Application.invalidSecurityTokenStartPath;
# $("#Rho_Application_securityToken span.result").text(JSON.stringify(data));
# }

# function securityTokenResult(){
# var data = Rho.Application.securityTokenNotPassed;
# $("#Rho_Application_security span.result").text(JSON.stringify(data));	
# }	
	
# function applicationNotify(){
#  //Rho.AppEvents.simulateEvent(Rho.AppEvents.APP_EVENT_DEACTIVATED);
# Rho.Application.setApplicationNotify(notifyCallback);
# }

# function leftZeroFill(number, targetLength) {
#     var output = number + '';
#     while (output.length < targetLength) {
#         output = '0' + output;
#     }
#     return output;
# }

# function notifyCallback(params){
#   //data=params;
#   Rho.Log.info(params.applicationEvent,'APP_CALLBACK');

#   $("#Rho_Application_Notify span.result").text(params.applicationEvent);

#   var time = new Date();
#   var timeStr = leftZeroFill(time.getHours(),2) + ":" + leftZeroFill(time.getMinutes(),2) + ":" + leftZeroFill(time.getSeconds(),2) + "." + leftZeroFill(~~(time.getMilliseconds()/10),2);
  
#   // create new ul
#   var ul = $("#Rho_Application_Notify ul.list").append("<li><ul>Event: " + params.applicationEvent + "<li>Time: " + timeStr+"</li></ul></li>");
# }	

end