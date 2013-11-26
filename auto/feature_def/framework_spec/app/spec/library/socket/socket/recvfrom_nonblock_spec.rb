require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#recvfrom_nonblock----VT-0128" do
  it_behaves_like :socket_recvfrom_nonblock, :recv_nonblock
end