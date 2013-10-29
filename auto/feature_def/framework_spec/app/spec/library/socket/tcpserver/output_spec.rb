require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "TCPServer#<<" do
  after(:each) do
    @server.close if @server
    @socket.close if @socket
  end
end
