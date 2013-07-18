require 'yaml'
require 'fileutils'

TEST_PKGS = %w[com.rhomobile.push_client_js com.motsolutions.cto.services.ans]
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
puts "rhodes location: #{$rho_root}"
puts "rhoconnect location:  #{$rhoconnect_root}"
puts "rhoelements location: #{$rhoelements_root}"

$spec_path = FileUtils.pwd
$platform = 'android'
# Assume redis up and running. Do not touch it!
$rhoconnect_use_redis = false # true will start/stop it

require File.join($rho_root,'lib','build','jake.rb')
require File.join($rho_root,'platform','android','build','android_tools.rb')
require_relative './rhoconnect_helper'

RhoconnectHelper.set_enable_redis(false)
RhoconnectHelper.set_enable_resque(false)

appname = "push_client_js"
$app_path = File.expand_path(File.join(File.dirname(__FILE__),appname))

# Patching rhodes 'rhoconfig.txt' file
cfgfile = File.join($app_path, 'rhoconfig.txt')
cfg = File.read(cfgfile)
cfg.gsub!(/(syncserver.*)/, "syncserver = 'http://#{RhoconnectHelper.host}:#{RhoconnectHelper.port}'")
cfg.gsub!(/(Push.rhoconnect.pushServer.*)/, "Push.rhoconnect.pushServer = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
File.open(cfgfile, 'w') { |f| f.write cfg }

# Patching app server.js
servers = <<_SERVER_JS_
var PUSH_HOST = "#{RhoconnectHelper.push_host}",
    PUSH_PORT = #{RhoconnectHelper.push_port},
    RHOCONNECT_HOST = "#{RhoconnectHelper.host}",
    RHOCONNECT_PORT = #{RhoconnectHelper.port};
_SERVER_JS_
File.open(File.join($app_path, 'public', 'app', 'servers.js'), 'w') { |f| f << servers }

# Patching app sync_server.js
sync_server = <<_SYNC_SERVER_JS_
var SYNC_SERVER_HOST = "#{RhoconnectHelper.host}";
var SYNC_SERVER_PORT = #{RhoconnectHelper.port};
_SYNC_SERVER_JS_
File.open(File.join($app_path, 'public', 'app', 'sync_server.js'), 'w') { |f| f << sync_server }


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
  puts
  if dev == ''
    puts "-- Running push specs on android emulator"
  else
    $deviceId = dev.split("\t")[0]
    $deviceOpts = "-s #{$deviceId}"
    puts "-- Running push specs on device #{$deviceId}"
  end

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
  RhoconnectHelper.set_rc_push_out File.open( File.join($app_path, "rhoconnect_push.log" ), "w")
  RhoconnectHelper.set_rc_out(File.open( File.join($app_path, "rhoconnect.log" ), "w"),
      File.open( File.join($app_path, "rhoconnect_err.log" ), "w"))

  RhoconnectHelper.start_rhoconnect_stack($server_path, true)
  @api_token = RhoconnectHelper.api_post('system/login', { :login => 'rhoadmin', :password => '' })
  puts
  puts @api_token
  puts

  FileUtils.chdir File.join($spec_path, appname)
  if $deviceId
    TEST_PKGS.each do |pkg|
      out = `adb #{$deviceOpts} shell pm list packages #{pkg}`
      unless out.empty?
        puts "Uninstalling package #{pkg} ..."
        system "adb #{$deviceOpts} uninstall #{pkg}"
      end
    end

    puts "Install rhoconnect push service ..."
    push_service_apk = File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.apk')
    system("adb #{$deviceOpts} install -r #{push_service_apk}")

    puts "adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/push_client_js-debug.apk"
    system("adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/push_client_js-debug.apk")

    puts "\nStarting rhodes app on device ..."
    puts "adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_js/com.rhomobile.rhodes.RhodesActivity"
    system("adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_js/com.rhomobile.rhodes.RhodesActivity")

    rhodes_log = File.join($spec_path, appname, 'rholog.txt')
    File.unlink(rhodes_log) if File.exists?(rhodes_log)
    $logcat_pid = Kernel.spawn("adb #{$deviceOpts} logcat", :out => File.open(rhodes_log, "w"))
    puts "Starting logcat process with pid: #{$logcat_pid}"

  else

  end
  FileUtils.chdir $spec_path

end

