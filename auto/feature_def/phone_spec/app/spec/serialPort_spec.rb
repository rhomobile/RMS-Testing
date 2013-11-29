describe 'My behaviour' do

  before(:all) do
    sp = SerialPort.new("/dev/tty.usbserial", "9600".to_i)
  end

  after(:all) do
    sp.close
  end


  it 'should do something' do

    open("/dev/tty", "r+") { |tty|
      tty.sync = true
      Thread.new {
        while true do
          tty.printf("%c", sp.getc)
        end
      }
      while (l = tty.gets) do
        sp.write(l.sub("\n", "\r"))
      end
    }

  end

end