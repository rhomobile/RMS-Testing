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
  $device_id = config["device_address"]
end

unless $rho_root
  $rho_root = `get-rhodes-info --rhodes-path`.chomp
end

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

describe 'Windows Mobile push spec' do
  before(:all) do
    #TODO: check that Rhoelements gem is installed
    puts "Starting local server"
    $server, addr, port = Jake.run_local_server(49254)
    File.open(File.join($spec_path, 'rhoconnect_push_client', 'app', 'local_server.rb'), 'w') do |f|
      f.puts "SPEC_LOCAL_SERVER_HOST = '#{addr}'"
      f.puts "SPEC_LOCAL_SERVER_PORT = #{port}"
    end

    $server.mount_proc('/', nil) do |req, res|
      query = req.query
      # puts "Request headers: #{req.header.inspect}"
      # puts "Request query: #{query.inspect}"

      res.status = 200
      $mutex.synchronize do
        $requests << req
	    puts "req is #{req}"
        $signal.signal
      end
    end

    run_apps($platform)
    
    @api_token = RhoconnectHelper.api_post('system/login', { :login => 'rhoadmin', :password => '' })
    puts "API token: #{@api_token}"
  end


  after(:all) do
    stop_apps
    cleanup_apps
    # FIXME:
    # `adb emu kill`

    puts "Sending exit and logout message to the app"
    RhoconnectHelper.api_post('users/ping', { :user_id => ['pushclient'], :badge => 'exit_spec', :message => 'exit' }, @api_token)
    # delete user
    #RhoconnectHelper.api_delete('users/pushclient', @api_token)
    #$server.shutdown

    # FIXME:
    # TEST_PKGS.each do |pkg|
    #   puts "Uninstalling package #{pkg} ..."
    #   system "adb -s #{$deviceId} uninstall #{pkg}"
    # end
    # system "kill -9 #{$logcat_pid}" if $logcat_pid
    # puts "Uninstalling package com.rhomobile.rho_push_client ..."
    # system "adb uninstall com.rhomobile.rho_push_client"
    # puts "Uninstalling package com.motsolutions.cto.services.ans ..."
    # system "adb uninstall com.motsolutions.cto.services.ans"
  end

  def expect_request(name)
    val = nil
    $mutex.synchronize do
      $signal.wait($mutex, 60) # wait timeout 60 secs.
      $requests.count.should == 1
      val = $requests.first.query[name]
      $requests.clear
    end
    val
  end

  it 'should login' do
    #'pending'.should_not be_nil
    # puts 'Waiting message with login errCode'
    #pending
    expect_request('error').should == "0"
  end

  it 'should register' do
    puts 'Waiting message with Rhoconnect registaration...'
    #'pending'.should_not be_nil
    #pending
    $device_id = expect_request('device_id')
    $device_id.should_not be_nil
    $device_id.should_not == ''
  end

  it 'should proceed push message at foreground' do
    #'pending'.should_not be_nil
    #pending
    sleep 5
    puts 'Sending push message...'

    message = 'sample_magic'
    params = { :user_id=>['pushclient'], :badge => message, :message=>message }
    RhoconnectHelper.api_post('users/ping',params,@api_token)

    puts 'Waiting message with push content...'
    expect_request('alert').should == message

    sleep 3
  end

  it 'should proceed push message with exit comand' do
    puts 'Sending push message with exit command...'

    message = 'exit'
    params = { :user_id=>['pushclient'], :badge => message, :message=>message }
    RhoconnectHelper.api_post('users/ping',params,@api_token)

    puts 'Waiting message with push content...'
    expect_request('alert').should == message

    # wait until application exits
    sleep 10

  #   output = Jake.run2('adb', ['-e', 'shell', 'ps'], {:hide_output=>true})
  #   (output =~ /rho_push_client/).should be_nil
  end

  it 'should process push message and wake up the app' do
  	puts 'Sending push message with greeting ...'
  	message = 'Hello'
  	params = { :user_id=>['pushclient'], :badge => message, :message => message}
  	RhoconnectHelper.api_post('users/ping',params,@api_token)

  	puts 'Waiting ping message with push content ...'
  	expect_request('alert').should == message

  	sleep 5

  #   output = Jake.run2('adb', ['-e', 'shell', 'ps'], {:hide_output => true})
  #  (output =~ /rho_push_client/).should_not be_nil
  end

  #it 'should process sequence of push messages' do
  #    puts 'Sending 5 push messages...'

  #    alerts = {}
  #    5.times do |i|
  #      message = "magic#{i}"
  #      alerts[message] = true
  #      params = { :user_id=>['pushclient'], :badge => message, :message => message}
  #      RhoconnectHelper.api_post('users/ping',params,@api_token)
  #      sleep 2
  #    end
  #    puts 'Waiting 5 messages with push content...'
  #    5.times do |i|
  #      $mutex.synchronize do
  #        break if $requests.count == 5
  #        $signal.wait($mutex, 30)
  #      end
  #      puts "Message count: #{$requests.count}"
  #    end
  #    $requests.count.should == 5
  #    $mutex.synchronize do
  #      puts alerts.inspect
  #      5.times do |i|
  #        message = $requests[i].query['alert']
  #        message.should_not be_nil
  #        puts "message: #{message}"
  #        alerts[message].should be_true
  #        alerts[message] = false
          #$requests.delete_at 0
  #      end
  #      $requests.clear
  #    end
  #end
end