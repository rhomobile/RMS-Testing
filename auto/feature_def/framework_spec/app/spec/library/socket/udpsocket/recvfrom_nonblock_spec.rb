require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::UDPSocket#recvfrom_nonblock----VT-0191" do
  it_behaves_like :socket_recv_nonblock, :recvfrom_nonblock
end
