require 'fileutils'
require 'rake'
require 'socket'

module RhoconnectHelper
	require 'rest_client'
	require 'json'

	@@enable_redis = true
	@@enable_resque = true
	@@enable_push = true
	#@@enable_rails = true

	def self.set_enable_redis(b)
		@@enable_redis = b
	end

	def self.set_enable_resque(b)
		@@enable_resque = b
	end

	def self.set_enable_push(b)
		@@enable_push = b
	end

	# def self.set_enable_rails(b)
	# 	@@enable_rails = b
	# end


	@@rhoconnect_bin = nil
	def self.set_rhoconnect_bin(bin)
		@@rhoconnect_bin = bin
	end

	def self.rhoconnect_bin
		@@rhoconnect_bin
	end

	@@host = nil
	def self.host
		@@host
	end

	@@port = nil
	def self.port
		@@port
	end

	def self.host=(rchost)
		@@host = rchost
	end

	def self.port=(rcport)
		@@port = rcport
	end

	@@server_pid = nil
	@@resque_pid = nil
	@@rhoconnect_push_pid = nil
  	@@redis_pid = nil

	@@rc_out = $stdout
	@@rc_err = $stderr
	def self.set_rc_out(rc_out, rc_err)
		@@rc_out = rc_out
		@@rc_err = rc_err
	end

	@@resque_out = $stdout
	def self.set_resque_out(resque_out)
		@@resque_out = resque_out
	end

	@@redis_out = $stdout
	def self.set_redis_out(redis_out)
		@@redis_out = redis_out
	end

	@@rc_push_out = $stdout
	def self.set_rc_push_out(rc_push_out)
		@@rc_push_out = rc_push_out
	end

	@@push_host = nil
	def self.push_host
		@@push_host
	end
	def self.push_host=(rcphost)
		@@push_host = rcphost
	end

	@@push_port = nil
	def self.push_port
		@@push_port
	end
	def self.push_port=(rcpport)
		@@push_port = rcpport
	end

	@@server_path = nil

	def self.start_server(dir)
		@@server_path = dir

		if RUBY_PLATFORM =~ /(win|w)32$/
			@@server_pid = Kernel.spawn("ruby",@@rhoconnect_bin,"start",:chdir=>@@server_path,:out =>@@rc_out)
		else
			@@server_pid = execute_rhoconnect(@@server_path,"startbg")
		end

		@@host = Jake.localip
		@@port = 9292

		puts "Started rhoconnect server. App path: #{@@server_path}, host: #{@@host}, port: #{@@port}"
	end

	def self.stop_server
		execute_rhoconnect(@@server_path, "stop")
		@@server_pid = nil
		@@server_path = nil
		@@host = nil
		@@port = nil
	end

	def self.start_redis
		@@redis_pid = Kernel.spawn("redis-server", :out => @@redis_out )
	end

	def self.stop_redis
		Process.kill('INT', @@redis_pid) if @@redis_pid
 		@@redis_pid = nil
	end

	def self.start_resque
		@@resque_pid = Kernel.spawn({ "QUEUE" => "*" }, "rake","resque:work",:chdir => @@server_path, :out => @@resque_out )
	end

	def self.stop_resque
		Process.kill('INT', @@resque_pid) if @@resque_pid
		@@resque_pid = nil
	end

	def self.api_post(request,params,api_token=nil)
		headers = {}
		headers[:content_type] = :json
		headers['X-RhoConnect-API-TOKEN'] = api_token if api_token
		# puts "POST request to Rhoconnect: params: #{params}, headers: #{headers}"
		RestClient.post("#{@@host}:#{@@port}/rc/v1/#{request}",params.to_json, headers)
	end

	def self.api_get(request,params,api_token=nil)
		headers = {}
		headers[:content_type] = :json
		headers['X-RhoConnect-API-TOKEN'] = api_token if api_token
		# puts "GET request to Rhoconnect: params: #{params}, headers: #{headers}"
		RestClient.get("#{@@host}:#{@@port}/rc/v1/#{request}",params.to_json, headers)
	end

	def self.reset_server
		begin
			platform = platform
			exact_url = "http://#{@@host}:#{@@port}"
			puts "going to reset server: #{exact_url}"
			# login to the server
			api_token = api_post('system/login', { :login => 'rhoadmin', :password => '' })
			api_post('system/reset', {:api_token => api_token})
			puts "reset OK"
			rescue Exception => e
			puts "reset_spec_server failed: #{e}"
		end
	end

	def self.start_rhoconnect_stack(dir,reset = false)

		if @@enable_redis
			puts "run redis"
			start_redis
			sleep(10)
		end

		if @@enable_push
			puts "run rhoconnect push"
			start_rhoconnect_push
			sleep 10
		end

		puts "run rhoconnect"
		start_server(dir)
		sleep(10)
=begin
		if @@enable_rails
			puts "run rails"
			start_rails
			sleep 10
		end
=end
		if reset
			puts "reset rhoconnect"
			reset_server
		end

		if @@enable_resque
			puts "run resque"
			start_resque
			sleep(10)
		end
	end

	def self.stop_rhoconnect_stack
		if @@enable_resque
			puts "stop resque"
			stop_resque
		end

		puts "stop rhoconnect"
		stop_server
=begin
		if @@enable_rails
			puts "stop rails"
			stop_rails
		end
=end
		if @@enable_push
			puts "stop rhoconnect push"
			stop_rhoconnect_push
		end

		if @@enable_redis
			puts "stop redis"
			stop_redis
		end
	end

	def self.generate_app(dir,name)
		puts "generating rhoconnect app: rhoconnect is: #{@@rhoconnect_bin}, app name is #{name}, dir is #{dir}"
		execute_rhoconnect(dir,"app",name)
	end

	def self.start_rhoconnect_push
		@@rhoconnect_push_pid = Kernel.spawn("rhoconnect-push start -d 3", :out => @@rc_push_out)
		@@push_host = Jake.localip
		@@push_port = 8675
	end

	def self.stop_rhoconnect_push
		Process.kill('INT', @@rhoconnect_push_pid) if @@rhoconnect_push_pid
		@@rhoconnect_push_pid = nil
		@@push_host = nil
		@@push_port = nil
	end

	def self.start_rails
		#TODO
	end

	def self.stop_rails
		#TODO
	end

	def self.execute_rhoconnect(workdir,*args)
		cmd = ""

		if RUBY_PLATFORM =~ /(win|w)32$/
			cmd = "ruby #{@@rhoconnect_bin}"
		else
			cmd = "#{@@rhoconnect_bin}"
		end

		args.each do |arg|
			cmd = "#{cmd} #{arg}"
		end

		puts cmd
		if workdir
			Kernel.system(cmd,:chdir => workdir, :out => @@rc_out, :err => @@rc_err)
		else
			Kernel.system(cmd, :out => @@rc_out, :out => @@rc_out, :err => @@rc_err)
		end
	end
end
