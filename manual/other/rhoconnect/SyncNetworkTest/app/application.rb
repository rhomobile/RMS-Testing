require 'rho/rhoapplication'

class AppApplication < Rho::RhoApplication
  def initialize
    # Tab items are loaded left->right, @tabs[0] is leftmost tab in the tab-bar
    # Super must be called *after* settings @tabs!
    @tabs = nil
    #To remove default toolbar uncomment next line:
    #@@toolbar = nil
    super

    
    # Uncomment to set sync notification callback to /app/Settings/sync_notify.
    # SyncEngine::set_objectnotify_url("/app/Settings/sync_notify")
    SyncEngine.set_notification(-1, "/app/Settings/sync_notify", '')
  end
  
  def on_deactivate_app
  #WebView.execute_js('setFieldValue("inside of on_deactivate_app")') 
  #Alert.show_popup("inside of on_deactivate_app");   
  puts "***inside of on_deactivate_app***"  
  if System.has_network && Rhom::Rhom.have_local_changes
  puts "****calling sync inside of on_deactivate_app****"  
  #WebView.execute_js('setFieldValue("calling sync inside of on_deactivate_app")')    
  SyncEngine.dosync(false, '', true) # last parameter means to sync only models with local changes
  end
  end

  
end
