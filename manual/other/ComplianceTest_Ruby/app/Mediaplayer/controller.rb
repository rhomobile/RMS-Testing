require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class MediaplayerController < Rho::RhoController

#Global variables
@@audio_path = Rho::RhoFile.join(Rho::Application.modelFolderPath('Mediaplayer'), "MediaFiles/Audio")
@@video_path = Rho::RhoFile.join(Rho::Application.modelFolderPath('Mediaplayer'), "MediaFiles/Video")


#callback for getAllRingtones method
def player_callback
	if (@params.length > 0)
		name1 = @params.values[1]
		name = name1[0]['name']
		Rho::Mediaplayer.playRingTone(name)
	end
end

# Methods call
def play_audio
	if @params['case'] == '1'
		audio_location = Rho::RhoFile.join(@@audio_path, "Austin_Powers_death.wav")
	else
		audio_location = Rho::RhoFile.join(@@audio_path, "super_android_tune.mp3")
	end
	Rho::Mediaplayer.start(audio_location)
end

def play_video
	if @params['file']
		if @params['file'] == 'wm'
			video_location = Rho::RhoFile.join(@@video_path, "video.wmv")
		else
			video_location = Rho::RhoFile.join(@@video_path, "video.mp4")
		end
		Rho::Mediaplayer.startvideo(video_location)
	end
end

def play_ringtones
	Rho::Mediaplayer.getAllRingtones(url_for(:action => :player_callback))
end

def stop_audio
	Rho::Mediaplayer.stop()
end

def stop_video
	Rho::Mediaplayer.stopvideo()
end

def stop_ringtone
	Rho::Mediaplayer.stopRingTone()
end

end