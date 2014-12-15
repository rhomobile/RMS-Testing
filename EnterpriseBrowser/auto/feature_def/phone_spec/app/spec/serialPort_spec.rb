describe 'Serial port' do

  before(:all) do

  end

  after(:all) do

  end


  it 'SerialPort.new ' do
    sp = SerialPort.new(1, "9600".to_i)
    open("COM1", "r+") { |tty|
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
    sp.close
  end

end