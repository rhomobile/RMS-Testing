require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ModelBarcodeController < Rho::RhoController
  include BrowserHelper
  @layout = 'ModelBarcode/layout'
  # GET /ModelBarcode
  def index
      @ModelBarcode = ModelBarcode.find(:all)
      puts @ModelBarcode.inspect
      render :back => '/app'
    end
    
    def enumerateScanners
      arBarcodes = Rho::Barcode.enumerate
      puts "Enumerated Data #{arBarcodes.inspect}"
    end
    
    def enumerateScanners1
      arBarcodes = Barcode.enumerate
      puts "Enumerated Data #{arBarcodes.inspect}"
    end
    
    def enumerateScanners2
      Barcode.enumerate url_for(:action => :enumCallback)
    end
    
    def enumCallback
      puts "PARAMS #{@params}"
      Alert.show_popup "Hello"
    end
    
    def enumerateScanners4
      Barcode.enumerate(lambda{|args| puts "lamda: #{args}"});
    end
    
  #  def enable1
  #    Barcode.enable [{:allDecoders => 'true'}], url_for(:action => :scanCallbackCommon)
  #  end
    
    def enable2
     Barcode.enable({}, url_for(:action => :scanCallbackCommon))
    end
    
    def enable3
      Barcode.enable({"allDecoders"=>true}, url_for(:action => :scanCallbackCommon))
    end
    
    def enable_single_quotes
      Barcode.enable({'allDecoders'=>true}, url_for(:action => :scanCallbackCommon))
    end
    
    def enable4
     Barcode.enable({}, lambda{|args| puts "lamda: #{args}"})
    end
    
    def scanCallbackCommon
      puts "Scanned Data #{@params}"
    end
    
    def enable5
      Barcode.enable
    end
    
    def enable6
      data = Barcode.enable({"allDecoders"=>true})
      puts "Scanned Data: #{data}"
    end
    
    def displayScanner
      Barcode.enumerate(lambda{|args| 
        puts "lamda: #{args}"
        data = ''
        args.each do |thing|
          data = thing.getAllProperties 
          puts "Scanner Details: #{data}"
          puts "Scanner Object #{thing.to_s}"
          puts "User Friendly Name #{thing.getProperty('ID').to_s}"
  
        end
        });
    end
    
    def displayScanner2
      Barcode.enumerate url_for(:action => :dispCallback)
    end
    
    def dispCallback
      options = data = ''
      options = @params['body']
      options.each do |thing|
        data = thing.getAllProperties 
        puts "Scanner Details2: #{data}"
        puts "Scanner Object2 #{thing.to_s}"
        puts "User Friendly Name2 #{thing.getProperty('ID').to_s}"
      end
    end
    
    def enableSCN1
      Barcode.enumerate(lambda{|args| 
        puts "lamda: #{args}"
        data = ''
        args.each do |thing|
    
          id = thing.getProperty('ID').to_s
          if id == 'SCN1'
            thing.enable({}, url_for(:action => :scanCallbackCommon))
            data = thing.getAllProperties 
            puts "Scanner Details SCN1: #{data}"
          end
    
        end
        });
    end
  
    def enableSCN2
      Barcode.enumerate(lambda{|args| 
        puts "lamda: #{args}"
        data = ''
        args.each do |thing|
    
          id = thing.getProperty('ID').to_s
          if id == 'SCN2'
            thing.enable({}, url_for(:action => :scanCallbackCommon))
            data = thing.getAllProperties 
            puts "Scanner Details SCN2: #{data}"
          end
    
        end
        });
    end
    
    def enable_lambda1
      Barcode.enable({"allDecoders"=>true}, lambda{|args| puts "lamda: #{args}"})
    end
    
    def enable_lambda2
     Barcode.enable({}, lambda{|args| puts "lamda: #{args}"})
    end
    
    def setBarcodeProperty
      myProps = {'allDecoders'=>true, 'autoEnter'=>true, 'code128'=>false, 'code39'=>false}
      Barcode.setProperties(myProps)
    end
    
    def setBarcodeProperty2
      myProps = {'allDecoders'=>true}
      Barcode.setProperties(myProps)
    end
    
    def getBarcodeProperty
  
      myValue = ''
      myValue = myValue + "allDecoders: " + Barcode.getProperty('allDecoders') + "<br/>"
      myValue = myValue + "autoEnter: " + Barcode.getProperty('autoEnter') + "<br/>"
      myValue = myValue + "code128: " + Barcode.getProperty('code128') + "<br/>"
      myValue = myValue + "code39: " + Barcode.getProperty('code39') + "<br/>"
  
      puts "#{myValue}"
  
    end
    
    def getBarcodeProperties
      myProps = ['allDecoders','autoEnter','code128','code39']
      myValue = Barcode.getProperties(myProps)
      puts "#{myValue.to_s}"
    end
    
    def getAllBarcodeProperties
      myValue = Barcode.getAllProperties
      puts "#{myValue.to_s}"
    end
    
    def enable_sync
      data = Barcode.enable({"allDecoders"=>true})
      puts "Scanned Data: #{data}"
    end
    
    def setausPostalTrue
      Barcode.allDecoders = false
      Barcode.ausPostal = true
      Barcode.enable({}, url_for(:action => :scanCallbackCommon))
    end
    
    def enableBarcode
      Barcode.enable({}, url_for(:action => :scanCallbackCommon))
    end
    
    def getAllDecoders
      data = Barcode.getProperty("allDecoders")
      puts "allDecoders Value Is #{data}"
    end
    
    def getCodabar
      data = Barcode.getProperty("codabar")
      puts "codabar Value Is #{data}"
    end
    
    def allDecodersTrue
      Barcode.allDecoders = true
    end
    
    def allDecodersFalse
      Barcode.allDecoders = false
    end
    
    def setPropertyAllDecodersTrue
      Barcode.setProperty('allDecoders','true')
    end
    
    def setPropertyAllDecodersFalse
      Barcode.setProperty('allDecoders','false')
    end
  
    def setPropertiesAllDecodersTrue
      myProps = {'allDecoders'=>true}
      Barcode.setProperties(myProps)
    end
  
    def setPropertiesAllDecodersFalse
      myProps = {'allDecoders'=>false}
      Barcode.setProperties(myProps)
    end
    
    def setPropertiesCodabarTrue
      myProps = {'codabar'=>true}
      Barcode.setProperties(myProps)
    end
  
    def setPropertiesCodabarFalse
      myProps = {'codabar'=>false}
      Barcode.setProperties(myProps)
    end
    
    def codabarRedundancy
      Barcode.setProperty('allDecoders','false')
      Barcode.setProperty('codabar','true')
      Barcode.setProperty('codabarRedundancy','false')
      data = Barcode.getProperty("codabarRedundancy")
      puts "codabarRedundancy Value Is #{data}"
    end
    
    def codabarClsiEditing
      Barcode.setProperty('allDecoders','false')
      Barcode.setProperty('codabar','true')
      Barcode.setProperty('codabarClsiEditing','false')
      data = Barcode.getProperty("codabarClsiEditing")
      puts "codabarClsiEditing Value Is #{data}"
    end
    
    def codabarNotisEditing
      Barcode.setProperty('allDecoders','false')
      Barcode.setProperty('codabar','true')
      Barcode.setProperty('codabarNotisEditing','false')
      data = Barcode.getProperty("codabarNotisEditing")
      puts "codabarNotisEditing Value Is #{data}"
    end
  
    def code11redundancy
      Barcode.setProperty('allDecoders','false')
      Barcode.setProperty('code11','true')
      Barcode.setProperty('code11redundancy','false')
      data = Barcode.getProperty("code11redundancy")
      puts "code11redundancy Value Is #{data}"
    end
    
    # Setting Params inside Enable
    def setPropertyEnable
      Barcode.enable({"picklistMode" => "softwareReticle", "scanTimeout" => 7000},lambda{|args| puts "lamda: #{args}"})
    end
    
    def getProperty
      property = @params['property']
      puts "Property Name #{property}"
      data = Barcode.getProperty(property)
      data = "#{property} Value Is #{data}"
      puts data
      WebView.execute_js("updatePropertyDiv('#{data}')")
    end
    
  def setDefaultSCN
    scnType = @params['scnType']
    puts "Scanner Type #{scnType}"
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
        id = thing.getProperty('ID').to_s
        if id == scnType
          Rho::Barcode.setDefault(thing)
        end
      end
    });
  end
  
  def enableScanner
    scnType = @params['scnType']
    puts "#{scnType}"
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
        id = thing.getProperty('ID').to_s
        if id == scnType
          thing.enable({}, url_for(:action => :scanCallbackCommon))
        end
      end
    });
  end
  
  def disableScanner
    Rho::Barcode.disable
    puts "Disable Called"
  end
  
  def getProperties_async
    ["Barcode","getProperty","method","'allDecoders', url_for(:action => :returnGetProperty)","async"]

  end
  
  def getProperty_async
    property = @params['property']
    puts "Property Name #{property}"
    Rho::Barcode.getProperty(property,url_for(:action => :returnGetProperty))
  end
  
  def returnGetProperty
    puts "#{@params}"
    options = @params
    puts "Get Data #{options}"
    data = ''
    if options.kind_of?(Hash)
      options.each do |thing|
        data = data.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join('<br>') 
      end
    else
      data = options
    end
    puts data
    puts "Out Put #{data}"
    WebView.execute_js("updatePropertyDiv('#{data}')")
  end
  
  def take_camera_scanner
    @params['scnType'] = 'SCN2'
    setDefaultSCN_Sync
    Barcode.take({}, url_for(:action => :scanCallbackCommon))
  end
  
  def setDefaultSCN_Sync
    scnType = @params['scnType']
    puts "Scanner Type #{scnType}"
    data = Rho::Barcode.enumerate
    puts "Enumerated Data #{data}"
    data.each do |thing|
      id = thing.getProperty('ID').to_s
      puts "Scanner ID #{id}"
      if id == scnType
        Rho::Barcode.setDefault(thing)
      end
    end
  end

  
end
