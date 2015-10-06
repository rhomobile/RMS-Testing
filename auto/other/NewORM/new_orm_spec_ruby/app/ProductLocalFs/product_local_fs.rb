# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class ProductLocalFs
  include Rhom::FixedSchema

  # Uncomment the following line to enable sync with ProductLocalFs.
  # enable :sync

  #add model specific code here
  set :partition, 'local'
  property :name, :string
  property :quantity, :string
end
