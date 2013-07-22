require 'rho/rhocontroller'


class WebviewTestController < Rho::RhoController

  def executeJavascriptOnCurrentTab

    Rho::WebView.executeJavascript("setDomElementText('executeJavascript_ruby_test', 'Current tab - this text was inserted by executeJavascript from ruby')")

  end

  def executeJavascriptOnTab1

    Rho::WebView.executeJavascript("setDomElementText('executeJavascript_ruby_test', 'Tab with index 1 - this text was inserted by executeJavascript from ruby')", 1)

  end

  def currentUrlOfCurrentTab
    url = Rho::WebView.currentURL()
    Rho::WebView.executeJavascript("setDomElementText('currentURL_test', '" + url +  "')", 1)

  end

  def currentUrlOfTab1
    url = Rho::WebView.currentURL(1)
    Rho::WebView.executeJavascript("setDomElementText('currentURL_test', '" + url +  "')", 1)

  end





end
