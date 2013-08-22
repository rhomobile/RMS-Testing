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
    SyncEngine.set_pollinterval(0)
    System.set_push_notification("/app/Settings/ans_handler",'', 'rhoconnect_push')    
    #System.set_push_notification("/app/Settings/ans_handler",'') 
    #SyncEngine.set_notification(-1, "/app/Settings/sync_notify", '')
  end
end
