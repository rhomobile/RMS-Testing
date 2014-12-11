require 'spec/library/socket/tcpsocket/shared/new'

describe "TCPSocket.open" do
  it_behaves_like :tcpsocket_new, :open
end
