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
    config[:files] << [ "spec/rhom_model_spec", [{:schema_model=>true}, {:schema_model=>false}] ]
    #  => Total: 20  Passed: 20  Failed: 0
    #
    #config[:files] << [ "spec/rhom_model_spec",
    #   [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
    #     {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]
    #  => Total: 40 Passed: 40 Failed: 0

    # 2.
    config[:files] << [ "spec/rhom_object_spec", [{:schema_model=>true}, {:schema_model=>false}] ]
    # => Total: 156  Passed: 122  Failed: 34
    #
    # 2.1 Testing for fixed schema
    #config[:files] << [ "spec/rhom_object_spec", [{:schema_model=>true}] ]
    # => Total: 78  Passed: 77  Failed: 1
    # 2.2 Testing for property bag
    #config[:files] << [ "spec/rhom_object_spec", [{:schema_model=>false}] ]
    # => Total: 78  Passed: 45  Failed: 33
    #
    # config[:files] << [ "spec/rhom_object_spec",
    #     [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
    #       {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]
    # => Total: 312 Passed: 244 Failed: 68

    # 3.
    config[:files] << "spec/rhom_spec"
    # Total: 10 Passed: 10 Failed: 0

    # 4.
    # config[:files] << [ "spec/rhom_paginate_spec", , [{:schema_model=>true}, {:schema_model=>false}] ]
    # Total: 20 Passed: 12 Failed: 8
    #
    # 4.1 Fixed schema only cases
    config[:files] << [ "spec/rhom_paginate_spec", [{:schema_model=>true}] ]

  end

  def run
    results_path = File.join(Rho::RhoApplication.get_base_app_path(), 'orm_spec_results.xml' )
    MSpec.register_files config[:files]
    @@formatter = JUnitFormatter.new(results_path)
    @@formatter.register
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

    MSpec.exit_code
  end
end