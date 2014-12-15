require 'rhom'

class FixedSchemaProduct
    include Rhom::FixedSchema

    enable :sync
    enable :full_update

    set :schema_version, '1.0'

    property :brand, :string
    property :name, :string
    property :price, :string
    property :quantity, :string
    property :sku, :string
    property :updated_at,  :string
    property :created_at, :string

end