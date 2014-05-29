require 'rake'
require 'open3'
require 'fileutils'
require 'yaml'
require 'spec_helper'

describe "Testing Rhodes cli" do



	#load './Rakefile'
  	before(:each) do
    	stdout = ''
  	end

	it "should ask for token after running the command rake rhohub:initialize without setting token" do

		# Delete the token in home directory if any token exist.
		FileUtils.rm_rf(Dir.home+"/.rhomobile")

		Open3.popen3('rake rhohub:initialize') do |stdin, stdout, stderr, wait_thr|
		    stdout = stdout.read
			expect(stdout).to match(/In order to use Rhodes framework you should set RhoHub API token for it/) # passes
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

	end

	it "should set the token by calling rake token:set[ad63553d542f7ff81cee22c079a09b4cdedef5a348def84e92]" do

		Open3.popen3('rake token:set[ad63553d542f7ff81cee22c079a09b4cdedef5a348def84e92]') do |stdin, stdout, stderr, wait_thr|
		    stdout = stdout.read
			expect(stdout).to match(/Token and subscription are valid/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "should not throw any error with rake rhohub:initialize inside valid rhohub project" do

		Open3.popen3('rake rhohub:initialize') do |stdin, stdout, stderr, wait_thr|
		    stdout = stdout.read
			expect(stdout).to match(/RhoHub User/)
			expect(stdout).to match(/application/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

	end

	it "should build for windows platform with command rake rake rhohub:build:wm:production" do

		buffer = []
		filePath = ''

		Open3.popen3('rake rhohub:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake rhohub:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
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

	it "should rake rhohub:build:<platform>:<mode>:download for Android" do
		buffer = []
		filePath = ''
		Open3.popen3('rake rhohub:build:android:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake rhohub:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
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

	it "should rake rhohub:build:<platform>:<mode>:download for win32" do
		buffer = []
		filePath = ''
		Open3.popen3('rake rhohub:build:win32:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake rhohub:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
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

	it "should list all rho hub builds with command rake rhohub:list_builds" do
		Open3.popen3('rake rhohub:list_builds') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
		  	expect(stdout).to match(/ Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "should list all rhohub builds with command rake rhohub:list_builds[true]" do

		Open3.popen3('rake rhohub:list_builds[true]') do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "should list failed logs only with command rake rhohub:list_builds[yes]" do

		Open3.popen3('rake rhohub:list_builds[yes]') do |stdin, stdout, stderr, wait_thr|

		  	buffer = ''
			begin
			    while line = stdout.readline
			      puts line.gsub(/\n/, "<br/>")
			      buffer = buffer + "\n" + line
			    end
			rescue
			end

			expect(buffer).to match(/Error building/)
			#expect(buffer).not_to match(/Download link/)
		end
	end

	it "rake rhohub:list_builds from application with empty contain" do
		# Create a app folder
		FileUtils::mkdir_p 'invalidapp'
		# Copy build.yml and Rakefile
		FileUtils.cp("build.yml", "invalidapp")
		FileUtils.cp("Rakefile", "invalidapp")
		# Run rake rhohub:list_builds
		Open3.popen3('rake -f ./invalidapp/Rakefile rhohub:list_builds') do |stdin, stdout, stderr, wait_thr|
		  	stdout = stdout.read
		  	expect(stdout).to match(/Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		#Delete the folder after finishing the example
		FileUtils.rm_rf("invalidapp")

	end

	it "rake rhohub:list_builds after building application for multiple platform in RhoHub" do

		Open3.popen3('rake rhohub:list_builds') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
		  	expect(stdout).to match(/ Download link/)
		  	puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end
	end

	it "rake rhohub:download[build_id] after build has succeed" do
		#Run rake rhohub:list_builds to get the application id and zip file name
		#getCompletedBuilds

		buffer = []
		filePath = ''

		getCompletedBuilds.take(1).each {|key,value|

			build_id = key

			Open3.popen3("rake rhohub:download[#{build_id}]") do |stdin, stdout, stderr, wait_thr|
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

	it "rake rhohub:download[build_id] after build has failed" do
		#Run rake rhohub:list_builds to get the application id and zip file name
		#getCompletedBuilds

		buffer = []
		filePath = './rhohub'
		fileName = ''
		extension = ''

		getFailedBuilds.take(1).each {|key,value|

			build_id = key
			fileName = value
			Open3.popen3("rake rhohub:download[#{build_id}]") do |stdin, stdout, stderr, wait_thr|
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

	it "rake rhohub:download[build_id] while build is in progress for WM" do
		
		buffer = []
		filePath = ''
		Open3.popen3('rake rhohub:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake rhohub:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
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

	it "rake rhohub:download[build_id] without build_id" do
		
		buffer = []
		shouldInclude = ['Build id is not set, downloading latest one']
		downloadedLatest = false
		filePath = ''
		Open3.popen3("rake rhohub:download[]") do |stdin, stdout, stderr, wait_thr|
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

	it "rake rhohub:run:[build_id] with failed build_id" do
		buffer = []
		filePath = './rhohub'
		fileName = ''
		extension = ''

		getFailedBuilds.take(1).each {|key,value|

			build_id = key
			fileName = value
			Open3.popen3("rake rhohub:run[#{build_id}]") do |stdin, stdout, stderr, wait_thr|
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

	xit "rake rhohub:clear:cache after downloading mutilple build" do
		#Not yet implemented as a feature
	end

	it "rake rhohub:build:platform with particular rho version" do
		add_yml_setting("build.yml",{"rhohub" => {"rhodesgem" => "4.2.0.beta.12"}})

		buffer = []
		filePath = ''
		Open3.popen3('rake rhohub:build:wm:production') do |stdin, stdout, stderr, wait_thr|
			stdout = stdout.read
			expect(stdout).to match(/queued/)
			puts "stdout is:" + stdout.gsub(/\n/, "<br/>")
		  	puts "stderr is:" + stderr.read
		end

		build_id = getQueuedBuilds

		Open3.popen3("rake rhohub:download[#{build_id[0]}]") do |stdin, stdout, stderr, wait_thr|
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

end