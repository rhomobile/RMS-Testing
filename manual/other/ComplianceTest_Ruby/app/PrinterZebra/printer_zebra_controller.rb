require 'rho/rhocontroller'
require 'helpers/browser_helper'

class PrinterZebraController < Rho::RhoController

@@formatpath = 'E:FORMAT.ZPL'
@@hashzpl = { 
        '1' => 'val1',
        '2' => 'val2',
        '3' => 'val3',
        '4' => 'val4',
        '5' => 'val5',
        '6' => 'val6'
      }

@@arrayzpl = ['val2', 'val1', 'val3', 'val4', 'val5', 'val6']


#callback function
def printer_callback_connect
  begin
    if @params['status']
      Rho::WebView.executeJavascript('Ruby.sendValueToJS("'+ @params['status'] +'")')
    else
      Rho::WebView.executeJavascript('Ruby.sendValueToJS("'+ @params['result'] +'")')
    end
  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

#callback function
def printer_callback
  begin
	if @params
	  @data = @params.to_json
	  Rho::WebView.executeJavascript("Ruby.sendValueToJS(JSON.stringify(#{@data}))")
	end
  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

#callback function for searchPrinters
def searchPrinters_callback
  begin
    if @params
      Rho::WebView.executeJavascript('Ruby.sendValueToJS("'+ @params['printerID'] +'")')
    end
  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end


#test case methods are below

def rho_connect
  begin
    if @params['pid']
      @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
      @printer.connect(url_for(:action => :printer_callback_connect))
    end
  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

def rho_searchPrinters
  begin
    Rho::PrinterZebra.searchPrinters({}, url_for(:action => :searchPrinters_callback))
  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end


def rho_printFile
   begin
      if @params['file']
        fileURI = @params['file']
      else
        fileURI = ''
      end
      @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])

      @printer.printFile(fileURI, {}, url_for(:action => :printer_callback))

    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
end

def rho_printRawString
  begin
    if @params['rawstr']
      rawstr = @params['rawstr']
    else
      rawstr = ''
    end
    if (rawstr == 'zpl')
      cmmd = '^XA^FO50,50^ADN,36,20^FDPrinting Zebra ZPL^FS^XZ'
    else
      cmmd = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Printing Zebra CCPL\r\nFORM\r\nPRINT\r\n'
    end

    @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    @printer.printRawString(cmmd, {}, url_for(:action => :printer_callback))

  rescue => ex
    Alert.show_popup(ex.to_s)
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

def rho_doSendFileContents
  begin
    if @params['file']
      fileURI = @params['file']
    else
      fileURI = ''
    end
    @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])

    @printer.sendFileContents(fileURI, url_for(:action => :printer_callback))

  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

def rho_printFileImage
  begin
    if @params['file']
      fileURI = @params['file']
    end
  
    @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    @printer.printImageFromFile(fileURI, 50, 50, {'width' => -1, 'height' => -1}, url_for(:action => :printer_callback))

  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

def rho_printerReqState
  begin

    @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    @printer.requestState([Rho::PrinterZebra::PRINTER_STATE_IS_READY_TO_PRINT], url_for(:action => :printer_callback))

  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

# def rho_printerStoredFormat_raw
#   begin
#     @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    
#     if (@printer.isConnected || @printer.isReadyToPrint)
#       @printer.printRawString(@formatpath, {}, url_for(:action => :printer_callback))
#     else
#       p_str = @printer.status + " \n " + @printer.message
#       Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
#     end

#   rescue => ex
#     jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
#     Rho::WebView.executeJavascript(jsmethod)
#   end
# end

def rho_printerStoredHash
  begin
 
    @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    @printer.printStoredFormatWithHash(@@formatpath, @@hashzpl, url_for(:action => :printer_callback))

  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

def rho_printerStoredArray
  begin
  
    @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    @printer.printStoredFormatWithArray(@@formatpath, @@arrayzpl, url_for(:action => :printer_callback))

  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

def rho_disconnect
  begin
    if @params['pid']
      @printer = Rho::PrinterZebra.getPrinterByID(@params['pid'])
    end
    if @printer.isConnected
      @printer.disconnect(url_for(:action => :printer_callback))
    end
  rescue => ex
    jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
    Rho::WebView.executeJavascript(jsmethod)
  end
end

end
