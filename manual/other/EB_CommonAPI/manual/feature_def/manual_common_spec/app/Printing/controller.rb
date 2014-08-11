require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'
require 'helpers/spec_helper'

class Printing < Rho::RhoController

  printers = Array.new
  
  #callback function for enumerateSupportedTypes
  def enumerateSupportedTypes_callback(p_str)
    begin
      if p_str
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      else
        p_str = "Could not find printer types."
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  #anonymous function for enumerateSupportedTypes
  enumprinters = lambda {|p_str|
    begin
      if p_str
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      else
        p_str = "Could not find printer types."
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  }
  
  #callback function for searchPrinters
  def searchPrinters_callback
    begin
      if @params[:status] == Rho::Printer::STATUS_SUCCESS
        printers = @params
        p_str = @params[:status] + " \n " + printers[0]
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      else
        p_str = @params[:message]
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  #callback function for stopSearch
  def stopSearch_callback
    if @params[:status]
      p_str = @params[:status]
    else
      p_str = "STATUS_ERROR"
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
  end
  
  #anonymous function for enumerateSupportedTypes
  stopSearchAnony = lambda {
    if @params[:status]
      p_str = @params[:status]
    else
      p_str = "STATUS_ERROR"
    end
    Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
  }

  #callback function for connect
  def connect_callback(stat_us)
    begin
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  #anonymous function for connect
  connect_anonymous = lambda {|stat_us|
    begin
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  }
  
  #callback function for disconnect
  def disconnect_callback(stat_us)
    begin
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  #anonymous function for disconnect
  disconnectAnony = lambda {|stat_us|
    begin
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  }
  
  #callback function for printFIle
  def printFIle_callback(stat_us)
    begin
      stat_us = stat_us + "Printing your file... "
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  #anonymous function for printFIle
  printFIleAnony = lambda {|stat_us|
    begin
      stat_us = stat_us + "Printing your file... "
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  }
  
  #callback function for printFIle
  def printRawString_callback(stat_us)
    begin
      stat_us = stat_us + "Printing your file... "
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  #anonymous function for printRawString
  printRawStringAnony = lambda {|stat_us|
    begin
      stat_us = stat_us + "Printing your file... "
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{stat_us})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  }
  
  # test_cases are below here

	def rho_enumerateSupportedTypes
    begin
      @printerTypes = Rho::Printer.enumerateSupportedTypes()
      @printerType_str = @printerTypes * ","
      Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{@printerType_str})")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_enumerateSupportedTypes_callback
    begin
      @printerTypes = Rho::Printer.enumerateSupportedTypes({
        :callback => url_for(:action => :enumerateSupportedTypes_callback) 
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_enumerateSupportedTypes_anonymous
    begin
      @printerTypes = Rho::Printer.enumerateSupportedTypes({
        :callback => enumprinters
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
    
  def rho_searchPrinters
    begin
      @printerTypes = Rho::Printer.searchPrinters({
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_searchPrinters_printerType_connectType
    begin
      if @params[:p_type]
        ptype = @params[:p_type]
      else
        ptype = Rho::Printer::PRINTER_TYPE_ANY
      end
      if @params[:p_connectype]
        pconnectype = @params[:p_connectype]
      else
        pconnectype = Rho::Printer.connectionType
      end
      @printerTypes = Rho::Printer.searchPrinters({
        :options => [
          "printers" => ptype,
          "connectionType" => pconnectype
          ],
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_searchPrinters_printerType_connectType_timeout
    begin
      @printerTypes = Rho::Printer.searchPrinters({
        :options => [
          "printers" => Rho::Printer::PRINTER_TYPE_ANY,
          "connectionType" => Rho::Printer.connectionType,
          "timeout" => 15000
          ],
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_searchPrinters_timeout
    begin
      @printerTypes = Rho::Printer.searchPrinters({
        :options => [
          "timeout" => 15000
          ],
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_searchPrinters_macip
    macipaddr = @params[:macip]
    begin
      @printerTypes = Rho::Printer.searchPrinters({
        :options => [
          "deviceAddress" => macipaddr
          ],
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_searchPrinters_macip_all
    macipaddr = @params[:macip]
    begin
      @printerTypes = Rho::Printer.searchPrinters({
        :options => [
          "printers" => Rho::Printer::PRINTER_TYPE_ANY,
          "connectionType" => Rho::Printer.connectionType,
          "timeout" => 15000,
          "deviceAddress" => macipaddr
          ],
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_searchPrinters_devicePort
    begin
      @printerTypes = Rho::Printer.searchPrinters({
        :options => [
          "devicePort" => 80
          ],
        :callback => url_for(:action => :searchPrinters_callback)
      }
      );
      
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_stopSearch
    begin
      render :action => :rho_searchPrinters
      if @params[:_type]
        if @params[:_type] == "callbk"
          stopsrch = Rho::Printer.stopSearch({
            :callback => :stopSearch_callback
          });
        else
          stopsrch = Rho::Printer.stopSearch({
            :callback => stopSearchAnony
          });
        end
      else
        stopsrch = Rho::Printer.stopSearch();
      end
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_getPrinterByID
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.status + " \n Printer Instance returned successfully."
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
          printer.disconnect();
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_getPrinterByID_without_discovery
    begin
      printers.clear
      printer = Rho::Printer.getPrinterByID(printers[0].printerID)
      printer.connect()
      if (printer.isConnected || printer.isReadyToPrint)
        p_str = printer.status + " \n Printer Instance returned successfully."
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        printer.disconnect();
      else
        p_str = printer.status + " \n " + printer.message
        Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_connect
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.printRawString("Hello Printing!");
          printer.disconnect();
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_connect_callback
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect({
          :callback => url_for(:action => :connect_callback)
        });
        if (printer.isConnected || printer.isReadyToPrint)
           printer.disconnect()
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_connect_anony
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect({
          :callback => connect_anonymous
        });
        if (printer.isConnected || printer.isReadyToPrint)
           printer.disconnect()
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_connect_timeout
    begin
      if @params[:duration]
        if @params[:convType] == "fl_oat"
          @params[:duration] = @params[:duration].to_f
        else
          @params[:duration] = Integer(@params[:duration])
        end        
      else
        @params[:duration] = 15000
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect({
          :options => [
            "timeout" => @params[:duration]
            ],
          :callback => url_for(:action => :connect_callback)
        });
        if (printer.isConnected || printer.isReadyToPrint)
           printer.disconnect()
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_disconnect
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.disconnect();
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{printer.message})")
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_disconnect_callback
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.disconnect({
            :callback => url_for(:action => :disconnect_callback)
          });
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_disconnect_anony
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.disconnect({
            :callback => disconnectAnony
          });
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_disconnect_and_print
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.disconnect();
          prs_str = printer.printRawString("Hello Printing!");
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{prs_str})")
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_disconnect_disconnect
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.disconnect()
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.disconnect({
            :callback => url_for(:action => :disconnect_callback)
          });
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_disconnect_callback_disconnect
    begin
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.disconnect({
          :callback => url_for(:action => :disconnect_callback)
        });
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          printer.disconnect({
            :callback => url_for(:action => :disconnect_callback)
          });
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printFile
    begin
      if @params[:fileURI]
        fileURI = @params[:fileURI]
      else
        fileURI = ""
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.printFile({
            :fileURI => fileURI
          });
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printFile_callback
    begin
      if @params[:fileURI]
        fileURI = @params[:fileURI]
      else
        fileURI = ""
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.printFile({
            :fileURI => fileURI,
            :callback => url_for(:action => :printFIle_callback)
          });
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_printFile_anony
    begin
      if @params[:fileURI]
        fileURI = @params[:fileURI]
      else
        fileURI = ""
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.printFile({
            :fileURI => fileURI,
            :callback => printFIleAnony
          });
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_printRawString
    begin
      if @params[:cmmd]
        cmmd = @params[:cmmd]
      else
        cmmd = ""
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.printRawString({
            :command => cmmd
          });
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def rho_printRawString_callback
    begin
      if @params[:cmmd]
        cmmd = @params[:cmmd]
      else
        cmmd = ""
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.printRawString({
            :command => cmmd,
            :callback => url_for(:action => :printRawString_callback)
          });
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def rho_printRawString_anony
    begin
      if @params[:cmmd]
        cmmd = @params[:cmmd]
      else
        cmmd = ""
      end
      if printers.length
        printer = Rho::Printer.getPrinterByID(printers[0].printerID)
        printer.connect()
        if (printer.isConnected || printer.isReadyToPrint)
          p_str = printer.printRawString({
            :command => cmmd,
            :callback => printRawStringAnony
          });
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        else
          p_str = printer.status + " \n " + printer.message
          Rho::WebView.executeJavascript("Ruby.sendValueToJS(#{p_str})")
        end
      end
    rescue
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
end