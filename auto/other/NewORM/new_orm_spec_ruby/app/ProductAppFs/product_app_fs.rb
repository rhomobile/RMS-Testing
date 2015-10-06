# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class ProductAppFs
  include Rhom::FixedSchema

  # Uncomment the following line to enable sync with ProductAppFs.
    enable :sync
    set :partition, 'app'
    property :name, :string
    property :quantity, :string

  #add model specific code here
end
