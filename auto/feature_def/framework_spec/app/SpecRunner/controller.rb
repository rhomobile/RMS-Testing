require 'rho/rhocontroller'
require 'spec_runner'
#require 'pathname'

class SpecRunnerController < Rho::RhoController

  #GET /SpecRunner
  def index
    @msg = 'MSpec version: '+MSpec::VERSION
    @code = 0
    render
  end

  def run_specs

  end

  def run_all_specs
      puts "$$$ SpecRunner.run_all_specs() START"

      GC.enable()
      @runner = SpecRunner.new
      @runner.set_default_files_for_auto_run
      @code = @runner.run
      @exc_count = MSpec.exc_count
      @not_supported = MSpec.not_supported_count
      @count = MSpec.count
      locations = MSpec.exc_locations


      total = @count.to_s
      passed = (@count - @exc_count).to_s
      failed = @exc_count.to_s
      not_supported = @not_supported.to_s

      puts "***Total:  " + total
      puts "***Passed: " + passed
      puts "***Failed: " + failed
      puts "***Not supported by Rhodes: " + not_supported

      result = {}
      result['total'] = total
      result['passed'] = passed
      result['failed'] = failed
      result['locations'] = {}
      result['not_supported'] = not_supported


      @response["headers"]["Content-Type"] = "application/json"

      locations.each do |key,infos|
        infos_array = []

        infos.each do |info|
          modified_info = {}
          info.each do |k,v|
            if v.is_a?(String)
              modified_info[k] = v.scrub
            else
              modified_info[k] = v
            end
          end

          infos_array << modified_info
        end
        result['locations'][key] = infos_array
      end
      puts "***Terminated"

      puts "$$$ SpecRunner.run_all_specs() FINISH"


      render(string: result.to_json)
  end

  def run_selected_specs
    GC.enable()
    @runner = SpecRunner.new

    files = []
    @params['specs'].each do |f|
      next if !Rho::RhoFile.isFile(f)
      files << File.join(File.dirname(f), File.basename(f, '.*'))
    end

#    @runner.set_files( files )
    @code = @runner.run files
    @exc_count = MSpec.exc_count
    @count = MSpec.count

    total = @count.to_s
    passed = (@count - @exc_count).to_s
    failed = @exc_count.to_s
    locations = MSpec.exc_locations

    puts "***Total:  " + total
    puts "***Passed: " + passed
    puts "***Failed: " + failed

    result = {}
    result['total'] = total
    result['passed'] = passed
    result['failed'] = failed
    result['locations'] = {}
    result['not_supported'] = MSpec.not_supported_count

    @response["headers"]["Content-Type"] = "application/json"

    locations.each do |key,infos|
      infos_array = []

      infos.each do |info|
        modified_info = {}
        info.each do |k,v|
          if v.is_a?(String)
            modified_info[k] = v.scrub
          else
            modified_info[k] = v
          end
        end

        infos_array << modified_info
      end
      result['locations'][key] = infos_array
    end

    render(string: result.to_json)
  end
=begin
  def expand_children( hval )
    n = {}
    hval.each do |k,v|
     if k==:children
       n[:children] = []
       hval[:children].each do |k,v|
         n[:children] << expand_children(v)
       end
     else
      n[k] = v
     end
    end
    n
  end
=end

  def process_node(aNode)
=begin
    aNode[:children] = []

    nodehash = {}
    nodehash[:children] = {}

    pathNode = Pathname.new(aNode)

    Dir.glob( File.join(aNode,"**/*_spec.#{RHO_RB_EXT}") ) do |f|
     pathFile = Pathname.new(f)
     relpath = pathFile.relative_path_from( pathNode )
     pathParts = relpath.each_filename.to_a

     node = nodehash
     pathParts[0..-2].each do |part|
       node[:children][part] = { text: part, path: '', :children => {} } unless node[:children][part]
       node = node[:children][part]
     end

     node[:children][pathParts[-1]] = {text: pathParts[-1], path: path, icon: 'jstree-icon jstree-file'}
    end
=end

    aNode[:children] = []
    filenames = Rho::RhoFile.listDir(aNode[:path])
    filenames.shift(2)
    filenames.each { |each|
      path = Rho::RhoFile.join(aNode[:path], each)
      if Rho::RhoFile.isDir(path)
        if each != 'fixtures'
          folder_node = {text: each, path: path}
          process_node(folder_node)
          aNode[:children] << folder_node if (folder_node[:children].length>0)
        end
      else
        f = each
        re = /_spec#{RHO_RB_EXT}$/
        if f.match(re)
          aNode[:children] << {text: each, path: path, icon: 'jstree-icon jstree-file'}
        end
      end
    }

    aNode[:children].sort! { |a,b|
      la = (a[:children] and a[:children].length>0)?0:1
      lb = (b[:children] and b[:children].length>0)?0:1

      [ la, a[:text] ] <=> [ lb, b[:text] ]
    }
  end

  def get_nodes
    data = [
        {text: 'core', path: Rho::RhoFile.join(Rho::Application.appBundleFolder, 'spec/core')},
        {text: 'language', path: Rho::RhoFile.join(Rho::Application.appBundleFolder, 'spec/language')},
        {text: 'library', path: Rho::RhoFile.join(Rho::Application.appBundleFolder, 'spec/library')},
        {text: 'rhomobile', path: Rho::RhoFile.join(Rho::Application.appBundleFolder, 'spec/rhomobile')}
    ]
    data.each { |each| process_node(each) }

    @response['headers']['Content-Type'] = 'application/json'
    render(string: data.to_json)
  end

  def do_eval
    code = @params['code']
    result = {}
    begin
      result[:result] = eval(code)
    rescue Exception => e
      result[:error] = e.to_s
    end

    puts ">>>>>EVAL RESULT: #{result}"
    @response['headers']['Content-Type'] = 'application/json'
    render(string: result.to_json)
  end

end
