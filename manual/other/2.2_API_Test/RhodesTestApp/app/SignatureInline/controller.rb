require 'rho/rhocontroller'

class SignatureInlineController < Rho::RhoController
  #@layout = :simplelayout
  @layout = 'SignatureInline/layout'
  
  def index
    puts "Signature Inline index controller"
    @signatures = SignatureInline.find(:all)
    Rho::SignatureCapture.visible(false, nil )

    render :back => '/app'  
  end

  def delete
    @signature = SignatureInline.find(@params['id'])
    @signature.destroy
    redirect :action => :index
  end

  def set_rect
     puts '############  setRect()'
     Rho::SignatureCapture.visible(true, :penColor => 0xFFFF0000, :penWidth=>5, :border => true, :bgColor => 0x4F00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height'] )
  end
  
  #test case ID VT229-0433
  def capture_inline_visible
    $testCaseID = "VT229-0433"
    Rho::SignatureCapture.visible(true, :penColor => 0xFFFF0000, :penWidth=>5, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0434
  def capture_inline_visible_penwidth
    $testCaseID = "VT229-0434"
    Rho::SignatureCapture.visible(false, :penColor => 0xFFFF0000, :penWidth=>8, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0435
  def capture_inline_jpg
    $testCaseID = "VT229-0435"
    Rho::SignatureCapture.visible(true, :imageFormat=>'jpg',:penColor => 0xFFFF0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0436
  def capture_inline_png
    $testCaseID = "VT229-0436"
    Rho::SignatureCapture.visible(true, :imageFormat=>'png',:penColor => 0xFFFF0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0437
  def capture_inline_bmp
    $testCaseID = "VT229-0437"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xFFFF0000, :penWidth=>3, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0438
  def capture_inline_pencolor
    $testCaseID = "VT229-0438"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xffffff, :penWidth=>3, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0439
  def capture_inline_penwidth
    $testCaseID = "VT229-0439"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xffffff, :penWidth=>3, :border => true, :bgColor => 0x00ff00, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  #test case ID VT229-0440
  def capture_inline_bgcolor
    $testCaseID = "VT229-0440"
    Rho::SignatureCapture.visible(true, :imageFormat=>'bmp',:penColor => 0xffffff, :penWidth=>3, :border => true, :bgColor => 0x0000ff, :left => @params['left'], :top => @params['top'], :width => @params['width'], :height => @params['height']  )
  end
  
  

  def signature_callback
     puts '############  signature_callback'
    if @params['status'] == 'ok'
      #create signature record in the DB
      signature = SignatureInline.new({'signature_uri'=>@params['signature_uri']})
      signature.save
      puts "new Signature object: " + signature.inspect
    end  
    Rho::SignatureCapture.visible(false, nil )
    WebView.navigate( url_for :action => :index )
    ""
  end

  def do_capture          
    Rho::SignatureCapture.capture(url_for( :action => :signature_callback))    
  end
  
  def do_clear          
    Rho::SignatureCapture.clear()    
  end

  def do_back          
    Rho::SignatureCapture.visible(false, nil )
    WebView.navigate( url_for :action => :index )
    ""
  end

  
end
