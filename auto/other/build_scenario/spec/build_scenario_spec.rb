require 'rake'
require 'open3'
require 'fileutils'
require 'yaml'
require 'spec_helper'

#load './Rakefile'

describe "Testing build scenario" do
	$buffer = ''
	filePath = ''
	BUILD_LOG_PATH = "./buildlog"
	$log_file = ''

	# Deleting and creating buildlog folder to keep all build logs for each example
  	FileUtils.rm_rf(BUILD_LOG_PATH)
  	FileUtils::mkdir_p BUILD_LOG_PATH
	
	before(:each) do
    	stdout = ''
		$buffer = ''
		time = Time.now.to_i
		$log_file = "#{BUILD_LOG_PATH}/build_log_#{time}.txt"
  	end

	xdescribe "Windows Mobile/Windows CE build scenario test", :wmce do


		before(:each) do

			filePath = getApplicationBuildPath 'wm'
			# For wm/ce app_type: rhoelements is required
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			Open3.pipeline("rake clean:wm", "rake clean:wince")
	  	end

	  	it "should create production build from command prompt by setting app_type: rhoelements for WM/CE" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_wmce
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

	  	it "should Make build using motorola_browser capability for WM/CE" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make build using shared_runtime capability for WM/CE" do

			add_yml_setting('build.yml',{"capabilities"=>"shared_runtime"})

			initiate_build_wmce

			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make application build when database encrption enabled for WM/CE" do

			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_wmce

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "should built using audiocapture extension for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" => "audiocapture"}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "should Make application build when shared run time capability is set to No for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"use_shared_runtime" => "no"}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

	end

	describe "Android build scenario test", :android do
		before(:each) do
			#Rake::Task("rake clean:android").invoke
			filePath = getApplicationBuildPath 'android'
			#Open3.pipeline("rake clean:android")
	  	end

	  	it "should create production build from command prompt by setting app_type: rhoelements for Android" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_android
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should Make build using non_motorola_device capability for Android" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			
			# Initiated build for target platform
			initiate_build_android
			
			# Reset build.yml changes
			delete_yml_setting('build.yml','capabilities')

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should Make build when apptype is not rhoelements for Android" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_android

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end


	  	it "should Make build using motorola_browser capability for android" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			expect(File.exist?(filePath)).to be true
		end

		it "Make build using native_browser capability" do

			add_yml_setting('build.yml',{"capabilities"=>"native_browser"})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			expect(File.exist?(filePath)).to be true
		end

		it "Make build using native_browser capability if App_type RE" do

			add_yml_setting('build.yml',{"capabilities"=>"native_browser"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make build using barcode extension with non_motorola_device capability for android" do

			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"android"=>{"entensions"=>"barcode", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end


		it "should Make application build using barcode extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"barcode", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make application build using nfc extension with non_motorola_device capability for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"nfc", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should make application build using nfc extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"nfc", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make application build when database encrption enabled for android" do

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_android

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make application build when database encrption enabled with non_motorola_device capability for android" do
			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_android

			delete_yml_setting('build.yml','capabilities')
			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "should Make application build when database encrption enabled and app type is not rhoelements for android" do
			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_android

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "should built using rawsensors extension with non_motorola_device capability for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"rawsensors", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should make application build using rawsensors extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"rawsensors", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should built using audiocapture extension with non_motorola_device capability for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"audiocapture", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should make application build using audiocapture extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"entensions"=>"audiocapture", "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android

			# Resetting to back state
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			expect(File.exist?(filePath)).to be true
		end

	end

	describe "Win32 build scenario test", :win32 do

		before(:each) do
			filePath = getApplicationBuildPath 'win32'
			Open3.pipeline("rake clean:win32")
	  	end

	  	it "should build for win32 application" do
	  		add_yml_setting('build.yml',{"win32"=>{"msvc"=>"2012"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_win32

			expect(File.exist?(filePath)).to be true
	  	end

	end

	describe "Ios build scenario test", :ios do
		before(:each) do
			Rake::Task("rake clean:win32").invoke
	  	end

	end
end