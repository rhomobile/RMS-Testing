

function menuNullNames() {
Rho.NativeMenubar.mainMenu = [
{ label: 'Home',action:'Home',disabled:false},{label:'separator',action:'separator',disabled:false},{label:'',action:'Options',disabled:false},{label:'',action:'Log',disabled:false},{label:'Refresh',action:'Refresh',disabled:false},{label:'Exit',action:'Exit',disabled:false},{label:'Sync',action:'Sync',disabled:false},{label:'fullscreen',action:'fullscreen',disabled:false},{label:'Load a page',action:'/app/loading.html',disabled:false}
 ];
}

function menuNullActions() {
Rho.NativeMenubar.mainMenu = [
{ label: 'Home',action:'Home',disabled:false},{label:'separator',action:'separator',disabled:false},{label:'Options',action:'',disabled:false},{label:'Log',action:'',disabled:false},{label:'Refresh',action:'Refresh',disabled:false},{label:'Exit',action:'Exit',disabled:false},{label:'Sync',action:'Sync',disabled:false},{label:'fullscreen',action:'fullscreen',disabled:false}
 ];
}
