require 'mspec'
require 'local_server'

class SpecRunner < MSpecScript
  def initialize
    super
    config[:files] = []
    # turn on exception backtrace
    MSpec.backtrace = true

    # config[:files] << [ "spec/rhom_object_spec",
    #     [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
    #       {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]

    config[:files] << "spec/spec_helper"
    config[:files] << "spec/rhom_spec"
    config[:files] << [ "spec/rhom_model_spec",
      [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
        {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ]
    ]

    config[:files] << [ "spec/rhom_object_spec",
        [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
          {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]

  end

  def run
    results_path = File.join(Rho::RhoApplication.get_base_app_path(), 'orm_spec_results.xml' )
    MSpec.register_files config[:files]
    @@formatter = JUnitFormatter.new(results_path)
    @@formatter.register
    MSpec.process

    unless Rho::System.isRhoSimulator
      postProps = Hash.new
      postProps['url'] = "http://#{SPEC_LOCAL_SERVER_HOST}:#{SPEC_LOCAL_SERVER_PORT}?filename=#{File.basename(results_path)}"
      contents = File.read(results_path)
      postProps['body'] = contents
      res = Rho::Network.post(postProps)
      puts "Post #{File.basename(results_path)} to local server. Status: #{res['status']}"
    end

    MSpec.exit_code
    System.exit
  end
end