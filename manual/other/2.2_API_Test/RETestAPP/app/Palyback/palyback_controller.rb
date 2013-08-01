require 'rho/rhocontroller'
require 'helpers/browser_helper'

class PalybackController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
  end 
  
  def onStarthttpvd
    MediaPlayer.filename = "url('http://192.168.6.18:80/NEON/ReceivedFiles/video/video.mp4')"
    MediaPlayer.type = 'video'
    MediaPlayer.start
    redirect :action => :index
  end  
  
  def onStartlocalvd
    MediaPlayer.filename = "url('file://\\Application\\video.mp4')"
    MediaPlayer.type = 'video'
    MediaPlayer.start
    redirect :action => :index
  end
    
  def onStarthttpad
      MediaPlayer.filename = "url('http://192.168.6.18:80/NEON/ReceivedFiles/audio/audio.wav')"
      MediaPlayer.type = 'audio'
      MediaPlayer.start
      redirect :action => :index
  end
        
  def onStartlocalad
      MediaPlayer.filename = "url('file://\\Application\\audio.wav')"
      MediaPlayer.type = 'audio'
      MediaPlayer.start
      redirect :action => :index
  end  
    
  def setvdfilename
    MediaPlayer.filename = "url('file://\\Temp\\video.mp4')"
    redirect :action => :index
  end
  
  def setadfilename
    MediaPlayer.filename = "url('file://\\Temp\\audio.wav')"
    redirect :action => :index
  end
  
  def settypevd
    MediaPlayer.type = 'video'
    redirect :action => :index
  end 
  
  def settypead
    MediaPlayer.type = 'audio'
    redirect :action => :index
  end  
  
  def onstart
    MediaPlayer.start
    redirect :action => :index
  end
  
  def onstop
    MediaPlayer.stop
    redirect :action => :index
  end
  
  # GET /Palyback
  def index
    @palybacks = Palyback.find(:all)
    render :back => '/app'
  end
  
  # GET /Palyback/{1}
  def show
    @palyback = Palyback.find(@params['id'])
    if @palyback
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Palyback/new
  def new
    @palyback = Palyback.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Palyback/{1}/edit
  def edit
    @palyback = Palyback.find(@params['id'])
    if @palyback
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Palyback/create
  def create
    @palyback = Palyback.create(@params['palyback'])
    redirect :action => :index
  end

  # POST /Palyback/{1}/update
  def update
    @palyback = Palyback.find(@params['id'])
    @palyback.update_attributes(@params['palyback']) if @palyback
    redirect :action => :index
  end

  # POST /Palyback/{1}/delete
  def delete
    @palyback = Palyback.find(@params['id'])
    @palyback.destroy if @palyback
    redirect :action => :index  
  end
end
