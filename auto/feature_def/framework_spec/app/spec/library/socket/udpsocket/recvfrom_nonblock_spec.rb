require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#recvfrom_nonblock----VT-0191" do
  it_behaves_like :socket_recvfrom_nonblock, :recv_nonblock
end
