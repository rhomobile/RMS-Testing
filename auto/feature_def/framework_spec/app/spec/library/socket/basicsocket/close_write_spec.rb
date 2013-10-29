require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#close_write" do
  before :each do
    @server = TCPServer.new(SocketSpecs.port)
  end

  after :each do
    @server.close unless @server.closed?
  end

  it "closes the writing end of the socket" do
    @server.close_write
    lambda { @server.write("foo") }.should raise_error(IOError)
  end

  it "works on sockets with closed write ends" do
    @server.close_write
    lambda { @server.close_write }.should_not raise_error(Exception)
    lambda { @server.write("foo") }.should raise_error(IOError)
  end

  it "does not close the socket" do
    @server.close_write
    @server.closed?.should be_false
  end

  it "fully closes the socket if it was already closed for reading" do
    @server.close_read
    @server.close_write
    @server.closed?.should be_true
  end

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP' && 
   System.get_property('platform') != 'ANDROID'

  it "raises IOError on closed socket" do
    @server.close
    lambda { @server.close_write }.should raise_error(IOError)
  end
end

  it "returns nil" do
    @server.close_write.should be_nil
  end
end
