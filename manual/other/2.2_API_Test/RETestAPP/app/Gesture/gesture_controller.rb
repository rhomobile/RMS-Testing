require 'rho/rhocontroller'
require 'helpers/browser_helper'

class GestureController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  # GET /Gesture
  def index
    #@gestures = Gesture.find(:all)
    $count=0
    render :back => '/app'
  end
  
  def deletegesture
    #Alert.show_popup("delete")
    #Gesture.id = $gestureid 
    Gesture.delete
    #Alert.show_popup("after delete")
  end
   

    
  # Function to perform circular gesture  
    def performCircularGesture
  
      @type         = @params['formType']
      @id           = @params['formId']
      @preset       = @params['formPreset']
      @diagnostics  = @params['formDiagnostics']
      @centerX      = @params['formCenterX']
      @centerY      = @params['formCenterY']
      @radius       = @params['formRadius']
      @start        = @params['formStart']
      @end          = @params['formEnd']
      @tolerance    = @params['formTolerance']
      @sensitivity  = @params['formSensitivity']
 
      @numberOfGestures = @params['formTotalNo']
      #Alert.show_popup ("@type #{@type} @preset #{@preset} @id #{@id} <br/> @diagnostics #{@diagnostics} @centerX #{@centerX} @centerY #{@centerY} <br/> @radius #{@radius} @start #{@start} @end #{@end} @tolerance #{@tolerance} @sensitivity #{@sensitivity} @numberOfGestures #{@numberOfGestures}<br/> ")
  
      #$gestureid = @id
        
      Gesture.type        = @type unless @type == "NULL"
      Gesture.preset      = @preset unless @preset == "NULL"
      Gesture.id          = @id unless @id == "NULL"
      Gesture.diagnostics = @diagnostics unless @diagnostics == "NULL"
      Gesture.centerX     = @centerX unless @centerX == "NULL"
      Gesture.centerY     = @centerY unless @centerY == "NULL"
      Gesture.radius      = @radius unless @radius == "NULL"
      Gesture.start       = @start unless @start == "NULL"
      Gesture.end         = @end unless @end == "NULL"
      Gesture.tolerance   = @tolerance unless @tolerance == "NULL"
      Gesture.sensitivity = @sensitivity unless @sensitivity == "NULL"
      Gesture.detected    = url_for(:action => :gestureDetected)
      totalNo = @numberOfGestures
      
      #until totalNo == 0
        Gesture.create();
        #totalNo = totalNo - 1;
      #end
  
      #redirect :action => :show_result, :back => '/app/Gesture'
  
  end
  
  # Function to perform linear gesture  
    def performLinearGesture
      
      @type         = @params['formType']
      @id           = @params['formId']
      @preset       = @params['formPreset']
      @diagnostics  = @params['formDiagnostics']
      @endX         = @params['formEndX']
      @endY         = @params['formEndY']
      @skew         = @params['formSkew']
      @deviation    = @params['formDeviation']
      @regionWidth  = @params['formRegionWidth']
      @startX       = @params['formStartX']
      @startY       = @params['formStartY']
      @tolerance    = @params['formTolerance']
      @sensitivity  = @params['formSensitivity']
          
      @numberOfGestures = @params['formTotalNo']
  
      #Alert.show_popup ("@type #{@type} @preset #{@preset} @id #{@id} <br/> @diagnostics #{@diagnostics} @centerX #{@centerX} @centerY #{@centerY} <br/> @endX #{@endX} @endY #{@endY} @tolerance #{@tolerance} <br/>@sensitivity #{@sensitivity} @skew #{@skew} @deviation #{@deviation} <br/> @regionWidth #{@regionWidth}")
      Gesture.type        = @type  unless @type == "NULL"
      Gesture.preset      = @preset unless @preset == "NULL"
      Gesture.id          = @id unless @id == "NULL"
      Gesture.diagnostics = @diagnostics unless @diagnostics == "NULL"
      Gesture.startX      = @startX unless @startX == "NULL"
      Gesture.startY      = @startY unless @startY == "NULL"
      Gesture.endX        = @endX unless @endX == "NULL"
      Gesture.endY        = @endY unless @endY == "NULL"
      Gesture.tolerance   = @tolerance unless @tolerance == "NULL"
      Gesture.sensitivity = @sensitivity unless @sensitivity == "NULL"
      Gesture.skew        = @skew unless @skew == "NULL"
      Gesture.deviation   = @deviation unless @deviation == "NULL"
      Gesture.regionWidth = @regionWidth unless @regionWidth == "NULL"
      Gesture.detected    = url_for(:action => :gestureDetected)
      totalNo = @numberOfGestures
      
      #until totalNo == 0
        Gesture.create();
        #totalNo = totalNo - 1;
      #end
      
     # redirect :action => :show_result, :back => '/app/Gesture'
  
  end
  
  # Function to perform linear gesture  
    def performHoldGesture
      
      @type         = @params['formType']
      @id           = @params['formId']
      @preset       = @params['formPreset']
      @diagnostics  = @params['formDiagnostics']
      @centerX      = @params['formCenterX']
      @centerY      = @params['formCenterY']
      @radius       = @params['formRadius']
      @delay        = @params['formDelay']
      @interval     = @params['formInterval']
            
      @numberOfGestures = @params['formTotalNo']
  
      #Alert.show_popup ("@type #{@type} @preset #{@preset} @id #{@id} <br/> @diagnostics #{@diagnostics} @centerX #{@centerX} @centerY #{@centerY} <br/> @radius #{@radius} @delay #{@delay} @interval #{@interval}") 
      
      
      Gesture.type        = @type unless @type == "NULL"
      Gesture.preset      = @preset unless @preset == "NULL"
      Gesture.id          = @id unless @id == "NULL"
      Gesture.diagnostics = @diagnostics unless @diagnostics == "NULL"
      Gesture.centerX     = @centerX unless @centerX == "NULL"
      Gesture.centerY     = @centerY unless @centerY == "NULL"
      Gesture.radius      = @radius unless @radius == "NULL"
      Gesture.delay       = @delay unless @delay == "NULL"
      Gesture.interval    = @interval unless @interval == "NULL"
      Gesture.detected    = url_for(:action => :gestureDetected)

  
      totalNo = @numberOfGestures
      
      #until totalNo == 0
        Gesture.create();
        #totalNo = totalNo - 1;
      #end
      
      #redirect :action => :show_result, :back => '/app/Gesture'
  
    end
    
    #Call Back Function for gesture
    def gestureDetected
#      Alert.show_popup("Value Return #{@params}")
      #Alert.show_popup("Inside Event")     
      $count+=1
      temp=''
      temp = $count.to_s
      outputGesture = "Gesture detected for count="+temp
      result = @params
      outputGesture += "Gesture ID-: #{result['id']}"
      outputGesture += "Count:- #{result['count']}"
      
      WebView.execute_js('setFieldValue("'+outputGesture+'")')   
#      Alert.show_popup("Gesture ID #{result['id']} <br/>Count #{result['count']}")
    end
    
    def performTiltGesture
      
      #Alert.show_popup("Inside performTiltGesture")
  
        @type         = @params['formType']
        @id           = @params['formId']
        @preset       = @params['formPreset']
        @diagnostics  = @params['formDiagnostics']
        @targetX      = @params['formTargetX']
        @targetY      = @params['formTargetY']
        @targetZ      = @params['formTargetZ']
        @TiltTolerance = @params['formTiltTolerance']
        @Hysteresis   = @params['formHysteresis']
        
        @numberOfGestures = @params['formTotalNo']

  #Alert.show_popup ("@type #{@type} @preset #{@preset} @id #{@id} <br/> @diagnostics #{@diagnostics} @centerX #{@centerX} @centerY #{@centerY} <br/> @radius #{@radius} @delay #{@delay} @interval #{@interval}") 
  
  
        Gesture.type        = @type unless @type == "NULL"
        Gesture.preset      = @preset unless @preset == "NULL"
        Gesture.id          = @id unless @id == "NULL"
        Gesture.diagnostics = @diagnostics unless @diagnostics == "NULL"
        Gesture.TargetX    = @targetX unless @targetX == "NULL"
        Gesture.TargetY    = @targetY unless @targetY == "NULL"
        Gesture.TargetZ     = @targetZ unless @targetZ == "NULL"
        Gesture.TiltTolerance = @TiltTolerance unless @TiltTolerance == "NULL"
        Gesture.Hysteresis  = @Hysteresis unless @Hysteresis == "NULL"
        Gesture.detected    = url_for(:action => :gestureDetected)


        totalNo = @numberOfGestures
  
        Gesture.create();

    end
    
    
    def performShakeGesture
      
      #Alert.show_popup("Inside performShakeGesture")

      @type         = @params['formType']
      @id           = @params['formId']
      @preset       = @params['formPreset']
      @diagnostics  = @params['formDiagnostics']
      @Threshold    = @params['formThreshold']
      @Quiet        = @params['formQuiet']
    
      @numberOfGestures = @params['formTotalNo']

#Alert.show_popup ("@type #{@type} @preset #{@preset} @id #{@id} <br/> @diagnostics #{@diagnostics} @centerX #{@centerX} @centerY #{@centerY} <br/> @radius #{@radius} @delay #{@delay} @interval #{@interval}") 


      Gesture.type        = @type unless @type == "NULL"
      Gesture.preset      = @preset unless @preset == "NULL"
      Gesture.id          = @id unless @id == "NULL"
      Gesture.diagnostics = @diagnostics unless @diagnostics == "NULL"
      Gesture.Threshold   = @Threshold unless @Threshold == "NULL"
      Gesture.Quiet       = @Quiet unless @Quiet == "NULL"

      Gesture.detected    = url_for(:action => :gestureDetected)


      totalNo = @numberOfGestures
      #Alert.show_popup ("Quite #{@Quiet} Threshold #{@Threshold}")
      Gesture.create();

    end
    
    
end
