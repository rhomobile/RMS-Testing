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

		it "Should build when database encrption enabled for WM/CE" do

			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_wmce

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "Build with all licensed extensions for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" =>["barcode","cardreader","indicators","nfc","rhoconnect-client","rhoconnect-push","signature"]}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "Build with all non-licensed extensions for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"extensions" =>["audiocapture","coreapi","mediacapture","mediaplayer","screenorientation","printing","printing_zebra","sensor"]}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build using capabilities for wm/ce" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"wm")
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as debug is used for WM/CE	" do

			add_yml_setting('build.yml',{"build"=>"debug"})

			initiate_build_wmce

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as developement is used for WM/CE	" do

			add_yml_setting('build.yml',{"build"=>"developement"})

			initiate_build_wmce

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as release is used for WM/CE	" do

			add_yml_setting('build.yml',{"build"=>"release"})

			initiate_build_wmce

			expect(File.exist?(filePath)).to be true
		end				
		
		it "Should build with ajax_api_bridge: true is used for WM/CE	" do

			delete_yml_setting('build.yml','ajax_api_bridge')
			add_yml_setting('build.yml',{"wm"=>{"ajax_api_bridge"=>true}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end			

		it "Should build with ajax_api_bridge: false is used for WM/CE	" do

			delete_yml_setting('build.yml','ajax_api_bridge')
			add_yml_setting('build.yml',{"wm"=>{"ajax_api_bridge"=>false}})

			initiate_build_wmce

			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build when minify is used for WM/CE" do

			add_yml_setting('build.yml',{"minify"=>{"js" => true, "css" => true, "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"minify")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when obfuscate is used for WM/CE" do

			add_yml_setting('build.yml',{"obfuscate"=>{"js" => "yes", "css" => "yes", "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"obfuscate")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build using old 2.2/native ruby extensions for wm/ce" do

			add_yml_setting('build.yml',{"wm"=>{"extensions"=>["nfc","rawsensors","mspec", "openssl.so", "openssl", "hmac", "digest", "digest-sha1","digest-md5", 
				"ezcrypto", "fileutils", "myext", "rexml", "set", "rhoxml", "thread", "timeout", "uri", "pdf-writer", "json", "net-http"]
				}})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "should build with apptype rhoelements, all capabilities & extensions for WM/CE" do

			add_yml_setting('build.yml',{"wm"=>{"extensions"=>["mspec", "openssl.so", "openssl", "hmac", "digest", "digest-sha1","digest-md5", 
				"fileutils", "myext", "rexml", "set", "rhoxml", "thread", "timeout", "uri", "pdf-writer", "json", "net-http", 
				"audiocapture","coreapi","mediaplayer","screenorientation","printing","printing_zebra","sensor", "barcode","cardreader",
				"indicators","NFC","rhoconnect-client","rhoconnect-push","signature"]
				}})
			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"wm")
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end		

		it "Should build using hardwarekeys extensions for wm/ce" do

			add_yml_setting('build.yml',{"wm"=>{"extensions"=>["hardwarekeys"]}})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build using smartCradle extensions for wm/ce" do

			add_yml_setting('build.yml',{"wm"=>{"extensions"=>["smartCradle"]}})

			initiate_build_wmce
			
			delete_yml_setting('build.yml',"wm")

			expect(File.exist?(filePath)).to be true
		end	

	end

	describe "Android build scenario test", :android do
		before(:each) do
			#Rake::Task("rake clean:android").invoke
			filePath = getApplicationBuildPath 'android'
			Open3.pipeline("rake clean:android")
	  	end

	  	it "should build with app_type: rhoelements for Android" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_android
			
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

		it "should build using all non-licensed extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["barcode","emdk3-manager","hardwarekeys","indicators","cardreader","signature","nfc","simulscan"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using all licensed extension when app type is not rhoelements for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["audiocapture","coreapi","mediacapture","mediaplayer","screenorientation","smartCradle","printing","printing_zebra","sensor"], "manifest_template" => "AndroidManifest.erb"}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using capabilities for android" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using old 2.2/native ruby extensions for android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["nfc","rawsensors","mspec", "openssl.so", "openssl", "hmac", "digest", "digest-sha1","digest-md5", 
				"ezcrypto", "fileutils", "myext", "rexml", "set", "rhoxml", "thread", "timeout", "uri", "pdf-writer", "json", "net-http", "digest-sha2"], 
				"manifest_template" => "AndroidManifest.erb", "version" => "2.3.3"}})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_android
			
			# Resetting to back state
			delete_yml_setting('build.yml','android')

			expect(File.exist?(filePath)).to be true
		end

		it "should build with apptype rhoelements, all capabilities & extensions for Android" do

			add_yml_setting('build.yml',{"android"=>{"extensions"=>["mspec", "openssl.so", "openssl", "hmac", "digest", "digest-sha1","digest-md5", 
				"fileutils", "myext", "rexml", "set", "rhoxml", "thread", "timeout", "uri", "pdf-writer", "json", "net-http", 
				"audiocapture","coreapi","emdk3-manager","hardwarekeys","mediaplayer","screenorientation","simulscan","printing","printing_zebra","sensor", "barcode","cardreader",
				"indicators","nfc","rhoconnect-client","rhoconnect-push","smartCradle","signature"]
				}})
			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})

			initiate_build_android
			
			delete_yml_setting('build.yml',"android")
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end	

		it "should build when database encrption enabled for android" do

			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "version" => "4.2.2"}})
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_android

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as debug is used for Android" do

			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb"}})
			add_yml_setting('build.yml',{"build"=>"debug"})

			initiate_build_android

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as developement is used for Android" do

			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb"}})
			add_yml_setting('build.yml',{"build"=>"developement"})

			initiate_build_android

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as release is used for Android" do

			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb"}})
			add_yml_setting('build.yml',{"build"=>"release"})

			initiate_build_android

			expect(File.exist?(filePath)).to be true
		end				
		
		it "Should build with ajax_api_bridge: true is used for Android" do

			delete_yml_setting('build.yml','ajax_api_bridge')
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "ajax_api_bridge"=>true}})

			initiate_build_android

			delete_yml_setting('build.yml',"android")

			expect(File.exist?(filePath)).to be true
		end			

		it "Should build with ajax_api_bridge: false is used for Android" do

			delete_yml_setting('build.yml','ajax_api_bridge')
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "ajax_api_bridge"=>false}})

			initiate_build_android

			delete_yml_setting('build.yml',"android")

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build when minify is used for Android" do

			add_yml_setting('build.yml',{"minify"=>{"js" => true, "css" => true, "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb"}})

			initiate_build_android
			
			delete_yml_setting('build.yml',"minify")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when obfuscate is used for Android" do

			add_yml_setting('build.yml',{"obfuscate"=>{"js" => "yes", "css" => "yes", "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})
			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb"}})

			initiate_build_android
			
			delete_yml_setting('build.yml',"obfuscate")

			expect(File.exist?(filePath)).to be true
		end

		it "should build when android_title: 1 is used for Android" do

			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "android_title"=>1}})

			initiate_build_android

			expect(File.exist?(filePath)).to be true
		end

		it "should build when android_title: 0 is used for Android" do

			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "android_title"=>0}})

			initiate_build_android

			expect(File.exist?(filePath)).to be true
		end

		it "should build when abis: [arm, x86] is used for Android" do

			add_yml_setting('build.yml',{"android"=>{"manifest_template" => "AndroidManifest.erb", "abis"=>[arm, x86]}})

			initiate_build_android

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

		it "should build when apptype is not rhoelements for ios" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_ios

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build using all non-licensed extension when app type is not rhoelements for ios" do

			add_yml_setting('build.yml',{"extensions"=>["barcode","hardwarekeys","indicators","rhoconnect-client","rhoconnect-push","signature"]})
			delete_yml_setting('build.yml','app_type')

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end
		
		it "should build using all licensed extension when app type is not rhoelements for ios" do

			add_yml_setting('build.yml',{"extensions"=>["audiocapture","coreapi","mediacapture","mediaplayer","screenorientation","printing","printing_zebra","sensor"]})
			delete_yml_setting('build.yml','app_type')

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end	

		it "should build using old 2.2 extensions for ios" do

			add_yml_setting('build.yml',{"extensions"=>["nfc","rawsensors","mspec", "openssl.so", "openssl", "hmac", "digest", "digest-sha1","digest-md5", 
				"ezcrypto", "fileutils", "myext", "rexml", "set", "rhoxml", "thread", "timeout", "uri", "pdf-writer", "json", "net-http", "digest-sha2"], 
				})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','extensions')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using capabilities for ios" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_ios
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build with apptype rhoelements, all capabilities & extensions for ios" do

			add_yml_setting('build.yml',{"extensions"=>["mspec", "openssl.so", "openssl", "hmac", "digest", "digest-sha1","digest-md5", 
				"fileutils", "myext", "rexml", "set", "rhoxml", "thread", "timeout", "uri", "pdf-writer", "json", "net-http", 
				"audiocapture","coreapi","hardwarekeys","mediaplayer","screenorientation","printing","printing_zebra","sensor", "barcode",
				"indicators","rhoconnect-client","rhoconnect-push","signature"]
				})
			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})

			initiate_build_ios
			
			delete_yml_setting('build.yml','extensions')
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

		it "Should build when build as debug is used for ios" do

			add_yml_setting('build.yml',{"build"=>"debug"})

			initiate_build_ios

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as developement is used for ios" do

			add_yml_setting('build.yml',{"build"=>"developement"})

			initiate_build_ios

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as release is used for ios" do

			add_yml_setting('build.yml',{"build"=>"release"})

			initiate_build_ios

			expect(File.exist?(filePath)).to be true
		end				
		
		it "Should build with ajax_api_bridge: true is used for ios" do

			add_yml_setting('build.yml',{"ajax_api_bridge"=>true})

			initiate_build_ios

			expect(File.exist?(filePath)).to be true
		end			

		it "Should build with ajax_api_bridge: false is used for ios" do

			add_yml_setting('build.yml',{"ajax_api_bridge"=>false})

			initiate_build_ios

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build when minify is used for ios" do

			add_yml_setting('build.yml',{"minify"=>{"js" => true, "css" => true, "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})

			initiate_build_ios
			
			delete_yml_setting('build.yml',"minify")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when obfuscate is used for ios" do

			add_yml_setting('build.yml',{"obfuscate"=>{"js" => "yes", "css" => "yes", "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})

			initiate_build_ios
			
			delete_yml_setting('build.yml',"obfuscate")

			expect(File.exist?(filePath)).to be true
		end

	end

	describe "WP8 build scenario test", :wp8 do
		before(:each) do
			#Rake::Task("rake clean:android").invoke
			filePath = getApplicationBuildPath 'wp8'
			Open3.pipeline("rake clean:wp8")
	  	end

	  	it "Should build with app_type: rhoelements for WP8" do
	  		# Modify build.yml
			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})
			
			# Initiated build for target platform
			initiate_build_wp8
			
			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build when apptype is not rhoelements for WP8" do
	  		# Modify build.yml
			delete_yml_setting('build.yml','app_type')

			# Initiated build for target platform
			initiate_build_wp8

			add_yml_setting('build.yml',{"app_type"=>"rhoelements"})

			# Check existence of executable (.cab or .apk or .exe)
			expect(File.exist?(filePath)).to be true

		end

		it "should build using all non-licensed extension when app type is not rhoelements for WP8" do

			add_yml_setting('build.yml',{"wp8"=>{"extensions"=>["barcode","rhoconnect-client","rhoconnect-push"]}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_wp8
			
			# Resetting to back state
			delete_yml_setting('build.yml','wp8')

			expect(File.exist?(filePath)).to be true
		end
		
		it "should build using all licensed extension when app type is not rhoelements for WP8" do

			add_yml_setting('build.yml',{"wp8"=>{"extensions"=>["coreapi","mediacapture"]}})
			delete_yml_setting('build.yml','app_type')

			initiate_build_wp8
			
			# Resetting to back state
			delete_yml_setting('build.yml','wp8')

			expect(File.exist?(filePath)).to be true
		end	

		it "should build using ruby extensions for WP8" do

			add_yml_setting('build.yml',{"wp8"=>{"extensions"=>["digest", "digest-sha1","digest-md5", "uri", "json"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_wp8
			
			# Resetting to back state
			delete_yml_setting('build.yml','wp8')

			expect(File.exist?(filePath)).to be true
		end

		it "should build using capabilities for WP8" do

			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})
			delete_yml_setting('build.yml',"app_type")

			initiate_build_wp8
			
			# Resetting to back state
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end

		it "should build with apptype rhoelements, all capabilities & extensions for WP8" do

			add_yml_setting('build.yml',{"wp8"=>{"extensions"=>["digest", "digest-sha1","digest-md5", "uri", "json", "coreapi","barcode", "rhoconnect-client","rhoconnect-push"]}})
			add_yml_setting('build.yml',{"capabilities"=>["camera","bluetooth","gps","sdcard","pim","calendar","vibrate","phone","native_browser","push","network_state"]})

			initiate_build_wp8
			
			delete_yml_setting('build.yml','wp8')
			delete_yml_setting('build.yml','capabilities')

			expect(File.exist?(filePath)).to be true
		end	

		it "should build when database encrption enabled for WP8" do

			delete_yml_setting('build.yml','app_type')
			add_yml_setting('build.yml',{"encrypt_database"=>1})

			initiate_build_wp8

			delete_yml_setting('build.yml','encrypt_database')

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as debug is used for WP8" do

			add_yml_setting('build.yml',{"build"=>"debug"})

			initiate_build_wp8

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as developement is used for WP8" do

			add_yml_setting('build.yml',{"build"=>"developement"})

			initiate_build_wp8

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when build as release is used for WP8" do

			add_yml_setting('build.yml',{"build"=>"release"})

			initiate_build_wp8

			expect(File.exist?(filePath)).to be true
		end				
		
		it "Should build with ajax_api_bridge: true is used for WP8" do

			add_yml_setting('build.yml',{"ajax_api_bridge"=>true})

			initiate_build_wp8

			expect(File.exist?(filePath)).to be true
		end			

		it "Should build with ajax_api_bridge: false is used for WP8" do

			add_yml_setting('build.yml',{"ajax_api_bridge"=>false})

			initiate_build_wp8

			expect(File.exist?(filePath)).to be true
		end
		
		it "Should build when minify is used for WP8" do

			add_yml_setting('build.yml',{"minify"=>{"js" => true, "css" => true, "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})

			initiate_build_wp8
			
			delete_yml_setting('build.yml',"minify")

			expect(File.exist?(filePath)).to be true
		end

		it "Should build when obfuscate is used for WP8" do

			add_yml_setting('build.yml',{"obfuscate"=>{"js" => "yes", "css" => "yes", "exclude_dirs" => ["jqmobile", "jqtouch", "jquery"]}})

			initiate_build_wp8
			
			delete_yml_setting('build.yml',"obfuscate")

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

end