require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class AudioCaptureTestController < Rho::RhoController

#AudioCapture Callback Method
def audio_callback
  @filename = @params['fileName'][7..-1]
  @data = @params.to_json
  Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML=JSON.stringify(#{@data})")
  Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
  
  if Rho::RhoFile.exists(@filename)
    Rho::Mediaplayer.start(@filename)
  else
    Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= document.getElementById('actResult').innerHTML + '<br/>File Not Exist'")
  end
end


def audio_capture_default
	Rho::AudioCapture.start({'fileName' => "defaultvalue"}, url_for(:action => :audio_callback))
end

def audio_capture_allparams
  @audio_capture_folder = Rho::RhoFile.join(Rho::Application.userFolder, "audio")
  if !(Rho::RhoFile.exists(@audio_capture_folder))
    Rho::RhoFile.makeDir(@audio_capture_folder)
  end
  @file= Rho::RhoFile.join(@audio_capture_folder,"audioallparams")
  Rho::AudioCapture.start({'fileName' => @file, 'maxDuration' => 8000}, url_for(:action => :audio_callback))
end

def audio_capture_androidallparams
  @audio_capture_folder = Rho::RhoFile.join(Rho::Application.userFolder, "audio")
  if !(Rho::RhoFile.exists(@audio_capture_folder))
    Rho::RhoFile.makeDir(@audio_capture_folder)
  end
  @file= Rho::RhoFile.join(@audio_capture_folder,"audioandroidall")
  Rho::AudioCapture.start({'fileName' => @file, 'maxDuration' => 8000, 'encoder' => Rho::AudioCapture::ENCODER_AMR_WB}, url_for(:action => :audio_callback))
end

def audio_capture_stop
  @audio_capture_folder = Rho::RhoFile.join(Rho::Application.userFolder, "audio")
  if !(Rho::RhoFile.exists(@audio_capture_folder))
    Rho::RhoFile.makeDir(@audio_capture_folder)
  end
  @file= Rho::RhoFile.join(@audio_capture_folder,"audiowithstop")
  Rho::AudioCapture.start({'fileName' => @file, 'maxDuration' => 10000}, url_for(:action => :audio_callback))

  sleep 2

  Rho::AudioCapture.stop()
end

def audio_capture_cancel
  @audio_capture_folder = Rho::RhoFile.join(Rho::Application.userFolder, "audio")
  if !(Rho::RhoFile.exists(@audio_capture_folder))
    Rho::RhoFile.makeDir(@audio_capture_folder)
  end
  @file= Rho::RhoFile.join(@audio_capture_folder,"audiowithcancel")
  Rho::AudioCapture.start({'fileName' => @file, 'maxDuration' => 10000}, url_for(:action => :audio_callback))

  sleep 3

  Rho::AudioCapture.cancel()
end

# def audio_stop
#   Rho::AudioCapture.stop()
# end

# def audio_cancel
#   Rho::AudioCapture.cancel()
# end

end