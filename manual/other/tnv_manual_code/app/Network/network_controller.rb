require 'rho/rhocontroller'
require 'helpers/browser_helper'

class NetworkController < Rho::RhoController
  include BrowserHelper
  @layout = 'Network/layout'
  
  def index
    @@get_result = ""
    @@get_img_result = ""
    @@file_name = ""
    @@error_params = ""
    @@get_img_resu = ""
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
    myvar = Rho::Application.publicFolder+"/images/sample.png"
    puts "Path : #{myvar}"
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"  
    #networkProps['filename'] = "file://\\Temp\\httpdown\\test.jpg"
    networkProps['filename'] = @@get_img_result
    #networkProps["filename"] = Rho::Application.publicFolder+"/images/sample.png"
    networkProps['overwriteFile'] = true
    networkProps['createFolders'] = true
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpdown_callback))
  end

  def httpDownloadauthen
    #@@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/authodown.jpg")
    #puts @@get_img_result
    @@file_name = File.join(Rho::RhoApplication::get_model_path('app','Network'), "nadaf.jpg")
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/secure/screen.jpg"
    networkProps['authType'] = "basic"
    networkProps['authUser'] = "admin"
    networkProps['authPassword'] = "admin" 
    #networkProps['filename'] = Rho::Application.publicFolder+"/images/test.png"
    networkProps['filename'] =  @@file_name
    networkProps['overwriteFile'] = true
    networkProps['createFolders'] = true
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpdown_callback))
  end  
  
  def overwirteTruehttp
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test.jpg")
    puts @@get_img_result
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"    
    networkProps['filename'] = @@get_img_result
    networkProps['overwriteFile'] = true
    networkProps['createFolders'] = true
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpdown_callback))
  end
  
  def overwirteFalsehttp
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test.jpg")
    puts @@get_img_result
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"    
    networkProps['filename'] = @@get_img_result
    networkProps['overwriteFile'] = false
    networkProps['createFolders'] = true
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpdown_callback))
  end
 
  def createfolderTruehttp
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/Createfolderhttp/test.jpg")
    puts @@get_img_result
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"    
    networkProps['filename'] = @@get_img_result
    networkProps['overwriteFile'] = true
    networkProps['createFolders'] = true
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpdown_callback))
  end
  
  def createfolderFalsehttp
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/Createfolderhttpfalse/test.jpg")
    puts @@get_img_result
    networkProps = Hash.new
    networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/screen.jpg"    
    networkProps['filename'] = @@get_img_result
    networkProps['overwriteFile'] = true
    networkProps['createFolders'] = false
    Rho::Network.downloadFile(networkProps, url_for(:action => :httpdown_callback))
  end  
  
  def httpPost
    myHeaders = Hash.new
    myHeaders['Content-Length'] = 19
    networkProps = Hash.new
    networkProps['url'] = "https://192.168.6.27/rhodes/AsyncHttp/asyncpost.php"    
    networkProps['body'] = "data1=test&data2=test2"
    networkProps['headers'] = myHeaders 
    networkProps['verifyPeerCertificate'] = false
    result = Rho::Network.post(networkProps, url_for(:action => :httpdown_callback))
    @@get_result = result["body"]
    render :action => :index, :back => '/app'
  end
  
  def httpGet
        networkProps = Hash.new
        networkProps['url'] = "http://192.168.6.27/rhodes/AsyncHttp/asyncget.php?data1=test&data2=test2"    
        result = Rho::Network.get(networkProps, url_for(:action => :httpdown_callback))
        @@get_result = result["body"]  
        render :action => :index, :back => '/app'
  end
  
  def headersTest
    #myHeaders = Hash.new
    #myHeaders['Content-Length'] = 19
    #networkProps['headers'] = myHeaders 
    #networkProps['responseTimeout'] = 10   
    #networkProps['url'] = "http://192.168.6.27/rhodes/readrequestheader.php"         
    #Rho::Network.get(networkProps, url_for(:action => :httpdown_callback))
    networkProps = Hash.new
    networkProps = {'headers' => {'Content-Length' => 19,
                    'User-Agent' =>'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0',
                    'From' => 'user@example.com',
                    'Accept-Datetime' => 'Thu, 31 May 2007 20:35:00 IST'
                    },
            'responseTimeout' => 10,
            'url' => "http://192.168.6.27/rhodes/readrequestheader.php"}
    
    Rho::Network.get(networkProps, url_for(:action => :httpdown_callback))
  
  end
  
  def testcancel
    networkProps = Hash.new
    networkProps['url'] = "http://www.apache.org/licenses/LICENSE-2.0"    
    Rho::Network.get(networkProps, url_for(:action => :httpdown_callback))    
  end
    
  def callcancel
     puts "calling cancel method"
     Rho::Network.cancel(url_for(:action => :httpdown_callback))
     @@get_result  = 'Request was cancelled.'
     render :action => :index, :back => '/app'
  end
     
  def httpdown_callback     
   puts "February: #{@params}"
    #Alert.show_popup "#{@params}"
    if @params['status'] != 'ok'
        @@error_params = @params
        Rho::WebView.navigate(url_for :action => :show_error)        
   else
       @@get_result = @params['body']
        Rho::WebView.navigate(url_for :action => :show_result)
   end
 end
  
#http://rhologs.herokuapp.com/client_log?client_id=&device_pin=&log_name=uptest
  #http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx
  def httpUploadFile
     #@@file_name = File.join(Rho::RhoApplication::get_model_path('app','Network'), "myfile.txt")
     @@file_name = File.join(Rho::RhoApplication::get_base_app_path(), 'test_upload.txt')
     puts @@file_name
    unless File.exists?(@@file_name)
       write_data  = "This upload file test using netowork api"
       f = File.new(@@file_name, "w")
       f.write(write_data)
       f.close
    end
      networkProps = Hash.new
      networkProps['filename'] = @@file_name
      networkProps['url'] = "http://rhologs.herokuapp.com/client_log?client_id=&device_pin=&log_name=uptest"
      Rho::Network.uploadFile(networkProps, url_for(:action => :upload_file_callback))
   end
  
  def httpUpload
      networkProps = Hash.new      
      networkProps['url'] = "http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx"
      networkProps['filename'] = Rho::Application.publicFolder+"/images/backButton.png"
      networkProps['body'] = "uploading file"
      networkProps['fileContentType'] = "image/png"
      Rho::Network.uploadFile(networkProps, url_for(:action => :upload_file_callback))
  end
  
  def upload_file_callback
    if @params['status'] == "ok"
        Alert.show_popup "Upload Succeeded."
    else
        Alert.show_popup "Upload Failed."
    end
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
 
  def stopDetecting
  Rho::Network.stopDetectingConnection(url_for(:action => :connectionEvent))
  end    
    
    def statusNotify
      #Rho::Network.startStatusNotify("#{@params['pollInterval']}", url_for(:action => :statusEvent))
      Rho::Network.startStatusNotify(3000, url_for(:action => :statusEvent))
      #Rho::Network.startStatusNotify(url_for(:action => :statusEvent))   
    end
    
  def statusNotifywithpoll
    Rho::Network.startStatusNotify("#{@params['pollInterval']}", url_for(:action => :statusEvent))
  end
  
  def statusEvent
   puts "Logfiledata: #{@params}"
   Alert.show_popup("Network status changed from #{@params["prev_status"]} to #{@params["current_status"]}")
   #Alert.show_popup "#{@params}"
    #puts "ConnectionEvent Called #{@params}"
    #if @params['connectionInformation'] == 'Disconnected'
       # Alert.show_popup "Ditection stoped"
        #Alert.show_popup "#{@params['failureMessage']}"
    #else
       # Alert.show_popup "Ditection Not Stopped"
   # end
  end 
    
    def stopNotify
       puts "calling stopStatusNotify method"
       Rho::Network.stopStatusNotify
      Alert.show_popup "Stopped network status notifications"
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
     #networkProps = "#{@params['connectionDestination']}"
     networkProps = "#{@params['wanDestinationText']}"
     puts "#{networkProps}"
     Rho::Network.connectWan(networkProps, url_for(:action => :connectionwanEvent))
  end
  
  def wanconnection
     networkProps = "#{@params['connectionDestination']}"
    puts "#{networkProps}"
     Rho::Network.connectWan(networkProps, url_for(:action => :connectionwanEvent))
  end
  
  def connectionwanEvent
    puts "Logfilewandata: #{@params}"
    resultHash = @params
    waninfo = "wan event info:- "
    if resultHash
                    
      waninfo += "phoneSignalStrength : " + resultHash["phoneSignalStrength"]
      waninfo += "networkOperator : " + resultHash["networkOperator"] 
      waninfo += "connectionTypeAvailable : " + resultHash["connectionTypeAvailable"] 
      waninfo += "connectionTypeConnected : " + resultHash["connectionTypeConnected"]    
      waninfo += "connectionManagerMessage : " + resultHash["connectionManagerMessage"]
   end
    
    puts "#{waninfo}"
    Rho::WebView.execute_js("setFieldValue('#{waninfo}')") 
  end
  
   def wanDisconnect
     puts "calling disconnectWan method"
     Rho::Network.disconnectWan
   end
  
  def Testpath
    @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test.jpg")
    puts @@get_img_result
  end 
   
  def securewebbrowsenotgiven
    Rho::WebView.navigate("http://192.168.6.18/NEON/secure/screen.jpg")
  end  
  
  def show_result
    render :action => :index, :back => '/app'
  end

  def show_error
    render :action => :error, :back  => '/app'
  end
   
  def get_res
    @@get_result    
  end
  
  def get_img_res
    @@get_img_result 
  end
  
  def get_img_re
    @@get_img_resu
  end

  def get_error
    @@error_params
  end

end
