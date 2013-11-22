require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#close_read" do
  before :each do
    @server = TCPServer.new(SocketSpecs.port)
  end

  after :each do
    @server.close unless @server.closed?
  end

  it "closes the reading end of the socket----VT-001" do
    @server.close_read
    lambda { @server.read }.should raise_error(IOError)
  end

  it "it works on sockets with closed ends----VT-002" do
    @server.close_read
    lambda { @server.close_read }.should_not raise_error(Exception)
    lambda { @server.read }.should raise_error(IOError)
  end

  it "does not close the socket----VT-003" do
    @server.close_read
    @server.closed?.should be_false
  end

  it "fully closes the socket if it was already closed for writing----VT-004" do
    @server.close_write
    @server.close_read
    @server.closed?.should be_true
  end

  it "keep writing from the socket on already closed for reading----VT-012" do
    @server.close_read
    @server.write("hello")
    @server.closed?.should be_false
  end

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP' && 
   System.get_property('platform') != 'ANDROID'

  it "raises IOError on closed socket----VT-005" do
    @server.close
    lambda { @server.close_read }.should raise_error(IOError)
  end
end

  it "returns nil" do
    @server.close_read.should be_nil
  end
end
