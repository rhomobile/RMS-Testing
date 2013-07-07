describe "FileCommonAPI" do
    
    before(:all) do
        
        clear()
		dir_name = Rho::RhoApplication::get_app_path('DataTemp')
		Rho::RhoFile.makeDir(dir_name) unless Rho::RhoFile.exists(dir_name)
    end
    
    it "should write" do
        file_name = Rho::RhoFile.join(Rho::RhoApplication::get_app_path('DataTemp'), 'temp.txt')
        Rho::RhoFile.delete(file_name) if Rho::RhoFile.exists(file_name)
        Rho::RhoFile.exists(file_name).should ==  false
        
        write_data  = "this is rhodes test"
        f = Rho::RhoFile.new(file_name, Rho::RhoFile::OPEN_FOR_WRITE)
        f.write(write_data)
        f.close
        
        content = Rho::RhoFile.read(file_name)
        content.should ==  write_data 

        write_data1  = "one more test"
        f = Rho::RhoFile.new(file_name, Rho::RhoFile::OPEN_FOR_WRITE)
        f.write(write_data1)
        f.close

        content = Rho::RhoFile.read(file_name)
        content.should ==  write_data1 
        
        write_data2  = ";add more test"
        f = Rho::RhoFile.new(file_name, Rho::RhoFile::OPEN_FOR_APPEND)
        f.write(write_data2)
        f.close
        
        content = Rho::RhoFile.read(file_name)
        content.should ==  write_data1 + write_data2 
        
    end

    def create_file_in_cache(dir_name, file, ext)
	    # get full file path
        f = Rho::RhoFile.join(dir_name, "#{file}"+ "#{ext}")
        #check if file exists and return to fileName action if yes.
        return "exist" if Rho::RhoFile.exists(f)
	   
        dd = 0    
   
        # if no, get number of files in saving location. call delete action if equals 14
        files = Rho::RhoFile.listDir(dir_name)
        puts "files: #{files}"
	    dd = files.size - 2 #skip . and ..
        
	    if  dd == 2
	        return "limit"
	    else
	        # if less than 2, save record of file in model Save, open a new file, write content to file.
            content = "TEST cache"
            file = Rho::RhoFile.new("#{f}", Rho::RhoFile::OPEN_FOR_WRITE)
            file.write(content)
            file.close
            
            return "saved"
        end
        
    end

    it "should dir" do
        dir_name = Rho::RhoApplication::get_app_path('cache')
        Rho::RhoFile.makeDir(dir_name) unless Rho::RhoFile.exists(dir_name)
        
        (1..2).each do |n|
            res = create_file_in_cache(dir_name, "cache_test", n.to_s())
            res.should ==  "saved"
        end
        
        res = create_file_in_cache(dir_name, "cache_test", "1")
        res.should ==  "exist" 
         
        res = create_file_in_cache(dir_name, "cache_test", "3")
        res.should ==  "limit"        
        
    end

    it "should isfileexist" do
        Rho::RhoFile.exists(Rho::RhoApplication::get_model_path('app', 'spec')).should == true
        Rho::RhoFile.exists(Rho::RhoApplication::get_blob_folder()).should ==  true
if !System.get_property('is_emulator')        
        Rho::RhoFile.exists( Rho::RhoFile.join( __rhoGetCurrentDir(), 'rholog.txt')).should ==  true
end        
        Rho::RhoFile.exists(nil).should == false
        Rho::RhoFile.exists("").should == false
    end
       
    it "should readnonexistfile" do
        file_name = Rho::RhoFSConnector::get_app_path('app') + 'lang/lang_345'
        Rho::RhoFile.exists(file_name).should ==  false

        #TODO: crash after this exception on windows mobile(rb_sys_fail)
        #https://www.pivotaltracker.com/story/show/4164945
        if System.get_property('platform') != 'WINDOWS' && System.get_property('platform') != 'WINDOWS_DESKTOP'
            Rho::RhoFile.read(file_name).should == ""
        end    
    end

    def clear
        (1..2).each do |n|
    	    file_name = Rho::RhoFile.join(Rho::RhoApplication::get_app_path('cache'), "cache_test"+ n.to_s())
            Rho::RhoFile.deleteFile(file_name) if Rho::RhoFile.exists(file_name)
        end
    
        file_name = Rho::RhoFile.join(Rho::RhoApplication::get_app_path('DataTemp'), 'temp.txt')
        Rho::RhoFile.deleteFile(file_name) if Rho::RhoFile.exists(file_name)
    end
end    
