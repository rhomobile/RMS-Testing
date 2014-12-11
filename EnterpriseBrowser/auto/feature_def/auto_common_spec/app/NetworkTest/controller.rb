require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class NetworkTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  def postEventStart
	puts "PostEvent #{@params}"
	# The port on which the server was started is in the response body
	# eg ServerStarted:Port=9001\n
	startedPort = 8999
	returnedString = @params['body']
	if returnedString.length == 24
		startedPort = returnedString[19..22]
	end
	WebView.execute_js("javascript:serverStarted(" + startedPort + ");")
  end

  def postEventStop
	# We do nothing when the remote port is stopped
	puts "PostEvent #{@params}"
  end
  
  def startNetworkServer
	myHeaders = Hash.new
	myHeaders['Content-Length'] = 19
	myProps = Hash.new
	myProps['url'] = @params['remoteHost'] + ':' + @params['remotePort']
	myProps['headers'] = myHeaders
	myProps['body'] = '?action=startServer'
	Rho::Network.post(myProps, url_for(:action => :postEventStart))  
  end

  def stopNetworkServer
	myHeaders = Hash.new
	# 28 is the length of body
	myHeaders['Content-Length'] = 28
	myProps = Hash.new
	myProps['url'] = @params['remoteHost'] + ':' + @params['remotePort']
	myProps['headers'] = myHeaders
	myProps['body'] = '?action=stopServer&port=' + @params['remoteSocket']
	Rho::Network.post(myProps, url_for(:action => :postEventStop))   
  end
  
  def detectConnection
	myProps = Hash.new
	myProps['host'] = @params['remoteHost']
	myProps['port'] = @params['remotePort']
	myProps['pollInterval'] = @params['pollTimeout']
	myProps['detectionTimeout'] = 1000
	Rho::Network.detectConnection(myProps, url_for(:action => :connectionEvent))  	
  end
  
  def connectionEvent
	puts "ConnectionEvent Called #{@params}"
	WebView.execute_js("javascript:connectionEvent('#{@params["connectionInformation"]}');")
  end
  
  def stopDetectingConnection
	Rho::Network.stopDetectingConnection(url_for(:action => :connectionEvent))
  end
  
  
  
  #@@test_proc = lambda{|args| puts "lamda: #{args}"}
  def index
	render :back => '/app/NetworkConnectionTest'
  end

 
end
