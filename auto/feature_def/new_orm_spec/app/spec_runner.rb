require 'mspec'
require 'local_server' rescue nil

class SpecRunner < MSpecScript
  def initialize
    super
    config[:files] = []
    # turn on exception backtrace
    MSpec.backtrace = true

    config[:files] << "spec/spec_helper"

    # 1.
    # All pass
    # config[:files] << [ "spec/rhom_model_spec", [{:schema_model=>true}, {:schema_model=>false}] ]

    # All pass
    config[:files] << [ "spec/rhom_model_spec",
      [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
        {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]

    # 2.
    # All pass
    config[:files] << [ "spec/rhom_object_spec", [{:schema_model=>true}, {:schema_model=>false}] ]
    #

    # 2.1 Testing for fixed schema
    #config[:files] << [ "spec/rhom_object_spec", [{:schema_model=>true}] ]
    # 2.2 Testing for property bag
    #config[:files] << [ "spec/rhom_object_spec", [{:schema_model=>false}] ]
    #
    # TODO: BAB: 2 specs fails if :sync_model=>true !!!
    # 2.3 Testing for fixed schema / property bag + sync_model
    # config[:files] << [ "spec/rhom_object_spec",
    #     [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
    #       {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]
    #

    # 3.
    # All pass
    config[:files] << "spec/rhom_spec"

    # 4.
    # TODO: BAB: 4 specs fails for property bag !!!
    # config[:files] << [ "spec/rhom_paginate_spec", [{:schema_model=>true}, {:schema_model=>false}] ]

    # 4.1 Fixed schema only cases
    # All pass
    config[:files] << [ "spec/rhom_paginate_spec", [{:schema_model=>true}] ]


    # 4.2 property bag only cases
    # TODO: BAB: 4 specs fails for property bag !!!
    # config[:files] << [ "spec/rhom_paginate_spec", [{:schema_model => false}] ]

  end

  def run
    results_path = File.join(Rho::RhoApplication.get_base_app_path(), 'orm_spec_results.xml' )
    MSpec.register_files config[:files]

    @@formatter = JUnitRhoLogFormatter.new( results_path )
    @@formatter.register

    @@resulter = JasmineLikeFormatter.new()
    @@resulter.register

    MSpec.process

    unless Rho::System.isRhoSimulator
      if defined? SPEC_LOCAL_SERVER_HOST and defined? SPEC_LOCAL_SERVER_PORT
        postProps = Hash.new
        postProps['url'] = "http://#{SPEC_LOCAL_SERVER_HOST}:#{SPEC_LOCAL_SERVER_PORT}?filename=#{File.basename(results_path)}"
        contents = File.read(results_path)
        postProps['body'] = contents
        res = Rho::Network.post(postProps)
        puts "Post #{File.basename(results_path)} to local server. Status: #{res['status']}"
      end
    end

    Rho::Log.info("***Terminated","APP")

    MSpec.exit_code
  end
end