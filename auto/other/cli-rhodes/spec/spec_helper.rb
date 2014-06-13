def getCompletedBuilds
	Open3.popen3('rake rhohub:list_builds') do |stdin, stdout, stderr, wait_thr|
		buffer = []
		completedBuild = {}
		flag = false
		buildId = ''
		shouldInclude = ['Build #', 'completed']

		begin
		    while line = stdout.readline
		    	buffer << line
		    end
		rescue
		end

		buffer.each {|entry|

	    	if flag == true

				completedBuild.each {|k,v| 
					if(k == buildId)
						completedBuild.store(k, entry[/.*\/(.*).zip/,1]+".zip")
					end
				}

	    		buildId = ''
	    		flag = false
	    	end


	    	if shouldInclude.all?{ |word| entry.include? word }
	    		buildId = entry[/\#(.*?) /,1]
	    		completedBuild.store(buildId, nil)
	    		flag = true
	    	else
	    		flag = false
	    	end


		}
		completedBuild

	end
end

def getFailedBuilds

	Open3.popen3('rake rhohub:list_builds') do |stdin, stdout, stderr, wait_thr|
		buffer = []
		failedBuild = {}
		flag = false
		buildId = ''
		shouldInclude = ['Build #', 'failed']

		begin
		    while line = stdout.readline
		    	buffer << line
		    end
		rescue
		end

		buffer.each {|entry|

	    	if flag == true

				failedBuild.each {|k,v| 
					if(k == buildId)
						failedBuild.store(k, entry[/.*\/(.*).txt/,1]+".txt")
					end
				}

	    		buildId = ''
	    		flag = false
	    	end


	    	if shouldInclude.all?{ |word| entry.include? word }
	    		buildId = entry[/\#(.*?) /,1]
	    		failedBuild.store(buildId, nil)
	    		flag = true
	    	else
	    		flag = false
	    	end


		}
		failedBuild
	end

end

def getQueuedBuilds
	Open3.popen3('rake rhohub:list_builds') do |stdin, stdout, stderr, wait_thr|
		buffer = []
		queuedBuild = []
		buildId = ''
		shouldInclude = ['Build #', 'queued']

		begin
		    while line = stdout.readline
				buffer << line
		    end
		rescue
		end

		buffer.each {|entry|

	    	if shouldInclude.all?{ |word| entry.include? word }
	    		buildId = entry[/\#(.*?) /,1]
	    		queuedBuild.push(buildId)
	    	end
		}
		queuedBuild
	end
end

def getDownloadedBuildPath(stdIO)
	yml = YAML.load_file("build.yml")
	shouldInclude = ['Done', 'application unpacked into']
	filePath = ''
	fileName = yml['name']
	extension = ''
	stdIO.each {|entry|

		if shouldInclude.all?{ |word| entry.include? word }
			pathContent = entry.split('into')
			filePath = pathContent[pathContent.length - 1].strip
			if ((filePath.include? '/bin/MC3000c50b (ARMV4I)') || (filePath.include? ("/bin/wm")))
			   extension = ".cab"
			elsif filePath.include? "/bin/android"
				extension = "_signed.apk"
			elsif filePath.include? "/bin/win32"
				extension = "-setup.exe"
			end
		end
	}
	filePath = filePath+'/'+fileName+extension
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