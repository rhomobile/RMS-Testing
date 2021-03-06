require 'fileutils'
require 'rake'

load File.join($rho_root,'Rakefile')
load File.join($rho_root,'platform','android','build','android.rake')
load File.join($rho_root,'platform','wm','build','wm.rake')

def convert_to_windows_path_style_str(pathStr)
        # RDBServer doesn't work properly with '/' in the CAB file paths
 	pathStr.gsub(File::SEPARATOR, File::ALT_SEPARATOR || File::SEPARATOR)
end

def stop_apps
	if $use_own_rhoconnect_stack
		RhoconnectHelper.stop_rhoconnect_stack
	end
end

def cleanup_apps
	# Directory not empty?
	if File.directory?($tmp_path) and File.stat($tmp_path).nlink != 2
		puts "Cleanup #{File.expand_path($tmp_path)} directory ..."
		FileUtils.rm_r File.expand_path($tmp_path)
	end
end

def run_apps(platform)
	load File.join($rho_root,'Rakefile')
	load File.join($rho_root,'platform','android','build','android.rake')

	appname = "push_client_rb"
	test_appname = "testapp"

	puts "run_spec_app(#{platform},#{appname})"

	rhobuildyml = File.join($rho_root,'rhobuild.yml')
	$app_path = File.expand_path(File.join(File.dirname(__FILE__),appname))
	puts "app path: #{$app_path}"

	$app_config = Jake.config(File.open(File.join($app_path, "build.yml")))
	config = Jake.config(File.open(rhobuildyml,'r'))

	$source_path = File.expand_path(File.join($app_path,'server'))
	$tmp_path = File.join(File.dirname(__FILE__),'tmp')

	cleanup_apps

	if $use_own_rhoconnect_stack
		FileUtils.mkdir_p File.expand_path($tmp_path)
		$server_path = File.expand_path(File.join($tmp_path,'testapp'))

		RhoconnectHelper.set_rhoconnect_bin $rhoconnect_root
		puts "rhoconnect_bin: #{RhoconnectHelper.rhoconnect_bin}"

		RhoconnectHelper.set_rc_push_out File.open( File.join($app_path, "rhoconnect_push.log" ), "w")
		RhoconnectHelper.set_rc_out(File.open( File.join($app_path, "rhoconnect.log" ), "w"), File.open( File.join($app_path, "rhoconnect_err.log" ), "w"))
		RhoconnectHelper.set_redis_out File.open( File.join($app_path, "redis.log" ), "w") if $rhoconnect_use_redis
		rhodes_log = File.join($spec_path, appname, 'rholog.txt')
		File.unlink(rhodes_log) if File.exists?(rhodes_log)
		RhoconnectHelper.set_enable_redis($rhoconnect_use_redis)
		RhoconnectHelper.set_enable_resque(false)

		stop_apps

		puts "Generating rhoconnect app ..."
		res = RhoconnectHelper.generate_app($tmp_path, test_appname)
		puts "bundle install"
		Kernel.system("bundle", "install", :chdir => $server_path)

		RhoconnectHelper.start_rhoconnect_stack($server_path, true)
	else
		RhoconnectHelper.host = $rc_stack_address
		RhoconnectHelper.port = $rc_stack_port
		RhoconnectHelper.push_host = $rc_push_server_address
		RhoconnectHelper.push_port = $rc_push_server_port
	end

	$app_path = File.expand_path(File.join(File.dirname(__FILE__),appname))
	# File.open(File.join($app_path, 'app', 'sync_server.rb'), 'w') do |f|
	# 	f.puts "SYNC_SERVER_HOST = '#{RhoconnectHelper.host}'"
	# 	f.puts "SYNC_SERVER_PORT = #{RhoconnectHelper.port}"
	# end
	# File.open(File.join($app_path, 'app', 'push_server.rb'), 'w') do |f|
	# 	f.puts "PUSH_SERVER_HOST = '#{RhoconnectHelper.push_host}'"
	# 	f.puts "PUSH_SERVER_PORT = #{RhoconnectHelper.push_port}"
	# end
	# Patch rhodes 'rhoconfig.txt' file
	cfgfile = File.join($app_path, 'rhoconfig.txt')
	cfg = File.read(cfgfile)
	cfg.gsub!(/(syncserver.*)/, "syncserver = 'http://#{RhoconnectHelper.host}:#{RhoconnectHelper.port}'")
	cfg.gsub!(/(rhoconnect_push_server.*)/, "rhoconnect_push_server = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
	cfg.gsub!(/(Push.rhoconnect.pushServer.*)/, "Push.rhoconnect.pushServer = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
	File.open(cfgfile, 'w') { |f| f.write cfg }

	if $platform == 'android'
		if $deviceId
			# Using attached device
			TEST_PKGS.each do |pkg|
				out = `adb #{$deviceOpts} shell pm list packages #{pkg}`
				unless out.empty?
					puts "Uninstalling package #{pkg} ..."
		    	system "adb #{$deviceOpts} uninstall #{pkg}"
		  	end
			end

			FileUtils.chdir File.join($spec_path, appname)
			puts "Install rhoconnect push service ..."
			push_service_apk = File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.apk')
			#	AndroidTools.load_app_and_run("-e", push_service_apk, "")
			system("adb #{$deviceOpts} install -r #{push_service_apk}").should == true

			puts "\nInstalling rhodes app on device ..."
			puts "adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/push_client_rb-debug.apk"
			system("adb #{$deviceOpts} install -r #{Dir.pwd}/bin/target/android/push_client_rb-debug.apk").should == true

			# adb -s 34010534 shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_rb/com.rhomobile.rhodes.RhodesActivity
			puts "\nStarting rhodes app on device ..."
			puts "adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_rb/com.rhomobile.rhodes.RhodesActivity"
			system("adb #{$deviceOpts} shell am start -a android.intent.action.MAIN -n com.rhomobile.push_client_rb/com.rhomobile.rhodes.RhodesActivity").should == true

			$logcat_pid = Kernel.spawn("adb #{$deviceOpts} logcat",
				:out => File.open(File.join($spec_path, appname, 'rholog.txt'), "w"))
			puts "Starting logcat process with pid: #{$logcat_pid}"
		else
			# Using emulator
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

			puts "Install rhoconnect push service"
			push_service_apk = File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.apk')
			AndroidTools.load_app_and_run("-e", push_service_apk, "")

			puts 'Building and starting rhodes application ...'
			FileUtils.chdir File.join($spec_path, appname)
			system("rake run:#{$platform}").should == true
		end
	else
		#
		# TODO: windows mobile
		puts
		puts "Specs for Windows Mobile/CE Devices should be here ..."
		puts

		puts "1st step : Build the Test App"
		$wm_build_rakefile_dir = convert_to_windows_path_style_str(File.join($rhoelements_root, 'build', 'ci', 'windows'))
		$wm_build_rakefile = convert_to_windows_path_style_str(File.join($rhoelements_root,'build','ci','windows','Rakefile'))
		rhodes_app_dir = convert_to_windows_path_style_str(File.join($testsuite_root,'auto','feature_def','push_spec',appname))
		cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:build_native_test_app_#{$device_os_platform}['#{rhodes_app_dir}']"
		puts "CMD is: #{cmd}"
                $out_code = system(cmd)
		puts "Build is finished with #{$out_code} !!!"

		puts "2nd step : Reboot the device at #{$device_address}"
		cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:reboot[#{$device_address}]"
		puts "CMD is: #{cmd}"
		$out_code = system(cmd)
		puts "Device reboot is finished with #{$out_code}"

		puts "3rd step : install the push service"
		aux_lib_push_service_cab = nil
		if $device_os_platform == "wm"
			aux_lib_push_service_cab = convert_to_windows_path_style_str(File.join($rhoelements_root,'libs','rhoconnect-push-service','NETCFv35.Messages.EN.wm.cab'))
		elsif $device_os_platform == "ce"
			aux_lib_push_service_cab = convert_to_windows_path_style_str(File.join($rhoelements_root,'libs','rhoconnect-push-service','NETCFv35.Messages.EN.cab'))
		end
		cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:install_cab_to_device[#{$device_address},#{aux_lib_push_service_cab}]"
		puts "CMD is: #{cmd}"
		$out_code = system(cmd)
		puts "Install CAB #{aux_lib_push_service_cab} is finished with #{$out_code}"
		push_service_cab = convert_to_windows_path_style_str(File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.cab'))
		cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:install_cab_to_device[#{$device_address},#{push_service_cab}]"
		puts "CMD is: #{cmd}"
		$out_code = system(cmd)
		puts "RhoConnect Push Service is installed with #{$out_code} !!!"

		puts "4th step: install the test application"
		spec_app_cab = nil
		if $device_os_platform == "wm"
			spec_app_cab = convert_to_windows_path_style_str(File.join($spec_path,appname,'bin','target','wm6p','push_client_rb.cab'))
		else
			spec_app_cab = convert_to_windows_path_style_str(File.join($spec_path,appname,'bin','target','push_client_rb.cab'))
		end
                cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:install_cab_to_device[#{$device_address},#{spec_app_cab}]"
		puts "CMD is: #{cmd}"
	        $out_code = system(cmd)
                puts  "Test Application is installed with #{$out_code} !!!"

                puts "5th step: Start the test application"
		cmd = "cd #{$wm_build_rakefile_dir} && rake -f #{$wm_build_rakefile} windows:start_test_app_bg[#{$device_address},push_client_rb]"
		puts "CMD is: #{cmd}"
                $out_code = system(cmd)
		puts " Application is started with #{$out_code}"
	end
	puts "Running push specs ..."
	puts
rescue Exception => e
	puts "exception caught: #{e.inspect}"
	puts e.backtrace
end
