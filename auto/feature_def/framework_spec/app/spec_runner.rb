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

  def set_default_files_for_auto_run_only_rhodes
      config[:files] = []

      app_folder = Rho::RhoFSConnector.get_app_path('app')
      app_folder.gsub!(/\\/, '/')

      failed_specs = [
          "spec/rhomobile/NetHttp_spec"
      ]

      # RHOMOBILE
      specs = app_folder + "spec/rhomobile/*_spec" + RHO_RB_EXT
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
          core << 'encoding'
          core << 'enumerable'

          #has multiple crashes
          core << 'enumerator'

          core << 'env' unless System.get_property('platform') == 'WINDOWS' || System.get_property('platform') == 'WINDOWS_DESKTOP'

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
          core << 'main'
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
          core << 'thread'
          core << 'threadgroup'
          core << 'fiber'

          # make core failed specs list :

          failed_specs = []

          failed_specs_Android = [


              "spec/core/basicobject/basicobject_spec",

              "spec/core/dir/unlink_spec",
              "spec/core/dir/chroot_spec",
              "spec/core/dir/pos_spec",
              "spec/core/dir/seek_spec",
              "spec/core/dir/tell_spec",

              "spec/core/encoding/aliases_spec",
              "spec/core/encoding/compatible_spec",
              "spec/core/encoding/converter/asciicompat_encoding_spec",
              "spec/core/encoding/converter/convert_spec",
              "spec/core/encoding/converter/convpath_spec",
              "spec/core/encoding/converter/destination_encoding_spec",
              "spec/core/encoding/converter/finish_spec",
              "spec/core/encoding/converter/last_error_spec",
              "spec/core/encoding/converter/primitive_convert_spec",
              "spec/core/encoding/converter/primitive_errinfo_spec",
              "spec/core/encoding/converter/putback_spec",
              "spec/core/encoding/converter/replacement_spec",
              "spec/core/encoding/converter/search_convpath_spec",
              "spec/core/encoding/converter/source_encoding_spec",
              "spec/core/encoding/default_external_spec",
              "spec/core/encoding/default_internal_spec",
              "spec/core/encoding/find_spec",
              "spec/core/encoding/inspect_spec",
              "spec/core/encoding/invalid_byte_sequence_error/destination_encoding_name_spec",
              "spec/core/encoding/invalid_byte_sequence_error/destination_encoding_spec",
              "spec/core/encoding/invalid_byte_sequence_error/error_bytes_spec",
              "spec/core/encoding/invalid_byte_sequence_error/incomplete_input_spec",
              "spec/core/encoding/invalid_byte_sequence_error/readagain_bytes_spec",
              "spec/core/encoding/invalid_byte_sequence_error/source_encoding_name_spec",
              "spec/core/encoding/invalid_byte_sequence_error/source_encoding_spec",
              "spec/core/encoding/list_spec",
              "spec/core/encoding/locale_charmap_spec",
              "spec/core/encoding/name_spec",
              "spec/core/encoding/names_spec",
              "spec/core/encoding/to_s_spec",
              "spec/core/encoding/undefined_conversion_error/error_char_spec",
              "spec/core/encoding/undefined_conversion_error/source_encoding_name_spec",
              "spec/core/encoding/undefined_conversion_error/source_encoding_spec",


              "spec/core/env/clear_spec",
              "spec/core/env/delete_if_spec",
              "spec/core/env/each_key_spec",
              "spec/core/env/each_pair_spec",
              "spec/core/env/each_spec",
              "spec/core/env/each_value_spec",
              "spec/core/env/empty_spec",
              "spec/core/env/fetch_spec",
              "spec/core/env/keep_if_spec",
              "spec/core/env/length_spec",
              "spec/core/env/reject_spec",
              "spec/core/env/select_spec",
              "spec/core/env/shift_spec",
              "spec/core/env/size_spec",

              "spec/core/file/flock_spec",
              "spec/core/file/identical_spec",
              "spec/core/file/link_spec",
              "spec/core/file/mtime_spec",
              "spec/core/file/readable_spec",
              "spec/core/file/stat/dev_major_spec",
              "spec/core/file/stat/dev_minor_spec",
              "spec/core/file/stat/executable_spec",
              "spec/core/file/stat/file_spec",
              "spec/core/file/stat/nlink_spec",
              "spec/core/file/stat/owned_spec",
              "spec/core/file/stat/rdev_major_spec",
              "spec/core/file/stat/rdev_minor_spec",
              "spec/core/file/stat/readable_spec",

              "spec/core/filetest/identical_spec",
              "spec/core/filetest/readable_spec",

              "spec/core/io/advise_spec",
              "spec/core/io/binmode_spec",
              "spec/core/io/binread_spec",
              "spec/core/io/binwrite_spec",
              "spec/core/io/bytes_spec",
              "spec/core/io/chars_spec",
              "spec/core/io/close_on_exec_spec",
              "spec/core/io/close_read_spec",
              "spec/core/io/close_spec",
              "spec/core/io/close_write_spec",
              "spec/core/io/closed_spec",
              "spec/core/io/codepoints_spec",
              "spec/core/io/constants_spec",
              "spec/core/io/copy_stream_spec",
              "spec/core/io/dup_spec",
              "spec/core/io/each_byte_spec",
              "spec/core/io/each_char_spec",
              "spec/core/io/each_codepoint_spec",
              "spec/core/io/each_line_spec",
              "spec/core/io/each_spec",
              "spec/core/io/eof_spec",
              "spec/core/io/external_encoding_spec",
              "spec/core/io/fcntl_spec",
              "spec/core/io/fdatasync_spec",
              "spec/core/io/fileno_spec",
              "spec/core/io/flush_spec",
              "spec/core/io/for_fd_spec",
              "spec/core/io/foreach_spec",
              "spec/core/io/fsync_spec",
              "spec/core/io/getbyte_spec",
              "spec/core/io/getc_spec",
              "spec/core/io/gets_spec",
              "spec/core/io/initialize_spec",
              "spec/core/io/inspect_spec",
              "spec/core/io/internal_encoding_spec",
              "spec/core/io/io_spec",
              "spec/core/io/ioctl_spec",
              "spec/core/io/isatty_spec",
              "spec/core/io/lineno_spec",
              "spec/core/io/lines_spec",
              "spec/core/io/new_spec",
              "spec/core/io/open_spec",
              "spec/core/io/output_spec",
              "spec/core/io/pid_spec",
              "spec/core/io/pipe_spec",
              "spec/core/io/popen_spec",
              "spec/core/io/pos_spec",
              "spec/core/io/print_spec",
              "spec/core/io/printf_spec",
              "spec/core/io/putc_spec",
              "spec/core/io/puts_spec",
              "spec/core/io/read_nonblock_spec",
              "spec/core/io/read_spec",
              "spec/core/io/readbyte_spec",
              "spec/core/io/readchar_spec",
              "spec/core/io/readline_spec",
              "spec/core/io/readlines_spec",
              "spec/core/io/readpartial_spec",
              "spec/core/io/reopen_spec",
              "spec/core/io/rewind_spec",
              "spec/core/io/seek_spec",
              "spec/core/io/select_spec",
              "spec/core/io/set_encoding_spec",
              "spec/core/io/stat_spec",
              "spec/core/io/sync_spec",
              "spec/core/io/sysopen_spec",
              "spec/core/io/sysread_spec",
              "spec/core/io/sysseek_spec",
              "spec/core/io/syswrite_spec",
              "spec/core/io/tell_spec",
              "spec/core/io/to_i_spec",
              "spec/core/io/to_io_spec",
              "spec/core/io/try_convert_spec",
              "spec/core/io/tty_spec",
              "spec/core/io/ungetbyte_spec",
              "spec/core/io/ungetc_spec",
              "spec/core/io/write_nonblock_spec",
              "spec/core/io/write_spec",

              "spec/core/math/gamma_spec",
              "spec/core/math/lgamma_spec",

              "spec/core/process/constants_spec",
              "spec/core/process/euid_spec",
              "spec/core/process/setpriority_spec",

              "spec/library/digest/md5/file_spec",
              "spec/library/digest/sha1/file_spec",
              "spec/library/digest/sha256/file_spec",
              "spec/library/digest/sha384/file_spec",
              "spec/library/digest/sha512/file_spec",

              "spec/library/net/ftp/abort_spec",
              "spec/library/net/ftp/acct_spec",
              "spec/library/net/ftp/binary_spec",
              "spec/library/net/ftp/chdir_spec",
              "spec/library/net/ftp/close_spec",
              "spec/library/net/ftp/closed_spec",
              "spec/library/net/ftp/connect_spec",
              "spec/library/net/ftp/debug_mode_spec",
              "spec/library/net/ftp/default_passive_spec",
              "spec/library/net/ftp/delete_spec",
              "spec/library/net/ftp/dir_spec",
              "spec/library/net/ftp/get_spec",
              "spec/library/net/ftp/getbinaryfile_spec",
              "spec/library/net/ftp/getdir_spec",
              "spec/library/net/ftp/gettextfile_spec",
              "spec/library/net/ftp/help_spec",
              "spec/library/net/ftp/initialize_spec",
              "spec/library/net/ftp/last_response_code_spec",
              "spec/library/net/ftp/last_response_spec",
              "spec/library/net/ftp/lastresp_spec",
              "spec/library/net/ftp/list_spec",
              "spec/library/net/ftp/login_spec",
              "spec/library/net/ftp/ls_spec",
              "spec/library/net/ftp/mdtm_spec",
              "spec/library/net/ftp/mkdir_spec",
              "spec/library/net/ftp/mtime_spec",
              "spec/library/net/ftp/nlst_spec",
              "spec/library/net/ftp/noop_spec",
              "spec/library/net/ftp/open_spec",
              "spec/library/net/ftp/passive_spec",
              "spec/library/net/ftp/put_spec",
              "spec/library/net/ftp/putbinaryfile_spec",
              "spec/library/net/ftp/puttextfile_spec",
              "spec/library/net/ftp/pwd_spec",
              "spec/library/net/ftp/quit_spec",
              "spec/library/net/ftp/rename_spec",
              "spec/library/net/ftp/resume_spec",
              "spec/library/net/ftp/retrbinary_spec",
              "spec/library/net/ftp/retrlines_spec",
              "spec/library/net/ftp/return_code_spec",
              "spec/library/net/ftp/rmdir_spec",
              "spec/library/net/ftp/sendcmd_spec",
              "spec/library/net/ftp/set_socket_spec",
              "spec/library/net/ftp/site_spec",
              "spec/library/net/ftp/size_spec",
              "spec/library/net/ftp/status_spec",
              "spec/library/net/ftp/storbinary_spec",
              "spec/library/net/ftp/storlines_spec",
              "spec/library/net/ftp/system_spec",
              "spec/library/net/ftp/voidcmd_spec",
              "spec/library/net/ftp/welcome_spec",
              "spec/library/net/FTPError_spec",
              "spec/library/net/FTPPermError_spec",
              "spec/library/net/FTPProtoError_spec",
              "spec/library/net/FTPReplyError_spec",
              "spec/library/net/FTPTempError_spec",

              "spec/library/stringio/append_spec",
              "spec/library/stringio/binmode_spec",
              "spec/library/stringio/bytes_spec",
              "spec/library/stringio/chars_spec",
              "spec/library/stringio/close_read_spec",
              "spec/library/stringio/close_spec",
              "spec/library/stringio/close_write_spec",
              "spec/library/stringio/closed_read_spec",
              "spec/library/stringio/closed_spec",
              "spec/library/stringio/closed_write_spec",
              "spec/library/stringio/codepoints_spec",
              "spec/library/stringio/each_byte_spec",
              "spec/library/stringio/each_char_spec",
              "spec/library/stringio/each_codepoint_spec",
              "spec/library/stringio/each_line_spec",
              "spec/library/stringio/each_spec",
              "spec/library/stringio/eof_spec",
              "spec/library/stringio/external_encoding_spec",
              "spec/library/stringio/fcntl_spec",
              "spec/library/stringio/fileno_spec",
              "spec/library/stringio/flush_spec",
              "spec/library/stringio/fsync_spec",
              "spec/library/stringio/getbyte_spec",
              "spec/library/stringio/getc_spec",
              "spec/library/stringio/getch_spec",
              "spec/library/stringio/gets_spec",
              "spec/library/stringio/initialize_spec",
              "spec/library/stringio/internal_encoding_spec",
              "spec/library/stringio/isatty_spec",
              "spec/library/stringio/length_spec",
              "spec/library/stringio/lineno_spec",
              "spec/library/stringio/lines_spec",
              "spec/library/stringio/open_spec",
              "spec/library/stringio/path_spec",
              "spec/library/stringio/pid_spec",
              "spec/library/stringio/pos_spec",
              "spec/library/stringio/print_spec",
              "spec/library/stringio/printf_spec",
              "spec/library/stringio/putc_spec",
              "spec/library/stringio/puts_spec",
              "spec/library/stringio/read_nonblock_spec",
              "spec/library/stringio/read_spec",
              "spec/library/stringio/readbyte_spec",
              "spec/library/stringio/readchar_spec",
              "spec/library/stringio/readline_spec",
              "spec/library/stringio/readlines_spec",
              "spec/library/stringio/readpartial_spec",
              "spec/library/stringio/reopen_spec",
              "spec/library/stringio/rewind_spec",
              "spec/library/stringio/seek_spec",
              "spec/library/stringio/set_encoding_spec",
              "spec/library/stringio/size_spec",
              "spec/library/stringio/string_spec",
              "spec/library/stringio/stringio_spec",
              "spec/library/stringio/sync_spec",
              "spec/library/stringio/sysread_spec",
              "spec/library/stringio/syswrite_spec",
              "spec/library/stringio/tell_spec",
              "spec/library/stringio/truncate_spec",
              "spec/library/stringio/tty_spec",
              "spec/library/stringio/ungetbyte_spec",
              "spec/library/stringio/ungetc_spec",
              "spec/library/stringio/write_nonblock_spec",
              "spec/library/stringio/write_spec",



                "fbkjfhsgksdfjhgksdfjhgkjhgdfskAndroid"
          ]

          failed_specs_iOS = [
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


              "spec/core/encoding/compatible_spec",
              "spec/core/encoding/converter/asciicompat_encoding_spec",
              "spec/core/encoding/converter/convert_spec",
              "spec/core/encoding/converter/convpath_spec",
              "spec/core/encoding/converter/destination_encoding_spec",
              "spec/core/encoding/converter/finish_spec",
              "spec/core/encoding/converter/last_error_spec",
              "spec/core/encoding/converter/primitive_convert_spec",
              "spec/core/encoding/converter/primitive_errinfo_spec",
              "spec/core/encoding/converter/putback_spec",
              "spec/core/encoding/converter/replacement_spec",
              "spec/core/encoding/converter/search_convpath_spec",
              "spec/core/encoding/converter/source_encoding_spec",
              "spec/core/encoding/default_external_spec",
              "spec/core/encoding/default_internal_spec",
              "spec/core/encoding/find_spec",
              "spec/core/encoding/inspect_spec",
              "spec/core/encoding/invalid_byte_sequence_error/destination_encoding_name_spec",
              "spec/core/encoding/invalid_byte_sequence_error/destination_encoding_spec",
              "spec/core/encoding/invalid_byte_sequence_error/error_bytes_spec",
              "spec/core/encoding/invalid_byte_sequence_error/incomplete_input_spec",
              "spec/core/encoding/invalid_byte_sequence_error/readagain_bytes_spec",
              "spec/core/encoding/invalid_byte_sequence_error/source_encoding_name_spec",
              "spec/core/encoding/invalid_byte_sequence_error/source_encoding_spec",
              "spec/core/encoding/list_spec",
              "spec/core/encoding/locale_charmap_spec",
              "spec/core/encoding/name_spec",
              "spec/core/encoding/names_spec",
              "spec/core/encoding/to_s_spec",
              "spec/core/encoding/undefined_conversion_error/error_char_spec",
              "spec/core/encoding/undefined_conversion_error/source_encoding_name_spec",
              "spec/core/encoding/undefined_conversion_error/source_encoding_spec",



              "spec/core/enumerator/enum_for_spec", # crash
              "spec/core/enumerator/feed_spec", # crash
              "spec/core/enumerator/lazy/zip_spec", # crash
              "spec/core/enumerator/next_spec", # crash
              "spec/core/enumerator/next_values_spec", # crash
              "spec/core/enumerator/peek_spec", # crash
              "spec/core/enumerator/peek_values_spec", # crash
              "spec/core/enumerator/rewind_spec", # crash
              "spec/core/enumerator/to_enum_spec", # crash


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

              "spec/core/kernel/__dir___spec",
              "spec/core/kernel/autoload_spec",
              "spec/core/kernel/backtick_spec",
              "spec/core/kernel/method_spec",
              "spec/core/kernel/open_spec",
              "spec/core/kernel/p_spec",
              "spec/core/kernel/public_method_spec",
              "spec/core/kernel/require_relative_spec",
              "spec/core/kernel/respond_to_missing_spec",
              "spec/core/kernel/require_spec",
              "spec/core/kernel/spawn_spec",
              "spec/core/kernel/sprintf_spec",
              "spec/core/kernel/String_spec",
              "spec/core/kernel/system_spec",
              "spec/core/kernel/taint_spec",
              "spec/core/kernel/tap_spec",
              "spec/core/kernel/test_spec",
              "spec/core/kernel/trace_var_spec",

              "spec/core/main/include_spec",


              "spec/core/marshal/dump_spec",

              "spec/core/method/call_spec",
              "spec/core/method/element_reference_spec",
              "spec/core/method/eql_spec",
              "spec/core/method/equal_value_spec",
              "spec/core/method/inspect_spec",
              "spec/core/method/name_spec",
              "spec/core/method/owner_spec",
              "spec/core/method/parameters_spec", #crash
              "spec/core/method/receiver_spec",
              "spec/core/method/source_location_spec",
              "spec/core/method/to_s_spec",

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
              "spec/core/module/extended_spec",
              "spec/core/module/freeze_spec",
              "spec/core/module/gt_spec",
              "spec/core/module/gte_spec",
              "spec/core/module/include_spec",
              "spec/core/module/included_spec",
              "spec/core/module/included_modules_spec",
              "spec/core/module/initialize_spec",
              "spec/core/module/instance_method_spec",
              "spec/core/module/instance_methods_spec",
              "spec/core/module/lt_spec",
              "spec/core/module/lte_spec",
              "spec/core/module/method_added_spec",
              "spec/core/module/method_defined_spec",
              "spec/core/module/method_removed_spec",
              "spec/core/module/method_undefined_spec",
              "spec/core/module/module_eval_spec",
              "spec/core/module/module_exec_spec",
              "spec/core/module/module_function_spec",
              "spec/core/module/name_spec",
              "spec/core/module/nesting_spec",
              "spec/core/module/new_spec",
              "spec/core/module/prepend_features_spec",
              "spec/core/module/prepend_spec",
              "spec/core/module/private_class_method_spec",
              "spec/core/module/private_instance_methods_spec",
              "spec/core/module/private_method_defined_spec",
              "spec/core/module/private_spec",
              "spec/core/module/protected_instance_methods_spec",
              "spec/core/module/protected_method_defined_spec",
              "spec/core/module/protected_spec",
              "spec/core/module/public_class_method_spec",
              "spec/core/module/public_instance_method_spec",
              "spec/core/module/public_instance_methods_spec",
              "spec/core/module/public_method_defined_spec",
              "spec/core/module/public_spec",
              "spec/core/module/remove_class_variable_spec",
              "spec/core/module/remove_method_spec",
              "spec/core/module/to_s_spec",
              "spec/core/module/undef_method_spec",

              "spec/core/objectspace/define_finalizer_spec",

              "spec/core/process/exec_spec",
              "spec/core/process/fork_spec",
              "spec/core/process/gid_spec",
              "spec/core/process/groups_spec",
              "spec/core/process/initgroups_spec",
              "spec/core/process/kill_spec",
              "spec/core/process/set_proctitle_spec",
              "spec/core/process/uid_spec",
              "spec/core/process/wait_spec",
              "spec/core/process/waitpid_spec",

              "spec/core/range/inspect_spec",
              "spec/core/range/to_s_spec",

              "spec/core/regexp/compile_spec",
              "spec/core/regexp/encoding_spec",
              "spec/core/regexp/initialize_spec",
              "spec/core/regexp/new_spec",
              "spec/core/regexp/union_spec",

              "spec/core/string/center_spec",
              "spec/core/string/chars_spec",
              "spec/core/string/chomp_spec",
              "spec/core/string/chop_spec",
              "spec/core/string/clear_spec",
              "spec/core/string/clone_spec",
              "spec/core/string/crypt_spec",
              "spec/core/string/delete_spec",
              "spec/core/string/downcase_spec",
              "spec/core/string/each_char_spec",
              "spec/core/string/each_line_spec",
              "spec/core/string/element_set_spec",
              "spec/core/string/encode_spec",
              "spec/core/string/encoding_spec",
              "spec/core/string/force_encoding_spec",
              "spec/core/string/gsub_spec",
              "spec/core/string/index_spec",
              "spec/core/string/initialize_spec",
              "spec/core/string/insert_spec",
              "spec/core/string/length_spec",
              "spec/core/string/lines_spec",
              "spec/core/string/ljust_spec",
              "spec/core/string/lstrip_spec",
              "spec/core/string/modulo_spec",
              "spec/core/string/next_spec",
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

              "spec/core/thread/element_set_spec", # crash
              "spec/core/thread/key_spec", #crash
              "spec/core/thread/keys_spec", #crash
              "spec/core/thread/backtrace/location/absolute_path_spec",
              "spec/core/thread/backtrace/location/base_label_spec",
              "spec/core/thread/backtrace/location/label_spec",
              "spec/core/thread/backtrace/location/path_spec",


              "spec/library/net/ftp/chdir_spec",
              "spec/library/zlib/gzipreader/each_byte_spec",
              "spec/library/zlib/gzipreader/each_line_spec",
              "spec/library/zlib/gzipreader/each_spec",

              "spec/library/complex/math/acos_spec",
              "spec/library/complex/math/acosh_spec",
              "spec/library/complex/math/asin_spec",
              "spec/library/complex/math/asinh_spec",
              "spec/library/complex/math/atan2_spec",
              "spec/library/complex/math/atan_spec",
              "spec/library/complex/math/atanh_spec",
              "spec/library/complex/math/cos_spec",
              "spec/library/complex/math/cosh_spec",
              "spec/library/complex/math/exp_spec",
              "spec/library/complex/math/log10_spec",
              "spec/library/complex/math/log_spec",
              "spec/library/complex/math/sin_spec",
              "spec/library/complex/math/sinh_spec",
              "spec/library/complex/math/sqrt_spec",
              "spec/library/complex/math/tan_spec",
              "spec/library/complex/math/tanh_spec",
              "spec/library/complex/numeric/im_spec",

              "spec/library/coverage/peek_result_spec",
              "spec/library/coverage/start_spec",
              "spec/library/coverage/result_spec",

              "spec/library/date/constants_spec",
              "spec/library/date/infinity_spec",
              "spec/library/date/minus_month_spec",
              "spec/library/date/strftime_spec",
              "spec/library/date/strptime_spec",
              "spec/library/date/valid_jd_spec",

              "spec/library/datetime/hour_spec",
              "spec/library/datetime/min_spec",
              "spec/library/datetime/minute_spec",
              "spec/library/datetime/new_spec",
              "spec/library/datetime/parse_spec",
              "spec/library/datetime/sec_spec",
              "spec/library/datetime/second_spec",
              "spec/library/datetime/strftime_spec",

              "spec/library/delegate/delegate_class/instance_method_spec",
              "spec/library/delegate/delegate_class/instance_methods_spec",
              "spec/library/delegate/delegate_class/protected_instance_methods_spec",
              "spec/library/delegate/delegator/compare_spec",
              "spec/library/delegate/delegator/eql_spec",
              "spec/library/delegate/delegator/frozen_spec",
              "spec/library/delegate/delegator/hash_spec",
              "spec/library/delegate/delegator/marshal_spec",
              "spec/library/delegate/delegator/method_spec",
              "spec/library/delegate/delegator/methods_spec",
              "spec/library/delegate/delegator/not_equal_spec",
              "spec/library/delegate/delegator/not_spec",
              "spec/library/delegate/delegator/protected_methods_spec",
              "spec/library/delegate/delegator/public_methods_spec",
              "spec/library/delegate/delegator/untaint_spec",

              "spec/library/digest/bubblebabble_spec",

              "spec/library/erb/new_spec",
              "spec/library/erb/util/h_spec",
              "spec/library/erb/util/html_escape_spec",

              "spec/library/expect/expect_spec",

              "spec/library/find/find_spec",
              "spec/library/find/prune_spec",

              "spec/library/ipaddr/hton_spec",
              "spec/library/ipaddr/ipv4_conversion_spec",
              "spec/library/ipaddr/new_spec",
              "spec/library/ipaddr/operator_spec",
              "spec/library/ipaddr/reverse_spec",
              "spec/library/ipaddr/to_s_spec",


              "spec/library/csv/basicwriter/close_on_terminate_spec",
              "spec/library/csv/basicwriter/initialize_spec",
              "spec/library/csv/basicwriter/terminate_spec",
              "spec/library/csv/cell/data_spec",
              "spec/library/csv/cell/initialize_spec",
              "spec/library/csv/foreach_spec",
              "spec/library/csv/generate_line_spec",
              "spec/library/csv/generate_row_spec",
              "spec/library/csv/generate_spec",
              "spec/library/csv/iobuf/close_spec",
              "spec/library/csv/iobuf/initialize_spec",
              "spec/library/csv/iobuf/read_spec",
              "spec/library/csv/iobuf/terminate_spec",
              "spec/library/csv/ioreader/close_on_terminate_spec",
              "spec/library/csv/ioreader/get_row_spec",
              "spec/library/csv/ioreader/initialize_spec",
              "spec/library/csv/ioreader/terminate_spec",
              "spec/library/csv/open_spec",
              "spec/library/csv/parse_spec",
              "spec/library/csv/read_spec",
              "spec/library/csv/readlines_spec",
              "spec/library/csv/streambuf/add_buf_spec",
              "spec/library/csv/streambuf/buf_size_spec",
              "spec/library/csv/streambuf/drop_spec",
              "spec/library/csv/streambuf/element_reference_spec",
              "spec/library/csv/streambuf/get_spec",
              "spec/library/csv/streambuf/idx_is_eos_spec",
              "spec/library/csv/streambuf/initialize_spec",
              "spec/library/csv/streambuf/is_eos_spec",
              "spec/library/csv/streambuf/read_spec",
              "spec/library/csv/streambuf/rel_buf_spec",
              "spec/library/csv/streambuf/terminate_spec",
              "spec/library/csv/stringreader/get_row_spec",
              "spec/library/csv/stringreader/initialize_spec",
              "spec/library/csv/writer/add_row_spec",
              "spec/library/csv/writer/append_spec",
              "spec/library/csv/writer/close_spec",
              "spec/library/csv/writer/create_spec",
              "spec/library/csv/writer/generate_spec",
              "spec/library/csv/writer/initialize_spec",
              "spec/library/csv/writer/terminate_spec",

              "spec/library/drb/config_spec",
              "spec/library/drb/current_server_spec",
              "spec/library/drb/drbobject/__drbref_spec",
              "spec/library/drb/drbobject/__drburi_spec",
              "spec/library/drb/drbobject/_dump_spec",
              "spec/library/drb/drbobject/_load_spec",
              "spec/library/drb/drbobject/eql_spec",
              "spec/library/drb/drbobject/equal_value_spec",
              "spec/library/drb/drbobject/hash_spec",
              "spec/library/drb/drbobject/method_missing_spec",
              "spec/library/drb/drbobject/new_spec",
              "spec/library/drb/drbobject/new_with_spec",
              "spec/library/drb/drbobject/new_with_uri_spec",
              "spec/library/drb/drbobject/prepare_backtrace_spec",
              "spec/library/drb/drbobject/pretty_print_cycle_spec",
              "spec/library/drb/drbobject/pretty_print_spec",
              "spec/library/drb/drbobject/respond_to_spec",
              "spec/library/drb/drbobject/with_friend_spec",
              "spec/library/drb/fetch_server_spec",
              "spec/library/drb/front_spec",
              "spec/library/drb/here_spec",
              "spec/library/drb/install_acl_spec",
              "spec/library/drb/install_id_conv_spec",
              "spec/library/drb/primary_server_spec",
              "spec/library/drb/regist_server_spec",
              "spec/library/drb/remove_server_spec",
              "spec/library/drb/start_service_spec",
              "spec/library/drb/stop_service_spec",
              "spec/library/drb/thread_spec",
              "spec/library/drb/to_id_spec",
              "spec/library/drb/to_obj_spec",
              "spec/library/drb/uri_spec",

              "spec/library/etc/endgrent_spec",
              "spec/library/etc/endpwent_spec",
              "spec/library/etc/getgrent_spec",
              "spec/library/etc/getgrgid_spec",
              "spec/library/etc/getgrnam_spec",
              "spec/library/etc/getlogin_spec",
              "spec/library/etc/getpwent_spec",
              "spec/library/etc/getpwnam_spec",
              "spec/library/etc/getpwuid_spec",
              "spec/library/etc/group_spec",
              "spec/library/etc/passwd_spec",
              "spec/library/etc/setgrent_spec",
              "spec/library/etc/setpwent_spec",
              "spec/library/etc/struct_group_spec",
              "spec/library/etc/struct_passwd_spec",

              "spec/library/getoptlong/each_option_spec",
              "spec/library/getoptlong/each_spec",
              "spec/library/getoptlong/error_message_spec",
              "spec/library/getoptlong/get_option_spec",
              "spec/library/getoptlong/get_spec",
              "spec/library/getoptlong/initialize_spec",
              "spec/library/getoptlong/ordering_spec",
              "spec/library/getoptlong/set_options_spec",
              "spec/library/getoptlong/terminate_spec",
              "spec/library/getoptlong/terminated_spec",

              "spec/library/logger/application/level_spec",
              "spec/library/logger/application/log_spec",
              "spec/library/logger/application/new_spec",
              "spec/library/logger/application/set_log_spec",
              "spec/library/logger/application/start_spec",
              "spec/library/logger/device/close_spec",
              "spec/library/logger/device/new_spec",
              "spec/library/logger/device/write_spec",
              "spec/library/logger/logger/add_spec",
              "spec/library/logger/logger/close_spec",
              "spec/library/logger/logger/datetime_format_spec",
              "spec/library/logger/logger/debug_spec",
              "spec/library/logger/logger/error_spec",
              "spec/library/logger/logger/fatal_spec",
              "spec/library/logger/logger/info_spec",
              "spec/library/logger/logger/new_spec",
              "spec/library/logger/logger/unknown_spec",
              "spec/library/logger/logger/warn_spec",
              "spec/library/logger/severity_spec",



              "spec/library/mathn/bignum/exponent_spec",
              "spec/library/mathn/complex/Complex_spec",
              "spec/library/mathn/fixnum/exponent_spec",
              "spec/library/mathn/float/exponent_spec",
              "spec/library/mathn/integer/from_prime_division_spec",
              "spec/library/mathn/integer/prime_division_spec",
              "spec/library/mathn/math/rsqrt_spec",
              "spec/library/mathn/math/rsqrt_spec",
              "spec/library/mathn/math/sqrt_spec",
              "spec/library/mathn/rational/inspect_spec",
              "spec/library/mathn/rational/Rational_spec",

              "spec/library/matrix/build_spec",
              "spec/library/matrix/clone_spec",
              "spec/library/matrix/coerce_spec",
              "spec/library/matrix/collect_spec",
              "spec/library/matrix/column_size_spec",
              "spec/library/matrix/column_spec",
              "spec/library/matrix/column_vector_spec",
              "spec/library/matrix/column_vectors_spec",
              "spec/library/matrix/columns_spec",
              "spec/library/matrix/conj_spec",
              "spec/library/matrix/conjugate_spec",
              "spec/library/matrix/constructor_spec",
              "spec/library/matrix/det_spec",
              "spec/library/matrix/determinant_spec",
              "spec/library/matrix/diagonal_spec",
              "spec/library/matrix/divide_spec",
              "spec/library/matrix/each_spec",
              "spec/library/matrix/each_with_index_spec",
              "spec/library/matrix/eigenvalue_decomposition/eigenvalue_matrix_spec",
              "spec/library/matrix/eigenvalue_decomposition/eigenvalues_spec",
              "spec/library/matrix/eigenvalue_decomposition/eigenvector_matrix_spec",
              "spec/library/matrix/eigenvalue_decomposition/eigenvectors_spec",
              "spec/library/matrix/eigenvalue_decomposition/initialize_spec",
              "spec/library/matrix/eigenvalue_decomposition/to_a_spec",
              "spec/library/matrix/element_reference_spec",
              "spec/library/matrix/empty_spec",
              "spec/library/matrix/eql_spec",
              "spec/library/matrix/equal_value_spec",
              "spec/library/matrix/exponent_spec",
              "spec/library/matrix/find_index_spec",
              "spec/library/matrix/hash_spec",
              "spec/library/matrix/hermitian_spec",
              "spec/library/matrix/I_spec",
              "spec/library/matrix/identity_spec",
              "spec/library/matrix/imag_spec",
              "spec/library/matrix/imaginary_spec",
              "spec/library/matrix/inspect_spec",
              "spec/library/matrix/inv_spec",
              "spec/library/matrix/inverse_from_spec",
              "spec/library/matrix/inverse_spec",
              "spec/library/matrix/lower_triangular_spec",
              "spec/library/matrix/lup_decomposition/determinant_spec",
              "spec/library/matrix/lup_decomposition/initialize_spec",
              "spec/library/matrix/lup_decomposition/l_spec",
              "spec/library/matrix/lup_decomposition/p_spec",
              "spec/library/matrix/lup_decomposition/solve_spec",
              "spec/library/matrix/lup_decomposition/to_a_spec",
              "spec/library/matrix/lup_decomposition/u_spec",
              "spec/library/matrix/map_spec",
              "spec/library/matrix/minor_spec",
              "spec/library/matrix/minus_spec",
              "spec/library/matrix/multiply_spec",
              "spec/library/matrix/new_spec",
              "spec/library/matrix/normal_spec",
              "spec/library/matrix/orthogonal_spec",
              "spec/library/matrix/permutation_spec",
              "spec/library/matrix/plus_spec",
              "spec/library/matrix/rank_spec",
              "spec/library/matrix/real_spec",
              "spec/library/matrix/rect_spec",
              "spec/library/matrix/rectangular_spec",
              "spec/library/matrix/regular_spec",
              "spec/library/matrix/round_spec",
              "spec/library/matrix/row_size_spec",
              "spec/library/matrix/row_spec",
              "spec/library/matrix/row_vector_spec",
              "spec/library/matrix/row_vectors_spec",
              "spec/library/matrix/rows_spec",
              "spec/library/matrix/scalar/divide_spec",
              "spec/library/matrix/scalar/exponent_spec",
              "spec/library/matrix/scalar/Fail_spec",
              "spec/library/matrix/scalar/included_spec",
              "spec/library/matrix/scalar/initialize_spec",
              "spec/library/matrix/scalar/minus_spec",
              "spec/library/matrix/scalar/multiply_spec",
              "spec/library/matrix/scalar/plus_spec",
              "spec/library/matrix/scalar/Raise_spec",
              "spec/library/matrix/scalar_spec",
              "spec/library/matrix/singular_spec",
              "spec/library/matrix/square_spec",
              "spec/library/matrix/symmetric_spec",
              "spec/library/matrix/t_spec",
              "spec/library/matrix/to_a_spec",
              "spec/library/matrix/to_s_spec",
              "spec/library/matrix/tr_spec",
              "spec/library/matrix/trace_spec",
              "spec/library/matrix/transpose_spec",
              "spec/library/matrix/unit_spec",
              "spec/library/matrix/unitary_spec",
              "spec/library/matrix/upper_triangular_spec",
              "spec/library/matrix/vector/cross_product_spec",
              "spec/library/matrix/vector/each2_spec",
              "spec/library/matrix/vector/eql_spec",
              "spec/library/matrix/vector/inner_product_spec",
              "spec/library/matrix/vector/normalize_spec",
              "spec/library/matrix/zero_spec",

              "spec/library/net/http/http/active_spec",
              "spec/library/net/http/http/address_spec",
              "spec/library/net/http/http/close_on_empty_response_spec",
              "spec/library/net/http/http/copy_spec",
              "spec/library/net/http/http/default_port_spec",
              "spec/library/net/http/http/delete_spec",
              "spec/library/net/http/http/finish_spec",
              "spec/library/net/http/http/get2_spec",
              "spec/library/net/http/http/get_print_spec",
              "spec/library/net/http/http/get_response_spec",
              "spec/library/net/http/http/get_spec",
              "spec/library/net/http/http/head2_spec",
              "spec/library/net/http/http/head_spec",
              "spec/library/net/http/http/http_default_port_spec",
              "spec/library/net/http/http/https_default_port_spec",
              "spec/library/net/http/http/initialize_spec",
              "spec/library/net/http/http/inspect_spec",
              "spec/library/net/http/http/is_version_1_1_spec",
              "spec/library/net/http/http/is_version_1_2_spec",
              "spec/library/net/http/http/lock_spec",
              "spec/library/net/http/http/mkcol_spec",
              "spec/library/net/http/http/move_spec",
              "spec/library/net/http/http/new_spec",
              "spec/library/net/http/http/newobj_spec",
              "spec/library/net/http/http/open_timeout_spec",
              "spec/library/net/http/http/options_spec",
              "spec/library/net/http/http/port_spec",
              "spec/library/net/http/http/post2_spec",
              "spec/library/net/http/http/post_form_spec",
              "spec/library/net/http/http/post_spec",
              "spec/library/net/http/http/propfind_spec",
              "spec/library/net/http/http/proppatch_spec",
              "spec/library/net/http/http/proxy_address_spec",
              "spec/library/net/http/http/proxy_class_spec",
              "spec/library/net/http/http/proxy_pass_spec",
              "spec/library/net/http/http/proxy_port_spec",
              "spec/library/net/http/http/Proxy_spec",
              "spec/library/net/http/http/proxy_user_spec",
              "spec/library/net/http/http/put2_spec",
              "spec/library/net/http/http/put_spec",
              "spec/library/net/http/http/read_timeout_spec",
              "spec/library/net/http/http/request_get_spec",
              "spec/library/net/http/http/request_head_spec",
              "spec/library/net/http/http/request_post_spec",
              "spec/library/net/http/http/request_put_spec",
              "spec/library/net/http/http/request_spec",
              "spec/library/net/http/http/request_types_spec",
              "spec/library/net/http/http/send_request_spec",
              "spec/library/net/http/http/set_debug_output_spec",
              "spec/library/net/http/http/socket_type_spec",
              "spec/library/net/http/http/start_spec",
              "spec/library/net/http/http/started_spec",
              "spec/library/net/http/http/trace_spec",
              "spec/library/net/http/http/unlock_spec",
              "spec/library/net/http/http/use_ssl_spec",
              "spec/library/net/http/http/version_1_1_spec",
              "spec/library/net/http/http/version_1_2_spec",

              "spec/library/observer/add_observer_spec",
              "spec/library/observer/count_observers_spec",
              "spec/library/observer/delete_observer_spec",
              "spec/library/observer/delete_observers_spec",
              "spec/library/observer/notify_observers_spec",

              "spec/library/open3/capture2_spec",
              "spec/library/open3/capture2e_spec",
              "spec/library/open3/capture3_spec",
              "spec/library/open3/pipeline_r_spec",
              "spec/library/open3/pipeline_rw_spec",
              "spec/library/open3/pipeline_spec",
              "spec/library/open3/pipeline_start_spec",
              "spec/library/open3/pipeline_w_spec",
              "spec/library/open3/popen2_spec",
              "spec/library/open3/popen2e_spec",
              "spec/library/open3/popen3_spec",

              "spec/library/pathname/absolute_spec",
              "spec/library/pathname/equal_value_spec",
              "spec/library/pathname/hash_spec",
              "spec/library/pathname/join_spec",
              "spec/library/pathname/new_spec",
              "spec/library/pathname/parent_spec",
              "spec/library/pathname/realdirpath_spec",
              "spec/library/pathname/realpath_spec",
              "spec/library/pathname/relative_path_from_spec",
              "spec/library/pathname/relative_spec",
              "spec/library/pathname/root_spec",
              "spec/library/pathname/sub_spec",

              "spec/library/prime/each_spec",
              "spec/library/prime/instance_spec",
              "spec/library/prime/int_from_prime_division_spec",
              "spec/library/prime/integer/each_prime_spec",
              "spec/library/prime/integer/from_prime_division_spec",
              "spec/library/prime/integer/prime_division_spec",
              "spec/library/prime/integer/prime_spec",
              "spec/library/prime/next_spec",
              "spec/library/prime/prime_division_spec",
              "spec/library/prime/prime_spec",
              "spec/library/prime/succ_spec",

              "spec/library/readline/basic_quote_characters_spec",
              "spec/library/readline/basic_word_break_characters_spec",
              "spec/library/readline/completer_quote_characters_spec",
              "spec/library/readline/completer_word_break_characters_spec",
              "spec/library/readline/completion_append_character_spec",
              "spec/library/readline/completion_case_fold_spec",
              "spec/library/readline/completion_proc_spec",
              "spec/library/readline/constants_spec",
              "spec/library/readline/emacs_editing_mode_spec",
              "spec/library/readline/filename_quote_characters_spec",
              "spec/library/readline/history/append_spec",
              "spec/library/readline/history/delete_at_spec",
              "spec/library/readline/history/each_spec",
              "spec/library/readline/history/element_reference_spec",
              "spec/library/readline/history/element_set_spec",
              "spec/library/readline/history/empty_spec",
              "spec/library/readline/history/history_spec",
              "spec/library/readline/history/length_spec",
              "spec/library/readline/history/pop_spec",
              "spec/library/readline/history/push_spec",
              "spec/library/readline/history/shift_spec",
              "spec/library/readline/history/size_spec",
              "spec/library/readline/history/to_s_spec",
              "spec/library/readline/readline_spec",
              "spec/library/readline/vi_editing_mode_spec",


              "spec/library/resolv/get_address_spec",
              "spec/library/resolv/get_addresses_spec",
              "spec/library/resolv/get_name_spec",
              "spec/library/resolv/get_names_spec",

              "spec/library/rexml/text/inspect_spec",
              "spec/library/rexml/text/new_spec",

              "spec/library/scanf/io/block_scanf_spec",
              "spec/library/scanf/io/scanf_spec",
              "spec/library/scanf/string/block_scanf_spec",
              "spec/library/scanf/string/scanf_spec",

              "spec/library/securerandom/base64_spec",
              "spec/library/securerandom/hex_spec",
              "spec/library/securerandom/random_bytes_spec",
              "spec/library/securerandom/random_number_spec",

              "spec/library/shellwords/shellwords_spec",

              "spec/library/socket/addrinfo/afamily_spec",
              "spec/library/socket/addrinfo/bind_spec",
              "spec/library/socket/addrinfo/canonname_spec",
              "spec/library/socket/addrinfo/initialize_spec",
              "spec/library/socket/addrinfo/inspect_sockaddr_spec",
              "spec/library/socket/addrinfo/ip_address_spec",
              "spec/library/socket/addrinfo/ip_port_spec",
              "spec/library/socket/addrinfo/ip_spec",
              "spec/library/socket/addrinfo/ip_unpack_spec",
              "spec/library/socket/addrinfo/ipv4_loopback_spec",
              "spec/library/socket/addrinfo/ipv4_multicast_spec",
              "spec/library/socket/addrinfo/ipv4_private_spec",
              "spec/library/socket/addrinfo/ipv4_spec",
              "spec/library/socket/addrinfo/ipv6_loopback_spec",
              "spec/library/socket/addrinfo/ipv6_multicast_spec",
              "spec/library/socket/addrinfo/ipv6_spec",
              "spec/library/socket/addrinfo/pfamily_spec",
              "spec/library/socket/addrinfo/protocol_spec",
              "spec/library/socket/addrinfo/socktype_spec",
              "spec/library/socket/addrinfo/tcp_spec",
              "spec/library/socket/addrinfo/to_s_spec",
              "spec/library/socket/addrinfo/to_sockaddr_spec",
              "spec/library/socket/addrinfo/udp_spec",
              "spec/library/socket/addrinfo/unix_path_spec",
              "spec/library/socket/addrinfo/unix_spec",
              "spec/library/socket/basicsocket/close_read_spec",
              "spec/library/socket/basicsocket/close_write_spec",
              "spec/library/socket/basicsocket/do_not_reverse_lookup_spec",
              "spec/library/socket/basicsocket/for_fd_spec",
              "spec/library/socket/basicsocket/getpeername_spec",
              "spec/library/socket/basicsocket/getsockname_spec",
              "spec/library/socket/basicsocket/getsockopt_spec",
              "spec/library/socket/basicsocket/ioctl_spec",
              "spec/library/socket/basicsocket/recv_nonblock_spec",
              "spec/library/socket/basicsocket/recv_spec",
              "spec/library/socket/basicsocket/send_spec",
              "spec/library/socket/basicsocket/setsockopt_spec",
              "spec/library/socket/basicsocket/shutdown_spec",
              "spec/library/socket/constants/constants_spec",
              "spec/library/socket/ipsocket/addr_spec",
              "spec/library/socket/ipsocket/getaddress_spec",
              "spec/library/socket/ipsocket/peeraddr_spec",
              "spec/library/socket/ipsocket/recvfrom_spec",
              "spec/library/socket/option/bool_spec",
              "spec/library/socket/option/inspect_spec",
              "spec/library/socket/option/int_spec",
              "spec/library/socket/option/linger_spec",
              "spec/library/socket/option/new_spec",
              "spec/library/socket/socket/accept_nonblock_spec",
              "spec/library/socket/socket/accept_spec",
              "spec/library/socket/socket/bind_spec",
              "spec/library/socket/socket/connect_nonblock_spec",
              "spec/library/socket/socket/connect_spec",
              "spec/library/socket/socket/for_fd_spec",
              "spec/library/socket/socket/getaddrinfo_spec",
              "spec/library/socket/socket/gethostbyaddr_spec",
              "spec/library/socket/socket/gethostbyname_spec",
              "spec/library/socket/socket/gethostname_spec",
              "spec/library/socket/socket/getnameinfo_spec",
              "spec/library/socket/socket/getservbyname_spec",
              "spec/library/socket/socket/listen_spec",
              "spec/library/socket/socket/new_spec",
              "spec/library/socket/socket/pack_sockaddr_in_spec",
              "spec/library/socket/socket/pack_sockaddr_un_spec",
              "spec/library/socket/socket/pair_spec",
              "spec/library/socket/socket/recvfrom_nonblock_spec",
              "spec/library/socket/socket/recvfrom_spec",
              "spec/library/socket/socket/sockaddr_in_spec",
              "spec/library/socket/socket/sockaddr_un_spec",
              "spec/library/socket/socket/socket_spec",
              "spec/library/socket/socket/socketpair_spec",
              "spec/library/socket/socket/sysaccept_spec",
              "spec/library/socket/socket/unpack_sockaddr_in_spec",
              "spec/library/socket/socket/unpack_sockaddr_un_spec",
              "spec/library/socket/tcpserver/accept_nonblock_spec",
              "spec/library/socket/tcpserver/accept_spec",
              "spec/library/socket/tcpserver/gets_spec",
              "spec/library/socket/tcpserver/listen_spec",
              "spec/library/socket/tcpserver/new_spec",
              "spec/library/socket/tcpserver/output_spec",
              "spec/library/socket/tcpserver/readpartial_spec",
              "spec/library/socket/tcpserver/sysaccept_spec",
              "spec/library/socket/tcpsocket/gethostbyname_spec",
              "spec/library/socket/tcpsocket/new_spec",
              "spec/library/socket/tcpsocket/open_spec",
              "spec/library/socket/tcpsocket/partially_closable_spec",
              "spec/library/socket/tcpsocket/recv_nonblock_spec",
              "spec/library/socket/tcpsocket/setsockopt_spec",
              "spec/library/socket/udpsocket/bind_spec",
              "spec/library/socket/udpsocket/connect_spec",
              "spec/library/socket/udpsocket/new_spec",
              "spec/library/socket/udpsocket/open_spec",
              "spec/library/socket/udpsocket/recvfrom_nonblock_spec",
              "spec/library/socket/udpsocket/send_spec",
              "spec/library/socket/unixserver/accept_nonblock_spec",
              "spec/library/socket/unixserver/accept_spec",
              "spec/library/socket/unixserver/for_fd_spec",
              "spec/library/socket/unixserver/new_spec",
              "spec/library/socket/unixserver/open_spec",
              "spec/library/socket/unixsocket/addr_spec",
              "spec/library/socket/unixsocket/inspect_spec",
              "spec/library/socket/unixsocket/new_spec",
              "spec/library/socket/unixsocket/open_spec",
              "spec/library/socket/unixsocket/pair_spec",
              "spec/library/socket/unixsocket/partially_closable_spec",
              "spec/library/socket/unixsocket/path_spec",
              "spec/library/socket/unixsocket/peeraddr_spec",
              "spec/library/socket/unixsocket/recv_io_spec",
              "spec/library/socket/unixsocket/recvfrom_spec",
              "spec/library/socket/unixsocket/send_io_spec",

              "spec/library/stringio/external_encoding_spec",
              "spec/library/stringio/getch_spec",
              "spec/library/stringio/initialize_spec",
              "spec/library/stringio/internal_encoding_spec",
              "spec/library/stringio/open_spec",
              "spec/library/stringio/read_nonblock_spec",
              "spec/library/stringio/read_spec",
              "spec/library/stringio/reopen_spec",
              "spec/library/stringio/set_encoding_spec",
              "spec/library/stringio/sysread_spec",

              "spec/library/syslog/alert_spec",
              "spec/library/syslog/close_spec",
              "spec/library/syslog/constants_spec",
              "spec/library/syslog/crit_spec",
              "spec/library/syslog/debug_spec",
              "spec/library/syslog/emerg_spec",
              "spec/library/syslog/err_spec",
              "spec/library/syslog/facility_spec",
              "spec/library/syslog/ident_spec",
              "spec/library/syslog/info_spec",
              "spec/library/syslog/inspect_spec",
              "spec/library/syslog/instance_spec",
              "spec/library/syslog/log_spec",
              "spec/library/syslog/mask_spec",
              "spec/library/syslog/notice_spec",
              "spec/library/syslog/open_spec",
              "spec/library/syslog/opened_spec",
              "spec/library/syslog/options_spec",
              "spec/library/syslog/reopen_spec",
              "spec/library/syslog/warning_spec",

              "spec/library/tempfile/_close_spec",
              "spec/library/tempfile/callback_spec",
              "spec/library/tempfile/close_spec",
              "spec/library/tempfile/delete_spec",
              "spec/library/tempfile/initialize_spec",
              "spec/library/tempfile/length_spec",
              "spec/library/tempfile/open_spec",
              "spec/library/tempfile/path_spec",
              "spec/library/tempfile/size_spec",
              "spec/library/tempfile/unlink_spec",

              "spec/library/time/to_date_spec",

              "spec/library/thread/queue/close_spec",
              "spec/library/thread/queue/closed_spec",

              "spec/library/thread/sizedqueue/append_spec",
              "spec/library/thread/sizedqueue/clear_spec",
              "spec/library/thread/sizedqueue/close_spec",
              "spec/library/thread/sizedqueue/closed_spec",
              "spec/library/thread/sizedqueue/deq_spec",
              "spec/library/thread/sizedqueue/empty_spec",
              "spec/library/thread/sizedqueue/enq_spec",
              "spec/library/thread/sizedqueue/length_spec",
              "spec/library/thread/sizedqueue/max_spec",
              "spec/library/thread/sizedqueue/new_spec",
              "spec/library/thread/sizedqueue/num_waiting_spec",
              "spec/library/thread/sizedqueue/pop_spec",
              "spec/library/thread/sizedqueue/push_spec",
              "spec/library/thread/sizedqueue/shift_spec",
              "spec/library/thread/sizedqueue/size_spec",

              "spec/library/tmpdir/dir/mktmpdir_spec",


              "spec/library/weakref/__getobj___spec",
              "spec/library/weakref/send_spec",
              "spec/library/weakref/weakref_alive_spec",

              "spec/library/yaml/add_builtin_type_spec",
              "spec/library/yaml/add_domain_type_spec",
              "spec/library/yaml/add_private_type_spec",
              "spec/library/yaml/add_ruby_type_spec",
              "spec/library/yaml/detect_implicit_spec",
              "spec/library/yaml/dump_spec",
              "spec/library/yaml/dump_stream_spec",
              "spec/library/yaml/each_node_spec",
              "spec/library/yaml/emitter_spec",
              "spec/library/yaml/generic_parser_spec",
              "spec/library/yaml/load_documents_spec",
              "spec/library/yaml/load_file_spec",
              "spec/library/yaml/load_spec",
              "spec/library/yaml/load_stream_spec",
              "spec/library/yaml/object_maker_spec",
              "spec/library/yaml/parse_documents_spec",
              "spec/library/yaml/parse_file_spec",
              "spec/library/yaml/parse_spec",
              "spec/library/yaml/parser_spec",
              "spec/library/yaml/quick_emit_spec",
              "spec/library/yaml/read_type_class_spec",
              "spec/library/yaml/tagurize_spec",
              "spec/library/yaml/to_yaml_spec",
              "spec/library/yaml/transfer_spec",
              "spec/library/yaml/try_implicit_spec",

              "spec/library/uri/join_spec",
              "spec/library/uri/merge_spec",
              "spec/library/uri/parse_spec",
              "spec/library/uri/parser/join_spec",
              "spec/library/uri/route_from_spec",
              "spec/library/uri/route_to_spec",
              "spec/library/uri/uri_spec",

              "spec/library/zlib/inflate/append_spec",
              "spec/library/zlib/inflate/inflate_spec",

              "spec/rhomobile/NetHttp_spec",


              "last_329465128934ygefkjqhewvfo3487rt9874grkjqwehfv1o87r6tf"
          ]

          if Rho::System.platform == Rho::System::PLATFORM_IOS
              failed_specs = failed_specs + failed_specs_iOS
          end

          if Rho::System.platform == Rho::System::PLATFORM_ANDROID
              failed_specs = failed_specs_Android + failed_specs_iOS
          end


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
            #remove failed specs:
            next if failed_specs.include? file

            config[:files] << file
          end

          # RHOMOBILE
          if Rho::System.platform == Rho::System::PLATFORM_ANDROID
              config[:files] = []
          end

          specs = app_folder + "spec/rhomobile/*_spec" + RHO_RB_EXT
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
