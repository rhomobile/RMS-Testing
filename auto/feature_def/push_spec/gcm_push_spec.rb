require 'thread'
require 'mspec'
require 'yaml'

cfg_file_name = File.join(File.dirname(__FILE__),'config.yml')
$rho_root = nil
if File.file?(cfg_file_name)
  config = YAML::load_file(cfg_file_name)
  $rho_root = config["rhodes"]
  $rho_root = File.expand_path($rho_root) if $rho_root

  # $rhoconnect_root = config["rhoconnect"]
  # $rhoconnect_root = File.expand_path($rhoconnect_root) if $rhoconnect_root

  # $rhoelements_root = config["rhoelements"]
  # $rhoelements_root = File.expand_path($rhoelements_root) if $rhoelements_root
end
unless $rho_root
  $rho_root = `get-rhodes-info --rhodes-path`.chomp
end
puts "$rho_root is #{$rho_root}"

require File.join($rho_root, 'lib', 'build', 'jake.rb')
require './simple_rhogcm'

$spec_path = FileUtils.pwd
$platform   = 'android'
$device_id  = nil
$server     = nil
$requests   = []
$signal     = ConditionVariable.new
$mutex      = Mutex.new

$gcm_api_key = 'AIzaSyANZO6psbeXLHvU88InbDnR6Zd_vZMWUZ8'
# $gcm_api_key = 'AIzaSyBfBxYzYbpGWQctSKwE_fQCgO-C6YqfemI'

describe 'GCM push spec' do
  before(:all) do
    #$app_path = File.expand_path(File.join(basedir,'spec',appname))
    #$app_config = Jake.config(File.open(File.join($app_path, "build.yml")))
    #$config = Jake.config(File.open(rhobuildyml,'r'))

    puts "Starting local server"
    $server, addr, port = Jake.run_local_server
    File.open(File.join($spec_path, 'gcm_push_client', 'app', 'local_server.rb'), 'w') do |f|
      f.puts "SPEC_LOCAL_SERVER_HOST = '#{addr}'"
      f.puts "SPEC_LOCAL_SERVER_PORT = #{port}"
    end

    $server.mount_proc('/', nil) do |req, res|
        puts "Request headers: #{req.header.inspect}"

        query = req.query
        puts "Request query:   #{query.inspect}"

        res.status = 200

        $mutex.synchronize do
          $requests << req
          $signal.signal
        end
    end

    puts 'Building and starting application...'
    FileUtils.chdir File.join($spec_path, 'gcm_push_client')
    #system("rake clean:#{$platform}")
    system("rake run:#{$platform}").should == true
  end

  it 'should register' do

    puts 'Waiting message with GCM registration...'
    $mutex.synchronize do
      res = $signal.wait($mutex, 120)
      $requests.count.should == 1

      $device_id = $requests.first.query['device_id']
      $device_id.should_not be_nil
      $device_id.should_not == ''

      $requests.clear
    end

  end

  it 'should proceed push message at foreground' do
    sleep 5

    puts 'Sending push message...'

    message = 'magic1'
    params = { 'device_pin'=>$device_id, 'alert'=>message }
    RhoPush::Gcm.send_ping_to_device($gcm_api_key, params)

    puts 'Waiting message with push content...'
    $mutex.synchronize do
      $signal.wait($mutex, 30)

      $requests.count.should == 1

      alert = $requests.first.query['alert']

      alert.should_not be_nil
      alert.should == message
      $requests.clear
    end
  end

  it 'should proceed push message with exit comand' do
    puts 'Sending push message with exit command...'

    message = 'magic2'
    params = { 'device_pin'=>$device_id, 'alert'=>message, 'command'=>'exit' }
    RhoPush::Gcm.send_ping_to_device($gcm_api_key, params)

    puts 'Waiting message with push content...'
    $mutex.synchronize do
      $signal.wait($mutex, 30) # timeout => 30 secs

      $requests.count.should == 1

      alert = $requests.first.query['alert']

      alert.should_not be_nil
      alert.should == message
      $requests.clear
    end

    sleep 5

    output = Jake.run2('adb', ['-e', 'shell', 'ps'], {:hide_output=>true})

    (output =~ /gcm_push_client/).should be_nil
  end

  it 'should start to proceed push message' do
    puts 'Sending push message to start app...'

    message = 'magic3'
    params = { 'device_pin'=>$device_id, 'alert'=>message}
    RhoPush::Gcm.send_ping_to_device($gcm_api_key, params)

    puts 'Waiting message with push content...'
    $mutex.synchronize do
      $signal.wait($mutex, 30)

      $requests.count.should == 1

      alert = $requests.first.query['alert']

      alert.should_not be_nil
      alert.should == message
      $requests.clear
    end

    sleep 5

    output = Jake.run2('adb', ['-e', 'shell', 'ps'], {:hide_output=>true})

    (output =~ /gcm_push_client/).should_not be_nil
  end

  it 'should proceed sequence of push messages' do
    puts 'Sending 5 push messages...'

    alerts = {}

    5.times do |i|
      message = "magic#{i}"
      alerts[message] = true
      params = { 'device_pin'=>$device_id, 'alert'=>message}
      RhoPush::Gcm.send_ping_to_device($gcm_api_key, params)
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
        #$requests.delete_at 0
      end

      $requests.clear
    end

  end

# TODO: rework this example
#   it 'should start to proceed sequence of push messages' do
#     puts 'Sending push message with exit command...'

#     message = 'magic6'
#     params = { 'device_pin'=>$device_id, 'alert'=>message, 'command'=>'exit' }
#     RhoPush::Gcm.send_ping_to_device($gcm_api_key, params)

#     puts 'Waiting message with push content...'
#     $mutex.synchronize do
#       $signal.wait($mutex, 30)

#       $requests.count.should == 1

#       alert = $requests.first.query['alert']

#       alert.should_not be_nil
#       alert.should == message
#       $requests.clear
#     end

#     sleep 5

#     output = Jake.run2('adb', ['-e', 'shell', 'ps'], {:hide_output=>true})

#     (output =~ /gcm_push_client/).should be_nil

# #    puts 'Sending 5 push messages...'

# #    alerts = {}

# #    5.times do |i|
# #      message = "magic#{i}"
# #      alerts[message] = true
# #      params = {'device_pin'=>$device_id, 'alert'=>message}
# #      RhoPush::Gcm.send_ping_to_device($gcm_api_key, params)
# #    end

# #    puts 'Waiting 5 messages with push content...'
# #    $mutex.synchronize do

# #    5.times do |i|
# #        break if $requests.count == 5
# #        $signal.wait($mutex)
# #    end

# #    $requests.count.should == 5

# #    5.times do |i|
# #        message = $requests.first.query['alert']
# #        message.should_not be_nil
# #        alerts[message].should be_true
# #        alerts[message] = false
# #        $requests.delete_at 0
# #      end
# #    end
#   end

 after(:all) do
   puts "Stopping android emulator"
  `adb emu kill`

   puts "Stopping local server"
   $server.shutdown
 end

end