require 'thread'
require 'mspec'
require 'yaml'
require 'fileutils'
require 'rake'

TEST_PKGS = %w[com.rhomobile.gcm_push_client]

cfg_file_name = File.join(File.dirname(__FILE__),'config.yml')
$rho_root = nil
if File.file?(cfg_file_name)
  config = YAML::load_file(cfg_file_name)
  $rho_root = config["rhodes"]
  $rho_root = File.expand_path($rho_root) if $rho_root
  $rhoconnect_root = config["rhoconnect"]
  $rhoconnect_root = File.expand_path($rhoconnect_root) if $rhoconnect_root
end
$rho_root = `get-rhodes-info --rhodes-path`.chomp unless $rho_root
puts "$rho_root is #{$rho_root}"

require File.join($rho_root, 'lib', 'build', 'jake.rb')
require_relative './rhoconnect_helper'

RhoconnectHelper.set_enable_redis(false)
RhoconnectHelper.set_enable_push(false)
RhoconnectHelper.set_enable_resque(false)

$spec_path = FileUtils.pwd
$platform   = 'android'
$device_pin  = nil
$server     = nil
$requests   = []
$signal     = ConditionVariable.new
$mutex      = Mutex.new

puts "Starting local server"
$server, addr, port = Jake.run_local_server(8081)
File.open(File.join($spec_path, 'rhoconnect_push_client', 'app', 'local_server.rb'), 'w') do |f|
  f.puts "SPEC_LOCAL_SERVER_HOST = '#{addr}'"
  f.puts "SPEC_LOCAL_SERVER_PORT = #{port}"
end
$server.mount_proc('/', nil) do |req, res|
  query = req.query
  puts "Local server:"
  puts " Headers: #{req.header.inspect}"
  puts " Query: #{query.inspect}"
  res.status = 200
  $mutex.synchronize do
    $requests << req
    $signal.signal
  end
end

# Patch rhodes 'rhoconfig.txt' file
$app_path = File.expand_path(File.join(File.dirname(__FILE__), "rhoconnect_push_client"))
cfgfile = File.join($app_path, 'rhoconfig.txt')
cfg = File.read(cfgfile)
cfg.gsub!(/(syncserver.*)/, "syncserver = 'http://#{RhoconnectHelper.host}:#{RhoconnectHelper.port}'")
cfg.gsub!(/(rhoconnect_push_server.*)/, "rhoconnect_push_server = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
cfg.gsub!(/(Push.rhoconnect.pushServer.*)/, "Push.rhoconnect.pushServer = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
File.open(cfgfile, 'w') { |f| f.write cfg }

puts 'Building and starting application...'
# FileUtils.chdir File.join($spec_path, 'gcm_push_client')
FileUtils.chdir File.join($spec_path, 'rhoconnect_push_client')
puts "\nBuilding rhodes app ..."
puts "rake device:#{$platform}:debug"
raise "Failed to build rhodes app" unless system("rake device:#{$platform}:debug")
FileUtils.chdir $spec_path

# FIXME:
# system("rake run:#{$platform}").should == true

$deviceId = nil
$deviceOpts = '-e'
out = `adb devices`
device_list = out.split("\n")
device_list.shift # skip "List of devices attached "
# raise 'No attached android devices found' unless device_list
device_list << '' if device_list.empty?
device_list.each do |dev|
  if dev == ''
    puts "Running push specs on android emulator"
  else
    $deviceId = dev.split("\t")[0]
    $deviceOpts = "-s #{$deviceId}"
    puts "Running push specs on device #{$deviceId}"
  end

  describe 'GCM push spec' do
    before(:all) do
      RhoconnectHelper.stop_rhoconnect_stack
      $tmp_path = File.join(File.dirname(__FILE__),'tmp')
      FileUtils.mkdir_p File.expand_path($tmp_path) unless File.exists?($tmp_path)
      $server_path = File.expand_path(File.join($tmp_path,'testapp'))
      FileUtils.rm_r $server_path if File.exists?($server_path)

      RhoconnectHelper.set_rhoconnect_bin "#{$rhoconnect_root}/bin/rhoconnect"
      puts "Generating rhoconnect app ..."
      test_appname = "testapp"
      res = RhoconnectHelper.generate_app($tmp_path, test_appname)
      puts "bundle install"
      # Copy setting.yml file with :gcm_api_key to 'testapp/settings' directory
      FileUtils.cp('settings.yml', File.join($server_path, 'settings'))
      Kernel.system("bundle", "install", :chdir => $server_path)
      RhoconnectHelper.set_rc_out(File.open( File.join($app_path, "rhoconnect.log" ), "w"),
          File.open( File.join($app_path, "rhoconnect_err.log" ), "w"))
      RhoconnectHelper.start_rhoconnect_stack($server_path, true)
      @api_token = RhoconnectHelper.api_post('system/login', { :login => 'rhoadmin', :password => '' })

      FileUtils.chdir File.join($spec_path, 'rhoconnect_push_client')
      if $deviceId
        TEST_PKGS.each do |pkg|
          out = `adb #{$deviceOpts} shell pm list packages #{pkg}`
          unless out.empty?
            puts "Uninstalling package #{pkg} ..."
            system "adb #{$deviceOpts} uninstall #{pkg}"
          end
        end
        puts "\nInstalling rhodes app on device ..."
        puts "adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/gcm_push_client-debug.apk"
        system("adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/gcm_push_client-debug.apk")

        puts "\nStarting rhodes app on device ..."
        puts "adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.gcm_push_client/com.rhomobile.rhodes.RhodesActivity"
        system("adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.gcm_push_client/com.rhomobile.rhodes.RhodesActivity")

        rhodes_log = File.join($spec_path, 'rhoconnect_push_client', 'rholog.txt')
        File.unlink(rhodes_log) if File.exists?(rhodes_log)
        $logcat_pid = Kernel.spawn("adb #{$deviceOpts} logcat", :out => File.open(rhodes_log, "w"))
        puts "Starting logcat process with pid: #{$logcat_pid}"

      else # Using emulator
        load File.join($rho_root,'Rakefile')
        load File.join($rho_root,'platform','android','build','android.rake')

        puts "Configure android emulator ..."
        Rake::Task["config:android:emulator"].invoke
        AndroidTools.run_emulator( :wipe => true )
        TEST_PKGS.each do |pkg|
          out = `adb -e shell pm list packages #{pkg}`
          unless out.empty?
            puts "Uninstalling package #{pkg} ..."
            system "adb -e uninstall #{pkg}"
          end
        end
        puts 'Building and starting rhodes application ...'
        system("rake run:#{$platform}").should == true
      end
    end

    after(:all) do
      RhoconnectHelper.stop_rhoconnect_stack
      FileUtils.rm_r $server_path if File.exists? $server_path

      TEST_PKGS.each do |pkg|
        puts "Uninstalling package #{pkg} ..."
        system "adb #{$deviceOpts} uninstall #{pkg}"
      end

      puts "Stopping local server"
      $server.shutdown

      `adb emu kill` if $deviceOpts == '-e' # running emulator
      system "kill -9 #{$logcat_pid}" if $logcat_pid
    end

    def expect_request(name)
      val = nil
      $mutex.synchronize do
        $signal.wait($mutex, 30) # wait timeout 30 secs.
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
      puts 'Waiting message with GCM registration...'
      $device_pin = expect_request('device_id')
      $device_pin.should_not be_nil
      $device_pin.should_not == ''

      res = ''
      5.times do |i|
        res = RhoconnectHelper.api_get('users/pushclient/clients', @api_token)
        break unless res.body.empty?
        sleep 1
      end
      client_id = JSON.parse(res.body)[0]
      # puts "-- clients: #{client_id}"
      res.code.should == 200
      client_id.should_not be_nil

      device_push_type = ''
      5.times do |i|
        res = RhoconnectHelper.api_get("clients/#{client_id}", @api_token)
        body = JSON.parse(res.body)
        device_push_type = body[2]['value']
        break  if device_push_type
        sleep 1
      end
      res.code.should == 200
      device_push_type.should == 'gcm'
    end

    # 3
    it 'should process push message at foreground' do
      puts 'Sending push message...'
      message = 'magic1'
      params = { 'device_pin' => $device_pin, 'user_id' =>['pushclient'], 'message' => message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)

      puts 'Waiting message with push content...'
      expect_request('alert').should == message
    end

    # 4
    it 'should process sequence of push messages' do
      puts 'Sending 5 push messages...'
      alerts = {}
      5.times do |i|
        message = "magic#{i}"
        alerts[message] = true
        params = { 'device_pin' => $device_pin, 'user_id' =>['pushclient'], 'message' => message }
        RhoconnectHelper.api_post('users/ping', params, @api_token)
        sleep 1
      end
      puts 'Waiting 5 messages with push content...'
      $mutex.synchronize do
        5.times do |i|
          break if $requests.count == 5
          $signal.wait($mutex, 30)
          puts "Message count: #{$requests.count}"
        end
        $requests.count.should == 5
        puts alerts.inspect
        5.times do |i|
          message = $requests[i].query['alert']
          message.should_not be_nil
          puts "message: #{message}"
          alerts[message].should be_true
          alerts[message] = false
        end
        $requests.clear
      end
    end

    # 5
    it 'should process push message with exit comand' do
      puts 'Sending push message with exit command...'
      message = 'exit'
      params = { 'device_pin' => $device_pin, 'user_id' =>['pushclient'], 'message' => message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)

      puts 'Waiting message with push content...'
      expect_request('alert').should == message

      sleep 5
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /gcm_push_client/).should be_nil
    end

    # 6
    it 'should start stopped app and process pending push message' do
      puts 'Sending push message to start app...'

      message = 'magic3'
      params = { 'device_pin' => $device_pin, 'user_id' =>['pushclient'], 'message' => message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)

      puts 'Waiting message with push content...'
      expect_request('alert').should == message

      sleep 5
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /gcm_push_client/).should_not be_nil
    end

    # 7
    it 'should logout and login back and process ping message' do
      message = 'logout'
      params = { 'device_pin' => $device_pin, 'user_id' =>['pushclient'], 'message' => message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)
      expect_request('alert').should == message

      system("adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.gcm_push_client/com.rhomobile.rhodes.RhodesActivity").should == true
      expect_request('error').should == "0"

      $device_pin = expect_request('device_id')
      $device_pin.should_not be_nil
      $device_pin.should_not == ''

      message = 'welcome'
      params = { 'device_pin' => $device_pin, 'user_id' =>['pushclient'], 'message' => message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)
      expect_request('alert').should == message
    end

  end
end



