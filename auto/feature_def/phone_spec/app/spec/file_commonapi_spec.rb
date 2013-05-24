describe "RhoFile" do
    
    before(:all) do
        clear()
		dir_name = Rho::RhoApplication::get_app_path('DataTemp')
		Rho::File.makeDir(dir_name) unless Rho::File.exists(dir_name)
    end
    
    it "should write" do
        file_name = Rho::File.join(Rho::RhoApplication::get_app_path('DataTemp'), 'temp.txt')
        Rho::File.delete(file_name) if Rho::File.exists(file_name)
        Rho::File.exists(file_name).should ==  false

        write_data  = "this is rhodes test"
        f = Rho::File.open(file_name, Rho::File.openForWrite)
        f.write(write_data)
        f.close        
        
        content = Rho::File.read(file_name)
        content.should ==  write_data 

        write_data1  = "one more test"
        Rho::File.open(file_name, Rho::File.openForWrite){|file| file.write(write_data1)}
        content = Rho::File.read(file_name)
        content.should ==  write_data1 
        
        write_data2  = ";add more test"
        Rho::File.open(file_name, Rho::File.openForAppend){|file| file.write(write_data2)}
        content = Rho::File.read(file_name)
        content.should ==  write_data1 + write_data2 
        
    end

    def create_file_in_cache(dir_name, file, ext)
	    # get full file path
        f = Rho::File.join(dir_name, "#{file}"+ "#{ext}")
        #check if file exists and return to fileName action if yes.
        return "exist" if Rho::File.exists(f)
	   
        dd = 0    
if !defined?(RHO_WP7)     
        # if no, get number of files in saving location. call delete action if equals 14
        files = Rho::File.listDir(dir_name)
        #puts "files: #{files}"
	    dd = files.size - 2 #skip . and ..
end        
	    if  dd == 2
	        return "limit"
	    else
	        # if less than 2, save record of file in model Save, open a new file, write content to file.
            content = "TEST cache"
            content = Rho::File.open("#{f}", Rho::File.openForWrite)
            content.write(content)
            content.close
            
            return "saved"
        end
        
    end

    it "should dir" do
        dir_name = Rho::RhoApplication::get_app_path('cache')
        Rho::File.makeDir(dir_name) unless Rho::File.exists(dir_name)
        
        (1..2).each do |n|
            res = create_file_in_cache(dir_name, "cache_test", n.to_s())
            res.should ==  "saved"
        end
        
        res = create_file_in_cache(dir_name, "cache_test", "1")
        res.should ==  "exist" 
if !defined?(RHO_WP7)         
        res = create_file_in_cache(dir_name, "cache_test", "3")
        res.should ==  "limit" 
end        
        
    end

    it "should isfileexist" do
        Rho::File.exists(Rho::RhoApplication::get_model_path('app', 'spec')).should == true
        Rho::File.exists(Rho::RhoApplication::get_blob_folder()).should ==  true
        Rho::File.exists( Rho::File.join( __rhoGetCurrentDir(), 'rholog.txt')).should ==  true
        
        bExc = false
        begin
            Rho::File.exists(nil)
        rescue Exception => e
            bExc = e.is_a?(TypeError)
        end        
        
        bExc.should ==  true  
    
        Rho::File.exists("").should == false
    end
    
   if !defined?(RHO_WP7)   
    it "should readnonexistfile" do
        file_name = Rho::RhoFSConnector::get_app_path('app') + 'lang/lang_345'
        Rho::File.exists(file_name).should ==  false

        #TODO: crash after this exception on windows mobile(rb_sys_fail)
        #https://www.pivotaltracker.com/story/show/4164945
        if System.get_property('platform') != 'WINDOWS' && System.get_property('platform') != 'WINDOWS_DESKTOP'
            bExc = false
            begin
                Rho::File.read(file_name)
            rescue Exception => e
                bExc = e.is_a?(SystemCallError)
            end
            bExc.should ==  true
        end    
    end
    end
    
    def clear
        (1..2).each do |n|
    	    file_name = Rho::File.join(Rho::RhoApplication::get_app_path('cache'), "cache_test"+ n.to_s())
            Rho::File.delete(file_name) if Rho::File.exists(file_name)
        end
    
        file_name = Rho::File.join(Rho::RhoApplication::get_app_path('DataTemp'), 'temp.txt')
        Rho::File.delete(file_name) if Rho::File.exists(file_name)
    end
end    
