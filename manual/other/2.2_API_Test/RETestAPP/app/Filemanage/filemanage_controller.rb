require 'rho/rhocontroller'
require 'helpers/browser_helper'

class FilemanageController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  
  def devicetoserver
  
        @@server = @params['server']
  
        if @@server == "ftp"
          @serverList = {"192.168.6.18"  => "ftp://192.168.6.18/Received/myfilefrmdevice.txt","192.168.6.32"  => "ftp://192.168.6.32/Received/"}
          @message = "Test Page From Device to FTP Server"
          @type = "ftp"
          render :action => :devicetoserver
        elsif @@server == "http"
          @serverList = {"192.168.6.18"  => "http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx","192.168.6.32"  => "http://192.168.6.32/Received/"}
          @message = "Test Page From Device to HTTP Server"
          @type = "http"
          render :action => :devicetoserver
  
        end
  
       end
       
        def servertodevice
  
          @@server = @params['server']
  
          if @@server == "ftp"
            @serverList = {"192.168.6.18"  => "ftp://192.168.6.18/FileCollections/myfile.txt","192.168.6.32"  => "ftp://192.168.6.32/Received/"}
            @message = "Test Page From Device to FTP Server"
            @type = "ftp"
            render :action => :servertodevice
          elsif @@server == "http"
            @serverList = {"192.168.6.18"  => "http://192.168.6.18/NEON/FileCollections/myfile.txt","192.168.6.32"  => "http://192.168.6.32/Received/"}
            @message = "Test Page From Device to HTTP Server"
            @type = "http"
            render :action => :servertodevice
          
          end
  
         end
         
    def startTransfer
       source       = @params['source']
       destination  = @params['destination']
       createFolder = @params['create']
       overWrite    = @params['overwrite']
       type         = @params['type']
       username     = @params['username']
       password     = @params['password']
       puts "data: #{@params}"
       FileTransfer.username      = username
       FileTransfer.password      = password
       FileTransfer.source        = "url('#{source}')"
       FileTransfer.destination   = "url('#{destination}')"
       FileTransfer.overWrite     = overWrite
       FileTransfer.createFolders = createFolder
       FileTransfer.transfer
    end
    
    def setFileTransferEvent
      action  = @params['action']
      if action == 'set'
        FileTransfer.transferEvent =url_for(:action => :file_transferred)
        Alert.show_popup("File Transfer Event Got Set Successfully")
      end
      if action == 'det'
        FileTransfer.transferEvent =""
        Alert.show_popup("File Transfer Event Got deattach Successfully")
      end
    end
      
    def file_transferred
  #    Alert.show_popup("File Transfered Output #{@params}")
      transferResult = @params['transferResult']
      WebView.execute_js('displayResult("'+transferResult+'");')
    end

  
  
  
  
  
  
  
  
  
  # GET /Filemanage
  def index
    @filemanages = Filemanage.find(:all)
    render :back => '/app'
  end

  # GET /Filemanage/{1}
  def show
    @filemanage = Filemanage.find(@params['id'])
    if @filemanage
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Filemanage/new
  def new
    @filemanage = Filemanage.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Filemanage/{1}/edit
  def edit
    @filemanage = Filemanage.find(@params['id'])
    if @filemanage
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Filemanage/create
  def create
    @filemanage = Filemanage.create(@params['filemanage'])
    redirect :action => :index
  end

  # POST /Filemanage/{1}/update
  def update
    @filemanage = Filemanage.find(@params['id'])
    @filemanage.update_attributes(@params['filemanage']) if @filemanage
    redirect :action => :index
  end

  # POST /Filemanage/{1}/delete
  def delete
    @filemanage = Filemanage.find(@params['id'])
    @filemanage.destroy if @filemanage
    redirect :action => :index  
  end
  
  
  def add_item
      # Get the text the user typed in using params[:newitem]
   render_text "<li>" + params[:newitem] + "</li>"
  end
  
end
