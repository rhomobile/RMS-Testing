require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "TCPServer#readpartial ----VT-0157" do
  after(:each) do
    @server.close if @server
    @socket.close if @socket
  end
end
