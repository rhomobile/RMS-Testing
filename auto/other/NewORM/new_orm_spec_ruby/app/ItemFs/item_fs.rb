# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class ItemFs
  include Rhom::FixedSchema

  # Uncomment the following line to enable sync with ItemFs.
  # enable :sync
    property :itemName, :string
    property :availability, :string
    property :stockDetails, :string
  #add model specific code here
end
