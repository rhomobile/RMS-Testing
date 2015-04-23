require 'rho/rhocontroller'
require 'json'
require 'uri'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class RubyextensionsController < Rho::RhoController

def uri_extension
  begin
  	@uri = URI("http://foo.com/posts?id=30&limit=5#time=1305298413")
    @result = @uri.scheme
  rescue Exception => e
  	@result = e.message
  end
  Rho::WebView.executeJavascript('document.getElementById("result").innerHTML= "'+@result+'";')
 
end

def json_extension
  begin
    @car = {:make => "bmw", :year => "2003"}
    json_data = ::JSON.generate(@car)
    @result = json_data.gsub(/(?=\W)/, '\\')
  rescue Exception => e
    @result = e.message
  end
  Rho::WebView.executeJavascript('document.getElementById("result").innerHTML= "'+@result+'";')
end

def digestsha1_extension
  begin
    @result = Digest::SHA1.hexdigest 'foo'
  rescue Exception => e
    @result = e.message
  end
  Rho::WebView.executeJavascript('document.getElementById("result").innerHTML= "'+@result+'";')
end

def digestmd5_extension
  begin
    @result = Digest::MD5.hexdigest("Hello World")
  rescue Exception => e
  	@result = e.message
  end
  Rho::WebView.executeJavascript('document.getElementById("result").innerHTML= "'+@result+'";')
end

end