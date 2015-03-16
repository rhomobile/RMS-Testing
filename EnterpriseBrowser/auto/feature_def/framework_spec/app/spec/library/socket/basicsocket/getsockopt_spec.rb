require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "BasicSocket#getsockopt" do
  before(:each) do
    @sock = Socket.new(Socket::AF_INET, Socket::SOCK_STREAM, 0)
  end

  after :each do
    @sock.closed?.should be_false
    @sock.close
  end

  it "gets a socket option Socket::SO_TYPE----VT-029" do
    n = @sock.getsockopt(Socket::SOL_SOCKET, Socket::SO_TYPE).to_s
    n.should == [Socket::SOCK_STREAM].pack("i")
  end

  it "gets a socket option Socket::SO_OOBINLINE----VT-030" do
    n = @sock.getsockopt(Socket::SOL_SOCKET, Socket::SO_OOBINLINE).to_s
    n.should == [0].pack("i")
  end

  it "gets a socket option Socket::SO_LINGER----VT-031" do
    n = @sock.getsockopt(Socket::SOL_SOCKET, Socket::SO_LINGER).to_s
    if (n.size == 8) # linger struct on some platforms, not just a value
      n.should == [0, 0].pack("ii")
    else
      n.should == [0].pack("i")
    end
  end

  it "gets a socket option Socket::SO_SNDBUF----VT-032" do
    n = @sock.getsockopt(Socket::SOL_SOCKET, Socket::SO_SNDBUF).to_s
    n.unpack('i')[0].should > 0
  end

  it "raises a SystemCallError with an invalid socket option----VT-033" do
    lambda { @sock.getsockopt Socket::SOL_SOCKET, -1 }.should raise_error(Errno::ENOPROTOOPT)
  end
end