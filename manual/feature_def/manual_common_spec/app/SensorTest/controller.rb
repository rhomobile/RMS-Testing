require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SensorTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper

  @layout = 'SensorTest/layout'

  $accelerator_x = ''
  $accelerator_y = ''
  $accelerator_z = ''
  $magnetometer_x = ''
  $magnetometer_y = ''
  $magnetometer_z = ''

  $accelerator_available = false
  $magnetometer_available = false


  def index
    $accelerometer_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_ACCELEROMETER)
    $magnetometer_sensor = Rho::Sensor.makeSensorByType(Rho::Sensor::SENSOR_TYPE_MAGNETOMETER)
    $accelerator_available = $accelerometer_sensor != nil
    $magnetometer_available = $magnetometer_sensor != nil
    render :back => '/app'
  end

  def sensors_callback
      if  @params['status'] == 'ok'
           accelerometer_x = @params['accelerometer_x']
           if accelerometer_x != nil
               WebView.execute_js('document.getElementById("id_accelerometer_x").value="'+accelerometer_x.to_s+'"')
           end
           accelerometer_y = @params['accelerometer_y']
           if accelerometer_y != nil
               WebView.execute_js('document.getElementById("id_accelerometer_y").value="'+accelerometer_y.to_s+'"')
           end
           accelerometer_z = @params['accelerometer_z']
           if accelerometer_z != nil
               WebView.execute_js('document.getElementById("id_accelerometer_z").value="'+accelerometer_z.to_s+'"')
           end
           magnetometer_x = @params['magnetometer_x']
           if magnetometer_x != nil
               WebView.execute_js('document.getElementById("id_magnetometer_x").value="'+magnetometer_x.to_s+'"')
           end
           magnetometer_y = @params['magnetometer_y']
           if magnetometer_y != nil
               WebView.execute_js('document.getElementById("id_magnetometer_y").value="'+magnetometer_y.to_s+'"')
           end
           magnetometer_z = @params['magnetometer_z']
           if magnetometer_z != nil
               WebView.execute_js('document.getElementById("id_magnetometer_z").value="'+magnetometer_z.to_s+'"')
           end
      else
          puts 'RawSensorsTest::sensors callback - receive ERROR !'
      end
  end

  def sensors_fake_callback
  end


  def fire_update
      if $accelerometer_sensor != nil
           data = $accelerometer_sensor.readData
           accelerometer_x = data['accelerometer_x']
           if accelerometer_x != nil
               WebView.execute_js('document.getElementById("id_accelerometer_x").value="'+accelerometer_x.to_s+'"')
           end
           accelerometer_y = data['accelerometer_y']
           if accelerometer_y != nil
               WebView.execute_js('document.getElementById("id_accelerometer_y").value="'+accelerometer_y.to_s+'"')
           end
           accelerometer_z = data['accelerometer_z']
           if accelerometer_z != nil
               WebView.execute_js('document.getElementById("id_accelerometer_z").value="'+accelerometer_z.to_s+'"')
           end
      end	
      if $magnetometer_sensor != nil
           data = $magnetometer_sensor.readData
          magnetometer_x = data['magnetometer_x']
           if magnetometer_x != nil
               WebView.execute_js('document.getElementById("id_magnetometer_x").value="'+magnetometer_x.to_s+'"')
           end
           magnetometer_y =data['magnetometer_y']
           if magnetometer_y != nil
               WebView.execute_js('document.getElementById("id_magnetometer_y").value="'+magnetometer_y.to_s+'"')
           end
           magnetometer_z = data['magnetometer_z']
           if magnetometer_z != nil
               WebView.execute_js('document.getElementById("id_magnetometer_z").value="'+magnetometer_z.to_s+'"')
           end
      end	
  end

  def start_acc_update
      puts 'Accelerometer start update'
      if $accelerometer_sensor != nil
           $accelerometer_sensor.minimumGap = 200
           $accelerometer_sensor.start url_for(:action => :sensors_callback)
      end	
  end

  def stop_acc_update
      puts 'Accelerometer stop update'
      if $accelerometer_sensor != nil
           $accelerometer_sensor.stop
      end      
      WebView.execute_js('document.getElementById("id_accelerometer_x").value=""')
      WebView.execute_js('document.getElementById("id_accelerometer_y").value=""')
      WebView.execute_js('document.getElementById("id_accelerometer_z").value=""')
  end


  def start_mag_update
      puts 'Accelerometer start update'
      if $magnetometer_sensor != nil
           $magnetometer_sensor.minimumGap = 1000
           $magnetometer_sensor.start url_for(:action => :sensors_callback)
      end	
  end

  def stop_mag_update
      puts 'Accelerometer stop update'
      if $magnetometer_sensor != nil
           $magnetometer_sensor.stop
      end	
      WebView.execute_js('document.getElementById("id_magnetometer_x").value=""')
      WebView.execute_js('document.getElementById("id_magnetometer_y").value=""')
      WebView.execute_js('document.getElementById("id_magnetometer_z").value=""')

  end

  def start_acc_fake_update
      if $accelerometer_sensor != nil
           $accelerometer_sensor.minimumGap = 20000000
           $accelerometer_sensor.start url_for(:action => :sensors_fake_callback)
      end	
  end

  def start_mag_fake_update
      if $magnetometer_sensor != nil
           $magnetometer_sensor.minimumGap = 20000000
           $magnetometer_sensor.start url_for(:action => :sensors_fake_callback)
      end	
  end
  
end
