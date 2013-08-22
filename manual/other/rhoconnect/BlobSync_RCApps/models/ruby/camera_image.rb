class CameraImage < Rhoconnect::Model::Base
  def initialize(source) 
    super(source)
  end
 
  def login
    # TODO: Login to your data source here if necessary
  end
 
  def query(params=nil)
   begin
     puts "******************Query method called***************************"  
      @result = {}       
      Dir.foreach("/Applications/XAMPP/xamppfiles/htdocs/test/ProductBlobsFolder") do |item|
        next if item == '.' or item == '..'
        new_item = {
      'image_uri-rhoblob' => 'http://localhost/test/ProductBlobsFolder/' + File.basename(item.to_s),
      'name' => File.basename(item.to_s ,".*")}
       puts "Found: #{new_item.inspect}"
       @result[item.to_s] = new_item      
       end
    rescue Exception=>e
        puts "Query method Error: " +e.inspect.to_s
    end  
  end

  def create(create_hash)
    begin
    puts "******************Create hash #{create_hash}***************************"  
    # code if else for checking the blob has . extension or not?
    if create_hash['filename'].to_s.include? "."
    filename = create_hash['filename']
    else
    filename = create_hash['filename'].to_s + ".jpg"  
    end  
    puts "filename #{filename}"  
    puts "copy files to server location"
    FileUtils.cp create_hash['image_uri'],"/Applications/XAMPP/xamppfiles/htdocs/test/ProductBlobsFolder/"+filename   
#    File.open(create_hash['image_uri'],'w'){ |f|
#    f.move create_hash['image_uri'], File.join(destination, File.basename(filename)) }
      #FileUtils.cp create_hash['image_uri'],File.join(File.dirname(__FILE__),'..','public_folder',filename)   
    rescue Exception=>e
              puts "Create method Error: " +e.inspect.to_s
    end 
    create_hash['filename']
  end
 
  def update(update_hash)
    # TODO: Update an existing record in your backend data source
    raise "Please provide some code to update a single record in the backend data source using the update_hash"
  end
 
  def delete(delete_hash)
    begin
    puts "******************delete hash #{delete_hash}***************************"  
    filename = delete_hash['id']
    FileUtils.remove_file("/Applications/XAMPP/xamppfiles/htdocs/test/ProductBlobsFolder/"+filename , force = false)
    rescue Exception=>e
     puts "Delete method Error: " +e.inspect.to_s
   end 
  end
 
  def logoff
    # TODO: Logout from the data source if necessary
  end

   def store_blob(obj,field_name,blob)
     puts "store_blob: obj=#{obj}, field_name=#{field_name}, blob=#{blob}"
     if blob
             obj['filename'] = blob[:filename]
             obj['image_uri'] = blob[:tempfile].path
           end
     super
   end
  # Calling super here returns rack tempfile path:
  # i.e. /var/folders/J4/J4wGJ-r6H7S313GEZ-Xx5E+++TI
  # Note: This tempfile is removed when server stops or crashes...
  # See http://rack.rubyforge.org/doc/Multipart.html for more info
  #
  # Uncomment this code and override it by creating a copy of the file somewhere
  # and returning the path to that file (then don't call super!):
  # i.e. /mnt/myimages/soccer.png
  #def store_blob(object,field_name,blob)
  #  super #=> returns blob[:tempfile]
  #end
end