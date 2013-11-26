require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket::BasicSocket#sysaccept----VT-0136" do
  it_behaves_like :socket_sysaccept, :accept
end
