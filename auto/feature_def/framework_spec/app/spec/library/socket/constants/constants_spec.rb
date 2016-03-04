require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

include Socket::Constants

describe "Socket::Constants" do
  it "defines socket types----VT-078" do
    consts = ["SOCK_DGRAM", "SOCK_RAW", "SOCK_RDM", "SOCK_SEQPACKET", "SOCK_STREAM"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP' && 
   System.get_property('platform') != 'ANDROID'

  it "defines protocol families----VT-071" do
    consts = ["PF_INET6", "PF_INET", "PF_IPX", "PF_UNIX", "PF_UNSPEC"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end

  it "defines address families----VT-072" do
    consts = ["AF_INET6", "AF_INET", "AF_IPX", "AF_UNIX", "AF_UNSPEC"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end

  it "defines send/receive options----VT-073" do
    consts = ["MSG_DONTROUTE", "MSG_OOB", "MSG_PEEK"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end

  it "defines socket level options----VT-074" do
    consts = ["SOL_SOCKET", "RECVPKTINFO", "INET6", "IPV6"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end
end

  it "defines socket options----VT-075" do
    consts = ["SO_BROADCAST", "SO_DEBUG", "SO_DONTROUTE", "SO_ERROR", "SO_KEEPALIVE", "SO_LINGER",
              "SO_OOBINLINE", "SO_RCVBUF", "SO_REUSEADDR", "SO_SNDBUF", "SO_TYPE"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end

  end
 
  if System::get_property('platform') != 'WINDOWS' && 
     System.get_property('platform') != 'WINDOWS_DESKTOP' && 
     System.get_property('platform') != 'ANDROID'

  it "defines multicast options----VT-076" do
    consts = ["IP_ADD_MEMBERSHIP", "IP_DEFAULT_MULTICAST_LOOP", "IP_DEFAULT_MULTICAST_TTL",
              "IP_MAX_MEMBERSHIPS", "IP_MULTICAST_LOOP", "IP_MULTICAST_TTL"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end

  end

  it "defines TCP options----VT-077" do
    consts = ["TCP_MAXSEG", "TCP_NODELAY"]
    consts.each do |c|
      Socket::Constants.should have_constant(c)
    end
  end
end
