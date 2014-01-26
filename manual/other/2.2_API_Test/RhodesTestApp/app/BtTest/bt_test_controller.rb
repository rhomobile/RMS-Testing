require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'rho/rhobluetooth'
require 'time'
require 'date'

class BtTestController < Rho::RhoController
  include BrowserHelper
  @layout = 'BtTest/layout'
  $connected_wtbt_device_name = ''
  # GET /BtTest
  def index
    render :back => '/app'
  end

  #test case id VT229-0444
  def is_bt_available
    $testCaseID = "VT229-0444"
    value = Rho::BluetoothManager.is_bluetooth_available
    Alert.show_status("BT",value.to_s,"hide")
    redirect :action => :index
  end
  
  #test case id VT229-0446
  def bt_off
    $testCaseID = "VT229-0446"
    value = Rho::BluetoothManager.off_bluetooth
    puts "Bluetooth Off is called #{value}"
    redirect :action => :index
  end
  
  #test case id VT229-0447
  def set_device_name
    $testCaseID = "VT229-0447"
    o = [('A'..'Z')].map{|i| i.to_a}.flatten 
    name = (0...5).map{ o[rand(o.length)] }.join
    value = Rho::BluetoothManager.set_device_name(name)
    puts "Bluetooth Device Name is set to #{name} #{value}"
    redirect :action => :index
  end
  
  #test case id VT229-0448
  def get_device_name
    $testCaseID = "VT229-0448"
    value = Rho::BluetoothManager.get_device_name
    puts "Bluetooth Device Name is #{value}"
    Alert.show_status("BT",value,"hide")
    redirect :action => :index
  end
  
  #test case id VT229-0449
  def get_last_error
    $testCaseID = "VT229-0449"
    value = Rho::BluetoothManager.get_last_error
    puts "Bluetooth Last Error is #{value}"
    Alert.show_status("BT",value,"hide")
    redirect :action => :index
  end
  
  #test case id VT229-0450
  def create_bt_session_server
    $testCaseID = "VT229-0450"
    Rho::BluetoothManager.create_session(Rho::BluetoothManager::ROLE_SERVER, url_for(:action => :create_bt_callback1))
  end
  
  #test case id VT229-0451
  def create_bt_session_client
    $testCaseID = "VT229-0451"
    Rho::BluetoothManager.create_session(Rho::BluetoothManager::ROLE_CLIENT, url_for(:action => :create_bt_callback1))
  end
  
  #test case id VT229-0452
  def create_bt_server_wait
    $testCaseID = "VT229-0452"
    Rho::BluetoothManager.create_server_and_wait_for_connection(url_for(:action => :create_bt_callback1))
  end
  
  #test case id VT229-0453
  def create_bt_client_connect
    $testCaseID = "VT229-0453"
    $server_name = @params['device_name']
    Rho::BluetoothManager.create_client_connection_to_device($server_name, url_for(:action => :create_bt_callback1))
  end

  #test case id VT229-0454
  def stop_bt_connection_process
    $testCaseID = "VT229-0454"
    data = Rho::BluetoothManager.stop_current_connection_process
    puts "Stop Returns #{data}"
  end

  def create_bt_callback1

    puts 'BluetoothChat::create_session_callback'
    puts "Status #{@params}"
    $connected_bt_device_name = @params['connected_device_name']
    result = ''
    @params.each do |thing|
      result = result.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join(' ') + "<br/>" 
     end

    WebView.execute_js('btlog("'+result+'");')
  end
  
  ########################################################################
  ##################### BT SESSION CODE STARTS ###########################
  ########################################################################

  #test case id VT229-0455
  def session_set_callback
    $testCaseID = "VT229-0455"
    puts "Setting Bluetooth Callback "
    puts "Connected Device Name : #{$connected_bt_device_name}"
    Rho::BluetoothSession.set_callback($connected_bt_device_name, url_for(:action => :session_callback1))
  end

  #test case id VT229-0456
  def session_bt_disconnect
    $testCaseID = "VT229-0456"
    puts "Connected Device Name : #{$connected_bt_device_name}"
    val_Disconnect = Rho::BluetoothSession.disconnect($connected_bt_device_name)
    $connected_bt_device_name = nil
    puts "Bluetooth Session Disconnected: #{val_Disconnect}"
    Alert.show_status("BT",val_Disconnect.to_s,"hide")
  end
  
  #test case id VT229-0460
  def session_get_status
    $testCaseID = "VT229-0460"
    result = Rho::BluetoothSession.get_status($connected_bt_device_name)
     Alert.show_status("BT",result.to_s,"hide")
 #   result = ''
    @params.each do |thing|
      result = result.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join(' ') + "<br/>" 
     end
    WebView.execute_js('btlog("'+result+'");')
  end

  #test case id VT229-0461
  def example_receive_byte_array
    $testCaseID = "VT229-0461"
    ar = Rho::BluetoothSession.read($connected_bt_device_name)
    puts "my array is"+ar.to_s()
    WebView.execute_js('btlog("'+ar.to_s()+'");')
  end

  #test case id VT229-0462
  def example_send_byte_array
    $testCaseID = "VT229-0462"
    ar = [21, 22, 23, 5, 777]
    value = Rho::BluetoothSession.write($connected_bt_device_name, ar)
    puts "Write Called. Value Returned #{value}"
  end
  
  #test case id VT229-0463
  def session_read_string
    $testCaseID = "VT229-0463"
    value = Rho::BluetoothSession.read_string($connected_bt_device_name)
    puts "Value Returned: #{value}"
    WebView.execute_js('btlog("'+value+'");')
  end
  
  #test case id VT229-0464
  def session_write_string
    $testCaseID = "VT229-0464"
    o = [('A'..'Z')].map{|i| i.to_a}.flatten 
    name = (0...20).map{ o[rand(o.length)] }.join
    value = Rho::BluetoothSession.write_string($connected_bt_device_name, name)
    Alert.show_status("BT",value.to_s,"hide")
    puts "Write Returns: #{value}"
  end

  def session_callback1
    puts 'BluetoothChat::session_callback'
    cdn = @params['connected_device_name']
    event_type = @params['event_type']
    puts 'connected_device_name = ' + cdn
    puts 'event_type = ' + event_type
    if event_type == Rho::BluetoothSession::SESSION_INPUT_DATA_RECEIVED
       on_data_received
    else
       if event_type == Rho::BluetoothSession::SESSION_DISCONNECT
          $connected_bt_device_name = nil
         WebView.execute_js('btlog("'+event_type+'");')
       else
          $connected_bt_device_name = nil
         WebView.execute_js('btlog("'+event_type+'");')
       end
      
    end
  end

  def on_data_received
    puts 'BluetoothChat::on_data_received START'
    while Rho::BluetoothSession.get_status($connected_bt_device_name) > 0
      result = ''
      result = 'Get Status: <br/>'
      result = Rho::BluetoothSession.get_status($connected_bt_device_name)
      @params.each do |thing|
        result = result.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join(' ') + "<br/>" 
       end
      WebView.execute_js('btlog("'+result+'");')
          
       message = Rho::BluetoothSession.read_string($connected_bt_device_name)
       puts 'BluetoothChat::on_data_received MESSAGE='+message  
       WebView.execute_js('btlog("'+message+'");')
    end
    puts 'BluetoothChat::on_data_received FINISH'
  end
 
  def write_100_times
    $connected_bt_device_name = ''
      if $connected_wtbt_device_name == ''
      Rho::BluetoothManager.create_session(Rho::BluetoothManager::ROLE_CLIENT, url_for(:action => :write_callback))
      end
    end 
  
  def write_callback

    puts 'BtTest::write_callback'
    puts "Status #{@params}"
    if $connected_wtbt_device_name == ''
    $connected_wtbt_device_name = @params['connected_device_name']
    end
    result = ''
    @params.each do |thing|
      result = result.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join(' ') + "<br/>" 
     end

    WebView.execute_js('btlog("'+result+'");')
    for i in 0..100
      o = [('A'..'Z')].map{|i| i.to_a}.flatten 
      name = (0...20).map{ o[rand(o.length)] }.join
      value = Rho::BluetoothSession.write_string($connected_bt_device_name, name)
      puts "Write Returns: #{value}"
    end

  end
  
  def write_log_data
    
    $connected_bt_device_name = ''
    if $connected_wtbt_device_name == ''
     Rho::BluetoothManager.create_session(Rho::BluetoothManager::ROLE_CLIENT, url_for(:action => :write_log_data_callback))
    else
      write_log_data_callback
    end
  end
  
  def write_log_data_callback

    puts 'BtTest::write_callback'
    puts "Status #{@params}"
    puts "Connected Device Name: #{$connected_wtbt_device_name}"
    if $connected_wtbt_device_name == ''
      $connected_wtbt_device_name = @params['connected_device_name']
    end
        
      content = ''
      fileName = Rho::RhoApplication::get_model_path('app','BtTest') + "error.txt"
      #File.join(Rho::RhoApplication::get_user_path(), 'rholog.txt')
      if File.exist?(fileName)
           File.open(fileName).each do |line|
             value = Rho::BluetoothSession.write_string($connected_wtbt_device_name, line)
             puts "Write Returns: #{value}"
           end
      end

  end
  
  def count_to_2000
    sleep(1)
    WebView.execute_js('start_time();')
      
    time1 = DateTime.now
    con = 0
    
    while con < 2000 do
      con +=1
      WebView.execute_js('show_num("' + (con.to_s())+ '");')
    end
    
    
    time2 = DateTime.now
    time_diff = (time2-time1) * 8640000 / 100
    
    WebView.execute_js('end_time();')
  end

end
