require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket#getservbyname" do
  if ( System.get_property('platform') != 'ANDROID' )
    it "returns the port for service 'http'----VT-0116" do
      Socket.getservbyname('http').should == 80
    end

    it "returns the port for service 'http' with protocol 'tcp'" do
      Socket.getservbyname('http', 'tcp').should == 80
    end
  end

  it "returns the port for service 'domain' with protocol 'udp'----VT-0117" do
    Socket.getservbyname('domain', 'udp').should == 53
  end

  it "returns the port for service 'daytime'----VT-0118" do
    Socket.getservbyname('daytime').should == 13
  end

  it "raises a SocketError when the service or port is invalid----VT-0119" do
    lambda { Socket.getservbyname('invalid') }.should raise_error(SocketError)
  end

  it "returns the port for service 'smtp', if applicable----VT-0120" do
    lambda { Socket.getservbyname("smtp") }.should == 25
  end

  it "returns the port for service 'shell', if applicable----VT-0121" do
    lambda { Socket.getservbyname("shell") }.should == 514
  end
end
