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
  
  def destination300
    Rho::Log.destination = ['file'] 
  end
  
  def destination301
    Rho::Log.destination = ['stdio'] 
  end
    
  def destination302
    Rho::Log.destination = ['uri'] 
  end
  
  def destination303
    Rho::Log.destination = ['file','stdio','uri'] 
  end
  
  def destination304
    Rho::Log.destination = ['stdio','file','uri'] 
  end
  
  def destination305
    Rho::Log.destination = ['stdio','uri','file'] 
  end
  
  def destination306
    Rho::Log.destination = ['uri','file','stdio'] 
  end
  
  def destination307
    Rho::Log.destination = ['uri','stdio','file'] 
  end
  
  def destination308
      Rho::Log.destination = ['file','stdio'] 
  end
  
  def destination309
        Rho::Log.destination = ['file','uri'] 
  end
    
  def destination310
        Rho::Log.destination = ['stdio','uri'] 
  end
    
  def destination311
        Rho::Log.destination = [] 
  end
   
  def destination312
        Rho::Log.destination = ['aaaa'] 
  end
  
  def destinationURI313
    Rho::Log.destinationURI = '';
  end
  
  def destinationURI314
    Rho::Log.destinationURI = '';
  end
  
  def destinationURI315
    Rho::Log.destinationURI = '';
  end
  
  def destinationURI316
    Rho::Log.destinationURI = '';
  end
  
  def destinationURI317
    Rho::Log.destinationURI = '';
  end
  
  def destinationURI318
      Rho::Log.destinationURI = '';
  end
  
  def destinationURI319
      Rho::Log.destinationURI = 'aaaa';
  end
  
  def destinationURI320
      Rho::Log.destinationURI = '';
  end
  
  #For Windows Devices
  def excludeCategories321
    Rho::Log.excludeCategories = 'SignatureCapture::CSignatureModule::MetaProc'
  end
   
  #For IOS or Android 
  #def excludeCategories321
   #   Rho::Log.excludeCategories = 'Rhodes'
  #end 
  
  def excludeCategories322
      Rho::Log.excludeCategories = 'imager,signatureCapture,fileTransfer'
  end
  
  def excludeCategories323
      Rho::Log.excludeCategories = ''
  end
  
  def excludeCategories324
      Rho::Log.excludeCategories = 'aaaa'
  end  

  def excludeFilter325
      Rho::Log.excludeFilter = 'username,password'
  end
  
  def excludeFilter326
      Rho::Log.excludeFilter = ''
  end
      
  def excludeFilter327
      Rho::Log.excludeFilter = 'aaaa'
  end
  
  def filePath328
      Rho::Log.filePath = '/public/bibashlog.txt'
  end 
  
  #Absolute Path
  def filePath329
      Rho::Log.filePath = ''
  end
  
  #Relative Path  
  def filePath330
      Rho::Log.filePath = ''
  end
  
  def filePath331
      Rho::Log.filePath = ''
  end
  
  def filePath332
      Rho::Log.filePath = 'aaaa'
  end 
  
  def fileSize333
      Rho::Log.fileSize = 30
  end
  
  def fileSize334
      Rho::Log.fileSize = 100000
  end
    
  def fileSize335
      Rho::Log.fileSize = 0
  end
    
  def fileSize336
      Rho::Log.fileSize = -100
  end
    
  def fileSize337
      Rho::Log.fileSize = ''
  end
    
  def fileSize338
      Rho::Log.fileSize = aaaa
  end
  
  #For Windows devices
  def includeCategories339
      Rho::Log.includeCategories = 'SignatureCapture::CSignatureModule::MetaProc'
  end
  
  #For IOS or Android
  #def includeCategories339
      #Rho::Log.includeCategories = 'Rhodes'
  #end
    
  def includeCategories340
      Rho::Log.includeCategories = '*'
  end
  
  def includeCategories341
      Rho::Log.includeCategories = 'imager,signatureCapture,fileTransfer'
  end
  
  #For Windows devices
  def includeCategories342
      Rho::Log.includeCategories = 'SignatureCapture::CSignatureModule::MetaProc,aaaa'
  end
  
  #For IOS or Android
  #def includeCategories342
     #Rho::Log.includeCategories = 'Rhodes,aaaa'
  #end
  
  def includeCategories343
     Rho::Log.includeCategories = ''
  end
        
  def includeCategories344
     Rho::Log.includeCategories = 'aaaa'
  end  
  
  def includeCategories345
     Rho::Log.includeCategories = ''
  end     
  
  def level346
       Rho::Log.level = 4
  end
  
  def level347
       Rho::Log.level = 3
  end
    
  def level348
       Rho::Log.level = 2
  end
    
  def level349
       Rho::Log.level = 1
  end
    
  def level350
       Rho::Log.level = 0
  end
    
  def level351
       Rho::Log.level = 100
  end
    
  def level352
       Rho::Log.level = -1
  end
    
  def level353
       Rho::Log.level = ''
  end
    
  def level354
       Rho::Log.level = aaaa
  end 
  
  def memoryPeriod355
       Rho::Log.memoryPeriod = 5000
  end
  
  def memoryPeriod356
       Rho::Log.memoryPeriod = 10000
  end
    
  def memoryPeriod357
       Rho::Log.memoryPeriod = 0
  end
    
  def memoryPeriod358
       Rho::Log.memoryPeriod = -10
  end
    
  def memoryPeriod359
       Rho::Log.memoryPeriod = ''
  end
    
  def memoryPeriod360
       Rho::Log.memoryPeriod = aaaa
  end
  
  def netTrace361
      Rho::Log.netTrace = true
 end
     
   def netTrace362
      Rho::Log.netTrace = false
   end
   
  def netTrace363
      Rho::Log.netTrace = 1
  end
    
  def netTrace364
       Rho::Log.netTrace = 0
  end
      
  def netTrace365
       Rho::Log.netTrace = ''
  end
      
  def netTrace366
       Rho::Log.netTrace = aaaa
  end
  
  def skipPost367
       Rho::Log.skipPost = true
  end
    
  def skipPost368
       Rho::Log.skipPost = false
  end
  
  def skipPost369
       Rho::Log.skipPost = 1
  end
     
  def skipPost370
       Rho::Log.skipPost = 0
  end
      
  def skipPost371
       Rho::Log.skipPost = ''
  end
      
  def skipPost372
       Rho::Log.skipPost = aaaa
  end
  
  def cleanLogFile373
       Rho::Log.cleanLogFile
  end
  
  def cleanLogFile374
       Rho::Log.cleanLogFile(aaaa)
  end 
    
  def error375
       Rho::Log.error('Error is found in File Transfer module','fileTransfer')
  end
  
  def error376
       Rho::Log.error('Error is found in File Transfer module')
  end
    
  def error377
       Rho::Log.error('fileTransfer')
  end
    
  def error378
       Rho::Log.error()
  end
    
  def error379
       Rho::Log.error('Error is found in File Transfer module','aaaa')
  end
  
  def fatalError380
       Rho::Log.fatalError('Fatal Error is found in File Transfer module','fileTransfer')
  end
  
  def fatalError381
       Rho::Log.fatalError('Fatal Error is found in File Transfer module')
  end
    
  def fatalError382
       Rho::Log.fatalError('fileTransfer')
  end
    
  def fatalError383
       Rho::Log.fatalError()
  end
    
  def fatalError384
       Rho::Log.fatalError('Fatal Error is found in File Transfer module','aaaa')
  end
  
  def info385
       Rho::Log.info('Information regarding File Transfer module','fileTransfer')
  end
  
  def info386
       Rho::Log.level = 3
       Rho::Log.info('Information regarding File Transfer module','fileTransfer')
  end
  
  def info387
       Rho::Log.info('Information regarding File Transfer module')
  end
    
  def info388
       Rho::Log.info('fileTransfer')
  end
    
  def info389
       Rho::Log.info()
  end
    
  def info390
       Rho::Log.info('Information regarding File Transfer module','aaaa')
  end
  
  def readLogFile391
    logFileContent = Rho::Log.readLogFile 1000
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
  
  def readLogFile392
    logFileContent = Rho::Log.readLogFile 100.50
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
  
  def readLogFile393
    logFileContent = Rho::Log.readLogFile 0
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
    
  def readLogFile394
    logFileContent = Rho::Log.readLogFile -100
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
    
  def readLogFile395
    logFileContent = Rho::Log.readLogFile
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
    
  def readLogFile396
    logFileContent = Rho::Log.readLogFile aaaa
    Rho::WebView.execute_js("setFieldValue('#{logFileContent}')")
  end
  
  def sendLogFile397
     Rho::Log.sendLogFile()
  end
    
  def sendLogFile398
     Rho::Log.sendLogFile()
  end
  
  def sendLogFile399
    Rho::Log.sendLogFile()
  end
  
  def sendLogFile400
    Rho::Log.sendLogFile()
  end
    
  def sendLogFile401
    Rho::Log.sendLogFile()
  end
  
  def sendLogFile402
    Rho::Log.sendLogFile()
  end
  
  def showLog403
    Rho::Log.showLog()
  end
  
  def trace404
    Rho::Log.trace('Trace messages regarding File Transfer module','fileTransfer')
  end
  
  def trace405
    Rho::Log.trace('Trace messages regarding File Transfer module')
  end
    
  def trace406
    Rho::Log.trace('fileTransfer')
  end
    
  def trace407
    Rho::Log.trace()
  end
    
  def trace408
    Rho::Log.trace('Trace messages regarding File Transfer module','aaaa')
  end
  
  def warning409
    Rho::Log.warning('Warning messages regarding File Transfer module','fileTransfer')
  end
  
  def warning410
    Rho::Log.warning('Warning messages regarding File Transfer module')
  end
    
  def warning411
    Rho::Log.warning('fileTransfer')
  end
    
  def warning412
    Rho::Log.warning()
  end
    
  def warning413
    Rho::Log.warning('Warning messages regarding File Transfer module','aaaa')
  end
   
  def testError
     
    Rho::Log.error("hi","Barcode")
  end
end
