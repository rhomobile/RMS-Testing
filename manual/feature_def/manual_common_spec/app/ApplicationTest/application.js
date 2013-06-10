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

function setArabic()
{
 Rho.Application.setLocale('ar');
}

function setRussian()
{
 Rho.Application.setLocale('ru');
}

function setGerman()
{
 Rho.Application.setLocale('de','us');
}
  
function setCatalan()
{
 Rho.Application.setLocale('ca');
}
  
function setFrench()
{
 Rho.Application.setLocale('fr');
}

function setSpanish()
{
 Rho.Application.setLocale('es','asd');
}
      
 function setItalian()
{
 Rho.Application.setLocale('it');
}

function setKorean()
{
 Rho.Application.setLocale('ko');
}

 function setChinese()
{
 Rho.Application.setLocale('zh');
}

function setjapanese()
{
 Rho.Application.setLocale('ja');
}

function setCzech()
{
 Rho.Application.setLocale('cs');
}     
     
function setDannish()
{
 Rho.Application.setLocale('da');
}       
 
function setFinnish()
{
 Rho.Application.setLocale('fi');
}

function setSerbian()
{
 Rho.Application.setLocale('sr');
}

 function setDutch()
{
 Rho.Application.setLocale('ni');
}
function setPoruguese()
{
 Rho.Application.setLocale('pt');
}      
   
function setHebrew()
{
 Rho.Application.setLocale('he');
}

function setTitle(){
 Rho.Application.title ='MyTitle';
}

function getTitle() 
{ 
	var data = Rho.Application.title;
	$("#Rho_Application_title span.result").text($.toJSON(data));
}

function setTitleNull(){
 Rho.Application.title ='';
}


function menuTest() {
Rho.Application.nativeMenu = [
{ 'Home': 'refresh'},{'seperator': 'home'},{'Options': 'exit'},{'Log': 'sync'},{'Refresh': 'options'},{'Refresh': 'options'}
 ];
}

function menuNullNames() {
Rho.Application.nativeMenu = [
{'Options': 'Options'},{'Exit': 'exit'},{'': 'Log'},{'': 'Refresh'},{ 'Home': 'Home'}
 ];
}

function menuNullActions() {
Rho.Application.nativeMenu = [
{'Options': 'Options'},{'Exit': 'exit'},{'Log': ''},{'Refresh': ''},{ 'Home': 'Home'}
 ];
}

function menuInvalidNames() {
Rho.Application.nativeMenu = [
{'Options': 'Options'},{'Keeewww###$%34': 'exit'},{'Log': 'Log'},{'Deva5466_45': 'Refresh'},{ 'Home': 'Home'}
 ];
}
 
function menuReservedItem() {
Rho.Application.nativeMenu = [
{'Options': 'Options'},{'Exit': 'exit'},{'Log': 'Log'},{'Refresh': 'Refresh'},{ 'Home': 'Home'},{'Load a page': '/app/loading.html'}
 ];
} 

function platfromAsync1(){
Rho.Application.getRhoPlatformVersion(myCallback);
}

function myCallback(params){
alert('params');
$("#Rho_Application_version_Async span.result").text($.toJSON(data));
}

function platformSync(){
data= Application.getRhoPlatformVersion(myCallback());
$("#Rho_Application_version_Sync span.result").text($.toJSON(data));
} 
 
function platfromAnonymous(){
Rho.Application.getRhoPlatformVersion(function (params){
data=params;
$("#Rho_Application_version_Anon span.result").text($.toJSON(data));
});
}

function platfromAnonymous(){
Rho.Application.getRhoPlatformVersion(function (params){
data=params;
$("#Rho_Application_version_Anon span.result").text($.toJSON(data));
});
}

function invalidSecurityLocal(){
Rho.Application.invalidSecurityTokenStartPath='/app/loading.html';	
}

function invalidSecurityGoogle(){
Rho.Application.invalidSecurityTokenStartPath='http://www.google.com';	
var data = Rho.Application.invalidSecurityTokenStartPath;
$("#Rho_Application_securityToken span.result").text($.toJSON(data));
}

function invalidSecurityNull(){
Rho.Application.invalidSecurityTokenStartPath='';	
}

function invalidSecurityInvalid(){
Rho.Application.invalidSecurityTokenStartPath='idontexistatall';	
}

function invalidSecurityStartPage(){
Rho.Application.invalidSecurityTokenStartPath='/public/app/index.html';	
}

function securityTokenResult(){
var data = Rho.Application.securityTokenNotPassed;
$("#Rho_Application_security span.result").text($.toJSON(data));	
}	
	
	