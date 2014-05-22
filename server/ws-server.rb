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
				if(msg == "JSON")
					puts "Recieved message: #{msg}"
					ws.send '{"id": "ZoomIn", "label": "Zoom In"}'
				else
					puts "Recieved message: #{msg}"
					ws.send "Pong: #{msg}"
				end
            }
        end
    }
end

def stopWsServer()
    EM.stop()
end

