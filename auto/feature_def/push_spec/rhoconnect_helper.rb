require 'fileutils'
require 'rake'
require 'socket'

module RhoconnectHelper
	require 'rest_client'
	require 'json'

	@@enable_redis = true
	@@enable_resque = true
	@@enable_push = true

	# rhoconnect settings
	@@host = Jake.localip
	@@port = 9292
	# rhoconnect-push settings
	@@push_host = Jake.localip
  @@push_port = 8675

	def self.set_enable_redis(b)
		@@enable_redis = b
	end

	def self.set_enable_resque(b)
		@@enable_resque = b
	end

	def self.set_enable_push(b)
		@@enable_push = b
	end

	@@rhoconnect_bin = nil
	def self.set_rhoconnect_bin(bin)
		@@rhoconnect_bin = bin
	end

	def self.rhoconnect_bin
		@@rhoconnect_bin
	end

	def self.host
		@@host
	end

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

	def self.push_host
		@@push_host
	end
	def self.push_host=(rcphost)
		@@push_host = rcphost
	end

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


		puts "Started rhoconnect server. App path: #{@@server_path}, host: #{@@host}, port: #{@@port}"
	end

	def self.stop_server
		execute_rhoconnect(@@server_path, "stop")
		@@server_pid = nil
		@@server_path = nil
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

	def self.api_get(request, api_token)
		headers = {}
		headers[:content_type] = :json
		headers['X-RhoConnect-API-TOKEN'] = api_token
		RestClient.get("#{@@host}:#{@@port}/rc/v1/#{request}", headers)
	end

	def self.api_delete(request,api_token=nil)
		headers = {}
		headers['X-RhoConnect-API-TOKEN'] = api_token if api_token
		RestClient.delete("#{@@host}:#{@@port}/rc/v1/#{request}",headers)
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
	end

	def self.stop_rhoconnect_push
		if @@rhoconnect_push_pid
			Process.kill('INT', @@rhoconnect_push_pid)
		else
			`killall -2 node 2> /dev/null`
		end
		@@rhoconnect_push_pid = nil
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
