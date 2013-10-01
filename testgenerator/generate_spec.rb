require 'fileutils'
require 'yaml'

def add_setting_directly_test(testId,objectName,propertyName,values)

    File.open($path_to_spec, 'a') do |f|

		f.puts "describe('#{testId} - Setting #{propertyName} Directly', function() {"
		values.each do |value|
			f.puts start_check_device_applicability(value)
			f.puts "it('Should Set #{propertyName} to #{value['setvalue']} using direct calling method', function() {"
			f.puts "#{objectName}.#{propertyName}=#{value['setvalue']}"
			f.puts expect_gettype(objectName,propertyName,value)
			f.puts "});"
			f.puts end_check_device_applicability
		end
		f.puts "});" # End describe
	end
end

def add_setting_setproperty_test(testId,objectName,propertyName,values)

    File.open($path_to_spec, 'a') do |f|
		f.puts "describe('#{testId} - Setting #{propertyName} using setProperty calling method', function() {"
		values.each do |value|
			setValue = value['setvalue']
			f.puts start_check_device_applicability(value)
			f.puts "it('Should Set #{propertyName} to #{value['setvalue']} using setProperty calling method', function() {"
			f.puts "#{objectName}.setProperty('#{propertyName}','#{setValue}')"
			f.puts expect_gettype(objectName,propertyName,value)
			f.puts "});"
			f.puts end_check_device_applicability		
		end
		f.puts "});" # End describe
	end

end

def add_setting_setproperties_test(testId,objectName,propertyName,values)
	File.open($path_to_spec, 'a') do |f|
		f.puts "describe('#{testId} - Setting #{propertyName} using setProperties calling method', function() {"
		values.each do |value|
			setValue = value['setvalue']
			f.puts start_check_device_applicability(value)
			f.puts "it('Should Set #{propertyName} to #{value['setvalue']} using setProperties calling method', function() {"
			if setValue.is_a? String
			f.puts "#{objectName}.setProperties({'#{propertyName}' : '#{setValue}'})"
			else
			f.puts "#{objectName}.setProperties({'#{propertyName}' : #{setValue}})"
			end
			f.puts expect_gettype(objectName,propertyName,value)
			f.puts "});"
			f.puts end_check_device_applicability		
		end
		f.puts "});" # End describe
	end

end

def expect_gettype_direct
	
end

def expect_gettype_setproperty
	
end

def expect_gettype_setproperties
	
end

def expect_gettype(objectName,propertyName,value)

	case $getType
	when "direct", "Direct", "DIRECT"
		"expect(#{objectName}.#{propertyName}).toEqual(#{value['expected']});"
	when "getProperty","GetProperty","Getproperty","getproperty"
		"expect(#{objectName}.getProperty('#{propertyName}')).toEqual(#{value['expected']});"
	else
		puts "Didn't get Any Matching Category"
	end
end

def start_check_device_applicability(params)

	$ifflag = false
	if (params.has_key?("platform"))
		conditionstring = []
		params['platform'].each do |platform|

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