require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class CardreaderController < Rho::RhoController

# CardReader CallBacks
def cardreader_callback
	Alert.show_popup(@params.to_json.to_s)
	@result = "Data - " + @params['data'].to_s
	@result += "; Mode - " + @params['mode'].to_s
	Rho::WebView.executeJavascript('document.getElementById("cardresult").innerHTML= "'+@result+'";')
end

def cardreader_encrytcb
	@result = 'Data:- ' + @params["data"].to_json.to_s
	@result += '; Mode:- ' + @params["mode"].to_json.to_s if @params["mode"]
	@result += '; Encryption:- ' + @params["encryption"].to_json.to_s if @params["encryption"]
	@result += '; RawData:- ' + @params["rawData"].to_json.to_s if @params["rawData"]
	@result += '; Track1:- ' + @params["track1"].to_json.to_s if @params["track1"]
	@result += '; Track2:- ' + @params["track2"].to_json.to_s if @params["track2"]
	@result += '; Track3:- ' + @params["track3"].to_json.to_s if @params["track3"]
	@result += '; Track1Status:- ' + @params["track1Status"].to_json.to_s if @params["track1Status"]
	@result += '; Track2Status:- ' + @params["track2Status"].to_json.to_s if @params["track2Status"]
	@result += '; Track3Status:- ' + @params["track3Status"].to_json.to_s if @params["track3Status"]
	@result += '; Track1Encrypted:- ' + @params["track1Encrypted"].to_json.to_s if @params["track1Encrypted"]
	@result += '; Track2Encrypted:- ' + @params["track2Encrypted"].to_json.to_s if @params["track2Encrypted"]
	@result += '; Track3Encrypted:- ' + @params["track3Encrypted"].to_json.to_s if @params["track3Encrypted"]
	@result += '; Track1EncryptedStatus:- ' + @params["track1EncryptedStatus"].to_json.to_s if @params["track1EncryptedStatus"]
	@result += '; Track2EncryptedStatus:- ' + @params["track2EncryptedStatus"].to_json.to_s if @params["track2EncryptedStatus"]
	@result += '; Track3EncryptedStatus:- ' + @params["track3EncryptedStatus"].to_json.to_s if @params["track3EncryptedStatus"]
	@result += '; Ksn:- ' + @params["ksn"].to_json.to_s if @params["ksn"]

	Rho::WebView.executeJavascript('document.getElementById("cardresult").innerHTML= "'+@result+'";')
end

# CardReader Methods
def cardreader_open
	Rho::CardReader.open()
end

def cardreader_opencb
	Rho::CardReader.open(url_for(:action => :cardreader_callback))
end

def cardreader_openencrptcb
	Rho::CardReader.open(url_for(:action => :cardreader_encrytcb))
end

def cardreader_close
	Rho::CardReader.close()
end

def cardreader_pinentry
	Rho::CardReader.pinEntry = true
end

def cardreader_autoenter
	Rho::CardReader.autoEnter = true
end

end