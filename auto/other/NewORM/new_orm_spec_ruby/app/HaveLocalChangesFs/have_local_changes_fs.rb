# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class HaveLocalChangesFs
  include Rhom::FixedSchema
  enable :sync
  property :name, :string
  property :quantity, :string
end
