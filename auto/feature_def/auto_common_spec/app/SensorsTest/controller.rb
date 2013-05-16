require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SensorsTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  @x = 0
  @y = 0
  @z = 0
  
  def myrunAccelerometer       
   puts "myrunAccelerometer params: #{@params}"
   @x = @params['x']
   @y = @params['y']             
   @z = @params['z']             
  end   
  
  def runAccelerometer
	Rho::Sensors.watchAccelerometer(200, url_for(:action => :myrunAccelerometer))
	sleep 10
	Rho::Sensors.stopAccelerometer
	if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
	@x = 0
	@y = 0
	@z = 0
	return result;
  end  
  
  def myrunTiltAngle       
   puts "myrunTiltAngle params: #{@params}"
   @x = @params['x']
   @y = @params['y']             
   @z = @params['z']             
  end   
  
  def runTiltAngle
	Rho::Sensors.watchTiltAngle(200, url_for(:action => :myrunTiltAngle))
	sleep 10
	Rho::Sensors.stopTiltAngle
	if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
	@x = 0
	@y = 0
	@z = 0
	return result;
  end 
  
  def myrunDeviceOrientation       
   puts "myrunDeviceOrientation params: #{@params}"
   @x = @params['value']             
  end   
  
  def runDeviceOrientation
	Rho::Sensors.watchDeviceOrientation(200, url_for(:action => :myrunDeviceOrientation))
	sleep 10
	Rho::Sensors.stopDeviceOrientation
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
	@x = 0
	@y = 0
	@z = 0
	return result;
  end 
  
 def myrunMotion       
   puts "myrunMotion params: #{@params}"
   x = @params['value']             
  end   
  
  def runMotion
	Rho::Sensors.watchMotion(200, url_for(:action => :myrunMotion))
	sleep 10
	Rho::Sensors.stopMotion
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myruneCompass       
   puts "myruneCompass params: #{@params}"
   @x = @params['value']              
  end   
  
  def runeCompass
	Rho::Sensors.watchECompass(200, url_for(:action => :myruneCompass))
	sleep 10
	Rho::Sensors.stopECompass
	if @x != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunMagnetometer       
   puts "myrunMagnetometer params: #{@params}"
   @x = @params['x']
   @y = @params['y']             
   @z = @params['z']             
  end   
  
  def runMagnetometer
	Rho::Sensors.watchMagnetometer(200, url_for(:action => :myrunMagnetometer))
	sleep 10
	Rho::Sensors.stopMagnetometer
    if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunGyroscope       
   puts "myrunGyroscope params: #{@params}"
   @x = @params['x']
   @y = @params['y']             
   @z = @params['z']             
  end   
  
  def runGyroscope
	Rho::Sensors.watchGyroscope(200, url_for(:action => :myrunGyroscope))
	sleep 10
	Rho::Sensors.stopGyroscope
    if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunAmbientLight       
   puts "myrunAmbientLight params: #{@params}"
  @x = @params['value']             
  end   
  
  def runAmbientLight
	Rho::Sensors.watchAmbientLight(200, url_for(:action => :myrunAmbientLight))
	sleep 10
	Rho::Sensors.stopAmbientLight
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunProximity       
   puts "myrunProximity params: #{@params}"
   @x = @params['value']              
  end   
  
  def runProximity
	Rho::Sensors.watchProximity(200, url_for(:action => :myrunProximity))
	sleep 10
	Rho::Sensors.stopProximity
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunProximityLongRange       
   puts "myrunProximityLongRange params: #{@params}"
   @x = @params['value']   
  end   
  
  def runProximityLongRange
	Rho::Sensors.watchProximityLongRange(200, url_for(:action => :myrunProximityLongRange))
	sleep 10
	Rho::Sensors.stopProximityLongRange
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunPressure       
   puts "myrunPressure params: #{@params}"
   @x = @params['value']       
  end   
  
  def runPressure
	Rho::Sensors.watchPressure(200, url_for(:action => :myrunPressure))
	sleep 10
	Rho::Sensors.stopPressure
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunTemperature       
   puts "myrunTemperature params: #{@params}"
   @x = @params['value']        
  end   
  
  def runTemperature
	Rho::Sensors.watchTemperature(200, url_for(:action => :myrunTemperature))
	sleep 10
	Rho::Sensors.stopTemperature
	if @x != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end 
  
  def myrunHumidity       
   puts "myrunHumidity params: #{@params}"
   @x = @params['value']       
  end   
  
  def runHumidity
	Rho::Sensors.watchHumidity(200, url_for(:action => :myrunHumidity))
	sleep 10
	Rho::Sensors.stopHumidity
	if @x != 0 
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end
  
  def myrunGravity       
   puts "myrunGravity params: #{@params}"
   @x = @params['x']
   @y = @params['y']             
   @z = @params['z']             
  end   
  
  def runGravity
	Rho::Sensors.watchGravity(200, url_for(:action => :myrunGravity))
	sleep 10
	Rho::Sensors.stopGravity
    if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end
  
  def myrunLinearAcceleration       
   puts "myrunLinearAcceleration params: #{@params}"
    @x = @params['x']
    @y = @params['y']             
    @z = @params['z']            
  end   
  
  def runLinearAcceleration
	Rho::Sensors.watchLinearAcceleration(200, url_for(:action => :myrunLinearAcceleration))
	sleep 10
	Rho::Sensors.stopLinearAcceleration
    if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end
  
  def myrunRotation       
   puts "myrunRotation params: #{@params}"
    @x = @params['x']
    @y = @params['y']             
    @z = @params['z']             
  end   
  
  def runRotation
	Rho::Sensors.watchRotation(200, url_for(:action => :myrunRotation))
	sleep 10
	Rho::Sensors.stopRotation
    if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end
  
  def myrunOrientation       
   puts "myrunOrientation params: #{@params}"
    @x = @params['x']
    @y = @params['y']             
    @z = @params['z']             
  end   
  
  def runOrientation
	Rho::Sensors.watchOrientation(200, url_for(:action => :myrunOrientation))
	sleep 10
	Rho::Sensors.stopOrientation
	if @x != 0 && @y != 0 && @z != 0
		result = "true"
	else
		result = "false"
	end
	puts result
	render :json => result
    @x = 0
    @y = 0
    @z = 0
	return result;
  end
  
  #@@test_proc = lambda{|args| puts "lamda: #{args}"}
  def index
  render :back => '/app/SensorsTest'
  end
  
end
