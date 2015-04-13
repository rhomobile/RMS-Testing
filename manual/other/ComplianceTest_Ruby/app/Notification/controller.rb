require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class NotificationController < Rho::RhoController

def notify_callback
	@callback_data = @params.to_json.to_s
	Rho::WebView.executeJavascript('document.getElementById("actResult").innerHTML= "'+@callback_data+'";')
end

def notify_beep
	Rho::Notification.beep({'frequency' => 1000, 'volume' => 3, 'duration' => 5000})
end

def notify_playfile
	Rho::Notification.playFile(Rho::RhoFile.join(Rho::Application.modelFolderPath('Notification'), 'media1.mp3'), '.mp3')
end

def notify_vibrate
	Rho::Notification.vibrate(@params['time'].to_i)
end

def notify_showstatus
	Rho::Notification.showStatus('MyAlert', 'This is status message', 'click to hide')
end

def notify_showstatusconf
	Rho::Notification.showStatus("Test", "This is a status message", "Confirm")
end

def notify_hide
	Rho::Notification.hidePopup()
end

def notify_showpopup
	@props = { 'message' => 'This is a pop up for hide ', 
		'buttons' => [{'id' => 'yes', 'title' => 'yes'}, 'No', 'Cancel'], 
		'title' => 'MyTitle', 
		'icon' => '/app/Notification/icon.png'}
	Rho::Notification.showPopup(@props)
end

def notify_showpopup2
	Rho::Notification.showPopup({
		'title' => "Displaying a pop up",
		'message' =>"Message will get display in notification bar and dialog will get displayed when comes to foreground",
		'icon' => "info",
		'buttons' => [{'id' => 'ok', 'title' => 'ok'}]
	})
end

def notify_showpopup3
	Rho::Notification.showPopup({
		'message' => "Test Message",
		'types' => [Rho::Notification::TYPE_NOTIFICATION]
	})
end

def notify_showpopup4
	Rho::Notification.showPopup({
		'message' => "Test Message",
		'types' => [Rho::Notification::TYPE_NOTIFICATION],
		'icon' => Rho::RhoFile.join(Rho::Application.modelFolderPath('Notification'), 'icon.png')
	})
end

def notify_showpopup5
	Rho::Notification.showPopup({
		'message' => "Test Message",
		'types' => [Rho::Notification::TYPE_TOAST]
	});
end	

def notify_showpopupcb
	@props = {'message' => 'This is a pop up for callback', 
		'buttons' => [{'id' => 'yes', 'title' => 'yes'}, 'No', 'Cancel'], 
		'title' => 'MyTitle', 'icon': '/app/Notification/icon.png'}
    Rho::Notification.showPopup(@props, url_for(:action => :notify_callback));
end

def notify_showpopupcb2
	Rho::Notification.showPopup({
		'title' => "Displaying a pop up",
		'message' => "Test Message",
		'icon' =>  "info",
		'buttons' => [{'id' => 'accept', 'title' => 'yes'},{'id' => 'cancel', 'title' => 'no'}],
		'types' => [Rho::Notification::TYPE_NOTIFICATION_DIALOG]}, url_for(:action => :notify_callback)
	);
end

end