require 'spec/library/socket/tcpsocket/shared/new'

describe "TCPSocket.open ----VT-0174" do
  it_behaves_like :tcpsocket_new, :open
end
