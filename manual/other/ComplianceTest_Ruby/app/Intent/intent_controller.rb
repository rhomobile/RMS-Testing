require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class IntentController < Rho::RhoController

# Method to construct Hash according to the parameters
def params_constructor(intentType, permission, action, categories, appName, targetClass, uri, mimeType, data)
	@result = Hash.new
	@result['intentType'] = intentType if intentType != ""
	@result['permission'] = permission if permission != ""
	@result['action'] = action if action != ""
	@result['categories'] = categories if categories != "" 
	@result['appName'] = appName if appName != ""
	@result['targetClass'] = targetClass if targetClass != ""
	@result['uri'] = uri if uri != ""
	@result['mimeType'] = mimeType if mimeType != ""
	@result['data'] = data if data != ""
	return @result
end

# Callback Method
def listen_callback
	Alert.show_popup(@params.to_json.to_s)
	# if @params['data']
	# 	@cbdata = @params['data']
	# 	if (@cbdata['message'] && @cbdata['message'] == 'Message to service')
	#         Alert.show_popup("Test case passed!")
	#     elsif (@cbdata['reply'] && @cbdata['reply'] == 'Message to service')
	#     	Alert.show_popup("Test case passed!")
	#     elsif (@cbdata['myData'] && @cbdata['myData'] == 'This is Test data !')
	#     	Alert.show_popup("Test case passed!")
	#     elsif (@cbdata['myData'] && @cbdata['myData'] == 'This is broadcast data 3!')
	#     	Alert.show_popup(@params.to_s)
	#     elsif (@cbdata['myData'] && @cbdata['myData'] == 'This is broadcast data 5!')
	#     	Alert.show_popup('Test Case failed if you see this alert message!')
	#     elsif (@cbdata['myData'] && @cbdata['myData'] == 'This is broadcast data!')
	#     	Alert.show_popup("Callback without arguments !")
	#     else
	#         Alert.show_popup("Test case failed!")
	#     end
	# end
end


# Method for intent send
def intent_send
	begin
		if @params['par']
			case @params['par']
			when '1'
				params_constructor(Rho::Intent::START_ACTIVITY, "", "ACTION_MAIN", "", "com.smap.targetapp", "", "", "", "")
			when '3'
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","com.smap.targetapp.MainActivity","","","")
			when '6'
				params_constructor(Rho::Intent::START_SERVICE,"","","","com.smap.targetapp","com.smap.targetapp.MyFirstService","","","")
			when '8'
				params_constructor(Rho::Intent::START_SERVICE,"","ACTION_MAIN","","com.smap.targetapp","com.smap.targetapp.MyFirstService","","","")
				Rho::Intent.send(@result)
			when '9'
				data = { 'toast' => 'Target - Test case passed if you see this in Android Toast !' }
				params_constructor(Rho::Intent::BROADCAST,"","com.smap.targetapp.mySecondAction","","","","","",data)
			when '12'
				data = { 'toast' => 'Target - Test case passed If you see this in Andorid Toast !' }
				params_constructor(Rho::Intent::BROADCAST,"","","","com.smap.targetapp","","","",data)
			when '22'
				data = { 'sms_body' => 'Test case passed if you see this in Message body.' }
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_VIEW","","","","","vnd.android-dir/mms-sms",data)
			when '26'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","rhomobile TestApp/TestApp.exe","","","","")
			when '27'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","com.smap.targetapp","","","","")
			when '28'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","testapp","","","","")
			when '29'
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_VIEW","","","","http://www.google.com","","")
			when '30'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","","","sms:9611896991","","")
			when '311'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","","","mailto:abcd@domain.com","","")
			when '312'
				params_constructor("","","","","","","mailto:abcd@domain.com","","")
			when '32'
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_DIAL","","","","tel:9611896991","","")
			when '301'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","","","sms:9611896991","","")
			when '302'
				params_constructor(Rho::Intent::START_ACTIVITY,"","","","","","sms:9611896991","","")
			when '34'
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_CALL","","","","tel:9611896991","","")
			when '35'
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_VIEW","","","","content://contacts/people/","","")
			when '37'
				data = { 'body' => 'Test case Passed : only if this is displayed in email body content with prefilled recepient address !' };
                params_constructor(Rho::Intent::START_ACTIVITY,"","","","","","mailto:abcd@domain.com","",data)
            when '441'
            	data = {
            		'EXTRA_EMAIL' => ["test@domain.com"],
	                'EXTRA_CC' => ["carbon.copy@domain.com"],
	                'EXTRA_BCC' => ["bcc.email@domain.com"],
	                'EXTRA_SUBJECT' => "Email Subject !",
	                'EXTRA_TEXT' => "Email body content !"
	            }
                params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_SEND","","","","","text/plain",data)
            when '442'
            	pdf = "content://com.rhomobile.compliancetestruby/rhodata/apps/public/intent/rhodes.pdf"
                params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_VIEW","","","",pdf,"","")
            else

			end
		elsif @params['cat']
			params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_MAIN",[@params['cat']],"","","","","")
		end

		Rho::Intent.send(@result)
	rescue =>ex
		jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
		Rho::WebView.executeJavascript(jsmethod)
	end
end

# Method for listen and send
def intent_listen_send
	begin
		if @params['par']
			case @params['par']
			when '5'
				data = { 'message' => 'Message to service' }
				params_constructor(Rho::Intent::START_SERVICE,"","","","com.rhomobile.compliancetestruby","com.rhomobile.rhodes.RhodesService","","",data)
			when '11'
				data = { 'reply' => 'This is my broadcast data!' }
				params_constructor(Rho::Intent::BROADCAST,"","com.smap.targetapp.mySecondAction","","","","","",data)
			when '391'
				data = { 'myData' => 'This is broadcast data 3!' }
				params_constructor(Rho::Intent::BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.compliancetestruby"],"","","","",data)
			when '392'
				data = { 'myData' => 'This is broadcast data 3!' }
				params_constructor(Rho::Intent::BROADCAST,"","","","compliancetestruby","","","",data)
			when '393'
				data = { 'myData' => 'This is broadcast data 3!' }
				params_constructor(Rho::Intent::BROADCAST,"","","","rhomobile compliancetest_ruby/compliancetestruby.exe","","","",data)
			when '461'
				data = { 'myData' => 'This is broadcast data!'}
				params_constructor(Rho::Intent::BROADCAST,"","com.rhomobile.BROADCAST","","com.rhomobile.compliancetestruby","","","",data)
			when '462'
				data = { 'myData' => 'This is broadcast data!'}
				params_constructor(Rho::Intent::BROADCAST,"","com.rhomobile.BROADCAST","","rhomobile compliancetest_ruby/compliancetestruby.exe","","","",data)
			else

			end
		end
		Rho::Intent.startListening(url_for(:action => :listen_callback))
		Rho::Intent.send(@result)
	rescue =>ex
		jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
		Rho::WebView.executeJavascript(jsmethod)
	end
end

# Method for intent send with callback
def intent_send_callback
	begin
		if @params['par']
			case @params['par']
			when '38'
				data = { 'myData' => 'This is Test data !' }
				params_constructor(Rho::Intent::START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","","","",data)
			else
			end
		end
		Rho::Intent.send(@result, url_for(:action => :listen_callback))
	rescue => ex
		jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
		Rho::WebView.executeJavascript(jsmethod)
	end
end

# Method for stop listen and send
def intent_listen_stop
	begin
		data = { 'myData' => 'This is broadcast data 5!' }
		if @params['par']
			case @params['par']
			when '411'
				params_constructor(Rho::Intent::BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.compliancetestruby"],"","","","",data)
			when '412'
				params_constructor(Rho::Intent::BROADCAST,"","","","compliancetestruby","","","",data)					
			when '413'
				params_constructor(Rho::Intent::BROADCAST,"","","","rhomobile compliancetest_ruby/compliancetestruby.exe","","","",data)
			else
			end
		end
		Rho::Intent.startListening(url_for(:action => :listen_callback))
		Rho::Intent.stopListening()
        Rho::Intent.send(@result)
	rescue => ex
		jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
		Rho::WebView.executeJavascript(jsmethod)
	end
end

end