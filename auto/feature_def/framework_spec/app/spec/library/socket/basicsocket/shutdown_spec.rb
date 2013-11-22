require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#shutdown" do
  before :each do
    @server = TCPServer.new('127.0.0.1', SocketSpecs.port)
    @socket = TCPSocket.new('127.0.0.1', SocketSpecs.port)
  end

  after :each do
    @server.closed?.should be_false
    @socket.closed?.should be_false

    @server.close
    @socket.close
  end

  it "disallows reading end of the socket----VT-044" do
    @socket.shutdown(:RD)
    lambda { @socket.read }.should raise_error(IOError)
  end

  it "disallows writing end of the socket----VT-045" do
    @socket.shutdown(:WR)
    lambda { @socket.write }.should raise_error(IOError)
  end
end
