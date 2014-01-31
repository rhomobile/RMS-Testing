require 'mspec'
require 'local_server'

class SpecRunner < MSpecScript
  def initialize
    super
    config[:files] = []
    # turn on exception backtrace
    MSpec.backtrace = true

    config[:files] << "spec/spec_helper"
    # config[:files] << [ "spec/rhom_model_spec",
    #   [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
    #     {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ]
    # ]
    # =>
    # Total: 40
    # Passed: 40
    # Failed: 0

    # Testing for fixed schema / sync
    # config[:files] << ["spec/rhom_object_spec", [{:schema_model => true, :sync_model => true}]]
    # =>
    # Total: 79
    # Passed: 22
    # Failed: 57

    # Testing for fixed schema / no sync
    #config[:files] << ["spec/rhom_object_spec", [{:schema_model => true, :sync_model => false}]]
    # =>
    # Total: 79
    # Passed: 32
    # Failed: 47

    # Testing for property bag / sync
    # config[:files] << ["spec/rhom_object_spec", [{:schema_model => false, :sync_model => true}]]
    # =>
    # Total: 79
    # Passed: 11
    # Failed: 68

    # Testing for property bag / no sync
    # config[:files] << ["spec/rhom_object_spec", [{:schema_model => false, :sync_model => false}]]
    # =>
    # Total: 79
    # Passed: 21
    # Failed: 58

    config[:files] << [ "spec/rhom_object_spec",
        [ {:schema_model=>true, :sync_model=>true},  {:schema_model=>true, :sync_model=>false},
          {:schema_model=>false, :sync_model=>true} , {:schema_model=>false, :sync_model=>false} ] ]
    # =>
    # Total: 316
    # Passed: 86
    # Failed: 230

    # config[:files] << "spec/rhom_spec"
    # =>
    # Total: 8
    # Passed: 7
    # Failed: 1


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
  end
end