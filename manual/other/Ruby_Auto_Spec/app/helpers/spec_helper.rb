module Library

  def getRandomName
    #Creating Random Name
    o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten
    randName = (0...5).map{ o[rand(o.length)] }.join
    return randName
  end
  module_function :getRandomName
  
end