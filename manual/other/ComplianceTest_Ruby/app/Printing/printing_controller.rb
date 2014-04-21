require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class PrintingController < Rho::RhoController

  @printer = Array.new
  
  #callback function for searchPrinters
  def searchPrinters_callback
    begin
      @data = {
        :discovered => [],
        :printers => [],
        :errors => [],
        :last_printer => null,
        :last_printer_id => null,
        :finished => false,
        :total => 3,
        :curr => 0
      }

      if @params['status'] == "PRINTER_STATUS_SUCCESS" || @params['status'] == "PRINTER_STATUS_SUCCESS"
        Alert.show_popup("if")
        @printers = @params
        printer_id = @printers.printerID
        if printer_id
          Alert.show_popup("printerid")
          @data.discovered = printer_id
          @data.last_printer_id = printer_id
          @data.last_printer = Rho::Printer.getPrinterByID(printer_id)
          Alert.show_popup("data push")
        else
          Rho::WebView.executeJavascript("checkSearch()")
          Alert.show_popup("jscall search")
        end
        Rho::WebView.executeJavascript('Ruby.sendValueToJS("#{@data}")')
      else
        @data.errors = @params['message']
        @data.finished = true;
        Rho::WebView.executeJavascript('Ruby.sendValueToJS("'+ @data +'")')
      end

    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end

  end

  #callback function
  def printer_callback
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
        @printer.connect(url_for(:action => :printer_callback))
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
      if !@printer.isConnected
        @printer.connect(url_for(:action => :printer_callback))
      end
      if @printer.isConnected
        @printer.disconnect(url_for(:action => :printer_callback))
      end
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printFile_callback
    begin
      if @params['file']
        fileURI = @params['file']
      else
        fileURI = ''
      end
      @printer = Rho::Printer.getPrinterByID(@params['pid'])

      if (@printer.isConnected || @printer.isReadyToPrint)
        @printer.printFile(fileURI, {}, url_for(:action => :printer_callback))
      else
        p_str = @printer.status + " \n " + @printer.message
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printRawString_callback
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

      if (@printer.isConnected || @printer.isReadyToPrint)
        @printer.printRawString(cmmd, {}, url_for(:action => :printer_callback))
      else
        p_str = @printer.status + " \n " + @printer.message
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end

    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printFileImage_callback
    begin
      if @params['file']
        fileURI = @params['file']
      else
        fileURI = ""
      end
    
      @printer = Rho::Printer.getPrinterByID(@params['pid'])
      
      if (@printer.isConnected || @printer.isReadyToPrint)
        @printer.printImageFromFile(fileURI, 100, 100, {:width =>50, :height =>50}, url_for(:action => :printer_callback))
      else
        p_str = @printer.status + " \n " + @printer.message
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end
      
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end


  
end