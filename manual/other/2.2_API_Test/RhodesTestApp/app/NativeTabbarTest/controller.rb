require 'rho/rhocontroller'
require 'rho/rhotabbar'

class NativeTabbarTestController < Rho::RhoController
  @layout = 'NativeTabbarTest/layout'

  def index
    render :back => '/app'
  end

  def save_location
    location = WebView.current_location
    puts "location: #{location}"
    @@this_page = location
  end

  def set_no_bar
    save_location
    Rho::NativeTabbar.remove
    $tabbar_active = false
    render :action => :index
  end

  def set_tabbar
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main page 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => false}
    ]
    Rho::NativeTabbar.create(tabbar)
    Rho::NativeTabbar.set_tab_badge( 1, '12')
    $tabbar_active = true
    #Rho::NativeTabbar.switch_tab(0)
  end

  def show_current_tab
     cur_tab = Rho::NativeTabbar.get_current_tab
     Alert.show_popup "Current Tab index = "+cur_tab.to_s
  end

  def set_tabbar_bottom
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main page 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(:tabs => tabbar, :place_tabs_bottom => true)
    Rho::NativeTabbar.set_tab_badge( 1, '12')
    $tabbar_active = true
    #Rho::NativeTabbar.switch_tab(0)
  end


  def switch_to_tabs
    puts 'switch_to_tabs start'
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :icon => '/public/images/bar/gears.png', :use_current_view_for_tab => true},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main page 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar)
    $tabbar_active = true
    puts 'switch_to_tabs finish'
  end

  def reload_tab
    puts 'reload_tab start'
    save_location
    tab_index_for_reload = 0
    WebView.refresh(tab_index_for_reload)
    puts 'reload_tab finish'
  end


  def set_tabbar_new
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :selected_color => 0xFF0000, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :selected_color => 0xFFFF00},
      {:label => 'Main page 1',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :selected_color => 0xFFFF00, :disabled => true},
      {:label => 'Main page 2',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :selected_color => 0xFFFF00},
      {:label => 'Main page 3', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true, :selected_color => 0xFFFF00}
    ]
    bkg_color = 0x008FFF 
    if System::get_property('platform') == 'APPLE' 
        # TabBar on iPhone have nice view with dark bkg instead of light bkg on Android
        bkg_color = 0x000F4F
    end
    Rho::NativeTabbar.create(:tabs => tabbar, :background_color => bkg_color)
    Rho::NativeTabbar.set_tab_badge( 1, '12')
    $tabbar_active = true
    Rho::NativeTabbar.switch_tab(0)
  end

  def set_tabbar_new2
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main page 1',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :disabled => true},
      {:label => 'Main page 2',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main page 3', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create( tabbar)
    $tabbar_active = true
    Rho::NativeTabbar.switch_tab(0)
  end



  def set_tabbar_many_items
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main page 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Native Tabbar A', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page B',  :action => '/app',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main page C', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Native Tabbar D', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page E',  :action => '/app',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main page G', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar)
    Rho::NativeTabbar.set_tab_badge(7, '12')
    $tabbar_active = true
    Rho::NativeTabbar.switch_tab(0)
  end


  def show_main_page
    WebView.navigate '/app'
  end

  def set_iPad_tabbar
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main page 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar, {:verticalOrientation => true})
    $tabbar_active = true
    Rho::NativeTabbar.switch_tab(0)
  end

  def set_customizediPad_tabbar
    save_location
    tabbar = [
      {:label => 'Tab', :detailLabel => "first tab", :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F, :selectedColor => 0xFF0000},
      {:label => 'Main', :detailLabel => "second tab", :action => '/app',               :icon => '/public/images/bar/home_btn.png', :reload => true, :selectedColor => 0xFFFF00},
      {:label => 'Main Bla-Bla-Bla super long title', :detailLabel => "third tab", :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true, :selectedColor => 0x00FF00}
    ]
    options = {:verticalOrientation => true, :backgroundColor => 0x2F8FFF, :iOS7IconColor => 0xFFFFFF, :detailColor => 0x3F3F3F}
    Rho::NativeTabbar.create(tabbar, options)
    $tabbar_active = true
    Rho::NativeTabbar.switch_tab(0)
  end

  def switch_to_tab_1
    Rho::NativeTabbar.switch_tab(1)
  end

  def switch_to_tab_2
    Rho::NativeTabbar.switch_tab(2)
  end

  def callback
    puts "+++--- callback"
    WebView.navigate '/app'
  end


  def nop
  end

  def tabbar_with_callback
    save_location
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true},
      {:label => 'Test Page', :action => '/app/NativeTabbarTest/reload_page', :icon => '/public/images/bar/home_btn.png',    :reload => false},
    ]
    Rho::NativeTabbar.create(:tabs => tabbar, :on_change_tab_callback => url_for(:action => :tabbar_on_tab_change_callback))
  end

  def tabbar_on_tab_change_callback
      new_index = @params['tab_index']
      puts '$$$ onChangeTab callback tab_index = '+new_index

      if (!$reload_text)
        $reload_text = ''
        $reload_count = 0 
      end  
      
      if new_index.to_i == 1
          $reload_count = $reload_count+1 
          if ($reload_count % 2) == 1
               Rho::NativeTabbar.set_tab_badge(1, '')
               WebView.refresh(1)
          else
               Rho::NativeTabbar.set_tab_badge(1, $reload_count.to_s)
          end
          $reload_text = 'Current switch to page count = '+$reload_count.to_s 
      end
  end

  def reload_page
    puts '$$$ reload page rendered !'
    render :action => :reload_page
  end

  def return_to_main
    save_location
    Rho::NativeTabbar.remove
    $tabbar_active = false
    render :action => :index
  end
  
  ###############################################
  
  def createTab
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png'}
      ]
      Rho::NativeTabbar.create(tabbar)
  end
  
  def createTabReload
    tabbar = [
      {:label => 'Native Tabbar', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',:reload => true, :web_bkg_color => 0x7F7F7F},
      {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png',:reload => true}
      ]
      Rho::NativeTabbar.create(tabbar)

  end
  
  def createTabWithAction
    tabbar = [
        {:label => 'Back', :action => :back},
        {:label => 'Close', :action => :close},
        {:label => 'Forword', :action => :forword},
        {:label => 'Fullscreen', :action => :fullscreen},
        {:label => 'Home', :action => :home}
        ]
      Rho::NativeTabbar.create(tabbar)
  end
  
  def createTabWithAction2
    tabbar = [
    {:label => 'Log', :action => :log},
    {:label => 'Options', :action => :options},
    {:label => 'Refresh', :action => :refresh},
    {:label => 'Sync', :action => :sync},
    {:label => 'Separator', :action => :separator}
    ]
      Rho::NativeTabbar.create(tabbar)
  end
  

  def createTabWithAction3
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png', :use_current_view_for_tab => true},
          {:label => 'Main page',  :action => '/app',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
    ]

    Rho::NativeTabbar.create(tabbar)
  end
  

  def createTabWithAction4
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png'},
          {:label => 'Main page',  :action => '/app', :icon => '/public/images/bar/colored_btn.png', :reload=> true, :use_current_view_for_tab => true },
    ]
    Rho::NativeTabbar.create(tabbar)
  end
  

  def createTabWithAction5
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png', :selected_color => 0xFFFF00},
          {:label => 'Main page',  :action => '/app',:icon => '/public/images/bar/colored_btn.png', :reload=> true},
    ]
    Rho::NativeTabbar.create(tabbar)
  end
  

  
  def createTabWithAction6
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png', :selected_color => 0xFFFF00},
          {:label => 'Main page',  :action => '/app',:icon => '/public/images/bar/colored_btn.png', :selected_color => 0xFFFF00, :reload=> true},
    ]
    Rho::NativeTabbar.create(tabbar)
  end
  
  def createTabWithAction7
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png'},
          {:label => 'Main page', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar)
  end

  def createTabWithAction8
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png, :web_bkg_color=> 0x7F7F7F '},
          {:label => 'Main page', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar)
  end
  
  def createTabWithdisabled
    tabbar = [
          {:label => 'Native Tabbar', :action => '/app', :icon => '/public/images/bar/gears.png'},
          {:label => 'Main page',  :action => '/app', :icon => '/public/images/bar/colored_btn.png', :reload=> true, :disabled=> true},
    ]
    Rho::NativeTabbar.create(tabbar)
  end
  


  
  
  
 
end
