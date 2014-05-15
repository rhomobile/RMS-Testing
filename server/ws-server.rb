require 'em-websocket'

$ws = nil

def startWsServer( host, port )
    $ws = EM.run {
        EM::WebSocket.run(:host => host, :port => port) do |ws|
            ws.onopen { |handshake|
                puts "WebSocket connection open"
            }
        
            ws.onclose { puts "Connection closed" }
        
            ws.onmessage { |msg|
                puts "Recieved message: #{msg}"
                ws.send "Pong: #{msg}"
            }
        end
    }
end

def stopWsServer()
    EM.stop()
end

