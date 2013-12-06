require 'fileutils'
require 'yaml'
$count = 0
def add_setproperty_test(objectName,property)
	propertyName = property['name']
	platform = property['PLATFORM']
	type = property['type']

	if(!property.has_key?("VALUES") && property['type'] != "BOOLEAN")
		#If no value mentioned in .xml, Inject userdefined values
		#puts propertyName;
		values =$propertyValues[property['name']]

	elsif (property['type'] == "BOOLEAN")
    	values = [{"value"=> true},{"value"=> false}]
    else
    	values = property['VALUES']['VALUE']
	end

	if (values.is_a?(Array))
	    File.open($path_to_spec, 'a') do |f|
			f.puts start_check_device_applicability(platform)
			f.puts "describe('Setting #{propertyName}', function() {"

			values.each do |valuetype|

				if(valuetype.has_key?("constName"))

					f.puts "it('Should Set #{propertyName} to #{valuetype['constName']} using direct calling method', function() {"
					f.puts "#{objectName}.#{propertyName}=#{$objectName}.#{valuetype['constName']};"
					f.puts "expect(#{objectName}.#{propertyName}).toEqual(#{$objectName}.#{valuetype['constName']});"
					f.puts "});"

				end

				if(valuetype.has_key?("value"))
					setValue = valuetype['value']

					# setting property using directly
					f.puts "it('Should Set #{propertyName} to #{setValue} using direct calling method', function() {"
					if(type == "BOOLEAN" || type == "INTEGER")
						f.puts "#{objectName}.#{propertyName}=#{setValue};"
						f.puts "expect(#{objectName}.#{propertyName}).toEqual(#{setValue});"
					else
						f.puts "#{objectName}.#{propertyName}='#{setValue}';"
						f.puts "expect(#{objectName}.#{propertyName}).toEqual('#{setValue}');"
					end
					f.puts "});"

					# setting property using setProperty method
					f.puts "it('Should Set #{propertyName} to #{setValue} using setProperty calling method', function() {"
					f.puts "#{objectName}.setProperty('#{propertyName}','#{setValue}');"
					if(type == "BOOLEAN" || type == "INTEGER")
						f.puts "expect(#{objectName}.getProperty('#{propertyName}')).toEqual('#{setValue}');"
					else
						f.puts "expect(#{objectName}.getProperty('#{propertyName}')).toEqual('#{setValue}');"
					end
					f.puts "});"

					# setting property using setProperties method
					f.puts "it('Should Set #{propertyName} to #{setValue} using setProperties calling method', function() {"
					if(type == "BOOLEAN" || type == "INTEGER")
						f.puts "#{objectName}.setProperties({'#{propertyName}' : #{setValue}});"
	 					f.puts "var data = #{objectName}.getProperties(['#{propertyName}']);"
	                    f.puts "data = data['#{propertyName}'];"
	                    f.puts "expect(data).toEqual('#{setValue}');"
					else
						f.puts "#{objectName}.setProperties({'#{propertyName}' : '#{setValue}'});"
	 					f.puts "var data = #{objectName}.getProperties(['#{propertyName}']);"
	                    f.puts "data = data['#{propertyName}'];"
	                    f.puts "expect(data).toEqual('#{setValue}');"
					end
					f.puts "});"
					
				end
			end
			f.puts "});" # End describe
			f.puts end_check_device_applicability
		end
	else
		puts propertyName
	end
end

def add_get_readonlyproperty_test(objectName,property)
	propertyName = property['name']
	platform = property['PLATFORM']
	type = property['type']
	File.open($path_to_spec, 'a') do |f|
		f.puts start_check_device_applicability(platform)
		f.puts "describe('Getting #{propertyName}', function() {"
		if(type == "BOOLEAN")
			f.puts "it('Should return #{propertyName} value as BOOLEAN (true or false)', function() {"
			f.puts "expect(#{objectName}.#{propertyName}).isBoolean();"
			f.puts "});"
		elsif (type == "INTEGER")
			f.puts "it('Should return #{propertyName} value as a Integer', function() {"
			f.puts "expect(#{objectName}.#{propertyName}).isNumberGreaterThenZero();"
			f.puts "});"
		elsif (type == "STRING")
			f.puts "it('Should return #{propertyName} value as a string', function() {"
			f.puts "expect(#{objectName}.#{propertyName}).isNotEmptyString();"
			f.puts "});"
		end
		f.puts "});" # End describe
		f.puts end_check_device_applicability
	end
end

def start_check_device_applicability(param)

	$ifflag = false
	if (param)
		conditionstring = []
		platforms = param.split(', ')
		platforms.each do |platform|

			case platform
			when "Android", "android", "ANDROID"
				conditionstring << "ANDROID"
			when "WM", "Wm", "wm", "WINDOWS", "Windows", "WINCE", "WinCE", "CE", "ce"
				conditionstring << "WINDOWS"
			else

			end
		end

		if conditionstring.nil? || conditionstring.empty?
			$ifflag = false
			return
		#conditionstring.join(",").indexOf(Rho.System.platform) == -1) ? false : true ;
		else
			$ifflag = true
			"if ("+conditionstring.to_s+".indexOf(Rho.System.platform) != -1){"
		end
	end
end

def end_check_device_applicability
	if $ifflag
		"}"
	end
end

def add_enum_tests
	File.open($path_to_spec, 'a') do |f|
		f.puts 'var enumObjCount = false;'
		f.puts 'var enumCallback = function (enumobj){'
		f.puts 'enumobj.length>0 ? enumObjCount=true : enumObjCount=false'
		f.puts '};'
		f.puts 'beforeEach(function() {'
		f.puts 'enumObjCount = false;'
		f.puts '});'
		f.puts 'it("Enumerate without callback (Synchronous Access)", function() {'
		f.puts "var obj = #{$objectName}.enumerate();"
		f.puts 'callBackfired = enumCallback(obj);'
		f.puts 'expect(enumObjCount).toEqual(true);'
		f.puts '});'
		f.puts 'it("Enumerate callback as function", function() {'
		f.puts 'runs(function() {'
		f.puts "#{$objectName}.enumerate(enumCallback);"
		f.puts '});'
		f.puts 'waitsFor(function(){'
		f.puts 'return enumObjCount;'
		f.puts '});'
		f.puts 'runs(function(){'
		f.puts 'expect(enumObjCount).toEqual(true);'
		f.puts '});'
		f.puts '});'
		f.puts 'it("Enumerate with anonymous function as callback", function() {'
		f.puts 'runs(function() {'
		f.puts "#{$objectName}.enumerate(function(obj){"
		f.puts 'enumCallback(obj);'
		f.puts '});'
		f.puts '});'
		f.puts 'waitsFor(function(){'
		f.puts 'return enumObjCount;'
		f.puts '});'
		f.puts 'runs(function(){'
		f.puts 'expect(enumObjCount).toEqual(true);'
		f.puts '});'
		f.puts '});'
	end
end