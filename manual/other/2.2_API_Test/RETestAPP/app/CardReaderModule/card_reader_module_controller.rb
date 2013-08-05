require 'rho/rhocontroller'
require 'helpers/browser_helper'

class CardReaderModuleController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 

  def openmsr
      autoentervalue = @params['groupautoenter']
      autotabvalue = @params['groupautotab']
        
      #Alert.show_popup("Autoenter value"+autoentervalue+"   Autotab value = "+autotabvalue)
      
      if autoentervalue!="DEFAULT"
         CardReader.autoEnter=autoentervalue
      end
      if autotabvalue!="DEFAULT"
          CardReader.autoTab=autotabvalue
      end    
      CardReader.open
      redirect :action => :index
    end
    
    
    
    
    
    def closemsr
      #Alert.show_popup("Before Close")
      CardReader.close
      redirect :action => :index
    end
    
    def setpandata
      pandatavalue = @params['txtpandata']
     
        
      if pandatavalue!="DEFAULT"
        CardReader.panData=pandatavalue
      end
      #Alert.show_popup("pandata Value= "+pandatavalue)
      WebView.execute_js('setFieldValue("'+pandatavalue+'")')
      redirect :action => :index
    end
    
    def attachevent
      selectedeventvalue = @params['groupselectevent']
      pinentryvalue = @params['grouppinentry']
      pintimeoutvalue = @params['txtpintimeout']
        
      if pinentryvalue!="DEFAULT"
          CardReader.pinEntry=pinentryvalue
      end
      
      if pintimeoutvalue!="DEFAULT"
      CardReader.pinTimeout=pintimeoutvalue
      end  
            
         
      if selectedeventvalue == "JavaScript"
       CardReader.readEvent = url_for(:action => :myreadevent)
        #Alert.show_popup("Javascript")
      end  
  
          
      
       
      #Alert.show_popup("pinentry Value= "+pinentryvalue+"pintimeout Value= "+pintimeoutvalue+"selectedeventvalue"+selectedeventvalue)
      WebView.execute_js('setFieldValue("'+pinentryvalue+","+pintimeoutvalue+","+selectedeventvalue+'")')
      redirect :action => :index
    end
    
    def myreadevent
      #Alert.show_popup("Inside Event")
      mydata=@params['data']
      mymode=@params['mode']
      #Alert.show_popup("data Value= "+mydata+"mode Value= "+mymode)  
      WebView.execute_js('setFieldValue("'+mydata+","+mymode+'")')
#      case mymode
#      when 'CR'; 
#        carddata="card data:- "+mydata;
#        divdata="Encrypted data: Please see card data in text area"
#        WebView.execute_js('setFieldValue("'+carddata+","+divdata++","+mymode'")')
#         ProcessCardData(data);r
#      when 'ENCDATA';   
#        carddata="Encrypted data:- "+mydata;
#        divdata="Encrypted data: Please see Encrypted data in text area"
#        WebView.execute_js('setFieldValue("'+carddata+","+divdata+'")')
#      when 'MESSAGE'; 
#        carddata="Error:- "+mydata;
#        divdata="Error:Please see error in text area"
#        WebView.execute_js('setFieldValue("'+carddata+","+divdata+'")')
#      when 'PAN';
#        carddata="PAN:- "+mydata
#        divdata="Message:"+"Please turn the unit over and enter the PIN"
#        WebView.execute_js('setFieldValue("'+carddata+","+divdata+'")')
#
#      end   
#      
    end
    
    
    
    def setmodulename
      selectedmsrvalue = @params['groupselectedmsr']
      CardReader.moduleName=selectedmsrvalue
      #Alert.show_popup("SelectedMSR Value= "+selectedmsrvalue)
      redirect :action => :index
    end
    
  
  
  # GET /CardReaderModule
  def index
    @cardreadermodules = CardReaderModule.find(:all)
    render :back => '/app'
  end

  # GET /CardReaderModule/{1}
  def show
    @cardreadermodule = CardReaderModule.find(@params['id'])
    if @cardreadermodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /CardReaderModule/new
  def new
    @cardreadermodule = CardReaderModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /CardReaderModule/{1}/edit
  def edit
    @cardreadermodule = CardReaderModule.find(@params['id'])
    if @cardreadermodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /CardReaderModule/create
  def create
    @cardreadermodule = CardReaderModule.create(@params['cardreadermodule'])
    redirect :action => :index
  end

  # POST /CardReaderModule/{1}/update
  def update
    @cardreadermodule = CardReaderModule.find(@params['id'])
    @cardreadermodule.update_attributes(@params['cardreadermodule']) if @cardreadermodule
    redirect :action => :index
  end

  # POST /CardReaderModule/{1}/delete
  def delete
    @cardreadermodule = CardReaderModule.find(@params['id'])
    @cardreadermodule.destroy if @cardreadermodule
    redirect :action => :index  
  end
end
