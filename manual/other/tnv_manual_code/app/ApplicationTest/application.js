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

function menuInvalidActions() {
	Rho.Application.nativeMenu = [
	{'Options': 'Options'},{'Exit': 'Dontknow '},{'Log': 'Log'},{'Refresh': 'Buhahaha'},{ 'Home': 'Home'}
	 ];
	}