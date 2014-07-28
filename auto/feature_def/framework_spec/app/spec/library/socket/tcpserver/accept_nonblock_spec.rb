require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::TCPServer.accept_nonblock" do
  before :each do
    @server =  TCPServer.new("127.0.0.1", SocketSpecs.port)
  end

  after :each do
    @server.close
  end

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP'

  it "accepts non blocking connections----VT-0141" do
    @server.listen(5)
    lambda { @server.accept_nonblock}.should raise_error(Errno::EAGAIN)

    c = TCPSocket.new("127.0.0.1", SocketSpecs.port)
    sleep 0.1
    s = @server.accept_nonblock

    # commenting while we get some input on the current JRuby situation
    #    port, address = Socket.unpack_sockaddr_in(s.getsockname)

    #    port.should == SocketSpecs.port
    #    address.should == "127.0.0.1"
    s.should be_kind_of(TCPSocket)

    c.close
    s.close
  end

  it "accepts non blocking connections_2----VT-0142" do
    @server.listen(5)
    lambda { @server.accept_nonblock}.should raise_error(Errno::EWOULDBLOCK)

    c = TCPSocket.new("127.0.0.1", SocketSpecs.port)
    sleep 0.1
    s = @server.accept_nonblock
    s.should be_kind_of(TCPSocket)

    c.close
    s.close
  end

end
end
