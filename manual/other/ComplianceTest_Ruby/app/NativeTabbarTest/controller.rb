require 'rho/rhocontroller'
require 'rho/rhotabbar'

class NativeTabbarTestController < Rho::RhoController

def tabbar_create_switch
  Rho::NativeTabbar.create([ 
      {:label =>'MainPage', :action =>'/app/NativeTabbarTest/specRunner.html', :useCurrentViewForTab =>true},
      {:label =>'Main Reload', :action =>'/app/NativeTabbarTest/specRunner.html', :reload =>true},
      {:label =>'Page1', :action =>'/app/NativeTabbarTest/NativeTabBar_Page1.html'}, 
      {:label =>'Page2', :action =>'/app/NativeTabbarTest/NativeTabBar_Page2.html', :perishable =>false}], 
      {'hiddenTabs' => true, 'createOnInit' => true}
  )
  Rho::Application.nativeMenu = [
      {:label => 'Home', :action => 'javascript:goHome()'},
      {:label => 'Exit', :action => 'javascript:onExit0()'},
      {:label => 'Quit', :action => 'javascript:onQuit0()'},
      {:label => 'My Test', :action => 'javascript:page0Test()'}
  ]
  Rho::NativeTabbar.switchTab(1)
end

def tabbar_checkindex
  Rho::NativeTabbar.create([ 
      {:label =>'MainPage', :action =>'/app/NativeTabbarTest/specRunner.html', :useCurrentViewForTab =>true},
      {:label =>'Main Reload', :action =>'/app/NativeTabbarTest/specRunner.html', :reload =>true},
      {:label =>'Page1', :action =>'/app/NativeTabbarTest/NativeTabBar_Page1.html'}, 
      {:label =>'Page2', :action =>'/app/NativeTabbarTest/NativeTabBar_Page2.html', :perishable =>false}], 
      {'hiddenTabs' => true, 'createOnInit' => true}
  )
  Rho::Application.nativeMenu = [
      {:label => 'Home', :action => 'javascript:goHome()'},
      {:label => 'Exit', :action => 'javascript:onExit0()'},
      {:label => 'Quit', :action => 'javascript:onQuit0()'},
      {:label => 'My Test', :action => 'javascript:page0Test()'}
  ]
  Rho::NativeTabbar.switchTab(2)
end

def tabbar_currenttab
  tab_index = Rho::NativeTabbar.currentTabIndex()
  Rho::WebView.executeJavascript("document.getElementById('result').innerHTML= 'Current tab index is #{tab_index}'")
end

def tabbar_remove
  Rho::NativeTabbar.remove()
  Rho::NativeTabbar.create([ 
      {:label =>'MainPage', :action =>'/app/NativeTabbarTest/specRunner.html',
       :useCurrentViewForTab =>true, :icon => '/public/images/thumb.png', :reload => true}], 
      {'verticalOrientation' => false, 'hiddenTabs' => false, 'createOnInit' => false, 'placeTabsBottom' => false}
  )
end

def tabbar_bgcolor
  Rho::NativeTabbar.create([
    {:label =>'MainPage', :action =>'/app/NativeTabbarTest/specRunner.html', :useCurrentViewForTab =>true},
    {:label =>'Page1', :action =>'/app/NativeTabbarTest/NativeTabBar_Page1.html',:backgroundColor =>0x7F7F7F }, 
    {:label =>'Page2', :action => '/app/NativeTabbarTest/NativeTabBar_Page2.html',:backgroundColor => 0xFF0000} ,
    {:label =>'Page3', :action => '/app/index.html', :icon => '/public/images/bar/colored_btn.png', :reload => false}], 
    {'verticalOrientation' => false, 'hiddenTabs' =>  false, 'createOnInit'  =>  false, 'placeTabsBottom' => false}
  )
end
  
=begin
  @layout = 'NativeTabbarTest/layout'

  def index
    render :back => '/public/app/index.html'
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
    render :action => :index, :back => '/public/app/index.html'
  end

  def set_tabbar
    save_location
    tabbar = [
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => false}
    ]
    Rho::NativeTabbar.create(tabbar, nil)
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
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar, {:placeTabsBottom => true})
    Rho::NativeTabbar.setTabBadge( 1, '12')
    $tabbar_active = true
  end


  def switch_to_tabs
    puts 'switch_to_tabs start'
    save_location
    tabbar = [
      {:label => 'Tab', :icon => '/public/images/bar/gears.png', :use_current_view_for_tab => true},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar, nil)
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
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :selectedColor => 0xFF0000, :backgroundColor => 0x7F7F7F},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :selectedColor => 0xFFFF00},
      {:label => 'Main 1',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :selectedColor => 0xFFFF00, :disabled => true},
      {:label => 'Main 2',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :selectedColor => 0xFFFF00},
      {:label => 'Main 3', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true, :selectedColor => 0xFFFF00}
    ]
    bkg_color = 0x008FFF 
    if System::get_property('platform') == 'APPLE' 
        # TabBar on iPhone have nice view with dark bkg instead of light bkg on Android
        bkg_color = 0x000F4F
    end
    Rho::NativeTabbar.create(tabbar, {:backgroundColor => bkg_color})
    Rho::NativeTabbar.setTabBadge( 1, '12')
    $tabbar_active = true
    Rho::NativeTabbar.switchTab(0)
  end

  def set_tabbar_new2
    save_location
    tabbar = [
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main 1',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true, :disabled => true},
      {:label => 'Main 2',  :action => '/public/app/index.html',               :icon => '/public/images/bar/colored_btn.png', :reload => true},
      {:label => 'Main 3', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create( tabbar)
    $tabbar_active = true
    Rho::NativeTabbar.switchTab(0)
  end



  def set_tabbar_many_items
    save_location
    tabbar = [
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Tab A', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main B',  :action => '/public/app/index.html',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main C', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Tab D', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main E',  :action => '/public/app/index.html',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main G', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar)
    Rho::NativeTabbar.setTabBadge(7, '12')
    $tabbar_active = true
    Rho::NativeTabbar.switchTab(0)
  end

  def set_tabbar_forjs
    tabbar = [
      {:label => 'Tab1', :action => '/public/app/api/webview.html',:reload => false },
      {:label => 'Tab2', :action => '/public/app/api/webview.html',:reload => false},
      {:label => 'Tab3', :action => '/public/app/api/webview.html',:reload => true},
      {:label => 'Tab4', :action => '/public/app/api/webview.html',:reload => true},
      {:label => 'Tab5', :action => '/public/app/api/webview.html',:reload => false}
      
      
    ]
    Rho::NativeTabbar.create(tabbar, {:createOnInit => true} )
  end
  
  def switch_tab
    Rho::NativeTabbar.switchTab(@params['tab_index'].to_i())
  end
  
  def set_no_bar_forjs
    Rho::NativeTabbar.remove
    WebView.navigate '/public/app/api/webview.html'
  end

  def show_main_page
    WebView.navigate '/public/app/index.html'
  end

  def set_iPad_tabbar
    save_location
    tabbar = [
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true, :backgroundColor => 0x7F7F7F},
      {:label => 'Main',  :action => '/public/app/index.html',               :icon => '/public/images/bar/home_btn.png', :reload => true},
      {:label => 'Main 2', :action => 'callback:' + url_for(:action => :show_main_page), :icon => '/public/images/bar/home_btn.png', :reload => true}
    ]
    Rho::NativeTabbar.create(tabbar, {:verticalOrientation => true})
    $tabbar_active = true
    Rho::NativeTabbar.switch_tab(0)
  end

  def switch_to_tab_1
    Rho::NativeTabbar.switchTab(1)
  end

  def switch_to_tab_2
    Rho::NativeTabbar.switchTab(2)
  end

  def callback
    puts "+++--- callback"
    WebView.navigate '/public/app/index.html'
  end


  def nop
  end

  def tabbar_with_callback
    save_location
    tabbar = [
      {:label => 'Tab', :action => '/app/NativeTabbarTest', :icon => '/public/images/bar/gears.png',    :reload => true},
      {:label => 'Test', :action => '/app/NativeTabbarTest/reload_page', :icon => '/public/images/bar/home_btn.png',    :reload => false},
    ]
    Rho::NativeTabbar.create(tabbar, nil, url_for(:action => :tabbar_on_tab_change_callback))
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
               Rho::NativeTabbar.setTabBadge(1, '')
               WebView.refresh(1)
          else
               Rho::NativeTabbar.setTabBadge(1, $reload_count.to_s)
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
    render :action => :index, :back => '/public/app/index.html'
  end
=end

 
end
