# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class ProductUserFsNone
  include Rhom::FixedSchema

   enable :sync
   set :sync_type, 'none'
   property :name , :string
   property :quantity, :string
end
