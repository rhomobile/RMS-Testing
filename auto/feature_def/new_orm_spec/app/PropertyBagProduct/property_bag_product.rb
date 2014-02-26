require 'rhom'

class PropertyBagProduct
    include Rhom::PropertyBag

    enable :sync
    enable :full_update

end