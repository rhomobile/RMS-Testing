require 'rho/rhocontroller'
require 'helpers/browser_helper'

class DatabaseTestController < Rho::RhoController
  include BrowserHelper

  # GET /DatabaseTest
  def index
    @databasetests = DatabaseTest.find(:all)
    render :back => '/app'
  end

  # GET /DatabaseTest/{1}
  def show
    @databasetest = DatabaseTest.find(@params['id'])
    if @databasetest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /DatabaseTest/new
  def new
    @databasetest = DatabaseTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /DatabaseTest/{1}/edit
  def edit
    @databasetest = DatabaseTest.find(@params['id'])
    if @databasetest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /DatabaseTest/create
  def create
    @databasetest = DatabaseTest.create(@params['databasetest'])
    redirect :action => :index
  end

  # POST /DatabaseTest/{1}/update
  def update
    @databasetest = DatabaseTest.find(@params['id'])
    @databasetest.update_attributes(@params['databasetest']) if @databasetest
    redirect :action => :index
  end

  # POST /DatabaseTest/{1}/delete
  def delete
    @databasetest = DatabaseTest.find(@params['id'])
    @databasetest.destroy if @databasetest
    redirect :action => :index  
  end
end
