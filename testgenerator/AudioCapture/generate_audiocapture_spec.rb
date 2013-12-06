require 'fileutils'
require 'yaml'

$file_name = 'audiocapture_js_spec.js'
$path_to_spec = File.join('AudioCapture', $file_name)
$getType = 'direct'
$objectName = ''
$propertyValues =  
{"maxDuration" => [{"value"=> 5000},{"value"=> 10000},{"value"=> 60000},{"value"=> 0}],
"fileName" => [{"value" => "file://application/alarm.wav"}]}

def generate_js_audiocapture_spec
	apicontent = YAML.load_file('AudioCapture\audiocapture.yml')

	#Get the object name
	$objectName = "#{apicontent['API']['MODULE']['parent']}.#{apicontent['API']['MODULE']['name']}"

	#Get properties to generate set and get test cases
	properties = apicontent['API']['MODULE']['PROPERTIES']['PROPERTY']
	#Get Methods
	methods = apicontent['API']['MODULE']['METHODS']['METHOD']

	write_jasmine_describe
	generate_set_get_test(properties)
	end_jasmine_describe
end

def generate_set_get_test(properties)

    File.open($path_to_spec, 'a') do |f|
		f.puts "describe('#{$objectName} APIs Set Test', function() {"
	end

	properties.each do |property|

			if (!property.has_key?("readOnly"))
				#Generate code to set properties by directly, setProperties, setProperty
				add_setproperty_test($objectName,property)
			else
				#Generate code to get properties value
				add_get_readonlyproperty_test($objectName,property)
			end
	end

    File.open($path_to_spec, 'a') do |f|
		f.puts '});' #Ending set describe
	end
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