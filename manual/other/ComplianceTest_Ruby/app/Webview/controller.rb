require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class WebviewController < Rho::RhoController
  
    def create_toolbar
       toolElements = [
	       {'label' => 'back', 'action' => 'back'},
	       {'label' => 'Home', 'action' => 'Home'},
	       {'action'=> "separator"},
	       {'label' => 'refresh', 'action' => 'refresh'},
	       {'label' => 'Options', 'action' => 'options'},
	       {'label' => 'Exit', 'action' => 'exit'}
       ]
       toolProperties = {'backgroundColor' => 0x00804F, 'maskColor' => 0xFF0000, 'viewHeight' => 100}
       Rho::NativeToolbar.create(toolElements, toolProperties)
    end

    def create_tabbar
        tabs = [
            {'label'=> 'Tab 0', 'action'=> '/app/Webview/webview.html', 'icon'=> '/public/images/bar/colored_btn.png', 'reload'=> false},
            {'label'=> 'Tab 1', 'action'=> '/app/Webview/webview.html', 'icon'=> '/public/images/bar/colored_btn.png', 'reload'=> false},
            {'label'=> 'Tab 2', 'action'=> '/app/Webview/webview.html', 'icon'=> '/public/images/bar/colored_btn.png', 'reload'=> false},
            {'label'=> 'Tab 3', 'action'=> '/app/Webview/webview.html', 'icon'=> '/public/images/bar/colored_btn.png', 'reload'=> false},
            {'label'=> 'Tab 4', 'action'=> '/app/Webview/webview.html', 'icon'=> '/public/images/bar/colored_btn.png', 'reload'=> false}
        ]
        properties = {'verticalOrientation'=> false, 'hiddenTabs'=> false, 'createOnInit'=> true, 'placeTabsBottom'=> false}
        Rho::NativeTabbar.create(tabs, properties)
    end

	def switch_tab
		Rho::NativeTabbar.switchTab(1)
	end

    def active_tab
		data = Rho::WebView.activeTab
		if @params['validate']
			Rho::WebView.executeJavascript("validateTestResult('VT200-0690', 1, #{data})")
		else
			Rho::WebView.executeJavascript("setDomElementText('activeTab_test', #{data})")
		end
	end

	def enable_cachetest
		data = Rho::WebView.enableCache
		Rho::WebView.executeJavascript("setDomElementText('enableCache_test', #{data})")
	end

	def enable_zoom
		data = Rho::WebView.enableZoom
		Rho::WebView.executeJavascript("setDomElementText('enableZoom_test', #{data})")
	end

	def enable_fullscreen
		data = Rho::WebView.fullScreen
		Rho::WebView.executeJavascript("setDomElementText('fullScreen_test', #{data})")
	end

	def zoompage_test
		data = Rho::WebView.zoomPage
		Rho::WebView.executeJavascript("setDomElementText('zoomPage_test', #{data})")
	end

	def textZoomLevel_test
		data = Rho::WebView.textZoomLevel
		Rho::WebView.executeJavascript("setDomElementText('textZoomLevel_test', #{data})")
	end

	def create_tabbar_old
		tabelements= [
			{'label'=>'Native Tabbar', 'action'=>'/app/Webview/webview.html', 'icon'=>'/public/images/bar/gears.png', 'useCurrentViewForTab'=>true},
			{'label'=>'Main page', 'action'=>'/app/Webview/webview.html', 'icon'=>'/public/images/bar/colored_btn.png', 'reload'=>false},
			{'label'=>'Page1', 'action'=>'/app/Webview/webview.html', 'icon'=>'/public/images/bar/colored_btn.png', 'reload'=>true},
			{'label'=>'Page2', 'action'=>'/app/Webview/webview.html', 'icon'=>'/public/images/bar/colored_btn.png', 'reload'=>true},
			{'label'=>'Page3', 'action'=>'/app/Webview/webview.html', 'icon'=>'/public/images/bar/colored_btn.png', 'reload'=>false},
			{'label'=>'Page4', 'action'=>'/app/Webview/webview.html', 'icon'=>'/public/images/bar/colored_btn.png', 'reload'=>false}
		]
	
		tabbarproperties = {'verticalOrientation'=>false, 'hiddenTabs'=> false, 'createOnInit' => true, 'placeTabsBottom'=>false}

        Rho::NativeTabbar.create(tabelements, tabbarproperties)
	end

	def remove_tabbar
    	Rho::NativeTabbar.remove()
    end

    def webview_fullscreen
    	if @params['data'].to_s == 'true'
    		Rho::WebView.fullScreen = true
    	else
    		Rho::WebView.fullScreen = false
    	end
    end

	def webview_zoompage
    	Rho::WebView.zoomPage = 1.5
    end

	def webview_textzoomlevel
		Rho::WebView.textZoomLevel = 4
	end

	def webview_navigate
		Rho::WebView.navigate("http://www.google.com", 1)
	end

	def webview_refresh
		Rho::WebView.refresh(1)
	end

	def webview_save
		Rho::WebView.save("jpeg", Rho::RhoFile.join(Rho::Application.userFolder, "screenshot.jpeg"), 1)
	end

	def webview_setcookie
		Rho::WebView.setCookie(@params['url'], "key_1=DevaStoredCookie1")
	end


end