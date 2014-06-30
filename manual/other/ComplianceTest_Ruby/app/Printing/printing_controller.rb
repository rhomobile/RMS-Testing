require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class PrintingController < Rho::RhoController

  @printer = Array.new
  
  #callback function for searchPrinters
  # def searchPrinters_callback
  #   begin
  #     @data = Hash.new

  #     if @params['status'] == "PRINTER_STATUS_SUCCESS"
  #       printer_id = @params['printerID']
  #       if printer_id
  #         Alert.show_popup(printer_id)
  #         @data['discovered'] = printer_id
  #         @data['last_printer_id'] = printer_id
  #         @data['last_printer'] = Rho::Printer.getPrinterByID(printer_id)
  #         Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{@data}')")
  #         Alert.show_popup(@data.to_s)
  #       else
  #         Rho::WebView.executeJavascript("runSearchRuby()")
  #       end
  #     else
  #       @data['errors'] = @params['message']
  #       @data['finished'] = true
  #       Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{@data}')")
  #     end

  #   rescue => ex
  #     jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
  #     Rho::WebView.executeJavascript(jsmethod)
  #   end

  # end

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

  
  # test_cases are below here

  def rho_searchPrinters
    begin
      Rho::Printer.searchPrinters({}, url_for(:action => :searchPrinters_callback))
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_connect
    begin
      if @params['pid']
        @printer = Rho::Printer.getPrinterByID(@params['pid'])
        @printer.connect(url_for(:action => :printer_callback_connect))
      end
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_disconnect
    begin
      if @params['pid']
        @printer = Rho::Printer.getPrinterByID(@params['pid'])
      end
      if @printer.isConnected
        @printer.disconnect(url_for(:action => :printer_callback))
      end
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

      @printer = Rho::Printer.getPrinterByID(@params['pid'])
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
        cmmd = '^XA^FO50,50^ADN,36,20^FDPrinting Generic ZPL^FS^XZ'
      else
        cmmd = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Printing Generic CCPL\r\nFORM\r\nPRINT\r\n'
      end

      @printer = Rho::Printer.getPrinterByID(@params['pid'])
      @printer.printRawString(cmmd, {}, url_for(:action => :printer_callback))
     
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printFileImage
    begin
      if @params['file']
        fileURI = @params['file']
      else
        fileURI = ""
      end
    
      @printer = Rho::Printer.getPrinterByID(@params['pid'])
      @printer.printImageFromFile(fileURI, 50, 50, {'width' => 100, 'height' => 100}, url_for(:action => :printer_callback))

    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end


  
end