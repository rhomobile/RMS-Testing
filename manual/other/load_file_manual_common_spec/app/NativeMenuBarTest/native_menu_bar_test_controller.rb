require 'rho/rhocontroller'
require 'helpers/browser_helper'

class NativeMenuBarTestController < Rho::RhoController
  include BrowserHelper

  # GET /NativeMenuBarTest
  def index
    @nativemenubartests = NativeMenuBarTest.find(:all)
    render :back => '/app'
  end

  # GET /NativeMenuBarTest/{1}
  def show
    @nativemenubartest = NativeMenuBarTest.find(@params['id'])
    if @nativemenubartest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /NativeMenuBarTest/new
  def new
    @nativemenubartest = NativeMenuBarTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /NativeMenuBarTest/{1}/edit
  def edit
    @nativemenubartest = NativeMenuBarTest.find(@params['id'])
    if @nativemenubartest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /NativeMenuBarTest/create
  def create
    @nativemenubartest = NativeMenuBarTest.create(@params['nativemenubartest'])
    redirect :action => :index
  end

  # POST /NativeMenuBarTest/{1}/update
  def update
    @nativemenubartest = NativeMenuBarTest.find(@params['id'])
    @nativemenubartest.update_attributes(@params['nativemenubartest']) if @nativemenubartest
    redirect :action => :index
  end

  # POST /NativeMenuBarTest/{1}/delete
  def delete
    @nativemenubartest = NativeMenuBarTest.find(@params['id'])
    @nativemenubartest.destroy if @nativemenubartest
    redirect :action => :index  
  end
end
