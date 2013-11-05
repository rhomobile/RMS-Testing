require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'
require 'spec/library/socket/shared/pack_sockaddr'


describe "Socket#pack_sockaddr_in" do
  if  System.get_property('platform') != 'ANDROID' &&
      System::get_property('platform') != 'WINDOWS' &&
      System.get_property('platform') != 'WINDOWS_DESKTOP'

    it_behaves_like :socket_pack_sockaddr_in, :pack_sockaddr_in

  end
end