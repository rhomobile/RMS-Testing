require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'
require 'spec/library/socket/shared/pack_sockaddr'

if System.get_property('platform') != 'ANDROID'  &&
   System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP'

describe "Socket#sockaddr_in" do
  it_behaves_like :socket_pack_sockaddr_in, :sockaddr_in
end

end