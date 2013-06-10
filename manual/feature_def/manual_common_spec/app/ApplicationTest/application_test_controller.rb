require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ApplicationTestController < Rho::RhoController
  include BrowserHelper

  # GET /ApplicationTest
  def index
    @applicationtests = ApplicationTest.find(:all)
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
end
