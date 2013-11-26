require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

require 'socket'

describe "Socket#gethostbyaddr" do
  before :each do
    @hostname = "127.0.0.1"
    @addr = Socket.sockaddr_in(SocketSpecs.port, @hostname)
    @socket = Socket.new(Socket::AF_INET, Socket::SOCK_STREAM, 0)
  end

  after :each do
    @socket.close
  end

  it "accepts address string and checks if the hostname is same as given----VT-0104" do
     res = @socket.gethostbyaddr(@addr)

     expected = "127.0.0.1"
     res[0].should == expected
   end
end
