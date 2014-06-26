require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class BarcodeController < Rho::RhoController
  
  $scanner = nil
  
  # set scanner for tests 
  def set_scanner
    scanner_type = @params['scanner_type']
    @obj = Rho::Barcode.enumerate
    
    @obj.each do |scannerObj|
      $scanner = scannerObj if scannerObj.scannerType == scanner_type
      #break
    end
  end
  
  # callback functions
  
  def enum_callback
    if @params && @params.length>0
     @obj_count = true
    else
     @obj_count = false
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{@obj_count}')")
  end  
  
  def setdefault_callback
    if @params
      @obj = $scanner
      Rho::Barcode.setDefault(@obj)
      @data = Rho::Barcode.getProperties(['scannerType'])
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= '#{@data} has been set as default'")
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
    else
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= 'Scanners not found in this device'")
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
    end
  end

  def barcode_callback_print
    if @params
      @obj_array = @params.values[1]
      
      @scanners = ""
      @obj_array.each do |obj|
        @scanners += '<br/>' + obj.scannerType
      end
      
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= '#{@scanners}'")
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
    else
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= 'Scanners not found in this device'")
      Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
    end
  end

  def barcode_callback
    @result = ""
    @params.each do |key, value|
      @result += '<br/>' + key.to_s + ': ' + value.to_s
    end
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= '#{@result}'")
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
  end
  
  
  # test methods
  
  def enumerate_barcode_auto
    Rho::Barcode.enumerate(url_for(:action => :enum_callback))
  end
  
  def enumerate_barcode_print
    Rho::Barcode.enumerate(url_for(:action => :barcode_callback_print))
  end

  
  def barcode_take
    set_scanner
    if @params['default']
      Rho::Barcode.take({},url_for(:action => :barcode_callback))
    else
      $scanner.take({},url_for(:action => :barcode_callback))
    end
  end
  
  def barcode_take_disable
    set_scanner
    $scanner.take({'allDecoders' => false,'code128' => true,'scanTimeout' => 10000}, url_for(:action => :barcode_callback))
  end 
  
  def barcode_props
    set_scanner
    $scanner.getAllProperties(url_for(:action => :barcode_callback))
  end

  def barcode_props_withoutcb
    set_scanner
    data = $scanner.getAllProperties()
    @data = data.to_json
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= JSON.stringify(#{@data})")
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
  end
  
  def barcode_supportedprops
    set_scanner
    $scanner.getSupportedProperties(url_for(:action => :barcode_callback))
  end  

  def barcode_supportedprops_withoutcb
    set_scanner
    data = $scanner.getSupportedProperties()
    @data = data.to_json
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= JSON.stringify(#{@data})")
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
  end  
  
  def barcode_scannertype
    set_scanner
    $scanner.getProperties(['scannerType'], url_for(:action => :barcode_callback))
  end
  
  def barcode_scannertype_withoutcb
    set_scanner
    data = $scanner.getProperties(['scannerType'])
    @data = data.to_json
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').innerHTML= JSON.stringify(#{@data})")
    Rho::WebView.executeJavascript("document.getElementById('verificationResult').style.display='block'")
  end
  
  def scanner_enable_withoutcb
    set_scanner
    options = {}
        
    if @params['picklist'] && @params['picklist'] == true && $scanner.friendlyName == "2D Imager"
      options.picklistMode = 'hardwareReticle'
    elsif @params['picklist']
      options.picklistMode = 'softwareReticle'
    end
    
    if @params['allDecoders']
      if @params['allDecoders'] == 'yes'
        options.allDecoders = true 
      else 
        options.allDecoders = false
      end
    end
    options.code128 = @params['code128'] if @params['code128']
    options.scanTimeout = @params['time'] if @params['time']
    
    $scanner.enable(options)
    
  end
  
  def scanner_enable
    set_scanner
    options = {}
    
    if @params['picklist'] && @params['picklist'] == true && $scanner.friendlyName == "2D Imager"
      options.picklistMode = 'hardwareReticle'
    elsif @params['picklist']
      options.picklistMode = 'softwareReticle'
    end
    
    if @params['allDecoders']
      if @params['allDecoders'] == 'yes'
        options.allDecoders = true 
      else 
        options.allDecoders = false
      end
    end
    options.code128 = @params['code128'] if @params['code128']
    options.scanTimeout = @params['time'] if @params['time']
      
    $scanner.enable(options, url_for(:action => :barcode_callback))
  end

  def scanner_disable
    set_scanner
    $scanner.disable()
  end
  
  def barcode_start
    set_scanner
    $scanner.scanTimeout = 10000
    $scanner.start()
  end

  def barcode_stop
    set_scanner
    $scanner.stop()
  end
  
  def barcode_setdefault
    set_scanner
    Rho::Barcode.setDefault($scanner)
  end

  def barcode_getdefault
    @data = Rho::Barcode.getDefault()
    @result = @data.scannerType
    Rho::WebView.executeJavascript('Ruby.sendValueToJS("'+ @result +'")')
  end  
    
  def barcode_setproperty
    set_scanner
    $scanner.setProperty(@params['attr'] => @params['val'])
  end

  def barcode_decode
    set_scanner
    $scanner.decodeSound = @params['file']
  end


end
