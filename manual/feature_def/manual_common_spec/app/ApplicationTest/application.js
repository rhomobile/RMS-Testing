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
}

function setTitleNull(){
 Rho.Application.title ='';
}

function menuCallback(){
    Rho.Log.info("menuCallback", "LOG_TEST");
}

function menuTest() {
Rho.Application.nativeMenu = [
{ 'Home': 'Home'},{'separator': 'separator'},{'Options': 'options'},{'Log': 'log'},{'Exit': 'exit'},{'Refresh': 'refresh'}, {'Callback': menuCallback}
 ];
}

 
function menuReservedItem() {
Rho.Application.nativeMenu = [
{'Options': 'Options'},{'Exit': 'exit'},{'Log': 'Log'},{'Refresh': 'Refresh'},{ 'Home': 'Home'},{'Load a page': '/app/loading.html'}
 ];
} 

function menuJavascriptCall() {
Rho.Application.nativeMenu = [
{'Log': 'Log'},{'fullscreen': 'fullscreen'},{'Exit':'javascript:onQuit()'},{'separator': 'separator '},{'Refresh': 'Refresh'},{ 'Home': 'Home'},{'Load a page': '/app/loading.html'}
];
} 
function onQuit()
{
Rho.Application.quit();
}


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

function notifyCallback(params){
//data=params;
Rho.Log.info(params.applicationEvent,'APP_CALLBACK');

$("#Rho_Application_Notify span.result").text(params.applicationEvent);
}	
	