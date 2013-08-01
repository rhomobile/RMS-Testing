require 'rho/rhocontroller'
require 'helpers/browser_helper'

class RingtonesController < Rho::RhoController
  include BrowserHelper

  # GET /Ringtones
  def index
    @ringtoneses = Ringtones.find(:all)
    Rho::RingtoneManager.stop
    @ringtones = Rho::RingtoneManager.get_all_ringtones
    @ringtones = [] if @ringtones.nil?
    render :back => '/app'
  end

  # GET /Ringtones/{1}
  def show
    @ringtones = Ringtones.find(@params['id'])
    if @ringtones
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Ringtones/new
  def new
    @ringtones = Ringtones.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Ringtones/{1}/edit
  def edit
    @ringtones = Ringtones.find(@params['id'])
    if @ringtones
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Ringtones/create
  def create
    @ringtones = Ringtones.create(@params['ringtones'])
    redirect :action => :index
  end

  # POST /Ringtones/{1}/update
  def update
    @ringtones = Ringtones.find(@params['id'])
    @ringtones.update_attributes(@params['ringtones']) if @ringtones
    redirect :action => :index
  end

  # POST /Ringtones/{1}/delete
  def delete
    @ringtones = Ringtones.find(@params['id'])
    @ringtones.destroy if @ringtones
    redirect :action => :index  
  end
  
  def play
    puts "Play ringtone"

    $selected = @params['name']
    Rho::RingtoneManager.play @params['file']
    render :action => :playing, :layout => false, :back => url_for( :action => :index )
  end

  def stop
    puts "Stop playing"

    Rho::RingtoneManager.stop
    redirect :action => :index, :back => url_for( :action => :index )
  end
end
