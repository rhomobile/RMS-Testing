# The model has already been created by the framework, and extends Rhom::RhomObject
# You can add more methods here
class CameraImage
  include Rhom::PropertyBag
  enable :sync
  property :image_uri, :blob, :overwrite
end
