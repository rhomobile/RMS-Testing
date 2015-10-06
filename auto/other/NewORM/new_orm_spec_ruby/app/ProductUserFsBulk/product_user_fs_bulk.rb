# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class ProductUserFsBulk
  include Rhom::FixedSchema

   enable :sync
   set :sync_type, 'bulk_only'
   property :name , :string
   property :quantity, :string
end
