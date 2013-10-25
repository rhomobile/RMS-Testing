require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class VideoCaptureTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  def mysaveevent       
       puts "Save params: #{@params}"
       puts "Result is #{@params['transferResult']}"
       puts "Name is #{@params['fileName']}"       
       puts "Size is #{@params['fileSize']}"               
  end   
  
  def funget
	Rho::Videocapture.fileName = '/RhoVideoCapture'
    Rho::Videocapture.duration = 30000
	Rho::Videocapture.saveToGallery = true
    Rho::Videocapture.resolution = 'LOW'
    vFileName    = Rho::Videocapture.getProperty("fileName")
    vDuration  = Rho::Videocapture.getProperty("duration")
	vSave  = Rho::Videocapture.getProperty("saveToGallery")   
    vRes  = Rho::Videocapture.getProperty("resolution")  
	result = "fileName:- #{vFileName} duration:- #{vDuration} Gallery:- #{vSave} Resolution:- #{vRes}"
	puts result
	render :json => result
	return result;
  end
  
  def fungetall  
	Rho::Videocapture.clearAllProperties  
    propValues = Rho::Videocapture.getAllProperties 	
	result = "fileName:- #{propValues['fileName']} duration:- #{propValues['duration']} Gallery:- #{propValues['saveToGallery']} Resolution:- #{propValues['resolution']}"
	puts result
	render :json => result
	return result;
  end
  
  def funstart  
	#Currently we cannot automate the video capture process as it requires manual intercation
    #Rho::Videocapture.start(url_for(:action => :mysaveevent))
	#We should have a property that should say whether the video capture is in progress
	result = "true"
    render :json => result 
	return result;
  end
    
  def funstop      
    #Currently we cannot automate the video capture process as it requires manual intercation
    #Rho::Videocapture.start(url_for(:action => :mysaveevent))
	#We should have a property that should say whether the video capture is in progress
	result = "true"
    render :json => result
	return result;
  end   
  
  #@@test_proc = lambda{|args| puts "lamda: #{args}"}
  def index
  render :back => '/app/VideoCaptureTest'
  end

 
end
