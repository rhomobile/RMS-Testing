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
   @x = @params['accelerometer_x']
   @y = @params['accelerometer_y']             
   @z = @params['accelerometer_z']             
  end   
  
  def runAccelerometer
	@accelerometer_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_ACCELEROMETER)
    if @accelerometer_sensor != nil
        @accelerometer_sensor.minimumGap = 500
        @accelerometer_sensor.start(url_for(:action => :myrunAccelerometer))
    else
       puts "Warning: This device does not have Accelerometer sensor !"
    end 
	
	sleep 10
	if @accelerometer_sensor != nil
        @accelerometer_sensor.stop
    end 
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
   @x = @params['tiltangle_x']
   @y = @params['tiltangle_y']             
   @z = @params['tiltangle_z']             
  end   
  
  def runTiltAngle
	@tiltangle_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_TILT_ANGLE)
    if @tiltangle_sensor != nil
        @tiltangle_sensor.minimumGap = 500
        @tiltangle_sensor.start(url_for(:action => :myrunTiltAngle))
    else
       puts "Warning: This device does not have Tilt Angle sensor !"
    end 
	
	sleep 10
	if @tiltangle_sensor != nil
        @tiltangle_sensor.stop
    end 
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
   @x = @params['deviceorientation_value']             
  end   
  
  def runDeviceOrientation
	@deviceOrientation_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_DEVICE_ORIENTATION)
    if @deviceOrientation_sensor != nil
        @deviceOrientation_sensor.minimumGap = 500
        @deviceOrientation_sensor.start(url_for(:action => :myrunDeviceOrientation))
    else
       puts "Warning: This device does not have Device Orientation sensor !"
    end 
	
	sleep 10
	if @deviceOrientation_sensor != nil
        @deviceOrientation_sensor.stop
    end
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
   x = @params['motion_value']             
  end   
  
  def runMotion
	@motion_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_MOTION)
    if @motion_sensor != nil
        @motion_sensor.minimumGap = 500
        @motion_sensor.start(url_for(:action => :myrunMotion))
    else
       puts "Warning: This device does not have Motion sensor !"
    end 
	
	sleep 10
	if @motion_sensor != nil
        @motion_sensor.stop
    end
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
   @x = @params['ecompass_value']              
  end   
  
  def runeCompass
	@ecompass_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_ECOMPASS)
    if @ecompass_sensor != nil
        @ecompass_sensor.minimumGap = 500
        @ecompass_sensor.start(url_for(:action => :myruneCompass))
    else
       puts "Warning: This device does not have eCompass sensor !"
    end 
	
	sleep 10
	if @ecompass_sensor != nil
        @ecompass_sensor.stop
    end
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
   @x = @params['magnetometer_x']
   @y = @params['magnetometer_y']             
   @z = @params['magnetometer_z']             
  end   
  
  def runMagnetometer
	@magnetometer_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_MAGNETOMETER)
    if @magnetometer_sensor != nil
        @magnetometer_sensor.minimumGap = 500
        @magnetometer_sensor.start(url_for(:action => :myrunMagnetometer))
    else
       puts "Warning: This device does not have magnetometer sensor !"
    end 
	
	sleep 10
	if @magnetometer_sensor != nil
        @magnetometer_sensor.stop
    end
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
   @x = @params['gyroscope_x']
   @y = @params['gyroscope_y']             
   @z = @params['gyroscope_z']             
  end   
  
  def runGyroscope
	@gyroscope_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_GYROSCOPE)
    if @gyroscope_sensor != nil
        @gyroscope_sensor.minimumGap = 500
        @gyroscope_sensor.start(url_for(:action => :myrunGyroscope))
    else
       puts "Warning: This device does not have gyroscope sensor !"
    end 
	
	sleep 10
	if @gyroscope_sensor != nil
        @gyroscope_sensor.stop
    end
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
  @x = @params['ambientlight_value']             
  end   
  
  def runAmbientLight
	@ambientlight_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_AMBIENT_LIGHT)
    if @ambientlight_sensor != nil
        @ambientlight_sensor.minimumGap = 500
        @ambientlight_sensor.start(url_for(:action => :myrunAmbientLight))
    else
       puts "Warning: This device does not have ambient light sensor !"
    end 
	
	sleep 10
	if @ambientlight_sensor != nil
        @ambientlight_sensor.stop
    end
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
   @x = @params['proximity_value']              
  end   
  
  def runProximity
	@proximity_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_PROXIMITY)
    if @proximity_sensor != nil
        @proximity_sensor.minimumGap = 500
        @proximity_sensor.start(url_for(:action => :myrunProximity))
    else
       puts "Warning: This device does not have proximity sensor !"
    end 
	
	sleep 10
	if @proximity_sensor != nil
        @proximity_sensor.stop
    end
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
   @x = @params['proximitylongrange_value']   
  end   
  
  def runProximityLongRange
	@proximitylongrange_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_PROXIMITY_LONG_RANGE)
    if @proximitylongrange_sensor != nil
        @proximitylongrange_sensor.minimumGap = 500
        @proximitylongrange_sensor.start(url_for(:action => :myrunProximityLongRange))
    else
       puts "Warning: This device does not have proximity long range sensor !"
    end 
	
	sleep 10
	if @proximitylongrange_sensor != nil
        @proximitylongrange_sensor.stop
    end
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
   @x = @params['pressure_value']       
  end   
  
  def runPressure
	@pressure_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_PRESSURE)
    if @pressure_sensor != nil
        @pressure_sensor.minimumGap = 500
        @pressure_sensor.start(url_for(:action => :myrunPressure))
    else
       puts "Warning: This device does not have pressure sensor !"
    end 
	
	sleep 10
	if @pressure_sensor != nil
        @pressure_sensor.stop
    end
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
   @x = @params['temperature_value']        
  end   
  
  def runTemperature
	@temperature_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_TEMPERATURE)
    if @temperature_sensor != nil
        @temperature_sensor.minimumGap = 500
        @temperature_sensor.start(url_for(:action => :myrunTemperature))
    else
       puts "Warning: This device does not have temperature sensor !"
    end 
	
	sleep 10
	if @temperature_sensor != nil
        @temperature_sensor.stop
    end
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
   @x = @params['humidity_value']       
  end   
  
  def runHumidity
	@humidity_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_HUMIDITY)
    if @humidity_sensor != nil
        @humidity_sensor.minimumGap = 500
        @humidity_sensor.start(url_for(:action => :myrunHumidity))
    else
       puts "Warning: This device does not have humidity sensor !"
    end 
	
	sleep 10
	if @humidity_sensor != nil
        @humidity_sensor.stop
    end
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
   @x = @params['gravity_x']
   @y = @params['gravity_y']             
   @z = @params['gravity_z']             
  end   
  
  def runGravity
	@gravity_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_GRAVITY)
    if @gravity_sensor != nil
        @gravity_sensor.minimumGap = 500
        @gravity_sensor.start(url_for(:action => :myrunGravity))
    else
       puts "Warning: This device does not have gravity sensor !"
    end 
	
	sleep 10
	if @gravity_sensor != nil
        @gravity_sensor.stop
    end
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
    @x = @params['linearacceleration_x']
    @y = @params['linearacceleration_y']             
    @z = @params['linearacceleration_z']            
  end   
  
  def runLinearAcceleration
	@linearacceleration_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_LINEAR_ACCELERATION)
    if @linearacceleration_sensor != nil
        @linearacceleration_sensor.minimumGap = 500
        @linearacceleration_sensor.start(url_for(:action => :myrunLinearAcceleration))
    else
       puts "Warning: This device does not have linear acceleration sensor !"
    end 
	
	sleep 10
	if @linearacceleration_sensor != nil
        @linearacceleration_sensor.stop
    end
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
    @x = @params['rotation_x']
    @y = @params['rotation_y']             
    @z = @params['rotation_z']             
  end   
  
  def runRotation
	@rotation_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_ROTATION)
    if @rotation_sensor != nil
        @rotation_sensor.minimumGap = 500
        @rotation_sensor.start(url_for(:action => :myrunRotation))
    else
       puts "Warning: This device does not have rotation sensor !"
    end 
	
	sleep 10
	if @rotation_sensor != nil
        @rotation_sensor.stop
    end
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
    @x = @params['orientation_x']
    @y = @params['orientation_y']             
    @z = @params['orientation_z']             
  end   
  
  def runOrientation
	@orientation_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_ORIENTATION)
    if @orientation_sensor != nil
        @orientation_sensor.minimumGap = 500
        @orientation_sensor.start(url_for(:action => :myrunOrientation))
    else
       puts "Warning: This device does not have orientation sensor !"
    end 
	
	sleep 10
	if @orientation_sensor != nil
        @orientation_sensor.stop
    end
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
