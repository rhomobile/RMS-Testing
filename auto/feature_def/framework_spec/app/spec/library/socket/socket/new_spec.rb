require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

require 'socket'

describe "Socket#new" do
  
  after :each do
    @socket.close
  end

  it "creates a new socket for TCP----VT-0123" do
    lambda { @socket = Socket.new(Socket::AF_INET, Socket::SOCK_STREAM, 0) }.should_not raise_error(Exception)
  end

  it "creates a new socket for UDP----VT-0124" do
    lambda { @socket = Socket.new(Socket::AF_INET, Socket::SOCK_DGRAM, 0) }.should_not raise_error(Exception)
  end
end