require 'rho/rhocontroller'
require 'helpers/browser_helper'

class SignatureUtilController < Rho::RhoController
  include BrowserHelper

  @layout = :simplelayout
  
  def index
    puts "Signature index controller"
    @signatures = SignatureUtil.find(:all)
    render :back => '/app'  
  end

  def new
    imgFormat = System::get_property('platform') == 'WINDOWS' ?  "bmp" : "jpg"
    
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xff0000, :penWidth=>5, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end

  def delete
    @signature = SignatureUtil.find(@params['id'])
    @signature.destroy
    redirect :action => :index
  end

  def signature_callback
    if @params['status'] == 'ok'
      #create signature record in the DB
      signature = SignatureUtil.new({'signature_uri'=>@params['signature_uri']})
      signature.save
      puts "new Signature object: " + signature.inspect
      Alert.show_popup(signature)
    end  
    WebView.navigate( url_for :action => :index )
    #WebView::refresh
    #reply on the callback
    #render :action => :ok, :layout => false
    ""
  end

  def inline_capture
    Rho::SignatureCapture.visible(true, :penColor => 0xff0000, :penWidth=>1, :border => true, :bgColor => 0x00ff00 )
  end

  def do_capture          
    Rho::SignatureCapture.capture(url_for( :action => :signature_callback))    
  end
  
  def clear_capture          
    Rho::SignatureCapture.clear()    
  end
  
  #test case ID VT229-0426
  def capture_signature
    $testCaseID = "VT229-0426"
    imgFormat = System::get_property('platform') == 'WINDOWS' ?  "bmp" : "jpg"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xff0000, :penWidth=>5, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end
  
  #test case ID VT229-0427
  def capture_signature_jpg
    $testCaseID = "VT229-0427"
    imgFormat = "jpg"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xff0000, :penWidth=>5, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end
  
  #test case ID VT229-0428
  def capture_signature_png
    $testCaseID = "VT229-0428"
    imgFormat = "png"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xff0000, :penWidth=>5, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end
  
  #test case ID VT229-0429
  def capture_signature_bmp
    $testCaseID = "VT229-0429"
    imgFormat = "bmp"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xff0000, :penWidth=>5, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end
  
  #test case ID VT229-0430
  def capture_signature_pen1
    $testCaseID = "VT229-0430"
    imgFormat = System::get_property('platform') == 'WINDOWS' ?  "bmp" : "jpg"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xFFFFFF, :penWidth=>5, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end
  
  #test case ID VT229-0431
  def capture_signature_pen_width
    $testCaseID = "VT229-0431"
    imgFormat = System::get_property('platform') == 'WINDOWS' ?  "bmp" : "jpg"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xFFFFFF, :penWidth=>3, :border => true, :bgColor => 0x00ff00 })
    redirect :action => :index
  end
  
  #test case ID VT229-0432
  def capture_signature_bgcolor
    $testCaseID = "VT229-0432"
    imgFormat = System::get_property('platform') == 'WINDOWS' ?  "bmp" : "jpg"
    Rho::SignatureCapture.take(url_for( :action => :signature_callback), { :imageFormat => imgFormat, :penColor => 0xFFFFFF, :penWidth=>3, :border => true, :bgColor => 0x0000FF })
    redirect :action => :index
  end
  
  #test case ID VT229-0433
  def capture_inline_visible
    $testCaseID = "VT229-0433"
    Rho::SignatureCapture.visible(true, :penColor => 0xff0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0434
  def capture_inline_visible_penwidth
    $testCaseID = "VT229-0434"
    Rho::SignatureCapture.visible(false, :penColor => 0xff0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0435
  def capture_inline_jpg
    $testCaseID = "VT229-0435"
    Rho::SignatureCapture.visible(true, :imageFormat=>'jpg',:penColor => 0xff0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0436
  def capture_inline_png
    $testCaseID = "VT229-0436"
    Rho::SignatureCapture.visible(true, :imageFormat=>'png',:penColor => 0xff0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0437
  def capture_inline_bmp
    $testCaseID = "VT229-0437"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xff0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0438
  def capture_inline_pencolor
    $testCaseID = "VT229-0438"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xffffff, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0439
  def capture_inline_penwidth
    $testCaseID = "VT229-0439"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xffffff, :penWidth=>3, :border => true, :bgColor => 0x00ff00 )
  end
  #test case ID VT229-0440
  def capture_inline_bgcolor
    $testCaseID = "VT229-0440"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xffffff, :penWidth=>3, :border => true, :bgColor => 0x0000ff )
  end
  #test case ID VT229-0441
  def capture_clear
    $testCaseID = "VT229-0441"
    Rho::SignatureCapture.clear()
  end
  

  
end
