require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

# TODO: verify these for windows
describe "TCPSocket#gethostbyname" do
  before :each do
    @host_info = TCPSocket.gethostbyname(SocketSpecs.hostname)
  end

  it "returns an array elements of information on the hostname----VT-0164" do
    @host_info.should be_kind_of(Array)
  end

  platform_is_not :windows do
    it "returns the canonical name as first value" do
    @host_info[0].should == SocketSpecs.hostname
    end

    not_compliant_on :jruby do
      it "returns the address type as the third value----VT-0165" do
        address_type = @host_info[2]
        [Socket::AF_INET, Socket::AF_INET6].include?(address_type).should be_true
      end

      it "returns the IP address as the fourth value----VT-0166" do
        ip = @host_info[3]
        ["127.0.0.1", "::1"].include?(ip).should be_true
      end
    end

    deviates_on :jruby do
      it "returns the address type as the third value----VT-0167" do
        address_type = @host_info[2]
        [Socket::AF_INET, Socket::AF_INET6].include?(address_type).should be_true
      end

      it "returns the IP address as the fourth value----VT-0168" do
        ip = @host_info[3]
        ["127.0.0.1", "::1"].include?(ip).should be_true
      end
    end
  end

  platform_is :windows do
    it "returns the canonical name as first value----VT-0169" do
      host = "#{ENV['COMPUTERNAME'].downcase}"
      host << ".#{ENV['USERDNSDOMAIN'].downcase}" if ENV['USERDNSDOMAIN']
      @host_info[0].should == "127.0.0.1"
    end

    it "returns the address type as the third value----VT-0170" do
      @host_info[2].should == Socket::AF_INET
    end

    it "returns the IP address as the fourth value----VT-0171" do
      @host_info[3].should == "127.0.0.1"
    end
  end

  it "returns any aliases to the address as second value----VT-0172" do
    @host_info[1].should be_kind_of(Array)
  end
end
