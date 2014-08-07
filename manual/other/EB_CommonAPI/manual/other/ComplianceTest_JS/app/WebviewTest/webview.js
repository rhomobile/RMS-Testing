function set_tabbar() 
{
	EB.NativeTabbar.create( [ 
                {'label':'MainPage', 'action':'/public/app/api/webview.html', 'reload': 'true'},
                {'label':'Page1', 'action':'/public/app/api/webview.html', 'reload': 'false'}, 
                {'label':'Page2', 'action':'/public/app/api/webview.html', 'reload': 'true'} ]
                );
}

function set_no_bar()
{
   	EB.NativeTabbar.remove
}

function setacceptLanguage(languageCode) 
{ 
	EB.WebView.acceptLanguage=languageCode;
}

function getacceptLanguagetest() 
{
	data = EB.WebView.acceptLanguage;
	$("#Rho_WebView_getacceptLanguage span.result").text(JSON.stringify(data));

} 

function getActiveTab() 
{ 
	data = EB.WebView.activeTab;
	$("#Rho_WebView_activeTab span.result").text(JSON.stringify(data));
}

function getCacheSize() 
{ 
	data = EB.WebView.cacheSize;
	$("#Rho_WebView_CacheSize span.result").text(JSON.stringify(data));
		
}

function setEnableCache(cacheValue)
{
	if(cacheValue == 'true')
	{
		EB.WebView.enableCache=true;
	}
	if(cacheValue == 'false')
	{
		EB.WebView.enableCache=false;
	}
}

function getEnableCache()
{
	data = EB.WebView.enableCache;
	$("#Rho_WebView_getEnableCache span.result").text(JSON.stringify(data));
}

function setEnablePageLoadingIndication(pageLoadingIndication)
{	
	if(pageLoadingIndication == 'true')
	{
  		EB.WebView.enablePageLoadingIndication = true;
  	}
	if(pageLoadingIndication == 'false')
	{
  		EB.WebView.enablePageLoadingIndication = false;
  	}
}

function getEnablePageLoadingIndication()
{	
	data = EB.WebView.enablePageLoadingIndication;
	$("#Rho_WebView_getEnablePageLoadingIndication span.result").text(JSON.stringify(data));
}

function setEnableWebPlugins(webPlugins)
{
	 if(webPlugins == 'true')
	 {
	 	EB.WebView.enableWebPlugins = true;
	 }
	 if(webPlugins == 'false')
	 {
	 	EB.WebView.enableWebPlugins = false;
	 }
}
 
function getEnableWebPlugins()
{
	data = EB.WebView.enableWebPlugins;
 	$("#Rho_WebView_getEnableWebPlugins span.result").text(JSON.stringify(data));
}

function setEnableZoom(zoom)
{
	if(zoom == 'true')
	{
	  EB.WebView.enableZoom = true;
	}
	if(zoom == 'false')
	{
		EB.WebView.enableZoom = false
	}
}

function getEnableZoom()
{
	data = EB.WebView.enableZoom;
	$("#Rho_WebView_getEnableZoom span.result").text(JSON.stringify(data));
}

function getFontFamily()
{
	data = EB.WebView.fontFamily;
	$("#Rho_WebView_getFontFamily span.result").text(JSON.stringify(data));
	
}

function getFramework()
{
	data = EB.WebView.framework;
	$("#Rho_WebView_getFramework span.result").text(JSON.stringify(data));
}



function setFullScreen(fullscreen)
{
	if(fullscreen == 'true')
	{
		EB.WebView.fullScreen = true;
	}
	if(fullscreen == 'false')
	{
		EB.WebView.fullScreen = false;
	}
}

function getFullScreen()
{
	data = EB.WebView.fullScreen;
	$("#Rho_WebView_getFullScreen span.result").text(JSON.stringify(data));
}

function getScrollTechnique()
{
	data = EB.WebView.scrollTechnique;
	$("#Rho_WebView_getScrollTechnique span.result").text(JSON.stringify(data));
}

function getUserAgent()
{
	data = EB.WebView.userAgent;
	$("#Rho_WebView_getUserAgent span.result").text(JSON.stringify(data));
}

function getViewportEnabled()
{
	data = EB.WebView.viewportEnabled;
	$("#Rho_WebView_getViewportEnabled span.result").text(JSON.stringify(data));
}

function getViewportWidth()
{
	data = EB.WebView.viewportWidth;
	$("#Rho_WebView_getViewportWidth span.result").text(JSON.stringify(data));
}

function setZoomPage(pagezoom)
{
	EB.WebView.zoomPage = parseFloat(pagezoom);
}


function getZoomPage()
{
	data = EB.WebView.zoomPage;
	$("#Rho_WebView_getZoomPage span.result").text(JSON.stringify(data));
}


function setTextZoomLevel(textzoom)
{
	EB.WebView.textZoomLevel = parseInt(textzoom);
}

function getTextZoomLevel()
{
	data = EB.WebView.textZoomLevel;
	$("#Rho_WebView_textZoomLevel span.result").text(JSON.stringify(data));
}


function setNavigationTimeout(timeout)
{
	EB.WebView.navigationTimeout = parseInt(timeout);
}

function getNavigationTimeout()
{
	data = EB.WebView.navigationTimeout;
	$("#Rho_WebView_getNavigationTimeout span.result").text(JSON.stringify(data));
}


function getCurrentLocation(index)
{
	data = EB.WebView.currentLocation(index);
	$("#Rho_WebView_getCurrentLocation span.result").text(JSON.stringify(data));
}

function getCurrentURL(index)
{
	data = EB.WebView.currentURL(index);
	$("#Rho_WebView_getCurrentURL span.result").text(JSON.stringify(data));
}

function navigate_tab()
{
	data = EB.WebView.currentLocation(2);
	EB.WebView.navigate(data);
}

function navigate_online_tab1()
{
	EB.WebView.navigate("http://www.google.com", 1);
}

function navigate_online_tab4_secure()
{
	EB.WebView.navigate("https://www.gmail.com", 4);
}

function navigate_localpage()
{
	EB.WebView.navigate("/app/loading.html", 1);
}

function navigate_localpage_indexminus()
{
	EB.WebView.navigate("/app/loading.html", -1);
}

function navigate_back()
{
	EB.WebView.navigateBack
}

function navigate_back_one()
{
	EB.WebView.navigateBack(1);
}

function navigate_back_zero()
{
	EB.WebView.navigateBack(0);
}

function navigate_back_minus()
{	
	EB.WebView.navigateBack(-1);
}

function refresh_page()
{
	EB.WebView.refresh;
}

function refresh_page_one()
{
	EB.WebView.refresh(1);
}

function refresh_page_minus()
{
	EB.WebView.refresh(-1);
}

function refresh_page_zero()
{
	EB.WebView.refresh(0);
}

function screencapture()
{
	path = EB.RhoApplication.get_blob_folder + "scn1.jpeg";
	EB.WebView.save("jpeg", path);
}

function screencapture_one()
{
	path = EB.RhoApplication.get_blob_folder + "scn2.jpeg";
	EB.WebView.save("jpeg", path, 1);
}

function screencapture_four()
{
	path = EB.RhoApplication.get_blob_folder + "scn3.jpeg";
	EB.WebView.save("jpeg", path, 4);
}

function screencapture_negative()
{
	EB.WebView.save;
}

function executejs_code()
{
	EB.WebView.executeJavascript("alert('Hello Boss')");
}

function executejs_ajax()
{
	EB.WebView.executeJavascript("executeJS_zero();");
}

function toggleFullscreen()
{
	EB.WebView.fullScreen = !EB.WebView.fullScreen; 
}

function navagate_action()
{
	EB.WebView.navigate("show();");
}

function show()
{
	alert("Navigate works");
}

function executejs_jqmobile()
{
	EB.WebView.executeJavascript('$( "#popupBasic" ).popup( "open" )');
}

function executejs_listview()
{
	EB.WebView.executeJavascript('$( "#popupMenu" ).popup( "open" )');
}

function goto_executejs()
{
	EB.WebView.navigate("executejs()");
}

function set_cookie_single()
{
	EB.WebView.setCookie("http://127.0.0.1", "key_1=DevaStoredCookie1");
}

function set_cookie_multiple()
{
	EB.WebView.setCookie("http://127.0.0.1", "key_2=DevaStoredCookie2;key_3=bhaktabhakta");
}

function show_cookie_all()
{
	EB.WebView.executeJavascript("show_cookie();");
}

function executeJS()
{
	EB.WebView.executeJavascript("");
}

function executeJS_zero()
{
	EB.WebView.executeJavascript("alert('zero','No Tab Extension Mentioned')");
}

function executeJS_one()
{
	EB.WebView.executeJavascript("alert('one','Tab Extension Mentioned as 1')",1);
}

function executeJS_minusone()
{
	EB.WebView.executeJavascript("alert('minusone','Tab Extension Mentioned as minus one')",-1);
}


function show_cookie() {
    alert(document.cookie);
}