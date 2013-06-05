require 'webrick'
require 'socket'

port = 81

$local_server = WEBrick::HTTPServer.new :Port => port

$local_server.mount_proc '/download' do |req,res|
  res.body = "Downloaded content"
  res.status = 200
  res.content_length = res.body.length
end

$local_server.mount_proc '/upload' do |req,res|
    upload_body = req.body
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


f = open('app/NetworkTest/server_url.js','w')
f.puts("SERVER_HOST='#{host}';")
f.puts("SERVER_PORT=#{port};");
f.close()

$local_server.start
