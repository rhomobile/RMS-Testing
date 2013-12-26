require 'rho/rhocontroller'


class SystemController < Rho::RhoController

  def getStartParameters
     startParameters = Rho::System.getStartParams();
     jsCommand = 'alert("start params: "+JSON.stringify("' + startParameters.to_s + '"));';
    Rho::WebView.executeJavascript(jsCommand)
  end
  def getApplicationMessage
     startParameters = Rho::System.getApplicationMessage();
     jsCommand = 'alert("app message: "+JSON.stringify("' + startParameters.to_s + '"));';
    Rho::WebView.executeJavascript(jsCommand)
  end
  def getStartParametersHandler(startParameters)
    jsCommand = 'alert("start params: "+JSON.stringify("' + startParameters.to_s + '"));';
    Rho::WebView.executeJavascript(jsCommand)
  end
  def getApplicationMessageHandler(startParameters)
    jsCommand = 'alert("app message: "+JSON.stringify("' + startParameters.to_s + '"));';
    Rho::WebView.executeJavascript(jsCommand)
  end
end
