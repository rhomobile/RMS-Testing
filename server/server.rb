require 'webrick'
require 'webrick/https'
require 'socket'
require 'openssl'
require 'net/http'

def localip
    orig, Socket.do_not_reverse_lookup = Socket.do_not_reverse_lookup, true  # turn off reverse DNS resolution temporarily
    UDPSocket.open do |s|
        s.connect '174.142.8.58', 1
        s.addr.last
    end
    ensure
    Socket.do_not_reverse_lookup = orig
end

host = localip
port = 8081
securePort = 8082

cert = OpenSSL::X509::Certificate.new File.read 'fd_testing.cert'
pkey = OpenSSL::PKey::RSA.new File.read 'fd_testing.key'

puts "SSL creds: #{cert.inspect}, #{pkey.inspect}"

$local_server = WEBrick::HTTPServer.new :Port => port
$secure_server = WEBrick::HTTPServer.new(:Port => securePort,
                                 :SSLEnable => true,
                                 :SSLCertificate => cert,
                                 :SSLPrivateKey => pkey,
                                 :SSLVerifyClient => OpenSSL::SSL::VERIFY_NONE
                                 )

$local_server.mount_proc '/download' do |req,res|
  res.body = "Downloaded content"
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
        user == 'admin' && pass == 'Motorola@123'
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

to_generate = [
    '../manual/feature_def/manual_common_spec/public/js/server_url.js',
    '../auto/feature_def/auto_common_spec/public/js/server_url.js'
]

to_generate.each do |path|
    f = open(path,'w')
    f.puts("SERVER_HOST='#{host}';")
    f.puts("SERVER_PORT=#{port};");
    f.puts("SECURE_HOST='#{host}';")
    f.puts("SECURE_PORT=#{securePort};");
    
    f.close()
end

trap 'INT' do
    $local_server.shutdown
    $secure_server.shutdown
end

t1 = Thread.new do
    puts "Starting local server on #{host}:#{port}"
    $local_server.start
end

t2 = Thread.new do
    puts "Starting secure server on #{host}:#{securePort}"
    $secure_server.start
end

t1.join
t2.join
