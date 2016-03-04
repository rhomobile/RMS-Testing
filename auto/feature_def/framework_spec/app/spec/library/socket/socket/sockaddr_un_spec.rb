require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'
require 'spec/library/socket/shared/pack_sockaddr'

describe "Socket#sockaddr_un" do
  if System::get_property('platform') != 'WINDOWS' &&
     System.get_property('platform') != 'WINDOWS_DESKTOP' && 
     System.get_property('platform') != 'ANDROID'

     it_behaves_like :socket_pack_sockaddr_un, :sockaddr_un
  end
end
