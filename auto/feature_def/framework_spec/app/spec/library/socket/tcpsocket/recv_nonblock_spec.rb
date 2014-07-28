require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "TCPSocket#recv_nonblock" do
  before :all do
    SocketSpecs::SpecTCPServer.start
  end

  before :each do
    @hostname = SocketSpecs::SpecTCPServer.get.hostname
    @socket = nil
  end

  after :each do
    if @socket
      @socket.write "QUIT"
      @socket.close
    end
  end

  it "returns a String read from the socket----VT-0175" do
    @socket = TCPSocket.new @hostname, SocketSpecs.port
    @socket.write "TCPSocket#recv_nonblock"

    # Wait for the server to echo. This spec is testing the return
    # value, not the non-blocking behavior.
    #
    # TODO: Figure out a good way to test non-blocking.
    IO.select([@socket])
    @socket.recv_nonblock(50).should == "TCPSocket#recv_nonblock"
  end
end
