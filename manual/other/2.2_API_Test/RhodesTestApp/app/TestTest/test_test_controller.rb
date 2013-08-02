require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'time'


class TestTestController < Rho::RhoController
  include BrowserHelper

  # GET /TestTest
  def index
    @testtests = TestTest.find(:all)
    render :back => '/app'
  end

  def testdate

      #puts "enum_callback : #{@params}"
      #@params = [{:a => "b",:c => "d", :d => "e"},{:f => "g", :h => "k", :l => "m"}]
    puts "enum_callback : #{@params}"
  end

end
