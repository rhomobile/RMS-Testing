require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'
require 'helpers/spec_helper'

class FilelistController < Rho::RhoController

	def openFile
    path = Rho::RhoFile.join(Rho::Application.userFolder, "testFile.txt")
    @f= Rho::RhoFile.new(path, Rho::RhoFile::OPEN_FOR_READ)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{@f.isOpened})")
  end
    
	def closeFile
    path = Rho::RhoFile.join(Rho::Application.userFolder, "testFile.txt")
    @f= Rho::RhoFile.new(path, Rho::RhoFile::OPEN_FOR_READ)
    @f.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{@f.isOpened}')")
	end

  def copyFile
    temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
    Rho::RhoFile.deleteRecursive(temporaryDirectory)
    Rho::RhoFile.makeDir(temporaryDirectory)
    
    fromPath = Rho::RhoFile.join(Rho::Application.userFolder, "testing.txt")
    fOpen = Rho::RhoFile.new(fromPath, Rho::RhoFile::OPEN_FOR_APPEND)
    
    toPath = Rho::RhoFile.join(temporaryDirectory, "testing.txt")
    result = Rho::RhoFile.copy(fromPath, toPath)
    data = Rho::RhoFile.exists(temporaryDirectory)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result},#{data}')")
  end
  
  def copyFile_sameFolder
    fromPath = Rho::RhoFile.join(Rho::Application.userFolder, "testing.txt")
    result = Rho::RhoFile.copy(fromPath, Rho::Application.userFolder)
    data = Rho::RhoFile.exists(Rho::Application.userFolder)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result},#{data}')")
  end
  
  def copyFile_withoutParams
    temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
    Rho::RhoFile.deleteRecursive(temporaryDirectory)
    Rho::RhoFile.makeDir(temporaryDirectory)
    fromPath = Rho::RhoFile.join(Rho::Application.userFolder, "invalidtesting.txt")
    result = Rho::RhoFile.copy(nil,nil)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result})")
  end
    
  def delDirectory_leaveRoot   # failing..OPEN_FOR_APPEND and deleteRecursive combo not working. NeedToCheck
    dirToDelete = Rho::RhoFile.join(Rho::Application.userFolder, "dirToDelete")
    Rho::RhoFile.deleteRecursive(dirToDelete)
    Rho::RhoFile.makeDir(dirToDelete)
    dirinDelete = Rho::RhoFile.join(dirToDelete,"InDelete")
    Rho::RhoFile.makeDir(dirinDelete)
    file = Rho::RhoFile.join(dirinDelete, "testing.txt")
    fOpen = Rho::RhoFile.new(file,Rho::RhoFile::OPEN_FOR_APPEND)
    fOpen.close()
    
    d = Rho::RhoFile.deleteRecursive(dirToDelete, true)
    #Alert.show_popup(d.to_s)
    result1 = Rho::RhoFile.isDir(dirToDelete)
    result2 = Rho::RhoFile.isDir(dirinDelete)
    result3 = Rho::RhoFile.exists(file)
    
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result1.to_s},#{result2.to_s},#{result3.to_s}')")
  end
  
  def delDirectory
    dirToDelete = Rho::RhoFile.join(Rho::Application.userFolder, "dirToDelete")
    Rho::RhoFile.deleteRecursive(dirToDelete)
    Rho::RhoFile.makeDir(dirToDelete)
    dirinDelete = Rho::RhoFile.join(dirToDelete,"InDelete")
    Rho::RhoFile.makeDir(dirinDelete)
    file = Rho::RhoFile.join(dirinDelete, "testing.txt")
    fOpen = Rho::RhoFile.new(file,Rho::RhoFile::OPEN_FOR_APPEND)
    fOpen.close()
    Rho::RhoFile.deleteRecursive(dirToDelete, false)
    
    result1 = Rho::RhoFile.isDir(dirToDelete)
    result2 = Rho::RhoFile.isDir(dirinDelete)
    result3 = Rho::RhoFile.exists(file)
  
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result1.to_s},#{result2.to_s},#{result3.to_s}')")
  end
  
  def deleteEmpty
    dirToDelete = Rho::RhoFile.join(Rho::Application.userFolder, "dirToDelete")
    Rho::RhoFile.deleteRecursive(dirToDelete)
    Rho::RhoFile.makeDir(dirToDelete)
    result1 = Rho::RhoFile.deleteDir(dirToDelete)
    result2 = Rho::RhoFile.isDir(dirToDelete)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result1.to_s},#{result2.to_s}')")
  end

  def deleteDirConent
    dirToDelete = Rho::RhoFile.join(Rho::Application.userFolder, "dirToDelete")
    Rho::RhoFile.deleteRecursive(dirToDelete)
    Rho::RhoFile.makeDir(dirToDelete)
    file = Rho::RhoFile.join(dirToDelete, "delete.txt")
    fOpen =Rho::RhoFile.new(file,Rho::RhoFile::OPEN_FOR_APPEND)
    fOpen.close()

    result1 = Rho::RhoFile.deleteDir(dirToDelete)
    result2 = Rho::RhoFile.isDir(dirToDelete)
    result3 = Rho::RhoFile.exists(file)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result1.to_s},#{result2.to_s},#{result3.to_s}')")
  end

  def deleteInvalid
    invalidDir = "/programFiles/Test/"
    result = Rho::RhoFile.deleteDir(invalidDir)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def deleteWithoutParam
    result = Rho::RhoFile.deleteDir(nil)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def fileSize
    testReadPath = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    size = Rho::RhoFile.getFileSize(testReadPath)
    if size > 0
      result = true
    else
      result = false
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def fileSizeDir
    size = Rho::RhoFile.getFileSize(Rho::Application.userFolder)
    if size > 0
      result = true
    else
      result = false
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def fileSizeInvalidDir
    invalidpath = "/programFiles/Test/rholog.txt"
    size = Rho::RhoFile.getFileSize(invalidpath)
    if size > 0
      result = true
    else
      result = false
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def isDirValid
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    result = Rho::RhoFile.isDir(dirName)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def isDirFile
    file = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    result = Rho::RhoFile.isDir(file)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def isDirInvalid
    invalidDir = "/programFiles/Test/"
    result = Rho::RhoFile.isDir(invalidDir)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def isFileValid
    file = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    result = Rho::RhoFile.isFile(file)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def ifFileDir
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    result = Rho::RhoFile.isFile(dirName)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def isFileInvalid
    invalidFile = "/programFiles/Test/test.txt"
    result = Rho::RhoFile.isDir(invalidFile)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def joinOp
    result = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result}')")
  end

  def joinOp_space
    result = Rho::RhoFile.join(Rho::Application.userFolder,"  RMS4")
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def listDirs
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    file = Rho::RhoFile.join(dirName, "Hello.txt")
    fOpen = Rho::RhoFile.new(file,Rho::RhoFile::OPEN_FOR_APPEND)
    fOpen.close()
    fileAPI = Rho::RhoFile.join(dirName, "TestFile")
    Rho::RhoFile.makeDir(fileAPI)
    dirs = Rho::RhoFile.listDir(dirName)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{dirs})")
  end

  def listDirInvalid
    invalidDir = "/programFiles/Test/"
    dirs = Rho::RhoFile.listDir(invalidDir)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{dirs.to_s})")
  end

  def dirMake
    testDirName = Rho::RhoFile.join(Rho::Application.userFolder, "VT295052")
    Rho::RhoFile.makeDir(testDirName)
    result = Rho::RhoFile.isDir(testDirName)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
    Rho::RhoFile.deleteRecursive(testDirName)
  end

  def dirMakeInvalid
    invalidDir = "/programFiles/Test/"
    Rho::RhoFile.makeDir(invalidDir);
    result = Rho::RhoFile.isDir(invalidDir)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end  

  def dirMake_notopdir
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    testDirName = Rho::RhoFile.join(dirName, "VT295053/TestingDir")
    Rho::RhoFile.makeDir(testDirName);
    result = Rho::RhoFile.isDir(testDirName)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def make_dir
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    if @params['validpath'] == 1
      testDirName = Rho::RhoFile.join(dirName, "VT295-051")
    elsif  @params['validpath'] == 2
      testDirName = "C:/AshikD/Testing"
    elsif @params['validpath'] == 3
      testDirName = Rho::RhoFile.join(dirName, "VT295060/TestingDir")
    else
      testDirName = Rho::RhoFile.join(dirName, "VT295058")
    end
    Rho::RhoFile.makeDirs(testDirName)
    result = Rho::RhoFile.isDir(testDirName)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_open_mode1
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode1 = Rho::RhoFile.join(dirName, "Mode1.txt")
    if Rho::RhoFile.exists(fileMode1) && @params['a'] == 1
      Rho::RhoFile.deleteRecursive(fileMode1)
    end
    fOpen = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_APPEND)
    result = Rho::RhoFile.exists(fileMode1)
    writeValue = fOpen.write("This is RMS4.0 File Testing.")
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_open_mode2
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode1 = Rho::RhoFile.join(dirName, "Mode1.txt")
    fOpen = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_READ);
    result = Rho::RhoFile.exists(fileMode1)
    actual = fOpen.readAll()
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_open_mode4
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode4 = Rho::RhoFile.join(dirName, "Mode4.txt")
    fOpen = Rho::RhoFile.new(fileMode4,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    result = Rho::RhoFile.exists(fileMode4)
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_mode4
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode1 = Rho::RhoFile.join(dirName, "Mode1.txt")
    fWrite = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_WRITE)
    fWrite.flush()
    fWrite.close()
    
    fWrite = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    fRead = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    result = Rho::RhoFile.exists(fileMode1)
    
    fWrite.write("test file content")
    fWrite.close()
    actual = fWrite.readAll()
    data = result,actual
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{data})")
    fRead.close()
  end

  def file_open_mode3
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode3 = Rho::RhoFile.join(dirName, "Mode3.txt")
    if Rho::RhoFile.exists(fileMode3)
       Rho::RhoFile.deleteFile(fileMode3)
    end
    fWrite = Rho::RhoFile.new(fileMode3,Rho::RhoFile::OPEN_FOR_WRITE)
    result = Rho::RhoFile.exists(fileMode3)
    written = fWrite.write("test file content")
    fWrite.close()
    fRead = Rho::RhoFile.new(fileMode3,Rho::RhoFile::OPEN_FOR_READ)
    actualString = fRead.readAll()
    fRead.close()
    data = result,actualString
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{data})")
  end

  def file_mode3
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode3 = Rho::RhoFile.join(dirName, "Mode3.txt")
    fWrite = Rho::RhoFile.new(fileMode3,Rho::RhoFile::OPEN_FOR_WRITE)
    result = Rho::RhoFile.exists(fileMode3)
    fRead.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_read
    testReadPath = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    data = Rho::RhoFile.read(testReadPath)
    if data.length != 0
      result = true
    else
      result = false
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_read_specific
    testReadPath = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    fOpen = Rho::RhoFile.new(testReadPath,Rho::RhoFile::OPEN_FOR_READ)
    data = fOpen.read(20)
    if data && data.length > 0
       result = true
    else
       result = false
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_read_specific_seek
    testReadPath = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    fOpen = Rho::RhoFile.new(testReadPath,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    fOpen.seek(20)
    data = fOpen.read(20)
    if data && data.length > 0
       result = true
    else
       result = false
    end
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_read_more
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode6 = Rho::RhoFile.join(dirName, "Mode6.txt")
    fwrite = Rho::RhoFile.new(fileMode6,Rho::RhoFile::OPEN_FOR_WRITE)
    expectedString = "test case content"
    data1 = fwrite.write(expectedString)
    fwrite.close()
    fOpen = Rho::RhoFile.new(fileMode6,Rho::RhoFile::OPEN_FOR_READ)
    data = fOpen.read(40)
    if data && data.length > 0
      result = true
    else
      result = false
    end

    collect = data,result
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{collect})")
  end

  def file_readall
    testReadPath = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    fOpen = Rho::RhoFile.new(testReadPath,Rho::RhoFile::OPEN_FOR_READ)
    data = fOpen.readAll()
    if data && data.length > 0
      result = true
    else
      result = false
    end
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end
  
  def file_rename
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode4 = Rho::RhoFile.join(dirName, "Mode4.txt")
    f = Rho::RhoFile.new(fileMode4,Rho::RhoFile::OPEN_FOR_APPEND)
    f.close()
    newName = Rho::RhoFile.join(Rho::Application.userFolder,"Rename.txt")
    result1 = Rho::RhoFile.rename(fileMode4, newName)
    result2 = Rho::RhoFile.exists(newName)
    Rho::RhoFile.deleteFile(newName)
    Alert.show_popup(result1)
    result = result1,result2
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end
  
  def file_rename_valid_invalid
    invalidpath = "/programFiles/Test/"
    if @params['a'] == 1
      oldName = Rho::RhoFile.join(invalidpath,"invalid.txt")
      newName = Rho::RhoFile.join(Rho::Application.userFolder,"updated.txt")
    elsif @params['a'] == 2
      oldName = Rho::RhoFile.join(Rho::Application.userFolder,"updated.txt")
      newName = Rho::RhoFile.join(invalidpath,"invalid.txt")
    end
    result1 = Rho::RhoFile.rename(oldName, newName)
    result2 = Rho::RhoFile.exists(newName)
    result = result1,result2
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end
  
  def file_rename_null
    result = Rho::RhoFile.rename(nil, nil)
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end

  def file_seek_value
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode1 = Rho::RhoFile.join(dirName, "Mode1.txt")
    if Rho::RhoFile.exists(fileMode1)
       Rho::RhoFile.deleteFile(fileMode1)
    end
    fOpen = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    text = "test case content this is a file"
    writeValue = fOpen.write(text)
    fOpen.seek(10)
    fOpen.write("check")
    fOpen.close()
    
    fRead = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_READ)
    result = fRead.readAll()
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{result.to_s}')")
  end
  
  def file_size
    testReadPath = Rho::RhoFile.join(Rho::Application.appsBundleFolder, "rhoconfig.txt")
    fOpen = Rho::RhoFile.new(testReadPath,Rho::RhoFile::OPEN_FOR_READ)
    fileSize = fOpen.size()
    if fileSize > 2500
      result = true
    else
      result = false
    end
    fOpen.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{result.to_s})")
  end
  
  def file_size_empty
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode1 = Rho::RhoFile.join(dirName, "Mode1.txt")
    if Rho::RhoFile.exists(fileMode1)
       Rho::RhoFile.deleteFile(fileMode1)
    end
    fCln = Rho::RhoFile.new(fileMode1,Rho::RhoFile::OPEN_FOR_WRITE)
    fCln.close()
    fileSize = fCln.size()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{fileSize})")
  end
  
  def file_write
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode5 = Rho::RhoFile.join(dirName, "Mode5.txt")
    if Rho::RhoFile.exists(fileMode5)
       Rho::RhoFile.deleteFile(fileMode5)
    end
    fWrite = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    fRead = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    written = fWrite.write("test file content")
    fWrite.close()
    data = fRead.readAll()
    fRead.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{data.to_s})")
  end
  
  def file_write_end
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode5 = Rho::RhoFile.join(dirName, "Mode5.txt")
    fWrite = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_APPEND)
    fRead = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    written = fWrite.write("this is an example file")
    fWrite.close()
    content = fRead.readAll()
    fRead.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{content.to_s})")
  end

  def file_write_between
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode5 = Rho::RhoFile.join(dirName, "Mode5.txt")
    fWrite = Rho::RhoFile(fileMode5,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    fRead = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_READ_WRITE)
    fWrite.seek(8)
    data = "the "
    written = fWrite.write(data)
    fWrite.close()
    content = fRead.readAll()
    fRead.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{content.to_s})")
  end
  
  def file_flush
    dirName = Rho::RhoFile.join(Rho::Application.userFolder,"RMS4")
    fileMode5 = Rho::RhoFile.join(dirName, "Mode5.txt")
    if Rho::RhoFile.exists(fileMode5)
       Rho::RhoFile.deleteFile(fileMode5)
    end
    
    data = 'mydata-that-should-be-written'
    fileForWrite = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_WRITE)
    fileForWrite.write(data)
    fileForWrite.flush
    
    fRead = Rho::RhoFile.new(fileMode5,Rho::RhoFile::OPEN_FOR_READ)
    content = fRead.readAll()
    fRead.close()
    fileForWrite.close()
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{content.to_s})")
  end


  #Test methods below for - RMS 4.1 : [SPB] Fix File reading errors in Ruby 
  
  def read_nonexistfile    
    invalidpath = "/programFiles/Test/rholog.txt"
    temporaryDirectory = Rho::RhoFile.join(Rho::Application.userFolder, "temporaryDirectory")
    Rho::RhoFile.makeDir(temporaryDirectory)
    
    begin
      Rho::RhoFile.new(invalidpath, Rho::RhoFile::OPEN_FOR_READ)
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
      Rho::RhoFile.new(invalidpath, Rho::RhoFile::OPEN_FOR_READ_WRITE)
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
     Rho::RhoFile.new(openTestFile, Rho::RhoFile::OPEN_FOR_APPEND)
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
      Rho::RhoFile.new(openTestFile, Rho::RhoFile::OPEN_FOR_WRITE)
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
    file = Rho::RhoFile.new(filename, Rho::RhoFile::OPEN_FOR_WRITE)
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
    file = Rho::RhoFile.new(filename, Rho::RhoFile::OPEN_FOR_WRITE)
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
    file = Rho::RhoFile.new(filename, Rho::RhoFile::OPEN_FOR_WRITE)
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