require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'
require 'helpers/spec_helper'

class FilelistController < Rho::RhoController
  
  #Test methods below for - RMS 4.1 : [SPB] Fix File reading errors in Ruby 
  
  def read_nonexistfile    
    invalidpath = "/programFiles/Test/rholog.txt"
    temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
    Rho::RhoFile.makeDir(temporaryDirectory)
    
    begin
      Rho::RhoFile.new(invalidpath, 2) #Rho::RhoFile.OPEN_FOR_READ
    rescue => e
      description = e
    end
    
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")
    Rho::RhoFile.deleteRecursive(temporaryDirectory)

  end

  def readwrite_nonexistfile
      invalidpath = "/programFiles/Test/rholog.txt"
      temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
      Rho::RhoFile.makeDir(temporaryDirectory)
      
      begin
        Rho::RhoFile.new(invalidpath, 4) #Rho::RhoFile.OPEN_FOR_READ_WRITE
      rescue => e
        description = e
      end
      
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")
      Rho::RhoFile.deleteRecursive(temporaryDirectory)
      
    end
  
   def append_nonexistfile
     dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
     openTestFile = Rho::RhoFile.join(dirName, "testing.txt")
     if Rho::RhoFile.exists(openTestFile)
         Rho::RhoFile.deleteFile(openTestFile)
     end
     begin
       Rho::RhoFile.new(openTestFile, 1) #Rho::RhoFile.OPEN_FOR_APPEND
     rescue => e
        description = e
     end
     Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")
   end
    
   def write_nonexistfile
     dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
     openTestFile = Rho::RhoFile.join(dirName, "testing.txt")
     if Rho::RhoFile.exists(openTestFile)
        Rho::RhoFile.deleteFile(openTestFile)
     end
     begin
        Rho::RhoFile.new(openTestFile, 3) #Rho::RhoFile.OPEN_FOR_WRITE
     rescue => e
        description = e
     end
     Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")
   end
  
   def readcall_nonexistfile
      invalidpath = "/programFiles/Test/rholog.txt"
      temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
      Rho::RhoFile.makeDir(temporaryDirectory)
      
      begin
        Rho::RhoFile.read(invalidpath)
      rescue => e
        description = e
      end
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")
      Rho::RhoFile.deleteRecursive(temporaryDirectory)
      
    end      
      
   def read_emptyfile
      temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
      Rho::RhoFile.makeDir(temporaryDirectory)
      filename = Rho::RhoFile.join(temporaryDirectory, "emptyFile")
      file = Rho::RhoFile.new(filename, 3) #Rho::RhoFile.OPEN_FOR_WRITE
         
      begin
        file.write("") 
      rescue => e
        msg = e
      end
      file.close
      description = Rho::RhoFile.read(filename)
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")
      Rho::RhoFile.deleteRecursive(temporaryDirectory)
      
   end
       
   def readCRLF
      temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
      Rho::RhoFile.makeDir(temporaryDirectory)
      filename = Rho::RhoFile.join(temporaryDirectory, "emptyFile")
      file = Rho::RhoFile.new(filename, 3) #Rho::RhoFile.OPEN_FOR_WRITE
           
      begin
        file.write('\r\n')
      rescue => e
        msg = e
      end
      file.close
      description = Rho::RhoFile.read(filename)
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{description}')")     
      Rho::RhoFile.deleteRecursive(temporaryDirectory)
      
   end
 
   def loadfile_withoutdq
      temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
      Rho::RhoFile.makeDir(temporaryDirectory)
      filename = Rho::RhoFile.join(temporaryDirectory, "emptyFile")
      file = Rho::RhoFile.new(filename, 3) #Rho::RhoFile.OPEN_FOR_WRITE
            
      begin
        file.write("ab") 
      rescue => e
        msg = e
      end
      file.close
      description = Rho::RhoFile.read(filename)
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(\"#{description}\")")      
      Rho::RhoFile.deleteRecursive(temporaryDirectory)
      
   end 
       
end