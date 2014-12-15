require 'yaml'

unless File.exists? "build.yml"
  puts "Cannot find build.yml"
  exit 1
end

class OrmSpecDecorator
  def before_spec
    @server, addr, port = Jake.run_local_server
    # TODO:
    File.open(File.join($app_path, 'public', 'app', 'local_server.js'), 'w') do |f|
      f.puts "var SPEC_LOCAL_SERVER_HOST = '#{addr}';"
      f.puts "var SPEC_LOCAL_SERVER_PORT = #{port};"
    end
    if File.exists?(File.join($app_path, 'server.rb'))
      $local_server = @server
      require File.join($app_path, 'server.rb')
    end
  end

  def after_spec
    @server.shutdown
  end
end

$app_config = YAML::load_file("build.yml")
$app_path = File.expand_path(File.dirname(__FILE__))
$app_spec_decorator = OrmSpecDecorator.new

if ENV["RHO_HOME"].nil?
  if $app_config["sdk"]
    rakefilepath = "#{$app_config["sdk"]}/Rakefile"
  else
    begin
      rakefilepath = `get-rhodes-info --rhodes-path`.chomp
      rakefilepath  = File.join(rakefilepath, "Rakefile")
    rescue
      rakefilepath  = ""
    end
  end
else
  rakefilepath = "#{ENV["RHO_HOME"]}/Rakefile"
end

unless File.exists? rakefilepath
  puts "\nCannot find your Rhodes gem or source path: #{rakefilepath}"
  puts "\nIf you have the sdk on your path or have installed the gem this"
  puts "can be resolved by running 'set-rhodes-sdk'"
  puts "\nYou can also set this manually by modifying your build.yml or"
  puts "setting the environment variable RHO_HOME"
  exit 1
end

load rakefilepath

