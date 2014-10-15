require 'mspec'

RUN_RUBY_CONTAINERS_SPEC = true #false

RUN_RUBY_EXTENSION_SPEC = true #false

RUN_COREAPI_SPEC = true #false

RUN_ORM_SPEC = true #false

RUN_EXTENDED_API_SPEC = true #false

class SpecRunner < MSpecScript

  def initialize
    super
    config[:files] = []

    # turn on exception backtrace
    MSpec.backtrace = true

    if RUN_RUBY_CONTAINERS_SPEC
        config[:files] << "spec/string/end_with_spec"
        config[:files] << "spec/string/start_with_spec"
        config[:files] << "spec/string/replace_spec"
        config[:files] << "spec/string/split_spec"
        config[:files] << "spec/string/strip_spec"
        config[:files] << "spec/string/rstrip_spec"
        config[:files] << "spec/string/lstrip_spec"
        config[:files] << "spec/string/slice_spec"
        config[:files] << "spec/array/pack_spec"
    end

    if RUN_RUBY_EXTENSION_SPEC
        config[:files] << "spec/json_spec"
        config[:files] << "spec/xml_spec"
        config[:files] << "spec/date_spec"
        config[:files] << "spec/bsearch_spec"
        config[:files] << "spec/crypt_spec"
    end

    if RUN_COREAPI_SPEC
        config[:files] << "spec/log_spec"

        config[:files] << "spec/rho_spec"

        config[:files] << "spec/rhofile_spec"
        config[:files] << "spec/file_commonapi_spec"

        config[:files] << "spec/network_spec"
        config[:files] << "spec/asynchttp_spec"

        config[:files] << "spec/rho_controller_spec"

        config[:files] << "spec/serialPort_spec"
    end

    if RUN_ORM_SPEC

        modelz = []

         modelz << {:schema_model=>true, :sync_model=>true}
         modelz << {:schema_model=>true, :sync_model=>false}
         modelz << {:schema_model=>false, :sync_model=>true}
         modelz << {:schema_model=>false, :sync_model=>false}

        config[:files] << [ "spec/rhom_object_spec", modelz ]
    end

    if RUN_EXTENDED_API_SPEC
        if System.get_property('platform') != 'WP8'
          config[:files] << "spec/contacts_spec" unless System.get_property('platform') == 'WINDOWS_DESKTOP'

          # Disable events specs on Android because emulator doesn't contain Calendar provider
          config[:files] << "spec/events_spec"  unless System.get_property('platform') == 'WINDOWS_DESKTOP' or (System.get_property('platform') == 'ANDROID' and Rho::System.isEmulator )

          config[:files] << "spec/barcode_spec" unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
          config[:files] << "spec/mapview_spec"  unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
        end

        config[:files] << "spec/bundle_update_spec" if !Rho::System.isRhoSimulator && (System.get_property('platform') == 'APPLE' || System.get_property('platform') == 'ANDROID' || System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP')

        config[:files] << "spec/nativebar_spec" if System.get_property('platform') != 'Blackberry' && System.get_property('platform') != 'WP8'
        config[:files] << "spec/navbar_spec" if System.get_property('platform') == 'APPLE' || System.get_property('platform') == 'ANDROID'

        config[:files] << "spec/xruby_spec" if defined? RHO_ME

        # if !(System.get_property('platform') == 'Blackberry' && (System::get_property('os_version') =~ /^6\.0/)) && System.get_property('platform') != 'WP8'
        #    config[:files] << "spec/uri_spec"
        # end
        #if !defined?( RHO_ME )
=begin
        config[:files] << "spec/database_spec" #unless System.get_property('platform') == 'WINDOWS' && System.get_property('is_emulator')
=end
        #end
    end
  end

  def run
    MSpec.register_files config[:files]

    file_name = File.join(Rho::RhoApplication.get_base_app_path(), 'phone_spec_results.xml' )

    @@formatter = JUnitRhoLogFormatter.new( file_name )
    @@formatter.register

    @@resulter = JasmineLikeFormatter.new()
    @@resulter.register

    MSpec.process

    # wait for complete output
    sleep(10)

    MSpec.exit_code

    Rho::Log.info("***Terminated","APP")
    System.exit
  end
end
