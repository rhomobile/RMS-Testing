require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "TCPServer#<< ----VT-0156" do
  after(:each) do
    @server.close if @server
    @socket.close if @socket
  end
end
