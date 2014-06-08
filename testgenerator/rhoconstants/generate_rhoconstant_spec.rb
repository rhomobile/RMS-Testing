require 'fileutils'
require 'yaml'

$file_name = 'rhoconstants_js_spec.js'
$path_to_spec = File.join('rhoconstants', $file_name)
$objectName = ''
$arrConstants = Array.new

$arrException = {
"Rho.SimulScan" => [{"constName" => "SOURCE_CAMERA","value"=>"camera","applicableto"=>"js"}],
"Rho.Network" => [{"constName" => "AUTH_BASIC","value"=>"basic","applicableto"=>"js"}],
"Rho.WebView" => [{"constName" => "SAVE_FORMAT_JPEG","value"=>"jpeg","applicableto"=>"js"}]
}

def generate_js_spec (modulename)
	$arrConstants = Array.new
	yamlfilepath = Dir.tmpdir() + "/" + modulename + "/" + modulename.downcase + ".yml"
	apicontent = YAML.load_file(yamlfilepath)

	#Get the object name
	$objectName = "#{apicontent['API']['MODULE']['parent']}.#{apicontent['API']['MODULE']['name']}"

	#Get properties to generate set and get test cases
	if (apicontent['API']['MODULE'].is_a?(Hash) && apicontent['API']['MODULE'].has_key?("PROPERTIES") && apicontent['API']['MODULE']['PROPERTIES'].is_a?(Hash)&&  apicontent['API']['MODULE']['PROPERTIES'].has_key?("PROPERTY"))
		properties = apicontent['API']['MODULE']['PROPERTIES']['PROPERTY']
		properties.each {|property|
			nested_hash_value property,"VALUES"
		}
	end
	
	if (apicontent['API']['MODULE'].is_a?(Hash) && apicontent['API']['MODULE'].has_key?("METHODS") && apicontent['API']['MODULE']['METHODS'].is_a?(Hash)&& apicontent['API']['MODULE']['METHODS'].has_key?("METHOD"))
		methods = apicontent['API']['MODULE']['METHODS']['METHOD']
		methods.each {|method|
			nested_hash_value method,"VALUES"
		}
	end

	if(!$arrConstants.empty? && !$arrConstants.nil?)
		File.open($path_to_spec, 'a') do |f|
			f.puts "arrConstants['#{$objectName}'] = ["
		end
		puts "################ Array Found #################"
		puts "Module Name #{$objectName}"
		

		
		flag = false
		$arrConstants.each{|values|
			values['VALUE'].each {|param|
				if(param.is_a?(Hash))
					 if(param.has_key?("constName"))
						flag = true
						File.open($path_to_spec, 'a') do |f|
							f.puts "{"
							f.puts "constant : '#{$objectName}.#{param['constName']}',"
							f.puts "value: '#{param['value']}',"
							if param.has_key?("APPLIES") && param['APPLIES'].has_key?("rubyOnly")
								f.puts "applicableto: 'ruby'"
							else
								f.puts "applicableto: 'js'"
							end
							f.puts "},"
						end
					end
				else
					puts param.inspect
				end
			}
		}
		
		if($arrException.has_key?($objectName))
			flag = true
			$arrException[$objectName].each{|param|
				File.open($path_to_spec, 'a') do |f|
					f.puts "{"
					f.puts "constant : '#{$objectName}.#{param['constName']}',"
					f.puts "value: '#{param['value']}',"
					f.puts "applicableto: '#{param['applicableto']}'"
					f.puts "},"
				end
			}
		end
		
		puts "#####################################"
		if(flag)
			File.truncate($path_to_spec, File.size($path_to_spec) - 3)
		end
		File.open($path_to_spec, 'a') do |f|
		f.puts "];"
	end
	end

end

def generate_constant_it
	File.open($path_to_spec, 'a') do |f|
		f.puts "describe('Rho constant test',function(){"
		f.puts "for (var object in arrConstants) {"
		f.puts "(function(objectName, constants){"
		f.puts "describe(objectName+' constant check',function(){"
		f.puts "for(var i=0;i<constants.length;i++){"
		f.puts "(function(arrConstant){"
		f.puts "it(arrConstant['constant']+' value test',function(){"
		f.puts "if(!isNaN(arrConstant['value'])){"
		f.puts "arrConstant['value'] = parseInt(arrConstant['value']);"
		f.puts "}"
		f.puts "expect(eval(arrConstant['constant'])).toEqual(arrConstant['value']);"
		f.puts "});"
		f.puts "})(constants[i])"
		f.puts "}"
		f.puts "});"
		f.puts "})(object, arrConstants[object])"
		f.puts "}"
		f.puts "});"
	end
end

def nested_hash_value(obj,matchkey)

	if(obj.is_a?(Array))
		obj.each{|value|
			nested_hash_value value, matchkey
		}
	elsif (obj.is_a?(Hash))
		obj.each{|key,value|
			if(key == matchkey)
				$arrConstants << value
			end
		nested_hash_value(value, matchkey)
		}

	end



end
