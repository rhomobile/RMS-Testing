require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

if System.get_property('platform') != 'ANDROID' &&
   System.get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP'

  describe "Socket.gethostname" do
    # This currently works in Unix and Windows. Feel free to add guards
    # for other platforms.
    it "returns the host name----VT-0107" do
      Socket.gethostname.should == `hostname`.strip
    end
  end

end
