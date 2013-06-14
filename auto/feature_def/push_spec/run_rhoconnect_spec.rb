require 'fileutils'
require 'rake'

load File.join($rho_root,'Rakefile')
load File.join($rho_root,'platform','android','build','android.rake')

def stop_apps
	RhoconnectHelper.stop_rhoconnect_stack
end

def cleanup_apps
	# Directory not empty?
	if File.directory?($tmp_path) and File.stat($tmp_path).nlink != 2
		puts "Cleanup #{File.expand_path($tmp_path)} directory ..."
		FileUtils.rm_r File.expand_path($tmp_path)
		puts
	end
end

def run_apps(platform)
	appname = "rhoconnect_push_client"
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

	FileUtils.mkdir_p File.expand_path($tmp_path)
	$server_path = File.expand_path(File.join($tmp_path,'testapp'))


	RhoconnectHelper.set_rhoconnect_bin "#{$rhoconnect_root}/bin/rhoconnect"
	puts "rhoconnect_bin: #{RhoconnectHelper.rhoconnect_bin}"

	RhoconnectHelper.set_rc_push_out File.open( File.join($app_path, "rhoconnect_push.log" ), "w")
	RhoconnectHelper.set_rc_out(File.open( File.join($app_path, "rhoconnect.log" ), "w"), File.open( File.join($app_path, "rhoconnect_err.log" ), "w"))
	# RhoconnectHelper.set_redis_out File.open( File.join($app_path, "redis.log" ), "w")
	RhoconnectHelper.set_enable_resque(false)
	RhoconnectHelper.set_enable_redis($rhoconnect_use_redis)

	stop_apps

	puts "generate app"
	res = RhoconnectHelper.generate_app($tmp_path, test_appname)
	puts "bundle install"
	Kernel.system("bundle", "install", :chdir => $server_path)

	RhoconnectHelper.start_rhoconnect_stack($server_path, true)

	File.open(File.join($app_path, 'app', 'sync_server.rb'), 'w') do |f|
		f.puts "SYNC_SERVER_HOST = '#{RhoconnectHelper.host}'"
		f.puts "SYNC_SERVER_PORT = #{RhoconnectHelper.port}"
	end
	File.open(File.join($app_path, 'app', 'push_server.rb'), 'w') do |f|
		f.puts "PUSH_SERVER_HOST = '#{RhoconnectHelper.push_host}'"
		f.puts "PUSH_SERVER_PORT = #{RhoconnectHelper.push_port}"
	end
	cfgfile = File.join($app_path, 'rhoconfig.txt')
	cfg = File.read(cfgfile)
	cfg.gsub!(/(rhoconnect_push_server.*)/, "rhoconnect_push_server = 'http://#{RhoconnectHelper.push_host}:#{RhoconnectHelper.push_port}'")
	File.open(cfgfile, 'w') {|f| f.write cfg}

	# TODO:
	# puts "Configure android ..."
	# Rake::Task["config:android:emulator"].invoke
	# AndroidTools.run_emulator( :wipe => true )

	TEST_PKGS.each do |pkg|
		out = `adb shell pm list packages #{pkg}`
		unless out.empty?
			puts "Uninstalling existing package #{pkg} ..."
    	system "adb uninstall #{pkg}"
  	end
	end

	push_service_apk = File.join($rhoelements_root,'libs','rhoconnect-push-service','rhoconnect-push-service.apk')
	puts "Install rhoconnect push service ..."
	#	AndroidTools.load_app_and_run("-e", push_service_apk, "")
	system("adb install -r #{push_service_apk}")

	puts 'Building and starting rhodes application ...'
	FileUtils.chdir File.join($spec_path, 'rhoconnect_push_client')

	# Patch rhodes 'build.yml' file: setup sdk and extentions properties
	# TODO: remove comments!
	File.open('./build.yml', 'w') do |bf|
	  File.open('./build.yml.example', 'r') do |f|
	    f.each do |line|
	      if line =~ /sdk: Path-to-Rhodes/
	          bf.puts "# sdk: \"#{$rho_root}\"\n"
	      elsif line =~ /Path-to-Motorola-Extensions/
	          bf.puts "#  extensions: \"#{$rhoelements_root}/extensions\"\n"
	      else
	          bf.puts line
	      end
	    end
	  end
	end

	# Running on emulator ...
	# system("rake run:#{$platform}").should == true
	# Running on phone ...
	system("rake run:#{$platform}:device").should == true

	puts "Running push specs ..."
	puts
rescue Exception => e
	puts "exception caught: #{e.inspect}"
	puts e.backtrace
end
