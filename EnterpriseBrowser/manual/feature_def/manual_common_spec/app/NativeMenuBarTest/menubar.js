
function menuTest() {
  EB.NativeMenubar.mainMenu = [
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
  EB.NativeMenubar.mainMenu = [
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
  EB.NativeMenubar.mainMenu = [
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
  EB.NativeMenubar.mainMenu = [
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
  EB.NativeMenubar.mainMenu = [
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
  EB.Application.quit();
}

function menuAction()
{
  EB.NativeMenubar.mainMenu = [ 
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];

  EB.NativeMenubar.mainButton = { label: 'Home',action:'Home',disabled:false};
}

function menuNoAction()
{
  EB.NativeMenubar.mainMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];
  EB.NativeMenubar.mainButton = { label: 'Home',action:'',disabled:false};
}

function extramenuTest() {
  EB.NativeMenubar.extraMenu = [
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
  EB.NativeMenubar.extraMenu = [
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
  EB.NativeMenubar.extraMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];

  EB.NativeMenubar.extraButton = { label: 'Home',action:'Home',disabled:false};
}

function extraMenuNoAction()
{
  EB.NativeMenubar.extraMenu = [
  {label: 'Home',action:'Home',disabled:false},
  {label:'Options',action:'Options',disabled:false},
  {label:'Log',action:'Log',disabled:false},
  {label:'Refresh',action:'Refresh',disabled:false},
  {label:'Exit',action:'Exit',disabled:false},
  {label:'Sync',action:'Sync',disabled:false},
  {label:'fullscreen',action:'fullscreen',disabled:false}];

  EB.NativeMenubar.extraButton = { label: 'Home',action:'',disabled:false};
} 

function mainButton()
{
	EB.NativeMenubar.mainButton ={label:'Log',action:'Log',disabled:false};
}

function mainButtonDisabled()
{
	EB.NativeMenubar.mainButton ={label:'Log',action:'Log',disabled:true};
}

function extraButton()
{
	 EB.NativeMenubar.extraButton = { label: 'Quit',action:'Exit',disabled:false};
}

function extraButtonDisabled()
{
	 EB.NativeMenubar.extraButton = { label: 'Quit',action:'Exit',disabled:true};
}

function nativeDefault()
{
	var app=EB.NativeMenubar.defaultMainMenu;
	EB.Log.info(natvieDefaultvalues, 'app');
}