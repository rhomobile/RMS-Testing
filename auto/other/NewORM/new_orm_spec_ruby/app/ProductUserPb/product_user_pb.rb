# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class ProductUserPb
  include Rhom::PropertyBag

  # Uncomment the following line to enable sync with ProductUserPb.
  enable :sync
  property :name, :string
  property :quantity, :string

  #add model specific code here
end
