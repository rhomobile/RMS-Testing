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
    if @params['login'] and @params['password'] and @params['selectbox']
      begin
        if(@params['selectbox']=="Controller")
        #Alert.show_popup "controller callback"
        Rho::RhoConnectClient.login(@params['login'], @params['password'], (url_for :action => :login_callback) )
        elsif(@params['selectbox']=="Anonymous")
          #Alert.show_popup "Anonymous callback"
          Rho::RhoConnectClient.login(@params['login'], @params['password'], lambda{|args| 
          puts "lamda: #{args}"
          Alert.show_popup("Anonymous login callback fired #{args}")
        })
        elsif(@params['selectbox']=="function")
          #Alert.show_popup "function callback"
          Rho::RhoConnectClient.login(@params['login'], @params['password'], method(:login_callback) )
        end
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
    Rho::RhoConnectClient.logout
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
    Rho::RhoConnectClient.doSync
    WebView.execute_js('setFieldValue("Sync has been triggered")')
  end
  
  def do_bulk_sync_rc
          Rho::RhoConfig.bulksync_state='0'
          Rho::RhoConnectClient.doSync
          WebView.execute_js('setFieldValue("bulk Sync has been triggered using RhoconnectClient")')
  end
  
  def do_bulk_sync_old
          Rho::RhoConfig.bulksync_state='0'
          SyncEngine.dosync
          WebView.execute_js('setFieldValue("bulk Sync has been triggered using sync engine")')
  end
  
  def sync_notify
    count=0;
    count=count+1
  	status = @params['status'] ? @params['status'] : ""
    source_id= @params['source_id'] ? @params['source_id'] : ""   
    source_name= @params['source_name'] ? @params['source_name'] : ""   
    sync_type= @params['sync_type'] ? @params['sync_type'] : ""        
    total_count= @params['total_count'] ? @params['total_count'] : ""   
    processed_count= @params['processed_count'] ? @params['processed_count'] : ""   
    cumulative_count= @params['cumulative_count'] ? @params['cumulative_count'] : ""   
    #Alert.show_popup("callback fired !!!!"+count.to_s)  
      
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
        Rho::RhoConnectClient.on_sync_create_error( 
          @params['source_name'], @params['server_errors']['create-error'].keys, :delete )
      end

      if @params['server_errors'] && @params['server_errors']['update-error']
        Rho::RhoConnectClient.on_sync_update_error(
          @params['source_name'], @params['server_errors']['update-error'], :retry )
      end
      
      err_code = @params['error_code'].to_i
      rho_error = Rho::RhoError.new(err_code)
      
      @msg = @params['error_message'] if err_code == Rho::RhoError::ERR_CUSTOMSYNCSERVER
      @msg = rho_error.message unless @msg && @msg.length > 0   

      if rho_error.unknown_client?( @params['error_message'] )
        $myString = $myString.to_s()+"----------error:UnknownClient-------------<br/>" 
        Rhom::Rhom.database_client_reset
        Rho::RhoConnectClient.doSync
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
    Rho::RhoConnectClient.syncServer=syncurl
    #RhoConfig.syncserver=syncurl 
    WebView.execute_js('setFieldValue("'+syncurl+'")') 
  end
    
  def checklogged_in
    logged_in_val = Rho::RhoConnectClient.isLoggedIn()
    myMessage="logged_in property return value is"+logged_in_val.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')  
  end
  
  def checkUserName
    userNameVal=Rho::RhoConnectClient.userName
    #userNameVal= Rho::RhoConnectClient.getProperty('userName')
    puts "User Name is: #{Rho::RhoConnectClient.userName}"
    myMessage="User Name is: #{userNameVal}"
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
    Rho::RhoConnectClient.doSync(syncParam1Flag, syncParam2Flag, syncParam3Flag)  
    myMessage="Sync params are:"+syncParam1Flag.to_s+","+syncParam2Flag.to_s+","+syncParam3Flag.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
   
  def callSync2params
    syncParam1Flag = (@params['syncParam1']== "true") ? true : false
    syncParam2Flag = (@params['syncParam2']== "true") ? "param1=12&param2=abc" : ""       
    Rho::RhoConnectClient.doSync(syncParam1Flag, syncParam2Flag)  
    myMessage="Sync params are:"+syncParam1Flag.to_s+","+syncParam2Flag.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
   
  def callSync1params
    syncParam1Flag = (@params['syncParam1']== "true") ? true : false
    Rho::RhoConnectClient.doSync(syncParam1Flag)  
    myMessage="Sync params is:"+syncParam1Flag.to_s
    WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
  
  def callSync_emptyparams
            begin
            Rho::RhoConnectClient.doSync("","","")
            rescue Rho::RhoError => e
                         Alert.show_popup("RhoError is:-"+e.message)
            rescue ArgumentError=> aexc
                         Alert.show_popup("ArgumentError Exception is:- "+aexc.message)
            rescue Exception => exc  
                         Alert.show_popup("Exception is:-"+exc.message)
            end
            WebView.execute_js('setFieldValue("Sync with empty params is called")')
   end
   
   def doCheckSync
     currentSync = Rho::RhoConnectClient.isSyncing()
     puts "Current sync state is: #{currentSync}"
     WebView.execute_js('setFieldValue("Current sync state is:"+"'+currentSync.to_s+'")')
   end
   
   def doStopSync
     Rho::RhoConnectClient.stopSync
     WebView.execute_js('setFieldValue("Sync has been stopped")')
   end
   
  def callSyncBySourceName
      Rho::RhoConnectClient.doSyncSource('Product', true)  
      WebView.execute_js('setFieldValue("Sync by Product Source Name")')
    end
    
   
  def set_Sync_Callback_All
    callback_type= @params["callback_type"]
    if (callback_type=="Controller")
    Rho::RhoConnectClient.setNotification('*' , url_for(:action => :sync_notify))
    WebView.execute_js('setFieldValue("SyncCallback Set for All Models of Controller type")')
    elsif(callback_type=="Anonymous")
     Rho::RhoConnectClient.setNotification('*' , lambda{|args| 
       puts "lamda: #{args}"
       Alert.show_popup("Anonymous callback fired !!!!")
     })
     WebView.execute_js('setFieldValue("SyncCallback Set for All Models of Anonymous type")')
    elsif(callback_type=="function")
     Rho::RhoConnectClient.setNotification('*' , method(:sync_notify) )
     WebView.execute_js('setFieldValue("SyncCallback Set for All Models of function type")')
    end
  end
  
  def set_Sync_Callback_Product
    Rho::RhoConnectClient.setNotification(
      'Product',
      url_for(:action => :sync_notify)
    )
    WebView.execute_js('setFieldValue("SyncCallback Set for Product Model")')
  end
    
  def set_Sync_Callback_objectNotify
     Rho::RhoConnectClient.setObjectNotification(url_for(:action => :sync_object_notify ))
     WebView.execute_js('setFieldValue(" objectnotify callback is set")')
   end
   
   def sync_object_notify
     Alert.show_popup("objectNotify callback fired !!!!")
     deletedOBJ = @params['deleted'] ? @params['deleted'] : ""
     updatedOBJ = @params['updated'] ? @params['updated'] : ""
     createdOBJ = @params['created'] ? @params['created'] : "" 
     $myString = $myString.to_s()+"----------objectNotify event-------------<br/>"
     $myString = $myString.to_s()+"deletedObjects:#{deletedOBJ} updatedOBJects:#{updatedOBJ} createdOBJects:#{createdOBJ} <br/>"    
     $myString = $myString.to_s()+"----------objectNotifyURL event-------------<br/>"           
   end
   
   def attach_objectNotify
     @products = Product.find(:all)
     #Rho::RhoConnectClient.addObjectnotify(@products)
     Rho::RhoConnectClient.addObjectNotify('Product',@products[0].object)
     Alert.show_popup("#{@products[0].sku}")
     WebView.execute_js('setFieldValue("addObjectnotify method is set for:"+"'+@products[0].sku+'")')
    end
    
    
    
  def clear_Sync_Callback_objectNotify
      Rho::RhoConnectClient.cleanObjectNotify()
      WebView.execute_js('setFieldValue("objectNotify callback cleared")')
    end
   
  def clear_Sync_Callback_All
      Rho::RhoConnectClient.clearNotification('*')
      WebView.execute_js('setFieldValue("SyncCallback cleared for all Model")')
    end
  
  def clear_Sync_Callback_Product
    Rho::RhoConnectClient.clearNotification('Product')
    WebView.execute_js('setFieldValue("SyncCallback cleared for Product Model")')
  end
  
  def setPollInterval
     pollVal = @params['pollVal']
     Rho::RhoConnectClient.pollInterval = pollVal.to_i 
    #Rho::RhoConnectClient.setProperty("pollInterval", 40) 
    #Rho::RhoConnectClient.setProperty("pollInterval", pollVal.to_s)  
    WebView.execute_js('setFieldValue("Poll interval set to:"+"'+pollVal+'")')
  end
  
  def getPollInterval 
    pollVal = Rho::RhoConnectClient.pollInterval
    #pollVal = Rho::RhoConnectClient.getProperty("pollInterval")
    puts "Current Poll interval is: #{pollVal}"
    WebView.execute_js('setFieldValue("Current Poll interval is:"+"'+pollVal.to_s+'")')
  end
  
  def setPageSize
    pageSizeVal = @params['pageSizeVal']
    Rho::RhoConnectClient.pageSize= pageSizeVal.to_i
    #Rho::RhoConnectClient.setProperties({ :pageSize => 0 , :showStatusPopup => true})
    WebView.execute_js('setFieldValue("Page Size set to:"+"'+pageSizeVal+'")')
  end
  
  def getPageSize
     pageVal = Rho::RhoConnectClient.pageSize
#    myvar = Rho::RhoConnectClient.getProperties(['pageSize' , 'showStatusPopup'])
#    puts "#{myvar.to_s}"
    WebView.execute_js('setFieldValue("Current page size is:"+"'+pageVal.to_s+'")')
  end
  
  def set_status_popup
    popUpFlag = (@params['statusPopUp']== "true") ? true : false
    Rho::RhoConnectClient.showStatusPopup= popUpFlag
    WebView.execute_js('setFieldValue("Status Popup set to :"+"'+popUpFlag.to_s+'")')
  end
  
  def set_ssl_verify
     ssl_verifyFlag = (@params['ssl_verifyFlag']== "true") ? true : false
     Rho::RhoConnectClient.sslVerifyPeer= ssl_verifyFlag 
     WebView.execute_js('setFieldValue("SSL verification set to :"+"'+ssl_verifyFlag.to_s+'")')
  end
  
  def doSearchTest
    page = @params['page'] || 0
    page_size = @params['page_size'] || 10  
    Rho::RhoConnectClient.search( {
    :sourceNames => 'Product',
    :from => 'search',
    :searchParams => {
    :sku => 'NimbusChange'
    },
    :offset => page * page_size,
    :maxResults => page_size
    },
    url_for(:action => :search_callback)
    )        
  end
  
  def search_callback
    status = @params["status"] 
    if (status and status == "complete")
     # @products = Product.find(:all ,:conditions => {'sku'=> @params['sku']})
     #Alert.show_popup("#{status}")
      WebView.navigate( 
        url_for( 
          :action => '../Product', 
          :query => @params['search_params']
        ) 
      )
    else
      @msg="Search-Error"
      render(:action => :search_error, :query => {:msg => @msg}) 
    end
  end
  
  def getSyncCount
    usersourcename= @params["mysourcename"]
    objCount = Rho::RhoConnectClient.getLastSyncObjectCount(usersourcename)  
    puts "#{objCount}"
    WebView.execute_js('setFieldValue("Number of last sync object:"+"'+objCount.to_s+'"+"for"+"'+usersourcename.to_s+'")')
  end
  
  def getAllPropertiesTest
    myValue = Rho::RhoConnectClient.getAllProperties
    puts "#{myValue.to_s}"
  end
  
  def clearAllPropertiesTest
    myValue = Rho::RhoConnectClient.clearAllProperties()
    puts "#{myValue.to_s}"
  end
  
  def getDefaultMethod
    myValue = Rho::RhoConnectClient.getDefault()
    puts "#{myValue}"
    Alert.show_popup "#{myValue}"
  end
  
  def setDefaultMethod
   myValue = Rho::RhoConnectClient.setDefault()
   puts "#{myValue}"
   Alert.show_popup "#{myValue}"
 end
    
  
end
