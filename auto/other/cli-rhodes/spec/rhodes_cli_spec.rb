require 'rake'
require 'open3'
require 'fileutils'
require 'yaml'
require 'spec_helper'

describe "Testing Cloud Building through cli" do

	#load './Rakefile'
  	before(:each) do
    	stdout = ''
  	end

	it "should not throw any error with rake cloud:info inside valid rhohub project" do

		Open3.popen3('rake cloud:info') do |stdin, stdout, stderr, wait_thr|
		  stdout = stdout.read
			expect(stdout).to match(/Cloud build is enabled for/)
			expect(stdout).to match(/Builds limit/)
			expect(stdout).to match(/Free build queue slots/)
			expect(stdout).to match(/Server gem versions/)
			expect(stdout).to match(/Fast build supported for: 4.2/)
			expect(stdout).to match(/Using build.yml sdkversion setting/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

	end

	it "should not throw any error with rake cloud:build:initialize inside valid rhohub project" do

		Open3.popen3('rake cloud:build:initialize') do |stdin, stdout, stderr, wait_thr|
		    stdout = stdout.read
			expect(stdout).to match(/RhoHub User/)
			expect(stdout).to match(/application/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

	end
	
	it "should build for windows platform with command rake rake cloud:build:wm:production" do

		buffer = []
		filePath = ''

		Open3.popen3('rake cloud:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end

		expect(File.exist?(filePath)).to be true
	end

	it "should build for Android platform with command rake rake cloud:build:android:production" do
		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:android:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end

		expect(File.exist?(filePath)).to be true
	end

	it "should build for Iphone platform with command rake rake cloud:build:iphone:development" do
		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:iphone:development') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end

		expect(File.exist?(filePath)).to be true
	end
	it "should build for Win32 platform with command rake rake cloud:build:win32:production" do
		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:win32:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end

		expect(File.exist?(filePath)).to be true
	end

	it "should create a failed application build" do
		#Once we can able to push code with proxy then we can add code to make one build fail
	end

	it "should list all rho hub builds with command rake cloud:list_builds" do
		Open3.popen3('rake cloud:list_builds') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
		  	expect(stdout).to match(/ Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "should list all rhohub builds with command rake cloud:list_builds[true]" do

		Open3.popen3('rake cloud:list_builds[true]') do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "should list failed logs only with command rake cloud:list_builds[yes]" do

		Open3.popen3('rake cloud:list_builds[yes]') do |stdin, stdout, stderr, wait_thr|

		  	buffer = ''
			begin
			    while line = stdout.readline
			      puts line.gsub(/\n/, "<br/>")
			      buffer = buffer + "\n" + line
			    end
			rescue
			end

			expect(buffer).to match(/ERROR: Build log/)
			#expect(buffer).not_to match(/Download link/)
		end
	end

	it "rake cloud:list_builds from application with empty contain" do
		# Create a app folder
		FileUtils::mkdir_p 'invalidapp'
		# Copy build.yml and Rakefile
		FileUtils.cp("build.yml", "invalidapp")
		FileUtils.cp("Rakefile", "invalidapp")
		# Run rake cloud:list_builds
		Open3.popen3('rake -f ./invalidapp/Rakefile cloud:list_builds') do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		#Delete the folder after finishing the example
		FileUtils.rm_rf("invalidapp")

	end

	it "rake cloud:list_builds after building application for multiple platform in RhoHub" do

		Open3.popen3('rake cloud:list_builds') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
		  	expect(stdout).to match(/ Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "rake cloud:download[build_id] after build has succeed" do
		#Run rake cloud:list_builds to get the application id and zip file name
		#getCompletedBuilds

		buffer = []
		filePath = ''

		getCompletedBuilds.take(1).each {|key,value|

			build_id = key

			Open3.popen3("rake cloud:download[#{build_id}]") do |stdin, stdout, stderr, wait_thr|
				begin
			    while line = stdout.readline
					puts line.gsub(/\n/, '<br>')
					buffer << line
			    end
				rescue
				end
				filePath = getDownloadedBuildPath(buffer)
			end
		}

		expect(File.exist?(filePath)).to be true

	end

	it "rake cloud:download[build_id] after build has failed" do
		#Run rake cloud:list_builds to get the application id and zip file name
		#getCompletedBuilds

		buffer = []
		filePath = './rhohub'
		fileName = ''
		extension = ''

		getFailedBuilds.take(1).each {|key,value|

			build_id = key
			fileName = value
			Open3.popen3("rake cloud:download[#{build_id}]") do |stdin, stdout, stderr, wait_thr|
				begin
			    while line = stdout.readline
					puts line.gsub(/\n/, '<br>')
					buffer << line
			    end
				rescue
				end

			end
		}

		expect(File.exist?(filePath+'/'+fileName)).to be true

	end

	it "rake cloud:download[build_id] while build is in progress for WM" do
		
		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end
		
		expect(File.exist?(filePath)).to be true

	end

	it "rake cloud:download[build_id] without build_id" do
		
		buffer = []
		shouldInclude = ['Build id is not set, downloading latest one']
		downloadedLatest = false
		filePath = ''
		Open3.popen3("rake cloud:download[]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
			buffer.each {|entry|

		    	if shouldInclude.all?{ |word| entry.include? word }
		    		downloadedLatest = true
		    	end
			}
		end
		expect(downloadedLatest).to be true
		expect(File.exist?(filePath)).to be true

	end

	it "rake cloud:run:[build_id] with failed build_id" do
		buffer = []
		filePath = './rhohub'
		fileName = ''
		extension = ''

		getFailedBuilds.take(1).each {|key,value|

			build_id = key
			fileName = value
			Open3.popen3("rake cloud:run[#{build_id}]") do |stdin, stdout, stderr, wait_thr|
				begin
			    while line = stdout.readline
					puts line.gsub(/\n/, '<br>')
					buffer << line
			    end
				rescue
				end

			end
		}
	end

	it "rake cloud:clear:cache after downloading mutilple build" do
		#Not yet implemented as a feature
	end

	it "rake cloud:build:platform with particular rho version" do
		add_yml_setting("build.yml",{"rhohub" => {"rhodesgem" => "4.2.0.beta.12"}})

		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end
		
		expect(File.exist?(filePath)).to be true

	end
	
	it "rake cloud:build:platform with particular rho version" do
		add_yml_setting("build.yml",{"sdkversion" => "4.2.0"})

		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
			filePath = getDownloadedBuildPath(buffer)
		end
		
		expect(File.exist?(filePath)).to be true

	end
	
	it "should list all rhohub builds with command rake cloud:show:build" do

		Open3.popen3('rake cloud:show:build') do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/Download link/)			
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "should list failed logs only with command rake cloud:show:fail_log" do

		Open3.popen3('rake cloud:show:fail_log') do |stdin, stdout, stderr, wait_thr|

		  	buffer = ''
			begin
			    while line = stdout.readline
			      puts line.gsub(/\n/, "<br/>")
			      buffer = buffer + "\n" + line
			    end
			rescue
			end

			expect(buffer).to match(/ERROR: Build log/).and match(/failed/)
			expect(buffer).to_not match(/completed/)
			#expect(buffer).not_to match(/Download link/)
		end
	end
	
	it "should provide status of build with command rake cloud:show:build[build_id]" do
		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:android:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:show:build[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/queued/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
		
		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
		end
		
		Open3.popen3("rake cloud:show:build[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/completed/).or match(/failed/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end		
	end
	
	it "should provide status and log of build with command rake cloud:show:fail_log[build_id]" do
		buffer = []
		filePath = ''
		Open3.popen3('rake cloud:build:android:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake cloud:show:build[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/queued/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
		
		Open3.popen3("rake cloud:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
			begin
		    while line = stdout.readline
				puts line.gsub(/\n/, '<br>')
				buffer << line
		    end
			rescue
			end
		end
		
		Open3.popen3("rake cloud:show:build[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/completed/).or match(/failed/).and match(/Error building/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end		
	end	

end