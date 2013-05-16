require 'rho/rhocontroller'
require 'helpers/browser_helper'

class NetworkController < Rho::RhoController
  include BrowserHelper
  
  def index
    @@get_result = ""
    @@get_img_result = ""
    @@file_name = ""
    @@error_params = ""
    render :back => '/app'
  end

  def networkhas
    puts "Has network"  
    netVal= Rho::Network.hasNetwork
    puts "Return value is #{netVal}"
    Rho::WebView.execute_js("setFieldValue('#{netVal}')")
  end

  def cellnetwork          
    puts "Has cell network"  
    netcellVal= Rho::Network.hasCellNetwork
    puts "Return cellnetwork value is #{netcellVal}"
    Rho::WebView.execute_js("setFieldValue('#{netcellVal}')")
  end

  def wifinetwork          
    puts "Has wifi network"  
    netwifiVal = Rho::Network.hasWifiNetwork
    puts "Return wifinetwork value is #{netwifiVal}"
    Rho::WebView.execute_js("setFieldValue('#{netwifiVal}')")
  end
   
  def httpDownload
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test.jpg")
  puts @@get_img_result
  networkProps = Hash.new
  networkProps['url'] = "http://192.168.6.18/NEON/secure/screen.jpg" 
  #Rho::Network.authUser = 'admin'
  #Rho::Network.authPassword = 'Motorola@123'
  #networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"    
  networkProps['filename'] = @@get_img_result
  networkProps['overwriteFile'] = "true"
  #networkProps['createFolders'] = "true"
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpget_callback))
  end

  def overwirteFalse
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test.jpg")
    puts @@get_img_result
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"    
    networkProps['filename'] = @@get_img_result
    networkProps['overwriteFile'] = "false"
    #networkProps['createFolders'] = "true"
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpget_callback))
  end
  
  def httpdownload_callback
    puts "httpdownload_callback: #{@params}"

    if @params['status'] != 'ok'
        @@error_params = @params
        Rho::WebView.navigate(url_for :action => :show_error)        
    else
        Rho::WebView.navigate(url_for :action => :show_result)
    end

  end
  
  def vfFalse
    Rho::Network.url= 'https://192.168.6.27/rhodes/AsyncHttp/screen.jpg'    
    #Rho::WebView.navigate("https://192.168.6.27/bh")
    #Rho::Network.verifyPeerCertificate = false
  end
  
  def vfTrue
    Rho::Network.verifyPeerCertificate = true
    Rho::WebView.navigate("https://192.168.6.27/bh")
  end
  
  def securewebbrowsegiven
    Rho::Network.verifyPeerCertificate = false
    Rho::WebView.navigate("https://192.168.6.18/NEON/secure/screen.jpg")
    Rho::Network.authUser = 'admin'
    Rho::Network.authPassword = 'Motorola@123'
  end
  
  def securewebbrowsenotgiven
  Rho::WebView.navigate("http://192.168.6.18/NEON/secure/screen.jpg")
  end
  
  def atTypebasi
    Rho::Network.verifyPeerCertificate = false
    Rho::WebView.navigate("https://192.168.6.27/vinod/1_Browser_Validation/authentication/basic")
    Rho::Network.authType = 'basic'
    Rho::Network.authUser = 'admin'
    Rho::Network.authPassword = 'admin'
  end
  
  def atTypedig
    Rho::Network.verifyPeerCertificate = false
    Rho::WebView.navigate("https://192.168.6.27/vinod/1_Browser_Validation/authentication/basic")
    Rho::Network.authType = 'digest'
    Rho::Network.authUser = 'admin'
    Rho::Network.authPassword = 'admin'
  end
  
  def httpPost
    networkProps = Hash.new
    networkProps['url'] = "https://192.168.6.27/rhodes/AsyncHttp/asyncpost.php"    
    networkProps['body'] = "data1=test&data2=test2"
    networkProps['verifyPeerCertificate'] = false
    result = Rho::Network.post(networkProps, url_for(:action => :httpget_callback))
    @@get_result = result["body"]
    render :action => :index, :back => '/app'
  end
  
  def httpGet
        networkProps = Hash.new
        networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/asyncget.php?data1=test&data2=test2"    
        result = Rho::Network.get(networkProps, url_for(:action => :httpget_callback))
        @@get_result = result["body"]  
        render :action => :index, :back => '/app'
  end
     
  def httpget_callback
    puts "February: #{@params}"
    Alert.show_popup "#{@params}"
    if @params['status'] != 'ok'
        @@error_params = @params
        Rho::WebView.navigate(url_for :action => :show_error)        
    else
        @@get_result = @params['body']
        Rho::WebView.navigate(url_for :action => :show_result)
    end
  end
  
def httpUploadFile
      @@file_name = File.join(Rho::RhoApplication::get_model_path('app','Network'), "myfile.txt")
      puts @@file_name
      unless File.exists?(@@file_name)
         write_data  = "this is rhodes test"
         f = File.new(@@file_name, "w")
         f.write(write_data)
         f.close
      end         
      # :filename     Full path to download file target.
      # :post         HTTP POST body to send with request.
      Rho::Network.uploadFile(
        :url => "http://192.168.6.18/NEON/secure/Upload.aspx",
        :filename => @@file_name,
        :body => "", #=> leave blank, AsyncHttp will fill in multipart body
        :headers => {"Content-Type"=>"text/plain"}, #=> used as body text content type
        :callback => url_for(:action => :httpupload_callback),
        :fileContentType => :application,
        :authentication => {
             :authType => :basic,
             :authUser => "admin",
             :authPassword => "Motorola@123"
           },
        :callback_param => "" )
end

def httpupload_callback
  puts "httpupload_callback: #{@params}"

  if @params['status'] != 'ok'
      @@error_params = @params
      Rho::WebView.navigate ( url_for :action => :show_error )        
  else
      @@get_result = "Success. File: " + @@file_name;
      Rho::WebView.navigate ( url_for :action => :show_result )
  end
      
end
  
  def show_result
    render :action => :index, :back => '/app'
  end

  def show_error
    render :action => :error, :back  => '/app'
  end
  
  def connectionDetect    
    networkProps = Hash.new
    networkProps['host'] = @params['hostText']
    networkProps['port'] = @params['portText']
    networkProps['pollInterval'] = @params['pollIntervalText']
    networkProps['detectionTimeout'] = @params['detectionTimeoutText']
    puts "Return  #{networkProps}"
    #Alert.show_popup  "#{networkProps.inspect()}"
    Rho::Network.detectConnection(networkProps, url_for(:action => :connectionEvent))
  end

   def connectionEvent
     puts "Logfiledata: #{@params}"
      #puts "ConnectionEvent Called #{@params}"
      if @params['connectionInformation'] == 'Disconnected'
          #Alert.show_popup "Connection Lost"
          Alert.show_popup "#{@params['failureMessage']}"
      else
          Alert.show_popup "Connected"
      end
    end
    
  def stopEvent
    puts "ConnectionEvent Called #{@params}"
    Rho::WebView.execute_js("javascript:connectionEvent('#{@params["connectionInformation"]}');")
  end
    
  def statusEvent
    puts "Logfiledata: #{@params}"
    Alert.show_popup "#{@params}"
     #puts "ConnectionEvent Called #{@params}"
     if @params['connectionInformation'] == 'Disconnected'
         Alert.show_popup "Ditection stoped"
         #Alert.show_popup "#{@params['failureMessage']}"
     else
         Alert.show_popup "Ditection Not Stopped"
     end
   end    
 
  def stopDetecting
  Rho::Network.stopDetectingConnection(url_for(:action => :stopEvent))
  end
    
    
    def statusNotify
      #Rho::Network.startStatusNotify("#{@params['pollInterval']}", url_for(:action => :statusEvent))
      Rho::Network.startStatusNotify(10000, url_for(:action => :statusEvent))  
    end
    
    def stopNotify
       puts "calling stopStatusNotify method"
       Rho::Network.stopStatusNotify
    end
    
  def cancelEventcall
     puts "calling cancel method"
     Rho::Network.cancel
  end
  
  def Posttest
     puts "Posttest"
     networkProps = Hash.new
     networkProps['body'] = @params['body']
     Rho::Network.post(networkProps, url_for(:action => :postEvent))
  end
  
  def postEvent
    puts "postEvent: #{@params}"
         if @params['connectionInformation'] == 'Disconnected'
         #Alert.show_popup "Connection Lost"
         Alert.show_popup "#{@params['failureMessage']}"
     else
         Alert.show_popup "Connected"
     end
   end
  
  def wanconnectionDestination
     networkProps = "#{@params['connectionDestination']}"
     Rho::Network.connectWan(networkProps, url_for(:action => :connectionwanEvent))
  end
  
  def connectionwanEvent
    puts "Logfilewandata: #{@params}"
    resultHash = @params
    waninfo = "wan event info:- "
    if resultHash
          waninfo += "phoneSignalStrength : #{resultHash['phoneSignalStrength']}  
                      networkOperator : #{resultHash['networkOperator']} 
                      connectionTypeAvailable : #{resultHash['connectionTypeAvailable']}
                      connectionTypeConnected : #{resultHash['connectionTypeConnected']}
                      connectionManagerMessage : #{resultHash['connectionManagerMessage']}"

    end
    puts "#{waninfo}"
    Alert.show_popup  "#{waninfo}"
    Rho::WebView.execute_js('setFieldValue("'+waninfo+'")') 
   end
   
   def wanDisconnect
     puts "calling disconnectWan method"
     Rho::Network.disconnectWan
   end
   
  def get_res
    @@get_result    
  end
  
  def get_img_res
    @@get_img_result    
  end

  def get_error
    @@error_params
  end
    
end
