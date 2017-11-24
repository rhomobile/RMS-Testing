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

  def set_default_files_for_auto_run
      config[:files] = []

          # LANGUAGE
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

            #remove failed specs:
            next if file =~ /\/encoding_spec$/
            next if file =~ /\/execution_spec$/
            next if file =~ /\/file_spec$/
            next if file =~ /\/line_spec$/
            next if file =~ /\/yield_spec$/
            next if file =~ /\/define_finalizer_spec$/
            next if file =~ /\/predefined_spec$/

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
          #core << 'encoding'
          #core << 'enumerable'

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
          #core << 'kernel'
          core << 'marshal'
          core << 'matchdata'
          core << 'math'
          #core << 'method'
          #core << 'module'
          core << 'mutex'
          core << 'nil'
          core << 'numeric'
          core << 'object'
          core << 'objectspace'
          core << 'precision'
          core << 'proc'
          #core << 'process' unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'
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
          #core << 'thread'
          core << 'threadgroup'
          core << 'fiber'

          # make core failed specs list :

          failed_specs = [
              "spec/core/array/inspect_spec",
              "spec/core/array/pack/a_spec",
              "spec/core/array/pack/z_spec",
              "spec/core/array/to_s_spec",

              "spec/core/dir/chdir_spec",
              "spec/core/dir/dir_spec",
              "spec/core/dir/delete_spec",
              "spec/core/dir/element_reference_spec",
              "spec/core/dir/entries_spec",
              "spec/core/dir/exist_spec",
              "spec/core/dir/exists_spec",
              "spec/core/dir/getwd_spec",
              "spec/core/dir/glob_spec",
              "spec/core/dir/home_spec",
              "spec/core/dir/mkdir_spec",
              "spec/core/dir/pwd_spec",
              "spec/core/dir/rmdir_spec",
              "spec/core/dir/unlink_spec",

              "spec/core/exception/load_error_spec",
              "spec/core/exception/result_spec",

              "spec/core/file/absolute_path_spec",
              "spec/core/file/atime_spec",
              "spec/core/file/basename_spec",
              "spec/core/file/birthtime_spec",
              "spec/core/file/ctime_spec",
              "spec/core/file/exist_spec",
              "spec/core/file/exists_spec",
              "spec/core/file/expand_path_spec",
              "spec/core/file/ftype_spec",
              "spec/core/file/initialize_spec",
              "spec/core/file/open_spec",
              "spec/core/file/pipe_spec",
              "spec/core/file/readlink_spec",
              "spec/core/file/realdirpath_spec",
              "spec/core/file/realpath_spec",
              "spec/core/file/setuid_spec",
              "spec/core/file/socket_spec",
              "spec/core/file/stat/ftype_spec",
              "spec/core/file/stat/pipe_spec",
              "spec/core/file/stat/writable_spec",
              "spec/core/file/stat/world_readable_spec",
              "spec/core/file/stat/world_writable_spec",
              "spec/core/file/sticky_spec",


              "spec/core/filetest/exist_spec",
              "spec/core/filetest/exists_spec",

              "spec/core/hash/element_set_spec",
              "spec/core/hash/inspect_spec",
              "spec/core/hash/store_spec",
              "spec/core/hash/to_s_spec",

              "spec/core/integer/chr_spec",

              "spec/core/io/close_read_spec",
              "spec/core/io/close_spec",
              "spec/core/io/close_write_spec",
              "spec/core/io/for_fd_spec",
              "spec/core/io/foreach_spec",
              "spec/core/io/gets_spec",
              "spec/core/io/isatty_spec",
              "spec/core/io/new_spec",
              "spec/core/io/open_spec",
              "spec/core/io/output_spec",
              "spec/core/io/popen_spec",
              "spec/core/io/print_spec",
              "spec/core/io/puts_spec",
              "spec/core/io/read_spec",
              "spec/core/io/readbyte_spec",
              "spec/core/io/readlines_spec",
              "spec/core/io/stat_spec",
              "spec/core/io/tty_spec",
              "spec/core/io/write_spec",

              "spec/core/marshal/dump_spec",

              "spec/core/module/alias_method_spec",
              "spec/core/module/ancestors_spec",
              "spec/core/module/append_features_spec",
              "spec/core/module/attr_spec",
              "spec/core/module/attr_accessor_spec",
              "spec/core/module/attr_reader_spec",
              "spec/core/module/attr_writer_spec",
              "spec/core/module/autoload_spec",
              "spec/core/module/case_compare_spec",
              "spec/core/module/class_eval_spec",
              "spec/core/module/class_exec_spec",
              "spec/core/module/class_variable_defined_spec",
              "spec/core/module/class_variable_get_spec",
              "spec/core/module/class_variable_set_spec",
              "spec/core/module/class_variables_spec",
              "spec/core/module/comparison_spec",
              "spec/core/module/constants_spec",
              "spec/core/module/const_defined_spec",
              "spec/core/module/define_method_spec",
              "spec/core/module/eql_spec",
              "spec/core/module/equal_spec",
              "spec/core/module/equal_value_spec",

              "spec/core/module/extend_object_spec",
              "spec/core/module/include_spec",
              "spec/core/module/included_spec",
              "spec/core/module/instance_method_spec",
              "spec/core/module/instance_methods_spec",
              "spec/core/module/module_eval_spec",
              "spec/core/module/name_spec",
              "spec/core/module/nesting_spec",
              "spec/core/module/prepend_features_spec",
              "spec/core/module/prepend_spec",
              "spec/core/module/private_spec",
              "spec/core/module/protected_spec",
              "spec/core/module/public_instance_method_spec",
              "spec/core/module/public_spec",

              "spec/core/objectspace/define_finalizer_spec",

              "spec/core/range/inspect_spec",
              "spec/core/range/to_s_spec",

              "spec/core/regexp/compile_spec",
              "spec/core/regexp/encoding_spec",
              "spec/core/regexp/initialize_spec",
              "spec/core/regexp/new_spec",
              "spec/core/regexp/union_spec",

              "spec/core/string/append_spec",
              "spec/core/string/ascii_only_spec",
              "spec/core/string/center_spec",
              "spec/core/string/chars_spec",
              "spec/core/string/chomp_spec",
              "spec/core/string/chop_spec",
              "spec/core/string/clear_spec",
              "spec/core/string/clone_spec",
              "spec/core/string/concat_spec",
              "spec/core/string/crypt_spec",
              "spec/core/string/delete_spec",
              "spec/core/string/downcase_spec",
              "spec/core/string/dump_spec",
              "spec/core/string/each_char_spec",
              "spec/core/string/each_line_spec",
              "spec/core/string/element_set_spec",
              "spec/core/string/encode_spec",
              "spec/core/string/encoding_spec",
              "spec/core/string/force_encoding_spec",
              "spec/core/string/getbyte_spec",
              "spec/core/string/gsub_spec",
              "spec/core/string/index_spec",
              "spec/core/string/initialize_spec",
              "spec/core/string/insert_spec",
              "spec/core/string/inspect_spec",
              "spec/core/string/length_spec",
              "spec/core/string/lines_spec",
              "spec/core/string/ljust_spec",
              "spec/core/string/lstrip_spec",
              "spec/core/string/modulo_spec",
              "spec/core/string/next_spec",
              "spec/core/string/plus_spec",
              "spec/core/string/replace_spec",
              "spec/core/string/reverse_spec",
              "spec/core/string/rindex_spec",
              "spec/core/string/rjust_spec",
              "spec/core/string/rstrip_spec",
              "spec/core/string/scrub_spec",
              "spec/core/string/setbyte_spec",
              "spec/core/string/size_spec",
              "spec/core/string/slice_spec",
              "spec/core/string/split_spec",
              "spec/core/string/squeeze_spec",
              "spec/core/string/strip_spec",
              "spec/core/string/sub_spec",
              "spec/core/string/succ_spec",
              "spec/core/string/tr_s_spec",
              "spec/core/string/tr_spec",
              "spec/core/string/uminus_spec",
              "spec/core/string/unicode_normalize_spec",
              "spec/core/string/unicode_normalized_spec",
              "spec/core/string/upcase_spec",
              "spec/core/string/uplus_spec",
              "spec/core/string/valid_encoding_spec",

              "spec/core/time/getlocal_spec",
              "spec/core/time/localtime_spec",
              "spec/core/time/new_spec",

              "spec/core/thread/element_set_spec", # crash




              "329465128934ygefkjqhewvfo3487rt9874grkjqwehfv1o87r6tf"
          ]






          core.each do |folder|
            specs =  app_folder + "spec/core/#{folder}/**/*_spec" + RHO_RB_EXT
            Dir.glob(specs) do |file|
              file.gsub!(app_folder,"")

              if RHO_RB_EXT == '.rb'
                file.gsub!(/\.rb/,"")
              else
                file.gsub!(/\.iseq/,"")
              end

              #remove failed specs:
              next if failed_specs.include? file


              config[:files] << file
            end
          end

  end

  def set_default_files
    config[:files] = []

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

    MSpec.enable_feature :encoding

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
