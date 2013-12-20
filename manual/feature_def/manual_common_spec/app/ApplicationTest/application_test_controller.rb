require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ApplicationTestController < Rho::RhoController
  include BrowserHelper

  # GET /ApplicationTest
  def index
    @applicationtests = ApplicationTest.find(:all)
    @menu = {'Test'=>:exit}
    render :back => '/app'
  end

  # GET /ApplicationTest/{1}
  def show
    @applicationtest = ApplicationTest.find(@params['id'])
    if @applicationtest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ApplicationTest/new
  def new
    @applicationtest = ApplicationTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ApplicationTest/{1}/edit
  def edit
    @applicationtest = ApplicationTest.find(@params['id'])
    if @applicationtest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ApplicationTest/create
  def create
    @applicationtest = ApplicationTest.create(@params['applicationtest'])
    redirect :action => :index
  end

  # POST /ApplicationTest/{1}/update
  def update
    @applicationtest = ApplicationTest.find(@params['id'])
    @applicationtest.update_attributes(@params['applicationtest']) if @applicationtest
    redirect :action => :index
  end

  # POST /ApplicationTest/{1}/delete
  def delete
    @applicationtest = ApplicationTest.find(@params['id'])
    @applicationtest.destroy if @applicationtest
    redirect :action => :index  
  end

  #For 4.1 Set App Notification Method Test  
  def applicationNotifyMethod
    Rho::Application.setApplicationNotify(url_for( :action => :notifyCallback))
    redirect :action => :index
  end
  
  def notifyCallback
          Rho::Log.info(@params['applicationEvent'],'APP_CALLBACK')

          time = Time.now
          hr = time.hour.to_s
          if hr.length <2
            hr = 0.to_s + hr
          end
          mn = time.min.to_s
          if mn.length <2
            mn = 0.to_s + mn
          end
          sc = time.sec.to_s
          if sc.length <2
            sc = 0.to_s + sc
          end
          timestr = hr + ":" + mn + ":" + sc

          @data = "<li><ul>Event: " + @params['applicationEvent'].to_s + "<li>Time: " + timestr +"</li></ul></li>"
          Rho::WebView.execute_js("applicationNotify(\"#{@data}\");")
  end
  
end
