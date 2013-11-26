require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

require 'socket'

describe "Socket#gethostbyname" do
  it "returns broadcast address info for '<broadcast>'----VT-0105" do
    addr = Socket.gethostbyname('<broadcast>');
    addr.should == ["255.255.255.255", [], 2, "\377\377\377\377"]
  end

  it "returns broadcast address info for '<any>'----VT-0106" do
    addr = Socket.gethostbyname('<any>');
    addr.should == ["0.0.0.0", [], 2, "\000\000\000\000"]
  end
end
