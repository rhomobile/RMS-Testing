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
        :buttons => [{:id => 'ok', :title => 'ok'}]},url_for(:action => :popup_callback)
    );
end

def rho_showPopup_kind_dialog
    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :icon => "info",
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :kinds => ["dialog"]},url_for(:action => :popup_callback)
    );
end

def rho_showPopup_kind_constdialog
    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :icon => "info",
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :kinds => [Rho::Notification::KIND_DIALOG]},url_for(:action => :popup_callback)
    );
end

def rho_showPopup_kind_notification
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notification"]});
end

def rho_showPopup_kind_constnotification
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => [Rho::Notification::KIND_NOTIFICATION]});
end

def rho_notification_iconinfo
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notification"],
        :icon => "info"});
end

def rho_notification_iconalert
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notification"],
        :icon => "alert"});
end

def rho_notification_iconquestion
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notification"],
        :icon => "question"});
end

def rho_notification_iconuserdefined
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notification"],
        icon: Rho::RhoFile.join(Rho::Application.modelFolderPath('Notification'), 'icon.png')});
end

def rho_showPopup_notificationDialog
	    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :kinds => ["notificationDialog"]},url_for(:action => :popup_dialog_callback)
    );
end

def rho_showPopup_constnotificationDialog
	    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal Popup",
        :icon => "info",
        :buttons => [{:id => 'yes', :title => 'yes'},{:id => 'no', :title => 'no'},{:id => 'cancel', :title => 'cancel'},{:id => 'ok', :title => 'ok'}],
        :kinds => [Rho::Notification::KIND_NOTIFICATION_DIALOG]},url_for(:action => :popup_dialog_callback)
    );
end

def rho_notificationdialog_iconinfo
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notificationDialog"],
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :icon => "info"});
end

def rho_notificationdialog_iconalert
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notificationDialog"],
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :icon => "alert"});
end

def rho_notificationdialog_iconquestion
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notificationDialog"],
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :icon => "question"});
end

def rho_notificationdialog_iconuserdefined
    Rho::Notification.showPopup({
        :message => "Displaying a Normal Popup",
        :kinds => ["notificationDialog"],
        :buttons => [{:id => 'ok', :title => 'ok'}],
        icon: Rho::RhoFile.join(Rho::Application.modelFolderPath('Notification'), 'icon.png')});
end

def rho_showPopup_kind_toast
    Rho::Notification.showPopup({
        :message => "Displaying text in toast ...",
        :kinds => ["toast"]});
end

def rho_showPopup_kind_consttoast
    Rho::Notification.showPopup({
        :message => "Displaying text in toast ...",
        :kinds => [Rho::Notification::KIND_TOAST]}
    );
end

def rho_showPopup_kind_all
    Rho::Notification.showPopup({
        :title =>"Displaying a pop up",
        :message => "Displaying a Normal message",
        :icon => "info",
        :buttons => [{:id => 'ok', :title => 'ok'}],
        :kinds => ["dialog",'notificationDialog','toast','notification']},url_for(:action => :popup_callback)
    );
end

def popup_callback
    puts @params.inspect
end

def popup_dialog_callback
    Rho::Notification.showStatus("Test", @params.to_s, "Confirm");
end

end
