require 'thread'
require 'mspec'
require 'restclient'
require 'yaml'
require 'psych' if RUBY_VERSION.to_s > "1.9.0"

puts 'RUBY VERSION: ' + RUBY_VERSION.to_s
#TEST_PKGS = %w[com.rhomobile.rho_push_client com.motsolutions.cto.services.ans]

cfgfilename = File.join(File.dirname(__FILE__),'config.yml')

$rho_root = nil
$use_own_rhoconnect_stack=false
if File.file?(cfgfilename)
  config = YAML::load_file(cfgfilename)
  $rho_root = config["rhodes"]
  $rhoconnect_root = config["rhoconnect"]
  $rho_root = File.expand_path($rho_root) if $rho_root
  $rhoconnect_root = File.expand_path($rhoconnect_root) if $rhoconnect_root
  $rhoelements_root = config["rhoelements"]
  $rhoelements_root = File.expand_path($rhoelements_root) if $rhoelements_root
  $testsuite_root = config["testsuite_root"]
  $testsuite_root = File.expand_path($testsuite_root) if $testsuite_root
  $rc_stack_address = config["rc_stack_address"]
  $rc_stack_port = config["rc_stack_port"]
  $rc_push_server_address = config["rc_push_server_address"]
  $rc_push_server_port = config["rc_push_server_port"]
  $device_address = config["device_address"]
  $device_os_platform = config["device_os"]
end

unless $rho_root
  $rho_root = `get-rhodes-info --rhodes-path`.chomp
end

$collapse_id = 0

puts "rhodes location: #{$rho_root}"
puts "rhoconnect location:  #{$rhoconnect_root}"
puts "rhoelements location: #{$rhoelements_root}"

$spec_path = FileUtils.pwd
$platform = 'windows'
$server = nil
$requests = []
$signal = ConditionVariable.new
$mutex = Mutex.new
$rhoconnect_use_redis = true # true will start/stop it

require File.join($rho_root,'lib','build','jake.rb')
require_relative './rhoconnect_helper'
require_relative './spec_helper'

#TODO: check that Rhoelements gem is installed
puts "Starting local server"
$server, addr, port = Jake.run_local_server(49254)
File.open(File.join($spec_path, 'push_client_rb', 'app', 'local_server.rb'), 'w') do |f|
  f.puts "SPEC_LOCAL_SERVER_HOST = '#{addr}'"
  f.puts "SPEC_LOCAL_SERVER_PORT = #{port}"
end

$server.mount_proc('/', nil) do |req, res|
  query = req.query
      
  res.status = 200
  $mutex.synchronize do
    $requests << req
    puts "req is #{req}"
    $signal.signal
  end
end

describe 'Windows Mobile push spec' do
  before(:all) do

    run_apps($platform)

    @api_token = RhoconnectHelper.api_post('system/login', { :login => 'rhoadmin', :password => '' })
    puts "API token: #{@api_token}"
  end


  after(:all) do
    # send exit to the app
    message = 'exit_and_logout'
    params = { :user_id=>['pushclient'], :badge => $collapse_id, :message=>message }
    $collapse_id += 1
    RhoconnectHelper.api_post('users/ping',params,@api_token)
    expect_request('alert').should == message

    # reset RhoConnect app
    RhoconnectHelper.api_post('system/reset',{},@api_token)

    stop_apps
    cleanup_apps
  end

  def expect_request(name)
    val = nil
    $mutex.synchronize do
      $signal.wait($mutex, 100) # wait timeout 60 secs.
      $requests.count.should == 1
      val = $requests.first.query[name]
      $requests.clear
    end
    val
  end

  it 'should login' do
    expect_request('error').should == "0"
  end

  it 'should register' do
    puts 'Waiting message with Rhoconnect registaration...'
    $device_id = expect_request('device_id')
    $device_id.should_not be_nil
    $device_id.should_not == ''
  end

  it 'should proceed push message at foreground' do
    sleep 5
    puts 'Sending push message...'

    message = 'sample_magic'
    params = { :user_id=>['pushclient'], :badge => $collapse_id.to_s, :message=>message }
    $collapse_id += 1
    RhoconnectHelper.api_post('users/ping',params,@api_token)

    puts 'Waiting message with push content...'
    expect_request('alert').should == message

    sleep 3
  end

  it 'should proceed push message with exit comand' do
    puts 'Sending push message with exit command...'

    message = 'exit'
    params = { :user_id=>['pushclient'], :badge => $collapse_id.to_s, :message=>message }
    RhoconnectHelper.api_post('users/ping',params,@api_token)
    $collapse_id += 1
    puts 'Waiting message with push content...'
    expect_request('alert').should == message

    # wait until application exits
    sleep 5
  end

  it 'should process push message and wake up the app' do
  	puts 'Sending push message with greeting ...'
  	message = 'Hello'
  	params = { :user_id=>['pushclient'], :badge => $collapse_id, :message => message}
  	RhoconnectHelper.api_post('users/ping',params,@api_token)
        $collapse_id += 1

  	puts 'Waiting ping message with push content ...'
    3.times do |i|
      $mutex.synchronize do
        break if $requests.count == 3
        $signal.wait($mutex, 100)
      end
      puts "Message count: #{$requests.count}"
    end

    got_login = 0
    got_device_id = 0
    got_hello = 0
    got_error = 0
    dev_id = nil
    res_message = nil
    $mutex.synchronize do
      $requests.each do |res|
        error = res.query['error']
        if error != nil and error != "" and error != '0'
          got_error += 1
        end 
        method = res.query['method']
        case method
        when 'login'
          got_login += 1
        when 'register'
          dev_id = res.query['device_id']
          got_device_id += 1
        when 'push'
          res_message = res.query['alert']
          got_hello += 1
        end
      end
      $requests.clear
    end

    res_message.should == message
    got_error.should == 0
    dev_id.should == $device_id
    got_login.should == 1
    got_device_id.should == 1
    got_hello.should == 1
  end

  it 'should process sequence of push messages' do
  	puts 'Sending 5 push messages...'

  	alerts = {}
  	5.times do |i|
  		message = "magic#{i}"
  		alerts[message] = true
  		params = { :user_id=>['pushclient'], :badge => $collapse_id, :message => message}
		  $collapse_id += 1
  		RhoconnectHelper.api_post('users/ping',params,@api_token)
  		sleep 3
  	end

  	puts 'Waiting 5 messages with push content...'

  	5.times do |i|
  		$mutex.synchronize do
  			break if $requests.count == 5
  			$signal.wait($mutex, 100)
  		end
  		puts "Message count: #{$requests.count}"
  	end

  	num_received = 0
  	received_messages = []
    $mutex.synchronize do
      num_received = $requests.count
      $requests.each do |res|
  			message = res.query['alert']
        received_messages << message
      end
  		$requests.clear
  	end

    num_received.should == 5
    received_messages.each do |message|
      message.should_not be_nil
      alerts[message].should be_true
      alerts[message] = false
    end
  end

  it 'should logout and login back and process ping message' do
    message = 'exit_and_logout'
    params = { :user_id=>['pushclient'], :badge => $collapse_id, :message=>message }
    $collapse_id += 1
  	RhoconnectHelper.api_post('users/ping',params,@api_token)
  	expect_request('alert').should == message

    sleep 15

  	puts "Re-Start the test application"
    cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:start_test_app_bg[#{$device_address},Rho_Push_Client]"
    puts "CMD is: #{cmd}"
    $out_code = system(cmd)
    puts " Application is started with #{$out_code}"

  	expect_request('error').should == "0"
  	$device_id = expect_request('device_id')
  	$device_id.should_not be_nil
  	$device_id.should_not == ''

  	message = 'welcome'
  	params = { :user_id=>['pushclient'], :badge => $collapse_id, :message => message}
    $collapse_id += 1
  	RhoconnectHelper.api_post('users/ping',params,@api_token)
  	expect_request('alert').should == message
  end
end