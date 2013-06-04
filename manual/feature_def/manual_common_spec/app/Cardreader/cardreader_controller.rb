require 'rho/rhocontroller'
require 'helpers/browser_helper'

class CardreaderController < Rho::RhoController
  include BrowserHelper

  # GET /Cardreader
  def index
    render :back => '/app'
  end

end
