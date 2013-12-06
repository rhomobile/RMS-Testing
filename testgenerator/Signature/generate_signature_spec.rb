require 'fileutils'
require 'yaml'

$file_name = 'signature_js_spec.js'
$path_to_spec = File.join('Signature', $file_name)
$getType = 'direct'
$objectName = ''

$propertyValues =  
{	"fileName" => [{"value" =>"file://application/capture.jpg"}],
	"penColor" => [{"value" => "#FF000000"},{"value" => "#00FFFF00"},{"value" => "#00FF0000"},{"value" => "#FFFFFFFF"}],
	"penWidth" => [{"value"=>1},{"value"=>2},{"value"=>3},{"value"=>5}],
	"bgColor" => [{"value" => "#FF000000"},{"value" => "#00FFFF00"},{"value" => "#00FF0000"},{"value" => "#FFFFFFFF"}],
	"left" => [{"value"=>150},{"value"=>320},{"value"=>300},{"value"=>500}],
	"top" => [{"value"=>10},{"value"=>200},{"value"=>350},{"value"=>50}],
	"width" => [{"value"=>100},{"value"=>250},{"value"=>30},{"value"=>500}],
	"height" => [{"value"=>100},{"value"=>260},{"value"=>300},{"value"=>1024}]
}

def generate_js_signature_spec
	apicontent = YAML.load_file('Signature\signature.yml')

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