require 'rho/rhocontroller'
require 'spec_runner'

class SpecRunnerController < Rho::RhoController

  #GET /SpecRunner
  def index
    GC.enable()
  
    @msg = 'MSpec version: '+MSpec::VERSION
    @runner = SpecRunner.new
    @code = @runner.run
    @exc_count = MSpec.exc_count
    @count = MSpec.count

    puts "***Total:  " + @count.to_s
    puts "***Passed: " + (@count - @exc_count).to_s
    puts "***Failed: " + @exc_count.to_s
    #Process.exit
    render
  end
end