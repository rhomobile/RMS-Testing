require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::IPSocket#addr" do
  before :all do
    @do_not_reverse_lookup = BasicSocket.do_not_reverse_lookup
  end


  before :each do
    @socket = TCPServer.new("127.0.0.1", SocketSpecs.port)
  end

  after :each do
    @socket.close unless @socket.closed?
    BasicSocket.do_not_reverse_lookup = false
  end

  after :all do
    BasicSocket.do_not_reverse_lookup = @do_not_reverse_lookup
  end

  ruby_version_is ""..."1.9" do
    it "returns an array with the socket's information----VT-046" do
      BasicSocket.do_not_reverse_lookup = false

      addrinfo = @socket.addr
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == SocketSpecs.hostname
      addrinfo[3].should == "127.0.0.1"
    end

    it "returns an address in the array if do_not_reverse_lookup is true----VT-047" do
      BasicSocket.do_not_reverse_lookup = true
      addrinfo = @socket.addr
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == "127.0.0.1"
      addrinfo[3].should == "127.0.0.1"
    end
  end

  ruby_version_is "1.9" do
    it "returns an array with the socket's information----VT-048" do
      @socket.do_not_reverse_lookup = false
      BasicSocket.do_not_reverse_lookup = false
      addrinfo = @socket.addr
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == SocketSpecs.hostname
      addrinfo[3].should == "127.0.0.1"
    end

    it "returns an address in the array if do_not_reverse_lookup is true----VT-049" do
      @socket.do_not_reverse_lookup = true
      BasicSocket.do_not_reverse_lookup = true
      addrinfo = @socket.addr
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == "127.0.0.1"
      addrinfo[3].should == "127.0.0.1"
    end
    
    it "returns an address in the array if passed false----VT-050" do
      addrinfo = @socket.addr(false)
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == "127.0.0.1"
      addrinfo[3].should == "127.0.0.1"
    end

    it "returns an address in the array if passed :hostname----VT-051" do
      @socket.do_not_reverse_lookup = false
      BasicSocket.do_not_reverse_lookup = false
      addrinfo = @socket.addr(:hostname)
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == SocketSpecs.hostname
      addrinfo[3].should == "127.0.0.1"
    end

    it "returns an address in the array if passed :numeric----VT-052" do
      @socket.do_not_reverse_lookup = false
      BasicSocket.do_not_reverse_lookup = false
      addrinfo = @socket.addr(:numeric)
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == "127.0.0.1"
      addrinfo[3].should == "127.0.0.1"
    end

=begin
    this test is not passed on android and wm
    it "returns an address in the array if passed :hostname, if do_not_reverse_lookup is true----VT-053" do
      @socket.do_not_reverse_lookup = true
      BasicSocket.do_not_reverse_lookup = true
      addrinfo = @socket.addr(:hostname)
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == "127.0.0.1"
      addrinfo[3].should == "127.0.0.1"
    end
=end

    it "returns an address in the array if passed :numeric, if do_not_reverse_lookup is true----VT-054" do
      @socket.do_not_reverse_lookup = true
      BasicSocket.do_not_reverse_lookup = true
      addrinfo = @socket.addr(:numeric)
      addrinfo[0].should == "AF_INET"
      addrinfo[1].should == SocketSpecs.port
      addrinfo[2].should == SocketSpecs.hostname
      addrinfo[3].should == "127.0.0.1"
    end
  end
end
