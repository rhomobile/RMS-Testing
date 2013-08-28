require 'rho/rhocontroller'


class SystemController < Rho::RhoController

  def getStartParameters
     startParameters = Rho::System.getStartParams();
     jsCommand = 'alert(JSON.stringify("' + startParameters + '"));';
    Rho::WebView.executeJavascript(jsCommand)
  end
end
