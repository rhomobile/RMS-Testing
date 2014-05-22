require 'fileutils'
require 'yaml'

$file_name = 'camera_js_spec.js'
$path_to_spec = File.join('Camera', $file_name)
$getType = 'direct'
$objectName = ''

$propertyValues =  
{"desiredWidth" => [{"value"=> 200},{"value"=> 650},{"value"=> 0},{"value"=> 1024}],
"desiredHeight" => [{"value"=> 200},{"value"=> 650},{"value"=> 0},{"value"=> 1024}],
"fileName" => [{"value"=> "Capture1"},{"value"=> "1capture"},{"value"=> "12345"},{"value"=> "manyfiles"}],
"captureSound" => [{"value" => "file://application/alarm.wav"}],
"previewLeft" => [{"value"=> 20},{"value"=> 50},{"value"=> 0},{"value"=> 60}],
"previewTop" => [{"value"=> 20},{"value"=> 50},{"value"=> 0},{"value"=> 60}],
"previewWidth" => [{"value"=> 20},{"value"=> 50},{"value"=> 0},{"value"=> 60}],
"previewHeight" => [{"value"=> 20},{"value"=> 50},{"value"=> 0},{"value"=> 60}]}

def generate_js_camera_spec
	yamlfilepath = Dir.tmpdir() + "/" + 'Camera/camera.yml'
	apicontent = YAML.load_file(yamlfilepath)

	#Get the object name
	$objectName = "#{apicontent['API']['MODULE']['parent']}.#{apicontent['API']['MODULE']['name']}"

	#Get properties to generate set and get test cases
	properties = apicontent['API']['MODULE']['PROPERTIES']['PROPERTY']
	methods = apicontent['API']['MODULE']['METHODS']['METHOD']
	write_jasmine_describe
	generate_set_get_test(properties)
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

		f.puts "var enumData = #{$objectName}.enumerate();"
		f.puts 'for (var j = 0;j<enumData.length;j++){'
		f.puts '(function(enumObject){'
		f.puts 'var type = enumObject.cameraType;'
		f.puts "describe('#{$objectName} APIs Set/Get Test for'+type, function() {"
	end

	properties.each do |property|

			if (!property.has_key?("readOnly"))
				#Generate code to set properties by directly, setProperties, setProperty
				add_setproperty_test("enumObject",property)
			else
				#Generate code to get properties value
				add_get_readonlyproperty_test("enumObject",property)
			end
	end

    File.open($path_to_spec, 'a') do |f|
    	f.puts '});' #Ending set describe
		f.puts '})(enumData[j]);' #Ending anonymous Method call
		f.puts '}' #Ending the For Loop
	end
end