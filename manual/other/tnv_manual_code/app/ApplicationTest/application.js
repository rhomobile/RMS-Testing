var i=0;

function startNull()
{
   Rho.Application.startURI= '';
}
   
function startInvalid()
{
  Rho.Application.startURI= '/app/idontExist.html';
}  
function startOriginal()
{
    Rho.Application.startURI= '/app/index.html';
}

function menuNullNames() {
	Rho.Application.nativeMenu = [
	{'label':'Options', 'action': 'Options'},{'label':'Exit', 'action': 'exit'},{'label':'', 'action': 'Log'},{'label':'', 'action': 'Refresh'},{ 'label':'Home', 'action': 'Home'}
	 ];
	}

function menuNullActions() {
Rho.Application.nativeMenu = [
{'label':'Options', 'action': 'Options'},{'label':'Exit', 'action': 'exit'},{'label':'Log', 'action': ''},{'label':'Refresh', 'action': ''},{ 'label':'Home', 'action': 'Home'}
 ];
}

function menuInvalidNames() {
Rho.Application.nativeMenu = [
{'label':'Options', 'action': 'Options'},{'label':'Keeewww###$%34', 'action': 'exit'},{'label':'Log', 'action': 'Log'},{'label':'Deva5466_45', 'action': 'Refresh'},{ 'label':'Home', 'action': 'Home'}
 ];
}

function menuInvalidActions() {
	Rho.Application.nativeMenu = [
	{'label':'Options', 'action': 'Options'},{'label':'Exit', 'action': 'Dontknow '},{'label':'Log', 'action': 'Log'},{'label':'Refresh', 'action': 'Buhahaha'},{ 'label':'Home', 'action': 'Home'}
	 ];
	}

function memoryLeak(){
	
 setInterval(function(){
minimize();
},10000); 	  

}
function minimize(){
if (i==5765)
{
	Rho.Application.quit()
}
i++;
	Rho.Application.minimize();
setTimeout(function(){
	  Rho.Application.restore();
	},5000); 
}
	
	