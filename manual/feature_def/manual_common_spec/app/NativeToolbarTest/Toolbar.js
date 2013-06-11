function toolCreate(){
var toolElements = new Array();
toolElements=[{label: 'Home',action: 'Home'},{label: 'Exit',action: 'exit'},{label: 'close',action: 'close'},{label: 'Options',action: 'options'},{label: 'refresh',action:'refresh'},{label: 'back',action:'back'},
{label: 'log',action: 'log'},{label: 'Fullscreen',action: 'fullscreen'},{label: 'sync',action: 'sync'},{label: 'minimize',action: 'minimize'},{label: 'SIP',action: 'SIP'}];
var toolProperties ={backgroundColor:0xFF00,maskColor:'',viewHeight:100};       
Rho.NativeToolbar.create(toolElements,toolProperties);	  
}


function toolIconLabelMask()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/public/images/bar/colored_btn.png'},{label:'Exit',action: 'exit',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'}];
	var toolProperties ={backgroundColor:'',maskColor:0xFF00,viewHeight:100}; 
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}


function toolColored()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/public/images/bar/colored_btn.png'},{label:'Exit',action: 'exit',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'back',action:'back',icon:'/public/images/bar/back_btn_colored.png',coloredIcon:true}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolRemove(){
	Rho.NativeToolbar.remove();	
}

function toolNoLabelIcon()
{   
	var toolElements = new Array();
	toolElements=[{action: 'Home'},{label:'Exit',action: 'exit',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'back',action:'back',icon:'/public/images/bar/back_btn_colored.png',coloredIcon:true},{action: 'fullscreen'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolNoAction()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: '',icon:'/public/images/bar/colored_btn.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolInvalidAction()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'InvalidAction@#',icon:'/public/images/bar/colored_btn.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolLoadIndex()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'home',icon:'/public/images/bar/colored_btn.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'},{label:'Load Application Test on clicking this button this is also a test to check long Label  ',action: '/public/app/api/application_tnv.html'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolManyOptions()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home'},{label: 'Exit',action: 'exit'},{label: 'close',action: 'close'},{label: 'Options',action: 'options'},{label: 'refresh',action:'refresh'},{label: 'back',action:'back'},
	{label: 'log',action: 'log'},{label: 'Fullscreen',action: 'fullscreen'},{label: 'sync',action: 'sync'},{label: 'minimize',action: 'minimize'},{label: 'SIP',action: 'SIP'},{label: 'Home',action: 'Home'},{label: 'Exit',action: 'exit'},{label: 'close',action: 'close'},{label: 'Options',action: 'options'},{label: 'refresh',action:'refresh'},{label: 'back',action:'back'},
	{label: 'log',action: 'log'},{label: 'Fullscreen',action: 'fullscreen'},{label: 'sync',action: 'sync'},{label: 'minimize',action: 'minimize'},{label: 'SIP',action: 'SIP'}];
	var toolProperties ={backgroundColor:0xFF00,maskColor:'',viewHeight:100};      
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolAnime()
{
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/app/NativeToolbarTest/man_48.jpg'},{label:'refresh',action: 'refresh',icon:'/app/NativeToolbarTest/twocats_wm.jpg'},{label:'refresh',action: 'refresh',icon:'/app/NativeToolbarTest/phones_485.png'}];
	var toolProperties ={backgroundColor:0xFF00,maskColor:'',viewHeight:100};      
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}	
	
function toolAnimeOther()
{
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/app/NativeToolbarTest/cake_30.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/app/NativeToolbarTest/cat_30.png'}];
	var toolProperties ={backgroundColor:0xFF00,maskColor:'',viewHeight:100};      
	Rho.NativeToolbar.create(toolElements,toolProperties);	
}

function toolInvalidView()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/public/images/bar/colored_btn.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'}];
	var toolProperties ={backgroundColor:0xFF0000,maskColor:0xFF0000,viewHeight:0.8923};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolInvalidBkg()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/public/images/bar/colored_btn.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'}];
	var toolProperties ={backgroundColor :0.3030,maskColor :0xFF0000 ,viewHeight:300};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}


function toolInvalidMAsk()
{   
	var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'Home',icon:'/public/images/bar/colored_btn.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0.3264,viewHeight:300};   
	Rho.NativeToolbar.create(toolElements,toolProperties);	  
}

function toolJavascript()
{
    var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'home',icon:'/public/images/bar/colored_btn.png'},{label:'exit',action: 'javascript:onQuit()',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'},{label:'Load a HTML page ',action: 'app/ApplicationTest/application.html'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);
	
}

function toolViewHeight()
{
    var toolElements = new Array();
	toolElements=[{label: 'Home',action: 'home',icon:'/public/images/bar/colored_btn.png'},{label:'exit',action: 'javascript:onQuit()',icon:'/public/images/bar/refresh_btn.wm.png'},{label:'refresh',action: 'refresh',icon:'/public/images/bar/forward_btn.png'},{label:'Load a HTML page ',action: 'app/ApplicationTest/application.html'}];
	var toolProperties ={backgroundColor :0xFF0000,maskColor :0xFF0000,viewHeight:700};   
    Rho.NativeToolbar.create(toolElements,toolProperties);
}

function onQuit()
{
Rho.Application.quit();
}

function toolSwitch1()
{
var toolElements = new Array();
	toolElements=[{action:'/app/NativeToolbarTest/Page1.html',icon:'/public/images/bar/switch/btn_1.png'},
	{action:'separator',width:200},
	{action:'/app/NativeToolbarTest/Page2.html',icon:'/public/images/bar/switch/btn_2.png'},
	{action:'separator',width:400},
	{action:'/app/NativeToolbarTest/Page3.html',icon:'/public/images/bar/switch/btn_3.png'},
	{action:'separator',width:100},
	{action:'/app/NativeToolbarTest/Page4.html',icon:'/public/images/bar/switch/btn_4.png'},
	{action:'separator',width:50},
	{action:'/app/NativeToolbarTest/Page5.html',icon:'/public/images/bar/switch/btn_5.png'},
	{action:'separator',width:-20}];
	
	var toolProperties ={backgroundColor:0xFF0000,maskColor:0xFF0000,viewHeight:100};   
	Rho.NativeToolbar.create(toolElements,toolProperties);
	Rho.WebView.navigate("/app/NativeToolbarTest/page1.html");
	
}

