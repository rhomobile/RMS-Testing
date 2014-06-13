def getApplicationBuildPath(platform)
	yml = YAML.load_file("./build.yml")

	filePath = './bin/target/'
	fileName = yml['name']
	extension = ''

	if (platform == 'wm')
	   filePath = filePath + 'MC3000c50b (ARMV4I)/' + fileName + '.cab'
	elsif (platform == 'android')
		filePath = filePath + 'android/' + fileName + '_signed.apk'
	elsif (platform == 'win32')
		filePath = filePath + 'win32/' + fileName + '-setup.exe'
	elsif (platform == 'ios')
		filePath = filePath + 'ios/' + fileName + '.ipa'		
	end

	filePath
end


def add_yml_setting application_build_yml, hash_setting

	yml = YAML.load_file(application_build_yml)

	array_list = nil
	if hash_setting.to_s.gsub('**', ',').nil?
		array_list = hash_setting
	else
		array_list = hash_setting.to_s.gsub('**', ',')
	end
	yml.merge!(eval(array_list))
	File.open(application_build_yml, "w") {|f| YAML.dump(yml, f)}
end

def delete_yml_setting application_build_yml, key, level = ''

	yml = YAML.load_file(application_build_yml)

	if level.empty?
		yml.delete(key)
	else
		# Currently its printing {} as value
		subyml = eval("yml"+level)
		subyml.delete_if {|k,v|
			k == key
		}
	end

	File.open(application_build_yml, "w") {|f| YAML.dump(yml, f)}
end

def initiate_build_wmce

	Open3.popen2e('rake device:wm:production') do |stdin, stdout_and_stderr, wait_thr|
		begin
	    while line = stdout_and_stderr.readline
			$buffer << line
	    end
		rescue
		end
	end

	File.open($log_file, 'w') {|f| 
		f.write($buffer) 
	}
	puts "<div class='logfile'><a target='_blank' href='#{$log_file}'>Build.log</a></div>"

end

def initiate_build_android

	Open3.popen2e('rake device:android:production') do |stdin, stdout_and_stderr, wait_thr|
		begin
	    while line = stdout_and_stderr.readline
			$buffer << line
	    end
		rescue
		end
	end

	File.open($log_file, 'w') {|f| 
		f.write($buffer) 
	}
	puts "<div class='logfile'><a target='_blank' href='#{$log_file}'>Build.log</a></div>"

end

def initiate_build_win32

	Open3.popen2e('rake device:win32:production') do |stdin, stdout_and_stderr, wait_thr|
		begin
	    while line = stdout_and_stderr.readline
			$buffer << line
	    end
		rescue
		end
	end

	File.open($log_file, 'w') {|f| 
		f.write($buffer) 
	}
	puts "<div class='logfile'><a target='_blank' href='#{$log_file}'>Build.log</a></div>"

end

def initiate_build_ios

	Open3.popen2e('rake device:iphone:production') do |stdin, stdout_and_stderr, wait_thr|
		begin
	    while line = stdout_and_stderr.readline
			$buffer << line
	    end
		rescue
		end
	end

	File.open($log_file, 'w') {|f| 
		f.write($buffer) 
	}
	puts "<div class='logfile'><a target='_blank' href='#{$log_file}'>Build.log</a></div>"

end