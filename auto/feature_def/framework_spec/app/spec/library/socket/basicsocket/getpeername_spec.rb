require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#getpeername" do

  before :each do
    @server = TCPServer.new("127.0.0.1", SocketSpecs.port)
    @client = TCPSocket.new("127.0.0.1", SocketSpecs.port)
  end

  after :each do
    @server.close unless @server.closed?
    @client.close unless @client.closed?
  end

  it "returns the sockaddr of the other end of the connection----VT-022" do
    server_sockaddr = Socket.pack_sockaddr_in(SocketSpecs.port, "127.0.0.1")
    @client.getpeername.should == server_sockaddr
  end

  # Catch general exceptions to prevent NotImplementedError
  it "raises an error if socket's not connected----VT-022" do
    lambda { @server.getpeername }.should raise_error(Exception)
  end

  it "raises an error if socket's not connected----VT-023" do
    @server.close
    lambda { @server.getpeername }.should raise_error(Exception)
  end

  it "raises an error if socket's not connected----VT-024" do
    @client.close
    lambda { @client.getpeername }.should raise_error(Exception)
  end
end
