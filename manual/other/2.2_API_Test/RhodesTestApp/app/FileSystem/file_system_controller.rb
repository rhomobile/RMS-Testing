require 'rho/rhocontroller'
require 'helpers/browser_helper'

class FileSystemController < Rho::RhoController
  include BrowserHelper

  # GET /FileSystem
  def index
    @filesystems = FileSystem.find(:all)
    render :back => '/app'
  end

  # GET /FileSystem/{1}
  def show
    @filesystem = FileSystem.find(@params['id'])
    if @filesystem
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /FileSystem/new
  def new
    @filesystem = FileSystem.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /FileSystem/{1}/edit
  def edit
    @filesystem = FileSystem.find(@params['id'])
    if @filesystem
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /FileSystem/create
  def create
    @filesystem = FileSystem.create(@params['filesystem'])
    redirect :action => :index
  end

  # POST /FileSystem/{1}/update
  def update
    @filesystem = FileSystem.find(@params['id'])
    @filesystem.update_attributes(@params['filesystem']) if @filesystem
    redirect :action => :index
  end

  # POST /FileSystem/{1}/delete
  def delete
    @filesystem = FileSystem.find(@params['id'])
    @filesystem.destroy if @filesystem
    redirect :action => :index  
  end
  
   
   #Need to provide path
  def get_file_path
      result = ''
      res = ''
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'FileSystem')
      fullpath = File.join(getmodelpath, "test1.txt")
      
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'FileSystem')
      secondfile = File.join(getmodelpath, "test2.txt")
      
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'FileSystem')
      unlinkfile = File.join(getmodelpath, "test3.txt")
      
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'FileSystem')
      deletefile = File.join(getmodelpath, "deletefile.txt")
      
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'FileSystem')
      txtfile = File.join(getmodelpath, "txtfile.txt")
      
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'FileSystem')
      htmlfile = File.join(getmodelpath, "htmlfile.html")
          
      $testCaseID = "VT229-0339-0"
      res = File.absolute_path('.')
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-1"
      res = File.absolute_path(fullpath)
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-2"
      res = File.atime('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-3"
      res = File.atime(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-4"
      res = File.basename('./public/js/application.js')
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-5"
      res = File.basename('./public/js/application.js', '.js')
      result = $testCaseID +" : "+ res
      displayResult result
    
      $testCaseID = "VT229-0339-6"
      res = File.blockdev?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
    
      $testCaseID = "VT229-0339-7"
      res = File.blockdev?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
    
      $testCaseID = "VT229-0339-8"
      res = File.chardev?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
    
      $testCaseID = "VT229-0339-9"
      res = File.chardev?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-10"
      res = File.chmod(0644, fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-11"
      res = File.chmod(0644, fullpath, secondfile).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-12"
      res = File.path('.')
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-13"
      res = File.path("/dev/null")
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-14"
      res = File.ctime('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-15"
      res = File.ctime(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-16"
      res = File.mtime('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-17"
      res = File.mtime(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      
#      $testCaseID = "VT229-0339-18"
#      res = File.utime((new Date()),(Date()),'.').to_s()
#      result = $testCaseID +" : "+ res
#      displayResult result
#      
#      $testCaseID = "VT229-0339-19"
#      res = File.utime((new Date()),(Date()),fullpath).to_s()
#      result = $testCaseID +" : "+ res
#      displayResult result
      
    
      $testCaseID = "VT229-0339-20"
      res = File.directory?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-21"
      res = File.directory?(getmodelpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-22"
      res = File.directory?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
    
      $testCaseID = "VT229-0339-23"
      res = File.file?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-24"
      res = File.file?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-25"
      res = File.pipe?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-26"
      res = File.pipe?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-27"
      res = File.socket?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-28"
      res = File.socket?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-29"
      res = File.exist?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-30"
      res = File.exist?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-31"
      res = File.owned?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-32"
      res = File.owned?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-33"
      res = File.grpowned?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-34"
      res = File.grpowned?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-33"
      res = File.setgid?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-34"
      res = File.setgid?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-35"
      res = File.setuid?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-36"
      res = File.setuid?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-37"
      res = File.sticky?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-38"
      res = File.sticky?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-39"
      res = File.symlink?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-40"
      res = File.symlink?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-40"
      res = File.executable?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-41"
      res = File.executable?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-42"
      res = File.executable_real?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-43"
      res = File.executable_real?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-44"
      res = File.readable?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-45"
      res = File.readable?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-46"
      res = File.readable_real?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-47"
      res = File.readable_real?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-48"
      res = File.writable?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-49"
      res = File.writable?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-50"
      res = File.writable_real?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-51"
      res = File.writable_real?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-52"
      res = File.world_readable?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-53"
      res = File.world_readable?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
      $testCaseID = "VT229-0339-54"
      res = File.world_writable?('.').to_s()
      result = $testCaseID +" : "+ res
      displayResult result
       
      $testCaseID = "VT229-0339-55"
      res = File.world_writable?(fullpath).to_s()
      result = $testCaseID +" : "+ res
      displayResult result
      
    $testCaseID = "VT229-0339-56"
    res = File.zero?('.').to_s()
    result = $testCaseID +" : "+ res
    displayResult result
     
    $testCaseID = "VT229-0339-57"
    res = File.zero?(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-58"
    res = File.size?('.').to_s()
    result = $testCaseID +" : "+ res
    displayResult result
     
    $testCaseID = "VT229-0339-59"
    res = File.size?(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-60"
    res = File.size('.').to_s()
    result = $testCaseID +" : "+ res
    displayResult result
     
    $testCaseID = "VT229-0339-61"
    res = File.size(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
     
#    $testCaseID = "VT229-0339-62"
#    res = File.delete(deletefile).to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
    
#    $testCaseID = "VT229-0339-63"
#    res = File.unlink('.').to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
     
    $testCaseID = "VT229-0339-64"
    res = File.unlink(unlinkfile).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-65"
    res = File.dirname('.').to_s()
    result = $testCaseID +" : "+ res
    displayResult result
     
    $testCaseID = "VT229-0339-66"
    res = File.dirname(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-67"
    res = File.extname(txtfile).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
     
    $testCaseID = "VT229-0339-68"
    res = File.extname(htmlfile).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-69"
    res = File.ftype(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
      
    $testCaseID = "VT229-0339-70"
    res = File.ftype(getmodelpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
#    $testCaseID = "VT229-0339-71"
#    res = File.ftype(charfile).to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
#    
#    $testCaseID = "VT229-0339-72"
#    res = File.ftype(blockfile).to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
#    
#    $testCaseID = "VT229-0339-73"
#    res = File.ftype(fifofile).to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
#        
#    $testCaseID = "VT229-0339-74"
#    res = File.ftype(linkfile).to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
#    
#    $testCaseID = "VT229-0339-75"
#    res = File.ftype(socketfile).to_s()
#    result = $testCaseID +" : "+ res
#    displayResult result
    
    $testCaseID = "VT229-0339-76"
    res = File.stat('.').to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-77"
    res = File.stat(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-78"
    res = File.lstat('.').to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
    $testCaseID = "VT229-0339-79"
    res = File.lstat(fullpath).to_s()
    result = $testCaseID +" : "+ res
    displayResult result
    
   end
   
   def displayResult(data)
     WebView.execute_js('myFunction("'+data+'");')
   end

end
