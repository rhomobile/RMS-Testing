require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class TimertestController < Rho::RhoController

@@timerobj1 = ''
@@timerobj2 = ''
@@timerobj3 = ''

def timercb_one
	@@callbackevent = 'true'
	Rho::WebView.executeJavascript('document.getElementById("cbevent1").innerHTML= "'+@callbackevent+'";')
end

def timercb_two
	@@callbackevent = 'true'
	Rho::WebView.executeJavascript('document.getElementById("cbevent2").innerHTML= "'+@callbackevent+'";')
end

def timercb_three
	@@callbackevent = 'true'
	Rho::WebView.executeJavascript('document.getElementById("cbevent3").innerHTML= "'+@callbackevent+'";')
end


def timer_start_one
	@@timerobj1 = Rho::Timer.create()
	if @params['time']
		@@timerobj1.start(@params['time'].to_i, url_for(:action => :timercb_one))
	else
		@@timerobj1.start(10000, url_for(:action => :timercb_one))
	end
end

def timer_start_two
	@@timerobj2 = Rho::Timer.create()
	if @params['time']
		@@timerobj2.start(@params['time'].to_i, url_for(:action => :timercb_two))
	else
		@@timerobj2.start(10000, url_for(:action => :timercb_two))
	end
end

def timer_create_two
	@@timerobj2 = Rho::Timer.create()
end

def timer_start_three
	@@timerobj3 = Rho::Timer.create()
	if @params['time']
		@@timerobj3.start(@params['time'].to_i, url_for(:action => :timercb_three))
	else
		@@timerobj3.start(10000, url_for(:action => :timercb_three))
	end
end

def timer_without_param
	@@timerobj1 = Rho::Timer.create()
	@@timerobj1.start()
	
end

def timer_with_callback
	@@timerobj1 = Rho::Timer.create()
	@@timerobj1.start(url_for(:action => :timercb_one))
end

def timer_with_interval
	@@timerobj1 = Rho::Timer.create()
	if @params['time']
		@@timerobj1.start(@params['time'].to_i)
	else
		@@timerobj1.start(10000, url_for(:action => :timercb_one))
	end
end

def timer_isalive_one
	if @@timerobj1 != ''
		@alive = @@timerobj1.isAlive()
		@alivestatus = @alive.to_s
		Rho::WebView.executeJavascript('document.getElementById("alivestatus1").innerHTML= "'+@alivestatus+'";')
	end
end

def timer_isalive_two
	if @@timerobj2 != ''
		@alive = @@timerobj2.isAlive()
		@alivestatus = @alive.to_s
		Rho::WebView.executeJavascript('document.getElementById("alivestatus2").innerHTML= "'+@alivestatus+'";')
	end
end

def timer_isalive_three
	if @@timerobj3 != ''
		@alive = @@timerobj3.isAlive()
		@alivestatus = @alive.to_s
		Rho::WebView.executeJavascript('document.getElementById("alivestatus3").innerHTML= "'+@alivestatus+'";')
	end
end

def timer_stop_one
	if @@timerobj1 != ''
		@@timerobj1.stop()
	end
end

def timer_stop_two
	if @@timerobj2 != ''
		@@timerobj2.stop()
	end
end

def timer_stop_three
	if @@timerobj3 != ''
		@@timerobj3.stop()
	end
end


end