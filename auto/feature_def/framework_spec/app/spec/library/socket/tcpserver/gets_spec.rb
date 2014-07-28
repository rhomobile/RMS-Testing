require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "TCPServer#gets" do
  before :each do
    @server = TCPServer.new(SocketSpecs.hostname, SocketSpecs.port)
  end

  after :each do
    @server.close
  end

  it "raises Errno::ENOTCONN on gets----VT-0146" do
    lambda { @server.gets }.should raise_error(Errno::ENOTCONN)
  end
end
