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
securePortWithClientAuth = 8083


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
                                         :SSLVerifyClient => OpenSSL::SSL::VERIFY_PEER,
                                         :SSLCACertificateFile => File.join( File.dirname(__FILE__), 'client.crt' )
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

$local_server.mount_proc '/download_app' do |req,res|
    device = req.query()["device"]
    device = device.downcase if device
    
    filenames = {
        'android' => 'TestApp_signed.apk',
        'wm' => 'TestAppWM6.5.cab',
        'ios' => 'auto_common_spec.ipa',
        'ce' => 'TestAppCE.cab',
        'win32' => 'everywan.exe',
        'wp8' => 'everywan.exe'
    }
    
    filename = filenames[device]
    
    if filename then
        res.body = File.open( File.join( File.dirname(__FILE__),filename ), "rb" )

        extensions = {
            '.cab' => 'application/vnd.ms-cab-compressed',
            '.apk' => 'application/vnd.android.package-archive',
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
    lastLogData = req.query["blob"]
    res.status = 200
end

$local_server.mount_proc '/get_last_log' do |req,res|
    res.body = lastLogData
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
    f.puts("SECURE_HOST_CA='#{host}';");
    f.puts("SECURE_PORT_CA=#{securePortWithClientAuth};");
    
    f.close()
end

trap 'INT' do
    $local_server.shutdown
    $secure_server.shutdown
    $secure_server_with_client_auth.shutdown
end

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


t1.join
t2.join
t3.join
