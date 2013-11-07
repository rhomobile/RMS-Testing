require 'spec/spec_helper'
require 'spec/library/socket/shared/recv_nonblock'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#recv_nonblock" do
  it_behaves_like :socket_recv_nonblock, :recv_nonblock
end
