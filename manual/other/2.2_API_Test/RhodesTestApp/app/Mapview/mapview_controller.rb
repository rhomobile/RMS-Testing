require 'rho/rhocontroller'
require 'helpers/browser_helper'

class MapviewController < Rho::RhoController
  include BrowserHelper
  $map_api_key = 'AIzaSyAFp8CjtY9jI9Kkyi_V0l1aIIQ97IAoIso'
  # GET /Mapview
  def index
    render :back => '/app'
  end

  def create_map_case1
    
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'Google',
          :settings => {:map_type => "standard", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
  redirect :action => :index
  end
  
  def create_map_case2
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'Google',
          :settings => {:map_type => "satellite", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end 
  
  def create_map_case3
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'Google',
          :settings => {:map_type => "hybrid", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end
  
def create_map_case4
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'Google',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => false, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case5
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'Google',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => false, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case6
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'Google',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case7
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}

  map_params = {
        :provider => 'Google',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case8
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}

  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case9
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'ESRI',
          :settings => {:map_type => "satellite", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end 
  
  def create_map_case10
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'ESRI',
          :settings => {:map_type => "hybrid", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end
  
def create_map_case10
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => false, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case11
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => false, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case12
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => false, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case13
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case14
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case15
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard",  :region => {:center => 'NG10 3XL', :radius => 0.2},
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
  redirect :action => :index
end
  



def create_map_case16
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}

  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case17
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'RhoGoogle',
          :settings => {:map_type => "satellite", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end 
  
  def create_map_case18
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'RhoGoogle',
          :settings => {:map_type => "hybrid", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end
  
def create_map_case19
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => false, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case20
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => false, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case21
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => false, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case22
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case23
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case24
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'RhoGoogle',
        :settings => {:map_type => "standard",  :region => {:center => 'NG10 3XL', :radius => 0.2},
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
  redirect :action => :index
end

############################


def create_map_case25
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}

  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "hybrid", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case26
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'OSM',
          :settings => {:map_type => "satellite", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end 
  
  def create_map_case27
    $map_latitude = GeoLocation.latitude
    $map_longitude = GeoLocation.longitude

    if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
     $map_latitude = '59.9'
     $map_longitude = '30.3'
    end

    region = [$map_latitude, $map_longitude, 0.6, 0.6]     

    myannotations = []

    myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
    myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

    #  add annotation with customized image :
    myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
    myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
    myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

    myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
    myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

    map_params = {
          :provider => 'OSM',
          :settings => {:map_type => "hybrid", :region => region,
                        :zoom_enabled => true, 
                        :scroll_enabled => true, 
                        :shows_user_location => true, 
                        :api_key => $map_api_key
                        },
          :annotations => myannotations
     }
    MapView.create map_params
redirect :action => :index
  end
  
def create_map_case28
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => false, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case29
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '60.1', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.0', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '60.1', :longitude => '30.6', :title => "PRELOAD MARKER"} 
  myannotations << {:latitude => '59.7', :longitude => '30.6', :title => "PRELOAD MARKER"}

  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => false, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case30
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => false, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case31
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case32
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case33
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

  myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'OSM',
        :settings => {:map_type => "standard",  :region => {:center => 'NG10 3XL', :radius => 0.2},
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
  redirect :action => :index
end



end
def create_map_case34
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude
  
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore"} 
myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum"} 
myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary"} 
myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad"}
myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya"}
myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore"}
myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore"}

  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case14
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard", :region => region,
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
redirect :action => :index
end

def create_map_case15
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
  myannotations << {:latitude => '60.0270', :longitude => '30.33', :title => "Red", :subtitle => "r tst", :url => "/app/GeoLocation/show?city=Red_Location", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.36', :title => "Green Location", :subtitle => "green test", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }
  myannotations << {:latitude => '60.0270', :longitude => '30.39', :title => "Blue Location Bla-Bla-Bla !!!", :subtitle => "blue test1\nblue test2\nblue 1234567890 1234567890 1234567890 test3", :url => "/app/GeoLocation/show?city=Blue_Location", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32, :pass_location => true }

myannotations << {:latitude => '12.9833', :longitude => '77.5833', :title => "Bangalore", :title => "Red", :subtitle => "r tst", :image => '/public/images/marker_red.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.85', :longitude => '74.6167', :title => "Belgaum", :title => "Blue", :subtitle => "b tst", :image => '/public/images/marker_blue.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.15', :longitude => '76.85', :title => "Bellary", :title => "Cyan", :subtitle => "c tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32} 
  myannotations << {:latitude => '15.35', :longitude => '75.1667', :title => "Hubli–Dharwad", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.55', :longitude => '76.9', :title => "Mandya", :title => "Yellow", :subtitle => "y tst", :image => '/public/images/marker_yellow.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.9167', :longitude => '74.8833', :title => "Mangalore", :title => "Green", :subtitle => "g tst", :image => '/public/images/marker_green.png', :image_x_offset => 8, :image_y_offset => 32}
  myannotations << {:latitude => '12.3', :longitude => '76.65', :title => "Mysore", :title => "Cyan", :subtitle => "C tst", :image => '/public/images/marker_cyan.png', :image_x_offset => 8, :image_y_offset => 32}


  map_params = {
        :provider => 'ESRI',
        :settings => {:map_type => "standard",  :region => {:center => 'NG10 3XL', :radius => 0.2},
                      :zoom_enabled => true, 
                      :scroll_enabled => true, 
                      :shows_user_location => true, 
                      :api_key => $map_api_key
                      },
        :annotations => myannotations
   }
  MapView.create map_params
  redirect :action => :index
end
  



def create_map_case16
  $map_latitude = GeoLocation.latitude
  $map_longitude = GeoLocation.longitude

  if $map_latitude.to_i == 0 and $map_longitude.to_i == 0
   $map_latitude = '59.9'
   $map_longitude = '30.3'
  end

  region = [$map_latitude, $map_longitude, 0.6, 0.6]     

  myannotations = []

  myannotations <<   {:street_address => "Cupertino, CA 95014", :title => "Cupertino", :subtitle => "zip: 95014", :url => "/app/GeoLocation/show?city=Cupertino", :pass_location => true }
  myannotations << {:street_address => "Santa Clara, CA 95051", :title => "Santa Clara", :subtitle => "zip: 95051", :url => "/app/GeoLocation/show?city=Santa%20Clara", :pass_location => true }

  #  add annotation with customized image :
  myannotations << {:latitude => '60.0270', :longitude => '30.299', :title => "Original Location", :subtitle => "orig test", :url => "/app/GeoLocation/show?city=Original_Location", :pass_location => true} 
end
  