module BarcodeApi
  
  def makeSCN1Default
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
        id = thing.getProperty('ID').to_s
        if id == 'SCN1'
          Rho::Barcode.setDefaultInstance(thing)
        end
      end
    });
  end
  module_function :makeSCN1Default
  
  def makeSCN2Default
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
        id = thing.getProperty('ID').to_s
        if id == 'SCN2'
          Rho::Barcode.setDefaultInstance(thing)
        end
      end
    });
  end
  module_function :makeSCN2Default
  
  def makeSCN3Default
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
        id = thing.getProperty('ID').to_s
        if id == 'SCN3'
          Rho::Barcode.setDefaultInstance(thing)
        end
      end
    });
  end
  module_function :makeSCN3Default
  
  def enable(scnType='SCN1')
    Barcode.enumerate(lambda{|args| 
      puts "lamda: #{args}"
      data = ''
      args['result'].each do |thing|
        id = thing.getProperty('ID').to_s
        if id == scnType
          thing.enable
        end
      end
    });
  end
  module_function :enable

end

module Library

  def getRandomName
    #Creating Random Name
    o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten
    randName = (0...5).map{ o[rand(o.length)] }.join
    return randName
  end
  module_function :getRandomName
  
end
