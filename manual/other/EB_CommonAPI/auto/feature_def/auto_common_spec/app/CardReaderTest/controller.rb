require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class CardReaderTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  def myswipeevent
     puts "Swipe params: #{@params}"
     puts "Mode is #{@params['mode']}"
     puts "Data is #{@params['data']}"       
     WebView.execute_js("onSwipeEventRuby('#{@params['data']}','#{@params['mode']}'}');") 
  end   
  
  def funget
	Rho::CardReader.setProperties :autoTab => 'TRUE', :autoEnter => 'TRUE' 
    vAutoTab    = Rho::CardReader.getProperty("autoTab")
    vAutoEnter  = Rho::CardReader.getProperty("autoEnter")
	result   = "autoTab:- #{vAutoTab} autoEnter:- #{vAutoEnter}"
	puts result
	render :json => result
	return result;
  end
  
  def fungetall   
	Rho::CardReader.clearAllProperties  
    propValues = Rho::CardReader.getAllProperties 	
	result  = "timeout:- #{propValues['pinTimeout']} entry:- #{propValues['pinEntry']} panData:- #{propValues['panData']} tab:- #{propValues['autoTab']} enter:- #{propValues['autoEnter']} module:- #{propValues['moduleName']}"
	puts result
	render :json => result
	return result;	
  end
  
  def funopen     
    Rho::CardReader.open(url_for(:action => :myswipeevent))
	#We should have a property that should say whether the Card reader is opened or not
	result = "true"
    render :json => result
	return result;
  end
    
  def funclose      
    Rho::CardReader.close 
	#We should have a property that should say whether the Card reader is opened or not
	result = "true"
    render :json => result
	return result;
  end   
  
  #@@test_proc = lambda{|args| puts "lamda: #{args}"}
  def index
  render :back => '/app/CardReaderTest'
  end

 
end
