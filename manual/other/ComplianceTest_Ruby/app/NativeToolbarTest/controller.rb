require 'rho/rhocontroller'
require 'rho/rhotoolbar'

class NativeToolbarTestController < Rho::RhoController

  def tool_icon_masklabel
    toolElements = [
        {:label => 'back', :action => 'back'},
        {:label => 'Home', :action => 'Home', :icon => '/public/images/bar/colored_btn.png', :coloredIcon => true},
        {:action => "separator"},
        {:label => 'refresh', :action => 'refresh', :icon => '/public/images/bar/refresh_btn.png', :coloredIcon => true},
        {:label => 'Exit', :action => 'exit', :icon => '/public/images/bar/forward_btn.png', :coloredIcon => true}
    ]
    toolProperties = {'backgroundColor' => 0x00804F, 'maskColor' => 0xFF00, 'viewHeight' => 100}

    Rho::NativeToolbar.create(toolElements, toolProperties);
  end

  def tool_colored
    toolElements = [
        {:label => 'back', :action => 'back', :icon => '/public/images/bar/back_btn_colored.png', :coloredIcon => true},
        {:action => "separator"},
        {:label => 'Home', :action => 'Home', :icon => '/public/images/bar/colored_btn.png', :coloredIcon => true},
        {:label => 'Exit', :action => 'exit', :icon => '/public/images/bar/refresh_btn.png', :coloredIcon => true}
    ]
    toolProperties = {'backgroundColor' => 0x002F00, 'maskColor' => 0xFF0000, 'viewHeight' => 100}
    Rho::NativeToolbar.create(toolElements, toolProperties)
  end

  def tool_remove
    Rho::NativeToolbar.remove()
  end

  def tool_setaction
    toolElements = [
        {:label => 'Home', :action => 'Home'},
        {:label => 'Exit', :action => 'exit'},
        {:label => 'close', :action => 'close'},
        {:label => 'Options', :action => 'options'},
        {:label => 'refresh', :action => 'refresh'}
    ]
    toolProperties = {'backgroundColor' => 0xFF00, 'maskColor' => '', 'viewHeight' => 100};
    Rho::NativeToolbar.create(toolElements, toolProperties)
  end

def tool_mask
    toolElements = [
        {:label => 'back', :action => 'back'},
        {:label => 'Home', :action => 'Home'},
        {:action => '/app/NativeToolbarTest/Page1.html', :label => "[BUTTON]", :icon => '/app/NativeToolbarTest/redi.png', :coloredIcon => true}
    ]
    toolProperties = {:backgroundColor => 0x00804F, :maskColor => 0xFF0000, :viewHeight => 100}
    Rho::NativeToolbar.create(toolElements, toolProperties)
end

=begin
  def index
    render :back => '/public/app/index.html'
  end

  def save_location
    location = WebView.current_location
    puts "location: #{location}"
    @@this_page = location
  end

  def return_to_main
     set_toolbar
  end

  def set_no_bar
    save_location
    Rho::NativeToolbar.remove
    $tabbar_active = false
    render :action => :index
  end

def set_toolbar
    save_location
    toolbar = [
      {:action => :back,    :icon => '/public/images/bar/back_btn.png'},
      {:action => :forward, :icon => '/public/images/bar/forward_btn.png'},
      {:action => :separator},
      {:action => :home,    :icon => '/public/images/bar/colored_btn.png', :coloredIcon => true},
      {:action => :refresh },
      {:action => 'callback:' + url_for(:action => :callback), :label => 'Callback'},
      {:action => :options}
    ]
    Rho::NativeToolbar.create(toolbar)
    $tabbar_active = false
    render :action => :index
  end

  def set_toolbar_new
    save_location
    iconpath = ''
    toolbar = [
      {:action => :back,    :icon => '/public/images/bar/back_btn.png'},
      {:action => :forward, :icon => '/public/images/bar/forward_btn.png'},
      {:action => :separator},
      {:action => :home,    :icon => '/public/images/bar/colored_btn.png', :coloredIcon => true},
      {:action => :refresh },
      {:action => 'callback:' + url_for(:action => :callback), :label => 'Callback', :icon => iconpath},
      {:action => :options}
    ]
    Rho::NativeToolbar.create(toolbar, {:backgroundColor => 0x00004F})
    $tabbar_active = false
    render :action => :index
  end

  def set_minimize_sip
    toolbar = [
      {:action => :minimize },
      {:action => :sip }
    ]
    Rho::NativeToolbar.create(toolbar)
    
    $tabbar_active = false
    render :action => :index    
  end
  
  def show_main_page
    WebView.navigate '/public/app/index.html'
  end

  def callback
    puts "+++--- callback"
    WebView.navigate '/public/app/index.html'
  end

  def nop
  end

  def switch_to_1
    toolbar = [
      {:action => 'callback:' + url_for(:action => :nop),    :icon => '/public/images/bar/switch/btn_1_c.png', :coloredIcon => true},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_2),    :icon => '/public/images/bar/switch/btn_2.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_3),    :icon => '/public/images/bar/switch/btn_3.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_4),    :icon => '/public/images/bar/switch/btn_4.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_5),    :icon => '/public/images/bar/switch/btn_5.png'}
    ]
    Rho::NativeToolbar.create(toolbar)
    render :action => :switch1
  end

  def switch_to_2
    #save_location
    toolbar = [
      {:action => url_for(:action => :switch_to_1),    :icon => '/public/images/bar/switch/btn_1.png'},
      {:action => :separator},
      {:action => 'callback:' + url_for(:action => :nop),    :icon => '/public/images/bar/switch/btn_2_c.png', :coloredIcon => true},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_3),    :icon => '/public/images/bar/switch/btn_3.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_4),    :icon => '/public/images/bar/switch/btn_4.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_5),    :icon => '/public/images/bar/switch/btn_5.png'}
    ]
    Rho::NativeToolbar.create(toolbar)
    render :action => :switch2
  end

  def switch_to_3
    #save_location
    toolbar = [
      {:action => url_for(:action => :switch_to_1),    :icon => '/public/images/bar/switch/btn_1.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_2),    :icon => '/public/images/bar/switch/btn_2.png'},
      {:action => :separator},
      {:action => 'callback:' + url_for(:action => :nop),    :icon => '/public/images/bar/switch/btn_3_c.png', :coloredIcon => true},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_4),    :icon => '/public/images/bar/switch/btn_4.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_5),    :icon => '/public/images/bar/switch/btn_5.png'}
    ]
    Rho::NativeToolbar.create(toolbar)
    render :action => :switch3
  end

  def switch_to_4
    #save_location
    toolbar = [
      {:action => url_for(:action => :switch_to_1),    :icon => '/public/images/bar/switch/btn_1.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_2),    :icon => '/public/images/bar/switch/btn_2.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_3),    :icon => '/public/images/bar/switch/btn_3.png'},
      {:action => :separator},
      {:action => 'callback:' + url_for(:action => :nop),    :icon => '/public/images/bar/switch/btn_4_c.png', :coloredIcon => true},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_5),    :icon => '/public/images/bar/switch/btn_5.png'}
    ]
    Rho::NativeToolbar.create(toolbar)
    render :action => :switch4
  end

  def switch_to_5
    #save_location
    toolbar = [
      {:action => url_for(:action => :switch_to_1),    :icon => '/public/images/bar/switch/btn_1.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_2),    :icon => '/public/images/bar/switch/btn_2.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_3),    :icon => '/public/images/bar/switch/btn_3.png'},
      {:action => :separator},
      {:action => url_for(:action => :switch_to_4),    :icon => '/public/images/bar/switch/btn_4.png'},
      {:action => :separator},
      {:action => 'callback:' + url_for(:action => :nop),    :icon => '/public/images/bar/switch/btn_5_c.png', :coloredIcon => true}
    ]
    Rho::NativeToolbar.create(toolbar)
    render :action => :switch5
  end


  def switch1
    render :action => :switch1
  end

  def switch2
    render :action => :switch2
  end
  def switch3
    render :action => :switch3
  end
  def switch4
    render :action => :switch4
  end
  def switch5
    render :action => :switch5
  end
=end

end
