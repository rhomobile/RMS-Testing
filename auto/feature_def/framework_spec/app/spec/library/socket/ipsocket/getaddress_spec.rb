require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::IPSocket#getaddress" do

  it "returns the IP address of hostname----VT-055" do
    addr_local = IPSocket.getaddress(SocketSpecs.hostname)
    ["127.0.0.1", "::1"].include?(addr_local).should == true
  end

  it "returns the IP address when passed an IP----VT-056" do
    IPSocket.getaddress("127.0.0.1").should == "127.0.0.1"
    IPSocket.getaddress("0.0.0.0").should == "0.0.0.0"
  end

  # There is no way to make this fail-proof on all machines, because
  # DNS servers like opendns return A records for ANY host, including
  # traditionally invalidly named ones.
  quarantine! do
    it "raises an error on unknown hostnames----VT-057" do
      lambda {
        IPSocket.getaddress("rubyspecdoesntexist.fallingsnow.net")
      }.should raise_error(SocketError)
    end
  end

end
