# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class Customer
  include Rhom::PropertyBag

  # Uncomment the following line to enable sync with Customer.
  enable :sync
  set :sync_priority, 1
  #add model specifc code here

end
