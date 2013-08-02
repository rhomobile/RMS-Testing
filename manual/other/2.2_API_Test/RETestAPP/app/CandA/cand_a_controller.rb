require 'rho/rhocontroller'
require 'helpers/browser_helper'

class CandAController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
  end

  def setright
    selected_Module = @params['selected_Module']
    txtright = @params['txtright']
    KeyState.right = txtright if selected_Module == "keyState" 
  end  
  
  
  def setleft
  
      selected_Module = @params['selected_Module']
      txtleft = @params['txtleft']
  
      AddressBar.left = txtleft if selected_Module == "addressBar" 
      BackButton.left = txtleft if selected_Module == "backButton" 
      BottomCommandArea.left = txtleft if selected_Module == "bottomCommandArea" 
      ForwardButton.left = txtleft if selected_Module == "forwardButton" 
      GoButton.left = txtleft if selected_Module == "goButton" 
      HomeButton.left = txtleft if selected_Module == "homeButton" 
      KeyState.left = txtleft if selected_Module == "keyState" 
      MinimizeButton.left = txtleft if selected_Module == "minimizeButton"  
      QuitButton.left = txtleft if selected_Module == "quitButton" 
      ReloadButton.left = txtleft if selected_Module == "reloadButton" 
      SipButton.left = txtleft if selected_Module == "sipButton" 
      StopButton.left = txtleft if selected_Module == "stopButton" 
      TopCommandArea.left = txtleft if selected_Module == "topCommandArea" 
      ZoomTextButton.left = txtleft if selected_Module == "zoomTextButton"
      
      redirect :action => :index 
    end
    
    def settop
  
      selected_Module = @params['selected_Module']
      txttop = @params['txttop']
  
      AddressBar.top = txttop if selected_Module == "addressBar" 
      BackButton.top = txttop if selected_Module == "backButton"
      BottomCommandArea.top = txttop if selected_Module == "bottomCommandArea" 
      ForwardButton.top = txttop if selected_Module == "forwardButton"
      GoButton.top = txttop if selected_Module == "goButton" 
      HomeButton.top = txttop if selected_Module == "homeButton" 
      KeyState.top = txttop if selected_Module == "keyState" 
      MinimizeButton.top = txttop if selected_Module == "minimizeButton"  
      QuitButton.top = txttop if selected_Module == "quitButton" 
      ReloadButton.top = txttop if selected_Module == "reloadButton" 
      SipButton.top = txttop if selected_Module == "sipButton" 
      StopButton.top = txttop if selected_Module == "stopButton" 
      TopCommandArea.top = txttop if selected_Module == "topCommandArea" 
      ZoomTextButton.top = txttop if selected_Module == "zoomTextButton"
      redirect :action => :index
    end
    
    def setheight
  
      selected_Module = @params['selected_Module']
      txtheight = @params['txtheight']
  
      AddressBar.height = txtheight if selected_Module == "addressBar" 
      BackButton.height = txtheight if selected_Module == "backButton"
      BottomCommandArea.height = txtheight if selected_Module == "bottomCommandArea" 
      ForwardButton.height = txtheight if selected_Module == "forwardButton"
      GoButton.height = txtheight if selected_Module == "goButton" 
      HomeButton.height = txtheight if selected_Module == "homeButton" 
      KeyState.height = txtheight if selected_Module == "keyState" 
      MinimizeButton.height = txtheight if selected_Module == "minimizeButton"  
      QuitButton.height = txtheight if selected_Module == "quitButton" 
      ReloadButton.height = txtheight if selected_Module == "reloadButton" 
      SipButton.height = txtheight if selected_Module == "sipButton" 
      StopButton.height = txtheight if selected_Module == "stopButton" 
      TopCommandArea.height = txtheight if selected_Module == "topCommandArea" 
      ZoomTextButton.height = txtheight if selected_Module == "zoomTextButton"
      redirect :action => :index
    end
    
    def setwidth
      
      selected_Module = @params['selected_Module']
      txtwidth = @params['txtwidth']
      
      AddressBar.width = txtwidth if selected_Module == "addressBar" 
      BackButton.width = txtwidth if selected_Module == "backButton"
      BottomCommandArea.width = txtwidth if selected_Module == "bottomCommandArea" 
      ForwardButton.width = txtwidth if selected_Module == "forwardButton"
      GoButton.width = txtwidth if selected_Module == "goButton" 
      HomeButton.width = txtwidth if selected_Module == "homeButton" 
      KeyState.width = txtwidth if selected_Module == "keyState" 
      MinimizeButton.width = txtwidth if selected_Module == "minimizeButton"  
      QuitButton.width = txtwidth if selected_Module == "quitButton" 
      ReloadButton.width = txtwidth if selected_Module == "reloadButton" 
      SipButton.width = txtwidth if selected_Module == "sipButton" 
      StopButton.width = txtwidth if selected_Module == "stopButton" 
      TopCommandArea.width = txtwidth if selected_Module == "topCommandArea" 
      ZoomTextButton.width = txtwidth if selected_Module == "zoomTextButton"
      redirect :action => :index
    end
    
    def setvisibility
  
      selected_Module = @params['selected_Module']
      txtvisibility = @params['txtvisibility']
  
      AddressBar.visibility = txtvisibility if selected_Module == "addressBar" 
      BackButton.visibility = txtvisibility if selected_Module == "backButton"
      BottomCommandArea.visibility = txtvisibility if selected_Module == "bottomCommandArea"
      ForwardButton.visibility = txtvisibility if selected_Module == "forwardButton"
      GoButton.visibility = txtvisibility if selected_Module == "goButton" 
      HomeButton.visibility = txtvisibility if selected_Module == "homeButton" 
      KeyState.visibility = txtvisibility if selected_Module == "keyState" 
      MinimizeButton.visibility = txtvisibility if selected_Module == "minimizeButton"  
      QuitButton.visibility = txtvisibility if selected_Module == "quitButton" 
      ReloadButton.visibility = txtvisibility if selected_Module == "reloadButton" 
      SipButton.visibility = txtvisibility if selected_Module == "sipButton" 
      StopButton.visibility = txtvisibility if selected_Module == "stopButton" 
      TopCommandArea.visibility = txtvisibility if selected_Module == "topCommandArea" 
      ZoomTextButton.visibility = txtvisibility if selected_Module == "zoomTextButton"
      redirect :action => :index
    end
    
    def setimageup
      
      selected_Module = @params['selected_Module']
      imageupparam = @params['imageupparam']
      
      BackButton.imageUp = imageupparam if selected_Module == "backButton"
      BottomCommandArea.image = imageupparam if selected_Module == "bottomCommandArea"
      ForwardButton.imageUp = imageupparam if selected_Module == "forwardButton"
      GoButton.imageUp = imageupparam if selected_Module == "goButton" 
      HomeButton.imageUp = imageupparam if selected_Module == "homeButton" 
      MinimizeButton.imageUp = imageupparam if selected_Module == "minimizeButton"  
      QuitButton.imageUp = imageupparam if selected_Module == "quitButton" 
      ReloadButton.imageUp = imageupparam if selected_Module == "reloadButton" 
      SipButton.imageUp = imageupparam if selected_Module == "sipButton" 
      StopButton.imageUp = imageupparam if selected_Module == "stopButton" 
      TopCommandArea.image = imageupparam if selected_Module == "topCommandArea" 
      ZoomTextButton.imageUp = imageupparam if selected_Module == "zoomTextButton"
      redirect :action => :index
    end
    
    def setimagedown
      selected_Module = @params['selected_Module']
      imagedownparam = @params['imagedownparam']
#      Alert.show_popup "selected_Module"+selected_Module+"imagedownparam"+imagedownparam
      BackButton.imageDown = imagedownparam if selected_Module == "backButton"
#      BottomCommandArea.imageDown = imagedownparam if selected_Module == "bottomCommandArea"
      ForwardButton.imageDown = imagedownparam if selected_Module == "forwardButton"
      GoButton.imageDown = imagedownparam if selected_Module == "goButton" 
      HomeButton.imageDown = imagedownparam if selected_Module == "homeButton" 
      MinimizeButton.imageDown = imagedownparam if selected_Module == "minimizeButton"  
      QuitButton.imageDown = imagedownparam if selected_Module == "quitButton" 
      ReloadButton.imageDown = imagedownparam if selected_Module == "reloadButton" 
      SipButton.imageDown = imagedownparam if selected_Module == "sipButton" 
      StopButton.imageDown = imagedownparam if selected_Module == "stopButton" 
#      TopCommandArea.image = imagedownparam if selected_Module == "topCommandArea" 
      ZoomTextButton.imageDown = imagedownparam if selected_Module == "zoomTextButton"
      redirect :action => :index
    end
    
    def setcolor
  
      selected_Module = @params['selected_Module']
      txtcolor = @params['txtcolor']
  
      BottomCommandArea.color = txtcolor if selected_Module == "bottomCommandArea"
      TopCommandArea.color = txtcolor if selected_Module == "topCommandArea" 
      redirect :action => :index
    end  
  
  
  
  
  
  
  
  
  
  
  
  
  
  # GET /CandA
  def index
    @candas = CandA.find(:all)
    render :back => '/app'
  end

  # GET /CandA/{1}
  def show
    @canda = CandA.find(@params['id'])
    if @canda
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /CandA/new
  def new
    @canda = CandA.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /CandA/{1}/edit
  def edit
    @canda = CandA.find(@params['id'])
    if @canda
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /CandA/create
  def create
    @canda = CandA.create(@params['canda'])
    redirect :action => :index
  end

  # POST /CandA/{1}/update
  def update
    @canda = CandA.find(@params['id'])
    @canda.update_attributes(@params['canda']) if @canda
    redirect :action => :index
  end

  # POST /CandA/{1}/delete
  def delete
    @canda = CandA.find(@params['id'])
    @canda.destroy if @canda
    redirect :action => :index  
  end
end
