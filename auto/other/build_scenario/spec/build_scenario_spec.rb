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

	describe "Windows Mobile/Windows CE build scenario test", :wmce do


		before(:each) do

			filePath = getApplicationBuildPath 'wm'
			# For wm/ce app_type: rhoelements is required
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			Open3.pipeline("rake clean:wm", "rake clean:wince")
	  	end

	  	it "Should build with app_type: rhoelements for WM/CE" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			#deleting all the extension under wm if any
			delete_yml_setting('build.yml',"wm")
			
			# Initiated build for target platform
			initiate_build_wmce
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

	  	it "should build using motorola_browser capability for WM/CE" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using shared_runtime capability for WM/CE" do

			add_yml_setting('build.yml',{"capabilities"=>"shared_runtime"})

			initiate_build_wmce

			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build when database encrption enabled for WM/CE" do

			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_wmce

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "should build when shared run time capability is set to No for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"use_shared_runtime" => "no"}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "Build with all licensed extensions for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" =>["barcode","hardwarekeys","indicators","cardreader","signature","NFC"]}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "Build with all non-licensed extensions for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" =>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"]}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end
		
		it "should build using capabilities for wm/ce" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone"]})

			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml',"wm")
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end		
		
	end

	describe "Android build scenario test", :android do
		before(:each) do
			#Rake::Task("rake clean:android").invoke
			filePath = getApplicationBuildPath 'android'
			Open3.pipeline("rake clean:android")
	  	end

	  	it "Should build with app_type: rhoelements for Android" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_android
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build using non_motorola_device and apptype rhoelements capability for Android" do
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

		it "should build when apptype is not rhoelements for Android" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_android

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end


	  	it "should build using motorola_browser capability for android" do

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

		it "Should build using moto_browser capability if App_type RE" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using all licensed extension with non_motorola_device capability for android" do

			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","hardwarekeys","indicators","cardreader","signature","NFC","SimulScan"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end


		it "should build using all non-licensed extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","hardwarekeys","indicators","cardreader","signature","NFC","SimulScan"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end
		
		it "should build using all licensed extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end	

		it "should build using all extensions when app type is rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"], "manifest_template" => "AndroidManifest.erb"}})
			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","hardwarekeys","indicators","cardreader","signature","NFC","SimulScan"]}})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end				

		it "should build using old 2.2 extensions for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["nfc","rawsensors","audiocapture","digest", "digest-md5", "digest-sha1", "digest-sha2", "openssl.so", "openssl", "ezcrypto"], "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using capabilities for android" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end		

		it "should build when database encrption enabled for android" do

			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "version" => "4.0"}})
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_android

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

	end

	xdescribe "Win32 build scenario test", :win32 do

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
			#Rake::Task("rake clean:android").invoke
			filePath = getApplicationBuildPath 'ios'
			Open3.pipeline("rake clean:iphone")
	  	end

	  	it "Should build with app_type: rhoelements for ios" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_ios
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build using non_motorola_device and apptype rhoelements capability for ios" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			
			# Initiated build for target platform
			initiate_build_ios
			
			# Reset build.yml changes
			delete_yml_setting('build.yml','capabilities')

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build when apptype is not rhoelements for ios" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_ios

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build using all licensed extension with non_motorola_device capability for ios" do

			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","signature"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end


		it "should build using all non-licensed extension when app type is not rhoelements for ios" do

			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","signature"]})
			delete_yml_setting('build.yml','app_type')

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end
		
		it "should build using all licensed extension when app type is not rhoelements for ios" do

			add_yml_setting('build.yml',{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"]})
			delete_yml_setting('build.yml','app_type')

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end	

		it "should build using all extensions when app type is rhoelements for ios" do

			add_yml_setting('build.yml',{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"]})
			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","signature"]})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end				

		it "should build using old 2.2 extensions for ios" do

			add_yml_setting('build.yml',{"extensions"=>["digest", "digest-md5", "digest-sha1", "digest-sha2", "openssl.so", "openssl", "ezcrypto","rawsensors","audiocapture"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using capabilities for ios" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build when database encrption enabled for ios" do

			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_ios

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

	end
end