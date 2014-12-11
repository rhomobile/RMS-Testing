require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#getsockname" do
=begin
  this test is not passed on android and WM platform

  after :each do
    @socket.closed?.should be_false
    @socket.close
  end

  it "returns the sockaddr associated with the socket----VT-025" do
    @socket = TCPServer.new("127.0.0.1", SocketSpecs.port)
    sockaddr = Socket.unpack_sockaddr_in(@socket.getsockname)
    sockaddr.should == [SocketSpecs.port, "127.0.0.1"]
  end

  it "works on sockets listening in ipaddr_any----VT-026" do
    @socket = TCPServer.new(SocketSpecs.port)
    sockaddr = Socket.unpack_sockaddr_in(@socket.getsockname)
    ["::", "0.0.0.0", "::ffff:0.0.0.0"].include?(sockaddr[1]).should be_true
    sockaddr[0].should == SocketSpecs.port
  end

  it "returns the sockaddr associated with the socket when it is closed----VT-027" do
    @socket = TCPServer.new("127.0.0.1", SocketSpecs.port)
    @socket.close
    lambda { @socket.getsockname }.should_not raise_error(Exception)
    @socket.closed?.should be_true
    @socket = TCPServer.new("127.0.0.1", SocketSpecs.port)
    sockaddr = Socket.unpack_sockaddr_in(@socket.getsockname)
    sockaddr.should == [SocketSpecs.port, "127.0.0.1"]
  end

  if System::get_property('platform') != 'WINDOWS' && 
     System.get_property('platform') != 'WINDOWS_DESKTOP'

    it "returns empty sockaddr for unbinded sockets----VT-028" do
      @socket = Socket.new(Socket::AF_INET, Socket::SOCK_STREAM, 0)
      sockaddr = Socket.unpack_sockaddr_in(@socket.getsockname)
      sockaddr.should == [0, "0.0.0.0"]
    end
  end
=end
end
