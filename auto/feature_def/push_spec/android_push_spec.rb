require 'thread'
require 'mspec'
require 'restclient'
require 'yaml'
require 'psych'

TEST_PKGS = %w[com.rhomobile.rho_push_client com.motsolutions.cto.services.ans]
$rho_root = nil
$use_own_rhoconnect_stack=true
cfgfilename = File.join(File.dirname(__FILE__),'config.yml')
if File.file?(cfgfilename)
	config = YAML::load_file(cfgfilename)
	$rho_root = config["rhodes"]
	$rhoconnect_root = config["rhoconnect"]
	$rho_root = File.expand_path($rho_root) if $rho_root
	$rhoconnect_root = File.expand_path($rhoconnect_root) if $rhoconnect_root
	$rhoelements_root = config["rhoelements"]
	$rhoelements_root = File.expand_path($rhoelements_root) if $rhoelements_root
end
$rho_root = `get-rhodes-info --rhodes-path`.chomp unless $rho_root
puts "rhodes location: #{$rho_root}"
puts "rhoconnect location:  #{$rhoconnect_root}"
puts "rhoelements location: #{$rhoelements_root}"

$spec_path = FileUtils.pwd
$platform = 'android'
$server = nil
$requests = []
$signal = ConditionVariable.new
$mutex = Mutex.new
# Assume redis up and running. Do not touch it!
$rhoconnect_use_redis = false # true will start/stop it

require File.join($rho_root,'lib','build','jake.rb')
require File.join($rho_root,'platform','android','build','android_tools.rb')
require_relative './rhoconnect_helper'
require_relative './spec_helper'

puts "-- Starting local server"
appname = "push_client_rb"
$server, addr, port = Jake.run_local_server(8081)
File.open(File.join($spec_path, appname, 'app', 'local_server.rb'), 'w') do |f|
  f.puts "SPEC_LOCAL_SERVER_HOST = '#{addr}'"
  f.puts "SPEC_LOCAL_SERVER_PORT = #{port}"
end
$server.mount_proc('/', nil) do |req, res|
  query = req.query
  # puts "Request headers: #{req.header.inspect}"
  # puts "Request query: #{query.inspect}"
  puts "Local server:"
  puts " Headers: #{req.header.inspect}"
  puts " Query: #{query.inspect}"
  res.status = 200
  $mutex.synchronize do
    $requests << req
    $signal.signal
  end
end

$app_path = File.expand_path(File.join(File.dirname(__FILE__),appname))
# Patch rhodes 'rhoconfig.txt' file
cfgfile = File.join($app_path, 'rhoconfig.txt')
cfg = File.read(cfgfile)
cfg.gsub!(/(syncserver.*)/, "syncserver = 'http://#{RhoconnectHelper.host}:#{RhoconnectHelper.port}'")
cfg.gsub!(/(rhoconnect_push_server.*)/, "rhoconnect_push_server = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
cfg.gsub!(/(Push.rhoconnect.pushServer.*)/, "Push.rhoconnect.pushServer = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
File.open(cfgfile, 'w') { |f| f.write cfg }
#
FileUtils.chdir File.join($spec_path, appname)
puts "\nBuilding rhodes app ..."
puts "rake device:#{$platform}:debug"
raise "Failed to build rhodes app" unless system("rake device:#{$platform}:debug")
FileUtils.chdir $spec_path

$deviceId = nil
$deviceOpts = '-e'
out = `adb devices`
device_list = out.split("\n")
device_list.shift # skip "List of devices attached "
# raise 'No attached android devices found' unless device_list
device_list << '' if device_list.empty?
device_list.each do |dev|
  if dev == ''
    puts "-- Running push specs on android emulator"
  else
    $deviceId = dev.split("\t")[0]
    $deviceOpts = "-s #{$deviceId}"
    puts "-- Running push specs on device #{$deviceId}"
  end

  describe 'Android rhoconnect push spec' do
    before(:all) do
      run_apps($platform)
      @api_token = RhoconnectHelper.api_post('system/login', { :login => 'rhoadmin', :password => '' })
      # puts "API token: #{@api_token}"
    end

    after(:all) do
      puts "Sending exit and logout message to the app"
      RhoconnectHelper.api_post('users/ping', { :user_id => ['pushclient'], :message => 'exit_and_logout' }, @api_token)

      stop_apps
      cleanup_apps

      puts "Stopping local server"
      $server.shutdown

      TEST_PKGS.each do |pkg|
        puts "Uninstalling package #{pkg} ..."
        system "adb #{$deviceOpts} uninstall #{pkg}"
      end

      `adb emu kill` if $deviceOpts == '-e' # running emulator
      system "kill -9 #{$logcat_pid}" if $logcat_pid
    end

    def expect_request(name, timeout=30)
      val = nil
      $mutex.synchronize do
        $signal.wait($mutex, timeout) # wait timeout 30 secs.
        $requests.count.should == 1
        val = $requests.first.query[name]
        $requests.clear
      end
      val
    end

    # 1
    it 'should login' do
      # puts 'Waiting message with login errCode'
      expect_request('error').should == "0"
    end

    # 2
    it 'should register' do
      # puts 'Waiting message with Rhoconnect registaration...'
      device_id = expect_request('device_id')
      device_id.should_not be_nil
      device_id.should_not == ''

      res = ''
      10.times do |i|
        res = RhoconnectHelper.api_get('users/pushclient/clients', @api_token)
        break unless res.body.empty?
        sleep 3
      end
      client_id = JSON.parse(res.body)[0]
      # puts "-- clients: #{client_id}"
      res.code.should == 200
      client_id.should_not be_nil

      device_push_type = ''
      20.times do |i|
        res = RhoconnectHelper.api_get("clients/#{client_id}", @api_token)
        body = JSON.parse(res.body)
        device_push_type = body[2]['value']
        body.each { |h| device_push_type = h['value'] if h['name'] == 'device_push_type' }
        break  if device_push_type
        sleep 3
      end
      res.code.should == 200
      device_push_type.should == 'rhoconnect_push'
    end

    # 3
    it 'should proceed push message at foreground' do
      # puts 'Sending push message...'
      message = 'magic1'
      params = { :user_id=>['pushclient'], :message=>message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)

      # puts 'Waiting message with push content...'
      expect_request('alert').should == message
      sleep 3
    end

    # 4
    it 'should process sequence of push messages' do
      puts 'Sending 5 push messages...'

      alerts = {}
      5.times do |i|
        message = "magic#{i}"
        alerts[message] = true
        params = { :user_id=>['pushclient'], :message => message}
        RhoconnectHelper.api_post('users/ping',params,@api_token)
        sleep 3
      end
      puts 'Waiting 5 messages with push content...'
      5.times do |i|
        $mutex.synchronize do
          break if $requests.count == 5
          $signal.wait($mutex, 30)
        end
        puts "Message count: #{$requests.count}"
      end
      $requests.count.should == 5
      $mutex.synchronize do
        puts alerts.inspect
        5.times do |i|
          message = $requests[i].query['alert']
          message.should_not be_nil
          puts "message: #{message}"
          alerts[message].should be_true
          alerts[message] = false
          #$requests.delete_at 0
        end
        $requests.clear
      end
    end

    # 5
    it 'should proceed push message with exit comand' do
      # puts 'Sending push message with exit command...'
      message = 'exit'
      params = { :user_id=>['pushclient'], :message=>message }
      RhoconnectHelper.api_post('users/ping',params,@api_token)

      # puts 'Waiting message with push content...'
      expect_request('alert').should == message
      sleep 5
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /rho_push_client/).should be_nil
    end

    # 6
    it 'should start stopped app and process pending push message' do
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /rho_push_client/).should be_nil

      # puts 'Sending push message with greeting ...'
      message = 'Hello'
      params = { :user_id=>['pushclient'], :message => message}
      RhoconnectHelper.api_post('users/ping',params,@api_token)

      # puts 'Waiting ping message with push content ...'
      expect_request('alert', 60).should == message

      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /rho_push_client/).should_not be_nil
    end

    # 7
    it 'should logout and login back and process ping message' do
      message = 'logout'
      params = { :user_id=>['pushclient'], :message=>message }
      RhoconnectHelper.api_post('users/ping',params,@api_token)
      expect_request('alert').should == message

      system("adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.rho_push_client/com.rhomobile.rhodes.RhodesActivity").should == true
      expect_request('error').should == "0"

      $device_pin = expect_request('device_id')
      $device_pin.should_not be_nil
      $device_pin.should_not == ''

      message = 'welcome'
      params = { :user_id=>['pushclient'], :message => message}
      RhoconnectHelper.api_post('users/ping',params,@api_token)
      expect_request('alert').should == message
    end
  end

end

