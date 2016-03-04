require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'
require 'spec/library/socket/shared/pack_sockaddr'

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP'  &&
   System.get_property('platform') != 'ANDROID' 

describe "Socket#pack_sockaddr_un" do
  it_behaves_like :socket_pack_sockaddr_un, :pack_sockaddr_un
end

end