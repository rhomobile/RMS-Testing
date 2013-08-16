require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'

class SettingsController < Rho::RhoController
  include BrowserHelper
  
  def index
    @msg = @params['msg']
    $myString=""  
    render
  end

  def login
    @msg = @params['msg']
    render :action => :login
  end

  def login_callback
    errCode = @params['error_code'].to_i
    if errCode == 0
      # run sync if we were successful
      WebView.navigate Rho::RhoConfig.options_path
    else
      if errCode == Rho::RhoError::ERR_CUSTOMSYNCSERVER
        @msg = @params['error_message']
      end
        
      if !@msg || @msg.length == 0   
        @msg = Rho::RhoError.new(errCode).message
      end
      
      WebView.navigate ( url_for :action => :login, :query => {:msg => @msg} )
    end  
  end

  def do_login
    if @params['login'] and @params['password']
      begin
        SyncEngine.login(@params['login'], @params['password'], (url_for :action => :login_callback) )
        @response['headers']['Wait-Page'] = 'true'
        render :action => :wait
      rescue Rho::RhoError => e
        @msg = e.message
        render :action => :login
      end
    else
      @msg = Rho::RhoError.err_message(Rho::RhoError::ERR_UNATHORIZED) unless @msg && @msg.length > 0
      render :action => :login
    end
  end
  
  def logout
    SyncEngine.logout
    @msg = "You have been logged out."
    render :action => :index
  end
  
  def reset
    render :action => :reset
  end
  
  def doDBReset
    Rhom::Rhom.database_full_reset
    WebView.execute_js('setFieldValue("Database has been reset.")')
  end
  
  def do_sync
    SyncEngine.dosync
    WebView.execute_js('setFieldValue("Sync has been triggered")')
  end
  
  def sync_notify
    
  	status = @params['status'] ? @params['status'] : ""
  	
    source_id= @params['source_id'] ? @params['source_id'] : ""   
    source_name= @params['source_name'] ? @params['source_name'] : ""   
    sync_type= @params['sync_type'] ? @params['sync_type'] : ""        
    total_count= @params['total_count'] ? @params['total_count'] : ""   
    processed_count= @params['processed_count'] ? @params['processed_count'] : ""   
    cumulative_count= @params['cumulative_count'] ? @params['cumulative_count'] : ""   
      
#    sync_complete = @params['sync_complete'] ? @params['sync_complete'] : ""
#    Alert.show_status( "Status:", "#{sync_complete}", Rho::RhoMessages.get_message('hide'))
  	# un-comment to show a debug status pop-up
  	#Alert.show_status( "Status", "#{@params['source_name']} : #{status}", Rho::RhoMessages.get_message('hide'))
  	
  	if status == "in_progress" 	
  	# do nothing
      $myString = $myString.to_s()+"----------In Progress-------------<br/>"
      $myString = $myString.to_s()+"source_id:#{source_id} source_name:#{source_name} sync_type:#{sync_type} status:#{status} <br/>"    
      $myString = $myString.to_s()+"total_count:#{total_count} processed_count:#{processed_count} cumulative_count:#{cumulative_count}<br/>" 
      $myString = $myString.to_s()+"----------In Progress-------------<br/>"  
    elsif status == "ok"
           $myString = $myString.to_s()+"----------OK-------------<br/>"
           $myString = $myString.to_s()+"source_id:#{source_id} source_name:#{source_name} sync_type:#{sync_type} status:#{status} <br/>"  
           $myString = $myString.to_s()+"total_count:#{total_count} processed_count:#{processed_count} cumulative_count:#{cumulative_count}<br/>" 
           $myString = $myString.to_s()+"----------OK-------------<br/>" 
  	elsif status == "complete"
      $myString = $myString.to_s()+"source_id:#{source_id} source_name:#{source_name} sync_type:#{sync_type} status:#{status} <br/>" 
      WebView.navigate Rho::RhoConfig.start_path if @params['sync_type'] != 'bulk'
  	elsif status == "error"
      $myString = $myString.to_s()+"----------error:#{@params['server_errors']}-------------<br/>" 
      if @params['server_errors'] && @params['server_errors']['create-error']
        SyncEngine.on_sync_create_error( 
          @params['source_name'], @params['server_errors']['create-error'].keys, :delete )
      end

      if @params['server_errors'] && @params['server_errors']['update-error']
        SyncEngine.on_sync_update_error(
          @params['source_name'], @params['server_errors']['update-error'], :retry )
      end
      
      err_code = @params['error_code'].to_i
      rho_error = Rho::RhoError.new(err_code)
      
      @msg = @params['error_message'] if err_code == Rho::RhoError::ERR_CUSTOMSYNCSERVER
      @msg = rho_error.message unless @msg && @msg.length > 0   

      if rho_error.unknown_client?( @params['error_message'] )
        $myString = $myString.to_s()+"----------error:UnknownClient-------------<br/>" 
        Rhom::Rhom.database_client_reset
        SyncEngine.dosync
      elsif err_code == Rho::RhoError::ERR_UNATHORIZED
        WebView.navigate( 
          url_for :action => :login, 
          :query => {:msg => "Server credentials are expired"} )                
      elsif err_code != Rho::RhoError::ERR_CUSTOMSYNCSERVER
        WebView.navigate( url_for :action => :err_sync, :query => { :msg => @msg } )
      end    
	end
  end  

  def setSyncServerUrl
    syncurl=@params['syncUrl']
    Rho::RhoConfig.syncserver=syncurl 
    WebView.execute_js('setFieldValue("'+syncurl+'")') 
  end
    
  def checklogged_in
    logged_in_val=SyncEngine::logged_in
    myMessage="logged_in property return value is"+logged_in_val.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')  
  end
  
  def checkUserName
    userNameVal=SyncEngine.get_user_name
    myMessage="User Name is:"+userNameVal
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
  
  def checkLocalChanges
    retVal=Rhom::Rhom.have_local_changes
    myMessage="local_changes property value is"+retVal.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')  
  end
    
  def callSync3params
    syncParam1Flag = (@params['syncParam1']== "true") ? true : false
    syncParam2Flag = (@params['syncParam2']== "true") ? "param1=12&param2=abc" : ""  
    syncParam3Flag = (@params['syncParam3']== "true") ? true : false
    SyncEngine.dosync(syncParam1Flag, syncParam2Flag, syncParam3Flag)  
    myMessage="Sync params are:"+syncParam1Flag.to_s+","+syncParam2Flag.to_s+","+syncParam3Flag.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
   
  def callSync2params
    syncParam1Flag = (@params['syncParam1']== "true") ? true : false
    syncParam2Flag = (@params['syncParam2']== "true") ? "param1=12&param2=abc" : ""       
    SyncEngine.dosync(syncParam1Flag, syncParam2Flag)  
    myMessage="Sync params are:"+syncParam1Flag.to_s+","+syncParam2Flag.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
   
  def callSync1params
    syncParam1Flag = (@params['syncParam1']== "true") ? true : false
    SyncEngine.dosync(syncParam1Flag)  
    myMessage="Sync params is:"+syncParam1Flag.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
  
  def callSync_emptyparams
            begin
            SyncEngine.dosync("","","")
            rescue Rho::RhoError => e
                         Alert.show_popup("RhoError is:-"+e.message)
            rescue ArgumentError=> aexc
                         Alert.show_popup("ArgumentError Exception is:- "+aexc.message)
            rescue Exception => exc  
                         Alert.show_popup("Exception is:-"+exc.message)
            end
            WebView.execute_js('setFieldValue("Sync with empty params is called")')
   end
   
   def doStopSync
     SyncEngine.stop_sync
     WebView.execute_js('setFieldValue("Sync has been stopped")')
   end
   
  def callSyncBySourceName
      SyncEngine.dosync_source(Product.get_source_name, true)  
      WebView.execute_js('setFieldValue("Sync by Product Source Name")')
    end
    
   def callSyncBySourceID
     SyncEngine.dosync_source(Product.get_source_id.to_i, true)  
     WebView.execute_js('setFieldValue("Sync by Product Source ID")')
   end
   
  def set_Sync_Callback_All
    SyncEngine.set_notification(-1, "/app/Settings/sync_notify", '')
    WebView.execute_js('setFieldValue("SyncCallback Set for All Models")')
  end
  
  def set_Sync_Callback_Product
    SyncEngine.set_notification(
      Product.get_source_id.to_i,
      url_for(:action => :sync_notify),
      "sync_complete=true"
    )
    WebView.execute_js('setFieldValue("SyncCallback Set for Product Model")')
  end
    
  def set_Sync_Callback_objectNotify
#      SyncEngine.set_objectnotify_url(
#        url_for(:action => :objectNotifyURL)
#      )
      SyncEngine.set_objectnotify_url(
          url_for(
            :controller => "Product",
            :action => :objectNotifyURL
          )
        )
      
      WebView.execute_js('setFieldValue("set_objectnotify_url set")')
   end
   
#   def objectNotifyURL
#     Alert.show_popup("objectNotifyURL event get fire")
#     deletedOBJ = @params['deleted'] ? @params['deleted'] : ""
#     updatedOBJ = @params['updated'] ? @params['updated'] : ""
#     createdOBJ = @params['created'] ? @params['created'] : "" 
#     $myString = $myString.to_s()+"----------objectNotifyURL event-------------<br/>"
#     $myString = $myString.to_s()+"deletedObjects:#{deletedOBJ} updatedOBJects:#{updatedOBJ} createdOBJects:#{createdOBJ} <br/>"    
#     $myString = $myString.to_s()+"----------objectNotifyURL event-------------<br/>"    
#     WebView.execute_js('setFieldValue("callback get fire")')  
#       
#   end
  
  def clear_Sync_Callback_Product
    SyncEngine.clear_notification(Product.get_source_id.to_i)
    WebView.execute_js('setFieldValue("SyncCallback cleared for Product Model")')
  end
  
  def setPollInterval
    pollVal = @params['pollVal']
    SyncEngine.set_pollinterval(pollVal.to_i)  
    WebView.execute_js('setFieldValue("Poll interval set to:"+"'+pollVal+'")')
  end
  
  def setPageSize
    pageSizeVal = @params['pageSizeVal']
    SyncEngine.set_pagesize(pageSizeVal.to_i) 
    WebView.execute_js('setFieldValue("Page Size set to:"+"'+pageSizeVal+'")')
  end
  
  def getPageSize
    pageVal = SyncEngine.get_pagesize.to_s()
    WebView.execute_js('setFieldValue("Current Page Size is:"+"'+pageVal+'")')
  end
  
  def set_status_popup
    popUpFlag = (@params['statusPopUp']== "true") ? true : false
    SyncEngine.enable_status_popup(popUpFlag)
    WebView.execute_js('setFieldValue("Status Popup set to :"+"'+popUpFlag.to_s+'")')
  end
  
  def set_ssl_verify
     ssl_verifyFlag = (@params['ssl_verifyFlag']== "true") ? true : false
     SyncEngine.set_ssl_verify_peer(ssl_verifyFlag)  
     WebView.execute_js('setFieldValue("SSL verification set to :"+"'+ssl_verifyFlag.to_s+'")')
  end
  
  def doSearchTest
    page = @params['page'] || 0
    page_size = @params['page_size'] || 10
    Product.search(
      :from => 'search',
      :search_params => { 
        :sku => 'NimbusChange'
      },
      :offset => page * page_size,
      :max_results => page_size,
      :callback => url_for(:action => :search_callback),
      :callback_param => ""
    )
      
#    SyncEngine.search(
#      :source_names => 'Product',
#      :from => 'search',
#      :search_params => { 
#        :sku => 'NimbusChange'
#      },
#      :offset => page * page_size,
#      :max_results => page_size,
#      :callback => url_for(:action => :search_callback),
#      :callback_param => ""
#    )
      
   #WebView.execute_js('setFieldValue("search method called")')
  end
  
  def search_callback
    status = @params["status"] 
    if (status and status == "complete")
      @products = Product.find(:all ,:conditions => {'sku'=> @params['sku']})
      Alert.show_popup("#{@products}")
#      WebView.navigate( 
#        url_for( 
#          :action => '../Product', 
#          :query => @params['search_params']
#        ) 
#      )
    else
      @msg="Search-Error"
      render(:action => :search_error, :query => {:msg => @msg}) 
    end
  end
  
  
end
