require 'rake'
require 'open3'
require 'fileutils'
require 'yaml'
require 'spec_helper'

#load './Rakefile'

describe "Testing Rho Component Installer container build scenario" do
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

	describe "Windows Mobile/Windows CE Container build scenario test", :wmce do


		before(:each) do

			filePath = getApplicationBuildPath 'wm'
			# For wm/ce app_type: rhoelements is required
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			#TODO Add clean command
			#Open3.pipeline("rake clean:wm", "rake clean:wince")
	  	end

	  	it "Should build application using local containers for WM with app_type: rhoelements" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			#deleting all the extension under wm if any
			delete_yml_setting('build.yml',"wm")
			
			# Initiated build for target platform
			initiate_build_wmce
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

	  	it "Should build application using local containers for WM with motorola_browser capability" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			
			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for WM with shared_runtime capability" do

			add_yml_setting('build.yml',{"capabilities"=>"shared_runtime"})

			initiate_build_wmce

			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for WM with database encrption enabled" do

			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_wmce

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for WM with sharedruntime capability is set to No" do

			add_yml_setting('build.yml',{"wm"=>{"use_shared_runtime" => "no"}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for WM with all licensed extensions" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" =>["barcode","hardwarekeys","indicators","cardreader","signature","NFC", "coreapi"]}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for WM with all non-licensed extensions" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" =>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor", "rhoconnect-push", "rhoconnect-client"]}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build application using local containers for WM with capabilities" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone"]})

			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml',"wm")
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end		
		it "Should build application using local containers for WM with old 2.2 extensions" do

			add_yml_setting('build.yml',{"wm"=>{"extensions"=>["nfc","rawsensors","audiocapture","digest", "digest-md5", "digest-sha1", "digest-sha2", "openssl.so", "openssl", "ezcrypto", "rho-javascript"]}})
			
			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml','wm')

			expect(File.exist?(filePath)).to be true
		end	
		it "Should build application using local containers for WM with javascript_application: true" do

			add_yml_setting('build.yml',{"javascript_application"=>true})
			
			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml','javascript_application')

			expect(File.exist?(filePath)).to be true
		end	
		it "Should build application using local containers for WM with native extensions" do
			add_yml_setting('build.yml',{"wm"=>{"extensions"=>["genPropBag","nativeBridgeTest","platformBridgeTest","entityGen", "appEvents"]}})
			
			initiate_build_wmce
			
			# Resetting to back state
			delete_yml_setting('build.yml','javascript_application')

			expect(File.exist?(filePath)).to be true
		end		
	end

	describe "Android Container build scenario test", :android do
		before(:each) do
			#Rake::Task("rake clean:android").invoke
			filePath = getApplicationBuildPath 'android'

			#TODO Add clean command
			#Open3.pipeline("rake clean:android")
	  	end

	  	it "Should build application using local containers for Android with app_type: rhoelements" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','app_type')

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "Should build application using local containers for Android with non_motorola_device and apptype rhoelements capability	" do
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

		it "Should build application using local containers for Android with apptype is not rhoelements" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_android

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end


	  	it "Should build application using local containers for Android with motorola_browser capability" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for Android with native_browser capability" do

			add_yml_setting('build.yml',{"capabilities"=>"native_browser"})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			
			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for Android with moto_browser capability if App_type RE" do

			add_yml_setting('build.yml',{"capabilities"=>"motorola_browser"})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for Android with all licensed extension with non_motorola_device capability" do

			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","hardwarekeys","indicators","cardreader","signature","NFC","SimulScan"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end


		it "Should build application using local containers for Android with non-licensed extension when app type is not rhoelements" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","hardwarekeys","indicators","cardreader","signature","NFC","SimulScan"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build application by local containers for Android with all licensed extension when app type is not rhoelements" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end	

		it "Should build application using local containers for Android with all extensions when app type is rhoelements" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"], "manifest_template" => "AndroidManifest.erb"}})
			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","hardwarekeys","indicators","cardreader","signature","NFC","SimulScan"]}})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end				

		it "Should build application using local containers for Android with old 2.2 extensions" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["nfc","rawsensors","audiocapture","digest", "digest-md5", "digest-sha1", "digest-sha2", "openssl.so", "openssl", "ezcrypto"], "manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for Android with capabilities" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end		

		it "Should build application using local containers for Android with database encrption enabled" do

			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "version" => "4.0"}})
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_android

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end
		it "Should build application using local containers for Android with javascript_application: true" do

			add_yml_setting('build.yml',{"javascript_application"=>true})
			
			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','javascript_application')
			delete_yml_setting('build.yml','android')
			expect(File.exist?(filePath)).to be true
		end	
		it "Should build application using local containers for Android with abis: x86" do

			add_yml_setting('build.yml',{"android"=>{"abis"=>["x86"], "manifest_template" => "AndroidManifest.erb", "version" => "4.0"}})
			
			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','abis')

			expect(File.exist?(filePath)).to be true
		end			
		it "Should build application using local containers for Android with native extensions" do
			add_yml_setting('build.yml',{"android"=>{"extensions"=>["genPropBag","nativeBridgeTest","platformBridgeTest","entityGen", "appEvents"]}})
			
			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')
			expect(File.exist?(filePath)).to be true
		end		
	end


	describe "IOS container build scenario test", :ios do
		before(:each) do
			filePath = getApplicationBuildPath 'ios'

			#TODO Add clean command
			#Open3.pipeline("rake clean:iphone")
	  	end

	  	it "Should build application using local containers for IOS with app_type: rhoelements" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_ios
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "Should build application by local containers for IOS with non_motorola_device and apptype rhoelements capability" do
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

		it "Should build application using local containers for IOS with apptype is not rhoelements" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_ios

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "Should build application using local containers for IOS with all licensed extension with non_motorola_device capability" do

			add_yml_setting('build.yml',{"capabilities"=>"non_motorola_device"})
			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","signature"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back stage
			delete_yml_setting('build.yml','capabilities')
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end


		it "Should build application using local containers for IOS with all non-licensed extension when app type is not rhoelements" do

			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","signature"]})
			delete_yml_setting('build.yml','app_type')

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build application using local containers for IOS with all licensed extension when app type is not rhoelements" do

			add_yml_setting('build.yml',{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"]})
			delete_yml_setting('build.yml','app_type')

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end	

		it "Should build application using local containers for IOS with all extensions when app type is rhoelements" do

			add_yml_setting('build.yml',{"extensions"=>["audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor"]})
			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","signature"]})
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end				

		it "Should build application using local containers for IOS with old 2.2 extensionss" do

			add_yml_setting('build.yml',{"extensions"=>["digest", "digest-md5", "digest-sha1", "digest-sha2", "openssl.so", "openssl", "ezcrypto","rawsensors","audiocapture"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for IOS with capabilities" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build application using local containers for IOS with database encrption enabled" do

			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_ios

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build application using local containers for IOS with javascript_application: true" do

			add_yml_setting('build.yml',{"javascript_application"=>true})
			
			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','javascript_application')
			expect(File.exist?(filePath)).to be true
		end	

		it "Should build application using local containers for IOS with native extensions" do
			add_yml_setting('build.yml',{"extensions"=>["genPropBag","nativeBridgeTest","platformBridgeTest","entityGen", "appEvents"]})
			
			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')
			expect(File.exist?(filePath)).to be true
		end		

	end
end