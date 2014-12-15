require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

include Socket::Constants

describe "Socket#bind on SOCK_DGRAM socket" do
  before :each do
    @sock = Socket.new(AF_INET, SOCK_DGRAM, 0);
    @sockaddr = Socket.pack_sockaddr_in(SocketSpecs.port, "127.0.0.1");
  end

  after :each do
    @sock.closed?.should be_false
    @sock.close
  end

  it "binds to a port----VT-086" do
    lambda { @sock.bind(@sockaddr) }.should_not raise_error
  end

  it "returns 0 if successful----VT-087" do
    @sock.bind(@sockaddr).should == 0
  end

  it "raises Errno::EINVAL when binding to an already bound port----VT-088" do
    @sock.bind(@sockaddr);

    lambda { @sock.bind(@sockaddr); }.should raise_error(Errno::EINVAL);
  end

  it "raises Errno::EADDRNOTAVAIL when the specified sockaddr is not available from the local machine----VT-089" do
    sockaddr1 = Socket.pack_sockaddr_in(SocketSpecs.port, "4.3.2.1");
    lambda { @sock.bind(sockaddr1); }.should raise_error(Errno::EADDRNOTAVAIL)
  end

  platform_is_not :os => [:windows, :cygwin] do
    it "raises Errno::EACCES when the current user does not have permission to bind----VT-090" do
      sockaddr1 = Socket.pack_sockaddr_in(1, "127.0.0.1");
      lambda { @sock.bind(sockaddr1); }.should raise_error(Errno::EACCES)
    end
  end
end

describe "Socket#bind on SOCK_STREAM socket" do
  before :each do
    @sock = Socket.new(AF_INET, SOCK_STREAM, 0);
    @sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, true)
    @sockaddr = Socket.pack_sockaddr_in(SocketSpecs.port, "127.0.0.1");
  end

  after :each do
    @sock.closed?.should be_false
    @sock.close
  end

  it "binds to a port----VT-091" do
    lambda { @sock.bind(@sockaddr) }.should_not raise_error
  end

  it "returns 0 if successful----VT-092" do
    @sock.bind(@sockaddr).should == 0
  end

  it "raises Errno::EINVAL when binding to an already bound port----VT-093" do
    @sock.bind(@sockaddr);

    lambda { @sock.bind(@sockaddr); }.should raise_error(Errno::EINVAL);
  end

  it "raises Errno::EADDRNOTAVAIL when the specified sockaddr is not available from the local machine----VT-094" do
    sockaddr1 = Socket.pack_sockaddr_in(SocketSpecs.port, "4.3.2.1");
    lambda { @sock.bind(sockaddr1); }.should raise_error(Errno::EADDRNOTAVAIL)
  end

  platform_is_not :os => [:windows, :cygwin] do
    it "raises Errno::EACCES when the current user does not have permission to bind----VT-095" do
      sockaddr1 = Socket.pack_sockaddr_in(1, "127.0.0.1");
      lambda { @sock.bind(sockaddr1); }.should raise_error(Errno::EACCES)
    end
  end

=begin
  it "raises Errno::ENETDOWN when the network is down----VT-094" do
    sockaddr1 = Socket.pack_sockaddr_in(80, 'www.google.com');
    lambda { @sock.bind(sockaddr1); }.should raise_error(Errno::ENETDOWN)
  end
=end

end
