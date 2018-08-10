require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class ApplicationTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper

  def getRhodesGemVersion
    render :string => `gem list rhodes | grep rhodes`[/(?<=\().*?(?=\))/]
  end


end
