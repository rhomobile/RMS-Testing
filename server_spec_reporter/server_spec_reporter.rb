require 'webrick'
require 'socket'
require 'net/http'
require 'json'
require 'fileutils'

module WEBrick

  class HTTPRequest
    # Generate HTTP/1.1 100 continue response. See
    # http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-core/18459
    def continue
      if self['expect'] == '100-continue' && @config[:HTTPVersion] >= "1.1"
        @socket.write "HTTP/#{@config[:HTTPVersion]} 100 continue\r\n\r\n"
        @header.delete('expect')
      end
    end
  end

  class HTTPResponse
    alias :orig_setup_header :setup_header
    # Correct termination of streamed HTTP/1.1 responses. See
    # http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-core/18454 and
    # http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-core/18565
    def setup_header
      orig_setup_header
      unless chunked? || @header['content-length']
        @header['connection'] = "close"
        @keep_alive = false
      end
    end

    # Allow streaming of zipfile entry. See
    # http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-core/18460
    def send_body(socket)
      if @body.respond_to?(:read) then send_body_io(socket)
      elsif @body.respond_to?(:call) then send_body_proc(socket)
      else send_body_string(socket)
      end
    end

    # If the response body is a proc, then we invoke it and pass in
    # an object which supports "write" and "<<" methods. This allows
    # arbitary output streaming.
    def send_body_proc(socket)
      if @request_method == "HEAD"
        # do nothing
      elsif chunked?
        @body.call(ChunkedWrapper.new(socket, self))
        _write_data(socket, "0#{CRLF}#{CRLF}")
      else
        size = @header['content-length'].to_i
        @body.call(socket)   # TODO: StreamWrapper which supports offset, size
        @sent_size = size
      end
    end

    class ChunkedWrapper
      def initialize(socket, resp)
        @socket = socket
        @resp = resp
      end
      def write(buf)
        return if buf.empty?
        data = ""
        data << format("%x", buf.size) << CRLF
        data << buf << CRLF
        socket = @socket
        @resp.instance_eval {
          _write_data(socket, data)
          @sent_size += buf.size
        }
      end
      alias :<< :write
    end
  end
end

if RUBY_VERSION < "1.9"
  old_verbose, $VERBOSE = $VERBOSE, nil
  # Increase from default of 4K for efficiency, similar to
  # http://svn.ruby-lang.org/cgi-bin/viewvc.cgi/branches/ruby_1_8/lib/net/protocol.rb?r1=11708&r2=12092
  # In trunk the default is 64K and can be adjusted using :InputBufferSize,
  # :OutputBufferSize
  WEBrick::HTTPRequest::BUFSIZE = 16384
  WEBrick::HTTPResponse::BUFSIZE = 16384
  $VERBOSE = old_verbose
end


def localip
  Socket::getaddrinfo(Socket.gethostname,"echo",Socket::AF_INET)[0][3]
end

host = ARGV && ARGV[0] ? ARGV[0] : localip
port = 8128

$local_server = WEBrick::HTTPServer.new :Port => port, :DocumentRoot => "Documents"

def parse_specs(specs, path, fails)
  specs.each do |item|
    result  = item["r"]

    if result < 0
      fail = {:item => item, :path => path, :name => item["n"]}

      if item["f"]
        details = []
        item["f"].each do |fail|
          if fail["m"]
            details << "Error ##{fail["i"]}: #{fail["m"]}\n"
          end
          if fail["s"]
            details << "Stack:\n====\n#{fail["s"]}\n====\n"
          end
        end

        fail[:details] = details.map{ |e| e.split("\n") }.flatten
      end

      fails << fail
    end
  end
end

def parse_suites(root, path, fails)
  root.each do |item|
    npath = Array.new(path).push(item["name"])
    if item["specs"]
      parse_specs(item["specs"], npath, fails)
    end
    if item["suites"]
      parse_suites(item["suites"], npath, fails)
    end
  end
end

def generate_fail_report(root)
  report = []

  fails = []

  parse_suites(root["suites"], [], fails)

  if !fails.empty?
    report << " Application '#{root["app_name"]}' spec '#{root["spec_path"]}' failure report @ #{root["time"]} #{root["date"]} \n"
    if root["system"]
      report << ' System info : '
      root["system"].each do |k, v|
        report << "   #{k} : #{v}"
      end
      report << ''
    end
    report << " Total specs: #{root["total"]}, failures: #{root["failures"]}, skipped: #{root["not_run"]}\n"

    last_path = []

    fails.group_by{ |el| el[:path] }.each do |k, v|
      full_path = k

      full_path.each_with_index do |item, idx|
        if last_path.size <= idx 
          break
        elsif last_path[idx] != item
          last_path = full_path.take(idx)
          report << " "
          break
        end
      end

      while last_path.length < full_path.length
        last_path << full_path[last_path.length]

        report << "  " * last_path.length + last_path.last
      end

      ident = "  " * (full_path.length + 1)

      v.each do |fail|
        report << ident + 'Spec :' + fail[:name]
        fail[:details].each do |msg|
          report << ident + '  ' + msg
        end
        report << ' '
      end

    end

    report << "\n"
  end

  report.empty? ? nil : report.join("\n")
end

class String
  def safe_file_name
    self.strip.gsub(/[^a-z0-9]+/i,'_').downcase
  end
end

def safe_save(filename, message = nil)
  if !message.nil?
    dir = File.dirname(filename)
    if !File.exists?(dir)
      FileUtils.mkdir_p(dir)
    end
    File.open(filename, 'w') do |f|
      f.write(message);
    end
  end
end

$local_server.mount_proc '/upload_test_log' do |req,res|
  message = req.body

  res.body = "Ok"
  res.status = 200

  suite_name = nil
  app_name = nil

  begin
    json = JSON.parse(message)
    app_name = json["app_name"]
    first_suite = json["suites"].first
    if !first_suite.nil?
      suite_name = first_suite["name"].safe_file_name
    end
  rescue Exception => e
    puts "Exception #{e.inspect}"
  end

  log_path = File.join(File.dirname(__FILE__),'logs')

  if (app_name)
    log_path = File.join(log_path, app_name)
  end

  fname = "#{suite_name}_#{Time.now.to_i.to_s}.txt"

  if !suite_name.nil?
    # disable raw log saving
    # safe_save(File.join(log_path, 'raw', fname), message)
    safe_save(File.join(log_path, 'pretty', fname), JSON.pretty_generate(json))

    fail_report = generate_fail_report(json)

    safe_save(File.join(log_path, fname), fail_report)
  end
end

to_js = [
  '../manual/feature_def/manual_common_spec/public/jasmine/jasmineRunner.js',
  '../auto/feature_def/auto_common_spec/public/jasmine/jasmineRunner.js'
]

to_js.each do |path|
  if File.exists?(path)
    content = File.read(path).gsub(/(?<=network_server)\s*=\s*(.*?);/i," = 'http://#{host}:#{port}/upload_test_log';")
    File.open(path, "w") { |io|
      io.write(content)
    }
  end
end

t1 = Thread.new do
  puts "Starting local test capturing server on #{host}:#{port}"
  $local_server.start
end

trap 'INT' do
  puts "Shutting down server"
  $local_server.shutdown
  puts "shutdown finished"
end

t1.join
