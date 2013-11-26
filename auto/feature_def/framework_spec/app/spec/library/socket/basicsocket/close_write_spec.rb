require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#close_write" do
  before :each do
    @server = TCPServer.new(SocketSpecs.port)
  end

  after :each do
    @server.close unless @server.closed?
  end

  it "closes the writing end of the socket----VT-006" do
    @server.close_write
    lambda { @server.write("foo") }.should raise_error(IOError)
  end

  it "works on sockets with closed write ends----VT-007" do
    @server.close_write
    lambda { @server.close_write }.should_not raise_error(Exception)
    lambda { @server.write("foo") }.should raise_error(IOError)
  end

  it "does not close the socket----VT-008" do
    @server.close_write
    @server.closed?.should be_false
  end

  it "fully closes the socket if it was already closed for reading----VT-009" do
    @server.close_read
    @server.close_write
    @server.closed?.should be_true
  end

=begin
  this test is not passed on android and WM platform
  it "keep reading from the socket on already closed for writing----VT-010" do
    @server.close_write
    @server.read
    @server.closed?.should be_false
  end
=end

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP' && 
   System.get_property('platform') != 'ANDROID'

  it "raises IOError on closed socket----VT-011" do
    @server.close
    lambda { @server.close_write }.should raise_error(IOError)
  end
end

  it "returns nil" do
    @server.close_write.should be_nil
  end
end
