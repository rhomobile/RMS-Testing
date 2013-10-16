require 'em-websocket'

EM.run {
    EM::WebSocket.run(:host => '192.168.0.102', :port => 8084) do |ws|
        ws.onopen { |handshake|
            puts "WebSocket connection open"
            
            # Access properties on the EM::WebSocket::Handshake object, e.g.
            # path, query_string, origin, headers
            
            # Publish message to the client
#            ws.send "Hello Client, you connected to #{handshake.path}"
        }
        
        ws.onclose { puts "Connection closed" }
        
        ws.onmessage { |msg|
            puts "Recieved message: #{msg}"
            ws.send "Pong: #{msg}"
        }
    end
}

