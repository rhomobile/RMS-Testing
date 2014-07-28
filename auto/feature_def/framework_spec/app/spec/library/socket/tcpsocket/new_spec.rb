require 'spec/library/socket/tcpsocket/shared/new'

describe "TCPSocket.new ----VT-0173" do
  it_behaves_like :tcpsocket_new, :new
end
