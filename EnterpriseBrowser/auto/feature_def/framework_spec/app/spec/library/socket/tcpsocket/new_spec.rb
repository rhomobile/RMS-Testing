require 'spec/library/socket/tcpsocket/shared/new'

describe "TCPSocket.new" do
  it_behaves_like :tcpsocket_new, :new
end
