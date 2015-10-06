# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class FindBySql
  include Rhom::FixedSchema

  # Uncomment the following line to enable sync with FindBySql.
  enable :sync
  property :id, :string
  property :department, :string
  property :name, :string
  property :age, :integer
  property :percentage, :integer

  #add model specific code here
end
