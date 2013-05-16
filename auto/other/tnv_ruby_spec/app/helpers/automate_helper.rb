require 'instrumentation'
module Automate
  
  #Method to Create Lines at specific corodinates
  def drawline(x1=100,y1=100,x2=200,y2=200)

    Instrumentation.simulate_touch_event 0, x1, y1
    if x1 != x2
      points = Hash.new
      m = (y1 - y2) / (x1 - x2);
      b = y1 - m * x1;
      if x1 < x2
        for i in x1..x2
          #points[i] << m * i + b
          x = i
          y = m * i + b
          puts "(x1,y1) = (#{x},#{y})"
          Instrumentation.simulate_touch_event 2, x, y
        end
      elsif x1 > x2
        for i in (x1).downto(x2)
          x = i
          y = m * i + b
          puts "(x1,y1) = (#{x},#{y})"
          Instrumentation.simulate_touch_event 2, x, y
        end 
      end
    else
      if y1 < y2
        j = 0
        while j+y1 != y2
          puts "Cordinates are #{x1},#{j+y1}"
          Instrumentation.simulate_touch_event 2, x1, j+y1
          j = j+1
        end
      elsif y1 > y2
        j = 0
        while y1-j != y2
          puts "Cordinates are #{x1},#{y1-j}"
          Instrumentation.simulate_touch_event 2, x1, y1-j    
          j = j+1
        end
      end
    end
    #puts "All Points Are #{points.to_s}"
  
    Instrumentation.simulate_touch_event 1, x2, y2

  end
  module_function :drawline
  
  def presskey(string="hello")
    Instrumentation.simulate_key_event_string string
  end
  module_function :presskey
end


##Method to Create Lines at specific corodinates
#def drawline(x1=100,y1=100,x2=200,y2=200)
#
#  Instrumentation.simulate_touch_event 0, x1, y1

#  

#  #  i = j = 0
#  while i+x1 != x2 || j+y1 != y2
#    if i+x1 != x2
#      i = i+1
#    end
#    if j+y1 != y2
#      j = j+1
#    end
#    puts "Cordinates are #{i+x1},#{j+y1}"
#    Instrumentation.simulate_touch_event 2, i+x1, j+y1
#  end

#  
#  Instrumentation.simulate_touch_event 1, x2, y2
#
#end