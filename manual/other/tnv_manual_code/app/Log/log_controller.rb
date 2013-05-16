require 'rho/rhocontroller'
require 'helpers/browser_helper'

class LogController < Rho::RhoController
  include BrowserHelper

  
  #def testError1
   # logProps = "#{@params['message']}"
   # logPropses = "#{@params['category']}"
    #puts "Bibash #{@params['message', 'category']}"    
    #Alert.show_popup "#{@params['message', 'category']}"
    #Rho::Log.error(networkProps, logPropses)
 # end
  
  def destination401
    Rho::Log.destination = ['file','stdio','uri'] 
  end
  
  def destination402
      Rho::Log.destination = ['file','stdio'] 
  end
  
  def destination403
        Rho::Log.destination = ['file','uri'] 
  end
    
  def destination404
        Rho::Log.destination = ['stdio','uri'] 
  end
    
  def destination405
        Rho::Log.destination = [] 
  end
    
  def destination406
        Rho::Log.destination = ['aaaa'] 
  end
      
  def destinationURI407
    Rho::Log.destinationURI = '';
  end
  
  def destinationURI408
      Rho::Log.destinationURI = '';
  end
    
  def destinationURI409
      Rho::Log.destinationURI = 'aaaa';
  end
    
  def excludeCategories410
    Rho::Log.excludeCategories = 'signatureCapture'
  end
  
  def excludeCategories411
      Rho::Log.excludeCategories = 'imager,signatureCapture,fileTransfer'
  end
    
  def excludeCategories412
      Rho::Log.excludeCategories = ''
  end
    
  def excludeCategories413
      Rho::Log.excludeCategories = 'aaaa'
  end
  
  
  def excludeFilter414
        Rho::Log.excludeFilter = 'UserName,Password'
  end
  
  def excludeFilter415
        Rho::Log.excludeFilter = ''
  end
    
  def excludeFilter416
        Rho::Log.excludeFilter = 'aaaa'
  end
  
  def filePath417
        Rho::Log.filePath = '/public/bibashlog.txt'
  end
    
  def filePath418
        Rho::Log.filePath = ''
  end
    
  def filePath419
        Rho::Log.filePath = 'aaaa'
  end
  
  def fileSize420
    Rho::Log.fileSize = 30
  end
  
  def fileSize421
      Rho::Log.fileSize = 100000
  end
  
  def fileSize422
      Rho::Log.fileSize = 0
  end
  
  def fileSize423
      Rho::Log.fileSize = -100
  end
  
  def fileSize424
      Rho::Log.fileSize = ''
  end
  
  def fileSize425
      Rho::Log.fileSize = aaaa
  end
  
  def includeCategories426
      Rho::Log.includeCategories = 'signatureCapture'
  end
    
  def includeCategories427
       Rho::Log.includeCategories = 'imager,signatureCapture,fileTransfer'
  end
      
  def includeCategories428
       Rho::Log.includeCategories = ''
  end
      
  def includeCategories429
       Rho::Log.includeCategories = 'aaaa'
  end
  
  def level430
       Rho::Log.level = 4
  end
  
  def level431
       Rho::Log.level = 3
  end
    
  def level432
       Rho::Log.level = 2
  end
    
  def level433
       Rho::Log.level = 1
  end
    
  def level434
       Rho::Log.level = 0
  end
    
  def level435
       Rho::Log.level = 100
  end
    
  def level436
       Rho::Log.level = -1
  end
    
  def level437
       Rho::Log.level = ''
  end
    
  def level438
       Rho::Log.level = aaaa
  end
  
  def memoryPeriod439
       Rho::Log.memoryPeriod = 5000
  end
  
  def memoryPeriod440
       Rho::Log.memoryPeriod = 10000
  end
    
  def memoryPeriod441
       Rho::Log.memoryPeriod = 0
  end
    
  def memoryPeriod442
       Rho::Log.memoryPeriod = -10
  end
    
  def memoryPeriod443
       Rho::Log.memoryPeriod = ''
  end
    
  def memoryPeriod444
       Rho::Log.memoryPeriod = aaaa
  end
  
  def netTrace445
       Rho::Log.netTrace = true
  end
    
  def netTrace446
       Rho::Log.netTrace = false
  end
      
  def netTrace447
       Rho::Log.netTrace = ''
  end
      
  def netTrace448
       Rho::Log.netTrace = aaaa
  end
  
  def skipPost449
       Rho::Log.skipPost = true
  end
    
  def skipPost450
       Rho::Log.skipPost = false
  end
      
  def skipPost451
       Rho::Log.skipPost = ''
  end
      
  def skipPost452
       Rho::Log.skipPost = aaaa
  end
  
  def cleanLogFile453
       Rho::Log.cleanLogFile
  end
  
  def error454
       Rho::Log.error('Error is found in File Transfer module','fileTransfer')
  end
  
  def error455
       Rho::Log.error('Error is found in File Transfer module')
  end
    
  def error456
       Rho::Log.error('fileTransfer')
  end
    
  def error457
       Rho::Log.error()
  end
    
  def error458
       Rho::Log.error('Error is found in File Transfer module','aaaa')
  end
  
  def fatalError459
       Rho::Log.fatalError('Fatal Error is found in File Transfer module','fileTransfer')
  end
  
  def fatalError460
       Rho::Log.fatalError('Fatal Error is found in File Transfer module')
  end
    
  def fatalError461
       Rho::Log.fatalError('fileTransfer')
  end
    
  def fatalError462
       Rho::Log.fatalError()
  end
    
  def fatalError463
       Rho::Log.fatalError('Fatal Error is found in File Transfer module','aaaa')
  end
  
  def info464
       Rho::Log.info('Information regarding File Transfer module','fileTransfer')
  end
  
  def info465
       Rho::Log.info('Information regarding File Transfer module')
  end
    
  def info466
       Rho::Log.info('fileTransfer')
  end
    
  def info467
       Rho::Log.info()
  end
    
  def info468
       Rho::Log.info('Information regarding File Transfer module','aaaa')
  end
  
  def readLogFile469
    logFileContent = Rho::Log.readLogFile 16384
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")

  end
  
  def readLogFile470
    logFileContent = Rho::Log.readLogFile 0
        Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
    
  def readLogFile471
    logFileContent = Rho::Log.readLogFile -100
        Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
    
  def readLogFile472
    logFileContent = Rho::Log.readLogFile
        Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
    
  def readLogFile473
    logFileContent = Rho::Log.readLogFile aaaa
        Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
  
  def sendLogFile474
       Rho::Log.sendLogFile()
  end
  
  def sendLogFile475
       Rho::Log.sendLogFile()
  end
    
  def sendLogFile476
       Rho::Log.sendLogFile()
  end
  
  def showLog477
       Rho::Log.showLog()
  end
  
  def trace478
       Rho::Log.trace('Trace messages regarding File Transfer module','fileTransfer')
  end
  
  def trace479
       Rho::Log.trace('Trace messages regarding File Transfer module')
  end
    
  def trace480
       Rho::Log.trace('fileTransfer')
  end
    
  def trace481
       Rho::Log.trace()
  end
    
  def trace482
       Rho::Log.trace('Trace messages regarding File Transfer module','aaaa')
  end
  
  def warning483
       Rho::Log.warning('Warning messages regarding File Transfer module','fileTransfer')
  end
  
  def warning484
       Rho::Log.warning('Warning messages regarding File Transfer module')
  end
    
  def warning485
       Rho::Log.warning('fileTransfer')
  end
    
  def warning486
       Rho::Log.warning()
  end
    
  def warning487
       Rho::Log.warning('Warning messages regarding File Transfer module','aaaa')
  end
      
  def testError
     
    Rho::Log.error("hi","Barcode")
  end
end
