require 'rho/rhocontroller'
require 'helpers/browser_helper'

class VideocaptureController < Rho::RhoController
  include BrowserHelper
  @layout = 'Videocapture/layout'
  
  def funminimize
    Rho::Application.minimize
  end 

  def setduration_10000
    Rho::Videocapture.duration = 10000
  end
  
  def setduration_500
    Rho::Videocapture.duration = 500
  end
  
  def setduration_nagative
    Rho::Videocapture.duration = -1000
  end
  
  def setduration_invalid
    Rho::Videocapture.duration = abcd
  end
  
  def setduration_empty
    Rho::Videocapture.duration = ''
  end
  
  def setandroidrootfileName
    Rho::Videocapture.fileName = '/RhoVideoCapture'
  end
  
  def setandroidfileName
    Rho::Videocapture.fileName = '/Application/RhoVideoCapture'
  end
  
  def setandroidinvalidpath
    Rho::Videocapture.fileName = '/invalid/RhoVideoCapture'
  end
  
  def setandroidinvalidfilename
    Rho::Videocapture.fileName = '/Application/1a3_$'
  end
  
  def setandroidemptyfilename
    Rho::Videocapture.fileName = ''
  end
  
  def setwmrootfileName
    Rho::Videocapture.fileName = '\RhoVideoCapture'
  end
  
  def setwmfileName
    Rho::Videocapture.fileName = '\Application\RhoVideoCapture'
  end
  
  def setwminvalidpath
    Rho::Videocapture.fileName = '\invalid\RhoVideoCapture'
  end
  
  def setwminvalidfilename
    Rho::Videocapture.fileName = '\Application\1a3_$'
  end
  
  def setwmemptyfilename
    Rho::Videocapture.fileName = ''
  end
  
  def setresolutionhigh
    Rho::Videocapture.resolution = 'high'
  end
  
  def setresolutionlow
    Rho::Videocapture.resolution = 'low'
  end
  
  def setresolutioninvalid
    Rho::Videocapture.resolution = 'abcd'
  end
  
  def setresolutionempty
    Rho::Videocapture.resolution = ''
  end  
  
  def savetogallerytrue
    Rho::Videocapture.saveToGallery = true
  end
  
  def savetogalleryfalse
    Rho::Videocapture.saveToGallery = false
  end
  
  def savetogalleryinvalid
    Rho::Videocapture.saveToGallery = invalid
  end
  
  def savetogalleryempty
    Rho::Videocapture.saveToGallery = ''
  end
  
  def setpropduration_15000
      Rho::Videocapture.setProperty('duration','15000')
  end
  
  def setpropduration_400
      Rho::Videocapture.setProperty('duration','400')
  end
  
  def setpropduration_nagative
      Rho::Videocapture.setProperty('duration','-6000')
  end
  
  def setpropduration_invalid
      Rho::Videocapture.setProperty('duration','abcd')
  end
  
  def setpropduration_empty
      Rho::Videocapture.setProperty('duration','')
  end
  
  def setpropandroidrootfileName
      Rho::Videocapture.setProperty('fileName','/RhoVideoCapture')
  end
  
  def setpropandroidfileName
      Rho::Videocapture.setProperty('fileName','/Application/RhoVideoCapture')
  end
  
  def setpropandroidinvalpath
      Rho::Videocapture.setProperty('fileName','/invalid/RhoVideoCapture')
  end
  
  def setpropandroidinvalname
      Rho::Videocapture.setProperty('fileName','/Application/1a3_$')
  end
  
  def setpropandroidemptyname
      Rho::Videocapture.setProperty('fileName','')
  end
  
  def setpropwmrootfileName
      Rho::Videocapture.setProperty('fileName','\RhoVideoCapture')
  end
  
  def setpropwmfileName
      Rho::Videocapture.setProperty('fileName','\Application\RhoVideoCapture')
  end
  
  def setpropwminvalidpath
      Rho::Videocapture.setProperty('fileName','\invalid\RhoVideoCapture')
  end
  
  def setpropwminvalidfilename
      Rho::Videocapture.setProperty('fileName','\Application\1a3_$')
  end
  
  def setpropwmemptyfilename
      Rho::Videocapture.setProperty('fileName','')
  end
  
  def setpropresolutionhigh
      Rho::Videocapture.setProperty('resolution','high')
  end
  
  def setpropresolutionlow
      Rho::Videocapture.setProperty('resolution','low')
  end
  
  def setpropresolutioninvalid
      Rho::Videocapture.setProperty('resolution','abcd')
  end
  
  def setpropresolutionempty
      Rho::Videocapture.setProperty('resolution','')
  end
  
  def savetopropgallerytrue
      Rho::Videocapture.setProperty('saveToGallery',true)
  end
  
  def savetopropgalleryfalse
      Rho::Videocapture.setProperty('saveToGallery',false)
  end
  
  def savetopropgalleryinvalid
      Rho::Videocapture.setProperty('saveToGallery',invlaid)
  end
  
  def savetopropgalleryempty
      Rho::Videocapture.setProperty('saveToGallery','')
  end
  
  def setvideoandroidProperties
   myProps = {'duration'=>20000, 'fileName'=>'/Temp/RhoVideoCapture', 'resolution'=>'high', 'saveToGallery'=>true}
   Rho::Videocapture.setProperties(myProps)  
  end
  
  def setvideowmProperties
   myProps = {'duration'=>20000, 'fileName'=>'\Temp\RhoVideoCapture', 'resolution'=>'high', 'saveToGallery'=>true}
   Rho::Videocapture.setProperties(myProps)  
  end
  
  def setdefaultprop
    myvar = Array.new
    myvar = Rho::Videocapture.enumerate
    Rho::Videocapture.setDefault(myvar)   
  end
  
  def enum     
    myvar = Array.new
    myvar = Rho::Videocapture.enumerate
    Rho::WebView.execute_js("setFieldValue('#{myvar}')") 
    puts "available card readers: #{myvar}"
  end
  
  def getpropGallery
    myvar = Rho::Videocapture.getProperty('saveToGallery')
    puts "saveToGallery : #{myvar}"
    #Alert.show_popup "#{myvar}"   
    Rho::WebView.execute_js("setFieldValue('#{myvar}')") 
  end
  
  def getpropresolution
    myvar = Rho::Videocapture.getProperty('resolution')
    puts "resolution : #{myvar}"
    Rho::WebView.execute_js("setFieldValue('#{myvar}')") 
  end
  
  def getpropduration
    myvar = Rho::Videocapture.getProperty('duration')
    puts "duration : #{myvar}"
    Rho::WebView.execute_js("setFieldValue('#{myvar}')")   
  end
  
  def getpropfileName
    myvar = Rho::Videocapture.getProperty('fileName')
    puts "fileName : #{myvar}"
    Rho::WebView.execute_js("setFieldValue('#{myvar}')")   
  end
  
  def getvideoProperties
   myvar = Hash.new 
   myProps = ['saveToGallery','resolution','duration','pinEntry','fileName']
   myvar = Rho::Videocapture.getProperties(myProps)
   puts "getallProps: #{myvar}" 
   Rho::WebView.execute_js("setFieldValue('#{myvar}')") 
  end
  
  def getAllvideoProperties
    myValue = Hash.new
    myValue = Rho::Videocapture.getAllProperties
    puts "getAllvideoProperties : #{myValue}"
    Rho::WebView.execute_js("setFieldValue('#{myValue}')") 
  end
  
  def getdefaultprop
    myValue = Array.new
    myValue = Rho::Videocapture.getDefault
    puts "getdefaultprop : #{myValue}"
    Rho::WebView.execute_js("setFieldValue('#{myValue}')")
  end
  
  def allPropsclear
    Rho::Videocapture.clearAllProperties   
  end   
  
  def videostart
      Rho::Videocapture.start(url_for(:action => :mysaveevent))
  end  

  def startwithoutevent
       Rho::Videocapture.start
  end
  
  def videostop
       Rho::Videocapture.stop
  end
  
  def videocancel
       Rho::Videocapture.cancel
  end
  
  def mysaveevent       
       puts "Save params: #{@params}"
       resultHash = @params
    transinfo = "Result is:- "
    if resultHash                        
       transinfo += "Transfer : " + resultHash["transferResult"]
       transinfo += "FilePath : " + resultHash["fileName"] 
       transinfo += "SizeofFile : " + resultHash["size"] 
    end        
       Rho::WebView.execute_js("setFieldValue('#{transinfo}')")            
  end 
  
end
