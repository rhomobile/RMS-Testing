require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class ConfigtestController < Rho::RhoController

def config_startpath
	if @params['savefile']
		@savefile = true
	else
		@savefile = false
	end
	if @params['prop']
		case @params['prop']
		when 'string'
		    @oldvalue = Rho::Config.getPropertyString("start_path")
		    Rho::Config.setPropertyString("start_path", "/app/ConfigTest/specRunner.html", @savefile)
		    @newvalue = Rho::Config.getPropertyString("start_path")
		    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. Initial start_path value: '+@oldvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. After setting new start_path value: '+@newvalue+'"')
		when 'int'
	        @oldvalue = Rho::Config.getPropertyInt("MinSeverity")
	        Rho::Config.setPropertyInt("MinSeverity", 0, @savefile);
	        @newvalue = Rho::Config.getPropertyInt("MinSeverity")
		    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. Initial MinSeverity value: '+@oldvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. After setting new MinSeverity value: '+@newvalue+'"')      
		when 'bool'
		    @oldvalue = Rho::Config.getPropertyBool("use_bulk_model")
		    Rho::Config.setPropertyBool("use_bulk_model", true, @savefile)
		    @newvalue = Rho::Config.getPropertyBool("use_bulk_model")
		    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. Initial use_bulk_model value: '+@oldvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. After setting new use_bulk_model value: '+@newvalue+'"')
		else
		  	Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = Skipped All cases !!')
		end
	end
end

def config_startpath_invalid
	begin
		if @params['prop']
			case @params['prop']
			when 'string'
				Rho::Config.setPropertyString("Test123", 1234, false)
				@value = Rho::Config.getPropertyString("Test123")
			when 'int'
				Rho::Config.setPropertyInt("Test234", "test", false)
        		@value = Rho::Config.getPropertyInt("Test234")
			when 'bool'
			    Rho::Config.setPropertyBool("Test123", 1234, false)
                @value = Rho::Config.getPropertyBool("Test123")
			else
			  	Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = Skipped All cases !!')
			end
		end
	rescue Exception => e
		@error = e.to_s
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "Exception message while setting invalid value: '+@error+'"')
	end
end

def config_startpath_multiple
	if @params['prop']
		case @params['prop']
		when 'string'
		    Rho::Config.setPropertyString("LogFilePath", "/mnt/sdcard/myapp.log", false)
            @firstvalue = Rho::Config.getPropertyString("LogFilePath")
            Rho::Config.setPropertyString("LogFilePath", "/mnt/sdcard/myapp2.log", false)
            @secondvalue = Rho::Config.getPropertyString("LogFilePath")
            @conflictvalue = Rho::Config.getConflicts()
		    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. First set LogFilePath value: '+@firstvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. Second set LogFilePath value: '+@secondvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result3").innerHTML = " 3. getConflicts return value: '+@conflictvalue+'"')
		when 'int'
            Rho::Config.setPropertyInt("LogMemPeriod", 5000, false)
            @firstvalue = Rho::Config.getPropertyInt("LogMemPeriod")
            Rho::Config.setPropertyInt("LogMemPeriod", 6000, false)
            @secondvalue = Rho::Config.getPropertyInt("LogMemPeriod")
            @conflictvalue = Rho::Config.getConflicts()
		    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. First set LogMemPeriod value: '+@firstvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. Second set LogMemPeriod value: '+@secondvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result3").innerHTML = " 3. getConflicts return value: '+@conflictvalue+'"')    
		when 'bool'
   			Rho::Config.setPropertyBool("use_bulk_model", true, false)
            @firstvalue = Rho::Config.getPropertyBool("use_bulk_model")
            Rho::Config.setPropertyBool("use_bulk_model", false, false)
            @secondvalue = Rho::Config.getPropertyBool("use_bulk_model")
            @conflictvalue = Rho::Config.getConflicts()
		    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. First set use_bulk_model value: '+@firstvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. Second set use_bulk_model value: '+@secondvalue+'"')
		    Rho::WebView.executeJavascript('document.getElementById("result3").innerHTML = " 3. getConflicts return value: '+@conflictvalue+'"')
		else
		  	Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = Skipped All cases !!')
		end
	end
end

def config_ispropertyexists
	if @params['savefile']
		if @params['savefile'] == 'true'
			@savefile = true
		else
			@savefile = false
		end
		@firstvalue = Rho::Config.isPropertyExists("full_screen")
	    Rho::Config.removeProperty("full_screen", @savefile)
	    @secondvalue = Rho::Config.isPropertyExists("full_screen")
	    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. First full_screen value: '+@firstvalue+'"')
	    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. Second full_screen value: '+@secondvalue+'"')  
	else
		@firstvalue = Rho::Config.isPropertyExists("start_path")
	    Rho::Config.removeProperty("Invalid", true)
	    @secondvalue = Rho::Config.isPropertyExists("start_path")
	    Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = " 1. First start_path value: '+@firstvalue+'"')
	    Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = " 2. Second start_path value: '+@secondvalue+'"')	    
	end
end

end