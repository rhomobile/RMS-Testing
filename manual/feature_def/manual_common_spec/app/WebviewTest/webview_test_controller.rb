require 'rho/rhocontroller'


class WebviewTestController < Rho::RhoController

  def executeJavascriptOnCurrentTab

    Rho::WebView.executeJavascript("setDomElementText('executeJavascript_test', 'This text was inserted by executeJavascript from ruby')")

  end

  def executeJavascriptOnTab1

    Rho::WebView.executeJavascript("setDomElementText('executeJavascript_test', 'This text was inserted by executeJavascript from ruby')", 1)

  end

end
