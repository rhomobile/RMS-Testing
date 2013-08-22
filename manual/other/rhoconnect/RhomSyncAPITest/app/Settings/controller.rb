require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'
require 'json'

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
      #SyncEngine.dosync
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
    WebView.execute_js('setFieldValue("Database is full reset.")')
  end
  
  def do_reset_full_logout
    Rhom::Rhom.database_full_reset_and_logout
    WebView.execute_js('setFieldValue("DB full reset and logout successfully.")')
  end
  
  def do_reset_fullclient_logout
    Rhom::Rhom.database_fullclient_reset_and_logout
    WebView.execute_js('setFieldValue("DB client full reset and logout successfully.")')
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
           WebView.navigate Rho::RhoConfig.start_path if @params['sync_type'] != 'bulk'
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
  
   def set_Sync_Callback_Product
    Product.set_notification(
          url_for(:action => :display_productnotify),
          "sync_complete=true"
        )
    WebView.execute_js('setFieldValue("Notification Callback Set for Product Model")')
  end
  
  def set_Sync_Callback_Customer
    Customer.set_notification(
      url_for(:action => :display_customernotify),
      "sync_complete=true"
    )
    WebView.execute_js('setFieldValue("Notification Callback Set for Customer Model")')
  end
  
  def display_productnotify
    Alert.show_popup("Product Model has been changed")
  end
  
  def display_customernotify
    Alert.show_popup("Customer Model has been changed")
  end
  
  
  def callSyncProduct
      Product.sync( url_for(:action => :sync_notify), "", false, "" )
      WebView.execute_js('setFieldValue("Sync for Product Source is called ")')
    end
    
   def callSyncCustomer
     Customer.sync( url_for(:action => :sync_notify), "", true, "" )
     WebView.execute_js('setFieldValue("Sync for Customer Source is called ")')
   end
  
    def callSyncBySourceName
        SyncEngine.dosync
        WebView.execute_js('setFieldValue("Sync method called")')
    end
      
      
  def get_rhomsource_attributes
    if(@params['SourceName'].to_s.downcase == "product")
    @source = Rhom::RhomSource.find(Product.get_source_name)
    elsif(@params['SourceName'].to_s.downcase == "customer")
      @source = Rhom::RhomSource.find(Customer.get_source_name)
    end
    myMessage="source_id: #{@source.source_id} <br/>"
    myMessage+="source_name: #{@source.name} <br/>"
    myMessage+="last_updated: #{@source.last_updated} <br/>"
    myMessage+="last_inserted_size: #{@source.last_inserted_size} <br/>"
    myMessage+="last_deleted_size: #{@source.last_deleted_size} <br/>"
    myMessage+="last_sync_duration: #{@source.last_sync_duration} <br/>"
    myMessage+="last_sync_success: #{@source.last_sync_success} <br/>"
    myMessage+="distinct_objects: #{@source.distinct_objects} <br/>"
     
   WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
  
  def get_clientID
    if(@params['SourceName'].to_s.downcase == "product")
        productClientId="Product client id:"+Product.client_id.to_s
        WebView.execute_js('setFieldValue("'+productClientId+'")')
    elsif(@params['SourceName'].to_s.downcase == "customer")
         WebView.execute_js('setFieldValue("'+Customer.client_id.to_s+'")')
    end
  end
  
  def dochangedProperty
    #Alert.show_popup(""+(Product.changed?).to_s)
    if(@params['SourceName'].to_s.downcase == "product")
      if Product.changed?
        WebView.execute_js('setFieldValue("Product is changed")')
        elsif
        WebView.execute_js('setFieldValue("Product is not changed")')
        end
       elsif(@params['SourceName'].to_s.downcase == "customer")
           if Customer.changed?
              WebView.execute_js('setFieldValue("Customer is changed")')
              elsif
              WebView.execute_js('setFieldValue("Customer is not changed")')
              end
        end
  end
  
  def checkMetaDataProperty
      if(@params['SourceName'].to_s.downcase == "product")
        Alert.show_popup ("#{Product.metadata}")
           elsif(@params['SourceName'].to_s.downcase == "customer")
        Alert.show_popup("#{Customer.metadata}")
     end
    
  end
  
  def assignMetaData
      if(@params['SourceName'].to_s.downcase == "product")
        Product.metadata = { 'producttest' => 'productval' }.to_json
           elsif(@params['SourceName'].to_s.downcase == "customer")
        Customer.metadata = { 'customertest' => 'customerval' }.to_json
     end
    
  end
  
  
  def setPollInterval
    pollVal = @params['pollVal']
    SyncEngine.set_pollinterval(pollVal.to_i)  
    WebView.execute_js('setFieldValue("Poll interval set to:"+"'+pollVal+'")')
  end
  
  def clear_Sync_Callback_Product
    Product.clear_notification
    WebView.execute_js('setFieldValue("SyncCallback cleared for Product Model")')
  end
  
end