require 'rho/rhocontroller'
require 'helpers/browser_helper'

class RawSensorController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def callgetsensorData
    Alert.show_popup("getSensorData called")
    RawSensors.getSensorData
   
    redirect :action => :index
  end
  
  def registersensorEvent
    #Alert.show_popup("attaching sensorEvent")
    myeventvalue = @params['selectsensorEvent']
    puts "attaching sensorEvent"  
         if myeventvalue == "JavaScript"
           RawSensors.sensorEvent = url_for(:action => :mysensorEvent)
         elsif myeventvalue == "DETACHEVENT"
           RawSensors.sensorEvent = ''
         elsif myeventvalue == "EMPTYEVENT"
           RawSensors.sensorEvent =''
         end

    redirect :action => :index
  end
  
  def mysensorEvent
#    Alert.show_popup("In mysensorEvent")
    puts "In mysensorEvent"  
    sensorData = @params

    myaccelerometerX = sensorData["accelerometerX"]
    myaccelerometerY = sensorData["accelerometerY"]  
    myaccelerometerZ = sensorData["accelerometerZ"]
    mydeviceOrientation = sensorData["deviceOrientation"]
    mytiltangleX = sensorData["tiltangleX"]
    mytiltangleY = sensorData["tiltangleY"] 
    mytiltangleZ = sensorData["tiltangleZ"]
    mymotion = sensorData["motion"]  
    myecompass = sensorData["ecompass"]
    mymagnetometerX = sensorData["magnetometerX"]
    mymagnetometerY = sensorData["magnetometerY"]
    mymagnetometerZ = sensorData["magnetometerZ"] 
    mygyroscopeX = sensorData["gyroscopeX"]
    mygyroscopeY = sensorData["gyroscopeY"]  
    mygyroscopeZ = sensorData["gyroscopeZ"]
    myambientLight = sensorData["ambientLight"]
    myproximity = sensorData["proximity"]
    myproximitylongrange = sensorData["proximitylongrange"] 
    mypressure = sensorData["pressure"]
    mytemperature= sensorData["temperature"]  
    myhumidity = sensorData["humidity"]
    mygravityX = sensorData["gravityX"]
    mygravityY = sensorData["gravityY"]
    mygravityZ = sensorData["gravityZ"]        
    mylinearAccelerationX = sensorData["linearAccelerationX"]
    mylinearAccelerationY = sensorData["linearAccelerationY"]
    mylinearAccelerationZ = sensorData["linearAccelerationZ"] 
    myrotationX = sensorData["rotationX"]
    myrotationY = sensorData["rotationY"]  
    myrotationZ = sensorData["rotationZ"]
    myorientationX = sensorData["orientationX"]
    myorientationY = sensorData["orientationY"]  
    myorientationZ = sensorData["orientationZ"]
        
    rawsensordata="AccelerometerX:- "+myaccelerometerX+"  AccelerometerY:- "+myaccelerometerY+"  AccelerometerZ:- "+myaccelerometerZ+"<br/>"+
                  "DeviceOrientation:- "+mydeviceOrientation+"<br/>"+
                  "TiltX:- "+mytiltangleX+"  TiltY:- "+mytiltangleY+"  TiltZ:- "+mytiltangleZ+"<br/>"+
                  "Motion:- "+mymotion+"<br/>"+
                  "Ecompass:- "+myecompass+"<br/>"+
                  "MagnetometerX:- "+mymagnetometerX+"  MagnetometerY:- "+mymagnetometerY+"  MagnetometerZ:- "+mymagnetometerZ+"<br/>"+
                  "GyroscopeX:- "+mygyroscopeX+"  GyroscopeY:- "+mygyroscopeY+"  GyroscopeZ:- "+mygyroscopeZ+"<br/>"+                  
                  "AmbientLight:- "+myambientLight+"<br/>"+
                  "Proximity:- "+myproximity+"<br/>"+
                  "Proximitylongrange:- "+myproximitylongrange+"<br/>"+
                  "Pressure:- "+mypressure+"<br/>"+
                  "Temperature:- "+mytemperature+"<br/>"+
                  "Humidity:- "+myhumidity+"<br/>"+
                  "GravityX:- "+mygravityX+"  GravityY:- "+mygravityY+"  GravityZ:- "+mygyroscopeZ+"<br/>"+                  
                  "LinearAccelerationX:- "+mylinearAccelerationX+"  LinearAccelerationY:- "+mylinearAccelerationY+"  LinearAccelerationZ:- "+mylinearAccelerationZ+"<br/>"+ 
                  "RotationX:- "+myrotationX+"  RotationY:- "+myrotationY+"  RotationZ:- "+myrotationZ+"<br/>"+ 
                  "OrientationX:- "+myorientationX+"  OrientationY:- "+myorientationY+"  OrientationZ:- "+myorientationZ+"<br/>"
                  
#    Alert.show_popup("AccelerometerX:- "+myaccelerometerX)                  
#    Alert.show_popup("Data:- "+mydata+"  Source:- "+mysource+"  Type:- "+mytype+"  Time:- "+mytime+"  Length:- "+mylength+"  Event:- "+myevent)
    
    WebView.execute_js('setFieldValue("'+rawsensordata+'")') 
    
  end
    
  def setallSensor
      myallvalue = @params['selectall']
      RawSensors.all=myallvalue
      #Alert.show_popup("myallvalue")
      redirect :action => :index
    end
    
  def setaccelerometer
     accelerometervalue = @params['selectaccelerometer']
     RawSensors.accelerometer=accelerometervalue
     #Alert.show_popup("accelerometervalue")
     redirect :action => :index
   end
   
   def setdeviceOrientation
     deviceOrientationvalue = @params['selectdeviceOrientation']
     RawSensors.deviceOrientation=deviceOrientationvalue
     #Alert.show_popup("deviceOrientationvalue")
     redirect :action => :index
   end
   
   def settiltangle
     tiltanglevalue = @params['selecttiltangle']
     RawSensors.tiltangle=tiltanglevalue
     #Alert.show_popup("tiltanglevalue")
     redirect :action => :index
   end
   
   def setmotion
     motionvalue = @params['selectmotion']
     RawSensors.motion=motionvalue
     #Alert.show_popup("motionvalue")
     redirect :action => :index
   end
   
   def setecompass
     ecompassvalue = @params['selectecompass']
     RawSensors.ecompass=ecompassvalue
     #Alert.show_popup("ecompassvalue")
     redirect :action => :index
   end
   
   def setmagnetometer
     magnetometervalue = @params['selectmagnetometer']
     RawSensors.magnetometer=magnetometervalue
     #Alert.show_popup("magnetometervalue")
     redirect :action => :index
   end
   
   def setgyroscope
     gyroscopevalue = @params['selectgyroscope']
     RawSensors.gyroscope=gyroscopevalue
     #Alert.show_popup("gyroscopevalue")
     redirect :action => :index
   end 
   
   def setambientlight
     ambientlightvalue = @params['selectambientlight']
     RawSensors.ambientlight=ambientlightvalue
     #Alert.show_popup("ambientlightvalue")
     redirect :action => :index
   end 
   
   def setproximity
     proximityvalue = @params['selectproximity']
     RawSensors.proximity=proximityvalue
     #Alert.show_popup("proximityvalue")
     redirect :action => :index
   end
   
   def setproximitylongrange
     proximitylongrangevalue = @params['selectproximitylongrange']
     RawSensors.proximitylongrange=proximitylongrangevalue
     #Alert.show_popup("proximitylongrangevalue")
     redirect :action => :index
   end
   
   def setpressure
     pressurevalue = @params['selectpressure']
     RawSensors.pressure=pressurevalue
     #Alert.show_popup("pressurevalue")
     redirect :action => :index
   end
   
   def settemperature
     temperaturevalue = @params['selecttemperature']
     RawSensors.temperature=temperaturevalue
     #Alert.show_popup("temperaturevalue")
     redirect :action => :index
   end
   
   def sethumidity
     humidityvalue = @params['selecthumidity']
     RawSensors.humidity=humidityvalue
     #Alert.show_popup("humidityvalue")
     redirect :action => :index
   end
   
   def setgravity
     gravityvalue = @params['selectgravity']
     RawSensors.gravity=gravityvalue
     #Alert.show_popup("gravityvalue")
     redirect :action => :index
   end
   
   def setlinearAcceleration
     linearAccelerationvalue = @params['selectlinearAcceleration']
     RawSensors.linearAcceleration=linearAccelerationvalue
     #Alert.show_popup("linearAccelerationvalue")
     redirect :action => :index
   end
   
   def setrotation
     rotationvalue = @params['selectrotation']
     RawSensors.rotation=rotationvalue
     #Alert.show_popup("rotationvalue")
     redirect :action => :index
   end
   
   def setorientation
     orientationvalue = @params['selectorientation']
     RawSensors.orientation=orientationvalue
     #Alert.show_popup("orientationvalue")
     redirect :action => :index
   end
   
   def setminimumInterval
     myminimumInterval = @params['txtminimumInterval']
     RawSensors.minimumInterval = myminimumInterval
     #Alert.show_popup(myminimumInterval)
     redirect :action => :index
   end
    
end
