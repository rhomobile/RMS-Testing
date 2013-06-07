require 'webrick'
require 'socket'
require 'net/http'

port = 81

$local_server = WEBrick::HTTPServer.new :Port => port

$local_server.mount_proc '/download' do |req,res|
  res.body = "Downloaded content"
  res.status = 200
  res.content_length = res.body.length
end

$local_server.mount_proc '/download_image' do |req,res|
    res.body = File.open( File.join( File.dirname(__FILE__),"test.jpg" ), "rb" )
    res["content-type"]="image/jpeg"
    res.status = 200
end

$local_server.mount_proc '/download_image_auth' do |req,res|
    WEBrick::HTTPAuth.basic_auth(req, res, "My Realm") {|user, pass|
        # block should return true if
        # authentication token is valid
        user == 'admin' && pass == 'admin'
    }
    
    res.body = File.open( File.join( File.dirname(__FILE__),"test.jpg" ), "rb" )
    res["content-type"]="image/jpeg"
    res.status = 200
end

$local_server.mount_proc '/upload_text_file' do |req,res|
    filedata = req.query["filename"]
    res.status = 200
    res.body = "initial request is: #{req.inspect}\nFile data is:\n#{filedata}"
    res.content_length = res.body.length
end

$local_server.mount_proc '/upload_text_file_auth' do |req,res|
    WEBrick::HTTPAuth.basic_auth(req, res, "My Realm") {|user, pass|
        # block should return true if
        # authentication token is valid
        user == 'admin' && pass == 'Motorola@123'
    }

    filedata = req.query["filename"]
    res.status = 200
    res.body = "initial request is: #{req.inspect}\nFile data is:\n#{filedata}"
    res.content_length = res.body.length
end



$local_server.mount_proc '/test_methods' do |req,res|
    if req.request_method == "GET" then
        res.status = 200
        res.body = "initial request is: #{req.inspect}"
        res.content_length = res.body.length
    elsif req.request_method == "POST" then
        res.status = 200
        res.body = "initial request is: #{req.inspect}"
        res.content_length = res.body.length
    else
        res.body = "Unsupported server method: #{req.request_method}"
        res.status = 503
        res.content_length = res.body.length
    end
end

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

puts "Starting local server on #{host}:#{port}"


f = open('public/js/server_url.js','w')
f.puts("SERVER_HOST='#{host}';")
f.puts("SERVER_PORT=#{port};");
f.close()

$local_server.start
