#!/usr/bin/env ruby


require 'webrick'
require 'webrick/https'
require 'socket'
require 'openssl'
require 'net/http'
require 'rexml/document'
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
      socket.flush
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






#puts "argv : #{ARGV}"
def localip
    orig, Socket.do_not_reverse_lookup = Socket.do_not_reverse_lookup, true  # turn off reverse DNS resolution temporarily
    UDPSocket.open do |s|
        s.connect '174.142.8.58', 1
        s.addr.last
    end
    ensure
    Socket.do_not_reverse_lookup = orig
end

def public_ipv4
  Socket.ip_address_list.select{|intf| intf.ipv4? and !intf.ipv4_loopback? and !intf.ipv4_multicast?}.map{|ipv| ipv.ip_address}.uniq
end

def modify_iOS_Application_plist_file(serverUrl, serverPort)
  plist_file = 'Documents/TestApp.plist'
  ipa_url = 'http://' + serverUrl + ':' + serverPort.to_s() + '/TestApp.ipa'
  doc =  REXML::Document.new(File.new(plist_file))
  REXML::XPath.match(doc, '//string')[1].text = ipa_url
  File.open(plist_file, 'w') do |data| data << doc end
end

host = ARGV && ARGV[0] ? ARGV[0] : localip
hosts = public_ipv4.push(host).uniq
port = 8081
securePort = 8082
securePortWithClientAuth = 8083
webSocketPort = 8084


cert = OpenSSL::X509::Certificate.new File.read 'ca.crt'
pkey = OpenSSL::PKey::RSA.new File.read 'ca.key'

$local_server = WEBrick::HTTPServer.new :Port => port, :DocumentRoot => "Documents"
$secure_server = WEBrick::HTTPServer.new(:Port => securePort,
                 :DocumentRoot => "Documents",
                                 :SSLEnable => true,
                                 :SSLCertificate => cert,
                                 :SSLPrivateKey => pkey,
                                 :SSLVerifyClient => OpenSSL::SSL::VERIFY_NONE
                                 )

cert2 = OpenSSL::X509::Certificate.new File.read 'fd_testing.cert'
pkey2 = OpenSSL::PKey::RSA.new File.read 'fd_testing.key'

$secure_server_with_client_auth = WEBrick::HTTPServer.new(:Port => securePortWithClientAuth,
                                         :SSLEnable => true,
                                         :SSLCertificate => cert2,
                                         :SSLPrivateKey => pkey2,
                                         :SSLVerifyClient => OpenSSL::SSL::VERIFY_PEER | OpenSSL::SSL::VERIFY_FAIL_IF_NO_PEER_CERT,
                                         :SSLCACertificateFile => File.join( File.dirname(__FILE__), 'client.crt' ),
                                         :DocumentRoot => "Documents"
                                         )


config = { :Realm => 'specs' }
pfile = 'my_password_file'
FileUtils.rm pfile if File.exists?(pfile)
htpasswd = WEBrick::HTTPAuth::Htpasswd.new 'my_password_file'
htpasswd.auth_type = WEBrick::HTTPAuth::DigestAuth
htpasswd.set_passwd config[:Realm], 'specuser', 'specpassword'
htpasswd.flush
config[:UserDB] = htpasswd
digest_auth = WEBrick::HTTPAuth::DigestAuth.new config

$local_server.mount_proc '/ping_fcm' do |req,res|
    fcm_api_key = ENV['FCM_API_KEY']

    device = req.query['device']
    message = req.query['message']

    url = 'https://fcm.googleapis.com/fcm/send'.freeze
    uri = URI.parse(url)
    http = Net::HTTP.new( uri.host, uri.port )
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Post.new(uri.path)
    request['Authorization'] = "key=#{fcm_api_key}"
    request['Content-Type'] = 'application/json'
    request.body = { 'data': { 'message': message }, 'to': device }.to_json
    response = http.request(request)
end


$local_server.mount_proc '/digest_auth_get' do |req,res|
  digest_auth.authenticate req, res
  res.body = "OK"
  res.content_length = res.body.length
  res.status = 200
end

$local_server.mount_proc '/get_session' do |req,res|
  require 'securerandom'
  session = SecureRandom.base64(64)
  cookie = WEBrick::Cookie.new('session', session)
  res.cookies.push cookie
  res.status = 200

  res["Access-Control-Allow-Origin"] = req["Origin"]
  res["Access-Control-Allow-Credentials"] = 'true'  
end

$local_server.mount_proc '/get_session_with_exposed_cookies' do |req,res|
  require 'securerandom'
  session = SecureRandom.base64(64)
  cookie = WEBrick::Cookie.new('session', session)
  res.cookies.push cookie
  res.status = 200

  res["Access-Control-Allow-Origin"] = req["Origin"]
  res["Access-Control-Allow-Credentials"] = 'true'  
  res["Access-Control-Expose-Headers"] = "Set-Cookie"
end

$local_server.mount_proc '/get_session_with_x_session' do |req,res|
  require 'securerandom'
  session = SecureRandom.base64(64)
  res.status = 200

  res["Access-Control-Allow-Origin"] = req["Origin"]
  res["Access-Control-Allow-Credentials"] = 'true'  
  res["Access-Control-Expose-Headers"] = "X-Session"
  res["X-Session"] = "session=#{session}"
end

$local_server.mount_proc '/return_session' do |req,res|
  req.cookies.each { |c|
    res.body = c.value if c.name=='session'
  }
  res.status = 200

  res["Access-Control-Allow-Origin"] = req["Origin"]
  res["Access-Control-Allow-Credentials"] = 'true'
end

$local_server.mount_proc '/slow_get' do |req,res|

  to = 2
  if req.query['to']
    to = req.query['to'].to_f / 1000
  end

  puts "slow_get, to = #{to}. sleeping"
  sleep(to)
  puts "awaking"

  res.body = "OK"
  res.content_length = res.body.length
  res.status = 200
end

$local_server.mount_proc '/stream' do |req,res|

  chunks = req.query['chunks'].to_i
  to = req.query['to'].to_i

  data = 'stream'

  if chunks.between?(1,10) and to.between?(1,10)
    res.body = proc { |w|
      chunks.times do |i|
        sleep(to)
        w << data
      end
    }

    res.status = 200
    res.content_length = 6*chunks
  else
    res.status = 500
  end
end


$local_server.mount_proc '/binary' do |req,res|
  puts "Received #{req.body} with length #{req.body.length}"
  res.body = "Received #{req.body} with length #{req.body.length}"
  res.status = 200
end

$local_server.mount_proc '/post_binary_auto' do |req,res|
    puts "Received #{req.body} with length #{req.body.length}"
    res.body = "#{req.body.length}"
    res.status = 200
end

$local_server.mount_proc '/download' do |req,res|
  res.body = "Downloaded content"
  res.status = 200
  res.content_length = res.body.length
end

$local_server.mount_proc '/timeout' do |req,res|
    sleep(60)

    res.body = "OK"
    res.status = 200
    res.content_length = res.body.length
end


$local_server.mount_proc '/upload' do |req,res|
    upload_body = req.body
end

$local_server.mount_proc '/download_image' do |req,res|
    res.body = File.open( File.join( File.dirname(__FILE__),"test.jpg" ), "rb" )
    res["content-type"]="image/jpeg"
    res.status = 200
end

$local_server.mount_proc '/download_file' do |req,res|
    res.body = File.open( File.join( File.dirname(__FILE__),"test.txt" ), "rb" )
    res["content-type"]="text/plain"
    res.status = 200
end

$local_server.mount_proc '/download_image_auth' do |req,res|
    WEBrick::HTTPAuth.basic_auth(req, res, "My Realm") {|user, pass|
        user == 'admin' && pass == 'admin'
    }

    res.body = File.open( File.join( File.dirname(__FILE__),"test.jpg" ), "rb" )
    res["content-type"]="image/jpeg"
    res.status = 200
end

$local_server.mount_proc '/upload_text_file' do |req,res|
    res.status = 200
    res.body = req.query["blob"]
    res.content_length = res.body.length
end

$local_server.mount_proc '/upload_text_file_auth' do |req,res|
    WEBrick::HTTPAuth.basic_auth(req, res, "My Realm") {|user, pass|
        user == 'admin' && pass == 'Symbol@123'
    }

    res.status = 200
    res.body = req.query["blob"]
    res.content_length = res.body.length
end



$local_server.mount_proc '/test_methods' do |req,res|
    if req.request_method == "GET" then
        res.status = 200
        res.body = "initial GET request is: #{req.query['data1']} and #{req.query['data2']}"
        res.content_length = res.body.length
    elsif req.request_method == "POST" then
        res.status = 200
        res.body = "initial POST request is: #{req.query['data1']} and #{req.query['data2']}"
        res.content_length = res.body.length
    else
        res.body = "Unsupported server method: #{req.request_method}"
        res.status = 503
        res.content_length = res.body.length
    end
end

$local_server.mount_proc '/download_app' do |req,res|
    device = req.query()["device"]
    device = device.downcase if device

    filenames = {
        'wm' => 'TestAppWM6.5.cab',
        'ce' => 'TestAppCE.cab',
        'win32' => 'everywan.exe',
        'wp8' => 'everywan.exe'
    }

    filename = filenames[device]

    if filename then
        res.body = File.open( File.join( File.dirname(__FILE__),filename ), "rb" )

        extensions = {
            '.cab' => 'application/vnd.ms-cab-compressed',
            '.exe' => 'application/x-msdownload'
        }

        contentType = extensions[File.extname(filename)]

        if !contentType then
            contentType = "application/octet-stream"
        end

        res['content-type'] = contentType

        res.status = 200
    else
        res.status = 404
    end

end

lastLogData = ""

$local_server.mount_proc '/client_log' do |req,res|
    #puts "req: #{req.body}"
    lastLogData = req.body
    res.status = 200
end

$local_server.mount_proc '/get_last_log' do |req,res|
    res.body = lastLogData
    #puts "res.body: #{res.body}"

    res.status = 200
end

$local_server.mount_proc '/post_gzip' do |req,res|
    puts "GZIP request is: \n[START]\n #{req.inspect}\n[END]"

    enc = req['Content-Encoding']

    body = nil

    if enc =='gzip' then
        begin

            f = open('post_gzip_body.dat','w')
            f.puts(req.body);
            f.close()

            io = StringIO.new(req.body, "r")
            reader = Zlib::GzipReader.new(io)
            body = reader.read

            puts "Body is: #{body.inspect}"

            if body == "GZipped test body" then
                res.status = 200
            else
                res.status = 500
            end
        rescue => e
            puts "#{e.inspect}"
            res.status = 500
        end
    else
        res.status = 500
    end
end

$local_server.mount_proc '/get_gzip' do |req,res|
    puts "request is: \n[START]\n #{req.inspect}\n[END]"

    res['Content-Encoding'] = 'gzip'

    data = "GZipped test body"

    io = StringIO.new("","w")
    gz = Zlib::GzipWriter.new( io )
    gz.write data
    gz.close

    res.body = io.string
    res.content_length = res.body.length
    res.status = 200
end

$local_server.mount_proc( '/time_stream' ) do |req, res|
  res.content_type = 'text/event-stream'
  res.chunked = true
  res['Access-Control-Allow-Origin'] = "*"

  res.body = proc { |w|
      2.times do
        w << 'data: ' + "server time:" + Time.now.to_s + "\x0D\x0A"
        w << "\x0D\x0A"
        sleep 1
      end
      w << 'event: end' + "\x0D\x0A"
      w << 'data: end'  + "\x0D\x0A"
      w << "\x0D\x0A"
  }
end

$local_server.mount_proc( '/time_stream2' ) do |req, res|
  res.content_type = 'text/event-stream'
  res['Access-Control-Allow-Origin'] = "*"

    sleep 1

    res.body =
      'event: userlogon' + "\x0D\x0A" +
      'data: {"username": "John123"}'+ "\x0D\x0A"+"\x0D\x0A";
end

$local_server.mount_proc( '/time_stream_wrong_mime' ) do |req, res|
    res.content_type = 'text/html'
    res['Access-Control-Allow-Origin'] = "*"

    sleep 1

    res.body =
      'event: userlogon' + "\x0D\x0A" +
      'data: {"username": "John123"}'+ "\x0D\x0A"+"\x0D\x0A";
end

$local_server.mount_proc( '/chunked' ) do |req, res|

  res.chunked = true

  res.body = proc { |w|
      w << 'Chunked'

      sleep 1

      w << ' body'
  }

end

$local_server.mount_proc( '/get_non_utf_body' ) do |req,res|

  res.body = File.open( './non-utf.data', 'rb' )
#  res['content-type'] = 'text/utf-8'
  res.content_type = 'application/octet-stream'
  res.content_length = 256
  res.status = 200

end


$local_server.mount_proc( '/get_utf_body' ) do |req,res|
  res.body = "$¢€𐍈"
  res.content_type = 'text/utf-8'
  res.status = 200
end


#Secure server mount points
$secure_server.mount_proc '/test_methods' do |req,res|
    if req.request_method == "GET" then
        res.status = 200
        res.body = "initial GET request is: #{req.query['data1']} and #{req.query['data2']}"
        res.content_length = res.body.length
        elsif req.request_method == "POST" then
        res.status = 200
        res.body = "initial POST request is: #{req.query['data1']} and #{req.query['data2']}"
        res.content_length = res.body.length
        else
        res.body = "Unsupported server method: #{req.request_method}"
        res.status = 503
        res.content_length = res.body.length
    end
end

$secure_server.mount_proc '/download_image' do |req,res|
    res.body = File.open( File.join( File.dirname(__FILE__),"test.jpg" ), "rb" )
    res["content-type"]="image/jpeg"
    res.status = 200
end

$secure_server.mount_proc '/digest_auth_get' do |req,res|
  digest_auth.authenticate req, res
  res.body = "OK"
  res.content_length = res.body.length
  res.status = 200
end



$secure_server_with_client_auth.mount_proc '/test_methods' do |req,res|

    client_cert = req.client_cert

    puts "SSL Client certificate:\n======================\n#{client_cert}\n==========================="


    if req.request_method == "GET" then
        res.status = 200
        res.body = "initial GET request is: #{req.query['data1']} and #{req.query['data2']}"
        res.content_length = res.body.length
        elsif req.request_method == "POST" then
        res.status = 200
        res.body = "initial POST request is: #{req.query['data1']} and #{req.query['data2']}"
        res.content_length = res.body.length
        else
        res.body = "Unsupported server method: #{req.request_method}"
        res.status = 503
        res.content_length = res.body.length
    end
end

js_update_list = [
    '../manual/feature_def/manual_common_spec/public/js/server_url.js',
    '../auto/feature_def/auto_common_spec/public/js/server_url.js'
]

js_update_list.each do |path|
    File.open(path,'w') do |f|
      f.puts("SERVER_HOST='#{host}';")
      f.puts("SERVER_PORT=#{port};");
      f.puts("SECURE_HOST='#{host}';")
      f.puts("SECURE_PORT=#{securePort};");
      f.puts("SECURE_HOST_CA='#{host}';");
      f.puts("SECURE_PORT_CA=#{securePortWithClientAuth};");
      f.puts("WEBSOCKET_HOST='#{host}';");
      f.puts("WEBSOCKET_PORT=#{webSocketPort};");
      f.puts("HOSTS=#{JSON.generate(hosts)};")
    end
end

#ruby_update_list = [
#    '../auto/feature_def/phone_spec/app/test_server.rb'
#]

#ruby_update_list.each do |path|
#    File.open(path,'w') do |f|
#      f.puts("SPEC_TEST_SERVER_HOST='#{host}';")
#      f.puts("SPEC_TEST_SERVER_PORT=#{port};");
#    end
#end

modify_iOS_Application_plist_file(host, port)

t1 = Thread.new do
    puts "Starting local server on #{host}:#{port}"
    $local_server.start
end

t2 = Thread.new do
    puts "Starting secure server on #{host}:#{securePort}"
    $secure_server.start
end

t3 = Thread.new do
    puts "Starting secure server with client auth on #{host}:#{securePortWithClientAuth}"
    $secure_server_with_client_auth.start
end

require './ws-server.rb'


t4 = Thread.new do
    puts "Starting Websocket server on #{host}:#{webSocketPort}"
    startWsServer(host,webSocketPort)
end

trap 'INT' do
    puts "Shutting down http server"
    $local_server.shutdown
    puts "Shutting down https server"
    $secure_server.shutdown
    puts "Shutting down https ca server"
    $secure_server_with_client_auth.shutdown
    puts "Shutting down ws server"
    stopWsServer()
    puts "shutdown finished"
end



t1.join
t2.join
t3.join
t4.join
