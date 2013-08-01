require 'rho/rhocontroller'
require 'helpers/browser_helper'

class TimerController < Rho::RhoController
  include BrowserHelper

  # GET /Timer
  def index
    render :back => '/app'
  end
  
  def get_timer_result
    if (!$rho_test_timer_result)
      $rho_test_timer_result = ""  
    end
    $rho_test_timer_result
  end
  
  def start_timer
    Rho::Timer.start(5000, (url_for :action => :timer_callback), "data")
    
    redirect :action => :index
  end

  def stop_timer
    Rho::Timer.stop((url_for :action => :timer_callback));
    
    redirect :action => :index
  end

  def timer_callback
    puts "timer_callback: #{@params.to_s}"

    $rho_test_timer_result += "Timer works!<br/>"
    WebView.refresh
  end
  
  #Test Case ID VT229-0060
  def start_timer
    $testCaseID = "VT229-0060"
    Rho::Timer.start(5000, (url_for :action => :timer_callback_1),"")
  end
  
  def timer_callback_1
    result = "Call Back Methods for test case ID VT229-0060 got fired "
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  #Test Case ID VT229-0061
  def start_stop_timer
    $testCaseID = "VT229-0061"
    Rho::Timer.start(5000, (url_for :action => :timer_callback_2),"")
    Rho::Timer.stop(callback_url_stop)
  end
  
  def timer_callback_2
      result = "This callback method should not get fired. If its fired then stop timer is not working.Raise a BUG ... HA! HA! HA!"
      puts result
      WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  def callback_url_stop
    result = "Stop Call Back Fired!! Timer Stopped... Wait for 5 secs to check Timer call back is getting fired or not"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  #Test Case ID VT229-0062
  def timer_with_data
    $testCaseID = "VT229-0062"
    Rho::Timer.start(5000, (url_for :action => :timer_callback_3), "data=Timer Data Passed&data2=value2")
  end
  
  def timer_callback_3
    data = @params['data']
    data2 = @params['data2']
    result = "The Data Passed #{data} and #{data2}"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  #Test Case ID VT229-0063
  def timer_duration_0
    $testCaseID = "VT229-0062"
    Rho::Timer.start(0, (url_for :action => :timer_callback_4), "TEST DATA")
  end

  def timer_callback_4
    result = "Timer with 0 time get fired"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  #Test Case ID VT229-0063-A
  def multiple_timer
    $testCaseID = "VT229-0063-A"
    Rho::Timer.start(5000, (url_for :action => :timer_callback_5), "data=5000")
    Rho::Timer.start(10000, (url_for :action => :timer_callback_6), "data=10000")
    Rho::Timer.start(15000, (url_for :action => :timer_callback_7), "data=15000")
  end
  
  #Test Case ID VT229-0063-B
  def multiple_timer_stop
    $testCaseID = "VT229-0063-B"
    Rho::Timer.start(5000, (url_for :action => :timer_callback_5), "data=5000")
    Rho::Timer.start(10000, (url_for :action => :timer_callback_6), "data=10000")
    Rho::Timer.start(15000, (url_for :action => :timer_callback_7), "data=15000")
    Rho::Timer.stop(callback_url_stop2)
  end
  
  def timer_callback_5
    data = @params['data']
    result = "Timer with 5000 time get fired Value Passed(5000) Actual: #{data}"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
 
  def timer_callback_6
    data = @params['data']
    result = "Timer with 10000 time get fired Value Passed(10000) Actual: #{data}"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  def timer_callback_7
    data = @params['data']
    result = "Timer with 15000 time get fired Value Passed(15000) Actual: #{data}"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
  
  def callback_url_stop2
    result = "Stop Call Back Fired!! Timer Stopped... Nothing should get fired after this... Wait for 20 Sec"
    puts result
    WebView.execute_js('myTimerFill("'+result+'");')
  end
end
