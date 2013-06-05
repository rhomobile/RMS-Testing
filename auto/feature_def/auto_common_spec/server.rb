require 'webrick'
require 'socket'

port = 81

$local_server = WEBrick::HTTPServer.new :Port => port

$local_server.mount_proc '/download' do |req,res|
=begin
  if req.request_method == 'HEAD' then
  elsif req.request_method == 'GET' then
  end
        
  res['Last-Modified'] = 'test'
  range = req['Range']

  res.status = 200
  res.chunked = true
  res.body = "1234567890"
  res.content_length = body.length
=end
  res.body = "Downloaded content"
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

puts "Starting local server on #{host}:{#port}"


f = open('app/NetworkTest/server_url.js','w')
f.puts("SERVER_HOST='#{host}';")
f.puts("SERVER_PORT=#{port};");
f.close()

$local_server.start
