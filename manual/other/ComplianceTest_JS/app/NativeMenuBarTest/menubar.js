
function menuTest() {
  Rho.NativeMenubar.mainMenu = [
  { label: 'Home',action:'Home',disabled:false},
  {label:'separator',action:'separator',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false},
  {label:'Load a page',action:'/app/loading.html',disabled:false}];
}

function menuNullNames() {
  Rho.NativeMenubar.mainMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'separator',action:'separator',disabled:false},
  {label:'',action:'Options',disabled:false},
  {label:'',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false},
  {label:'Load a page',action:'/app/loading.html',disabled:false}];
}

function menuNullActions() {
  Rho.NativeMenubar.mainMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'separator',action:'separator',disabled:false},
  {label:'Options',action:'',disabled:false},
  {label:'Log',action:'',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];
}

function menuDisabled() {
  Rho.NativeMenubar.mainMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:true},
  {label:'Refresh',action:'Refresh',disabled:true},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false},
  {label:'Load a page',action:'/app/loading.html',disabled:false}];
}
 
function menuJavascriptCall() {
  Rho.NativeMenubar.mainMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'javascript:onQuit()',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];
}

function onQuit()
{
  Rho.Application.quit();
}

function menuAction()
{
  Rho.NativeMenubar.mainMenu = [ 
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];

  Rho.NativeMenubar.mainButton = { label: 'Home',action:'Home',disabled:false};
}

function menuNoAction()
{
  Rho.NativeMenubar.mainMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];
  Rho.NativeMenubar.mainButton = { label: 'Home',action:'',disabled:false};
}

function extramenuTest() {
  Rho.NativeMenubar.extraMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'separator',action:'separator',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false},
  {label:'Load a page',action:'/app/loading.html',disabled:false}];
}

function extramenuDisabled() {
  Rho.NativeMenubar.extraMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:true},
  {label:'Refresh',action:'Refresh',disabled:true},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false},
  {label:'Load a page',action:'/app/loading.html',disabled:false}];
}

function extraMenuAction()
{
  Rho.NativeMenubar.extraMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];

  Rho.NativeMenubar.extraButton = { label: 'Home',action:'Home',disabled:false};
}

function extraMenuNoAction()
{
  Rho.NativeMenubar.extraMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];

  Rho.NativeMenubar.extraButton = { label: 'Home',action:'',disabled:false};
} 

function mainButton()
{
	Rho.NativeMenubar.mainButton ={label:'Log',action:'Log',disabled:false};
}

function mainButtonDisabled()
{
	Rho.NativeMenubar.mainButton ={label:'Log',action:'Log',disabled:true};
}

function extraButton()
{
	 Rho.NativeMenubar.extraButton = { label: 'Quit',action:'Exit',disabled:false};
}

function extraButtonDisabled()
{
	 Rho.NativeMenubar.extraButton = { label: 'Quit',action:'Exit',disabled:true};
}

function nativeDefault()
{
	var app=Rho.NativeMenubar.defaultMainMenu;
	Rho.Log.info(natvieDefaultvalues, 'app');
}