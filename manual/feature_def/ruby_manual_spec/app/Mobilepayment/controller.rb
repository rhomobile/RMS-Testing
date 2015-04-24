require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class MobilepaymentController < Rho::RhoController

@@mobpaycb_triggered = false
@@prompt_pin_triggered = false
@@promptmenu_triggered = false
@@promptaddinfo_triggered = false
@@payment_device_name = "MPOS-64003288"

def mobpay_callback_method
	@@mobpaycb_triggered = true
	if @params['status']
		@data = @params['status']
		Rho::WebView.executeJavascript('document.getElementById("open").innerHTML = "'+@data+'"')
	else
		Rho::WebView.executeJavascript('document.getElementById("open").innerHTML = "true"')
	end
end

def mobpay_close_callback
	@data = 'success'
	Rho::WebView.executeJavascript('document.getElementById("open").innerHTML = "'+@data+'"')
end

def card_cbdata
	Alert.show_popup(@params.to_json.to_s)
	if @params['status']
		status = @params['status']
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @params['errorName']
		error_name = @params['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error_name+'"')
	end
	@card_data = " ";
	@card_data +=  "status : " + @params['status'].to_s if @params['status']
	@card_data +=  "; errorId : " + @params['errorId'].to_s if @params['errorId']
	@card_data +=  "; errorName : " + @params['errorName'].to_s if @params['errorName']
	@card_data +=  "; description : " + @params['description'].to_s if @params['description']
	@card_data += "; accountNumber :" + @params['accountNumber'].to_s if @params['accountNumber']
	@card_data += "; cardHolderName :" + @params['cardHolderName'].to_s if @params['cardHolderName']
	@card_data += "; expiryDate :" + @params['expiryDate'].to_s if @params['expiryDate']
	@card_data += "; track1Data :" + @params['track1Data'].to_s if @params['track1Data']
	@card_data += "; track2Data :" + @params['track2Data'].to_s if @params['track2Data']
	@card_data += "; track3Data :" + @params['track3Data'].to_s if @params['track3Data']
	@card_data += "; maskedPan :" + @params['maskedPan'].to_s if @params['maskedPan']
	@card_data += "; tlvStrings :" + @params['tlvStrings'].to_s if @params['tlvStrings']	#Specific to EMV tags
	@card_data += "; tagIds :" + @params['tagIds'].to_s if @params['tagIds']				#Specific to EMV tags
	@card_data += "; lengths :" + @params['lengths'].to_s if @params['lengths']				#Specific to EMV tags
	@card_data += "; values :" + @params['values'].to_s if @params['values']				#Specific to EMV tags
	@@mobpaycb_triggered = 'true'
	#@data = @params['cardHolderName'].to_s if @params['cardHolderName']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@card_data+'"')
end

def prompt_pin_cb
	@promtpin_cbdata = " "
	@promtpin_cbdata += "Status : " + @params['status'].to_s if @params['status']
	@promtpin_cbdata += "; Serial Number: " + @params['serialNumber'].to_s if @params['serialNumber']
	@promtpin_cbdata += "; pinBlockStr : " + @params['pinBlockStr'].to_s if @params['pinBlockStr']
	@promtpin_cbdata += "; IsPinEntered : " + @params['isPinEntered'].to_s if @params['isPinEntered']
	
	if @params['status']
		status = @params['status']
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @params['errorName']
		error = @params['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')
	end
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@promtpin_cbdata+'"')
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "true"')
end

def promptmenu_cb
	if @params['status']
		status = @params['status']
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @params['choice']
		choice = @params['choice']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+choice+'"')	
	end
	if @params['errorName']
		errormsg = @params['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+errormsg+'"')
	end
end

def promptmsg_cb
	Alert.show_popup(@params.to_json.to_s)
	if @params['status']
		status = @params['status']
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @params['errorName']
		error_name = @params['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error_name+'"')
	end
	if @params['userConfirmationMessage']
		user_msg = @params['userConfirmationMessage'].to_s
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+user_msg+'"')
	end
	@promptmsg_cbdata = " "
	@promptmsg_cbdata += "Status : " + @params['status'].to_s if @params['status']
	@promptmsg_cbdata += "; errorName : " + @params['errorName'].to_s if @params['errorName']
	@promptmsg_cbdata += "; userConfirmationMessage : " + @params['userConfirmationMessage'].to_s if @params['userConfirmationMessage']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@promptmsg_cbdata+'"')
end

def promptaddinfo_cb
	if @params['status']
		status = @params['status'] 
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @params['errorName']
		error_name = @params['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error_name+'"')
	end
	@promptaddinfo_cbdata = " "
	@promptaddinfo_cbdata += "Status : " + @params['status'].to_s if @params['status']
	@promptaddinfo_cbdata += "; ErrorName : " + @params['errorName'].to_s if @params['errorName']
	@promptaddinfo_cbdata += "; Tip you entered : " + @params['tip'].to_s if @params['tip']
	@promptaddinfo_cbdata += "; CashBack : "  + @params['cashBack'].to_s if @params['cashBack']
	@promptaddinfo_cbdata += "; SurchargeIndicator : " + @params['surchargeIndicator'].to_s if @params['surchargeIndicator']
	
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@promptaddinfo_cbdata+'"')
end

def validate_cbdata
	if @params['status']
		status = @params['status']
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
		if status == 'error'
			error = @params['errorName']
			Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')
		end
	end	
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "true"')
end

def auth_cbdata
	@data = " "
	@data += "Status - " + @params['status'].to_s if @params['status']
	@data += "; tlvStrings - " + @params['tlvStrings'].to_json.to_s if @params['tlvStrings']
	@data += "; keySerialNo - " + @params['keySerialNo'].to_s if @params['keySerialNo']
	@data += "; pinBlock - " + @params['pinBlock'].to_s if @params['pinBlock']
	Rho::WebView.executeJavascript('document.getElementById("open").innerHTML = "true"')
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@data+'"')
end

def completeevm_cbdata
	@data = " "
	if @params['status']
		@data += "Status - " + @params['status'].to_s
		status = @params['status'] 
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	@data += "; tlvStrings - " + @params['tlvStrings'].to_json.to_s if @params['tlvStrings']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@data+'"')
end

def abort_cb
	@data = " "
	@data += "Status : " + @params['status'].to_s
	@data += "; ErrorId : " + @params['errorId'].to_s
	@data += "; Description : " + @params['description'].to_s

	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@data+'"')
end

def mobpay_opentry
	begin
		Rho::MobilePayment.open()
	rescue Exception => e
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+e.to_s+'"')
	end
end

def mobpay_open
	Rho::MobilePayment.open(@@payment_device_name, url_for(:action => :mobpay_callback_method))
end

def mobpay_close
	Rho::MobilePayment.close(url_for(:action => :mobpay_close_callback))
end

def mobpay_close_close
	Rho::MobilePayment.close(url_for(:action => :mobpay_callback_method))
	Rho::MobilePayment.close(url_for(:action => :mobpay_callback_method))
	Rho::MobilePayment.close(url_for(:action => :mobpay_callback_method))
end

def mobpay_isopened
	result = Rho::MobilePayment.isOpened()
	@data = result.to_s
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+ @data +'"')
end

def mobpay_readcard
	if @params['readmode']
		if @params['readmode'] == 'insert'
			@title = "Insert Mode"
			@readmode = 1 					#Read mode is Insert for MagStripe card.
		elsif @params['readmode'] == 'all'
			@title = "All Mode"
			@readmode = 4					#Read mode is All for MagStripe card.
		elsif @params['readmode'] == 'touch'
			@title = "Touch Mode"
			@readmode = 2
		end
	else
		@title = "Swipe Mode"
		@readmode = 0 	#Read mode is Swipe for MagStripe card.
	end

	@props = {
		"amount" => 200.00,
		"otherAmount" => 10.00,
		"readMode" => @readmode,
		"messageTitle" => @title,
		"message1" => "This is message 1.",	#Message one
		"message2" => "This is message 2.",	#Message two
		"readTimeOut" => 5000
	}

	Rho::MobilePayment.readCardData(@props, url_for(:action => :card_cbdata))
end

def mobpay_readcard_invalid
	@props = {
		"amount" => "invalidValue",
		"otherAmount" => "invalidValue",
		"readMode" => 10,
		"messageTitle" => "With",
		"message1" => "Do",	#Message one
		"message2" => "Perform",	#Message two
		"readTimeOut" => "10000"
	}
	Rho::MobilePayment.readCardData(@props, url_for(:action => :card_cbdata))
end

def mobpay_promptpin
	@props = {
		"accountNumber" => "asd123458765",
		"minPINLength" => 4,
		"maxPINLength" => 8,
		"isPinOptional" => false,
		"readTimeOut" => 10000
	}
	if @params['option']
		@props["message1"] = "Dont Enter PIN"
		@props["message2"] = "Should timeout"
		@props["messageTitle"] = "Pin"
	end
	Rho::MobilePayment.promptPin(@props, url_for(:action => :prompt_pin_cb))
end

def mobpay_promptmenu
	@props = {
		"messageLine1" => "Message1",
		"messageLine2" => "Message2",
		"choice1" => "myMenu1",
		"choice2" => "myMenu2",
		"choice3" => "myMenu3",
		"choice4" => "myMenu4",
		"timeout" => 10000
	}

	Rho::MobilePayment.promptMenu(@props, url_for(:action => :promptmenu_cb))
end

def mobpay_promptmenu_onemsg
	@props = {
		"messageLine2" => "",
		"choice1" => "myMenu1",
		"choice2" => "myMenu2",
		"timeout" => 10000
	}
	if @params['msg']
		@props["messageLine1"] = "Message1"
	else
		@props["messageLine1"] = ""
	end

	Rho::MobilePayment.promptMenu(@props, url_for(:action => :promptmenu_cb))
end

def mobpay_promptmenu_empty
	@props = {
		"messageLine1" => "",
		"messageLine2" => "",
		"choice1" => "",
		"choice2" => "",
		"timeout" => 10000
	}

	Rho::MobilePayment.promptMenu(@props, url_for(:action => :promptmenu_cb))
end

def mobpay_promptmenu_key
	if @params['key'] 
		if @params['key'] == 'cancel'
			@msg = "Press Cancel key"
		end
	else
		@msg = "Press Enter/Ok key"
	end
	@props = {
		"messageLine1" => "Select Menu",
    	"messageLine2" => @msg,
    	"choice1" => "myMenu1",
    	"choice2" => "myMenu2",
    	"timeout" => 10000
	}

	Rho::MobilePayment.promptMenu(@props, url_for(:action => :promptmenu_cb))
end

def mobpay_promptmenu_exception
	begin
		Rho::MobilePayment.promptMenu()
	rescue Exception => e
		msg = e.to_s
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+msg+'"')
	end
end

def mobpay_prompt_addinfo
	if @params['promptpin']
		@pin = true
	else
		@pin = false
	end
	if @params['cashback']
		@cash = true
	else
		@cash = false
	end
	@props = {
		"amount" => 10.00,
		"langCode" => 0,
		"promptForTip" => @pin,
		"cashBack" => @cash,
		"surcharge" => 10.00,
		"timeout" => 10000
	}
	Rho::MobilePayment.promptAdditionalInfo(@props, url_for(:action => :promptaddinfo_cb))
end

def mobpay_prompt_msg
	if @params['confirm']
		@msg = true
	else
		@msg = false
	end

	@props = {
		"messageLine1" => "First Line",
    	"messageLine2" => "Second Line",
    	"messageLine3" => "Third Line",
    	"messageLine4" =>"Fourth Line",
    	"getUserConfirmation" => @msg,
    	"timeout" => 10000
	}
	
	Rho::MobilePayment.promptMessage(@props, url_for(:action => :promptmsg_cb));	
end

def mobpay_prompt_abort
	@props = {
		"accountNumber" => "asd123458765",
		"expectedPINLength" => 4,
		"messageTitle" => "Enter PIN",
		"message" => "only 4 digits",
		"readTimeOut" => 10000
	}

	Rho::MobilePayment.promptPin(@props, url_for(:action => :prompt_pin_cb))
	Rho::MobilePayment.abort(url_for(:action => :prompt_pin_cb))
end

def mobpay_batterylevel
	@data = Rho::MobilePayment.getBatteryLevel()
	status = @data['status'] if @data['status']
	error = @data['errorName'] if @data['errorName']
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')	
	@result = " "
	@result += "batteryLevel - " + @data['batteryLevel'].to_s if @data['batteryLevel']
	@result += "; Status - " + @data['status'] if @data['status']
	@result += "; ErrorName - " + @data['errorName'] if @data['errorName']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@result+'"')
end

def mobpay_lowbatterythreshold
	@data = Rho::MobilePayment.getLowBatteryThreshold()
	status = @data['status'] if @data['status']
	error = @data['errorName'] if @data['errorName']
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')	
	@result = " "
	@result += "lowBatteryThreshold - " + @data['lowBatteryThreshold'].to_s if @data['lowBatteryThreshold']
	@result += "; Status - " + @data['status'] if @data['status']
	@result += "; errorName - " + @data['errorName'] if @data['errorName']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@result+'"')
end

def mobpay_setbatterylevel
	@data = Rho::MobilePayment.setLowBatteryThreshold(1, "Battery Low")
	status = @data['status'] if @data['status']
	@getdata = Rho::MobilePayment.getLowBatteryThreshold()
	output = @getdata['lowBatteryThreshold'].to_s if @getdata['lowBatteryThreshold']
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+output+'"')
end

def mobpay_setlowbatterylevel
	@olddata = Rho::MobilePayment.getLowBatteryThreshold()
	@data = Rho::MobilePayment.setLowBatteryThreshold(2, "Battery Low")
	status = @data['status'] if @data['status']
	error = @data['errorName'] if @data['errorName']
	@getdata = Rho::MobilePayment.getLowBatteryThreshold()
	oldoutput = @olddata['lowBatteryThreshold'].to_s if @olddata['lowBatteryThreshold']
	newoutput = @getdata['lowBatteryThreshold'].to_s if @getdata['lowBatteryThreshold']
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')
	Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+oldoutput+'"')
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+newoutput+'"')	
end

def mobpay_setlowbatterylevel_invalid
	@olddata = Rho::MobilePayment.getLowBatteryThreshold()
	@data = Rho::MobilePayment.setLowBatteryThreshold(10, "Invalid Value")
	status = @data['status'] if @data['status']
	error = @data['errorName'] if @data['errorName']
	@getdata = Rho::MobilePayment.getLowBatteryThreshold()
	oldoutput = @olddata['lowBatteryThreshold'].to_s if @olddata['lowBatteryThreshold']
	newoutput = @getdata['lowBatteryThreshold'].to_s if @getdata['lowBatteryThreshold']
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')
	Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+oldoutput+'"')
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+newoutput+'"')	
end

def mobpay_getsetbatterylevel
	@batlevel = Rho::MobilePayment.getBatteryLevel()
	@data = Rho::MobilePayment.setLowBatteryThreshold(@batlevel['batteryLevel'] + 1, "battery Low")
	if @data['status']
		status = @data['status']
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @data['errorName']
		error = @data['errorName']  
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')	
	end
	if @data['status'] == 'success'
		@props = {
			"amount" => 200.00,
			"otherAmount" => 10.00,
			"readMode" => 1,
			"messageTitle" => "Message title",
			"message1" => "This is message 1.",	#Message one
			"message2" => "This is message 2.",	#Message two
			"readTimeOut" => 10000
		}
		Rho::MobilePayment.readCardData(@props, url_for(:action => :card_cbdata))
	end
end

def mobpay_removecard
	@data = Rho::MobilePayment.removeCard("Message1", "Message2")
	status = @data['status']
	if @data['errorName']
		error = @data['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')
	end
    Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
end

def mobpay_getdeviceinfo
	@data = Rho::MobilePayment.getDeviceInfo()
	status = @data['status']
	if @data['errorName']
		error = @data['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')
	end
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	@result = " "
	@result += "Status - " + @data['status'].to_s if @data['status']
	@result += "; Application Version - " + @data['applicationVersion'].to_s if @data['applicationVersion']
	@result += "; Firmware Version - " + @data['firmwareVersion'].to_s if @data['firmwareVersion']
	@result += "; Connection Type - " + @data['connectionType'].to_s if @data['connectionType'] 
	@result += "; Device Type - " + @data['deviceType'].to_s if @data['deviceType']
	@result += "; Friendly Name - " + @data['friendlyName'].to_s if @data['friendlyName']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@result+'"')
end

def mobpay_createmac
	if @params['bit']
		if @params['bit'] == '32'
			@data = Rho::MobilePayment.createMac("0123456789ABCDEF0123456789ABCDEF")
		elsif @params['bit'] == '48'
			@data = Rho::MobilePayment.createMac("0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF")
		else
			@data = Rho::MobilePayment.createMac("0123456789ABCDEFTHISISNONHEX")
		end
	else
		if @params['data']
			@data = Rho::MobilePayment.createMac("FEDCBA9876543210")
		else
			@data = Rho::MobilePayment.createMac("0123456789ABCDEF")
		end
	end
	if @data['status']
		status = @data['status'] 
		Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	end
	if @data['errorName']
		error = @data['errorName']
		Rho::WebView.executeJavascript('document.getElementById("result1").innerHTML = "'+error+'"')
	end

	@result = " "
	@result += "Status - " + @data['status'] if @data['status']
	@result += "; macBlock - " + @data['macBlock'].to_s if @data['macBlock']
	@result += "; errorName - " + @data['errorName'] if @data['errorName']
	Rho::WebView.executeJavascript('document.getElementById("cbresult").innerHTML = "'+@result+'"')	

	if @params['val']
		@mac = @data['macBlock']
		if @params['invalid']
			Rho::MobilePayment.validateMac(@mac, 0, "", "", "10", "10", "this is invalid", url_for(:action => :validate_cbdata))
		elsif @params['empty']
			Rho::MobilePayment.validateMac(@mac, 0, "", "", "", "", "0123456789ABCDEF", url_for(:action => :validate_cbdata))
		elsif @params['nocb']
			begin
				Rho::MobilePayment.validateMac(@mac, 0, "", "", "message1", "message2", "0123456789ABCDEF")
			rescue Exception => e
				error = e.to_s
				Alert.show_popup(error)
				Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')
			end
		else
			Rho::MobilePayment.validateMac(@mac, 0, "", "", "message1", "message2", "0123456789ABCDEF", url_for(:action => :validate_cbdata))
		end
	end
	if !@params['nocb']
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+@mac+'"')
	end
end

def mobpay_authcard
	begin
		if @params['nocb']
			Rho::MobilePayment.authorizeCard()
		elsif @params['data']
			Rho::MobilePayment.authorizeCard(100.00, 10.00, 1, ["C2", "95", "9B"], true, false, true, false, 10000, url_for(:action => :auth_cbdata))
		elsif @params['merchant']
			merchant = @params['merchant'].to_i
			Rho::MobilePayment.authorizeCard(100.00, 10.00, merchant, ["C2", "95", "9B"], true, false, true, false, 10000, url_for(:action => :auth_cbdata))
		elsif @params['displayresult']
			Rho::MobilePayment.authorizeCard(100.00, 10.00, 1, ["C2", "95", "9B"], false, false, true, false, 10000, url_for(:action => :auth_cbdata))
		elsif @params['displayamt']
			Rho::MobilePayment.authorizeCard(100.00, 10.00, 1, ["C2", "95", "9B"], true, false, false, false, 10000, url_for(:action => :auth_cbdata))
		else
			val = ["9F41","9F02","5F36","9F1B","9F1C","9F35","9F1A"]
			Rho::MobilePayment.authorizeCard(15.0, 2.0,0, val, true, false, true, true, 10000, url_for(:action => :auth_cbdata))
		end		
	rescue Exception => e
		error = e.to_s
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')		
	end

end

def mobpay_completeevm
	begin
		if @params['nocb']
			Rho::MobilePayment.completeOnlineEmv()
		else
			Rho::MobilePayment.completeOnlineEmv(0, true, ["91", "71", "8A", "89"], url_for(:action => :completeevm_cbdata))
		end
	rescue Exception => e
		error = e.to_s
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')
	end
end

def mobpay_getemvtags
	begin
		if @params['nocb']
			Rho::MobilePayment.getEmvTags()
		else
			Rho::MobilePayment.getEmvTags(["9F41", "9F02", "5F36", "9F1B"], url_for(:action => :completeevm_cbdata))
		end
	rescue Exception => e
		error = e.to_s
		Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')
	end	
end

def mobpay_setemvtags
	@data = Rho::MobilePayment.setEmvTags(["9F410101", "9F020102", "5F360103", "9F1B0104"])
	status = @data['status']
	error = @data['errorName']
	Rho::WebView.executeJavascript('document.getElementById("cbstatus").innerHTML = "'+status+'"')
	Rho::WebView.executeJavascript('document.getElementById("result2").innerHTML = "'+error+'"')
end

end