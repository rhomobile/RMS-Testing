require 'rho/rhocontroller'

class BarcodeController < Rho::RhoController
  @layout = :simplelayout
  
  def enableSCN
    #Alert.show_popup("In enableSCN")
    scnid = @params['scnid']
    puts "Scanner Type #{scnid}"
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
  
        id = thing.getProperty('ID').to_s
        puts "ID is #{id}"
        puts "scnid is #{scnid}"
        if id == scnid
          thing.enable({}, url_for(:action => :enableCallback))
          puts "Scanner enabled #{id}"
        end
  
      end
      });
  end

  def BarcodeDisable
    Rho::Barcode.disable
  end

  def setTriggerConnected
    value = @params['value']
    puts "TriggerConnected value is #{value}"
    if value == "true"
    Barcode.setProperty('triggerConnected','true')
    elsif value == "false"
    Barcode.setProperty('triggerConnected','false')
    end
  end

  def setTriggerConnectedFalse
      Barcode.setProperty('triggerConnected','false')
  end

  def enableCallback
     #Alert.show_popup("In mydecodeevent")
     puts "In mydecodeevent"  
     scannerData = @params
     mydata = scannerData["data"]
     mysource = scannerData["source"]  
     mytype = scannerData["type"]
     mytime = scannerData["time"]
     mylength = scannerData["length"]
       
     scandata="Data:- "+mydata+"  Source:- "+mysource+"  Type:- "+mytype+"  Time:- "+mytime+"  Length:- "+mylength  
     Rho::WebView.executeJavascript('enablecallbackdata("'+scandata+'")')
   end

  def enableSCNwithTriggerConnected
    #Alert.show_popup("In enableSCN")
    scnid = @params['scnid']
    value = @params['value']
    puts "Scanner Type #{scnid}"
    puts "TriggerConnected value is #{value}"
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
  
        id = thing.getProperty('ID').to_s
        puts "ID is #{id}"
        puts "scnid is #{scnid}"
        if id == scnid
          thing.enable({"triggerConnected" => value}, url_for(:action => :enableCallback))
          puts "Scanner enabled #{id}"
        end
  
      end
      });
  end


end