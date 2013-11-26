require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP'

describe "UDPSocket.send" do
  before :each do
    @ready = false
    @server_thread = Thread.new do
      @server = UDPSocket.open
      @server.bind(nil, SocketSpecs.port)
      @ready = true
      begin
        @msg = @server.recvfrom_nonblock(64)
      rescue Errno::EAGAIN
        IO.select([@server])
        retry
      end
      @server.close
    end
    Thread.pass while @server_thread.status and !@ready
  end

  it "sends data in ad hoc mode----VT-0192" do
    @socket = UDPSocket.open
    @socket.send("ad hoc", 0, SocketSpecs.hostname,SocketSpecs.port)
    @socket.close
    @server_thread.join

    @msg[0].should == "ad hoc"
    @msg[1][0].should == "AF_INET"
    @msg[1][1].should be_kind_of(Fixnum)
    @msg[1][3].should == "127.0.0.1"
  end

  it "sends data in ad hoc mode (with port given as a String)----VT-0193" do
    @socket = UDPSocket.open
    @socket.send("ad hoc", 0, SocketSpecs.hostname,SocketSpecs.str_port)
    @socket.close
    @server_thread.join

    @msg[0].should == "ad hoc"
    @msg[1][0].should == "AF_INET"
    @msg[1][1].should be_kind_of(Fixnum)
    @msg[1][3].should == "127.0.0.1"
  end

  it "sends data in connection mode----VT-0194" do
    @socket = UDPSocket.open
    @socket.connect(SocketSpecs.hostname,SocketSpecs.port)
    @socket.send("connection-based", 0)
    @socket.close
    @server_thread.join

    @msg[0].should == "connection-based"
    @msg[1][0].should == "AF_INET"
    @msg[1][1].should be_kind_of(Fixnum)
    @msg[1][3].should == "127.0.0.1"
  end
end

end