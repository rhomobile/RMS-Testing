require 'rho/rhocontroller'
require 'helpers/browser_helper'

class TestcodeController < Rho::RhoController
  include BrowserHelper
  @layout = 'Testcode/layout'

  # GET /Testcode
  def index
    render :back => '/app'
  end
  
  def patro (dob)
    Alert.show_popup "Hello Patro #{dob}"
  end
  
  def evalcall
    callback = "patro"
    output = "12345"
    eval callback+" "+output
  end
  
  def testifelse
    
    x = 5
    if (x==12)
      Alert.show_popup "IF"
    elsif (x == 5)
      Alert.show_popup "Else IF"
    else
      Alert.show_popup "Nothing"
    end

  end
  
  def setgo
    WebView.navigate(url_for(:action => '../Barcode', :query =>{'ph'=>'9538093550', 'userid'=>'bhakta'}))
  end
  


end
