#require 'mspec'

require 'mspec/matchers'
require 'mspec/expectations'
require 'mspec/mocks'
require 'mspec/runner'
require 'mspec/guards'
require 'mspec/helpers'

require 'mspec/utils/script'
require 'mspec/version'

# If the implementation on which the specs are run cannot
# load pp from the standard library, add a pp.rb file that
# defines the #pretty_inspect method on Object or Kernel.
begin
  require 'pp'
rescue LoadError
  module Kernel
    def pretty_inspect
      inspect
    end
  end
end


require 'spec/spec_helper'

class SpecRunner < MSpecScript
  def initialize
    super
    config[:files] = []
    
    # turn on exception backtrace
#    MSpec.backtrace = true

    #MSpec.guard   

  end

  def set_default_files
    #LANGUAGE

    app_folder = Rho::RhoFSConnector.get_app_path('app')
    app_folder.gsub!(/\\/, '/')

    specs =  app_folder + "spec/language/**/*_spec" + RHO_RB_EXT
    
    Dir.glob(specs) do |file|
      file.gsub!(app_folder,"")
      if RHO_RB_EXT == '.rb'
        file.gsub!(/\.rb/,"")
      else
        file.gsub!(/\.iseq/,"")
      end

      
      if ( System.get_property('platform') == 'WINDOWS' ) || ( System.get_property('platform') == 'WINDOWS_DESKTOP' )
        next if file =~ /\/execution_spec$/           
      end
      
      config[:files] << file
 
   end

    # CORE
    core = []

    core << 'argf' unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
    core << 'array'
    core << 'basicobject'    
    core << 'bignum'    
    core << 'binding'
    core << 'builtin_constants'    
    core << 'class'
    core << 'comparable'
    core << 'complex'
    core << 'continuation'
    core << 'dir'
    core << 'encoding'    
    core << 'enumerable'   
    #has multiple crashes
    #core << 'enumerator'   
    #core << 'env' unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
    core << 'exception'
    core << 'false'
    core << 'file'
    core << 'filetest'
    core << 'fixnum'        
    core << 'float'
    core << 'gc'
    core << 'hash'
    core << 'integer'
    core << 'io'
    core << 'kernel'
    core << 'marshal'
    core << 'matchdata'    
    core << 'math'
    core << 'method'
    core << 'module'
    core << 'mutex'
    core << 'nil'
    core << 'numeric'
    core << 'object'
    core << 'objectspace'
    core << 'precision'
    core << 'proc'
    core << 'process' unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
    core << 'random'    
    core << 'range'
    core << 'rational'
    core << 'regexp'
    core << 'signal'  unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
    core << 'string'
    core << 'struct'
    core << 'symbol'
    core << 'systemexit'
    core << 'time'
    core << 'true'
    core << 'unboundmethod'
    
#    core << 'thread'

    core << 'threadgroup'
    core << 'fiber'

    core.each do |folder|
      specs =  app_folder + "spec/core/#{folder}/**/*_spec" + RHO_RB_EXT
      Dir.glob(specs) do |file|
        file.gsub!(app_folder,"")
        
        if RHO_RB_EXT == '.rb'
          file.gsub!(/\.rb/,"")
        else
          file.gsub!(/\.iseq/,"")
        end

 
        config[:files] << file
      end
    end


    # LIBRARIES
    specs = app_folder + "spec/library/**/*_spec" + RHO_RB_EXT
    Dir.glob(specs) do |file|
      #next if file =~ /sha1/      
    
      file.gsub!(app_folder,"")
      if RHO_RB_EXT == '.rb'
        file.gsub!(/\.rb/,"")
      else
        file.gsub!(/\.iseq/,"")
      end

      config[:files] << file
    end
    
    # RHOMOBILE
    specs = app_folder + "spec/rhomobile/*_spec" + RHO_RB_EXT
    Dir.glob(specs) do |file|
      file.gsub!(app_folder,"")
      if RHO_RB_EXT == '.rb'
        file.gsub!(/\.rb/,"")
      else
        file.gsub!(/\.iseq/,"")
      end
      config[:files] << file
    end

  end

  def run( files = nil )

    toRun = (files or config[:files])

    puts "MSpecRunner.run: #{toRun}"

    MSpec.register_files toRun

#    file_name = File.join(Rho::RhoApplication.get_base_app_path(), 'framework_spec_results.xml' )

#    @@formatter = JUnitRhoLogFormatter.new( file_name )
#    @@formatter.register

#    @@resulter = JasmineLikeFormatter.new()
#    @@resulter.register

    MSpec.process

    # wait for complete output
#    sleep(10)

    MSpec.exit_code

#    Rho::Log.info("***Terminated","APP")
#    System.exit
  end
end
