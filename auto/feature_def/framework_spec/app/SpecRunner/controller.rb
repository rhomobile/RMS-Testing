require 'rho/rhocontroller'
require 'spec_runner'

class SpecRunnerController < Rho::RhoController

  #GET /SpecRunner
  def index
    @msg = 'MSpec version: '+MSpec::VERSION
    @code = 0
    render
  end

  def run_specs
    GC.enable()
    @runner = SpecRunner.new
    @runner.set_default_files
    @code = @runner.run
    @exc_count = MSpec.exc_count
    @count = MSpec.count

    total = @count.to_s
    passed = (@count - @exc_count).to_s
    failed = @exc_count.to_s

    puts "***Total:  " + total
    puts "***Passed: " + passed
    puts "***Failed: " + failed

    render(string: "{ \"total\":\"#{total}\", \"passed\":\"#{passed}\", \"failed\":\"#{failed}\" }")
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
    result['locations'] = locations

    @response["headers"]["Content-Type"] = "application/json"
    render(string: result.to_json)
  end

  def process_node(aNode)
    aNode[:children] = []
    filenames = Rho::RhoFile.listDir(aNode[:path])
    filenames.shift(2)
    filenames.each { |each|
      path = Rho::RhoFile.join(aNode[:path], each)
      if Rho::RhoFile.isDir(path)
        if each != 'fixtures'
          folder_node = {text: each, path: path}
          process_node(folder_node)
          aNode[:children] << folder_node
        end
      else
        f = each
        re = /_spec\.(?:rb|iseq)$/
        if f.match(re)
          aNode[:children] << {text: each, path: path, icon: 'jstree-icon jstree-file'}
        end
      end
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

end