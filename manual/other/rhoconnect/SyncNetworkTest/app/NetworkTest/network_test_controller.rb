require 'rho/rhocontroller'
require 'helpers/browser_helper'

class NetworkTestController < Rho::RhoController
  include BrowserHelper

  # GET /NetworkTest
  def index
    $count=0
    $othercount=0
    @networktests = NetworkTest.find(:all)
    render :back => '/app'
  end

  # GET /NetworkTest/{1}
  def show
    @networktest = NetworkTest.find(@params['id'])
    if @networktest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /NetworkTest/new
  def new
    @networktest = NetworkTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /NetworkTest/{1}/edit
  def edit
    @networktest = NetworkTest.find(@params['id'])
    if @networktest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /NetworkTest/create
  def create
    @networktest = NetworkTest.create(@params['networktest'])
    redirect :action => :index
  end

  # POST /NetworkTest/{1}/update
  def update
    @networktest = NetworkTest.find(@params['id'])
    @networktest.update_attributes(@params['networktest']) if @networktest
    redirect :action => :index
  end

  # POST /NetworkTest/{1}/delete
  def delete
    @networktest = NetworkTest.find(@params['id'])
    @networktest.destroy if @networktest
    redirect :action => :index  
  end
  
  def set_network_callback
      pollVal = @params['pollVal']
      #Alert.show_popup(pollVal)
        if(pollVal=="")
          myMessage="networkStatusCallback is set with no poll interval" 
          System::set_network_status_notify( url_for( :action => :networkStatusCallback) )
        elsif
          myMessage="networkStatusCallback is set with poll interval"+pollVal
          System::set_network_status_notify( url_for( :action => :networkStatusCallback), pollVal.to_i ) 
        end
      
      WebView.execute_js('setFieldValue("'+myMessage+'")')  
      #redirect :action => :index
    end
    
    def set_network_callback_sync
      $syncFlag= false
      syncParam3= @params['syncParam3']  
      if syncParam3=="true"
        $syncFlag= true
      end  
      pollVal = @params['pollVal']
      System::set_network_status_notify( url_for( :action => :networkStatusCallbackWithSync), pollVal.to_i )
      myMessage="!networkStatusCallbackWithSync is set with poll interval #{pollVal} and syncFlag #{$syncFlag}"
      WebView.execute_js('setFieldValue("'+myMessage+'")')  
      
    end
  
    def unset_network_callback
      #Alert.show_popup("unset") 
      System:: clear_network_status_notify()
      WebView.execute_js('setFieldValue("networkStatusCallback is cleared")')   
      #redirect :action => :index
    end
    
  def networkStatusCallback
     $count = $count.to_i + 1  
     Alert.show_popup("Count:-"+$count.to_s+"Network state changed from #{@params['prev_status']} to #{@params['current_status']}")  
     myMessage="Count:-"+$count.to_s+"Network state changed from #{@params['prev_status']} to #{@params['current_status']}"
     WebView.execute_js('setFieldValue("'+myMessage+'")')     
   end
   
   def networkStatusCallbackWithSync
     WebView.execute_js('setFieldValue("event networkStatusCallbackWithSync fired")')   
     is_network_exist = @params['current_status'] == 'connected'
     if is_network_exist && Rhom::Rhom.have_local_changes
         WebView.execute_js('setFieldValue("calling sync method inside networkStatusCallbackWithSync event")')
         SyncEngine.dosync(false, '', $syncFlag)
     end
   end
    
    def checkLocalChanges
      retVal=Rhom::Rhom.have_local_changes
#      if Rhom::Rhom.have_local_changes
#      Alert.show_popup(retVal) 
#      end
      myMessage="property return value"+retVal.to_s
      WebView.execute_js('setFieldValue("'+myMessage+'")')  
    end
    
    def setSyncServerUrl
      syncurl=@params['syncUrl']
      Rho::RhoConfig.syncserver=syncurl 
      WebView.execute_js('setFieldValue("'+syncurl+'")') 
    end
    
    
  def callSync2params 
       SyncEngine.dosync(true, "param1=12&param2=abc") 
       myMessage="Sync with 2 params is called"
       WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
   
   def callSync1params 
        SyncEngine.dosync(true)
        myMessage="Sync with 1 params is called"
        WebView.execute_js('setFieldValue("'+myMessage+'")')
   end
   
  def callSync 
       SyncEngine.dosync
       myMessage="Sync with no params is called"
       WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
      
  def callSync_emptyparams
           begin
           SyncEngine.dosync("","","'")
           rescue Rho::RhoError => e
                        Alert.show_popup("RhoError is:-"+e.message)
           rescue ArgumentError=> aexc
                        Alert.show_popup("ArgumentError Exception is:- "+aexc.message)
           rescue Exception => exc  
                        Alert.show_popup("Exception is:-"+exc.message)
           end
           myMessage="Sync with empty params is called"
           WebView.execute_js('setFieldValue("'+myMessage+'")')
  end
  
   def callSync3params
     syncParam1Flag=false
     syncParam3Flag=false
     syncParam1 = @params['syncParam1']
     syncParam3= @params['syncParam3']  
       
     if syncParam1=="true" 
       syncParam1Flag=true
     elsif syncParam1=="false" 
       syncParam1Flag=false
     else
       syncParam1Flag=""
     end
     
     if syncParam3=="true" 
       syncParam3Flag=true
     elsif syncParam3=="false" 
       syncParam3Flag=false
     else
       syncParam3Flag=""
     end
     
     SyncEngine.dosync(syncParam1Flag, "", syncParam3Flag)  
     myMessage="Sync with 3 params is called with"+syncParam1+"and"+syncParam3
     WebView.execute_js('setFieldValue("'+myMessage+'")')
     redirect :action => :index
   end
   
   def doDBReset
     Rhom::Rhom.database_full_reset
     WebView.execute_js('setFieldValue("reset Successful")')
   end
  
  def createRecord
         begin
            @products = Product.create(:sku => 'localchangetest')
           WebView.execute_js('setFieldValue("record added")')
           rescue Rho::RhoError => e
             Alert.show_popup("RhoError is:-"+e.message)
           rescue ArgumentError=> aexc
             Alert.show_popup("ArgumentError Exception is:- "+aexc.message)
           rescue Exception => exc  
             Alert.show_popup("Exception is:-"+exc.message)
           end
           redirect :action => :index
  end
  
  def deleteRecord
    begin
        @products = Product.delete_all(:conditions => {'sku'=> 'localchangetest'})
       WebView.execute_js('setFieldValue("record deleted")')  
       rescue Rho::RhoError => e
         Alert.show_popup("RhoError is:-"+e.message)
       rescue ArgumentError=> aexc
         Alert.show_popup("ArgumentError Exception is:- "+aexc.message)
       rescue Exception => exc  
         Alert.show_popup("Exception is:-"+exc.message)
       end
       redirect :action => :index
  end
  
  def updateRecord
    begin
      @products = Product.find(:all,:conditions => {'sku'=> 'localchangetest'})
      @products.each_with_index do|y,x|
      @products[x].update_attributes(:sku => 'Hellotest')
      WebView.execute_js('setFieldValue("record updated")')  
      end
       rescue Rho::RhoError => e
         Alert.show_popup("RhoError is:-"+e.message)
       rescue ArgumentError=> aexc  
         Alert.show_popup("ArgumentError Exception is:- "+aexc.message)
       rescue Exception => exc  
         Alert.show_popup("Exception is:-"+exc.message)
       end
       redirect :action => :index
  end
   
  def setFinishSyncBackground
    syncBGVal=@params['syncBGVal']
    #Rho::RhoConfig.finish_sync_in_background=syncBGVal
    Rho::RhoConfig.set_property_by_name('finish_sync_in_background',syncBGVal)
    myMessage="setfinish_sync_in_background to"+syncBGVal
    WebView.execute_js('setFieldValue("'+myMessage+'")')    
  end
    
  
end
