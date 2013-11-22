require 'spec/spec_helper'
require 'spec/library/socket/fixtures/classes'

describe "BasicSocket#for_fd" do
  before :each do
    @server = TCPServer.new(SocketSpecs.port)
    @s2 = nil
  end

  after :each do
    # UG. We can't use the new_fd helper, because we need fds that are
    # associated with sockets. But for_fd has the same issue as IO#new, it
    # creates a fd aliasing issue with closing, causing EBADF errors.
    #
    # Thusly, the rescue for EBADF here. I'd love a better solution, but
    # I'm not aware of one.

    begin
      @server.close unless @server.closed?
    rescue Errno::EBADF
      # I hate this API
    end

    begin
      if @s2
        @s2.close unless @s2.closed?
      end
    rescue Errno::EBADF
      # I hate this API
    end
  end

  it "return a Socket instance wrapped around the descriptor----VT-021" do
    @s2 = TCPServer.for_fd(@server.fileno)
    @s2.should be_kind_of(TCPServer)
    @s2.fileno.should == @server.fileno
  end

  it "try if socket is closed----VT-022" do
    @server.close
    @server.closed?.should be_true
    lambda { @server.fileno }.should raise_error(IOError)
  end
end
