# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class Product
  include Rhom::FixedSchema

  # Uncomment the following line to enable sync with Product.
    enable :sync
    property :sku, :string   
    property :name, :string
    property :brand, :string
    property :price, :string
    property :quantity, :string
  #add model specifc code here
    set :sync_priority, 10
end
