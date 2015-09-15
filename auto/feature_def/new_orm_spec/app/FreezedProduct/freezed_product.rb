# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class FreezedProduct
  include Rhom::PropertyBag

  # Uncomment the following line to enable sync with FreezedProduct.
  # enable :sync

  #add model specific code here
  set :freezed, true

  property :brand, :string
  property :created_at, :string
  property :name, :string
  property :price, :string
  property :quantity, :string
  property :sku, :string
  property :updated_at,  :string
end
