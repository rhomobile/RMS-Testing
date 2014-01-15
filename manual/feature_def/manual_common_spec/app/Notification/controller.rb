require 'rho/rhocontroller'

class NotificationController < Rho::RhoController
  
def rho_show_status
	Rho::Notification.showStatus("Test", "This is a status message", "Confirm");
end

def rho_show_toast_background
	Rho::Notification.showStatus("Test", "This is a status message", "Confirm");
end

def rho_show_toast_largemessage
	Rho::Notification.showStatus("Test", "Welcome to the Rhomobile Suite documentation site. Here you will find developer guides to walk you through activities using the framework. You will also find a complete API reference section that describes the available interfaces.", "Confirm");
end

def rho_show_toast_emptymsg
	Rho::Notification.showStatus("Test", "", "Confirm");
end

def rho_default_showPopup
    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :icon => "info",
        :buttons => [{:id => 'accept', :title => 'ok'}]},url_for(:action => :popup_callback)
    );
end

def rho_showPopup_type_constdialog
    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :icon => "info",
        :buttons => [{:id => 'accept', :title => 'ok'}],
        :types => [Rho::Notification::TYPE_DIALOG]},url_for(:action => :popup_callback)
    );
end

def rho_showPopup_type_constnotification
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION]});
end

def rho_notification_iconinfo
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION],
        :icon => "info"});
end

def rho_notification_iconalert
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION],
        :icon => "alert"});
end

def rho_notification_iconquestion
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION],
        :icon => "question"});
end

def rho_notification_iconuserdefined
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION],
        :icon => Rho::RhoFile.join(Rho::Application.modelFolderPath('Notification'), 'icon.png')});
end

def rho_showPopup_constnotificationDialog
	    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :buttons => [{:id => 'accept', :title => 'yes'},{:id => 'no', :title => 'no'},{:id => 'cancel', :title => 'cancel'},{:id => 'ok', :title => 'ok'}],
        :types => [Rho::Notification::TYPE_NOTIFICATION_DIALOG]}, url_for(:action => :popup_dialog_callback)
    );
end

def rho_notificationdialog_iconinfo
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION_DIALOG],
        :buttons => [{:id => 'accept', :title => 'ok'}],
        :icon => "info"});
end

def rho_notificationdialog_iconalert
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION_DIALOG],
        :buttons => [{:id => 'accept', :title => 'ok'}],
        :icon => "alert"});
end

def rho_notificationdialog_iconquestion
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION_DIALOG],
        :buttons => [{:id => 'accept', :title => 'ok'}],
        :icon => "question"});
end

def rho_notificationdialog_iconuserdefined
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :types => [Rho::Notification::TYPE_NOTIFICATION_DIALOG],
        :buttons => [{:id => 'accept', :title => 'ok'}],
        :icon => Rho::RhoFile.join(Rho::Application.modelFolderPath('Notification'), 'icon.png')});
end

def rho_showPopup_type_consttoast
    Rho::Notification.showPopup({
        :message => "Displaying text in toast ...",
        :types => [Rho::Notification::TYPE_TOAST]}
    );
end

def rho_showPopup_type_all
    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal message",
        :icon => "info",
        :buttons => [{:id => 'accept', :title => 'ok'}],
        :types => [Rho::Notification::TYPE_DIALOG,
                   Rho::Notification::TYPE_NOTIFICATION_DIALOG,
                   Rho::Notification::TYPE_TOAST,
                   Rho::Notification::TYPE_NOTIFICATION]
        },url_for(:action => :popup_callback)
    );
end

def popup_callback
    puts @params.inspect
end

def popup_dialog_callback
    Rho::Notification.showStatus("Test", @params.to_s, "Confirm");
end

end
