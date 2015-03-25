function minimize(){
    Rho.Application.minimize();
}
  
function restore(){
    Rho.Application.minimize();
    setTimeout(function(){
    	restored();
    	},3000); 
}
  
function restored(){
   Rho.Application.restore();
}	

function minQuit(){

    Rho.Application.minimize();
    setTimeout(function(){quit()},3000); 
}
  
  function quit(){
    Rho.Application.quit();
}

function startOriginal()
{
    Rho.Application.startURI= '/app/index.html';
}

function startLocal()
{
   Rho.Application.startURI= '/app/loading.html';
}
  
function startWeb()
{
    Rho.Application.startURI= 'http://www.google.com';
}
   
function startNull()
{
   Rho.Application.startURI= '';
}
   
function startInvalid()
{
  Rho.Application.startURI= '/app/idontExist.html';
}  

function setTitle(){
 Rho.Application.title ='MyTitle';
}

function getTitle() 
{ 
	var data = Rho.Application.title;
	$("#Rho_Application_title span.result").text(JSON.stringify(data));
};

function setTitleNull(){
 Rho.Application.title ='';
};

function menuCallback(){
    Rho.Log.info("menuCallback", "LOG_TEST");
};

function menuTest() {
Rho.Application.nativeMenu = [
    {'label':'Home', 'action': 'Home'},
    {'label':'separator', 'action': 'separator'},
    {'label':'Options', 'action': 'options'},
    {'label':'Log', 'action': 'log'},
    {'label':'Exit', 'action': 'exit'},
    {'label':'Refresh', 'action': 'refresh'}, 
    {'label':'Callback', 'action': 'menuCallback()'}
  ];
};

function menuDefaultTest() {
    
  Rho.Application.nativeMenu = Rho.Application.defaultNativeMenu;
};
 
function menuReservedItem() {
  Rho.Application.nativeMenu = [
    {'label':'Options', 'action': 'Options'},
    {'label':'Exit', 'action': 'exit'},
    {'label':'Log', 'action': 'Log'},
    {'label':'Refresh', 'action': 'Refresh'},
    { 'label':'Home', 'action': 'Home'},
    {'label':'Load a page', 'action': '/app/loading.html'}
  ];
} 

function menuJavascriptCall() {
  Rho.Application.nativeMenu = [
    {'label':'Log', 'action': 'Log'},
    {'label':'fullscreen', 'action': 'fullscreen'},
    {'label':'Exit', 'action':'javascript:onQuit()'},
    {'label':'separator', 'action': 'separator '},
    {'label':'Refresh', 'action': 'Refresh'},
    {'label':'Home', 'action': 'Home'},
    {'label':'Load a page', 'action': '/app/loading.html'}
  ];
}; 

function onQuit()
{
  Rho.Application.quit();
};


function getInvalidSecurityTokenStartPath(){
var data = Rho.Application.invalidSecurityTokenStartPath;
$("#Rho_Application_securityToken span.result").text(JSON.stringify(data));
}

function securityTokenResult(){
var data = Rho.Application.securityTokenNotPassed;
$("#Rho_Application_security span.result").text(JSON.stringify(data));	
}	
	
function applicationNotify(){
 //Rho.AppEvents.simulateEvent(Rho.AppEvents.APP_EVENT_DEACTIVATED);
Rho.Application.setApplicationNotify(notifyCallback);
}

function leftZeroFill(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function notifyCallback(params){
  //data=params;
  Rho.Log.info(params.applicationEvent,'APP_CALLBACK');

  $("#Rho_Application_Notify span.result").text(params.applicationEvent);

  var time = new Date();
  var timeStr = leftZeroFill(time.getHours(),2) + ":" + leftZeroFill(time.getMinutes(),2) + ":" + leftZeroFill(time.getSeconds(),2) + "." + leftZeroFill(~~(time.getMilliseconds()/10),2);
  
  // create new ul
  var ul = $("#Rho_Application_Notify ul.list").append("<li><ul>Event: " + params.applicationEvent + "<li>Time: " + timeStr+"</li></ul></li>");
}	
	