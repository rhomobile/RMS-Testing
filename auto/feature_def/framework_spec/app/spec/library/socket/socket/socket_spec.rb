require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "Socket" do
  it "inherits from BasicSocket and IO" do
    Socket.superclass.should == BasicSocket
    BasicSocket.superclass.should == IO
  end
end

describe "The socket class hierarchy" do
  it "has an IPSocket in parallel to Socket----VT-0131" do
    Socket.ancestors.include?(IPSocket).should == false
    IPSocket.ancestors.include?(Socket).should == false
    IPSocket.superclass.should == BasicSocket
  end

  it "has TCPSocket and UDPSocket subclasses of IPSocket----VT-0132" do
    TCPSocket.superclass.should == IPSocket
    UDPSocket.superclass.should == IPSocket
  end

  if System::get_property('platform') != 'WINDOWS' && 
     System.get_property('platform') != 'WINDOWS_DESKTOP' 

  not_supported_on :jruby, :windows do
    it "has a UNIXSocket in parallel to Socket----VT-0133" do
      Socket.ancestors.include?(UNIXSocket).should == false
      UNIXSocket.ancestors.include?(Socket).should == false
      UNIXSocket.superclass.should == BasicSocket
    end
  end
  end
end

if System::get_property('platform') != 'WINDOWS' && 
   System.get_property('platform') != 'WINDOWS_DESKTOP' 

not_supported_on :jruby, :windows do
  describe "Server class hierarchy" do
    it "contains UNIXServer----VT-0134" do
      UNIXServer.superclass.should == UNIXSocket
    end
  end
end

end