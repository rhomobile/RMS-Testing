function set_tabbar() 
{
	Rho.NativeTabbar.create( [ 
                {'label':'MainPage', 'action':'/public/app/api/webview.html', 'reload': 'true'},
                {'label':'Page1', 'action':'/public/app/api/webview.html', 'reload': 'false'}, 
                {'label':'Page2', 'action':'/public/app/api/webview.html', 'reload': 'true'} ]
                );
}

function set_no_bar()
{
   	Rho.NativeTabbar.remove
}

function setacceptLanguage(languageCode) 
{ 
	Rho.WebView.acceptLanguage=languageCode;
}

function getacceptLanguagetest() 
{
	data = Rho.WebView.acceptLanguage;
	$("#Rho_WebView_getacceptLanguage span.result").text(JSON.stringify(data));

} 

function getActiveTab() 
{ 
	data = Rho.WebView.activeTab;
	$("#Rho_WebView_activeTab span.result").text(JSON.stringify(data));
}

function getCacheSize() 
{ 
	data = Rho.WebView.cacheSize;
	$("#Rho_WebView_CacheSize span.result").text(JSON.stringify(data));
		
}

function setEnableCache(cacheValue)
{
	if(cacheValue == 'true')
	{
		Rho.WebView.enableCache=true;
	}
	if(cacheValue == 'false')
	{
		Rho.WebView.enableCache=false;
	}
}

function getEnableCache()
{
	data = Rho.WebView.enableCache;
	$("#Rho_WebView_getEnableCache span.result").text(JSON.stringify(data));
}

function setEnablePageLoadingIndication(pageLoadingIndication)
{	
	if(pageLoadingIndication == 'true')
	{
  		Rho.WebView.enablePageLoadingIndication = true;
  	}
	if(pageLoadingIndication == 'false')
	{
  		Rho.WebView.enablePageLoadingIndication = false;
  	}
}

function getEnablePageLoadingIndication()
{	
	data = Rho.WebView.enablePageLoadingIndication;
	$("#Rho_WebView_getEnablePageLoadingIndication span.result").text(JSON.stringify(data));
}

function setEnableWebPlugins(webPlugins)
{
	 if(webPlugins == 'true')
	 {
	 	Rho.WebView.enableWebPlugins = true;
	 }
	 if(webPlugins == 'false')
	 {
	 	Rho.WebView.enableWebPlugins = false;
	 }
}
 
function getEnableWebPlugins()
{
	data = Rho.WebView.enableWebPlugins;
 	$("#Rho_WebView_getEnableWebPlugins span.result").text(JSON.stringify(data));
}

function setEnableZoom(zoom)
{
	if(zoom == 'true')
	{
	  Rho.WebView.enableZoom = true;
	}
	if(zoom == 'false')
	{
		Rho.WebView.enableZoom = false
	}
}

function getEnableZoom()
{
	data = Rho.WebView.enableZoom;
	$("#Rho_WebView_getEnableZoom span.result").text(JSON.stringify(data));
}

function getFontFamily()
{
	data = Rho.WebView.fontFamily;
	$("#Rho_WebView_getFontFamily span.result").text(JSON.stringify(data));
	
}

function getFramework()
{
	data = Rho.WebView.framework;
	$("#Rho_WebView_getFramework span.result").text(JSON.stringify(data));
}



function setFullScreen(fullscreen)
{
	if(fullscreen == 'true')
	{
		Rho.WebView.fullScreen = true;
	}
	if(fullscreen == 'false')
	{
		Rho.WebView.fullScreen = false;
	}
}

function getFullScreen()
{
	data = Rho.WebView.fullScreen;
	$("#Rho_WebView_getFullScreen span.result").text(JSON.stringify(data));
}

function getScrollTechnique()
{
	data = Rho.WebView.scrollTechnique;
	$("#Rho_WebView_getScrollTechnique span.result").text(JSON.stringify(data));
}

function getUserAgent()
{
	data = Rho.WebView.userAgent;
	$("#Rho_WebView_getUserAgent span.result").text(JSON.stringify(data));
}

function getViewportEnabled()
{
	data = Rho.WebView.viewportEnabled;
	$("#Rho_WebView_getViewportEnabled span.result").text(JSON.stringify(data));
}

function getViewportWidth()
{
	data = Rho.WebView.viewportWidth;
	$("#Rho_WebView_getViewportWidth span.result").text(JSON.stringify(data));
}

function setZoomPage(pagezoom)
{
	Rho.WebView.zoomPage = parseFloat(pagezoom);
}


function getZoomPage()
{
	data = Rho.WebView.zoomPage;
	$("#Rho_WebView_getZoomPage span.result").text(JSON.stringify(data));
}


function setTextZoomLevel(textzoom)
{
	Rho.WebView.textZoomLevel = parseInt(textzoom);
}

function getTextZoomLevel()
{
	data = Rho.WebView.textZoomLevel;
	$("#Rho_WebView_textZoomLevel span.result").text(JSON.stringify(data));
}


function setNavigationTimeout(timeout)
{
	Rho.WebView.navigationTimeout = parseInt(timeout);
}

function getNavigationTimeout()
{
	data = Rho.WebView.navigationTimeout;
	$("#Rho_WebView_getNavigationTimeout span.result").text(JSON.stringify(data));
}


function getCurrentLocation(index)
{
	data = Rho.WebView.currentLocation(index);
	$("#Rho_WebView_getCurrentLocation span.result").text(JSON.stringify(data));
}

function getCurrentURL(index)
{
	data = Rho.WebView.currentURL(index);
	$("#Rho_WebView_getCurrentURL span.result").text(JSON.stringify(data));
}

function navigate_tab()
{
	data = Rho.WebView.currentLocation(2);
	Rho.WebView.navigate(data);
}

function navigate_online_tab1()
{
	Rho.WebView.navigate("http://www.google.com", 1);
}

function navigate_online_tab4_secure()
{
	Rho.WebView.navigate("https://www.gmail.com", 4);
}

function navigate_localpage()
{
	Rho.WebView.navigate("/app/loading.html", 1);
}

function navigate_localpage_indexminus()
{
	Rho.WebView.navigate("/app/loading.html", -1);
}

function navigate_back()
{
	Rho.WebView.navigateBack
}

function navigate_back_one()
{
	Rho.WebView.navigateBack(1);
}

function navigate_back_zero()
{
	Rho.WebView.navigateBack(0);
}

function navigate_back_minus()
{	
	Rho.WebView.navigateBack(-1);
}

function refresh_page()
{
	Rho.WebView.refresh;
}

function refresh_page_one()
{
	Rho.WebView.refresh(1);
}

function refresh_page_minus()
{
	Rho.WebView.refresh(-1);
}

function refresh_page_zero()
{
	Rho.WebView.refresh(0);
}

function screencapture()
{
	path = Rho.RhoApplication.get_blob_folder + "scn1.jpeg";
	Rho.WebView.save("jpeg", path);
}

function screencapture_one()
{
	path = Rho.RhoApplication.get_blob_folder + "scn2.jpeg";
	Rho.WebView.save("jpeg", path, 1);
}

function screencapture_four()
{
	path = Rho.RhoApplication.get_blob_folder + "scn3.jpeg";
	Rho.WebView.save("jpeg", path, 4);
}

function screencapture_negative()
{
	Rho.WebView.save;
}

function executejs_code()
{
	Rho.WebView.executeJavascript("alert('Hello Boss')");
}

function executejs_ajax()
{
	Rho.WebView.executeJavascript("executeJS_zero();");
}

function toggleFullscreen()
{
	Rho.WebView.fullScreen = !Rho.WebView.fullScreen; 
}

function navagate_action()
{
	Rho.WebView.navigate("show();");
}

function show()
{
	alert("Navigate works");
}

function executejs_jqmobile()
{
	Rho.WebView.executeJavascript('$( "#popupBasic" ).popup( "open" )');
}

function executejs_listview()
{
	Rho.WebView.executeJavascript('$( "#popupMenu" ).popup( "open" )');
}

function goto_executejs()
{
	Rho.WebView.navigate("executejs()");
}

function set_cookie_single()
{
	Rho.WebView.setCookie("http://127.0.0.1", "key_1=DevaStoredCookie1");
}

function set_cookie_multiple()
{
	Rho.WebView.setCookie("http://127.0.0.1", "key_2=DevaStoredCookie2;key_3=bhaktabhakta");
}

function show_cookie_all()
{
	Rho.WebView.executeJavascript("show_cookie();");
}

function executeJS()
{
	Rho.WebView.executeJavascript("");
}

function executeJS_zero()
{
	Rho.WebView.executeJavascript("alert('zero','No Tab Extension Mentioned')");
}

function executeJS_one()
{
	Rho.WebView.executeJavascript("alert('one','Tab Extension Mentioned as 1')",1);
}

function executeJS_minusone()
{
	Rho.WebView.executeJavascript("alert('minusone','Tab Extension Mentioned as minus one')",-1);
}


function show_cookie() {
    alert(document.cookie);
}