require 'fileutils'
require 'yaml'

$file_name = 'barcode_js_spec.js'
$path_to_spec = File.join('Barcode', $file_name)
$getType = 'direct'
$objectName = ''
$propertyValues =  
{"scanTimeout" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}],
"rasterHeight" => [{"value"=> 0},{"value"=> 10},{"value"=> 50},{"value"=> 100}], 
"timedAimDuration" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}],
"sameSymbolTimeout" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}], 
"differentSymbolTimeout" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}],
"viewfinderX" => [{"value"=> 0},{"value"=> 100},{"value"=> 500},{"value"=> 1000}],
"viewfinderY" => [{"value"=> 0},{"value"=> 100},{"value"=> 500},{"value"=> 1000}], 
"viewfinderWidth" => [{"value"=> 0},{"value"=> 100},{"value"=> 500},{"value"=> 1000}], 
"viewfinderHeight" => [{"value"=> 0},{"value"=> 100},{"value"=> 500},{"value"=> 1000}], 
"viewfinderFeedbackTime"=> [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}], 
"dataBufferSize" => [{"value"=> 0},{"value"=> 8},{"value"=> 1024},{"value"=> 2048}],
"connectionIdleTimeout" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}], 
"enableTimeout" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 50000}], 
"decodeVolume" => [{"value"=> 0},{"value"=> 1},{"value"=> 4},{"value"=> 5}], 
"decodeDuration" => [{"value"=> 0},{"value"=> 5000},{"value"=> 250},{"value"=> 50000}],
"decodeFrequency" =>[{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 65535}], 
"invalidDecodeFrequency" => [{"value"=> 0},{"value"=> 5000},{"value"=> 10000},{"value"=> 65535}],
"codabarMaxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"codabarMinLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code11maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code11minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code128maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code128minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code128securityLevel" => [{"value"=> 0},{"value"=> 1},{"value"=> 2},{"value"=> 3}], 
"code39maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code39minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code39securityLevel" => [{"value"=> 0},{"value"=> 1},{"value"=> 2},{"value"=> 3}],
"code93maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"code93minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"d2of5maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"d2of5minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"i2of5maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"i2of5minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}],
"korean3of5maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"korean3of5minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"matrix2of5maxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"matrix2of5minLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"msiMaxLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}],
"msiMinLength" => [{"value"=> 0},{"value"=> 10},{"value"=> 24},{"value"=> 55}], 
"signatureImageHeight" => [{"value"=> 20},{"value"=> 100},{"value"=> 50},{"value"=> 1024}], 
"signatureImageWidth" => [{"value"=> 20},{"value"=> 100},{"value"=> 50},{"value"=> 1024}], 
"signatureImageQuality" => [{"value"=> 20},{"value"=> 10},{"value"=> 55},{"value"=> 100}], 
"upcEanRetryCount" => [{"value"=> 15},{"value"=> 2},{"value"=> 18},{"value"=> 20}],
"upcEanSecurityLevel" => [{"value"=> 2},{"value"=> 0},{"value"=> 1},{"value"=> 3}],
"decodeSound" => [{"value" => "file://application/alarm.wav"}], 
"invalidDecodeSound" => [{"value" => "file://application/alarm.wav"}]}

def generate_js_barcode_spec
	yamlfilepath = Dir.tmpdir() + "/" + 'Barcode/Barcode.yml'
	apicontent = YAML.load_file(yamlfilepath)

	#Get the object name
	$objectName = "#{apicontent['API']['MODULE']['parent']}.#{apicontent['API']['MODULE']['name']}"

	#Get properties to generate set and get test cases
	properties = apicontent['API']['MODULE']['PROPERTIES']['PROPERTY']
	methods = apicontent['API']['MODULE']['METHODS']['METHOD']
	write_jasmine_describe
	#Check if method have enumerate method then create test for it.
	methods.each do |method|
		if(method['name'] == "enumerate")
			#generate_enum_tests(method)
			File.open($path_to_spec, 'a') do |f|
				f.puts "describe('Enumerate Scanner ', function() {"
			end
			add_enum_tests
			File.open($path_to_spec, 'a') do |f|
				f.puts '});'
			end
		end
	end
	generate_set_get_test(properties)
	end_jasmine_describe
end

def write_jasmine_describe
    File.open($path_to_spec, 'w') do |f|
		f.puts "describe('#{$objectName} JS API', function() {"
    end
end

def end_jasmine_describe
    File.open($path_to_spec, 'a') do |f|
		f.puts '});'
    end
end

def generate_set_get_test(properties)

    File.open($path_to_spec, 'a') do |f|
    	f.puts "describe('#{$objectName} APIs Set/Get Test', function() {"
		f.puts "var enumData = #{$objectName}.enumerate();"
		f.puts 'for (var j = 0;j<enumData.length;j++){'
		f.puts '(function(enumObject){'
		f.puts "var scnname = enumObject.getProperty('friendlyName');"
		f.puts "var scnid = enumObject.getProperty('ID');"
		f.puts 'var scntype = enumObject.scannerType;'
		f.puts 'describe("ScnName "+scnname+"ScnId "+scnid+"Scn Type "+scntype,function() {'
	end

	add_enable_test

	properties.each do |property|

		if(property['name'][0..2] != 'rsm')
			if (!property.has_key?("readOnly"))
				#Generate code to set properties by directly, setProperties, setProperty
				add_setproperty_test("enumObject",property)
			else
				#Generate code to get properties value
				add_get_readonlyproperty_test("enumObject",property)
			end
		end
	end

	add_disable_test

    File.open($path_to_spec, 'a') do |f|
    	f.puts '});'
		f.puts '})(enumData[j]);' #Ending anonymous Method call
		f.puts '}' #Ending the For Loop
		f.puts '});' #Ending set describe
	end
end

def add_enable_test
	File.open($path_to_spec, 'a') do |f|
	f.puts 'describe("Enable Scanner "+ scnid +": "+ scnname + scntype, function() {'

	f.puts 'beforeEach(function() {'
	f.puts 'enableflag = false;'
	f.puts '});'
			
	f.puts 'it("Enable "+ scnid + scnname, function() {'
	f.puts 'runs(function() {'
	f.puts 'setTimeout(function(){'
	f.puts 'enableflag = true;'
	f.puts '}, 5000)'
	f.puts '});'
				
	f.puts 'waitsFor(function() {'
	f.puts 'return enableflag;'
	f.puts '}, "Waiting for enable", 11000);'
	f.puts 'runs(function() {'
	f.puts 'enableflag = false;'
	f.puts ''
	f.puts 'enumObject.enable();'
	f.puts 'setTimeout(function() {'
	f.puts 'enableflag = true;'
	f.puts '}, 10000);'
	f.puts '});'
				
	f.puts 'waitsFor(function() {'
	f.puts 'return enableflag;'
	f.puts '}, "Waiting for enable", 11000);'
	f.puts '});'
	f.puts '});'
	end
end
def add_disable_test
	File.open($path_to_spec, 'a') do |f|
	f.puts 'describe("Disable Scanner "+ scnid +": "+ scnname + scntype, function() {'
	
	f.puts 'beforeEach(function() {'
	f.puts 'disableflag = false;'
	f.puts '});'
			
	f.puts 'it("Disable "+ scnid + scnname, function() {'
	f.puts 'runs(function() {'
	f.puts 'enumObject.disable();'
	f.puts 'setTimeout(function() {'
	f.puts 'disableflag = true;'
	f.puts '}, 10000);'
	f.puts '});'
				
	f.puts 'waitsFor(function() {'
	f.puts 'return disableflag;'
	f.puts '}, "Waiting for enable", 11000);'
	f.puts '});'
	f.puts '});'
	end
end