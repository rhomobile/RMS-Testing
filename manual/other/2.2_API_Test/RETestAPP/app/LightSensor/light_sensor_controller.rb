require 'rho/rhocontroller'
require 'helpers/browser_helper'

class LightSensorController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def callgetsensorData
      Alert.show_popup("getSensorData called")
      Lightsensor.getSensorData
     
      redirect :action => :index
    end
    
    def registersensorEvent
      Alert.show_popup("attaching LightsensorEvent")
      myeventvalue = @params['selectsensorEvent']
      puts "attaching sensorEvent"
           if myeventvalue == "JavaScript"
             Lightsensor.LightSensorEvent = url_for(:action => :mysensorEvent)
           elsif myeventvalue == "DETACHEVENT"
             Lightsensor.LightSensorEvent = ''
           elsif myeventvalue == "EMPTYEVENT"
             Lightsensor.LightSensorEvent =''
           end
  
      redirect :action => :index
    end
    
    def mysensorEvent
  #    Alert.show_popup("In mysensorEvent")
      puts "In mysensorEvent"  
      sensorData = @params
  
      myLightSensorValue = sensorData["LightSensorValue"]
          
      lightsensordata="LightSensor:- "+myLightSensorValue+ "<br/>"                   
                    
  #    Alert.show_popup("AccelerometerX:- "+myaccelerometerX)                  
  #    Alert.show_popup("Data:- "+mydata+"  Source:- "+mysource+"  Type:- "+mytype+"  Time:- "+mytime+"  Length:- "+mylength+"  Event:- "+myevent)
      
      WebView.execute_js('setFieldValue("'+lightsensordata+'")') 
      
    end
      
    def setSensorstatus
        myallvalue = @params['selectstatus']
        Lightsensor.status=myallvalue
        Alert.show_popup(myallvalue)
        redirect :action => :index
      end
      
  def setminimumInterval
    myminimumInterval = @params['txtminimumInterval']
    Lightsensor.minimumInterval = myminimumInterval
    Alert.show_popup(myminimumInterval)
    redirect :action => :index
  end
  

end
