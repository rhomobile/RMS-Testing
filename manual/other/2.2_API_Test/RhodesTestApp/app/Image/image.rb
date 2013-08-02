# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class Image
  include Rhom::PropertyBag

  # Uncomment the following line to enable sync with Image.
  # enable :sync

  #add model specific code here
  property :name, :string
  property :filename, :string
  property :image_uri, :blob, :overwrite
end
