require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'

class SettingsController < Rho::RhoController
  include BrowserHelper
  
  def index
    @msg = @params['msg']
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
      #Rho::RhoConfig.bulksync_state='0'
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
    render :action => :login
  end
  
  def reset
    render :action => :reset
  end
  
  def do_reset
    Rhom::Rhom.database_full_reset
    @msg = "Database has been reset."
    redirect :action => :index, :query => {:msg => @msg}
  end
  
  def do_reset_full
    Rhom::Rhom.database_full_reset(true,true)
    @msg =  "DB full reset successfully"
    redirect :action => :index, :query => {:msg => @msg}
   end
   
  def doDBReset
    Rhom::Rhom.database_full_reset
    @msg =  "DB reset successfully"
    redirect :action => :index, :query => {:msg => @msg}
  end
   
  
  def do_sync
    Rho::RhoConfig.bulksync_state='1'
    SyncEngine.dosync
    @msg =  "Sync has been triggered."
    redirect :action => :index, :query => {:msg => @msg}
  end
  
  def sync_notify
  	status = @params['status'] ? @params['status'] : ""
  	
  	# un-comment to show a debug status pop-up
  	#Alert.show_status( "Status", "#{@params['source_name']} : #{status}", Rho::RhoMessages.get_message('hide'))
  	
  	if status == "in_progress" 	
  	  # do nothing
  	elsif status == "complete"
      WebView.navigate Rho::RhoConfig.start_path if @params['sync_type'] != 'bulk'
  	elsif status == "error"
	
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
        Rhom::Rhom.database_client_reset
        Rho::RhoConfig.bulksync_state='0'
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

  def do_bulk_sync
          $eventVal = ""
          Rho::RhoConfig.bulksync_state='0'
          #SyncEngine.set_notification(-1, "/app/Settings/mysync_notify", '')
          #SyncEngine.set_notification(BlobBulkTest.get_source_id, "/app/BlobBulkTest/sync_notify", '')
          SyncEngine.dosync
          @msg =  "Bulk Sync has been triggered."
          redirect :action => :index, :query => {:msg => @msg}
  end
  
  
  def do_bulk_sync_product
            ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'none'}, {'name'=>'Customer'})
            ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'incremental'}, {'name'=>'Product'})  
              do_bulk_sync
  end
  
  def do_bulk_sync_none
             ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'none'}, {'name'=>'Product'})
             ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'none'}, {'name'=>'Customer'})
               do_bulk_sync
   end
  
  def do_bulk_sync_both
             ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'incremental'}, {'name'=>'Customer'})
             ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'incremental'}, {'name'=>'Product'})
             do_bulk_sync
  end
  
  def do_bulk_sync_1
    ::Rho::RHO.get_user_db().update_into_table('',{'sync_type'=>'incremental'}, {'name'=>'Customer'})
    ::Rho::RHO.get_user_db().update_into_table('',{'sync_type'=>'incremental'}, {'name'=>'Product'})
    do_bulk_sync
  end
   
  def do_bulk_sync_2
     ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>''}, {'name'=>'Customer'})
     ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>''}, {'name'=>'Product'})
     do_bulk_sync
  end
  
  def do_bulk_sync_3
     ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'incremental'}, {'name'=>''})
     ::Rho::RHO.get_user_db().update_into_table('sources',{'sync_type'=>'incremental'}, {'name'=>''})
     do_bulk_sync
  end
   
  def mysync_notify
    #Alert.show_popup "done and synctype is"+@params['status'] 
    status = @params['status'] ? @params['status'] : ""
    if @params['sync_type']=="bulk" 
      bulk_status= @params['bulk_status'] ? @params['bulk_status'] : ""  
      sync_type= @params['sync_type'] ? @params['sync_type'] : ""   
      myString = "status:#{status} bulkstatus:#{bulk_status} syncType:#{sync_type} <br/>"    
      $eventVal = $eventVal.to_s()+myString
      #Alert.show_popup $eventVal.to_s
      
    end  

      
      # un-comment to show a debug status pop-up
      #Alert.show_status( "Status", "#{@params['source_name']} : #{status}", Rho::RhoMessages.get_message('hide'))
      
      if status == "complete" && @params['sync_type']=="bulk" 
        val=Rho::RhoConfig.bulksync_state
        finalVal= $eventVal+"bulksync_state is:"+val
        WebView.execute_js('setFieldValue("'+finalVal+'")') 
        #Alert.show_popup("done and bulksync_state is "+val)
      elsif status == "error"
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
          Rhom::Rhom.database_client_reset
          SyncEngine.set_notification(-1, "/app/Settings/mysync_notify", '')
          Rho::RhoConfig.bulksync_state='0'
          SyncEngine.dosync
          #SyncEngine.dosync_source(BlobBulkTest.get_source_id.to_i, true)
        elsif err_code == Rho::RhoError::ERR_UNATHORIZED
          WebView.navigate( 
            url_for :action => '/app/Settings/login', 
            :query => {:msg => "Server credentials are expired"} )                
        elsif err_code != Rho::RhoError::ERR_CUSTOMSYNCSERVER
          WebView.navigate( url_for :action => '/app/Settings/err_sync', :query => { :msg => @msg } )
        end    
    end
    end  

end
