require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'
require 'spec/library/socket/shared/socketpair'

describe "Socket#socketpair" do
  it_behaves_like :socket_socketpair, :socketpair
end