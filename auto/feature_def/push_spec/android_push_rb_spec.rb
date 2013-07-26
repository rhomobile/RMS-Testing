require 'yaml'
require 'restclient'
require 'fileutils'
require 'rake'
require 'mspec'

# push type: Rhoconnect Push Service (rhoconnect_push) | Google Cloud Messaging (gcm)
# push_type = MSpec.retrieve(:push_type)
push_type = ((ARGV[1].nil?) ?  "rhoconnect_push" : ARGV[1]) #unless push_type
unless push_type == 'rhoconnect_push' || push_type == 'gcm'
  puts "Invalid param: 'rhoconnect_push' or 'gcm' expected"
  exit
end
puts "Running Ruby Push specs for #{(push_type == "rhoconnect_push") ?  'Rhoconnect Push' : 'Google Cloud Messaging'} Service"

TEST_PKGS = %w[ com.rhomobile.push_client_rb ]
TEST_PKGS << 'com.motsolutions.cto.services.ans' if push_type == "rhoconnect_push"

$rho_root = nil
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
# puts "$rho_root is #{$rho_root}"

require File.join($rho_root, 'lib', 'build', 'jake.rb')
require_relative './rhoconnect_helper'

$spec_path = FileUtils.pwd
$platform   = 'android'
appname = "push_client_rb"
$app_path = File.expand_path(File.join(File.dirname(__FILE__), appname))

RhoconnectHelper.set_enable_redis(false)
RhoconnectHelper.set_enable_resque(false)
RhoconnectHelper.set_enable_push(false) if push_type == "gcm"

$device_pin  = nil
$server     = nil
$requests   = []
$signal     = ConditionVariable.new
$mutex      = Mutex.new

# Patch rhodes 'rhoconfig.txt' file
cfgfile = File.join($app_path, 'rhoconfig.txt')
cfg = File.read(cfgfile)
cfg.gsub!(/(syncserver.*)/, "syncserver = 'http://#{RhoconnectHelper.host}:#{RhoconnectHelper.port}'")
cfg.gsub!(/(Push.rhoconnect.pushServer.*)/, "Push.rhoconnect.pushServer = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
File.open(cfgfile, 'w') { |f| f.write cfg }

# Select proper build file for rhodes app
if push_type == "rhoconnect_push"
  FileUtils.cp(File.join($app_path, 'build.yml.rps'), File.join($app_path, 'build.yml'))
else  # "gcm"
  FileUtils.cp(File.join($app_path, 'build.yml.gcm'), File.join($app_path, 'build.yml'))
end

###############################
# puts "-- Starting local server"
# $server, addr, port = Jake.run_local_server(8081)
log_file = File.open(File.join($app_path, 'webrick.log'), 'w')
$server, addr, port = Jake.run_local_server_with_logger(8081, log_file)
$server.mount_proc('/', nil) do |req, res|
  query = req.query
  # puts "Local server:"
  # puts " Headers: #{req.header.inspect}"
  # puts " Query: #{query.inspect}"
  res.status = 200
  $mutex.synchronize do
    $requests << req
    $signal.signal
  end
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
###############################

# Store local server settings
File.open(File.join($spec_path, appname, 'app', 'local_server.rb'), 'w') do |f|
  f.puts "SPEC_LOCAL_SERVER_HOST = '#{addr}'"
  f.puts "SPEC_LOCAL_SERVER_PORT = #{port}"
end

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
device_list << '' if device_list.empty?
device_list.each do |dev|
  if dev == ''
    puts "Running push specs on android emulator"
  else
    $deviceId = dev.split("\t")[0]
    $deviceOpts = "-s #{$deviceId}"
    puts "Running push specs on device #{$deviceId}"
  end

  describe 'Push specs' do
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
      Kernel.system("bundle", "install", :chdir => $server_path)

      # Copy setting.yml file with :gcm_api_key to 'testapp/settings' directory
      FileUtils.cp('settings.yml', File.join($server_path, 'settings')) if push_type == "gcm"

      RhoconnectHelper.set_rc_push_out File.open( File.join($app_path, "rhoconnect_push.log" ), "w") if push_type == "rhoconnect_push"
      RhoconnectHelper.set_rc_out(File.open( File.join($app_path, "rhoconnect.log" ), "w"),
        File.open( File.join($app_path, "rhoconnect_err.log" ), "w"))

      RhoconnectHelper.start_rhoconnect_stack($server_path, true)
      @api_token = RhoconnectHelper.api_post('system/login', { :login => 'rhoadmin', :password => '' })

      FileUtils.chdir File.join($spec_path, appname)
      if $deviceId
        TEST_PKGS.each do |pkg|
          out = `adb #{$deviceOpts} shell pm list packages #{pkg}`
          unless out.empty?
            puts "Uninstalling package #{pkg} ..."
            system "adb #{$deviceOpts} uninstall #{pkg}"
          end
        end

        if push_type == "rhoconnect_push"
          puts "Install rhoconnect push service ..."
          push_service_apk = File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.apk')
          system("adb #{$deviceOpts} install -r #{push_service_apk}")
        end
        puts "\nInstalling rhodes app on device ..."
        # puts "adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/push_client_rb-debug.apk"
        system("adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/push_client_rb-debug.apk")
        puts "\nStarting rhodes app on device ..."
        # puts "adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_rb/com.rhomobile.rhodes.RhodesActivity"
        system(
        "adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_rb/com.rhomobile.rhodes.RhodesActivity",
          :out=>"/dev/null")

        rhodes_log = File.join($spec_path, appname, 'rholog.txt')
        File.unlink(rhodes_log) if File.exists?(rhodes_log)
        $logcat_pid = Kernel.spawn("adb #{$deviceOpts} logcat", :out => File.open(rhodes_log, "w"))
        # puts "Starting logcat process with pid: #{$logcat_pid}"

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

        if push_type == "rhoconnect_push"
          puts "Install rhoconnect push service"
          push_service_apk = File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.apk')
          AndroidTools.load_app_and_run("-e", push_service_apk, "")
        end
        puts 'Building and starting rhodes application ...'
        system("rake run:#{$platform}").should == true
      end
      FileUtils.chdir $spec_path
    end

    after(:all) do
      puts
      RhoconnectHelper.stop_rhoconnect_stack
      FileUtils.rm_r $server_path if File.exists? $server_path

      TEST_PKGS.each do |pkg|
        puts "Uninstalling package #{pkg} ..."
        system "adb #{$deviceOpts} uninstall #{pkg}"
      end

      # puts "Stopping local server"
      $server.shutdown
      `adb emu kill` if $deviceOpts == '-e' # running emulator
      system "kill -9 #{$logcat_pid}" if $logcat_pid
    end

    # 1
    it 'should login' do
      # puts 'should login'
      expect_request('error').should == "0"
    end

    # 2
    it 'should register' do
      # puts 'should register'
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
      device_push_type.should == push_type
    end

    # 3
    it 'should proceed push message at foreground' do
      # puts 'should proceed push message at foreground'
    
      message = 'hello_world'
      params = { :user_id=>['pushclient'], :message => message }
      RhoconnectHelper.api_post('users/ping', params, @api_token)
    
      expect_request('alert', 60).should == message
    end
    
    # 4
    it 'should process sequence of push messages' do
      # puts 'should process sequence of push messages'
    
      COUNT = 3
      # puts "Sending #{COUNT} push messages ..."    
      alerts = {}
      COUNT.times do |i|
        message = "magic#{i}"
        alerts[message] = true
        params = { :user_id=>['pushclient'], :message => message}
        RhoconnectHelper.api_post('users/ping',params,@api_token)
        sleep 3
      end
      # puts 'Waiting messages with push content...'
      COUNT.times do |i|
        $mutex.synchronize do
          break if $requests.count == COUNT
          $signal.wait($mutex, 30)
        end
        # puts "Message count: #{$requests.count}"
      end
      $requests.count.should == COUNT
      $mutex.synchronize do
        # puts alerts.inspect
        COUNT.times do |i|
          message = $requests[i].query['alert']
          message.should_not be_nil
          # puts "message: #{message}"
          alerts[message].should be_true
          alerts[message] = false
        end
        $requests.clear
      end
    end
    
    # 5
    it 'should proceed push message with exit comand' do
      # puts 'should proceed push message with exit comand'
    
      message = 'exit'
      params = { :user_id=>['pushclient'], :message=>message }
      RhoconnectHelper.api_post('users/ping',params,@api_token)
    
      # puts 'Waiting message with push content...'
      expect_request('alert').should == message
      sleep 5
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /push_client_rb/).should be_nil
    end
    
    # 6
    it 'should start stopped app and process pending push message' do
      # puts 'should start stopped app and process pending push message'
    
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /push_client_rb/).should be_nil
    
      # puts 'Sending push message with greeting ...'
      message = 'Hello'
      params = { :user_id=>['pushclient'], :message => message}
      RhoconnectHelper.api_post('users/ping',params,@api_token)
    
      # puts 'Waiting ping message with push content ...'
      expect_request('alert', 60).should == message
    
      args =  $deviceId ?  ['-s', $deviceId, 'shell', 'ps'] : ['-e', 'shell', 'ps']
      output = Jake.run2('adb', args, {:hide_output => true})
      (output =~ /push_client_rb/).should_not be_nil
    end
    
    # 7
    it 'should logout and login back and process ping message' do
      # puts 'should logout and login back and process ping message'
    
      message = 'logout'
      params = { :user_id=>['pushclient'], :message=>message }
      RhoconnectHelper.api_post('users/ping',params,@api_token)
      expect_request('alert').should == message
    
      system("adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_rb/com.rhomobile.rhodes.RhodesActivity", :out=>"/dev/null").should == true
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
